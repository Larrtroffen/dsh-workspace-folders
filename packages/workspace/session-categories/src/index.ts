/** Host service for durable Workspace-scoped Session categories. */
import { randomUUID } from 'node:crypto'
import { join } from 'node:path'
import { Context, Service } from '@deepseek-ai/cordis'
import { TypertRemoteService, Remote } from '@deepseek-ai/dsh-typert-protocol'
import type { SessionId } from '@deepseek-ai/dsh-session/types'
import { WorkspaceUnknownSessionError } from '@deepseek-ai/dsh-workspace'
import type { WorkspaceId } from '@deepseek-ai/dsh-workspace'
import type { DomainGlobal } from '@deepseek-ai/dsh-storage-domain'
import { sessionCategoriesDomainSpec } from './spec.ts'
import {
  listBatches, listTrashedSessions, moveSessionLog, persistBatch, purgeBatch, readTranscript,
  recycleArtifacts, restoreBatch, scanSession, sweepTrash, trashRoot,
} from './recycle.ts'
import type { AllowedArtifact, RecycleBatch, RecycledSession, StoredSessionId } from './recycle.ts'
import type {
  SessionCategory, SessionCategoryAssignment, SessionCategoryCreateRequest,
  SessionCategoryDocument, SessionCategoryGetRequest, SessionCategoryGetResult,
  SessionCategoryId, SessionCategoryMutationResult, SessionCategoryMoveRequest,
  SessionCategoryMoveSessionsRequest, SessionCategoryRenameRequest,
  SessionCategoryReorderRequest, SessionCategoryAssignRequest,
  SessionCategoryDeleteRequest, PendingCategoryArchive,
} from './types.ts'
import type {
  SessionRecycleDeleteRequest, SessionRecycleDeleteResult, SessionRecycleListResult,
  SessionRecyclePurgeRequest, SessionRecyclePurgeResult, SessionRecycleScanRequest,
  SessionRecycleScanResult, SessionRecycleSweepRequest, SessionRecycleSweepResult,
  SessionRecycleTranscriptRequest, SessionRecycleTranscriptResult,
  SessionRecycleTrashedResult, SessionRecycleUndoRequest, SessionRecycleUndoResult,
} from './recycle-types.ts'

export type * from './recycle-types.ts'

export type * from './types.ts'
export { sessionCategoriesDomainSpec } from './spec.ts'

declare module '@deepseek-ai/cordis' {
  interface Context { sessionCategories: SessionCategoriesService }
}

type Reject = Exclude<SessionCategoryMutationResult, { ok: true }>
const reject = (error: Reject['error']): Reject => ({ ok: false, error })
const success = (value: SessionCategorySnapshot): SessionCategoryMutationResult => ({ ok: true, value })

/** Immutable Workspace-projected category state. */
export interface SessionCategorySnapshot {
  readonly revision: number
  readonly categories: readonly SessionCategory[]
  readonly assignments: readonly SessionCategoryAssignment[]
}
interface MutationPlan {
  readonly document: SessionCategoryDocument
  readonly workspaceId: WorkspaceId
  readonly material?: boolean
}

/** Remove source and insert it immediately before anchor, or append. */
export function insertBefore<T>(ids: readonly T[], source: T, anchor?: T): readonly T[] {
  const sourceIndex = ids.indexOf(source)
  if (sourceIndex < 0) return ids
  if (anchor !== undefined && ids.indexOf(anchor) < 0) return ids
  if (anchor === source) return ids
  const without = ids.filter(value => value !== source)
  const at = anchor === undefined ? without.length : without.indexOf(anchor)
  return [...without.slice(0, at), source, ...without.slice(at)]
}

/** Whether assigning a category below parent would create a parent-chain cycle. */
export function wouldCycle(categories: readonly SessionCategory[], categoryId: SessionCategoryId, parentId: SessionCategoryId | null): boolean {
  const byId = new Map(categories.map(category => [category.id, category]))
  let current = parentId
  while (current !== null) {
    if (current === categoryId) return true
    current = byId.get(current)?.parentId ?? null
  }
  return false
}

