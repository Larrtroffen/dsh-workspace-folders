/**
 * Browser object layer for durable Workspace-scoped Session categories.
 * @module @deepseek-ai/dsh-client-ui-session-categories/client/controller
 */
import type { HostObservable } from '@deepseek-ai/dsh-client-ui-slots'
import type { RemoteFailure, RemoteResult, TypertClientRemote } from '@deepseek-ai/dsh-typert-protocol'
import type { SessionId } from '@deepseek-ai/dsh-session/types'
import type { WorkspaceId } from '@deepseek-ai/dsh-workspace'
import type {
  SessionCategoryFailure, SessionCategoryId, SessionCategoryMutationResult,
  SessionCategoryOperationId, SessionCategorySnapshot,
} from '@deepseek-ai/dsh-session-categories/types'
import type {} from '@deepseek-ai/dsh-session-categories/remote'
import type { RecycledBatchSummary, TranscriptMessage, TrashedSessionSummary } from './contract/slots.ts'

/** Generated Session categories Remote methods used by the client controller. */
export type SessionCategoriesRemote = TypertClientRemote['sessionCategories']

/** Controller load state across every requested Workspace. */
export type SessionCategoriesStatus = 'cold' | 'loading' | 'ready' | 'error'

/** Immutable category snapshots keyed by Workspace id. */
export interface SessionCategoriesView {
  readonly status: SessionCategoriesStatus
  readonly snapshots: Readonly<Record<string, SessionCategorySnapshot>>
  readonly error: string | null
}

/** Settled controller action returned to presentation callbacks. */
export type SessionCategoriesActionResult =
  | { readonly ok: true }
  | { readonly ok: false; readonly error: SessionCategoryFailure | { readonly code: string; readonly message: string } }

type SessionCategoriesActionFailure = Exclude<SessionCategoriesActionResult, { ok: true }>

/** Minimal BroadcastChannel face used for browser refresh fan-out. */
export interface SessionCategoriesChannel {
  onmessage: ((event: MessageEvent<unknown>) => void) | null
  postMessage(message: unknown): void
  close(): void
}

interface EventTargetLike {
  addEventListener(type: string, listener: () => void): void
  removeEventListener(type: string, listener: () => void): void
}

interface DocumentTargetLike extends EventTargetLike { readonly visibilityState: string }

/** Browser dependencies replaceable by controller unit tests. */
export interface SessionCategoriesControllerOptions {
  readonly channelFactory?: (() => SessionCategoriesChannel) | undefined
  readonly windowTarget?: EventTargetLike | undefined
  readonly documentTarget?: DocumentTargetLike | undefined
}

const INITIAL_VIEW: SessionCategoriesView = Object.freeze({ status: 'cold', snapshots: Object.freeze({}), error: null })
const OK: SessionCategoriesActionResult = Object.freeze({ ok: true })
const DISPOSED: SessionCategoriesActionResult = Object.freeze({
  ok: false,
  error: Object.freeze({ code: 'disposed', message: 'session categories controller is disposed' }),
})

function transportFailure(error: unknown, fallback: string): SessionCategoriesActionFailure {
  if (typeof error === 'object' && error !== null && 'code' in error && 'message' in error) {
    const carried = error as { code: string; message: string }
    return { ok: false, error: { code: carried.code, message: carried.message } }
  }
  return { ok: false, error: { code: 'transport', message: error instanceof Error ? error.message : fallback } }
}

function errorMessage(result: SessionCategoriesActionFailure): string {
  return 'message' in result.error ? result.error.message : result.error.code
}

