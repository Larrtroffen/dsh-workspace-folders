/**
 * Derives the workspace browser tree from Host Workspace order and membership.
 * Unassigned Sessions trail under Ungrouped; only the selected blank Session
 * remains visible.
 */
import type {
  PendingInteractionStatus, SessionId, SessionListState,
  SessionSearchResultItem, SessionSummary, SubagentDescendantSummary,
  WorkspaceId, WorkspaceView,
} from '../types.ts'
import type {
  SessionCategory, SessionCategoryId, SessionCategorySnapshot,
} from '@deepseek-ai/dsh-session-categories/types'
import { categoryOrderKey } from './stores.ts'

/**
 * Counts running direct children per parent Session.
 *
 * Replaces the retired `indexSubagentDescendants` export from the old client
 * runtime. That function took the Session **snapshot**, which is keyed by id — * every call site here passes `list.byId` (an object) or an equivalent map, so
 * this signature takes the keyed form too. Taking an array instead was the bug
 * that crashed the whole `sidebar.workspaces` entry with
 * "sessions is not iterable": the slot then fell back to the shipped browser
 * and the plugin's own rows never appeared.
 *
 * @param sessions - Session summaries keyed by id (the list snapshot's `byId`).
 * @returns a map from parent Session id to its running-child count.
 */
export function indexSubagentDescendants(
  sessions: Readonly<Record<string, SessionSummary>> | readonly SessionSummary[] | null | undefined,
): Map<SessionId, { runningCount: number }> {
  const counts = new Map<SessionId, number>()
  // Accept both shapes: the snapshot's keyed `byId`, and a plain array. Being
  // permissive here is deliberate —a shape mismatch must degrade to "no
  // subagent badges", never to a thrown error that takes the slot down. That
  // includes a nullish snapshot, which `Object.values` would otherwise reject.
  const list: readonly SessionSummary[] = sessions === undefined || sessions === null
    ? []
    : Array.isArray(sessions)
      ? sessions
      : Object.values(sessions as Record<string, SessionSummary | undefined>).filter(
        (session): session is SessionSummary => session !== undefined && session !== null,
      )
  for (const session of list) {
    for (const child of session.subagents ?? []) {
      if (child.parentId === undefined || child.running !== true) continue
      counts.set(child.parentId, (counts.get(child.parentId) ?? 0) + 1)
    }
  }
  const indexed = new Map<SessionId, { runningCount: number }>()
  for (const [parentId, runningCount] of counts) indexed.set(parentId, { runningCount })
  return indexed
}

/**
 * The selected Session id, derived from the main-view retention counter.
 *
 * The Session list snapshot no longer carries a `current` field; the shell
 * derives the selection from `retainedBy.mainView` instead, which is what the
 * workspace client does when it computes a row's `currentId`.
 *
 * @param list - the Session list snapshot, possibly not yet loaded.
 * @returns the retained Session id, or `undefined` when none is selected.
 */
export function currentSessionId(list: SessionListState | undefined): SessionId | undefined {
  const byId = list?.byId
  if (byId === undefined) return undefined
  for (const key of Object.keys(byId)) {
    const session = byId[key]
    if (session !== undefined && (session.retainedBy?.mainView ?? 0) > 0) return session.id
  }
  return undefined
}


/** Group key for Sessions outside every Workspace. */
export const UNGROUPED_KEY = ''

/** Display label for the ungrouped bucket row. */
export const UNGROUPED_LABEL = 'Ungrouped'

/** Group key for the trailing archive section (workspaceId-less like Ungrouped). */
export const ARCHIVED_KEY = '__archived__'

/** Display label for the archive section row (renderer substitutes dictionary copy). */
export const ARCHIVED_LABEL = 'Archived'

/** One top-level session row in a group or the flat list. */
export interface SessionNode {
  id: SessionId
  /** Stored display title; the renderer substitutes the localized New Session label for blank rows. */
  title: string
  /** The provisional blank session (renderer shows the localized New Session title). */
  blank: boolean
  /** The runtime Session list reports an interaction awaiting this user. */
  pendingInteraction?: PendingInteractionStatus
  /** The registry-global pin set contains this Session. */
  pinned?: boolean
  /** The registry-global archive set contains this Session (row menu flips to "restore from archive"). */
  archived?: boolean
  running: boolean
  /** Running descendants connected through uninterrupted subagent-origin lineage. */
  runningSubagentCount: number
  /** Finished running while not selected and not yet opened (the green "done" reminder dot). */
  completed: boolean
  updatedAt: number
}

