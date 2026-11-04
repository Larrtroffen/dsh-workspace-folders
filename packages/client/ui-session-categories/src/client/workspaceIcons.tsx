/**
 * Workspace icon catalog and icon-slot rendering.
 *
 * Icons are references into the host's own primitive icon set (bundled by the
 * host, imported as an external dependency here) or one emoji character. No
 * network, no image decoding, no extra dependency: picking an icon writes one
 * short string to the browser-local view store.
 */
import {
  IconAgentPresetOutlineRegular, IconAlarmClockOutlineRegular, IconApiOutlineRegular,
  IconArchiveOutlineRegular, IconBranchOutlineRegular, IconBrowseOutlineRegular,
  IconChecklistOutlineRegular, IconClockOutlineRegular, IconCodeOutlineRegular,
  IconCompactOutlineRegular, IconCompareSplitOutlineRegular, IconCordisPluginOutlineRegular,
  IconDataOutlineRegular, IconDatabaseOutlineRegular, IconDeliverDocRegular,
  IconFlatListOutlineRegular, IconFolderCloseRegular, IconFolderOpenOutlineRegular,
  IconGaugeOutlineRegular, IconGlobeOutlineRegular, IconGoalOutlineRegular,
  IconInfoOutlineRegular, IconInspectOutlineRegular, IconLikeOutlineRegular,
  IconLightOutlineRegular, IconListPenOutlineRegular, IconNewChatOutlineRegular,
  IconPaperclipOutlineRegular, IconPinOutlineRegular, IconPlanOutlineRegular,
  IconPluginPinwheelOutlineRegular, IconProjectAddOutlineRegular, IconQuestionOutlineRegular,
  IconQueueOutlineRegular, IconSearchOutlineRegular, IconShieldOutlineRegular,
  IconSkillOutlineRegular, IconSparkleRegular, IconUsersOutlineRegular,
  IconWorkspaceTreeOutlineRegular,
} from '@deepseek-ai/dsh-client-ui-primitives'
import type { ReactNode } from 'react'
import type { WorkspaceBrowserProps } from './contract/slots.ts'
import css from './workspaceIcons.module.css'

/** A persisted icon reference: `dsh:<IconName>` or `emoji:<character>`. */
export type WorkspaceIconRef = string

/** One selectable icon: stable reference plus a screen-reader label. */
interface IconChoice {
  id: WorkspaceIconRef
  label: string
  node: ReactNode
}

/**
 * Curated project/topic icons from the host set.
 *
 * Every entry resolves to an already-bundled host icon, so the picker adds no
 * bundle weight and no runtime fetch. Module scope keeps the element
 * descriptors stable across renders.
 */
const ICON_CHOICES: readonly IconChoice[] = [
  { id: 'dsh:FolderClose', label: 'Folder', node: <IconFolderCloseRegular /> },
  { id: 'dsh:FolderOpen', label: 'Open folder', node: <IconFolderOpenOutlineRegular /> },
  { id: 'dsh:WorkspaceTree', label: 'Tree', node: <IconWorkspaceTreeOutlineRegular /> },
  { id: 'dsh:FlatList', label: 'List', node: <IconFlatListOutlineRegular /> },
  { id: 'dsh:ProjectAdd', label: 'Project', node: <IconProjectAddOutlineRegular /> },
  { id: 'dsh:Code', label: 'Code', node: <IconCodeOutlineRegular /> },
  { id: 'dsh:Branch', label: 'Branch', node: <IconBranchOutlineRegular /> },
  { id: 'dsh:Api', label: 'API', node: <IconApiOutlineRegular /> },
  { id: 'dsh:Plugin', label: 'Plugin', node: <IconPluginPinwheelOutlineRegular /> },
  { id: 'dsh:Cordis', label: 'Cordis', node: <IconCordisPluginOutlineRegular /> },
  { id: 'dsh:Skill', label: 'Skill', node: <IconSkillOutlineRegular /> },
  { id: 'dsh:Browse', label: 'Browse', node: <IconBrowseOutlineRegular /> },
  { id: 'dsh:Database', label: 'Database', node: <IconDatabaseOutlineRegular /> },
  { id: 'dsh:Data', label: 'Data', node: <IconDataOutlineRegular /> },
  { id: 'dsh:Gauge', label: 'Gauge', node: <IconGaugeOutlineRegular /> },
  { id: 'dsh:Inspect', label: 'Inspect', node: <IconInspectOutlineRegular /> },
  { id: 'dsh:Compact', label: 'Compact', node: <IconCompactOutlineRegular /> },
  { id: 'dsh:Compare', label: 'Compare', node: <IconCompareSplitOutlineRegular /> },
  { id: 'dsh:Doc', label: 'Document', node: <IconDeliverDocRegular /> },
  { id: 'dsh:Notes', label: 'Notes', node: <IconListPenOutlineRegular /> },
  { id: 'dsh:Paperclip', label: 'Attachment', node: <IconPaperclipOutlineRegular /> },
  { id: 'dsh:Goal', label: 'Goal', node: <IconGoalOutlineRegular /> },
  { id: 'dsh:Plan', label: 'Plan', node: <IconPlanOutlineRegular /> },
  { id: 'dsh:Checklist', label: 'Checklist', node: <IconChecklistOutlineRegular /> },
  { id: 'dsh:Clock', label: 'Clock', node: <IconClockOutlineRegular /> },
  { id: 'dsh:Alarm', label: 'Alarm', node: <IconAlarmClockOutlineRegular /> },
  { id: 'dsh:Queue', label: 'Queue', node: <IconQueueOutlineRegular /> },
  { id: 'dsh:Sparkle', label: 'Sparkle', node: <IconSparkleRegular /> },
  { id: 'dsh:Light', label: 'Light', node: <IconLightOutlineRegular /> },
  { id: 'dsh:Like', label: 'Like', node: <IconLikeOutlineRegular /> },
  { id: 'dsh:Pin', label: 'Pin', node: <IconPinOutlineRegular /> },
  { id: 'dsh:Archive', label: 'Archive', node: <IconArchiveOutlineRegular /> },
  { id: 'dsh:Shield', label: 'Shield', node: <IconShieldOutlineRegular /> },
  { id: 'dsh:Globe', label: 'Globe', node: <IconGlobeOutlineRegular /> },
  { id: 'dsh:Users', label: 'Users', node: <IconUsersOutlineRegular /> },
  { id: 'dsh:AgentPreset', label: 'Agent preset', node: <IconAgentPresetOutlineRegular /> },
  { id: 'dsh:Question', label: 'Question', node: <IconQuestionOutlineRegular /> },
  { id: 'dsh:Info', label: 'Info', node: <IconInfoOutlineRegular /> },
  { id: 'dsh:Search', label: 'Search', node: <IconSearchOutlineRegular /> },
  { id: 'dsh:NewChat', label: 'Chat', node: <IconNewChatOutlineRegular /> },
]