/** Durable category service. Mutations are serialized by one settled queue. */
export class SessionCategoriesService extends TypertRemoteService {
  static inject = ['storageDomain', 'workspaceRegistry']
  private global?: DomainGlobal<SessionCategoryDocument>
  private operationTail: Promise<void> = Promise.resolve()

  constructor(ctx: Context) { super(ctx, 'sessionCategories') }

  protected async [Service.init](): Promise<void> {
    const domain = await this.ctx.storageDomain.open(sessionCategoriesDomainSpec)
    this.global = domain.global
    this.ctx.effect(() => async () => { await domain.close() }, 'session-categories.domainClose')
    await this.recoverPending()
  }

  /** Read categories and assignments belonging to one Workspace. */
  @Remote('get')
  get(request: SessionCategoryGetRequest): SessionCategoryGetResult {
    const workspace = this.ctx.workspaceRegistry.get(request.workspaceId)
    if (workspace === undefined) return { ok: false, error: { code: 'workspace-not-found', workspaceId: request.workspaceId } }
    return { ok: true, value: this.snapshot(workspace.id) }
  }

  /** Create one category. */
  @Remote('create')
  create(request: SessionCategoryCreateRequest): Promise<SessionCategoryMutationResult> {
    return this.enqueue(() => this.mutate(request.expectedRevision, document => {
      const workspace = this.ctx.workspaceRegistry.get(request.workspaceId)
      if (workspace === undefined) return reject({ code: 'workspace-not-found', workspaceId: request.workspaceId })
      if (request.parentId !== null) {
        const parent = document.categories.find(category => category.id === request.parentId)
        if (parent === undefined) return reject({ code: 'parent-not-found', parentId: request.parentId })
        if (parent.workspaceId !== request.workspaceId) return reject({ code: 'cross-workspace' })
      }
      const siblings = document.categories.filter(category => category.workspaceId === request.workspaceId && category.parentId === request.parentId)
      if (request.beforeCategoryId !== undefined && !siblings.some(category => category.id === request.beforeCategoryId)) {
        return reject({ code: 'anchor-not-found', anchorId: request.beforeCategoryId })
      }
      const at = request.beforeCategoryId === undefined ? siblings.length : siblings.findIndex(category => category.id === request.beforeCategoryId)
      const id = randomUUID() as SessionCategoryId
      const created: SessionCategory = { id, workspaceId: request.workspaceId, parentId: request.parentId, title: request.title, order: at }
      const categories = [...document.categories, created].map(category => category.workspaceId === request.workspaceId && category.parentId === request.parentId && category.id !== id && category.order >= at
        ? { ...category, order: category.order + 1 } : category)
      return this.changed(request.workspaceId, { ...document, categories: [...categories] })
    }))
  }

  /** Rename one category. */
  @Remote('rename')
  rename(request: SessionCategoryRenameRequest): Promise<SessionCategoryMutationResult> {
    return this.enqueue(() => this.mutate(request.expectedRevision, document => {
      const category = document.categories.find(item => item.id === request.categoryId)
      if (category === undefined) return reject({ code: 'category-not-found', categoryId: request.categoryId })
      if (category.title === request.title) return this.noop(category.workspaceId, document)
      return this.changed(category.workspaceId, { ...document, categories: document.categories.map(item => item.id === category.id ? { ...item, title: request.title } : item) })
    }))
  }