/** One visible category and its visible descendants in render order. */
export interface CategoryNode {
  id: SessionCategoryId
  title: string
  expanded: boolean
  containsCurrent: boolean
  /** Assigned visible Sessions in this category and all descendants. */
  sessionCount: number
  /** Directly assigned Session rows, empty while the category is folded. */
  sessions: readonly SessionNode[]
  /**
   * Own Session ids in stored manual order, **before** the pin partition.
   *
   * This is the account a drag inside the category rewrites. It deliberately
   * excludes the pin lead: pinning is a render-time statement, so committing a
   * pinned-first list would silently freeze the promotion into the stored
   * order and leave the row at the top after an unpin.
   */
  orderedSessionIds: readonly SessionId[]
  /** Child categories, empty while the category is folded. */
  children: readonly CategoryNode[]
}

/** Category projection for one Workspace, followed by its unclassified Sessions. */
export interface WorkspaceCategoryGroup {
  categories: readonly CategoryNode[]
  unclassifiedSessions: readonly SessionNode[]
  /**
   * Registry-global pinned Sessions hoisted above every category and the
   * unclassified tail. Empty unless at least one visible Session is pinned.
   */
  pinnedSessions: readonly SessionNode[]
}

/** Viewing inputs for one Workspace's category projection. */
export interface CategoryTreeView {
  expandedCategories: readonly SessionCategoryId[]
  /** Explicit persisted expansion values; an explicit false overrides current-session auto-expansion. */
  expandedCategoryState?: Readonly<Record<string, boolean>>
  currentSessionId?: SessionId
  archivedSessionIds?: readonly SessionId[]
  /** Case-insensitive Session-title filter; category ownership and counts remain unchanged. */
  query?: string
  /**
   * Per-category manual orders, keyed by category id.
   *
   * A category keeps its own row order: dragging a row inside one must not
   * touch the Workspace account's order, and the unclassified tail has its own
   * account already. Absent or short lists fall back to the incoming
   * projection order for every id they do not name.
   */
  categoryOrder?: Readonly<Record<string, readonly string[]>>
}

/** Session order selected by the Session category browser. */
export type SessionOrderBy = 'manual' | 'updated'

/** One workspace group section: header row facts + visible top-level session rows. */
export interface GroupNode {
  /** Group key: the workspace id or {@link UNGROUPED_KEY}. */
  key: string
  /** Backing Workspace id; absent only for the ungrouped bucket. */
  workspaceId: WorkspaceId | undefined
  cwd: string | undefined
  /** Workspace creation time (epoch ms); absent only for the ungrouped bucket. */
  createdAt: number | undefined
  label: string
  /** Total visible sessions in the group. */
  sessionCount: number
  expanded: boolean
  /** The group contains the selected session (active folder tint; supplied here so the renderer never scans). */
  containsCurrent: boolean
  /**
   * Nesting level for the "by workspace tree" grouping mode: how many ancestor
   * Workspaces sit above this one by directory path. 0 for the default mode
   * and for the ungrouped bucket.
   */
  depth?: number
  /**
   * Owning Workspace group key in the "by workspace tree" grouping mode. A
   * group with an owner renders inside that group's section; a root has none
   * and renders at the top level. Absent in the default and flat modes.
   */
  parentKey?: string
  /** Visible session rows (empty while the group is folded). */
  sessions: readonly SessionNode[]
}

/** One flat search row combining list metadata with an optional content match. */
export interface SearchResultNode {
  id: SessionId
  title: string
  workspace: string
  /** The runtime Session list reports an interaction awaiting this user. */
  pendingInteraction?: PendingInteractionStatus
  /** The registry-global pin set contains this Session. */
  pinned?: boolean
  running: boolean
  /** Running descendants connected through uninterrupted subagent-origin lineage. */
  runningSubagentCount: number
  /** Finished running while not selected and not yet opened (the green "done" reminder dot). */
  completed: boolean
  snippet?: string
}

/** Bounded merged search projection plus the refine-query hint bit. */
export interface SearchResultSet {
  items: readonly SearchResultNode[]
  hasMore: boolean
}

/** Official-parity three-state archived-row filter. */
export type ArchivedFilter = 'default' | 'show' | 'only'

/** Viewing state consumed by the derivation. */
export interface TreeView {
  expandedGroups: readonly string[]
  /**
   * The full persisted expansion record, needed for the archive section's
   * three-state default: key absent = expanded (the toggle was just switched
   * on to see the shelves), key present = the user's explicit choice wins.
   */
  groupExpansion?: Readonly<Record<string, boolean>>
  /** Browser-local order for Sessions without a backing Workspace account. */
  ungroupedOrder?: readonly string[]
  /** Render the trailing archive section (the show-archived toggle is on and the archive set is nonempty). */
  showArchiveSection?: boolean
  /**
   * The official-parity three-state archived filter. `only` suppresses every
   * workspace group so the archive section is all that renders; `default`
   * and `show` both render the groups (archived rows are excluded from them
   * unconditionally —they live in the section).
   */
  archivedFilter?: ArchivedFilter
  /**
   * Nest Workspace sections by their directory paths ("by workspace tree").
   * When false every group renders at depth 0.
   */
  nestWorkspaces?: boolean
}

