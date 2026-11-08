/**
 * Session category browser tree row components (figma Cell set 14:3080): pure presentational — * all data and callbacks arrive via props. Hover swaps (folder->chevron,
 * time->ellipsis, action buttons) are CSS-only. Row ... menus are visual-only
 * except workspace Rename/Delete and session Rename/Fork/Archive; the session
 * and workspace hover cards are suppressed while a menu is open.
 */
import { useState } from 'react'
import type { CSSProperties } from 'react'
import clsx from 'clsx'
import {
  HoverCard, IconArchiveOutlineRegular, IconBranchOutlineRegular, IconEditOutlineRegular,
  IconEllipsisOutlineRegular, IconFolderCloseRegular, IconFolderOpenRegular, IconFolderOpenOutlineRegular,
  IconPinOutlineRegular, IconPlusOutlineRegular, IconSparkleRegular,
  IconTrashOutlineRegular, IconTriangleRightFillRegular, Menu, StateDot,
} from '@deepseek-ai/dsh-client-ui-primitives'
import type { StateDotState } from '@deepseek-ai/dsh-client-ui-primitives'
import type { WorkspaceBrowserProps } from '../contract/slots.ts'
import type { SessionId, WorkspaceId } from '../types.ts'
import type { SessionCategoryId } from '@deepseek-ai/dsh-session-categories/types'
import type { CategoryNode, GroupNode, SearchResultNode, SessionNode } from '../tree.ts'
import type { WorkspaceFolderNode, WorkspaceFolderOption } from '../workspaceFolders.ts'
import { renderWorkspaceIcon } from '../workspaceIcons.tsx'
import { relativeTime } from '../tree.ts'
import css from './Rows.module.css'

/** The standard locale seat, prop-passed from the browser root. */
type RowTranslate = WorkspaceBrowserProps['t']

/** Typed browser drag data shared by category and Session rows. */
export type CategoryDragPayload =
  | { readonly kind: 'session'; readonly workspaceId: WorkspaceId; readonly sessionIds: readonly SessionId[] }
  | { readonly kind: 'category'; readonly workspaceId: WorkspaceId; readonly categoryId: SessionCategoryId }

const CATEGORY_DRAG_TYPE = 'application/x-dsh-session-category'

function readCategoryDrag(dataTransfer: DataTransfer): CategoryDragPayload | null {
  try {
    const value: unknown = JSON.parse(dataTransfer.getData(CATEGORY_DRAG_TYPE))
    if (typeof value !== 'object' || value === null || !('kind' in value) || !('workspaceId' in value)) return null
    if (value.kind === 'category' && 'categoryId' in value && typeof value.categoryId === 'string') return value as CategoryDragPayload
    if (value.kind === 'session' && 'sessionIds' in value && Array.isArray(value.sessionIds)
      && value.sessionIds.every(id => typeof id === 'string')) return value as CategoryDragPayload
    return null
  } catch {
    return null
  }
}

function hasCategoryDrag(dataTransfer: DataTransfer): boolean {
  return Array.from(dataTransfer.types).includes(CATEGORY_DRAG_TYPE)
}

function actionFailure(value: unknown): string | null {
  if (typeof value !== 'object' || value === null || !('ok' in value) || value.ok !== false || !('error' in value)) return null
  const error: unknown = value.error
  if (typeof error !== 'object' || error === null) return String(error)
  if ('message' in error && typeof error.message === 'string') return error.message
  if ('code' in error && typeof error.code === 'string') return error.code
  return String(error)
}

/** Row display title: blank rows show the localized New Session label. */
function displayTitle(node: SessionNode, t: RowTranslate): string {
  return node.blank ? t('session.new') : node.title
}

/** Localized compact relative time ("刚刚"/"5分钟" in zh, "now"/"5min" in en). */
function timeLabel(updatedAt: number, now: number, t: RowTranslate): string {
  const { unit, n } = relativeTime(updatedAt, now)
  return unit === 'now' ? t('time.now') : t(`time.${unit}`, { n })
}

/** Hover-card variant: distances wrap in the ago template; the now bucket stays bare (no "now ago"). */
function hoverTimeLabel(updatedAt: number, now: number, t: RowTranslate): string {
  const { unit, n } = relativeTime(updatedAt, now)
  return unit === 'now' ? t('time.now') : t('time.ago', { t: t(`time.${unit}`, { n }) })
}

/**
 * Absolute creation time through the dictionary's date template (the message
 * clock pattern): `toLocaleString` would follow the browser language, not the
 * app locale, and produce mixed-language text after a switch.
 */
function createdLabel(createdAt: number, t: RowTranslate): string {
  const d = new Date(createdAt)
  const pad2 = (v: number): string => String(v).padStart(2, '0')
  const date = t('date.ymd', { y: d.getFullYear(), m: d.getMonth() + 1, d: d.getDate() })
  return t('hover.created', { time: `${date} ${pad2(d.getHours())}:${pad2(d.getMinutes())}` })
}

/** Hover-card body: workspace title, full directory path, absolute creation time. */
function WorkspaceHoverContent({ label, cwd, createdAt, t }: {
  label: string
  cwd: string | undefined
  createdAt: number
  t: RowTranslate
}) {
  return (
    <div className={css.hoverContent}>
      <div className={css.hoverTitle}>{label}</div>
      <div className={css.hoverPath}>{cwd}</div>
      <div className={css.hoverTime}>{createdLabel(createdAt, t)}</div>
    </div>
  )
}

/**
 * Row drag wiring supplied by the tree owner. `drop` reports the half of the
 * row where the pointer released so the owner can resolve an insert anchor.
 */
export interface RowDragProps {
  /** Start dragging this row. */
  start: () => void
  /** A compatible row drag is in flight. */
  active: boolean
  /** Current marker on this row: insert line above, below, or none. */
  marker: 'before' | 'after' | null
  /** Report the hovered half while a compatible drag passes over this row. */
  hover: (half: 'before' | 'after') => void
  drop: (half: 'before' | 'after') => void
  end: () => void
}

/** Drag lifecycle owned by a workspace row; its enclosing group owns hit testing. */
interface WorkspaceRowDragProps {
  start: () => void
  end: () => void
}

