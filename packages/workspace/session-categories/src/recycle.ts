/**
 * Session recycle bin: the out-of-band pruning this harness deliberately omits.
 *
 * `dsh-session-persistence` states plainly that it has "no delete or retention
 * interface — pruning stored sessions is out-of-band backend maintenance", and
 * `dsh-workspace` exposes only `archiveSession`/`unarchiveSession`. Archiving
 * therefore hides a Session from the browser without ever reclaiming its log,
 * and the archive set is one-way from the UI's point of view.
 *
 * This module supplies that missing maintenance. It never deletes anything
 * outright: a "deleted" Session is *moved* into a dated recycle bin, and the
 * move is recorded in a manifest so the most recent deletion can be undone.
 * Only the automatic retention sweep, or an explicit purge the user confirmed,
 * ever removes a stored log for good.
 *
 * ### On-disk layout
 *
 * A stored Session lives at
 * `<dshHome>/sessions/<encoded-workspace-path>/session-<uuid>/session.v4.jsonl.zstd`.
 *
 * The directory name under `sessions/` encodes the owning Workspace's path, so
 * the same Workspace can appear under more than one spelling when a path
 * component is a junction (`C:\\Users\\...\\.dsh\\bili-duty` and
 * `E:\\AI\\DSH\\DSH-Data\\.dsh\\bili-duty` are one directory with two names). This
 * module therefore never *derives* that directory name from a Workspace path
 * alone - it locates the Session by searching the encoded directories for the
 * one that actually contains `session-<uuid>`, and treats a Workspace-path
 * match as a tie-breaker only.
 *
 * ### Three scopes
 *
 * `record` moves the stored log. `artifacts` additionally moves every file the
 * Session wrote inside its own working directory, after re-deriving that list
 * from the stored events and proving each path belongs to the conversation.
 * `everything` is the compatibility spelling of the same pair.
 *
 * @module
 */
import { existsSync } from 'node:fs'
import { mkdir, readdir, readFile, realpath, rename, rm, stat, writeFile } from 'node:fs/promises'
import { homedir } from 'node:os'
import { dirname, join, sep } from 'node:path'
import zlib from 'node:zlib'

/** A stored Session's durable identity, e.g. `session-<uuid>`. */
export type StoredSessionId = string

/** How much of a Session a delete takes with it. */
export type RecycleScope = 'record' | 'artifacts' | 'everything'

/** One Session log relocated by a delete, and how to put it back. */
export interface RecycledSession {
  sessionId: StoredSessionId
  /** Encoded directory name under `sessions/` that held the Session. */
  container: string
  /** Absolute path the Session occupied before the delete. */
  origin: string
  /** Workspace the Session belonged to, when the caller supplied one. */
  workspaceId?: string
  /** Workspace path as recorded by the registry, for diagnostics only. */
  workspacePath?: string
  /** Bytes reclaimed from the live tree. */
  sizeBytes: number
}

/** One file an artifacts-scoped delete carried along with the log. */
export interface RecycledArtifact {
  /** The path as the Session's tool call recorded it. */
  displayPath: string
  /** Absolute path the file occupied before the delete. */
  origin: string
  /** Recycle-bin location; always `artifacts`. */
  container: 'artifacts'
  /** Bytes reclaimed from the working directory. */
  sizeBytes: number
}

/** One batch of deletions, undoable as a unit. */
export interface RecycleBatch {
  /** Stable id; also the recycle-bin subdirectory name. */
  batchId: string
  /** ISO timestamp of the deletion. */
  deletedAt: string
  reason?: string
  /** Which scope created the batch; restores replay artifacts when set. */
  scope?: RecycleScope
  entries: RecycledSession[]
  /** Files moved alongside the logs by an artifacts-scoped delete. */
  artifactEntries?: RecycledArtifact[]
  /** Sessions archived before the delete, re-archived when the undo runs. */
  wasArchived?: StoredSessionId[]
  /** Workspaces each moved Session was detached from, for the undo path. */
  detachedFrom?: readonly { sessionId: StoredSessionId; workspaceId: string }[]
}

/** Result of the retention sweep. */
export interface SweepResult {
  removedBatches: string[]
  reclaimedBytes: number
}

/** Failure modes a delete can report back to the caller. */
export interface RecycleFailure {
  code: string
  sessionId?: StoredSessionId
}

