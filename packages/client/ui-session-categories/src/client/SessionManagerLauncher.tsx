/**
 * Sidebar-footer action: the 会话管理 button beside Settings.
 *
 * Clicking it opens a dialog that IS the session-management surface — the
 * recycle bin, the undo verb and the plugin log — instead of the roundabout
 * this button used to take (setting the archived filter and expecting the user
 * to scroll). Reaching the Settings page programmatically is not available to a
 * plugin: `sidebar.footer.action` hands over only `wide`, and the settings
 * shell's store (`actions.openSection`) is owned by its own occupant. A dialog
 * on this very button is the one surface the user already reaches, so the
 * feature lives there.
 *
 * The dialog body is {@link SessionManagerSettings}, the same component the
 * Settings tab mounts, so the two entries can never drift apart.
 */
import { useState } from 'react'
import clsx from 'clsx'
import { Button, IconArchiveOutlineRegular, Modal, Tooltip } from '@deepseek-ai/dsh-client-ui-primitives'
import { SessionManagerSettings, type SessionManagerSettingsInjected } from './SessionManagerSettings.tsx'
import type { WorkspaceBrowserProps } from './contract/slots.ts'
import css from './SessionManagerLauncher.module.css'

type ViewState = { managerOpen: boolean }
type ViewActions = {
  openManager: (draft: ViewState) => void
  closeManager: (draft: ViewState) => void
}

/**
 * Recycle verbs this entry needs; supplied by the registrant's inject face.
 * Aliased to the shared shape so the dialog body and the Settings tab can
 * never drift apart on which verbs exist.
 */
export type LauncherInjected = SessionManagerSettingsInjected

interface Props {
  wide: boolean
  t: WorkspaceBrowserProps['t']
  /** Bound by the slot injector because this entry registers a store. */
  useStore: <S>(selector: (state: ViewState) => S) => S
  /** Bound by the slot injector because this entry registers a store. */
  actions: ViewActions
  listRecycledSessions: LauncherInjected['listRecycledSessions']
  undoDeleteSession: LauncherInjected['undoDeleteSession']
  listTrashedSessions: LauncherInjected['listTrashedSessions']
  readTranscript: LauncherInjected['readTranscript']
  purgeBatch: LauncherInjected['purgeBatch']
  sweepTrash: LauncherInjected['sweepTrash']
}

export function SessionManagerLauncher({
  wide, t, useStore, actions, listRecycledSessions, undoDeleteSession, listTrashedSessions, readTranscript,
  purgeBatch, sweepTrash,
}: Props) {
  const open = useStore(s => s.managerOpen === true)
  // Remount the dialog body on every open so it re-reads the bin instead of
  // showing what it fetched the last time the user looked.
  const [generation, setGeneration] = useState(0)
  const label = t('settings.launcher')
  return (
    <>
      <Tooltip label={label} delayMs={500} disabled={wide}>
        <Button
          variant="ghost"
          className={clsx(!wide && 'dshSessionManagerRail')}
          aria-label={label}
          aria-haspopup="dialog"
          aria-expanded={open}
          icon={<IconArchiveOutlineRegular size={wide ? 16 : 18} />}
          onClick={() => {
            setGeneration(n => n + 1)
            actions.openManager()
          }}
        >
          {wide ? label : null}
        </Button>
      </Tooltip>
      <Modal
        open={open}
        onClose={() => { actions.closeManager() }}
        closeLabel={t('close')}
        title={label}
        className={css.dialog}
        contentClassName={css.dialogContent}
      >
        <SessionManagerSettings
          key={generation}
          t={t}
          listRecycledSessions={listRecycledSessions}
          undoDeleteSession={undoDeleteSession}
          listTrashedSessions={listTrashedSessions}
          readTranscript={readTranscript}
          purgeBatch={purgeBatch}
          sweepTrash={sweepTrash}
        />
      </Modal>
    </>
  )
}

export default SessionManagerLauncher
