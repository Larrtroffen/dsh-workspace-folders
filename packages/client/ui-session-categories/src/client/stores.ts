/**
 * The workspace browser's viewing store: the session-list grouping mode,
 * persisted across reloads. Module level exports the factory only (a
 * module-level handle would pin the store identity across plugin reloads);
 * register() receives the factory and the browser derives its PropsStore
 * share from the return type.
 */
import { defineStore } from '@deepseek-ai/dsh-client-store'

/**
 * The store handle this module hands to the slot registration. `defineStore`
 * returns the spec, its bound actions, and the subscription surface in one
 * object; the browser treats it as opaque, so the local alias only has to name
 * that shape for the declaration below.
 */
export type EngineStoreHandle<State, Actions> = ReturnType<typeof defineStore<State, Actions>>


/** Browser-local order account for the hierarchy-free flat Session list. */
export const FLAT_SESSION_ORDER_KEY = '__flat_session_order__'

/**
 * One display-only folder in the Workspace list.
 *
 * These folders never touch the Workspace registry, the filesystem, or any
 * Session: they only decide how root-level Workspace sections are arranged in
 * this browser. `parentId` gives them unlimited nesting; `order` is the sibling
 * position the same way a Host category carries one.
 */
export interface WorkspaceFolder {
  id: string
  parentId: string | null
  title: string
  order: number
}

/**
 * Expansion key of the synthetic "Unfiled" bucket that collects root Workspace
 * sections no folder owns. It is not a real folder and never persists as one.
 */
export const UNFILED_WORKSPACE_FOLDER_KEY = '__unfiled_workspaces__'

/**
 * Keep one parent's children packed at 0..n-1 in their current visual order.
 *
 * Called after a folder moved into `parentId` (optionally before `beforeId`)
 * and after a deletion promoted children into the deleted folder's parent. The
 * sort mirrors what the renderer does (order, then id as a stable tie-break),
 * so a stale `order` never makes two sibling moves flip each other.
 *
 * @param draft - store draft that owns the folders.
 * @param parentId - parent whose children are being repacked.
 * @param movingId - the folder that just entered this parent, if any.
 * @param beforeId - anchor sibling the moving folder should precede.
 */
function repackWorkspaceFolderSiblings(
  draft: WorkspaceViewState,
  parentId: string | null,
  movingId?: string,
  beforeId?: string,
): void {
  const folders = draft.workspaceFolders ?? []
  const ordered = folders
    .filter(folder => folder.parentId === parentId && folder.id !== movingId)
    .sort((left, right) => left.order - right.order || (left.id < right.id ? -1 : 1))
  if (movingId !== undefined) {
    const moving = folders.find(folder => folder.id === movingId)
    if (moving !== undefined) {
      const anchorIndex = beforeId === undefined ? -1 : ordered.findIndex(folder => folder.id === beforeId)
      ordered.splice(anchorIndex === -1 ? ordered.length : anchorIndex, 0, moving)
    }
  }
  ordered.forEach((folder, index) => { folder.order = index })
}

/**
 * Prefix for a category's own Session-order account key.
 *
 * A category keeps a manual order separate from the Workspace account: a drag
 * inside a category must not reshuffle the Workspace's unclassified tail. The
 * prefix also keeps these keys out of the UUID / {@link FLAT_SESSION_ORDER_KEY}
 * / `''` namespaces that already share the one `sessionOrderByAccount` map.
 */
export const CATEGORY_ORDER_PREFIX = 'category:'

/**
 * Build one category's Session-order account key.
 * @param categoryId - Host-assigned category id.
 * @returns the key to store that category's manual order under.
 */
export function categoryOrderKey(categoryId: string): string {
  return `${CATEGORY_ORDER_PREFIX}${categoryId}`
}

/**
 * Session-list grouping mode:
 * - `workspace` — one flat section per Workspace;
 * - `workspace-tree` — Workspace sections nest by their directory paths;
 * - `flat` — one recency list with no grouping.
 */
export type SessionGroupBy = 'workspace' | 'workspace-tree' | 'flat'
/** Session order: user-arranged only, or user-arranged plus activity promotion. */
export type SessionOrderBy = 'manual' | 'updated'