/** Outcome of moving one or more Sessions into the recycle bin. */
export type RecycleResult =
  | {
      ok: true
      batch: RecycleBatch
      artifactCount: number
      artifactBytes: number
      releasedArchived: StoredSessionId[]
      detachedFrom: string[]
    }
  | { ok: false; error: RecycleFailure }

/** Outcome of putting a batch back. */
export type RestoreResult =
  | {
      ok: true
      batchId: string
      restored: StoredSessionId[]
      failed: { sessionId: StoredSessionId; reason: string }[]
      reattached: StoredSessionId[]
      rearchived: StoredSessionId[]
    }
  | { ok: false; error: { code: string } }

/** Outcome of erasing one named batch for good. */
export type PurgeResult =
  | { ok: true; batchId: string; reclaimedBytes: number }
  | { ok: false; error: { code: string; batchId?: string } }

/** One Session currently inside the recycle bin. */
export interface TrashedSession {
  sessionId: StoredSessionId
  batchId: string
  deletedAt: string
  bytes: number
  container: string
}

/** One message row read back from a stored transcript. */
export interface TranscriptMessage {
  role: 'user' | 'assistant' | 'tool'
  type: string
  text: string
  time?: number
}

/** A stored Session's readable transcript. */
export interface TranscriptReport {
  sessionId: StoredSessionId
  found: boolean
  trashed: boolean
  total: number
  toolCalls: number
  messages: TranscriptMessage[]
}

/** One candidate file the scan accepted, ready to be moved. */
export interface AllowedArtifact {
  /** Path exactly as the tool call recorded it. */
  displayPath: string
  /** Resolved absolute path. */
  path: string
  bytes: number
  /** The write tool that produced it. */
  ops: string
}

/** One candidate the scan refused, and why. */
export interface RefusedArtifact {
  path: string
  reason: string
}

/** Everything a delete of one Session would move, computed without moving it. */
export interface DeleteScan {
  ok: true
  sessionId: StoredSessionId
  cwd: string | null
  store: { directories: string[]; bytes: number }
  artifacts: { allowed: AllowedArtifact[]; refused: RefusedArtifact[]; totalBytes: number }
  warnings: string[]
}

const SESSION_PREFIX = 'session-'

/** Directory name the recycle bin parks artifacts under. */
const ARTIFACT_CONTAINER = 'artifacts'

/**
 * Tool names whose arguments name a file the Session wrote.
 *
 * The scan only ever *offers* these paths; `classifyArtifacts` still has to
 * prove each one lives inside the conversation's own working directory.
 */
const WRITE_TOOL_PATHS: Record<string, readonly string[]> = {
  write: ['file_path', 'path'],
  edit: ['file_path', 'path'],
  multi_edit: ['file_path', 'path'],
  str_replace_editor: ['path', 'file_path'],
  create_file: ['file_path', 'path'],
  apply_patch: ['file_path', 'path'],
}

/** Record types kept by the transcript reader. */
const TRANSCRIPT_TYPES = new Set(['user/message', 'assistant/message'])

/** Resolve the dsh home directory the way the harness does. */
export function resolveDshHome(): string {
  return process.env.DSH_HOME ?? join(homedir(), '.dsh')
}

/** Absolute path of the stored-session tree. */
export function sessionsRoot(dshHome = resolveDshHome()): string {
  return join(dshHome, 'sessions')
}

/** Absolute path of the recycle bin root. */
export function trashRoot(dshHome = resolveDshHome()): string {
  return join(dshHome, 'trash')
}

/** Path of the recycle-bin manifest inside one batch directory. */
function manifestPath(batchDir: string): string {
  return join(batchDir, 'manifest.json')
}

/**
 * Encoded directory names under `sessions/` that actually hold this Session.
 *
 * A junction lets one Session be visible under several container spellings;
 * the caller decides which spelling to record.
 *
 * @param sessionId - the stored Session id, e.g. `session-<uuid>`.
 * @param dshHome - dsh home override, for tests.
 * @returns every container directory name holding a `sessionId` child.
 */
export async function locateSession(
  sessionId: StoredSessionId,
  dshHome = resolveDshHome(),
): Promise<{ container: string; path: string }[]> {
  const root = sessionsRoot(dshHome)
  const found: { container: string; path: string }[] = []
  if (!sessionId.startsWith(SESSION_PREFIX) || /[\\/]|\.\./.test(sessionId)) return found
  let containers: string[]
  try {
    containers = (await readdir(root, { withFileTypes: true }))
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name)
  } catch {
    return found
  }
  for (const container of containers) {
    const candidate = join(root, container, sessionId)
    try {
      if ((await stat(candidate)).isDirectory()) found.push({ container, path: candidate })
    } catch {
      // Not present under this container; the next one may still have it.
    }
  }
  return found
}

