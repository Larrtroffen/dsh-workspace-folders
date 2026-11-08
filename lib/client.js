
window.__ModuleLoader__.load({
	id: "dsh-workspace-folders",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;

	// Inlined from lib/style.css by scripts/inline-css.mjs.
	(() => {
		const css = ".c-nina_workspaceIconGlyph {\n  justify-content: center;\n  align-items: center;\n  width: 16px;\n  height: 16px;\n  display: inline-flex;\n}\n\n.c-nina_workspaceIconEmoji {\n  justify-content: center;\n  align-items: center;\n  font-size: 14px;\n  line-height: 1;\n  display: inline-flex;\n}\n\n.c-nina_iconPicker {\n  flex-direction: column;\n  gap: 8px;\n  max-height: min(56vh, 480px);\n  padding-right: 2px;\n  display: flex;\n  overflow: auto;\n}\n\n.c-nina_iconPickerSection {\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 12px;\n  line-height: 18px;\n}\n\n.c-nina_iconPickerGrid {\n  grid-template-columns: repeat(8, 36px);\n  justify-content: start;\n  gap: 4px;\n  display: grid;\n}\n\n.c-nina_iconPickerCell {\n  width: 36px;\n  height: 36px;\n  color: var(--dsw-alias-label-secondary);\n  cursor: pointer;\n  background: none;\n  border: 1px solid #0000;\n  border-radius: 8px;\n  justify-content: center;\n  align-items: center;\n  padding: 0;\n  display: inline-flex;\n}\n\n.c-nina_iconPickerCell:hover {\n  background: var(--dsw-alias-interactive-bg-hover);\n  color: var(--dsw-alias-label-primary);\n}\n\n.c-nina_iconPickerCell[aria-selected=\"true\"] {\n  border-color: var(--dsw-alias-state-business-primary);\n  color: var(--dsw-alias-label-primary);\n}\n\n.c-nina_iconPickerEmoji {\n  font-size: 18px;\n  line-height: 1;\n}\n.-PPL0q_projectRow, .-PPL0q_categoryRow, .-PPL0q_sessionRow {\n  cursor: pointer;\n  user-select: none;\n  color: var(--dsw-alias-label-primary);\n  border-radius: 8px;\n  align-items: center;\n  gap: 6px;\n  padding: 0 8px;\n  display: flex;\n}\n\n.-PPL0q_projectRow:hover, .-PPL0q_categoryRow:hover, .-PPL0q_sessionRow:hover, .-PPL0q_sessionRow.-PPL0q_selected {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n\n.-PPL0q_searchResultRow {\n  box-sizing: border-box;\n  cursor: pointer;\n  text-align: left;\n  width: 100%;\n  min-height: 48px;\n  color: var(--dsw-alias-label-primary);\n  background: none;\n  border: none;\n  border-radius: 8px;\n  flex-direction: column;\n  align-items: stretch;\n  gap: 2px;\n  padding: 6px 8px;\n  display: flex;\n}\n\n.-PPL0q_searchResultRow:hover {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n\n.-PPL0q_searchResultHeading {\n  align-items: center;\n  gap: 6px;\n  display: flex;\n}\n\n.-PPL0q_searchResultTitle {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  min-width: 0;\n  font-size: 14px;\n  line-height: 20px;\n  overflow: hidden;\n}\n\n.-PPL0q_searchResultMeta {\n  align-items: center;\n  gap: 6px;\n  min-width: 0;\n  margin-left: 20px;\n  display: flex;\n}\n\n.-PPL0q_searchResultWorkspace, .-PPL0q_searchResultSnippet {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 12px;\n  line-height: 20px;\n  overflow: hidden;\n}\n\n.-PPL0q_categoryDropTarget {\n  background: color-mix(in srgb, var(--dsw-alias-state-business-primary) 12%, transparent);\n}\n\n.-PPL0q_categoryRow.-PPL0q_dropBefore, .-PPL0q_categoryRow.-PPL0q_dropAfter {\n  position: relative;\n}\n\n.-PPL0q_categoryRow.-PPL0q_dropBefore:before, .-PPL0q_categoryRow.-PPL0q_dropAfter:after {\n  content: \"\";\n  z-index: 1;\n  background: linear-gradient(var(--dsw-alias-state-business-primary) 0 0) 4px 5px / calc(100% - 4px) 2px no-repeat;\n  pointer-events: none;\n  height: 12px;\n  left: calc(8px + var(--category-depth, 0) * 18px);\n  position: absolute;\n  right: 4px;\n}\n\n.-PPL0q_categoryRow.-PPL0q_dropBefore:before {\n  top: -7px;\n}\n\n.-PPL0q_categoryRow.-PPL0q_dropAfter:after {\n  bottom: -7px;\n}\n\n.-PPL0q_projectRow {\n  height: 32px;\n  animation: -PPL0q_row-in .15s var(--ds-ease-in-out);\n}\n\n.-PPL0q_projectText {\n  flex-direction: column;\n  flex: 1;\n  gap: 2px;\n  min-width: 0;\n  display: flex;\n}\n\n.-PPL0q_title {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  min-width: 0;\n  font-size: 14px;\n  line-height: 20px;\n  overflow: hidden;\n}\n\n.-PPL0q_projectRow .-PPL0q_title, .-PPL0q_categoryRow .-PPL0q_title {\n  flex: 1;\n}\n\n.-PPL0q_categoryRow {\n  height: 28px;\n}\n\n.-PPL0q_categoryRow:hover .-PPL0q_rowActions, .-PPL0q_categoryRow.-PPL0q_menuOpen .-PPL0q_rowActions {\n  display: inline-flex;\n}\n\n.-PPL0q_categoryRow.-PPL0q_menuOpen {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n\n.-PPL0q_rowError {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  max-width: 96px;\n  color: var(--dsw-alias-state-danger-primary);\n  font-size: 12px;\n  overflow: hidden;\n}\n\n.-PPL0q_projectRow .-PPL0q_rowActions {\n  height: 20px;\n}\n\n.-PPL0q_projectSummary {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  min-width: 0;\n  color: var(--dsw-alias-label-tertiary);\n  flex: none;\n  font-size: 11px;\n  line-height: 14px;\n  overflow: hidden;\n}\n\n.-PPL0q_sessionRow {\n  height: 32px;\n  animation: -PPL0q_row-in .15s var(--ds-ease-in-out);\n  gap: 0;\n}\n\n.-PPL0q_categorizedSessionRow {\n  padding-left: calc(8px + var(--category-depth, 0) * 18px);\n}\n\n.-PPL0q_workspaceSessionRow {\n  padding-left: 24px;\n}\n\n.-PPL0q_sessionRow .-PPL0q_title {\n  margin: 0 6px 0 4px;\n}\n\n.-PPL0q_flatSessionRowWithoutStatus .-PPL0q_title {\n  margin-left: 0;\n}\n\n@keyframes -PPL0q_row-in {\n  0% {\n    opacity: 0;\n  }\n\n  100% {\n    opacity: 1;\n  }\n}\n\n.-PPL0q_slot {\n  width: 16px;\n  height: 20px;\n  color: var(--dsw-alias-label-tertiary);\n  flex: none;\n  justify-content: center;\n  align-items: center;\n  display: inline-flex;\n}\n\n.-PPL0q_visuallyHidden {\n  clip: rect(0 0 0 0);\n  white-space: nowrap;\n  width: 1px;\n  height: 1px;\n  position: absolute;\n  overflow: hidden;\n}\n\n.-PPL0q_folderActive {\n  color: var(--dsw-alias-state-business-primary);\n}\n\n.-PPL0q_chevron {\n  color: var(--dsw-alias-label-caption);\n}\n\n.-PPL0q_projectRow .-PPL0q_chevron {\n  display: none;\n}\n\n.-PPL0q_projectRow:hover .-PPL0q_chevron, .-PPL0q_folder {\n  display: inline-flex;\n}\n\n.-PPL0q_projectRow:hover .-PPL0q_folder {\n  display: none;\n}\n\n.-PPL0q_arrow {\n  transition: transform .15s var(--ds-ease-in-out);\n}\n\n.-PPL0q_arrowOpen {\n  transform: rotate(90deg);\n}\n\n.-PPL0q_renameInput {\n  border: 1px solid var(--dsw-alias-border-l2);\n  background: var(--dsw-alias-button-elevated-fill);\n  min-width: 0;\n  color: inherit;\n  border-radius: 4px;\n  outline: none;\n  padding: 0 2px;\n  font-size: 14px;\n  line-height: 20px;\n}\n\n.-PPL0q_meta {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 12px;\n  line-height: 20px;\n  overflow: hidden;\n}\n\n.-PPL0q_time {\n  color: var(--dsw-alias-label-secondary);\n  opacity: .55;\n  font-variant-numeric: tabular-nums;\n  white-space: nowrap;\n  flex: none;\n  margin-left: auto;\n  padding-left: 8px;\n  font-size: 12px;\n  line-height: 20px;\n}\n\n.-PPL0q_dot {\n  flex: none;\n}\n\n.-PPL0q_archivedGlyph {\n  color: var(--dsw-alias-label-tertiary);\n  justify-content: center;\n  align-items: center;\n  display: inline-flex;\n}\n\n.-PPL0q_archivedSessionRow .-PPL0q_title {\n  color: var(--dsw-alias-label-tertiary);\n}\n\n.-PPL0q_archivedSessionRow:hover .-PPL0q_title, .-PPL0q_archivedSessionRow.-PPL0q_selected .-PPL0q_title, .-PPL0q_archivedSessionRow.-PPL0q_menuOpen .-PPL0q_title {\n  color: var(--dsw-alias-label-primary);\n}\n\n.-PPL0q_rowActions {\n  flex: none;\n  align-items: center;\n  gap: 12px;\n  margin-left: auto;\n  padding-left: 8px;\n  display: none;\n}\n\n.-PPL0q_categoryRow:hover .-PPL0q_rowActions, .-PPL0q_categoryRow.-PPL0q_menuOpen .-PPL0q_rowActions, .-PPL0q_projectRow:hover .-PPL0q_rowActions, .-PPL0q_projectRow.-PPL0q_menuOpen .-PPL0q_rowActions, .-PPL0q_sessionRow:hover .-PPL0q_rowActions, .-PPL0q_sessionRow.-PPL0q_menuOpen .-PPL0q_rowActions {\n  display: inline-flex;\n}\n\n.-PPL0q_sessionRow:hover .-PPL0q_time, .-PPL0q_sessionRow.-PPL0q_menuOpen .-PPL0q_time {\n  display: none;\n}\n\n.-PPL0q_projectRow.-PPL0q_menuOpen, .-PPL0q_sessionRow.-PPL0q_menuOpen {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n\n.-PPL0q_sessionRow.-PPL0q_dropBefore, .-PPL0q_sessionRow.-PPL0q_dropAfter {\n  position: relative;\n}\n\n.-PPL0q_sessionRow.-PPL0q_dropBefore:before, .-PPL0q_sessionRow.-PPL0q_dropAfter:after {\n  content: \"\";\n  z-index: 1;\n  background: linear-gradient(55deg, transparent calc(50% - 1px), var(--dsw-alias-state-business-primary) calc(50% - 1px) calc(50% + 1px), transparent calc(50% + 1px)) 0 0 / 5px 7px no-repeat, linear-gradient(125deg, transparent calc(50% - 1px), var(--dsw-alias-state-business-primary) calc(50% - 1px) calc(50% + 1px), transparent calc(50% + 1px)) 0 5px / 5px 7px no-repeat, linear-gradient(var(--dsw-alias-state-business-primary) 0 0) 4px 5px / calc(100% - 4px) 2px no-repeat;\n  pointer-events: none;\n  height: 12px;\n  position: absolute;\n  left: 0;\n  right: 4px;\n}\n\n.-PPL0q_sessionRow.-PPL0q_dropBefore:before {\n  top: -7px;\n}\n\n.-PPL0q_sessionRow.-PPL0q_dropAfter:after {\n  bottom: -7px;\n}\n\n.-PPL0q_hoverContent {\n  flex-direction: column;\n  gap: 8px;\n  display: flex;\n}\n\n.-PPL0q_hoverTitle {\n  color: #fff;\n  overflow-wrap: break-word;\n  font-size: 14px;\n  line-height: 20px;\n}\n\n.-PPL0q_hoverPath {\n  color: #cfd3d6;\n  word-break: break-all;\n  font-size: 12px;\n  line-height: 16px;\n}\n\n.-PPL0q_hoverTime {\n  color: #cfd3d6;\n  font-size: 12px;\n  line-height: 16px;\n}\n\n.-PPL0q_hoverStatus {\n  color: #adb2b8;\n  align-items: center;\n  gap: 8px;\n  font-size: 12px;\n  line-height: 20px;\n  display: flex;\n}\n\n.-PPL0q_iconButton {\n  cursor: pointer;\n  width: 16px;\n  height: 16px;\n  color: var(--dsw-alias-label-tertiary);\n  background: none;\n  border: none;\n  border-radius: 4px;\n  flex: none;\n  justify-content: center;\n  align-items: center;\n  padding: 0;\n  display: inline-flex;\n}\n\n.-PPL0q_iconButton:hover {\n  color: var(--dsw-alias-label-primary);\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .-PPL0q_sessionRow, .-PPL0q_arrow {\n    transition: none;\n    animation: none;\n  }\n}\n\n.-PPL0q_workspaceFolderRow .-PPL0q_title {\n  color: var(--dsw-alias-label-primary);\n  font-weight: 500;\n}\n\n.-PPL0q_workspaceFolderDropInside {\n  background: color-mix(in srgb, var(--dsw-alias-state-business-primary) 12%, transparent);\n  outline: 1px solid color-mix(in srgb, var(--dsw-alias-state-business-primary) 32%, transparent);\n  outline-offset: -1px;\n}\n\n.-PPL0q_workspaceFolderWorkspaceOver {\n  background: color-mix(in srgb, var(--dsw-alias-state-business-primary) 14%, transparent);\n}\n\n.-PPL0q_workspaceIconSlot {\n  cursor: pointer;\n  border-radius: 4px;\n}\n\n.-PPL0q_workspaceIconSlot:hover {\n  color: var(--dsw-alias-label-primary);\n}\n\n.-PPL0q_workspaceIconDot {\n  background: var(--dsw-alias-label-tertiary);\n  opacity: .55;\n  border-radius: 50%;\n  width: 6px;\n  height: 6px;\n}\n\n.-PPL0q_workspaceIconSlot:hover .-PPL0q_workspaceIconDot {\n  opacity: .95;\n}\n.Z146pG_modalAction {\n  min-width: 72px;\n}\n\n.Z146pG_modalError, .Z146pG_menuStatus {\n  margin-top: 8px;\n  font-size: 12px;\n  line-height: 18px;\n}\n\n.Z146pG_modalError {\n  color: var(--dsw-alias-state-error-primary);\n}\n\n.Z146pG_menuStatus {\n  color: var(--dsw-alias-label-secondary);\n}\n.yuxdOq_root {\n  --dsh-session-list-edge-inset: var(--dsh-sidebar-inline-padding);\n  --dsh-session-list-scrollbar-width: 8px;\n  --dsh-session-list-scrollbar-offset: 2px;\n  box-sizing: border-box;\n  min-height: 0;\n  padding-right: var(--dsh-session-list-edge-inset);\n  flex-direction: column;\n  flex: 1;\n  display: flex;\n}\n\n.yuxdOq_root.yuxdOq_rail {\n  padding-right: 0;\n}\n\n.yuxdOq_iconButton {\n  cursor: pointer;\n  width: 28px;\n  height: 28px;\n  color: var(--dsw-alias-label-secondary);\n  background: none;\n  border: none;\n  border-radius: 50%;\n  flex: none;\n  justify-content: center;\n  align-items: center;\n  padding: 0;\n  display: inline-flex;\n}\n\n.yuxdOq_iconButton:hover {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n\n.yuxdOq_sectionHeader {\n  box-sizing: border-box;\n  height: 36px;\n  color: var(--dsw-alias-label-tertiary);\n  border-radius: 12px;\n  flex: none;\n  justify-content: flex-end;\n  align-items: center;\n  gap: 4px;\n  margin-bottom: 4px;\n  padding-left: 4px;\n  display: flex;\n  overflow: hidden;\n}\n\n.yuxdOq_root:not(.yuxdOq_rail) .yuxdOq_sectionHeader {\n  margin-top: 2px;\n  margin-right: -4px;\n}\n\n.yuxdOq_sectionLabel {\n  white-space: nowrap;\n  opacity: 1;\n  visibility: visible;\n  min-width: 0;\n  max-width: 45%;\n  transition: max-width .18s var(--ds-ease-in-out),\n    margin-right .18s var(--ds-ease-in-out),\n    opacity .12s var(--ds-ease-in-out),\n    transform .18s var(--ds-ease-in-out),\n    visibility 0s linear;\n  flex: none;\n  line-height: 20px;\n  overflow: hidden;\n}\n\n.yuxdOq_sectionLabelHidden {\n  opacity: 0;\n  visibility: hidden;\n  max-width: 0;\n  margin-right: -4px;\n  transition-delay: 0s, 0s, 0s, 0s, .18s;\n  transform: translateX(-4px);\n}\n\n.yuxdOq_searchSlot {\n  box-sizing: border-box;\n  min-width: 0;\n  max-width: 28px;\n  transition: max-width .18s var(--ds-ease-in-out),\n    padding-left .18s var(--ds-ease-in-out);\n  flex: 1;\n  align-items: center;\n  margin-left: auto;\n  padding-left: 0;\n  display: flex;\n}\n\n.yuxdOq_searchSlotExpanded {\n  max-width: 100%;\n  padding-left: 0;\n}\n\n.yuxdOq_headerActions {\n  opacity: 1;\n  visibility: visible;\n  max-width: 60px;\n  transition: max-width .18s var(--ds-ease-in-out),\n    opacity .12s var(--ds-ease-in-out),\n    transform .18s var(--ds-ease-in-out),\n    visibility 0s linear;\n  flex: none;\n  align-items: center;\n  gap: 4px;\n  display: flex;\n  overflow: hidden;\n}\n\n.yuxdOq_headerActionsHidden {\n  opacity: 0;\n  visibility: hidden;\n  pointer-events: none;\n  max-width: 0;\n  transition-delay: 0s, 0s, 0s, .18s;\n  transform: translateX(4px);\n}\n\n.yuxdOq_search {\n  box-sizing: border-box;\n  cursor: text;\n  width: 100%;\n  height: 28px;\n  color: var(--dsw-alias-label-secondary);\n  transition: width .18s var(--ds-ease-in-out),\n    padding .18s var(--ds-ease-in-out),\n    border-color .18s var(--ds-ease-in-out),\n    background-color .18s var(--ds-ease-in-out);\n  background: none;\n  border: none;\n  border-radius: 50%;\n  flex: none;\n  align-items: center;\n  gap: 0;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  overflow: hidden;\n}\n\n.yuxdOq_searchExpanded {\n  border: 1px solid var(--dsw-alias-border-l2);\n  width: calc(100% + 4px);\n  height: 30px;\n  color: var(--dsw-alias-label-caption);\n  background: none;\n  border-radius: 10px;\n  margin-inline: -2px;\n  padding: 0 4px 0 0;\n}\n\n.yuxdOq_searchButton {\n  cursor: pointer;\n  width: 28px;\n  height: 28px;\n  color: inherit;\n  background: none;\n  border: none;\n  border-radius: 50%;\n  flex: none;\n  justify-content: center;\n  align-items: center;\n  padding: 0;\n  display: inline-flex;\n}\n\n.yuxdOq_searchExpanded .yuxdOq_searchButton {\n  width: 28px;\n  height: 30px;\n}\n\n.yuxdOq_searchButton:hover {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n\n.yuxdOq_searchExpanded .yuxdOq_searchButton:hover {\n  background: none;\n}\n\n.yuxdOq_searchInput {\n  opacity: 0;\n  pointer-events: none;\n  width: 0;\n  min-width: 0;\n  color: var(--dsw-alias-label-primary);\n  transition: opacity .12s var(--ds-ease-in-out);\n  background: none;\n  border: none;\n  outline: none;\n  flex: 1;\n  font-size: 13px;\n  line-height: 18px;\n}\n\n.yuxdOq_searchExpanded .yuxdOq_searchInput {\n  opacity: 1;\n  pointer-events: auto;\n  margin-left: -2px;\n}\n\n.yuxdOq_searchInput::placeholder {\n  color: var(--dsw-alias-label-tertiary);\n}\n\n.yuxdOq_clearButton {\n  cursor: pointer;\n  width: 24px;\n  height: 24px;\n  color: var(--dsw-alias-label-secondary);\n  background: none;\n  border: none;\n  border-radius: 50%;\n  flex: none;\n  justify-content: center;\n  align-items: center;\n  padding: 0;\n  display: inline-flex;\n}\n\n.yuxdOq_clearButton:hover {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n\n.yuxdOq_rail .yuxdOq_sectionHeader {\n  justify-content: flex-start;\n  gap: 0;\n  margin-bottom: 12px;\n  padding-left: 0;\n}\n\n.yuxdOq_rail .yuxdOq_headerActions {\n  max-width: none;\n}\n\n.yuxdOq_rail .yuxdOq_iconButton {\n  width: 36px;\n  height: 36px;\n  color: var(--dsw-alias-label-primary);\n}\n\n.yuxdOq_rail .yuxdOq_search {\n  background: none;\n  border-color: #0000;\n  gap: 0;\n  width: 36px;\n  height: 36px;\n  margin: 0 0 12px;\n  padding: 0;\n}\n\n.yuxdOq_rail .yuxdOq_searchButton {\n  width: 36px;\n  height: 36px;\n  color: var(--dsw-alias-label-primary);\n}\n\n.yuxdOq_rail .yuxdOq_searchButton:hover {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n\n.yuxdOq_listArea {\n  min-height: 0;\n  margin-left: -4px;\n  margin-right: calc(-1 * var(--dsh-session-list-edge-inset));\n  flex-direction: column;\n  flex: 1;\n  padding-left: 4px;\n  display: flex;\n  overflow: visible;\n}\n\n.yuxdOq_categoryStatus {\n  color: var(--dsw-alias-label-secondary);\n  justify-content: space-between;\n  align-items: center;\n  gap: 8px;\n  padding: 8px;\n  font-size: 13px;\n  line-height: 20px;\n  display: flex;\n}\n\n.yuxdOq_rail .yuxdOq_listArea {\n  margin-left: 0;\n  margin-right: 0;\n  padding-left: 0;\n}\n\n.yuxdOq_treeBody {\n  flex-direction: column;\n  flex: 1;\n  min-height: 0;\n  display: flex;\n  position: relative;\n}\n\n.yuxdOq_fade {\n  left: 0;\n  right: var(--dsh-session-list-edge-inset);\n  background: linear-gradient(to bottom, transparent, var(--dsw-specific-sidebar-fill));\n  pointer-events: none;\n  height: 24px;\n  position: absolute;\n  bottom: 0;\n}\n\n.yuxdOq_wide {\n  animation: yuxdOq_wide-in .2s var(--ds-ease-in-out);\n}\n\n@keyframes yuxdOq_wide-in {\n  from {\n    opacity: 0;\n  }\n}\n\n.yuxdOq_list {\n  min-height: 0;\n  margin-left: -4px;\n  margin-right: var(--dsh-session-list-scrollbar-offset);\n  padding-left: 4px;\n  padding-right: calc(var(--dsh-session-list-edge-inset)\n    - var(--dsh-session-list-scrollbar-width)\n    - var(--dsh-session-list-scrollbar-offset));\n  scrollbar-gutter: stable;\n  flex: 1;\n  padding-bottom: 16px;\n  overflow-y: auto;\n}\n\n.yuxdOq_flatList > * + *, .yuxdOq_searchTree > [role=\"treeitem\"] + [role=\"treeitem\"], .yuxdOq_groupSection > * + * {\n  margin-top: 2px;\n}\n\n.yuxdOq_searchStatus, .yuxdOq_searchWarning {\n  color: var(--dsw-alias-label-tertiary);\n  padding: 10px 12px;\n  font-size: 12px;\n  line-height: 18px;\n}\n\n.yuxdOq_searchWarning {\n  color: var(--dsw-alias-label-secondary);\n}\n\n.yuxdOq_groupSection {\n  position: relative;\n}\n\n.yuxdOq_groupSection + .yuxdOq_groupSection {\n  margin-top: 4px;\n}\n\n.yuxdOq_workspaceChildGroup {\n  --dsh-session-indent-step: 12px;\n  border-inline-start: 1px solid color-mix(in srgb, var(--dsw-alias-label-tertiary) 22%, transparent);\n  flex-direction: column;\n  margin-top: 2px;\n  padding-inline-start: var(--dsh-session-indent-step);\n  display: flex;\n}\n\n.yuxdOq_categoryGroup {\n  margin-top: 2px;\n}\n\n.yuxdOq_categoryGroupExpanded {\n  background: color-mix(in srgb, var(--dsw-alias-interactive-bg-hover) 55%, transparent);\n  border-radius: 7px;\n  padding-top: 2px;\n  padding-bottom: 2px;\n}\n\n.yuxdOq_categoryGroup:has( > [data-category-drop-target=\"true\"]) {\n  background: color-mix(in srgb, var(--dsw-alias-state-business-primary) 8%, transparent);\n}\n\n.yuxdOq_listTopDropIndicator, .yuxdOq_workspaceDropBefore:before, .yuxdOq_workspaceDropAfter:after {\n  content: \"\";\n  z-index: 1;\n  background: linear-gradient(55deg,\n      transparent calc(50% - 1px),\n      var(--dsw-alias-state-business-primary) calc(50% - 1px) calc(50% + 1px),\n      transparent calc(50% + 1px)) 0 0 / 5px 7px no-repeat,\n    linear-gradient(125deg,\n      transparent calc(50% - 1px),\n      var(--dsw-alias-state-business-primary) calc(50% - 1px) calc(50% + 1px),\n      transparent calc(50% + 1px)) 0 5px / 5px 7px no-repeat,\n    linear-gradient(var(--dsw-alias-state-business-primary) 0 0) 4px 5px / calc(100% - 4px) 2px no-repeat;\n  pointer-events: none;\n  height: 12px;\n  position: absolute;\n  left: 0;\n  right: 0;\n}\n\n.yuxdOq_listTopDropIndicator {\n  top: -8px;\n  left: 0;\n  right: var(--dsh-session-list-edge-inset);\n}\n\n.yuxdOq_listTopDropActive > .yuxdOq_workspaceDropBefore:first-child:before {\n  display: none;\n}\n\n.yuxdOq_workspaceDropBefore:before {\n  top: -8px;\n}\n\n.yuxdOq_workspaceDropAfter:after {\n  bottom: -8px;\n}\n\n.yuxdOq_sessionOverflowButton {\n  cursor: pointer;\n  text-align: left;\n  width: 100%;\n  height: 28px;\n  color: var(--dsw-alias-label-tertiary);\n  background: none;\n  border: none;\n  border-radius: 8px;\n  padding: 0 12px 0 28px;\n  font-size: 12px;\n}\n\n.yuxdOq_groupSection > .yuxdOq_sessionOverflowButton {\n  margin-top: 0;\n}\n\n.yuxdOq_sessionOverflowButton:hover {\n  color: var(--dsw-alias-label-secondary);\n  background: none;\n}\n\n.yuxdOq_empty {\n  color: var(--dsw-alias-label-tertiary);\n  padding: 16px 12px;\n  font-size: 13px;\n}\n\n.yuxdOq_renameInput {\n  box-sizing: border-box;\n  border: 1px solid var(--dsw-alias-border-l2);\n  width: 100%;\n  height: 44px;\n  color: var(--dsw-alias-label-primary);\n  background: none;\n  border-radius: 22px;\n  outline: none;\n  padding: 7px 14px;\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 22px;\n}\n\n.yuxdOq_renameInput:disabled {\n  color: var(--dsw-alias-label-dimmed);\n}\n\n.yuxdOq_renameError {\n  color: var(--dsw-alias-state-error-primary);\n  margin-top: 8px;\n  font-size: 12px;\n  line-height: 18px;\n}\n\n.yuxdOq_deleteAction:not(:disabled) {\n  color: var(--dsw-alias-state-error-primary);\n}\n\n.yuxdOq_deleteStatus {\n  color: var(--dsw-alias-label-secondary);\n  font-size: 12px;\n  line-height: 18px;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .yuxdOq_wide {\n    animation: none;\n  }\n\n  .yuxdOq_search, .yuxdOq_sectionLabel, .yuxdOq_searchSlot, .yuxdOq_searchInput, .yuxdOq_headerActions {\n    transition: none;\n  }\n}\n\n.yuxdOq_workspaceFolderGroup {\n  flex-direction: column;\n  display: flex;\n}\n\n.yuxdOq_workspaceFolderGroup + .yuxdOq_workspaceFolderGroup {\n  margin-top: 4px;\n}\n\n.yuxdOq_workspaceFolderCreateRow {\n  box-sizing: border-box;\n  width: 100%;\n  height: 28px;\n  color: var(--dsw-alias-label-tertiary);\n  text-align: left;\n  cursor: pointer;\n  background: none;\n  border: 0;\n  border-radius: 8px;\n  align-items: center;\n  gap: 6px;\n  margin-top: 6px;\n  padding: 0 8px;\n  font-size: 13px;\n  line-height: 20px;\n  display: flex;\n}\n\n.yuxdOq_workspaceFolderCreateRow:hover {\n  background: var(--dsw-alias-interactive-bg-hover);\n  color: var(--dsw-alias-label-secondary);\n}\n\n.yuxdOq_workspaceFolderCreateGlyph {\n  flex: none;\n  justify-content: center;\n  align-items: center;\n  width: 16px;\n  height: 20px;\n  display: inline-flex;\n}\n\n.yuxdOq_workspaceFolderContentsDrop {\n  background: color-mix(in srgb, var(--dsw-alias-state-business-primary) 8%, transparent);\n  border-radius: 7px;\n}\n.iVnGtq_root {\n  flex-direction: column;\n  gap: 24px;\n  max-width: 720px;\n  display: flex;\n}\n\n.iVnGtq_section {\n  flex-direction: column;\n  gap: 12px;\n  display: flex;\n}\n\n.iVnGtq_sectionTitle {\n  color: var(--dsw-alias-label-primary);\n  margin: 0;\n  font-size: 16px;\n  line-height: 22px;\n}\n\n.iVnGtq_lead {\n  color: var(--dsw-alias-label-secondary);\n  margin: 0;\n  font-size: 13px;\n  line-height: 20px;\n}\n\n.iVnGtq_featureList {\n  flex-direction: column;\n  gap: 8px;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  display: flex;\n}\n\n.iVnGtq_feature {\n  border: 1px solid var(--dsw-alias-border-l2);\n  border-radius: 8px;\n  align-items: flex-start;\n  gap: 12px;\n  padding: 12px;\n  display: flex;\n}\n\n.iVnGtq_featureIcon {\n  width: 28px;\n  height: 28px;\n  color: var(--dsw-alias-state-business-primary);\n  flex: none;\n  justify-content: center;\n  align-items: center;\n  display: inline-flex;\n}\n\n.iVnGtq_featureText {\n  flex-direction: column;\n  gap: 2px;\n  min-width: 0;\n  display: flex;\n}\n\n.iVnGtq_featureTitle {\n  color: var(--dsw-alias-label-primary);\n  font-size: 14px;\n  line-height: 20px;\n}\n\n.iVnGtq_featureBody {\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 12px;\n  line-height: 18px;\n}\n\n.iVnGtq_batchList {\n  flex-direction: column;\n  gap: 6px;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  display: flex;\n}\n\n.iVnGtq_batch {\n  border: 1px solid var(--dsw-alias-border-l2);\n  border-radius: 6px;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n  padding: 8px 12px;\n  display: flex;\n}\n\n.iVnGtq_batchGroup {\n  border: 1px solid var(--dsw-alias-border-l2);\n  border-radius: 8px;\n  flex-direction: column;\n  gap: 6px;\n  padding: 10px 12px;\n  display: flex;\n}\n\n.iVnGtq_batchHead {\n  align-items: center;\n  gap: 12px;\n  display: flex;\n}\n\n.iVnGtq_batchHead .iVnGtq_batchMeta {\n  flex: 1;\n}\n\n.iVnGtq_trashList {\n  flex-direction: column;\n  gap: 4px;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  display: flex;\n}\n\n.iVnGtq_trashRow {\n  background: var(--dsw-alias-interactive-bg-hover);\n  border-radius: 6px;\n  flex-direction: column;\n  gap: 6px;\n  padding: 6px 8px;\n  display: flex;\n}\n\n.iVnGtq_trashHead {\n  align-items: center;\n  gap: 12px;\n  display: flex;\n}\n\n.iVnGtq_trashHead .iVnGtq_batchMeta {\n  flex: 1;\n}\n\n.iVnGtq_trashMeta {\n  color: var(--dsw-alias-label-tertiary);\n  word-break: break-all;\n  font-size: 11px;\n  line-height: 16px;\n}\n\n.iVnGtq_transcript {\n  background: var(--dsw-alias-interactive-bg-hover);\n  border-radius: 6px;\n  flex-direction: column;\n  gap: 6px;\n  max-height: 320px;\n  padding: 8px;\n  display: flex;\n  overflow-y: auto;\n}\n\n.iVnGtq_message {\n  align-items: flex-start;\n  gap: 8px;\n  font-size: 12px;\n  line-height: 18px;\n  display: flex;\n}\n\n.iVnGtq_messageRole {\n  min-width: 58px;\n  color: var(--dsw-alias-label-tertiary);\n  text-transform: uppercase;\n  flex: none;\n  font-size: 11px;\n}\n\n.iVnGtq_message[data-role=\"user\"] .iVnGtq_messageRole {\n  color: var(--dsw-alias-state-business-primary);\n}\n\n.iVnGtq_messageText {\n  min-width: 0;\n  color: var(--dsw-alias-label-secondary);\n  white-space: pre-wrap;\n  word-break: break-word;\n}\n\n.iVnGtq_logList {\n  flex-direction: column;\n  gap: 2px;\n  max-height: 280px;\n  margin: 0;\n  padding: 0;\n  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;\n  list-style: none;\n  display: flex;\n  overflow-y: auto;\n}\n\n.iVnGtq_logRow {\n  gap: 8px;\n  font-size: 11px;\n  line-height: 16px;\n  display: flex;\n}\n\n.iVnGtq_logRow[data-level=\"error\"] .iVnGtq_logMessage {\n  color: var(--dsw-alias-state-error-primary);\n}\n\n.iVnGtq_logTime {\n  color: var(--dsw-alias-label-dimmed);\n  flex: none;\n}\n\n.iVnGtq_logAction {\n  min-width: 96px;\n  color: var(--dsw-alias-label-tertiary);\n  flex: none;\n}\n\n.iVnGtq_logMessage {\n  min-width: 0;\n  color: var(--dsw-alias-label-secondary);\n  word-break: break-word;\n}\n\n.iVnGtq_batchMeta {\n  color: var(--dsw-alias-label-primary);\n  font-size: 13px;\n  line-height: 20px;\n}\n\n.iVnGtq_batchTime {\n  color: var(--dsw-alias-label-tertiary);\n  font-variant-numeric: tabular-nums;\n  white-space: nowrap;\n  font-size: 12px;\n  line-height: 18px;\n}\n\n.iVnGtq_actions {\n  gap: 8px;\n  display: flex;\n}\n\n.iVnGtq_empty {\n  color: var(--dsw-alias-label-tertiary);\n  padding: 12px 0;\n  font-size: 13px;\n  line-height: 20px;\n}\n\n.iVnGtq_emptyHint {\n  color: var(--dsw-alias-label-dimmed);\n  margin-top: 4px;\n  font-size: 12px;\n  line-height: 18px;\n}\n\n.iVnGtq_error {\n  color: var(--dsw-alias-state-error-primary);\n  font-size: 13px;\n  line-height: 20px;\n}\n\n.iVnGtq_info {\n  color: var(--dsw-alias-state-success-primary);\n  font-size: 13px;\n  line-height: 20px;\n}\n.YBXmbq_dialog {\n  width: min(720px, 100vw - 48px);\n  max-height: min(720px, 100vh - 96px);\n}\n\n.YBXmbq_dialogContent {\n  max-height: min(560px, 100vh - 220px);\n  overflow-y: auto;\n}\n";
		const tagId = "dsh-workspace-folders/style.css";
		if (typeof document !== 'undefined' && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-workspace-folders";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
	})();

		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let _deepseek_ai_dsh_client_store = require("@deepseek-ai/dsh-client-store");
		let react = require("react");
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		let react_jsx_runtime = require("react/jsx-runtime");
		//#region node_modules/zod/v4/core/util.js
		function getEnumValues(entries) {
			const numericValues = Object.values(entries).filter((v) => typeof v === "number");
			return Object.entries(entries).filter(([k, _]) => numericValues.indexOf(+k) === -1).map(([_, v]) => v);
		}
		function joinValues(array, separator = "|") {
			return array.map((val) => stringifyPrimitive(val)).join(separator);
		}
		function jsonStringifyReplacer(_, value) {
			if (typeof value === "bigint") return value.toString();
			return value;
		}
		var Cached = class {
			constructor(getter) {
				this._getter = getter;
				this._value = void 0;
			}
			get value() {
				const getter = this._getter;
				if (getter !== void 0) {
					this._value = getter();
					this._getter = void 0;
				}
				return this._value;
			}
		};
		function cached(getter) {
			return new Cached(getter);
		}
		function nullish(input) {
			return input === null || input === void 0;
		}
		function cleanRegex(source) {
			const start = source.startsWith("^") ? 1 : 0;
			const end = source.endsWith("$") ? source.length - 1 : source.length;
			return source.slice(start, end);
		}
		function floatSafeRemainder(val, step) {
			const ratio = val / step;
			const roundedRatio = Math.round(ratio);
			const tolerance = 4 * Number.EPSILON * Math.max(Math.abs(ratio), 1);
			if (Math.abs(ratio - roundedRatio) < tolerance) return 0;
			return ratio - roundedRatio;
		}
		function assignProp(target, prop, value) {
			Object.defineProperty(target, prop, {
				value,
				writable: true,
				enumerable: true,
				configurable: true
			});
		}
		/**
		* Whichever object a def's `shape` currently answers from: the one the caller passed until the first read, the frozen copy after it.
		*
		* Its keys and descriptors read without invoking anything, which is what lets a discriminated union check its discriminator, and the cycle walk read a shape, without resolving a getter that references the schema being constructed. A def that answers `shape` from an accessor of its own has none.
		*/
		function rawShape(def) {
			const desc = Object.getOwnPropertyDescriptor(def, "shape");
			return desc?.get ? desc.get.raw : desc?.value;
		}
		function sourceShape(schema) {
			return rawShape(schema._zod.def) ?? schema._zod.def.shape;
		}
		function deferProp(target, key, getter) {
			Object.defineProperty(target, key, {
				get() {
					const value = getter();
					assignProp(this, key, value);
					return value;
				},
				enumerable: true,
				configurable: true
			});
		}
		function putProp(target, key, value) {
			if (key in target) assignProp(target, key, value);
			else target[key] = value;
		}
		/**
		* Copies `keys` of `source`'s shape onto `target`, each value passed through `wrap`.
		*
		* A key the source has resolved is copied through now, so the derived shape states it outright and nothing has to resolve it to learn what it holds. A key the source still defers stays deferred, and reads back through the source's own `shape`, so it resolves once and both shapes get that one schema.
		*/
		function mirrorShape(target, source, keys, wrap) {
			const raw = sourceShape(source);
			for (const key of keys) {
				const desc = Object.getOwnPropertyDescriptor(raw, key);
				if (!desc.enumerable) continue;
				if (desc.get) deferProp(target, key, () => {
					const value = source._zod.def.shape[key];
					return wrap ? wrap(value, key) : value;
				});
				else putProp(target, key, wrap ? wrap(desc.value, key) : desc.value);
			}
		}
		function mirrorProps(target, source) {
			for (const key of Reflect.ownKeys(source)) {
				const desc = Object.getOwnPropertyDescriptor(source, key);
				if (!desc.enumerable) continue;
				if (desc.get) deferProp(target, key, () => source[key]);
				else putProp(target, key, desc.value);
			}
		}
		function mergeDefs(...defs) {
			const mergedDescriptors = {};
			for (const def of defs) {
				const descriptors = Object.getOwnPropertyDescriptors(def);
				Object.assign(mergedDescriptors, descriptors);
			}
			return Object.defineProperties({}, mergedDescriptors);
		}
		function esc(str) {
			return JSON.stringify(str);
		}
		function slugify(input) {
			return input.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
		}
		const captureStackTrace = "captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => {};
		function isObject(data) {
			return typeof data === "object" && data !== null && !Array.isArray(data);
		}
		const allowsEval = /* @__PURE__*/ cached(() => {
			if (globalConfig.jitless) return false;
			if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) return false;
			try {
				new Function("");
				return true;
			} catch (_) {
				return false;
			}
		});
		function isPlainObject(o) {
			if (isObject(o) === false) return false;
			const ctor = o.constructor;
			if (ctor === void 0) return true;
			if (typeof ctor !== "function") return true;
			const prot = ctor.prototype;
			if (isObject(prot) === false) return false;
			if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) return false;
			return true;
		}
		function shallowClone(o) {
			if (isPlainObject(o)) return { ...o };
			if (Array.isArray(o)) return [...o];
			if (o instanceof Map) return new Map(o);
			if (o instanceof Set) return new Set(o);
			return o;
		}
		const propertyKeyTypes = /* @__PURE__*/ new Set([
			"string",
			"number",
			"symbol"
		]);
		function escapeRegex(str) {
			return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		}
		function clone(inst, def, params) {
			const cl = new inst._zod.constr(def ?? inst._zod.def);
			if (!def || params?.parent) cl._zod.parent = inst;
			return cl;
		}
		function normalizeParams(_params) {
			const params = _params;
			if (!params) return {};
			if (typeof params === "string") return { error: () => params };
			if (params?.message !== void 0) {
				if (params?.error !== void 0) throw new Error("Cannot specify both `message` and `error` params");
				params.error = params.message;
			}
			delete params.message;
			if (typeof params.error === "string") return {
				...params,
				error: () => params.error
			};
			return params;
		}
		function stringifyPrimitive(value) {
			if (typeof value === "bigint") return value.toString() + "n";
			if (typeof value === "string") return `"${value}"`;
			return `${value}`;
		}
		function optionalKeys(shape) {
			return Object.keys(shape).filter((k) => {
				return shape[k]._zod.optin !== void 0 && shape[k]._zod.optout === "optional";
			});
		}
		const NUMBER_FORMAT_RANGES = /*@__PURE__*/ (() => ({
			safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
			int32: [-2147483648, 2147483647],
			uint32: [0, 4294967295],
			float32: [-34028234663852886e22, 34028234663852886e22],
			float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
		}))();
		const BIGINT_FORMAT_RANGES = {
			int64: [/* @__PURE__*/ BigInt("-9223372036854775808"), /* @__PURE__*/ BigInt("9223372036854775807")],
			uint64: [/* @__PURE__*/ BigInt(0), /* @__PURE__*/ BigInt("18446744073709551615")]
		};
		function pick(schema, mask) {
			const currDef = schema._zod.def;
			const checks = currDef.checks;
			if (checks && checks.length > 0) throw new Error(".pick() cannot be used on object schemas containing refinements");
			const newShape = {};
			mirrorShape(newShape, schema, maskedKeys(schema, mask));
			return clone(schema, mergeDefs(currDef, {
				shape: newShape,
				checks: []
			}));
		}
		function maskedKeys(schema, mask) {
			const raw = sourceShape(schema);
			const keys = [];
			for (const key of Reflect.ownKeys(mask)) {
				if (!Object.getOwnPropertyDescriptor(raw, key)?.enumerable) throw new Error(`Unrecognized key: "${String(key)}"`);
				if (mask[key]) keys.push(key);
			}
			return keys;
		}
		function omit(schema, mask) {
			const currDef = schema._zod.def;
			const checks = currDef.checks;
			if (checks && checks.length > 0) throw new Error(".omit() cannot be used on object schemas containing refinements");
			const omitted = new Set(maskedKeys(schema, mask));
			const newShape = {};
			mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)).filter((key) => !omitted.has(key)));
			return clone(schema, mergeDefs(currDef, {
				shape: newShape,
				checks: []
			}));
		}
		function extend(schema, shape) {
			if (!isPlainObject(shape)) throw new Error("Invalid input to extend: expected a plain object");
			const checks = schema._zod.def.checks;
			if (checks && checks.length > 0) {
				const existingShape = sourceShape(schema);
				for (const key of Reflect.ownKeys(shape)) if (Object.getOwnPropertyDescriptor(existingShape, key) !== void 0) throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
			}
			return clone(schema, mergeDefs(schema._zod.def, { shape: extended(schema, shape) }));
		}
		function extended(schema, shape) {
			const newShape = {};
			mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)));
			mirrorProps(newShape, shape);
			return newShape;
		}
		function safeExtend(schema, shape) {
			if (!isPlainObject(shape)) throw new Error("Invalid input to safeExtend: expected a plain object");
			return clone(schema, mergeDefs(schema._zod.def, { shape: extended(schema, shape) }));
		}
		function merge(a, b) {
			if (!b?._zod?.def) throw new Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");
			if (a._zod.def.checks?.length) throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
			const newShape = {};
			mirrorShape(newShape, a, Reflect.ownKeys(sourceShape(a)));
			mirrorShape(newShape, b, Reflect.ownKeys(sourceShape(b)));
			return clone(a, mergeDefs(a._zod.def, {
				shape: newShape,
				get catchall() {
					return b._zod.def.catchall;
				},
				checks: b._zod.def.checks ?? []
			}));
		}
		function partial(Class, schema, mask, name = "partial") {
			const checks = schema._zod.def.checks;
			if (checks && checks.length > 0) throw new Error(`.${name}() cannot be used on object schemas containing refinements`);
			const selected = mask ? new Set(maskedKeys(schema, mask)) : void 0;
			const newShape = {};
			mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)), Class && ((value, key) => selected && !selected.has(key) ? value : new Class({
				type: "optional",
				innerType: value
			})));
			return clone(schema, mergeDefs(schema._zod.def, {
				shape: newShape,
				checks: []
			}));
		}
		function required(Class, schema, mask) {
			const selected = mask ? new Set(maskedKeys(schema, mask)) : void 0;
			const newShape = {};
			mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)), (value, key) => selected && !selected.has(key) ? value : new Class({
				type: "nonoptional",
				innerType: value
			}));
			return clone(schema, mergeDefs(schema._zod.def, { shape: newShape }));
		}
		function aborted(x, startIndex = 0) {
			if (x.aborted === true) return true;
			for (let i = startIndex; i < x.issues.length; i++) if (x.issues[i]?.continue !== true) return true;
			return false;
		}
		function explicitlyAborted(x, startIndex = 0) {
			if (x.aborted === true) return true;
			for (let i = startIndex; i < x.issues.length; i++) if (x.issues[i]?.continue === false) return true;
			return false;
		}
		function prefixIssues(path, issues) {
			return issues.map((iss) => {
				var _a;
				(_a = iss).path ?? (_a.path = []);
				iss.path.unshift(path);
				return iss;
			});
		}
		function unwrapMessage(message) {
			return typeof message === "string" ? message : message?.message;
		}
		/** The leading size checks of `defChecks` that set an upper bound, each paired with it. */
		function sizeCaps(defChecks) {
			const caps = [];
			for (const ch of defChecks ?? []) {
				const d = ch._zod.def;
				if (!/_(length|size)$|_equals$/.test(d.check)) break;
				const max = d.maximum ?? d.length ?? d.size;
				if (max >= 0) caps.push([max, ch]);
			}
			return caps;
		}
		function attachSchema(issues, start, inst) {
			var _a;
			for (let i = start; i < issues.length; i++) (_a = issues[i]).schema ?? (_a.schema = inst);
		}
		function finalizeIssue(iss, ctx, config) {
			var _a;
			const traits = iss.inst?._zod?.traits;
			if (traits?.has("$ZodType")) if (traits.has("$ZodCheck")) (_a = iss).schema ?? (_a.schema = iss.inst);
			else iss.schema = iss.inst;
			const schemaError = iss.schema !== iss.inst ? iss.schema?._zod.def?.error : void 0;
			const message = iss.message ? iss.message : unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(schemaError?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config.customError?.(iss)) ?? unwrapMessage(config.localeError?.(iss)) ?? "Invalid input";
			const full = {};
			for (const k of Object.keys(iss)) {
				if (k === "inst" || k === "schema" || k === "continue" || k === "input" || k === "__proto__") continue;
				full[k] = iss[k];
			}
			full.path ?? (full.path = []);
			full.message = message;
			if (ctx?.reportInput) full.input = iss.input;
			return full;
		}
		const highSurrogate = /[\uD800-\uDBFF]/;
		function codePointLength(str) {
			const units = str.length;
			if (!highSurrogate.test(str)) return units;
			let count = units;
			for (let i = 0; i < units - 1; i++) if ((str.charCodeAt(i) & 64512) === 55296 && (str.charCodeAt(i + 1) & 64512) === 56320) {
				count--;
				i++;
			}
			return count;
		}
		function getLengthableOrigin(input) {
			if (Array.isArray(input)) return "array";
			if (typeof input === "string") return "string";
			return "unknown";
		}
		function parsedType(data) {
			const t = typeof data;
			switch (t) {
				case "number": return Number.isNaN(data) ? "nan" : "number";
				case "object": {
					if (data === null) return "null";
					if (Array.isArray(data)) return "array";
					const obj = data;
					if (obj && Object.getPrototypeOf(obj) !== Object.prototype && "constructor" in obj && obj.constructor) return obj.constructor.name;
				}
			}
			return t;
		}
		function issue(...args) {
			const [iss, input, inst] = args;
			if (typeof iss === "string") return {
				message: iss,
				code: "custom",
				input,
				inst
			};
			return { ...iss };
		}
		/**
		* Installs a trait's members on its prototype. Each value builds that member for the instance on first read; the built value shadows the accessor as an own property, so a detached `const { parse } = schema` keeps working.
		*
		* Call this from a `proto` initializer, which runs once per prototype — never per instance.
		*/
		function members(proto, table) {
			for (const key in table) {
				const desc = Object.getOwnPropertyDescriptor(table, key);
				if (desc.get) Object.defineProperty(proto, key, {
					...desc,
					enumerable: false
				});
				else defineBound(proto, key, desc.value);
			}
		}
		/** Shadows a prototype member with an own value, so a getter that builds from the instance runs once. */
		function own(inst, key, value, enumerable = true) {
			Object.defineProperty(inst, key, {
				configurable: true,
				writable: true,
				enumerable,
				value
			});
			return value;
		}
		/** Like {@link own}, for a member that was never an own data property and has to stay out of `Object.keys`. */
		function hide(inst, key, value) {
			return own(inst, key, value, false);
		}
		/** Adds members a table derives from the instance: each builds on first read and shadows as own data, and assignment shadows the same way, as when these were own properties. */
		function derived(computes, table) {
			for (const key in computes) {
				const compute = computes[key];
				Object.defineProperty(table, key, {
					configurable: true,
					enumerable: true,
					get() {
						return own(this, key, compute(this));
					},
					set(value) {
						own(this, key, value);
					}
				});
			}
			return table;
		}
		function defineBound(proto, key, fn) {
			Object.defineProperty(proto, key, {
				configurable: true,
				get() {
					return this == null ? fn : own(this, key, fn.bind(this));
				},
				set(value) {
					own(this, key, value);
				}
			});
		}
		/** Returns the prototype to install on, or `undefined` if this group is already installed on it. */
		function claim(inst, sentinel) {
			const proto = Object.getPrototypeOf(inst);
			return sentinel in proto ? void 0 : proto;
		}
		let installing;
		let broke = false;
		const breaker = {
			configurable: true,
			get() {
				broke = true;
			}
		};
		/**
		* Installs a lazily-derived internal on the `_zod` prototype of `inst`'s
		* constructor, computed from the internals object itself and cached there on
		* first read. One accessor per constructor rather than one per instance.
		*/
		function defineLazyInternal(inst, key, compute) {
			const proto = Object.getPrototypeOf(inst._zod);
			if (key in proto && installing !== inst._zod) {
				installing = void 0;
				return;
			}
			installing = inst._zod;
			Object.defineProperty(proto, key, {
				configurable: true,
				get() {
					Object.defineProperty(this, key, breaker);
					const outer = broke;
					broke = false;
					try {
						const value = compute(this);
						if (broke) delete this[key];
						else Object.defineProperty(this, key, {
							configurable: true,
							writable: true,
							value
						});
						broke = broke || outer;
						return value;
					} catch (err) {
						delete this[key];
						broke = broke || outer;
						throw err;
					}
				},
				set(value) {
					Object.defineProperty(this, key, {
						configurable: true,
						writable: true,
						value
					});
				}
			});
		}
		/**
		* Installs `key` on `inst`'s prototype, computed by `make` on first read and cached there as an own
		* data property. One accessor per constructor rather than one per instance, because an own accessor
		* puts every instance after the first into v8 dictionary mode. The key doubles as the sentinel.
		*/
		function installLazyProp(inst, key, make, enumerable) {
			const proto = claim(inst, key);
			if (!proto) return;
			Object.defineProperty(proto, key, {
				configurable: true,
				get() {
					const desc = {
						configurable: true,
						writable: true,
						enumerable,
						value: void 0
					};
					Object.defineProperty(this, key, desc);
					desc.value = make(this);
					Object.defineProperty(this, key, desc);
					return desc.value;
				},
				set(value) {
					Object.defineProperty(this, key, {
						configurable: true,
						writable: true,
						enumerable,
						value
					});
				}
			});
		}
		/** Marks the thunk `_catch` synthesises for a constant catch value. `Function.length` cannot tell that thunk from a user callback — rest and defaulted parameters both report arity 0 — and a user callback reads `ctx.error`, whose issues only finalize correctly against the caller's per-parse error map. Provenance can say what arity cannot. A plain string key rather than `Symbol.for`, whose call at module scope no bundler can prove pure — the same shape that anchored `urlCanParse` into every build. */
		const CONSTANT_CATCH = "~constantCatch";
		/** Wraps a constant catch value in a thunk tagged with {@link CONSTANT_CATCH}. */
		function constantCatch(value) {
			const fn = () => value;
			fn[CONSTANT_CATCH] = true;
			return fn;
		}
		//#endregion
		//#region node_modules/zod/v4/core/core.js
		var _a$1;
		const _zodDesc = {
			value: void 0,
			enumerable: false
		};
		let _E = "captureStackTrace" in Error ? Error : null;
		function newError(Definition) {
			const E = _E;
			if (E) {
				const saved = E.stackTraceLimit;
				if (typeof saved === "number") {
					try {
						E.stackTraceLimit = 0;
					} catch {
						_E = null;
						return new Definition();
					}
					try {
						return new Definition();
					} finally {
						E.stackTraceLimit = saved;
					}
				}
			}
			return new Definition();
		}
		function $constructor(name, initializer, proto, params) {
			const zodProto = {};
			function Internals(def) {
				this.def = def;
				this.constr = _;
				this.traits = /* @__PURE__ */ new Set();
			}
			Internals.prototype = zodProto;
			const protoMembers = proto;
			const initialized = protoMembers && /* @__PURE__ */ new WeakSet();
			function init(inst, def) {
				if (!inst._zod) {
					_zodDesc.value = new Internals(def);
					try {
						Object.defineProperty(inst, "_zod", _zodDesc);
					} finally {
						_zodDesc.value = void 0;
					}
				} else if (inst._zod.traits.has(name)) return;
				inst._zod.traits.add(name);
				initializer(inst, def);
				if (initialized) {
					const own = Object.getPrototypeOf(inst);
					const ctorProto = inst._zod.constr.prototype;
					let up = own;
					while (up && up !== ctorProto) up = Object.getPrototypeOf(up);
					const target = up ?? own;
					if (!initialized.has(target)) {
						initialized.add(target);
						members(target, protoMembers);
					}
				}
				const proto = _.prototype;
				for (const k in proto) {
					if (!Object.prototype.hasOwnProperty.call(proto, k)) continue;
					if (!(k in inst)) inst[k] = proto[k].bind(inst);
				}
			}
			const Parent = params?.Parent ?? Object;
			class Definition extends Parent {}
			Object.defineProperty(Definition, "name", { value: name });
			function _(def) {
				const inst = params?.Parent ? newError(Definition) : this;
				init(inst, def);
				const deferred = inst._zod.deferred;
				if (deferred) {
					for (const fn of deferred) fn();
					inst._zod.deferred = void 0;
				}
				const pp = globalThis.__zod_globalConfig?.postProcessor;
				if (pp) pp(inst);
				return inst;
			}
			Object.defineProperty(_, "init", { value: init });
			Object.defineProperty(_, Symbol.hasInstance, { value: (inst) => {
				if (params?.Parent && inst instanceof params.Parent) return true;
				return inst?._zod?.traits?.has(name);
			} });
			Object.defineProperty(_, "name", { value: name });
			return _;
		}
		var $ZodAsyncError = class extends Error {
			constructor() {
				super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
			}
		};
		var $ZodEncodeError = class extends Error {
			constructor(name) {
				super(`Encountered unidirectional transform during encode: ${name}`);
				this.name = "ZodEncodeError";
			}
		};
		(_a$1 = globalThis).__zod_globalConfig ?? (_a$1.__zod_globalConfig = {});
		const globalConfig = globalThis.__zod_globalConfig;
		function config(newConfig) {
			if (newConfig) Object.assign(globalConfig, newConfig);
			return globalConfig;
		}
		//#endregion
		//#region node_modules/zod/v4/core/errors.js
		function _getMessage() {
			const internals = this._zod;
			internals.message ?? (internals.message = JSON.stringify(internals.def, jsonStringifyReplacer, 2));
			return internals.message;
		}
		function _setMessage(value) {
			this._zod.message = value;
		}
		const _messageDesc = {
			get: _getMessage,
			set: _setMessage,
			enumerable: true,
			configurable: true
		};
		const _issuesDesc = {
			value: void 0,
			enumerable: false
		};
		const _installedToString = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]);
		const initializer$1 = (inst, def) => {
			inst.name = "$ZodError";
			_issuesDesc.value = def;
			Object.defineProperty(inst, "issues", _issuesDesc);
			_issuesDesc.value = void 0;
			Object.defineProperty(inst, "message", _messageDesc);
			const proto = Object.getPrototypeOf(inst);
			if (!_installedToString.has(proto)) {
				_installedToString.add(proto);
				Object.defineProperty(proto, "toString", {
					configurable: true,
					enumerable: false,
					get() {
						const value = () => this.message;
						Object.defineProperty(this, "toString", {
							value,
							configurable: true,
							writable: true
						});
						return value;
					},
					set(value) {
						Object.defineProperty(this, "toString", {
							value,
							configurable: true,
							writable: true
						});
					}
				});
			}
		};
		const $ZodError = $constructor("$ZodError", initializer$1);
		$constructor("$ZodError", initializer$1, void 0, { Parent: Error });
		/** Get-or-create `obj[key]` as an own data property. A path segment naming an inherited member
		* ("toString", "constructor") would otherwise read through to the prototype, and assigning
		* "__proto__" would hit the setter instead of creating a key. */
		function node(obj, key, make) {
			if (!Object.prototype.hasOwnProperty.call(obj, key)) if (key === "__proto__") Object.defineProperty(obj, key, {
				value: make(),
				writable: true,
				enumerable: true,
				configurable: true
			});
			else obj[key] = make();
			return obj[key];
		}
		function flattenError(error, mapper = (issue) => issue.message) {
			const fieldErrors = {};
			const formErrors = [];
			for (const sub of error.issues) if (sub.path.length > 0) node(fieldErrors, sub.path[0], () => []).push(mapper(sub));
			else formErrors.push(mapper(sub));
			return {
				formErrors,
				fieldErrors
			};
		}
		function formatError(error, mapper = (issue) => issue.message) {
			const fieldErrors = { _errors: [] };
			const processError = (error, path = []) => {
				for (const issue of error.issues) if (issue.code === "invalid_union" && issue.errors.length) issue.errors.map((issues) => processError({ issues }, [...path, ...issue.path]));
				else if (issue.code === "invalid_key") processError({ issues: issue.issues }, [...path, ...issue.path]);
				else if (issue.code === "invalid_element") processError({ issues: issue.issues }, [...path, ...issue.path]);
				else {
					const fullpath = [...path, ...issue.path];
					if (fullpath.length === 0) fieldErrors._errors.push(mapper(issue));
					else {
						let curr = fieldErrors;
						let i = 0;
						while (i < fullpath.length) {
							const el = fullpath[i];
							const terminal = i === fullpath.length - 1;
							if (el === "_errors") {
								if (terminal) curr._errors.push(mapper(issue));
								i++;
								continue;
							}
							if (!Object.prototype.hasOwnProperty.call(curr, el)) Object.defineProperty(curr, el, {
								value: { _errors: [] },
								enumerable: true,
								writable: true,
								configurable: true
							});
							const node = curr[el];
							if (terminal) node._errors.push(mapper(issue));
							curr = node;
							i++;
						}
					}
				}
			};
			processError(error);
			return fieldErrors;
		}
		//#endregion
		//#region node_modules/zod/v4/core/parse.js
		function finalizeParams(callee, params) {
			return {
				callee: params?.callee ?? callee,
				Err: params?.Err
			};
		}
		const _parse = (_Err) => {
			const fn = (schema, value, _ctx, _params) => {
				const ctx = _ctx ? {
					..._ctx,
					async: false
				} : { async: false };
				const result = schema._zod.run({
					value,
					issues: []
				}, ctx);
				if (result instanceof Promise) throw new $ZodAsyncError();
				if (result.issues.length) {
					const e = new ((_params?.Err) ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
					captureStackTrace(e, _params?.callee ?? fn);
					throw e;
				}
				return result.value;
			};
			return fn;
		};
		const _parseAsync = (_Err) => {
			const fn = async (schema, value, _ctx, params) => {
				const ctx = _ctx ? {
					..._ctx,
					async: true
				} : { async: true };
				let result = schema._zod.run({
					value,
					issues: []
				}, ctx);
				if (result instanceof Promise) result = await result;
				if (result.issues.length) {
					const e = new ((params?.Err) ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
					captureStackTrace(e, params?.callee ?? fn);
					throw e;
				}
				return result.value;
			};
			return fn;
		};
		const _safeParse = (_Err) => (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				async: false
			} : { async: false };
			const result = schema._zod.run({
				value,
				issues: []
			}, ctx);
			if (result instanceof Promise) throw new $ZodAsyncError();
			return result.issues.length ? failure(_Err, result.issues, ctx) : {
				success: true,
				data: result.value
			};
		};
		function failure(Err, issues, ctx) {
			let error;
			return {
				success: false,
				get error() {
					if (!error) {
						error = new Err(issues.map((iss) => finalizeIssue(iss, ctx, config())));
						issues = void 0;
						ctx = void 0;
					}
					return error;
				},
				set error(e) {
					error = e;
					issues = void 0;
					ctx = void 0;
				}
			};
		}
		const _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				async: true
			} : { async: true };
			let result = schema._zod.run({
				value,
				issues: []
			}, ctx);
			if (result instanceof Promise) result = await result;
			return result.issues.length ? failure(_Err, result.issues, ctx) : {
				success: true,
				data: result.value
			};
		};
		const COMPILE_INVALID = /* @__PURE__ */ Symbol.for("zod.compile.invalid");
		const COMPILE_FALLBACK = /* @__PURE__ */ Symbol.for("zod.compile.fallback");
		const validate = ((schema, value, _ctx) => {
			const validator = schema._zod.bag.validator;
			if (validator !== void 0) {
				if (validator(value) !== COMPILE_INVALID) return true;
				if (validator.definite === true && _ctx === void 0) return false;
			}
			return validateFallback(schema, value, _ctx);
		});
		function validateFallback(schema, value, _ctx) {
			const ctx = _ctx ? {
				..._ctx,
				async: false,
				abortEarly: true
			} : {
				async: false,
				abortEarly: true
			};
			const fallbackRun = schema._zod.bag.fallbackRun;
			let result;
			if (fallbackRun) {
				ctx[COMPILE_FALLBACK] = true;
				result = fallbackRun({
					value,
					issues: []
				}, ctx);
			} else result = schema._zod.run({
				value,
				issues: []
			}, ctx);
			if (result instanceof Promise) throw new $ZodAsyncError();
			return result.issues.length === 0;
		}
		const validateAsync$1 = async (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				async: true,
				abortEarly: true
			} : {
				async: true,
				abortEarly: true
			};
			let result = schema._zod.run({
				value,
				issues: []
			}, ctx);
			if (result instanceof Promise) result = await result;
			return result.issues.length === 0;
		};
		const _encode = (_Err) => {
			const parse = _parse(_Err);
			const fn = (schema, value, _ctx, _params) => {
				const ctx = _ctx ? {
					..._ctx,
					direction: "backward"
				} : { direction: "backward" };
				return parse(schema, value, ctx, finalizeParams(fn, _params));
			};
			return fn;
		};
		const _decode = (_Err) => {
			const parse = _parse(_Err);
			const fn = (schema, value, _ctx, _params) => {
				return parse(schema, value, _ctx, finalizeParams(fn, _params));
			};
			return fn;
		};
		const _encodeAsync = (_Err) => {
			const parseAsync = _parseAsync(_Err);
			const fn = async (schema, value, _ctx, _params) => {
				const ctx = _ctx ? {
					..._ctx,
					direction: "backward"
				} : { direction: "backward" };
				return await parseAsync(schema, value, ctx, finalizeParams(fn, _params));
			};
			return fn;
		};
		const _decodeAsync = (_Err) => {
			const parseAsync = _parseAsync(_Err);
			const fn = async (schema, value, _ctx, _params) => {
				return await parseAsync(schema, value, _ctx, finalizeParams(fn, _params));
			};
			return fn;
		};
		const _safeEncode = (_Err) => (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				direction: "backward"
			} : { direction: "backward" };
			return _safeParse(_Err)(schema, value, ctx);
		};
		const _safeDecode = (_Err) => (schema, value, _ctx) => {
			return _safeParse(_Err)(schema, value, _ctx);
		};
		const _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				direction: "backward"
			} : { direction: "backward" };
			return _safeParseAsync(_Err)(schema, value, ctx);
		};
		const _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
			return _safeParseAsync(_Err)(schema, value, _ctx);
		};
		//#endregion
		//#region node_modules/zod/v4/core/regexes.js
		/**
		* @deprecated CUID v1 is deprecated by its authors due to information leakage
		* (timestamps embedded in the id). Use {@link cuid2} instead.
		* See https://github.com/paralleldrive/cuid.
		*/
		const cuid = /^[cC][0-9a-z]{6,}$/;
		const cuid2 = /^[0-9a-z]+$/;
		const ulid = /^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/;
		const xid = /^[0-9a-vA-V]{20}$/;
		const ksuid = /^[A-Za-z0-9]{27}$/;
		const nanoid = /^[a-zA-Z0-9_-]{21}$/;
		function nanoidOfLength(length) {
			return new RegExp(`^[a-zA-Z0-9_-]{${length}}$`);
		}
		/** ISO 8601-1 duration regex. Does not support the 8601-2 extensions like negative durations or fractional/negative components. */
		const duration = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
		/** A regex for any UUID-like identifier: 8-4-4-4-12 hex pattern */
		const guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
		/** Returns a regex for validating an RFC 9562/4122 UUID.
		*
		* @param version Optionally specify a version 1-8. If no version is specified, all versions are supported. */
		const uuid = (version) => {
			if (!version) return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
			return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
		};
		/** Practical email validation */
		const email = /^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
		const _emoji$1 = `^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$`;
		function emoji() {
			return new RegExp(_emoji$1, "u");
		}
		const ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
		const ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
		const cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
		const cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
		const base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
		const base64url = /^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3})?$/;
		const httpProtocol = /^https?$/;
		const e164 = /^\+[1-9]\d{6,14}$/;
		const dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
		/** Anchors a pattern source. The interpolation lives here rather than at the call site because
		* esbuild will not drop a `@__PURE__` call whose own argument interpolates a variable, but it
		* will drop `anchor(dateSource)`. Keeping it inline pinned `date` into every bundle. */
		function anchor(source) {
			return new RegExp(`^${source}$`);
		}
		const date = /*@__PURE__*/ anchor(dateSource);
		function timeSource(args) {
			const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
			return typeof args.precision === "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : args.seconds ? `${hhmm}:[0-5]\\d(?:\\.\\d+)?` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
		}
		function time(args) {
			return new RegExp(`^${timeSource(args)}$`);
		}
		function datetime(args) {
			const opts = ["Z"];
			if (args.offset) opts.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
			const qualified = `${timeSource({
				precision: args.precision,
				seconds: true
			})}(?:${opts.join("|")})`;
			const timeRegex = args.local ? `${qualified}|${timeSource({ precision: args.precision })}` : qualified;
			return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
		}
		const anyString = /^[\s\S]{0,}$/;
		const number$1 = /^-?\d+(?:\.\d+)?$/;
		const boolean$1 = /^(?:true|false)$/i;
		const lowercase = /^[^A-Z]*$/;
		const uppercase = /^[^a-z]*$/;
		//#endregion
		//#region node_modules/zod/v4/core/checks.js
		const $ZodCheck = /*@__PURE__*/ $constructor("$ZodCheck", (inst, def) => {
			var _a;
			inst._zod ?? (inst._zod = {});
			inst._zod.def = def;
			(_a = inst._zod).onattach ?? (_a.onattach = []);
		});
		/** Default `when` for length-based checks: run only on non-nullish values with a `length`. */
		const _whenHasLength = (payload) => {
			const val = payload.value;
			return !nullish(val) && val.length !== void 0;
		};
		const numericOriginMap = {
			number: "number",
			bigint: "bigint",
			object: "date"
		};
		const $ZodCheckLessThan = /*@__PURE__*/ $constructor("$ZodCheckLessThan", (inst, def) => {
			$ZodCheck.init(inst, def);
			const origin = numericOriginMap[typeof def.value];
			inst._zod.check = (payload) => {
				if (def.inclusive ? payload.value <= def.value : payload.value < def.value) return;
				payload.issues.push({
					origin: numericOriginMap[typeof payload.value] ?? origin,
					code: "too_big",
					maximum: typeof def.value === "object" ? def.value.getTime() : def.value,
					input: payload.value,
					inclusive: def.inclusive,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckGreaterThan = /*@__PURE__*/ $constructor("$ZodCheckGreaterThan", (inst, def) => {
			$ZodCheck.init(inst, def);
			const origin = numericOriginMap[typeof def.value];
			inst._zod.check = (payload) => {
				if (def.inclusive ? payload.value >= def.value : payload.value > def.value) return;
				payload.issues.push({
					origin: numericOriginMap[typeof payload.value] ?? origin,
					code: "too_small",
					minimum: typeof def.value === "object" ? def.value.getTime() : def.value,
					input: payload.value,
					inclusive: def.inclusive,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckMultipleOf = /*@__PURE__*/ $constructor("$ZodCheckMultipleOf", (inst, def) => {
			$ZodCheck.init(inst, def);
			inst._zod.check = (payload) => {
				if (typeof payload.value !== typeof def.value) throw new Error("Cannot mix number and bigint in multiple_of check.");
				if (typeof payload.value === "bigint" ? def.value !== BigInt(0) && payload.value % def.value === BigInt(0) : floatSafeRemainder(payload.value, def.value) === 0) return;
				payload.issues.push({
					origin: typeof payload.value,
					code: "not_multiple_of",
					divisor: def.value,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckNumberFormat = /*@__PURE__*/ $constructor("$ZodCheckNumberFormat", (inst, def) => {
			$ZodCheck.init(inst, def);
			def.format = def.format || "float64";
			const isInt = def.format?.includes("int");
			const origin = isInt ? "int" : "number";
			const [minimum, maximum] = NUMBER_FORMAT_RANGES[def.format];
			inst._zod.check = (payload) => {
				const input = payload.value;
				if (isInt) {
					if (!Number.isInteger(input)) {
						payload.issues.push({
							expected: origin,
							format: def.format,
							code: "invalid_type",
							continue: false,
							input,
							inst
						});
						return;
					}
					if (!Number.isSafeInteger(input)) {
						if (input > 0) payload.issues.push({
							input,
							code: "too_big",
							maximum: Number.MAX_SAFE_INTEGER,
							note: "Integers must be within the safe integer range.",
							inst,
							origin,
							inclusive: true,
							continue: !def.abort
						});
						else payload.issues.push({
							input,
							code: "too_small",
							minimum: Number.MIN_SAFE_INTEGER,
							note: "Integers must be within the safe integer range.",
							inst,
							origin,
							inclusive: true,
							continue: !def.abort
						});
						return;
					}
				}
				if (input < minimum) payload.issues.push({
					origin: "number",
					input,
					code: "too_small",
					minimum,
					inclusive: true,
					inst,
					continue: !def.abort
				});
				if (input > maximum) payload.issues.push({
					origin: "number",
					input,
					code: "too_big",
					maximum,
					inclusive: true,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckMaxLength = /*@__PURE__*/ $constructor("$ZodCheckMaxLength", (inst, def) => {
			var _a;
			$ZodCheck.init(inst, def);
			(_a = inst._zod.def).when ?? (_a.when = _whenHasLength);
			inst._zod.check = (payload) => {
				const input = payload.value;
				const units = input.length;
				if ((typeof input === "string" && units > def.maximum ? codePointLength(input) : units) <= def.maximum) return;
				const origin = getLengthableOrigin(input);
				payload.issues.push({
					origin,
					code: "too_big",
					maximum: def.maximum,
					inclusive: true,
					input,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckMinLength = /*@__PURE__*/ $constructor("$ZodCheckMinLength", (inst, def) => {
			var _a;
			$ZodCheck.init(inst, def);
			(_a = inst._zod.def).when ?? (_a.when = _whenHasLength);
			inst._zod.check = (payload) => {
				const input = payload.value;
				const units = input.length;
				if ((typeof input === "string" && units >= def.minimum && units < def.minimum * 2 ? codePointLength(input) : units) >= def.minimum) return;
				const origin = getLengthableOrigin(input);
				payload.issues.push({
					origin,
					code: "too_small",
					minimum: def.minimum,
					inclusive: true,
					input,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckLengthEquals = /*@__PURE__*/ $constructor("$ZodCheckLengthEquals", (inst, def) => {
			var _a;
			$ZodCheck.init(inst, def);
			(_a = inst._zod.def).when ?? (_a.when = _whenHasLength);
			inst._zod.check = (payload) => {
				const input = payload.value;
				const units = input.length;
				const length = typeof input === "string" && units >= def.length && units <= def.length * 2 ? codePointLength(input) : units;
				if (length === def.length) return;
				const origin = getLengthableOrigin(input);
				const tooBig = length > def.length;
				payload.issues.push({
					origin,
					...tooBig ? {
						code: "too_big",
						maximum: def.length
					} : {
						code: "too_small",
						minimum: def.length
					},
					inclusive: true,
					exact: true,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckStringFormat = /*@__PURE__*/ $constructor("$ZodCheckStringFormat", (inst, def) => {
			var _a, _b;
			$ZodCheck.init(inst, def);
			if (def.pattern) (_a = inst._zod).check ?? (_a.check = (payload) => {
				def.pattern.lastIndex = 0;
				if (def.pattern.test(payload.value)) return;
				payload.issues.push({
					origin: "string",
					code: "invalid_format",
					format: def.format,
					input: payload.value,
					...def.pattern ? { pattern: def.pattern.toString() } : {},
					inst,
					continue: !def.abort
				});
			});
			else (_b = inst._zod).check ?? (_b.check = () => {});
		});
		const $ZodCheckRegex = /*@__PURE__*/ $constructor("$ZodCheckRegex", (inst, def) => {
			$ZodCheckStringFormat.init(inst, def);
			inst._zod.check = (payload) => {
				def.pattern.lastIndex = 0;
				if (def.pattern.test(payload.value)) return;
				payload.issues.push({
					origin: "string",
					code: "invalid_format",
					format: "regex",
					input: payload.value,
					pattern: def.pattern.toString(),
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckLowerCase = /*@__PURE__*/ $constructor("$ZodCheckLowerCase", (inst, def) => {
			def.pattern ?? (def.pattern = lowercase);
			$ZodCheckStringFormat.init(inst, def);
		});
		const $ZodCheckUpperCase = /*@__PURE__*/ $constructor("$ZodCheckUpperCase", (inst, def) => {
			def.pattern ?? (def.pattern = uppercase);
			$ZodCheckStringFormat.init(inst, def);
		});
		const $ZodCheckIncludes = /*@__PURE__*/ $constructor("$ZodCheckIncludes", (inst, def) => {
			$ZodCheck.init(inst, def);
			const escapedRegex = escapeRegex(def.includes);
			def.pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position},}${escapedRegex}` : escapedRegex);
			inst._zod.check = (payload) => {
				if (payload.value.includes(def.includes, def.position)) return;
				payload.issues.push({
					origin: "string",
					code: "invalid_format",
					format: "includes",
					includes: def.includes,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckStartsWith = /*@__PURE__*/ $constructor("$ZodCheckStartsWith", (inst, def) => {
			$ZodCheck.init(inst, def);
			const pattern = new RegExp(`^${escapeRegex(def.prefix)}.*`);
			def.pattern ?? (def.pattern = pattern);
			inst._zod.check = (payload) => {
				if (payload.value.startsWith(def.prefix)) return;
				payload.issues.push({
					origin: "string",
					code: "invalid_format",
					format: "starts_with",
					prefix: def.prefix,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckEndsWith = /*@__PURE__*/ $constructor("$ZodCheckEndsWith", (inst, def) => {
			$ZodCheck.init(inst, def);
			const pattern = new RegExp(`.*${escapeRegex(def.suffix)}$`);
			def.pattern ?? (def.pattern = pattern);
			inst._zod.check = (payload) => {
				if (payload.value.endsWith(def.suffix)) return;
				payload.issues.push({
					origin: "string",
					code: "invalid_format",
					format: "ends_with",
					suffix: def.suffix,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckOverwrite = /*@__PURE__*/ $constructor("$ZodCheckOverwrite", (inst, def) => {
			$ZodCheck.init(inst, def);
			inst._zod.check = (payload) => {
				payload.value = def.tx(payload.value);
			};
		});
		//#endregion
		//#region node_modules/zod/v4/core/doc.js
		var Doc = class {
			constructor(args = [], closed = {}) {
				this.content = [];
				this.indent = 0;
				this.args = args;
				this.closed = closed;
			}
			indented(fn) {
				this.indent += 1;
				try {
					fn(this);
				} finally {
					this.indent -= 1;
				}
			}
			write(arg) {
				if (typeof arg === "function") {
					arg(this, { execution: "sync" });
					arg(this, { execution: "async" });
					return;
				}
				const lines = arg.split("\n").filter((x) => x);
				const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
				const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
				for (const line of dedented) this.content.push(line);
			}
			compile() {
				const F = Function;
				const content = this?.content ?? [``];
				return new F(...Object.keys(this.closed), `return function (${this.args.join(", ")}) {\n${content.join("\n")}\n};`)(...Object.values(this.closed));
			}
		};
		//#endregion
		//#region node_modules/zod/v4/core/versions.js
		const version = {
			major: 4,
			minor: 6,
			patch: 7
		};
		//#endregion
		//#region node_modules/zod/v4/core/schemas.js
		const $ZodType = /*@__PURE__*/ $constructor("$ZodType", (inst, def) => {
			var _a;
			inst ?? (inst = {});
			inst._zod.def = def;
			inst._zod.bag = inst._zod.bag || {};
			inst._zod.version = version;
			const defChecks = inst._zod.def.checks;
			const checks = inst._zod.traits.has("$ZodCheck") ? [inst, ...defChecks ?? []] : defChecks?.length ? [...defChecks] : [];
			for (const ch of checks) for (const fn of ch._zod.onattach) fn(inst);
			if (checks.length === 0) {
				(_a = inst._zod).deferred ?? (_a.deferred = []);
				inst._zod.deferred?.push(() => {
					inst._zod.run = inst._zod.parse;
				});
			} else {
				const runChecks = (payload, checks, ctx) => {
					if (payload.memo) return payload;
					let isAborted = aborted(payload);
					let asyncResult;
					for (const ch of checks) {
						if (ch._zod.def.when) {
							if (explicitlyAborted(payload)) continue;
							if (!ch._zod.def.when(payload)) continue;
						} else if (isAborted) continue;
						const currLen = payload.issues.length;
						const _ = ch._zod.check(payload);
						if (_ instanceof Promise && ctx?.async === false) throw new $ZodAsyncError();
						if (asyncResult || _ instanceof Promise) asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
							await _;
							if (payload.issues.length === currLen) return;
							attachSchema(payload.issues, currLen, inst);
							if (!isAborted) isAborted = aborted(payload, currLen);
						});
						else {
							if (payload.issues.length === currLen) continue;
							attachSchema(payload.issues, currLen, inst);
							if (!isAborted) isAborted = aborted(payload, currLen);
						}
					}
					if (asyncResult) return asyncResult.then(() => {
						return payload;
					});
					return payload;
				};
				const handleCanaryResult = (canary, payload, ctx) => {
					if (aborted(canary)) {
						canary.aborted = true;
						return canary;
					}
					const checkResult = runChecks(payload, checks, ctx);
					if (checkResult instanceof Promise) {
						if (ctx.async === false) throw new $ZodAsyncError();
						return checkResult.then((checkResult) => inst._zod.parse(checkResult, ctx));
					}
					return inst._zod.parse(checkResult, ctx);
				};
				inst._zod.run = (payload, ctx) => {
					if (ctx.skipChecks) return inst._zod.parse(payload, ctx);
					if (ctx.direction === "backward") {
						const canary = inst._zod.parse({
							value: payload.value,
							issues: []
						}, {
							...ctx,
							skipChecks: true
						});
						if (canary instanceof Promise) return canary.then((canary) => {
							return handleCanaryResult(canary, payload, ctx);
						});
						return handleCanaryResult(canary, payload, ctx);
					}
					const result = inst._zod.parse(payload, ctx);
					if (result instanceof Promise) {
						if (ctx.async === false) throw new $ZodAsyncError();
						return result.then((result) => runChecks(result, checks, ctx));
					}
					return runChecks(result, checks, ctx);
				};
			}
		}, {
			get "~standard"() {
				return hide(this, "~standard", standardProps(this));
			},
			set "~standard"(value) {
				own(this, "~standard", value);
			}
		});
		/** The Standard Schema surface for `inst`. Shared so wrappers can extend it without forcing it. */
		const toStandardResult = (r, ctx) => r.issues.length ? { issues: r.issues.map((iss) => finalizeIssue(iss, ctx, config())) } : { value: r.value };
		async function validateAsync(inst, value) {
			const ctx = { async: true };
			return toStandardResult(await inst._zod.run({
				value,
				issues: []
			}, ctx), ctx);
		}
		function standardProps(inst) {
			return {
				validate: (value) => {
					const ctx = { async: false };
					try {
						const r = inst._zod.run({
							value,
							issues: []
						}, ctx);
						if (!(r instanceof Promise)) return toStandardResult(r, ctx);
					} catch (_) {}
					return validateAsync(inst, value);
				},
				vendor: "zod",
				version: 1
			};
		}
		const $ZodString = /*@__PURE__*/ $constructor("$ZodString", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.pattern = def.pattern ?? anyString;
			inst._zod.parse = (payload, _) => {
				if (def.coerce) try {
					payload.value = String(payload.value);
				} catch (_) {}
				if (typeof payload.value === "string") return payload;
				payload.issues.push({
					expected: "string",
					code: "invalid_type",
					input: payload.value,
					inst
				});
				return payload;
			};
		});
		const $ZodStringFormat = /*@__PURE__*/ $constructor("$ZodStringFormat", (inst, def) => {
			$ZodCheckStringFormat.init(inst, def);
			$ZodString.init(inst, def);
		});
		const $ZodGUID = /*@__PURE__*/ $constructor("$ZodGUID", (inst, def) => {
			def.pattern ?? (def.pattern = guid);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodUUID = /*@__PURE__*/ $constructor("$ZodUUID", (inst, def) => {
			if (def.version) {
				const v = {
					v1: 1,
					v2: 2,
					v3: 3,
					v4: 4,
					v5: 5,
					v6: 6,
					v7: 7,
					v8: 8
				}[def.version];
				if (v === void 0) throw new Error(`Invalid UUID version: "${def.version}"`);
				def.pattern ?? (def.pattern = uuid(v));
			} else def.pattern ?? (def.pattern = uuid());
			$ZodStringFormat.init(inst, def);
		});
		const $ZodEmail = /*@__PURE__*/ $constructor("$ZodEmail", (inst, def) => {
			def.pattern ?? (def.pattern = email);
			$ZodStringFormat.init(inst, def);
		});
		function canParseURL(input) {
			try {
				if (typeof URL !== "undefined" && typeof URL.canParse === "function") return URL.canParse(input);
				new URL(input);
				return true;
			} catch {
				return false;
			}
		}
		function validateURL(trimmed, def) {
			if (!("normalize" in def) && !("hostname" in def) && !("protocol" in def)) return canParseURL(trimmed) || 2;
			return parseURLObject(trimmed, def);
		}
		/** Parses a URL while preserving the non-normalizing HTTP guard. */
		function parseURLObject(trimmed, def) {
			if (!def.normalize && def.protocol?.source === httpProtocol.source && !/^https?:\/\//i.test(trimmed)) return 1;
			try {
				if (typeof URL !== "undefined") {
					const URLStatic = URL;
					if (typeof URLStatic.parse === "function") return URLStatic.parse(trimmed) ?? 2;
				}
				return new URL(trimmed);
			} catch {
				return 2;
			}
		}
		const asciiTabOrNewline = /[\t\n\r]/g;
		/** The URL parser deletes every ASCII tab, LF and CR from its input before it parses, so `new URL("https://exa\nmple.com")` reports on `example.com`. Applying the same deletion to the returned value closes the half of that divergence which can move the host; the parser's other rewrite, stripping C0 controls at the edges, cannot. */
		function stripTabAndNewline(value) {
			return value.replace(asciiTabOrNewline, "");
		}
		function urlHostnameOk(url, hostname) {
			hostname.lastIndex = 0;
			return hostname.test(url.hostname);
		}
		function urlProtocolOk(url, protocol) {
			protocol.lastIndex = 0;
			return protocol.test(url.protocol.endsWith(":") ? url.protocol.slice(0, -1) : url.protocol);
		}
		const $ZodURL = /*@__PURE__*/ $constructor("$ZodURL", (inst, def) => {
			$ZodStringFormat.init(inst, def);
			inst._zod.check = (payload) => {
				try {
					const trimmed = payload.value.trim();
					const url = validateURL(trimmed, def);
					if (url === 1) {
						payload.issues.push({
							code: "invalid_format",
							format: "url",
							note: "Invalid URL format",
							input: payload.value,
							inst,
							continue: !def.abort
						});
						return;
					}
					if (url === 2) {
						payload.issues.push({
							code: "invalid_format",
							format: "url",
							input: payload.value,
							inst,
							continue: !def.abort
						});
						return;
					}
					if (url === true) {
						payload.value = stripTabAndNewline(trimmed);
						return;
					}
					if (def.hostname && !urlHostnameOk(url, def.hostname)) payload.issues.push({
						code: "invalid_format",
						format: "url",
						note: "Invalid hostname",
						pattern: def.hostname.source,
						input: payload.value,
						inst,
						continue: !def.abort
					});
					if (def.protocol && !urlProtocolOk(url, def.protocol)) payload.issues.push({
						code: "invalid_format",
						format: "url",
						note: "Invalid protocol",
						pattern: def.protocol.source,
						input: payload.value,
						inst,
						continue: !def.abort
					});
					payload.value = def.normalize ? url.href : stripTabAndNewline(trimmed);
					return;
				} catch (_) {
					payload.issues.push({
						code: "invalid_format",
						format: "url",
						input: payload.value,
						inst,
						continue: !def.abort
					});
				}
			};
		});
		const $ZodEmoji = /*@__PURE__*/ $constructor("$ZodEmoji", (inst, def) => {
			def.pattern ?? (def.pattern = emoji());
			$ZodStringFormat.init(inst, def);
		});
		const $ZodNanoID = /*@__PURE__*/ $constructor("$ZodNanoID", (inst, def) => {
			if (def.length !== void 0 && (!Number.isInteger(def.length) || def.length < 1)) throw new Error(`Invalid nanoid length: ${def.length}`);
			def.pattern ?? (def.pattern = def.length === void 0 ? nanoid : nanoidOfLength(def.length));
			$ZodStringFormat.init(inst, def);
		});
		/**
		* @deprecated CUID v1 is deprecated by its authors due to information leakage
		* (timestamps embedded in the id). Use {@link $ZodCUID2} instead.
		* See https://github.com/paralleldrive/cuid.
		*/
		const $ZodCUID = /*@__PURE__*/ $constructor("$ZodCUID", (inst, def) => {
			def.pattern ?? (def.pattern = cuid);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodCUID2 = /*@__PURE__*/ $constructor("$ZodCUID2", (inst, def) => {
			def.pattern ?? (def.pattern = cuid2);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodULID = /*@__PURE__*/ $constructor("$ZodULID", (inst, def) => {
			def.pattern ?? (def.pattern = ulid);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodXID = /*@__PURE__*/ $constructor("$ZodXID", (inst, def) => {
			def.pattern ?? (def.pattern = xid);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodKSUID = /*@__PURE__*/ $constructor("$ZodKSUID", (inst, def) => {
			def.pattern ?? (def.pattern = ksuid);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodISODateTime = /*@__PURE__*/ $constructor("$ZodISODateTime", (inst, def) => {
			def.pattern ?? (def.pattern = datetime(def));
			$ZodStringFormat.init(inst, def);
		});
		const $ZodISODate = /*@__PURE__*/ $constructor("$ZodISODate", (inst, def) => {
			def.pattern ?? (def.pattern = date);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodISOTime = /*@__PURE__*/ $constructor("$ZodISOTime", (inst, def) => {
			def.pattern ?? (def.pattern = time(def));
			$ZodStringFormat.init(inst, def);
		});
		const $ZodISODuration = /*@__PURE__*/ $constructor("$ZodISODuration", (inst, def) => {
			def.pattern ?? (def.pattern = duration);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodIPv4 = /*@__PURE__*/ $constructor("$ZodIPv4", (inst, def) => {
			def.pattern ?? (def.pattern = ipv4);
			$ZodStringFormat.init(inst, def);
		});
		/** An IPv6 address is written with hex digits, colons and dots, and nothing else. The guard is what makes the check below an IPv6 check: `new URL("http://[...]")` parses an authority, not an address, so `@` and `\` re-delimit it and `"::@1\\"` validates against the host `0.0.0.1`. The URL parser also deletes ASCII tab, LF and CR rather than failing, which is how `"::1\n"` validated as `::1`. */
		const ipv6Alphabet = /^[0-9a-fA-F:.]+$/;
		function isValidIPv6(value) {
			if (!ipv6Alphabet.test(value)) return false;
			return canParseURL(`http://[${value}]`);
		}
		const $ZodIPv6 = /*@__PURE__*/ $constructor("$ZodIPv6", (inst, def) => {
			def.pattern ?? (def.pattern = ipv6);
			$ZodStringFormat.init(inst, def);
			inst._zod.check = (payload) => {
				if (!isValidIPv6(payload.value)) payload.issues.push({
					code: "invalid_format",
					format: "ipv6",
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCIDRv4 = /*@__PURE__*/ $constructor("$ZodCIDRv4", (inst, def) => {
			def.pattern ?? (def.pattern = cidrv4);
			$ZodStringFormat.init(inst, def);
		});
		function isValidCIDRv6(value) {
			const parts = value.split("/");
			if (parts.length !== 2) return false;
			const [address, prefix] = parts;
			if (!prefix) return false;
			const prefixNum = Number(prefix);
			if (`${prefixNum}` !== prefix) return false;
			if (prefixNum < 0 || prefixNum > 128) return false;
			return isValidIPv6(address);
		}
		const $ZodCIDRv6 = /*@__PURE__*/ $constructor("$ZodCIDRv6", (inst, def) => {
			def.pattern ?? (def.pattern = cidrv6);
			$ZodStringFormat.init(inst, def);
			inst._zod.check = (payload) => {
				if (!isValidCIDRv6(payload.value)) payload.issues.push({
					code: "invalid_format",
					format: "cidrv6",
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		function isValidBase64(data) {
			if (data === "") return true;
			if (/\s/.test(data)) return false;
			if (data.length % 4 !== 0) return false;
			try {
				atob(data);
				return true;
			} catch {
				return false;
			}
		}
		const base64Charset = /^[0-9a-zA-Z+/]*={0,2}$/;
		const $ZodBase64 = /*@__PURE__*/ $constructor("$ZodBase64", (inst, def) => {
			def.pattern ?? (def.pattern = base64Charset);
			$ZodStringFormat.init(inst, def);
			inst._zod.check = (payload) => {
				if (isValidBase64(payload.value)) return;
				payload.issues.push({
					code: "invalid_format",
					format: "base64",
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const base64urlCharset = /^[A-Za-z0-9_-]*$/;
		function isValidBase64URL(data) {
			if (!base64urlCharset.test(data)) return false;
			const base64 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/");
			return isValidBase64(base64.padEnd(Math.ceil(base64.length / 4) * 4, "="));
		}
		const $ZodBase64URL = /*@__PURE__*/ $constructor("$ZodBase64URL", (inst, def) => {
			def.pattern ?? (def.pattern = base64urlCharset);
			$ZodStringFormat.init(inst, def);
			inst._zod.check = (payload) => {
				if (isValidBase64URL(payload.value)) return;
				payload.issues.push({
					code: "invalid_format",
					format: "base64url",
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodE164 = /*@__PURE__*/ $constructor("$ZodE164", (inst, def) => {
			def.pattern ?? (def.pattern = e164);
			$ZodStringFormat.init(inst, def);
		});
		function isValidJWT(token, algorithm = null) {
			try {
				const tokensParts = token.split(".");
				if (tokensParts.length !== 3) return false;
				const [header] = tokensParts;
				if (!header) return false;
				const parsedHeader = JSON.parse(atob(header));
				if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT") return false;
				if (!parsedHeader.alg) return false;
				if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm)) return false;
				return true;
			} catch {
				return false;
			}
		}
		const $ZodJWT = /*@__PURE__*/ $constructor("$ZodJWT", (inst, def) => {
			$ZodStringFormat.init(inst, def);
			inst._zod.check = (payload) => {
				if (isValidJWT(payload.value, def.alg)) return;
				payload.issues.push({
					code: "invalid_format",
					format: "jwt",
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodNumber = /*@__PURE__*/ $constructor("$ZodNumber", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.pattern = number$1;
			inst._zod.parse = (payload, _ctx) => {
				if (def.coerce) try {
					payload.value = Number(payload.value);
				} catch (_) {}
				const input = payload.value;
				if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) return payload;
				const received = typeof input === "number" ? Number.isNaN(input) ? "NaN" : !Number.isFinite(input) ? String(input) : void 0 : void 0;
				payload.issues.push({
					expected: "number",
					code: "invalid_type",
					input,
					inst,
					...received ? { received } : {}
				});
				return payload;
			};
		});
		const $ZodNumberFormat = /*@__PURE__*/ $constructor("$ZodNumberFormat", (inst, def) => {
			$ZodCheckNumberFormat.init(inst, def);
			$ZodNumber.init(inst, def);
		});
		const $ZodBoolean = /*@__PURE__*/ $constructor("$ZodBoolean", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.pattern = boolean$1;
			inst._zod.parse = (payload, _ctx) => {
				if (def.coerce) try {
					payload.value = Boolean(payload.value);
				} catch (_) {}
				const input = payload.value;
				if (typeof input === "boolean") return payload;
				payload.issues.push({
					expected: "boolean",
					code: "invalid_type",
					input,
					inst
				});
				return payload;
			};
		});
		const $ZodUnknown = /*@__PURE__*/ $constructor("$ZodUnknown", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.parse = (payload) => payload;
		});
		const $ZodNever = /*@__PURE__*/ $constructor("$ZodNever", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.parse = (payload, _ctx) => {
				payload.issues.push({
					expected: "never",
					code: "invalid_type",
					input: payload.value,
					inst
				});
				return payload;
			};
		});
		function capSize(inst, size) {
			const caps = sizeCaps(inst._zod.def.checks);
			if (!caps.length) return;
			const cap = Math.min(...caps.map((c) => c[0]));
			const parse = inst._zod.parse;
			inst._zod.parse = (payload, ctx) => {
				const n = size(payload.value);
				if (n > cap && !ctx?.skipChecks && ctx?.direction !== "backward") {
					for (const [max, ch] of sizeCaps(inst._zod.def.checks)) if (n > max && ch._zod.def.when(payload)) {
						const start = payload.issues.length;
						ch._zod.check(payload);
						payload.issues[start].continue = false;
						attachSchema(payload.issues, start, inst);
						return payload;
					}
				}
				return parse(payload, ctx);
			};
		}
		const arraySize = (input) => Array.isArray(input) ? input.length : -1;
		function handleArrayResult(result, final, index) {
			if (result.issues.length) final.issues.push(...prefixIssues(index, result.issues));
			final.value[index] = result.value;
		}
		const $ZodArray = /*@__PURE__*/ $constructor("$ZodArray", (inst, def) => {
			$ZodType.init(inst, def);
			const memo = globalConfig.memoizer;
			memo?.attach(inst);
			inst._zod.parse = (payload, ctx) => {
				const input = payload.value;
				if (!Array.isArray(input)) {
					payload.issues.push({
						expected: "array",
						code: "invalid_type",
						input,
						inst
					});
					return payload;
				}
				payload.value = memo ? memo.alloc(inst, payload, Array(input.length), ctx) : Array(input.length);
				const proms = [];
				const abortEarly = ctx?.abortEarly;
				for (let i = 0; i < input.length; i++) {
					const item = input[i];
					const result = def.element._zod.run({
						value: item,
						issues: []
					}, ctx);
					if (result instanceof Promise) proms.push(result.then((result) => handleArrayResult(result, payload, i)));
					else {
						handleArrayResult(result, payload, i);
						if (abortEarly && result.issues.length !== 0 && aborted(result)) break;
					}
				}
				if (proms.length) return Promise.all(proms).then(() => payload);
				return payload;
			};
			capSize(inst, arraySize);
		});
		function handlePropertyResult(result, final, key, input, optin, optout) {
			const isPresent = key in input;
			const isOptionalOut = optout === "optional";
			if (!isPresent && isOptionalOut && optin === "optional") return;
			if (result.issues.length) {
				if (optin !== void 0 && isOptionalOut && !isPresent) return;
				final.issues.push(...prefixIssues(key, result.issues));
			}
			if (!isPresent && optin === void 0) {
				if (!result.issues.length) final.issues.push({
					code: "invalid_type",
					expected: "nonoptional",
					input: void 0,
					path: [key]
				});
				return;
			}
			if (result.value === void 0) {
				if (isPresent || optin === "defaulted" && !isOptionalOut) final.value[key] = void 0;
			} else final.value[key] = result.value;
		}
		const NO_SYMBOL_KEYS = [];
		function normalizeDef(def) {
			const keys = Object.keys(def.shape);
			const ownSymbols = Object.getOwnPropertySymbols(def.shape);
			const symbolKeys = ownSymbols.length ? ownSymbols : NO_SYMBOL_KEYS;
			const allKeys = symbolKeys.length ? [...keys, ...symbolKeys] : keys;
			for (const k of allKeys) if (!def.shape?.[k]?._zod?.traits?.has("$ZodType")) throw new Error(`Invalid element at key "${String(k)}": expected a Zod schema`);
			const okeys = optionalKeys(def.shape);
			return {
				...def,
				allKeys,
				symbolKeys,
				keySet: new Set(keys),
				numKeys: keys.length,
				optionalKeys: new Set(okeys)
			};
		}
		function handleCatchall(proms, input, payload, ctx, def, inst, abortEarly) {
			const unrecognized = [];
			const keySet = def.keySet;
			const _catchall = def.catchall._zod;
			const t = _catchall.def.type;
			const optin = _catchall.optin;
			const optout = _catchall.optout;
			let seen = 0;
			for (const key in input) {
				if (abortEarly && payload.issues.length !== seen) {
					if (aborted(payload, seen)) break;
					seen = payload.issues.length;
				}
				if (keySet.has(key)) continue;
				if (key === "__proto__") {
					if (t === "never") unrecognized.push(key);
					continue;
				}
				if (t === "never") {
					unrecognized.push(key);
					continue;
				}
				const r = _catchall.run({
					value: input[key],
					issues: []
				}, ctx);
				if (r instanceof Promise) proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, optin, optout)));
				else handlePropertyResult(r, payload, key, input, optin, optout);
			}
			if (unrecognized.length) payload.issues.push({
				code: "unrecognized_keys",
				keys: unrecognized,
				input,
				inst,
				continue: true
			});
			if (!proms.length) return payload;
			return Promise.all(proms).then(() => {
				return payload;
			});
		}
		const $ZodObject = /*@__PURE__*/ $constructor("$ZodObject", (inst, def) => {
			$ZodType.init(inst, def);
			const desc = Object.getOwnPropertyDescriptor(def, "shape");
			const sh = desc?.get ? desc.get.raw : def.shape ?? {};
			if (sh) {
				const get = () => {
					const newSh = { ...sh };
					Object.defineProperty(def, "shape", { value: newSh });
					get.raw = newSh;
					return newSh;
				};
				get.raw = sh;
				Object.defineProperty(def, "shape", { get });
			}
			const _normalized = cached(() => normalizeDef(def));
			defineLazyInternal(inst, "propValues", (zod) => {
				const shape = zod.def.shape;
				const propValues = {};
				for (const key in shape) {
					const field = shape[key]._zod;
					if (field.values) {
						if (!Object.prototype.hasOwnProperty.call(propValues, key)) assignProp(propValues, key, /* @__PURE__ */ new Set());
						for (const v of field.values) propValues[key].add(v);
						if (field.optin !== void 0) propValues[key].add(void 0);
					}
				}
				return propValues;
			});
			const isObject$1 = isObject;
			const catchall = def.catchall;
			let value;
			const memo = globalConfig.memoizer;
			memo?.attach(inst);
			inst._zod.parse = (payload, ctx) => {
				value ?? (value = _normalized.value);
				const input = payload.value;
				if (!isObject$1(input)) {
					payload.issues.push({
						expected: "object",
						code: "invalid_type",
						input,
						inst
					});
					return payload;
				}
				payload.value = memo ? memo.alloc(inst, payload, {}, ctx) : {};
				const proms = [];
				const shape = value.shape;
				const abortEarly = ctx?.abortEarly;
				let seen = payload.issues.length;
				for (const key of value.allKeys) {
					if (abortEarly && payload.issues.length !== seen) {
						if (aborted(payload, seen)) break;
						seen = payload.issues.length;
					}
					if (key === "__proto__") continue;
					const el = shape[key];
					const optin = el._zod.optin;
					const optout = el._zod.optout;
					const r = el._zod.run({
						value: input[key],
						issues: []
					}, ctx);
					if (r instanceof Promise) proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, optin, optout)));
					else handlePropertyResult(r, payload, key, input, optin, optout);
				}
				if (!catchall) return proms.length ? Promise.all(proms).then(() => payload) : payload;
				return handleCatchall(proms, input, payload, ctx, _normalized.value, inst, abortEarly === true);
			};
		});
		const $ZodObjectJIT = /*@__PURE__*/ $constructor("$ZodObjectJIT", (inst, def) => {
			$ZodObject.init(inst, def);
			const superParse = inst._zod.parse;
			const _normalized = cached(() => normalizeDef(def));
			const memo = globalConfig.memoizer;
			const generateFastpass = (shape) => {
				const normalized = _normalized.value;
				const syms = normalized.symbolKeys;
				const doc = new Doc(["payload", "ctx"], {
					shape,
					inst,
					memo,
					syms
				});
				const parseStr = (k) => `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
				const prefixStr = (id, k) => `
          let ${id}_ab = false;
          for (let i = 0; i < ${id}.issues.length; i++) {
            const iss = ${id}.issues[i];
            iss.path = iss.path ? [${k}, ...iss.path] : [${k}];
            payload.issues.push(iss);
            if (iss.continue !== true) ${id}_ab = true;
          }
          if (${id}_ab && ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }`;
				doc.write(`const input = payload.value;`);
				const ids = Object.create(null);
				let counter = 0;
				for (const key of normalized.allKeys) ids[key] = `key_${counter++}`;
				doc.write(memo ? `const newResult = memo.alloc(inst, payload, {}, ctx);` : `const newResult = {};`);
				for (const key of normalized.allKeys) {
					if (key === "__proto__") continue;
					const id = ids[key];
					const k = typeof key === "symbol" ? `syms[${syms.indexOf(key)}]` : esc(key);
					const isPresent = `${k} in input`;
					const schema = shape[key];
					const optin = schema?._zod?.optin;
					const isOptionalIn = optin !== void 0;
					const isOptionalOut = schema?._zod?.optout === "optional";
					doc.write(`const ${id} = ${parseStr(k)};`);
					if (isOptionalIn && isOptionalOut) {
						const assign = optin === "optional" ? `${id}_present` : `${id}.value !== undefined || ${id}_present`;
						doc.write(`
        const ${id}_present = ${isPresent};
        if (!${id}.issues.length || ${id}_present) {
          if (${id}.issues.length) {${prefixStr(id, k)}
          }

          if (${assign}) {
            newResult[${k}] = ${id}.value;
          }
        }

      `);
					} else if (!isOptionalIn) doc.write(`
        const ${id}_present = ${isPresent};
        if (${id}.issues.length) {${prefixStr(id, k)}
        }
        if (!${id}_present && !${id}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${k}]
          });
          if (ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }
        }

        if (${id}_present) {
          newResult[${k}] = ${id}.value;
        }

      `);
					else {
						doc.write(`
        if (${id}.issues.length) {${prefixStr(id, k)}
        }
      `);
						if (optin === "defaulted") doc.write(`newResult[${k}] = ${id}.value;`);
						else doc.write(`
        if (${id}.value !== undefined || ${isPresent}) {
          newResult[${k}] = ${id}.value;
        }
      `);
					}
				}
				doc.write(`payload.value = newResult;`);
				doc.write(`return payload;`);
				return doc.compile();
			};
			let fastpass;
			const isObject$2 = isObject;
			const jit = !globalConfig.jitless;
			const fastEnabled = jit && allowsEval.value;
			const catchall = def.catchall;
			let value;
			inst._zod.parse = (payload, ctx) => {
				value ?? (value = _normalized.value);
				const input = payload.value;
				if (!isObject$2(input)) {
					payload.issues.push({
						expected: "object",
						code: "invalid_type",
						input,
						inst
					});
					return payload;
				}
				if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
					if (!fastpass) fastpass = generateFastpass(def.shape);
					payload = fastpass(payload, ctx);
					if (!catchall) return payload;
					return handleCatchall([], input, payload, ctx, value, inst, ctx?.abortEarly === true);
				}
				return superParse(payload, ctx);
			};
		});
		function handleUnionResults(results, final, inst, ctx) {
			for (const result of results) if (result.issues.length === 0) {
				final.value = result.value;
				return final;
			}
			const nonaborted = results.filter((r) => !aborted(r));
			if (nonaborted.length === 1) {
				final.value = nonaborted[0].value;
				return nonaborted[0];
			}
			final.issues.push({
				code: "invalid_union",
				input: final.value,
				inst,
				errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
			});
			return final;
		}
		const $ZodUnion = /*@__PURE__*/ $constructor("$ZodUnion", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazyInternal(inst, "optin", (zod) => zod.def.options.some((o) => o._zod.optin === "defaulted") ? "defaulted" : zod.def.options.some((o) => o._zod.optin !== void 0) ? "optional" : void 0);
			defineLazyInternal(inst, "optout", (zod) => zod.def.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0);
			defineLazyInternal(inst, "values", (zod) => {
				if (zod.def.options.every((o) => o._zod.values)) return new Set(zod.def.options.flatMap((option) => Array.from(option._zod.values)));
			});
			defineLazyInternal(inst, "pattern", (zod) => {
				if (zod.def.options.every((o) => o._zod.pattern)) {
					const patterns = zod.def.options.map((o) => o._zod.pattern);
					return new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
				}
			});
			const first = def.options.length === 1 ? def.options[0]._zod.run : null;
			inst._zod.parse = (payload, ctx) => {
				if (first) return first(payload, ctx);
				let async = false;
				const results = [];
				for (const option of def.options) {
					const result = option._zod.run({
						value: payload.value,
						issues: []
					}, ctx);
					if (result instanceof Promise) {
						results.push(result);
						async = true;
					} else {
						if (result.issues.length === 0) return result;
						results.push(result);
					}
				}
				if (!async) return handleUnionResults(results, payload, inst, ctx);
				return Promise.all(results).then((results) => {
					return handleUnionResults(results, payload, inst, ctx);
				});
			};
		});
		const $ZodIntersection = /*@__PURE__*/ $constructor("$ZodIntersection", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.parse = (payload, ctx) => {
				const input = payload.value;
				const left = def.left._zod.run({
					value: input,
					issues: []
				}, ctx);
				const right = def.right._zod.run({
					value: input,
					issues: []
				}, ctx);
				if (left instanceof Promise || right instanceof Promise) return Promise.all([left, right]).then(([left, right]) => {
					return handleIntersectionResults(payload, left, right);
				});
				return handleIntersectionResults(payload, left, right);
			};
		});
		function mergeValues(a, b) {
			if (a === b) return {
				valid: true,
				data: a
			};
			if (a instanceof Date && b instanceof Date && +a === +b) return {
				valid: true,
				data: a
			};
			if (isPlainObject(a) && isPlainObject(b)) {
				const bKeys = Object.keys(b);
				const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
				const newObj = {
					...a,
					...b
				};
				if (Object.prototype.hasOwnProperty.call(newObj, "__proto__")) delete newObj.__proto__;
				for (const key of sharedKeys) {
					if (key === "__proto__") continue;
					const sharedValue = mergeValues(a[key], b[key]);
					if (!sharedValue.valid) return {
						valid: false,
						mergeErrorPath: [key, ...sharedValue.mergeErrorPath]
					};
					newObj[key] = sharedValue.data;
				}
				return {
					valid: true,
					data: newObj
				};
			}
			if (Array.isArray(a) && Array.isArray(b)) {
				if (a.length !== b.length) return {
					valid: false,
					mergeErrorPath: []
				};
				const newArray = [];
				for (let index = 0; index < a.length; index++) {
					const itemA = a[index];
					const itemB = b[index];
					const sharedValue = mergeValues(itemA, itemB);
					if (!sharedValue.valid) return {
						valid: false,
						mergeErrorPath: [index, ...sharedValue.mergeErrorPath]
					};
					newArray.push(sharedValue.data);
				}
				return {
					valid: true,
					data: newArray
				};
			}
			return {
				valid: false,
				mergeErrorPath: []
			};
		}
		function handleIntersectionResults(result, left, right) {
			const unrecKeys = /* @__PURE__ */ new Map();
			let unrecIssue;
			const keyIssues = /* @__PURE__ */ new Map();
			const collect = (iss, side) => {
				let keys;
				if (iss.code === "unrecognized_keys" && !iss.path?.length) {
					unrecIssue ?? (unrecIssue = iss);
					keys = iss.keys;
				} else if (iss.code === "invalid_key" && iss.origin === "record" && iss.path?.length === 1) {
					const k = String(iss.path[0]);
					if (!keyIssues.has(k)) keyIssues.set(k, iss);
					keys = [k];
				} else return false;
				for (const k of keys) {
					if (!unrecKeys.has(k)) unrecKeys.set(k, {});
					unrecKeys.get(k)[side] = true;
				}
				return true;
			};
			for (const iss of left.issues) if (!collect(iss, "l")) result.issues.push(iss);
			for (const iss of right.issues) if (!collect(iss, "r")) result.issues.push(iss);
			const bothKeys = [...unrecKeys].filter(([, f]) => f.l && f.r).map(([k]) => k);
			if (bothKeys.length) {
				const aggregated = unrecIssue ? bothKeys.filter((k) => unrecIssue.keys.includes(k)) : [];
				if (aggregated.length) result.issues.push({
					...unrecIssue,
					keys: aggregated
				});
				for (const k of bothKeys) if (!aggregated.includes(k) && keyIssues.has(k)) result.issues.push(keyIssues.get(k));
			}
			const merged = mergeValues(left.value, right.value);
			if (!merged.valid) {
				if (aborted(result)) return result;
				throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(merged.mergeErrorPath)}`);
			}
			result.value = merged.data;
			return result;
		}
		const $ZodEnum = /*@__PURE__*/ $constructor("$ZodEnum", (inst, def) => {
			$ZodType.init(inst, def);
			const values = getEnumValues(def.entries);
			const valuesSet = new Set(values);
			inst._zod.values = valuesSet;
			defineLazyInternal(inst, "pattern", (zod) => {
				const patternValues = getEnumValues(zod.def.entries).filter((k) => propertyKeyTypes.has(typeof k));
				return new RegExp(patternValues.length ? `^(${patternValues.map((o) => escapeRegex(o.toString())).join("|")})$` : "^[^\\s\\S]$");
			});
			inst._zod.parse = (payload, _ctx) => {
				const input = payload.value;
				if (valuesSet.has(input)) return payload;
				payload.issues.push({
					code: "invalid_value",
					values,
					input,
					inst
				});
				return payload;
			};
		});
		const $ZodLiteral = /*@__PURE__*/ $constructor("$ZodLiteral", (inst, def) => {
			$ZodType.init(inst, def);
			const values = new Set(def.values);
			inst._zod.values = values;
			defineLazyInternal(inst, "pattern", (zod) => {
				const vals = zod.def.values;
				return new RegExp(vals.length ? `^(${vals.map((o) => typeof o === "string" ? escapeRegex(o) : o ? escapeRegex(o.toString()) : String(o)).join("|")})$` : "^[^\\s\\S]$");
			});
			inst._zod.parse = (payload, _ctx) => {
				const input = payload.value;
				if (values.has(input)) return payload;
				payload.issues.push({
					code: "invalid_value",
					values: def.values,
					input,
					inst
				});
				return payload;
			};
		});
		const $ZodTransform = /*@__PURE__*/ $constructor("$ZodTransform", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.optin = "optional";
			globalConfig.memoizer?.guard(inst);
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") throw new $ZodEncodeError(inst.constructor.name);
				const _out = def.transform(payload.value, payload);
				if (ctx.async) return (_out instanceof Promise ? _out : Promise.resolve(_out)).then((output) => {
					payload.value = output;
					return payload;
				});
				if (_out instanceof Promise) throw new $ZodAsyncError();
				payload.value = _out;
				return payload;
			};
		});
		function handleOptionalResult(payload, result) {
			payload.value = result.issues.length ? void 0 : result.value;
			return payload;
		}
		const $ZodOptional = /*@__PURE__*/ $constructor("$ZodOptional", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazyInternal(inst, "optin", (zod) => zod.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional");
			inst._zod.optout = "optional";
			defineLazyInternal(inst, "values", (zod) => {
				const values = zod.def.innerType._zod.values;
				return values ? /* @__PURE__ */ new Set([...values, void 0]) : void 0;
			});
			defineLazyInternal(inst, "pattern", (zod) => {
				const pattern = zod.def.innerType._zod.pattern;
				return pattern ? new RegExp(`^(${cleanRegex(pattern.source)})?$`) : void 0;
			});
			inst._zod.parse = (payload, ctx) => {
				if (payload.value === void 0) {
					if (def.innerType._zod.optin !== "defaulted") return payload;
					const result = def.innerType._zod.run({
						value: payload.value,
						issues: []
					}, ctx);
					if (result instanceof Promise) return result.then((result) => handleOptionalResult(payload, result));
					return handleOptionalResult(payload, result);
				}
				return def.innerType._zod.run(payload, ctx);
			};
		});
		const $ZodExactOptional = /*@__PURE__*/ $constructor("$ZodExactOptional", (inst, def) => {
			$ZodOptional.init(inst, def);
			defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
			defineLazyInternal(inst, "pattern", (zod) => zod.def.innerType._zod.pattern);
			inst._zod.parse = (payload, ctx) => {
				return def.innerType._zod.run(payload, ctx);
			};
		});
		const $ZodNullable = /*@__PURE__*/ $constructor("$ZodNullable", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazyInternal(inst, "optin", (zod) => zod.def.innerType._zod.optin);
			defineLazyInternal(inst, "optout", (zod) => zod.def.innerType._zod.optout);
			defineLazyInternal(inst, "pattern", (zod) => {
				const pattern = zod.def.innerType._zod.pattern;
				return pattern ? new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : void 0;
			});
			defineLazyInternal(inst, "values", (zod) => {
				return zod.def.innerType._zod.values ? /* @__PURE__ */ new Set([...zod.def.innerType._zod.values, null]) : void 0;
			});
			inst._zod.parse = (payload, ctx) => {
				if (payload.value === null) return payload;
				return def.innerType._zod.run(payload, ctx);
			};
		});
		const $ZodDefault = /*@__PURE__*/ $constructor("$ZodDefault", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.optin = "defaulted";
			defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
				if (payload.value === void 0) {
					payload.value = def.defaultValue;
					/**
					* $ZodDefault returns the default value immediately in forward direction.
					* It doesn't pass the default value into the validator ("prefault"). There's no reason to pass the default value through validation. The validity of the default is enforced by TypeScript statically. Otherwise, it's the responsibility of the user to ensure the default is valid. In the case of pipes with divergent in/out types, you can specify the default on the `in` schema of your ZodPipe to set a "prefault" for the pipe.   */
					return payload;
				}
				const result = def.innerType._zod.run(payload, ctx);
				if (result instanceof Promise) return result.then((result) => handleDefaultResult(result, def));
				return handleDefaultResult(result, def);
			};
		});
		function handleDefaultResult(payload, def) {
			if (payload.value === void 0) payload.value = def.defaultValue;
			return payload;
		}
		const $ZodPrefault = /*@__PURE__*/ $constructor("$ZodPrefault", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.optin = "defaulted";
			defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
				if (payload.value === void 0) payload.value = def.defaultValue;
				return def.innerType._zod.run(payload, ctx);
			};
		});
		const $ZodNonOptional = /*@__PURE__*/ $constructor("$ZodNonOptional", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazyInternal(inst, "values", (zod) => {
				const v = zod.def.innerType._zod.values;
				return v ? new Set([...v].filter((x) => x !== void 0)) : void 0;
			});
			inst._zod.parse = (payload, ctx) => {
				const result = def.innerType._zod.run(payload, ctx);
				if (result instanceof Promise) return result.then((result) => handleNonOptionalResult(result, inst));
				return handleNonOptionalResult(result, inst);
			};
		});
		function handleNonOptionalResult(payload, inst) {
			if (!payload.issues.length && payload.value === void 0) payload.issues.push({
				code: "invalid_type",
				expected: "nonoptional",
				input: payload.value,
				inst
			});
			return payload;
		}
		function handleCatchResult(payload, result, def, ctx) {
			if (!result.issues.length) {
				payload.value = result.value;
				if (result.memo) payload.memo = true;
				return payload;
			}
			payload.value = def.catchValue({
				...result,
				value: payload.value,
				error: { issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config())) },
				input: payload.value
			});
			return payload;
		}
		const $ZodCatch = /*@__PURE__*/ $constructor("$ZodCatch", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazyInternal(inst, "optin", (zod) => zod.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional");
			defineLazyInternal(inst, "optout", (zod) => zod.def.innerType._zod.optout);
			defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
				const result = def.innerType._zod.run({
					value: payload.value,
					issues: []
				}, ctx);
				if (result instanceof Promise) return result.then((result) => handleCatchResult(payload, result, def, ctx));
				return handleCatchResult(payload, result, def, ctx);
			};
		});
		const $ZodPipe = /*@__PURE__*/ $constructor("$ZodPipe", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazyInternal(inst, "values", (zod) => zod.def.in._zod.values);
			defineLazyInternal(inst, "optin", (zod) => zod.def.in._zod.optin);
			defineLazyInternal(inst, "optout", (zod) => zod.def.out._zod.optout);
			defineLazyInternal(inst, "propValues", (zod) => zod.def.in._zod.propValues);
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") {
					const right = def.out._zod.run(payload, ctx);
					if (right instanceof Promise) return right.then((right) => handlePipeResult(right, def.in, ctx));
					return handlePipeResult(right, def.in, ctx);
				}
				const left = def.in._zod.run(payload, ctx);
				if (left instanceof Promise) return left.then((left) => handlePipeResult(left, def.out, ctx));
				return handlePipeResult(left, def.out, ctx);
			};
		});
		function handlePipeResult(left, next, ctx) {
			if (left.issues.some((iss) => iss.code !== "unrecognized_keys")) {
				left.aborted = true;
				return left;
			}
			return next._zod.run({
				value: left.value,
				issues: left.issues
			}, ctx);
		}
		const $ZodReadonly = /*@__PURE__*/ $constructor("$ZodReadonly", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazyInternal(inst, "propValues", (zod) => zod.def.innerType._zod.propValues);
			defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
			defineLazyInternal(inst, "optin", (zod) => zod.def.innerType?._zod?.optin);
			defineLazyInternal(inst, "optout", (zod) => zod.def.innerType?._zod?.optout);
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
				const result = def.innerType._zod.run(payload, ctx);
				if (result instanceof Promise) return result.then(handleReadonlyResult);
				return handleReadonlyResult(result);
			};
		});
		function handleReadonlyResult(payload) {
			if (!payload.memo) payload.value = Object.freeze(payload.value);
			return payload;
		}
		const $ZodCustom = /*@__PURE__*/ $constructor("$ZodCustom", (inst, def) => {
			$ZodCheck.init(inst, def);
			$ZodType.init(inst, def);
			inst._zod.parse = (payload, _) => {
				return payload;
			};
			inst._zod.check = (payload) => {
				const input = payload.value;
				const r = def.fn(input);
				if (r instanceof Promise) return r.then((r) => handleRefineResult(r, payload, input, inst));
				handleRefineResult(r, payload, input, inst);
			};
		});
		function handleRefineResult(result, payload, input, inst) {
			if (!result) {
				const _iss = {
					code: "custom",
					input,
					inst,
					path: [...inst._zod.def.path ?? []],
					continue: !inst._zod.def.abort
				};
				if (inst._zod.def.params) _iss.params = inst._zod.def.params;
				payload.issues.push(issue(_iss));
			}
		}
		//#endregion
		//#region node_modules/zod/v4/core/memoizer.js
		var $ZodCyclicError = class extends Error {
			constructor() {
				super(`Cannot parse a reference cycle that closes through a transform`);
				this.name = "ZodCyclicError";
			}
		};
		/** Keyed off the context object every schema in one parse call already shares. */
		const STATE = "~memo";
		const NO_ISSUES = [];
		function isRef(value) {
			return value !== null && typeof value === "object";
		}
		function cloneIssues(issues) {
			return issues.map((iss) => iss.path ? {
				...iss,
				path: iss.path.slice()
			} : { ...iss });
		}
		const recursive = /*@__PURE__*/ new WeakMap();
		/** What the walk established, in order of certainty: ordered so the strongest answer among children wins. */
		const NONE = 0;
		const ASSUMED = 1;
		const PROVEN = 2;
		/** Whether this schema's subtree contains a cycle, so one parse can re-enter it. */
		function isRecursive(inst, stack, resolve) {
			const cached = recursive.get(inst);
			if (cached !== void 0) return cached ? PROVEN : NONE;
			if (stack.has(inst)) return PROVEN;
			stack.add(inst);
			let result = NONE;
			const check = (child) => {
				if (result !== PROVEN && child?._zod) {
					const answer = isRecursive(child, stack, resolve);
					if (answer > result) result = answer;
				}
			};
			const shape = (sh, spread) => {
				let answer = NONE;
				for (const key of Reflect.ownKeys(sh)) {
					const desc = Object.getOwnPropertyDescriptor(sh, key);
					if (spread && !desc.enumerable) continue;
					const child = desc.get ? ASSUMED : desc.value?._zod ? isRecursive(desc.value, stack, resolve) : NONE;
					if (child > answer) answer = child;
				}
				return answer;
			};
			const merge = (answer) => {
				if (answer > result) result = answer;
			};
			const def = inst._zod.def;
			switch (def.type) {
				case "object": {
					const raw = rawShape(def);
					merge(raw ? shape(raw, true) : ASSUMED);
					check(def.catchall);
					break;
				}
				case "array":
					check(def.element);
					break;
				case "tuple":
					for (const el of def.items) check(el);
					check(def.rest);
					break;
				case "record":
				case "map":
					check(def.keyType);
					check(def.valueType);
					break;
				case "set":
					check(def.valueType);
					break;
				case "union":
					for (const el of def.options) check(el);
					break;
				case "intersection":
					check(def.left);
					check(def.right);
					break;
				case "optional":
				case "nullable":
				case "default":
				case "prefault":
				case "catch":
				case "readonly":
				case "nonoptional":
				case "promise":
				case "success":
					check(def.innerType);
					break;
				case "pipe":
					check(def.in);
					check(def.out);
					break;
				case "function":
					check(def.input);
					check(def.output);
					break;
				case "lazy": {
					const inner = def._cachedInner ?? (resolve ? inst._zod.innerType : void 0);
					merge(inner ? isRecursive(inner, stack, false) : ASSUMED);
					break;
				}
				case "template_literal":
				case "string":
				case "number":
				case "int":
				case "boolean":
				case "bigint":
				case "symbol":
				case "undefined":
				case "null":
				case "void":
				case "never":
				case "any":
				case "unknown":
				case "date":
				case "nan":
				case "enum":
				case "literal":
				case "file":
				case "transform":
				case "custom": break;
				default: for (const key in def) {
					const desc = Object.getOwnPropertyDescriptor(def, key);
					if (!desc || desc.get) continue;
					const value = desc.value;
					if (!value || typeof value !== "object") continue;
					if (value._zod) check(value);
					else if (Array.isArray(value)) for (const el of value) check(el);
				}
			}
			stack.delete(inst);
			return settle(inst, result);
		}
		/** An assumed answer must not outlive the resolution that settles it, so only a certain one is cached. */
		function settle(inst, answer) {
			if (answer !== ASSUMED) recursive.set(inst, answer === PROVEN);
			return answer;
		}
		function bucketFor(state, inst) {
			let bucket = state.buckets.get(inst);
			if (!bucket) {
				bucket = /* @__PURE__ */ new WeakMap();
				state.buckets.set(inst, bucket);
			}
			return bucket;
		}
		let handoff;
		const open = [];
		const memo = {
			alloc(_inst, payload, empty) {
				const bucket = handoff;
				if (!bucket) return empty;
				handoff = void 0;
				const entry = {
					value: empty,
					issues: null
				};
				bucket.set(payload.value, entry);
				open.push(entry);
				return empty;
			},
			guard(inst) {
				var _a;
				(_a = inst._zod).deferred ?? (_a.deferred = []);
				inst._zod.deferred.push(() => {
					const base = inst._zod.parse;
					const wrapped = (payload, ctx) => {
						if (ctx.direction !== "backward" && isBackEdge(ctx, payload.value)) throw new $ZodCyclicError();
						return base(payload, ctx);
					};
					inst._zod.parse = wrapped;
					if (inst._zod.run === base) inst._zod.run = wrapped;
				});
			},
			attach(inst) {
				var _a;
				let isRecursiveInst;
				let rechecked = false;
				let lastCtx;
				let lastBucket;
				(_a = inst._zod).deferred ?? (_a.deferred = []);
				inst._zod.deferred.push(() => {
					const base = inst._zod.parse;
					const wrapped = (payload, ctx) => {
						if (isRecursiveInst === void 0) {
							const walked = isRecursive(inst, /* @__PURE__ */ new Set(), false);
							if (walked === NONE) {
								inst._zod.parse = base;
								if (inst._zod.run === wrapped) inst._zod.run = base;
								return base(payload, ctx);
							}
							if (walked === PROVEN || rechecked) isRecursiveInst = true;
							else rechecked = true;
						}
						const input = payload.value;
						if (!isRef(input)) return base(payload, ctx);
						let state = ctx[STATE];
						if (!state) {
							state = {
								buckets: /* @__PURE__ */ new WeakMap(),
								backEdges: void 0
							};
							ctx[STATE] = state;
						}
						let bucket;
						if (lastCtx === ctx) bucket = lastBucket;
						else {
							bucket = bucketFor(state, inst);
							lastCtx = ctx;
							lastBucket = bucket;
						}
						const hit = bucket.get(input);
						if (hit) {
							payload.value = hit.value;
							if (hit.issues) {
								if (hit.issues.length) payload.issues.push(...cloneIssues(hit.issues));
							} else {
								payload.memo = true;
								state.backEdges ?? (state.backEdges = /* @__PURE__ */ new WeakSet());
								state.backEdges.add(hit.value);
							}
							return payload;
						}
						handoff = bucket;
						const depth = open.length;
						const result = base(payload, ctx);
						handoff = void 0;
						const entry = open.length > depth ? open.pop() : void 0;
						if (result instanceof Promise) return result.then((r) => {
							if (entry) entry.issues = r.issues.length ? cloneIssues(r.issues) : NO_ISSUES;
							return r;
						});
						if (entry) entry.issues = result.issues.length ? cloneIssues(result.issues) : NO_ISSUES;
						return result;
					};
					inst._zod.parse = wrapped;
					if (inst._zod.run === base) inst._zod.run = wrapped;
				});
			}
		};
		/** The memoizer that gives containers cycle support. `zod` installs it by default; `zod/mini` opts in with `config({ memoizer: memoizer() })`. */
		function memoizer() {
			return memo;
		}
		/** Whether this value is a node a back-edge resolved to before it finished. */
		function isBackEdge(ctx, value) {
			const backEdges = ctx[STATE]?.backEdges;
			return backEdges !== void 0 && isRef(value) && backEdges.has(value);
		}
		//#endregion
		//#region node_modules/zod/v4/locales/en.js
		const error = () => {
			const Sizable = {
				string: {
					unit: "characters",
					verb: "to have"
				},
				file: {
					unit: "bytes",
					verb: "to have"
				},
				array: {
					unit: "items",
					verb: "to have"
				},
				set: {
					unit: "items",
					verb: "to have"
				},
				map: {
					unit: "entries",
					verb: "to have"
				}
			};
			function getSizing(origin) {
				return Sizable[origin] ?? null;
			}
			const FormatDictionary = {
				regex: "input",
				email: "email address",
				url: "URL",
				emoji: "emoji",
				uuid: "UUID",
				uuidv4: "UUIDv4",
				uuidv6: "UUIDv6",
				nanoid: "nanoid",
				guid: "GUID",
				cuid: "cuid",
				cuid2: "cuid2",
				ulid: "ULID",
				xid: "XID",
				ksuid: "KSUID",
				datetime: "ISO datetime",
				date: "ISO date",
				time: "ISO time",
				duration: "ISO duration",
				ipv4: "IPv4 address",
				ipv6: "IPv6 address",
				mac: "MAC address",
				cidrv4: "IPv4 range",
				cidrv6: "IPv6 range",
				base64: "base64-encoded string",
				base64url: "base64url-encoded string",
				json_string: "JSON string",
				e164: "E.164 number",
				currency_code: "currency code",
				credit_card: "credit card number",
				iban: "IBAN",
				jwt: "JWT",
				template_literal: "input"
			};
			const TypeDictionary = { nan: "NaN" };
			function getTypeName(type, input) {
				if (type === "number" && typeof input === "number" && !Number.isFinite(input)) return String(input);
				return TypeDictionary[type] ?? type;
			}
			return (issue) => {
				switch (issue.code) {
					case "invalid_type": return `Invalid input: expected ${getTypeName(issue.expected)}, received ${getTypeName(parsedType(issue.input), issue.input)}`;
					case "invalid_value":
						if (issue.values.length === 1) return `Invalid input: expected ${stringifyPrimitive(issue.values[0])}`;
						return `Invalid option: expected one of ${joinValues(issue.values, "|")}`;
					case "too_big": {
						const adj = issue.exact ? "exactly " : issue.inclusive ? "<=" : "<";
						const sizing = getSizing(issue.origin);
						if (sizing) return `Too big: expected ${issue.origin ?? "value"} to have ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elements"}`;
						return `Too big: expected ${issue.origin ?? "value"} to be ${adj}${issue.maximum.toString()}`;
					}
					case "too_small": {
						const adj = issue.exact ? "exactly " : issue.inclusive ? ">=" : ">";
						const sizing = getSizing(issue.origin);
						if (sizing) return `Too small: expected ${issue.origin} to have ${adj}${issue.minimum.toString()} ${sizing.unit}`;
						return `Too small: expected ${issue.origin} to be ${adj}${issue.minimum.toString()}`;
					}
					case "invalid_format": {
						const _issue = issue;
						if (_issue.format === "starts_with") return `Invalid string: must start with "${_issue.prefix}"`;
						if (_issue.format === "ends_with") return `Invalid string: must end with "${_issue.suffix}"`;
						if (_issue.format === "includes") return `Invalid string: must include "${_issue.includes}"`;
						if (_issue.format === "regex") return `Invalid string: must match pattern ${_issue.pattern}`;
						return `Invalid ${FormatDictionary[_issue.format] ?? issue.format}`;
					}
					case "not_multiple_of": return `Invalid number: must be a multiple of ${issue.divisor}`;
					case "unrecognized_keys": return `Unrecognized key${issue.keys.length > 1 ? "s" : ""}: ${joinValues(issue.keys, ", ")}`;
					case "invalid_key": return `Invalid key in ${issue.origin}`;
					case "invalid_union":
						if (issue.options && Array.isArray(issue.options) && issue.options.length > 0) return `Invalid discriminator value. Expected ${issue.options.map((o) => `'${o}'`).join(" | ")}`;
						if (issue.inclusive === false) return "Invalid input: more than one option matched";
						return "Invalid input";
					case "invalid_element": return `Invalid value in ${issue.origin}`;
					default: return `Invalid input`;
				}
			};
		};
		function en_default() {
			return { localeError: error() };
		}
		//#endregion
		//#region node_modules/zod/v4/core/registries.js
		var _a;
		var $ZodRegistry = class {
			constructor() {
				this._map = /* @__PURE__ */ new WeakMap();
				this._idmap = /* @__PURE__ */ new Map();
			}
			add(schema, ..._meta) {
				const meta = _meta[0];
				this._map.set(schema, meta);
				if (meta && typeof meta === "object" && "id" in meta) this._idmap.set(meta.id, schema);
				return this;
			}
			clear() {
				this._map = /* @__PURE__ */ new WeakMap();
				this._idmap = /* @__PURE__ */ new Map();
				return this;
			}
			remove(schema) {
				const meta = this._map.get(schema);
				if (meta && typeof meta === "object" && "id" in meta) this._idmap.delete(meta.id);
				this._map.delete(schema);
				return this;
			}
			get(schema) {
				const p = schema._zod.parent;
				if (p) {
					const pm = { ...this.get(p) ?? {} };
					delete pm.id;
					const f = {
						...pm,
						...this._map.get(schema)
					};
					return Object.keys(f).length ? f : void 0;
				}
				return this._map.get(schema);
			}
			has(schema) {
				return this._map.has(schema);
			}
		};
		function registry() {
			return new $ZodRegistry();
		}
		(_a = globalThis).__zod_globalRegistry ?? (_a.__zod_globalRegistry = registry());
		const globalRegistry = globalThis.__zod_globalRegistry;
		//#endregion
		//#region node_modules/zod/v4/core/api.js
		function snapshotChecks(def) {
			if (def.checks) def.checks = [...def.checks];
			return def;
		}
		// @__NO_SIDE_EFFECTS__
		function _string(Class, params) {
			return new Class(snapshotChecks({
				type: "string",
				...normalizeParams(params)
			}));
		}
		// @__NO_SIDE_EFFECTS__
		function _email(Class, params) {
			return new Class({
				type: "string",
				format: "email",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _guid(Class, params) {
			return new Class({
				type: "string",
				format: "guid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _uuid(Class, params) {
			return new Class({
				type: "string",
				format: "uuid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _uuidv4(Class, params) {
			return new Class({
				type: "string",
				format: "uuid",
				check: "string_format",
				abort: false,
				version: "v4",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _uuidv6(Class, params) {
			return new Class({
				type: "string",
				format: "uuid",
				check: "string_format",
				abort: false,
				version: "v6",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _uuidv7(Class, params) {
			return new Class({
				type: "string",
				format: "uuid",
				check: "string_format",
				abort: false,
				version: "v7",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _url(Class, params) {
			return new Class({
				type: "string",
				format: "url",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _emoji(Class, params) {
			return new Class({
				type: "string",
				format: "emoji",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _nanoid(Class, params) {
			return new Class({
				type: "string",
				format: "nanoid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		/**
		* @deprecated CUID v1 is deprecated by its authors due to information leakage
		* (timestamps embedded in the id). Use {@link _cuid2} instead.
		* See https://github.com/paralleldrive/cuid.
		*/
		// @__NO_SIDE_EFFECTS__
		function _cuid(Class, params) {
			return new Class({
				type: "string",
				format: "cuid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _cuid2(Class, params) {
			return new Class({
				type: "string",
				format: "cuid2",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _ulid(Class, params) {
			return new Class({
				type: "string",
				format: "ulid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _xid(Class, params) {
			return new Class({
				type: "string",
				format: "xid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _ksuid(Class, params) {
			return new Class({
				type: "string",
				format: "ksuid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _ipv4(Class, params) {
			return new Class({
				type: "string",
				format: "ipv4",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _ipv6(Class, params) {
			return new Class({
				type: "string",
				format: "ipv6",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _cidrv4(Class, params) {
			return new Class({
				type: "string",
				format: "cidrv4",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _cidrv6(Class, params) {
			return new Class({
				type: "string",
				format: "cidrv6",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _base64(Class, params) {
			return new Class({
				type: "string",
				format: "base64",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _base64url(Class, params) {
			return new Class({
				type: "string",
				format: "base64url",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _e164(Class, params) {
			return new Class({
				type: "string",
				format: "e164",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _jwt(Class, params) {
			return new Class({
				type: "string",
				format: "jwt",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _isoDateTime(Class, params) {
			return new Class({
				type: "string",
				format: "datetime",
				check: "string_format",
				offset: false,
				local: false,
				precision: null,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _isoDate(Class, params) {
			return new Class({
				type: "string",
				format: "date",
				check: "string_format",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _isoTime(Class, params) {
			return new Class({
				type: "string",
				format: "time",
				check: "string_format",
				precision: null,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _isoDuration(Class, params) {
			return new Class({
				type: "string",
				format: "duration",
				check: "string_format",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _number(Class, params) {
			return new Class(snapshotChecks({
				type: "number",
				checks: [],
				...normalizeParams(params)
			}));
		}
		// @__NO_SIDE_EFFECTS__
		function _int(Class, params) {
			return new Class({
				type: "number",
				check: "number_format",
				abort: false,
				format: "safeint",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _boolean(Class, params) {
			return new Class({
				type: "boolean",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _unknown(Class) {
			return new Class({ type: "unknown" });
		}
		// @__NO_SIDE_EFFECTS__
		function _never(Class, params) {
			return new Class({
				type: "never",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _lt(value, params) {
			return new $ZodCheckLessThan({
				check: "less_than",
				...normalizeParams(params),
				value,
				inclusive: false
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _lte(value, params) {
			return new $ZodCheckLessThan({
				check: "less_than",
				...normalizeParams(params),
				value,
				inclusive: true
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _gt(value, params) {
			return new $ZodCheckGreaterThan({
				check: "greater_than",
				...normalizeParams(params),
				value,
				inclusive: false
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _gte(value, params) {
			return new $ZodCheckGreaterThan({
				check: "greater_than",
				...normalizeParams(params),
				value,
				inclusive: true
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _multipleOf(value, params) {
			return new $ZodCheckMultipleOf({
				check: "multiple_of",
				...normalizeParams(params),
				value
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _maxLength(maximum, params) {
			return new $ZodCheckMaxLength({
				check: "max_length",
				...normalizeParams(params),
				maximum
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _minLength(minimum, params) {
			return new $ZodCheckMinLength({
				check: "min_length",
				...normalizeParams(params),
				minimum
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _length(length, params) {
			return new $ZodCheckLengthEquals({
				check: "length_equals",
				...normalizeParams(params),
				length
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _regex(pattern, params) {
			return new $ZodCheckRegex({
				check: "string_format",
				format: "regex",
				...normalizeParams(params),
				pattern
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _lowercase(params) {
			return new $ZodCheckLowerCase({
				check: "string_format",
				format: "lowercase",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _uppercase(params) {
			return new $ZodCheckUpperCase({
				check: "string_format",
				format: "uppercase",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _includes(includes, params) {
			return new $ZodCheckIncludes({
				check: "string_format",
				format: "includes",
				...normalizeParams(params),
				includes
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _startsWith(prefix, params) {
			return new $ZodCheckStartsWith({
				check: "string_format",
				format: "starts_with",
				...normalizeParams(params),
				prefix
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _endsWith(suffix, params) {
			return new $ZodCheckEndsWith({
				check: "string_format",
				format: "ends_with",
				...normalizeParams(params),
				suffix
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _overwrite(tx) {
			return new $ZodCheckOverwrite({
				check: "overwrite",
				tx
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _normalize(form) {
			return /* @__PURE__ */ _overwrite((input) => input.normalize(form));
		}
		// @__NO_SIDE_EFFECTS__
		function _trim() {
			return /* @__PURE__ */ _overwrite((input) => input.trim());
		}
		// @__NO_SIDE_EFFECTS__
		function _toLowerCase() {
			return /* @__PURE__ */ _overwrite((input) => input.toLowerCase());
		}
		// @__NO_SIDE_EFFECTS__
		function _toUpperCase() {
			return /* @__PURE__ */ _overwrite((input) => input.toUpperCase());
		}
		// @__NO_SIDE_EFFECTS__
		function _slugify() {
			return /* @__PURE__ */ _overwrite((input) => slugify(input));
		}
		// @__NO_SIDE_EFFECTS__
		function _array(Class, element, params) {
			return new Class({
				type: "array",
				element,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _refine(Class, fn, _params) {
			return new Class({
				type: "custom",
				check: "custom",
				fn,
				...normalizeParams(_params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _superRefine(fn, params) {
			const ch = /* @__PURE__ */ _check((payload) => {
				payload.addIssue = (issue$2) => {
					if (typeof issue$2 === "string") payload.issues.push(issue(issue$2, payload.value, ch._zod.def));
					else {
						const _issue = issue$2;
						if (_issue.fatal) _issue.continue = false;
						_issue.code ?? (_issue.code = "custom");
						if (!("input" in _issue)) _issue.input = payload.value;
						_issue.inst ?? (_issue.inst = ch);
						_issue.continue ?? (_issue.continue = !ch._zod.def.abort);
						payload.issues.push(issue(_issue));
					}
				};
				return fn(payload.value, payload);
			}, params);
			return ch;
		}
		// @__NO_SIDE_EFFECTS__
		function _check(fn, params) {
			const ch = new $ZodCheck({
				check: "custom",
				...normalizeParams(params)
			});
			ch._zod.check = fn;
			return ch;
		}
		//#endregion
		//#region node_modules/zod/v4/core/to-json-schema.js
		function assignProps(target, ...sources) {
			for (const source of sources) for (const key of Reflect.ownKeys(source)) if (Object.prototype.propertyIsEnumerable.call(source, key)) assignProp(target, key, source[key]);
			return target;
		}
		function initializeContext(params) {
			let target = params?.target ?? "draft-2020-12";
			if (target === "draft-4") target = "draft-04";
			if (target === "draft-7") target = "draft-07";
			return {
				processors: params.processors ?? {},
				metadataRegistry: params?.metadata ?? globalRegistry,
				target,
				unrepresentable: params?.unrepresentable ?? "throw",
				override: params?.override ?? (() => {}),
				io: params?.io ?? "output",
				counter: 0,
				seen: /* @__PURE__ */ new Map(),
				sharedDefsExtractedFor: void 0,
				sharedEmitDoneFor: void 0,
				cycles: params?.cycles ?? "ref",
				reused: params?.reused ?? "inline",
				intersections: [],
				deferred: [],
				external: params?.external ?? void 0
			};
		}
		/**
		* Applies the `unrepresentable` setting at a site that has no JSON Schema equivalent. Throws
		* `message` unless the setting (or the handler's return value) says otherwise. Returns `true` if a
		* custom JSON Schema was written into `json`, in which case the caller must not write its own.
		*/
		function handleUnrepresentable(schema, ctx, json, params, message) {
			const result = typeof ctx.unrepresentable === "function" ? ctx.unrepresentable({
				zodSchema: schema,
				path: params.path,
				message
			}) : ctx.unrepresentable;
			if (result === "any") return false;
			if (result === void 0 || result === "throw") throw new Error(message);
			Object.assign(json, result);
			return true;
		}
		function processSchema(schema, ctx, _params = {
			path: [],
			schemaPath: []
		}) {
			var _a;
			const def = schema._zod.def;
			const seen = ctx.seen.get(schema);
			if (seen) {
				seen.count++;
				if (_params.schemaPath.includes(schema)) seen.cycle = _params.path;
				return seen.schema;
			}
			const result = {
				schema: {},
				count: 1,
				cycle: void 0,
				path: _params.path
			};
			ctx.seen.set(schema, result);
			ctx.sharedDefsExtractedFor = void 0;
			ctx.sharedEmitDoneFor = void 0;
			const overrideSchema = schema._zod.toJSONSchema?.();
			if (overrideSchema) result.schema = overrideSchema;
			else {
				const params = {
					..._params,
					schemaPath: [..._params.schemaPath, schema],
					path: _params.path
				};
				if (schema._zod.processJSONSchema) schema._zod.processJSONSchema(ctx, result.schema, params);
				else {
					const _json = result.schema;
					const processor = ctx.processors[def.type];
					if (!processor) throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
					processor(schema, ctx, _json, params);
				}
				const parent = schema._zod.parent;
				if (parent) {
					if (!result.ref) result.ref = parent;
					processSchema(parent, ctx, params);
					ctx.seen.get(parent).isParent = true;
				}
			}
			const meta = ctx.metadataRegistry.get(schema);
			if (meta) assignProps(result.schema, meta);
			if (ctx.io === "input" && isTransforming(schema)) {
				delete result.schema.examples;
				delete result.schema.default;
			}
			if (ctx.io === "input" && "_prefault" in result.schema) (_a = result.schema).default ?? (_a.default = result.schema._prefault);
			delete result.schema._prefault;
			return ctx.seen.get(schema).schema;
		}
		function encodeJSONPointerSegment(segment) {
			return segment.replace(/~/g, "~0").replace(/\//g, "~1");
		}
		function extractDefs(ctx, schema) {
			const root = ctx.seen.get(schema);
			if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
			if (ctx.external && ctx.sharedDefsExtractedFor === ctx.external) return;
			const idToSchema = /* @__PURE__ */ new Map();
			for (const entry of ctx.seen.entries()) {
				const id = ctx.metadataRegistry.get(entry[0])?.id;
				if (id) {
					const existing = idToSchema.get(id);
					if (existing && existing !== entry[0]) throw new Error(`Duplicate schema id "${id}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
					idToSchema.set(id, entry[0]);
				}
			}
			const makeURI = (entry) => {
				const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
				if (ctx.external) {
					const externalId = ctx.external.registry.get(entry[0])?.id;
					const uriGenerator = ctx.external.uri ?? ((id) => id);
					if (externalId) return { ref: uriGenerator(externalId) };
					const id = entry[1].defId ?? entry[1].schema.id ?? `schema${ctx.counter++}`;
					entry[1].defId = id;
					return {
						defId: id,
						ref: `${uriGenerator("__shared")}#/${defsSegment}/${encodeJSONPointerSegment(id)}`
					};
				}
				const uriPrefix = `#`;
				const defUriPrefix = `${uriPrefix}/${defsSegment}/`;
				if (entry[1] === root && !entry[1].schema.id) return { ref: uriPrefix };
				const defId = entry[1].schema.id ?? `__schema${ctx.counter++}`;
				return {
					defId,
					ref: defUriPrefix + encodeJSONPointerSegment(defId)
				};
			};
			const extractToDef = (entry) => {
				if (entry[1].schema.$ref) return;
				const seen = entry[1];
				const { ref, defId } = makeURI(entry);
				seen.def = { ...seen.schema };
				if (defId) seen.defId = defId;
				const schema = seen.schema;
				for (const key in schema) delete schema[key];
				schema.$ref = ref;
			};
			if (ctx.cycles === "throw") for (const entry of ctx.seen.entries()) {
				const seen = entry[1];
				if (seen.cycle) throw new Error(`Cycle detected: #/${seen.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
			}
			for (const entry of ctx.seen.entries()) {
				const seen = entry[1];
				if (schema === entry[0]) {
					extractToDef(entry);
					continue;
				}
				if (ctx.external) {
					const ext = ctx.external.registry.get(entry[0])?.id;
					if (schema !== entry[0] && ext) {
						extractToDef(entry);
						continue;
					}
				}
				if (ctx.metadataRegistry.get(entry[0])?.id) {
					extractToDef(entry);
					continue;
				}
				if (seen.cycle) {
					extractToDef(entry);
					continue;
				}
				if (seen.count > 1) {
					if (ctx.reused === "ref") extractToDef(entry);
				}
			}
			if (ctx.external) ctx.sharedDefsExtractedFor = ctx.external;
		}
		/** Rewrites `anyOf: [{type: "a"}, {type: "b"}]` to `type: ["a", "b"]`, which every JSON Schema draft treats as equivalent and most consumers render far better for the nullable case. Only branches that are a bare type assertion qualify — anything carrying a constraint, `$ref`, `const` or metadata is left alone. Runs after `flattenRef`, so a branch an override decorated or `$defs` extraction turned into a `$ref` is no longer bare and correctly stays in `anyOf`. `oneOf` is excluded: `integer` and `number` overlap, so "exactly one" and "at least one" are not the same there. OpenAPI 3.0 is excluded: its `type` must be a single string. */
		function compactTypeUnion(schema) {
			const options = schema.anyOf;
			if (!Array.isArray(options) || options.length === 0 || schema.type !== void 0) return;
			const types = [];
			for (const option of options) {
				if (!option || typeof option !== "object") return;
				compactTypeUnion(option);
				const keys = Object.keys(option);
				if (keys.length !== 1 || keys[0] !== "type") return;
				const type = option.type;
				for (const member of Array.isArray(type) ? type : [type]) {
					if (typeof member !== "string") return;
					if (!types.includes(member)) types.push(member);
				}
			}
			delete schema.anyOf;
			schema.type = types.length === 1 ? types[0] : types;
		}
		/** Keywords `foldIntersection` knows how to combine. Anything else — `$ref`, `patternProperties`,
		* an annotation like `description` — makes a member unfoldable, so a constraint this does not
		* understand leaves the `allOf` alone instead of being silently dropped or misattributed. */
		const FOLDABLE_KEYS = /* @__PURE__ */ new Set([
			"type",
			"properties",
			"required",
			"additionalProperties"
		]);
		const UNION_KEYS = ["oneOf", "anyOf"];
		/** A member's constraint on a key it does not declare itself. A `catchall` states one; `false`, an absent `additionalProperties`, and the empty schema a loose object emits state nothing. */
		function undeclaredConstraint(member) {
			const extra = member.additionalProperties;
			if (extra === void 0 || extra === false || typeof extra !== "object" || extra === null) return null;
			return Object.keys(extra).length ? extra : null;
		}
		/** Combines object members into the single object they describe together, or returns `null` if any of them carries a keyword outside {@link FOLDABLE_KEYS}. */
		function foldObjects(members) {
			const objects = [];
			for (const member of members) {
				if (typeof member !== "object" || member.type !== "object") return null;
				for (const key in member) if (!FOLDABLE_KEYS.has(key)) return null;
				objects.push(member);
			}
			const properties = {};
			const required = /* @__PURE__ */ new Set();
			for (const object of objects) {
				for (const key in object.properties) {
					if (Object.prototype.hasOwnProperty.call(properties, key)) continue;
					const parts = [];
					for (const other of objects) {
						const part = other.properties?.[key] ?? undeclaredConstraint(other);
						if (part === null || part === void 0) continue;
						if (!parts.some((seen) => JSON.stringify(seen) === JSON.stringify(part))) parts.push(part);
					}
					assignProp(properties, key, parts.length === 1 ? parts[0] : foldObjects(parts) ?? { allOf: parts });
				}
				for (const key of object.required ?? []) required.add(key);
			}
			const folded = {
				type: "object",
				properties
			};
			if (required.size) folded.required = [...required];
			if (objects.every((object) => object.additionalProperties === false)) folded.additionalProperties = false;
			else {
				const constraints = [];
				for (const object of objects) {
					const constraint = undeclaredConstraint(object);
					if (constraint && !constraints.some((seen) => JSON.stringify(seen) === JSON.stringify(constraint))) constraints.push(constraint);
				}
				if (constraints.length === 1) folded.additionalProperties = constraints[0];
				else if (constraints.length > 1) folded.additionalProperties = { allOf: constraints };
			}
			return folded;
		}
		/** `additionalProperties` in an `allOf` member sees only that member's own `properties`, so two
		* closed object members reject each other's keys and the schema validates nothing. Zod's parser
		* pools the key sets instead — `handleIntersectionResults` reports a key as unrecognized only when
		* *every* side rejects it — so the emitted schema has to pool them too, and folding the members
		* into one object is the encoding that says so on every target.
		*
		* This runs from `finalize`, after `extractDefs`, which is what keeps it clear of the `$ref`
		* machinery: a member extracted into `$defs` is already a `$ref` by now and declines to fold, so it
		* keeps its reference and its own closedness rather than being inlined as a stale copy. */
		function foldIntersection(json) {
			const allOf = json.allOf;
			if (!Array.isArray(allOf) || allOf.length < 2) return;
			for (const key of FOLDABLE_KEYS) if (key in json) return;
			const unions = allOf.filter((m) => UNION_KEYS.some((k) => Array.isArray(m[k])));
			let folded = null;
			if (!unions.length) folded = foldObjects(allOf);
			else {
				const union = unions[0];
				const keyword = UNION_KEYS.find((k) => Array.isArray(union[k]));
				if (Object.keys(union).length !== 1) return;
				const rest = allOf.filter((m) => m !== union);
				const branches = union[keyword].map((branch) => foldObjects([...rest, branch]));
				if (branches.some((b) => !b)) return;
				folded = { [keyword]: branches };
			}
			if (!folded) return;
			delete json.allOf;
			assignProps(json, folded);
		}
		function finalize(ctx, schema) {
			const root = ctx.seen.get(schema);
			if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
			const flattenRef = (zodSchema) => {
				const seen = ctx.seen.get(zodSchema);
				if (seen.ref === null) return;
				const schema = seen.def ?? seen.schema;
				const _cached = { ...schema };
				const ref = seen.ref;
				seen.ref = null;
				if (ref) {
					flattenRef(ref);
					const refSeen = ctx.seen.get(ref);
					const refSchema = refSeen.schema;
					if (refSchema.$ref && (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0")) {
						schema.allOf = schema.allOf ?? [];
						schema.allOf.push(refSchema);
					} else assignProps(schema, refSchema);
					assignProps(schema, _cached);
					if (zodSchema._zod.parent === ref) for (const key in schema) {
						if (key === "$ref" || key === "allOf") continue;
						if (!(key in _cached)) delete schema[key];
					}
					if (refSchema.$ref && refSeen.def) for (const key in schema) {
						if (key === "$ref" || key === "allOf") continue;
						if (key in refSeen.def && JSON.stringify(schema[key]) === JSON.stringify(refSeen.def[key])) delete schema[key];
					}
				}
				const parent = zodSchema._zod.parent;
				if (parent && parent !== ref) {
					flattenRef(parent);
					const parentSeen = ctx.seen.get(parent);
					if (parentSeen?.schema.$ref) {
						schema.$ref = parentSeen.schema.$ref;
						if (parentSeen.def) for (const key in schema) {
							if (key === "$ref" || key === "allOf") continue;
							if (key in parentSeen.def && JSON.stringify(schema[key]) === JSON.stringify(parentSeen.def[key])) delete schema[key];
						}
					}
				}
				ctx.override({
					zodSchema,
					jsonSchema: schema,
					path: seen.path ?? []
				});
			};
			if (!ctx.external || ctx.sharedEmitDoneFor !== ctx.external) {
				for (const entry of [...ctx.seen.entries()].reverse()) flattenRef(entry[0]);
				if (ctx.target !== "openapi-3.0") for (const entry of ctx.seen.entries()) compactTypeUnion(entry[1].def ?? entry[1].schema);
				for (const rewrite of ctx.deferred) rewrite();
				if (ctx.intersections.length) {
					const carriers = /* @__PURE__ */ new Map();
					for (const seen of ctx.seen.values()) for (const json of [seen.schema, seen.def]) {
						const allOf = json?.allOf;
						if (!Array.isArray(allOf)) continue;
						const existing = carriers.get(allOf);
						if (existing) existing.push(json);
						else carriers.set(allOf, [json]);
					}
					for (const allOf of ctx.intersections) for (const json of carriers.get(allOf) ?? []) foldIntersection(json);
				}
			}
			const result = {};
			if (ctx.target === "draft-2020-12") result.$schema = "https://json-schema.org/draft/2020-12/schema";
			else if (ctx.target === "draft-07") result.$schema = "http://json-schema.org/draft-07/schema#";
			else if (ctx.target === "draft-04") result.$schema = "http://json-schema.org/draft-04/schema#";
			else if (ctx.target === "openapi-3.0") {}
			if (ctx.external?.uri) {
				const id = ctx.external.registry.get(schema)?.id;
				if (!id) throw new Error("Schema is missing an `id` property");
				result.$id = ctx.external.uri(id);
			}
			assignProps(result, root.defId ? root.schema : root.def ?? root.schema);
			const rootMetaId = ctx.metadataRegistry.get(schema)?.id;
			if (rootMetaId !== void 0 && result.id === rootMetaId) delete result.id;
			const defs = ctx.external?.defs ?? {};
			if (!ctx.external || ctx.sharedEmitDoneFor !== ctx.external) for (const entry of ctx.seen.entries()) {
				const seen = entry[1];
				if (seen.def && seen.defId) {
					if (seen.def.id === seen.defId) delete seen.def.id;
					assignProp(defs, seen.defId, seen.def);
				}
			}
			if (ctx.external) ctx.sharedEmitDoneFor = ctx.external;
			if (ctx.external) {} else if (Object.keys(defs).length > 0) if (ctx.target === "draft-2020-12") result.$defs = defs;
			else result.definitions = defs;
			try {
				const finalized = JSON.parse(JSON.stringify(result));
				Object.defineProperty(finalized, "~standard", {
					value: {
						...schema["~standard"],
						jsonSchema: {
							input: createStandardJSONSchemaMethod(schema, "input", ctx.processors),
							output: createStandardJSONSchemaMethod(schema, "output", ctx.processors)
						}
					},
					enumerable: false,
					writable: false
				});
				return finalized;
			} catch (_err) {
				throw new Error("Error converting schema to JSON.");
			}
		}
		function isTransforming(_schema, _ctx) {
			const ctx = _ctx ?? { seen: /* @__PURE__ */ new Set() };
			if (ctx.seen.has(_schema)) return false;
			ctx.seen.add(_schema);
			const def = _schema._zod.def;
			if (def.type === "transform") return true;
			if (def.type === "array") return isTransforming(def.element, ctx);
			if (def.type === "set") return isTransforming(def.valueType, ctx);
			if (def.type === "lazy") return isTransforming(def.getter(), ctx);
			if (def.type === "promise" || def.type === "optional" || def.type === "nonoptional" || def.type === "nullable" || def.type === "readonly" || def.type === "default" || def.type === "prefault" || def.type === "catch") return isTransforming(def.innerType, ctx);
			if (def.type === "intersection") return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
			if (def.type === "record" || def.type === "map") return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
			if (def.type === "pipe") {
				if (_schema._zod.traits.has("$ZodCodec")) return true;
				return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
			}
			if (def.type === "object") {
				for (const key in def.shape) if (isTransforming(def.shape[key], ctx)) return true;
				return false;
			}
			if (def.type === "union") {
				for (const option of def.options) if (isTransforming(option, ctx)) return true;
				return false;
			}
			if (def.type === "tuple") {
				for (const item of def.items) if (isTransforming(item, ctx)) return true;
				if (def.rest && isTransforming(def.rest, ctx)) return true;
				return false;
			}
			return false;
		}
		/**
		* Creates a toJSONSchema method for a schema instance.
		* This encapsulates the logic of initializing context, processing, extracting defs, and finalizing.
		*/
		const createToJSONSchemaMethod = (schema, processors = {}) => (params) => {
			const ctx = initializeContext({
				...params,
				processors
			});
			processSchema(schema, ctx);
			extractDefs(ctx, schema);
			return finalize(ctx, schema);
		};
		const createStandardJSONSchemaMethod = (schema, io, processors = {}) => (params) => {
			const { libraryOptions, target } = params ?? {};
			const ctx = initializeContext({
				...libraryOptions ?? {},
				target,
				io,
				processors
			});
			processSchema(schema, ctx);
			extractDefs(ctx, schema);
			return finalize(ctx, schema);
		};
		//#endregion
		//#region node_modules/zod/v4/core/json-schema-processors.js
		const narrowMin = (agg, key, value) => {
			if (agg[key] === void 0 || value > agg[key]) agg[key] = value;
		};
		const narrowMax = (agg, key, value) => {
			if (agg[key] === void 0 || value < agg[key]) agg[key] = value;
		};
		const narrowBoth = (agg, value) => {
			narrowMin(agg, "minimum", value);
			narrowMax(agg, "maximum", value);
		};
		const addDivisor = (agg, value) => {
			agg.multipleOf ?? (agg.multipleOf = []);
			if (!agg.multipleOf.includes(value)) agg.multipleOf.push(value);
		};
		const addPattern = (agg, pattern) => {
			agg.patterns ?? (agg.patterns = /* @__PURE__ */ new Set());
			agg.patterns.add(pattern);
		};
		const intersectMime = (agg, mime) => {
			agg.mime = agg.mime ? agg.mime.filter((m) => mime.includes(m)) : [...mime];
		};
		const setFormat = (agg, format) => {
			agg.format = format;
			if (format.includes("int")) agg.isInt = true;
		};
		const minContributor = (agg, def) => narrowMin(agg, "minimum", def.minimum);
		const maxContributor = (agg, def) => narrowMax(agg, "maximum", def.maximum);
		const formatContributor = (ranges) => (agg, def) => {
			setFormat(agg, def.format);
			const [minimum, maximum] = ranges[def.format];
			narrowMin(agg, "minimum", minimum);
			narrowMax(agg, "maximum", maximum);
		};
		const contributors = {
			greater_than: (agg, def) => narrowMin(agg, def.inclusive ? "minimum" : "exclusiveMinimum", def.value),
			less_than: (agg, def) => narrowMax(agg, def.inclusive ? "maximum" : "exclusiveMaximum", def.value),
			multiple_of: (agg, def) => addDivisor(agg, def.value),
			number_format: formatContributor(NUMBER_FORMAT_RANGES),
			bigint_format: formatContributor(BIGINT_FORMAT_RANGES),
			min_length: minContributor,
			max_length: maxContributor,
			length_equals: (agg, def) => narrowBoth(agg, def.length),
			min_size: minContributor,
			max_size: maxContributor,
			size_equals: (agg, def) => narrowBoth(agg, def.size),
			string_format: (agg, def) => {
				setFormat(agg, def.format);
				if (def.pattern) addPattern(agg, def.pattern);
				if (def.format === "base64" || def.format === "base64url") agg.contentEncoding = def.format;
				if (def.local || def.precision === -1) agg.laxFormat = true;
			},
			mime_type: (agg, def) => intersectMime(agg, def.mime)
		};
		function aggregateChecks(schema) {
			const agg = {};
			const def = schema._zod.def;
			const list = schema._zod.traits.has("$ZodCheck") ? [schema, ...def.checks ?? []] : def.checks ?? [];
			for (const ch of list) contributors[ch._zod.def.check]?.(agg, ch._zod.def);
			const bag = schema._zod.bag;
			if (bag.minimum !== void 0) narrowMin(agg, "minimum", bag.minimum);
			if (bag.exclusiveMinimum !== void 0) narrowMin(agg, "exclusiveMinimum", bag.exclusiveMinimum);
			if (bag.maximum !== void 0) narrowMax(agg, "maximum", bag.maximum);
			if (bag.exclusiveMaximum !== void 0) narrowMax(agg, "exclusiveMaximum", bag.exclusiveMaximum);
			if (bag.multipleOf !== void 0) addDivisor(agg, bag.multipleOf);
			if (bag.format !== void 0) {
				agg.format ?? (agg.format = bag.format);
				if (bag.format.includes("int")) agg.isInt = true;
			}
			if (bag.mime) intersectMime(agg, bag.mime);
			for (const pattern of bag.patterns ?? []) addPattern(agg, pattern);
			return agg;
		}
		const formatMap = {
			guid: "uuid",
			url: "uri",
			datetime: "date-time",
			json_string: "json-string",
			regex: ""
		};
		const exactPatterns = /* @__PURE__ */ new Map([[base64Charset, base64], [base64urlCharset, base64url]]);
		const exactPattern = (p) => exactPatterns.get(p) ?? p;
		const stringProcessor = (schema, ctx, _json, _params) => {
			const json = _json;
			json.type = "string";
			const { minimum, maximum, format, patterns, contentEncoding, laxFormat } = aggregateChecks(schema);
			if (typeof minimum === "number") json.minLength = minimum;
			if (typeof maximum === "number") json.maxLength = maximum;
			if (format) {
				json.format = formatMap[format] ?? format;
				if (json.format === "") delete json.format;
				if (format === "time" || laxFormat) delete json.format;
			}
			if (contentEncoding) json.contentEncoding = contentEncoding;
			if (patterns && patterns.size > 0) {
				const patternList = [...patterns].map(exactPattern);
				if (patternList.length === 1) json.pattern = patternList[0].source;
				else if (patternList.length > 1) json.allOf = [...patternList.map((regex) => ({
					...ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0" ? { type: "string" } : {},
					pattern: regex.source
				}))];
			}
		};
		const numberProcessor = (schema, ctx, _json, params) => {
			const json = _json;
			const { minimum, maximum, multipleOf, exclusiveMaximum, exclusiveMinimum, isInt } = aggregateChecks(schema);
			json.type = isInt ? "integer" : "number";
			const exMin = typeof exclusiveMinimum === "number" && exclusiveMinimum >= (minimum ?? Number.NEGATIVE_INFINITY);
			const exMax = typeof exclusiveMaximum === "number" && exclusiveMaximum <= (maximum ?? Number.POSITIVE_INFINITY);
			const legacy = ctx.target === "draft-04" || ctx.target === "openapi-3.0";
			if (exMin) if (legacy) {
				json.minimum = exclusiveMinimum;
				json.exclusiveMinimum = true;
			} else json.exclusiveMinimum = exclusiveMinimum;
			else if (typeof minimum === "number") json.minimum = minimum;
			if (exMax) if (legacy) {
				json.maximum = exclusiveMaximum;
				json.exclusiveMaximum = true;
			} else json.exclusiveMaximum = exclusiveMaximum;
			else if (typeof maximum === "number") json.maximum = maximum;
			if (multipleOf) {
				const divisors = /* @__PURE__ */ new Set();
				for (const divisor of multipleOf) if (Number.isFinite(divisor) && divisor !== 0) divisors.add(Math.abs(divisor));
				else handleUnrepresentable(schema, ctx, json, params, `A multipleOf divisor of ${divisor} cannot be represented in JSON Schema`);
				const [first, ...rest] = divisors;
				if (first !== void 0) json.multipleOf = first;
				if (rest.length) json.allOf = [...json.allOf ?? [], ...rest.map((m) => ({ multipleOf: m }))];
			}
		};
		const booleanProcessor = (_schema, _ctx, json, _params) => {
			json.type = "boolean";
		};
		const neverProcessor = (_schema, _ctx, json, _params) => {
			json.not = {};
		};
		const enumProcessor = (schema, _ctx, json, _params) => {
			const def = schema._zod.def;
			const values = getEnumValues(def.entries);
			if (values.length === 0) {
				json.not = {};
				return;
			}
			if (values.every((v) => typeof v === "number")) json.type = "number";
			if (values.every((v) => typeof v === "string")) json.type = "string";
			json.enum = values;
		};
		const literalProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			if (def.values.length === 0) {
				json.not = {};
				return;
			}
			const vals = [];
			for (const val of def.values) if (val === void 0) {
				if (handleUnrepresentable(schema, ctx, json, params, "Literal `undefined` cannot be represented in JSON Schema")) return;
			} else if (typeof val === "bigint") {
				if (handleUnrepresentable(schema, ctx, json, params, "BigInt literals cannot be represented in JSON Schema")) return;
				vals.push(Number(val));
			} else vals.push(val);
			if (vals.length === 0) {} else if (vals.length === 1) {
				const val = vals[0];
				json.type = val === null ? "null" : typeof val;
				if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") json.enum = [val];
				else json.const = val;
			} else {
				if (vals.every((v) => typeof v === "number")) json.type = "number";
				if (vals.every((v) => typeof v === "string")) json.type = "string";
				if (vals.every((v) => typeof v === "boolean")) json.type = "boolean";
				if (vals.every((v) => v === null)) json.type = "null";
				json.enum = vals;
			}
		};
		const customProcessor = (schema, ctx, json, params) => {
			handleUnrepresentable(schema, ctx, json, params, "Custom types cannot be represented in JSON Schema");
		};
		const transformProcessor = (schema, ctx, json, params) => {
			handleUnrepresentable(schema, ctx, json, params, "Transforms cannot be represented in JSON Schema");
		};
		const arrayProcessor = (schema, ctx, _json, params) => {
			const json = _json;
			const def = schema._zod.def;
			const { minimum, maximum } = aggregateChecks(schema);
			if (typeof minimum === "number") json.minItems = minimum;
			if (typeof maximum === "number") json.maxItems = maximum;
			json.type = "array";
			json.items = processSchema(def.element, ctx, {
				...params,
				path: [...params.path, "items"]
			});
		};
		function inputOptin(schema) {
			const def = schema._zod.def;
			if (def.type === "pipe" && def.in._zod.traits.has("$ZodTransform")) return inputOptin(def.out);
			if (def.type === "catch") return inputOptin(def.innerType);
			return schema._zod.optin;
		}
		const objectProcessor = (schema, ctx, _json, params) => {
			const json = _json;
			const def = schema._zod.def;
			const shape = def.shape;
			if (Object.getOwnPropertySymbols(shape).length && handleUnrepresentable(schema, ctx, json, params, "Symbol keys cannot be represented in JSON Schema")) return;
			json.type = "object";
			json.properties = {};
			for (const key in shape) assignProp(json.properties, key, processSchema(shape[key], ctx, {
				...params,
				path: [
					...params.path,
					"properties",
					key
				]
			}));
			const requiredKeys = [];
			for (const key of Object.keys(shape)) {
				const field = def.shape[key];
				if (ctx.io === "input" ? inputOptin(field) === void 0 : field._zod.optout === void 0) requiredKeys.push(key);
			}
			if (requiredKeys.length > 0) json.required = requiredKeys;
			if (def.catchall?._zod.def.type === "never") json.additionalProperties = false;
			else if (!def.catchall) {
				if (ctx.io === "output") json.additionalProperties = false;
			} else if (def.catchall) json.additionalProperties = processSchema(def.catchall, ctx, {
				...params,
				path: [...params.path, "additionalProperties"]
			});
		};
		const unionProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			const isExclusive = def.inclusive === false;
			const options = def.options.map((x, i) => processSchema(x, ctx, {
				...params,
				path: [
					...params.path,
					isExclusive ? "oneOf" : "anyOf",
					i
				]
			}));
			if (isExclusive) json.oneOf = options;
			else json.anyOf = options;
		};
		const intersectionProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			const a = processSchema(def.left, ctx, {
				...params,
				path: [
					...params.path,
					"allOf",
					0
				]
			});
			const b = processSchema(def.right, ctx, {
				...params,
				path: [
					...params.path,
					"allOf",
					1
				]
			});
			const isSimpleIntersection = (val) => "allOf" in val && Object.keys(val).length === 1;
			const allOf = [...isSimpleIntersection(a) ? a.allOf : [a], ...isSimpleIntersection(b) ? b.allOf : [b]];
			json.allOf = allOf;
			ctx.intersections.push(allOf);
		};
		const nullableProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			const inner = processSchema(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			if (ctx.target === "openapi-3.0") {
				seen.ref = def.innerType;
				json.nullable = true;
			} else json.anyOf = [inner, { type: "null" }];
		};
		const nonoptionalProcessor = (schema, ctx, _json, params) => {
			const def = schema._zod.def;
			processSchema(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
		};
		/** Round-trips a default value through JSON so the emitted schema is guaranteed to be valid JSON.
		* A BigInt has no reliable encoding, so it goes through `unrepresentable` like any other
		* unrepresentable value. Returns a sentinel when the caller must not write a default of its own. */
		const UNREPRESENTABLE_DEFAULT = Symbol();
		function serializeDefaultValue(value, schema, ctx, json, params) {
			let unrepresentable = false;
			const serialized = JSON.stringify(value, (_, val) => {
				if (typeof val !== "bigint") return val;
				unrepresentable = true;
				return null;
			});
			if (!unrepresentable) return JSON.parse(serialized);
			handleUnrepresentable(schema, ctx, json, params, "BigInt defaults cannot be represented in JSON Schema");
			return UNREPRESENTABLE_DEFAULT;
		}
		const defaultProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			processSchema(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
			const value = serializeDefaultValue(def.defaultValue, schema, ctx, json, params);
			if (value !== UNREPRESENTABLE_DEFAULT) json.default = value;
		};
		const prefaultProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			processSchema(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
			if (ctx.io !== "input") return;
			const value = serializeDefaultValue(def.defaultValue, schema, ctx, json, params);
			if (value !== UNREPRESENTABLE_DEFAULT) json._prefault = value;
		};
		const catchProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			processSchema(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
			let catchValue;
			try {
				catchValue = def.catchValue(void 0);
			} catch {
				handleUnrepresentable(schema, ctx, json, params, "Dynamic catch values are not supported in JSON Schema");
				return;
			}
			json.default = catchValue;
		};
		const pipeProcessor = (schema, ctx, _json, params) => {
			const def = schema._zod.def;
			const inIsTransform = def.in._zod.traits.has("$ZodTransform");
			const innerType = ctx.io === "input" ? inIsTransform ? def.out : def.in : def.out;
			processSchema(innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = innerType;
		};
		const readonlyProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			processSchema(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
			json.readOnly = true;
		};
		const optionalProcessor = (schema, ctx, _json, params) => {
			const def = schema._zod.def;
			processSchema(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
		};
		//#endregion
		//#region node_modules/zod/v4/classic/errors.js
		const _installedErrorProtos = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]);
		function _lazyMethod(proto, key, make) {
			Object.defineProperty(proto, key, {
				configurable: true,
				enumerable: false,
				get() {
					const value = make(this);
					Object.defineProperty(this, key, {
						value,
						configurable: true,
						writable: true
					});
					return value;
				},
				set(value) {
					Object.defineProperty(this, key, {
						value,
						configurable: true,
						writable: true
					});
				}
			});
		}
		const initializer = (inst, issues) => {
			$ZodError.init(inst, issues);
			inst.name = "ZodError";
			const proto = Object.getPrototypeOf(inst);
			if (_installedErrorProtos.has(proto)) return;
			_installedErrorProtos.add(proto);
			_lazyMethod(proto, "format", (self) => (mapper) => formatError(self, mapper));
			_lazyMethod(proto, "flatten", (self) => (mapper) => flattenError(self, mapper));
			_lazyMethod(proto, "addIssue", (self) => (issue) => {
				self.issues.push(issue);
				self.message = JSON.stringify(self.issues, jsonStringifyReplacer, 2);
			});
			_lazyMethod(proto, "addIssues", (self) => (issues) => {
				self.issues.push(...issues);
				self.message = JSON.stringify(self.issues, jsonStringifyReplacer, 2);
			});
			Object.defineProperty(proto, "isEmpty", {
				configurable: true,
				enumerable: false,
				get() {
					return this.issues.length === 0;
				}
			});
		};
		const ZodRealError = /*@__PURE__*/ $constructor("ZodError", initializer, void 0, { Parent: Error });
		//#endregion
		//#region node_modules/zod/v4/classic/parse.js
		const parse = /* @__PURE__ */ _parse(ZodRealError);
		const parseAsync = /* @__PURE__ */ _parseAsync(ZodRealError);
		const safeParse = /* @__PURE__ */ _safeParse(ZodRealError);
		const safeParseAsync = /* @__PURE__ */ _safeParseAsync(ZodRealError);
		const encode = /* @__PURE__ */ _encode(ZodRealError);
		const decode = /* @__PURE__ */ _decode(ZodRealError);
		const encodeAsync = /* @__PURE__ */ _encodeAsync(ZodRealError);
		const decodeAsync = /* @__PURE__ */ _decodeAsync(ZodRealError);
		const safeEncode = /* @__PURE__ */ _safeEncode(ZodRealError);
		const safeDecode = /* @__PURE__ */ _safeDecode(ZodRealError);
		const safeEncodeAsync = /* @__PURE__ */ _safeEncodeAsync(ZodRealError);
		const safeDecodeAsync = /* @__PURE__ */ _safeDecodeAsync(ZodRealError);
		//#endregion
		//#region node_modules/zod/v4/classic/schemas.js
		function _ensureDefaultLocale() {
			if (!globalConfig.localeError) config(en_default());
		}
		function _ensureDefaultMemoizer() {
			if (!globalConfig.memoizer) config({ memoizer: memoizer() });
		}
		const ZodType = /*@__PURE__*/ $constructor("ZodType", (inst, def) => {
			_ensureDefaultLocale();
			$ZodType.init(inst, def);
			inst.def = def;
			inst.type = def.type;
			return inst;
		}, {
			check(...chks) {
				const def = this.def;
				return this.clone(mergeDefs(def, { checks: [...def.checks ?? [], ...chks.map((ch) => typeof ch === "function" ? { _zod: {
					check: ch,
					def: { check: "custom" },
					onattach: []
				} } : ch)] }), { parent: true });
			},
			with(...chks) {
				return this.check(...chks);
			},
			clone(def, params) {
				return clone(this, def, params);
			},
			brand() {
				return this;
			},
			register(reg, meta) {
				reg.add(this, meta);
				return this;
			},
			refine(check, params) {
				return this.check(refine(check, params));
			},
			superRefine(refinement, params) {
				return this.check(superRefine(refinement, params));
			},
			overwrite(fn) {
				return this.check(/* @__PURE__ */ _overwrite(fn));
			},
			optional() {
				return optional(this);
			},
			exactOptional() {
				return exactOptional(this);
			},
			nullable() {
				return nullable(this);
			},
			nullish() {
				return optional(nullable(this));
			},
			nonoptional(params) {
				return nonoptional(this, params);
			},
			array() {
				return array(this);
			},
			or(arg) {
				return union([this, arg]);
			},
			and(arg) {
				return intersection(this, arg);
			},
			transform(tx) {
				return pipe(this, transform(tx));
			},
			default(d) {
				return _default(this, d);
			},
			prefault(d) {
				return prefault(this, d);
			},
			catch(params) {
				return _catch(this, params);
			},
			pipe(target) {
				return pipe(this, target);
			},
			readonly() {
				return readonly(this);
			},
			describe(description) {
				const cl = this.clone();
				globalRegistry.add(cl, { description });
				return cl;
			},
			meta(...args) {
				if (args.length === 0) return globalRegistry.get(this);
				const cl = this.clone();
				globalRegistry.add(cl, args[0]);
				return cl;
			},
			isOptional() {
				return this.safeParse(void 0).success;
			},
			isNullable() {
				return this.safeParse(null).success;
			},
			apply(fn, ...args) {
				return args.length === 0 ? fn(this) : fn(this, ...args);
			},
			get "~standard"() {
				return hide(this, "~standard", {
					...standardProps(this),
					jsonSchema: {
						input: createStandardJSONSchemaMethod(this, "input"),
						output: createStandardJSONSchemaMethod(this, "output")
					}
				});
			},
			set "~standard"(value) {
				own(this, "~standard", value);
			},
			parse: function _parse(data, params) {
				return parse(this, data, params, { callee: _parse });
			},
			parseAsync: async function _parseAsync(data, params) {
				return await parseAsync(this, data, params, { callee: _parseAsync });
			},
			safeParse(data, params) {
				return safeParse(this, data, params);
			},
			async safeParseAsync(data, params) {
				return safeParseAsync(this, data, params);
			},
			get spa() {
				return this?.safeParseAsync;
			},
			set spa(value) {
				own(this, "spa", value);
			},
			validate(data, params) {
				return validate(this, data, params);
			},
			validateAsync(data, params) {
				return validateAsync$1(this, data, params);
			},
			encode: function _encode(data, params) {
				return encode(this, data, params, { callee: _encode });
			},
			decode: function _decode(data, params) {
				return decode(this, data, params, { callee: _decode });
			},
			encodeAsync: async function _encodeAsync(data, params) {
				return await encodeAsync(this, data, params, { callee: _encodeAsync });
			},
			decodeAsync: async function _decodeAsync(data, params) {
				return await decodeAsync(this, data, params, { callee: _decodeAsync });
			},
			safeEncode(data, params) {
				return safeEncode(this, data, params);
			},
			safeDecode(data, params) {
				return safeDecode(this, data, params);
			},
			async safeEncodeAsync(data, params) {
				return safeEncodeAsync(this, data, params);
			},
			async safeDecodeAsync(data, params) {
				return safeDecodeAsync(this, data, params);
			},
			toJSONSchema(params) {
				return createToJSONSchemaMethod(this, {})(params);
			},
			get description() {
				return globalRegistry.get(this)?.description;
			},
			get _def() {
				return this._zod.def;
			}
		});
		/** @internal */
		const _ZodString = /*@__PURE__*/ $constructor("_ZodString", (inst, def) => {
			$ZodString.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => stringProcessor(inst, ctx, json, params);
		}, /*@__PURE__*/ derived({
			format: (inst) => aggregateChecks(inst).format ?? null,
			minLength: (inst) => aggregateChecks(inst).minimum ?? null,
			maxLength: (inst) => aggregateChecks(inst).maximum ?? null
		}, {
			regex(...args) {
				return this.check(/* @__PURE__ */ _regex(...args));
			},
			includes(...args) {
				return this.check(/* @__PURE__ */ _includes(...args));
			},
			startsWith(...args) {
				return this.check(/* @__PURE__ */ _startsWith(...args));
			},
			endsWith(...args) {
				return this.check(/* @__PURE__ */ _endsWith(...args));
			},
			min(...args) {
				return this.check(/* @__PURE__ */ _minLength(...args));
			},
			max(...args) {
				return this.check(/* @__PURE__ */ _maxLength(...args));
			},
			length(...args) {
				return this.check(/* @__PURE__ */ _length(...args));
			},
			nonempty(...args) {
				return this.check(/* @__PURE__ */ _minLength(1, ...args));
			},
			lowercase(params) {
				return this.check(/* @__PURE__ */ _lowercase(params));
			},
			uppercase(params) {
				return this.check(/* @__PURE__ */ _uppercase(params));
			},
			trim() {
				return this.check(/* @__PURE__ */ _trim());
			},
			normalize(...args) {
				return this.check(/* @__PURE__ */ _normalize(...args));
			},
			toLowerCase() {
				return this.check(/* @__PURE__ */ _toLowerCase());
			},
			toUpperCase() {
				return this.check(/* @__PURE__ */ _toUpperCase());
			},
			slugify() {
				return this.check(/* @__PURE__ */ _slugify());
			}
		}));
		const ZodString = /*@__PURE__*/ $constructor("ZodString", (inst, def) => {
			$ZodString.init(inst, def);
			_ZodString.init(inst, def);
		}, {
			email(params) {
				return this.check(/* @__PURE__ */ _email(ZodEmail, params));
			},
			url(params) {
				return this.check(/* @__PURE__ */ _url(ZodURL, params));
			},
			jwt(params) {
				return this.check(/* @__PURE__ */ _jwt(ZodJWT, params));
			},
			emoji(params) {
				return this.check(/* @__PURE__ */ _emoji(ZodEmoji, params));
			},
			guid(params) {
				return this.check(/* @__PURE__ */ _guid(ZodGUID, params));
			},
			uuid(params) {
				return this.check(/* @__PURE__ */ _uuid(ZodUUID, params));
			},
			uuidv4(params) {
				return this.check(/* @__PURE__ */ _uuidv4(ZodUUID, params));
			},
			uuidv6(params) {
				return this.check(/* @__PURE__ */ _uuidv6(ZodUUID, params));
			},
			uuidv7(params) {
				return this.check(/* @__PURE__ */ _uuidv7(ZodUUID, params));
			},
			nanoid(params) {
				return this.check(/* @__PURE__ */ _nanoid(ZodNanoID, params));
			},
			cuid(params) {
				return this.check(/* @__PURE__ */ _cuid(ZodCUID, params));
			},
			cuid2(params) {
				return this.check(/* @__PURE__ */ _cuid2(ZodCUID2, params));
			},
			ulid(params) {
				return this.check(/* @__PURE__ */ _ulid(ZodULID, params));
			},
			base64(params) {
				return this.check(/* @__PURE__ */ _base64(ZodBase64, params));
			},
			base64url(params) {
				return this.check(/* @__PURE__ */ _base64url(ZodBase64URL, params));
			},
			xid(params) {
				return this.check(/* @__PURE__ */ _xid(ZodXID, params));
			},
			ksuid(params) {
				return this.check(/* @__PURE__ */ _ksuid(ZodKSUID, params));
			},
			ipv4(params) {
				return this.check(/* @__PURE__ */ _ipv4(ZodIPv4, params));
			},
			ipv6(params) {
				return this.check(/* @__PURE__ */ _ipv6(ZodIPv6, params));
			},
			cidrv4(params) {
				return this.check(/* @__PURE__ */ _cidrv4(ZodCIDRv4, params));
			},
			cidrv6(params) {
				return this.check(/* @__PURE__ */ _cidrv6(ZodCIDRv6, params));
			},
			e164(params) {
				return this.check(/* @__PURE__ */ _e164(ZodE164, params));
			},
			datetime(params) {
				return this.check(/* @__PURE__ */ _isoDateTime(ZodISODateTime, params));
			},
			date(params) {
				return this.check(/* @__PURE__ */ _isoDate(ZodISODate, params));
			},
			time(params) {
				return this.check(/* @__PURE__ */ _isoTime(ZodISOTime, params));
			},
			duration(params) {
				return this.check(/* @__PURE__ */ _isoDuration(ZodISODuration, params));
			}
		});
		function string(params) {
			return /* @__PURE__ */ _string(ZodString, params);
		}
		const ZodStringFormat = /*@__PURE__*/ $constructor("ZodStringFormat", (inst, def) => {
			$ZodStringFormat.init(inst, def);
			_ZodString.init(inst, def);
		});
		const ZodISODateTime = /*@__PURE__*/ $constructor("ZodISODateTime", (inst, def) => {
			$ZodISODateTime.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodISODate = /*@__PURE__*/ $constructor("ZodISODate", (inst, def) => {
			$ZodISODate.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodISOTime = /*@__PURE__*/ $constructor("ZodISOTime", (inst, def) => {
			$ZodISOTime.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodISODuration = /*@__PURE__*/ $constructor("ZodISODuration", (inst, def) => {
			$ZodISODuration.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodEmail = /*@__PURE__*/ $constructor("ZodEmail", (inst, def) => {
			$ZodEmail.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodGUID = /*@__PURE__*/ $constructor("ZodGUID", (inst, def) => {
			$ZodGUID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodUUID = /*@__PURE__*/ $constructor("ZodUUID", (inst, def) => {
			$ZodUUID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodURL = /*@__PURE__*/ $constructor("ZodURL", (inst, def) => {
			$ZodURL.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodEmoji = /*@__PURE__*/ $constructor("ZodEmoji", (inst, def) => {
			$ZodEmoji.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodNanoID = /*@__PURE__*/ $constructor("ZodNanoID", (inst, def) => {
			$ZodNanoID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		/**
		* @deprecated CUID v1 is deprecated by its authors due to information leakage
		* (timestamps embedded in the id). Use {@link ZodCUID2} instead.
		* See https://github.com/paralleldrive/cuid.
		*/
		const ZodCUID = /*@__PURE__*/ $constructor("ZodCUID", (inst, def) => {
			$ZodCUID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodCUID2 = /*@__PURE__*/ $constructor("ZodCUID2", (inst, def) => {
			$ZodCUID2.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodULID = /*@__PURE__*/ $constructor("ZodULID", (inst, def) => {
			$ZodULID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodXID = /*@__PURE__*/ $constructor("ZodXID", (inst, def) => {
			$ZodXID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodKSUID = /*@__PURE__*/ $constructor("ZodKSUID", (inst, def) => {
			$ZodKSUID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodIPv4 = /*@__PURE__*/ $constructor("ZodIPv4", (inst, def) => {
			$ZodIPv4.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodIPv6 = /*@__PURE__*/ $constructor("ZodIPv6", (inst, def) => {
			$ZodIPv6.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodCIDRv4 = /*@__PURE__*/ $constructor("ZodCIDRv4", (inst, def) => {
			$ZodCIDRv4.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodCIDRv6 = /*@__PURE__*/ $constructor("ZodCIDRv6", (inst, def) => {
			$ZodCIDRv6.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodBase64 = /*@__PURE__*/ $constructor("ZodBase64", (inst, def) => {
			$ZodBase64.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodBase64URL = /*@__PURE__*/ $constructor("ZodBase64URL", (inst, def) => {
			$ZodBase64URL.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodE164 = /*@__PURE__*/ $constructor("ZodE164", (inst, def) => {
			$ZodE164.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodJWT = /*@__PURE__*/ $constructor("ZodJWT", (inst, def) => {
			$ZodJWT.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodNumber = /*@__PURE__*/ $constructor("ZodNumber", (inst, def) => {
			$ZodNumber.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => numberProcessor(inst, ctx, json, params);
			inst.isFinite = true;
		}, /*@__PURE__*/ derived({
			minValue: (inst) => {
				const { minimum, exclusiveMinimum } = aggregateChecks(inst);
				return Math.max(minimum ?? Number.NEGATIVE_INFINITY, exclusiveMinimum ?? Number.NEGATIVE_INFINITY);
			},
			maxValue: (inst) => {
				const { maximum, exclusiveMaximum } = aggregateChecks(inst);
				return Math.min(maximum ?? Number.POSITIVE_INFINITY, exclusiveMaximum ?? Number.POSITIVE_INFINITY);
			},
			isInt: (inst) => {
				const { isInt, multipleOf } = aggregateChecks(inst);
				return !!isInt || !!multipleOf?.some(Number.isSafeInteger);
			},
			format: (inst) => aggregateChecks(inst).format ?? null
		}, {
			gt(value, params) {
				return this.check(/* @__PURE__ */ _gt(value, params));
			},
			gte(value, params) {
				return this.check(/* @__PURE__ */ _gte(value, params));
			},
			min(value, params) {
				return this.check(/* @__PURE__ */ _gte(value, params));
			},
			lt(value, params) {
				return this.check(/* @__PURE__ */ _lt(value, params));
			},
			lte(value, params) {
				return this.check(/* @__PURE__ */ _lte(value, params));
			},
			max(value, params) {
				return this.check(/* @__PURE__ */ _lte(value, params));
			},
			int(params) {
				return this.check(int(params));
			},
			safe(params) {
				return this.check(int(params));
			},
			positive(params) {
				return this.check(/* @__PURE__ */ _gt(0, params));
			},
			nonnegative(params) {
				return this.check(/* @__PURE__ */ _gte(0, params));
			},
			negative(params) {
				return this.check(/* @__PURE__ */ _lt(0, params));
			},
			nonpositive(params) {
				return this.check(/* @__PURE__ */ _lte(0, params));
			},
			multipleOf(value, params) {
				return this.check(/* @__PURE__ */ _multipleOf(value, params));
			},
			step(value, params) {
				return this.check(/* @__PURE__ */ _multipleOf(value, params));
			},
			finite() {
				return this;
			}
		}));
		function number(params) {
			return /* @__PURE__ */ _number(ZodNumber, params);
		}
		const ZodNumberFormat = /*@__PURE__*/ $constructor("ZodNumberFormat", (inst, def) => {
			$ZodNumberFormat.init(inst, def);
			ZodNumber.init(inst, def);
		});
		function int(params) {
			return /* @__PURE__ */ _int(ZodNumberFormat, params);
		}
		const ZodBoolean = /*@__PURE__*/ $constructor("ZodBoolean", (inst, def) => {
			$ZodBoolean.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => booleanProcessor(inst, ctx, json, params);
		});
		function boolean(params) {
			return /* @__PURE__ */ _boolean(ZodBoolean, params);
		}
		const ZodUnknown = /*@__PURE__*/ $constructor("ZodUnknown", (inst, def) => {
			$ZodUnknown.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => void 0;
		});
		function unknown() {
			return /* @__PURE__ */ _unknown(ZodUnknown);
		}
		const ZodNever = /*@__PURE__*/ $constructor("ZodNever", (inst, def) => {
			$ZodNever.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => neverProcessor(inst, ctx, json, params);
		});
		function never(params) {
			return /* @__PURE__ */ _never(ZodNever, params);
		}
		const ZodArray = /*@__PURE__*/ $constructor("ZodArray", (inst, def) => {
			_ensureDefaultMemoizer();
			$ZodArray.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => arrayProcessor(inst, ctx, json, params);
			inst.element = def.element;
		}, {
			min(n, params) {
				return this.check(/* @__PURE__ */ _minLength(n, params));
			},
			nonempty(params) {
				return this.check(/* @__PURE__ */ _minLength(1, params));
			},
			max(n, params) {
				return this.check(/* @__PURE__ */ _maxLength(n, params));
			},
			length(n, params) {
				return this.check(/* @__PURE__ */ _length(n, params));
			},
			unwrap() {
				return this.element;
			}
		});
		function array(element, params) {
			return /* @__PURE__ */ _array(ZodArray, element, params);
		}
		const ZodObject = /*@__PURE__*/ $constructor("ZodObject", (inst, def) => {
			_ensureDefaultMemoizer();
			$ZodObjectJIT.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => objectProcessor(inst, ctx, json, params);
			installLazyProp(inst, "shape", (self) => self._zod.def.shape, false);
		}, {
			keyof() {
				return _enum(Object.keys(this._zod.def.shape));
			},
			catchall(catchall) {
				return this.clone(mergeDefs(this._zod.def, { catchall }));
			},
			passthrough() {
				return this.clone(mergeDefs(this._zod.def, { catchall: unknown() }));
			},
			loose() {
				return this.clone(mergeDefs(this._zod.def, { catchall: unknown() }));
			},
			strict() {
				return this.clone(mergeDefs(this._zod.def, { catchall: never() }));
			},
			strip() {
				return this.clone(mergeDefs(this._zod.def, { catchall: void 0 }));
			},
			extend(incoming) {
				return extend(this, incoming);
			},
			safeExtend(incoming) {
				return safeExtend(this, incoming);
			},
			merge(other) {
				return merge(this, other);
			},
			pick(mask) {
				return pick(this, mask);
			},
			omit(mask) {
				return omit(this, mask);
			},
			partial(...args) {
				return partial(ZodOptional, this, args[0]);
			},
			exactPartial(...args) {
				return partial(ZodExactOptional, this, args[0], "exactPartial");
			},
			required(...args) {
				return required(ZodNonOptional, this, args[0]);
			}
		});
		function object(shape, params) {
			const def = {
				type: "object",
				shape: shape ?? {},
				...normalizeParams(params)
			};
			return new ZodObject(def);
		}
		const ZodUnion = /*@__PURE__*/ $constructor("ZodUnion", (inst, def) => {
			$ZodUnion.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => unionProcessor(inst, ctx, json, params);
			inst.options = def.options;
		});
		function union(options, params) {
			return new ZodUnion({
				type: "union",
				options,
				...normalizeParams(params)
			});
		}
		const ZodIntersection = /*@__PURE__*/ $constructor("ZodIntersection", (inst, def) => {
			$ZodIntersection.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => intersectionProcessor(inst, ctx, json, params);
		});
		function intersection(left, right) {
			return new ZodIntersection({
				type: "intersection",
				left,
				right
			});
		}
		const ZodEnum = /*@__PURE__*/ $constructor("ZodEnum", (inst, def) => {
			$ZodEnum.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => enumProcessor(inst, ctx, json, params);
			inst.enum = def.entries;
			inst.options = [...inst._zod.values];
			const keys = new Set(Object.keys(def.entries));
			inst.extract = (values, params) => {
				const newEntries = {};
				for (const value of values) if (keys.has(value)) newEntries[value] = def.entries[value];
				else throw new Error(`Key ${value} not found in enum`);
				return new ZodEnum({
					...def,
					checks: [],
					...normalizeParams(params),
					entries: newEntries
				});
			};
			inst.exclude = (values, params) => {
				const newEntries = { ...def.entries };
				for (const value of values) if (keys.has(value)) delete newEntries[value];
				else throw new Error(`Key ${value} not found in enum`);
				return new ZodEnum({
					...def,
					checks: [],
					...normalizeParams(params),
					entries: newEntries
				});
			};
		});
		function _enum(values, params) {
			const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
			return new ZodEnum({
				type: "enum",
				entries,
				...normalizeParams(params)
			});
		}
		const ZodLiteral = /*@__PURE__*/ $constructor("ZodLiteral", (inst, def) => {
			$ZodLiteral.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => literalProcessor(inst, ctx, json, params);
			inst.values = new Set(def.values);
			Object.defineProperty(inst, "value", { get() {
				if (def.values.length > 1) throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
				return def.values[0];
			} });
		});
		function literal(value, params) {
			return new ZodLiteral({
				type: "literal",
				values: Array.isArray(value) ? value : [value],
				...normalizeParams(params)
			});
		}
		const ZodTransform = /*@__PURE__*/ $constructor("ZodTransform", (inst, def) => {
			_ensureDefaultMemoizer();
			$ZodTransform.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => transformProcessor(inst, ctx, json, params);
			inst._zod.parse = (payload, _ctx) => {
				if (_ctx.direction === "backward") throw new $ZodEncodeError(inst.constructor.name);
				payload.addIssue = (issue$1) => {
					if (typeof issue$1 === "string") payload.issues.push(issue(issue$1, payload.value, def));
					else {
						const _issue = issue$1;
						if (_issue.fatal) _issue.continue = false;
						_issue.code ?? (_issue.code = "custom");
						if (!("input" in _issue)) _issue.input = payload.value;
						_issue.inst ?? (_issue.inst = inst);
						payload.issues.push(issue(_issue));
					}
				};
				const output = def.transform(payload.value, payload);
				if (output instanceof Promise) return output.then((output) => {
					payload.value = output;
					return payload;
				});
				payload.value = output;
				return payload;
			};
		});
		function transform(fn) {
			return new ZodTransform({
				type: "transform",
				transform: fn
			});
		}
		const ZodOptional = /*@__PURE__*/ $constructor("ZodOptional", (inst, def) => {
			$ZodOptional.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function optional(innerType) {
			return new ZodOptional({
				type: "optional",
				innerType
			});
		}
		const ZodExactOptional = /*@__PURE__*/ $constructor("ZodExactOptional", (inst, def) => {
			$ZodExactOptional.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function exactOptional(innerType) {
			return new ZodExactOptional({
				type: "optional",
				innerType
			});
		}
		const ZodNullable = /*@__PURE__*/ $constructor("ZodNullable", (inst, def) => {
			$ZodNullable.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => nullableProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function nullable(innerType) {
			return new ZodNullable({
				type: "nullable",
				innerType
			});
		}
		const ZodDefault = /*@__PURE__*/ $constructor("ZodDefault", (inst, def) => {
			$ZodDefault.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => defaultProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
			inst.removeDefault = inst.unwrap;
		});
		function _default(innerType, defaultValue) {
			return new ZodDefault({
				type: "default",
				innerType,
				get defaultValue() {
					return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
				}
			});
		}
		const ZodPrefault = /*@__PURE__*/ $constructor("ZodPrefault", (inst, def) => {
			$ZodPrefault.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => prefaultProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function prefault(innerType, defaultValue) {
			return new ZodPrefault({
				type: "prefault",
				innerType,
				get defaultValue() {
					return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
				}
			});
		}
		const ZodNonOptional = /*@__PURE__*/ $constructor("ZodNonOptional", (inst, def) => {
			$ZodNonOptional.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => nonoptionalProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function nonoptional(innerType, params) {
			return new ZodNonOptional({
				type: "nonoptional",
				innerType,
				...normalizeParams(params)
			});
		}
		const ZodCatch = /*@__PURE__*/ $constructor("ZodCatch", (inst, def) => {
			$ZodCatch.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => catchProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
			inst.removeCatch = inst.unwrap;
		});
		function _catch(innerType, catchValue) {
			return new ZodCatch({
				type: "catch",
				innerType,
				catchValue: typeof catchValue === "function" ? catchValue : constantCatch(catchValue)
			});
		}
		const ZodPipe = /*@__PURE__*/ $constructor("ZodPipe", (inst, def) => {
			$ZodPipe.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => pipeProcessor(inst, ctx, json, params);
			inst.in = def.in;
			inst.out = def.out;
		});
		function pipe(in_, out) {
			return new ZodPipe({
				type: "pipe",
				in: in_,
				out
			});
		}
		const ZodReadonly = /*@__PURE__*/ $constructor("ZodReadonly", (inst, def) => {
			$ZodReadonly.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => readonlyProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function readonly(innerType) {
			return new ZodReadonly({
				type: "readonly",
				innerType
			});
		}
		const ZodCustom = /*@__PURE__*/ $constructor("ZodCustom", (inst, def) => {
			$ZodCustom.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => customProcessor(inst, ctx, json, params);
		});
		function refine(fn, _params = {}) {
			return /* @__PURE__ */ _refine(ZodCustom, fn, _params);
		}
		function superRefine(fn, params) {
			return /* @__PURE__ */ _superRefine(fn, params);
		}
		//#endregion
		//#region packages/client/ui-session-categories/src/typert.remote-client.js
		const _deepseek_ai_dsh_session_categories_sessionCategories_assignSession_parameter_0$schema = object({
			"sessionId": intersection(string(), unknown()).readonly(),
			"categoryId": union([literal(null), intersection(string(), unknown())]).readonly(),
			"expectedRevision": number().readonly()
		});
		const _deepseek_ai_dsh_session_categories_sessionCategories_assignSession_result$schema = union([object({
			"ok": literal(true).readonly(),
			"value": object({
				"revision": number().readonly(),
				"categories": array(object({
					"id": intersection(string(), unknown()).readonly(),
					"workspaceId": intersection(string(), unknown()).readonly(),
					"parentId": union([literal(null), intersection(string(), unknown())]).readonly(),
					"title": string().readonly(),
					"order": number().readonly()
				})).readonly(),
				"assignments": array(object({
					"sessionId": intersection(string(), unknown()).readonly(),
					"categoryId": intersection(string(), unknown()).readonly()
				})).readonly()
			}).readonly()
		}), object({
			"ok": literal(false).readonly(),
			"error": union([
				object({
					"code": literal("workspace-not-found").readonly(),
					"workspaceId": intersection(string(), unknown()).readonly()
				}),
				object({
					"code": literal("revision-conflict").readonly(),
					"revision": number().readonly()
				}),
				object({
					"code": literal("category-not-found").readonly(),
					"categoryId": intersection(string(), unknown()).readonly()
				}),
				object({
					"code": literal("parent-not-found").readonly(),
					"parentId": intersection(string(), unknown()).readonly()
				}),
				object({ "code": literal("cross-workspace").readonly() }),
				object({ "code": literal("cycle").readonly() }),
				object({
					"code": literal("anchor-not-found").readonly(),
					"anchorId": intersection(string(), unknown()).readonly()
				}),
				object({
					"code": literal("session-not-in-workspace").readonly(),
					"sessionId": intersection(string(), unknown()).readonly()
				}),
				object({
					"code": literal("archive-failed").readonly(),
					"operationId": intersection(string(), unknown()).readonly()
				})
			]).readonly()
		})]);
		const _deepseek_ai_dsh_session_categories_sessionCategories_create_parameter_0$schema = object({
			"workspaceId": intersection(string(), unknown()).readonly(),
			"parentId": union([literal(null), intersection(string(), unknown())]).readonly(),
			"title": string().readonly(),
			"beforeCategoryId": intersection(string(), unknown()).readonly().optional(),
			"expectedRevision": number().readonly()
		});
		const _deepseek_ai_dsh_session_categories_sessionCategories_create_result$schema = union([object({
			"ok": literal(true).readonly(),
			"value": object({
				"revision": number().readonly(),
				"categories": array(object({
					"id": intersection(string(), unknown()).readonly(),
					"workspaceId": intersection(string(), unknown()).readonly(),
					"parentId": union([literal(null), intersection(string(), unknown())]).readonly(),
					"title": string().readonly(),
					"order": number().readonly()
				})).readonly(),
				"assignments": array(object({
					"sessionId": intersection(string(), unknown()).readonly(),
					"categoryId": intersection(string(), unknown()).readonly()
				})).readonly()
			}).readonly()
		}), object({
			"ok": literal(false).readonly(),
			"error": union([
				object({
					"code": literal("workspace-not-found").readonly(),
					"workspaceId": intersection(string(), unknown()).readonly()
				}),
				object({
					"code": literal("revision-conflict").readonly(),
					"revision": number().readonly()
				}),
				object({
					"code": literal("category-not-found").readonly(),
					"categoryId": intersection(string(), unknown()).readonly()
				}),
				object({
					"code": literal("parent-not-found").readonly(),
					"parentId": intersection(string(), unknown()).readonly()
				}),
				object({ "code": literal("cross-workspace").readonly() }),
				object({ "code": literal("cycle").readonly() }),
				object({
					"code": literal("anchor-not-found").readonly(),
					"anchorId": intersection(string(), unknown()).readonly()
				}),
				object({
					"code": literal("session-not-in-workspace").readonly(),
					"sessionId": intersection(string(), unknown()).readonly()
				}),
				object({
					"code": literal("archive-failed").readonly(),
					"operationId": intersection(string(), unknown()).readonly()
				})
			]).readonly()
		})]);
		const _deepseek_ai_dsh_session_categories_sessionCategories_deleteCategory_parameter_0$schema = object({
			"categoryId": intersection(string(), unknown()).readonly(),
			"operationId": intersection(string(), unknown()).readonly(),
			"expectedRevision": number().readonly()
		});
		const _deepseek_ai_dsh_session_categories_sessionCategories_deleteCategory_result$schema = union([object({
			"ok": literal(true).readonly(),
			"value": object({
				"revision": number().readonly(),
				"categories": array(object({
					"id": intersection(string(), unknown()).readonly(),
					"workspaceId": intersection(string(), unknown()).readonly(),
					"parentId": union([literal(null), intersection(string(), unknown())]).readonly(),
					"title": string().readonly(),
					"order": number().readonly()
				})).readonly(),
				"assignments": array(object({
					"sessionId": intersection(string(), unknown()).readonly(),
					"categoryId": intersection(string(), unknown()).readonly()
				})).readonly()
			}).readonly()
		}), object({
			"ok": literal(false).readonly(),
			"error": union([
				object({
					"code": literal("workspace-not-found").readonly(),
					"workspaceId": intersection(string(), unknown()).readonly()
				}),
				object({
					"code": literal("revision-conflict").readonly(),
					"revision": number().readonly()
				}),
				object({
					"code": literal("category-not-found").readonly(),
					"categoryId": intersection(string(), unknown()).readonly()
				}),
				object({
					"code": literal("parent-not-found").readonly(),
					"parentId": intersection(string(), unknown()).readonly()
				}),
				object({ "code": literal("cross-workspace").readonly() }),
				object({ "code": literal("cycle").readonly() }),
				object({
					"code": literal("anchor-not-found").readonly(),
					"anchorId": intersection(string(), unknown()).readonly()
				}),
				object({
					"code": literal("session-not-in-workspace").readonly(),
					"sessionId": intersection(string(), unknown()).readonly()
				}),
				object({
					"code": literal("archive-failed").readonly(),
					"operationId": intersection(string(), unknown()).readonly()
				})
			]).readonly()
		})]);
		const _deepseek_ai_dsh_session_categories_sessionCategories_get_parameter_0$schema = object({ "workspaceId": intersection(string(), unknown()).readonly() });
		const _deepseek_ai_dsh_session_categories_sessionCategories_get_result$schema = union([object({
			"ok": literal(true).readonly(),
			"value": object({
				"revision": number().readonly(),
				"categories": array(object({
					"id": intersection(string(), unknown()).readonly(),
					"workspaceId": intersection(string(), unknown()).readonly(),
					"parentId": union([literal(null), intersection(string(), unknown())]).readonly(),
					"title": string().readonly(),
					"order": number().readonly()
				})).readonly(),
				"assignments": array(object({
					"sessionId": intersection(string(), unknown()).readonly(),
					"categoryId": intersection(string(), unknown()).readonly()
				})).readonly()
			}).readonly()
		}), object({
			"ok": literal(false).readonly(),
			"error": object({
				"code": literal("workspace-not-found").readonly(),
				"workspaceId": intersection(string(), unknown()).readonly()
			}).readonly()
		})]);
		const _deepseek_ai_dsh_session_categories_sessionCategories_moveCategory_parameter_0$schema = object({
			"categoryId": intersection(string(), unknown()).readonly(),
			"parentId": union([literal(null), intersection(string(), unknown())]).readonly(),
			"beforeCategoryId": intersection(string(), unknown()).readonly().optional(),
			"expectedRevision": number().readonly()
		});
		const _deepseek_ai_dsh_session_categories_sessionCategories_moveCategory_result$schema = union([object({
			"ok": literal(true).readonly(),
			"value": object({
				"revision": number().readonly(),
				"categories": array(object({
					"id": intersection(string(), unknown()).readonly(),
					"workspaceId": intersection(string(), unknown()).readonly(),
					"parentId": union([literal(null), intersection(string(), unknown())]).readonly(),
					"title": string().readonly(),
					"order": number().readonly()
				})).readonly(),
				"assignments": array(object({
					"sessionId": intersection(string(), unknown()).readonly(),
					"categoryId": intersection(string(), unknown()).readonly()
				})).readonly()
			}).readonly()
		}), object({
			"ok": literal(false).readonly(),
			"error": union([
				object({
					"code": literal("workspace-not-found").readonly(),
					"workspaceId": intersection(string(), unknown()).readonly()
				}),
				object({
					"code": literal("revision-conflict").readonly(),
					"revision": number().readonly()
				}),
				object({
					"code": literal("category-not-found").readonly(),
					"categoryId": intersection(string(), unknown()).readonly()
				}),
				object({
					"code": literal("parent-not-found").readonly(),
					"parentId": intersection(string(), unknown()).readonly()
				}),
				object({ "code": literal("cross-workspace").readonly() }),
				object({ "code": literal("cycle").readonly() }),
				object({
					"code": literal("anchor-not-found").readonly(),
					"anchorId": intersection(string(), unknown()).readonly()
				}),
				object({
					"code": literal("session-not-in-workspace").readonly(),
					"sessionId": intersection(string(), unknown()).readonly()
				}),
				object({
					"code": literal("archive-failed").readonly(),
					"operationId": intersection(string(), unknown()).readonly()
				})
			]).readonly()
		})]);
		const _deepseek_ai_dsh_session_categories_sessionCategories_moveSessions_parameter_0$schema = object({
			"sessionIds": array(intersection(string(), unknown())).readonly(),
			"categoryId": union([literal(null), intersection(string(), unknown())]).readonly(),
			"expectedRevision": number().readonly()
		});
		const _deepseek_ai_dsh_session_categories_sessionCategories_moveSessions_result$schema = union([object({
			"ok": literal(true).readonly(),
			"value": object({
				"revision": number().readonly(),
				"categories": array(object({
					"id": intersection(string(), unknown()).readonly(),
					"workspaceId": intersection(string(), unknown()).readonly(),
					"parentId": union([literal(null), intersection(string(), unknown())]).readonly(),
					"title": string().readonly(),
					"order": number().readonly()
				})).readonly(),
				"assignments": array(object({
					"sessionId": intersection(string(), unknown()).readonly(),
					"categoryId": intersection(string(), unknown()).readonly()
				})).readonly()
			}).readonly()
		}), object({
			"ok": literal(false).readonly(),
			"error": union([
				object({
					"code": literal("workspace-not-found").readonly(),
					"workspaceId": intersection(string(), unknown()).readonly()
				}),
				object({
					"code": literal("revision-conflict").readonly(),
					"revision": number().readonly()
				}),
				object({
					"code": literal("category-not-found").readonly(),
					"categoryId": intersection(string(), unknown()).readonly()
				}),
				object({
					"code": literal("parent-not-found").readonly(),
					"parentId": intersection(string(), unknown()).readonly()
				}),
				object({ "code": literal("cross-workspace").readonly() }),
				object({ "code": literal("cycle").readonly() }),
				object({
					"code": literal("anchor-not-found").readonly(),
					"anchorId": intersection(string(), unknown()).readonly()
				}),
				object({
					"code": literal("session-not-in-workspace").readonly(),
					"sessionId": intersection(string(), unknown()).readonly()
				}),
				object({
					"code": literal("archive-failed").readonly(),
					"operationId": intersection(string(), unknown()).readonly()
				})
			]).readonly()
		})]);
		const _deepseek_ai_dsh_session_categories_sessionCategories_rename_parameter_0$schema = object({
			"categoryId": intersection(string(), unknown()).readonly(),
			"title": string().readonly(),
			"expectedRevision": number().readonly()
		});
		const _deepseek_ai_dsh_session_categories_sessionCategories_rename_result$schema = union([object({
			"ok": literal(true).readonly(),
			"value": object({
				"revision": number().readonly(),
				"categories": array(object({
					"id": intersection(string(), unknown()).readonly(),
					"workspaceId": intersection(string(), unknown()).readonly(),
					"parentId": union([literal(null), intersection(string(), unknown())]).readonly(),
					"title": string().readonly(),
					"order": number().readonly()
				})).readonly(),
				"assignments": array(object({
					"sessionId": intersection(string(), unknown()).readonly(),
					"categoryId": intersection(string(), unknown()).readonly()
				})).readonly()
			}).readonly()
		}), object({
			"ok": literal(false).readonly(),
			"error": union([
				object({
					"code": literal("workspace-not-found").readonly(),
					"workspaceId": intersection(string(), unknown()).readonly()
				}),
				object({
					"code": literal("revision-conflict").readonly(),
					"revision": number().readonly()
				}),
				object({
					"code": literal("category-not-found").readonly(),
					"categoryId": intersection(string(), unknown()).readonly()
				}),
				object({
					"code": literal("parent-not-found").readonly(),
					"parentId": intersection(string(), unknown()).readonly()
				}),
				object({ "code": literal("cross-workspace").readonly() }),
				object({ "code": literal("cycle").readonly() }),
				object({
					"code": literal("anchor-not-found").readonly(),
					"anchorId": intersection(string(), unknown()).readonly()
				}),
				object({
					"code": literal("session-not-in-workspace").readonly(),
					"sessionId": intersection(string(), unknown()).readonly()
				}),
				object({
					"code": literal("archive-failed").readonly(),
					"operationId": intersection(string(), unknown()).readonly()
				})
			]).readonly()
		})]);
		const _deepseek_ai_dsh_session_categories_sessionCategories_reorderCategory_parameter_0$schema = object({
			"categoryId": intersection(string(), unknown()).readonly(),
			"beforeCategoryId": intersection(string(), unknown()).readonly().optional(),
			"expectedRevision": number().readonly()
		});
		const _deepseek_ai_dsh_session_categories_sessionCategories_reorderCategory_result$schema = union([object({
			"ok": literal(true).readonly(),
			"value": object({
				"revision": number().readonly(),
				"categories": array(object({
					"id": intersection(string(), unknown()).readonly(),
					"workspaceId": intersection(string(), unknown()).readonly(),
					"parentId": union([literal(null), intersection(string(), unknown())]).readonly(),
					"title": string().readonly(),
					"order": number().readonly()
				})).readonly(),
				"assignments": array(object({
					"sessionId": intersection(string(), unknown()).readonly(),
					"categoryId": intersection(string(), unknown()).readonly()
				})).readonly()
			}).readonly()
		}), object({
			"ok": literal(false).readonly(),
			"error": union([
				object({
					"code": literal("workspace-not-found").readonly(),
					"workspaceId": intersection(string(), unknown()).readonly()
				}),
				object({
					"code": literal("revision-conflict").readonly(),
					"revision": number().readonly()
				}),
				object({
					"code": literal("category-not-found").readonly(),
					"categoryId": intersection(string(), unknown()).readonly()
				}),
				object({
					"code": literal("parent-not-found").readonly(),
					"parentId": intersection(string(), unknown()).readonly()
				}),
				object({ "code": literal("cross-workspace").readonly() }),
				object({ "code": literal("cycle").readonly() }),
				object({
					"code": literal("anchor-not-found").readonly(),
					"anchorId": intersection(string(), unknown()).readonly()
				}),
				object({
					"code": literal("session-not-in-workspace").readonly(),
					"sessionId": intersection(string(), unknown()).readonly()
				}),
				object({
					"code": literal("archive-failed").readonly(),
					"operationId": intersection(string(), unknown()).readonly()
				})
			]).readonly()
		})]);
		const _deepseek_ai_dsh_session_categories_sessionCategories_deleteSessions_parameter_0$schema = object({
			"sessionIds": array(string().readonly()).readonly(),
			"workspaceId": intersection(string(), unknown()).readonly().optional(),
			"reason": intersection(string(), unknown()).readonly().optional(),
			"scope": union([
				literal("record"),
				literal("artifacts"),
				literal("everything")
			]).readonly().optional()
		});
		const _deepseek_ai_dsh_session_categories_sessionCategories_deleteSessions_result$schema = union([object({
			"ok": literal(true).readonly(),
			"value": object({
				"batchId": string().readonly(),
				"deletedAt": string().readonly(),
				"sessionIds": array(string().readonly()).readonly(),
				"bytes": number().readonly(),
				"artifactCount": number().readonly(),
				"artifactBytes": number().readonly(),
				"releasedArchived": array(string().readonly()).readonly(),
				"detachedFrom": array(string().readonly()).readonly()
			}).readonly()
		}), object({
			"ok": literal(false).readonly(),
			"error": object({
				"code": string().readonly(),
				"sessionId": intersection(string(), unknown()).readonly().optional()
			}).readonly()
		})]);
		const _deepseek_ai_dsh_session_categories_sessionCategories_undoDeleteSessions_parameter_0$schema = object({ "batchId": intersection(string(), unknown()).readonly().optional() });
		const _deepseek_ai_dsh_session_categories_sessionCategories_undoDeleteSessions_result$schema = union([object({
			"ok": literal(true).readonly(),
			"value": object({
				"batchId": string().readonly(),
				"restored": array(string().readonly()).readonly(),
				"failed": array(object({
					"sessionId": string().readonly(),
					"reason": string().readonly()
				}).readonly()).readonly(),
				"reattached": array(string().readonly()).readonly(),
				"rearchived": array(string().readonly()).readonly()
			}).readonly()
		}), object({
			"ok": literal(false).readonly(),
			"error": object({ "code": string().readonly() }).readonly()
		})]);
		const _deepseek_ai_dsh_session_categories_sessionCategories_listRecycledSessions_result$schema = object({
			"ok": literal(true).readonly(),
			"value": object({
				"batches": array(object({
					"batchId": string().readonly(),
					"deletedAt": string().readonly(),
					"sessionIds": array(string().readonly()).readonly(),
					"bytes": number().readonly(),
					"reason": intersection(string(), unknown()).readonly().optional(),
					"scope": union([
						literal("record"),
						literal("artifacts"),
						literal("everything")
					]).readonly().optional(),
					"artifactCount": number().readonly().optional()
				}).readonly()).readonly(),
				"totalBytes": number().readonly()
			}).readonly()
		});
		const _deepseek_ai_dsh_session_categories_sessionCategories_sweepRecycledSessions_parameter_0$schema = object({
			"maxBatches": number().readonly().optional(),
			"maxAgeDays": number().readonly().optional()
		});
		const _deepseek_ai_dsh_session_categories_sessionCategories_sweepRecycledSessions_result$schema = object({
			"ok": literal(true).readonly(),
			"value": object({
				"removedBatches": array(string().readonly()).readonly(),
				"reclaimedBytes": number().readonly()
			}).readonly()
		});
		const _deepseek_ai_dsh_session_categories_sessionCategories_scanSession_parameter_0$schema = object({ "sessionId": string().readonly() });
		const _deepseek_ai_dsh_session_categories_sessionCategories_scanSession_result$schema = object({
			"ok": literal(true).readonly(),
			"value": object({
				"sessionId": string().readonly(),
				"cwd": string().readonly(),
				"storeBytes": number().readonly(),
				"directories": number().readonly(),
				"artifacts": array(object({
					"displayPath": string().readonly(),
					"bytes": number().readonly(),
					"ops": string().readonly()
				}).readonly()).readonly(),
				"refused": array(object({
					"path": string().readonly(),
					"reason": string().readonly()
				}).readonly()).readonly(),
				"artifactBytes": number().readonly(),
				"warnings": array(string().readonly()).readonly()
			}).readonly()
		});
		const _deepseek_ai_dsh_session_categories_sessionCategories_readTranscript_parameter_0$schema = object({
			"sessionId": string().readonly(),
			"limit": number().readonly().optional()
		});
		const _deepseek_ai_dsh_session_categories_sessionCategories_readTranscript_result$schema = object({
			"ok": literal(true).readonly(),
			"value": object({
				"sessionId": string().readonly(),
				"found": boolean().readonly(),
				"trashed": boolean().readonly(),
				"total": number().readonly(),
				"toolCalls": number().readonly(),
				"messages": array(object({
					"role": union([
						literal("user"),
						literal("assistant"),
						literal("tool")
					]).readonly(),
					"type": string().readonly(),
					"text": string().readonly(),
					"time": number().readonly().optional()
				}).readonly()).readonly()
			}).readonly()
		});
		const _deepseek_ai_dsh_session_categories_sessionCategories_listTrashedSessions_result$schema = object({
			"ok": literal(true).readonly(),
			"value": object({ "sessions": array(object({
				"sessionId": string().readonly(),
				"batchId": string().readonly(),
				"deletedAt": string().readonly(),
				"bytes": number().readonly(),
				"container": string().readonly()
			}).readonly()).readonly() }).readonly()
		});
		const _deepseek_ai_dsh_session_categories_sessionCategories_purgeBatch_parameter_0$schema = object({ "batchId": string().readonly() });
		const _deepseek_ai_dsh_session_categories_sessionCategories_purgeBatch_result$schema = union([object({
			"ok": literal(true).readonly(),
			"value": object({
				"batchId": string().readonly(),
				"reclaimedBytes": number().readonly()
			}).readonly()
		}), object({
			"ok": literal(false).readonly(),
			"error": object({
				"code": string().readonly(),
				"batchId": intersection(string(), unknown()).readonly().optional()
			}).readonly()
		})]);
		const TYPERT_REMOTE = {
			package: "dsh-workspace-folders",
			descriptors: [
				{
					id: "dsh-workspace-folders#sessionCategories/assignSession",
					service: "sessionCategories",
					namespace: "sessionCategories",
					method: "assignSession",
					invocation: { kind: "direct" },
					parameters: [{
						name: "request",
						wire: "request",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "dsh-workspace-folders/types#SessionCategoryAssignRequest",
							create: () => _deepseek_ai_dsh_session_categories_sessionCategories_assignSession_parameter_0$schema
						}
					}],
					result: {
						mode: "strict",
						typeSymbol: "dsh-workspace-folders/types#SessionCategoryMutationResult",
						create: () => _deepseek_ai_dsh_session_categories_sessionCategories_assignSession_result$schema
					},
					sourceLocation: {
						"file": "packages/workspace/session-categories/src/index.ts",
						"line": 182,
						"column": 3
					}
				},
				{
					id: "dsh-workspace-folders#sessionCategories/create",
					service: "sessionCategories",
					namespace: "sessionCategories",
					method: "create",
					invocation: { kind: "direct" },
					parameters: [{
						name: "request",
						wire: "request",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "dsh-workspace-folders/types#SessionCategoryCreateRequest",
							create: () => _deepseek_ai_dsh_session_categories_sessionCategories_create_parameter_0$schema
						}
					}],
					result: {
						mode: "strict",
						typeSymbol: "dsh-workspace-folders/types#SessionCategoryMutationResult",
						create: () => _deepseek_ai_dsh_session_categories_sessionCategories_create_result$schema
					},
					sourceLocation: {
						"file": "packages/workspace/session-categories/src/index.ts",
						"line": 89,
						"column": 3
					}
				},
				{
					id: "dsh-workspace-folders#sessionCategories/deleteCategory",
					service: "sessionCategories",
					namespace: "sessionCategories",
					method: "deleteCategory",
					invocation: { kind: "direct" },
					parameters: [{
						name: "request",
						wire: "request",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "dsh-workspace-folders/types#SessionCategoryDeleteRequest",
							create: () => _deepseek_ai_dsh_session_categories_sessionCategories_deleteCategory_parameter_0$schema
						}
					}],
					result: {
						mode: "strict",
						typeSymbol: "dsh-workspace-folders/types#SessionCategoryMutationResult",
						create: () => _deepseek_ai_dsh_session_categories_sessionCategories_deleteCategory_result$schema
					},
					sourceLocation: {
						"file": "packages/workspace/session-categories/src/index.ts",
						"line": 212,
						"column": 3
					}
				},
				{
					id: "dsh-workspace-folders#sessionCategories/get",
					service: "sessionCategories",
					namespace: "sessionCategories",
					method: "get",
					invocation: { kind: "direct" },
					parameters: [{
						name: "request",
						wire: "request",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "dsh-workspace-folders/types#SessionCategoryGetRequest",
							create: () => _deepseek_ai_dsh_session_categories_sessionCategories_get_parameter_0$schema
						}
					}],
					result: {
						mode: "strict",
						typeSymbol: "dsh-workspace-folders/types#SessionCategoryGetResult",
						create: () => _deepseek_ai_dsh_session_categories_sessionCategories_get_result$schema
					},
					sourceLocation: {
						"file": "packages/workspace/session-categories/src/index.ts",
						"line": 81,
						"column": 3
					}
				},
				{
					id: "dsh-workspace-folders#sessionCategories/moveCategory",
					service: "sessionCategories",
					namespace: "sessionCategories",
					method: "moveCategory",
					invocation: { kind: "direct" },
					parameters: [{
						name: "request",
						wire: "request",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "dsh-workspace-folders/types#SessionCategoryMoveRequest",
							create: () => _deepseek_ai_dsh_session_categories_sessionCategories_moveCategory_parameter_0$schema
						}
					}],
					result: {
						mode: "strict",
						typeSymbol: "dsh-workspace-folders/types#SessionCategoryMutationResult",
						create: () => _deepseek_ai_dsh_session_categories_sessionCategories_moveCategory_result$schema
					},
					sourceLocation: {
						"file": "packages/workspace/session-categories/src/index.ts",
						"line": 124,
						"column": 3
					}
				},
				{
					id: "dsh-workspace-folders#sessionCategories/moveSessions",
					service: "sessionCategories",
					namespace: "sessionCategories",
					method: "moveSessions",
					invocation: { kind: "direct" },
					parameters: [{
						name: "request",
						wire: "request",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "dsh-workspace-folders/types#SessionCategoryMoveSessionsRequest",
							create: () => _deepseek_ai_dsh_session_categories_sessionCategories_moveSessions_parameter_0$schema
						}
					}],
					result: {
						mode: "strict",
						typeSymbol: "dsh-workspace-folders/types#SessionCategoryMutationResult",
						create: () => _deepseek_ai_dsh_session_categories_sessionCategories_moveSessions_result$schema
					},
					sourceLocation: {
						"file": "packages/workspace/session-categories/src/index.ts",
						"line": 188,
						"column": 3
					}
				},
				{
					id: "dsh-workspace-folders#sessionCategories/rename",
					service: "sessionCategories",
					namespace: "sessionCategories",
					method: "rename",
					invocation: { kind: "direct" },
					parameters: [{
						name: "request",
						wire: "request",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "dsh-workspace-folders/types#SessionCategoryRenameRequest",
							create: () => _deepseek_ai_dsh_session_categories_sessionCategories_rename_parameter_0$schema
						}
					}],
					result: {
						mode: "strict",
						typeSymbol: "dsh-workspace-folders/types#SessionCategoryMutationResult",
						create: () => _deepseek_ai_dsh_session_categories_sessionCategories_rename_result$schema
					},
					sourceLocation: {
						"file": "packages/workspace/session-categories/src/index.ts",
						"line": 113,
						"column": 3
					}
				},
				{
					id: "dsh-workspace-folders#sessionCategories/reorderCategory",
					service: "sessionCategories",
					namespace: "sessionCategories",
					method: "reorderCategory",
					invocation: { kind: "direct" },
					parameters: [{
						name: "request",
						wire: "request",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "dsh-workspace-folders/types#SessionCategoryReorderRequest",
							create: () => _deepseek_ai_dsh_session_categories_sessionCategories_reorderCategory_parameter_0$schema
						}
					}],
					result: {
						mode: "strict",
						typeSymbol: "dsh-workspace-folders/types#SessionCategoryMutationResult",
						create: () => _deepseek_ai_dsh_session_categories_sessionCategories_reorderCategory_result$schema
					},
					sourceLocation: {
						"file": "packages/workspace/session-categories/src/index.ts",
						"line": 167,
						"column": 3
					}
				},
				{
					id: "dsh-workspace-folders#sessionCategories/deleteSessions",
					service: "sessionCategories",
					namespace: "sessionCategories",
					method: "deleteSessions",
					invocation: { kind: "direct" },
					parameters: [{
						name: "request",
						wire: "request",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "dsh-workspace-folders/types#SessionRecycleDeleteRequest",
							create: () => _deepseek_ai_dsh_session_categories_sessionCategories_deleteSessions_parameter_0$schema
						}
					}],
					result: {
						mode: "strict",
						typeSymbol: "dsh-workspace-folders/types#SessionRecycleDeleteResult",
						create: () => _deepseek_ai_dsh_session_categories_sessionCategories_deleteSessions_result$schema
					},
					sourceLocation: {
						"file": "packages/workspace/session-categories/src/index.ts",
						"line": 270,
						"column": 3
					}
				},
				{
					id: "dsh-workspace-folders#sessionCategories/undoDeleteSessions",
					service: "sessionCategories",
					namespace: "sessionCategories",
					method: "undoDeleteSessions",
					invocation: { kind: "direct" },
					parameters: [{
						name: "request",
						wire: "request",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "dsh-workspace-folders/types#SessionRecycleUndoRequest",
							create: () => _deepseek_ai_dsh_session_categories_sessionCategories_undoDeleteSessions_parameter_0$schema
						}
					}],
					result: {
						mode: "strict",
						typeSymbol: "dsh-workspace-folders/types#SessionRecycleUndoResult",
						create: () => _deepseek_ai_dsh_session_categories_sessionCategories_undoDeleteSessions_result$schema
					},
					sourceLocation: {
						"file": "packages/workspace/session-categories/src/index.ts",
						"line": 360,
						"column": 3
					}
				},
				{
					id: "dsh-workspace-folders#sessionCategories/listRecycledSessions",
					service: "sessionCategories",
					namespace: "sessionCategories",
					method: "listRecycledSessions",
					invocation: { kind: "direct" },
					parameters: [],
					result: {
						mode: "strict",
						typeSymbol: "dsh-workspace-folders/types#SessionRecycleListResult",
						create: () => _deepseek_ai_dsh_session_categories_sessionCategories_listRecycledSessions_result$schema
					},
					sourceLocation: {
						"file": "packages/workspace/session-categories/src/index.ts",
						"line": 418,
						"column": 3
					}
				},
				{
					id: "dsh-workspace-folders#sessionCategories/sweepRecycledSessions",
					service: "sessionCategories",
					namespace: "sessionCategories",
					method: "sweepRecycledSessions",
					invocation: { kind: "direct" },
					parameters: [{
						name: "request",
						wire: "request",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "dsh-workspace-folders/types#SessionRecycleSweepRequest",
							create: () => _deepseek_ai_dsh_session_categories_sessionCategories_sweepRecycledSessions_parameter_0$schema
						}
					}],
					result: {
						mode: "strict",
						typeSymbol: "dsh-workspace-folders/types#SessionRecycleSweepResult",
						create: () => _deepseek_ai_dsh_session_categories_sessionCategories_sweepRecycledSessions_result$schema
					},
					sourceLocation: {
						"file": "packages/workspace/session-categories/src/index.ts",
						"line": 447,
						"column": 3
					}
				},
				{
					id: "dsh-workspace-folders#sessionCategories/scanSession",
					service: "sessionCategories",
					namespace: "sessionCategories",
					method: "scanSession",
					invocation: { kind: "direct" },
					parameters: [{
						name: "request",
						wire: "request",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "dsh-workspace-folders/types#SessionRecycleScanRequest",
							create: () => _deepseek_ai_dsh_session_categories_sessionCategories_scanSession_parameter_0$schema
						}
					}],
					result: {
						mode: "strict",
						typeSymbol: "dsh-workspace-folders/types#SessionRecycleScanResult",
						create: () => _deepseek_ai_dsh_session_categories_sessionCategories_scanSession_result$schema
					},
					sourceLocation: {
						"file": "packages/workspace/session-categories/src/index.ts",
						"line": 465,
						"column": 3
					}
				},
				{
					id: "dsh-workspace-folders#sessionCategories/readTranscript",
					service: "sessionCategories",
					namespace: "sessionCategories",
					method: "readTranscript",
					invocation: { kind: "direct" },
					parameters: [{
						name: "request",
						wire: "request",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "dsh-workspace-folders/types#SessionRecycleTranscriptRequest",
							create: () => _deepseek_ai_dsh_session_categories_sessionCategories_readTranscript_parameter_0$schema
						}
					}],
					result: {
						mode: "strict",
						typeSymbol: "dsh-workspace-folders/types#SessionRecycleTranscriptResult",
						create: () => _deepseek_ai_dsh_session_categories_sessionCategories_readTranscript_result$schema
					},
					sourceLocation: {
						"file": "packages/workspace/session-categories/src/index.ts",
						"line": 493,
						"column": 3
					}
				},
				{
					id: "dsh-workspace-folders#sessionCategories/listTrashedSessions",
					service: "sessionCategories",
					namespace: "sessionCategories",
					method: "listTrashedSessions",
					invocation: { kind: "direct" },
					parameters: [],
					result: {
						mode: "strict",
						typeSymbol: "dsh-workspace-folders/types#SessionRecycleTrashedResult",
						create: () => _deepseek_ai_dsh_session_categories_sessionCategories_listTrashedSessions_result$schema
					},
					sourceLocation: {
						"file": "packages/workspace/session-categories/src/index.ts",
						"line": 504,
						"column": 3
					}
				},
				{
					id: "dsh-workspace-folders#sessionCategories/purgeBatch",
					service: "sessionCategories",
					namespace: "sessionCategories",
					method: "purgeBatch",
					invocation: { kind: "direct" },
					parameters: [{
						name: "request",
						wire: "request",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "dsh-workspace-folders/types#SessionRecyclePurgeRequest",
							create: () => _deepseek_ai_dsh_session_categories_sessionCategories_purgeBatch_parameter_0$schema
						}
					}],
					result: {
						mode: "strict",
						typeSymbol: "dsh-workspace-folders/types#SessionRecyclePurgeResult",
						create: () => _deepseek_ai_dsh_session_categories_sessionCategories_purgeBatch_result$schema
					},
					sourceLocation: {
						"file": "packages/workspace/session-categories/src/index.ts",
						"line": 519,
						"column": 3
					}
				}
			]
		};
		//#endregion
		//#region packages/client/ui-session-categories/src/client/stores.ts
		/**
		* The workspace browser's viewing store: the session-list grouping mode,
		* persisted across reloads. Module level exports the factory only (a
		* module-level handle would pin the store identity across plugin reloads);
		* register() receives the factory and the browser derives its PropsStore
		* share from the return type.
		*/
		/** Browser-local order account for the hierarchy-free flat Session list. */
		const FLAT_SESSION_ORDER_KEY = "__flat_session_order__";
		/**
		* Expansion key of the synthetic "Unfiled" bucket that collects root Workspace
		* sections no folder owns. It is not a real folder and never persists as one.
		*/
		const UNFILED_WORKSPACE_FOLDER_KEY = "__unfiled_workspaces__";
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
		function repackWorkspaceFolderSiblings(draft, parentId, movingId, beforeId) {
			const folders = draft.workspaceFolders ?? [];
			const ordered = folders.filter((folder) => folder.parentId === parentId && folder.id !== movingId).sort((left, right) => left.order - right.order || (left.id < right.id ? -1 : 1));
			if (movingId !== void 0) {
				const moving = folders.find((folder) => folder.id === movingId);
				if (moving !== void 0) {
					const anchorIndex = beforeId === void 0 ? -1 : ordered.findIndex((folder) => folder.id === beforeId);
					ordered.splice(anchorIndex === -1 ? ordered.length : anchorIndex, 0, moving);
				}
			}
			ordered.forEach((folder, index) => {
				folder.order = index;
			});
		}
		/**
		* Prefix for a category's own Session-order account key.
		*
		* A category keeps a manual order separate from the Workspace account: a drag
		* inside a category must not reshuffle the Workspace's unclassified tail. The
		* prefix also keeps these keys out of the UUID / {@link FLAT_SESSION_ORDER_KEY}
		* / `''` namespaces that already share the one `sessionOrderByAccount` map.
		*/
		const CATEGORY_ORDER_PREFIX = "category:";
		/**
		* Build one category's Session-order account key.
		* @param categoryId - Host-assigned category id.
		* @returns the key to store that category's manual order under.
		*/
		function categoryOrderKey(categoryId) {
			return `${CATEGORY_ORDER_PREFIX}${categoryId}`;
		}
		/**
		* Create the workspace browser viewing store handle.
		* @returns the store handle (spec + type + identity + factory in one).
		*/
		function createWorkspaceViewStore() {
			return (0, _deepseek_ai_dsh_client_store.defineStore)({
				init: () => ({
					groupBy: "workspace",
					orderBy: "updated",
					archivedFilter: "default",
					groupExpansion: {},
					categoryExpansion: {},
					sessionOrderByAccount: {},
					sessionUpdatedAtByAccount: {},
					hoistPinned: true,
					managerOpen: false,
					workspaceFolders: [],
					workspaceFolderAssignments: {},
					workspaceFolderExpansion: {},
					workspaceIcons: {},
					workspaceFolderIcons: {}
				}),
				persist: "dsh.session-categories.view.v2",
				actions: {
					setGroupBy: (d, mode) => {
						d.groupBy = mode;
					},
					setOrderBy: (d, mode) => {
						d.orderBy = mode;
					},
					setArchivedFilter: (d, filter) => {
						d.archivedFilter = filter;
					},
					setGroupExpanded: (d, key, expanded) => {
						d.groupExpansion[key] = expanded;
					},
					setCategoryExpanded: (d, key, expanded) => {
						d.categoryExpansion[key] = expanded;
					},
					retainCategoryKeys: (d, categoryKeys) => {
						const retained = new Set(categoryKeys);
						d.categoryExpansion = Object.fromEntries(Object.entries(d.categoryExpansion).filter(([key]) => retained.has(key)));
					},
					retainAccountKeys: (d, workspaceKeys) => {
						const retained = new Set(workspaceKeys);
						const keep = (key) => retained.has(key) || key.startsWith("category:");
						d.groupExpansion = Object.fromEntries(Object.entries(d.groupExpansion).filter(([key]) => retained.has(key)));
						d.sessionOrderByAccount = Object.fromEntries(Object.entries(d.sessionOrderByAccount).filter(([key]) => keep(key)));
						d.sessionUpdatedAtByAccount = Object.fromEntries(Object.entries(d.sessionUpdatedAtByAccount).filter(([key]) => retained.has(key)));
					},
					syncSessionOrderAccount: (d, accountKey, order, updatedAt) => {
						d.sessionOrderByAccount[accountKey] = order;
						d.sessionUpdatedAtByAccount[accountKey] = updatedAt;
					},
					setSessionOrder: (d, accountKey, order) => {
						d.sessionOrderByAccount[accountKey] = order;
					},
					setHoistPinned: (d, hoist) => {
						d.hoistPinned = hoist;
					},
					openManager: (d) => {
						d.managerOpen = true;
					},
					closeManager: (d) => {
						d.managerOpen = false;
					},
					createWorkspaceFolder: (d, folder) => {
						(d.workspaceFolders ?? (d.workspaceFolders = [])).push(folder);
					},
					renameWorkspaceFolder: (d, folderId, title) => {
						const folder = d.workspaceFolders?.find((candidate) => candidate.id === folderId);
						if (folder !== void 0) folder.title = title;
					},
					deleteWorkspaceFolder: (d, folderId) => {
						const folders = d.workspaceFolders ?? [];
						const target = folders.find((folder) => folder.id === folderId);
						if (target === void 0) return;
						for (const folder of folders) if (folder.parentId === folderId) folder.parentId = target.parentId;
						d.workspaceFolders = folders.filter((folder) => folder.id !== folderId);
						repackWorkspaceFolderSiblings(d, target.parentId);
						const assignments = d.workspaceFolderAssignments;
						if (assignments !== void 0) {
							for (const [workspaceId, assignedFolderId] of Object.entries(assignments)) if (assignedFolderId === folderId) delete assignments[workspaceId];
						}
						if (d.workspaceFolderExpansion !== void 0) delete d.workspaceFolderExpansion[folderId];
					},
					moveWorkspaceFolder: (d, folderId, parentId, beforeId) => {
						const folders = d.workspaceFolders ?? [];
						const target = folders.find((folder) => folder.id === folderId);
						if (target === void 0) return;
						if (parentId === folderId) return;
						let cursor = parentId;
						while (cursor !== null) {
							if (cursor === folderId) return;
							cursor = folders.find((folder) => folder.id === cursor)?.parentId ?? null;
						}
						const previousParent = target.parentId;
						target.parentId = parentId;
						repackWorkspaceFolderSiblings(d, parentId, folderId, beforeId);
						if (previousParent !== parentId) repackWorkspaceFolderSiblings(d, previousParent);
					},
					setWorkspaceFolderExpanded: (d, key, expanded) => {
						const expansion = d.workspaceFolderExpansion ?? (d.workspaceFolderExpansion = {});
						expansion[key] = expanded;
					},
					assignWorkspaceFolder: (d, workspaceId, folderId) => {
						const assignments = d.workspaceFolderAssignments ?? (d.workspaceFolderAssignments = {});
						if (folderId === null) delete assignments[workspaceId];
						else assignments[workspaceId] = folderId;
					},
					pruneWorkspaceFolderAssignments: (d, workspaceIds) => {
						const assignments = d.workspaceFolderAssignments;
						if (assignments === void 0) return;
						const known = new Set(workspaceIds);
						for (const workspaceId of Object.keys(assignments)) if (!known.has(workspaceId)) delete assignments[workspaceId];
					},
					setWorkspaceIcon: (d, workspaceId, icon) => {
						const icons = d.workspaceIcons ?? (d.workspaceIcons = {});
						if (icon === null) delete icons[workspaceId];
						else icons[workspaceId] = icon;
					},
					setWorkspaceFolderIcon: (d, folderId, icon) => {
						const icons = d.workspaceFolderIcons ?? (d.workspaceFolderIcons = {});
						if (icon === null) delete icons[folderId];
						else icons[folderId] = icon;
					},
					pruneWorkspaceIcons: (d, workspaceIds) => {
						const icons = d.workspaceIcons;
						if (icons === void 0) return;
						const known = new Set(workspaceIds);
						for (const workspaceId of Object.keys(icons)) if (!known.has(workspaceId)) delete icons[workspaceId];
					}
				}
			});
		}
		//#endregion
		//#region packages/client/ui-session-categories/src/client/controller.ts
		const INITIAL_VIEW = Object.freeze({
			status: "cold",
			snapshots: Object.freeze({}),
			error: null
		});
		const OK = Object.freeze({ ok: true });
		const DISPOSED = Object.freeze({
			ok: false,
			error: Object.freeze({
				code: "disposed",
				message: "session categories controller is disposed"
			})
		});
		function transportFailure(error, fallback) {
			if (typeof error === "object" && error !== null && "code" in error && "message" in error) {
				const carried = error;
				return {
					ok: false,
					error: {
						code: carried.code,
						message: carried.message
					}
				};
			}
			return {
				ok: false,
				error: {
					code: "transport",
					message: error instanceof Error ? error.message : fallback
				}
			};
		}
		function errorMessage(result) {
			return "message" in result.error ? result.error.message : result.error.code;
		}
		function sameSnapshot(left, right) {
			if (left === right) return true;
			if (left === void 0 || left.revision !== right.revision) return false;
			if (left.categories.length !== right.categories.length || left.assignments.length !== right.assignments.length) return false;
			return left.categories.every((category, index) => {
				const other = right.categories[index];
				return other !== void 0 && category.id === other.id && category.workspaceId === other.workspaceId && category.parentId === other.parentId && category.title === other.title && category.order === other.order;
			}) && left.assignments.every((assignment, index) => {
				const other = right.assignments[index];
				return other !== void 0 && assignment.sessionId === other.sessionId && assignment.categoryId === other.categoryId;
			});
		}
		function isRefreshMessage(value) {
			return typeof value === "object" && value !== null && value.type === "refresh" && typeof value.workspaceId === "string";
		}
		/** Stable observable and serialized Remote client for all loaded Workspaces. */
		var SessionCategoriesController = class SessionCategoriesController {
			remote;
			view = INITIAL_VIEW;
			listeners = /* @__PURE__ */ new Set();
			loads = /* @__PURE__ */ new Map();
			operationTail = Promise.resolve();
			channel;
			windowTarget;
			documentTarget;
			disposed = false;
			/**
			* @param remote - generated `sessionCategories` Remote namespace.
			* @param options - replaceable browser event and channel dependencies.
			*/
			constructor(remote, options = {}) {
				this.remote = remote;
				const defaultChannelFactory = typeof window === "undefined" || typeof BroadcastChannel === "undefined" ? void 0 : () => new BroadcastChannel("dsh.session-categories.v1");
				this.channel = (options.channelFactory ?? defaultChannelFactory)?.();
				this.windowTarget = options.windowTarget ?? (typeof window === "undefined" ? void 0 : window);
				this.documentTarget = options.documentTarget ?? (typeof document === "undefined" ? void 0 : document);
				if (this.channel !== void 0) this.channel.onmessage = this.onChannelMessage;
				this.windowTarget?.addEventListener("focus", this.onFocus);
				this.documentTarget?.addEventListener("visibilitychange", this.onVisibilityChange);
			}
			/** Return the cached immutable view. */
			getSnapshot = () => this.view;
			/** Subscribe to view replacements. */
			subscribe = (listener) => {
				if (this.disposed) return () => void 0;
				this.listeners.add(listener);
				return () => {
					this.listeners.delete(listener);
				};
			};
			/** Load a Workspace once, sharing an in-flight read. */
			ensure(workspaceId) {
				if (this.disposed) return Promise.resolve(DISPOSED);
				if (this.view.snapshots[workspaceId] !== void 0) return Promise.resolve(OK);
				return this.refresh(workspaceId);
			}
			/** Re-read one Workspace, sharing an in-flight read. */
			refresh(workspaceId) {
				if (this.disposed) return Promise.resolve(DISPOSED);
				const existing = this.loads.get(workspaceId);
				if (existing !== void 0) return existing;
				this.publish({
					status: "loading",
					snapshots: this.view.snapshots,
					error: null
				});
				const pending = this.load(workspaceId);
				this.loads.set(workspaceId, pending);
				return pending.finally(() => {
					this.loads.delete(workspaceId);
				});
			}
			/** Re-read every Workspace already represented in the view. */
			async resyncLoaded() {
				if (this.disposed) return;
				await this.enqueue(async () => {
					await Promise.all(Object.keys(this.view.snapshots).map(async (workspaceId) => {
						await this.refresh(workspaceId);
					}));
					return OK;
				});
			}
			/** Create a category within one Workspace. */
			create(workspaceId, parentId, title, beforeCategoryId) {
				return this.mutate(workspaceId, (revision) => this.remote.create({
					workspaceId,
					parentId,
					title,
					...beforeCategoryId === void 0 ? {} : { beforeCategoryId },
					expectedRevision: revision
				}));
			}
			/** Rename a loaded category. */
			rename(categoryId, title) {
				return this.mutateCategory(categoryId, (revision) => this.remote.rename({
					categoryId,
					title,
					expectedRevision: revision
				}));
			}
			/** Move a loaded category to another parent and ordered position. */
			moveCategory(categoryId, parentId, beforeCategoryId) {
				return this.mutateCategory(categoryId, (revision) => this.remote.moveCategory({
					categoryId,
					parentId,
					...beforeCategoryId === void 0 ? {} : { beforeCategoryId },
					expectedRevision: revision
				}));
			}
			/** Reorder a loaded category among its siblings. */
			reorderCategory(categoryId, beforeCategoryId) {
				return this.mutateCategory(categoryId, (revision) => this.remote.reorderCategory({
					categoryId,
					...beforeCategoryId === void 0 ? {} : { beforeCategoryId },
					expectedRevision: revision
				}));
			}
			/** Set or clear category membership for Sessions in one Workspace. */
			assignSessions(workspaceId, sessionIds, categoryId) {
				return this.mutate(workspaceId, (revision) => this.remote.moveSessions({
					sessionIds,
					categoryId,
					expectedRevision: revision
				}));
			}
			/** Recursively delete one loaded category using a retry-stable operation id. */
			deleteCategory(categoryId, operationId) {
				return this.mutateCategory(categoryId, (revision) => this.remote.deleteCategory({
					categoryId,
					operationId,
					expectedRevision: revision
				}));
			}
			/**
			* Turn one Remote failure into the code string the verbs report.
			*
			* @param carried - the error branch of a Remote result.
			* @param fallback - code used when the failure carries no usable code.
			* @returns the Host's stable failure code.
			*/
			static codeOf(carried, fallback) {
				if (carried === void 0) return fallback;
				const code = carried.code;
				return typeof code === "string" && code !== "" ? code : fallback;
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
			async deleteSession(sessionId, scope = "record") {
				if (this.disposed) return {
					ok: false,
					error: { code: "disposed" }
				};
				let carried;
				try {
					carried = await this.remote.deleteSessions({
						sessionIds: [sessionId],
						scope
					});
				} catch {
					return {
						ok: false,
						error: {
							code: "route-failed",
							sessionId
						}
					};
				}
				if (!carried.ok) return {
					ok: false,
					error: {
						code: SessionCategoriesController.codeOf(carried.error, "delete-failed"),
						sessionId
					}
				};
				const result = carried.value;
				if (result === void 0 || result.ok !== true) return {
					ok: false,
					error: {
						code: result?.error?.code ?? "delete-failed",
						sessionId
					}
				};
				for (const workspaceId of Object.keys(this.view.snapshots)) this.pruneAssignment(workspaceId, sessionId);
				return {
					ok: true,
					value: {
						batchId: result.value.batchId,
						reclaimedBytes: result.value.bytes,
						artifactCount: result.value.artifactCount
					}
				};
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
			async scanSession(sessionId) {
				if (this.disposed) return {
					ok: false,
					error: { code: "disposed" }
				};
				let carried;
				try {
					carried = await this.remote.scanSession({ sessionId });
				} catch {
					return {
						ok: false,
						error: {
							code: "route-failed",
							sessionId
						}
					};
				}
				if (!carried.ok) return {
					ok: false,
					error: {
						code: SessionCategoriesController.codeOf(carried.error, "scan-failed"),
						sessionId
					}
				};
				const result = carried.value;
				if (result === void 0 || result.ok !== true) return {
					ok: false,
					error: {
						code: result?.error?.code ?? "scan-failed",
						sessionId
					}
				};
				const report = result.value;
				return {
					ok: true,
					value: {
						cwd: report.cwd,
						store: {
							directories: [],
							bytes: report.storeBytes
						},
						artifacts: {
							allowed: report.artifacts.map((artifact) => ({
								displayPath: artifact.displayPath,
								bytes: artifact.bytes
							})),
							refused: report.refused.map((row) => ({
								path: row.path,
								reason: row.reason
							})),
							totalBytes: report.artifactBytes
						},
						warnings: report.warnings
					}
				};
			}
			/**
			* Put the most recently deleted batch back.
			*
			* @returns the restored ids plus any entry that could not return.
			*/
			async undoDeleteSession() {
				if (this.disposed) return {
					ok: false,
					error: { code: "disposed" }
				};
				let carried;
				try {
					carried = await this.remote.undoDeleteSessions({});
				} catch {
					return {
						ok: false,
						error: { code: "route-failed" }
					};
				}
				if (!carried.ok) return {
					ok: false,
					error: { code: SessionCategoriesController.codeOf(carried.error, "undo-failed") }
				};
				const result = carried.value;
				if (result === void 0 || result.ok !== true) return {
					ok: false,
					error: { code: result?.error?.code ?? "undo-failed" }
				};
				await this.resyncLoaded();
				return {
					ok: true,
					value: {
						restored: result.value.restored,
						failed: result.value.failed
					}
				};
			}
			/**
			* Report the recycle bin's contents.
			*
			* @returns every undoable batch, newest first; an empty list on failure.
			*/
			async listRecycledSessions() {
				if (this.disposed) return [];
				let carried;
				try {
					carried = await this.remote.listRecycledSessions();
				} catch {
					return [];
				}
				if (!carried.ok) return [];
				const result = carried.value;
				if (result === void 0 || result.ok !== true) return [];
				return result.value.batches.filter((batch) => typeof batch?.batchId === "string").map((batch) => ({
					batchId: batch.batchId,
					deletedAt: batch.deletedAt,
					sessionIds: batch.sessionIds,
					bytes: batch.bytes
				}));
			}
			/**
			* Read one Session's stored transcript so the settings page can show what a
			* Session actually contains before it is deleted.
			* @param sessionId - the stored Session to read.
			* @param limit - newest messages to keep.
			* @returns the message rows, or an empty list when the log is gone.
			*/
			async readTranscript(sessionId, limit = 200) {
				if (this.disposed) return [];
				let carried;
				try {
					carried = await this.remote.readTranscript({
						sessionId,
						limit
					});
				} catch {
					return [];
				}
				if (!carried.ok) return [];
				const result = carried.value;
				if (result === void 0 || result.ok !== true) return [];
				return result.value.messages.filter((message) => typeof message?.text === "string").map((message) => ({
					role: message.role,
					type: message.type,
					text: message.text,
					...message.time === void 0 ? {} : { time: message.time }
				}));
			}
			/**
			* List the Sessions currently sitting in the recycle bin.
			* @returns one row per trashed Session, newest batch first.
			*/
			async listTrashedSessions() {
				if (this.disposed) return [];
				let carried;
				try {
					carried = await this.remote.listTrashedSessions();
				} catch {
					return [];
				}
				if (!carried.ok) return [];
				const result = carried.value;
				if (result === void 0 || result.ok !== true) return [];
				return result.value.sessions.filter((row) => typeof row?.sessionId === "string").map((row) => ({
					sessionId: row.sessionId,
					batchId: row.batchId,
					deletedAt: row.deletedAt,
					bytes: row.bytes,
					container: row.container
				}));
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
			async purgeBatch(batchId) {
				if (this.disposed) return {
					ok: false,
					error: { code: "disposed" }
				};
				let carried;
				try {
					carried = await this.remote.purgeBatch({ batchId });
				} catch {
					return {
						ok: false,
						error: { code: "route-failed" }
					};
				}
				if (!carried.ok) return {
					ok: false,
					error: { code: SessionCategoriesController.codeOf(carried.error, "purge-failed") }
				};
				const result = carried.value;
				if (result === void 0 || result.ok !== true) return {
					ok: false,
					error: { code: result?.error?.code ?? "purge-failed" }
				};
				return {
					ok: true,
					value: {
						batchId: result.value.batchId,
						reclaimedBytes: result.value.reclaimedBytes
					}
				};
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
			async sweepTrash(maxBatches, maxAgeDays) {
				if (this.disposed) return {
					ok: false,
					error: { code: "disposed" }
				};
				let carried;
				try {
					carried = await this.remote.sweepRecycledSessions({
						...maxBatches === void 0 ? {} : { maxBatches },
						...maxAgeDays === void 0 ? {} : { maxAgeDays }
					});
				} catch {
					return {
						ok: false,
						error: { code: "route-failed" }
					};
				}
				if (!carried.ok) return {
					ok: false,
					error: { code: SessionCategoriesController.codeOf(carried.error, "sweep-failed") }
				};
				const result = carried.value;
				if (result === void 0 || result.ok !== true) return {
					ok: false,
					error: { code: result?.error?.code ?? "sweep-failed" }
				};
				return {
					ok: true,
					value: {
						removedBatchIds: result.value.removedBatches,
						reclaimedBytes: result.value.reclaimedBytes
					}
				};
			}
			/** Drop one Session from every loaded snapshot's assignments. */
			pruneAssignment(workspaceId, sessionId) {
				const snapshot = this.view.snapshots[workspaceId];
				if (snapshot === void 0) return;
				const assignments = snapshot.assignments.filter((assignment) => assignment.sessionId !== sessionId);
				if (assignments.length === snapshot.assignments.length) return;
				this.publish({
					...this.view,
					snapshots: {
						...this.view.snapshots,
						[workspaceId]: {
							...snapshot,
							assignments
						}
					}
				});
			}
			/** Remove browser listeners, close the channel, and refuse later work. */
			dispose() {
				if (this.disposed) return;
				this.disposed = true;
				this.listeners.clear();
				this.windowTarget?.removeEventListener("focus", this.onFocus);
				this.documentTarget?.removeEventListener("visibilitychange", this.onVisibilityChange);
				if (this.channel !== void 0) {
					this.channel.onmessage = null;
					this.channel.close();
				}
			}
			onFocus = () => {
				this.resyncLoaded();
			};
			onVisibilityChange = () => {
				if (this.documentTarget?.visibilityState === "visible") this.resyncLoaded();
			};
			onChannelMessage = (event) => {
				if (!isRefreshMessage(event.data) || this.view.snapshots[event.data.workspaceId] === void 0) return;
				this.refresh(event.data.workspaceId);
			};
			async load(workspaceId) {
				try {
					const carried = await this.remote.get({ workspaceId });
					if (this.disposed) return DISPOSED;
					if (!carried.ok) return this.failLoad(transportFailure(carried.error, "session categories read failed"));
					if (!carried.value.ok) return this.failLoad({
						ok: false,
						error: carried.value.error
					});
					this.commit(workspaceId, carried.value.value);
					return OK;
				} catch (error) {
					if (this.disposed) return DISPOSED;
					return this.failLoad(transportFailure(error, "session categories read failed"));
				}
			}
			failLoad(result) {
				this.publish({
					status: "error",
					snapshots: this.view.snapshots,
					error: errorMessage(result)
				});
				return result;
			}
			mutateCategory(categoryId, operation) {
				return this.enqueue(async () => {
					const workspaceId = this.workspaceForCategory(categoryId);
					if (workspaceId === void 0) return {
						ok: false,
						error: {
							code: "category-not-loaded",
							message: "category is not loaded"
						}
					};
					return await this.mutateNow(workspaceId, operation);
				});
			}
			mutate(workspaceId, operation) {
				return this.enqueue(async () => await this.mutateNow(workspaceId, operation));
			}
			enqueue(operation) {
				const guarded = async () => {
					if (this.disposed) return DISPOSED;
					try {
						return await operation();
					} catch (error) {
						return transportFailure(error, "session categories mutation failed");
					}
				};
				const result = this.operationTail.then(guarded, guarded);
				this.operationTail = result.then(() => void 0);
				return result;
			}
			async mutateNow(workspaceId, operation) {
				const loaded = await this.ensure(workspaceId);
				if (!loaded.ok) return loaded;
				if (this.disposed) return DISPOSED;
				const current = this.view.snapshots[workspaceId];
				if (current === void 0) return {
					ok: false,
					error: {
						code: "workspace-not-loaded",
						message: "workspace is not loaded"
					}
				};
				const carried = await operation(current.revision);
				if (this.disposed) return DISPOSED;
				if (!carried.ok) return transportFailure(carried.error, "session categories mutation failed");
				const result = carried.value;
				if (!result.ok) {
					if (result.error.code === "revision-conflict") await this.refresh(workspaceId);
					return {
						ok: false,
						error: result.error
					};
				}
				this.commit(workspaceId, result.value);
				this.channel?.postMessage({
					type: "refresh",
					workspaceId
				});
				return OK;
			}
			workspaceForCategory(categoryId) {
				for (const [workspaceId, snapshot] of Object.entries(this.view.snapshots)) if (snapshot.categories.some((category) => category.id === categoryId)) return workspaceId;
			}
			commit(workspaceId, snapshot) {
				const current = this.view.snapshots[workspaceId];
				const snapshots = sameSnapshot(current, snapshot) ? this.view.snapshots : Object.freeze({
					...this.view.snapshots,
					[workspaceId]: Object.freeze(snapshot)
				});
				this.publish({
					status: "ready",
					snapshots,
					error: null
				});
			}
			publish(next) {
				if (this.disposed) return;
				if (this.view.status === next.status && this.view.snapshots === next.snapshots && this.view.error === next.error) return;
				this.view = Object.freeze(next);
				for (const listener of this.listeners) try {
					listener();
				} catch (error) {
					console.error("[ui-session-categories] subscriber threw:", error);
				}
			}
		};
		//#endregion
		//#region node_modules/clsx/dist/clsx.mjs
		function r(e) {
			var t, f, n = "";
			if ("string" == typeof e || "number" == typeof e) n += e;
			else if ("object" == typeof e) if (Array.isArray(e)) {
				var o = e.length;
				for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
			} else for (f in e) e[f] && (n && (n += " "), n += f);
			return n;
		}
		function clsx() {
			for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
			return n;
		}
		//#endregion
		//#region packages/client/ui-session-categories/src/client/tree.ts
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
		function indexSubagentDescendants(sessions) {
			const counts = /* @__PURE__ */ new Map();
			const list = sessions === void 0 || sessions === null ? [] : Array.isArray(sessions) ? sessions : Object.values(sessions).filter((session) => session !== void 0 && session !== null);
			for (const session of list) for (const child of session.subagents ?? []) {
				if (child.parentId === void 0 || child.running !== true) continue;
				counts.set(child.parentId, (counts.get(child.parentId) ?? 0) + 1);
			}
			const indexed = /* @__PURE__ */ new Map();
			for (const [parentId, runningCount] of counts) indexed.set(parentId, { runningCount });
			return indexed;
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
		function currentSessionId(list) {
			const byId = list?.byId;
			if (byId === void 0) return void 0;
			for (const key of Object.keys(byId)) {
				const session = byId[key];
				if (session !== void 0 && (session.retainedBy?.mainView ?? 0) > 0) return session.id;
			}
		}
		/** Display label for the ungrouped bucket row. */
		const UNGROUPED_LABEL = "Ungrouped";
		/** Group key for the trailing archive section (workspaceId-less like Ungrouped). */
		const ARCHIVED_KEY = "__archived__";
		/** Display label for the archive section row (renderer substitutes dictionary copy). */
		const ARCHIVED_LABEL = "Archived";
		/** Normalize one Workspace path for parent/child comparison. */
		function folderPath(value) {
			return (/^[A-Za-z]:[/\\]/.test(value) || value.startsWith("\\\\") ? value.replace(/\\/g, "/") : value).replace(/\/+$/, "").toLowerCase();
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
		function owningParentFolder(path, folders) {
			const child = folderPath(path);
			let owner;
			let length = -1;
			for (const root of folders) {
				if (root === "" || root === child || !child.startsWith(`${root}/`)) continue;
				if (root.length > length) {
					owner = root;
					length = root.length;
				}
			}
			return owner;
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
		function workspaceTreeParents(workspaces) {
			const idByFolder = /* @__PURE__ */ new Map();
			for (const workspace of workspaces) {
				const folder = folderPath(workspace.path);
				if (folder !== "" && !idByFolder.has(folder)) idByFolder.set(folder, workspace.workspaceId);
			}
			const folders = [...idByFolder.keys()];
			const parents = /* @__PURE__ */ new Map();
			for (const workspace of workspaces) {
				const owner = owningParentFolder(workspace.path, folders);
				parents.set(workspace.workspaceId, owner === void 0 ? void 0 : idByFolder.get(owner));
			}
			return parents;
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
		function workspaceTreeDepth(workspaces) {
			const parents = workspaceTreeParents(workspaces);
			const depth = /* @__PURE__ */ new Map();
			for (const [id, parent] of parents) {
				let levels = 0;
				let cursor = parent;
				while (cursor !== void 0 && levels <= parents.size) {
					levels += 1;
					cursor = parents.get(cursor);
				}
				depth.set(id, levels);
			}
			return depth;
		}
		/**
		* Directory display label: basename of the path (both separators accepted).
		* Ungrouped-bucket fallback for surfaces without a workspace title.
		* @param cwd - directory path, or undefined for the ungrouped bucket.
		* @returns basename, the raw cwd when it has no basename, or the ungrouped label.
		*/
		function workspaceLabel(cwd) {
			if (cwd === void 0 || cwd === "") return UNGROUPED_LABEL;
			const base = cwd.replace(/[/\\]+$/, "").split(/[/\\]/).pop();
			return base !== void 0 && base !== "" ? base : cwd;
		}
		/** Recency comparator: newest first, id as the deterministic tiebreak (ids are unique per group). */
		function byRecency(a, b) {
			if (b.updatedAt !== a.updatedAt) return b.updatedAt - a.updatedAt;
			return a.id < b.id ? -1 : 1;
		}
		/**
		* Ordinary sessions are visible; among blank sessions, only the current one
		* is visible. Subagent children use their parent header catalog; archived
		* sessions are visible nowhere, while their accounting slots remain so
		* unarchiving restores position.
		*/
		function sessionVisible(session, current, archived) {
			return session.origin !== "subagent" && !archived.has(session.id) && (!session.blank || session.id === current);
		}
		/**
		* A blank session is the selected Workspace's provisional New Session row;
		* its canonical title never enters search (blank rows are query-excluded)
		* and the renderer localizes its display label.
		*/
		function sessionTitle(session) {
			return session.blank ? "New Session" : session.displayTitle;
		}
		/** Build one group without projecting session lineage into presentation. */
		function buildGroup(key, workspaceId, cwd, createdAt, label, members, order, pinned = /* @__PURE__ */ new Set()) {
			const sessions = [...members];
			if (order === "recency") sessions.sort(byRecency);
			if (pinned.size > 0) {
				const lead = sessions.filter((session) => pinned.has(session.id));
				const rest = sessions.filter((session) => !pinned.has(session.id));
				sessions.length = 0;
				sessions.push(...lead, ...rest);
			}
			return {
				key,
				workspaceId,
				cwd,
				createdAt,
				label,
				sessions
			};
		}
		/** Apply a stored Ungrouped order and append newly loose Sessions by recency. */
		function orderedUngrouped(members, stored) {
			const byId = new Map(members.map((session) => [session.id, session]));
			const included = /* @__PURE__ */ new Set();
			const ordered = [];
			for (const key of stored) {
				const session = byId.get(key);
				if (session === void 0 || included.has(key)) continue;
				ordered.push(session);
				included.add(key);
			}
			for (const session of [...members].sort(byRecency)) {
				if (included.has(session.id)) continue;
				ordered.push(session);
			}
			return ordered;
		}
		/**
		* Group Sessions by Host Workspace: one group per entity in stable Host
		* order, with members resolved from sessionIds in their stored order. Sessions
		* outside every Workspace trail in the browser-local Ungrouped order, which
		* falls back to recency before that order is initialized.
		*/
		function groupByWorkspace(list, workspaces, archived, ungroupedOrder, pinned = /* @__PURE__ */ new Set()) {
			const groups = [];
			const accounted = /* @__PURE__ */ new Set();
			for (const workspace of workspaces) {
				const members = [];
				for (const id of workspace.sessionIds) {
					const summary = list.byId[id];
					if (summary === void 0) continue;
					accounted.add(id);
					if (!sessionVisible(summary, currentSessionId(list), archived)) continue;
					members.push(summary);
				}
				groups.push(buildGroup(workspace.workspaceId, workspace.workspaceId, workspace.path, Date.parse(workspace.createdAt), workspace.title, members, "account", pinned));
			}
			const stray = list.ids.map((id) => list.byId[id]).filter((s) => s !== void 0 && !accounted.has(s.id) && sessionVisible(s, currentSessionId(list), archived));
			if (stray.length > 0) groups.push(buildGroup("", void 0, void 0, void 0, UNGROUPED_LABEL, ungroupedOrder === void 0 ? stray : orderedUngrouped(stray, ungroupedOrder), ungroupedOrder === void 0 ? "recency" : "account", pinned));
			return groups;
		}
		/**
		* Derive the trailing archive section: every archived session that still has a
		* summary, newest first. Rendered only while the view reveals archived rows
		* (the show-archived toggle), and only when nonempty.
		* @param list - sessions list snapshot.
		* @param verbArchived - registry-global archive set (rows carry `archived`).
		* @returns the archive section group, or undefined when nothing is archived.
		*/
		function deriveArchiveSection(list, verbArchived) {
			const members = [];
			for (const id of list.ids) {
				const s = list.byId[id];
				if (s === void 0 || !verbArchived.has(id)) continue;
				if (s.origin === "subagent") continue;
				members.push(s);
			}
			if (members.length === 0) return void 0;
			members.sort(byRecency);
			return buildGroup(ARCHIVED_KEY, void 0, void 0, void 0, ARCHIVED_LABEL, members, "recency");
		}
		function sessionNode(s, descendants, pinned, archived) {
			return {
				id: s.id,
				title: sessionTitle(s),
				blank: s.blank,
				running: s.running,
				runningSubagentCount: descendants.get(s.id)?.runningCount ?? 0,
				...pinned.has(s.id) ? { pinned: true } : {},
				...archived.has(s.id) ? { archived: true } : {},
				completed: s.completed === true,
				updatedAt: s.updatedAt,
				...s.pendingInteraction === void 0 ? {} : { pendingInteraction: s.pendingInteraction }
			};
		}
		/**
		* Project one Workspace's durable category snapshot into nested presentation nodes.
		* @param snapshot - Host-owned category and assignment state for one Workspace.
		* @param sessions - Workspace Sessions in the caller's established display order.
		* @param view - local expansion, selection, archive, and search visibility.
		* @returns ordered category roots and the trailing unclassified rows.
		*/
		function buildCategoryTree(snapshot, sessions, view, pinnedSessionIds = [], archivedSessionIds = [], hoistPinned = true) {
			const pinned = new Set(pinnedSessionIds);
			const archived = new Set(archivedSessionIds);
			const indexed = /* @__PURE__ */ new Map();
			for (const category of snapshot.categories) indexed.set(category.id, {
				category,
				children: [],
				sessions: []
			});
			const visiting = /* @__PURE__ */ new Set();
			const visited = /* @__PURE__ */ new Set();
			const visit = (id) => {
				if (visiting.has(id)) throw new Error(`Session category cycle detected at ${id}`);
				if (visited.has(id)) return;
				visiting.add(id);
				const parentId = indexed.get(id)?.category.parentId;
				if (parentId !== null && parentId !== void 0 && indexed.has(parentId)) visit(parentId);
				visiting.delete(id);
				visited.add(id);
			};
			for (const id of indexed.keys()) visit(id);
			const roots = [];
			for (const node of indexed.values()) {
				const parent = node.category.parentId === null ? void 0 : indexed.get(node.category.parentId);
				if (parent === void 0) roots.push(node);
				else parent.children.push(node);
			}
			const byOrder = (left, right) => left.category.order - right.category.order;
			roots.sort(byOrder);
			for (const node of indexed.values()) node.children.sort(byOrder);
			const categoryBySession = /* @__PURE__ */ new Map();
			for (const assignment of snapshot.assignments) {
				if (categoryBySession.has(assignment.sessionId)) continue;
				const category = indexed.get(assignment.categoryId);
				if (category !== void 0) categoryBySession.set(assignment.sessionId, category);
			}
			const archivedForVisibility = new Set(view.archivedSessionIds ?? []);
			const visibleSessions = sessions.filter((item) => sessionVisible(item, view.currentSessionId, archivedForVisibility));
			const unclassified = [];
			for (const item of visibleSessions) {
				const category = categoryBySession.get(item.id);
				if (category === void 0) unclassified.push(item);
				else category.sessions.push(item);
			}
			const expanded = new Set(view.expandedCategories);
			const descendants = indexSubagentDescendants(Object.fromEntries(sessions.map((item) => [item.id, item])));
			const query = view.query?.trim().toLowerCase() ?? "";
			const matches = (item) => query === "" || sessionTitle(item).toLowerCase().includes(query);
			const pinLead = (list) => {
				if (pinned.size === 0) return [...list];
				return [...list.filter((item) => pinned.has(item.id)), ...list.filter((item) => !pinned.has(item.id))];
			};
			/**
			* Apply one category's stored manual order before the pin partition.
			*
			* Order is applied first because the pin lead is a stable partition: it
			* preserves whatever order it is handed. Runs on the ids the category
			* actually owns, so an id that moved to another category simply drops out.
			*/
			const applyCategoryOrder = (id, list) => {
				const stored = view.categoryOrder?.[categoryOrderKey(id)];
				if (stored === void 0 || stored.length === 0) return [...list];
				const byId = new Map(list.map((item) => [item.id, item]));
				const ordered = [];
				const seen = /* @__PURE__ */ new Set();
				for (const key of stored) {
					const item = byId.get(key);
					if (item === void 0 || seen.has(key)) continue;
					ordered.push(item);
					seen.add(key);
				}
				for (const item of list) {
					if (seen.has(item.id)) continue;
					ordered.push(item);
				}
				return ordered;
			};
			const project = (node) => {
				const childNodes = node.children.map(project);
				const containsCurrent = node.sessions.some((item) => item.id === view.currentSessionId) || childNodes.some((child) => child.containsCurrent);
				const isExpanded = expanded.has(node.category.id) || containsCurrent && view.expandedCategoryState?.[node.category.id] !== false;
				const sessionCount = node.sessions.length + childNodes.reduce((count, child) => count + child.sessionCount, 0);
				const ordered = applyCategoryOrder(node.category.id, node.sessions.filter((item) => matches(item) && (!hoistPinned || !pinned.has(item.id))));
				return {
					id: node.category.id,
					title: node.category.title,
					expanded: isExpanded,
					containsCurrent,
					sessionCount,
					sessions: isExpanded ? pinLead(ordered).map((item) => sessionNode(item, descendants, pinned, archived)) : [],
					orderedSessionIds: isExpanded ? ordered.map((item) => item.id) : [],
					children: isExpanded ? childNodes : []
				};
			};
			const pinnedVisible = hoistPinned ? sessions.filter((item) => pinned.has(item.id) && matches(item)) : [];
			return {
				categories: roots.map(project),
				unclassifiedSessions: unclassified.filter((item) => matches(item) && (!hoistPinned || !pinned.has(item.id))).map((item) => sessionNode(item, descendants, pinned, archived)),
				pinnedSessions: pinnedVisible.map((item) => sessionNode(item, descendants, pinned, archived))
			};
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
		function deriveGroups(list, workspaces, archivedSessionIds, view, pinnedSessionIds = [], verbSessionIds = archivedSessionIds, archivedFilter = view.archivedFilter ?? "default") {
			const archived = new Set(archivedSessionIds);
			const verbArchived = new Set(verbSessionIds);
			const pinned = new Set(pinnedSessionIds);
			const expandedGroups = new Set(view.expandedGroups);
			const descendants = indexSubagentDescendants(list.byId);
			const currentGroup = currentSessionId(list) === void 0 ? void 0 : workspaces.find((w) => w.sessionIds.includes(currentSessionId(list)))?.workspaceId ?? "";
			const groups = [];
			const onlyArchived = (view.archivedFilter ?? archivedFilter) === "only";
			const parents = view.nestWorkspaces === true ? workspaceTreeParents(workspaces) : void 0;
			const depths = parents === void 0 ? void 0 : workspaceTreeDepth(workspaces);
			if (!onlyArchived) for (const g of groupByWorkspace(list, workspaces, archived, view.ungroupedOrder, pinned)) {
				const expanded = expandedGroups.has(g.key);
				const workspaceKey = g.workspaceId === void 0 ? void 0 : g.workspaceId;
				const depth = depths !== void 0 && workspaceKey !== void 0 ? depths.get(workspaceKey) ?? 0 : 0;
				const parentKey = parents !== void 0 && workspaceKey !== void 0 ? parents.get(workspaceKey) : void 0;
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
					sessions: expanded ? g.sessions.map((session) => sessionNode(session, descendants, pinned, verbArchived)) : []
				});
			}
			if (view.showArchiveSection === true || onlyArchived) {
				const section = deriveArchiveSection(list, verbArchived);
				if (section !== void 0) {
					const expanded = onlyArchived ? true : view.groupExpansion?.[section.key] ?? true;
					groups.push({
						key: section.key,
						workspaceId: section.workspaceId,
						cwd: section.cwd,
						createdAt: section.createdAt,
						label: section.label,
						sessionCount: section.sessions.length,
						expanded,
						containsCurrent: section.key === currentGroup,
						sessions: expanded ? section.sessions.map((session) => sessionNode(session, descendants, pinned, verbArchived)) : []
					});
				}
			}
			return groups;
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
		function deriveFlat(list, archivedSessionIds, pinnedSessionIds = [], verbSessionIds = archivedSessionIds, archivedFilter = "default") {
			const verbArchived = new Set(verbSessionIds);
			const pinned = new Set(pinnedSessionIds);
			const descendants = indexSubagentDescendants(list.byId);
			const rows = [];
			for (const id of list.ids) {
				const s = list.byId[id];
				if (s === void 0 || s.origin === "subagent") continue;
				if (!s.blank || s.id === currentSessionId(list)) {
					const isArchived = verbArchived.has(s.id);
					if (archivedFilter === "only" && !isArchived) continue;
					if (archivedFilter !== "show" && archivedFilter !== "only" && isArchived) continue;
				}
				rows.push(s);
			}
			rows.sort(byRecency);
			return (pinned.size === 0 ? rows : [...rows.filter((s) => pinned.has(s.id)), ...rows.filter((s) => !pinned.has(s.id))]).map((session) => sessionNode(session, descendants, pinned, verbArchived));
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
		function deriveSearchResults(list, workspaces, query, archivedSessionIds, content, limit, pinnedSessionIds = []) {
			const pinned = new Set(pinnedSessionIds);
			const q = query.trim().toLowerCase();
			if (q === "") return {
				items: [],
				hasMore: false
			};
			const archived = new Set(archivedSessionIds);
			const descendants = indexSubagentDescendants(list.byId);
			const workspaceBySession = /* @__PURE__ */ new Map();
			for (const workspace of workspaces) for (const sessionId of workspace.sessionIds) if (!workspaceBySession.has(sessionId)) workspaceBySession.set(sessionId, workspace.title);
			const labelOf = (summary) => workspaceBySession.get(summary.id) ?? workspaceLabel(summary.cwd);
			const contentBySession = /* @__PURE__ */ new Map();
			for (const item of content.items) if (!contentBySession.has(item.sessionId)) contentBySession.set(item.sessionId, item);
			const local = [];
			for (const id of list.ids) {
				const summary = list.byId[id];
				if (summary === void 0 || summary.blank || !sessionVisible(summary, currentSessionId(list), archived)) continue;
				if (sessionTitle(summary).toLowerCase().includes(q) || labelOf(summary).toLowerCase().includes(q)) local.push(summary);
			}
			local.sort(byRecency);
			const ordered = [];
			const included = /* @__PURE__ */ new Set();
			const include = (summary) => {
				if (included.has(summary.id)) return;
				included.add(summary.id);
				ordered.push(summary);
			};
			for (const summary of local) include(summary);
			for (const item of content.items) {
				const summary = list.byId[item.sessionId];
				if (summary !== void 0 && !summary.blank && sessionVisible(summary, currentSessionId(list), archived)) include(summary);
			}
			return {
				items: ordered.slice(0, limit).map((summary) => {
					const match = contentBySession.get(summary.id);
					return {
						id: summary.id,
						title: sessionTitle(summary),
						workspace: labelOf(summary),
						running: summary.running,
						runningSubagentCount: descendants.get(summary.id)?.runningCount ?? 0,
						...pinned.has(summary.id) ? { pinned: true } : {},
						...summary.pendingInteraction === void 0 ? {} : { pendingInteraction: summary.pendingInteraction },
						completed: summary.completed === true,
						...match === void 0 ? {} : { snippet: match.snippet }
					};
				}),
				hasMore: content.hasMore || ordered.length > limit
			};
		}
		/**
		* Compact relative time for session rows, as a structured bucket the
		* renderer localizes ("now"/"5min"/"3h"/"2d"/"4mo"/"1y" in en).
		* @param updatedAt - epoch ms of the session's last activity.
		* @param now - current epoch ms (injected for pure rendering).
		* @returns the row's trailing time bucket and magnitude.
		*/
		function relativeTime(updatedAt, now) {
			const MIN = 6e4;
			const HOUR = 36e5;
			const DAY = 864e5;
			const diff = Math.max(0, now - updatedAt);
			if (diff < MIN) return {
				unit: "now",
				n: 0
			};
			if (diff < HOUR) return {
				unit: "minutes",
				n: Math.floor(diff / MIN)
			};
			if (diff < DAY) return {
				unit: "hours",
				n: Math.floor(diff / HOUR)
			};
			if (diff < 30 * DAY) return {
				unit: "days",
				n: Math.floor(diff / DAY)
			};
			if (diff < 365 * DAY) return {
				unit: "months",
				n: Math.floor(diff / (30 * DAY))
			};
			return {
				unit: "years",
				n: Math.floor(diff / (365 * DAY))
			};
		}
		//#endregion
		//#region packages/client/ui-session-categories/src/client/workspaceIcons.module.css
		var workspaceIcons_module_default = {
			"iconPicker": "c-nina_iconPicker",
			"iconPickerCell": "c-nina_iconPickerCell",
			"iconPickerEmoji": "c-nina_iconPickerEmoji",
			"iconPickerGrid": "c-nina_iconPickerGrid",
			"iconPickerSection": "c-nina_iconPickerSection",
			"workspaceIconEmoji": "c-nina_workspaceIconEmoji",
			"workspaceIconGlyph": "c-nina_workspaceIconGlyph"
		};
		//#endregion
		//#region packages/client/ui-session-categories/src/client/workspaceIcons.tsx
		/**
		* Workspace icon catalog and icon-slot rendering.
		*
		* Icons are references into the host's own primitive icon set (bundled by the
		* host, imported as an external dependency here) or one emoji character. No
		* network, no image decoding, no extra dependency: picking an icon writes one
		* short string to the browser-local view store.
		*/
		/**
		* Curated project/topic icons from the host set.
		*
		* Every entry resolves to an already-bundled host icon, so the picker adds no
		* bundle weight and no runtime fetch. Module scope keeps the element
		* descriptors stable across renders.
		*/
		const ICON_CHOICES = [
			{
				id: "dsh:FolderClose",
				label: "Folder",
				node: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFolderCloseRegular, {})
			},
			{
				id: "dsh:FolderOpen",
				label: "Open folder",
				node: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFolderOpenOutlineRegular, {})
			},
			{
				id: "dsh:WorkspaceTree",
				label: "Tree",
				node: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconWorkspaceTreeOutlineRegular, {})
			},
			{
				id: "dsh:FlatList",
				label: "List",
				node: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFlatListOutlineRegular, {})
			},
			{
				id: "dsh:ProjectAdd",
				label: "Project",
				node: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconProjectAddOutlineRegular, {})
			},
			{
				id: "dsh:Code",
				label: "Code",
				node: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCodeOutlineRegular, {})
			},
			{
				id: "dsh:Branch",
				label: "Branch",
				node: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconBranchOutlineRegular, {})
			},
			{
				id: "dsh:Api",
				label: "API",
				node: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconApiOutlineRegular, {})
			},
			{
				id: "dsh:Plugin",
				label: "Plugin",
				node: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconPluginPinwheelOutlineRegular, {})
			},
			{
				id: "dsh:Cordis",
				label: "Cordis",
				node: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCordisPluginOutlineRegular, {})
			},
			{
				id: "dsh:Skill",
				label: "Skill",
				node: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconSkillOutlineRegular, {})
			},
			{
				id: "dsh:Browse",
				label: "Browse",
				node: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconBrowseOutlineRegular, {})
			},
			{
				id: "dsh:Database",
				label: "Database",
				node: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconDatabaseOutlineRegular, {})
			},
			{
				id: "dsh:Data",
				label: "Data",
				node: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconDataOutlineRegular, {})
			},
			{
				id: "dsh:Gauge",
				label: "Gauge",
				node: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconGaugeOutlineRegular, {})
			},
			{
				id: "dsh:Inspect",
				label: "Inspect",
				node: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconInspectOutlineRegular, {})
			},
			{
				id: "dsh:Compact",
				label: "Compact",
				node: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCompactOutlineRegular, {})
			},
			{
				id: "dsh:Compare",
				label: "Compare",
				node: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCompareSplitOutlineRegular, {})
			},
			{
				id: "dsh:Doc",
				label: "Document",
				node: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconDeliverDocRegular, {})
			},
			{
				id: "dsh:Notes",
				label: "Notes",
				node: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconListPenOutlineRegular, {})
			},
			{
				id: "dsh:Paperclip",
				label: "Attachment",
				node: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconPaperclipOutlineRegular, {})
			},
			{
				id: "dsh:Goal",
				label: "Goal",
				node: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconGoalOutlineRegular, {})
			},
			{
				id: "dsh:Plan",
				label: "Plan",
				node: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconPlanOutlineRegular, {})
			},
			{
				id: "dsh:Checklist",
				label: "Checklist",
				node: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChecklistOutlineRegular, {})
			},
			{
				id: "dsh:Clock",
				label: "Clock",
				node: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconClockOutlineRegular, {})
			},
			{
				id: "dsh:Alarm",
				label: "Alarm",
				node: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconAlarmClockOutlineRegular, {})
			},
			{
				id: "dsh:Queue",
				label: "Queue",
				node: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconQueueOutlineRegular, {})
			},
			{
				id: "dsh:Sparkle",
				label: "Sparkle",
				node: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconSparkleRegular, {})
			},
			{
				id: "dsh:Light",
				label: "Light",
				node: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconLightOutlineRegular, {})
			},
			{
				id: "dsh:Like",
				label: "Like",
				node: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconLikeOutlineRegular, {})
			},
			{
				id: "dsh:Pin",
				label: "Pin",
				node: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconPinOutlineRegular, {})
			},
			{
				id: "dsh:Archive",
				label: "Archive",
				node: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconArchiveOutlineRegular, {})
			},
			{
				id: "dsh:Shield",
				label: "Shield",
				node: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconShieldOutlineRegular, {})
			},
			{
				id: "dsh:Globe",
				label: "Globe",
				node: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconGlobeOutlineRegular, {})
			},
			{
				id: "dsh:Users",
				label: "Users",
				node: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconUsersOutlineRegular, {})
			},
			{
				id: "dsh:AgentPreset",
				label: "Agent preset",
				node: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconAgentPresetOutlineRegular, {})
			},
			{
				id: "dsh:Question",
				label: "Question",
				node: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconQuestionOutlineRegular, {})
			},
			{
				id: "dsh:Info",
				label: "Info",
				node: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconInfoOutlineRegular, {})
			},
			{
				id: "dsh:Search",
				label: "Search",
				node: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconSearchOutlineRegular, {})
			},
			{
				id: "dsh:NewChat",
				label: "Chat",
				node: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconNewChatOutlineRegular, {})
			}
		];
		/** Curated emoji set: frequent project/topic markers, no external font pack. */
		const EMOJI_CHOICES = [
			"🚀",
			"📁",
			"📂",
			"🗂️",
			"💡",
			"🧪",
			"🔬",
			"🛠️",
			"🧰",
			"📊",
			"📈",
			"📦",
			"🧠",
			"🤖",
			"🌱",
			"🌿",
			"🔥",
			"⭐",
			"✨",
			"🎯",
			"🧭",
			"🧩",
			"📌",
			"📚",
			"📖",
			"📝",
			"✏️",
			"🔖",
			"🏷️",
			"🗃️",
			"💾",
			"🖥️",
			"⌨️",
			"🌐",
			"☁️",
			"🔐",
			"🧵",
			"🧮",
			"🎨",
			"🎵",
			"🍀",
			"🐳",
			"🦀",
			"🧬",
			"🛰️",
			"🧱",
			"🪄",
			"🧿"
		];
		/** Lookup table from a persisted `dsh:` reference to its renderable icon. */
		const ICON_BY_ID = new Map(ICON_CHOICES.map((choice) => [choice.id, choice.node]));
		/**
		* Render one persisted icon reference.
		*
		* @param icon - `dsh:<name>` or `emoji:<char>`; empty/undefined means no icon.
		* @param size - pixel size for host icons (emoji follow the font size).
		* @returns the icon node, or `null` when the reference is empty/unknown.
		*/
		function renderWorkspaceIcon(icon, size = 14) {
			if (icon === void 0 || icon === "") return null;
			if (icon.startsWith("emoji:")) {
				const character = icon.slice(6);
				return character === "" ? null : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: workspaceIcons_module_default.workspaceIconEmoji,
					children: character
				});
			}
			const node = ICON_BY_ID.get(icon);
			if (node === void 0) return null;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: workspaceIcons_module_default.workspaceIconGlyph,
				children: node
			});
		}
		/**
		* The icon picker body: a curated host-icon grid plus an emoji grid.
		*
		* The whole grid is rendered only while the dialog is open (the caller gates
		* it), so an idle sidebar pays nothing for the catalog. Clicking a cell picks
		* that icon and closes the dialog through the caller's `onPick`.
		*/
		function WorkspaceIconPickerGrid({ selected, onPick, t }) {
			const cell = (id, content, label) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
				type: "button",
				role: "option",
				"aria-selected": selected === id,
				"aria-label": label ?? id,
				title: label ?? id,
				className: workspaceIcons_module_default.iconPickerCell,
				onClick: () => {
					onPick(id);
				},
				children: content
			}, id);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: workspaceIcons_module_default.iconPicker,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: workspaceIcons_module_default.iconPickerSection,
						children: t("icon.section.icons")
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: workspaceIcons_module_default.iconPickerGrid,
						role: "listbox",
						"aria-label": t("icon.section.icons"),
						children: ICON_CHOICES.map((choice) => cell(choice.id, choice.node, choice.label))
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: workspaceIcons_module_default.iconPickerSection,
						children: t("icon.section.emoji")
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: workspaceIcons_module_default.iconPickerGrid,
						role: "listbox",
						"aria-label": t("icon.section.emoji"),
						children: EMOJI_CHOICES.map((emoji) => cell(`emoji:${emoji}`, /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: workspaceIcons_module_default.iconPickerEmoji,
							children: emoji
						}), emoji))
					})
				]
			});
		}
		//#endregion
		//#region packages/client/ui-session-categories/src/client/rows/Rows.module.css
		var Rows_module_default = {
			"archivedGlyph": "-PPL0q_archivedGlyph",
			"archivedSessionRow": "-PPL0q_archivedSessionRow",
			"arrow": "-PPL0q_arrow",
			"arrowOpen": "-PPL0q_arrowOpen",
			"categorizedSessionRow": "-PPL0q_categorizedSessionRow",
			"categoryDropTarget": "-PPL0q_categoryDropTarget",
			"categoryRow": "-PPL0q_categoryRow",
			"chevron": "-PPL0q_chevron",
			"dot": "-PPL0q_dot",
			"dropAfter": "-PPL0q_dropAfter",
			"dropBefore": "-PPL0q_dropBefore",
			"flatSessionRowWithoutStatus": "-PPL0q_flatSessionRowWithoutStatus",
			"folder": "-PPL0q_folder",
			"folderActive": "-PPL0q_folderActive",
			"hoverContent": "-PPL0q_hoverContent",
			"hoverPath": "-PPL0q_hoverPath",
			"hoverStatus": "-PPL0q_hoverStatus",
			"hoverTime": "-PPL0q_hoverTime",
			"hoverTitle": "-PPL0q_hoverTitle",
			"iconButton": "-PPL0q_iconButton",
			"menuOpen": "-PPL0q_menuOpen",
			"meta": "-PPL0q_meta",
			"projectRow": "-PPL0q_projectRow",
			"projectSummary": "-PPL0q_projectSummary",
			"projectText": "-PPL0q_projectText",
			"renameInput": "-PPL0q_renameInput",
			"row-in": "-PPL0q_row-in",
			"rowActions": "-PPL0q_rowActions",
			"rowError": "-PPL0q_rowError",
			"searchResultHeading": "-PPL0q_searchResultHeading",
			"searchResultMeta": "-PPL0q_searchResultMeta",
			"searchResultRow": "-PPL0q_searchResultRow",
			"searchResultSnippet": "-PPL0q_searchResultSnippet",
			"searchResultTitle": "-PPL0q_searchResultTitle",
			"searchResultWorkspace": "-PPL0q_searchResultWorkspace",
			"selected": "-PPL0q_selected",
			"sessionRow": "-PPL0q_sessionRow",
			"slot": "-PPL0q_slot",
			"time": "-PPL0q_time",
			"title": "-PPL0q_title",
			"visuallyHidden": "-PPL0q_visuallyHidden",
			"workspaceFolderDropInside": "-PPL0q_workspaceFolderDropInside",
			"workspaceFolderRow": "-PPL0q_workspaceFolderRow",
			"workspaceFolderWorkspaceOver": "-PPL0q_workspaceFolderWorkspaceOver",
			"workspaceIconDot": "-PPL0q_workspaceIconDot",
			"workspaceIconSlot": "-PPL0q_workspaceIconSlot",
			"workspaceSessionRow": "-PPL0q_workspaceSessionRow"
		};
		//#endregion
		//#region packages/client/ui-session-categories/src/client/rows/Rows.tsx
		/**
		* Session category browser tree row components (figma Cell set 14:3080): pure presentational — * all data and callbacks arrive via props. Hover swaps (folder->chevron,
		* time->ellipsis, action buttons) are CSS-only. Row ... menus are visual-only
		* except workspace Rename/Delete and session Rename/Fork/Archive; the session
		* and workspace hover cards are suppressed while a menu is open.
		*/
		const CATEGORY_DRAG_TYPE = "application/x-dsh-session-category";
		function readCategoryDrag(dataTransfer) {
			try {
				const value = JSON.parse(dataTransfer.getData(CATEGORY_DRAG_TYPE));
				if (typeof value !== "object" || value === null || !("kind" in value) || !("workspaceId" in value)) return null;
				if (value.kind === "category" && "categoryId" in value && typeof value.categoryId === "string") return value;
				if (value.kind === "session" && "sessionIds" in value && Array.isArray(value.sessionIds) && value.sessionIds.every((id) => typeof id === "string")) return value;
				return null;
			} catch {
				return null;
			}
		}
		function hasCategoryDrag(dataTransfer) {
			return Array.from(dataTransfer.types).includes(CATEGORY_DRAG_TYPE);
		}
		function actionFailure(value) {
			if (typeof value !== "object" || value === null || !("ok" in value) || value.ok !== false || !("error" in value)) return null;
			const error = value.error;
			if (typeof error !== "object" || error === null) return String(error);
			if ("message" in error && typeof error.message === "string") return error.message;
			if ("code" in error && typeof error.code === "string") return error.code;
			return String(error);
		}
		/** Row display title: blank rows show the localized New Session label. */
		function displayTitle(node, t) {
			return node.blank ? t("session.new") : node.title;
		}
		/** Localized compact relative time ("刚刚"/"5分钟" in zh, "now"/"5min" in en). */
		function timeLabel(updatedAt, now, t) {
			const { unit, n } = relativeTime(updatedAt, now);
			return unit === "now" ? t("time.now") : t(`time.${unit}`, { n });
		}
		/** Hover-card variant: distances wrap in the ago template; the now bucket stays bare (no "now ago"). */
		function hoverTimeLabel(updatedAt, now, t) {
			const { unit, n } = relativeTime(updatedAt, now);
			return unit === "now" ? t("time.now") : t("time.ago", { t: t(`time.${unit}`, { n }) });
		}
		/**
		* Absolute creation time through the dictionary's date template (the message
		* clock pattern): `toLocaleString` would follow the browser language, not the
		* app locale, and produce mixed-language text after a switch.
		*/
		function createdLabel(createdAt, t) {
			const d = new Date(createdAt);
			const pad2 = (v) => String(v).padStart(2, "0");
			return t("hover.created", { time: `${t("date.ymd", {
				y: d.getFullYear(),
				m: d.getMonth() + 1,
				d: d.getDate()
			})} ${pad2(d.getHours())}:${pad2(d.getMinutes())}` });
		}
		/** Hover-card body: workspace title, full directory path, absolute creation time. */
		function WorkspaceHoverContent({ label, cwd, createdAt, t }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: Rows_module_default.hoverContent,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: Rows_module_default.hoverTitle,
						children: label
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: Rows_module_default.hoverPath,
						children: cwd
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: Rows_module_default.hoverTime,
						children: createdLabel(createdAt, t)
					})
				]
			});
		}
		/** Pointer-position half of a row (insert line above or below). */
		function rowHalf(e) {
			const rect = e.currentTarget.getBoundingClientRect();
			return e.clientY < rect.top + rect.height / 2 ? "before" : "after";
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
		function ProjectRowItem({ group, onToggle, onCreate, actions, icon, onPickIcon, drag, isArchiveSection = false, t }) {
			const row = group;
			const label = row.workspaceId === void 0 ? isArchiveSection ? t("archived.label") : t("group.ungrouped") : row.label;
			const active = group.expanded && group.containsCurrent;
			const [menuOpen, setMenuOpen] = (0, react.useState)(false);
			const folderMove = actions?.moveToFolder;
			const workspaceMenuItems = [
				...actions?.createCategory === void 0 ? [] : [{
					id: "create-category",
					label: t("category.create"),
					icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconPlusOutlineRegular, {})
				}],
				...actions?.setIcon === void 0 ? [] : [{
					id: "set-icon",
					label: t("icon.pick"),
					icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconSparkleRegular, {})
				}],
				...actions?.archiveAll === void 0 ? [] : [{
					id: "archive-all",
					label: t("menu.archiveAll"),
					icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconArchiveOutlineRegular, {})
				}],
				...folderMove === void 0 ? [] : [{
					id: "move-to-folder",
					label: t("folder.moveWorkspace"),
					icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFolderCloseRegular, {}),
					submenu: [{
						id: "move-to-folder:none",
						label: t("folder.unfiled"),
						icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFolderOpenOutlineRegular, {})
					}, ...folderMove.folders.map((folder) => ({
						id: `move-to-folder:${folder.id}`,
						icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFolderCloseRegular, {}),
						label: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							style: { paddingInlineStart: folder.depth * 12 },
							children: folder.title
						})
					}))]
				}],
				{
					id: "rename",
					label: t("rename"),
					icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconEditOutlineRegular, {})
				},
				{
					id: "delete",
					label: t("delete.workspace"),
					icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconTrashOutlineRegular, {}),
					danger: true
				}
			];
			const ownRow = /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: clsx(Rows_module_default.projectRow, menuOpen && Rows_module_default.menuOpen),
				role: "treeitem",
				"aria-expanded": row.expanded,
				onClick: onToggle,
				draggable: drag !== void 0,
				onDragStart: drag === void 0 ? void 0 : (e) => {
					e.dataTransfer.effectAllowed = "move";
					e.dataTransfer.setData("text/plain", row.key);
					drag?.start();
				},
				onDragEnd: drag?.end,
				children: [
					isArchiveSection ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: clsx(Rows_module_default.slot, Rows_module_default.archivedGlyph),
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconArchiveOutlineRegular, { size: 14 })
					}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: clsx(Rows_module_default.slot, Rows_module_default.workspaceIconSlot, active && Rows_module_default.folderActive),
						role: onPickIcon === void 0 ? void 0 : "button",
						tabIndex: onPickIcon === void 0 ? void 0 : -1,
						title: onPickIcon === void 0 ? void 0 : t("icon.pick"),
						"aria-label": onPickIcon === void 0 ? void 0 : t("icon.pick"),
						onClick: onPickIcon === void 0 ? void 0 : (event) => {
							event.stopPropagation();
							onPickIcon();
						},
						children: icon !== void 0 && icon !== "" ? renderWorkspaceIcon(icon) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: Rows_module_default.workspaceIconDot,
							"aria-hidden": "true"
						})
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: clsx(Rows_module_default.slot, Rows_module_default.chevron),
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconTriangleRightFillRegular, { className: clsx(Rows_module_default.arrow, row.expanded && Rows_module_default.arrowOpen) })
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: Rows_module_default.projectText,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: Rows_module_default.title,
							children: label
						})
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
						className: Rows_module_default.rowActions,
						children: [actions !== void 0 && !isArchiveSection && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Menu, {
							open: menuOpen,
							onClose: () => {
								setMenuOpen(false);
							},
							items: workspaceMenuItems,
							onSelect: (id) => {
								setMenuOpen(false);
								if (id.startsWith("move-to-folder:")) {
									const target = id.slice(15);
									folderMove?.onMove(target === "none" ? null : target);
									return;
								}
								/* v8 ignore next -- workspaceMenuItems carries exactly these rows today. */
								if (id === "create-category") {
									actions.createCategory?.();
									return;
								}
								if (id === "set-icon") {
									actions.setIcon?.();
									return;
								}
								if (id === "archive-all") {
									actions.archiveAll?.();
									return;
								}
								if (id !== "rename" && id !== "delete") return;
								if (id === "rename") actions.rename();
								else actions.delete();
							},
							portal: true,
							closeOnPointerLeave: true,
							anchor: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: Rows_module_default.iconButton,
								"aria-label": t("actions.workspace.aria", { name: label }),
								onClick: (e) => {
									e.stopPropagation();
									setMenuOpen((v) => !v);
								},
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconEllipsisOutlineRegular, {})
							})
						}), !isArchiveSection && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: Rows_module_default.iconButton,
							"aria-label": t("actions.newSession.aria", { name: label }),
							onClick: (e) => {
								e.stopPropagation();
								onCreate();
							},
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconPlusOutlineRegular, {})
						})]
					})
				]
			});
			if (row.createdAt === void 0) return ownRow;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.HoverCard, {
				anchor: ownRow,
				content: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(WorkspaceHoverContent, {
					label: row.label,
					cwd: row.cwd,
					createdAt: row.createdAt,
					t
				}),
				disabled: menuOpen,
				copyText: row.cwd,
				copyLabel: t("copy"),
				copiedLabel: t("hover.copied")
			});
		}
		/** One fixed-height category tree row with inline rename and guarded drops. */
		function CategoryRowItem({ node, workspaceId, depth, categoryOptions, invalidMoveTargetIds, invalidCategorySourceIds, onToggle, onCreate, onCreateCategory, onRename, onMove, onDelete, onDropPayload, onReorder, t }) {
			const [menuOpen, setMenuOpen] = (0, react.useState)(false);
			const [renaming, setRenaming] = (0, react.useState)(false);
			const [draft, setDraft] = (0, react.useState)(node.title);
			const [busy, setBusy] = (0, react.useState)(false);
			const [error, setError] = (0, react.useState)(null);
			const [dropTarget, setDropTarget] = (0, react.useState)(false);
			/** Which half the pointer is on while a category drag is in flight. */
			const [dropHalf, setDropHalf] = (0, react.useState)(null);
			const submitRename = () => {
				const title = draft.trim();
				if (busy || title === "") return;
				setBusy(true);
				setError(null);
				Promise.resolve(onRename(node.id, title)).then(() => {
					setBusy(false);
					setRenaming(false);
				}).catch((reason) => {
					setBusy(false);
					setError(reason instanceof Error ? reason.message : String(reason));
				});
			};
			const moveItems = [{
				id: "move-root",
				label: t("category.root"),
				icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFolderCloseRegular, {}),
				disabled: busy
			}, ...categoryOptions.filter((category) => !invalidMoveTargetIds.includes(category.id)).map((category) => ({
				id: `move:${category.id}`,
				disabled: busy,
				icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFolderCloseRegular, {}),
				label: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					style: { paddingInlineStart: category.depth * 12 },
					children: category.title
				})
			}))];
			const submitMove = (parentId) => {
				if (busy) return;
				setBusy(true);
				setError(null);
				Promise.resolve(onMove(node.id, parentId)).then((result) => {
					const message = actionFailure(result);
					setBusy(false);
					if (message === null) setMenuOpen(false);
					else {
						setError(message);
						setMenuOpen(true);
					}
				}).catch((reason) => {
					setBusy(false);
					setError(reason instanceof Error ? reason.message : String(reason));
					setMenuOpen(true);
				});
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: clsx(Rows_module_default.categoryRow, menuOpen && Rows_module_default.menuOpen, dropTarget && Rows_module_default.categoryDropTarget, dropHalf === "before" && Rows_module_default.dropBefore, dropHalf === "after" && Rows_module_default.dropAfter),
				style: { "--category-depth": depth },
				role: "treeitem",
				"aria-label": node.title,
				"aria-expanded": node.expanded,
				"data-category-drop-target": dropTarget ? "true" : void 0,
				title: node.title,
				draggable: !renaming,
				onClick: renaming ? void 0 : onToggle,
				onDragStart: (event) => {
					const payload = {
						kind: "category",
						workspaceId,
						categoryId: node.id
					};
					event.dataTransfer.effectAllowed = "move";
					event.dataTransfer.setData(CATEGORY_DRAG_TYPE, JSON.stringify(payload));
				},
				onDragOver: (event) => {
					if (!hasCategoryDrag(event.dataTransfer)) return;
					event.preventDefault();
					event.dataTransfer.dropEffect = "move";
					setDropTarget(true);
					if (onReorder !== void 0) setDropHalf(rowHalf(event));
				},
				onDragLeave: (event) => {
					if (event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)) return;
					setDropTarget(false);
					setDropHalf(null);
				},
				onDrop: (event) => {
					const payload = readCategoryDrag(event.dataTransfer);
					const half = onReorder === void 0 ? null : rowHalf(event);
					setDropTarget(false);
					setDropHalf(null);
					if (payload === null || payload.workspaceId !== workspaceId || payload.kind === "category" && invalidCategorySourceIds.includes(payload.categoryId)) return;
					event.preventDefault();
					if (payload.kind === "category" && onReorder !== void 0 && half !== null) {
						onReorder(payload.categoryId, node.id, half);
						return;
					}
					onDropPayload(payload, node.id);
				},
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: Rows_module_default.slot,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconTriangleRightFillRegular, { className: clsx(Rows_module_default.arrow, node.expanded && Rows_module_default.arrowOpen) })
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: clsx(Rows_module_default.slot, node.containsCurrent && Rows_module_default.folderActive),
						children: node.expanded ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFolderOpenRegular, {}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFolderCloseRegular, {})
					}),
					renaming ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
						autoFocus: true,
						className: Rows_module_default.renameInput,
						"aria-label": t("field.categoryName"),
						value: draft,
						disabled: busy,
						onClick: (event) => {
							event.stopPropagation();
						},
						onChange: (event) => {
							setDraft(event.target.value);
						},
						onKeyDown: (event) => {
							if (event.key === "Enter") submitRename();
							if (event.key === "Escape" && !busy) setRenaming(false);
						}
					}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: Rows_module_default.title,
						children: node.title
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
						className: Rows_module_default.rowActions,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: Rows_module_default.iconButton,
							"aria-label": t("actions.newSession.aria", { name: node.title }),
							onClick: (event) => {
								event.stopPropagation();
								onCreate();
							},
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconPlusOutlineRegular, {})
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Menu, {
							open: menuOpen,
							onClose: () => {
								setMenuOpen(false);
							},
							portal: true,
							closeOnPointerLeave: true,
							items: [
								...onCreateCategory === void 0 ? [] : [{
									id: "create-category",
									label: t("category.createChild"),
									icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconPlusOutlineRegular, {})
								}],
								{
									id: "rename",
									label: t("rename"),
									icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconEditOutlineRegular, {})
								},
								{
									id: "move",
									label: t("category.move"),
									icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFolderOpenOutlineRegular, {}),
									submenu: moveItems
								},
								{
									id: "delete",
									label: t("category.delete"),
									icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconTrashOutlineRegular, {}),
									danger: true
								}
							],
							onSelect: (id) => {
								if (id === "create-category") {
									onCreateCategory?.(node.id);
									setMenuOpen(false);
								}
								if (id === "rename") {
									setDraft(node.title);
									setRenaming(true);
								}
								if (id === "rename") setMenuOpen(false);
								if (id === "move-root") submitMove(null);
								if (id.startsWith("move:")) submitMove(id.slice(5));
								if (id === "delete") {
									setMenuOpen(false);
									onDelete(node.id);
								}
							},
							anchor: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: Rows_module_default.iconButton,
								"aria-label": t("actions.category.aria", { name: node.title }),
								onClick: (event) => {
									event.stopPropagation();
									setMenuOpen((value) => !value);
								},
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconEllipsisOutlineRegular, {})
							})
						})]
					}),
					error !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						role: "alert",
						className: Rows_module_default.rowError,
						children: error
					})
				]
			});
		}
		/** MIME type carried by a display-folder drag; Workspace drags stay text/plain. */
		const WORKSPACE_FOLDER_DRAG_TYPE = "application/x-dsh-workspace-folder";
		/** Read one folder drag payload off a DataTransfer; never throws. */
		function readWorkspaceFolderDrag(dataTransfer) {
			try {
				const value = JSON.parse(dataTransfer.getData(WORKSPACE_FOLDER_DRAG_TYPE));
				if (typeof value !== "object" || value === null || !("folderId" in value) || typeof value.folderId !== "string") return null;
				return { folderId: value.folderId };
			} catch {
				return null;
			}
		}
		/** Whether a DataTransfer carries a display-folder drag. */
		function hasWorkspaceFolderDrag(dataTransfer) {
			return Array.from(dataTransfer.types).includes(WORKSPACE_FOLDER_DRAG_TYPE);
		}
		/**
		* Insert side for a folder drop: the middle band nests, the thin top/bottom
		* bands reorder — the same three-zone language the category rows already use.
		* @param event - drag event targeting the row.
		* @returns the zone under the pointer.
		*/
		function workspaceFolderDropZone(event) {
			const rect = event.currentTarget.getBoundingClientRect();
			if (rect.height <= 0) return "inside";
			const ratio = (event.clientY - rect.top) / rect.height;
			return ratio < .3 ? "before" : ratio > .7 ? "after" : "inside";
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
		function WorkspaceFolderRow({ node, unfiled = false, workspaceCount, containsCurrent, folderDragActive, workspaceDragActive, moveTargets, onToggle, onRename, onDelete, onCreateChild, onMove, onFolderDrop, onWorkspaceDrop, icon, onPickIcon, workspaceHovered = false, onDragStart, onDragEnd, t }) {
			const [menuOpen, setMenuOpen] = (0, react.useState)(false);
			const [renaming, setRenaming] = (0, react.useState)(false);
			const [draft, setDraft] = (0, react.useState)(node.title);
			/** Folder-drop marker for this row while a folder drag passes over it. */
			const [dropZone, setDropZone] = (0, react.useState)(null);
			/** Workspace-drop highlight for this row while a Workspace drag passes over it. */
			const [workspaceOver, setWorkspaceOver] = (0, react.useState)(false);
			const interactive = !unfiled;
			const canRename = interactive && onRename !== void 0;
			const submitRename = () => {
				const title = draft.trim();
				if (title === "") {
					setRenaming(false);
					return;
				}
				onRename?.(node.id, title);
				setRenaming(false);
			};
			const moveItems = [{
				id: "move-root",
				label: t("folder.root"),
				icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFolderOpenOutlineRegular, {})
			}, ...(moveTargets ?? []).map((folder) => ({
				id: `move:${folder.id}`,
				icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFolderCloseRegular, {}),
				label: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					style: { paddingInlineStart: folder.depth * 12 },
					children: folder.title
				})
			}))];
			const menuItems = [
				...onCreateChild === void 0 ? [] : [{
					id: "create-child",
					label: t("folder.createChild"),
					icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconPlusOutlineRegular, {})
				}],
				...onPickIcon === void 0 ? [] : [{
					id: "set-icon",
					label: t("icon.pick"),
					icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconSparkleRegular, {})
				}],
				{
					id: "rename",
					label: t("rename"),
					icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconEditOutlineRegular, {})
				},
				{
					id: "move",
					label: t("folder.move"),
					icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFolderOpenOutlineRegular, {}),
					submenu: moveItems
				},
				{
					id: "delete",
					label: t("folder.delete"),
					icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconTrashOutlineRegular, {}),
					danger: true
				}
			];
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: clsx(Rows_module_default.categoryRow, Rows_module_default.workspaceFolderRow, menuOpen && Rows_module_default.menuOpen, dropZone === "inside" && Rows_module_default.workspaceFolderDropInside, dropZone === "before" && Rows_module_default.dropBefore, dropZone === "after" && Rows_module_default.dropAfter, (workspaceOver || workspaceHovered) && Rows_module_default.workspaceFolderWorkspaceOver),
				role: "treeitem",
				"aria-label": node.title,
				"aria-expanded": node.expanded,
				"data-workspace-folder": unfiled ? void 0 : node.id,
				title: node.title,
				draggable: interactive && !renaming,
				onClick: renaming ? void 0 : onToggle,
				onDragStart: interactive ? (event) => {
					event.dataTransfer.effectAllowed = "move";
					event.dataTransfer.setData(WORKSPACE_FOLDER_DRAG_TYPE, JSON.stringify({ folderId: node.id }));
					event.dataTransfer.setData("text/plain", node.title);
					onDragStart?.();
				} : (event) => {
					event.preventDefault();
				},
				onDragEnd,
				onDragOver: (event) => {
					if (folderDragActive && hasWorkspaceFolderDrag(event.dataTransfer)) {
						event.preventDefault();
						event.dataTransfer.dropEffect = "move";
						setWorkspaceOver(false);
						setDropZone(workspaceFolderDropZone(event));
						return;
					}
					if (workspaceDragActive) {
						event.preventDefault();
						event.dataTransfer.dropEffect = "move";
						setDropZone(null);
						setWorkspaceOver(true);
					}
				},
				onDragLeave: (event) => {
					if (event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)) return;
					setDropZone(null);
					setWorkspaceOver(false);
				},
				onDrop: (event) => {
					if (folderDragActive) {
						const payload = readWorkspaceFolderDrag(event.dataTransfer);
						const zone = dropZone ?? "inside";
						setDropZone(null);
						setWorkspaceOver(false);
						if (payload === null || payload.folderId === node.id) return;
						event.preventDefault();
						onFolderDrop?.(payload.folderId, node.id, zone);
						return;
					}
					if (workspaceDragActive) {
						event.preventDefault();
						setWorkspaceOver(false);
						onWorkspaceDrop();
					}
				},
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: Rows_module_default.slot,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconTriangleRightFillRegular, { className: clsx(Rows_module_default.arrow, node.expanded && Rows_module_default.arrowOpen) })
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: clsx(Rows_module_default.slot, Rows_module_default.workspaceIconSlot, containsCurrent && Rows_module_default.folderActive),
						role: onPickIcon === void 0 ? void 0 : "button",
						tabIndex: onPickIcon === void 0 ? void 0 : -1,
						title: onPickIcon === void 0 ? void 0 : t("icon.pick"),
						"aria-label": onPickIcon === void 0 ? void 0 : t("icon.pick"),
						onClick: onPickIcon === void 0 ? void 0 : (event) => {
							event.stopPropagation();
							onPickIcon();
						},
						children: icon !== void 0 && icon !== "" ? renderWorkspaceIcon(icon) : node.expanded ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFolderOpenRegular, {}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFolderCloseRegular, {})
					}),
					renaming ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
						autoFocus: true,
						className: Rows_module_default.renameInput,
						"aria-label": t("folder.name"),
						value: draft,
						onClick: (event) => {
							event.stopPropagation();
						},
						onFocus: (event) => {
							event.target.select();
						},
						onChange: (event) => {
							setDraft(event.target.value);
						},
						onBlur: submitRename,
						onKeyDown: (event) => {
							if (event.key === "Enter") submitRename();
							if (event.key === "Escape") setRenaming(false);
						}
					}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: Rows_module_default.title,
						onDoubleClick: canRename ? (event) => {
							event.stopPropagation();
							setDraft(node.title);
							setRenaming(true);
						} : void 0,
						children: node.title
					}),
					!node.expanded && workspaceCount > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: Rows_module_default.projectSummary,
						children: t("folder.workspaceCount", { n: workspaceCount })
					}),
					interactive && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: Rows_module_default.rowActions,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Menu, {
							open: menuOpen,
							onClose: () => {
								setMenuOpen(false);
							},
							portal: true,
							closeOnPointerLeave: true,
							items: menuItems,
							onSelect: (id) => {
								if (id === "create-child") {
									setMenuOpen(false);
									onCreateChild?.(node.id);
									return;
								}
								if (id === "set-icon") {
									setMenuOpen(false);
									onPickIcon?.();
									return;
								}
								if (id === "rename") {
									setMenuOpen(false);
									setDraft(node.title);
									setRenaming(true);
									return;
								}
								if (id === "move-root") {
									setMenuOpen(false);
									onMove?.(node.id, null);
									return;
								}
								if (id.startsWith("move:")) {
									setMenuOpen(false);
									onMove?.(node.id, id.slice(5));
									return;
								}
								if (id === "delete") {
									setMenuOpen(false);
									onDelete?.(node.id);
								}
							},
							anchor: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: Rows_module_default.iconButton,
								"aria-label": t("folder.actions.aria", { name: node.title }),
								onClick: (event) => {
									event.stopPropagation();
									setMenuOpen((value) => !value);
								},
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconEllipsisOutlineRegular, {})
							})
						})
					})
				]
			});
		}
		/* v8 ignore next 3 -- closed-union backstop; only reached if the status is forged */
		function assertNever(value) {
			throw new Error(`unknown pending interaction: ${String(value)}`);
		}
		/**
		* Session status presentation; pending interaction is primary and live activity
		* outranks completion reminders.
		*/
		function sessionStatuses(node, t) {
			const subagents = node.runningSubagentCount === 0 ? void 0 : {
				state: "ongoing",
				label: t(node.runningSubagentCount === 1 ? "status.subagentsRunning.one" : "status.subagentsRunning.other", { n: node.runningSubagentCount })
			};
			let pending;
			switch (node.pendingInteraction) {
				case "approval":
					pending = {
						state: "warning",
						label: t("status.waitingApproval")
					};
					break;
				case "plan-review":
					pending = {
						state: "warning",
						label: t("status.planReview")
					};
					break;
				case "question":
					pending = {
						state: "warning",
						label: t("status.waitingAnswer")
					};
					break;
				case void 0: break;
				/* v8 ignore next -- closed PendingInteractionStatus union */
				default: return assertNever(node.pendingInteraction);
			}
			if (pending !== void 0) return subagents === void 0 ? [pending] : [pending, subagents];
			if (node.running) {
				const primary = {
					state: "ongoing",
					label: t("status.running")
				};
				return subagents === void 0 ? [primary] : [primary, subagents];
			}
			if (subagents !== void 0) return [subagents];
			if (node.completed) return [{
				state: "done",
				label: t("status.completed")
			}];
			return [{
				state: "done",
				label: t("status.idle")
			}];
		}
		/** Primary status dot plus every status's screen-reader label, shared by the search and session rows. */
		function SessionStatusDots({ statuses }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.StateDot, { state: statuses[0].state }), statuses.map((status) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: Rows_module_default.visuallyHidden,
				children: status.label
			}, status.label))] });
		}
		/** Hover-card body: full title, relative time, and every relevant live status. */
		function SessionHoverContent({ node, now, t }) {
			const statuses = sessionStatuses(node, t);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: Rows_module_default.hoverContent,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: Rows_module_default.hoverTitle,
						children: displayTitle(node, t)
					}),
					!node.blank && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: Rows_module_default.hoverTime,
						children: hoverTimeLabel(node.updatedAt, now, t)
					}),
					node.archived === true && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: Rows_module_default.hoverStatus,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconArchiveOutlineRegular, { size: 14 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("archived.label") })]
					}),
					statuses.map((status) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: Rows_module_default.hoverStatus,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.StateDot, { state: status.state }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: status.label })]
					}, status.label))
				]
			});
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
		function SearchResultItem({ result, currentId, onOpen, t }) {
			const selected = result.id === currentId;
			const statuses = sessionStatuses(result, t);
			const primaryStatus = statuses[0];
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
				type: "button",
				className: clsx(Rows_module_default.searchResultRow, selected && Rows_module_default.selected),
				role: "treeitem",
				"aria-selected": selected,
				onClick: () => {
					onOpen(result.id);
				},
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
					className: Rows_module_default.searchResultHeading,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: Rows_module_default.slot,
						children: (primaryStatus.state !== "done" || result.completed) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SessionStatusDots, { statuses })
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: Rows_module_default.searchResultTitle,
						children: result.title
					})]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
					className: Rows_module_default.searchResultMeta,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: Rows_module_default.searchResultWorkspace,
						children: result.workspace
					}), result.snippet !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: Rows_module_default.searchResultSnippet,
						children: result.snippet
					})]
				})]
			});
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
		function SessionNodeItem({ node, currentId, now, onOpen, onRename, onFork, onArchive, onUnarchive, onDelete, onPin, onUnpin, drag, categoryMove, categoryDepth, flat = false, t }) {
			const row = node;
			const title = displayTitle(node, t);
			const selected = node.id === currentId;
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
			const workspaceIndent = flat === true ? void 0 : categoryDepth === void 0 ? 16 : categoryDepth * 18;
			const statuses = sessionStatuses(node, t);
			const showStatus = statuses[0].state !== "done" || row.completed;
			const categoryDraggable = categoryMove?.workspaceId !== void 0;
			const [menuOpen, setMenuOpen] = (0, react.useState)(false);
			const [categoryBusy, setCategoryBusy] = (0, react.useState)(false);
			const [categoryError, setCategoryError] = (0, react.useState)(null);
			const moveSession = (categoryId) => {
				if (categoryBusy || categoryMove === void 0) return;
				setCategoryBusy(true);
				setCategoryError(null);
				Promise.resolve(categoryMove.onMove(categoryId)).then((result) => {
					const message = actionFailure(result);
					setCategoryBusy(false);
					if (message === null) setMenuOpen(false);
					else {
						setCategoryError(message);
						setMenuOpen(true);
					}
				}).catch((reason) => {
					setCategoryBusy(false);
					setCategoryError(reason instanceof Error ? reason.message : String(reason));
					setMenuOpen(true);
				});
			};
			const sessionMenuItems = [
				{
					id: "rename",
					label: t("rename"),
					icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconEditOutlineRegular, {})
				},
				{
					id: "fork",
					label: t("menu.fork"),
					icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconBranchOutlineRegular, {})
				},
				node.pinned === true ? {
					id: "unpin",
					label: t("menu.unpinSession"),
					icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconPinOutlineRegular, { size: 16 })
				} : {
					id: "pin",
					label: t("menu.pinSession"),
					icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconPinOutlineRegular, { size: 16 })
				},
				node.archived === true ? {
					id: "unarchive",
					label: t("menu.unarchiveSession"),
					icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconArchiveOutlineRegular, { size: 16 })
				} : {
					id: "archive",
					label: t("menu.archiveSession"),
					icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconArchiveOutlineRegular, { size: 16 })
				},
				...categoryMove === void 0 ? [] : [{
					id: "move-category",
					label: t("category.move"),
					icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFolderOpenOutlineRegular, {}),
					submenu: [{
						id: "category:null",
						label: t("category.unclassified"),
						icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFolderCloseRegular, {}),
						disabled: categoryBusy
					}, ...categoryMove.categories.map((category) => ({
						id: `category:${category.id}`,
						disabled: categoryBusy,
						icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFolderCloseRegular, {}),
						label: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							style: { paddingInlineStart: category.depth * 12 },
							children: category.title
						})
					}))]
				}],
				{
					id: "delete",
					label: t("menu.deleteSession"),
					icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconTrashOutlineRegular, { size: 16 }),
					danger: true
				}
			];
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.HoverCard, {
				anchor: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: clsx(Rows_module_default.sessionRow, categoryDepth !== void 0 && Rows_module_default.categorizedSessionRow, categoryDepth === void 0 && flat !== true && Rows_module_default.workspaceSessionRow, node.archived === true && Rows_module_default.archivedSessionRow, selected && Rows_module_default.selected, menuOpen && Rows_module_default.menuOpen, flat && !showStatus && Rows_module_default.flatSessionRowWithoutStatus, drag?.marker === "before" && Rows_module_default.dropBefore, drag?.marker === "after" && Rows_module_default.dropAfter),
					style: {
						...categoryDepth === void 0 ? {} : { "--category-depth": categoryDepth },
						...workspaceIndent === void 0 ? {} : { "--dsh-workspace-indent": `${workspaceIndent}px` }
					},
					role: "treeitem",
					"aria-selected": selected,
					onClick: () => {
						onOpen(node.id);
					},
					draggable: drag !== void 0 || categoryDraggable,
					onDragStart: drag === void 0 && !categoryDraggable ? void 0 : (e) => {
						e.dataTransfer.effectAllowed = "move";
						e.dataTransfer.setData("text/plain", node.id);
						if (categoryMove?.workspaceId !== void 0) {
							const payload = {
								kind: "session",
								workspaceId: categoryMove.workspaceId,
								sessionIds: [node.id]
							};
							e.dataTransfer.setData(CATEGORY_DRAG_TYPE, JSON.stringify(payload));
						}
						drag?.start();
					},
					onDragEnd: drag?.end,
					onDragOver: drag === void 0 ? void 0 : (e) => {
						if (!drag.active) return;
						e.preventDefault();
						e.dataTransfer.dropEffect = "move";
						drag.hover(rowHalf(e));
					},
					onDrop: drag === void 0 ? void 0 : (e) => {
						if (!drag.active) return;
						e.preventDefault();
						drag.drop(rowHalf(e));
					},
					children: [
						(!flat || showStatus || node.archived === true) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: Rows_module_default.slot,
							children: node.archived === true ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: Rows_module_default.archivedGlyph,
								"aria-hidden": "true",
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconArchiveOutlineRegular, { size: 14 })
							}) : showStatus && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SessionStatusDots, { statuses })
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: Rows_module_default.title,
							children: title
						}),
						!row.blank && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: Rows_module_default.time,
							children: timeLabel(row.updatedAt, now, t)
						}),
						!row.blank && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: Rows_module_default.rowActions,
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Menu, {
								open: menuOpen,
								onClose: () => {
									setMenuOpen(false);
								},
								items: sessionMenuItems,
								onSelect: (id) => {
									if (!id.startsWith("category:")) setMenuOpen(false);
									if (id === "rename") onRename(node.id, row.title);
									if (id === "fork") onFork(node.id);
									if (id === "pin") onPin(node.id);
									if (id === "unpin") onUnpin(node.id);
									if (id === "archive") onArchive(node.id);
									if (id === "unarchive") onUnarchive(node.id);
									if (id === "delete") onDelete(node.id, row.title);
									if (id === "category:null") moveSession(null);
									if (id.startsWith("category:") && id !== "category:null") moveSession(id.slice(9));
								},
								portal: true,
								closeOnPointerLeave: true,
								anchor: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: Rows_module_default.iconButton,
									"aria-label": t("actions.session.aria", { name: title }),
									onClick: (e) => {
										e.stopPropagation();
										setMenuOpen((v) => !v);
									},
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconEllipsisOutlineRegular, {})
								})
							})
						}),
						categoryError !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							role: "alert",
							className: Rows_module_default.rowError,
							children: categoryError
						})
					]
				}),
				content: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SessionHoverContent, {
					node,
					now,
					t
				}),
				disabled: menuOpen || drag?.active === true,
				copyText: row.blank ? void 0 : row.title,
				copyLabel: t("copy"),
				copiedLabel: t("hover.copied")
			});
		}
		//#endregion
		//#region packages/client/ui-session-categories/src/client/workspaceFolders.ts
		/** Order-independent stable sort: explicit `order`, then id. */
		function compareFolders(left, right) {
			if (left.order !== right.order) return left.order - right.order;
			return left.id < right.id ? -1 : left.id > right.id ? 1 : 0;
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
		function buildWorkspaceFolderForest(folders, assignments, expansion) {
			const known = new Set(folders.map((folder) => folder.id));
			const childrenOf = /* @__PURE__ */ new Map();
			for (const folder of folders) {
				const parentId = folder.parentId !== null && known.has(folder.parentId) ? folder.parentId : null;
				const siblings = childrenOf.get(parentId) ?? [];
				siblings.push(folder);
				childrenOf.set(parentId, siblings);
			}
			for (const siblings of childrenOf.values()) siblings.sort(compareFolders);
			const byId = /* @__PURE__ */ new Map();
			const visited = /* @__PURE__ */ new Set();
			const build = (folder, depth) => {
				const node = {
					id: folder.id,
					title: folder.title,
					parentId: folder.parentId,
					depth,
					expanded: expansion[folder.id] !== false,
					children: []
				};
				byId.set(node.id, node);
				visited.add(folder.id);
				for (const child of childrenOf.get(folder.id) ?? []) {
					if (visited.has(child.id)) continue;
					node.children.push(build(child, depth + 1));
				}
				return node;
			};
			const roots = (childrenOf.get(null) ?? []).filter((folder) => !visited.has(folder.id)).map((folder) => build(folder, 0));
			const stranded = folders.filter((folder) => !visited.has(folder.id)).sort(compareFolders);
			for (const folder of stranded) {
				if (visited.has(folder.id)) continue;
				roots.push(build(folder, 0));
			}
			const survivingFolders = new Set(byId.keys());
			const survivingAssignments = {};
			for (const [workspaceId, folderId] of Object.entries(assignments)) if (survivingFolders.has(folderId)) survivingAssignments[workspaceId] = folderId;
			return {
				roots,
				byId,
				assignments: Object.freeze(survivingAssignments)
			};
		}
		/**
		* Flatten the forest into menu rows in visual order.
		* @param forest - projected tree.
		* @returns ordered folder options with their nesting depth.
		*/
		function workspaceFolderOptions(forest) {
			const options = [];
			const visit = (node) => {
				options.push({
					id: node.id,
					title: node.title,
					depth: node.depth
				});
				for (const child of node.children) visit(child);
			};
			for (const root of forest.roots) visit(root);
			return options;
		}
		/**
		* Collect one folder plus its descendants — the set a folder cannot be moved
		* into (moving under itself would detach the whole branch).
		* @param forest - projected tree.
		* @param folderId - folder being moved.
		* @returns ids that are invalid drop targets for that folder.
		*/
		function workspaceFolderInvalidTargets(forest, folderId) {
			const invalid = [];
			const visit = (node) => {
				invalid.push(node.id);
				for (const child of node.children) visit(child);
			};
			const root = forest.byId.get(folderId);
			if (root !== void 0) visit(root);
			return invalid;
		}
		/**
		* Count the root-level Workspace sections a folder owns directly, without
		* descending into subfolders; the renderer adds its children's counts itself.
		* @param workspaceIds - root section ids in display order.
		* @param folderId - folder whose direct members are counted.
		* @param assignments - surviving assignment map.
		* @returns number of Workspaces filed directly in that folder.
		*/
		function countDirectWorkspaces(workspaceIds, folderId, assignments) {
			return workspaceIds.filter((workspaceId) => assignments[workspaceId] === folderId).length;
		}
		//#endregion
		//#region packages/client/ui-session-categories/src/client/WorkspacePicker.module.css
		var WorkspacePicker_module_default = {
			"menuStatus": "Z146pG_menuStatus",
			"modalAction": "Z146pG_modalAction",
			"modalError": "Z146pG_modalError"
		};
		//#endregion
		//#region packages/client/ui-session-categories/src/client/WorkspacePicker.tsx
		const ADD_WORKSPACE = "::add-workspace";
		/**
		* Render the pick menu plus the adoption error dialog.
		* @param props - owner-controlled flow props.
		* @returns menu + dialog elements.
		*/
		function WorkspacePickFlow({ t, open, anchorRef, useWorkspaces, createWorkspace, useDirectoryFlow, renderDirectoryFlow, onPick, onClose, addOnly = false, side = "bottom", selectedId }) {
			const workspaceSnapshot = useWorkspaces((state) => state);
			const workspaces = workspaceSnapshot.items;
			const getAnchorRect = (0, react.useCallback)(() => anchorRef?.current?.getBoundingClientRect() ?? null, [anchorRef]);
			const [errorOpen, setErrorOpen] = (0, react.useState)(false);
			const [modalError, setModalError] = (0, react.useState)(null);
			const [flowOpen, setFlowOpen] = (0, react.useState)(false);
			const [pickingFolder, setPickingFolder] = (0, react.useState)(false);
			const flowBusy = flowOpen || pickingFolder;
			const flowAvailable = useDirectoryFlow((occupied) => occupied);
			(0, react.useEffect)(() => {
				if (flowOpen && !flowAvailable) setFlowOpen(false);
			}, [flowOpen, flowAvailable]);
			const addEntries = flowAvailable ? [{
				id: ADD_WORKSPACE,
				label: t("menu.addWorkspace"),
				icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconPlusOutlineRegular, { size: 16 }),
				disabled: flowBusy
			}] : [];
			const pinAdd = !addOnly && workspaces.length > 0;
			const items = pinAdd ? workspaces.map((workspace) => ({
				id: workspace.workspaceId,
				label: workspace.title,
				icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFolderCloseRegular, { size: 16 }),
				disabled: flowBusy
			})) : addEntries;
			const menuIsEmpty = items.length === 0;
			const closeModal = () => {
				setErrorOpen(false);
				setModalError(null);
			};
			/** Adopt a picked directory; failures land in the folder-error dialog (Choose again reopens the flow). */
			const adoptDirectory = (path) => createWorkspace({ path }).then((workspace) => {
				setFlowOpen(false);
				onPick(workspace.workspaceId);
			}).catch((reason) => {
				setModalError(reason instanceof Error ? reason.message : String(reason));
				setFlowOpen(false);
				setErrorOpen(true);
			});
			const openDirectoryFlow = (0, react.useCallback)(() => {
				onClose();
				setErrorOpen(false);
				setModalError(null);
				setFlowOpen(true);
			}, [onClose]);
			const listSettled = addOnly || workspaceSnapshot.phase === "ready";
			const addIsTheOnlyEntry = !pinAdd && listSettled && addEntries.length === 1;
			(0, react.useEffect)(() => {
				if (open && addIsTheOnlyEntry && !flowBusy) openDirectoryFlow();
			}, [
				open,
				addIsTheOnlyEntry,
				flowBusy,
				openDirectoryFlow
			]);
			/** Owner side of the flow conversation: adopt keeps the flow open (busy) until the Host answers. */
			const flowOwner = {
				open: flowOpen,
				busy: pickingFolder,
				onPicked: (path) => {
					setPickingFolder(true);
					adoptDirectory(path).finally(() => {
						setPickingFolder(false);
					});
				},
				onCancel: () => {
					setFlowOpen(false);
				},
				onError: (message) => {
					setFlowOpen(false);
					setModalError(message);
					setErrorOpen(true);
				}
			};
			const handleSelect = (id) => {
				if (id === ADD_WORKSPACE) {
					openDirectoryFlow();
					return;
				}
				onPick(id);
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Menu, {
					open: open && !addIsTheOnlyEntry && !menuIsEmpty,
					anchor: null,
					items,
					...pinAdd ? { footer: addEntries } : {},
					selectedId,
					onSelect: handleSelect,
					onClose,
					side,
					portal: true,
					getAnchorRect
				}),
				open && !addIsTheOnlyEntry && !menuIsEmpty && workspaceSnapshot.phase === "pending" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: WorkspacePicker_module_default.menuStatus,
					role: "status",
					children: t("picker.loading")
				}),
				renderDirectoryFlow(flowOwner),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
					open: errorOpen,
					onClose: closeModal,
					closeLabel: t("close"),
					title: t("folderError.title"),
					footer: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
						variant: "outline",
						className: WorkspacePicker_module_default.modalAction,
						onClick: closeModal,
						children: t("cancel")
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
						variant: "primary",
						className: WorkspacePicker_module_default.modalAction,
						disabled: !flowAvailable,
						onClick: openDirectoryFlow,
						children: t("folderError.retry")
					})] }),
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: WorkspacePicker_module_default.modalError,
						role: "alert",
						children: modalError
					})
				})
			] });
		}
		//#endregion
		//#region packages/client/ui-session-categories/src/client/DirectDirectoryFlow.tsx
		/** Renderless native directory chooser used directly by the replacement browser. */
		/**
		* Run one native chooser per rising `open` edge and report one outcome.
		* @param props - owner conversation and direct Host chooser callback.
		* @returns null because the Host renders the native chooser.
		*/
		function DirectDirectoryFlow(props) {
			const { open, pick } = props;
			const armed = (0, react.useRef)(false);
			const outcome = (0, react.useRef)(props);
			outcome.current = props;
			const alive = (0, react.useRef)(true);
			(0, react.useEffect)(() => {
				alive.current = true;
				return () => {
					alive.current = false;
				};
			}, []);
			(0, react.useEffect)(() => {
				if (!open) {
					armed.current = false;
					return;
				}
				if (armed.current) return;
				armed.current = true;
				pick().then((path) => {
					if (!alive.current) return;
					if (path === null) outcome.current.onCancel();
					else outcome.current.onPicked(path);
				}, (reason) => {
					if (!alive.current) return;
					outcome.current.onError(reason instanceof Error ? reason.message : String(reason));
				});
			}, [open, pick]);
			return null;
		}
		//#endregion
		//#region packages/client/ui-session-categories/src/client/WorkspaceBrowser.module.css
		var WorkspaceBrowser_module_default = {
			"categoryGroup": "yuxdOq_categoryGroup",
			"categoryGroupExpanded": "yuxdOq_categoryGroupExpanded",
			"categoryStatus": "yuxdOq_categoryStatus",
			"clearButton": "yuxdOq_clearButton",
			"deleteAction": "yuxdOq_deleteAction",
			"deleteStatus": "yuxdOq_deleteStatus",
			"empty": "yuxdOq_empty",
			"fade": "yuxdOq_fade",
			"flatList": "yuxdOq_flatList",
			"groupSection": "yuxdOq_groupSection",
			"headerActions": "yuxdOq_headerActions",
			"headerActionsHidden": "yuxdOq_headerActionsHidden",
			"iconButton": "yuxdOq_iconButton",
			"list": "yuxdOq_list",
			"listArea": "yuxdOq_listArea",
			"listTopDropActive": "yuxdOq_listTopDropActive",
			"listTopDropIndicator": "yuxdOq_listTopDropIndicator",
			"rail": "yuxdOq_rail",
			"renameError": "yuxdOq_renameError",
			"renameInput": "yuxdOq_renameInput",
			"root": "yuxdOq_root",
			"search": "yuxdOq_search",
			"searchButton": "yuxdOq_searchButton",
			"searchExpanded": "yuxdOq_searchExpanded",
			"searchInput": "yuxdOq_searchInput",
			"searchSlot": "yuxdOq_searchSlot",
			"searchSlotExpanded": "yuxdOq_searchSlotExpanded",
			"searchStatus": "yuxdOq_searchStatus",
			"searchTree": "yuxdOq_searchTree",
			"searchWarning": "yuxdOq_searchWarning",
			"sectionHeader": "yuxdOq_sectionHeader",
			"sectionLabel": "yuxdOq_sectionLabel",
			"sectionLabelHidden": "yuxdOq_sectionLabelHidden",
			"sessionOverflowButton": "yuxdOq_sessionOverflowButton",
			"treeBody": "yuxdOq_treeBody",
			"wide": "yuxdOq_wide",
			"wide-in": "yuxdOq_wide-in",
			"workspaceChildGroup": "yuxdOq_workspaceChildGroup",
			"workspaceDropAfter": "yuxdOq_workspaceDropAfter",
			"workspaceDropBefore": "yuxdOq_workspaceDropBefore",
			"workspaceFolderContentsDrop": "yuxdOq_workspaceFolderContentsDrop",
			"workspaceFolderCreateGlyph": "yuxdOq_workspaceFolderCreateGlyph",
			"workspaceFolderCreateRow": "yuxdOq_workspaceFolderCreateRow",
			"workspaceFolderGroup": "yuxdOq_workspaceFolderGroup"
		};
		//#endregion
		//#region packages/client/ui-session-categories/src/client/WorkspaceBrowser.tsx
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
		/**
		* Column slide length (--ds-transition-duration-slow): rail-search focus waits it out — * focus() forces a synchronous layout and would jank the slide.
		*/
		const EXPAND_SLIDE_MS = 300;
		/** Pause between the latest keystroke and a Host content-search request. */
		const SEARCH_DEBOUNCE_MS = 250;
		/** `session.search` wire bound, measured in JavaScript UTF-16 code units. */
		const SEARCH_QUERY_MAX_CODE_UNITS = 500;
		/** Session rows visible per Workspace before the local overflow control. */
		const COLLAPSED_SESSION_LIMIT = 5;
		/** Stable selector seat: this replacement always carries its direct native flow. */
		const DIRECT_DIRECTORY_FLOW_AVAILABLE = (selector) => selector(true);
		/** Human-readable byte size for the delete dialog's plan: 0 → "0 B", 1536 → "1.5 KB". */
		function formatBytes$1(bytes) {
			if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
			const units = [
				"B",
				"KB",
				"MB",
				"GB",
				"TB"
			];
			let value = bytes;
			let unit = 0;
			while (value >= 1024 && unit < units.length - 1) {
				value /= 1024;
				unit += 1;
			}
			return `${unit === 0 ? String(value) : value.toFixed(value >= 100 ? 0 : 1)} ${units[unit]}`;
		}
		/** Keep controlled input and RPC payload inside the session.search wire contract. */
		function sanitizeSearchQuery(value) {
			const withoutNul = value.replaceAll("\0", "");
			if (withoutNul.length <= SEARCH_QUERY_MAX_CODE_UNITS) return withoutNul;
			let end = SEARCH_QUERY_MAX_CODE_UNITS;
			const last = withoutNul.charCodeAt(end - 1);
			const next = withoutNul.charCodeAt(end);
			if (last >= 55296 && last <= 56319 && next >= 56320 && next <= 57343) end--;
			return withoutNul.slice(0, end);
		}
		/** Immutable membership toggle for the local expand-all array. */
		function toggled(list, key) {
			return list.includes(key) ? list.filter((k) => k !== key) : [...list, key];
		}
		/**
		* Accept the native drag at document level while a row drag is active: row
		* hover still owns the insertion marker, and releasing outside the list must
		* not be rendered as a rejected drop before dragend commits that last marker.
		*/
		function useNativeDragAcceptance(active) {
			(0, react.useEffect)(() => {
				if (!active) return;
				const acceptDrag = (event) => {
					event.preventDefault();
					if (event.dataTransfer !== null) event.dataTransfer.dropEffect = "move";
				};
				const acceptDrop = (event) => {
					event.preventDefault();
				};
				document.addEventListener("dragover", acceptDrag);
				document.addEventListener("drop", acceptDrop);
				return () => {
					document.removeEventListener("dragover", acceptDrag);
					document.removeEventListener("drop", acceptDrop);
				};
			}, [active]);
		}
		/** Reconcile a stored view order with the Workspace's current session account. */
		function reconciledSessionOrder(sessionIds, stored) {
			if (stored === void 0) return [...sessionIds];
			const byId = new Map(sessionIds.map((id) => [id, id]));
			const ordered = [];
			const included = /* @__PURE__ */ new Set();
			for (const key of stored) {
				const id = byId.get(key);
				if (id === void 0 || included.has(key)) continue;
				ordered.push(id);
				included.add(key);
			}
			for (const id of sessionIds) {
				if (included.has(id)) continue;
				ordered.push(id);
			}
			return ordered;
		}
		/** Newest update first with stable Session identity as the tie-break. */
		function compareSessionRecency(a, b, byId) {
			const aUpdatedAt = byId[a]?.updatedAt ?? Number.NEGATIVE_INFINITY;
			const bUpdatedAt = byId[b]?.updatedAt ?? Number.NEGATIVE_INFINITY;
			if (aUpdatedAt !== bUpdatedAt) return bUpdatedAt - aUpdatedAt;
			return a < b ? -1 : 1;
		}
		/** Reconcile one editable order account and apply its activity-promotion policy. */
		function nextSessionOrderAccount({ sessionIds, previousOrder, previousUpdatedAt, list, orderBy, sortByRecency }) {
			let order = reconciledSessionOrder(sessionIds, previousOrder);
			if (sortByRecency) order.sort((a, b) => compareSessionRecency(a, b, list.byId));
			else if (orderBy === "updated") {
				const promoted = sessionIds.filter((id) => {
					const session = list.byId[id];
					return session !== void 0 && (previousUpdatedAt[id] === void 0 || session.updatedAt > previousUpdatedAt[id]);
				}).sort((a, b) => compareSessionRecency(a, b, list.byId));
				if (promoted.length > 0) {
					const promotedIds = new Set(promoted);
					order = [...promoted, ...order.filter((id) => !promotedIds.has(id))];
				}
			}
			const updatedAt = {};
			for (const id of sessionIds) {
				const session = list.byId[id];
				if (session !== void 0) updatedAt[id] = session.updatedAt;
			}
			const orderChanged = previousOrder === void 0 || order.length !== previousOrder.length || order.some((id, index) => id !== previousOrder[index]);
			const timestampsChanged = Object.keys(updatedAt).length !== Object.keys(previousUpdatedAt).length || Object.entries(updatedAt).some(([id, timestamp]) => previousUpdatedAt[id] !== timestamp);
			return {
				order,
				updatedAt,
				changed: orderChanged || timestampsChanged
			};
		}
		/** Grouping and ordering menu; own open state so it resets with the wide chrome. */
		function ViewOptionsMenu({ groupBy, orderBy, archivedFilter, hoistPinned, onGroupPick, onOrderPick, onArchivedFilterPick, onHoistPinnedPick, onCreateFolder, t }) {
			const [open, setOpen] = (0, react.useState)(false);
			const filterIcons = {
				"hide-archived": /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconArchiveOffOutlineRegular, {}),
				"show-archived": /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconQueueOutlineRegular, {}),
				"only-archived": /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconArchiveCheckOutlineRegular, {})
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Menu, {
				open,
				onClose: () => {
					setOpen(false);
				},
				items: [
					{
						id: "new-folder",
						label: t("folder.create"),
						icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFolderCloseRegular, {})
					},
					{
						type: "separator",
						id: "new-folder-separator"
					},
					{
						type: "label",
						id: "group-by",
						text: t("groupBy.label")
					},
					{
						id: "workspace",
						label: t("groupBy.workspace")
					},
					{
						id: "workspace-tree",
						label: t("groupBy.workspaceTree")
					},
					{
						id: "flat",
						label: t("groupBy.flat")
					},
					{
						type: "separator",
						id: "order-by-separator"
					},
					{
						type: "label",
						id: "order-by",
						text: t("orderBy.label")
					},
					{
						id: "manual",
						label: t("orderBy.manual")
					},
					{
						id: "updated",
						label: t("orderBy.updated")
					},
					{
						type: "separator",
						id: "archived-filter-separator"
					},
					{
						type: "label",
						id: "filter-by",
						text: t("filterBy.label")
					},
					{
						id: "hide-archived",
						label: t("viewOptions.hideArchived"),
						icon: filterIcons["hide-archived"]
					},
					{
						id: "show-archived",
						label: t("viewOptions.showArchived"),
						icon: filterIcons["show-archived"]
					},
					{
						id: "only-archived",
						label: t("viewOptions.onlyArchived"),
						icon: filterIcons["only-archived"]
					},
					{
						type: "separator",
						id: "hoist-pinned-separator"
					},
					{
						type: "label",
						id: "hoist-pinned-label",
						text: t("viewOptions.hoist.label")
					},
					{
						id: "hoist-pinned",
						label: t("viewOptions.hoist.on"),
						icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconPinFillRegular, {})
					},
					{
						id: "keep-pinned",
						label: t("viewOptions.hoist.off"),
						icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconPinOutlineRegular, {})
					}
				],
				selectedIds: [
					groupBy,
					orderBy,
					archivedFilter === "show" ? "show-archived" : archivedFilter === "only" ? "only-archived" : "hide-archived",
					hoistPinned ? "hoist-pinned" : "keep-pinned"
				],
				onSelect: (id) => {
					if (id === "new-folder") onCreateFolder();
					else if (id === "workspace" || id === "workspace-tree" || id === "flat") onGroupPick(id);
					else if (id === "manual" || id === "updated") onOrderPick(id);
					else if (id === "hide-archived") onArchivedFilterPick("default");
					else if (id === "show-archived") onArchivedFilterPick("show");
					else if (id === "only-archived") onArchivedFilterPick("only");
					else if (id === "hoist-pinned") onHoistPinnedPick(true);
					else if (id === "keep-pinned") onHoistPinnedPick(false);
					setOpen(false);
				},
				align: "end",
				dense: true,
				portal: true,
				anchor: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tooltip, {
					label: t("viewOptions.label"),
					side: "bottom",
					delayMs: 500,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: clsx(WorkspaceBrowser_module_default.iconButton, WorkspaceBrowser_module_default.wide),
						"aria-label": t("viewOptions.label"),
						onClick: () => {
							setOpen((v) => !v);
						},
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconPersonalizationOutlineRegular, {})
					})
				})
			});
		}
		/** Resolve an insertion side from the full rendered workspace group. */
		function workspaceGroupHalf(e) {
			const rect = e.currentTarget.getBoundingClientRect();
			return e.clientY < rect.top + rect.height / 2 ? "before" : "after";
		}
		/** The scrolling session tree; unmounting drops the sessions subscription and expand-all state. */
		function SessionTree({ useSessions, startSession, open, forkSession, workspaces, archivedSessionIds, archivedSessionIdsRaw, archivedFilter, nestWorkspaces, renameCategory, moveCategory, reorderCategory, assignSessions, categorySnapshots, categoryExpansion, setCategoryExpanded, onCreateCategory, onDeleteCategory, workspaceFolders, workspaceFolderAssignments, workspaceFolderExpansion, workspaceIcons, workspaceFolderIcons, onPickWorkspaceIcon, onPickWorkspaceFolderIcon, onArchiveAllRequest, setWorkspaceFolderExpanded, renameWorkspaceFolder, deleteWorkspaceFolder, moveWorkspaceFolder, assignWorkspaceFolder, onCreateWorkspaceFolder, onRenameRequest, onDeleteRequest, onSessionRename, onSessionArchive, onSessionUnarchive, onSessionDelete, onSessionPin, onSessionUnpin, pinnedSessionIds, hoistPinned, insertWorkspaceBefore, insertSessionBefore, orderBy, groupExpansion, setGroupExpanded, sessionOrderByAccount, sessionUpdatedAtByAccount, syncSessionOrderAccount, setSessionOrder, t }) {
			const list = useSessions((s) => s);
			const current = currentSessionId(list);
			const [expandedSessionGroups, setExpandedSessionGroups] = (0, react.useState)([]);
			const [drag, setDrag] = (0, react.useState)(null);
			const sessionDropCommitted = (0, react.useRef)(false);
			const [workspaceDrag, setWorkspaceDrag] = (0, react.useState)(null);
			/** Source folder id of an in-flight display-folder drag; rows own the zone. */
			const [folderDragId, setFolderDragId] = (0, react.useState)(null);
			/**
			* Display folder whose block a Workspace drag is currently over — the row
			* itself or the expanded body underneath it. The header row highlights from
			* this so dropping anywhere on the folder block reads as the same action.
			*/
			const [workspaceFolderHover, setWorkspaceFolderHover] = (0, react.useState)(null);
			const [pendingCategorySession, setPendingCategorySession] = (0, react.useState)(null);
			const workspaceDropCommitted = (0, react.useRef)(false);
			const previousOrderBy = (0, react.useRef)(orderBy);
			useNativeDragAcceptance(drag !== null || workspaceDrag !== null || folderDragId !== null);
			const currentGroup = current === void 0 ? void 0 : workspaces.find((w) => w.sessionIds.includes(current))?.workspaceId ?? "";
			(0, react.useEffect)(() => {
				if (current === void 0 || currentGroup === void 0 || Object.hasOwn(groupExpansion, currentGroup)) return;
				setGroupExpanded(currentGroup, true);
			}, [
				current,
				currentGroup,
				setGroupExpanded,
				groupExpansion
			]);
			(0, react.useEffect)(() => {
				if (pendingCategorySession === null || current === void 0) return;
				const workspace = workspaces.find((candidate) => candidate.workspaceId === pendingCategorySession.workspaceId);
				if (workspace === void 0 || !workspace.sessionIds.includes(current)) return;
				setPendingCategorySession(null);
				assignSessions(pendingCategorySession.workspaceId, [current], pendingCategorySession.categoryId);
			}, [
				assignSessions,
				current,
				pendingCategorySession,
				workspaces
			]);
			const expandedGroups = (0, react.useMemo)(() => Object.entries(groupExpansion).filter(([, expanded]) => expanded).map(([key]) => key), [groupExpansion]);
			const ungroupedSessionIds = (0, react.useMemo)(() => {
				const accounted = new Set(workspaces.flatMap((workspace) => workspace.sessionIds));
				return list.ids.filter((id) => list.byId[id] !== void 0 && !accounted.has(id));
			}, [list, workspaces]);
			(0, react.useEffect)(() => {
				if (list.phase !== "ready") return;
				const switchedToUpdated = previousOrderBy.current !== "updated" && orderBy === "updated";
				previousOrderBy.current = orderBy;
				const accounts = [...workspaces.map((workspace) => ({
					key: workspace.workspaceId,
					sessionIds: workspace.sessionIds.filter((id) => list.byId[id] !== void 0)
				})), {
					key: "",
					sessionIds: ungroupedSessionIds
				}];
				for (const { key, sessionIds } of accounts) {
					const previousOrder = sessionOrderByAccount[key];
					const next = nextSessionOrderAccount({
						sessionIds,
						previousOrder,
						previousUpdatedAt: sessionUpdatedAtByAccount[key] ?? {},
						list,
						orderBy,
						sortByRecency: orderBy === "updated" && (previousOrder === void 0 || switchedToUpdated)
					});
					if (next.changed) syncSessionOrderAccount(key, next.order.map((id) => id), next.updatedAt);
				}
			}, [
				list,
				orderBy,
				sessionOrderByAccount,
				sessionUpdatedAtByAccount,
				syncSessionOrderAccount,
				ungroupedSessionIds,
				workspaces
			]);
			const orderedWorkspaces = (0, react.useMemo)(() => {
				return workspaces.map((workspace) => {
					const stored = sessionOrderByAccount[workspace.workspaceId];
					const sessionIds = reconciledSessionOrder(workspace.sessionIds, stored);
					return {
						...workspace,
						sessionIds
					};
				});
			}, [sessionOrderByAccount, workspaces]);
			const orderedUngroupedSessionIds = (0, react.useMemo)(() => reconciledSessionOrder(ungroupedSessionIds, sessionOrderByAccount[""]), [sessionOrderByAccount, ungroupedSessionIds]);
			const groups = (0, react.useMemo)(() => deriveGroups(list, orderedWorkspaces, archivedSessionIds, {
				expandedGroups,
				...sessionOrderByAccount[""] === void 0 ? {} : { ungroupedOrder: sessionOrderByAccount[""] },
				showArchiveSection: archivedFilter !== "default" && archivedSessionIdsRaw.length > 0,
				groupExpansion,
				archivedFilter,
				nestWorkspaces
			}, pinnedSessionIds, archivedSessionIdsRaw, archivedFilter), [
				list,
				orderedWorkspaces,
				archivedSessionIds,
				expandedGroups,
				sessionOrderByAccount,
				pinnedSessionIds,
				archivedSessionIdsRaw,
				archivedFilter,
				groupExpansion,
				nestWorkspaces
			]);
			const folderForest = (0, react.useMemo)(() => buildWorkspaceFolderForest(workspaceFolders, workspaceFolderAssignments, workspaceFolderExpansion), [
				workspaceFolders,
				workspaceFolderAssignments,
				workspaceFolderExpansion
			]);
			const folderOptions = (0, react.useMemo)(() => workspaceFolderOptions(folderForest), [folderForest]);
			const hasFolderLayer = folderForest.roots.length > 0;
			const rootGroups = (0, react.useMemo)(() => groups.filter((group) => group.parentKey === void 0), [groups]);
			const archiveGroup = rootGroups.find((group) => group.key === ARCHIVED_KEY);
			const contentRootGroups = rootGroups.filter((group) => group.key !== ARCHIVED_KEY);
			const workspaceRootIds = contentRootGroups.map((group) => group.workspaceId).filter((workspaceId) => workspaceId !== void 0);
			const groupsInFolder = (folderId) => contentRootGroups.filter((group) => group.workspaceId !== void 0 && folderForest.assignments[group.workspaceId] === folderId);
			const unfiledGroups = hasFolderLayer ? contentRootGroups.filter((group) => group.workspaceId === void 0 || folderForest.assignments[group.workspaceId] === void 0) : contentRootGroups;
			const unfiledExpanded = workspaceFolderExpansion[UNFILED_WORKSPACE_FOLDER_KEY] !== false;
			/** Display folder currently owning one Workspace, or null when unfiled. */
			const folderOfWorkspace = (workspaceId) => workspaceId === void 0 ? null : folderForest.assignments[workspaceId] ?? null;
			const folderWorkspaceCount = (node) => countDirectWorkspaces(workspaceRootIds, node.id, folderForest.assignments) + node.children.reduce((total, child) => total + folderWorkspaceCount(child), 0);
			const folderContainsCurrent = (node) => groupsInFolder(node.id).some((group) => group.containsCurrent) || node.children.some((child) => folderContainsCurrent(child));
			const folderMoveTargets = (folderId) => {
				const invalid = new Set(workspaceFolderInvalidTargets(folderForest, folderId));
				return folderOptions.filter((option) => !invalid.has(option.id));
			};
			/**
			* Commit a Workspace row dropped on a folder (or on the unfiled bucket).
			* Filing is display-only, so the only writes are one browser-local
			* assignment and, for a collapsed target, its expansion flag.
			*/
			const commitWorkspaceDropOnFolder = (folderId) => {
				if (workspaceDrag === null) return;
				const workspaceId = workspaceDrag.workspaceId;
				setWorkspaceDrag(null);
				setWorkspaceFolderHover(null);
				if (folderId !== null) setWorkspaceFolderExpanded(folderId, true);
				assignWorkspaceFolder(workspaceId, folderId);
			};
			/**
			* Commit a folder row dropped on another folder row: top/bottom bands
			* reorder among the target's siblings, the middle band nests inside it. A
			* drop on the unfiled bucket always means "back to the top level".
			*/
			const commitFolderDrop = (sourceId, targetId, zone) => {
				setFolderDragId(null);
				if (targetId === "__unfiled_workspaces__") {
					moveWorkspaceFolder(sourceId, null);
					return;
				}
				const target = folderForest.byId.get(targetId);
				if (target === void 0) return;
				if (zone === "inside") {
					setWorkspaceFolderExpanded(target.id, true);
					moveWorkspaceFolder(sourceId, target.id);
					return;
				}
				const siblings = target.parentId === null ? folderForest.roots : folderForest.byId.get(target.parentId)?.children ?? [];
				const targetIndex = siblings.findIndex((sibling) => sibling.id === target.id);
				const anchor = zone === "before" ? target.id : siblings[targetIndex + 1]?.id;
				moveWorkspaceFolder(sourceId, target.parentId, anchor);
			};
			const now = Date.now();
			/** Pin set as a lookup, so anchor resolution can skip hoisted rows cheaply. */
			const pinnedSet = (0, react.useMemo)(() => new Set(pinnedSessionIds), [pinnedSessionIds]);
			/** Archive set as a lookup for the per-Workspace bulk-archive candidate scan. */
			const archivedRawSet = (0, react.useMemo)(() => new Set(archivedSessionIdsRaw), [archivedSessionIdsRaw]);
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
			const storedAnchorFor = (rendered, stored, draggedId, overId, half, pinned) => {
				const hitIndex = rendered.indexOf(overId);
				if (hitIndex === -1) return void 0;
				const storedSet = new Set(stored);
				for (let index = half === "before" ? hitIndex : hitIndex + 1; index < rendered.length; index++) {
					const id = rendered[index];
					if (id === draggedId || pinned.has(id) || !storedSet.has(id)) continue;
					return id;
				}
			};
			const commitSessionDrag = (activeDrag, over) => {
				if (sessionDropCommitted.current) return;
				sessionDropCommitted.current = true;
				setDrag(null);
				const group = groups.find((candidate) => candidate.key === activeDrag.accountKey);
				if (group === void 0) return;
				const accountSessionIds = activeDrag.accountKey === "" ? orderedUngroupedSessionIds : orderedWorkspaces.find((workspace) => workspace.workspaceId === activeDrag.accountKey)?.sessionIds;
				if (accountSessionIds === void 0) return;
				const anchor = storedAnchorFor(group.sessions.map((session) => session.id), accountSessionIds, activeDrag.sessionId, over.id, over.half, pinnedSet);
				if (anchor === activeDrag.sessionId) return;
				const sourceIndex = accountSessionIds.indexOf(activeDrag.sessionId);
				const anchorIndex = anchor === void 0 ? accountSessionIds.length : accountSessionIds.indexOf(anchor);
				if (sourceIndex !== -1 && (anchorIndex === sourceIndex || anchorIndex === sourceIndex + 1)) return;
				const nextOrder = accountSessionIds.filter((id) => id !== activeDrag.sessionId);
				const insertAt = anchor === void 0 ? nextOrder.length : nextOrder.indexOf(anchor);
				nextOrder.splice(insertAt === -1 ? nextOrder.length : insertAt, 0, activeDrag.sessionId);
				setSessionOrder(activeDrag.accountKey, nextOrder.map((id) => id));
				if (orderBy === "updated" || activeDrag.accountKey === "") return;
				insertSessionBefore(activeDrag.accountKey, activeDrag.sessionId, anchor).catch((reason) => {
					console.warn("session reorder rejected:", reason);
				});
			};
			const commitWorkspaceDrag = (activeDrag, over) => {
				if (workspaceDropCommitted.current) return;
				workspaceDropCommitted.current = true;
				setWorkspaceDrag(null);
				const rowIndex = workspaces.findIndex((workspace) => workspace.workspaceId === over.id);
				if (rowIndex === -1) return;
				const anchor = over.half === "before" ? over.id : workspaces[rowIndex + 1]?.workspaceId;
				if (anchor === activeDrag.workspaceId) return;
				const sourceIndex = workspaces.findIndex((workspace) => workspace.workspaceId === activeDrag.workspaceId);
				const anchorIndex = anchor === void 0 ? workspaces.length : workspaces.findIndex((workspace) => workspace.workspaceId === anchor);
				if (sourceIndex !== -1 && (anchorIndex === sourceIndex || anchorIndex === sourceIndex + 1)) return;
				insertWorkspaceBefore(activeDrag.workspaceId, anchor).catch((reason) => {
					console.warn("workspace reorder rejected:", reason);
				});
			};
			const workspaceDropAtListStart = groups[0]?.workspaceId !== void 0 && workspaceDrag?.over?.id === groups[0].workspaceId && workspaceDrag.over.half === "before";
			const childKeys = (0, react.useMemo)(() => {
				const keys = /* @__PURE__ */ new Set();
				for (const group of groups) if (group.parentKey !== void 0) keys.add(group.parentKey);
				return keys;
			}, [groups]);
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
			const renderGroup = (group) => {
				const workspaceId = group.workspaceId;
				const workspaceSessionIds = workspaceId === void 0 ? [] : orderedWorkspaces.find((workspace) => workspace.workspaceId === workspaceId)?.sessionIds ?? [];
				const archivedMainView = (sessionId) => (list.byId[sessionId]?.retainedBy?.mainView ?? 0) > 0;
				const archiveAllEligible = workspaceSessionIds.filter((sessionId) => list.byId[sessionId] !== void 0 && list.byId[sessionId].origin !== "subagent" && list.byId[sessionId].blank !== true && !archivedRawSet.has(sessionId) && sessionId !== current && !archivedMainView(sessionId));
				const archiveAllCandidates = archiveAllEligible.filter((sessionId) => list.byId[sessionId]?.running !== true);
				const archiveAllSkippedRunning = archiveAllEligible.length - archiveAllCandidates.length;
				const categorySnapshot = workspaceId === void 0 ? void 0 : categorySnapshots[workspaceId];
				const categoryProjection = workspaceId === void 0 || categorySnapshot === void 0 ? void 0 : buildCategoryTree(categorySnapshot, (orderedWorkspaces.find((workspace) => workspace.workspaceId === workspaceId)?.sessionIds ?? []).map((id) => list.byId[id]).filter((session) => session !== void 0), {
					expandedCategories: categorySnapshot.categories.filter((category) => categoryExpansion[category.id] === true).map((category) => category.id),
					expandedCategoryState: categoryExpansion,
					...current === void 0 ? {} : { currentSessionId: current },
					archivedSessionIds,
					categoryOrder: sessionOrderByAccount
				}, pinnedSessionIds, archivedSessionIdsRaw, hoistPinned);
				const categoryChoices = categorySnapshot?.categories.map((category) => {
					let depth = 0;
					let parentId = category.parentId;
					while (parentId !== null) {
						depth++;
						parentId = categorySnapshot.categories.find((candidate) => candidate.id === parentId)?.parentId ?? null;
					}
					return {
						id: category.id,
						title: category.title,
						depth
					};
				}) ?? [];
				const projectedRows = group.expanded ? categoryProjection !== void 0 ? categoryProjection.unclassifiedSessions : group.sessions : [];
				const rowsExpanded = expandedSessionGroups.includes(group.key);
				const visibleSessionRows = rowsExpanded ? projectedRows : projectedRows.slice(0, COLLAPSED_SESSION_LIMIT);
				const invalidSourcesForTarget = (categoryId) => {
					const invalid = [categoryId];
					let parentId = categorySnapshot?.categories.find((category) => category.id === categoryId)?.parentId ?? null;
					while (parentId !== null) {
						invalid.push(parentId);
						parentId = categorySnapshot?.categories.find((category) => category.id === parentId)?.parentId ?? null;
					}
					return invalid;
				};
				const invalidTargetsForSource = (categoryId) => {
					const invalid = [categoryId];
					for (let index = 0; index < invalid.length; index++) {
						const parentId = invalid[index];
						for (const category of categorySnapshot?.categories ?? []) if (category.parentId === parentId && !invalid.includes(category.id)) invalid.push(category.id);
					}
					return invalid;
				};
				const categoryDeleteCounts = (categoryId) => {
					const categoryIds = [categoryId];
					for (let index = 0; index < categoryIds.length; index++) {
						const parentId = categoryIds[index];
						for (const category of categorySnapshot?.categories ?? []) if (category.parentId === parentId && !categoryIds.includes(category.id)) categoryIds.push(category.id);
					}
					const assignedIds = (categorySnapshot?.assignments ?? []).filter((assignment) => categoryIds.includes(assignment.categoryId)).map((assignment) => assignment.sessionId);
					return {
						descendantCount: categoryIds.length - 1,
						sessionCount: assignedIds.length,
						runningCount: assignedIds.filter((id) => list.byId[id]?.running === true).length
					};
				};
				const renderCategory = (node, depth) => {
					const categoryAccountKey = categoryOrderKey(node.id);
					const categoryDrag = drag !== null && drag.accountKey === categoryAccountKey ? drag : null;
					const commitCategoryDrag = (activeDrag, over) => {
						if (sessionDropCommitted.current) return;
						sessionDropCommitted.current = true;
						setDrag(null);
						const base = node.orderedSessionIds;
						const targetIndex = base.indexOf(over.id);
						if (targetIndex === -1) return;
						const anchor = over.half === "before" ? over.id : base[targetIndex + 1];
						if (anchor === activeDrag.sessionId) return;
						const sourceIndex = base.indexOf(activeDrag.sessionId);
						const anchorIndex = anchor === void 0 ? base.length : base.indexOf(anchor);
						if (sourceIndex !== -1 && (anchorIndex === sourceIndex || anchorIndex === sourceIndex + 1)) return;
						const nextOrder = base.filter((id) => id !== activeDrag.sessionId);
						const insertAt = anchor === void 0 ? nextOrder.length : nextOrder.indexOf(anchor);
						nextOrder.splice(insertAt === -1 ? nextOrder.length : insertAt, 0, activeDrag.sessionId);
						setSessionOrder(categoryAccountKey, nextOrder.map((id) => id));
					};
					const categoryDragPropsFor = (sessionId) => ({
						start: () => {
							sessionDropCommitted.current = false;
							setDrag({
								accountKey: categoryAccountKey,
								sessionId,
								over: null
							});
						},
						active: categoryDrag !== null,
						marker: categoryDrag?.over?.id === sessionId ? categoryDrag.over.half : null,
						hover: (half) => {
							setDrag((d) => d === null ? d : {
								...d,
								over: {
									id: sessionId,
									half
								}
							});
						},
						drop: (half) => {
							if (categoryDrag === null) return;
							commitCategoryDrag(categoryDrag, {
								id: sessionId,
								half
							});
						},
						end: () => {
							if (categoryDrag?.over !== null && categoryDrag?.over !== void 0) commitCategoryDrag(categoryDrag, categoryDrag.over);
							else setDrag(null);
							sessionDropCommitted.current = false;
						}
					});
					return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						role: "group",
						className: clsx(WorkspaceBrowser_module_default.categoryGroup, node.expanded && WorkspaceBrowser_module_default.categoryGroupExpanded),
						"data-category-container": node.expanded ? "expanded" : "collapsed",
						style: { "--category-depth": depth },
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(CategoryRowItem, {
								node,
								workspaceId,
								depth,
								categoryOptions: categoryChoices,
								invalidMoveTargetIds: invalidTargetsForSource(node.id),
								invalidCategorySourceIds: invalidSourcesForTarget(node.id),
								onToggle: () => {
									setCategoryExpanded(node.id, !node.expanded);
								},
								onCreate: () => {
									setPendingCategorySession({
										workspaceId,
										categoryId: node.id
									});
									setGroupExpanded(group.key, true);
									startSession(workspaceId);
								},
								onCreateCategory: (parentId) => {
									onCreateCategory(workspaceId, parentId);
								},
								onRename: async (categoryId, title) => {
									const result = await renameCategory(categoryId, title);
									if (!result.ok) throw new Error("message" in result.error ? result.error.message : result.error.code);
								},
								onMove: async (categoryId, parentId) => {
									const result = await moveCategory(categoryId, parentId);
									if (!result.ok) throw new Error("message" in result.error ? result.error.message : result.error.code);
								},
								onDelete: (categoryId) => {
									const counts = categoryDeleteCounts(categoryId);
									onDeleteCategory(categoryId, node.title, counts.descendantCount, counts.sessionCount, counts.runningCount);
								},
								onDropPayload: (payload, targetId) => {
									if (payload.kind === "session") assignSessions(payload.workspaceId, payload.sessionIds, targetId);
									else moveCategory(payload.categoryId, targetId);
								},
								onReorder: (sourceId, targetId, half) => {
									const parentOf = (id) => categorySnapshot?.categories.find((category) => category.id === id)?.parentId ?? null;
									if (parentOf(sourceId) !== parentOf(targetId)) {
										moveCategory(sourceId, targetId);
										return;
									}
									if (sourceId === targetId) return;
									const siblings = (categorySnapshot?.categories ?? []).filter((category) => category.parentId === parentOf(targetId)).sort((left, right) => left.order - right.order).map((category) => category.id);
									const targetIndex = siblings.indexOf(targetId);
									const anchor = half === "before" ? targetId : siblings[targetIndex + 1];
									if (anchor === sourceId) return;
									reorderCategory(sourceId, anchor);
								},
								t
							}),
							node.children.map((child) => renderCategory(child, depth + 1)),
							node.sessions.map((session) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SessionNodeItem, {
								node: session,
								currentId: current,
								now,
								onOpen: open,
								onRename: onSessionRename,
								onFork: forkSession,
								onArchive: onSessionArchive,
								onUnarchive: onSessionUnarchive,
								onDelete: onSessionDelete,
								onPin: onSessionPin,
								onUnpin: onSessionUnpin,
								t,
								categoryDepth: depth + 1,
								drag: categoryDragPropsFor(session.id),
								categoryMove: {
									workspaceId,
									categories: categoryChoices,
									onMove: (categoryId) => assignSessions(workspaceId, [session.id], categoryId)
								}
							}, session.id))
						]
					}, node.id);
				};
				const workspaceMarker = workspaceId !== void 0 && workspaceDrag?.over?.id === workspaceId ? workspaceDrag.over.half : null;
				const workspaceDragProps = workspaceId === void 0 ? void 0 : {
					start: () => {
						workspaceDropCommitted.current = false;
						setWorkspaceFolderHover(null);
						setWorkspaceDrag({
							workspaceId,
							over: null
						});
					},
					end: () => {
						setWorkspaceFolderHover(null);
						if (workspaceDrag?.over !== null && workspaceDrag?.over !== void 0) commitWorkspaceDrag(workspaceDrag, workspaceDrag.over);
						else setWorkspaceDrag(null);
						workspaceDropCommitted.current = false;
					}
				};
				const hoverWorkspace = workspaceId === void 0 ? void 0 : (half) => {
					setWorkspaceDrag((active) => active === null ? active : {
						...active,
						over: {
							id: workspaceId,
							half
						}
					});
				};
				const dropWorkspace = workspaceId === void 0 ? void 0 : (half) => {
					if (workspaceDrag === null) return;
					commitWorkspaceDrag(workspaceDrag, {
						id: workspaceId,
						half
					});
				};
				const renderSessionRow = (node) => {
					const sameGroupDrag = drag !== null && drag.accountKey === group.key;
					const archiveRow = group.key === ARCHIVED_KEY;
					const dragProps = {
						start: () => {
							sessionDropCommitted.current = false;
							setDrag({
								accountKey: group.key,
								sessionId: node.id,
								over: null
							});
						},
						active: sameGroupDrag,
						marker: sameGroupDrag && drag.over?.id === node.id ? drag.over.half : null,
						hover: (half) => {
							/* v8 ignore next -- narrowing guard: Rows gates hover on `active`, which is false while the drag state is null. */
							setDrag((d) => d === null ? d : {
								...d,
								over: {
									id: node.id,
									half
								}
							});
						},
						drop: (half) => {
							/* v8 ignore next -- narrowing guard: Rows gates drop on `active`, which is false while the drag state is null. */
							if (drag === null) return;
							commitSessionDrag(drag, {
								id: node.id,
								half
							});
						},
						end: () => {
							if (drag?.over !== null && drag?.over !== void 0) commitSessionDrag(drag, drag.over);
							else setDrag(null);
							sessionDropCommitted.current = false;
						}
					};
					return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SessionNodeItem, {
						node,
						currentId: current,
						now,
						onOpen: open,
						onRename: onSessionRename,
						onFork: forkSession,
						onArchive: onSessionArchive,
						onUnarchive: onSessionUnarchive,
						onDelete: onSessionDelete,
						onPin: onSessionPin,
						onUnpin: onSessionUnpin,
						drag: archiveRow ? void 0 : dragProps,
						categoryMove: workspaceId === void 0 ? void 0 : {
							workspaceId,
							categories: categoryChoices,
							onMove: (categoryId) => assignSessions(workspaceId, [node.id], categoryId)
						},
						t
					}, node.id);
				};
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: clsx(WorkspaceBrowser_module_default.groupSection, workspaceMarker === "before" && WorkspaceBrowser_module_default.workspaceDropBefore, workspaceMarker === "after" && WorkspaceBrowser_module_default.workspaceDropAfter),
					onDragOver: workspaceDrag === null || hoverWorkspace === void 0 ? void 0 : (e) => {
						e.preventDefault();
						e.dataTransfer.dropEffect = "move";
						const targetFolder = folderOfWorkspace(workspaceId);
						if (targetFolder !== folderOfWorkspace(workspaceDrag.workspaceId)) {
							setWorkspaceFolderHover(targetFolder ?? "__unfiled_workspaces__");
							setWorkspaceDrag((active) => active === null ? active : {
								...active,
								over: null
							});
							return;
						}
						setWorkspaceFolderHover(null);
						hoverWorkspace(workspaceGroupHalf(e));
					},
					onDrop: workspaceDrag === null || dropWorkspace === void 0 ? void 0 : (e) => {
						e.preventDefault();
						const targetFolder = folderOfWorkspace(workspaceId);
						if (targetFolder !== folderOfWorkspace(workspaceDrag.workspaceId)) {
							commitWorkspaceDropOnFolder(targetFolder);
							return;
						}
						dropWorkspace(workspaceGroupHalf(e));
					},
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ProjectRowItem, {
							group,
							t,
							isArchiveSection: group.key === ARCHIVED_KEY,
							icon: workspaceId === void 0 ? void 0 : workspaceIcons[workspaceId],
							onPickIcon: workspaceId === void 0 ? void 0 : () => {
								onPickWorkspaceIcon(workspaceId, group.label);
							},
							onToggle: () => {
								if (group.expanded) setExpandedSessionGroups((keys) => keys.filter((key) => key !== group.key));
								setGroupExpanded(group.key, !group.expanded);
							},
							onCreate: () => {
								if (group.workspaceId !== void 0) {
									setGroupExpanded(group.key, true);
									startSession(group.workspaceId);
								}
							},
							drag: workspaceDragProps,
							actions: group.workspaceId === void 0 ? void 0 : {
								rename: () => {
									/* v8 ignore next -- narrowing guard: the actions object exists only for real-workspace groups. */
									if (group.workspaceId !== void 0) onRenameRequest(group.workspaceId, group.label);
								},
								delete: () => {
									/* v8 ignore next -- narrowing guard: the actions object exists only for real-workspace groups. */
									if (group.workspaceId !== void 0) onDeleteRequest(group.workspaceId, group.label);
								},
								createCategory: () => {
									if (group.workspaceId !== void 0) onCreateCategory(group.workspaceId, null);
								},
								setIcon: () => {
									if (workspaceId !== void 0) onPickWorkspaceIcon(workspaceId, group.label);
								},
								archiveAll: workspaceId === void 0 || archiveAllCandidates.length === 0 ? void 0 : () => {
									onArchiveAllRequest({
										workspaceId,
										title: group.label,
										sessionIds: archiveAllCandidates,
										skippedRunning: archiveAllSkippedRunning,
										skippedCurrent: workspaceSessionIds.some((sessionId) => sessionId === current || archivedMainView(sessionId))
									});
								},
								moveToFolder: hasFolderLayer ? {
									folders: folderOptions,
									currentFolderId: workspaceFolderAssignments[group.workspaceId] ?? null,
									onMove: (folderId) => {
										if (folderId !== null) setWorkspaceFolderExpanded(folderId, true);
										assignWorkspaceFolder(group.workspaceId, folderId);
									}
								} : void 0
							}
						}),
						group.expanded && categoryProjection?.pinnedSessions.map((node) => renderSessionRow(node)),
						group.expanded && categoryProjection?.categories.map((node) => renderCategory(node, 0)),
						visibleSessionRows.map((node) => renderSessionRow(node)),
						projectedRows.length > COLLAPSED_SESSION_LIMIT && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: WorkspaceBrowser_module_default.sessionOverflowButton,
							"aria-expanded": rowsExpanded,
							onClick: () => {
								setExpandedSessionGroups((keys) => toggled(keys, group.key));
							},
							children: rowsExpanded ? t("sessions.collapse") : t("sessions.expand", { n: projectedRows.length - COLLAPSED_SESSION_LIMIT })
						}),
						group.expanded && childKeys.has(group.key) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							role: "group",
							className: WorkspaceBrowser_module_default.workspaceChildGroup,
							children: renderGroupList(group.key)
						})
					]
				}, group.key);
			};
			/**
			* The sections owned by `parentKey`, in derivation order.
			*
			* @param parentKey - owning group key, or undefined for the top level.
			* @returns the section elements.
			*/
			const renderGroupList = (parentKey) => groups.filter((group) => group.parentKey === parentKey).map((group) => renderGroup(group));
			/**
			* Render one display folder: the heading row plus, while expanded, its child
			* folders and the Workspace sections filed directly into it.
			*
			* @param node - projected folder node.
			* @returns the folder element.
			*/
			const renderFolderNode = (node) => {
				const memberGroups = groupsInFolder(node.id);
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: WorkspaceBrowser_module_default.workspaceFolderGroup,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(WorkspaceFolderRow, {
						node,
						workspaceCount: folderWorkspaceCount(node),
						containsCurrent: folderContainsCurrent(node),
						folderDragActive: folderDragId !== null,
						workspaceDragActive: workspaceDrag !== null,
						icon: workspaceFolderIcons[node.id],
						onPickIcon: () => {
							onPickWorkspaceFolderIcon(node.id, node.title);
						},
						workspaceHovered: workspaceFolderHover === node.id,
						moveTargets: folderMoveTargets(node.id),
						onToggle: () => {
							setWorkspaceFolderExpanded(node.id, !node.expanded);
						},
						onRename: renameWorkspaceFolder,
						onDelete: deleteWorkspaceFolder,
						onCreateChild: onCreateWorkspaceFolder,
						onMove: moveWorkspaceFolder,
						onFolderDrop: commitFolderDrop,
						onWorkspaceDrop: () => {
							commitWorkspaceDropOnFolder(node.id);
						},
						onDragStart: () => {
							setFolderDragId(node.id);
						},
						onDragEnd: () => {
							setFolderDragId(null);
						},
						t
					}), node.expanded && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						role: "group",
						className: clsx(WorkspaceBrowser_module_default.workspaceChildGroup, workspaceFolderHover === node.id && WorkspaceBrowser_module_default.workspaceFolderContentsDrop),
						onDragOver: workspaceDrag === null ? void 0 : (event) => {
							if (event.defaultPrevented) return;
							event.preventDefault();
							event.dataTransfer.dropEffect = "move";
							setWorkspaceFolderHover(node.id);
						},
						onDragLeave: workspaceDrag === null ? void 0 : (event) => {
							if (event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)) return;
							setWorkspaceFolderHover((current) => current === node.id ? null : current);
						},
						onDrop: workspaceDrag === null ? void 0 : (event) => {
							if (event.defaultPrevented) return;
							event.preventDefault();
							commitWorkspaceDropOnFolder(node.id);
						},
						children: [node.children.map((child) => renderFolderNode(child)), memberGroups.map((group) => renderGroup(group))]
					})]
				}, node.id);
			};
			/**
			* Render the synthetic "Unfiled" bucket that owns every root Workspace no
			* display folder claims. It only appears once a folder layer exists, so an
			* untouched list keeps the native shape.
			*
			* @returns the bucket element.
			*/
			const renderUnfiledFolder = () => {
				const node = {
					id: UNFILED_WORKSPACE_FOLDER_KEY,
					title: t("folder.unfiled"),
					parentId: null,
					depth: 0,
					expanded: unfiledExpanded,
					children: []
				};
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: WorkspaceBrowser_module_default.workspaceFolderGroup,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(WorkspaceFolderRow, {
						node,
						unfiled: true,
						workspaceCount: unfiledGroups.length,
						containsCurrent: unfiledGroups.some((group) => group.containsCurrent),
						folderDragActive: folderDragId !== null,
						workspaceDragActive: workspaceDrag !== null,
						workspaceHovered: workspaceFolderHover === UNFILED_WORKSPACE_FOLDER_KEY,
						onToggle: () => {
							setWorkspaceFolderExpanded(UNFILED_WORKSPACE_FOLDER_KEY, !unfiledExpanded);
						},
						onFolderDrop: (sourceId) => {
							commitFolderDrop(sourceId, UNFILED_WORKSPACE_FOLDER_KEY, "inside");
						},
						onWorkspaceDrop: () => {
							commitWorkspaceDropOnFolder(null);
						},
						t
					}), unfiledExpanded && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						role: "group",
						className: clsx(WorkspaceBrowser_module_default.workspaceChildGroup, workspaceFolderHover === "__unfiled_workspaces__" && WorkspaceBrowser_module_default.workspaceFolderContentsDrop),
						onDragOver: workspaceDrag === null ? void 0 : (event) => {
							if (event.defaultPrevented) return;
							event.preventDefault();
							event.dataTransfer.dropEffect = "move";
							setWorkspaceFolderHover("__unfiled_workspaces__");
						},
						onDragLeave: workspaceDrag === null ? void 0 : (event) => {
							if (event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)) return;
							setWorkspaceFolderHover((current) => current === "__unfiled_workspaces__" ? null : current);
						},
						onDrop: workspaceDrag === null ? void 0 : (event) => {
							if (event.defaultPrevented) return;
							event.preventDefault();
							commitWorkspaceDropOnFolder(null);
						},
						children: unfiledGroups.map((group) => renderGroup(group))
					})]
				}, UNFILED_WORKSPACE_FOLDER_KEY);
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: clsx(WorkspaceBrowser_module_default.treeBody, WorkspaceBrowser_module_default.wide),
				children: [
					workspaceDropAtListStart && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: WorkspaceBrowser_module_default.listTopDropIndicator,
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: clsx(WorkspaceBrowser_module_default.list, workspaceDropAtListStart && WorkspaceBrowser_module_default.listTopDropActive),
						role: "tree",
						"aria-label": t("section.sessions"),
						children: [
							groups.length === 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: WorkspaceBrowser_module_default.empty,
								children: archivedFilter === "only" ? t("empty.onlyArchived") : t("empty.none")
							}),
							hasFolderLayer ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
								folderForest.roots.map((node) => renderFolderNode(node)),
								unfiledGroups.length > 0 && renderUnfiledFolder(),
								archiveGroup !== void 0 && renderGroup(archiveGroup)
							] }) : renderGroupList(void 0),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								className: WorkspaceBrowser_module_default.workspaceFolderCreateRow,
								onClick: () => {
									onCreateWorkspaceFolder(null);
								},
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: WorkspaceBrowser_module_default.workspaceFolderCreateGlyph,
									"aria-hidden": "true",
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconPlusOutlineRegular, { size: 14 })
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("folder.create") })]
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: WorkspaceBrowser_module_default.fade })
				]
			});
		}
		/**
		* Turn a recycle failure into a sentence the user can act on.
		*
		* The Host reports stable codes rather than prose so the dictionary stays the
		* client's business. Anything unrecognized falls back to the raw message: an
		* opaque error is still better than a dialog that says nothing.
		*/
		function sessionDeleteFailureMessage(reason, t) {
			const raw = reason instanceof Error ? reason.message : String(reason);
			if (raw.includes("session-log-not-found")) return t("delete.session.missingLog");
			if (raw.includes("disposed")) return t("delete.session.disposed");
			return raw;
		}
		/** The flat "In one list" body: every session is one draggable top-level row. */ function FlatList({ useSessions, open, forkSession, onSessionRename, onSessionArchive, onSessionUnarchive, onSessionDelete, onSessionPin, onSessionUnpin, archivedSessionIds, pinnedSessionIds, archivedSessionIdsRaw, archivedFilter, orderBy, sessionOrderByAccount, sessionUpdatedAtByAccount, syncSessionOrderAccount, setSessionOrder, t }) {
			const list = useSessions((s) => s);
			const baseRows = (0, react.useMemo)(() => deriveFlat(list, archivedSessionIds, pinnedSessionIds, archivedSessionIdsRaw, archivedFilter), [
				list,
				archivedSessionIds,
				pinnedSessionIds,
				archivedSessionIdsRaw,
				archivedFilter
			]);
			const sessionIds = (0, react.useMemo)(() => baseRows.map((row) => row.id), [baseRows]);
			const previousOrderBy = (0, react.useRef)(orderBy);
			(0, react.useEffect)(() => {
				if (list.phase !== "ready") return;
				const previousOrder = sessionOrderByAccount[FLAT_SESSION_ORDER_KEY];
				const previousUpdatedAt = sessionUpdatedAtByAccount["__flat_session_order__"] ?? {};
				const switchedToUpdated = previousOrderBy.current !== "updated" && orderBy === "updated";
				previousOrderBy.current = orderBy;
				const next = nextSessionOrderAccount({
					sessionIds,
					previousOrder,
					previousUpdatedAt,
					list,
					orderBy,
					sortByRecency: orderBy === "updated" && (previousOrder === void 0 || switchedToUpdated)
				});
				if (next.changed) syncSessionOrderAccount(FLAT_SESSION_ORDER_KEY, next.order.map((id) => id), next.updatedAt);
			}, [
				list,
				orderBy,
				sessionOrderByAccount,
				sessionUpdatedAtByAccount,
				sessionIds,
				syncSessionOrderAccount
			]);
			const rows = (0, react.useMemo)(() => {
				const byId = new Map(baseRows.map((row) => [row.id, row]));
				return reconciledSessionOrder(sessionIds, sessionOrderByAccount[FLAT_SESSION_ORDER_KEY]).flatMap((id) => {
					const row = byId.get(id);
					return row === void 0 ? [] : [row];
				});
			}, [
				baseRows,
				sessionOrderByAccount,
				sessionIds
			]);
			const [drag, setDrag] = (0, react.useState)(null);
			const dropCommitted = (0, react.useRef)(false);
			useNativeDragAcceptance(drag !== null);
			const commitDrag = (activeDrag, over) => {
				if (dropCommitted.current) return;
				dropCommitted.current = true;
				setDrag(null);
				const targetIndex = rows.findIndex((row) => row.id === over.id);
				if (targetIndex === -1) return;
				const anchor = over.half === "before" ? over.id : rows[targetIndex + 1]?.id;
				if (anchor === activeDrag.sessionId) return;
				const sourceIndex = rows.findIndex((row) => row.id === activeDrag.sessionId);
				const anchorIndex = anchor === void 0 ? rows.length : rows.findIndex((row) => row.id === anchor);
				if (sourceIndex !== -1 && (anchorIndex === sourceIndex || anchorIndex === sourceIndex + 1)) return;
				const nextOrder = rows.map((row) => row.id).filter((id) => id !== activeDrag.sessionId);
				const insertAt = anchor === void 0 ? nextOrder.length : nextOrder.indexOf(anchor);
				nextOrder.splice(insertAt === -1 ? nextOrder.length : insertAt, 0, activeDrag.sessionId);
				setSessionOrder(FLAT_SESSION_ORDER_KEY, nextOrder.map((id) => id));
			};
			const now = Date.now();
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: clsx(WorkspaceBrowser_module_default.treeBody, WorkspaceBrowser_module_default.wide),
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: clsx(WorkspaceBrowser_module_default.list, WorkspaceBrowser_module_default.flatList),
					role: "tree",
					"aria-label": t("section.sessions"),
					children: [rows.length === 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: WorkspaceBrowser_module_default.empty,
						children: t("empty.none")
					}), rows.map((node) => {
						const active = drag !== null;
						return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SessionNodeItem, {
							node,
							currentId: currentSessionId(list),
							now,
							onOpen: open,
							onRename: onSessionRename,
							onFork: forkSession,
							onArchive: onSessionArchive,
							onUnarchive: onSessionUnarchive,
							onDelete: onSessionDelete,
							onPin: onSessionPin,
							onUnpin: onSessionUnpin,
							flat: true,
							drag: {
								start: () => {
									dropCommitted.current = false;
									setDrag({
										accountKey: FLAT_SESSION_ORDER_KEY,
										sessionId: node.id,
										over: null
									});
								},
								active,
								marker: active && drag.over?.id === node.id ? drag.over.half : null,
								hover: (half) => {
									setDrag((current) => current === null ? current : {
										...current,
										over: {
											id: node.id,
											half
										}
									});
								},
								drop: (half) => {
									if (drag !== null) commitDrag(drag, {
										id: node.id,
										half
									});
								},
								end: () => {
									if (drag?.over !== null && drag?.over !== void 0) commitDrag(drag, drag.over);
									else setDrag(null);
									dropCommitted.current = false;
								}
							},
							t
						}, node.id);
					})]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: WorkspaceBrowser_module_default.fade })]
			});
		}
		/** Flat search body: local metadata matches plus the current Host result page. */
		function SearchResults({ useSessions, open, workspaces, archivedSessionIds, query, remote, resultLimit, t }) {
			const list = useSessions((s) => s);
			const currentRemote = remote.query === query ? remote : {
				query,
				status: "loading",
				items: [],
				hasMore: false
			};
			const results = (0, react.useMemo)(() => deriveSearchResults(list, workspaces, query, archivedSessionIds, currentRemote, resultLimit), [
				list,
				workspaces,
				query,
				archivedSessionIds,
				currentRemote,
				resultLimit
			]);
			const pending = currentRemote.status === "loading";
			const failed = currentRemote.status === "error";
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: clsx(WorkspaceBrowser_module_default.treeBody, WorkspaceBrowser_module_default.wide),
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: WorkspaceBrowser_module_default.list,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: WorkspaceBrowser_module_default.searchTree,
							role: "tree",
							"aria-label": t("search.results.aria"),
							children: results.items.map((result) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SearchResultItem, {
								result,
								currentId: currentSessionId(list),
								onOpen: open,
								t
							}, result.id))
						}),
						pending && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: WorkspaceBrowser_module_default.searchStatus,
							role: "status",
							children: t("search.pending")
						}),
						failed && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: WorkspaceBrowser_module_default.searchWarning,
							role: "status",
							children: t("search.unavailable")
						}),
						!pending && results.items.length === 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: WorkspaceBrowser_module_default.empty,
							children: t("search.noMatches")
						}),
						results.hasMore && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: WorkspaceBrowser_module_default.searchStatus,
							children: t("search.hasMore", { n: resultLimit })
						})
					]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: WorkspaceBrowser_module_default.fade })]
			});
		}
		/**
		* Render the browsing region.
		* @param props - composed slot props (shell owner share + store + injected actions).
		* @returns the region element tree.
		*/
		function WorkspaceBrowser({ wide, expandSidebar, useSessions, useWorkspaces, useStore, actions, startSession, open, renameSession, forkSession, renameWorkspace, deleteWorkspace, insertWorkspaceBefore, archiveSession, unarchiveSession, pinSession, unpinSession, deleteSession, scanSession, undoDeleteSession, insertSessionBefore, createWorkspace, useCategories, ensureCategories, createCategory, renameCategory, moveCategory, reorderCategory, assignSessions, deleteCategory, searchSessions, searchResultLimit, pickDirectory, t }) {
			const workspaces = useWorkspaces((state) => state.items);
			const workspacePhase = useWorkspaces((state) => state.phase);
			const archivedSessionIdsRaw = useWorkspaces((state) => state.archivedSessionIds);
			const pinnedSessionIds = useWorkspaces((state) => state.pinnedSessionIds ?? []);
			const categoryView = useCategories((state) => state);
			const groupBy = useStore((s) => s.groupBy);
			const orderBy = useStore((s) => s.orderBy);
			const hoistPinned = useStore((s) => s.hoistPinned ?? true);
			const archivedFilter = useStore((s) => s.archivedFilter ?? "default");
			const archivedSessionIds = archivedSessionIdsRaw;
			const groupExpansion = useStore((s) => s.groupExpansion);
			const categoryExpansion = useStore((s) => s.categoryExpansion);
			const sessionOrderByAccount = useStore((s) => s.sessionOrderByAccount);
			const sessionUpdatedAtByAccount = useStore((s) => s.sessionUpdatedAtByAccount);
			const workspaceFolders = useStore((s) => s.workspaceFolders ?? []);
			const workspaceFolderAssignments = useStore((s) => s.workspaceFolderAssignments ?? {});
			const workspaceFolderExpansion = useStore((s) => s.workspaceFolderExpansion ?? {});
			const workspaceIcons = useStore((s) => s.workspaceIcons ?? {});
			const workspaceFolderIcons = useStore((s) => s.workspaceFolderIcons ?? {});
			(0, react.useEffect)(() => {
				if (workspacePhase !== "ready") return;
				actions.retainAccountKeys([
					"",
					FLAT_SESSION_ORDER_KEY,
					...workspaces.map((workspace) => workspace.workspaceId)
				]);
				const workspaceIds = workspaces.map((workspace) => workspace.workspaceId);
				actions.pruneWorkspaceFolderAssignments(workspaceIds);
				actions.pruneWorkspaceIcons(workspaceIds);
			}, [
				actions.pruneWorkspaceFolderAssignments,
				actions.pruneWorkspaceIcons,
				actions.retainAccountKeys,
				workspacePhase,
				workspaces
			]);
			(0, react.useEffect)(() => {
				for (const workspace of workspaces) ensureCategories(workspace.workspaceId);
			}, [ensureCategories, workspaces]);
			const [query, setQuery] = (0, react.useState)("");
			const [searchExpanded, setSearchExpanded] = (0, react.useState)(false);
			const normalizedQuery = sanitizeSearchQuery(query).trim();
			const [remoteSearch, setRemoteSearch] = (0, react.useState)({
				query: "",
				status: "idle",
				items: [],
				hasMore: false
			});
			const searchRoot = (0, react.useRef)(null);
			const searchInput = (0, react.useRef)(null);
			const [wsPickerOpen, setWsPickerOpen] = (0, react.useState)(false);
			const wsPlusRef = (0, react.useRef)(null);
			const composingRef = (0, react.useRef)(false);
			const [searchOnExpand, setSearchOnExpand] = (0, react.useState)(false);
			(0, react.useEffect)(() => {
				if (wide && searchOnExpand) {
					const timer = window.setTimeout(() => {
						searchInput.current?.focus({ preventScroll: true });
						setSearchOnExpand(false);
					}, EXPAND_SLIDE_MS);
					return () => {
						window.clearTimeout(timer);
					};
				}
			}, [wide, searchOnExpand]);
			(0, react.useEffect)(() => {
				if (!wide || !searchExpanded || searchOnExpand) return;
				searchInput.current?.focus({ preventScroll: true });
			}, [
				wide,
				searchExpanded,
				searchOnExpand
			]);
			(0, react.useEffect)(() => {
				if (!wide || !searchExpanded) return;
				const onClick = (event) => {
					if (!(event.target instanceof Node) || searchRoot.current?.contains(event.target) === true) return;
					searchInput.current?.blur();
					if (normalizedQuery !== "") return;
					setSearchExpanded(false);
				};
				document.addEventListener("click", onClick);
				return () => {
					document.removeEventListener("click", onClick);
				};
			}, [
				normalizedQuery,
				wide,
				searchExpanded
			]);
			(0, react.useEffect)(() => {
				if (normalizedQuery === "") {
					setRemoteSearch({
						query: "",
						status: "idle",
						items: [],
						hasMore: false
					});
					return;
				}
				const controller = new AbortController();
				setRemoteSearch({
					query: normalizedQuery,
					status: "loading",
					items: [],
					hasMore: false
				});
				const timer = window.setTimeout(() => {
					searchSessions(normalizedQuery, controller.signal).then((result) => {
						if (controller.signal.aborted) return;
						setRemoteSearch({
							query: normalizedQuery,
							status: "ready",
							items: result.items,
							hasMore: result.hasMore
						});
					}).catch(() => {
						if (controller.signal.aborted) return;
						setRemoteSearch({
							query: normalizedQuery,
							status: "error",
							items: [],
							hasMore: false
						});
					});
				}, SEARCH_DEBOUNCE_MS);
				return () => {
					window.clearTimeout(timer);
					controller.abort();
				};
			}, [normalizedQuery, searchSessions]);
			const [renameTarget, setRenameTarget] = (0, react.useState)(null);
			const [renameDraft, setRenameDraft] = (0, react.useState)("");
			const [renaming, setRenaming] = (0, react.useState)(false);
			const [renameError, setRenameError] = (0, react.useState)(null);
			const renameTrimmed = renameDraft.trim();
			const renameDuplicate = renameTarget !== null && renameTrimmed !== "" && renameTrimmed !== renameTarget.currentTitle && workspaces.some((w) => w.title === renameTrimmed);
			const renameBlocked = renaming || renameTrimmed === "" || renameTarget === null || renameTrimmed === renameTarget.currentTitle || renameDuplicate;
			const closeRename = () => {
				if (renaming) return;
				setRenameTarget(null);
				setRenameError(null);
			};
			const confirmRename = () => {
				if (renameBlocked) return;
				setRenaming(true);
				setRenameError(null);
				renameWorkspace(renameTarget.workspaceId, renameTrimmed).then(() => {
					setRenaming(false);
					setRenameTarget(null);
				}).catch((reason) => {
					setRenaming(false);
					setRenameError(reason instanceof Error ? reason.message : String(reason));
				});
			};
			const [sessionRenameTarget, setSessionRenameTarget] = (0, react.useState)(null);
			const [sessionRenameDraft, setSessionRenameDraft] = (0, react.useState)("");
			const [sessionRenaming, setSessionRenaming] = (0, react.useState)(false);
			const [sessionRenameError, setSessionRenameError] = (0, react.useState)(null);
			const sessionRenameTrimmed = sessionRenameDraft.trim();
			const sessionRenameBlocked = sessionRenaming || sessionRenameTrimmed === "" || sessionRenameTarget === null;
			const closeSessionRename = () => {
				if (sessionRenaming) return;
				setSessionRenameTarget(null);
				setSessionRenameError(null);
			};
			const confirmSessionRename = () => {
				if (sessionRenameBlocked) return;
				setSessionRenaming(true);
				setSessionRenameError(null);
				renameSession(sessionRenameTarget.sessionId, sessionRenameTrimmed).then(() => {
					setSessionRenaming(false);
					setSessionRenameTarget(null);
				}).catch((reason) => {
					setSessionRenaming(false);
					setSessionRenameError(reason instanceof Error ? reason.message : String(reason));
				});
			};
			const onSessionRename = (sessionId, currentTitle) => {
				setSessionRenameTarget({
					sessionId,
					currentTitle
				});
				setSessionRenameDraft(currentTitle);
				setSessionRenameError(null);
			};
			const onSessionArchive = (sessionId) => {
				archiveSession(sessionId).catch((reason) => {
					console.warn("session archive rejected:", reason);
				});
			};
			const onSessionUnarchive = (sessionId) => {
				unarchiveSession(sessionId).catch((reason) => {
					console.warn("session unarchive rejected:", reason);
				});
			};
			const onSessionPin = (sessionId) => {
				pinSession(sessionId).catch((reason) => {
					console.warn("session pin rejected:", reason);
				});
			};
			const onSessionUnpin = (sessionId) => {
				unpinSession(sessionId).catch((reason) => {
					console.warn("session unpin rejected:", reason);
				});
			};
			const [sessionDeleteTarget, setSessionDeleteTarget] = (0, react.useState)(null);
			const [sessionDeleting, setSessionDeleting] = (0, react.useState)(false);
			const [sessionDeleteError, setSessionDeleteError] = (0, react.useState)(null);
			const [sessionDeleteDone, setSessionDeleteDone] = (0, react.useState)(null);
			const closeSessionDelete = () => {
				if (sessionDeleting) return;
				setSessionDeleteTarget(null);
				setSessionDeleteError(null);
			};
			const confirmSessionDelete = () => {
				if (sessionDeleteTarget === null || sessionDeleting) return;
				setSessionDeleting(true);
				setSessionDeleteError(null);
				deleteSession(sessionDeleteTarget.sessionId, sessionScope).then((outcome) => {
					setSessionDeleting(false);
					setSessionDeleteTarget(null);
					setSessionDeleteDone({
						batchId: outcome.batchId,
						count: 1,
						artifactCount: outcome.artifactCount
					});
				}).catch((reason) => {
					setSessionDeleting(false);
					setSessionDeleteError(sessionDeleteFailureMessage(reason, t));
				});
			};
			const onSessionDelete = (sessionId, currentTitle) => {
				setSessionDeleteTarget({
					sessionId,
					title: currentTitle
				});
				setSessionDeleteError(null);
			};
			const [sessionScan, setSessionScan] = (0, react.useState)(null);
			const [sessionScanState, setSessionScanState] = (0, react.useState)("pending");
			const [sessionScope, setSessionScope] = (0, react.useState)("record");
			const deleteTargetId = sessionDeleteTarget?.sessionId ?? null;
			(0, react.useEffect)(() => {
				if (deleteTargetId === null) {
					setSessionScan(null);
					setSessionScanState("pending");
					setSessionScope("record");
					return;
				}
				let cancelled = false;
				setSessionScanState("pending");
				scanSession(deleteTargetId).then((outcome) => {
					if (cancelled) return;
					setSessionScan(outcome);
					setSessionScanState("done");
				}).catch(() => {
					if (cancelled) return;
					setSessionScan(null);
					setSessionScanState("failed");
				});
				return () => {
					cancelled = true;
				};
			}, [deleteTargetId]);
			const [sessionUndoError, setSessionUndoError] = (0, react.useState)(null);
			const [sessionUndoNotice, setSessionUndoNotice] = (0, react.useState)(null);
			const onUndoDelete = async () => {
				setSessionUndoError(null);
				setSessionUndoNotice(null);
				try {
					const outcome = await undoDeleteSession();
					setSessionDeleteDone(null);
					if (outcome.failed.length === 0) setSessionUndoNotice(t("delete.session.undoDone", { n: outcome.restored.length }));
					else setSessionUndoError(t("delete.session.undoPartial", {
						n: outcome.restored.length,
						failed: outcome.failed.length
					}));
				} catch (reason) {
					setSessionUndoError(sessionDeleteFailureMessage(reason, t));
				}
			};
			const [archiveAllTarget, setArchiveAllTarget] = (0, react.useState)(null);
			const [archiveAllBusy, setArchiveAllBusy] = (0, react.useState)(false);
			const [archiveAllError, setArchiveAllError] = (0, react.useState)(null);
			const requestArchiveAll = (target) => {
				setWsPickerOpen(false);
				setArchiveAllTarget(target);
				setArchiveAllError(null);
			};
			const closeArchiveAll = () => {
				if (archiveAllBusy) return;
				setArchiveAllTarget(null);
				setArchiveAllError(null);
			};
			const confirmArchiveAll = async () => {
				const target = archiveAllTarget;
				if (target === null || archiveAllBusy || target.sessionIds.length === 0) return;
				setArchiveAllBusy(true);
				setArchiveAllError(null);
				const results = await Promise.allSettled(target.sessionIds.map((sessionId) => archiveSession(sessionId)));
				const failed = target.sessionIds.filter((_, index) => results[index]?.status === "rejected");
				setArchiveAllBusy(false);
				if (failed.length === 0) {
					setArchiveAllTarget(null);
					return;
				}
				setArchiveAllTarget({
					...target,
					sessionIds: failed,
					skippedRunning: 0
				});
				setArchiveAllError(t("archiveAll.partial", {
					failed: failed.length,
					total: target.sessionIds.length
				}));
			};
			const [iconPicker, setIconPicker] = (0, react.useState)(null);
			const requestWorkspaceIcon = (workspaceId, title) => {
				setWsPickerOpen(false);
				setIconPicker({
					kind: "workspace",
					workspaceId,
					title
				});
			};
			const requestWorkspaceFolderIcon = (folderId, title) => {
				setIconPicker({
					kind: "folder",
					folderId,
					title
				});
			};
			const currentPickerIcon = iconPicker === null ? void 0 : iconPicker.kind === "workspace" ? workspaceIcons[iconPicker.workspaceId] : workspaceFolderIcons[iconPicker.folderId];
			const commitPickerIcon = (icon) => {
				if (iconPicker === null) return;
				if (iconPicker.kind === "workspace") actions.setWorkspaceIcon(iconPicker.workspaceId, icon);
				else actions.setWorkspaceFolderIcon(iconPicker.folderId, icon);
				setIconPicker(null);
			};
			const [folderCreateTarget, setFolderCreateTarget] = (0, react.useState)(null);
			const [folderDraft, setFolderDraft] = (0, react.useState)("");
			const requestWorkspaceFolderCreate = (parentId) => {
				setWsPickerOpen(false);
				setFolderCreateTarget({ parentId });
				setFolderDraft("");
			};
			const confirmWorkspaceFolderCreate = () => {
				const title = folderDraft.trim();
				if (folderCreateTarget === null || title === "") return;
				const parentId = folderCreateTarget.parentId;
				const order = workspaceFolders.filter((folder) => folder.parentId === parentId).reduce((next, folder) => Math.max(next, folder.order + 1), 0);
				actions.createWorkspaceFolder({
					id: globalThis.crypto.randomUUID(),
					parentId,
					title,
					order
				});
				if (parentId !== null) actions.setWorkspaceFolderExpanded(parentId, true);
				setFolderCreateTarget(null);
			};
			const [categoryCreateTarget, setCategoryCreateTarget] = (0, react.useState)(null);
			const [categoryDraft, setCategoryDraft] = (0, react.useState)("");
			const [categoryBusy, setCategoryBusy] = (0, react.useState)(false);
			const [categoryError, setCategoryError] = (0, react.useState)(null);
			const requestCategoryCreate = (workspaceId, parentId) => {
				setCategoryCreateTarget({
					workspaceId,
					parentId
				});
				setCategoryDraft("");
				setCategoryError(null);
			};
			const confirmCategoryCreate = () => {
				const title = categoryDraft.trim();
				if (categoryCreateTarget === null || categoryBusy || title === "") return;
				setCategoryBusy(true);
				createCategory(categoryCreateTarget.workspaceId, categoryCreateTarget.parentId, title).then((result) => {
					setCategoryBusy(false);
					if (result.ok) setCategoryCreateTarget(null);
					else setCategoryError("message" in result.error ? result.error.message : result.error.code);
				});
			};
			const [categoryDeleteTarget, setCategoryDeleteTarget] = (0, react.useState)(null);
			const [categoryDeleting, setCategoryDeleting] = (0, react.useState)(false);
			const [categoryDeleteError, setCategoryDeleteError] = (0, react.useState)(null);
			const requestCategoryDelete = (categoryId, title, descendantCount, sessionCount, runningCount) => {
				setCategoryDeleteTarget({
					categoryId,
					title,
					descendantCount,
					sessionCount,
					runningCount,
					operationId: globalThis.crypto.randomUUID()
				});
				setCategoryDeleteError(null);
			};
			const closeCategoryDelete = () => {
				if (categoryDeleting) return;
				setCategoryDeleteTarget(null);
				setCategoryDeleteError(null);
			};
			const confirmCategoryDelete = () => {
				if (categoryDeleting || categoryDeleteTarget === null) return;
				setCategoryDeleting(true);
				setCategoryDeleteError(null);
				deleteCategory(categoryDeleteTarget.categoryId, categoryDeleteTarget.operationId).then((result) => {
					setCategoryDeleting(false);
					if (result.ok) setCategoryDeleteTarget(null);
					else setCategoryDeleteError("message" in result.error ? result.error.message : result.error.code);
				});
			};
			const [deleteTarget, setDeleteTarget] = (0, react.useState)(null);
			const [deleting, setDeleting] = (0, react.useState)(false);
			const [deleteCommittedId, setDeleteCommittedId] = (0, react.useState)(null);
			const [deleteError, setDeleteError] = (0, react.useState)(null);
			(0, react.useEffect)(() => {
				if (deleteCommittedId === null || workspaces.some((workspace) => workspace.workspaceId === deleteCommittedId)) return;
				setDeleting(false);
				setDeleteCommittedId(null);
				setDeleteTarget(null);
			}, [deleteCommittedId, workspaces]);
			const closeDelete = () => {
				if (deleting) return;
				setDeleteTarget(null);
				setDeleteError(null);
			};
			const confirmDelete = () => {
				/* v8 ignore next -- the Modal is absent without a target and its button is disabled while deleting. */
				if (deleting || deleteTarget === null) return;
				setDeleting(true);
				setDeleteCommittedId(null);
				setDeleteError(null);
				deleteWorkspace(deleteTarget.workspaceId).then(() => {
					setDeleteCommittedId(deleteTarget.workspaceId);
				}).catch((reason) => {
					setDeleting(false);
					setDeleteError(reason instanceof Error ? reason.message : String(reason));
				});
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: clsx(WorkspaceBrowser_module_default.root, !wide && WorkspaceBrowser_module_default.rail),
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: WorkspaceBrowser_module_default.sectionHeader,
						children: [
							wide && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: clsx(WorkspaceBrowser_module_default.sectionLabel, WorkspaceBrowser_module_default.wide, searchExpanded && WorkspaceBrowser_module_default.sectionLabelHidden),
								children: groupBy === "flat" ? t("section.sessions") : t("section.workspaces")
							}),
							wide && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: clsx(WorkspaceBrowser_module_default.searchSlot, searchExpanded && WorkspaceBrowser_module_default.searchSlotExpanded),
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									ref: searchRoot,
									className: clsx(WorkspaceBrowser_module_default.search, searchExpanded && WorkspaceBrowser_module_default.searchExpanded),
									onClick: () => {
										setWsPickerOpen(false);
										setSearchExpanded(true);
										searchInput.current?.focus();
									},
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tooltip, {
											label: t("search"),
											side: "bottom",
											delayMs: 500,
											disabled: searchExpanded,
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: WorkspaceBrowser_module_default.searchButton,
												"aria-label": t("search.sessions.aria"),
												"aria-expanded": searchExpanded,
												onClick: () => {
													setWsPickerOpen(false);
													setSearchExpanded(true);
												},
												children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconSearchOutlineRegular, { size: searchExpanded ? 11 : 14 })
											})
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											ref: searchInput,
											className: WorkspaceBrowser_module_default.searchInput,
											type: "text",
											placeholder: t("search.placeholder"),
											maxLength: SEARCH_QUERY_MAX_CODE_UNITS,
											value: query,
											tabIndex: searchExpanded ? 0 : -1,
											onChange: (e) => {
												setQuery(sanitizeSearchQuery(e.target.value));
											},
											onKeyDown: (e) => {
												if (e.key !== "Escape") return;
												setQuery("");
												setSearchExpanded(false);
											}
										}),
										searchExpanded && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											className: WorkspaceBrowser_module_default.clearButton,
											"aria-label": t("search.clear"),
											onClick: (e) => {
												e.stopPropagation();
												setQuery("");
												setSearchExpanded(false);
											},
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCloseFillRegular, {})
										})
									]
								})
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: clsx(WorkspaceBrowser_module_default.headerActions, wide && searchExpanded && WorkspaceBrowser_module_default.headerActionsHidden),
								children: [wide && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ViewOptionsMenu, {
									groupBy,
									orderBy,
									archivedFilter,
									hoistPinned,
									onGroupPick: (mode) => {
										actions.setGroupBy(mode);
									},
									onOrderPick: (mode) => {
										actions.setOrderBy(mode);
									},
									onArchivedFilterPick: (filter) => {
										actions.setArchivedFilter(filter);
									},
									onHoistPinnedPick: (hoist) => {
										actions.setHoistPinned(hoist);
									},
									onCreateFolder: () => {
										requestWorkspaceFolderCreate(null);
									},
									t
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tooltip, {
									label: t("workspace.add"),
									side: "bottom",
									delayMs: 500,
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										ref: wsPlusRef,
										type: "button",
										className: WorkspaceBrowser_module_default.iconButton,
										"aria-label": t("workspace.add"),
										onClick: () => {
											setWsPickerOpen((v) => !v);
										},
										children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconProjectAddOutlineRegular, { size: wide ? 16 : 18 })
									})
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(WorkspacePickFlow, {
								t,
								open: wsPickerOpen,
								anchorRef: wsPlusRef,
								useWorkspaces,
								createWorkspace,
								useDirectoryFlow: DIRECT_DIRECTORY_FLOW_AVAILABLE,
								renderDirectoryFlow: (owner) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DirectDirectoryFlow, {
									...owner,
									pick: pickDirectory
								}),
								addOnly: true,
								side: "right",
								onPick: (workspaceId) => {
									setWsPickerOpen(false);
									startSession(workspaceId);
								},
								onClose: () => {
									setWsPickerOpen(false);
								}
							})
						]
					}),
					!wide && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: WorkspaceBrowser_module_default.search,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tooltip, {
							label: t("search"),
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: WorkspaceBrowser_module_default.searchButton,
								"aria-label": t("search.sessions.aria"),
								onClick: () => {
									setSearchExpanded(true);
									setSearchOnExpand(true);
									expandSidebar();
								},
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconSearchOutlineRegular, { size: 18 })
							})
						})
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: WorkspaceBrowser_module_default.listArea,
						children: [
							wide && normalizedQuery === "" && groupBy === "workspace" && categoryView.status === "loading" && Object.keys(categoryView.snapshots).length === 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: WorkspaceBrowser_module_default.categoryStatus,
								role: "status",
								children: t("category.loading")
							}),
							wide && normalizedQuery === "" && groupBy === "workspace" && categoryView.status === "error" && Object.keys(categoryView.snapshots).length === 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: WorkspaceBrowser_module_default.categoryStatus,
								role: "status",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("category.loadError") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									variant: "outline",
									onClick: () => {
										for (const workspace of workspaces) ensureCategories(workspace.workspaceId);
									},
									children: t("category.retry")
								})]
							}),
							wide && (normalizedQuery !== "" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SearchResults, {
								useSessions,
								open,
								workspaces,
								archivedSessionIds,
								query: normalizedQuery,
								remote: remoteSearch,
								resultLimit: searchResultLimit,
								t
							}) : groupBy === "flat" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FlatList, {
								useSessions,
								open,
								forkSession,
								onSessionRename,
								onSessionArchive,
								onSessionUnarchive,
								onSessionDelete,
								onSessionPin,
								onSessionUnpin,
								pinnedSessionIds,
								archivedSessionIds,
								archivedSessionIdsRaw,
								archivedFilter,
								orderBy,
								sessionOrderByAccount,
								sessionUpdatedAtByAccount,
								syncSessionOrderAccount: actions.syncSessionOrderAccount,
								setSessionOrder: actions.setSessionOrder,
								t
							}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SessionTree, {
								useSessions,
								onSessionRename,
								onSessionArchive,
								onSessionUnarchive,
								onSessionDelete,
								onSessionPin,
								onSessionUnpin,
								pinnedSessionIds,
								forkSession,
								hoistPinned,
								workspaces,
								groupExpansion,
								setGroupExpanded: actions.setGroupExpanded,
								sessionOrderByAccount,
								sessionUpdatedAtByAccount,
								syncSessionOrderAccount: actions.syncSessionOrderAccount,
								setSessionOrder: actions.setSessionOrder,
								archivedSessionIds,
								archivedSessionIdsRaw,
								archivedFilter,
								nestWorkspaces: groupBy === "workspace-tree",
								startSession,
								open,
								insertWorkspaceBefore,
								insertSessionBefore,
								orderBy,
								categorySnapshots: categoryView.snapshots,
								categoryExpansion,
								setCategoryExpanded: actions.setCategoryExpanded,
								onCreateCategory: requestCategoryCreate,
								onDeleteCategory: requestCategoryDelete,
								renameCategory,
								moveCategory,
								reorderCategory,
								assignSessions,
								workspaceFolders,
								workspaceFolderAssignments,
								workspaceFolderExpansion,
								workspaceIcons,
								workspaceFolderIcons,
								onPickWorkspaceIcon: requestWorkspaceIcon,
								onPickWorkspaceFolderIcon: requestWorkspaceFolderIcon,
								onArchiveAllRequest: requestArchiveAll,
								setWorkspaceFolderExpanded: actions.setWorkspaceFolderExpanded,
								renameWorkspaceFolder: actions.renameWorkspaceFolder,
								deleteWorkspaceFolder: actions.deleteWorkspaceFolder,
								moveWorkspaceFolder: actions.moveWorkspaceFolder,
								assignWorkspaceFolder: actions.assignWorkspaceFolder,
								onCreateWorkspaceFolder: requestWorkspaceFolderCreate,
								t,
								onRenameRequest: (workspaceId, currentTitle) => {
									setRenameTarget({
										workspaceId,
										currentTitle
									});
									setRenameDraft(currentTitle);
									setRenameError(null);
								},
								onDeleteRequest: (workspaceId, title) => {
									setDeleteTarget({
										workspaceId,
										title
									});
									setDeleteError(null);
								}
							}))
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
						open: archiveAllTarget !== null,
						onClose: closeArchiveAll,
						closeLabel: t("close"),
						title: t("archiveAll.title"),
						...archiveAllTarget === null ? {} : { description: [
							t("archiveAll.desc", {
								name: archiveAllTarget.title,
								n: archiveAllTarget.sessionIds.length
							}),
							archiveAllTarget.skippedRunning > 0 ? t("archiveAll.running", { n: archiveAllTarget.skippedRunning }) : "",
							archiveAllTarget.skippedCurrent ? t("archiveAll.current") : ""
						].filter((part) => part !== "").join(" ") },
						footer: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "outline",
							disabled: archiveAllBusy,
							onClick: closeArchiveAll,
							children: t("cancel")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "primary",
							disabled: archiveAllBusy || archiveAllTarget === null,
							onClick: () => {
								confirmArchiveAll();
							},
							children: archiveAllBusy ? t("archiveAll.pending") : t("archiveAll.confirm")
						})] }),
						children: archiveAllError !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: WorkspaceBrowser_module_default.renameError,
							role: "alert",
							children: archiveAllError
						})
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
						open: iconPicker !== null,
						onClose: () => {
							setIconPicker(null);
						},
						closeLabel: t("close"),
						title: t("icon.picker.title"),
						...iconPicker === null ? {} : { description: iconPicker.title },
						footer: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "outline",
							onClick: () => {
								commitPickerIcon(null);
							},
							children: t("icon.reset")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "outline",
							onClick: () => {
								setIconPicker(null);
							},
							children: t("cancel")
						})] }),
						children: iconPicker !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(WorkspaceIconPickerGrid, {
							selected: currentPickerIcon,
							onPick: (icon) => {
								commitPickerIcon(icon);
							},
							t
						})
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
						open: folderCreateTarget !== null,
						onClose: () => {
							setFolderCreateTarget(null);
						},
						closeLabel: t("close"),
						title: folderCreateTarget?.parentId === null ? t("folder.create") : t("folder.createChild"),
						footer: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "outline",
							onClick: () => {
								setFolderCreateTarget(null);
							},
							children: t("cancel")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "primary",
							disabled: folderDraft.trim() === "",
							onClick: confirmWorkspaceFolderCreate,
							children: folderCreateTarget?.parentId === null ? t("folder.create") : t("folder.createChild")
						})] }),
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
							className: WorkspaceBrowser_module_default.renameInput,
							"aria-label": t("folder.name"),
							autoFocus: true,
							value: folderDraft,
							onFocus: (event) => {
								event.target.select();
							},
							onChange: (event) => {
								setFolderDraft(event.target.value);
							},
							onKeyDown: (event) => {
								if (event.key === "Enter") confirmWorkspaceFolderCreate();
							}
						})
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
						open: categoryCreateTarget !== null,
						onClose: () => {
							if (!categoryBusy) setCategoryCreateTarget(null);
						},
						closeLabel: t("close"),
						title: t("category.create"),
						footer: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "outline",
							disabled: categoryBusy,
							onClick: () => {
								setCategoryCreateTarget(null);
							},
							children: t("cancel")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "primary",
							disabled: categoryBusy || categoryDraft.trim() === "",
							onClick: confirmCategoryCreate,
							children: t("category.create")
						})] }),
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
							className: WorkspaceBrowser_module_default.renameInput,
							"aria-label": t("field.categoryName"),
							autoFocus: true,
							disabled: categoryBusy,
							value: categoryDraft,
							onChange: (event) => {
								setCategoryDraft(event.target.value);
								setCategoryError(null);
							},
							onKeyDown: (event) => {
								if (event.key === "Enter") confirmCategoryCreate();
							}
						}), categoryError !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: WorkspaceBrowser_module_default.renameError,
							children: categoryError
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
						open: categoryDeleteTarget !== null,
						onClose: closeCategoryDelete,
						closeLabel: t("close"),
						title: t("category.delete"),
						...categoryDeleteTarget === null ? {} : { description: t("category.delete.desc", {
							name: categoryDeleteTarget.title,
							descendants: categoryDeleteTarget.descendantCount,
							sessions: categoryDeleteTarget.sessionCount
						}) },
						footer: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "outline",
							disabled: categoryDeleting,
							onClick: closeCategoryDelete,
							children: t("cancel")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "outline",
							className: WorkspaceBrowser_module_default.deleteAction,
							disabled: categoryDeleting,
							onClick: confirmCategoryDelete,
							children: t("category.delete")
						})] }),
						children: [
							categoryDeleteTarget !== null && categoryDeleteTarget.runningCount > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: WorkspaceBrowser_module_default.deleteStatus,
								role: "alert",
								children: t("category.delete.runningWarning", { n: categoryDeleteTarget.runningCount })
							}),
							categoryDeleting && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: WorkspaceBrowser_module_default.deleteStatus,
								role: "status",
								children: t("category.delete.pending")
							}),
							categoryDeleteError !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: WorkspaceBrowser_module_default.renameError,
								role: "alert",
								children: categoryDeleteError
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
						open: renameTarget !== null,
						onClose: closeRename,
						closeLabel: t("close"),
						title: t("rename.workspace.title"),
						footer: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "outline",
							disabled: renaming,
							onClick: closeRename,
							children: t("cancel")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "primary",
							disabled: renameBlocked,
							onClick: confirmRename,
							children: t("rename")
						})] }),
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
								className: WorkspaceBrowser_module_default.renameInput,
								value: renameDraft,
								"aria-label": t("field.workspaceName"),
								autoFocus: true,
								disabled: renaming,
								onFocus: (e) => {
									e.target.select();
								},
								onChange: (e) => {
									setRenameDraft(e.target.value);
									setRenameError(null);
								},
								onCompositionStart: () => {
									composingRef.current = true;
								},
								onCompositionEnd: () => {
									composingRef.current = false;
								},
								onKeyDown: (e) => {
									if (e.key === "Enter" && !composingRef.current) {
										e.preventDefault();
										confirmRename();
									}
								}
							}),
							renameDuplicate && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: WorkspaceBrowser_module_default.renameError,
								role: "alert",
								children: t("conflict.named", { name: renameTrimmed })
							}),
							renameError !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: WorkspaceBrowser_module_default.renameError,
								role: "alert",
								children: renameError
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
						open: sessionRenameTarget !== null,
						onClose: closeSessionRename,
						closeLabel: t("close"),
						title: t("rename.session.title"),
						footer: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "outline",
							disabled: sessionRenaming,
							onClick: closeSessionRename,
							children: t("cancel")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "primary",
							disabled: sessionRenameBlocked,
							onClick: confirmSessionRename,
							children: t("rename")
						})] }),
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
							className: WorkspaceBrowser_module_default.renameInput,
							value: sessionRenameDraft,
							"aria-label": t("field.sessionName"),
							autoFocus: true,
							disabled: sessionRenaming,
							onFocus: (e) => {
								e.target.select();
							},
							onChange: (e) => {
								setSessionRenameDraft(e.target.value);
								setSessionRenameError(null);
							},
							onCompositionStart: () => {
								composingRef.current = true;
							},
							onCompositionEnd: () => {
								composingRef.current = false;
							},
							onKeyDown: (e) => {
								if (e.key === "Enter" && !composingRef.current) {
									e.preventDefault();
									confirmSessionRename();
								}
							}
						}), sessionRenameError !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: WorkspaceBrowser_module_default.renameError,
							role: "alert",
							children: sessionRenameError
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
						open: deleteTarget !== null,
						onClose: closeDelete,
						closeLabel: t("close"),
						title: t("delete.workspace"),
						...deleteTarget === null ? {} : { description: t("delete.desc", { name: deleteTarget.title }) },
						footer: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "outline",
							disabled: deleting,
							onClick: closeDelete,
							children: t("cancel")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "outline",
							className: WorkspaceBrowser_module_default.deleteAction,
							disabled: deleting,
							onClick: confirmDelete,
							children: t("delete.workspace")
						})] }),
						children: [deleting && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: WorkspaceBrowser_module_default.deleteStatus,
							role: "status",
							children: t("delete.pending")
						}), deleteError !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: WorkspaceBrowser_module_default.renameError,
							role: "alert",
							children: deleteError
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
						open: sessionDeleteTarget !== null,
						onClose: closeSessionDelete,
						closeLabel: t("close"),
						title: t("delete.session.title"),
						...sessionDeleteTarget === null ? {} : { description: t("delete.session.desc", { name: sessionDeleteTarget.title }) },
						footer: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "outline",
							disabled: sessionDeleting,
							onClick: closeSessionDelete,
							children: t("cancel")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "outline",
							className: WorkspaceBrowser_module_default.deleteAction,
							disabled: sessionDeleting || sessionScanState === "pending",
							onClick: confirmSessionDelete,
							children: t("delete.session.confirm")
						})] }),
						children: [
							sessionScanState === "pending" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: WorkspaceBrowser_module_default.deleteStatus,
								role: "status",
								children: t("delete.session.scanning")
							}),
							sessionScanState === "failed" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: WorkspaceBrowser_module_default.renameError,
								role: "alert",
								children: t("delete.session.scanFailed")
							}),
							sessionScan !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								role: "group",
								"aria-label": t("delete.session.scopeTitle"),
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { children: t("delete.session.logSize", { n: formatBytes$1(sessionScan.store.bytes) }) }),
									sessionScan.artifacts.allowed.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
										style: {
											display: "block",
											marginTop: 8
										},
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
												type: "radio",
												name: "session-delete-scope",
												checked: sessionScope === "record",
												onChange: () => {
													setSessionScope("record");
												}
											}),
											" ",
											t("delete.session.scopeRecord")
										]
									}),
									sessionScan.artifacts.allowed.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
										style: {
											display: "block",
											marginTop: 4
										},
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
												type: "radio",
												name: "session-delete-scope",
												checked: sessionScope === "artifacts",
												onChange: () => {
													setSessionScope("artifacts");
												}
											}),
											" ",
											t("delete.session.scopeArtifacts", {
												n: sessionScan.artifacts.allowed.length,
												bytes: formatBytes$1(sessionScan.artifacts.totalBytes)
											})
										]
									}),
									sessionScan.artifacts.allowed.length > 0 && sessionScope === "artifacts" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
										style: {
											margin: "8px 0 0",
											paddingInlineStart: 20
										},
										children: sessionScan.artifacts.allowed.map((row) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", { children: [
											row.displayPath,
											"（",
											formatBytes$1(row.bytes),
											"）"
										] }, row.displayPath))
									}),
									sessionScan.artifacts.refused.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										style: { marginTop: 8 },
										children: t("delete.session.refusedList")
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
										style: {
											margin: "4px 0 0",
											paddingInlineStart: 20
										},
										children: sessionScan.artifacts.refused.map((row) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", { children: [
											row.path,
											" —",
											row.reason
										] }, row.path))
									})] }),
									sessionScan.warnings.map((warning) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										style: { marginTop: 8 },
										children: t("delete.session.scanWarning", { warning })
									}, warning))
								]
							}),
							sessionDeleting && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: WorkspaceBrowser_module_default.deleteStatus,
								role: "status",
								children: t("delete.session.pending")
							}),
							sessionDeleteError !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: WorkspaceBrowser_module_default.renameError,
								role: "alert",
								children: sessionDeleteError
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
						open: sessionDeleteDone !== null,
						onClose: () => {
							setSessionDeleteDone(null);
						},
						closeLabel: t("close"),
						title: t("delete.session.done"),
						footer: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "outline",
							onClick: () => {
								setSessionDeleteDone(null);
							},
							children: t("close")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "primary",
							onClick: () => {
								onUndoDelete();
							},
							children: t("delete.session.undo")
						})] }),
						children: [
							sessionUndoError !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: WorkspaceBrowser_module_default.renameError,
								role: "alert",
								children: sessionUndoError
							}),
							sessionUndoNotice !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: WorkspaceBrowser_module_default.deleteStatus,
								role: "status",
								children: sessionUndoNotice
							}),
							sessionDeleteDone !== null && sessionDeleteDone.artifactCount > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: WorkspaceBrowser_module_default.deleteStatus,
								children: t("delete.session.artifactCount", { n: sessionDeleteDone.artifactCount })
							})
						]
					})
				]
			});
		}
		//#endregion
		//#region packages/client/ui-session-categories/src/client/diagnostics.ts
		let nextId = 1;
		let entries = [];
		const listeners = /* @__PURE__ */ new Set();
		const emit = () => {
			for (const listener of listeners) listener();
		};
		/** Append one entry and notify subscribers. */
		function log(level, action, message) {
			const entry = {
				id: nextId++,
				at: Date.now(),
				level,
				action,
				message
			};
			entries = [...entries, entry].slice(-200);
			const line = `[session-hub] ${action}: ${message}`;
			if (level === "error") console.error(line);
			else if (level === "warn") console.warn(line);
			else console.info(line);
			emit();
		}
		/** Record a successful action. */
		function logOk(action, message) {
			log("info", action, message);
		}
		/** Record a failure with its reason. */
		function logFail(action, reason) {
			log("error", action, reason instanceof Error ? reason.message : String(reason));
		}
		/** Read the current ring (newest last). */
		function logEntries() {
			return entries;
		}
		/** Subscribe to ring changes; returns the unsubscriber. */
		function subscribeLog(listener) {
			listeners.add(listener);
			return () => {
				listeners.delete(listener);
			};
		}
		//#endregion
		//#region packages/client/ui-session-categories/src/client/SessionManagerSettings.module.css
		var SessionManagerSettings_module_default = {
			"actions": "iVnGtq_actions",
			"batch": "iVnGtq_batch",
			"batchGroup": "iVnGtq_batchGroup",
			"batchHead": "iVnGtq_batchHead",
			"batchList": "iVnGtq_batchList",
			"batchMeta": "iVnGtq_batchMeta",
			"batchTime": "iVnGtq_batchTime",
			"empty": "iVnGtq_empty",
			"emptyHint": "iVnGtq_emptyHint",
			"error": "iVnGtq_error",
			"feature": "iVnGtq_feature",
			"featureBody": "iVnGtq_featureBody",
			"featureIcon": "iVnGtq_featureIcon",
			"featureList": "iVnGtq_featureList",
			"featureText": "iVnGtq_featureText",
			"featureTitle": "iVnGtq_featureTitle",
			"info": "iVnGtq_info",
			"lead": "iVnGtq_lead",
			"logAction": "iVnGtq_logAction",
			"logList": "iVnGtq_logList",
			"logMessage": "iVnGtq_logMessage",
			"logRow": "iVnGtq_logRow",
			"logTime": "iVnGtq_logTime",
			"message": "iVnGtq_message",
			"messageRole": "iVnGtq_messageRole",
			"messageText": "iVnGtq_messageText",
			"root": "iVnGtq_root",
			"section": "iVnGtq_section",
			"sectionTitle": "iVnGtq_sectionTitle",
			"transcript": "iVnGtq_transcript",
			"trashHead": "iVnGtq_trashHead",
			"trashList": "iVnGtq_trashList",
			"trashMeta": "iVnGtq_trashMeta",
			"trashRow": "iVnGtq_trashRow"
		};
		//#endregion
		//#region packages/client/ui-session-categories/src/client/SessionManagerSettings.tsx
		/**
		* Settings-page occupant for the Plugins section.
		*
		* Two jobs, both aimed at "the user cannot see what the plugin is doing":
		*
		* 1. **Transcript viewer** — lists the Sessions sitting in the recycle bin and
		*    can open any of them to read the stored conversation, so a second delete
		*    is an informed decision rather than a guess.
		* 2. **Diagnostic log** — the plugin's own action/error ring, so a failed
		*    archive or a refused delete leaves a visible trail instead of a toast
		*    that disappears.
		*
		* The slot owner supplies nothing (empty owner props), so every action the
		* page needs arrives through the registrant's own `inject` face.
		*
		* The bin is grouped by *batch*, not by Session: one delete moves a batch, one
		* undo returns a batch, and one purge erases a batch. Rendering one flat row per
		* Session repeated the batch's identity on every line and hid the only two verbs
		* that actually act on it.
		*/
		/** Retention the "清理过期" button applies, mirroring the Host's own defaults. */
		const SWEEP_KEEP_BATCHES = 20;
		const SWEEP_KEEP_DAYS = 30;
		function formatBytes(bytes) {
			if (bytes <= 0) return "0 B";
			const units = [
				"B",
				"KB",
				"MB",
				"GB"
			];
			let value = bytes;
			let unit = 0;
			while (value >= 1024 && unit < units.length - 1) {
				value /= 1024;
				unit += 1;
			}
			return `${value >= 100 ? Math.round(value) : value.toFixed(1)} ${units[unit]}`;
		}
		function formatTime(at) {
			const date = new Date(at);
			const pad = (n) => String(n).padStart(2, "0");
			return `${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
		}
		function Feature({ icon, title, body }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
				className: SessionManagerSettings_module_default.feature,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: SessionManagerSettings_module_default.featureIcon,
					"aria-hidden": "true",
					children: icon
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: SessionManagerSettings_module_default.featureText,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: SessionManagerSettings_module_default.featureTitle,
						children: title
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: SessionManagerSettings_module_default.featureBody,
						children: body
					})]
				})]
			});
		}
		/**
		* Fold the flat bin listing into batches, newest first.
		*
		* The Host already sorts rows newest-first, so the first appearance of a batch
		* fixes its position and later rows only join it. A row whose `batchId` is the
		* empty string (a corrupt manifest) still gets its own group keyed by itself,
		* rather than being silently dropped from a page whose job is to show the bin.
		*/
		function groupByBatch(rows) {
			const groups = /* @__PURE__ */ new Map();
			for (const row of rows) {
				const key = row.batchId === "" ? `unknown:${row.sessionId}` : row.batchId;
				const existing = groups.get(key);
				if (existing === void 0) groups.set(key, {
					deletedAt: row.deletedAt,
					rows: [row],
					bytes: row.bytes
				});
				else {
					existing.rows.push(row);
					existing.bytes += row.bytes;
				}
			}
			return [...groups.entries()].map(([batchId, group]) => ({
				batchId,
				...group
			}));
		}
		function SessionManagerSettings({ t, listRecycledSessions, undoDeleteSession, listTrashedSessions, readTranscript, purgeBatch, sweepTrash }) {
			const [batches, setBatches] = (0, react.useState)(null);
			const [trashed, setTrashed] = (0, react.useState)(null);
			const [busy, setBusy] = (0, react.useState)(false);
			const [message, setMessage] = (0, react.useState)(null);
			const [error, setError] = (0, react.useState)(null);
			/** Session whose transcript is open, plus the rows once loaded. */
			const [openSession, setOpenSession] = (0, react.useState)(null);
			const [transcript, setTranscript] = (0, react.useState)(null);
			const [entries, setEntries] = (0, react.useState)(() => logEntries());
			/** Batch the user asked to erase, and whether they acknowledged it. */
			const [purgeTarget, setPurgeTarget] = (0, react.useState)(null);
			const [purgeAcknowledged, setPurgeAcknowledged] = (0, react.useState)(false);
			/** Set while the confirm on screen is the "erase the whole bin" one. */
			const [purgeAllQueued, setPurgeAllQueued] = (0, react.useState)(false);
			const [purgeAll, setPurgeAll] = (0, react.useState)(null);
			(0, react.useEffect)(() => subscribeLog(() => {
				setEntries(logEntries());
			}), []);
			const reload = async () => {
				setBusy(true);
				setError(null);
				try {
					const [nextBatches, nextTrashed] = await Promise.all([listRecycledSessions(), listTrashedSessions()]);
					setBatches(nextBatches);
					setTrashed(nextTrashed);
				} catch (reason) {
					setError(reason instanceof Error ? reason.message : String(reason));
				} finally {
					setBusy(false);
				}
			};
			(0, react.useEffect)(() => {
				reload();
			}, []);
			const undo = async () => {
				setBusy(true);
				setError(null);
				setMessage(null);
				try {
					const outcome = await undoDeleteSession();
					setMessage(t("settings.recycle.undoDone", { n: outcome.restored.length }));
					setOpenSession(null);
					setTranscript(null);
					await reload();
				} catch (reason) {
					setError(reason instanceof Error ? reason.message : String(reason));
				} finally {
					setBusy(false);
				}
			};
			const openTranscript = async (sessionId) => {
				if (openSession === sessionId) {
					setOpenSession(null);
					setTranscript(null);
					return;
				}
				setOpenSession(sessionId);
				setTranscript(null);
				const rows = await readTranscript(sessionId);
				setTranscript(rows);
			};
			const askPurge = (group) => {
				setError(null);
				setMessage(null);
				setPurgeAcknowledged(false);
				setPurgeTarget(group);
				setPurgeAllQueued(false);
			};
			/**
			* Erase the whole bin.
			*
			* Reuses the per-batch verb rather than a "delete everything" call: the Host
			* then has to consent to each erase on its own terms, and a failure part-way
			* through leaves an honest partial result instead of a half-taken bin. The
			* batches were captured when the button was pressed — the list is re-read on
			* success — so a row deleted meanwhile simply reports as already gone.
			*/
			const askPurgeAll = () => {
				if (groups === null || groups.length === 0) return;
				setError(null);
				setMessage(null);
				setPurgeAcknowledged(false);
				setPurgeAllQueued(true);
				setPurgeAll({
					batches: groups.length,
					rows: groups.reduce((total, group) => total + group.rows.length, 0)
				});
			};
			const confirmPurge = async () => {
				if (purgeAllQueued) {
					setPurgeAll(null);
					setPurgeAllQueued(false);
					setPurgeAcknowledged(false);
					setBusy(true);
					setError(null);
					setMessage(null);
					try {
						let reclaimed = 0;
						let erasedBatches = 0;
						for (const group of groups ?? []) try {
							const outcome = await purgeBatch(group.batchId);
							reclaimed += outcome.reclaimedBytes;
							erasedBatches += 1;
						} catch (reason) {
							setError(reason instanceof Error ? reason.message : String(reason));
						}
						setMessage(t("settings.recycle.purgeAllDone", {
							batches: erasedBatches,
							bytes: formatBytes(reclaimed)
						}));
						setOpenSession(null);
						setTranscript(null);
						await reload();
					} finally {
						setBusy(false);
					}
					return;
				}
				const target = purgeTarget;
				if (target === null) return;
				setPurgeTarget(null);
				setPurgeAcknowledged(false);
				setBusy(true);
				setError(null);
				setMessage(null);
				try {
					const outcome = await purgeBatch(target.batchId);
					setMessage(t("settings.recycle.purgeDone", {
						n: target.rows.length,
						bytes: formatBytes(outcome.reclaimedBytes)
					}));
					setOpenSession(null);
					setTranscript(null);
					await reload();
				} catch (reason) {
					setError(reason instanceof Error ? reason.message : String(reason));
				} finally {
					setBusy(false);
				}
			};
			const sweep = async () => {
				setBusy(true);
				setError(null);
				setMessage(null);
				try {
					const outcome = await sweepTrash(SWEEP_KEEP_BATCHES, SWEEP_KEEP_DAYS);
					setMessage(t("settings.recycle.sweepDone", {
						n: outcome.removedBatchIds.length,
						bytes: formatBytes(outcome.reclaimedBytes)
					}));
					setOpenSession(null);
					setTranscript(null);
					await reload();
				} catch (reason) {
					setError(reason instanceof Error ? reason.message : String(reason));
				} finally {
					setBusy(false);
				}
			};
			/** Copy the whole diagnostic ring, newest first, as plain text. */
			const copyLog = async () => {
				const text = entries.slice().reverse().map((entry) => `${formatTime(entry.at)}\t${entry.level}\t${entry.action}\t${entry.message}`).join("\n");
				try {
					await navigator.clipboard.writeText(text);
					setMessage(t("settings.log.copied", { n: entries.length }));
				} catch (reason) {
					setError(t("settings.log.copyFailed"));
				}
			};
			const groups = trashed === null ? null : groupByBatch(trashed);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: SessionManagerSettings_module_default.root,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
						className: SessionManagerSettings_module_default.section,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
								className: SessionManagerSettings_module_default.sectionTitle,
								children: t("settings.overview.title")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: SessionManagerSettings_module_default.lead,
								children: t("settings.overview.lead")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("ul", {
								className: SessionManagerSettings_module_default.featureList,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Feature, {
										icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconArchiveOutlineRegular, { size: 18 }),
										title: t("settings.overview.category.title"),
										body: t("settings.overview.category.body")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Feature, {
										icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconArchiveOutlineRegular, { size: 18 }),
										title: t("settings.overview.archive.title"),
										body: t("settings.overview.archive.body")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Feature, {
										icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconArchiveOutlineRegular, { size: 18 }),
										title: t("settings.overview.delete.title"),
										body: t("settings.overview.delete.body")
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
						className: SessionManagerSettings_module_default.section,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
								className: SessionManagerSettings_module_default.sectionTitle,
								children: t("settings.recycle.title")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: SessionManagerSettings_module_default.lead,
								children: t("settings.recycle.lead")
							}),
							error !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: SessionManagerSettings_module_default.error,
								role: "alert",
								children: error
							}),
							message !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: SessionManagerSettings_module_default.info,
								role: "status",
								children: message
							}),
							groups === null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: SessionManagerSettings_module_default.empty,
								children: t("settings.recycle.loading")
							}),
							groups !== null && groups.length === 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: SessionManagerSettings_module_default.empty,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { children: t("settings.recycle.empty") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: SessionManagerSettings_module_default.emptyHint,
									children: t("settings.recycle.emptyHint")
								})]
							}),
							groups !== null && groups.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
								className: SessionManagerSettings_module_default.batchList,
								children: groups.map((group) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
									className: SessionManagerSettings_module_default.batchGroup,
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: SessionManagerSettings_module_default.batchHead,
											children: [
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													className: SessionManagerSettings_module_default.batchMeta,
													children: t("settings.recycle.batch", {
														n: group.rows.length,
														bytes: formatBytes(group.bytes)
													})
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													className: SessionManagerSettings_module_default.batchTime,
													children: group.deletedAt
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
													variant: "outline",
													icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconTrashOutlineRegular, { size: 16 }),
													disabled: busy,
													"aria-label": t("settings.recycle.purgeBatch"),
													onClick: () => {
														askPurge(group);
													},
													children: t("settings.recycle.purgeBatch")
												})
											]
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
											className: SessionManagerSettings_module_default.trashMeta,
											children: group.batchId
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
											className: SessionManagerSettings_module_default.trashList,
											children: group.rows.map((row) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
												className: SessionManagerSettings_module_default.trashRow,
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
													className: SessionManagerSettings_module_default.trashHead,
													children: [
														/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
															className: SessionManagerSettings_module_default.trashMeta,
															children: row.sessionId
														}),
														/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
															className: SessionManagerSettings_module_default.batchTime,
															children: formatBytes(row.bytes)
														}),
														/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
															variant: "outline",
															onClick: () => {
																openTranscript(row.sessionId);
															},
															children: openSession === row.sessionId ? t("settings.recycle.hideContent") : t("settings.recycle.viewContent")
														})
													]
												}), openSession === row.sessionId && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
													className: SessionManagerSettings_module_default.transcript,
													children: [
														transcript === null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
															className: SessionManagerSettings_module_default.empty,
															children: t("settings.recycle.contentLoading")
														}),
														transcript !== null && transcript.length === 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
															className: SessionManagerSettings_module_default.empty,
															children: t("settings.recycle.contentEmpty")
														}),
														transcript !== null && transcript.map((item, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
															className: SessionManagerSettings_module_default.message,
															"data-role": item.role,
															children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
																className: SessionManagerSettings_module_default.messageRole,
																children: item.role
															}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
																className: SessionManagerSettings_module_default.messageText,
																children: item.text
															})]
														}, `${row.sessionId}/${index}`))
													]
												})]
											}, `${group.batchId}/${row.sessionId}`))
										})
									]
								}, group.batchId))
							}),
							groups !== null && groups.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: SessionManagerSettings_module_default.actions,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
										variant: "outline",
										icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconRefreshOutlineRegular, { size: 16 }),
										disabled: busy,
										onClick: () => {
											undo();
										},
										children: t("settings.recycle.undo")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
										variant: "outline",
										disabled: busy,
										onClick: () => {
											sweep();
										},
										children: t("settings.recycle.sweep", {
											batches: SWEEP_KEEP_BATCHES,
											days: SWEEP_KEEP_DAYS
										})
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
										variant: "outline",
										className: SessionManagerSettings_module_default.deleteAction,
										icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconTrashOutlineRegular, { size: 16 }),
										disabled: busy,
										onClick: () => {
											askPurgeAll();
										},
										children: t("settings.recycle.purgeAll")
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
						className: SessionManagerSettings_module_default.section,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
								className: SessionManagerSettings_module_default.sectionTitle,
								children: t("settings.log.title")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: SessionManagerSettings_module_default.lead,
								children: t("settings.log.lead")
							}),
							entries.length === 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: SessionManagerSettings_module_default.empty,
								children: t("settings.log.empty")
							}),
							entries.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: SessionManagerSettings_module_default.actions,
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									variant: "ghost",
									icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCopyOutlineRegular, { size: 16 }),
									onClick: () => {
										copyLog();
									},
									children: t("settings.log.copy")
								})
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
								className: SessionManagerSettings_module_default.logList,
								children: entries.slice(-60).reverse().map((entry) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
									className: SessionManagerSettings_module_default.logRow,
									"data-level": entry.level,
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: SessionManagerSettings_module_default.logTime,
											children: formatTime(entry.at)
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: SessionManagerSettings_module_default.logAction,
											children: entry.action
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: SessionManagerSettings_module_default.logMessage,
											children: entry.message
										})
									]
								}, entry.id))
							})] })
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.RiskConfirmation, {
						open: purgeTarget !== null || purgeAll !== null,
						title: purgeAllQueued && purgeAll !== null ? t("settings.recycle.purgeAllTitle") : t("settings.recycle.purgeTitle"),
						description: purgeAllQueued && purgeAll !== null ? t("settings.recycle.purgeAllBody", {
							batches: purgeAll.batches,
							rows: purgeAll.rows
						}) : purgeTarget === null ? "" : t("settings.recycle.purgeBody", {
							n: purgeTarget.rows.length,
							bytes: formatBytes(purgeTarget.bytes)
						}),
						acknowledgeLabel: t("settings.recycle.purgeAck"),
						cancelLabel: t("settings.recycle.cancel"),
						closeLabel: t("close"),
						confirmLabel: purgeAllQueued && purgeAll !== null ? t("settings.recycle.purgeAllConfirm") : t("settings.recycle.purgeConfirm"),
						acknowledged: purgeAcknowledged,
						onAcknowledgedChange: setPurgeAcknowledged,
						onCancel: () => {
							setPurgeTarget(null);
							setPurgeAll(null);
							setPurgeAllQueued(false);
							setPurgeAcknowledged(false);
						},
						onConfirm: () => {
							confirmPurge();
						}
					})
				]
			});
		}
		//#endregion
		//#region packages/client/ui-session-categories/src/client/SessionManagerLauncher.module.css
		var SessionManagerLauncher_module_default = {
			"dialog": "YBXmbq_dialog",
			"dialogContent": "YBXmbq_dialogContent"
		};
		//#endregion
		//#region packages/client/ui-session-categories/src/client/SessionManagerLauncher.tsx
		/**
		* Sidebar-footer action: the 会话管理 button beside Settings.
		*
		* Clicking it opens a dialog that IS the session-management surface — the
		* recycle bin, the undo verb and the plugin log — instead of the roundabout
		* this button used to take (setting the archived filter and expecting the user
		* to scroll). Reaching the Settings page programmatically is not available to a
		* plugin: `sidebar.footer.action` hands over only `wide`, and the settings
		* shell's store (`actions.openSection`) is owned by its own occupant. A dialog
		* on this very button is the one surface the user already reaches, so the
		* feature lives there.
		*
		* The dialog body is {@link SessionManagerSettings}, the same component the
		* Settings tab mounts, so the two entries can never drift apart.
		*/
		function SessionManagerLauncher({ wide, t, useStore, actions, listRecycledSessions, undoDeleteSession, listTrashedSessions, readTranscript, purgeBatch, sweepTrash }) {
			const open = useStore((s) => s.managerOpen === true);
			const [generation, setGeneration] = (0, react.useState)(0);
			const label = t("settings.launcher");
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tooltip, {
				label,
				delayMs: 500,
				disabled: wide,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
					variant: "ghost",
					className: clsx(!wide && "dshSessionManagerRail"),
					"aria-label": label,
					"aria-haspopup": "dialog",
					"aria-expanded": open,
					icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconArchiveOutlineRegular, { size: wide ? 16 : 18 }),
					onClick: () => {
						setGeneration((n) => n + 1);
						actions.openManager();
					},
					children: wide ? label : null
				})
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
				open,
				onClose: () => {
					actions.closeManager();
				},
				closeLabel: t("close"),
				title: label,
				className: SessionManagerLauncher_module_default.dialog,
				contentClassName: SessionManagerLauncher_module_default.dialogContent,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SessionManagerSettings, {
					t,
					listRecycledSessions,
					undoDeleteSession,
					listTrashedSessions,
					readTranscript,
					purgeBatch,
					sweepTrash
				}, generation)
			})] });
		}
		//#endregion
		//#region packages/client/ui-session-categories/src/client/locales.ts
		/**
		* `workspace` namespace dictionaries: the browsing region (section header,
		* search, tree rows, dialogs) and the pick/add flow. Runtime failure
		* messages (wire error strings) pass through untranslated by policy.
		*/
		/** Simplified Chinese dictionary (the key-set source of truth). */
		const zh = {
			"group.ungrouped": "未分组",
			"session.new": "新会话",
			"section.workspaces": "工作区",
			"section.sessions": "会话",
			"viewOptions.label": "视图选项",
			"groupBy.label": "分组方式",
			"groupBy.workspace": "按工作区",
			"groupBy.workspaceTree": "按工作区树",
			"groupBy.flat": "单列表",
			"orderBy.label": "排序方式",
			"orderBy.manual": "手动排序",
			"orderBy.updated": "最近更新",
			"archived.label": "归档会话",
			"archived.show": "显示归档分区",
			"archived.hide": "隐藏归档分区",
			"filterBy.label": "筛选会话",
			"archiveAll.title": "归档全部会话",
			"archiveAll.desc": "将归档“{name}”中的 {n} 个会话。",
			"archiveAll.running": "其中 {n} 个正在运行，会被跳过（可稍后单独归档）。",
			"archiveAll.current": "当前打开的会话会被跳过。",
			"archiveAll.partial": "{failed} 个会话未能归档（共 {total} 个），可以重试。",
			"archiveAll.pending": "正在归档…",
			"archiveAll.confirm": "全部归档",
			"viewOptions.hideArchived": "隐藏已归档",
			"viewOptions.showArchived": "全部对话（包括已归档）",
			"viewOptions.onlyArchived": "仅显示已归档",
			"viewOptions.hoist.label": "置顶会话",
			"viewOptions.hoist.on": "置顶到分类上方",
			"viewOptions.hoist.off": "保留在所属分类",
			"empty.onlyArchived": "暂无已归档会话",
			"sessions.expand": "展开其余 {n} 个会话",
			"sessions.collapse": "收起",
			"empty.none": "暂无会话",
			"empty.noMatches": "无匹配结果",
			"workspace.add": "添加工作区",
			"search.sessions.aria": "搜索会话",
			"search.placeholder": "搜索会话…",
			"search.clear": "清除搜索",
			"search.results.aria": "搜索结果",
			"search.pending": "正在搜索会话历史…",
			"search.unavailable": "内容搜索暂不可用，仅显示名称匹配。",
			"search.noMatches": "无匹配会话",
			"search.hasMore": "仅显示前 {n} 条结果，请缩小搜索范围。",
			"menu.addWorkspace": "添加工作区…",
			"picker.loading": "正在加载工作区…",
			"conflict.named": "已存在名为“{name}”的工作区。",
			"folderError.title": "无法打开文件夹",
			"folderError.retry": "重新选择",
			"rename": "重命名",
			"rename.workspace.title": "重命名工作区",
			"rename.session.title": "重命名会话",
			"field.workspaceName": "工作区名称",
			"field.sessionName": "会话名称",
			"field.categoryName": "分类名称",
			"category.create": "新建分类",
			"category.createChild": "新建子分类",
			"category.move": "移动到分类…",
			"category.unclassified": "未分类",
			"category.root": "分类根目录",
			"category.loading": "正在加载分类…",
			"category.loadError": "无法加载分类",
			"category.retry": "重试",
			"category.delete": "删除分类",
			"category.delete.desc": "将删除 “{name}”及其 {descendants} 个子分类，并归档其中的 {sessions} 个会话。会话将归档，日志不会永久删除。",
			"category.delete.pending": "正在删除分类并归档会话…",
			"category.delete.runningWarning": "其中有 {n} 个会话正在进行中，删除分类会一并停止它们。",
			"actions.category.aria": "分类“{name}”的操作",
			"folder.create": "新建文件夹",
			"folder.createChild": "新建子文件夹",
			"folder.move": "移动到…",
			"folder.root": "顶层",
			"folder.unfiled": "未分类",
			"folder.name": "文件夹名称",
			"folder.delete": "删除文件夹",
			"folder.moveWorkspace": "移动到文件夹…",
			"folder.workspaceCount": "{n} 个工作区",
			"folder.actions.aria": "文件夹“{name}”的操作",
			"icon.pick": "设置图标…",
			"icon.picker.title": "选择图标",
			"icon.section.icons": "图标",
			"icon.section.emoji": "Emoji",
			"icon.reset": "恢复默认",
			"delete.workspace": "删除工作区",
			"delete.desc": "将把“{name}”从工作区列表中移除。文件夹与会话记录会保留，其会话将显示在“未分组”下。",
			"delete.pending": "正在删除工作区…",
			"menu.fork": "分叉会话",
			"menu.archiveSession": "归档会话",
			"menu.archiveAll": "归档全部会话…",
			"menu.unarchiveSession": "取消归档",
			"menu.pinSession": "置顶会话",
			"menu.unpinSession": "取消置顶",
			"menu.deleteSession": "删除会话",
			"delete.session.title": "删除会话",
			"delete.session.desc": "将把“{name}”的会话记录移入回收站，该会话会从列表中消失。记录并未销毁，可以随时撤回。",
			"delete.session.confirm": "移入回收站",
			"delete.session.pending": "正在移入回收站…",
			"delete.session.scanning": "正在统计将移入回收站的内容…",
			"delete.session.scanFailed": "无法统计删除范围，只能移走会话记录本身。",
			"delete.session.scopeTitle": "删除范围",
			"delete.session.scopeRecord": "只移走会话记录",
			"delete.session.scopeArtifacts": "连它写过的文件一起移走（{n} 个，{bytes}）",
			"delete.session.logSize": "会话记录：{n}",
			"delete.session.artifactList": "将一起移走的文件：",
			"delete.session.refusedList": "不会动的文件（附原因）：",
			"delete.session.scanWarning": "提示：{warning}",
			"delete.session.artifactCount": "本次共移走 {n} 个文件。",
			"delete.session.missingLog": "找不到这条会话的记录文件，可能已被移动或清理。",
			"delete.session.disposed": "插件已停用，无法执行删除。",
			"delete.session.done": "已移入回收站，可以撤回。",
			"delete.session.undo": "撤回",
			"delete.session.undoDone": "已撤回 {n} 条会话。",
			"delete.session.undoPartial": "撤回了 {n} 条，{failed} 条未能恢复。",
			"delete.session.undoFailed": "没有可撤回的删除记录。",
			"sessions.count.one": "{n} 个会话",
			"sessions.count.other": "{n} 个会话",
			"workspace.collapsedIndicator": "包含分类和会话",
			"actions.workspace.aria": "工作区“{name}”的操作",
			"actions.session.aria": "会话“{name}”的操作",
			"actions.newSession.aria": "在“{name}”中新建会话",
			"status.running": "进行中",
			"status.subagentsRunning.one": "{n} 个子代理运行中",
			"status.subagentsRunning.other": "{n} 个子代理运行中",
			"status.idle": "空闲",
			"status.waitingApproval": "等待审批",
			"status.planReview": "计划待审",
			"status.waitingAnswer": "等待回答",
			"status.completed": "已完成",
			"hover.created": "创建于 {time}",
			"hover.copied": "已复制",
			"date.ymd": "{y}年{m}月{d}日",
			"time.now": "刚刚",
			"time.minutes": "{n}分钟",
			"time.hours": "{n}小时",
			"time.days": "{n}天",
			"time.months": "{n}个月",
			"time.years": "{n}年",
			"time.ago": "{t}前",
			"settings.tab": "会话管理",
			"settings.launcher": "会话管理",
			"close": "关闭",
			"settings.overview.title": "这个插件给侧栏加了什么",
			"settings.overview.lead": "装好后，侧栏就是会话管理的主界面。下面三类能力都能在侧栏直接操作，不用再找入口。",
			"settings.overview.category.title": "分类树",
			"settings.overview.category.body": "每个工作区都能建自己的分类，把会话拖进去归类；分类可以嵌套、改名、删除（删除只归档会话，不毁日志）。",
			"settings.overview.archive.title": "归档分区",
			"settings.overview.archive.body": "归档的会话收进侧栏底部一个独立分区，行首带归档图标、标题变暗。视图菜单里「筛选会话」有三档：隐藏已归档 / 全部对话（包括已归档）/ 仅显示已归档。",
			"settings.overview.delete.title": "不毁数据的删除",
			"settings.overview.delete.body": "删除会话前会先扫描列出会移走的文件与被拒绝的文件及理由；删掉的都进回收站，随时能撤回（日志、归档状态、工作区名册一起还原）。",
			"settings.recycle.title": "回收站",
			"settings.recycle.lead": "按批次列出已删除的会话。撤回把最近一批放回原处；彻底删除不可恢复。",
			"settings.recycle.loading": "正在读取回收站…",
			"settings.recycle.empty": "回收站是空的。",
			"settings.recycle.emptyHint": "删除的会话会先出现在这里，随时可撤回；彻底删除后才不可恢复。",
			"settings.recycle.undo": "撤回最近一批",
			"settings.recycle.undoDone": "已撤回 {n} 个会话。",
			"settings.recycle.batch": "{n} 个会话 · {bytes}",
			"settings.recycle.trashRow": "回收站会话 · {bytes}",
			"settings.recycle.viewContent": "看内容",
			"settings.recycle.hideContent": "收起",
			"settings.recycle.contentLoading": "正在读取会话内容…",
			"settings.recycle.contentEmpty": "该会话没有可显示的对话内容。",
			"settings.recycle.purgeBatch": "彻底删除",
			"settings.recycle.purgeAll": "清空回收站",
			"settings.recycle.purgeAllTitle": "清空整个回收站？",
			"settings.recycle.purgeAllBody": "将永久抹掉全部 {batches} 个批次、{rows} 个会话。这一步不可撤回，也不进任何后续回收站。",
			"settings.recycle.purgeAllConfirm": "全部永久删除",
			"settings.recycle.purgeAllDone": "已彻底删除 {batches} 个批次，释放 {bytes}。",
			"settings.recycle.purgeTitle": "彻底删除这一批？",
			"settings.recycle.purgeBody": "将永久抹掉 {n} 个会话（{bytes}）。这一步不可撤回，也不进任何后续回收站。",
			"settings.recycle.purgeAck": "我知道这无法撤回",
			"settings.recycle.purgeConfirm": "永久删除",
			"settings.recycle.cancel": "取消",
			"settings.recycle.purgeDone": "已彻底删除 {n} 个会话，释放 {bytes}。",
			"settings.recycle.sweep": "清理过期（保留最近 {batches} 批 / {days} 天）",
			"settings.recycle.sweepDone": "已清理 {n} 个过期批次，释放 {bytes}。",
			"settings.log.title": "插件日志",
			"settings.log.lead": "插件自身动作与失败的记录，按时间倒序。删不掉、归档失败这类事，这里能看到原因。",
			"settings.log.empty": "暂无记录。",
			"settings.log.copy": "复制全部",
			"settings.log.copied": "已复制 {n} 条日志到剪贴板。",
			"settings.log.copyFailed": "复制失败：浏览器没有授予剪贴板权限。"
		};
		/** English dictionary, checked complete against the zh key set. */
		const en = {
			"group.ungrouped": "Ungrouped",
			"session.new": "New Session",
			"section.workspaces": "Workspaces",
			"section.sessions": "Sessions",
			"viewOptions.label": "View options",
			"groupBy.label": "Group by",
			"groupBy.workspace": "WorkSpace",
			"groupBy.workspaceTree": "Workspace tree",
			"groupBy.flat": "In one list",
			"orderBy.label": "Order by",
			"orderBy.manual": "Manual",
			"orderBy.updated": "Last updated",
			"archived.label": "Archived sessions",
			"archived.show": "Show archive section",
			"archived.hide": "Hide archive section",
			"filterBy.label": "Filter sessions",
			"archiveAll.title": "Archive all sessions",
			"archiveAll.desc": "This archives {n} sessions in “{name}”.",
			"archiveAll.running": "{n} of them are running and will be skipped; archive them after they finish.",
			"archiveAll.current": "The session currently open is skipped.",
			"archiveAll.partial": "{failed} of {total} sessions could not be archived. You can retry.",
			"archiveAll.pending": "Archiving…",
			"archiveAll.confirm": "Archive all",
			"viewOptions.hideArchived": "Hide archived",
			"viewOptions.showArchived": "All sessions (including archived)",
			"viewOptions.onlyArchived": "Archived only",
			"viewOptions.hoist.label": "Pinned sessions",
			"viewOptions.hoist.on": "Hoist above categories",
			"viewOptions.hoist.off": "Keep in their category",
			"empty.onlyArchived": "No archived sessions",
			"sessions.expand": "Show {n} more sessions",
			"sessions.collapse": "Show less",
			"empty.none": "No sessions yet",
			"empty.noMatches": "No matches",
			"workspace.add": "Add workspace",
			"search.sessions.aria": "Search sessions",
			"search.placeholder": "Search sessions...",
			"search.clear": "Clear search",
			"search.results.aria": "Search results",
			"search.pending": "Searching session history…",
			"search.unavailable": "Content search is temporarily unavailable. Showing name matches.",
			"search.noMatches": "No matching sessions",
			"search.hasMore": "Showing the first {n} results. Narrow your search.",
			"menu.addWorkspace": "Add workspace…",
			"picker.loading": "Loading workspaces…",
			"conflict.named": "A workspace named “{name}” already exists.",
			"folderError.title": "Couldn’t open folder",
			"folderError.retry": "Choose again",
			"rename": "Rename",
			"rename.workspace.title": "Rename workspace",
			"rename.session.title": "Rename session",
			"field.workspaceName": "Workspace name",
			"field.sessionName": "Session name",
			"field.categoryName": "Category name",
			"category.create": "New category",
			"category.createChild": "New subcategory",
			"category.move": "Move to category…",
			"category.unclassified": "Unclassified",
			"category.root": "Category root",
			"category.loading": "Loading categories…",
			"category.loadError": "Could not load categories",
			"category.retry": "Retry",
			"category.delete": "Delete category",
			"category.delete.desc": "This deletes “{name}” and its {descendants} subcategories, and archives {sessions} assigned sessions. Sessions will be archived; logs will not be permanently deleted.",
			"category.delete.pending": "Deleting category and archiving sessions…",
			"category.delete.runningWarning": "{n} of these sessions are still running; deleting the category stops them too.",
			"actions.category.aria": "Category actions for {name}",
			"folder.create": "New folder",
			"folder.createChild": "New subfolder",
			"folder.move": "Move to…",
			"folder.root": "Top level",
			"folder.unfiled": "Unfiled",
			"folder.name": "Folder name",
			"folder.delete": "Delete folder",
			"folder.moveWorkspace": "Move to folder…",
			"folder.workspaceCount": "{n} workspaces",
			"folder.actions.aria": "Folder actions for {name}",
			"icon.pick": "Set icon…",
			"icon.picker.title": "Choose an icon",
			"icon.section.icons": "Icons",
			"icon.section.emoji": "Emoji",
			"icon.reset": "Reset to default",
			"delete.workspace": "Delete workspace",
			"delete.desc": "This removes “{name}” from the workspace list. The folder and session logs will be kept. Its sessions will appear under Ungrouped.",
			"delete.pending": "Deleting workspace…",
			"menu.fork": "Fork session",
			"menu.archiveSession": "Archive session",
			"menu.archiveAll": "Archive all sessions…",
			"menu.unarchiveSession": "Unarchive",
			"menu.pinSession": "Pin session",
			"menu.unpinSession": "Unpin session",
			"menu.deleteSession": "Delete session",
			"delete.session.title": "Delete session",
			"delete.session.desc": "This moves the stored log of “{name}” into the recycle bin, so the session disappears from the list. The log is not destroyed and can be restored at any time.",
			"delete.session.confirm": "Move to recycle bin",
			"delete.session.pending": "Moving to the recycle bin…",
			"delete.session.scanning": "Measuring what would move…",
			"delete.session.scanFailed": "The delete scope could not be measured; only the stored log will move.",
			"delete.session.scopeTitle": "Scope",
			"delete.session.scopeRecord": "Move the stored log only",
			"delete.session.scopeArtifacts": "Also move files it wrote ({n}, {bytes})",
			"delete.session.logSize": "Stored log: {n}",
			"delete.session.artifactList": "Files that would move with it:",
			"delete.session.refusedList": "Files that will not move (with reasons):",
			"delete.session.scanWarning": "Note: {warning}",
			"delete.session.artifactCount": "{n} file(s) moved in total.",
			"delete.session.missingLog": "No stored log was found for this session; it may already have been moved or swept.",
			"delete.session.disposed": "The plugin is no longer active, so the session cannot be deleted.",
			"delete.session.done": "Moved to the recycle bin. You can undo this.",
			"delete.session.undo": "Undo",
			"delete.session.undoDone": "Restored {n} session(s).",
			"delete.session.undoPartial": "Restored {n}; {failed} could not be returned.",
			"delete.session.undoFailed": "There is no deletion to undo.",
			"sessions.count.one": "{n} session",
			"sessions.count.other": "{n} sessions",
			"workspace.collapsedIndicator": "Contains categories and sessions",
			"actions.workspace.aria": "Workspace actions for {name}",
			"actions.session.aria": "Session actions for {name}",
			"actions.newSession.aria": "New session in {name}",
			"status.running": "Running",
			"status.subagentsRunning.one": "{n} subagent running",
			"status.subagentsRunning.other": "{n} subagents running",
			"status.idle": "Idle",
			"status.waitingApproval": "Waiting for approval",
			"status.planReview": "Plan awaiting review",
			"status.waitingAnswer": "Waiting for answer",
			"status.completed": "Completed",
			"hover.created": "Created {time}",
			"hover.copied": "Copied",
			"date.ymd": "{y}-{m}-{d}",
			"time.now": "now",
			"time.minutes": "{n}min",
			"time.hours": "{n}h",
			"time.days": "{n}d",
			"time.months": "{n}mo",
			"time.years": "{n}y",
			"time.ago": "{t} ago",
			"settings.tab": "Session manager",
			"settings.launcher": "Session manager",
			"close": "Close",
			"settings.overview.title": "What this plugin adds to the sidebar",
			"settings.overview.lead": "The sidebar is this plugin's main surface. Everything below is operated right there — no separate entry point needed.",
			"settings.overview.category.title": "Category trees",
			"settings.overview.category.body": "Each workspace gets its own categories; drag sessions in to group them. Categories nest, rename, and delete (deleting only archives the sessions, never their logs).",
			"settings.overview.archive.title": "Archive section",
			"settings.overview.archive.body": "Archived sessions gather into a trailing section with a leading glyph and dimmed titles. The view menu's 筛选会话 filter has three states: hide archived / all (including archived) / archived only.",
			"settings.overview.delete.title": "Non-destructive delete",
			"settings.overview.delete.body": "Deleting first scans and lists what would move and what is refused, with reasons. Everything lands in the recycle bin and can be undone (log, archive flag and roster restored together).",
			"settings.recycle.title": "Recycle bin",
			"settings.recycle.lead": "Lists deleted Sessions by batch. Undo restores the latest batch; a purge cannot be undone.",
			"settings.recycle.loading": "Reading the recycle bin…",
			"settings.recycle.empty": "The recycle bin is empty.",
			"settings.recycle.emptyHint": "Deleted sessions land here first and can be restored at any time; only a permanent erase is irreversible.",
			"settings.recycle.undo": "Undo latest batch",
			"settings.recycle.undoDone": "Restored {n} sessions.",
			"settings.recycle.batch": "{n} sessions · {bytes}",
			"settings.recycle.trashRow": "Trashed session · {bytes}",
			"settings.recycle.viewContent": "View content",
			"settings.recycle.hideContent": "Hide",
			"settings.recycle.contentLoading": "Reading the session content…",
			"settings.recycle.contentEmpty": "This session has no displayable conversation.",
			"settings.recycle.purgeBatch": "Delete permanently",
			"settings.recycle.purgeAll": "Empty the bin",
			"settings.recycle.purgeAllTitle": "Empty the whole recycle bin?",
			"settings.recycle.purgeAllBody": "This erases all {batches} batches ({rows} sessions) for good. It cannot be undone and does not go to any other recycle bin.",
			"settings.recycle.purgeAllConfirm": "Erase everything",
			"settings.recycle.purgeAllDone": "Erased {batches} batches and reclaimed {bytes}.",
			"settings.recycle.purgeTitle": "Delete this batch permanently?",
			"settings.recycle.purgeBody": "This erases {n} Sessions ({bytes}) for good. It cannot be undone and does not go to any other recycle bin.",
			"settings.recycle.purgeAck": "I understand this cannot be undone",
			"settings.recycle.purgeConfirm": "Erase for good",
			"settings.recycle.cancel": "Cancel",
			"settings.recycle.purgeDone": "Erased {n} Sessions and reclaimed {bytes}.",
			"settings.recycle.sweep": "Clean up expired (keep the newest {batches} batches / {days} days)",
			"settings.recycle.sweepDone": "Cleaned up {n} expired batches and reclaimed {bytes}.",
			"settings.log.title": "Plugin log",
			"settings.log.lead": "What this plugin did and where it failed, newest first. A refused delete or a failed archive leaves its reason here.",
			"settings.log.empty": "Nothing recorded yet.",
			"settings.log.copy": "Copy all",
			"settings.log.copied": "Copied {n} log entries to the clipboard.",
			"settings.log.copyFailed": "Copy failed: the browser did not grant clipboard access."
		};
		//#endregion
		//#region packages/client/ui-session-categories/src/client/index.ts
		/** Dictionary namespace owned by this plugin. */
		const NS = "sessionCategories";
		const PACKAGE_NAME = "dsh-workspace-folders";
		/**
		* Required services (cordis fiber inject). The target slot is declared by
		* ui-sidebar, whose activation order relative to this plugin is unconstrained.
		* apply therefore waits through `slots.inject()` instead of assuming order.
		*/
		const inject = [
			"slots",
			"sessions",
			"workspaces",
			"uiWorkspace",
			"locale",
			"remote"
		];
		/**
		* Mount the generated Remote namespace and register the category browser
		* after the sidebar declaration is live.
		* @param ctx - client root context.
		*/
		async function apply(ctx) {
			ctx.effect(() => ctx.locale.register(NS, {
				zh,
				en
			}), "ui-session-categories: dictionaries");
			await ctx.remote.$mount(TYPERT_REMOTE);
			const categoriesRemote = ctx.get("remote.sessionCategories");
			if (categoriesRemote === void 0) throw new Error("session categories Remote did not mount");
			const categories = new SessionCategoriesController(categoriesRemote);
			ctx.effect(() => () => {
				categories.dispose();
			}, "ui-session-categories: controller");
			ctx.on("connection/reset", () => {
				categories.resyncLoaded();
			});
			const searchSessions = async (query, signal) => {
				const result = await ctx.sessions.search(query, signal);
				if (!result.ok) throw new Error(result.error.message);
				return result.value;
			};
			const browserInjected = () => ({
				ensureCategories: (workspaceId) => categories.ensure(workspaceId),
				createCategory: (workspaceId, parentId, title, beforeCategoryId) => categories.create(workspaceId, parentId, title, beforeCategoryId),
				renameCategory: (categoryId, title) => categories.rename(categoryId, title),
				moveCategory: (categoryId, parentId, beforeCategoryId) => categories.moveCategory(categoryId, parentId, beforeCategoryId),
				reorderCategory: (categoryId, beforeCategoryId) => categories.reorderCategory(categoryId, beforeCategoryId),
				assignSessions: (workspaceId, sessionIds, categoryId) => categories.assignSessions(workspaceId, sessionIds, categoryId),
				deleteCategory: (categoryId, operationId) => categories.deleteCategory(categoryId, operationId),
				purgeBatch: async (batchId) => {
					const result = await categories.purgeBatch(batchId);
					if (!result.ok) throw new Error(result.error.code);
					return result.value;
				},
				sweepTrash: async (maxBatches, maxAgeDays) => {
					const result = await categories.sweepTrash(maxBatches, maxAgeDays);
					if (!result.ok) throw new Error(result.error.code);
					return result.value;
				},
				startSession: (workspaceId) => {
					ctx.uiWorkspace.startSession(workspaceId);
				},
				open: (sessionId) => {
					ctx.uiWorkspace.openSession(sessionId);
				},
				searchSessions,
				searchResultLimit: ctx.sessions.searchResultLimit,
				renameSession: async (sessionId, title) => {
					const session = ctx.sessions.binding(sessionId)?.session;
					if (session === void 0) throw new Error(`unknown session "${sessionId}"`);
					const result = await session.rename(title);
					if (!result.ok) throw new Error(result.error.message);
				},
				forkSession: (sessionId) => {
					ctx.sessions.fork({
						sessionId,
						increaseTitle: true
					}).then((childId) => {
						ctx.uiWorkspace.openSession(childId);
					}).catch(() => {});
				},
				renameWorkspace: async (workspaceId, title) => {
					await ctx.workspaces.rename(workspaceId, title);
				},
				deleteWorkspace: async (workspaceId) => {
					await ctx.workspaces.delete(workspaceId);
				},
				insertWorkspaceBefore: async (workspaceId, beforeWorkspaceId) => {
					await ctx.workspaces.insertBefore(workspaceId, beforeWorkspaceId);
				},
				archiveSession: async (sessionId) => {
					try {
						await ctx.workspaces.archiveSession(sessionId);
						logOk("archive", sessionId);
					} catch (reason) {
						logFail("archive", reason);
						throw reason;
					}
				},
				unarchiveSession: async (sessionId) => {
					try {
						await ctx.workspaces.unarchiveSession(sessionId);
						logOk("unarchive", sessionId);
					} catch (reason) {
						logFail("unarchive", reason);
						throw reason;
					}
				},
				pinSession: async (sessionId) => {
					await ctx.workspaces.pinSession(sessionId);
				},
				unpinSession: async (sessionId) => {
					await ctx.workspaces.unpinSession(sessionId);
				},
				deleteSession: async (sessionId, scope) => {
					const result = await categories.deleteSession(sessionId, scope);
					if (!result.ok) {
						log("error", "delete", `${sessionId} → ${result.error.code}`);
						throw new Error(result.error.code);
					}
					logOk("delete", `${sessionId} → batch ${result.value.batchId} (${result.value.reclaimedBytes} B)`);
					return {
						ok: true,
						batchId: result.value.batchId,
						reclaimedBytes: result.value.reclaimedBytes,
						artifactCount: result.value.artifactCount
					};
				},
				scanSession: async (sessionId) => {
					const result = await categories.scanSession(sessionId);
					if (!result.ok) {
						log("error", "scan", `${sessionId} → ${result.error.code}`);
						throw new Error(result.error.code);
					}
					return result.value;
				},
				undoDeleteSession: async () => {
					const result = await categories.undoDeleteSession();
					if (!result.ok) {
						log("error", "undo", result.error.code);
						throw new Error(result.error.code);
					}
					logOk("undo", `restored ${result.value.restored.length}, failed ${result.value.failed.length}`);
					return {
						ok: true,
						restored: result.value.restored,
						failed: result.value.failed
					};
				},
				listRecycledSessions: () => categories.listRecycledSessions(),
				insertSessionBefore: async (workspaceId, sessionId, beforeSessionId) => {
					await ctx.workspaces.insertSessionBefore(workspaceId, sessionId, beforeSessionId);
				},
				createWorkspace: (input) => ctx.workspaces.create(input),
				pickDirectory: () => ctx.uiWorkspace.pickDirectory(),
				hooks: { categories }
			});
			const viewStore = createWorkspaceViewStore();
			ctx.slots.inject("sidebar.workspaces", () => ctx.slots.register({
				name: "sidebar.workspaces",
				priority: -10,
				registrant: PACKAGE_NAME,
				store: viewStore,
				inject: browserInjected,
				locale: NS
			}, WorkspaceBrowser));
			const registerExtra = (label, register) => {
				try {
					register();
				} catch (reason) {
					console.warn(`ui-session-categories: ${label} entry skipped:`, reason);
				}
			};
			registerExtra("settings.plugins.tab", () => {
				ctx.slots.inject("settings.plugins.tab", () => ctx.slots.register({
					name: "settings.plugins.tab",
					id: "session-manager",
					order: 50,
					label: () => ctx.locale.bind(NS)("settings.tab"),
					locale: NS,
					inject: () => ({
						listRecycledSessions: () => categories.listRecycledSessions(),
						undoDeleteSession: () => categories.undoDeleteSession(),
						listTrashedSessions: () => categories.listTrashedSessions(),
						readTranscript: (sessionId) => categories.readTranscript(sessionId),
						purgeBatch: async (batchId) => {
							const result = await categories.purgeBatch(batchId);
							if (!result.ok) throw new Error(result.error.code);
							return result.value;
						},
						sweepTrash: async (maxBatches, maxAgeDays) => {
							const result = await categories.sweepTrash(maxBatches, maxAgeDays);
							if (!result.ok) throw new Error(result.error.code);
							return result.value;
						}
					})
				}, SessionManagerSettings));
			});
			registerExtra("sidebar.footer.action", () => {
				ctx.slots.inject("sidebar.footer.action", () => ctx.slots.register({
					name: "sidebar.footer.action",
					id: "session-manager",
					order: 50,
					label: () => ctx.locale.bind(NS)("settings.launcher"),
					locale: NS,
					store: viewStore,
					inject: () => ({
						listRecycledSessions: () => categories.listRecycledSessions(),
						undoDeleteSession: () => categories.undoDeleteSession(),
						listTrashedSessions: () => categories.listTrashedSessions(),
						readTranscript: (sessionId) => categories.readTranscript(sessionId),
						purgeBatch: async (batchId) => {
							const result = await categories.purgeBatch(batchId);
							if (!result.ok) throw new Error(result.error.code);
							return result.value;
						},
						sweepTrash: async (maxBatches, maxAgeDays) => {
							const result = await categories.sweepTrash(maxBatches, maxAgeDays);
							if (!result.ok) throw new Error(result.error.code);
							return result.value;
						}
					})
				}, SessionManagerLauncher));
			});
		}
		//#endregion
		exports.apply = apply;
		exports.createWorkspaceViewStore = createWorkspaceViewStore;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map