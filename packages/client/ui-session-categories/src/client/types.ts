/**
 * Local type surface for the client bundle.
 *
 * The retired `@deepseek-ai/dsh-client-runtime/client` entry used to export
 * both the store helpers and a bag of view-model types. The current runtime
 * splits those apart: `defineStore` moved to `@deepseek-ai/dsh-client-store`,
 * and the view types now describe data that crosses the Remote boundary, so
 * they are declared here against the shapes this plugin actually reads.
 *
 * Every import in this module is type-only, so nothing here reaches the
 * emitted bundle — the runtime `require` set stays `react`,
 * `react/jsx-runtime`, `dsh-client-store`, and `dsh-client-ui-primitives`.
 */

/** Durable Session identity. */
export type SessionId = string

/** Durable Workspace identity. */
export type WorkspaceId = string

/** A subagent Session's running tally relative to its parent. */
export interface SubagentDescendantSummary {
  parentId?: SessionId
  running?: boolean
}

/** One Session row as the list snapshot reports it. */
export interface SessionSummary {
  id: SessionId
  title: string
  blank?: boolean
  updatedAt?: number
  workspaceId?: WorkspaceId
  /** Running direct children, keyed by their parent's Session id. */
  subagents?: readonly SubagentDescendantSummary[]
  /**
   * Per-surface retention counters. A positive `mainView` marks the Session
   * the shell currently shows, which replaces the retired `list.current`.
   */
  retainedBy?: Record<string, number>
  pendingInteraction?: PendingInteractionStatus
}

/** The interaction a Session is waiting on, when any. */
export interface PendingInteractionStatus {
  kind?: string
}

/** The Session list snapshot. */
export interface SessionListState {
  byId?: Record<string, SessionSummary>
  orderedIds?: readonly SessionId[]
  searchResultLimit?: number
}

/** One hit from the shell's Session search. */
export interface SessionSearchResultItem {
  sessionId: SessionId
  title: string
  snippet?: string
  workspaceId?: WorkspaceId
  updatedAt?: number
}

/** One Workspace row as the list snapshot reports it. */
export interface WorkspaceView {
  workspaceId: WorkspaceId
  title: string
  /** Session membership in host order. */
  sessionIds: readonly SessionId[]
}

/** The Workspace list snapshot. */
export interface WorkspaceListState {
  /** Workspace rows in host order. */
  workspaces?: readonly WorkspaceView[]
  /** Flat alternate shape some consumers read instead of `workspaces`. */
  items?: readonly WorkspaceView[]
  /** Load phase, e.g. `'ready'`; consumers gate affordances on it. */
  phase?: string
  /** Registry-global archive set: members are hidden unless the view asks. */
  archivedSessionIds?: readonly SessionId[]
  /** Registry-global pin set: members sort ahead of every unpinned Session. */
  pinnedSessionIds?: readonly SessionId[]
}

/** A Cordis service the plugin declares in its fiber `inject` list. */
export interface InjectedService {
  readonly [key: string]: unknown
}

/**
 * Root client context handed to `apply`.
 *
 * The services below are the ones this plugin's `inject` list names. The
 * session-opening and directory-picking verbs live on `uiWorkspace`, which
 * owns main-view navigation; the `sessions` service keeps only listing,
 * searching, binding, and forking.
 */
export interface ClientContext {
  readonly effect: (run: () => void | (() => void), label?: string) => void
  readonly on: (event: string, handler: (...args: never[]) => void) => void
  readonly get: (name: string) => unknown
  readonly locale: {
    register: (namespace: string, dictionaries: Record<string, unknown>) => void
  }
  readonly remote: {
    $mount: (namespace: unknown) => Promise<void>
  }
  readonly sessions: {
    search: (query: string, signal?: AbortSignal) => Promise<
      { ok: true; value: readonly SessionSearchResultItem[] } | { ok: false; error: { message: string } }
    >
    binding: (sessionId: SessionId) => { session: { rename: (title: string) => Promise<
      { ok: true } | { ok: false; error: { message: string } }
    > } } | undefined
    fork: (input: { sessionId: SessionId; increaseTitle: boolean }) => Promise<SessionId>
    searchResultLimit: number
  }
  readonly workspaces: {
    create: (input: unknown) => Promise<WorkspaceView>
    rename: (workspaceId: WorkspaceId, title: string) => Promise<void>
    delete: (workspaceId: WorkspaceId) => Promise<void>
    insertBefore: (workspaceId: WorkspaceId, beforeWorkspaceId: WorkspaceId) => Promise<void>
    archiveSession: (sessionId: SessionId) => Promise<void>
    /** Unarchive one Session so it returns to its recorded position. */
    unarchiveSession: (sessionId: SessionId) => Promise<void>
    /** Pin one Session to the top of its group. */
    pinSession: (sessionId: SessionId) => Promise<void>
    /** Unpin one Session. */
    unpinSession: (sessionId: SessionId) => Promise<void>
    insertSessionBefore: (
      workspaceId: WorkspaceId,
      sessionId: SessionId,
      beforeSessionId: SessionId,
    ) => Promise<void>
  }
  /** Main-view navigation surface: opening, starting, and directory picking. */
  readonly uiWorkspace: {
    openSession: (sessionId: SessionId) => void
    startSession: (workspaceId: WorkspaceId) => void
    pickDirectory: () => Promise<string | null>
  }
  readonly slots: InjectedService
}