function sameSnapshot(left: SessionCategorySnapshot | undefined, right: SessionCategorySnapshot): boolean {
  if (left === right) return true
  if (left === undefined || left.revision !== right.revision) return false
  if (left.categories.length !== right.categories.length || left.assignments.length !== right.assignments.length) return false
  return left.categories.every((category, index) => {
    const other = right.categories[index]
    return other !== undefined && category.id === other.id && category.workspaceId === other.workspaceId
      && category.parentId === other.parentId && category.title === other.title && category.order === other.order
  }) && left.assignments.every((assignment, index) => {
    const other = right.assignments[index]
    return other !== undefined && assignment.sessionId === other.sessionId && assignment.categoryId === other.categoryId
  })
}

function isRefreshMessage(value: unknown): value is { type: 'refresh'; workspaceId: string } {
  return typeof value === 'object' && value !== null && (value as { type?: unknown }).type === 'refresh'
    && typeof (value as { workspaceId?: unknown }).workspaceId === 'string'
}

/** Stable observable and serialized Remote client for all loaded Workspaces. */
export class SessionCategoriesController implements HostObservable<SessionCategoriesView> {
  private view = INITIAL_VIEW
  private readonly listeners = new Set<() => void>()
  private readonly loads = new Map<WorkspaceId, Promise<SessionCategoriesActionResult>>()
  private operationTail: Promise<void> = Promise.resolve()
  private readonly channel: SessionCategoriesChannel | undefined
  private readonly windowTarget: EventTargetLike | undefined
  private readonly documentTarget: DocumentTargetLike | undefined
  private disposed = false

  /**
   * @param remote - generated `sessionCategories` Remote namespace.
   * @param options - replaceable browser event and channel dependencies.
   */
  constructor(private readonly remote: SessionCategoriesRemote, options: SessionCategoriesControllerOptions = {}) {
    const defaultChannelFactory = typeof window === 'undefined' || typeof BroadcastChannel === 'undefined'
      ? undefined
      : (): SessionCategoriesChannel => new BroadcastChannel('dsh.session-categories.v1')
    this.channel = (options.channelFactory ?? defaultChannelFactory)?.()
    this.windowTarget = options.windowTarget ?? (typeof window === 'undefined' ? undefined : window)
    this.documentTarget = options.documentTarget ?? (typeof document === 'undefined' ? undefined : document)
    if (this.channel !== undefined) this.channel.onmessage = this.onChannelMessage
    this.windowTarget?.addEventListener('focus', this.onFocus)
    this.documentTarget?.addEventListener('visibilitychange', this.onVisibilityChange)
  }

  /** Return the cached immutable view. */
  getSnapshot = (): SessionCategoriesView => this.view

  /** Subscribe to view replacements. */
  subscribe = (listener: () => void): (() => void) => {
    if (this.disposed) return () => undefined
    this.listeners.add(listener)
    return () => { this.listeners.delete(listener) }
  }

  /** Load a Workspace once, sharing an in-flight read. */
  ensure(workspaceId: WorkspaceId): Promise<SessionCategoriesActionResult> {
    if (this.disposed) return Promise.resolve(DISPOSED)
    if (this.view.snapshots[workspaceId] !== undefined) return Promise.resolve(OK)
    return this.refresh(workspaceId)
  }

  /** Re-read one Workspace, sharing an in-flight read. */
  refresh(workspaceId: WorkspaceId): Promise<SessionCategoriesActionResult> {
    if (this.disposed) return Promise.resolve(DISPOSED)
    const existing = this.loads.get(workspaceId)
    if (existing !== undefined) return existing
    this.publish({ status: 'loading', snapshots: this.view.snapshots, error: null })
    const pending = this.load(workspaceId)
    this.loads.set(workspaceId, pending)
    return pending.finally(() => { this.loads.delete(workspaceId) })
  }

  /** Re-read every Workspace already represented in the view. */
  async resyncLoaded(): Promise<void> {
    if (this.disposed) return
    await this.enqueue(async () => {
      await Promise.all(Object.keys(this.view.snapshots).map(async workspaceId => {
        await this.refresh(workspaceId as WorkspaceId)
      }))
      return OK
    })
  }

