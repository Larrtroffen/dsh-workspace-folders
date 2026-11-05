/**
 * The workspace/session browsing region filling the sidebar shell's
 * `sidebar.workspaces` hole: section header (title + view options + add
 * workspace), search, the grouped tree or flat list, and the workspace
 * dialogs. Wide state renders the full browser; rail state renders the two
 * region icons (search / add workspace) as 36px controls on the shell's shared
 * rail entry path, each requesting expansion through the owner share. Adding
 * is the header button's one action, so it raises the directory flow with no
 * menu in between; the flow and its error dialog live in WorkspacePicker
 * (same package —direct composition, no slot between them).
 */
import { useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import clsx from 'clsx'
import {
  Button, IconArchiveCheckOutlineRegular, IconArchiveOffOutlineRegular, IconCloseFillRegular,
  IconFolderCloseRegular, IconPersonalizationOutlineRegular, IconProjectAddOutlineRegular,
  IconQueueOutlineRegular, IconPinFillRegular, IconPinOutlineRegular, IconPlusOutlineRegular,
  IconSearchOutlineRegular, Menu, Modal, Tooltip,
} from '@deepseek-ai/dsh-client-ui-primitives'
import type {
  SessionId, SessionListState, SessionSearchResultItem, WorkspaceId, WorkspaceView,
} from './types.ts'
import type {
  SessionCategoryId, SessionCategoryOperationId, SessionCategorySnapshot,
} from '@deepseek-ai/dsh-session-categories/types'
import type { WorkspaceBrowserProps, DeleteScanOutcome } from './contract/slots.ts'
import type { CategoryNode, GroupNode, SessionNode, SessionOrderBy } from './tree.ts'
import {
  ARCHIVED_KEY, buildCategoryTree, currentSessionId, deriveFlat, deriveGroups, deriveSearchResults, UNGROUPED_KEY,
} from './tree.ts'
import { CategoryRowItem, ProjectRowItem, SearchResultItem, SessionNodeItem, WorkspaceFolderRow } from './rows/Rows.tsx'
import type { CategoryDragPayload, WorkspaceFolderDropZone } from './rows/Rows.tsx'
import {
  FLAT_SESSION_ORDER_KEY, categoryOrderKey, UNFILED_WORKSPACE_FOLDER_KEY,
} from './stores.ts'
import type { WorkspaceFolder } from './stores.ts'
import {
  buildWorkspaceFolderForest, countDirectWorkspaces, workspaceFolderInvalidTargets, workspaceFolderOptions,
} from './workspaceFolders.ts'
import { WorkspaceIconPickerGrid } from './workspaceIcons.tsx'
import type { WorkspaceFolderNode, WorkspaceFolderOption } from './workspaceFolders.ts'
import { WorkspacePickFlow } from './WorkspacePicker.tsx'
import { DirectDirectoryFlow } from './DirectDirectoryFlow.tsx'
import css from './WorkspaceBrowser.module.css'

/**
 * Column slide length (--ds-transition-duration-slow): rail-search focus waits it out — * focus() forces a synchronous layout and would jank the slide.
 */
const EXPAND_SLIDE_MS = 300
/** Pause between the latest keystroke and a Host content-search request. */
const SEARCH_DEBOUNCE_MS = 250
/** `session.search` wire bound, measured in JavaScript UTF-16 code units. */
const SEARCH_QUERY_MAX_CODE_UNITS = 500
/** Session rows visible per Workspace before the local overflow control. */
const COLLAPSED_SESSION_LIMIT = 5
/** Stable selector seat: this replacement always carries its direct native flow. */
const DIRECT_DIRECTORY_FLOW_AVAILABLE = <S,>(selector: (available: boolean) => S): S => selector(true)

/** Human-readable byte size for the delete dialog's plan: 0 → "0 B", 1536 → "1.5 KB". */
function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let value = bytes
  let unit = 0
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024
    unit += 1
  }
  const rounded = unit === 0 ? String(value) : value.toFixed(value >= 100 ? 0 : 1)
  return `${rounded} ${units[unit]}`
}

/** Keep controlled input and RPC payload inside the session.search wire contract. */
function sanitizeSearchQuery(value: string): string {
  const withoutNul = value.replaceAll('\0', '')
  if (withoutNul.length <= SEARCH_QUERY_MAX_CODE_UNITS) return withoutNul
  let end = SEARCH_QUERY_MAX_CODE_UNITS
  const last = withoutNul.charCodeAt(end - 1)
  const next = withoutNul.charCodeAt(end)
  if (last >= 0xD800 && last <= 0xDBFF && next >= 0xDC00 && next <= 0xDFFF) end--
  return withoutNul.slice(0, end)
}

/** Immutable membership toggle for the local expand-all array. */
function toggled(list: readonly string[], key: string): string[] {
  return list.includes(key) ? list.filter(k => k !== key) : [...list, key]
}

/**
 * Accept the native drag at document level while a row drag is active: row
 * hover still owns the insertion marker, and releasing outside the list must
 * not be rendered as a rejected drop before dragend commits that last marker.
 */
function useNativeDragAcceptance(active: boolean): void {
  useEffect(() => {
    if (!active) return
    const acceptDrag = (event: DragEvent): void => {
      event.preventDefault()
      if (event.dataTransfer !== null) event.dataTransfer.dropEffect = 'move'
    }
    const acceptDrop = (event: DragEvent): void => { event.preventDefault() }
    document.addEventListener('dragover', acceptDrag)
    document.addEventListener('drop', acceptDrop)
    return () => {
      document.removeEventListener('dragover', acceptDrag)
      document.removeEventListener('drop', acceptDrop)
    }
  }, [active])
}

/** Reconcile a stored view order with the Workspace's current session account. */
function reconciledSessionOrder(sessionIds: readonly SessionId[], stored: readonly string[] | undefined): SessionId[] {
  if (stored === undefined) return [...sessionIds]
  const byId = new Map(sessionIds.map(id => [id as string, id]))
  const ordered: SessionId[] = []
  const included = new Set<string>()
  for (const key of stored) {
    const id = byId.get(key)
    if (id === undefined || included.has(key)) continue
    ordered.push(id)
    included.add(key)
  }
  for (const id of sessionIds) {
    if (included.has(id)) continue
    ordered.push(id)
  }
  return ordered
}

/** Newest update first with stable Session identity as the tie-break. */
function compareSessionRecency(a: SessionId, b: SessionId, byId: SessionListState['byId']): number {
  const aUpdatedAt = byId[a]?.updatedAt ?? Number.NEGATIVE_INFINITY
  const bUpdatedAt = byId[b]?.updatedAt ?? Number.NEGATIVE_INFINITY
  if (aUpdatedAt !== bUpdatedAt) return bUpdatedAt - aUpdatedAt
  return a < b ? -1 : 1
}

/** Reconcile one editable order account and apply its activity-promotion policy. */
function nextSessionOrderAccount({
  sessionIds, previousOrder, previousUpdatedAt, list, orderBy, sortByRecency,
}: {
  sessionIds: readonly SessionId[]
  previousOrder: readonly string[] | undefined
  previousUpdatedAt: Readonly<Record<string, number>>
  list: SessionListState
  orderBy: SessionOrderBy
  sortByRecency: boolean
}): { order: SessionId[]; updatedAt: Record<string, number>; changed: boolean } {
  let order = reconciledSessionOrder(sessionIds, previousOrder)
  if (sortByRecency) {
    order.sort((a, b) => compareSessionRecency(a, b, list.byId))
  } else if (orderBy === 'updated') {
    const promoted = sessionIds
      .filter((id) => {
        const session = list.byId[id]
        return session !== undefined
          && (previousUpdatedAt[id] === undefined || session.updatedAt > previousUpdatedAt[id])
      })
      .sort((a, b) => compareSessionRecency(a, b, list.byId))
    if (promoted.length > 0) {
      const promotedIds = new Set(promoted)
      order = [...promoted, ...order.filter(id => !promotedIds.has(id))]
    }
  }
  const updatedAt: Record<string, number> = {}
  for (const id of sessionIds) {
    const session = list.byId[id]
    if (session !== undefined) updatedAt[id] = session.updatedAt
  }
  const orderChanged = previousOrder === undefined
    || order.length !== previousOrder.length
    || order.some((id, index) => id !== previousOrder[index])
  const timestampsChanged = Object.keys(updatedAt).length !== Object.keys(previousUpdatedAt).length
    || Object.entries(updatedAt).some(([id, timestamp]) => previousUpdatedAt[id] !== timestamp)
  return { order, updatedAt, changed: orderChanged || timestampsChanged }
}

/** Grouping and ordering menu; own open state so it resets with the wide chrome. */
function ViewOptionsMenu({ groupBy, orderBy, archivedFilter, hoistPinned, onGroupPick, onOrderPick, onArchivedFilterPick, onHoistPinnedPick, onCreateFolder, t }: {
  groupBy: SessionGroupBy
  orderBy: SessionOrderBy
  archivedFilter: 'default' | 'show' | 'only'
  /** Whether pinned Sessions render in one global section above the categories. */
  hoistPinned: boolean
  onGroupPick: (mode: SessionGroupBy) => void
  onOrderPick: (mode: SessionOrderBy) => void
  onArchivedFilterPick: (filter: 'default' | 'show' | 'only') => void
  /** Toggle the global hoist of pinned Sessions. */
  onHoistPinnedPick: (hoist: boolean) => void
  /** Open the display-folder create dialog (browser-local grouping). */
  onCreateFolder: () => void
  t: WorkspaceBrowserProps['t']
}) {
  const [open, setOpen] = useState(false)
  // Official-parity icons (dsh-client-ui-workspace uses the same glyph set).
  const filterIcons: Record<string, ReactNode> = {
    'hide-archived': <IconArchiveOffOutlineRegular />,
    'show-archived': <IconQueueOutlineRegular />,
    'only-archived': <IconArchiveCheckOutlineRegular />,
  }
  return (
    <Menu
      open={open}
      onClose={() => { setOpen(false) }}
      items={[
        // Display-only folder action lives in the existing view menu instead
        // of a third header icon: the header's trailing cluster has no room
        // for another 28px control next to view options and Add workspace.
        { id: 'new-folder', label: t('folder.create'), icon: <IconFolderCloseRegular /> },
        { type: 'separator' as const, id: 'new-folder-separator' },
        { type: 'label' as const, id: 'group-by', text: t('groupBy.label') },
        { id: 'workspace', label: t('groupBy.workspace') },
        // Official parity: the reference browser also offers a path-nested view.
        { id: 'workspace-tree', label: t('groupBy.workspaceTree') },
        { id: 'flat', label: t('groupBy.flat') },
        { type: 'separator' as const, id: 'order-by-separator' },
        { type: 'label' as const, id: 'order-by', text: t('orderBy.label') },
        { id: 'manual', label: t('orderBy.manual') },
        { id: 'updated', label: t('orderBy.updated') },
        { type: 'separator' as const, id: 'archived-filter-separator' },
        { type: 'label' as const, id: 'filter-by', text: t('filterBy.label') },
        { id: 'hide-archived', label: t('viewOptions.hideArchived'), icon: filterIcons['hide-archived'] },
        { id: 'show-archived', label: t('viewOptions.showArchived'), icon: filterIcons['show-archived'] },
        { id: 'only-archived', label: t('viewOptions.onlyArchived'), icon: filterIcons['only-archived'] },
        { type: 'separator' as const, id: 'hoist-pinned-separator' },
        { type: 'label' as const, id: 'hoist-pinned-label', text: t('viewOptions.hoist.label') },
        { id: 'hoist-pinned', label: t('viewOptions.hoist.on'), icon: <IconPinFillRegular /> },
        { id: 'keep-pinned', label: t('viewOptions.hoist.off'), icon: <IconPinOutlineRegular /> },
      ]}
      selectedIds={[
        groupBy,
        orderBy,
        archivedFilter === 'show' ? 'show-archived' : archivedFilter === 'only' ? 'only-archived' : 'hide-archived',
        hoistPinned ? 'hoist-pinned' : 'keep-pinned',
      ]}
      onSelect={(id) => {
        if (id === 'new-folder') onCreateFolder()
        else if (id === 'workspace' || id === 'workspace-tree' || id === 'flat') onGroupPick(id)
        else if (id === 'manual' || id === 'updated') onOrderPick(id)
        else if (id === 'hide-archived') onArchivedFilterPick('default')
        else if (id === 'show-archived') onArchivedFilterPick('show')
        else if (id === 'only-archived') onArchivedFilterPick('only')
        else if (id === 'hoist-pinned') onHoistPinnedPick(true)
        else if (id === 'keep-pinned') onHoistPinnedPick(false)
        setOpen(false)
      }}
      align="end"
      dense
      // Portal: the section header clips overflow, so an in-place list would
      // be cut off at the header's bounds.
      portal
      anchor={(
        <Tooltip label={t('viewOptions.label')} side="bottom" delayMs={500}>
          <button
            type="button"
            className={clsx(css.iconButton, css.wide)}
            aria-label={t('viewOptions.label')}
            onClick={() => { setOpen(v => !v) }}
          >
            <IconPersonalizationOutlineRegular />
          </button>
        </Tooltip>
      )}
    />
  )
}

/** In-flight root-row drag: source identity plus the current insert marker. */
interface DragState {
  /** Workspace id, or {@link UNGROUPED_KEY} for the browser-local loose-session account. */
  accountKey: string
  sessionId: SessionNode['id']
  /** Row the marker sits on and which half (insert above/below it). */
  over: { id: SessionNode['id']; half: 'before' | 'after' } | null
}

/** In-flight Workspace-row drag: source identity plus the current marker. */
interface WorkspaceDragState {
  workspaceId: WorkspaceId
  over: { id: WorkspaceId; half: 'before' | 'after' } | null
}

/** Resolve an insertion side from the full rendered workspace group. */
function workspaceGroupHalf(e: { clientY: number; currentTarget: HTMLElement }): 'before' | 'after' {
  const rect = e.currentTarget.getBoundingClientRect()
  return e.clientY < rect.top + rect.height / 2 ? 'before' : 'after'
}