interface Group {
  key: string
  workspaceId: WorkspaceId | undefined
  cwd: string | undefined
  createdAt: number | undefined
  label: string
  sessions: SessionSummary[]
}

/** Normalize one Workspace path for parent/child comparison. */
function folderPath(value: string): string {
  // A POSIX path may legitimately contain backslashes in a filename, so only
  // Windows-shaped input (drive letter or UNC prefix) gets them folded. This is
  // the same rule the reference sidebar applies.
  const isWindows = /^[A-Za-z]:[/\\]/.test(value) || value.startsWith('\\\\')
  return (isWindows ? value.replace(/\\/g, '/') : value).replace(/\/+$/, '').toLowerCase()
}

/**
 * The nearest registered ancestor folder of one path.
 *
 * "Ancestor" is a strict path-boundary prefix: `E:/AI/DSHX` is not inside
 * `E:/AI/DSH`. Ties are impossible because the candidate set is a set of
 * distinct paths, and the longest match wins so the closest folder owns the
 * child.
 *
 * @param path - the child Workspace directory.
 * @param folders - normalized folders that could be parents.
 * @returns the owning folder, or undefined when none contains the path.
 */
function owningParentFolder(path: string, folders: readonly string[]): string | undefined {
  const child = folderPath(path)
  let owner: string | undefined
  let length = -1
  for (const root of folders) {
    if (root === '' || root === child || !child.startsWith(`${root}/`)) continue
    if (root.length > length) {
      owner = root
      length = root.length
    }
  }
  return owner
}

/**
 * Parent link of every Workspace in the "by workspace tree" grouping mode.
 *
 * The reference sidebar nests a Workspace under whichever other Workspace is
 * its nearest ancestor folder, and the nested section contains its children's
 * headers and rows. This builds that link: one entry per Workspace, mapping its
 * id either to its parent's id or to undefined when it is a root.
 *
 * @param workspaces - Workspaces in display order.
 * @returns one parent id (or undefined) per workspace id.
 */
export function workspaceTreeParents(workspaces: readonly WorkspaceView[]): ReadonlyMap<string, string | undefined> {
  const idByFolder = new Map<string, string>()
  for (const workspace of workspaces) {
    const folder = folderPath(workspace.path)
    // First registration wins, matching the display-order tie-break the
    // reference sidebar gets from its own Map construction.
    if (folder !== '' && !idByFolder.has(folder)) idByFolder.set(folder, workspace.workspaceId as string)
  }
  const folders = [...idByFolder.keys()]
  const parents = new Map<string, string | undefined>()
  for (const workspace of workspaces) {
    const owner = owningParentFolder(workspace.path, folders)
    parents.set(workspace.workspaceId as string, owner === undefined ? undefined : idByFolder.get(owner))
  }
  return parents
}

/**
 * Depth of each Workspace in the directory hierarchy shown by the
 * "by workspace tree" grouping mode.
 *
 * A Workspace one level below a root renders one level of extra indent, a
 * grandchild two, and so on. The ungrouped bucket and the archive section are
 * never nested, so they are simply absent from the map.
 *
 * @param workspaces - Workspaces in display order.
 * @returns one depth per workspace id (depth 0 = no Workspace above it).
 */
export function workspaceTreeDepth(workspaces: readonly WorkspaceView[]): ReadonlyMap<string, number> {
  const parents = workspaceTreeParents(workspaces)
  const depth = new Map<string, number>()
  for (const [id, parent] of parents) {
    let levels = 0
    let cursor = parent
    // Walk to the root, guarding against a cycle a corrupt workspace list
    // could otherwise spin on.
    while (cursor !== undefined && levels <= parents.size) {
      levels += 1
      cursor = parents.get(cursor)
    }
    depth.set(id, levels)
  }
  return depth
}


/**
 * Directory display label: basename of the path (both separators accepted).
 * Ungrouped-bucket fallback for surfaces without a workspace title.
 * @param cwd - directory path, or undefined for the ungrouped bucket.
 * @returns basename, the raw cwd when it has no basename, or the ungrouped label.
 */
export function workspaceLabel(cwd: string | undefined): string {
  if (cwd === undefined || cwd === '') return UNGROUPED_LABEL
  const base = cwd.replace(/[/\\]+$/, '').split(/[/\\]/).pop()
  return base !== undefined && base !== '' ? base : cwd
}

/** Recency comparator: newest first, id as the deterministic tiebreak (ids are unique per group). */
function byRecency(a: SessionSummary, b: SessionSummary): number {
  if (b.updatedAt !== a.updatedAt) return b.updatedAt - a.updatedAt
  return a.id < b.id ? -1 : 1
}

/**
 * Ordinary sessions are visible; among blank sessions, only the current one
 * is visible. Subagent children use their parent header catalog; archived
 * sessions are visible nowhere, while their accounting slots remain so
 * unarchiving restores position.
 */