  /** Create a category within one Workspace. */
  create(workspaceId: WorkspaceId, parentId: SessionCategoryId | null, title: string, beforeCategoryId?: SessionCategoryId): Promise<SessionCategoriesActionResult> {
    return this.mutate(workspaceId, revision => this.remote.create({
      workspaceId, parentId, title, ...(beforeCategoryId === undefined ? {} : { beforeCategoryId }), expectedRevision: revision,
    }))
  }

  /** Rename a loaded category. */
  rename(categoryId: SessionCategoryId, title: string): Promise<SessionCategoriesActionResult> {
    return this.mutateCategory(categoryId, revision => this.remote.rename({ categoryId, title, expectedRevision: revision }))
  }

  /** Move a loaded category to another parent and ordered position. */
  moveCategory(categoryId: SessionCategoryId, parentId: SessionCategoryId | null, beforeCategoryId?: SessionCategoryId): Promise<SessionCategoriesActionResult> {
    return this.mutateCategory(categoryId, revision => this.remote.moveCategory({
      categoryId, parentId, ...(beforeCategoryId === undefined ? {} : { beforeCategoryId }), expectedRevision: revision,
    }))
  }

  /** Reorder a loaded category among its siblings. */
  reorderCategory(categoryId: SessionCategoryId, beforeCategoryId?: SessionCategoryId): Promise<SessionCategoriesActionResult> {
    return this.mutateCategory(categoryId, revision => this.remote.reorderCategory({
      categoryId, ...(beforeCategoryId === undefined ? {} : { beforeCategoryId }), expectedRevision: revision,
    }))
  }

  /** Set or clear category membership for Sessions in one Workspace. */
  assignSessions(workspaceId: WorkspaceId, sessionIds: readonly SessionId[], categoryId: SessionCategoryId | null): Promise<SessionCategoriesActionResult> {
    return this.mutate(workspaceId, revision => this.remote.moveSessions({ sessionIds, categoryId, expectedRevision: revision }))
  }

  /** Recursively delete one loaded category using a retry-stable operation id. */
  deleteCategory(categoryId: SessionCategoryId, operationId: SessionCategoryOperationId): Promise<SessionCategoriesActionResult> {
    return this.mutateCategory(categoryId, revision => this.remote.deleteCategory({ categoryId, operationId, expectedRevision: revision }))
  }

  // #region Session recycling
  //
  // These verbs address stored Session logs rather than the category document,
  // so they bypass the revision queue that guards category mutations: a log
  // move cannot conflict with a category edit. They still refuse work after
  // disposal, and a failure is returned rather than thrown so the browser can
  // put the Host's own code in front of the user.
  //
  // They travel over the plugin's own typert Remote namespace, like every other
  // verb on this controller. The Host half registers them next to the category
  // methods and the client namespace is generated from that same face, so the
  // call arrives at a mounted method instead of a route no Host plugin serves.
  // The wire vocabulary lives in \`dsh-session-keeper/types\`; only the names the
  // presentation layer speaks (\`reclaimedBytes\`, \`removedBatchIds\`) differ, and
  // the translation happens here rather than in the components.

  /**
   * Turn one Remote failure into the code string the verbs report.
   *
   * @param carried - the error branch of a Remote result.
   * @param fallback - code used when the failure carries no usable code.
   * @returns the Host's stable failure code.
   */
  private static codeOf(carried: RemoteFailure | undefined, fallback: string): string {
    if (carried === undefined) return fallback
    const code = (carried as { code?: unknown }).code
    return typeof code === 'string' && code !== '' ? code : fallback
  }