  /** Move one category to another parent and/or sibling position. */
  @Remote('moveCategory')
  moveCategory(request: SessionCategoryMoveRequest): Promise<SessionCategoryMutationResult> {
    return this.enqueue(() => this.mutate(request.expectedRevision, document => {
      const category = document.categories.find(item => item.id === request.categoryId)
      if (category === undefined) return reject({ code: 'category-not-found', categoryId: request.categoryId })
      const parent = request.parentId === null ? undefined : document.categories.find(item => item.id === request.parentId)
      if (request.parentId !== null && parent === undefined) return reject({ code: 'parent-not-found', parentId: request.parentId })
      if (parent !== undefined && parent.workspaceId !== category.workspaceId) return reject({ code: 'cross-workspace' })
      if (wouldCycle(document.categories, category.id, request.parentId)) return reject({ code: 'cycle' })
      const siblings = document.categories.filter(item => item.workspaceId === category.workspaceId && item.parentId === request.parentId && item.id !== category.id).sort((a, b) => a.order - b.order)
      if (request.beforeCategoryId !== undefined && !siblings.some(item => item.id === request.beforeCategoryId)) return reject({ code: 'anchor-not-found', anchorId: request.beforeCategoryId })
      const at = request.beforeCategoryId === undefined ? siblings.length : siblings.findIndex(item => item.id === request.beforeCategoryId)
      const currentSiblings = document.categories.filter(item => item.workspaceId === category.workspaceId && item.parentId === category.parentId).sort((a, b) => a.order - b.order)
      const desiredIds = [...siblings.slice(0, at).map(item => item.id), category.id, ...siblings.slice(at).map(item => item.id)]
      if (category.parentId === request.parentId && desiredIds.every((id, index) => id === currentSiblings[index]?.id)) {
        return this.noop(category.workspaceId, document)
      }
      const remaining = document.categories.filter(item => item.id !== category.id)
      const groups = new Map<string, SessionCategory[]>()
      for (const item of remaining) {
        const key = `${item.workspaceId}\u0000${item.parentId ?? ''}`
        const group = groups.get(key) ?? []
        group.push(item)
        groups.set(key, group)
      }
      const oldKey = `${category.workspaceId}\u0000${category.parentId ?? ''}`
      const newKey = `${category.workspaceId}\u0000${request.parentId ?? ''}`
      for (const key of new Set([oldKey, newKey])) {
        const group = (groups.get(key) ?? []).sort((a, b) => a.order - b.order)
        const parentId = key.slice(key.indexOf('\u0000') + 1) || null
        const ordered = key === newKey
          ? [...group.slice(0, at), { ...category, parentId: request.parentId, order: at }, ...group.slice(at)]
          : group
        groups.set(key, ordered.map((item, index) => ({ ...item, order: index, parentId: parentId as SessionCategoryId | null })))
      }
      const touched = new Set([oldKey, newKey])
      const categories = remaining.filter(item => !touched.has(`${item.workspaceId}\u0000${item.parentId ?? ''}`))
      for (const key of touched) categories.push(...(groups.get(key) ?? []))
      return this.changed(category.workspaceId, { ...document, categories })
    }))
  }

  /** Reorder a category among current siblings. */
  @Remote('reorderCategory')
  reorderCategory(request: SessionCategoryReorderRequest): Promise<SessionCategoryMutationResult> {
    return this.enqueue(() => this.mutate(request.expectedRevision, document => {
      const category = document.categories.find(item => item.id === request.categoryId)
      if (category === undefined) return reject({ code: 'category-not-found', categoryId: request.categoryId })
      const siblings = document.categories.filter(item => item.workspaceId === category.workspaceId && item.parentId === category.parentId).sort((a, b) => a.order - b.order)
      if (request.beforeCategoryId !== undefined && !siblings.some(item => item.id === request.beforeCategoryId)) return reject({ code: 'anchor-not-found', anchorId: request.beforeCategoryId })
      const ids = insertBefore(siblings.map(item => item.id), category.id, request.beforeCategoryId)
      if (ids.every((id, index) => id === siblings[index]?.id)) return this.noop(category.workspaceId, document)
      const order = new Map(ids.map((id, index) => [id, index]))
      return this.changed(category.workspaceId, { ...document, categories: document.categories.map(item => order.has(item.id) ? { ...item, order: order.get(item.id)! } : item) })
    }))
  }

  /** Assign or clear one Session. */
  @Remote('assignSession')
  assignSession(request: SessionCategoryAssignRequest): Promise<SessionCategoryMutationResult> {
    return this.moveSessions({ ...request, sessionIds: [request.sessionId] })
  }