/** Session category browser viewing state persisted across surface remounts and reloads. */
type WorkspaceViewState = {
  groupBy: SessionGroupBy
  orderBy: SessionOrderBy
  /**
   * Archived-row visibility, mirroring the official browser's three-state
   * filter: default hides the archive section entirely, show gathers the
   * archived rows into their own (expanded) section, only shows nothing but
   * the archive section.
   */
  archivedFilter: 'default' | 'show' | 'only'
  /** Explicit zero-or-five-session state keyed by Workspace group identity. */
  groupExpansion: Record<string, boolean>
  /** Explicit expansion state keyed by durable category identity. */
  categoryExpansion: Record<string, boolean>
  /** Shared editable order per Workspace group plus the browser-local flat-list account. */
  sessionOrderByAccount: Record<string, string[]>
  /** Last observed update timestamps per order account for one-time promotion events. */
  sessionUpdatedAtByAccount: Record<string, Record<string, number>>
  /**
   * Whether pinned Sessions are hoisted into one global section above every
   * category, or stay inside the category that owns them.
   *
   * A pin is a statement about prominence, so the default lifts the row out
   * of its group entirely and renders it above the categories. Turning this
   * off restores the in-category behaviour (the row leads its own group).
   */
  hoistPinned: boolean
  /**
   * Whether the session-manager dialog is open.
   *
   * Deliberately NOT persisted (see the `persist` allow-list below): a dialog
   * that reopens itself on the next launch is a trap, not a convenience. It
   * lives in the shared store only so the footer button (which owns the click)
   * and the dialog (which owns the data) can be one surface.
   */
  managerOpen: boolean
  /**
   * Display-only folders grouping root-level Workspace sections.
   *
   * Empty means "no folder layer": the browser then renders the native flat
   * group list exactly as before. The folders are browser-local view state on
   * purpose — they never rename a Workspace, a Session, or a directory.
   */
  workspaceFolders: WorkspaceFolder[]
  /** Workspace id → owning display folder id (absent = unfiled). */
  workspaceFolderAssignments: Record<string, string>
  /** Expansion state keyed by folder id or {@link UNFILED_WORKSPACE_FOLDER_KEY}. */
  workspaceFolderExpansion: Record<string, boolean>
  /**
   * Chosen leading icon per Workspace (`dsh:<name>` / `emoji:<char>`).
   *
   * Absent means the quiet default dot. Browser-local like the folder layer:
   * the host registry knows nothing about it.
   */
  workspaceIcons: Record<string, string>
  /** Chosen leading icon per display folder id. */
  workspaceFolderIcons: Record<string, string>
}

/**
 * Annotation twin of the actions literal below (the export needs a declared
 * return type); drift fails assignability at the defineStore call.
 */
type WorkspaceViewActions = {
  setGroupBy: (draft: WorkspaceViewState, mode: SessionGroupBy) => void
  setOrderBy: (draft: WorkspaceViewState, mode: SessionOrderBy) => void
  setArchivedFilter: (draft: WorkspaceViewState, filter: 'default' | 'show' | 'only') => void
  setGroupExpanded: (draft: WorkspaceViewState, key: string, expanded: boolean) => void
  setCategoryExpanded: (draft: WorkspaceViewState, key: string, expanded: boolean) => void
  retainCategoryKeys: (draft: WorkspaceViewState, categoryKeys: readonly string[]) => void
  retainAccountKeys: (draft: WorkspaceViewState, workspaceKeys: readonly string[]) => void
  syncSessionOrderAccount: (
    draft: WorkspaceViewState,
    accountKey: string,
    order: string[],
    updatedAt: Record<string, number>,
  ) => void
  setSessionOrder: (draft: WorkspaceViewState, accountKey: string, order: string[]) => void
  /** Toggle the global hoist of pinned Sessions out of their category. */
  setHoistPinned: (draft: WorkspaceViewState, hoist: boolean) => void
  openManager: (draft: WorkspaceViewState) => void
  closeManager: (draft: WorkspaceViewState) => void
  /** Persist one already-positioned display folder. */
  createWorkspaceFolder: (draft: WorkspaceViewState, folder: WorkspaceFolder) => void
  /** Rename a display folder (no Workspace/Session title changes). */
  renameWorkspaceFolder: (draft: WorkspaceViewState, folderId: string, title: string) => void
  /** Remove a display folder; children move up and member Workspaces become unfiled. */
  deleteWorkspaceFolder: (draft: WorkspaceViewState, folderId: string) => void
  /** Move a display folder under another parent, optionally before an anchor. */
  moveWorkspaceFolder: (
    draft: WorkspaceViewState,
    folderId: string,
    parentId: string | null,
    beforeId?: string,
  ) => void
  /** Store a folder's expanded/collapsed state. */
  setWorkspaceFolderExpanded: (draft: WorkspaceViewState, key: string, expanded: boolean) => void
  /** Assign one Workspace to a display folder, or clear its folder with null. */
  assignWorkspaceFolder: (draft: WorkspaceViewState, workspaceId: string, folderId: string | null) => void
  /** Drop folder assignments whose Workspace is no longer registered. */
  pruneWorkspaceFolderAssignments: (draft: WorkspaceViewState, workspaceIds: readonly string[]) => void
  /** Persist one Workspace's leading icon (null clears it). */
  setWorkspaceIcon: (draft: WorkspaceViewState, workspaceId: string, icon: string | null) => void
  /** Persist one display folder's leading icon (null clears it). */
  setWorkspaceFolderIcon: (draft: WorkspaceViewState, folderId: string, icon: string | null) => void
  /** Drop icon entries whose Workspace is no longer registered. */
  pruneWorkspaceIcons: (draft: WorkspaceViewState, workspaceIds: readonly string[]) => void
}