/** Pointer-position half of a row (insert line above or below). */
function rowHalf(e: { clientY: number; currentTarget: HTMLElement }): 'before' | 'after' {
  const rect = e.currentTarget.getBoundingClientRect()
  return e.clientY < rect.top + rect.height / 2 ? 'before' : 'after'
}

/**
 * Project (workspace) header row: folder + title;
 * hover reveals the chevron and create button, and dwelling on a real
 * Workspace shows its hover card (the ungrouped bucket has none).
 * `containsCurrent` arrives on the node (derivation fact, no renderer scan).
 * @param props.group - derived group node.
 * @param props.onToggle - expand/collapse the group.
 * @param props.onCreate - start a frontend Session inside this Workspace.
 * @param props.drag - optional workspace-row drag wiring.
 * @param props.t - the browser root's locale seat.
 * @returns the row element.
 */
export function ProjectRowItem({ group, onToggle, onCreate, actions, icon, onPickIcon, drag, isArchiveSection = false, t }: {
  group: GroupNode
  onToggle: () => void
  onCreate: () => void
  /** Persisted leading icon for this Workspace (`dsh:` / `emoji:` ref). */
  icon?: string | undefined
  /** Open the icon picker for this Workspace. */
  onPickIcon?: (() => void) | undefined
  /** Real-Workspace actions; absent for the ungrouped bucket (no menu shown). */
  actions?: {
    rename: () => void
    delete: () => void
    createCategory?: (() => void) | undefined
    /** Open the icon picker for this Workspace row. */
    setIcon?: (() => void) | undefined
    /**
     * Archive every unarchived Session of this Workspace in one action.
     * Absent when the Workspace has nothing left to archive.
     */
    archiveAll?: (() => void) | undefined
    /**
     * Display-folder placement for this Workspace row: the browser-local
     * folders it can be filed into, the folder it currently sits in, and the
     * verb that rewrites that one assignment. Display-only — no Workspace,
     * Session, or path changes travel with it.
     */
    moveToFolder?: {
      folders: readonly { id: string; title: string; depth: number }[]
      currentFolderId: string | null
      onMove: (folderId: string | null) => void
    } | undefined
  } | undefined
  /** Present only for real Workspace rows in the grouped view. */
  drag?: WorkspaceRowDragProps | undefined
  /** The trailing archive section: archive glyph instead of a folder, no menu, no create. */
  isArchiveSection?: boolean | undefined
  t: RowTranslate
}) {
  const row = group
  // The ungrouped bucket has no workspace title: its label is dictionary copy.
  // The archive section is likewise workspaceId-less; its dictionary entry is
  // shared with the view-options toggle label.
  const label = row.workspaceId === undefined
    ? (isArchiveSection ? t('archived.label') : t('group.ungrouped'))
    : row.label
  const active = group.expanded && group.containsCurrent
  const [menuOpen, setMenuOpen] = useState(false)
  const folderMove = actions?.moveToFolder
  const workspaceMenuItems = [
    ...(actions?.createCategory === undefined ? [] : [{ id: 'create-category', label: t('category.create'), icon: <IconPlusOutlineRegular /> }]),
    ...(actions?.setIcon === undefined ? [] : [{ id: 'set-icon', label: t('icon.pick'), icon: <IconSparkleRegular /> }]),
    ...(actions?.archiveAll === undefined ? [] : [{ id: 'archive-all', label: t('menu.archiveAll'), icon: <IconArchiveOutlineRegular /> }]),
    // Display-folder placement: a submenu instead of a dialog keeps the action
    // in the same menu the user already opened on the row.
    ...(folderMove === undefined ? [] : [{
      id: 'move-to-folder',
      label: t('folder.moveWorkspace'),
      icon: <IconFolderCloseRegular />,
      submenu: [
        { id: 'move-to-folder:none', label: t('folder.unfiled'), icon: <IconFolderOpenOutlineRegular /> },
        ...folderMove.folders.map(folder => ({
          id: `move-to-folder:${folder.id}`,
          icon: <IconFolderCloseRegular />,
          label: <span style={{ paddingInlineStart: folder.depth * 12 }}>{folder.title}</span>,
        })),
      ],
    }]),
    { id: 'rename', label: t('rename'), icon: <IconEditOutlineRegular /> },
    { id: 'delete', label: t('delete.workspace'), icon: <IconTrashOutlineRegular />, danger: true },
  ]
  const ownRow = (
    <div
      className={clsx(css.projectRow, menuOpen && css.menuOpen)}
      // Indentation is inherited, not computed: "by workspace tree" wraps a
      // child section in `.workspaceChildGroup`, whose padding-inline-start
      // shifts the header row, its category rows and its session rows alike.
      // A depth style here as well would double-count that nesting.
      role="treeitem"
      aria-expanded={row.expanded}
      onClick={onToggle}
      draggable={drag !== undefined}
      onDragStart={drag === undefined
        ? undefined
        : (e) => {
          e.dataTransfer.effectAllowed = 'move'
          e.dataTransfer.setData('text/plain', row.key)
          drag?.start()
        }}
      onDragEnd={drag?.end}
    >
      {isArchiveSection ? (
        <span className={clsx(css.slot, css.archivedGlyph)}>
          <IconArchiveOutlineRegular size={14} />
        </span>
      ) : (
        // Leading icon slot: the user's icon when one is set, otherwise a quiet
        // default dot. Both occupy the same 16px cell, and clicking the cell
        // opens the picker instead of toggling the row.
        <span
          className={clsx(css.slot, css.workspaceIconSlot, active && css.folderActive)}
          role={onPickIcon === undefined ? undefined : 'button'}
          tabIndex={onPickIcon === undefined ? undefined : -1}
          title={onPickIcon === undefined ? undefined : t('icon.pick')}
          aria-label={onPickIcon === undefined ? undefined : t('icon.pick')}
          onClick={onPickIcon === undefined
            ? undefined
            : (event) => { event.stopPropagation(); onPickIcon() }}
        >
          {icon !== undefined && icon !== '' ? renderWorkspaceIcon(icon) : <span className={css.workspaceIconDot} aria-hidden="true" />}
        </span>
      )}
      <span className={clsx(css.slot, css.chevron)}>
        <IconTriangleRightFillRegular className={clsx(css.arrow, row.expanded && css.arrowOpen)} />
      </span>
      <span className={css.projectText}>
        <span className={css.title}>{label}</span>
      </span>
      <span className={css.rowActions}>
        {actions !== undefined && !isArchiveSection && (
          <Menu
            open={menuOpen}
            onClose={() => { setMenuOpen(false) }}
            items={workspaceMenuItems}
            onSelect={(id) => {
              setMenuOpen(false)
              // "Move to folder" rows name their destination after the colon;
              // `none` is the unfiled bucket.
              if (id.startsWith('move-to-folder:')) {
                const target = id.slice('move-to-folder:'.length)
                folderMove?.onMove(target === 'none' ? null : target)
                return
              }
              // Unknown ids leave before the dispatch: a future menu row must
              // not inherit the destructive branch as an else fallback.
              /* v8 ignore next -- workspaceMenuItems carries exactly these rows today. */
              if (id === 'create-category') { actions.createCategory?.(); return }
              if (id === 'set-icon') { actions.setIcon?.(); return }
              if (id === 'archive-all') { actions.archiveAll?.(); return }
              if (id !== 'rename' && id !== 'delete') return
              if (id === 'rename') actions.rename()
              else actions.delete()
            }}
            portal
            closeOnPointerLeave
            anchor={(
              <button
                type="button"
                className={css.iconButton}
                aria-label={t('actions.workspace.aria', { name: label })}
                onClick={(e) => { e.stopPropagation(); setMenuOpen(v => !v) }}
              >
                <IconEllipsisOutlineRegular />
              </button>
            )}
          />
        )}
        {!isArchiveSection && (
          <button
            type="button"
            className={css.iconButton}
            aria-label={t('actions.newSession.aria', { name: label })}
            onClick={(e) => { e.stopPropagation(); onCreate() }}
          >
            <IconPlusOutlineRegular />
          </button>
        )}
      </span>
    </div>
  )
  // The ungrouped bucket has no backing Workspace: no card to show.
  if (row.createdAt === undefined) return ownRow
  return (
    <HoverCard
      anchor={ownRow}
      content={<WorkspaceHoverContent label={row.label} cwd={row.cwd} createdAt={row.createdAt} t={t} />}
      disabled={menuOpen}
      copyText={row.cwd}
      copyLabel={t('copy')}
      copiedLabel={t('hover.copied')}
    />
  )
}