/**
 * Containers inside the recycle bin that still hold this Session.
 *
 * The bin layout repeats the live one - `<trash>/<batch>/<container>/<id>` - so
 * a transcript request for a deleted Session has to look through every batch,
 * newest first, before it can say the log is gone.
 *
 * @param sessionId - the stored Session id.
 * @param dshHome - dsh home override, for tests.
 * @returns the first container holding it, with the batch it belongs to.
 */
export async function locateTrashedSession(
  sessionId: StoredSessionId,
  dshHome = resolveDshHome(),
): Promise<{ batchId: string; container: string; path: string } | undefined> {
  const root = trashRoot(dshHome)
  const batches = await listBatches(dshHome)
  for (const batch of batches) {
    for (const entry of batch.entries) {
      if (entry.sessionId !== sessionId) continue
      const candidate = join(root, batch.batchId, entry.container, sessionId)
      try {
        if ((await stat(candidate)).isDirectory()) return { batchId: batch.batchId, container: entry.container, path: candidate }
      } catch {
        // The manifest outlived the directory; keep looking.
      }
    }
  }
  return undefined
}

/** Total bytes of every regular file beneath a directory. */
async function directorySize(path: string): Promise<number> {
  let total = 0
  const entries = await readdir(path, { withFileTypes: true }).catch(() => [])
  for (const entry of entries) {
    const child = join(path, entry.name)
    if (entry.isDirectory()) total += await directorySize(child)
    else if (entry.isFile()) total += await stat(child).then(info => info.size).catch(() => 0)
  }
  return total
}

/** Read every batch manifest in the recycle bin, newest first. */
export async function listBatches(dshHome = resolveDshHome()): Promise<RecycleBatch[]> {
  const root = trashRoot(dshHome)
  const names = (await readdir(root, { withFileTypes: true }).catch(() => []))
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
  const batches: RecycleBatch[] = []
  for (const name of names) {
    const raw = await readFile(manifestPath(join(root, name)), 'utf8').catch(() => undefined)
    if (raw === undefined) continue
    try {
      batches.push(JSON.parse(raw) as RecycleBatch)
    } catch {
      // A corrupt manifest must not hide the batches that are still readable.
    }
  }
  return batches.sort((left, right) => right.deletedAt.localeCompare(left.deletedAt))
}

/**
 * Write one batch manifest.
 *
 * @param batchDir - directory the manifest belongs to.
 * @param batch - the batch to record.
 * @param dshHome - dsh home override, for tests.
 */
export async function persistBatch(batchDir: string, batch: RecycleBatch, dshHome = resolveDshHome()): Promise<void> {
  await mkdir(batchDir, { recursive: true })
  await writeFile(manifestPath(batchDir), JSON.stringify(batch, null, 2), 'utf8')
  await mkdir(trashRoot(dshHome), { recursive: true })
}

/**
 * Move one Session's log into a batch directory.
 *
 * Split out of {@link recycleSessions} so the host service can archive the
 * Session in the workspace registry between the scan and the move, and can
 * still record the exact spelling the log lived under.
 *
 * @param sessionId - the stored Session id.
 * @param batchDir - the batch directory to move into.
 * @param preferences - workspace hints used to pick a container spelling.
 * @param dshHome - dsh home override, for tests.
 * @returns the manifest entry, or a failure code.
 */
export async function moveSessionLog(
  sessionId: StoredSessionId,
  batchDir: string,
  preferences: { workspaceId?: string; workspacePath?: string } = {},
  dshHome = resolveDshHome(),
): Promise<{ ok: true; entry: RecycledSession } | { ok: false; error: RecycleFailure }> {
  const hits = await locateSession(sessionId, dshHome)
  if (hits.length === 0) return { ok: false, error: { code: 'session-log-not-found', sessionId } }
  const preferred = preferences.workspacePath === undefined
    ? undefined
    : encodeWorkspacePath(preferences.workspacePath)
  // A junction can make one Session visible under several container spellings
  // that all resolve to the same directory. Prefer the container whose name
  // encodes the Workspace the caller named, so the manifest records the
  // spelling the browser shows; fall back to the first hit.
  const chosen = hits.find(hit => hit.container === preferred) ?? hits[0]!
  const sizeBytes = await directorySize(chosen.path)
  const target = join(batchDir, chosen.container, sessionId)
  await mkdir(dirname(target), { recursive: true })
  await rename(chosen.path, target)
  return {
    ok: true,
    entry: {
      sessionId,
      container: chosen.container,
      origin: chosen.path,
      ...(preferences.workspaceId === undefined ? {} : { workspaceId: preferences.workspaceId }),
      ...(preferences.workspacePath === undefined ? {} : { workspacePath: preferences.workspacePath }),
      sizeBytes,
    },
  }
}

