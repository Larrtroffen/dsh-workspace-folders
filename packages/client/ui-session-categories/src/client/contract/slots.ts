/**
 * ui-session-categories presentation contracts:
 *
 * - WorkspaceBrowser fills the sidebar shell's `sidebar.workspaces` hole — *   the whole browsing region (section header, search, grouped/flat session
 *   list, workspace dialogs). It registers this package's viewing store and
 *   consumes the shell's two-fact owner share (wide / expandSidebar).
 * - WorkspacePickFlow supplies the browser's menu and error dialog while a
 *   package-internal renderless driver opens the native chooser.
 *
 * The copied picker types remain package-internal component contracts; apply
 * registers only WorkspaceBrowser and leaves conversation picker ownership
 * with ui-workspace.
 */
import type { HostObservable, PropsLocale, PropsRenderSlots, PropsRuntime, PropsStore, SnapshotSelectorHook } from '@deepseek-ai/dsh-client-ui-slots'
// Type-only: pull the owner SlotMap merges into programs that resolve the
// runtime shares below.
import type {} from '@deepseek-ai/dsh-client-ui-sidebar/client'
import type {} from '@deepseek-ai/dsh-client-ui-conversation/client'
import type {
  SessionId, SessionSearchResultItem, WorkspaceId, WorkspaceView,
} from '../types.ts'
import type {
  SessionCategoryId, SessionCategoryOperationId,
} from '@deepseek-ai/dsh-session-categories/types'
import type {
  SessionCategoriesActionResult, SessionCategoriesView,
} from '../controller.ts'
import type { createWorkspaceViewStore } from '../stores.ts'

/**
 * What one delete attempt reports back to the browser.
 *
 * The shape is flat rather than a result union because the inject contract
 * reports failure by throwing, matching every other verb on this share. The
 * Host's own code travels inside the thrown error's message.
 */
export interface DeleteSessionOutcome {
  batchId: string
  reclaimedBytes: number
  /** How many files beyond the log moved, under the wider scopes. */
  artifactCount: number
}

/**
 * What one scan reports before a delete is confirmed.
 *
 * `allowed` artifacts would move under the wider scopes; `refused` rows carry
 * the Host's reason, so the dialog can show why a file the Session touched will
 * survive the delete rather than silently skipping it.
 */
export interface DeleteScanOutcome {
  cwd: string | null
  store: { directories: readonly string[]; bytes: number }
  artifacts: {
    allowed: readonly { displayPath: string; bytes: number }[]
    refused: readonly { path: string; reason: string }[]
    totalBytes: number
  }
  warnings: readonly string[]
}

/**
 * What one undo attempt reports back to the browser.
 *
 * `failed` lists entries the Host could not put back —an occupied origin, a
 * removed container —so the browser can say which Sessions came home rather
 * than claiming the whole batch succeeded.
 */
export interface UndoDeleteOutcome {
  restored: readonly SessionId[]
  failed: readonly { sessionId: SessionId; reason: string }[]
}

/** One undoable batch, as the recycle bin reports it. */
export interface RecycledBatchSummary {
  batchId: string
  deletedAt: string
  sessionIds: readonly SessionId[]
  bytes: number
}

/** One message row read back from a stored Session transcript. */
export interface TranscriptMessage {
  /** Speaker bucket the viewer styles against. */
  role: 'user' | 'assistant' | 'tool'
  /** Raw record type, e.g. `user/message`. */
  type: string
  /** Flattened text (images collapse to a placeholder). */
  text: string
  /** Record timestamp when the log carries one. */
  time?: number
}

/** One Session currently inside the recycle bin. */
export interface TrashedSessionSummary {
  sessionId: SessionId
  batchId: string
  deletedAt: string
  bytes: number
  container: string
}

/** What erasing one named batch reports: the id it erased and the space freed. */
export interface PurgeBatchOutcome {
  batchId: string
  reclaimedBytes: number
}

/** What a retention sweep reports: which batches fell outside the policy. */
export interface SweepTrashOutcome {
  removedBatchIds: readonly string[]
  reclaimedBytes: number
}

/**
 * Owner share of the directory-flow holes: the complete conversation between
 * the trigger surface and the picking interaction. The occupant reads `open`
 * to run/render its interaction and reports exactly one outcome per open.
 */