/** One fixed-height category tree row with inline rename and guarded drops. */
export function CategoryRowItem({
  node, workspaceId, depth, categoryOptions, invalidMoveTargetIds, invalidCategorySourceIds,
  onToggle, onCreate, onCreateCategory, onRename, onMove, onDelete,
  onDropPayload, onReorder, t,
}: {
  node: CategoryNode
  workspaceId: WorkspaceId
  depth: number
  categoryOptions: readonly { id: SessionCategoryId; title: string; depth: number }[]
  invalidMoveTargetIds: readonly SessionCategoryId[]
  /** Sources that cannot be parented under this target: the target and each of its ancestors. */
  invalidCategorySourceIds: readonly SessionCategoryId[]
  onToggle: () => void
  /** Start a new session in this category's Workspace. */
  onCreate: () => void
  /** Create a child category under this row. */
  onCreateCategory?: (parentId: SessionCategoryId) => void
  onRename: (categoryId: SessionCategoryId, title: string) => Promise<unknown> | void
  onMove: (categoryId: SessionCategoryId, parentId: SessionCategoryId | null) => Promise<unknown> | void
  onDelete: (categoryId: SessionCategoryId) => void
  onDropPayload: (payload: CategoryDragPayload, targetId: SessionCategoryId) => void
  /**
   * Reorder one same-parent sibling next to this row.
   *
   * Absent leaves the pre-existing single drop verb (nest under `targetId`);
   * present splits a category drop by the hovered half: a sibling inside the
   * same parent is reordered, anything else still falls through to
   * {@link onDropPayload} so cross-level nesting keeps working.
   */
  onReorder?: ((sourceId: SessionCategoryId, targetId: SessionCategoryId, half: 'before' | 'after') => void) | undefined
  t: RowTranslate
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [renaming, setRenaming] = useState(false)
  const [draft, setDraft] = useState(node.title)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dropTarget, setDropTarget] = useState(false)
  /** Which half the pointer is on while a category drag is in flight. */
  const [dropHalf, setDropHalf] = useState<'before' | 'after' | null>(null)
  const submitRename = () => {
    const title = draft.trim()
    if (busy || title === '') return
    setBusy(true)
    setError(null)
    Promise.resolve(onRename(node.id, title)).then(() => {
      setBusy(false)
      setRenaming(false)
    }).catch((reason: unknown) => {
      setBusy(false)
      setError(reason instanceof Error ? reason.message : String(reason))
    })
  }
  const moveItems = [
    { id: 'move-root', label: t('category.root'), icon: <IconFolderCloseRegular />, disabled: busy },
    ...categoryOptions.filter(category => !invalidMoveTargetIds.includes(category.id))
      .map(category => ({
        id: `move:${category.id}`,
        disabled: busy,
        icon: <IconFolderCloseRegular />,
        label: <span style={{ paddingInlineStart: category.depth * 12 }}>{category.title}</span>,
      })),
  ]
  const submitMove = (parentId: SessionCategoryId | null) => {
    if (busy) return
    setBusy(true)
    setError(null)
    Promise.resolve(onMove(node.id, parentId)).then((result) => {
      const message = actionFailure(result)
      setBusy(false)
      if (message === null) setMenuOpen(false)
      else { setError(message); setMenuOpen(true) }
    }).catch((reason: unknown) => {
      setBusy(false)
      setError(reason instanceof Error ? reason.message : String(reason))
      setMenuOpen(true)
    })
  }
  return (
    <div
      className={clsx(css.categoryRow, menuOpen && css.menuOpen, dropTarget && css.categoryDropTarget,
        dropHalf === 'before' && css.dropBefore, dropHalf === 'after' && css.dropAfter)}
      style={{ '--category-depth': depth } as CSSProperties}
      role="treeitem"
      aria-label={node.title}
      aria-expanded={node.expanded}
      data-category-drop-target={dropTarget ? 'true' : undefined}
      title={node.title}
      draggable={!renaming}
      onClick={renaming ? undefined : onToggle}
      onDragStart={(event) => {
        const payload: CategoryDragPayload = { kind: 'category', workspaceId, categoryId: node.id }
        event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.setData(CATEGORY_DRAG_TYPE, JSON.stringify(payload))
      }}
      onDragOver={(event) => {
        if (!hasCategoryDrag(event.dataTransfer)) return
        event.preventDefault()
        event.dataTransfer.dropEffect = 'move'
        setDropTarget(true)
        if (onReorder !== undefined) setDropHalf(rowHalf(event))
      }}
      onDragLeave={(event) => {
        if (event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)) return
        setDropTarget(false)
        setDropHalf(null)
      }}
      onDrop={(event) => {
        const payload = readCategoryDrag(event.dataTransfer)
        const half = onReorder === undefined ? null : rowHalf(event)
        setDropTarget(false)
        setDropHalf(null)
        if (payload === null || payload.workspaceId !== workspaceId
          || (payload.kind === 'category' && invalidCategorySourceIds.includes(payload.categoryId))) return
        event.preventDefault()
        if (payload.kind === 'category' && onReorder !== undefined && half !== null) {
          onReorder(payload.categoryId, node.id, half)
          return
        }
        onDropPayload(payload, node.id)
      }}
    >
      <span className={css.slot}><IconTriangleRightFillRegular className={clsx(css.arrow, node.expanded && css.arrowOpen)} /></span>
      <span className={clsx(css.slot, node.containsCurrent && css.folderActive)}>
        {node.expanded ? <IconFolderOpenRegular /> : <IconFolderCloseRegular />}
      </span>
      {renaming ? (
        <input autoFocus className={css.renameInput} aria-label={t('field.categoryName')} value={draft} disabled={busy}
          onClick={event => { event.stopPropagation() }} onChange={event => { setDraft(event.target.value) }}
          onKeyDown={event => {
            if (event.key === 'Enter') submitRename()
            if (event.key === 'Escape' && !busy) setRenaming(false)
          }} />
      ) : <span className={css.title}>{node.title}</span>}
      <span className={css.rowActions}>
        <button type="button" className={css.iconButton} aria-label={t('actions.newSession.aria', { name: node.title })}
          onClick={(event) => { event.stopPropagation(); onCreate() }}><IconPlusOutlineRegular /></button>
        <Menu open={menuOpen} onClose={() => { setMenuOpen(false) }} portal closeOnPointerLeave
          items={[
            ...(onCreateCategory === undefined ? [] : [{ id: 'create-category', label: t('category.createChild'), icon: <IconPlusOutlineRegular /> }]),
            { id: 'rename', label: t('rename'), icon: <IconEditOutlineRegular /> },
            { id: 'move', label: t('category.move'), icon: <IconFolderOpenOutlineRegular />, submenu: moveItems },
            { id: 'delete', label: t('category.delete'), icon: <IconTrashOutlineRegular />, danger: true },
          ]}
          onSelect={(id) => {
            if (id === 'create-category') { onCreateCategory?.(node.id); setMenuOpen(false) }
            if (id === 'rename') { setDraft(node.title); setRenaming(true) }
            if (id === 'rename') setMenuOpen(false)
            if (id === 'move-root') submitMove(null)
            if (id.startsWith('move:')) submitMove(id.slice(5) as SessionCategoryId)
            if (id === 'delete') { setMenuOpen(false); onDelete(node.id) }
          }}
          anchor={<button type="button" className={css.iconButton} aria-label={t('actions.category.aria', { name: node.title })}
            onClick={(event) => { event.stopPropagation(); setMenuOpen(value => !value) }}><IconEllipsisOutlineRegular /></button>} />
      </span>
      {error !== null && <span role="alert" className={css.rowError}>{error}</span>}
    </div>
  )
}