/**
 * Move already-classified artifacts into one batch directory.
 *
 * The stored name is the display path in base64url, so a path with separators,
 * colons, or non-ASCII characters cannot escape the batch directory or collide
 * with a sibling. A file that vanished between the scan and the move is
 * skipped rather than failing the whole delete: the log is the user's actual
 * data, the artifact list is a convenience.
 *
 * @param batchDir - the batch directory the log entries already live in.
 * @param allowed - resolved files proven to belong to the conversation.
 * @returns the artifact entries recorded in the manifest.
 */
export async function recycleArtifacts(
  batchDir: string,
  allowed: readonly AllowedArtifact[],
): Promise<RecycledArtifact[]> {
  const moved: RecycledArtifact[] = []
  for (const row of allowed) {
    const stored = Buffer.from(row.displayPath, 'utf8').toString('base64url')
    const target = join(batchDir, ARTIFACT_CONTAINER, stored)
    try {
      await mkdir(dirname(target), { recursive: true })
      await rename(row.path, target)
      moved.push({ displayPath: row.displayPath, origin: row.path, container: ARTIFACT_CONTAINER, sizeBytes: row.bytes })
    } catch {
      // Already gone or held open: the log move is what the user asked for.
    }
  }
  return moved
}

/**
 * Delete by moving into the recycle bin, recording everything needed to undo.
 *
 * Kept as the single-call convenience the workspace tests and any non-host
 * caller use; the host service drives {@link moveSessionLog} itself so it can
 * detach the Session from its Workspace in between.
 */
export async function recycleSessions(
  request: {
    sessionIds: readonly StoredSessionId[]
    workspaceId?: string
    workspacePath?: string
    reason?: string
    scope?: RecycleScope
  },
  dshHome = resolveDshHome(),
): Promise<RecycleResult> {
  const stamp = new Date().toISOString()
  const batchId = stamp.replace(/[:.]/g, '-')
  const batchDir = join(trashRoot(dshHome), batchId)
  const entries: RecycledSession[] = []

  for (const sessionId of request.sessionIds) {
    const moved = await moveSessionLog(sessionId, batchDir, {
      ...(request.workspaceId === undefined ? {} : { workspaceId: request.workspaceId }),
      ...(request.workspacePath === undefined ? {} : { workspacePath: request.workspacePath }),
    }, dshHome)
    if (!moved.ok) {
      // Nothing on disk to move: report it rather than pretending success,
      // but keep whatever already moved so the batch stays undoable.
      if (entries.length > 0) {
        await persistBatch(batchDir, {
          batchId,
          deletedAt: stamp,
          ...(request.reason === undefined ? {} : { reason: request.reason }),
          ...(request.scope === undefined ? {} : { scope: request.scope }),
          entries,
        }, dshHome)
      }
      return { ok: false, error: moved.error }
    }
    entries.push(moved.entry)
  }

  const batch: RecycleBatch = {
    batchId,
    deletedAt: stamp,
    ...(request.reason === undefined ? {} : { reason: request.reason }),
    ...(request.scope === undefined ? {} : { scope: request.scope }),
    entries,
  }
  await persistBatch(batchDir, batch, dshHome)
  return { ok: true, batch, artifactCount: 0, artifactBytes: 0, releasedArchived: [], detachedFrom: [] }
}

/**
 * Put the most recently deleted batch (or a named one) back.
 *
 * Restoration is best-effort per entry: an entry whose origin directory has
 * since been removed is reported rather than silently dropped, because the
 * caller has to tell the user their Session came back incomplete.
 */