function sessionVisible(session: SessionSummary, current: SessionId | undefined, archived: ReadonlySet<SessionId>): boolean {
  return session.origin !== 'subagent'
    && !archived.has(session.id)
    && (!session.blank || session.id === current)
}

/**
 * A blank session is the selected Workspace's provisional New Session row;
 * its canonical title never enters search (blank rows are query-excluded)
 * and the renderer localizes its display label.
 */
function sessionTitle(session: SessionSummary): string {
  return session.blank ? 'New Session' : session.displayTitle
}

/** Build one group without projecting session lineage into presentation. */
function buildGroup(
  key: string,
  workspaceId: WorkspaceId | undefined,
  cwd: string | undefined,
  createdAt: number | undefined,
  label: string,
  members: readonly SessionSummary[],
  order: 'account' | 'recency',
  pinned: ReadonlySet<SessionId> = new Set(),
): Group {
  const sessions = [...members]
  // Real Workspace order comes from sessionIds. Ungrouped falls back to
  // recency until the browser supplies its persisted local order.
  if (order === 'recency') sessions.sort(byRecency)
  // Pinned rows lead the group, keeping their relative order otherwise. A
  // stable partition is enough: the Host owns the pin set, so this only has to
  // surface its members ahead of the rest.
  if (pinned.size > 0) {
    const lead = sessions.filter(session => pinned.has(session.id))
    const rest = sessions.filter(session => !pinned.has(session.id))
    sessions.length = 0
    sessions.push(...lead, ...rest)
  }
  return { key, workspaceId, cwd, createdAt, label, sessions }
}

/** Apply a stored Ungrouped order and append newly loose Sessions by recency. */
function orderedUngrouped(members: readonly SessionSummary[], stored: readonly string[]): SessionSummary[] {
  const byId = new Map(members.map(session => [session.id as string, session]))
  const included = new Set<string>()
  const ordered: SessionSummary[] = []
  for (const key of stored) {
    const session = byId.get(key)
    if (session === undefined || included.has(key)) continue
    ordered.push(session)
    included.add(key)
  }
  for (const session of [...members].sort(byRecency)) {
    if (included.has(session.id)) continue
    ordered.push(session)
  }
  return ordered
}

/**
 * Group Sessions by Host Workspace: one group per entity in stable Host
 * order, with members resolved from sessionIds in their stored order. Sessions
 * outside every Workspace trail in the browser-local Ungrouped order, which
 * falls back to recency before that order is initialized.
 */
function groupByWorkspace(
  list: SessionListState,
  workspaces: readonly WorkspaceView[],
  archived: ReadonlySet<SessionId>,
  ungroupedOrder: readonly string[] | undefined,
  /** Registry-global pin set: pinned rows lead their group and carry `pinned`. */
  pinned: ReadonlySet<SessionId> = new Set(),
): Group[] {
  const groups: Group[] = []
  const accounted = new Set<SessionId>()
  for (const workspace of workspaces) {
    const members: SessionSummary[] = []
    for (const id of workspace.sessionIds) {
      const summary = list.byId[id]
      if (summary === undefined) continue // account may lead the list pull; the row appears when the summary lands
      accounted.add(id)
      if (!sessionVisible(summary, currentSessionId(list), archived)) continue
      members.push(summary)
    }
    groups.push(buildGroup(
      workspace.workspaceId, workspace.workspaceId, workspace.path,
      Date.parse(workspace.createdAt), workspace.title, members, 'account', pinned,
    ))
  }
  const stray = list.ids
    .map(id => list.byId[id])
    .filter((s): s is SessionSummary =>
      s !== undefined && !accounted.has(s.id) && sessionVisible(s, currentSessionId(list), archived))
  if (stray.length > 0) {
    groups.push(buildGroup(
      UNGROUPED_KEY,
      undefined,
      undefined,
      undefined,
      UNGROUPED_LABEL,
      ungroupedOrder === undefined ? stray : orderedUngrouped(stray, ungroupedOrder),
      ungroupedOrder === undefined ? 'recency' : 'account',
      pinned,
    ))
  }
  return groups
}

/**
 * Derive the trailing archive section: every archived session that still has a
 * summary, newest first. Rendered only while the view reveals archived rows
 * (the show-archived toggle), and only when nonempty.
 * @param list - sessions list snapshot.
 * @param verbArchived - registry-global archive set (rows carry `archived`).
 * @returns the archive section group, or undefined when nothing is archived.
 */
export function deriveArchiveSection(
  list: SessionListState,
  verbArchived: ReadonlySet<SessionId>,
): Group | undefined {
  const members: SessionSummary[] = []
  for (const id of list.ids) {
    const s = list.byId[id]
    if (s === undefined || !verbArchived.has(id)) continue
    if (s.origin === 'subagent') continue
    members.push(s)
  }
  if (members.length === 0) return undefined
  members.sort(byRecency)
  return buildGroup(ARCHIVED_KEY, undefined, undefined, undefined, ARCHIVED_LABEL, members, 'recency')
}