type SessionTreeProps = Pick<
  WorkspaceBrowserProps,
  'useSessions' | 'startSession' | 'open' | 'forkSession'
  | 'insertWorkspaceBefore' | 'insertSessionBefore' | 'renameCategory'
  | 'moveCategory' | 'reorderCategory' | 'assignSessions' | 't'
> & {
  workspaces: readonly WorkspaceView[]
  /** Explicit persisted zero-or-five-session state by Workspace group. */
  groupExpansion: Readonly<Record<string, boolean>>
  /** Persist one Workspace group's zero-or-five-session state. */
  setGroupExpanded: (key: string, expanded: boolean) => void
  /** Shared editable orders used by Workspace groups and the flat-list account. */
  sessionOrderByAccount: Readonly<Record<string, readonly string[]>>
  /** Last update timestamps observed for one-time recent-update promotions. */
  sessionUpdatedAtByAccount: Readonly<Record<string, Readonly<Record<string, number>>>>
  /** Replace one shared order and its observed timestamps. */
  syncSessionOrderAccount: (accountKey: string, order: string[], updatedAt: Record<string, number>) => void
  /** Apply a drag to one shared order. */
  setSessionOrder: (accountKey: string, order: string[]) => void
  /** Registry-global archive set (hidden rows). */
  archivedSessionIds: readonly SessionNode['id'][]
  /**
   * The same registry-global set without the show-archived visibility filter,
   * forwarded to `buildCategoryTree` as its row-verb argument.
   */
  archivedSessionIdsRaw: readonly SessionNode['id'][]
  /** Official-parity three-state archived filter, gating the archive section. */
  archivedFilter: 'default' | 'show' | 'only'
  /** Nest Workspace sections by their directory paths ("by workspace tree"). */
  nestWorkspaces: boolean
  /** Open the browser-owned rename dialog for a real Workspace group. */
  onRenameRequest: (workspaceId: WorkspaceId, currentTitle: string) => void
  /** Open the browser-owned delete-confirmation dialog for a real Workspace group. */
  onDeleteRequest: (workspaceId: WorkspaceId, currentTitle: string) => void
  /** Open the browser-owned session rename dialog. */
  onSessionRename: (sessionId: SessionNode['id'], currentTitle: string) => void
  /** Archive a session (row menu action; the row disappears on the state echo). */
  onSessionArchive: (sessionId: SessionNode['id']) => void
  /** Return an archived session to its workspace slot (row menu action). */
  onSessionUnarchive: (sessionId: SessionNode['id']) => void
  /** Ask to delete a session's stored log (row menu action; opens a dialog). */
  onSessionDelete: (sessionId: SessionNode['id'], currentTitle: string) => void
  /** Pin a session ahead of every unpinned sibling (row menu action). */
  onSessionPin: (sessionId: SessionNode['id']) => void
  /** Remove a session from the pin set (row menu action). */
  onSessionUnpin: (sessionId: SessionNode['id']) => void
  /** Registry-global pin set, handed to every row this tree builds. */
  pinnedSessionIds: readonly SessionNode['id'][]
  /** Whether pinned Sessions render in one global section above the categories. */
  hoistPinned: boolean
  /** Session order behavior: fixed after edits, or additionally promoted by user activity. */
  orderBy: SessionOrderBy
  categorySnapshots: Readonly<Record<string, SessionCategorySnapshot>>
  categoryExpansion: Readonly<Record<string, boolean>>
  setCategoryExpanded: (key: string, expanded: boolean) => void
  onCreateCategory: (workspaceId: WorkspaceId, parentId: SessionCategoryId | null) => void
  onDeleteCategory: (
    categoryId: SessionCategoryId,
    title: string,
    descendantCount: number,
    sessionCount: number,
    runningCount: number,
  ) => void
  /** Display-only Workspace folders, in persistence order. */
  workspaceFolders: readonly WorkspaceFolder[]
  /** Workspace id → owning display folder id. */
  workspaceFolderAssignments: Readonly<Record<string, string>>
  /** Expanded state keyed by folder id or the unfiled bucket key. */
  workspaceFolderExpansion: Readonly<Record<string, boolean>>
  /** Persisted leading icon per Workspace (`dsh:` / `emoji:` ref). */
  workspaceIcons: Readonly<Record<string, string>>
  /** Persisted leading icon per display folder id. */
  workspaceFolderIcons: Readonly<Record<string, string>>
  /** Open the browser-owned icon picker for one Workspace row. */
  onPickWorkspaceIcon: (workspaceId: WorkspaceId, title: string) => void
  /** Open the browser-owned icon picker for one display folder row. */
  onPickWorkspaceFolderIcon: (folderId: string, title: string) => void
  /** Persist one folder's expanded state. */
  setWorkspaceFolderExpanded: (key: string, expanded: boolean) => void
  /** Rename a display folder (browser-local; no Host call). */
  renameWorkspaceFolder: (folderId: string, title: string) => void
  /** Remove a display folder; its Workspaces fall back to the unfiled bucket. */
  deleteWorkspaceFolder: (folderId: string) => void
  /** Move a display folder, optionally before a sibling anchor. */
  moveWorkspaceFolder: (folderId: string, parentId: string | null, beforeId?: string) => void
  /** File (or unfiled with `null`) one Workspace in a display folder. */
  assignWorkspaceFolder: (workspaceId: WorkspaceId, folderId: string | null) => void
  /** Open the browser-owned "new folder" dialog for this parent. */
  onCreateWorkspaceFolder: (parentId: string | null) => void
}

