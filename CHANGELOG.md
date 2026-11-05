# Changelog

## 1.0.1 — 2026-11-05

- Fixed filing more than one Workspace into a display folder: the expanded body
  of a folder (and every Workspace row inside it) now accepts a Workspace drop
  as "file into this folder", with the folder header highlighting as feedback.
  Previously only the 28px folder header was a target, so a drop on the visible
  folder block silently did nothing.
- Dropping a Workspace inside a folder it already belongs to still re-orders it
  there; dropping it onto the Unfiled block takes it out of its folder.

## 1.0.0 — 2026-11-05

First public release. A fork of `dsh-session-keeper` 1.2.1 (itself derived from
`dsh-session-categories`), targeting DSH 0.2.1-rc.x.

Added on top of the fork base:

- Display-only **Workspace folders**: create / rename / delete / collapse, drag a Workspace in or
  out, nest and re-order folders by drag, automatic "Unfiled" bucket, Workspace-count badge.
- **Per-row icons**: quiet default dot, picker with 40 host icons and 48 emoji, reset; applies to
  Workspaces and display folders. Catalog is lazily rendered and adds no dependency.
- **Session row indentation** one step below its Workspace header (theme-aware, works with and
  without `dsh-claude-style`).
- Compatibility notes and configuration guidance for `dsh-claude-style`.