function sessionNode(
  s: SessionSummary,
  descendants: ReadonlyMap<SessionId, SubagentDescendantSummary>,
  /** Registry-global pin set: membership decides the row menu's pin verb. */
  pinned: ReadonlySet<SessionId>,
  /** Registry-global archive set: membership decides the row menu's archive verb. */
  archived: ReadonlySet<SessionId>,
): SessionNode {
  return {
    id: s.id,
    title: sessionTitle(s),
    blank: s.blank,
    running: s.running,
    runningSubagentCount: descendants.get(s.id)?.runningCount ?? 0,
    ...(pinned.has(s.id) ? { pinned: true } : {}),
    ...(archived.has(s.id) ? { archived: true } : {}),
    completed: s.completed === true,
    updatedAt: s.updatedAt,
    ...(s.pendingInteraction === undefined ? {} : { pendingInteraction: s.pendingInteraction }),
  }
}

interface IndexedCategory {
  category: SessionCategory
  children: IndexedCategory[]
  sessions: SessionSummary[]
}

/**
 * Project one Workspace's durable category snapshot into nested presentation nodes.
 * @param snapshot - Host-owned category and assignment state for one Workspace.
 * @param sessions - Workspace Sessions in the caller's established display order.
 * @param view - local expansion, selection, archive, and search visibility.
 * @returns ordered category roots and the trailing unclassified rows.
 */
export function buildCategoryTree(
  snapshot: SessionCategorySnapshot,
  sessions: readonly SessionSummary[],
  view: CategoryTreeView,
  /** Registry-global pin set, forwarded to every row this tree builds. */
  pinnedSessionIds: readonly SessionId[] = [],
  /** Registry-global archive set, forwarded so rows know their own archive verb. */
  archivedSessionIds: readonly SessionId[] = [],
  /**
   * Whether pinned Sessions leave their category and render as one global
   * section above every category (true), or stay inside the category that
   * owns them and merely lead that category (false).
   */
  hoistPinned: boolean = true,
): WorkspaceCategoryGroup {
  const pinned = new Set(pinnedSessionIds)
  const archived = new Set(archivedSessionIds)
  const indexed = new Map<SessionCategoryId, IndexedCategory>()
  for (const category of snapshot.categories) {
    indexed.set(category.id, { category, children: [], sessions: [] })
  }

  const visiting = new Set<SessionCategoryId>()
  const visited = new Set<SessionCategoryId>()
  const visit = (id: SessionCategoryId): void => {
    if (visiting.has(id)) throw new Error(`Session category cycle detected at ${id}`)
    if (visited.has(id)) return
    visiting.add(id)
    const parentId = indexed.get(id)?.category.parentId
    if (parentId !== null && parentId !== undefined && indexed.has(parentId)) visit(parentId)
    visiting.delete(id)
    visited.add(id)
  }
  for (const id of indexed.keys()) visit(id)

  const roots: IndexedCategory[] = []
  for (const node of indexed.values()) {
    const parent = node.category.parentId === null ? undefined : indexed.get(node.category.parentId)
    if (parent === undefined) roots.push(node)
    else parent.children.push(node)
  }
  const byOrder = (left: IndexedCategory, right: IndexedCategory): number =>
    left.category.order - right.category.order
  roots.sort(byOrder)
  for (const node of indexed.values()) node.children.sort(byOrder)

  const categoryBySession = new Map<SessionId, IndexedCategory>()
  for (const assignment of snapshot.assignments) {
    if (categoryBySession.has(assignment.sessionId)) continue
    const category = indexed.get(assignment.categoryId)
    if (category !== undefined) categoryBySession.set(assignment.sessionId, category)
  }
  // `archived` (the row-verb set) is declared above from the registry-global
  // archive list; the visibility filter here uses the view's own archive state,
  // which the browser empties when "show archived" is on.
  const archivedForVisibility = new Set(view.archivedSessionIds ?? [])
  const visibleSessions = sessions.filter(item => sessionVisible(item, view.currentSessionId, archivedForVisibility))
  const unclassified: SessionSummary[] = []
  for (const item of visibleSessions) {
    const category = categoryBySession.get(item.id)
    if (category === undefined) unclassified.push(item)
    else category.sessions.push(item)
  }

  const expanded = new Set(view.expandedCategories)
  const descendants = indexSubagentDescendants(Object.fromEntries(sessions.map(item => [item.id, item])))
  const query = view.query?.trim().toLowerCase() ?? ''
  const matches = (item: SessionSummary): boolean =>
    query === '' || sessionTitle(item).toLowerCase().includes(query)
  // Pinned rows lead whatever list they belong to —the unclassified tail and
  // each category alike —because the Host pin set is a user statement about
  // prominence, not about grouping. A stable partition keeps the rest as-is.
  const pinLead = (list: readonly SessionSummary[]): SessionSummary[] => {
    if (pinned.size === 0) return [...list]
    return [
      ...list.filter(item => pinned.has(item.id)),
      ...list.filter(item => !pinned.has(item.id)),
    ]
  }
  /**
   * Apply one category's stored manual order before the pin partition.
   *
   * Order is applied first because the pin lead is a stable partition: it
   * preserves whatever order it is handed. Runs on the ids the category
   * actually owns, so an id that moved to another category simply drops out.
   */
  const applyCategoryOrder = (id: SessionCategoryId, list: readonly SessionSummary[]): SessionSummary[] => {
    // The stored account key is `category:<id>` (see stores.ts), NOT the bare
    // category id. Looking it up by `id` silently missed every entry and made
    // an in-category drag write the store without ever reordering a row.
    const stored = view.categoryOrder?.[categoryOrderKey(id)]
    if (stored === undefined || stored.length === 0) return [...list]
    const byId = new Map(list.map(item => [item.id as string, item]))
    const ordered: SessionSummary[] = []
    const seen = new Set<string>()
    for (const key of stored) {
      const item = byId.get(key)
      if (item === undefined || seen.has(key)) continue
      ordered.push(item)
      seen.add(key)
    }
    for (const item of list) {
      if (seen.has(item.id as string)) continue
      ordered.push(item)
    }
    return ordered
  }
  const project = (node: IndexedCategory): CategoryNode => {
    const childNodes = node.children.map(project)
    const directContainsCurrent = node.sessions.some(item => item.id === view.currentSessionId)
    const containsCurrent = directContainsCurrent || childNodes.some(child => child.containsCurrent)
    const isExpanded = expanded.has(node.category.id)
      || (containsCurrent && view.expandedCategoryState?.[node.category.id] !== false)
    const sessionCount = node.sessions.length + childNodes.reduce((count, child) => count + child.sessionCount, 0)
    // Stored manual order first, pin partition second: the pin lead is a stable
    // partition, so it keeps whatever order `ordered` already has.
    const ordered = applyCategoryOrder(node.category.id, node.sessions.filter(item =>
      matches(item) && (!hoistPinned || !pinned.has(item.id))))
    return {
      id: node.category.id,
      title: node.category.title,
      expanded: isExpanded,
      containsCurrent,
      sessionCount,
      sessions: isExpanded ? pinLead(ordered).map(item => sessionNode(item, descendants, pinned, archived)) : [],
      orderedSessionIds: isExpanded ? ordered.map(item => item.id) : [],
      children: isExpanded ? childNodes : [],
    }
  }

  // Pinned Sessions leave their category and the unclassified tail entirely:
  // they render as one global section above every category, so a pin is a
  // statement about the whole list, not about one group.
  const pinnedVisible = hoistPinned ? sessions.filter(item => pinned.has(item.id) && matches(item)) : []
  return {
    categories: roots.map(project),
    unclassifiedSessions: unclassified
      .filter(item => matches(item) && (!hoistPinned || !pinned.has(item.id)))
      .map(item => sessionNode(item, descendants, pinned, archived)),
    pinnedSessions: pinnedVisible.map(item => sessionNode(item, descendants, pinned, archived)),
  }
}