export async function restoreBatch(
  options: { batchId?: string } = {},
  dshHome = resolveDshHome(),
): Promise<RestoreResult> {
  const batches = await listBatches(dshHome)
  const batch = options.batchId === undefined ? batches[0] : batches.find(item => item.batchId === options.batchId)
  if (batch === undefined) return { ok: false, error: { code: 'no-batch' } }

  const batchDir = join(trashRoot(dshHome), batch.batchId)
  const restored: StoredSessionId[] = []
  const failed: { sessionId: StoredSessionId; reason: string }[] = []

  for (const entry of batch.entries) {
    const source = join(batchDir, entry.container, entry.sessionId)
    try {
      await mkdir(dirname(entry.origin), { recursive: true })
      const occupied = await stat(entry.origin).then(() => true).catch(() => false)
      if (occupied) {
        failed.push({ sessionId: entry.sessionId, reason: 'origin-occupied' })
        continue
      }
      await rename(source, entry.origin)
      restored.push(entry.sessionId)
    } catch (error) {
      failed.push({ sessionId: entry.sessionId, reason: error instanceof Error ? error.message : String(error) })
    }
  }

  // Artifacts come back only when their log came back: a file reappearing next
  // to a log that is still in the bin would be a half-undo.
  for (const entry of batch.artifactEntries ?? []) {
    const stored = join(batchDir, entry.container, Buffer.from(entry.displayPath, 'utf8').toString('base64url'))
    try {
      const occupied = await stat(entry.origin).then(() => true).catch(() => false)
      if (occupied) continue
      await mkdir(dirname(entry.origin), { recursive: true })
      await rename(stored, entry.origin)
    } catch {
      // A missing artifact copy is not worth failing the log restore over.
    }
  }

  if (restored.length > 0 && failed.length === 0) await rm(batchDir, { recursive: true, force: true })
  else {
    await writeFile(
      manifestPath(batchDir),
      JSON.stringify({ ...batch, entries: batch.entries.filter(entry => failed.some(item => item.sessionId === entry.sessionId)) }, null, 2),
      'utf8',
    )
  }

  return { ok: true, batchId: batch.batchId, restored, failed, reattached: [], rearchived: [] }
}

/**
 * Drop the oldest batches once the bin exceeds its limits.
 *
 * This is one of only two paths that removes a stored log for good (the other
 * is an explicit {@link purgeBatch}), which is why the limits are explicit
 * arguments rather than constants: the caller owns the retention promise it
 * makes to the user.
 */
export async function sweepTrash(
  limits: { maxBatches?: number; maxAgeDays?: number } = {},
  dshHome = resolveDshHome(),
): Promise<SweepResult> {
  const { maxBatches = 20, maxAgeDays = 30 } = limits
  const batches = await listBatches(dshHome)
  const cutoff = Date.now() - maxAgeDays * 24 * 60 * 60 * 1000
  const doomed = batches
    .filter((batch, index) => index >= maxBatches || Date.parse(batch.deletedAt) < cutoff)
    .map(batch => batch.batchId)

  let reclaimedBytes = 0
  for (const batchId of doomed) {
    const batchDir = join(trashRoot(dshHome), batchId)
    reclaimedBytes += await directorySize(batchDir)
    await rm(batchDir, { recursive: true, force: true })
  }
  return { removedBatches: doomed, reclaimedBytes }
}

/**
 * Erase one named batch for good.
 *
 * The id is validated before it is joined: a caller that echoes a stale row
 * gets a refusal instead of a path traversal, and a batch the bin no longer
 * holds answers with its own code rather than pretending the purge happened.
 *
 * @param batchId - the batch to erase.
 * @param dshHome - dsh home override, for tests.
 * @returns the bytes freed, or a failure code.
 */
export async function purgeBatch(batchId: string, dshHome = resolveDshHome()): Promise<PurgeResult> {
  const root = trashRoot(dshHome)
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(batchId) || dirname(join(root, batchId)) !== root) {
    return { ok: false, error: { code: 'invalid-batch-id' } }
  }
  const batchDir = join(root, batchId)
  if (!existsSync(batchDir)) return { ok: false, error: { code: 'batch-not-found', batchId } }
  const reclaimedBytes = await directorySize(batchDir)
  await rm(batchDir, { recursive: true, force: true })
  return { ok: true, batchId, reclaimedBytes }
}

/**
 * Every Session currently in the bin, newest batch first.
 *
 * @param dshHome - dsh home override, for tests.
 * @returns one row per trashed Session.
 */