  /** Assign or clear multiple Sessions. */
  @Remote('moveSessions')
  moveSessions(request: SessionCategoryMoveSessionsRequest): Promise<SessionCategoryMutationResult> {
    return this.enqueue(() => this.mutate(request.expectedRevision, document => {
      let category: SessionCategory | undefined
      if (request.categoryId !== null) {
        category = document.categories.find(item => item.id === request.categoryId)
        if (category === undefined) return reject({ code: 'category-not-found', categoryId: request.categoryId })
      }
      const targetWorkspace = category === undefined ? undefined : this.ctx.workspaceRegistry.get(category.workspaceId)
      if (category !== undefined && targetWorkspace === undefined) return reject({ code: 'workspace-not-found', workspaceId: category.workspaceId })
      if (category !== undefined) for (const sessionId of request.sessionIds) if (!targetWorkspace!.sessionIds.includes(sessionId)) return reject({ code: 'session-not-in-workspace', sessionId })
      const assignments = request.sessionIds.reduce((items, sessionId) => {
        const without = items.filter(item => item.sessionId !== sessionId)
        return category === undefined ? without : [...without, { sessionId, categoryId: category.id }]
      }, [...document.assignments] as SessionCategoryAssignment[])
      const workspaceId = category?.workspaceId ?? this.workspaceForSession(request.sessionIds[0])
      if (assignments.length === document.assignments.length && assignments.every((item, index) => item.sessionId === document.assignments[index]?.sessionId && item.categoryId === document.assignments[index]?.categoryId)) {
        return workspaceId === undefined ? reject({ code: 'session-not-in-workspace', sessionId: request.sessionIds[0]! }) : this.noop(workspaceId, document)
      }
      return this.changed(workspaceId ?? '', { ...document, assignments })
    }))
  }

  /** Recursively remove a category after archiving its assigned Sessions. */
  @Remote('deleteCategory')
  deleteCategory(request: SessionCategoryDeleteRequest): Promise<SessionCategoryMutationResult> {
    return this.enqueue(async () => {
      const current = this.requireGlobal().get()
      const pending = current.pendingArchive.find(item => item.operationId === request.operationId)
      if (pending === undefined && current.revision !== request.expectedRevision) {
        return reject({ code: 'revision-conflict', revision: current.revision })
      }
      if (pending === undefined) {
        const target = current.categories.find(item => item.id === request.categoryId)
        if (target === undefined) return success({ revision: current.revision, categories: [], assignments: [] })
        const categoryIds = this.descendants(current.categories, target.id)
        const categorySet = new Set(categoryIds)
        const sessionIds = [...new Set(current.assignments.filter(item => categorySet.has(item.categoryId)).map(item => item.sessionId))]
        const nextPending: PendingCategoryArchive = { operationId: request.operationId, categoryIds, sessionIds }
        await this.requireGlobal().set({ ...current, revision: current.revision + 1, pendingArchive: [...current.pendingArchive, nextPending] })
        return this.finishArchive(nextPending)
      }
      return this.finishArchive(pending)
    })
  }

  /** Current full document for invariant companions. */
  snapshotAll(): SessionCategoryDocument { return this.requireGlobal().get() }

  // #region Session recycling
  //
  // The harness stores a Session's log under `<dshHome>/sessions/` and offers
  // no interface to remove one: persistence calls pruning "out-of-band backend
  // maintenance", and the workspace registry only archives. These four methods
  // supply that maintenance from the host side, where the filesystem is
  // reachable, and pair every delete with an undo.
  //
  // A delete never unlinks a log. It relocates the Session directory into a
  // dated recycle bin and writes a manifest naming the origin, so "undo"
  // restores the exact path the Session came from. Only the retention sweep
  // ever removes a log for good.