/**
 * Derive the workspace browser groups with every session as a top-level row.
 *
 * Every group shows; sessions populate under expanded groups in the selected
 * local order. Blank sessions are excluded except for the selected
 * provisional New Session row; archived sessions are excluded everywhere.
 * Content search lives outside this derivation
 * (see {@link deriveSearchResults}).
 * @param list - sessions list snapshot (`current` feeds containsCurrent).
 * @param workspaces - real workspaces in stable Host order.
 * @param archivedSessionIds - registry-global archive set.
 * @param view - local expansion arrays.
 * @returns group sections in render order.
 */
export function deriveGroups(
  list: SessionListState,
  workspaces: readonly WorkspaceView[],
  archivedSessionIds: readonly SessionId[],
  view: TreeView,
  pinnedSessionIds: readonly SessionId[] = [],
  /**
   * Row-verb archive set, separate from the visibility filter: the browser
   * empties the visibility set while "show archived" is on, but every row it
   * then reveals must still know its own archive state to label the menu.
   */
  verbSessionIds: readonly SessionId[] = archivedSessionIds,
  /** Official-parity three-state filter; view.archivedFilter is the primary source. */
  archivedFilter: ArchivedFilter = view.archivedFilter ?? 'default',
): GroupNode[] {
  const archived = new Set(archivedSessionIds)
  const verbArchived = new Set(verbSessionIds)
  const pinned = new Set(pinnedSessionIds)
  const expandedGroups = new Set(view.expandedGroups)
  const descendants = indexSubagentDescendants(list.byId)
  const currentGroup = currentSessionId(list) === undefined
    ? undefined
    : (workspaces.find(w => w.sessionIds.includes(currentSessionId(list) as SessionId))?.workspaceId as string | undefined)
        ?? UNGROUPED_KEY
  const groups: GroupNode[] = []
  // "Only archived" suppresses every workspace group: the archive section is
  // all that renders, official-parity with 仅显示已归档. The explicit
  // parameter wins when the caller passes one; the view field is the default.
  const effectiveFilter = view.archivedFilter ?? archivedFilter
  const onlyArchived = effectiveFilter === 'only'
  // Nested mode measures each Workspace against the others' paths.
  const parents = view.nestWorkspaces === true ? workspaceTreeParents(workspaces) : undefined
  const depths = parents === undefined ? undefined : workspaceTreeDepth(workspaces)
  if (!onlyArchived) {
    for (const g of groupByWorkspace(list, workspaces, archived, view.ungroupedOrder, pinned)) {
      const expanded = expandedGroups.has(g.key)
      const workspaceKey = g.workspaceId === undefined ? undefined : g.workspaceId as string
      const depth = depths !== undefined && workspaceKey !== undefined
        ? depths.get(workspaceKey) ?? 0
        : 0
      // Only a real Workspace can be someone's child; the ungrouped bucket and
      // the archive section stay at the list's top level.
      const parentKey = parents !== undefined && workspaceKey !== undefined
        ? parents.get(workspaceKey)
        : undefined
      groups.push({
        key: g.key,
        workspaceId: g.workspaceId,
        cwd: g.cwd,
        createdAt: g.createdAt,
        label: g.label,
        sessionCount: g.sessions.length,
        expanded,
        containsCurrent: g.key === currentGroup,
        depth,
        parentKey,
        sessions: expanded ? g.sessions.map(session => sessionNode(session, descendants, pinned, verbArchived)) : [],
      })
    }
  }
  // The archive section trails every workspace group. Its presence is the
  // show-archived toggle's decision (`showArchiveSection` in the view). It
  // defaults to EXPANDED —the toggle was switched on precisely to see the
  // shelves —while an explicit collapse (persisted key present) still wins.
  if (view.showArchiveSection === true || onlyArchived) {
    const section = deriveArchiveSection(list, verbArchived)
    if (section !== undefined) {
      // Three-state: the persisted record decides when the user has already
      // touched the header; otherwise the section opens by default so the
      // just-enabled toggle shows its shelves without a second click.
      const expanded = onlyArchived ? true : (view.groupExpansion?.[section.key] ?? true)
      groups.push({
        key: section.key,
        workspaceId: section.workspaceId,
        cwd: section.cwd,
        createdAt: section.createdAt,
        label: section.label,
        sessionCount: section.sessions.length,
        expanded,
        containsCurrent: section.key === currentGroup,
        sessions: expanded ? section.sessions.map(session => sessionNode(session, descendants, pinned, verbArchived)) : [],
      })
    }
  }
  return groups
}