export async function listTrashedSessions(dshHome = resolveDshHome()): Promise<TrashedSession[]> {
  const batches = await listBatches(dshHome)
  const rows: TrashedSession[] = []
  for (const batch of batches) {
    for (const entry of batch.entries) {
      rows.push({
        sessionId: entry.sessionId,
        batchId: batch.batchId,
        deletedAt: batch.deletedAt,
        bytes: entry.sizeBytes,
        container: entry.container,
      })
    }
  }
  return rows
}

/**
 * Inflate a stored log that may be spread over several zstd frames.
 *
 * The harness appends one frame per flush, so a real log is a concatenation of
 * independent frames rather than one stream. `zstdDecompressSync` reads only
 * the first, so this walks every magic number and joins the results. A frame
 * that fails to inflate is a torn tail (the write path truncates it on the
 * next append) and is dropped instead of failing the read.
 *
 * @param buffer - raw bytes of a `.jsonl.zstd` file.
 * @returns the concatenated plain text.
 */
export function decompressSessionLog(buffer: Buffer): string {
  const MAGIC = [0x28, 0xb5, 0x2f, 0xfd]
  const offsets: number[] = []
  for (let index = 0; index + 4 <= buffer.length; index += 1) {
    if (buffer[index] === MAGIC[0] && buffer[index + 1] === MAGIC[1]
      && buffer[index + 2] === MAGIC[2] && buffer[index + 3] === MAGIC[3]) offsets.push(index)
  }
  if (offsets.length === 0) {
    try {
      return zlib.zstdDecompressSync(buffer).toString('utf8')
    } catch {
      return ''
    }
  }
  const parts: string[] = []
  for (const [index, offset] of offsets.entries()) {
    const end = offsets[index + 1] ?? buffer.length
    try {
      parts.push(zlib.zstdDecompressSync(buffer.subarray(offset, end)).toString('utf8'))
    } catch {
      // Torn tail; keep whatever the earlier frames gave us.
    }
  }
  return parts.join('')
}

/** Flatten one stored record to the text a reader should see. */
function recordText(record: Record<string, unknown>): string {
  const pieces: string[] = []
  const walk = (value: unknown): void => {
    if (typeof value === 'string') { pieces.push(value); return }
    if (Array.isArray(value)) { for (const item of value) walk(item); return }
    if (value === null || typeof value !== 'object') return
    const node = value as Record<string, unknown>
    if (node.type === 'image' || node.type === 'image_url') { pieces.push('[image]'); return }
    for (const key of ['content', 'text', 'name']) if (key in node) walk(node[key])
  }
  walk(record.data)
  return pieces.join(' ').replace(/\s+/g, ' ').trim()
}

/** Every write-tool path named by one stored record. */
function collectArtifactPaths(record: Record<string, unknown>): { path: string; ops: string }[] {
  const type = typeof record.type === 'string' ? record.type : ''
  if (type !== 'tool/call' && type !== 'assistant/chunk') return []
  const found: { path: string; ops: string }[] = []
  const walk = (value: unknown): void => {
    if (value === null || typeof value !== 'object') return
    if (Array.isArray(value)) { for (const item of value) walk(item); return }
    const node = value as Record<string, unknown>
    const ops = typeof node.name === 'string' ? node.name : (typeof node.toolName === 'string' ? node.toolName : undefined)
    const args = (node.arguments ?? node.args ?? node.input) as Record<string, unknown> | undefined
    if (ops !== undefined && args !== undefined && typeof args === 'object') {
      for (const key of WRITE_TOOL_PATHS[ops] ?? []) {
        const raw = args[key]
        if (typeof raw === 'string' && raw.trim() !== '') found.push({ path: raw, ops })
      }
    }
    for (const key of ['content', 'call', 'toolCall', 'data', 'chunks']) if (key in node) walk(node[key])
  }
  walk(record)
  return found
}

/** The stored record's working directory, if it recorded one. */
function collectCwd(record: Record<string, unknown>): string | undefined {
  const fromData = (record.data as Record<string, unknown> | undefined)?.cwd
  if (typeof fromData === 'string' && fromData !== '') return fromData
  if (typeof record.cwd === 'string' && record.cwd !== '') return record.cwd
  return undefined
}

/**
 * Prove a candidate path belongs to the conversation before moving it.
 *
 * Four refusals, in the order that keeps the destructive case first:
 * a path outside the workspace, a path that is the workspace itself, a path
 * under the harness home or the recycle bin, and a path that does not resolve
 * through symlinks to where it claims to be.
 *
 * @param displayPath - the path as the tool call recorded it.
 * @param cwd - the conversation's working directory.
 * @param dshHome - dsh home, never a legal target.
 * @returns `allowed` with the resolved path, or `refused` with the reason.
 */
