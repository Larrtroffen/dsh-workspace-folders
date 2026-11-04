/**
 * Settings-page occupant for the Plugins section.
 *
 * Two jobs, both aimed at "the user cannot see what the plugin is doing":
 *
 * 1. **Transcript viewer** — lists the Sessions sitting in the recycle bin and
 *    can open any of them to read the stored conversation, so a second delete
 *    is an informed decision rather than a guess.
 * 2. **Diagnostic log** — the plugin's own action/error ring, so a failed
 *    archive or a refused delete leaves a visible trail instead of a toast
 *    that disappears.
 *
 * The slot owner supplies nothing (empty owner props), so every action the
 * page needs arrives through the registrant's own `inject` face.
 *
 * The bin is grouped by *batch*, not by Session: one delete moves a batch, one
 * undo returns a batch, and one purge erases a batch. Rendering one flat row per
 * Session repeated the batch's identity on every line and hid the only two verbs
 * that actually act on it.
 */
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import {
  Button, IconArchiveOutlineRegular, IconCopyOutlineRegular, IconRefreshOutlineRegular,
  IconTrashOutlineRegular, RiskConfirmation,
} from '@deepseek-ai/dsh-client-ui-primitives'
import type {
  PurgeBatchOutcome, RecycledBatchSummary, SweepTrashOutcome, TranscriptMessage, TrashedSessionSummary,
  UndoDeleteOutcome, WorkspaceBrowserProps,
} from './contract/slots.ts'
import { logEntries, subscribeLog, type PluginLogEntry } from './diagnostics.ts'
import css from './SessionManagerSettings.module.css'

type T = WorkspaceBrowserProps['t']

/** Recycle verbs every entry point injects (settings tab and footer dialog). */
export interface SessionManagerSettingsInjected {
  listRecycledSessions: () => Promise<readonly RecycledBatchSummary[]>
  undoDeleteSession: () => Promise<UndoDeleteOutcome>
  listTrashedSessions: () => Promise<readonly TrashedSessionSummary[]>
  readTranscript: (sessionId: string) => Promise<readonly TranscriptMessage[]>
  purgeBatch: (batchId: string) => Promise<PurgeBatchOutcome>
  sweepTrash: (maxBatches?: number, maxAgeDays?: number) => Promise<SweepTrashOutcome>
}

type Props = SessionManagerSettingsInjected & { t: T }

/** Retention the "清理过期" button applies, mirroring the Host's own defaults. */
const SWEEP_KEEP_BATCHES = 20
const SWEEP_KEEP_DAYS = 30