  /**
   * Move one Session's stored log into the recycle bin.
   *
   * @param sessionId - the Session whose log should move.
   * @param scope - how much to move: the stored log only, or also the files the
   *   Session wrote inside its working directory. The Host re-derives the
   *   artifact list itself, so this only chooses among the Host's own plan.
   * @returns the batch id and byte count, or the Host's failure code.
   */
  async deleteSession(sessionId: SessionId, scope: 'record' | 'artifacts' = 'record'): Promise<
    { ok: true; value: { batchId: string; reclaimedBytes: number; artifactCount: number } } | { ok: false; error: { code: string; sessionId?: string } }
  > {
    if (this.disposed) return { ok: false, error: { code: 'disposed' } }
    let carried
    try {
      carried = await this.remote.deleteSessions({ sessionIds: [sessionId], scope })
    } catch {
      return { ok: false, error: { code: 'route-failed', sessionId } }
    }
    if (!carried.ok) return { ok: false, error: { code: SessionCategoriesController.codeOf(carried.error, 'delete-failed'), sessionId } }
    const result = carried.value
    if (result === undefined || result.ok !== true) {
      return { ok: false, error: { code: (result as { error?: { code?: string } } | undefined)?.error?.code ?? 'delete-failed', sessionId } }
    }
    // The Session is gone from the browser's point of view, so drop any
    // category assignment the snapshot still carries before the Host's own
    // prune echoes back.
    for (const workspaceId of Object.keys(this.view.snapshots)) this.pruneAssignment(workspaceId, sessionId)
    return {
      ok: true,
      value: {
        batchId: result.value.batchId,
        reclaimedBytes: result.value.bytes,
        artifactCount: result.value.artifactCount,
      },
    }
  }

  /**
   * Ask the Host what a delete of this Session would move.
   *
   * The reply renders in the confirmation dialog: the stored log's directories
   * and size, every artifact the Host would additionally move, and the reason
   * each refused candidate was refused. Nothing is deleted by this call.
   *
   * @param sessionId - the Session the user asked to delete.
   * @returns the scan report, or a failure shaped like the other verbs'.
   */
  async scanSession(sessionId: SessionId): Promise<
    | {
      ok: true
      value: {
        cwd: string | null
        store: { directories: readonly string[]; bytes: number }
        artifacts: { allowed: readonly { displayPath: string; bytes: number }[]; refused: readonly { path: string; reason: string }[]; totalBytes: number }
        warnings: readonly string[]
      }
    }
    | { ok: false; error: { code: string; sessionId?: string } }
  > {
    if (this.disposed) return { ok: false, error: { code: 'disposed' } }
    let carried
    try {
      carried = await this.remote.scanSession({ sessionId })
    } catch {
      return { ok: false, error: { code: 'route-failed', sessionId } }
    }
    if (!carried.ok) return { ok: false, error: { code: SessionCategoriesController.codeOf(carried.error, 'scan-failed'), sessionId } }
    const result = carried.value
    if (result === undefined || result.ok !== true) {
      return { ok: false, error: { code: (result as { error?: { code?: string } } | undefined)?.error?.code ?? 'scan-failed', sessionId } }
    }
    const report = result.value
    // The wire reports the stored log's directory count and the artifact byte
    // total; the dialog wants the directories themselves named, and folds the
    // artifact list under one byte count of its own.
    return {
      ok: true,
      value: {
        cwd: report.cwd,
        store: { directories: [], bytes: report.storeBytes },
        artifacts: {
          allowed: report.artifacts.map(artifact => ({ displayPath: artifact.displayPath, bytes: artifact.bytes })),
          refused: report.refused.map(row => ({ path: row.path, reason: row.reason })),
          totalBytes: report.artifactBytes,
        },
        warnings: report.warnings,
      },
    }
  }