/** MIME type carried by a display-folder drag; Workspace drags stay text/plain. */
export const WORKSPACE_FOLDER_DRAG_TYPE = 'application/x-dsh-workspace-folder'

/** Payload of one display-folder drag. */
export interface WorkspaceFolderDragPayload {
  readonly folderId: string
}

/** Where a dropped folder row lands relative to the hovered folder row. */
export type WorkspaceFolderDropZone = 'before' | 'after' | 'inside'

/** Read one folder drag payload off a DataTransfer; never throws. */
function readWorkspaceFolderDrag(dataTransfer: DataTransfer): WorkspaceFolderDragPayload | null {
  try {
    const value: unknown = JSON.parse(dataTransfer.getData(WORKSPACE_FOLDER_DRAG_TYPE))
    if (typeof value !== 'object' || value === null || !('folderId' in value)
      || typeof value.folderId !== 'string') return null
    return { folderId: value.folderId }
  } catch {
    return null
  }
}

/** Whether a DataTransfer carries a display-folder drag. */
function hasWorkspaceFolderDrag(dataTransfer: DataTransfer): boolean {
  return Array.from(dataTransfer.types).includes(WORKSPACE_FOLDER_DRAG_TYPE)
}

/**
 * Insert side for a folder drop: the middle band nests, the thin top/bottom
 * bands reorder — the same three-zone language the category rows already use.
 * @param event - drag event targeting the row.
 * @returns the zone under the pointer.
 */
function workspaceFolderDropZone(event: { clientY: number; currentTarget: HTMLElement }): WorkspaceFolderDropZone {
  const rect = event.currentTarget.getBoundingClientRect()
  if (rect.height <= 0) return 'inside'
  const ratio = (event.clientY - rect.top) / rect.height
  return ratio < 0.3 ? 'before' : ratio > 0.7 ? 'after' : 'inside'
}

/**
 * One display-only Workspace folder row: a collapsible heading that draws its
 * member Workspace sections underneath. It looks and behaves like the Session
 * category rows beside it (chevron, folder glyph, inline rename, "..." menu,
 * three-zone drops), but it never changes a Workspace title, a Session, or a
 * path — membership is one browser-local assignment.
 *
 * The same component renders the synthetic "Unfiled" bucket: `unfiled` hides
 * rename/delete/drag affordances and makes the row a drop target that clears an
 * assignment instead of setting one.
 */