  /**
   * Move Sessions out of the live tree and into the recycle bin.
   *
   * @param request - the Sessions to remove, plus Workspace context for logs.
   * @returns the batch id to pass to `undoDeleteSessions`, or a failure code.
   */
  @Remote('deleteSessions')
  async deleteSessions(request: SessionRecycleDeleteRequest): Promise<SessionRecycleDeleteResult> {
    const scope = request.scope ?? 'record'
    const withArtifacts = scope === 'artifacts' || scope === 'everything'
    const workspace = request.workspaceId === undefined
      ? undefined
      : this.ctx.workspaceRegistry.get(request.workspaceId)
    const stamp = new Date().toISOString()
    const batchId = stamp.replace(/[:.]/g, '-')
    const batchDir = join(trashRoot(), batchId)
    const entries: RecycledSession[] = []
    const detachedFrom: string[] = []
    const wasArchived: StoredSessionId[] = []
    let artifacts: AllowedArtifact[] = []

    for (const sessionId of request.sessionIds) {
      // Archive first: a Session that is pinned or selected disappears from the
      // browser immediately, and archiving is the only signal the workspace
      // registry offers that survives a restart. The undo path always
      // un-archives, so an archive made here is a one-way door we then reopen.
      if (request.workspaceId !== undefined) {
        try {
          const entry = this.ctx.workspaceRegistry.get(request.workspaceId)
          if (entry.archivedSessionIds.includes(sessionId)) wasArchived.push(sessionId)
          else await entry.archiveSession(sessionId, { stopActivity: true })
          if (entry.sessionIds.includes(sessionId)) {
            await entry.detachSession(sessionId)
            detachedFrom.push(request.workspaceId)
          }
        } catch {
          // The log move below is the operation the user asked for; a registry
          // that refuses this id must not abort it.
        }
      }
      if (withArtifacts && artifacts.length === 0 && request.sessionIds.length === 1) {
        const scan = await scanSession(sessionId)
        artifacts = scan.artifacts.allowed
      }
      const moved = await moveSessionLog(sessionId, batchDir, {
        ...(request.workspaceId === undefined ? {} : { workspaceId: request.workspaceId }),
        ...(workspace === undefined ? {} : { workspacePath: workspace.path }),
      })
      if (!moved.ok) {
        const { code, sessionId: failedId } = moved.error
        return { ok: false, error: failedId === undefined ? { code } : { code, sessionId: failedId } }
      }
      entries.push(moved.entry)
    }

    const artifactEntries = withArtifacts && artifacts.length > 0
      ? await recycleArtifacts(batchDir, artifacts)
      : []
    const batch: RecycleBatch = {
      batchId,
      deletedAt: stamp,
      ...(request.reason === undefined ? {} : { reason: request.reason }),
      scope,
      entries,
      ...(artifactEntries.length === 0 ? {} : { artifactEntries }),
      ...(wasArchived.length === 0 ? {} : { wasArchived }),
      ...(detachedFrom.length === 0 ? {} : {
        detachedFrom: entries.flatMap((entry): { sessionId: StoredSessionId; workspaceId: string }[] =>
          entry.workspaceId === undefined ? [] : [{ sessionId: entry.sessionId, workspaceId: entry.workspaceId }]),
      }),
    }
    await persistBatch(batchDir, batch)
    // Drop the category assignments of Sessions that no longer exist, so the
    // browser does not keep rendering a row for a removed log.
    await this.forgetSessions().catch(() => undefined)
    return {
      ok: true,
      value: {
        batchId,
        deletedAt: stamp,
        sessionIds: entries.map(entry => entry.sessionId),
        bytes: entries.reduce((total, entry) => total + entry.sizeBytes, 0),
        artifactCount: artifactEntries.length,
        artifactBytes: artifactEntries.reduce((total, entry) => total + entry.sizeBytes, 0),
        releasedArchived: wasArchived,
        detachedFrom,
      },
    }
  }

