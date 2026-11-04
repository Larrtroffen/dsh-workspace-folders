# Changelog

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