export function WorkspaceFolderRow({
  node, unfiled = false, workspaceCount, containsCurrent, folderDragActive, workspaceDragActive,
  moveTargets, onToggle, onRename, onDelete, onCreateChild, onMove, onFolderDrop, onWorkspaceDrop,
  icon, onPickIcon, workspaceHovered = false, onDragStart, onDragEnd, t,
}: {
  node: WorkspaceFolderNode
  /** True for the synthetic bucket that owns Workspaces no folder claims. */
  unfiled?: boolean
  /** Persisted leading icon for this folder (`dsh:` / `emoji:` ref). */
  icon?: string | undefined
  /** Open the icon picker for this folder. */
  onPickIcon?: (() => void) | undefined
  /** Direct member Workspace sections, shown as a count while collapsed. */
  workspaceCount: number
  /** True when the selected Session lives in one of this folder's Workspaces. */
  containsCurrent: boolean
  /** A folder row drag is in flight. */
  folderDragActive: boolean
  /** A Workspace row drag is in flight. */
  workspaceDragActive: boolean
  /** Folders this folder may move next to / inside (descendants excluded). */
  moveTargets?: readonly WorkspaceFolderOption[] | undefined
  onToggle: () => void
  onRename?: ((folderId: string, title: string) => void) | undefined
  onDelete?: ((folderId: string) => void) | undefined
  onCreateChild?: ((folderId: string) => void) | undefined
  onMove?: ((folderId: string, parentId: string | null, beforeId?: string) => void) | undefined
  /** A folder drag released on this row (`node.id` is the bucket id when unfiled). */
  onFolderDrop?: ((sourceFolderId: string, targetId: string, zone: WorkspaceFolderDropZone) => void) | undefined
  /** A Workspace row dropped on this folder: file it (folder) or unfiled it (bucket). */
  onWorkspaceDrop: () => void
  /** The folder's expanded body is under a Workspace drag, so the header lights up too. */
  workspaceHovered?: boolean
  /** Folder drag lifecycle, owned by the tree so row styles can react to it. */
  onDragStart?: (() => void) | undefined
  onDragEnd?: (() => void) | undefined
  t: RowTranslate
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [renaming, setRenaming] = useState(false)
  const [draft, setDraft] = useState(node.title)
  /** Folder-drop marker for this row while a folder drag passes over it. */
  const [dropZone, setDropZone] = useState<WorkspaceFolderDropZone | null>(null)
  /** Workspace-drop highlight for this row while a Workspace drag passes over it. */
  const [workspaceOver, setWorkspaceOver] = useState(false)
  const interactive = !unfiled
  const canRename = interactive && onRename !== undefined
  const submitRename = (): void => {
    const title = draft.trim()
    if (title === '') { setRenaming(false); return }
    onRename?.(node.id, title)
    setRenaming(false)
  }
  const moveItems = [
    { id: 'move-root', label: t('folder.root'), icon: <IconFolderOpenOutlineRegular /> },
    ...(moveTargets ?? []).map(folder => ({
      id: `move:${folder.id}`,
      icon: <IconFolderCloseRegular />,
      label: <span style={{ paddingInlineStart: folder.depth * 12 }}>{folder.title}</span>,
    })),
  ]
  const menuItems = [
    ...(onCreateChild === undefined ? [] : [{ id: 'create-child', label: t('folder.createChild'), icon: <IconPlusOutlineRegular /> }]),
    ...(onPickIcon === undefined ? [] : [{ id: 'set-icon', label: t('icon.pick'), icon: <IconSparkleRegular /> }]),
    { id: 'rename', label: t('rename'), icon: <IconEditOutlineRegular /> },
    { id: 'move', label: t('folder.move'), icon: <IconFolderOpenOutlineRegular />, submenu: moveItems },
    { id: 'delete', label: t('folder.delete'), icon: <IconTrashOutlineRegular />, danger: true },
  ]
  return (
    <div
      className={clsx(
        css.categoryRow,
        css.workspaceFolderRow,
        menuOpen && css.menuOpen,
        dropZone === 'inside' && css.workspaceFolderDropInside,
        dropZone === 'before' && css.dropBefore,
        dropZone === 'after' && css.dropAfter,
        (workspaceOver || workspaceHovered) && css.workspaceFolderWorkspaceOver,
      )}
      role="treeitem"
      aria-label={node.title}
      aria-expanded={node.expanded}
      data-workspace-folder={unfiled ? undefined : node.id}
      title={node.title}
      draggable={interactive && !renaming}
      onClick={renaming ? undefined : onToggle}
      onDragStart={interactive
        ? (event) => {
          event.dataTransfer.effectAllowed = 'move'
          event.dataTransfer.setData(WORKSPACE_FOLDER_DRAG_TYPE, JSON.stringify({ folderId: node.id } satisfies WorkspaceFolderDragPayload))
          event.dataTransfer.setData('text/plain', node.title)
          onDragStart?.()
        }
        : (event) => { event.preventDefault() }}
      onDragEnd={onDragEnd}
      onDragOver={(event) => {
        if (folderDragActive && hasWorkspaceFolderDrag(event.dataTransfer)) {
          event.preventDefault()
          event.dataTransfer.dropEffect = 'move'
          setWorkspaceOver(false)
          setDropZone(workspaceFolderDropZone(event))
          return
        }
        if (workspaceDragActive) {
          event.preventDefault()
          event.dataTransfer.dropEffect = 'move'
          setDropZone(null)
          setWorkspaceOver(true)
        }
      }}
      onDragLeave={(event) => {
        if (event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)) return
        setDropZone(null)
        setWorkspaceOver(false)
      }}
      onDrop={(event) => {
        if (folderDragActive) {
          const payload = readWorkspaceFolderDrag(event.dataTransfer)
          const zone = dropZone ?? 'inside'
          setDropZone(null)
          setWorkspaceOver(false)
          if (payload === null || payload.folderId === node.id) return
          event.preventDefault()
          onFolderDrop?.(payload.folderId, node.id, zone)
          return
        }
        if (workspaceDragActive) {
          event.preventDefault()
          setWorkspaceOver(false)
          onWorkspaceDrop()
        }
      }}
    >
      <span className={css.slot}>
        <IconTriangleRightFillRegular className={clsx(css.arrow, node.expanded && css.arrowOpen)} />
      </span>
      <span
        className={clsx(css.slot, css.workspaceIconSlot, containsCurrent && css.folderActive)}
        role={onPickIcon === undefined ? undefined : 'button'}
        tabIndex={onPickIcon === undefined ? undefined : -1}
        title={onPickIcon === undefined ? undefined : t('icon.pick')}
        aria-label={onPickIcon === undefined ? undefined : t('icon.pick')}
        onClick={onPickIcon === undefined
          ? undefined
          : (event) => { event.stopPropagation(); onPickIcon() }}
      >
        {icon !== undefined && icon !== ''
          ? renderWorkspaceIcon(icon)
          : node.expanded ? <IconFolderOpenRegular /> : <IconFolderCloseRegular />}
      </span>
      {renaming ? (
        <input
          autoFocus
          className={css.renameInput}
          aria-label={t('folder.name')}
          value={draft}
          onClick={event => { event.stopPropagation() }}
          onFocus={event => { event.target.select() }}
          onChange={event => { setDraft(event.target.value) }}
          onBlur={submitRename}
          onKeyDown={(event) => {
            if (event.key === 'Enter') submitRename()
            if (event.key === 'Escape') setRenaming(false)
          }}
        />
      ) : (
        <span
          className={css.title}
          onDoubleClick={canRename
            ? (event) => { event.stopPropagation(); setDraft(node.title); setRenaming(true) }
            : undefined}
        >{node.title}</span>
      )}
      {!node.expanded && workspaceCount > 0 && (
        <span className={css.projectSummary}>{t('folder.workspaceCount', { n: workspaceCount })}</span>
      )}
      {interactive && (
        <span className={css.rowActions}>
          <Menu
            open={menuOpen}
            onClose={() => { setMenuOpen(false) }}
            portal
            closeOnPointerLeave
            items={menuItems}
            onSelect={(id) => {
              if (id === 'create-child') { setMenuOpen(false); onCreateChild?.(node.id); return }
              if (id === 'set-icon') { setMenuOpen(false); onPickIcon?.(); return }
              if (id === 'rename') {
                setMenuOpen(false)
                setDraft(node.title)
                setRenaming(true)
                return
              }
              if (id === 'move-root') { setMenuOpen(false); onMove?.(node.id, null); return }
              if (id.startsWith('move:')) { setMenuOpen(false); onMove?.(node.id, id.slice(5)); return }
              if (id === 'delete') { setMenuOpen(false); onDelete?.(node.id) }
            }}
            anchor={(
              <button
                type="button"
                className={css.iconButton}
                aria-label={t('folder.actions.aria', { name: node.title })}
                onClick={(event) => { event.stopPropagation(); setMenuOpen(value => !value) }}
              >
                <IconEllipsisOutlineRegular />
              </button>
            )}
          />
        </span>
      )}
    </div>
  )
}