async function classifyArtifact(
  displayPath: string,
  cwd: string,
  dshHome: string,
): Promise<{ allowed: AllowedArtifact } | { refused: RefusedArtifact }> {
  const absolute = displayPath.startsWith('/') || /^[A-Za-z]:[\\/]/.test(displayPath)
    ? displayPath
    : join(cwd, displayPath)
  let real: string
  let realCwd: string
  let realHome: string
  try {
    real = await realpath(absolute)
    realCwd = await realpath(cwd)
    realHome = await realpath(dshHome)
  } catch {
    return { refused: { path: displayPath, reason: 'unresolvable' } }
  }
  const within = (root: string): boolean => real === root || real.startsWith(root.endsWith(sep) ? root : root + sep)
  if (!within(realCwd) || real === realCwd) return { refused: { path: displayPath, reason: 'outside-workspace' } }
  if (within(realHome)) return { refused: { path: displayPath, reason: 'harness-home' } }
  const info = await stat(real).catch(() => undefined)
  if (info === undefined || !info.isFile()) return { refused: { path: displayPath, reason: 'not-a-file' } }
  return { allowed: { displayPath, path: real, bytes: info.size, ops: 'write' } }
}

/**
 * Compute what deleting one Session would take, without touching the disk.
 *
 * The scan is the contract the delete honours: whatever it lists under
 * `artifacts.allowed` is exactly what an artifacts-scoped delete moves, so the
 * confirmation the user sees and the bytes that disappear cannot diverge.
 *
 * @param sessionId - the stored Session id.
 * @param dshHome - dsh home override, for tests.
 * @returns the scan, including refusals and warnings.
 */
export async function scanSession(
  sessionId: StoredSessionId,
  dshHome = resolveDshHome(),
): Promise<DeleteScan> {
  const warnings: string[] = []
  const live = await locateSession(sessionId, dshHome)
  const trashed = live.length === 0 ? await locateTrashedSession(sessionId, dshHome) : undefined
  const dir = live[0]?.path ?? trashed?.path
  const base: DeleteScan = {
    ok: true,
    sessionId,
    cwd: null,
    store: { directories: live.length, bytes: 0 },
    artifacts: { allowed: [], refused: [], totalBytes: 0 },
    warnings,
  }
  if (dir === undefined) {
    warnings.push('session-log-not-found')
    return base
  }
  base.store.bytes = await directorySize(dir)
  if (trashed !== undefined) warnings.push('session-already-trashed')

  const names = await readdir(dir).catch(() => [] as string[])
  const file = names.find(name => name.endsWith('.jsonl.zstd')) ?? names.find(name => name.endsWith('.jsonl'))
  if (file === undefined) {
    warnings.push('transcript-missing')
    return base
  }
  const raw = await readFile(join(dir, file)).catch(() => undefined)
  if (raw === undefined) {
    warnings.push('transcript-unreadable')
    return base
  }
  const text = file.endsWith('.zstd') ? decompressSessionLog(raw) : raw.toString('utf8')

  let cwd: string | undefined
  const candidates: { path: string; ops: string }[] = []
  for (const line of text.split('\n')) {
    if (line.trim() === '') continue
    let record: Record<string, unknown>
    try { record = JSON.parse(line) as Record<string, unknown> } catch { continue }
    cwd ??= collectCwd(record)
    candidates.push(...collectArtifactPaths(record))
  }
  if (cwd === undefined) {
    warnings.push('cwd-unknown')
    return base
  }
  base.cwd = cwd

  const seen = new Set<string>()
  for (const candidate of candidates) {
    const verdict = await classifyArtifact(candidate.path, cwd, dshHome)
    if ('refused' in verdict) {
      if (!seen.has('refused:' + candidate.path)) {
        seen.add('refused:' + candidate.path)
        base.artifacts.refused.push(verdict.refused)
      }
      continue
    }
    if (seen.has('allowed:' + verdict.allowed.path)) continue
    seen.add('allowed:' + verdict.allowed.path)
    base.artifacts.allowed.push(verdict.allowed)
    base.artifacts.totalBytes += verdict.allowed.bytes
  }
  return base
}