  /**
   * Put a previously deleted batch back where it came from.
   *
   * @param request - the batch to restore; the newest batch when omitted.
   * @returns which Sessions came back and which could not.
   */
  @Remote('undoDeleteSessions')
  async undoDeleteSessions(request: SessionRecycleUndoRequest = {}): Promise<SessionRecycleUndoResult> {
    const batches = await listBatches()
    const batch = request.batchId === undefined ? batches[0] : batches.find(item => item.batchId === request.batchId)
    const result = await restoreBatch(request.batchId === undefined ? {} : { batchId: request.batchId })
    if (!result.ok) return { ok: false, error: { code: result.error.code } }
    const rearchived: StoredSessionId[] = []
    const reattached: StoredSessionId[] = []
    if (batch !== undefined) {
      const workspaceIds = new Set<string>()
      for (const entry of batch.entries) if (entry.workspaceId !== undefined) workspaceIds.add(entry.workspaceId)
      for (const workspaceId of workspaceIds) {
        const restoredHere = batch.entries
          .filter(entry => entry.workspaceId === workspaceId && result.restored.includes(entry.sessionId))
          .map(entry => entry.sessionId)
        if (restoredHere.length === 0) continue
        try {
          const entry = this.ctx.workspaceRegistry.get(workspaceId)
          for (const sessionId of restoredHere) {
            if (!entry.sessionIds.includes(sessionId)) {
              await entry.attachSession(sessionId)
              reattached.push(sessionId)
            }
          }
          // Re-archive only when the archive was NOT made by this delete:
          // an archive made by the delete is undone, a pre-existing one stays.
          for (const sessionId of restoredHere) {
            const wasArchivedBefore = (batch.wasArchived ?? []).includes(sessionId)
            const archivedNow = entry.archivedSessionIds.includes(sessionId)
            if (wasArchivedBefore && !archivedNow) {
              await entry.archiveSession(sessionId, { stopActivity: false })
              rearchived.push(sessionId)
            } else if (!wasArchivedBefore && archivedNow) {
              await entry.unarchiveSession(sessionId)
            }
          }
        } catch {
          // A Workspace that vanished must not fail the log restore.
        }
      }
    }
    return {
      ok: true,
      value: {
        batchId: result.batchId,
        restored: result.restored,
        failed: result.failed,
        reattached,
        rearchived,
      },
    }
  }

  /**
   * Report what the recycle bin currently holds, newest batch first.
   *
   * @returns every undoable batch with its entries.
   */
  @Remote('listRecycledSessions')
  async listRecycledSessions(): Promise<SessionRecycleListResult> {
    const batches = await listBatches()
    return {
      ok: true,
      value: {
        batches: batches.map(batch => ({
          batchId: batch.batchId,
          deletedAt: batch.deletedAt,
          sessionIds: batch.entries.map(entry => entry.sessionId),
          bytes: batch.entries.reduce((total, entry) => total + entry.sizeBytes, 0),
          ...(batch.reason === undefined ? {} : { reason: batch.reason }),
          ...(batch.scope === undefined ? {} : { scope: batch.scope }),
          ...(batch.artifactEntries === undefined ? {} : { artifactCount: batch.artifactEntries.length }),
        })),
        totalBytes: batches.reduce(
          (total, batch) => total + batch.entries.reduce((sum, entry) => sum + entry.sizeBytes, 0),
          0,
        ),
      },
    }
  }

  /**
   * Apply the recycle bin's retention limits, permanently discarding old bins.
   *
   * @param request - overrides for the batch-count and age limits.
   * @returns the batches dropped and the bytes reclaimed.
   */
  @Remote('sweepRecycledSessions')
  async sweepRecycledSessions(request: SessionRecycleSweepRequest = {}): Promise<SessionRecycleSweepResult> {
    const result = await sweepTrash({
      ...(request.maxBatches === undefined ? {} : { maxBatches: request.maxBatches }),
      ...(request.maxAgeDays === undefined ? {} : { maxAgeDays: request.maxAgeDays }),
    })
    return { ok: true, value: { removedBatches: result.removedBatches, reclaimedBytes: result.reclaimedBytes } }
  }

  /**
   * Report what deleting one Session would take, without touching the disk.
   *
   * The confirmation dialog renders this, and the artifacts-scoped delete
   * moves exactly what it lists: the two cannot diverge.
   *
   * @param request - the Session to scan.
   * @returns the log size, the artifact list, and every refusal.
   */
  @Remote('scanSession')
  async scanSession(request: SessionRecycleScanRequest): Promise<SessionRecycleScanResult> {
    const scan = await scanSession(request.sessionId)
    return {
      ok: true,
      value: {
        sessionId: scan.sessionId,
        cwd: scan.cwd ?? '',
        storeBytes: scan.store.bytes,
        directories: scan.store.directories,
        artifacts: scan.artifacts.allowed.map(row => ({
          displayPath: row.displayPath,
          bytes: row.bytes,
          ops: row.ops,
        })),
        refused: scan.artifacts.refused,
        artifactBytes: scan.artifacts.totalBytes,
        warnings: scan.warnings,
      },
    }
  }

