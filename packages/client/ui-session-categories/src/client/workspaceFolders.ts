/**
 * Display-only Workspace folders: tree derivation and menu projections.
 *
 * A folder here is pure view state. It groups root-level Workspace sections the
 * way a directory groups files, but it never renames a Workspace, moves a
 * Session between Workspaces, or changes anything on disk. The functions are
 * pure so the tree stays easy to unit-test and cheap to recompute on every
 * store change.
 */
import type { WorkspaceFolder } from './stores.ts'

/** One folder as the renderer needs it: siblings resolved, depth known. */
export interface WorkspaceFolderNode {
  id: string
  title: string
  parentId: string | null
  depth: number
  /** Default-expanded: grouping a list should not hide the list. */
  expanded: boolean
  children: WorkspaceFolderNode[]
}

/** Immutable projection of the persisted folder view state. */
export interface WorkspaceFolderForest {
  /** Root folders in display order. */
  roots: WorkspaceFolderNode[]
  /** Every reachable folder by id. */
  byId: ReadonlyMap<string, WorkspaceFolderNode>
  /** Workspace id → owning folder id, restricted to folders that still exist. */
  assignments: Readonly<Record<string, string>>
}

/** Order-independent stable sort: explicit `order`, then id. */
function compareFolders(left: WorkspaceFolder, right: WorkspaceFolder): number {
  if (left.order !== right.order) return left.order - right.order
  return left.id < right.id ? -1 : left.id > right.id ? 1 : 0
}

/**
 * Project persisted folders into the render tree.
 *
 * Defensive by design: a parent id that no longer exists behaves as the root,
 * and a corrupt parent cycle cannot swallow folders — unreachable nodes are
 * appended as roots instead of disappearing from the sidebar.
 *
 * @param folders - persisted folder records.
 * @param assignments - persisted Workspace → folder map.
 * @param expansion - persisted expanded flags; absent means expanded.
 * @returns roots, id lookup, and the surviving assignment map.
 */
export function buildWorkspaceFolderForest(
  folders: readonly WorkspaceFolder[],
  assignments: Readonly<Record<string, string>>,
  expansion: Readonly<Record<string, boolean>>,
): WorkspaceFolderForest {
  const known = new Set(folders.map(folder => folder.id))
  const childrenOf = new Map<string | null, WorkspaceFolder[]>()
  for (const folder of folders) {
    // A missing parent is treated as "top level" rather than losing the row.
    const parentId = folder.parentId !== null && known.has(folder.parentId) ? folder.parentId : null
    const siblings = childrenOf.get(parentId) ?? []
    siblings.push(folder)
    childrenOf.set(parentId, siblings)
  }
  for (const siblings of childrenOf.values()) siblings.sort(compareFolders)
  const byId = new Map<string, WorkspaceFolderNode>()
  const visited = new Set<string>()
  const build = (folder: WorkspaceFolder, depth: number): WorkspaceFolderNode => {
    const node: WorkspaceFolderNode = {
      id: folder.id,
      title: folder.title,
      parentId: folder.parentId,
      depth,
      expanded: expansion[folder.id] !== false,
      children: [],
    }
    byId.set(node.id, node)
    visited.add(folder.id)
    for (const child of childrenOf.get(folder.id) ?? []) {
      if (visited.has(child.id)) continue
      node.children.push(build(child, depth + 1))
    }
    return node
  }
  const roots = (childrenOf.get(null) ?? []).filter(folder => !visited.has(folder.id)).map(folder => build(folder, 0))
  // Unreachable nodes mean a parent cycle; surface them as roots in their own
  // stable order so the user can still drag them apart.
  const stranded = folders
    .filter(folder => !visited.has(folder.id))
    .sort(compareFolders)
  for (const folder of stranded) {
    if (visited.has(folder.id)) continue
    roots.push(build(folder, 0))
  }
  const survivingFolders = new Set(byId.keys())
  const survivingAssignments: Record<string, string> = {}
  for (const [workspaceId, folderId] of Object.entries(assignments)) {
    if (survivingFolders.has(folderId)) survivingAssignments[workspaceId] = folderId
  }
  return { roots, byId, assignments: Object.freeze(survivingAssignments) }
}

/** One folder menu row: flat projection of the tree used by "move to folder". */
export interface WorkspaceFolderOption {
  id: string
  title: string
  depth: number
}

/**
 * Flatten the forest into menu rows in visual order.
 * @param forest - projected tree.
 * @returns ordered folder options with their nesting depth.
 */
export function workspaceFolderOptions(forest: WorkspaceFolderForest): readonly WorkspaceFolderOption[] {
  const options: WorkspaceFolderOption[] = []
  const visit = (node: WorkspaceFolderNode): void => {
    options.push({ id: node.id, title: node.title, depth: node.depth })
    for (const child of node.children) visit(child)
  }
  for (const root of forest.roots) visit(root)
  return options
}

/**
 * Collect one folder plus its descendants — the set a folder cannot be moved
 * into (moving under itself would detach the whole branch).
 * @param forest - projected tree.
 * @param folderId - folder being moved.
 * @returns ids that are invalid drop targets for that folder.
 */
export function workspaceFolderInvalidTargets(forest: WorkspaceFolderForest, folderId: string): readonly string[] {
  const invalid: string[] = []
  const visit = (node: WorkspaceFolderNode): void => {
    invalid.push(node.id)
    for (const child of node.children) visit(child)
  }
  const root = forest.byId.get(folderId)
  if (root !== undefined) visit(root)
  return invalid
}

/**
 * Count the root-level Workspace sections a folder owns directly, without
 * descending into subfolders; the renderer adds its children's counts itself.
 * @param workspaceIds - root section ids in display order.
 * @param folderId - folder whose direct members are counted.
 * @param assignments - surviving assignment map.
 * @returns number of Workspaces filed directly in that folder.
 */
export function countDirectWorkspaces(
  workspaceIds: readonly string[],
  folderId: string,
  assignments: Readonly<Record<string, string>>,
): number {
  return workspaceIds.filter(workspaceId => assignments[workspaceId] === folderId).length
}