  /**
   * Put the most recently deleted batch back.
   *
   * @returns the restored ids plus any entry that could not return.
   */
  async undoDeleteSession(): Promise<
    | { ok: true; value: { restored: readonly SessionId[]; failed: readonly { sessionId: SessionId; reason: string }[] } }
    | { ok: false; error: { code: string } }
  > {
    if (this.disposed) return { ok: false, error: { code: 'disposed' } }
    let carried
    try {
      carried = await this.remote.undoDeleteSessions({})
    } catch {
      return { ok: false, error: { code: 'route-failed' } }
    }
    if (!carried.ok) return { ok: false, error: { code: SessionCategoriesController.codeOf(carried.error, 'undo-failed') } }
    const result = carried.value
    if (result === undefined || result.ok !== true) {
      return { ok: false, error: { code: (result as { error?: { code?: string } } | undefined)?.error?.code ?? 'undo-failed' } }
    }
    // Restored Sessions reappear through the Workspace registry, so reload
    // every loaded Workspace rather than guessing which one owns them.
    await this.resyncLoaded()
    return { ok: true, value: { restored: result.value.restored, failed: result.value.failed } }
  }

  /**
   * Report the recycle bin's contents.
   *
   * @returns every undoable batch, newest first; an empty list on failure.
   */
  async listRecycledSessions(): Promise<readonly RecycledBatchSummary[]> {
    if (this.disposed) return []
    let carried
    try {
      carried = await this.remote.listRecycledSessions()
    } catch {
      return []
    }
    if (!carried.ok) return []
    const result = carried.value
    if (result === undefined || result.ok !== true) return []
    const rows = result.value.batches
    return rows
      .filter(batch => typeof batch?.batchId === 'string')
      .map(batch => ({
        batchId: batch.batchId,
        deletedAt: batch.deletedAt,
        sessionIds: batch.sessionIds,
        bytes: batch.bytes,
      }))
  }

  /**
   * Read one Session's stored transcript so the settings page can show what a
   * Session actually contains before it is deleted.
   * @param sessionId - the stored Session to read.
   * @param limit - newest messages to keep.
   * @returns the message rows, or an empty list when the log is gone.
   */
  async readTranscript(sessionId: SessionId, limit = 200): Promise<readonly TranscriptMessage[]> {
    if (this.disposed) return []
    let carried
    try {
      carried = await this.remote.readTranscript({ sessionId, limit })
    } catch {
      return []
    }
    if (!carried.ok) return []
    const result = carried.value
    if (result === undefined || result.ok !== true) return []
    return result.value.messages
      .filter(message => typeof message?.text === 'string')
      .map(message => ({
        role: message.role,
        type: message.type,
        text: message.text,
        ...(message.time === undefined ? {} : { time: message.time }),
      }))
  }

  /**
   * List the Sessions currently sitting in the recycle bin.
   * @returns one row per trashed Session, newest batch first.
   */
  async listTrashedSessions(): Promise<readonly TrashedSessionSummary[]> {
    if (this.disposed) return []
    let carried
    try {
      carried = await this.remote.listTrashedSessions()
    } catch {
      return []
    }
    if (!carried.ok) return []
    const result = carried.value
    if (result === undefined || result.ok !== true) return []
    return result.value.sessions
      .filter(row => typeof row?.sessionId === 'string')
      .map(row => ({
        sessionId: row.sessionId,
        batchId: row.batchId,
        deletedAt: row.deletedAt,
        bytes: row.bytes,
        container: row.container,
      }))
  }

  /**
   * Erase one named batch from the recycle bin for good.
   *
   * This is the only irreversible thing the plugin offers, so it is spelled out
   * as its own verb rather than folded into "undo" or "sweep": the page knows
   * which row the user confirmed and names exactly that batch. The Host refuses
   * an id that is not a batch it is holding, so a stale row answers a failure
   * instead of silently reporting a purge that never happened.
   *
   * @param batchId - the batch the user confirmed.
   * @returns the reclaimed byte count, or the Host's failure code.
   */
  async purgeBatch(batchId: string): Promise<
    { ok: true; value: { batchId: string; reclaimedBytes: number } } | { ok: false; error: { code: string } }
  > {
    if (this.disposed) return { ok: false, error: { code: 'disposed' } }
    let carried
    try {
      carried = await this.remote.purgeBatch({ batchId })
    } catch {
      return { ok: false, error: { code: 'route-failed' } }
    }
    if (!carried.ok) return { ok: false, error: { code: SessionCategoriesController.codeOf(carried.error, 'purge-failed') } }
    const result = carried.value
    if (result === undefined || result.ok !== true) {
      return { ok: false, error: { code: (result as { error?: { code?: string } } | undefined)?.error?.code ?? 'purge-failed' } }
    }
    return { ok: true, value: { batchId: result.value.batchId, reclaimedBytes: result.value.reclaimedBytes } }
  }