/**
 * Derive the flat session list ("In one list" mode): every session —fork
 * children included —as a top-level row, strictly newest-first. No grouping,
 * no parent/child adjacency. Content search lives outside this derivation
 * (see {@link deriveSearchResults}).
 * @param list - sessions list snapshot.
 * @param archivedSessionIds - registry-global archive set.
 * @returns flat rows in render order.
 */
export function deriveFlat(
  list: SessionListState,
  archivedSessionIds: readonly SessionId[],
  pinnedSessionIds: readonly SessionId[] = [],
  /**
   * Row-verb archive set, separate from the visibility filter (see
   * {@link deriveGroups}): revealed archived rows must still carry the
   * registry-global archive marker for their menu verb.
   */
  verbSessionIds: readonly SessionId[] = archivedSessionIds,
  /**
   * Official-parity three-state filter: default excludes archived rows, show
   * includes them, only reduces the list to them.
   */
  archivedFilter: 'default' | 'show' | 'only' = 'default',
): SessionNode[] {
  const verbArchived = new Set(verbSessionIds)
  const pinned = new Set(pinnedSessionIds)
  const descendants = indexSubagentDescendants(list.byId)
  const rows: SessionSummary[] = []
  for (const id of list.ids) {
    const s = list.byId[id]
    if (s === undefined || s.origin === 'subagent') continue
    if (!s.blank || s.id === currentSessionId(list)) {
      const isArchived = verbArchived.has(s.id)
      if (archivedFilter === 'only' && !isArchived) continue
      if (archivedFilter !== 'show' && archivedFilter !== 'only' && isArchived) continue
    }
    rows.push(s)
  }
  rows.sort(byRecency)
  // Recency is the base order; pinning is a user statement that outranks it, so
  // pinned rows lead the flat list and keep their relative order otherwise.
  const ordered = pinned.size === 0
    ? rows
    : [...rows.filter(s => pinned.has(s.id)), ...rows.filter(s => !pinned.has(s.id))]
  return ordered.map(session => sessionNode(session, descendants, pinned, verbArchived))
}