  /**
   * Read one stored transcript, whether it is live or already trashed.
   *
   * @param request - the Session and how many trailing messages to keep.
   * @returns the readable rows, and whether the log was found and where.
   */
  @Remote('readTranscript')
  async readTranscript(request: SessionRecycleTranscriptRequest): Promise<SessionRecycleTranscriptResult> {
    const report = await readTranscript(request.sessionId, request.limit ?? 200)
    return { ok: true, value: report }
  }

  /**
   * List every Session currently inside the bin.
   *
   * @returns one row per trashed Session, newest batch first.
   */
  @Remote('listTrashedSessions')
  async listTrashedSessions(): Promise<SessionRecycleTrashedResult> {
    const sessions = await listTrashedSessions()
    return { ok: true, value: { sessions } }
  }

  /**
   * Erase one batch for good, after the user confirmed it.
   *
   * This and the retention sweep are the only paths that destroy a stored log;
   * everything else moves it into the bin.
   *
   * @param request - the batch to erase.
   * @returns the bytes freed, or a failure code.
   */
  @Remote('purgeBatch')
  async purgeBatch(request: SessionRecyclePurgeRequest): Promise<SessionRecyclePurgeResult> {
    const result = await purgeBatch(request.batchId)
    if (!result.ok) {
      return { ok: false, error: result.error.batchId === undefined
        ? { code: result.error.code }
        : { code: result.error.code, batchId: result.error.batchId } }
    }
    return {
      ok: true,
      value: { batchId: result.batchId, reclaimedBytes: result.reclaimedBytes },
    }
  }

  /**
   * Drop category assignments whose Session is no longer in its Workspace.
   *
   * `prune` already filters assignments by Workspace membership, so removing a
   * Session from `workspaceIds` is enough to make its assignment fall away.
   * The document is only written when pruning actually changed something.
   */
  private async forgetSessions(): Promise<void> {
    await this.enqueue(async () => {
      const current = this.requireGlobal().get()
      const pruned = this.prune(current)
      if (pruned === current) return
      await this.requireGlobal().set({ ...pruned, revision: current.revision + 1 })
    })
  }
  // #endregion

  private enqueue<T>(operation: () => Promise<T> | T): Promise<T> {
    const result = this.operationTail.then(operation, operation)
    this.operationTail = result.then(() => undefined, () => undefined)
    return result
  }

  private mutate(expectedRevision: number, operation: (document: SessionCategoryDocument) => SessionCategoryMutationResult | MutationPlan): Promise<SessionCategoryMutationResult> {
    const current = this.requireGlobal().get()
    if (current.revision !== expectedRevision) return Promise.resolve(reject({ code: 'revision-conflict', revision: current.revision }))
    const pruned = this.prune(current)
    const result = operation(pruned)
    if ('ok' in result) return Promise.resolve(result)
    if (!result.material && pruned === current) return Promise.resolve(success(this.snapshot(result.workspaceId)))
    return this.requireGlobal().set({ ...result.document, revision: current.revision + 1 }).then(() => {
      return success(this.snapshot(result.workspaceId))
    })
  }

  private changed(workspaceId: WorkspaceId | string, document: SessionCategoryDocument): MutationPlan {
    return { document, workspaceId: workspaceId as WorkspaceId, material: true }
  }

  private noop(workspaceId: WorkspaceId, document: SessionCategoryDocument): MutationPlan {
    return { document, workspaceId, material: false }
  }

  private prune(document: SessionCategoryDocument): SessionCategoryDocument {
    const categories = new Set(document.categories.map(category => category.id))
    const workspaces = this.ctx.workspaceRegistry
    const archived = new Set(workspaces.archivedSessionIds ?? [])
    const assignments = document.assignments.filter(assignment => {
      if (!categories.has(assignment.categoryId) || archived.has(assignment.sessionId)) return false
      const category = document.categories.find(item => item.id === assignment.categoryId)
      const workspace = category === undefined ? undefined : workspaces.get(category.workspaceId)
      return workspace?.sessionIds.includes(assignment.sessionId) ?? false
    })
    return assignments.length === document.assignments.length ? document : { ...document, assignments }
  }