/* v8 ignore next 3 -- closed-union backstop; only reached if the status is forged */
function assertNever(value: never): never {
  throw new Error(`unknown pending interaction: ${String(value)}`)
}

interface SessionStatus {
  state: StateDotState
  label: string
}

/**
 * Session status presentation; pending interaction is primary and live activity
 * outranks completion reminders.
 */
function sessionStatuses(
  node: Pick<SessionNode, 'pendingInteraction' | 'running' | 'runningSubagentCount' | 'completed'>,
  t: RowTranslate,
): readonly [SessionStatus, ...SessionStatus[]] {
  const subagents: SessionStatus | undefined = node.runningSubagentCount === 0
    ? undefined
    : {
      state: 'ongoing',
      label: t(
        node.runningSubagentCount === 1
          ? 'status.subagentsRunning.one'
          : 'status.subagentsRunning.other',
        { n: node.runningSubagentCount },
      ),
    }
  let pending: SessionStatus | undefined
  switch (node.pendingInteraction) {
    case 'approval':
      pending = { state: 'warning', label: t('status.waitingApproval') }
      break
    case 'plan-review':
      pending = { state: 'warning', label: t('status.planReview') }
      break
    case 'question':
      pending = { state: 'warning', label: t('status.waitingAnswer') }
      break
    case undefined: break
    /* v8 ignore next -- closed PendingInteractionStatus union */
    default: return assertNever(node.pendingInteraction)
  }
  if (pending !== undefined) return subagents === undefined ? [pending] : [pending, subagents]
  if (node.running) {
    const primary: SessionStatus = { state: 'ongoing', label: t('status.running') }
    return subagents === undefined ? [primary] : [primary, subagents]
  }
  if (subagents !== undefined) return [subagents]
  if (node.completed) return [{ state: 'done', label: t('status.completed') }]
  return [{ state: 'done', label: t('status.idle') }]
}

/** Primary status dot plus every status's screen-reader label, shared by the search and session rows. */
function SessionStatusDots({ statuses }: { statuses: readonly [SessionStatus, ...SessionStatus[]] }) {
  return (
    <>
      <StateDot state={statuses[0].state} />
      {statuses.map(status => (
        <span className={css.visuallyHidden} key={status.label}>{status.label}</span>
      ))}
    </>
  )
}

/** Hover-card body: full title, relative time, and every relevant live status. */
function SessionHoverContent({ node, now, t }: { node: SessionNode; now: number; t: RowTranslate }) {
  const statuses = sessionStatuses(node, t)
  return (
    <div className={css.hoverContent}>
      <div className={css.hoverTitle}>{displayTitle(node, t)}</div>
      {/* Same placeholder rule as the row's trailing cell: no timestamp
          before the first prompt. */}
      {!node.blank && <div className={css.hoverTime}>{hoverTimeLabel(node.updatedAt, now, t)}</div>}
      {/* Archived rows show the archive badge first: it is the fact that
          explains why the row may sit outside every workspace group. */}
      {node.archived === true && (
        <div className={css.hoverStatus}>
          <IconArchiveOutlineRegular size={14} />
          <span>{t('archived.label')}</span>
        </div>
      )}
      {statuses.map(status => (
        <div className={css.hoverStatus} key={status.label}>
          <StateDot state={status.state} />
          <span>{status.label}</span>
        </div>
      ))}
    </div>
  )
}

/**
 * One flat search result: title, Workspace context, and optional content
 * excerpt. Search navigation opens the session only; it does not address an
 * event inside the conversation.
 * @param props.result - merged local/content search row.
 * @param props.currentId - selected session id.
 * @param props.onOpen - open the selected session.
 * @param props.t - Workspace-browser translation seat.
 * @returns the result button.
 */