/** Relative-time bucket of a session row's trailing label. */
export type RelativeTimeUnit = 'now' | 'minutes' | 'hours' | 'days' | 'months' | 'years'

/** Structured relative time: the bucket plus its magnitude (0 for 'now'). */
export interface RelativeTime {
  unit: RelativeTimeUnit
  n: number
}

/**
 * Merge immediate title/Workspace substring matches with ranked Host content
 * matches. Local rows lead newest-first, content-only rows retain backend
 * order, and duplicate sessions receive the backend snippet in place.
 * @param list - session metadata authority.
 * @param workspaces - Workspace membership and display labels.
 * @param query - caller text; surrounding whitespace is ignored.
 * @param archivedSessionIds - registry-global archive set (members never match).
 * @param content - ranked Host content-search page.
 * @param limit - protocol-owned maximum merged row count.
 * @returns bounded deduplicated flat rows and a refine-query hint bit.
 */
export function deriveSearchResults(
  list: SessionListState,
  workspaces: readonly WorkspaceView[],
  query: string,
  archivedSessionIds: readonly SessionId[],
  content: { items: readonly SessionSearchResultItem[]; hasMore: boolean },
  limit: number,
  pinnedSessionIds: readonly SessionId[] = [],
): SearchResultSet {
  const pinned = new Set(pinnedSessionIds)
  const q = query.trim().toLowerCase()
  if (q === '') return { items: [], hasMore: false }
  const archived = new Set(archivedSessionIds)
  const descendants = indexSubagentDescendants(list.byId)

  const workspaceBySession = new Map<SessionId, string>()
  for (const workspace of workspaces) {
    for (const sessionId of workspace.sessionIds) {
      if (!workspaceBySession.has(sessionId)) workspaceBySession.set(sessionId, workspace.title)
    }
  }
  const labelOf = (summary: SessionSummary): string =>
    workspaceBySession.get(summary.id) ?? workspaceLabel(summary.cwd)
  const contentBySession = new Map<SessionId, SessionSearchResultItem>()
  for (const item of content.items) {
    if (!contentBySession.has(item.sessionId)) contentBySession.set(item.sessionId, item)
  }

  const local: SessionSummary[] = []
  for (const id of list.ids) {
    const summary = list.byId[id]
    // Blank placeholders never match a query (their canonical title displays
    // localized, so matching it would tie search to one language).
    if (summary === undefined || summary.blank || !sessionVisible(summary, currentSessionId(list), archived)) continue
    if (
      sessionTitle(summary).toLowerCase().includes(q)
      || labelOf(summary).toLowerCase().includes(q)
    ) {
      local.push(summary)
    }
  }
  local.sort(byRecency)

  const ordered: SessionSummary[] = []
  const included = new Set<SessionId>()
  const include = (summary: SessionSummary): void => {
    if (included.has(summary.id)) return
    included.add(summary.id)
    ordered.push(summary)
  }
  for (const summary of local) include(summary)
  for (const item of content.items) {
    const summary = list.byId[item.sessionId]
    if (summary !== undefined && !summary.blank && sessionVisible(summary, currentSessionId(list), archived)) include(summary)
  }

  return {
    items: ordered.slice(0, limit).map((summary) => {
      const match = contentBySession.get(summary.id)
      return {
        id: summary.id,
        title: sessionTitle(summary),
        workspace: labelOf(summary),
        running: summary.running,
        runningSubagentCount: descendants.get(summary.id)?.runningCount ?? 0,
        ...(pinned.has(summary.id) ? { pinned: true } : {}),
        ...(summary.pendingInteraction === undefined
          ? {}
          : { pendingInteraction: summary.pendingInteraction }),
        completed: summary.completed === true,
        ...match === undefined ? {} : { snippet: match.snippet },
      }
    }),
    hasMore: content.hasMore || ordered.length > limit,
  }
}

/**
 * Compact relative time for session rows, as a structured bucket the
 * renderer localizes ("now"/"5min"/"3h"/"2d"/"4mo"/"1y" in en).
 * @param updatedAt - epoch ms of the session's last activity.
 * @param now - current epoch ms (injected for pure rendering).
 * @returns the row's trailing time bucket and magnitude.
 */
export function relativeTime(updatedAt: number, now: number): RelativeTime {
  const MIN = 60_000
  const HOUR = 3_600_000
  const DAY = 86_400_000
  const diff = Math.max(0, now - updatedAt)
  if (diff < MIN) return { unit: 'now', n: 0 }
  if (diff < HOUR) return { unit: 'minutes', n: Math.floor(diff / MIN) }
  if (diff < DAY) return { unit: 'hours', n: Math.floor(diff / HOUR) }
  if (diff < 30 * DAY) return { unit: 'days', n: Math.floor(diff / DAY) }
  if (diff < 365 * DAY) return { unit: 'months', n: Math.floor(diff / (30 * DAY)) }
  return { unit: 'years', n: Math.floor(diff / (365 * DAY)) }
}