  private snapshot(workspaceId: WorkspaceId | string): SessionCategorySnapshot {
    const document = this.requireGlobal().get()
    const categories = document.categories.filter(category => category.workspaceId === workspaceId)
    const ids = new Set(categories.map(category => category.id))
    return { revision: document.revision, categories, assignments: document.assignments.filter(assignment => ids.has(assignment.categoryId)) }
  }

  private workspaceForSession(sessionId: SessionId | undefined): WorkspaceId | undefined {
    if (sessionId === undefined) return undefined
    const list = this.ctx.workspaceRegistry.list?.() ?? []
    return list.find(workspace => workspace.sessionIds.includes(sessionId))?.id
  }

  private descendants(categories: readonly SessionCategory[], root: SessionCategoryId): SessionCategoryId[] {
    const result: SessionCategoryId[] = []
    const queue: SessionCategoryId[] = [root]
    while (queue.length > 0) {
      const id = queue.shift()!
      result.push(id)
      for (const category of categories) if (category.parentId === id) queue.push(category.id)
    }
    return result
  }

  private async finishArchive(pending: PendingCategoryArchive): Promise<SessionCategoryMutationResult> {
    for (const sessionId of pending.sessionIds) {
      try {
        // `stopActivity` because deleting a category IS the user asking for those
        // Sessions to leave the working set: without it a Session that is merely
        // live (for example the one the user is talking in) rejects the archive,
        // the whole delete fails, and the category can never be removed.
        await this.ctx.workspaceRegistry.archiveSession(sessionId, { stopActivity: true })
      } catch (error) {
        if (error instanceof WorkspaceUnknownSessionError) continue
        return reject({ code: 'archive-failed', operationId: pending.operationId })
      }
    }
    const current = this.requireGlobal().get()
    const removed = new Set(pending.categoryIds)
    const workspaceId = current.categories.find(item => removed.has(item.id))?.workspaceId
    const remaining = current.categories.filter(item => !removed.has(item.id))
    const categories = this.normalizeOrders(remaining)
    const assignments = current.assignments.filter(item => !removed.has(item.categoryId))
    // Drop EVERY pending entry that targets only categories this operation
    // removed — not just this operation's own id. A failed attempt leaves its
    // entry behind, so a retry that finally succeeds would otherwise strand the
    // earlier ones and `recoverPending()` would replay them on every startup.
    const nextPending = current.pendingArchive.filter(item =>
      item.operationId !== pending.operationId
      && !item.categoryIds.every(categoryId => removed.has(categoryId)))
    await this.requireGlobal().set({ ...current, revision: current.revision + 1, categories, assignments, pendingArchive: nextPending })
    return success(this.snapshot(workspaceId ?? ''))
  }

  private normalizeOrders(categories: readonly SessionCategory[]): SessionCategory[] {
    const groups = new Map<string, SessionCategory[]>()
    for (const category of categories) {
      const key = `${category.workspaceId}\u0000${category.parentId ?? ''}`
      const group = groups.get(key) ?? []
      group.push(category)
      groups.set(key, group)
    }
    const normalized: SessionCategory[] = []
    for (const group of groups.values()) {
      group.sort((left, right) => left.order - right.order)
      normalized.push(...group.map((category, order) => ({ ...category, order })))
    }
    return normalized
  }

  private async recoverPending(): Promise<void> {
    for (const pending of this.requireGlobal().get().pendingArchive) {
      try {
        const result = await this.finishArchive(pending)
        if (!result.ok) this.ctx.logger?.warn?.(`session category archive recovery failed for ${pending.operationId}`)
      } catch (error) {
        this.ctx.logger?.warn?.(`session category archive recovery failed for ${pending.operationId}`, error)
      }
    }
  }

  private requireGlobal() {
    if (this.global === undefined) throw new Error('session categories service is not initialized')
    return this.global
  }
}

/** Cordis namespace-import entry for source loaders that retain the module wrapper. */
export const apply = SessionCategoriesService
/** Services required before the category service is initialized. */
export const inject = SessionCategoriesService.inject