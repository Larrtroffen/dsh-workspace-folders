/**
 * Session-category Workspace browser plugin. Its `sidebar.workspaces`
 * occupant shadows the shipped Workspace browser and drives its native
 * directory chooser directly. The shipped ui-workspace plugin remains the
 * owner of conversation Workspace pickers. Export discipline follows
 * packages/client/AGENTS.md.
 */
import type { ClientContext } from './types.ts'
import type {} from '@deepseek-ai/dsh-api-gateway/client'
import TYPERT_REMOTE from '@deepseek-ai/dsh-session-categories/remote'
// Type-only: pulls the locale plugin's Context merge (ctx.locale).
import type {} from '@deepseek-ai/dsh-client-locale/client'
import type { WorkspaceBrowserInjected } from './contract/slots.ts'
import { createWorkspaceViewStore } from './stores.ts'
import { SessionCategoriesController, type SessionCategoriesRemote } from './controller.ts'
import { WorkspaceBrowser } from './WorkspaceBrowser.tsx'
import { SessionManagerSettings } from './SessionManagerSettings.tsx'
import { SessionManagerLauncher } from './SessionManagerLauncher.tsx'
import { log, logFail, logOk } from './diagnostics.ts'
import { en, zh, type WorkspaceKey } from './locales.ts'

export type {
  DirectoryFlowOwnerProps, DirectoryFlowSlotName, DirectoryPickingHooks, DirectoryPickingInjected,
  WorkspaceBrowserInjected, WorkspaceBrowserProps, WorkspacePickerInjected, WorkspacePickerProps,
} from './contract/slots.ts'
export type { WorkspaceKey } from './locales.ts'
export { createWorkspaceViewStore } from './stores.ts'

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    /** The session-category browsing region and pick/create flow copy. */
    sessionCategories: WorkspaceKey
  }
}

/** Dictionary namespace owned by this plugin. */
const NS = 'sessionCategories'
const PACKAGE_NAME = 'dsh-workspace-folders'

/**
 * Required services (cordis fiber inject). The target slot is declared by
 * ui-sidebar, whose activation order relative to this plugin is unconstrained.
 * apply therefore waits through `slots.inject()` instead of assuming order.
 */
export const inject = ['slots', 'sessions', 'workspaces', 'uiWorkspace', 'locale', 'remote']

/**
 * Mount the generated Remote namespace and register the category browser
 * after the sidebar declaration is live.
 * @param ctx - client root context.
 */