/**
 * Read one stored Session's transcript, live or trashed.
 *
 * @param sessionId - the stored Session id.
 * @param limit - newest messages to keep.
 * @param dshHome - dsh home override, for tests.
 * @returns the readable rows plus whether the log was found and where.
 */
export async function readTranscript(
  sessionId: StoredSessionId,
  limit = 200,
  dshHome = resolveDshHome(),
): Promise<TranscriptReport> {
  const empty: TranscriptReport = { sessionId, found: false, trashed: false, total: 0, toolCalls: 0, messages: [] }
  const live = await locateSession(sessionId, dshHome)
  const trashed = live.length === 0 ? await locateTrashedSession(sessionId, dshHome) : undefined
  const dir = live[0]?.path ?? trashed?.path
  if (dir === undefined) return empty

  const names = await readdir(dir).catch(() => [] as string[])
  const file = names.find(name => name.endsWith('.jsonl.zstd')) ?? names.find(name => name.endsWith('.jsonl'))
  if (file === undefined) return { ...empty, found: true, trashed: trashed !== undefined }
  const raw = await readFile(join(dir, file)).catch(() => undefined)
  if (raw === undefined) return { ...empty, found: true, trashed: trashed !== undefined }
  const text = file.endsWith('.zstd') ? decompressSessionLog(raw) : raw.toString('utf8')

  const messages: TranscriptMessage[] = []
  let total = 0
  let toolCalls = 0
  for (const line of text.split('\n')) {
    if (line.trim() === '') continue
    let record: Record<string, unknown>
    try { record = JSON.parse(line) as Record<string, unknown> } catch { continue }
    const type = typeof record.type === 'string' ? record.type : ''
    if (type === 'tool/call') { toolCalls += 1; continue }
    if (!TRANSCRIPT_TYPES.has(type)) continue
    total += 1
    const body = recordText(record)
    const time = typeof record.time === 'number' ? record.time : undefined
    messages.push({
      role: type.startsWith('user') ? 'user' : 'assistant',
      type,
      text: body.length > 4000 ? body.slice(0, 4000) + '...' : body,
      ...(time === undefined ? {} : { time }),
    })
  }
  return {
    sessionId,
    found: true,
    trashed: trashed !== undefined,
    total,
    toolCalls,
    messages: limit > 0 ? messages.slice(-limit) : messages,
  }
}

/**
 * Encode a Workspace path into the directory name the harness uses.
 *
 * Kept byte-identical to the harness's own scheme: every character outside
 * `[A-Za-z0-9]` becomes `-`, and a leading dash is added so the name can never
 * collide with a literal directory.
 *
 * @param workspacePath - absolute Workspace path.
 * @returns the encoded container name.
 */
export function encodeWorkspacePath(workspacePath: string): string {
  // Each ASCII separator becomes exactly one dash; any other non-alphanumeric
  // character (including a space) becomes `~<four lowercase hex digits>` of its
  // code unit, so a name can never be mistaken for a quoted container. The
  // mapping was read back off the live `sessions/` tree, where
  // `C:\Users\ASUS 98\.dsh\bili-duty` is `--C-Users-ASUS~002098-.dsh-bili-duty--`
  // and `D:\OneDrive\文档\x` is `--D-OneDrive-~6587~6863-x--`.
  const encodeChar = (char: string): string => {
    if (/[A-Za-z0-9]/.test(char)) return char
    // A space keeps its own quoted form so it can never be confused with the
    // separators around it, and a dot survives verbatim: the harness stores
    // `ASUS 98\\.dsh` as `ASUS~002098-.dsh`, i.e. the blank becomes `~0020`,
    // the separator after it collapses into one dash, and the dot stays.
    if (char === ' ') return '~0020'
    if (char === '.') return '.'
    const code = char.charCodeAt(0)
    if (code < 0x80) return '-'
    return '~' + code.toString(16).padStart(4, '0')
  }
  // Runs of dashes collapse into one: `E:\AI\DSH` has a colon plus a separator
  // between every segment, and the harness stores it as `--E-AI-DSH--`, so the
  // colon does not get a dash of its own.
  const encoded = Array.from(workspacePath, encodeChar).join('').replace(/-+/g, '-')
  return '--' + encoded + '--'
}

/** The container name a stored Session path is nested under. */
export function containerOf(sessionPath: string): string {
  return sessionPath.split(/[\\/]/).slice(-2, -1)[0] ?? ''
}
