# dsh-workspace-folders

Native-feeling folder organization for the **DeepSeek Harness (DSH)** web sidebar.

DSH's left sidebar lists every Workspace as a flat section. This plugin adds the missing
organizational layer — **user-created folders for Workspaces**, **nested Session folders inside
each Workspace**, and **per-row icons** — while keeping the shipped sidebar interactions
(drag, rename, pin, archive, search, view options) intact.

The folder layer is **display-only**: it never renames a Workspace or a Session, never moves a
Session between Workspaces, and never touches a directory on disk. It only rearranges the
sidebar. Session folders are durable (`dsh-session-keeper`'s host-side storage).

<p align="center"><img src="icon.png" width="120" alt="dsh-workspace-folders"/></p>

## Features

### Workspace folders (display-only)

- Create, rename, delete, collapse and re-order folders from the sidebar itself.
- File a Workspace by dragging its row anywhere onto a folder block (the header
  row or its expanded body), or through the row's `… → Move to folder…` menu.
- Clean up a Workspace in one step with `… → Archive all sessions…`: it archives
  every idle Session there (running Sessions are listed as skipped, so nothing
  in flight is stopped) and never touches the Session you have open.
- Drop a folder on the middle of another folder to nest it; drop it on the top/bottom edge to
  re-order siblings. Drag a Workspace onto **Unfiled** to take it out of a folder.
- Dropping a Workspace inside the folder it already belongs to re-orders it there; anywhere
  else files it into that folder.
- Deleting a folder only deletes the grouping: subfolders move up, member Workspaces return to
  **Unfiled**. No Workspace, Session or file is removed.
- With no folders, the list renders exactly like the shipped browser.

### Session folders (per Workspace, durable)

Every Workspace keeps its own nested category tree: drag Sessions in, create a Session inside a
category, collapse/rename, pin, archive with the three-state filter, and a recoverable delete bin.
Data lives in the Host storage domain (survives reloads, cache clears and restarts).

### Icons

- Every Workspace row shows a quiet default **dot**; clicking it opens the icon picker.
- 40 icons from the host's own icon set plus 48 common emoji; "Reset to default" clears the icon.
- Display folders can carry their own icon as well.
- No new dependency, no network request, no image decoding. The catalog renders only while the
  picker is open; an idle sidebar costs one map lookup per row.

### Kept from the shipped browser

Search, grouping modes (Workspace / Workspace tree / flat), manual and recency ordering, pinned
Sessions, archive filtering, Workspace and Session row menus.

## Requirements

- DSH **>= 0.2.1-rc.1 < 0.3.0** (built and tested on 0.2.1-rc.5, desktop and web profile).
- Node.js >= 24.9 is only needed to build from source; the published bundle ships prebuilt `lib/`.

## Install

From npm (once published):

```sh
dsh plugin --profile web add dsh-workspace-folders
```

From GitHub:

```sh
dsh plugin --profile web add github:Larrtroffen/dsh-workspace-folders
```

Then refresh the web UI (or restart DSH Desktop). The plugin appears as **dsh-workspace-folders**
in the plugin manager; disable or remove it to restore the shipped browser.

## How to use

| Action | How |
| --- | --- |
| New top-level folder | View-options menu (sliders icon) → **New folder**, or the **+ New folder** row at the end of the list |
| New subfolder | Folder row `…` → **New subfolder** |
| Rename | Double-click the folder name, or `…` → **Rename** |
| File a Workspace | Drag the Workspace row onto a folder; or Workspace `…` → **Move to folder…** |
| Unfile | Drag the Workspace onto **Unfiled**; or `…` → **Move to folder… → Unfiled** |
| Nest / re-order folders | Drag a folder to another folder's middle (nest) or top/bottom edge (re-order); or `…` → **Move to…** |
| Collapse / expand | Click the folder row (collapsed shows the Workspace count) |
| Delete a folder | Folder `…` → **Delete folder** (grouping only) |
| Set an icon | Click the row's leading dot/icon, or `…` → **Set icon…** |

Session folders keep the interactions from `dsh-session-keeper`: drag a Session onto a category,
`… → Move to category…`, create a Session inside a category, pin/archive/delete with undo.

## Data and privacy

| Data | Location |
| --- | --- |
| Workspace folders, folder assignments, expansion, icons (this plugin's display layer) | Browser `localStorage` under `dsh.session-categories.view.v2` |
| Session folders / assignments / recycle bin | DSH Host storage domain `session_categories` (`<DSH_HOME>/storages/`) |

Nothing is uploaded anywhere. The display layer is intentionally browser-local: clearing the
site's storage resets the Workspace folder layout (Session folders are unaffected).

## Compatibility

- The plugin **replaces** the sidebar's `sidebar.workspaces` region, so it cannot run together
  with another plugin that replaces the same region (e.g. `dsh-better-workspace`,
  `dsh-workspace-categories`). Remove one of them.
- With `dsh-claude-style` installed, its sidebar patches fight the replacement browser. Set these
  in that plugin's config for the best result:

  ```yaml
  workspaceView: false    # claude-style's Active/Archived header switch; this plugin's view menu
                          # already provides the same three-state archive filter
  searchStyle: icon       # keeps the search affordance in the sidebar header
  ```

- Other sidebar plugins that only decorate rows through slots, and themes that only style the
  frame, keep working.

## Build from source

```sh
npm install --legacy-peer-deps
npm run build
node scripts/inline-css.mjs
node scripts/verify-build.cjs
node scripts/verify-typert-manifest.mjs
```

`lib/` is committed so consumers never need a build step. The Host half is prebuilt Node ESM;
`tsdown.host.config.ts` rebuilds it when the Host source changes.

## Known limitations

- Workspace folders only appear in the grouped views (**By Workspace** / **Workspace tree**);
  the flat list and search results stay flat.
- The display folder layer (and icons) are browser-local, not Host-persisted.
- Preview DSH releases do not promise plugin API stability; upgrade the plugin together with DSH.

## License and credits

MIT. This project is a fork of [dsh-session-keeper](https://github.com/WSNMM3/dsh-session-keeper)
by WSNMM3 (MIT), which itself derives from
[ht719/dsh-session-categories](https://github.com/ht719/dsh-session-categories) (MIT). The
display-only Workspace folder layer, folder rows, drag-and-drop, icon picker and session-row
indentation were added by this fork. See `LICENSE` and `FORK-NOTES.md`.