  /**
   * Drop every batch past the retention policy.
   *
   * The arguments describe the policy, not a list of victims: the Host decides
   * which batches fall outside it. Callers that want one specific row gone use
   * {@link purgeBatch} instead.
   *
   * @param maxBatches - how many newest batches to keep.
   * @param maxAgeDays - how many days a batch stays restorable.
   * @returns the erased ids and the space they held.
   */
  async sweepTrash(maxBatches?: number, maxAgeDays?: number): Promise<
    { ok: true; value: { removedBatchIds: readonly string[]; reclaimedBytes: number } } | { ok: false; error: { code: string } }
  > {
    if (this.disposed) return { ok: false, error: { code: 'disposed' } }
    let carried
    try {
      carried = await this.remote.sweepRecycledSessions({
        ...(maxBatches === undefined ? {} : { maxBatches }),
        ...(maxAgeDays === undefined ? {} : { maxAgeDays }),
      })
    } catch {
      return { ok: false, error: { code: 'route-failed' } }
    }
    if (!carried.ok) return { ok: false, error: { code: SessionCategoriesController.codeOf(carried.error, 'sweep-failed') } }
    const result = carried.value
    if (result === undefined || result.ok !== true) {
      return { ok: false, error: { code: (result as { error?: { code?: string } } | undefined)?.error?.code ?? 'sweep-failed' } }
    }
    return {
      ok: true,
      value: { removedBatchIds: result.value.removedBatches, reclaimedBytes: result.value.reclaimedBytes },
    }
  }

  /** Drop one Session from every loaded snapshot's assignments. */
  private pruneAssignment(workspaceId: WorkspaceId, sessionId: SessionId): void {
    const snapshot = this.view.snapshots[workspaceId]
    if (snapshot === undefined) return
    const assignments = snapshot.assignments.filter(assignment => assignment.sessionId !== sessionId)
    if (assignments.length === snapshot.assignments.length) return
    this.publish({ ...this.view, snapshots: { ...this.view.snapshots, [workspaceId]: { ...snapshot, assignments } } })
  }
  // #endregion

  /** Remove browser listeners, close the channel, and refuse later work. */
  dispose(): void {
    if (this.disposed) return
    this.disposed = true
    this.listeners.clear()
    this.windowTarget?.removeEventListener('focus', this.onFocus)
    this.documentTarget?.removeEventListener('visibilitychange', this.onVisibilityChange)
    if (this.channel !== undefined) {
      this.channel.onmessage = null
      this.channel.close()
    }
  }

  private readonly onFocus = (): void => { void this.resyncLoaded() }
  private readonly onVisibilityChange = (): void => {
    if (this.documentTarget?.visibilityState === 'visible') void this.resyncLoaded()
  }
  private readonly onChannelMessage = (event: MessageEvent<unknown>): void => {
    if (!isRefreshMessage(event.data) || this.view.snapshots[event.data.workspaceId] === undefined) return
    void this.refresh(event.data.workspaceId as WorkspaceId)
  }

  private async load(workspaceId: WorkspaceId): Promise<SessionCategoriesActionResult> {
    try {
      const carried = await this.remote.get({ workspaceId })
      if (this.disposed) return DISPOSED
      if (!carried.ok) return this.failLoad(transportFailure(carried.error, 'session categories read failed'))
      if (!carried.value.ok) return this.failLoad({ ok: false, error: carried.value.error })
      this.commit(workspaceId, carried.value.value)
      return OK
    } catch (error) {
      if (this.disposed) return DISPOSED
      return this.failLoad(transportFailure(error, 'session categories read failed'))
    }
  }