export function SearchResultItem({ result, currentId, onOpen, t }: {
  result: SearchResultNode
  currentId: string | undefined
  onOpen: (id: SearchResultNode['id']) => void
  t: RowTranslate
}) {
  const selected = result.id === currentId
  const statuses = sessionStatuses(result, t)
  const primaryStatus = statuses[0]
  return (
    <button
      type="button"
      className={clsx(css.searchResultRow, selected && css.selected)}
      role="treeitem"
      aria-selected={selected}
      onClick={() => { onOpen(result.id) }}
    >
      <span className={css.searchResultHeading}>
        <span className={css.slot}>
          {(primaryStatus.state !== 'done' || result.completed) && (
            <SessionStatusDots statuses={statuses} />
          )}
        </span>
        <span className={css.searchResultTitle}>{result.title}</span>
      </span>
      <span className={css.searchResultMeta}>
        <span className={css.searchResultWorkspace}>{result.workspace}</span>
        {result.snippet !== undefined && (
          <span className={css.searchResultSnippet}>{result.snippet}</span>
        )}
      </span>
    </button>
  )
}

/**
 * One top-level 34px session row: status dot (pending user interaction outranks
 * own or descendant activity), title, relative time, and the row actions menu.
 * @param props.node - derived session node.
 * @param props.currentId - selected session id (row highlight).
 * @param props.now - epoch ms for relative-time formatting.
 * @param props.onOpen - open a session by id.
 * @param props.onRename - open the session rename dialog (id + current title).
 * @param props.onFork - fork a session at its last completed turn.
 * @param props.onArchive - archive a session by id.
 * @param props.onDelete - open the browser-owned delete confirmation.
 * @param props.drag - optional draggable-row wiring.
 * @param props.flat - omit the empty status slot in the hierarchy-free flat list.
 * @param props.t - the browser root's locale seat.
 * @returns the session row.
 */