/** Curated emoji set: frequent project/topic markers, no external font pack. */
const EMOJI_CHOICES: readonly string[] = [
  '🚀', '📁', '📂', '🗂️', '💡', '🧪', '🔬', '🛠️', '🧰', '📊', '📈', '📦',
  '🧠', '🤖', '🌱', '🌿', '🔥', '⭐', '✨', '🎯', '🧭', '🧩', '📌', '📚',
  '📖', '📝', '✏️', '🔖', '🏷️', '🗃️', '💾', '🖥️', '⌨️', '🌐', '☁️', '🔐',
  '🧵', '🧮', '🎨', '🎵', '🍀', '🐳', '🦀', '🧬', '🛰️', '🧱', '🪄', '🧿',
]

/** Lookup table from a persisted `dsh:` reference to its renderable icon. */
const ICON_BY_ID = new Map(ICON_CHOICES.map(choice => [choice.id, choice.node]))

/**
 * Render one persisted icon reference.
 *
 * @param icon - `dsh:<name>` or `emoji:<char>`; empty/undefined means no icon.
 * @param size - pixel size for host icons (emoji follow the font size).
 * @returns the icon node, or `null` when the reference is empty/unknown.
 */
export function renderWorkspaceIcon(icon: string | undefined, size = 14): ReactNode {
  if (icon === undefined || icon === '') return null
  if (icon.startsWith('emoji:')) {
    const character = icon.slice('emoji:'.length)
    return character === '' ? null : <span className={css.workspaceIconEmoji}>{character}</span>
  }
  const node = ICON_BY_ID.get(icon)
  if (node === undefined) return null
  return <span className={css.workspaceIconGlyph}>{node}</span>
}

/**
 * The icon picker body: a curated host-icon grid plus an emoji grid.
 *
 * The whole grid is rendered only while the dialog is open (the caller gates
 * it), so an idle sidebar pays nothing for the catalog. Clicking a cell picks
 * that icon and closes the dialog through the caller's `onPick`.
 */
export function WorkspaceIconPickerGrid({ selected, onPick, t }: {
  /** Currently persisted reference, highlighted when it appears in the grids. */
  selected: string | undefined
  onPick: (icon: string) => void
  t: WorkspaceBrowserProps['t']
}) {
  const cell = (id: string, content: ReactNode, label?: string): ReactNode => (
    <button
      key={id}
      type="button"
      role="option"
      aria-selected={selected === id}
      aria-label={label ?? id}
      title={label ?? id}
      className={css.iconPickerCell}
      onClick={() => { onPick(id) }}
    >
      {content}
    </button>
  )
  return (
    <div className={css.iconPicker}>
      <div className={css.iconPickerSection}>{t('icon.section.icons')}</div>
      <div className={css.iconPickerGrid} role="listbox" aria-label={t('icon.section.icons')}>
        {ICON_CHOICES.map(choice => cell(choice.id, choice.node, choice.label))}
      </div>
      <div className={css.iconPickerSection}>{t('icon.section.emoji')}</div>
      <div className={css.iconPickerGrid} role="listbox" aria-label={t('icon.section.emoji')}>
        {EMOJI_CHOICES.map(emoji => cell(`emoji:${emoji}`, <span className={css.iconPickerEmoji}>{emoji}</span>, emoji))}
      </div>
    </div>
  )
}