export async function apply(ctx: ClientContext): Promise<void> {
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'ui-session-categories: dictionaries')
  await ctx.remote.$mount(TYPERT_REMOTE)
  const categoriesRemote = ctx.get('remote.sessionCategories') as SessionCategoriesRemote | undefined
  if (categoriesRemote === undefined) throw new Error('session categories Remote did not mount')
  const categories = new SessionCategoriesController(categoriesRemote)
  ctx.effect(() => () => { categories.dispose() }, 'ui-session-categories: controller')
  ctx.on('connection/reset', () => { void categories.resyncLoaded() })

  const searchSessions: WorkspaceBrowserInjected['searchSessions'] = async (query, signal) => {
    const result = await ctx.sessions.search(query, signal)
    if (!result.ok) throw new Error(result.error.message)
    return result.value
  }

  const browserInjected = (): WorkspaceBrowserInjected => ({
    ensureCategories: workspaceId => categories.ensure(workspaceId),
    createCategory: (workspaceId, parentId, title, beforeCategoryId) =>
      categories.create(workspaceId, parentId, title, beforeCategoryId),
    renameCategory: (categoryId, title) => categories.rename(categoryId, title),
    moveCategory: (categoryId, parentId, beforeCategoryId) =>
      categories.moveCategory(categoryId, parentId, beforeCategoryId),
    reorderCategory: (categoryId, beforeCategoryId) => categories.reorderCategory(categoryId, beforeCategoryId),
    assignSessions: (workspaceId, sessionIds, categoryId) =>
      categories.assignSessions(workspaceId, sessionIds, categoryId),
    deleteCategory: (categoryId, operationId) => categories.deleteCategory(categoryId, operationId),
    // The recycle verbs live on the bin-manager surface (footer dialog and
    // Settings tab), never on the sidebar, but the shared injected contract
    // requires the full set — so they are forwarded here rather than left as
    // "absent", which a future slot would have to special-case. Like every
    // controller verb they report a Result object; the contract wants the
    // value or a thrown failure.
    purgeBatch: async (batchId: string) => {
      const result = await categories.purgeBatch(batchId)
      if (!result.ok) throw new Error(result.error.code)
      return result.value
    },
    sweepTrash: async (maxBatches?: number, maxAgeDays?: number) => {
      const result = await categories.sweepTrash(maxBatches, maxAgeDays)
      if (!result.ok) throw new Error(result.error.code)
      return result.value
    },
    // Explicit group actions keep their target; unscoped New Session inherits
    // the current Session Workspace before the recent-Workspace fallback.
    // Opening and starting sessions moved onto the uiWorkspace service, which
    // owns main-view navigation; the sessions service no longer exposes them.
    startSession: (workspaceId) => { ctx.uiWorkspace.startSession(workspaceId) },
    open: (sessionId) => { ctx.uiWorkspace.openSession(sessionId) },
    searchSessions,
    searchResultLimit: ctx.sessions.searchResultLimit,
    renameSession: async (sessionId, title) => {
      // Row → session-face hop: rename is a per-session verb (ISession), not
      // a list-service verb; the binding resolves any listed session.
      const session = ctx.sessions.binding(sessionId)?.session
      if (session === undefined) throw new Error(`unknown session "${sessionId}"`)
      const result = await session.rename(title)
      if (!result.ok) throw new Error(result.error.message)
    },
    forkSession: (sessionId) => {
      ctx.sessions.fork({ sessionId, increaseTitle: true })
        .then((childId) => { ctx.uiWorkspace.openSession(childId) })
        .catch(() => {
          // Fork or child-rename failure keeps the current selection.
        })
    },
    renameWorkspace: async (workspaceId, title) => { await ctx.workspaces.rename(workspaceId, title) },
    deleteWorkspace: async (workspaceId) => { await ctx.workspaces.delete(workspaceId) },
    insertWorkspaceBefore: async (workspaceId, beforeWorkspaceId) => {
      await ctx.workspaces.insertBefore(workspaceId, beforeWorkspaceId)
    },
    archiveSession: async (sessionId) => {
      try {
        await ctx.workspaces.archiveSession(sessionId)
        logOk('archive', sessionId)
      } catch (reason) {
        logFail('archive', reason)
        throw reason
      }
    },
    // Archiving is one-way from the browser's point of view unless the plugin
    // offers the inverse, so both directions travel with the verbs.
    unarchiveSession: async (sessionId) => {
      try {
        await ctx.workspaces.unarchiveSession(sessionId)
        logOk('unarchive', sessionId)
      } catch (reason) {
        logFail('unarchive', reason)
        throw reason
      }
    },
    pinSession: async (sessionId) => { await ctx.workspaces.pinSession(sessionId) },
    unpinSession: async (sessionId) => { await ctx.workspaces.unpinSession(sessionId) },
    // The recycle verbs are this plugin's own Host methods rather than
    // workspace-registry calls, so they run through the category controller,
    // which already holds the mounted Remote namespace and the loaded
    // snapshots that a delete has to keep in step. The controller reports a
    // result object; the slot contract wants the value or a thrown failure, so
    // the translation happens here rather than at every call site.
    deleteSession: async (sessionId, scope) => {
      const result = await categories.deleteSession(sessionId, scope)
      if (!result.ok) {
        // The usual refusal is "the stored log is already gone": that is the
        // ghost-row case the settings page explains, so record it verbatim.
        log('error', 'delete', `${sessionId} → ${result.error.code}`)
        throw new Error(result.error.code)
      }
      logOk('delete', `${sessionId} → batch ${result.value.batchId} (${result.value.reclaimedBytes} B)`)
      return { ok: true as const, batchId: result.value.batchId, reclaimedBytes: result.value.reclaimedBytes, artifactCount: result.value.artifactCount }
    },
    scanSession: async (sessionId) => {
      const result = await categories.scanSession(sessionId)
      if (!result.ok) {
        log('error', 'scan', `${sessionId} → ${result.error.code}`)
        throw new Error(result.error.code)
      }
      return result.value
    },
    undoDeleteSession: async () => {
      const result = await categories.undoDeleteSession()
      if (!result.ok) {
        log('error', 'undo', result.error.code)
        throw new Error(result.error.code)
      }
      logOk('undo', `restored ${result.value.restored.length}, failed ${result.value.failed.length}`)
      return { ok: true as const, restored: result.value.restored, failed: result.value.failed }
    },
    listRecycledSessions: () => categories.listRecycledSessions(),
    insertSessionBefore: async (workspaceId, sessionId, beforeSessionId) => {
      await ctx.workspaces.insertSessionBefore(workspaceId, sessionId, beforeSessionId)
    },
    createWorkspace: input => ctx.workspaces.create(input),
    pickDirectory: () => ctx.uiWorkspace.pickDirectory(),
    hooks: { categories },
  })
  // One view store instance is shared by the sidebar browser and the footer
  // launcher so the archive-filter state stays in step across both surfaces.
  const viewStore = createWorkspaceViewStore()
  // This replacement owns no child slots; its directory chooser is direct.
  ctx.slots.inject('sidebar.workspaces', () => ctx.slots.register(
    {
      name: 'sidebar.workspaces',
      priority: -10,
      registrant: PACKAGE_NAME,
      store: viewStore,
      inject: browserInjected,
      locale: NS,
    },
    WorkspaceBrowser,
  ))

  // Settings page: explains the surfaces and hosts the recycle-bin manager.
  // The recycle verbs are injected by this registrant, not the empty tab owner.
  //
  // The two extra entries below are additive: this host's settings surface is
  // derived from plugin Config schemas and exposes no imperative register(),
  // so a host that also lacks these slots must simply not get them. Each is
  // therefore guarded — a failed extra entry must degrade to "feature absent"
  // rather than take the whole sidebar down (which had once booted into
  // recovery mode).
  const registerExtra = (label: string, register: () => void): void => {
    try {
      register()
    } catch (reason) {
      console.warn(`ui-session-categories: ${label} entry skipped:`, reason)
    }
  }

  registerExtra('settings.plugins.tab', () => {
    ctx.slots.inject('settings.plugins.tab', () => ctx.slots.register(
      {
        name: 'settings.plugins.tab',
        id: 'session-manager',
        order: 50,
        label: () => ctx.locale.bind(NS)('settings.tab'),
        locale: NS,
        inject: () => ({
          listRecycledSessions: () => categories.listRecycledSessions(),
          undoDeleteSession: () => categories.undoDeleteSession(),
          listTrashedSessions: () => categories.listTrashedSessions(),
          readTranscript: (sessionId: string) => categories.readTranscript(sessionId),
          // The controller reports a Result object; the slot contract wants the
          // value or a thrown failure, so the translation happens here rather
          // than at every call site — the same shape the deleteSession verb uses.
          purgeBatch: async (batchId: string) => {
            const result = await categories.purgeBatch(batchId)
            if (!result.ok) throw new Error(result.error.code)
            return result.value
          },
          sweepTrash: async (maxBatches?: number, maxAgeDays?: number) => {
            const result = await categories.sweepTrash(maxBatches, maxAgeDays)
            if (!result.ok) throw new Error(result.error.code)
            return result.value
          },
        }),
      },
      SessionManagerSettings,
    ))
  })

  // Sidebar-footer entry beside Settings: one click opens the session manager
  // dialog (recycle bin + undo + plugin log). A plugin cannot open the Settings
  // page itself — `sidebar.footer.action` hands over only `wide`, and the
  // settings shell's `openSection` belongs to its own occupant — so the feature
  // lives on the button the user already reaches.
  //
  // The recycle verbs are injected here for the same reason the Settings tab
  // injects them: the footer slot's owner supplies no data.
  registerExtra('sidebar.footer.action', () => {
    ctx.slots.inject('sidebar.footer.action', () => ctx.slots.register(
      {
        name: 'sidebar.footer.action',
        id: 'session-manager',
        order: 50,
        label: () => ctx.locale.bind(NS)('settings.launcher'),
        locale: NS,
        store: viewStore,
        inject: () => ({
          listRecycledSessions: () => categories.listRecycledSessions(),
          undoDeleteSession: () => categories.undoDeleteSession(),
          listTrashedSessions: () => categories.listTrashedSessions(),
          readTranscript: (sessionId: string) => categories.readTranscript(sessionId),
          // The controller reports a Result object; the slot contract wants the
          // value or a thrown failure, so the translation happens here rather
          // than at every call site — the same shape the deleteSession verb uses.
          purgeBatch: async (batchId: string) => {
            const result = await categories.purgeBatch(batchId)
            if (!result.ok) throw new Error(result.error.code)
            return result.value
          },
          sweepTrash: async (maxBatches?: number, maxAgeDays?: number) => {
            const result = await categories.sweepTrash(maxBatches, maxAgeDays)
            if (!result.ok) throw new Error(result.error.code)
            return result.value
          },
        }),
      },
      SessionManagerLauncher,
    ))
  })
}