export interface DirectoryFlowOwnerProps {
  /** True while a picking interaction is requested; flipping back to false withdraws the request. */
  open: boolean
  /** True while the owner adopts a picked path (`createWorkspace` in flight); occupants disable their commit affordances. */
  busy: boolean
  /** The operator picked a directory (absolute host path); the owner adopts it. */
  onPicked: (path: string) => void
  /** The operator dismissed the interaction; the owner just closes the flow. */
  onCancel: () => void
  /** The interaction itself failed (chooser missing, listing denied); the owner shows its error surface. */
  onError: (message: string) => void
}

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface SlotMap {
    /** Directory-flow hole under the conversation empty-state picker (declared by the WorkspacePicker entry). */
    'conversation.hero.workspace.directoryFlow': { kind: 'single'; scope: 'root'; owner: DirectoryFlowOwnerProps }
    /** Directory-flow hole under the sidebar browsing region (declared by the WorkspaceBrowser entry). */
    'sidebar.workspaces.directoryFlow': { kind: 'single'; scope: 'root'; owner: DirectoryFlowOwnerProps }
  }
}

/** The two directory-flow holes; a flow package's client half registers its one component into both. */
export type DirectoryFlowSlotName =
  | 'conversation.hero.workspace.directoryFlow'
  | 'sidebar.workspaces.directoryFlow'

/**
 * Directory-picking share both trigger surfaces consume. Occupancy rides the
 * inject face's reserved `hooks` compartment: the renderer binds the source
 * into the `useDirectoryFlow` selector hook, so an empty hole hides the
 * "Add workspace— entry reactively and the surface withdraws an open
 * flow whose occupant unloaded mid-interaction (nobody is left to cancel).
 */
export type DirectoryPickingInjected = {
  hooks: {
    /** True while this surface's directory-flow hole is occupied. */
    directoryFlow: HostObservable<boolean>
  }
}

/** Component-side view of the picking share: the bound occupancy selector hook. */
export type DirectoryPickingHooks = {
  /** Selector hook over this surface's directory-flow occupancy. */
  useDirectoryFlow: SnapshotSelectorHook<boolean>
}

/**
 * Browser-private injected share (arrives via the register inject factory).
 * Data reads use the global framework hooks; these are the Host actions the
 * browsing region drives.
 */