/** The scrolling session tree; unmounting drops the sessions subscription and expand-all state. */
function SessionTree({
  useSessions, startSession, open, forkSession, workspaces, archivedSessionIds, archivedSessionIdsRaw, archivedFilter, nestWorkspaces,
  renameCategory, moveCategory, reorderCategory, assignSessions, categorySnapshots,
  categoryExpansion, setCategoryExpanded, onCreateCategory, onDeleteCategory,
  workspaceFolders, workspaceFolderAssignments, workspaceFolderExpansion,
  workspaceIcons, workspaceFolderIcons, onPickWorkspaceIcon, onPickWorkspaceFolderIcon,
  setWorkspaceFolderExpanded, renameWorkspaceFolder, deleteWorkspaceFolder,
  moveWorkspaceFolder, assignWorkspaceFolder, onCreateWorkspaceFolder,
  onRenameRequest, onDeleteRequest, onSessionRename, onSessionArchive, onSessionUnarchive, onSessionDelete,
  onSessionPin, onSessionUnpin, pinnedSessionIds,
  hoistPinned,
  insertWorkspaceBefore, insertSessionBefore, orderBy,
  groupExpansion, setGroupExpanded,
  sessionOrderByAccount, sessionUpdatedAtByAccount, syncSessionOrderAccount, setSessionOrder, t,
}: SessionTreeProps) {
  const list = useSessions(s => s)
  const current = currentSessionId(list)
  const [expandedSessionGroups, setExpandedSessionGroups] = useState<string[]>([])
  // Transient drag marker state; the selected mode owns the resulting order.
  const [drag, setDrag] = useState<DragState | null>(null)
  const sessionDropCommitted = useRef(false)
  const [workspaceDrag, setWorkspaceDrag] = useState<WorkspaceDragState | null>(null)
  /** Source folder id of an in-flight display-folder drag; rows own the zone. */
  const [folderDragId, setFolderDragId] = useState<string | null>(null)
  /**
   * Display folder whose block a Workspace drag is currently over — the row
   * itself or the expanded body underneath it. The header row highlights from
   * this so dropping anywhere on the folder block reads as the same action.
   */
  const [workspaceFolderHover, setWorkspaceFolderHover] = useState<string | null>(null)
  const [pendingCategorySession, setPendingCategorySession] = useState<{
    workspaceId: WorkspaceId
    categoryId: SessionCategoryId
  } | null>(null)
  const workspaceDropCommitted = useRef(false)
  const previousOrderBy = useRef(orderBy)
  const nativeDragActive = drag !== null || workspaceDrag !== null || folderDragId !== null
  useNativeDragAcceptance(nativeDragActive)
  const currentGroup = current === undefined
    ? undefined
    : (workspaces.find(w => w.sessionIds.includes(current))?.workspaceId as string | undefined)
      ?? UNGROUPED_KEY
  useEffect(() => {
    if (current === undefined || currentGroup === undefined || Object.hasOwn(groupExpansion, currentGroup)) return
    setGroupExpanded(currentGroup, true)
  }, [current, currentGroup, setGroupExpanded, groupExpansion])
  useEffect(() => {
    if (pendingCategorySession === null || current === undefined) return
    const workspace = workspaces.find(candidate => candidate.workspaceId === pendingCategorySession.workspaceId)
    if (workspace === undefined || !workspace.sessionIds.includes(current)) return
    setPendingCategorySession(null)
    void assignSessions(pendingCategorySession.workspaceId, [current], pendingCategorySession.categoryId)
  }, [assignSessions, current, pendingCategorySession, workspaces])
  const expandedGroups = useMemo(
    () => Object.entries(groupExpansion).filter(([, expanded]) => expanded).map(([key]) => key),
    [groupExpansion],
  )
  const ungroupedSessionIds = useMemo(() => {
    const accounted = new Set(workspaces.flatMap(workspace => workspace.sessionIds))
    return list.ids.filter(id => list.byId[id] !== undefined && !accounted.has(id))
  }, [list, workspaces])
  useEffect(() => {
    if (list.phase !== 'ready') return
    const switchedToUpdated = previousOrderBy.current !== 'updated' && orderBy === 'updated'
    previousOrderBy.current = orderBy
    const accounts = [
      ...workspaces.map(workspace => ({
        key: workspace.workspaceId as string,
        sessionIds: workspace.sessionIds.filter(id => list.byId[id] !== undefined),
      })),
      { key: UNGROUPED_KEY, sessionIds: ungroupedSessionIds },
    ]
    for (const { key, sessionIds } of accounts) {
      const previousOrder = sessionOrderByAccount[key]
      const previousUpdatedAt = sessionUpdatedAtByAccount[key] ?? {}
      const next = nextSessionOrderAccount({
        sessionIds,
        previousOrder,
        previousUpdatedAt,
        list,
        orderBy,
        sortByRecency: orderBy === 'updated' && (previousOrder === undefined || switchedToUpdated),
      })
      if (next.changed) {
        syncSessionOrderAccount(key, next.order.map(id => id as string), next.updatedAt)
      }
    }
  }, [list, orderBy, sessionOrderByAccount, sessionUpdatedAtByAccount, syncSessionOrderAccount, ungroupedSessionIds, workspaces])
  const orderedWorkspaces = useMemo(() => {
    return workspaces.map((workspace) => {
      const stored = sessionOrderByAccount[workspace.workspaceId as string]
      const sessionIds = reconciledSessionOrder(workspace.sessionIds, stored)
      return { ...workspace, sessionIds }
    })
  }, [sessionOrderByAccount, workspaces])
  const orderedUngroupedSessionIds = useMemo(
    () => reconciledSessionOrder(ungroupedSessionIds, sessionOrderByAccount[UNGROUPED_KEY]),
    [sessionOrderByAccount, ungroupedSessionIds],
  )
  const groups = useMemo(
    () => deriveGroups(list, orderedWorkspaces, archivedSessionIds, {
      expandedGroups,
      ...(sessionOrderByAccount[UNGROUPED_KEY] === undefined
        ? {}
        : { ungroupedOrder: sessionOrderByAccount[UNGROUPED_KEY] }),
      // Three-state archived filter, official-parity: default hides the
      // section, show renders it expanded among the groups, only renders it
      // alone with every workspace group suppressed.
      showArchiveSection: archivedFilter !== 'default' && archivedSessionIdsRaw.length > 0,
      groupExpansion,
      archivedFilter,
      nestWorkspaces,
    }, pinnedSessionIds, archivedSessionIdsRaw, archivedFilter),
    [list, orderedWorkspaces, archivedSessionIds, expandedGroups, sessionOrderByAccount, pinnedSessionIds, archivedSessionIdsRaw, archivedFilter, groupExpansion, nestWorkspaces],
  )
  // ---- Display-only Workspace folders --------------------------------------
  // Browser-local grouping of root-level Workspace sections. The layer is
  // purely visual: it never renames a Workspace or Session, never moves a
  // Session, and never touches the filesystem. An empty folder list leaves the
  // native section stream exactly as shipped.
  const folderForest = useMemo(
    () => buildWorkspaceFolderForest(workspaceFolders, workspaceFolderAssignments, workspaceFolderExpansion),
    [workspaceFolders, workspaceFolderAssignments, workspaceFolderExpansion],
  )
  const folderOptions = useMemo(() => workspaceFolderOptions(folderForest), [folderForest])
  const hasFolderLayer = folderForest.roots.length > 0
  const rootGroups = useMemo(() => groups.filter(group => group.parentKey === undefined), [groups])
  const archiveGroup = rootGroups.find(group => group.key === ARCHIVED_KEY)
  const contentRootGroups = rootGroups.filter(group => group.key !== ARCHIVED_KEY)
  const workspaceRootIds = contentRootGroups
    .map(group => group.workspaceId)
    .filter((workspaceId): workspaceId is WorkspaceId => workspaceId !== undefined)
  const groupsInFolder = (folderId: string): readonly GroupNode[] => contentRootGroups.filter(
    group => group.workspaceId !== undefined && folderForest.assignments[group.workspaceId] === folderId)
  const unfiledGroups = hasFolderLayer
    ? contentRootGroups.filter(group => group.workspaceId === undefined || folderForest.assignments[group.workspaceId] === undefined)
    : contentRootGroups
  const unfiledExpanded = workspaceFolderExpansion[UNFILED_WORKSPACE_FOLDER_KEY] !== false
  /** Display folder currently owning one Workspace, or null when unfiled. */
  const folderOfWorkspace = (workspaceId: WorkspaceId | undefined): string | null =>
    workspaceId === undefined ? null : (folderForest.assignments[workspaceId] ?? null)
  const folderWorkspaceCount = (node: WorkspaceFolderNode): number =>
    countDirectWorkspaces(workspaceRootIds, node.id, folderForest.assignments)
    + node.children.reduce((total, child) => total + folderWorkspaceCount(child), 0)
  const folderContainsCurrent = (node: WorkspaceFolderNode): boolean =>
    groupsInFolder(node.id).some(group => group.containsCurrent)
    || node.children.some(child => folderContainsCurrent(child))
  const folderMoveTargets = (folderId: string): readonly WorkspaceFolderOption[] => {
    const invalid = new Set(workspaceFolderInvalidTargets(folderForest, folderId))
    return folderOptions.filter(option => !invalid.has(option.id))
  }
  /**
   * Commit a Workspace row dropped on a folder (or on the unfiled bucket).
   * Filing is display-only, so the only writes are one browser-local
   * assignment and, for a collapsed target, its expansion flag.
   */
  const commitWorkspaceDropOnFolder = (folderId: string | null): void => {
    if (workspaceDrag === null) return
    const workspaceId = workspaceDrag.workspaceId
    setWorkspaceDrag(null)
    setWorkspaceFolderHover(null)
    if (folderId !== null) setWorkspaceFolderExpanded(folderId, true)
    assignWorkspaceFolder(workspaceId, folderId)
  }
  /**
   * Commit a folder row dropped on another folder row: top/bottom bands
   * reorder among the target's siblings, the middle band nests inside it. A
   * drop on the unfiled bucket always means "back to the top level".
   */
  const commitFolderDrop = (sourceId: string, targetId: string, zone: WorkspaceFolderDropZone): void => {
    setFolderDragId(null)
    if (targetId === UNFILED_WORKSPACE_FOLDER_KEY) {
      moveWorkspaceFolder(sourceId, null)
      return
    }
    const target = folderForest.byId.get(targetId)
    if (target === undefined) return
    if (zone === 'inside') {
      setWorkspaceFolderExpanded(target.id, true)
      moveWorkspaceFolder(sourceId, target.id)
      return
    }
    const siblings = target.parentId === null
      ? folderForest.roots
      : (folderForest.byId.get(target.parentId)?.children ?? [])
    const targetIndex = siblings.findIndex(sibling => sibling.id === target.id)
    const anchor = zone === 'before' ? target.id : siblings[targetIndex + 1]?.id
    moveWorkspaceFolder(sourceId, target.parentId, anchor)
  }
  const now = Date.now()
  /** Pin set as a lookup, so anchor resolution can skip hoisted rows cheaply. */
  const pinnedSet = useMemo(() => new Set(pinnedSessionIds as readonly string[]), [pinnedSessionIds])
  /**
   * Translate a pointer hit in the *rendered* row list into an anchor in the
   * *stored* order.
   *
   * Pinned rows are hoisted to the front at render time but keep their original
   * slot in the stored sequence, so `rendered[i]` and `stored[i]` are different
   * sessions as soon as one row is pinned. Resolving the anchor by index inside
   * the rendered list and then inserting into the stored list silently lands the
   * dragged row somewhere the user did not point at. Walking forward from the
   * hit until a row that is not the dragged one and not pinned gives an anchor
   * that means the same thing in both lists; running off the end appends.
   *
   * @param rendered - Row ids in display order (pinned first).
   * @param stored - Row ids in stored order (no pin partition).
   * @param draggedId - Row being moved.
   * @param overId - Row the pointer released on.
   * @param half - Which half of `overId` the pointer released in.
   * @param pinned - Registry-global pin set.
   * @returns the anchor id to insert before, or undefined to append.
   */
  const storedAnchorFor = (
    rendered: readonly string[],
    stored: readonly string[],
    draggedId: string,
    overId: string,
    half: 'before' | 'after',
    pinned: ReadonlySet<string>,
  ): string | undefined => {
    const hitIndex = rendered.indexOf(overId)
    if (hitIndex === -1) return undefined
    const storedSet = new Set(stored)
    for (let index = half === 'before' ? hitIndex : hitIndex + 1; index < rendered.length; index++) {
      const id = rendered[index]!
      if (id === draggedId || pinned.has(id) || !storedSet.has(id)) continue
      return id
    }
    return undefined
  }
  const commitSessionDrag = (activeDrag: DragState, over: NonNullable<DragState['over']>): void => {
    if (sessionDropCommitted.current) return
    sessionDropCommitted.current = true
    setDrag(null)
    const group = groups.find(candidate => candidate.key === activeDrag.accountKey)
    if (group === undefined) return
    const accountSessionIds = activeDrag.accountKey === UNGROUPED_KEY
      ? orderedUngroupedSessionIds
      : orderedWorkspaces.find(workspace => workspace.workspaceId === activeDrag.accountKey)?.sessionIds
    if (accountSessionIds === undefined) return
    const anchor = storedAnchorFor(
      group.sessions.map(session => session.id),
      accountSessionIds,
      activeDrag.sessionId,
      over.id,
      over.half,
      pinnedSet,
    )
    if (anchor === activeDrag.sessionId) return
    const sourceIndex = accountSessionIds.indexOf(activeDrag.sessionId)
    const anchorIndex = anchor === undefined ? accountSessionIds.length : accountSessionIds.indexOf(anchor)
    if (sourceIndex !== -1 && (anchorIndex === sourceIndex || anchorIndex === sourceIndex + 1)) return
    const nextOrder = accountSessionIds.filter(id => id !== activeDrag.sessionId)
    const insertAt = anchor === undefined ? nextOrder.length : nextOrder.indexOf(anchor)
    nextOrder.splice(insertAt === -1 ? nextOrder.length : insertAt, 0, activeDrag.sessionId)
    setSessionOrder(activeDrag.accountKey, nextOrder.map(id => id as string))
    if (orderBy === 'updated' || activeDrag.accountKey === UNGROUPED_KEY) return
    insertSessionBefore(activeDrag.accountKey as WorkspaceId, activeDrag.sessionId, anchor as SessionNode['id'] | undefined).catch((reason: unknown) => {
      console.warn('session reorder rejected:', reason)
    })
  }
  const commitWorkspaceDrag = (
    activeDrag: WorkspaceDragState,
    over: NonNullable<WorkspaceDragState['over']>,
  ): void => {
    if (workspaceDropCommitted.current) return
    workspaceDropCommitted.current = true
    setWorkspaceDrag(null)
    const rowIndex = workspaces.findIndex(workspace => workspace.workspaceId === over.id)
    if (rowIndex === -1) return
    const anchor = over.half === 'before' ? over.id : workspaces[rowIndex + 1]?.workspaceId
    if (anchor === activeDrag.workspaceId) return
    const sourceIndex = workspaces.findIndex(workspace => workspace.workspaceId === activeDrag.workspaceId)
    const anchorIndex = anchor === undefined
      ? workspaces.length
      : workspaces.findIndex(workspace => workspace.workspaceId === anchor)
    if (sourceIndex !== -1 && (anchorIndex === sourceIndex || anchorIndex === sourceIndex + 1)) return
    insertWorkspaceBefore(activeDrag.workspaceId, anchor).catch((reason: unknown) => {
      console.warn('workspace reorder rejected:', reason)
    })
  }
  const workspaceDropAtListStart = groups[0]?.workspaceId !== undefined
    && workspaceDrag?.over?.id === groups[0].workspaceId
    && workspaceDrag.over.half === 'before'
  // Which sections own children in "by workspace tree": a section with none
  // must not render an empty group container, which would still eat a margin.
  const childKeys = useMemo(() => {
    const keys = new Set<string>()
    for (const group of groups) {
      if (group.parentKey !== undefined) keys.add(group.parentKey)
    }
    return keys
  }, [groups])

  /**
   * Render one Workspace section.
   *
   * In the default and flat modes every group is a root, so a run of calls
   * reads as a flat list of sections. In "by workspace tree" the derivation
   * gives a child group its parent's key, and the parent section renders the
   * child through {@link renderGroupList} inside itself — that nesting is what
   * makes the mode read as a directory tree rather than as indented siblings.
   *
   * @param group - the derived section to render.
   * @returns the section element.
   */
  const renderGroup = (group: GroupNode): ReactNode => {
            const workspaceId = group.workspaceId
            const categorySnapshot = workspaceId === undefined ? undefined : categorySnapshots[workspaceId]
            const categoryProjection = workspaceId === undefined || categorySnapshot === undefined
              ? undefined
              : buildCategoryTree(
                categorySnapshot,
                // Must read `orderedWorkspaces`, not `workspaces`: the stored
                // order lives on the reconciled copy. Reading the Host array
                // here rebuilt every row from Host order and silently threw
                // away the user's drag order for any Workspace that has a
                // category snapshot.
                (orderedWorkspaces.find(workspace => workspace.workspaceId === workspaceId)?.sessionIds ?? [])
                  .map(id => list.byId[id]).filter(session => session !== undefined),
                {
                  expandedCategories: categorySnapshot.categories
                    .filter(category => categoryExpansion[category.id] === true).map(category => category.id),
                  expandedCategoryState: categoryExpansion,
                  ...(current === undefined ? {} : { currentSessionId: current }), archivedSessionIds,
                  categoryOrder: sessionOrderByAccount,
                },
                pinnedSessionIds,
                // The row-verb set must be the registry-global archive list. The
                // `archivedSessionIds` prop above is the visibility-filtered view
                // set (emptied while "show archived" is on), which is correct for
                // hiding rows but would blank every verb marker; the raw set is
                // what each row reads to decide archive vs unarchive.
                archivedSessionIdsRaw,
                hoistPinned,
              )
            const categoryChoices = categorySnapshot?.categories.map(category => {
              let depth = 0
              let parentId = category.parentId
              while (parentId !== null) {
                depth++
                parentId = categorySnapshot.categories.find(candidate => candidate.id === parentId)?.parentId ?? null
              }
              return { id: category.id, title: category.title, depth }
            }) ?? []
            // One array drives both the rows and the overflow button. When a
            // category tree is projected, the unclassified tail is what actually
            // renders below the categories —so the limit and the count have to
            // describe THAT list. Reading `group.sessions` here counted every
            // member (including categorized ones) while rendering only the tail,
            // which made "expand the remaining N" a no-op that never revealed a row.
            //
            // The projection exists whenever the Workspace has a category
            // snapshot, and it is only consulted while the group is expanded; a
            // collapsed group renders no session rows at all.
            const projectedRows = group.expanded
              ? (categoryProjection !== undefined ? categoryProjection.unclassifiedSessions : group.sessions)
              : []
            const rowsExpanded = expandedSessionGroups.includes(group.key)
            const visibleSessionRows = rowsExpanded
              ? projectedRows
              : projectedRows.slice(0, COLLAPSED_SESSION_LIMIT)
            const invalidSourcesForTarget = (categoryId: SessionCategoryId): SessionCategoryId[] => {
              const invalid = [categoryId]
              let parentId = categorySnapshot?.categories.find(category => category.id === categoryId)?.parentId ?? null
              while (parentId !== null) {
                invalid.push(parentId)
                parentId = categorySnapshot?.categories.find(category => category.id === parentId)?.parentId ?? null
              }
              return invalid
            }
            const invalidTargetsForSource = (categoryId: SessionCategoryId): SessionCategoryId[] => {
              const invalid = [categoryId]
              for (let index = 0; index < invalid.length; index++) {
                const parentId = invalid[index]!
                for (const category of categorySnapshot?.categories ?? []) {
                  if (category.parentId === parentId && !invalid.includes(category.id)) invalid.push(category.id)
                }
              }
              return invalid
            }
            const categoryDeleteCounts = (categoryId: SessionCategoryId): {
              descendantCount: number
              sessionCount: number
              runningCount: number
            } => {
              const categoryIds = [categoryId]
              for (let index = 0; index < categoryIds.length; index++) {
                const parentId = categoryIds[index]!
                for (const category of categorySnapshot?.categories ?? []) {
                  if (category.parentId === parentId && !categoryIds.includes(category.id)) categoryIds.push(category.id)
                }
              }
              // A Session that is currently running is not just "moved": deleting
              // its category stops its activity (the Host passes `stopActivity`),
              // so the confirmation has to say so instead of letting the user
              // discover it afterwards. `list.byId` is the registry view that
              // carries `running`, which the category snapshot does not.
              const assignedIds = (categorySnapshot?.assignments ?? [])
                .filter(assignment => categoryIds.includes(assignment.categoryId))
                .map(assignment => assignment.sessionId)
              return {
                descendantCount: categoryIds.length - 1,
                sessionCount: assignedIds.length,
                runningCount: assignedIds.filter(id => list.byId[id]?.running === true).length,
              }
            }
            const renderCategory = (node: CategoryNode, depth: number): ReactNode => {
              // Categories own a separate manual order from the Workspace: a drag
              // inside one must not reshuffle the Workspace's unclassified tail,
              // so the account key is `category:<id>` rather than the Workspace id.
              const categoryAccountKey = categoryOrderKey(node.id)
              const categoryDrag = drag !== null && drag.accountKey === categoryAccountKey ? drag : null
              const commitCategoryDrag = (
                activeDrag: DragState,
                over: NonNullable<DragState['over']>,
              ): void => {
                // Pure client-side arrangement: the Host has no per-category
                // sequence, so this writes the store and never calls
                // `insertSessionBefore`.
                if (sessionDropCommitted.current) return
                sessionDropCommitted.current = true
                setDrag(null)
                const base = node.orderedSessionIds
                const targetIndex = base.indexOf(over.id)
                if (targetIndex === -1) return
                const anchor = over.half === 'before' ? over.id : base[targetIndex + 1]
                if (anchor === activeDrag.sessionId) return
                const sourceIndex = base.indexOf(activeDrag.sessionId)
                const anchorIndex = anchor === undefined ? base.length : base.indexOf(anchor)
                if (sourceIndex !== -1 && (anchorIndex === sourceIndex || anchorIndex === sourceIndex + 1)) return
                const nextOrder = base.filter(id => id !== activeDrag.sessionId)
                const insertAt = anchor === undefined ? nextOrder.length : nextOrder.indexOf(anchor)
                nextOrder.splice(insertAt === -1 ? nextOrder.length : insertAt, 0, activeDrag.sessionId)
                setSessionOrder(categoryAccountKey, nextOrder.map(id => id as string))
              }
              const categoryDragPropsFor = (sessionId: SessionNode['id']) => ({
                start: () => {
                  sessionDropCommitted.current = false
                  setDrag({ accountKey: categoryAccountKey, sessionId, over: null })
                },
                active: categoryDrag !== null,
                marker: categoryDrag?.over?.id === sessionId ? categoryDrag.over.half : null,
                hover: (half: 'before' | 'after') => {
                  setDrag(d => (d === null ? d : { ...d, over: { id: sessionId, half } }))
                },
                drop: (half: 'before' | 'after') => {
                  if (categoryDrag === null) return
                  commitCategoryDrag(categoryDrag, { id: sessionId, half })
                },
                end: () => {
                  if (categoryDrag?.over !== null && categoryDrag?.over !== undefined) {
                    commitCategoryDrag(categoryDrag, categoryDrag.over)
                  } else {
                    setDrag(null)
                  }
                  sessionDropCommitted.current = false
                },
              })
              return (
              <div key={node.id} role="group" className={clsx(css.categoryGroup, node.expanded && css.categoryGroupExpanded)}
                data-category-container={node.expanded ? 'expanded' : 'collapsed'}
                style={{ '--category-depth': depth } as React.CSSProperties}>
                <CategoryRowItem node={node} workspaceId={workspaceId!} depth={depth}
                  categoryOptions={categoryChoices} invalidMoveTargetIds={invalidTargetsForSource(node.id)}
                  invalidCategorySourceIds={invalidSourcesForTarget(node.id)}
                  onToggle={() => { setCategoryExpanded(node.id, !node.expanded) }}
                  onCreate={() => {
                    setPendingCategorySession({ workspaceId: workspaceId!, categoryId: node.id })
                    setGroupExpanded(group.key, true)
                    startSession(workspaceId)
                  }}
                  onCreateCategory={(parentId) => { onCreateCategory(workspaceId!, parentId) }}
                  onRename={async (categoryId, title) => {
                    const result = await renameCategory(categoryId, title)
                    if (!result.ok) throw new Error('message' in result.error ? result.error.message : result.error.code)
                  }}
                  onMove={async (categoryId, parentId) => {
                    const result = await moveCategory(categoryId, parentId)
                    if (!result.ok) throw new Error('message' in result.error ? result.error.message : result.error.code)
                  }}
                  onDelete={(categoryId) => {
                    const counts = categoryDeleteCounts(categoryId)
                    onDeleteCategory(categoryId, node.title, counts.descendantCount, counts.sessionCount, counts.runningCount)
                  }}
                  onDropPayload={(payload: CategoryDragPayload, targetId) => {
                    if (payload.kind === 'session') void assignSessions(payload.workspaceId, payload.sessionIds, targetId)
                    else void moveCategory(payload.categoryId, targetId)
                  }}
                  onReorder={(sourceId, targetId, half) => {
                    // Same-parent only: `reorderCategory` sorts among current
                    // siblings, so a cross-level drop has to keep its nesting
                    // verb instead of silently doing nothing at the Host.
                    const parentOf = (id: SessionCategoryId): SessionCategoryId | null =>
                      categorySnapshot?.categories.find(category => category.id === id)?.parentId ?? null
                    if (parentOf(sourceId) !== parentOf(targetId)) {
                      void moveCategory(sourceId, targetId)
                      return
                    }
                    if (sourceId === targetId) return
                    // The Host takes a `beforeCategoryId` anchor, so an
                    // "after" drop resolves to the next sibling in render
                    // order; the tail has no anchor and appends.
                    const siblings = (categorySnapshot?.categories ?? [])
                      .filter(category => category.parentId === parentOf(targetId))
                      .sort((left, right) => left.order - right.order)
                      .map(category => category.id)
                    const targetIndex = siblings.indexOf(targetId)
                    const anchor = half === 'before' ? targetId : siblings[targetIndex + 1]
                    if (anchor === sourceId) return
                    void reorderCategory(sourceId, anchor)
                  }} t={t} />
                {node.children.map(child => renderCategory(child, depth + 1))}
                {node.sessions.map(session => <SessionNodeItem key={session.id} node={session} currentId={current} now={now}
                  onOpen={open} onRename={onSessionRename} onFork={forkSession} onArchive={onSessionArchive} onUnarchive={onSessionUnarchive} onDelete={onSessionDelete} onPin={onSessionPin} onUnpin={onSessionUnpin} t={t}
                  categoryDepth={depth + 1}
                  drag={categoryDragPropsFor(session.id)}
                  categoryMove={{ workspaceId: workspaceId!, categories: categoryChoices,
                    onMove: categoryId => assignSessions(workspaceId!, [session.id], categoryId) }} />)}
              </div>
              )
            }
            const workspaceMarker = workspaceId !== undefined && workspaceDrag?.over?.id === workspaceId
              ? workspaceDrag.over.half
              : null
            const workspaceDragProps = workspaceId === undefined ? undefined : {
              start: () => {
                workspaceDropCommitted.current = false
                setWorkspaceFolderHover(null)
                setWorkspaceDrag({ workspaceId, over: null })
              },
              end: () => {
                setWorkspaceFolderHover(null)
                if (workspaceDrag?.over !== null && workspaceDrag?.over !== undefined) {
                  commitWorkspaceDrag(workspaceDrag, workspaceDrag.over)
                } else {
                  setWorkspaceDrag(null)
                }
                workspaceDropCommitted.current = false
              },
            }
            const hoverWorkspace = workspaceId === undefined
              ? undefined
              : (half: 'before' | 'after') => {
                setWorkspaceDrag(active => active === null
                  ? active
                  : { ...active, over: { id: workspaceId, half } })
              }
            const dropWorkspace = workspaceId === undefined
              ? undefined
              : (half: 'before' | 'after') => {
                if (workspaceDrag === null) return
                commitWorkspaceDrag(workspaceDrag, { id: workspaceId, half })
              }
            const renderSessionRow = (node: SessionNode): ReactNode => {

          // Session drag never leaves its group. Ungrouped writes only the
          // browser-local account; real Workspaces may also write Host order.
            const sameGroupDrag = drag !== null && drag.accountKey === group.key
            const archiveRow = group.key === ARCHIVED_KEY
            const dragProps = {
              start: () => {
                sessionDropCommitted.current = false
                setDrag({ accountKey: group.key, sessionId: node.id, over: null })
              },
              active: sameGroupDrag,
              marker: sameGroupDrag && drag.over?.id === node.id ? drag.over.half : null,
              hover: (half: 'before' | 'after') => {
              /* v8 ignore next -- narrowing guard: Rows gates hover on `active`, which is false while the drag state is null. */
                setDrag(d => (d === null ? d : { ...d, over: { id: node.id, half } }))
              },
              drop: (half: 'before' | 'after') => {
              /* v8 ignore next -- narrowing guard: Rows gates drop on `active`, which is false while the drag state is null. */
                if (drag === null) return
                commitSessionDrag(drag, { id: node.id, half })
              },
              end: () => {
                if (drag?.over !== null && drag?.over !== undefined) commitSessionDrag(drag, drag.over)
                else setDrag(null)
                sessionDropCommitted.current = false
              },
            }
            return (
              <SessionNodeItem
                key={node.id}
                node={node}
                currentId={current}
                now={now}
                onOpen={open}
                onRename={onSessionRename}
                onFork={forkSession}
                onArchive={onSessionArchive}
                onUnarchive={onSessionUnarchive}
                onDelete={onSessionDelete}
                onPin={onSessionPin}
                onUnpin={onSessionUnpin}
                drag={archiveRow ? undefined : dragProps}
                categoryMove={workspaceId === undefined ? undefined : {
                  workspaceId, categories: categoryChoices,
                  onMove: categoryId => assignSessions(workspaceId, [node.id], categoryId),
                }}
                t={t}
              />
            )

            }
            return (
            // Group section: header row + expanded top-level session rows. The
            // inter-group breathing room is the section's own margin
            // (WorkspaceBrowser.module.css).
              <div
                key={group.key}
                className={clsx(
                  css.groupSection,
                  workspaceMarker === 'before' && css.workspaceDropBefore,
                  workspaceMarker === 'after' && css.workspaceDropAfter,
                )}
                onDragOver={workspaceDrag === null || hoverWorkspace === undefined
                  ? undefined
                  : (e) => {
                    e.preventDefault()
                    e.dataTransfer.dropEffect = 'move'
                    // A Workspace dragged from another folder (or from Unfiled)
                    // files into this row's folder when released here; only a
                    // same-folder drag re-orders. Without this, dropping onto
                    // the expanded body of a folder silently did nothing.
                    const targetFolder = folderOfWorkspace(workspaceId)
                    if (targetFolder !== folderOfWorkspace(workspaceDrag.workspaceId)) {
                      setWorkspaceFolderHover(targetFolder ?? UNFILED_WORKSPACE_FOLDER_KEY)
                      setWorkspaceDrag(active => (active === null ? active : { ...active, over: null }))
                      return
                    }
                    setWorkspaceFolderHover(null)
                    hoverWorkspace(workspaceGroupHalf(e))
                  }}
                onDrop={workspaceDrag === null || dropWorkspace === undefined
                  ? undefined
                  : (e) => {
                    e.preventDefault()
                    const targetFolder = folderOfWorkspace(workspaceId)
                    if (targetFolder !== folderOfWorkspace(workspaceDrag.workspaceId)) {
                      commitWorkspaceDropOnFolder(targetFolder)
                      return
                    }
                    dropWorkspace(workspaceGroupHalf(e))
                  }}
              >
                <ProjectRowItem
                  group={group}
                  t={t}
                  isArchiveSection={group.key === ARCHIVED_KEY}
                  icon={workspaceId === undefined ? undefined : workspaceIcons[workspaceId]}
                  onPickIcon={workspaceId === undefined
                    ? undefined
                    : () => { onPickWorkspaceIcon(workspaceId, group.label) }}
                  onToggle={() => {
                    if (group.expanded) {
                      setExpandedSessionGroups(keys => keys.filter(key => key !== group.key))
                    }
                    setGroupExpanded(group.key, !group.expanded)
                  }}
                  onCreate={() => {
                    // The archive section never hosts new sessions; its header's
                    // create affordance is hidden alongside the actions menu.
                    if (group.workspaceId !== undefined) {
                      setGroupExpanded(group.key, true)
                      startSession(group.workspaceId)
                    }
                  }}
                  drag={workspaceDragProps}
                  actions={group.workspaceId === undefined
                    ? undefined
                    : {
                      rename: () => {
                      /* v8 ignore next -- narrowing guard: the actions object exists only for real-workspace groups. */
                        if (group.workspaceId !== undefined) onRenameRequest(group.workspaceId, group.label)
                      },
                      delete: () => {
                      /* v8 ignore next -- narrowing guard: the actions object exists only for real-workspace groups. */
                        if (group.workspaceId !== undefined) onDeleteRequest(group.workspaceId, group.label)
                      },
                      createCategory: () => {
                        if (group.workspaceId !== undefined) onCreateCategory(group.workspaceId, null)
                      },
                      setIcon: () => {
                        if (workspaceId !== undefined) onPickWorkspaceIcon(workspaceId, group.label)
                      },
                      // Display-folder placement lives on the same row menu the
                      // user already opened; it writes only the browser-local
                      // assignment (and expands a collapsed target).
                      moveToFolder: hasFolderLayer
                        ? {
                          folders: folderOptions,
                          currentFolderId: workspaceFolderAssignments[group.workspaceId] ?? null,
                          onMove: (folderId: string | null) => {
                            if (folderId !== null) setWorkspaceFolderExpanded(folderId, true)
                            assignWorkspaceFolder(group.workspaceId, folderId)
                          },
                        }
                        : undefined,
                    }}
                />
                {group.expanded && categoryProjection?.pinnedSessions.map(node => renderSessionRow(node))}
                {group.expanded && categoryProjection?.categories.map(node => renderCategory(node, 0))}
                {visibleSessionRows.map(node => renderSessionRow(node))}
                {projectedRows.length > COLLAPSED_SESSION_LIMIT && (
                  <button
                    type="button"
                    className={css.sessionOverflowButton}
                    aria-expanded={rowsExpanded}
                    onClick={() => { setExpandedSessionGroups(keys => toggled(keys, group.key)) }}
                  >
                    {rowsExpanded
                      ? t('sessions.collapse')
                      : t('sessions.expand', { n: projectedRows.length - COLLAPSED_SESSION_LIMIT })}
                  </button>
                )}
                {/* "By workspace tree": a Workspace whose folder sits inside this
                    one renders as a nested group inside this section. The default
                    and flat modes never set `parentKey`, so `childKeys` is empty
                    there and this branch contributes nothing. */}
                {group.expanded && childKeys.has(group.key) && (
                  <div role="group" className={css.workspaceChildGroup}>
                    {renderGroupList(group.key)}
                  </div>
                )}
              </div>
            )
  }
  /**
   * The sections owned by `parentKey`, in derivation order.
   *
   * @param parentKey - owning group key, or undefined for the top level.
   * @returns the section elements.
   */
  const renderGroupList = (parentKey: string | undefined): ReactNode[] => groups
    .filter(group => group.parentKey === parentKey)
    .map(group => renderGroup(group))

  /**
   * Render one display folder: the heading row plus, while expanded, its child
   * folders and the Workspace sections filed directly into it.
   *
   * @param node - projected folder node.
   * @returns the folder element.
   */
  const renderFolderNode = (node: WorkspaceFolderNode): ReactNode => {
    const memberGroups = groupsInFolder(node.id)
    return (
      <div key={node.id} className={css.workspaceFolderGroup}>
        <WorkspaceFolderRow
          node={node}
          workspaceCount={folderWorkspaceCount(node)}
          containsCurrent={folderContainsCurrent(node)}
          folderDragActive={folderDragId !== null}
          workspaceDragActive={workspaceDrag !== null}
          icon={workspaceFolderIcons[node.id]}
          onPickIcon={() => { onPickWorkspaceFolderIcon(node.id, node.title) }}
          workspaceHovered={workspaceFolderHover === node.id}
          moveTargets={folderMoveTargets(node.id)}
          onToggle={() => { setWorkspaceFolderExpanded(node.id, !node.expanded) }}
          onRename={renameWorkspaceFolder}
          onDelete={deleteWorkspaceFolder}
          onCreateChild={onCreateWorkspaceFolder}
          onMove={moveWorkspaceFolder}
          onFolderDrop={commitFolderDrop}
          onWorkspaceDrop={() => { commitWorkspaceDropOnFolder(node.id) }}
          onDragStart={() => { setFolderDragId(node.id) }}
          onDragEnd={() => { setFolderDragId(null) }}
          t={t}
        />
        {node.expanded && (
          <div
            role="group"
            className={clsx(css.workspaceChildGroup, workspaceFolderHover === node.id && css.workspaceFolderContentsDrop)}
            // The folder's expanded body is part of the drop target: a user
            // dropping a Workspace "on the folder" usually lands on a child
            // row or the gap below it, not on the 28px header. Child rows keep
            // their own same-folder reorder handling; anything else files the
            // Workspace here.
            onDragOver={workspaceDrag === null ? undefined : (event) => {
              if (event.defaultPrevented) return
              event.preventDefault()
              event.dataTransfer.dropEffect = 'move'
              setWorkspaceFolderHover(node.id)
            }}
            onDragLeave={workspaceDrag === null ? undefined : (event) => {
              if (event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)) return
              setWorkspaceFolderHover(current => (current === node.id ? null : current))
            }}
            onDrop={workspaceDrag === null ? undefined : (event) => {
              if (event.defaultPrevented) return
              event.preventDefault()
              commitWorkspaceDropOnFolder(node.id)
            }}
          >
            {node.children.map(child => renderFolderNode(child))}
            {memberGroups.map(group => renderGroup(group))}
          </div>
        )}
      </div>
    )
  }

  /**
   * Render the synthetic "Unfiled" bucket that owns every root Workspace no
   * display folder claims. It only appears once a folder layer exists, so an
   * untouched list keeps the native shape.
   *
   * @returns the bucket element.
   */
  const renderUnfiledFolder = (): ReactNode => {
    const node: WorkspaceFolderNode = {
      id: UNFILED_WORKSPACE_FOLDER_KEY,
      title: t('folder.unfiled'),
      parentId: null,
      depth: 0,
      expanded: unfiledExpanded,
      children: [],
    }
    return (
      <div key={UNFILED_WORKSPACE_FOLDER_KEY} className={css.workspaceFolderGroup}>
        <WorkspaceFolderRow
          node={node}
          unfiled
          workspaceCount={unfiledGroups.length}
          containsCurrent={unfiledGroups.some(group => group.containsCurrent)}
          folderDragActive={folderDragId !== null}
          workspaceDragActive={workspaceDrag !== null}
          workspaceHovered={workspaceFolderHover === UNFILED_WORKSPACE_FOLDER_KEY}
          onToggle={() => { setWorkspaceFolderExpanded(UNFILED_WORKSPACE_FOLDER_KEY, !unfiledExpanded) }}
          onFolderDrop={(sourceId) => { commitFolderDrop(sourceId, UNFILED_WORKSPACE_FOLDER_KEY, 'inside') }}
          onWorkspaceDrop={() => { commitWorkspaceDropOnFolder(null) }}
          t={t}
        />
        {unfiledExpanded && (
          <div
            role="group"
            className={clsx(css.workspaceChildGroup, workspaceFolderHover === UNFILED_WORKSPACE_FOLDER_KEY && css.workspaceFolderContentsDrop)}
            // Dropping a Workspace anywhere on the Unfiled block takes it out
            // of its folder, mirroring the "drop on the bucket" gesture.
            onDragOver={workspaceDrag === null ? undefined : (event) => {
              if (event.defaultPrevented) return
              event.preventDefault()
              event.dataTransfer.dropEffect = 'move'
              setWorkspaceFolderHover(UNFILED_WORKSPACE_FOLDER_KEY)
            }}
            onDragLeave={workspaceDrag === null ? undefined : (event) => {
              if (event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)) return
              setWorkspaceFolderHover(current => (current === UNFILED_WORKSPACE_FOLDER_KEY ? null : current))
            }}
            onDrop={workspaceDrag === null ? undefined : (event) => {
              if (event.defaultPrevented) return
              event.preventDefault()
              commitWorkspaceDropOnFolder(null)
            }}
          >
            {unfiledGroups.map(group => renderGroup(group))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={clsx(css.treeBody, css.wide)}>
      {workspaceDropAtListStart && <span className={css.listTopDropIndicator} aria-hidden="true" />}
      <div
        className={clsx(css.list, workspaceDropAtListStart && css.listTopDropActive)}
        role="tree"
        aria-label={t('section.sessions')}
      >
        {groups.length === 0 && (
          <div className={css.empty}>{archivedFilter === 'only' ? t('empty.onlyArchived') : t('empty.none')}</div>
        )}
        {hasFolderLayer ? (
          <>
            {folderForest.roots.map(node => renderFolderNode(node))}
            {unfiledGroups.length > 0 && renderUnfiledFolder()}
            {archiveGroup !== undefined && renderGroup(archiveGroup)}
          </>
        ) : (
          renderGroupList(undefined)
        )}
        {/* The folder layer's front door: one quiet trailing row instead of a
            third header icon the native header cluster has no room for. */}
        <button
          type="button"
          className={css.workspaceFolderCreateRow}
          onClick={() => { onCreateWorkspaceFolder(null) }}
        >
          <span className={css.workspaceFolderCreateGlyph} aria-hidden="true">
            <IconPlusOutlineRegular size={14} />
          </span>
          <span>{t('folder.create')}</span>
        </button>
      </div>
      <span className={css.fade} />
    </div>
  )
}

/**
 * Turn a recycle failure into a sentence the user can act on.
 *
 * The Host reports stable codes rather than prose so the dictionary stays the
 * client's business. Anything unrecognized falls back to the raw message: an
 * opaque error is still better than a dialog that says nothing.
 */
function sessionDeleteFailureMessage(reason: unknown, t: WorkspaceBrowserProps['t']): string {
  const raw = reason instanceof Error ? reason.message : String(reason)
  if (raw.includes('session-log-not-found')) return t('delete.session.missingLog')
  if (raw.includes('disposed')) return t('delete.session.disposed')
  return raw
}

/** The flat "In one list" body: every session is one draggable top-level row. */function FlatList({
  useSessions, open, forkSession, onSessionRename, onSessionArchive, onSessionUnarchive, onSessionDelete,
  onSessionPin, onSessionUnpin, archivedSessionIds, pinnedSessionIds, archivedSessionIdsRaw, archivedFilter,
  orderBy, sessionOrderByAccount, sessionUpdatedAtByAccount, syncSessionOrderAccount, setSessionOrder, t,
}: Pick<
  SessionTreeProps,
  | 'useSessions'
  | 'open'
  | 'forkSession'
  | 'onSessionRename'
  | 'onSessionArchive'
  | 'onSessionUnarchive'
  | 'onSessionDelete'
  | 'onSessionPin'
  | 'onSessionUnpin'
  | 'pinnedSessionIds'
  | 'archivedSessionIds'
  | 'archivedSessionIdsRaw'
  | 'archivedFilter'
  | 'orderBy'
  | 'sessionOrderByAccount'
  | 'sessionUpdatedAtByAccount'
  | 'syncSessionOrderAccount'
  | 'setSessionOrder'
  | 't'
>) {
  const list = useSessions(s => s)
  const baseRows = useMemo(
    () => deriveFlat(list, archivedSessionIds, pinnedSessionIds, archivedSessionIdsRaw, archivedFilter),
    [list, archivedSessionIds, pinnedSessionIds, archivedSessionIdsRaw, archivedFilter],
  )
  const sessionIds = useMemo(() => baseRows.map(row => row.id), [baseRows])
  const previousOrderBy = useRef(orderBy)
  useEffect(() => {
    if (list.phase !== 'ready') return
    const previousOrder = sessionOrderByAccount[FLAT_SESSION_ORDER_KEY]
    const previousUpdatedAt = sessionUpdatedAtByAccount[FLAT_SESSION_ORDER_KEY] ?? {}
    const switchedToUpdated = previousOrderBy.current !== 'updated' && orderBy === 'updated'
    previousOrderBy.current = orderBy
    const next = nextSessionOrderAccount({
      sessionIds,
      previousOrder,
      previousUpdatedAt,
      list,
      orderBy,
      sortByRecency: orderBy === 'updated' && (previousOrder === undefined || switchedToUpdated),
    })
    if (next.changed) {
      syncSessionOrderAccount(FLAT_SESSION_ORDER_KEY, next.order.map(id => id as string), next.updatedAt)
    }
  }, [list, orderBy, sessionOrderByAccount, sessionUpdatedAtByAccount, sessionIds, syncSessionOrderAccount])
  const rows = useMemo(() => {
    const byId = new Map(baseRows.map(row => [row.id, row]))
    return reconciledSessionOrder(sessionIds, sessionOrderByAccount[FLAT_SESSION_ORDER_KEY])
      .flatMap((id) => {
        const row = byId.get(id)
        return row === undefined ? [] : [row]
      })
  }, [baseRows, sessionOrderByAccount, sessionIds])
  const [drag, setDrag] = useState<DragState | null>(null)
  const dropCommitted = useRef(false)
  useNativeDragAcceptance(drag !== null)
  const commitDrag = (activeDrag: DragState, over: NonNullable<DragState['over']>): void => {
    if (dropCommitted.current) return
    dropCommitted.current = true
    setDrag(null)
    const targetIndex = rows.findIndex(row => row.id === over.id)
    if (targetIndex === -1) return
    const anchor = over.half === 'before' ? over.id : rows[targetIndex + 1]?.id
    if (anchor === activeDrag.sessionId) return
    const sourceIndex = rows.findIndex(row => row.id === activeDrag.sessionId)
    const anchorIndex = anchor === undefined ? rows.length : rows.findIndex(row => row.id === anchor)
    if (sourceIndex !== -1 && (anchorIndex === sourceIndex || anchorIndex === sourceIndex + 1)) return
    const nextOrder = rows.map(row => row.id).filter(id => id !== activeDrag.sessionId)
    const insertAt = anchor === undefined ? nextOrder.length : nextOrder.indexOf(anchor)
    nextOrder.splice(insertAt === -1 ? nextOrder.length : insertAt, 0, activeDrag.sessionId)
    setSessionOrder(FLAT_SESSION_ORDER_KEY, nextOrder.map(id => id as string))
  }
  const now = Date.now()
  return (
    <div className={clsx(css.treeBody, css.wide)}>
      <div className={clsx(css.list, css.flatList)} role="tree" aria-label={t('section.sessions')}>
        {rows.length === 0 && (
          <div className={css.empty}>{t('empty.none')}</div>
        )}
        {rows.map((node) => {
          const active = drag !== null
          return (
            <SessionNodeItem
              key={node.id}
              node={node}
              currentId={currentSessionId(list)}
              now={now}
              onOpen={open}
              onRename={onSessionRename}
              onFork={forkSession}
              onArchive={onSessionArchive}
              onUnarchive={onSessionUnarchive}
              onDelete={onSessionDelete}
              onPin={onSessionPin}
              onUnpin={onSessionUnpin}
              flat
              drag={{
                start: () => {
                  dropCommitted.current = false
                  setDrag({ accountKey: FLAT_SESSION_ORDER_KEY, sessionId: node.id, over: null })
                },
                active,
                marker: active && drag.over?.id === node.id ? drag.over.half : null,
                hover: (half) => {
                  setDrag(current => current === null ? current : { ...current, over: { id: node.id, half } })
                },
                drop: (half) => {
                  if (drag !== null) commitDrag(drag, { id: node.id, half })
                },
                end: () => {
                  if (drag?.over !== null && drag?.over !== undefined) commitDrag(drag, drag.over)
                  else setDrag(null)
                  dropCommitted.current = false
                },
              }}
              t={t}
            />
          )
        })}
      </div>
      <span className={css.fade} />
    </div>
  )
}

interface RemoteSearchState {
  query: string
  status: 'idle' | 'loading' | 'ready' | 'error'
  items: readonly SessionSearchResultItem[]
  hasMore: boolean
}

/** Flat search body: local metadata matches plus the current Host result page. */
function SearchResults({
  useSessions,
  open,
  workspaces,
  archivedSessionIds,
  query,
  remote,
  resultLimit,
  t,
}: Pick<SessionTreeProps, 'useSessions' | 'open' | 't'> & {
  workspaces: readonly WorkspaceView[]
  archivedSessionIds: readonly SessionNode['id'][]
  query: string
  remote: RemoteSearchState
  resultLimit: number
}) {
  const list = useSessions(s => s)
  const currentRemote = remote.query === query
    ? remote
    : { query, status: 'loading' as const, items: [], hasMore: false }
  const results = useMemo(
    () => deriveSearchResults(list, workspaces, query, archivedSessionIds, currentRemote, resultLimit),
    [list, workspaces, query, archivedSessionIds, currentRemote, resultLimit],
  )
  const pending = currentRemote.status === 'loading'
  const failed = currentRemote.status === 'error'

  return (
    <div className={clsx(css.treeBody, css.wide)}>
      <div className={css.list}>
        <div className={css.searchTree} role="tree" aria-label={t('search.results.aria')}>
          {results.items.map(result => (
            <SearchResultItem
              key={result.id}
              result={result}
              currentId={currentSessionId(list)}
              onOpen={open}
              t={t}
            />
          ))}
        </div>
        {pending && (
          <div className={css.searchStatus} role="status">{t('search.pending')}</div>
        )}
        {failed && (
          <div className={css.searchWarning} role="status">
            {t('search.unavailable')}
          </div>
        )}
        {!pending && results.items.length === 0 && (
          <div className={css.empty}>{t('search.noMatches')}</div>
        )}
        {results.hasMore && (
          <div className={css.searchStatus}>
            {t('search.hasMore', { n: resultLimit })}
          </div>
        )}
      </div>
      <span className={css.fade} />
    </div>
  )
}

/**
 * Render the browsing region.
 * @param props - composed slot props (shell owner share + store + injected actions).
 * @returns the region element tree.
 */
export function WorkspaceBrowser({
  wide,
  expandSidebar,
  useSessions,
  useWorkspaces,
  useStore,
  actions,
  startSession,
  open,
  renameSession,
  forkSession,
  renameWorkspace,
  deleteWorkspace,
  insertWorkspaceBefore,
  archiveSession,
  unarchiveSession,
  pinSession,
  unpinSession,
  deleteSession,
  scanSession,
  undoDeleteSession,
  insertSessionBefore,
  createWorkspace,
  useCategories,
  ensureCategories,
  createCategory,
  renameCategory,
  moveCategory,
  reorderCategory,
  assignSessions,
  deleteCategory,
  searchSessions,
  searchResultLimit,
  pickDirectory,
  t,
}: WorkspaceBrowserProps) {
  const workspaces = useWorkspaces(state => state.items)
  const workspacePhase = useWorkspaces(state => state.phase)
  const archivedSessionIdsRaw = useWorkspaces(state => state.archivedSessionIds)
  // The registry-global pin set decides which verb the row menu offers; it is
  // read here so every derivation below can mark its rows.
  const pinnedSessionIds = useWorkspaces(state => state.pinnedSessionIds ?? [])
  const categoryView = useCategories(state => state)
  // The replacement owns its native chooser, so the add affordance is always available.
  const directoryFlowAvailable = true
  const groupBy = useStore(s => s.groupBy)
  const orderBy = useStore(s => s.orderBy)
  // Pinned Sessions render in one global section above every category unless
  // the view option says otherwise.
  const hoistPinned = useStore(s => s.hoistPinned ?? true)
  // Archived rows are EXCLUDED from workspace groups unconditionally —they
  // live in their own trailing section. The three-state filter decides how
  // that section presents: default hides it entirely, show renders it
  // (expanded) alongside the groups, only renders it alone.
  const archivedFilter = useStore(s => s.archivedFilter ?? 'default')
  const archivedSessionIds = archivedSessionIdsRaw
  const groupExpansion = useStore(s => s.groupExpansion)
  const categoryExpansion = useStore(s => s.categoryExpansion)
  const sessionOrderByAccount = useStore(s => s.sessionOrderByAccount)
  const sessionUpdatedAtByAccount = useStore(s => s.sessionUpdatedAtByAccount)
  // Display-only Workspace folder layer. The `??` fallbacks cover state that
  // was persisted before these fields existed: the store hydrates the saved
  // object wholesale, so a missing field must read as "no folder layer".
  const workspaceFolders = useStore(s => s.workspaceFolders ?? [])
  const workspaceFolderAssignments = useStore(s => s.workspaceFolderAssignments ?? {})
  const workspaceFolderExpansion = useStore(s => s.workspaceFolderExpansion ?? {})
  const workspaceIcons = useStore(s => s.workspaceIcons ?? {})
  const workspaceFolderIcons = useStore(s => s.workspaceFolderIcons ?? {})
  useEffect(() => {
    if (workspacePhase !== 'ready') return
    actions.retainAccountKeys([
      UNGROUPED_KEY,
      FLAT_SESSION_ORDER_KEY,
      ...workspaces.map(workspace => workspace.workspaceId as string),
    ])
    // Folders/icons are display-only, so an unregistered Workspace simply drops
    // out of its old folder/icon instead of leaving a stale row behind.
    const workspaceIds = workspaces.map(workspace => workspace.workspaceId as string)
    actions.pruneWorkspaceFolderAssignments(workspaceIds)
    actions.pruneWorkspaceIcons(workspaceIds)
  }, [actions.pruneWorkspaceFolderAssignments, actions.pruneWorkspaceIcons, actions.retainAccountKeys, workspacePhase, workspaces])
  useEffect(() => {
    for (const workspace of workspaces) void ensureCategories(workspace.workspaceId)
  }, [ensureCategories, workspaces])
  // The query outlives the tree and the input (both wide-only) so collapsing
  // does not silently drop an in-progress filter.
  const [query, setQuery] = useState('')
  const [searchExpanded, setSearchExpanded] = useState(false)
  const normalizedQuery = sanitizeSearchQuery(query).trim()
  const [remoteSearch, setRemoteSearch] = useState<RemoteSearchState>({
    query: '',
    status: 'idle',
    items: [],
    hasMore: false,
  })
  const searchRoot = useRef<HTMLDivElement | null>(null)
  const searchInput = useRef<HTMLInputElement | null>(null)
  // Section-header （opens the picker menu (same popover in wide and rail
  // states; the menu anchors on this button).
  const [wsPickerOpen, setWsPickerOpen] = useState(false)
  const wsPlusRef = useRef<HTMLButtonElement>(null)
  const composingRef = useRef(false)

  // Rail search = expand + land in the search box: the flag arms before the
  // expand request; once the shell flips wide the input mounts and takes focus.
  const [searchOnExpand, setSearchOnExpand] = useState(false)
  useEffect(() => {
    if (wide && searchOnExpand) {
      const timer = window.setTimeout(() => {
        searchInput.current?.focus({ preventScroll: true })
        setSearchOnExpand(false)
      }, EXPAND_SLIDE_MS)
      return () => { window.clearTimeout(timer) }
    }
  }, [wide, searchOnExpand])

  useEffect(() => {
    if (!wide || !searchExpanded || searchOnExpand) return
    searchInput.current?.focus({ preventScroll: true })
  }, [wide, searchExpanded, searchOnExpand])

  useEffect(() => {
    if (!wide || !searchExpanded) return
    const onClick = (event: MouseEvent): void => {
      if (!(event.target instanceof Node) || searchRoot.current?.contains(event.target) === true) return
      searchInput.current?.blur()
      if (normalizedQuery !== '') return
      setSearchExpanded(false)
    }
    document.addEventListener('click', onClick)
    return () => { document.removeEventListener('click', onClick) }
  }, [normalizedQuery, wide, searchExpanded])

  useEffect(() => {
    if (normalizedQuery === '') {
      setRemoteSearch({ query: '', status: 'idle', items: [], hasMore: false })
      return
    }
    const controller = new AbortController()
    setRemoteSearch({
      query: normalizedQuery,
      status: 'loading',
      items: [],
      hasMore: false,
    })
    const timer = window.setTimeout(() => {
      searchSessions(normalizedQuery, controller.signal).then((result) => {
        if (controller.signal.aborted) return
        setRemoteSearch({
          query: normalizedQuery,
          status: 'ready',
          items: result.items,
          hasMore: result.hasMore,
        })
      }).catch(() => {
        if (controller.signal.aborted) return
        setRemoteSearch({
          query: normalizedQuery,
          status: 'error',
          items: [],
          hasMore: false,
        })
      })
    }, SEARCH_DEBOUNCE_MS)
    return () => {
      window.clearTimeout(timer)
      controller.abort()
    }
  }, [normalizedQuery, searchSessions])

  // Rename dialog (browser-owned so it outlives row unmounts during collapse).
  const [renameTarget, setRenameTarget] = useState<{ workspaceId: WorkspaceId; currentTitle: string } | null>(null)
  const [renameDraft, setRenameDraft] = useState('')
  const [renaming, setRenaming] = useState(false)
  const [renameError, setRenameError] = useState<string | null>(null)
  const renameTrimmed = renameDraft.trim()
  const renameDuplicate = renameTarget !== null && renameTrimmed !== '' && renameTrimmed !== renameTarget.currentTitle
    && workspaces.some(w => w.title === renameTrimmed)
  const renameBlocked = renaming || renameTrimmed === ''
    || renameTarget === null || renameTrimmed === renameTarget.currentTitle || renameDuplicate
  const closeRename = () => {
    if (renaming) return
    setRenameTarget(null)
    setRenameError(null)
  }
  const confirmRename = () => {
    if (renameBlocked) return
    setRenaming(true)
    setRenameError(null)
    renameWorkspace(renameTarget.workspaceId, renameTrimmed).then(() => {
      setRenaming(false)
      setRenameTarget(null)
    }).catch((reason: unknown) => {
      setRenaming(false)
      setRenameError(reason instanceof Error ? reason.message : String(reason))
    })
  }

  // Session rename dialog (same browser-owned pattern as workspace rename;
  // sessions have no client-side name-conflict rule —the host normalizes).
  // Unlike workspace rename, an unchanged title is NOT blocked: confirming
  // the current automatic title is the gesture that pins it.
  const [sessionRenameTarget, setSessionRenameTarget] = useState<{ sessionId: SessionNode['id']; currentTitle: string } | null>(null)
  const [sessionRenameDraft, setSessionRenameDraft] = useState('')
  const [sessionRenaming, setSessionRenaming] = useState(false)
  const [sessionRenameError, setSessionRenameError] = useState<string | null>(null)
  const sessionRenameTrimmed = sessionRenameDraft.trim()
  const sessionRenameBlocked = sessionRenaming || sessionRenameTrimmed === '' || sessionRenameTarget === null
  const closeSessionRename = () => {
    if (sessionRenaming) return
    setSessionRenameTarget(null)
    setSessionRenameError(null)
  }
  const confirmSessionRename = () => {
    if (sessionRenameBlocked) return
    setSessionRenaming(true)
    setSessionRenameError(null)
    renameSession(sessionRenameTarget.sessionId, sessionRenameTrimmed).then(() => {
      setSessionRenaming(false)
      setSessionRenameTarget(null)
    }).catch((reason: unknown) => {
      setSessionRenaming(false)
      setSessionRenameError(reason instanceof Error ? reason.message : String(reason))
    })
  }
  const onSessionRename = (sessionId: SessionNode['id'], currentTitle: string) => {
    setSessionRenameTarget({ sessionId, currentTitle })
    setSessionRenameDraft(currentTitle)
    setSessionRenameError(null)
  }

  // Archive is dialog-free: not destructive (the log and the accounting slot
  // remain), so the menu action commits directly; the row disappears when the
  // archive-set echo lands. Failures are non-fatal console diagnostics, the
  // same posture as reorder rejections.
  const onSessionArchive = (sessionId: SessionNode['id']) => {
    archiveSession(sessionId).catch((reason: unknown) => {
      console.warn('session archive rejected:', reason)
    })
  }
  // Unarchive is the inverse verb the archived row offers: it returns the
  // Session to its workspace slot through the registry, and the row reappears
  // in the normal listing when the archive-set echo lands.
  const onSessionUnarchive = (sessionId: SessionNode['id']) => {
    unarchiveSession(sessionId).catch((reason: unknown) => {
      console.warn('session unarchive rejected:', reason)
    })
  }

    // Pinning only reorders rows within a group; the set itself lives on the
  // Host registry, so the row moves when the state echo lands rather than now.
  const onSessionPin = (sessionId: SessionNode['id']) => {
    pinSession(sessionId).catch((reason: unknown) => {
      console.warn('session pin rejected:', reason)
    })
  }
  const onSessionUnpin = (sessionId: SessionNode['id']) => {
    unpinSession(sessionId).catch((reason: unknown) => {
      console.warn('session unpin rejected:', reason)
    })
  }

  // Delete is the destructive verb, so it always goes through a dialog. The
  // log leaves the live tree, and the harness offers no way to grow it back
  // except the recycle bin this plugin keeps, so the dialog says so plainly
  // and names what is about to move.
  const [sessionDeleteTarget, setSessionDeleteTarget] = useState<{ sessionId: SessionNode['id']; title: string } | null>(null)
  const [sessionDeleting, setSessionDeleting] = useState(false)
  const [sessionDeleteError, setSessionDeleteError] = useState<string | null>(null)
  const [sessionDeleteDone, setSessionDeleteDone] = useState<{ batchId: string; count: number; artifactCount: number } | null>(null)
  const closeSessionDelete = () => {
    if (sessionDeleting) return
    setSessionDeleteTarget(null)
    setSessionDeleteError(null)
  }
  const confirmSessionDelete = () => {
    if (sessionDeleteTarget === null || sessionDeleting) return
    setSessionDeleting(true)
    setSessionDeleteError(null)
    deleteSession(sessionDeleteTarget.sessionId, sessionScope).then((outcome) => {
      setSessionDeleting(false)
      setSessionDeleteTarget(null)
      setSessionDeleteDone({ batchId: outcome.batchId, count: 1, artifactCount: outcome.artifactCount })
    }).catch((reason: unknown) => {
      setSessionDeleting(false)
      setSessionDeleteError(sessionDeleteFailureMessage(reason, t))
    })
  }
  const onSessionDelete = (sessionId: SessionNode['id'], currentTitle: string) => {
    setSessionDeleteTarget({ sessionId, title: currentTitle })
    setSessionDeleteError(null)
  }

  // The confirmation dialog measures before it deletes: a scan runs the moment
  // the dialog opens, so the scope choice is an informed one rather than a
  // promise the Host makes after the fact. A failed scan is not fatal —the
  // dialog falls back to the record-only scope and says why it fell back.
  //
  // The effect keys on the Session ID, not on the target object: the target is
  // recreated by every row re-render (hover, clock tick, status flip), and an
  // object dependency re-runs this effect each time —flipping the scan state
  // back to "pending" and wiping the options the user was looking at. That was
  // the "dialog flashes and the options vanish" bug.
  const [sessionScan, setSessionScan] = useState<DeleteScanOutcome | null>(null)
  const [sessionScanState, setSessionScanState] = useState<'pending' | 'done' | 'failed'>('pending')
  const [sessionScope, setSessionScope] = useState<'record' | 'artifacts'>('record')
  const deleteTargetId = sessionDeleteTarget?.sessionId ?? null
  useEffect(() => {
    if (deleteTargetId === null) {
      setSessionScan(null)
      setSessionScanState('pending')
      setSessionScope('record')
      return
    }
    let cancelled = false
    setSessionScanState('pending')
    scanSession(deleteTargetId).then((outcome) => {
      if (cancelled) return
      setSessionScan(outcome)
      setSessionScanState('done')
    }).catch(() => {
      if (cancelled) return
      setSessionScan(null)
      setSessionScanState('failed')
    })
    return () => { cancelled = true }
  }, [deleteTargetId])

  // Undo lives on the same surface as the confirmation: after a delete the
  // dialog stays up offering to put the batch back, because the moment right
  // after a misclick is the only moment the user knows they misclicked.
  const [sessionUndoError, setSessionUndoError] = useState<string | null>(null)
  const [sessionUndoNotice, setSessionUndoNotice] = useState<string | null>(null)
  const onUndoDelete = async () => {
    setSessionUndoError(null)
    setSessionUndoNotice(null)
    try {
      const outcome = await undoDeleteSession()
      setSessionDeleteDone(null)
      if (outcome.failed.length === 0) {
        setSessionUndoNotice(t('delete.session.undoDone', { n: outcome.restored.length }))
      } else {
        setSessionUndoError(t('delete.session.undoPartial', {
          n: outcome.restored.length,
          failed: outcome.failed.length,
        }))
      }
    } catch (reason: unknown) {
      setSessionUndoError(sessionDeleteFailureMessage(reason, t))
    }
  }

  // Icon picker: one dialog serves both Workspace and display-folder rows. The
  // catalog itself is rendered only while this state is set.
  const [iconPicker, setIconPicker] = useState<
    | { kind: 'workspace'; workspaceId: WorkspaceId; title: string }
    | { kind: 'folder'; folderId: string; title: string }
    | null
  >(null)
  const requestWorkspaceIcon = (workspaceId: WorkspaceId, title: string) => {
    setWsPickerOpen(false)
    setIconPicker({ kind: 'workspace', workspaceId, title })
  }
  const requestWorkspaceFolderIcon = (folderId: string, title: string) => {
    setIconPicker({ kind: 'folder', folderId, title })
  }
  const currentPickerIcon = iconPicker === null
    ? undefined
    : iconPicker.kind === 'workspace'
      ? workspaceIcons[iconPicker.workspaceId]
      : workspaceFolderIcons[iconPicker.folderId]
  const commitPickerIcon = (icon: string | null) => {
    if (iconPicker === null) return
    if (iconPicker.kind === 'workspace') actions.setWorkspaceIcon(iconPicker.workspaceId, icon)
    else actions.setWorkspaceFolderIcon(iconPicker.folderId, icon)
    setIconPicker(null)
  }

  // Display-folder dialog. Browser-owned like the workspace rename dialog so
  // the create affordance survives the row that opened it unmounting.
  const [folderCreateTarget, setFolderCreateTarget] = useState<{ parentId: string | null } | null>(null)
  const [folderDraft, setFolderDraft] = useState('')
  const requestWorkspaceFolderCreate = (parentId: string | null) => {
    setWsPickerOpen(false)
    setFolderCreateTarget({ parentId })
    setFolderDraft('')
  }
  const confirmWorkspaceFolderCreate = () => {
    const title = folderDraft.trim()
    if (folderCreateTarget === null || title === '') return
    const parentId = folderCreateTarget.parentId
    const siblings = workspaceFolders.filter(folder => folder.parentId === parentId)
    const order = siblings.reduce((next, folder) => Math.max(next, folder.order + 1), 0)
    actions.createWorkspaceFolder({
      id: globalThis.crypto.randomUUID(),
      parentId,
      title,
      order,
    })
    if (parentId !== null) actions.setWorkspaceFolderExpanded(parentId, true)
    setFolderCreateTarget(null)
  }

  const [categoryCreateTarget, setCategoryCreateTarget] = useState<{
    workspaceId: WorkspaceId
    parentId: SessionCategoryId | null
  } | null>(null)
  const [categoryDraft, setCategoryDraft] = useState('')
  const [categoryBusy, setCategoryBusy] = useState(false)
  const [categoryError, setCategoryError] = useState<string | null>(null)
  const requestCategoryCreate = (workspaceId: WorkspaceId, parentId: SessionCategoryId | null) => {
    setCategoryCreateTarget({ workspaceId, parentId })
    setCategoryDraft('')
    setCategoryError(null)
  }
  const confirmCategoryCreate = () => {
    const title = categoryDraft.trim()
    if (categoryCreateTarget === null || categoryBusy || title === '') return
    setCategoryBusy(true)
    createCategory(categoryCreateTarget.workspaceId, categoryCreateTarget.parentId, title).then((result) => {
      setCategoryBusy(false)
      if (result.ok) setCategoryCreateTarget(null)
      else setCategoryError('message' in result.error ? result.error.message : result.error.code)
    })
  }

  const [categoryDeleteTarget, setCategoryDeleteTarget] = useState<{
    categoryId: SessionCategoryId
    title: string
    descendantCount: number
    sessionCount: number
    /** Sessions in this tree that are still running; they get stopped by the delete. */
    runningCount: number
    operationId: SessionCategoryOperationId
  } | null>(null)
  const [categoryDeleting, setCategoryDeleting] = useState(false)
  const [categoryDeleteError, setCategoryDeleteError] = useState<string | null>(null)
  const requestCategoryDelete = (
    categoryId: SessionCategoryId,
    title: string,
    descendantCount: number,
    sessionCount: number,
    runningCount: number,
  ) => {
    setCategoryDeleteTarget({
      categoryId,
      title,
      descendantCount,
      sessionCount,
      runningCount,
      operationId: globalThis.crypto.randomUUID() as SessionCategoryOperationId,
    })
    setCategoryDeleteError(null)
  }
  const closeCategoryDelete = () => {
    if (categoryDeleting) return
    setCategoryDeleteTarget(null)
    setCategoryDeleteError(null)
  }
  const confirmCategoryDelete = () => {
    if (categoryDeleting || categoryDeleteTarget === null) return
    setCategoryDeleting(true)
    setCategoryDeleteError(null)
    deleteCategory(categoryDeleteTarget.categoryId, categoryDeleteTarget.operationId).then((result) => {
      setCategoryDeleting(false)
      if (result.ok) setCategoryDeleteTarget(null)
      else setCategoryDeleteError('message' in result.error ? result.error.message : result.error.code)
    })
  }

  // Delete dialog is separate from the row so a successful removal can
  // unmount that row without tearing down the in-flight confirmation state.
  const [deleteTarget, setDeleteTarget] = useState<{ workspaceId: WorkspaceId; title: string } | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [deleteCommittedId, setDeleteCommittedId] = useState<WorkspaceId | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  useEffect(() => {
    if (deleteCommittedId === null
      || workspaces.some(workspace => workspace.workspaceId === deleteCommittedId)) return
    setDeleting(false)
    setDeleteCommittedId(null)
    setDeleteTarget(null)
  }, [deleteCommittedId, workspaces])
  const closeDelete = () => {
    if (deleting) return
    setDeleteTarget(null)
    setDeleteError(null)
  }
  const confirmDelete = () => {
    /* v8 ignore next -- the Modal is absent without a target and its button is disabled while deleting. */
    if (deleting || deleteTarget === null) return
    setDeleting(true)
    setDeleteCommittedId(null)
    setDeleteError(null)
    deleteWorkspace(deleteTarget.workspaceId).then(() => {
      // Keep the confirmation pending until this component has rendered the
      // committed list projection without the deleted id. Closing earlier
      // exposes one stale React frame to the next Create Workspace gesture.
      setDeleteCommittedId(deleteTarget.workspaceId)
    }).catch((reason: unknown) => {
      setDeleting(false)
      setDeleteError(reason instanceof Error ? reason.message : String(reason))
    })
  }

  return (
    <div className={clsx(css.root, !wide && css.rail)}>
      <div className={css.sectionHeader}>
        {wide && (
          <span className={clsx(css.sectionLabel, css.wide, searchExpanded && css.sectionLabelHidden)}>
            {groupBy === 'flat' ? t('section.sessions') : t('section.workspaces')}
          </span>
        )}
        {wide && (
          <div className={clsx(css.searchSlot, searchExpanded && css.searchSlotExpanded)}>
            <div
              ref={searchRoot}
              className={clsx(css.search, searchExpanded && css.searchExpanded)}
              onClick={() => {
                setWsPickerOpen(false)
                setSearchExpanded(true)
                searchInput.current?.focus()
              }}
            >
              <Tooltip label={t('search')} side="bottom" delayMs={500} disabled={searchExpanded}>
                <button
                  type="button"
                  className={css.searchButton}
                  aria-label={t('search.sessions.aria')}
                  aria-expanded={searchExpanded}
                  onClick={() => {
                    setWsPickerOpen(false)
                    setSearchExpanded(true)
                  }}
                >
                  <IconSearchOutlineRegular size={searchExpanded ? 11 : 14} />
                </button>
              </Tooltip>
              <input
                ref={searchInput}
                className={css.searchInput}
                type="text"
                placeholder={t('search.placeholder')}
                maxLength={SEARCH_QUERY_MAX_CODE_UNITS}
                value={query}
                tabIndex={searchExpanded ? 0 : -1}
                onChange={(e) => { setQuery(sanitizeSearchQuery(e.target.value)) }}
                onKeyDown={(e) => {
                  if (e.key !== 'Escape') return
                  setQuery('')
                  setSearchExpanded(false)
                }}
              />
              {searchExpanded && (
                <button
                  type="button"
                  className={css.clearButton}
                  aria-label={t('search.clear')}
                  onClick={(e) => {
                    e.stopPropagation()
                    setQuery('')
                    setSearchExpanded(false)
                  }}
                >
                  <IconCloseFillRegular />
                </button>
              )}
            </div>
          </div>
        )}
        <div className={clsx(css.headerActions, wide && searchExpanded && css.headerActionsHidden)}>
          {wide && (
            <ViewOptionsMenu
              groupBy={groupBy}
              orderBy={orderBy}
              archivedFilter={archivedFilter}
              hoistPinned={hoistPinned}
              onGroupPick={(mode) => { actions.setGroupBy(mode) }}
              onOrderPick={(mode) => { actions.setOrderBy(mode) }}
              onArchivedFilterPick={(filter) => { actions.setArchivedFilter(filter) }}
              onHoistPinnedPick={(hoist) => { actions.setHoistPinned(hoist) }}
              onCreateFolder={() => { requestWorkspaceFolderCreate(null) }}
              t={t}
            />
          )}
          {/* Adding is the button's one action, so a composition with no
              picking affordance has nothing to offer here: the region hides the
              button rather than leaving a dead one in the header. */}
          {directoryFlowAvailable && (
            <Tooltip label={t('workspace.add')} side="bottom" delayMs={500}>
              <button
                ref={wsPlusRef}
                type="button"
                className={css.iconButton}
                aria-label={t('workspace.add')}
                onClick={() => {
                  setWsPickerOpen(v => !v)
                }}
              >
                <IconProjectAddOutlineRegular size={wide ? 16 : 18} />
              </button>
            </Tooltip>
          )}
        </div>
        {/* Add flow + its error dialog (same package —direct composition). */}
        <WorkspacePickFlow
          t={t}
          open={wsPickerOpen}
          anchorRef={wsPlusRef}
          useWorkspaces={useWorkspaces}
          createWorkspace={createWorkspace}
          useDirectoryFlow={DIRECT_DIRECTORY_FLOW_AVAILABLE}
          renderDirectoryFlow={owner => <DirectDirectoryFlow {...owner} pick={pickDirectory} />}
          addOnly
          side="right"
          onPick={(workspaceId) => {
            setWsPickerOpen(false)
            startSession(workspaceId)
          }}
          onClose={() => { setWsPickerOpen(false) }}
        />
      </div>

      {/* The collapsed rail keeps search as its own 36px control. */}
      {!wide && <div className={css.search}>
        <Tooltip label={t('search')}>
          <button
            type="button"
            className={css.searchButton}
            aria-label={t('search.sessions.aria')}
            onClick={() => {
              setSearchExpanded(true)
              setSearchOnExpand(true)
              expandSidebar()
            }}
          >
            <IconSearchOutlineRegular size={18} />
          </button>
        </Tooltip>
      </div>}

      {/* Always-mounted seat keeps the region's flex slot while the list
          itself is wide-only. */}
      <div className={css.listArea}>
        {wide && normalizedQuery === '' && groupBy === 'workspace' && categoryView.status === 'loading'
          && Object.keys(categoryView.snapshots).length === 0
          && <div className={css.categoryStatus} role="status">{t('category.loading')}</div>}
        {wide && normalizedQuery === '' && groupBy === 'workspace' && categoryView.status === 'error'
          && Object.keys(categoryView.snapshots).length === 0 && (
          <div className={css.categoryStatus} role="status">
            <span>{t('category.loadError')}</span>
            <Button variant="outline" onClick={() => {
              for (const workspace of workspaces) void ensureCategories(workspace.workspaceId)
            }}>{t('category.retry')}</Button>
          </div>
        )}
        {wide && (normalizedQuery !== ''
          ? (
            <SearchResults
              useSessions={useSessions}
              open={open}
              workspaces={workspaces}
              archivedSessionIds={archivedSessionIds}
              query={normalizedQuery}
              remote={remoteSearch}
              resultLimit={searchResultLimit}
              t={t}
            />
          )
          : groupBy === 'flat'
            ? (
              <FlatList
                useSessions={useSessions} open={open} forkSession={forkSession}
                onSessionRename={onSessionRename} onSessionArchive={onSessionArchive}
                onSessionUnarchive={onSessionUnarchive}
                onSessionDelete={onSessionDelete}
                onSessionPin={onSessionPin} onSessionUnpin={onSessionUnpin}
                pinnedSessionIds={pinnedSessionIds}
                archivedSessionIds={archivedSessionIds}
                archivedSessionIdsRaw={archivedSessionIdsRaw}
                archivedFilter={archivedFilter}
                orderBy={orderBy}
                sessionOrderByAccount={sessionOrderByAccount}
                sessionUpdatedAtByAccount={sessionUpdatedAtByAccount}
                syncSessionOrderAccount={actions.syncSessionOrderAccount}
                setSessionOrder={actions.setSessionOrder}
                t={t}
              />
            )
            : (
              <SessionTree
                useSessions={useSessions}
                onSessionRename={onSessionRename}
                onSessionArchive={onSessionArchive}
                onSessionUnarchive={onSessionUnarchive}
                onSessionDelete={onSessionDelete}
                onSessionPin={onSessionPin}
                onSessionUnpin={onSessionUnpin}
                pinnedSessionIds={pinnedSessionIds}
                forkSession={forkSession}
                hoistPinned={hoistPinned}
                workspaces={workspaces}
                groupExpansion={groupExpansion}
                setGroupExpanded={actions.setGroupExpanded}
                sessionOrderByAccount={sessionOrderByAccount}
                sessionUpdatedAtByAccount={sessionUpdatedAtByAccount}
                syncSessionOrderAccount={actions.syncSessionOrderAccount}
                setSessionOrder={actions.setSessionOrder}
                archivedSessionIds={archivedSessionIds}
                archivedSessionIdsRaw={archivedSessionIdsRaw}
                archivedFilter={archivedFilter}
                nestWorkspaces={groupBy === 'workspace-tree'}
                startSession={startSession}
                open={open}
                insertWorkspaceBefore={insertWorkspaceBefore}
                insertSessionBefore={insertSessionBefore}
                orderBy={orderBy}
                categorySnapshots={categoryView.snapshots}
                categoryExpansion={categoryExpansion}
                setCategoryExpanded={actions.setCategoryExpanded}
                onCreateCategory={requestCategoryCreate}
                onDeleteCategory={requestCategoryDelete}
                renameCategory={renameCategory}
                moveCategory={moveCategory}
                reorderCategory={reorderCategory}
                assignSessions={assignSessions}
                workspaceFolders={workspaceFolders}
                workspaceFolderAssignments={workspaceFolderAssignments}
                workspaceFolderExpansion={workspaceFolderExpansion}
                workspaceIcons={workspaceIcons}
                workspaceFolderIcons={workspaceFolderIcons}
                onPickWorkspaceIcon={requestWorkspaceIcon}
                onPickWorkspaceFolderIcon={requestWorkspaceFolderIcon}
                setWorkspaceFolderExpanded={actions.setWorkspaceFolderExpanded}
                renameWorkspaceFolder={actions.renameWorkspaceFolder}
                deleteWorkspaceFolder={actions.deleteWorkspaceFolder}
                moveWorkspaceFolder={actions.moveWorkspaceFolder}
                assignWorkspaceFolder={actions.assignWorkspaceFolder}
                onCreateWorkspaceFolder={requestWorkspaceFolderCreate}
                t={t}
                onRenameRequest={(workspaceId, currentTitle) => {
                  setRenameTarget({ workspaceId, currentTitle })
                  setRenameDraft(currentTitle)
                  setRenameError(null)
                }}
                onDeleteRequest={(workspaceId, title) => {
                  setDeleteTarget({ workspaceId, title })
                  setDeleteError(null)
                }}
              />
            ))}
      </div>

      <Modal
        open={iconPicker !== null}
        onClose={() => { setIconPicker(null) }}
        closeLabel={t('close')}
        title={t('icon.picker.title')}
        {...iconPicker === null ? {} : { description: iconPicker.title }}
        footer={(
          <>
            <Button variant="outline" onClick={() => { commitPickerIcon(null) }}>{t('icon.reset')}</Button>
            <Button variant="outline" onClick={() => { setIconPicker(null) }}>{t('cancel')}</Button>
          </>
        )}
      >
        {iconPicker !== null && (
          <WorkspaceIconPickerGrid
            selected={currentPickerIcon}
            onPick={(icon) => { commitPickerIcon(icon) }}
            t={t}
          />
        )}
      </Modal>

      <Modal
        open={folderCreateTarget !== null}
        onClose={() => { setFolderCreateTarget(null) }}
        closeLabel={t('close')}
        title={folderCreateTarget?.parentId === null ? t('folder.create') : t('folder.createChild')}
        footer={(
          <>
            <Button variant="outline" onClick={() => { setFolderCreateTarget(null) }}>{t('cancel')}</Button>
            <Button variant="primary" disabled={folderDraft.trim() === ''} onClick={confirmWorkspaceFolderCreate}>
              {folderCreateTarget?.parentId === null ? t('folder.create') : t('folder.createChild')}
            </Button>
          </>
        )}
      >
        <input
          className={css.renameInput}
          aria-label={t('folder.name')}
          autoFocus
          value={folderDraft}
          onFocus={event => { event.target.select() }}
          onChange={event => { setFolderDraft(event.target.value) }}
          onKeyDown={(event) => { if (event.key === 'Enter') confirmWorkspaceFolderCreate() }}
        />
      </Modal>

      <Modal open={categoryCreateTarget !== null} onClose={() => {
        if (!categoryBusy) setCategoryCreateTarget(null)
      }} closeLabel={t('close')} title={t('category.create')} footer={(
        <>
          <Button variant="outline" disabled={categoryBusy} onClick={() => { setCategoryCreateTarget(null) }}>{t('cancel')}</Button>
          <Button variant="primary" disabled={categoryBusy || categoryDraft.trim() === ''} onClick={confirmCategoryCreate}>{t('category.create')}</Button>
        </>
      )}>
        <input className={css.renameInput} aria-label={t('field.categoryName')} autoFocus disabled={categoryBusy}
          value={categoryDraft} onChange={event => { setCategoryDraft(event.target.value); setCategoryError(null) }}
          onKeyDown={event => { if (event.key === 'Enter') confirmCategoryCreate() }} />
        {categoryError !== null && <div className={css.error}>{categoryError}</div>}
      </Modal>

      <Modal
        open={categoryDeleteTarget !== null}
        onClose={closeCategoryDelete}
        closeLabel={t('close')}
        title={t('category.delete')}
        {...categoryDeleteTarget === null ? {} : {
          description: t('category.delete.desc', {
            name: categoryDeleteTarget.title,
            descendants: categoryDeleteTarget.descendantCount,
            sessions: categoryDeleteTarget.sessionCount,
          }),
        }}
        footer={(
          <>
            <Button variant="outline" disabled={categoryDeleting} onClick={closeCategoryDelete}>{t('cancel')}</Button>
            <Button variant="outline" className={css.deleteAction} disabled={categoryDeleting}
              onClick={confirmCategoryDelete}>{t('category.delete')}</Button>
          </>
        )}
      >
        {/* Runs before anything else in the body, because this is the one fact a
            user cannot infer from the counts they just read: those Sessions are
            not being filed away, they are being stopped. */}
        {categoryDeleteTarget !== null && categoryDeleteTarget.runningCount > 0 && (
          <div className={css.deleteStatus} role="alert">
            {t('category.delete.runningWarning', { n: categoryDeleteTarget.runningCount })}
          </div>
        )}
        {categoryDeleting && <div className={css.deleteStatus} role="status">{t('category.delete.pending')}</div>}
        {categoryDeleteError !== null && <div className={css.renameError} role="alert">{categoryDeleteError}</div>}
      </Modal>

      <Modal
        open={renameTarget !== null}
        onClose={closeRename}
        closeLabel={t('close')}
        title={t('rename.workspace.title')}
        footer={(
          <>
            <Button variant="outline" disabled={renaming} onClick={closeRename}>{t('cancel')}</Button>
            <Button variant="primary" disabled={renameBlocked} onClick={confirmRename}>{t('rename')}</Button>
          </>
        )}
      >
        <input
          className={css.renameInput}
          value={renameDraft}
          aria-label={t('field.workspaceName')}
          autoFocus
          disabled={renaming}
          onFocus={(e) => { e.target.select() }}
          onChange={(e) => { setRenameDraft(e.target.value); setRenameError(null) }}
          onCompositionStart={() => { composingRef.current = true }}
          onCompositionEnd={() => { composingRef.current = false }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !composingRef.current) {
              e.preventDefault()
              confirmRename()
            }
          }}
        />
        {renameDuplicate && (
          <div className={css.renameError} role="alert">{t('conflict.named', { name: renameTrimmed })}</div>
        )}
        {renameError !== null && <div className={css.renameError} role="alert">{renameError}</div>}
      </Modal>

      <Modal
        open={sessionRenameTarget !== null}
        onClose={closeSessionRename}
        closeLabel={t('close')}
        title={t('rename.session.title')}
        footer={(
          <>
            <Button variant="outline" disabled={sessionRenaming} onClick={closeSessionRename}>{t('cancel')}</Button>
            <Button variant="primary" disabled={sessionRenameBlocked} onClick={confirmSessionRename}>{t('rename')}</Button>
          </>
        )}
      >
        <input
          className={css.renameInput}
          value={sessionRenameDraft}
          aria-label={t('field.sessionName')}
          autoFocus
          disabled={sessionRenaming}
          onFocus={(e) => { e.target.select() }}
          onChange={(e) => { setSessionRenameDraft(e.target.value); setSessionRenameError(null) }}
          onCompositionStart={() => { composingRef.current = true }}
          onCompositionEnd={() => { composingRef.current = false }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !composingRef.current) {
              e.preventDefault()
              confirmSessionRename()
            }
          }}
        />
        {sessionRenameError !== null && <div className={css.renameError} role="alert">{sessionRenameError}</div>}
      </Modal>
      <Modal
        open={deleteTarget !== null}
        onClose={closeDelete}
        closeLabel={t('close')}
        title={t('delete.workspace')}
        {...deleteTarget === null
          ? {}
          : { description: t('delete.desc', { name: deleteTarget.title }) }}
        footer={(
          <>
            <Button variant="outline" disabled={deleting} onClick={closeDelete}>{t('cancel')}</Button>
            <Button
              variant="outline"
              className={css.deleteAction}
              disabled={deleting}
              onClick={confirmDelete}
            >
              {t('delete.workspace')}
            </Button>
          </>
        )}
      >
        {deleting && <div className={css.deleteStatus} role="status">{t('delete.pending')}</div>}
        {deleteError !== null && <div className={css.renameError} role="alert">{deleteError}</div>}
      </Modal>

      <Modal
        open={sessionDeleteTarget !== null}
        onClose={closeSessionDelete}
        closeLabel={t('close')}
        title={t('delete.session.title')}
        {...sessionDeleteTarget === null
          ? {}
          : { description: t('delete.session.desc', { name: sessionDeleteTarget.title }) }}
        footer={(
          <>
            <Button variant="outline" disabled={sessionDeleting} onClick={closeSessionDelete}>{t('cancel')}</Button>
            <Button
              variant="outline"
              className={css.deleteAction}
              disabled={sessionDeleting || sessionScanState === 'pending'}
              onClick={confirmSessionDelete}
            >
              {t('delete.session.confirm')}
            </Button>
          </>
        )}
      >
        {sessionScanState === 'pending' && <div className={css.deleteStatus} role="status">{t('delete.session.scanning')}</div>}
        {sessionScanState === 'failed' && <div className={css.renameError} role="alert">{t('delete.session.scanFailed')}</div>}
        {sessionScan !== null && (
          <div role="group" aria-label={t('delete.session.scopeTitle')}>
            <div>{t('delete.session.logSize', { n: formatBytes(sessionScan.store.bytes) })}</div>
            {sessionScan.artifacts.allowed.length > 0 && (
              <label style={{ display: 'block', marginTop: 8 }}>
                <input
                  type="radio"
                  name="session-delete-scope"
                  checked={sessionScope === 'record'}
                  onChange={() => { setSessionScope('record') }}
                />
                {' '}
                {t('delete.session.scopeRecord')}
              </label>
            )}
            {sessionScan.artifacts.allowed.length > 0 && (
              <label style={{ display: 'block', marginTop: 4 }}>
                <input
                  type="radio"
                  name="session-delete-scope"
                  checked={sessionScope === 'artifacts'}
                  onChange={() => { setSessionScope('artifacts') }}
                />
                {' '}
                {t('delete.session.scopeArtifacts', {
                  n: sessionScan.artifacts.allowed.length,
                  bytes: formatBytes(sessionScan.artifacts.totalBytes),
                })}
              </label>
            )}
            {sessionScan.artifacts.allowed.length > 0 && sessionScope === 'artifacts' && (
              <ul style={{ margin: '8px 0 0', paddingInlineStart: 20 }}>
                {sessionScan.artifacts.allowed.map((row) => (
                  <li key={row.displayPath}>
                    {row.displayPath}（{formatBytes(row.bytes)}）
                  </li>
                ))}
              </ul>
            )}
            {sessionScan.artifacts.refused.length > 0 && (
              <>
                <div style={{ marginTop: 8 }}>{t('delete.session.refusedList')}</div>
                <ul style={{ margin: '4px 0 0', paddingInlineStart: 20 }}>
                  {sessionScan.artifacts.refused.map((row) => (
                    <li key={row.path}>
                      {row.path} —{row.reason}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {sessionScan.warnings.map((warning) => (
              <div key={warning} style={{ marginTop: 8 }}>{t('delete.session.scanWarning', { warning })}</div>
            ))}
          </div>
        )}
        {sessionDeleting && <div className={css.deleteStatus} role="status">{t('delete.session.pending')}</div>}
        {sessionDeleteError !== null && <div className={css.renameError} role="alert">{sessionDeleteError}</div>}
      </Modal>

      <Modal
        open={sessionDeleteDone !== null}
        onClose={() => { setSessionDeleteDone(null) }}
        closeLabel={t('close')}
        title={t('delete.session.done')}
        footer={(
          <>
            <Button variant="outline" onClick={() => { setSessionDeleteDone(null) }}>{t('close')}</Button>
            <Button variant="primary" onClick={() => { void onUndoDelete() }}>{t('delete.session.undo')}</Button>
          </>
        )}
      >
        {sessionUndoError !== null && <div className={css.renameError} role="alert">{sessionUndoError}</div>}
        {sessionUndoNotice !== null && <div className={css.deleteStatus} role="status">{sessionUndoNotice}</div>}
        {sessionDeleteDone !== null && sessionDeleteDone.artifactCount > 0 && (
          <div className={css.deleteStatus}>{t('delete.session.artifactCount', { n: sessionDeleteDone.artifactCount })}</div>
        )}
      </Modal>
    </div>
  )
}