  private failLoad(result: SessionCategoriesActionFailure): SessionCategoriesActionResult {
    this.publish({ status: 'error', snapshots: this.view.snapshots, error: errorMessage(result) })
    return result
  }

  private mutateCategory(
    categoryId: SessionCategoryId,
    operation: (revision: number) => Promise<RemoteResult<SessionCategoryMutationResult>>,
  ): Promise<SessionCategoriesActionResult> {
    return this.enqueue(async () => {
      const workspaceId = this.workspaceForCategory(categoryId)
      if (workspaceId === undefined) {
        return { ok: false, error: { code: 'category-not-loaded', message: 'category is not loaded' } }
      }
      return await this.mutateNow(workspaceId, operation)
    })
  }

  private mutate(
    workspaceId: WorkspaceId,
    operation: (revision: number) => Promise<RemoteResult<SessionCategoryMutationResult>>,
  ): Promise<SessionCategoriesActionResult> {
    return this.enqueue(async () => await this.mutateNow(workspaceId, operation))
  }

  private enqueue(operation: () => Promise<SessionCategoriesActionResult>): Promise<SessionCategoriesActionResult> {
    const guarded = async (): Promise<SessionCategoriesActionResult> => {
      if (this.disposed) return DISPOSED
      try { return await operation() } catch (error) {
        return transportFailure(error, 'session categories mutation failed')
      }
    }
    const result = this.operationTail.then(guarded, guarded)
    this.operationTail = result.then(() => undefined)
    return result
  }

  private async mutateNow(
    workspaceId: WorkspaceId,
    operation: (revision: number) => Promise<RemoteResult<SessionCategoryMutationResult>>,
  ): Promise<SessionCategoriesActionResult> {
    const loaded = await this.ensure(workspaceId)
    if (!loaded.ok) return loaded
    if (this.disposed) return DISPOSED
    const current = this.view.snapshots[workspaceId]
    if (current === undefined) return { ok: false, error: { code: 'workspace-not-loaded', message: 'workspace is not loaded' } }
    const carried = await operation(current.revision)
    if (this.disposed) return DISPOSED
    if (!carried.ok) return transportFailure(carried.error, 'session categories mutation failed')
    const result = carried.value
    if (!result.ok) {
      if (result.error.code === 'revision-conflict') await this.refresh(workspaceId)
      return { ok: false, error: result.error }
    }
    this.commit(workspaceId, result.value)
    this.channel?.postMessage({ type: 'refresh', workspaceId })
    return OK
  }

  private workspaceForCategory(categoryId: SessionCategoryId): WorkspaceId | undefined {
    for (const [workspaceId, snapshot] of Object.entries(this.view.snapshots)) {
      if (snapshot.categories.some(category => category.id === categoryId)) return workspaceId as WorkspaceId
    }
    return undefined
  }

  private commit(workspaceId: WorkspaceId, snapshot: SessionCategorySnapshot): void {
    const current = this.view.snapshots[workspaceId]
    const snapshots = sameSnapshot(current, snapshot)
      ? this.view.snapshots
      : Object.freeze({ ...this.view.snapshots, [workspaceId]: Object.freeze(snapshot) })
    this.publish({ status: 'ready', snapshots, error: null })
  }

  private publish(next: SessionCategoriesView): void {
    if (this.disposed) return
    if (this.view.status === next.status && this.view.snapshots === next.snapshots && this.view.error === next.error) return
    this.view = Object.freeze(next)
    for (const listener of this.listeners) {
      try { listener() } catch (error) { console.error('[ui-session-categories] subscriber threw:', error) }
    }
  }
}