function formatBytes(bytes: number): string {
  if (bytes <= 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  let value = bytes
  let unit = 0
  while (value >= 1024 && unit < units.length - 1) { value /= 1024; unit += 1 }
  return `${value >= 100 ? Math.round(value) : value.toFixed(1)} ${units[unit]}`
}

function formatTime(at: number): string {
  const date = new Date(at)
  const pad = (n: number): string => String(n).padStart(2, '0')
  return `${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

function Feature({ icon, title, body }: { icon: ReactNode; title: string; body: string }) {
  return (
    <li className={css.feature}>
      <span className={css.featureIcon} aria-hidden="true">{icon}</span>
      <div className={css.featureText}>
        <div className={css.featureTitle}>{title}</div>
        <div className={css.featureBody}>{body}</div>
      </div>
    </li>
  )
}

/** One batch in the bin: its Sessions, its size, and the verbs that act on it. */
interface BatchGroup {
  batchId: string
  deletedAt: string
  rows: readonly TrashedSessionSummary[]
  bytes: number
}

/**
 * Fold the flat bin listing into batches, newest first.
 *
 * The Host already sorts rows newest-first, so the first appearance of a batch
 * fixes its position and later rows only join it. A row whose `batchId` is the
 * empty string (a corrupt manifest) still gets its own group keyed by itself,
 * rather than being silently dropped from a page whose job is to show the bin.
 */
function groupByBatch(rows: readonly TrashedSessionSummary[]): readonly BatchGroup[] {
  const groups = new Map<string, { deletedAt: string; rows: TrashedSessionSummary[]; bytes: number }>()
  for (const row of rows) {
    const key = row.batchId === '' ? `unknown:${row.sessionId}` : row.batchId
    const existing = groups.get(key)
    if (existing === undefined) {
      groups.set(key, { deletedAt: row.deletedAt, rows: [row], bytes: row.bytes })
    } else {
      existing.rows.push(row)
      existing.bytes += row.bytes
    }
  }
  return [...groups.entries()].map(([batchId, group]) => ({ batchId, ...group }))
}

export function SessionManagerSettings({
  t, listRecycledSessions, undoDeleteSession, listTrashedSessions, readTranscript, purgeBatch, sweepTrash,
}: Props) {
  const [batches, setBatches] = useState<readonly RecycledBatchSummary[] | null>(null)
  const [trashed, setTrashed] = useState<readonly TrashedSessionSummary[] | null>(null)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  /** Session whose transcript is open, plus the rows once loaded. */
  const [openSession, setOpenSession] = useState<string | null>(null)
  const [transcript, setTranscript] = useState<readonly TranscriptMessage[] | null>(null)
  const [entries, setEntries] = useState<readonly PluginLogEntry[]>(() => logEntries())
  /** Batch the user asked to erase, and whether they acknowledged it. */
  const [purgeTarget, setPurgeTarget] = useState<BatchGroup | null>(null)
  const [purgeAcknowledged, setPurgeAcknowledged] = useState(false)
  /** Set while the confirm on screen is the "erase the whole bin" one. */
  const [purgeAllQueued, setPurgeAllQueued] = useState(false)
  const [purgeAll, setPurgeAll] = useState<{ batches: number; rows: number } | null>(null)

  useEffect(() => subscribeLog(() => { setEntries(logEntries()) }), [])

  const reload = async () => {
    setBusy(true)
    setError(null)
    try {
      const [nextBatches, nextTrashed] = await Promise.all([listRecycledSessions(), listTrashedSessions()])
      setBatches(nextBatches)
      setTrashed(nextTrashed)
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : String(reason))
    } finally {
      setBusy(false)
    }
  }

  useEffect(() => { void reload() }, [])

  const undo = async () => {
    setBusy(true)
    setError(null)
    setMessage(null)
    try {
      const outcome = await undoDeleteSession()
      setMessage(t('settings.recycle.undoDone', { n: outcome.restored.length }))
      // A collapsed transcript belongs to a batch that no longer exists.
      setOpenSession(null)
      setTranscript(null)
      await reload()
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : String(reason))
    } finally {
      setBusy(false)
    }
  }

  const openTranscript = async (sessionId: string) => {
    if (openSession === sessionId) { setOpenSession(null); setTranscript(null); return }
    setOpenSession(sessionId)
    setTranscript(null)
    const rows = await readTranscript(sessionId)
    setTranscript(rows)
  }

  const askPurge = (group: BatchGroup) => {
    setError(null)
    setMessage(null)
    setPurgeAcknowledged(false)
    setPurgeTarget(group)
    setPurgeAllQueued(false)
  }

  /**
   * Erase the whole bin.
   *
   * Reuses the per-batch verb rather than a "delete everything" call: the Host
   * then has to consent to each erase on its own terms, and a failure part-way
   * through leaves an honest partial result instead of a half-taken bin. The
   * batches were captured when the button was pressed — the list is re-read on
   * success — so a row deleted meanwhile simply reports as already gone.
   */
  const askPurgeAll = () => {
    if (groups === null || groups.length === 0) return
    setError(null)
    setMessage(null)
    setPurgeAcknowledged(false)
    setPurgeAllQueued(true)
    setPurgeAll({ batches: groups.length, rows: groups.reduce((total, group) => total + group.rows.length, 0) })
  }

  const confirmPurge = async () => {
    if (purgeAllQueued) {
      setPurgeAll(null)
      setPurgeAllQueued(false)
      setPurgeAcknowledged(false)
      setBusy(true)
      setError(null)
      setMessage(null)
      try {
        let reclaimed = 0
        let erasedBatches = 0
        for (const group of groups ?? []) {
          try {
            const outcome = await purgeBatch(group.batchId)
            reclaimed += outcome.reclaimedBytes
            erasedBatches += 1
          } catch (reason) {
            // One bad batch must not abandon the rest, so the reason is shown
            // and the loop continues; the summary below then reports what
            // actually went, which may be fewer than were queued.
            setError(reason instanceof Error ? reason.message : String(reason))
          }
        }
        setMessage(t('settings.recycle.purgeAllDone', { batches: erasedBatches, bytes: formatBytes(reclaimed) }))
        setOpenSession(null)
        setTranscript(null)
        await reload()
      } finally {
        setBusy(false)
      }
      return
    }

    const target = purgeTarget
    if (target === null) return
    setPurgeTarget(null)
    setPurgeAcknowledged(false)
    setBusy(true)
    setError(null)
    setMessage(null)
    try {
      const outcome = await purgeBatch(target.batchId)
      setMessage(t('settings.recycle.purgeDone', { n: target.rows.length, bytes: formatBytes(outcome.reclaimedBytes) }))
      setOpenSession(null)
      setTranscript(null)
      await reload()
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : String(reason))
    } finally {
      setBusy(false)
    }
  }

  const sweep = async () => {
    setBusy(true)
    setError(null)
    setMessage(null)
    try {
      const outcome = await sweepTrash(SWEEP_KEEP_BATCHES, SWEEP_KEEP_DAYS)
      setMessage(t('settings.recycle.sweepDone', { n: outcome.removedBatchIds.length, bytes: formatBytes(outcome.reclaimedBytes) }))
      setOpenSession(null)
      setTranscript(null)
      await reload()
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : String(reason))
    } finally {
      setBusy(false)
    }
  }

  /** Copy the whole diagnostic ring, newest first, as plain text. */
  const copyLog = async () => {
    const text = entries.slice().reverse()
      .map(entry => `${formatTime(entry.at)}\t${entry.level}\t${entry.action}\t${entry.message}`)
      .join('\n')
    try {
      await navigator.clipboard.writeText(text)
      setMessage(t('settings.log.copied', { n: entries.length }))
    } catch (reason) {
      // A denied clipboard is a browser-permission outcome, not a plugin
      // failure; say so instead of pretending the copy happened.
      setError(t('settings.log.copyFailed'))
      void reason
    }
  }

  const groups = trashed === null ? null : groupByBatch(trashed)

  return (
    <div className={css.root}>
      <section className={css.section}>
        <h2 className={css.sectionTitle}>{t('settings.overview.title')}</h2>
        <p className={css.lead}>{t('settings.overview.lead')}</p>
        <ul className={css.featureList}>
          <Feature icon={<IconArchiveOutlineRegular size={18} />}
            title={t('settings.overview.category.title')} body={t('settings.overview.category.body')} />
          <Feature icon={<IconArchiveOutlineRegular size={18} />}
            title={t('settings.overview.archive.title')} body={t('settings.overview.archive.body')} />
          <Feature icon={<IconArchiveOutlineRegular size={18} />}
            title={t('settings.overview.delete.title')} body={t('settings.overview.delete.body')} />
        </ul>
      </section>

      <section className={css.section}>
        <h2 className={css.sectionTitle}>{t('settings.recycle.title')}</h2>
        <p className={css.lead}>{t('settings.recycle.lead')}</p>

        {error !== null && <div className={css.error} role="alert">{error}</div>}
        {message !== null && <div className={css.info} role="status">{message}</div>}

        {groups === null && <div className={css.empty}>{t('settings.recycle.loading')}</div>}
        {groups !== null && groups.length === 0 && (
          <div className={css.empty}>
            <div>{t('settings.recycle.empty')}</div>
            <div className={css.emptyHint}>{t('settings.recycle.emptyHint')}</div>
          </div>
        )}

        {groups !== null && groups.length > 0 && (
          <ul className={css.batchList}>
            {groups.map(group => (
              <li key={group.batchId} className={css.batchGroup}>
                <div className={css.batchHead}>
                  <span className={css.batchMeta}>
                    {t('settings.recycle.batch', { n: group.rows.length, bytes: formatBytes(group.bytes) })}
                  </span>
                  <span className={css.batchTime}>{group.deletedAt}</span>
                  <Button variant="outline" icon={<IconTrashOutlineRegular size={16} />} disabled={busy}
                    aria-label={t('settings.recycle.purgeBatch')}
                    onClick={() => { askPurge(group) }}>
                    {t('settings.recycle.purgeBatch')}
                  </Button>
                </div>
                <div className={css.trashMeta}>{group.batchId}</div>
                <ul className={css.trashList}>
                  {group.rows.map(row => (
                    <li key={`${group.batchId}/${row.sessionId}`} className={css.trashRow}>
                      <div className={css.trashHead}>
                        <span className={css.trashMeta}>{row.sessionId}</span>
                        <span className={css.batchTime}>{formatBytes(row.bytes)}</span>
                        <Button variant="outline" onClick={() => { void openTranscript(row.sessionId) }}>
                          {openSession === row.sessionId ? t('settings.recycle.hideContent') : t('settings.recycle.viewContent')}
                        </Button>
                      </div>
                      {openSession === row.sessionId && (
                        <div className={css.transcript}>
                          {transcript === null && <div className={css.empty}>{t('settings.recycle.contentLoading')}</div>}
                          {transcript !== null && transcript.length === 0 && (
                            <div className={css.empty}>{t('settings.recycle.contentEmpty')}</div>
                          )}
                          {transcript !== null && transcript.map((item, index) => (
                            <div key={`${row.sessionId}/${index}`} className={css.message} data-role={item.role}>
                              <span className={css.messageRole}>{item.role}</span>
                              <span className={css.messageText}>{item.text}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}

        {groups !== null && groups.length > 0 && (
          <div className={css.actions}>
            <Button variant="outline" icon={<IconRefreshOutlineRegular size={16} />} disabled={busy}
              onClick={() => { void undo() }}>
              {t('settings.recycle.undo')}
            </Button>
            <Button variant="outline" disabled={busy} onClick={() => { void sweep() }}>
              {t('settings.recycle.sweep', { batches: SWEEP_KEEP_BATCHES, days: SWEEP_KEEP_DAYS })}
            </Button>
            <Button variant="outline" className={css.deleteAction} icon={<IconTrashOutlineRegular size={16} />}
              disabled={busy} onClick={() => { askPurgeAll() }}>
              {t('settings.recycle.purgeAll')}
            </Button>
          </div>
        )}
      </section>

      <section className={css.section}>
        <h2 className={css.sectionTitle}>{t('settings.log.title')}</h2>
        <p className={css.lead}>{t('settings.log.lead')}</p>
        {entries.length === 0 && <div className={css.empty}>{t('settings.log.empty')}</div>}
        {entries.length > 0 && (
          <>
            <div className={css.actions}>
              <Button variant="ghost" icon={<IconCopyOutlineRegular size={16} />} onClick={() => { void copyLog() }}>
                {t('settings.log.copy')}
              </Button>
            </div>
            <ul className={css.logList}>
              {entries.slice(-60).reverse().map(entry => (
                <li key={entry.id} className={css.logRow} data-level={entry.level}>
                  <span className={css.logTime}>{formatTime(entry.at)}</span>
                  <span className={css.logAction}>{entry.action}</span>
                  <span className={css.logMessage}>{entry.message}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      {/* Erasing is the one thing the bin cannot undo, so both paths through it
          — one batch, or all of them — are gated behind the same explicit
          acknowledgement rather than a bare confirm button. */}
      <RiskConfirmation
        open={purgeTarget !== null || purgeAll !== null}
        title={purgeAllQueued && purgeAll !== null
          ? t('settings.recycle.purgeAllTitle')
          : t('settings.recycle.purgeTitle')}
        description={purgeAllQueued && purgeAll !== null
          ? t('settings.recycle.purgeAllBody', { batches: purgeAll.batches, rows: purgeAll.rows })
          : purgeTarget === null ? '' : t('settings.recycle.purgeBody', {
            n: purgeTarget.rows.length, bytes: formatBytes(purgeTarget.bytes),
          })}
        acknowledgeLabel={t('settings.recycle.purgeAck')}
        cancelLabel={t('settings.recycle.cancel')}
        closeLabel={t('close')}
        confirmLabel={purgeAllQueued && purgeAll !== null
          ? t('settings.recycle.purgeAllConfirm')
          : t('settings.recycle.purgeConfirm')}
        acknowledged={purgeAcknowledged}
        onAcknowledgedChange={setPurgeAcknowledged}
        onCancel={() => {
          setPurgeTarget(null)
          setPurgeAll(null)
          setPurgeAllQueued(false)
          setPurgeAcknowledged(false)
        }}
        onConfirm={() => { void confirmPurge() }}
      />
    </div>
  )
}

export default SessionManagerSettings