export type WorkspaceBrowserInjected = {
  hooks: {
    /** Durable category snapshots for every loaded Workspace. */
    categories: HostObservable<SessionCategoriesView>
  }
  /** Ensure one Workspace category snapshot is loaded. */
  ensureCategories: (workspaceId: WorkspaceId) => Promise<SessionCategoriesActionResult>
  /** Create one category. */
  createCategory: (
    workspaceId: WorkspaceId,
    parentId: SessionCategoryId | null,
    title: string,
    beforeCategoryId?: SessionCategoryId,
  ) => Promise<SessionCategoriesActionResult>
  /** Rename one loaded category. */
  renameCategory: (categoryId: SessionCategoryId, title: string) => Promise<SessionCategoriesActionResult>
  /** Move one loaded category. */
  moveCategory: (
    categoryId: SessionCategoryId,
    parentId: SessionCategoryId | null,
    beforeCategoryId?: SessionCategoryId,
  ) => Promise<SessionCategoriesActionResult>
  /** Reorder one loaded category among its siblings. */
  reorderCategory: (
    categoryId: SessionCategoryId,
    beforeCategoryId?: SessionCategoryId,
  ) => Promise<SessionCategoriesActionResult>
  /** Assign Sessions in one Workspace to a category, or clear their assignment. */
  assignSessions: (
    workspaceId: WorkspaceId,
    sessionIds: readonly SessionId[],
    categoryId: SessionCategoryId | null,
  ) => Promise<SessionCategoriesActionResult>
  /** Recursively delete one category and archive its assigned Sessions. */
  deleteCategory: (
    categoryId: SessionCategoryId,
    operationId: SessionCategoryOperationId,
  ) => Promise<SessionCategoriesActionResult>
  /**
   * Start a New Session in a Workspace: reuse-or-create its blank session and
   * open it; without an explicit workspace, inherit the current Session
   * Workspace, then the recent Workspace, or clear into the New Session view.
   */
  startSession: (workspaceId?: WorkspaceId) => void
  /** Open a real Session. */
  open: (sessionId: SessionId) => void
  /**
   * Search current visible conversation messages. The Host fixes the result
   * bound; `hasMore` means the query needs narrowing.
   */
  searchSessions: (
    query: string,
    signal: AbortSignal,
  ) => Promise<{ items: readonly SessionSearchResultItem[]; hasMore: boolean }>
  /** Maximum number of merged rows rendered for one search. */
  searchResultLimit: number
  /** Rename a Session (explicit user title; resolves on host acceptance). */
  renameSession: (sessionId: SessionId, title: string) => Promise<void>
  /** Fork a Session at its last completed turn and open the child. */
  forkSession: (sessionId: SessionId) => void
  /** Rename a Host Workspace (rejects on name conflict; resolves on durability). */
  renameWorkspace: (workspaceId: WorkspaceId, title: string) => Promise<void>
  /** Delete only a Host Workspace registration; directory and Session logs remain. */
  deleteWorkspace: (workspaceId: WorkspaceId) => Promise<void>
  /**
   * Reorder a Workspace in the durable registry display order.
   * Omitted anchor appends to the end.
   */
  insertWorkspaceBefore: (workspaceId: WorkspaceId, beforeWorkspaceId?: WorkspaceId) => Promise<void>
  /**
   * Archive a Session into the registry-global set: hidden from grouping
   * surfaces, log and accounting slot retained. Archiving the current
   * session clears the selection into the New Session view state.
   */
  archiveSession: (sessionId: SessionId) => Promise<void>
  /**
   * Drop a Session from the registry-global archive set so it returns to its
   * recorded position. Archiving is one-way from the browser unless this ships
   * beside it.
   */
  unarchiveSession: (sessionId: SessionId) => Promise<void>
  /** Pin a Session ahead of every unpinned sibling in its group. */
  pinSession: (sessionId: SessionId) => Promise<void>
  /** Unpin a Session. */
  unpinSession: (sessionId: SessionId) => Promise<void>
  /**
   * Move a Session's stored log into the recycle bin.
   *
   * The harness has no delete interface of its own —persistence calls pruning
   * "out-of-band backend maintenance" —so this verb is the plugin's own, and
   * it is reversible: the Host writes a manifest naming the log's origin, and
   * {@link undoDeleteSession} puts it back. The `scope` chooses whether the
   * Session's own written files join the log in the bin; the Host re-derives
   * that list itself, so the page cannot widen it.
   */
  deleteSession: (sessionId: SessionId, scope?: 'record' | 'artifacts') => Promise<DeleteSessionOutcome>
  /** Ask the Host what a delete would move, without deleting anything. */
  scanSession: (sessionId: SessionId) => Promise<DeleteScanOutcome>
  /** Put the most recently deleted batch back where it came from. */
  undoDeleteSession: () => Promise<UndoDeleteOutcome>
  /** Report what the recycle bin currently holds, newest batch first. */
  listRecycledSessions: () => Promise<readonly RecycledBatchSummary[]>
  /**
   * Erase one named batch from the bin for good. The only irreversible verb the
   * plugin offers, so the caller must have confirmed the exact batch.
   */
  purgeBatch: (batchId: string) => Promise<PurgeBatchOutcome>
  /** Erase every batch past the retention policy (newest `maxBatches` / `maxAgeDays`). */
  sweepTrash: (maxBatches?: number, maxAgeDays?: number) => Promise<SweepTrashOutcome>
  /**
   * Reorder a session inside its Workspace account (DOM-insertBefore
   * semantics: omitted anchor appends to the end). The view refreshes from
   * the Host response/changed frame; failures leave the order unchanged.
   */
  insertSessionBefore: (workspaceId: WorkspaceId, sessionId: SessionId, beforeSessionId?: SessionId) => Promise<void>
  /** Adopt a picked host directory as a real Workspace before targeting a Session. */
  createWorkspace: (input: { path: string }) => Promise<WorkspaceView>
  /** Ask the Host to open its native single-directory chooser. */
  pickDirectory: () => Promise<string | null>
}

/** Full browser props: shell owner share + viewing store + injected actions + the locale seat. */
export type WorkspaceBrowserProps =
  PropsRuntime<'sidebar.workspaces'>
  & PropsStore<ReturnType<typeof createWorkspaceViewStore>>
  & Omit<WorkspaceBrowserInjected, 'hooks'>
  & { useCategories: SnapshotSelectorHook<SessionCategoriesView> }
  & PropsLocale<'sessionCategories'>

/**
 * Picker-private injected share. Pick semantics remain in the owner's onPick
 * callback; this callback creates only the real Host Workspace. A type alias
 * supplies the implicit index signature required by the registry.
 */
export type WorkspacePickerInjected = DirectoryPickingInjected & {
  /** Adopt a picked host directory as a real Workspace before targeting a Session. */
  createWorkspace: (input: { path: string }) => Promise<WorkspaceView>
}

/**
 * Full picker props: the owner share plus the creation callback and the
 * locale seat. The two picker holes (blank-session hero / New-Session view)
 * share one owner currency, so one composed type serves both registrations.
 */
export type WorkspacePickerProps =
  PropsRuntime<'conversation.hero.workspace'>
  & PropsRenderSlots<'conversation.hero.workspace.directoryFlow'>
  & Omit<WorkspacePickerInjected, 'hooks'>
  & DirectoryPickingHooks
  & PropsLocale<'sessionCategories'>