/**
 * Create the workspace browser viewing store handle.
 * @returns the store handle (spec + type + identity + factory in one).
 */
export function createWorkspaceViewStore(): EngineStoreHandle<WorkspaceViewState, WorkspaceViewActions> {
  return defineStore({
    init: (): WorkspaceViewState => ({
      groupBy: 'workspace',
      orderBy: 'updated',
      // Archived rows start hidden, matching the official browser's default.
      archivedFilter: 'default',
      groupExpansion: {},
      categoryExpansion: {},
      sessionOrderByAccount: {},
      sessionUpdatedAtByAccount: {},
      // Pinned Sessions start hoisted above every category: a pin is a
      // statement about prominence in the whole list, not inside one group.
      hoistPinned: true,
      managerOpen: false,
      workspaceFolders: [],
      workspaceFolderAssignments: {},
      workspaceFolderExpansion: {},
      workspaceIcons: {},
      workspaceFolderIcons: {},
    }),
    persist: 'dsh.session-categories.view.v2',
    actions: {
      setGroupBy: (d, mode: SessionGroupBy) => { d.groupBy = mode },
      setOrderBy: (d, mode: SessionOrderBy) => { d.orderBy = mode },
      setArchivedFilter: (d, filter: 'default' | 'show' | 'only') => { d.archivedFilter = filter },
      setGroupExpanded: (d, key: string, expanded: boolean) => { d.groupExpansion[key] = expanded },
      setCategoryExpanded: (d, key: string, expanded: boolean) => { d.categoryExpansion[key] = expanded },
      retainCategoryKeys: (d, categoryKeys: readonly string[]) => {
        const retained = new Set(categoryKeys)
        d.categoryExpansion = Object.fromEntries(
          Object.entries(d.categoryExpansion).filter(([key]) => retained.has(key)),
        )
      },
      retainAccountKeys: (d, workspaceKeys: readonly string[]) => {
        const retained = new Set(workspaceKeys)
        // Category accounts are exempt from pruning on purpose. This effect runs
        // as soon as the Workspace phase is ready, which can be BEFORE the
        // category snapshots have loaded — filtering against a not-yet-known
        // category list would erase every category's manual order on the first
        // render after a reload. A stale key left behind by a deleted category
        // costs a few strings and nothing else.
        const keep = (key: string): boolean => retained.has(key) || key.startsWith(CATEGORY_ORDER_PREFIX)
        d.groupExpansion = Object.fromEntries(
          Object.entries(d.groupExpansion).filter(([key]) => retained.has(key)),
        )
        d.sessionOrderByAccount = Object.fromEntries(
          Object.entries(d.sessionOrderByAccount).filter(([key]) => keep(key)),
        )
        d.sessionUpdatedAtByAccount = Object.fromEntries(
          Object.entries(d.sessionUpdatedAtByAccount).filter(([key]) => retained.has(key)),
        )
      },
      syncSessionOrderAccount: (d, accountKey: string, order: string[], updatedAt: Record<string, number>) => {
        d.sessionOrderByAccount[accountKey] = order
        d.sessionUpdatedAtByAccount[accountKey] = updatedAt
      },
      setSessionOrder: (d, accountKey: string, order: string[]) => {
        d.sessionOrderByAccount[accountKey] = order
      },
      setHoistPinned: (d, hoist) => { d.hoistPinned = hoist },
      openManager: (d) => { d.managerOpen = true },
      closeManager: (d) => { d.managerOpen = false },
      createWorkspaceFolder: (d, folder) => {
        const folders = d.workspaceFolders ?? (d.workspaceFolders = [])
        folders.push(folder)
      },
      renameWorkspaceFolder: (d, folderId, title) => {
        const folder = d.workspaceFolders?.find(candidate => candidate.id === folderId)
        if (folder !== undefined) folder.title = title
      },
      deleteWorkspaceFolder: (d, folderId) => {
        const folders = d.workspaceFolders ?? []
        const target = folders.find(folder => folder.id === folderId)
        if (target === undefined) return
        // Children survive: they move up into the deleted folder's parent.
        for (const folder of folders) {
          if (folder.parentId === folderId) folder.parentId = target.parentId
        }
        d.workspaceFolders = folders.filter(folder => folder.id !== folderId)
        repackWorkspaceFolderSiblings(d, target.parentId)
        const assignments = d.workspaceFolderAssignments
        if (assignments !== undefined) {
          for (const [workspaceId, assignedFolderId] of Object.entries(assignments)) {
            if (assignedFolderId === folderId) delete assignments[workspaceId]
          }
        }
        if (d.workspaceFolderExpansion !== undefined) delete d.workspaceFolderExpansion[folderId]
      },
      moveWorkspaceFolder: (d, folderId, parentId, beforeId) => {
        const folders = d.workspaceFolders ?? []
        const target = folders.find(folder => folder.id === folderId)
        if (target === undefined) return
        if (parentId === folderId) return
        // A folder may not move under itself or one of its descendants.
        let cursor: string | null = parentId
        while (cursor !== null) {
          if (cursor === folderId) return
          cursor = folders.find(folder => folder.id === cursor)?.parentId ?? null
        }
        const previousParent = target.parentId
        target.parentId = parentId
        repackWorkspaceFolderSiblings(d, parentId, folderId, beforeId)
        if (previousParent !== parentId) repackWorkspaceFolderSiblings(d, previousParent)
      },
      setWorkspaceFolderExpanded: (d, key, expanded) => {
        const expansion = d.workspaceFolderExpansion ?? (d.workspaceFolderExpansion = {})
        expansion[key] = expanded
      },
      assignWorkspaceFolder: (d, workspaceId, folderId) => {
        const assignments = d.workspaceFolderAssignments ?? (d.workspaceFolderAssignments = {})
        if (folderId === null) delete assignments[workspaceId]
        else assignments[workspaceId] = folderId
      },
      pruneWorkspaceFolderAssignments: (d, workspaceIds) => {
        const assignments = d.workspaceFolderAssignments
        if (assignments === undefined) return
        const known = new Set(workspaceIds)
        for (const workspaceId of Object.keys(assignments)) {
          if (!known.has(workspaceId)) delete assignments[workspaceId]
        }
      },
      setWorkspaceIcon: (d, workspaceId, icon) => {
        const icons = d.workspaceIcons ?? (d.workspaceIcons = {})
        if (icon === null) delete icons[workspaceId]
        else icons[workspaceId] = icon
      },
      setWorkspaceFolderIcon: (d, folderId, icon) => {
        const icons = d.workspaceFolderIcons ?? (d.workspaceFolderIcons = {})
        if (icon === null) delete icons[folderId]
        else icons[folderId] = icon
      },
      pruneWorkspaceIcons: (d, workspaceIds) => {
        const icons = d.workspaceIcons
        if (icons === undefined) return
        const known = new Set(workspaceIds)
        for (const workspaceId of Object.keys(icons)) {
          if (!known.has(workspaceId)) delete icons[workspaceId]
        }
      },
    },
  })
}