export function SessionNodeItem({ node, currentId, now, onOpen, onRename, onFork, onArchive, onUnarchive, onDelete, onPin, onUnpin, drag, categoryMove, categoryDepth, flat = false, t }: {
  node: SessionNode
  currentId: string | undefined
  now: number
  onOpen: (id: SessionNode['id']) => void
  /** Open the browser-owned session rename dialog (row menu action). */
  onRename: (id: SessionNode['id'], currentTitle: string) => void
  /** Fork a session at its last completed turn (row menu action). */
  onFork: (id: SessionNode['id']) => void
  /** Archive this session (row menu action; commits without a dialog). */
  onArchive: (id: SessionNode['id']) => void
  /** Return an archived session to its workspace slot (row menu action). */
  onUnarchive: (id: SessionNode['id']) => void
  /** Pin this session ahead of every unpinned sibling (row menu action). */
  onPin: (id: SessionNode['id']) => void
  /** Remove this session from the pin set (row menu action). */
  onUnpin: (id: SessionNode['id']) => void
  /**
   * Ask to delete this session's stored log (row menu action).
   *
   * Unlike archive this is not dialog-free: the log leaves the live tree, so
   * the browser owns the confirmation and only calls through once the user
   * has agreed.
   */
  onDelete: (id: SessionNode['id'], currentTitle: string) => void
  /** Present only on draggable rows (workspace-group sessions outside search). */
  drag?: RowDragProps | undefined
  categoryMove?: {
    categories: readonly { id: SessionCategoryId; title: string; depth: number }[]
    onMove: (categoryId: SessionCategoryId | null) => Promise<unknown> | unknown
    workspaceId?: WorkspaceId | undefined
  } | undefined
  /** Category depth for a session rendered inside the nested category tree. */
  categoryDepth?: number | undefined
  /** The row is rendered without a parent Workspace header. */
  flat?: boolean | undefined
  t: RowTranslate
}) {
  const row = node
  const title = displayTitle(node, t)
  const selected = node.id === currentId
  /**
   * One indent step below the owning Workspace header.
   *
   * The theme layer (`dsh-claude-style`) rewrites row padding with
   * `padding-inline-start: 6px + var(--dsh-workspace-indent)` on its own
   * specificity, so the plain CSS class is not enough: handing it the same
   * indent through the variable it already reads keeps the hierarchy in both
   * skinned and unskinned profiles. `flat` rows have no Workspace header to
   * hang from and keep no indent.
   */
  const workspaceIndent = flat === true
    ? undefined
    : categoryDepth === undefined ? 16 : categoryDepth * 18
  const statuses = sessionStatuses(node, t)
  const primaryStatus = statuses[0]
  const showStatus = primaryStatus.state !== 'done' || row.completed
  const categoryDraggable = categoryMove?.workspaceId !== undefined
  const [menuOpen, setMenuOpen] = useState(false)
  const [categoryBusy, setCategoryBusy] = useState(false)
  const [categoryError, setCategoryError] = useState<string | null>(null)
  const moveSession = (categoryId: SessionCategoryId | null) => {
    if (categoryBusy || categoryMove === undefined) return
    setCategoryBusy(true)
    setCategoryError(null)
    Promise.resolve(categoryMove.onMove(categoryId)).then((result) => {
      const message = actionFailure(result)
      setCategoryBusy(false)
      if (message === null) setMenuOpen(false)
      else { setCategoryError(message); setMenuOpen(true) }
    }).catch((reason: unknown) => {
      setCategoryBusy(false)
      setCategoryError(reason instanceof Error ? reason.message : String(reason))
      setMenuOpen(true)
    })
  }
  // Archive hides the row through the registry-global archive set and never
  // touches the session log, so it is not styled as destructive and needs no
  // confirmation dialog. Delete is the opposite: it relocates the stored log,
  // so it carries the destructive tone and asks for confirmation first.
  const sessionMenuItems = [
    { id: 'rename', label: t('rename'), icon: <IconEditOutlineRegular /> },
    { id: 'fork', label: t('menu.fork'), icon: <IconBranchOutlineRegular /> },
    // Pinning reorders the row within its group, so the label flips with the
    // Session's current state rather than offering two separate rows.
    node.pinned === true
      ? { id: 'unpin', label: t('menu.unpinSession'), icon: <IconPinOutlineRegular size={16} /> }
      : { id: 'pin', label: t('menu.pinSession'), icon: <IconPinOutlineRegular size={16} /> },
    // 20-native glyph in the menu's 16px icon slot (Menu.module.css .itemIcon).
    // The verb follows the row's own archive state: an archived row offers
    // "restore from archive" (which returns it to its workspace slot) instead of
    // archiving again.
    node.archived === true
      ? { id: 'unarchive', label: t('menu.unarchiveSession'), icon: <IconArchiveOutlineRegular size={16} /> }
      : { id: 'archive', label: t('menu.archiveSession'), icon: <IconArchiveOutlineRegular size={16} /> },
    ...(categoryMove === undefined ? [] : [{
      id: 'move-category', label: t('category.move'), icon: <IconFolderOpenOutlineRegular />, submenu: [
        { id: 'category:null', label: t('category.unclassified'), icon: <IconFolderCloseRegular />, disabled: categoryBusy },
        ...categoryMove.categories.map(category => ({
          id: `category:${category.id}`,
          disabled: categoryBusy,
          icon: <IconFolderCloseRegular />,
          label: <span style={{ paddingInlineStart: category.depth * 12 }}>{category.title}</span>,
        })),
      ],
    }]),
    // `danger` is the field the Menu primitive reads to paint a destructive row
    // red; it is not `destructive`, which the primitive ignores silently.
    { id: 'delete', label: t('menu.deleteSession'), icon: <IconTrashOutlineRegular size={16} />, danger: true },
  ]
  // Figma session cell: pad 8, status slot 16, then a 4px title gap.
  const ownRow = (
    <div
      className={clsx(
        css.sessionRow, categoryDepth !== undefined && css.categorizedSessionRow,
        // A Session row that sits directly under a Workspace header gets one
        // indent step: without it the two levels start at the same x and the
        // hierarchy is unreadable once the Workspace rows lost their folder
        // glyph. Category sessions already carry their own depth indent.
        categoryDepth === undefined && flat !== true && css.workspaceSessionRow,
        node.archived === true && css.archivedSessionRow,
        selected && css.selected, menuOpen && css.menuOpen,
        flat && !showStatus && css.flatSessionRowWithoutStatus,
        drag?.marker === 'before' && css.dropBefore, drag?.marker === 'after' && css.dropAfter,
      )}
      style={{
        ...(categoryDepth === undefined ? {} : { '--category-depth': categoryDepth }),
        ...(workspaceIndent === undefined ? {} : { '--dsh-workspace-indent': `${workspaceIndent}px` }),
      } as CSSProperties}
      role="treeitem"
      aria-selected={selected}
      onClick={() => { onOpen(node.id) }}
      draggable={drag !== undefined || categoryDraggable}
      onDragStart={drag === undefined && !categoryDraggable
        ? undefined
        : (e) => {
          e.dataTransfer.effectAllowed = 'move'
          e.dataTransfer.setData('text/plain', node.id)
          if (categoryMove?.workspaceId !== undefined) {
            const payload: CategoryDragPayload = {
              kind: 'session', workspaceId: categoryMove.workspaceId, sessionIds: [node.id],
            }
            e.dataTransfer.setData(CATEGORY_DRAG_TYPE, JSON.stringify(payload))
          }
          drag?.start()
        }}
      onDragEnd={drag?.end}
      onDragOver={drag === undefined
        ? undefined
        : (e) => {
          if (!drag.active) return
          e.preventDefault()
          e.dataTransfer.dropEffect = 'move'
          drag.hover(rowHalf(e))
        }}
      onDrop={drag === undefined
        ? undefined
        : (e) => {
          if (!drag.active) return
          e.preventDefault()
          drag.drop(rowHalf(e))
        }}
    >
      {/* Pending interaction and own or descendant activity outrank the
          finished-but-unviewed reminder, which returns after activity stops
          and is cleared by opening the session. */}
      {/* Archived rows swap the live-status slot for the archive glyph: an
          archived session cannot run or await anything, and the icon is what
          makes an archived row tell apart from a live one at a glance. */}
      {(!flat || showStatus || node.archived === true) && (
        <span className={css.slot}>
          {node.archived === true
            ? (
              <span className={css.archivedGlyph} aria-hidden="true">
                <IconArchiveOutlineRegular size={14} />
              </span>
            )
            : showStatus && <SessionStatusDots statuses={statuses} />}
        </span>
      )}
      <span className={css.title}>{title}</span>
      {/* Trailing cells, left to right: the relative timestamp, then the verbs
          button at the row's far edge. The timestamp occupies a fixed column so
          the times line up down the list; while the row is hovered the time
          steps aside (see Rows.module.css) and the verbs —which are already
          the last cell —land at the right edge. A blank New Session row is a
          provisional placeholder: nothing has happened in it yet, so both
          trailing cells stay off until the first prompt. */}
      {!row.blank && <span className={css.time}>{timeLabel(row.updatedAt, now, t)}</span>}
      {!row.blank && (
        <span className={css.rowActions}>
          <Menu
            open={menuOpen}
            onClose={() => { setMenuOpen(false) }}
            items={sessionMenuItems}
            onSelect={(id) => {
              if (!id.startsWith('category:')) setMenuOpen(false)
              if (id === 'rename') onRename(node.id, row.title)
              if (id === 'fork') onFork(node.id)
              if (id === 'pin') onPin(node.id)
              if (id === 'unpin') onUnpin(node.id)
              if (id === 'archive') onArchive(node.id)
              if (id === 'unarchive') onUnarchive(node.id)
              if (id === 'delete') onDelete(node.id, row.title)
              if (id === 'category:null') moveSession(null)
              if (id.startsWith('category:') && id !== 'category:null') {
                moveSession(id.slice(9) as SessionCategoryId)
              }
            }}
            portal
            closeOnPointerLeave
            anchor={(
              <button
                type="button"
                className={css.iconButton}
                aria-label={t('actions.session.aria', { name: title })}
                onClick={(e) => { e.stopPropagation(); setMenuOpen(v => !v) }}
              >
                <IconEllipsisOutlineRegular />
              </button>
            )}
          />
        </span>
      )}
      {categoryError !== null && <span role="alert" className={css.rowError}>{categoryError}</span>}
    </div>
  )
  return (
    <HoverCard
      anchor={ownRow}
      content={<SessionHoverContent node={node} now={now} t={t} />}
      disabled={menuOpen || drag?.active === true}
      copyText={row.blank ? undefined : row.title}
      copyLabel={t('copy')}
      copiedLabel={t('hover.copied')}
    />
  )
}
