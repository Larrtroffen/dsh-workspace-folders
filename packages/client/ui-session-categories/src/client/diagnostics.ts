/**
 * Plugin-side diagnostic log.
 *
 * The browser surfaces failures as one-line toasts or console warnings that
 * vanish with the page; when a user reports "delete did nothing", there is no
 * record to look at. This module keeps a small in-memory ring of the plugin's
 * own actions and failures so the settings page can show what actually
 * happened, in order, with timestamps.
 *
 * It is deliberately tiny: no network, no storage writes, a bounded ring, and
 * a subscription so a mounted view can re-render. Console output is kept as
 * well so the same trail shows up in the DevTools console during development.
 */

export type PluginLogLevel = 'info' | 'warn' | 'error'

export interface PluginLogEntry {
  /** Monotonic id, used as a stable React key. */
  id: number
  at: number
  level: PluginLogLevel
  /** Short action name, e.g. `delete`, `unarchive`, `scan`. */
  action: string
  /** Human-readable outcome; failures carry the reason. */
  message: string
}

const CAPACITY = 200

let nextId = 1
let entries: PluginLogEntry[] = []
const listeners = new Set<() => void>()

const emit = (): void => {
  for (const listener of listeners) listener()
}

/** Append one entry and notify subscribers. */
export function log(level: PluginLogLevel, action: string, message: string): void {
  const entry: PluginLogEntry = { id: nextId++, at: Date.now(), level, action, message }
  entries = [...entries, entry].slice(-CAPACITY)
  // Mirror into the console so a developer sees the same trail without the UI.
  const line = `[session-hub] ${action}: ${message}`
  if (level === 'error') console.error(line)
  else if (level === 'warn') console.warn(line)
  else console.info(line)
  emit()
}

/** Record a successful action. */
export function logOk(action: string, message: string): void {
  log('info', action, message)
}

/** Record a failure with its reason. */
export function logFail(action: string, reason: unknown): void {
  const message = reason instanceof Error ? reason.message : String(reason)
  log('error', action, message)
}

/** Read the current ring (newest last). */
export function logEntries(): readonly PluginLogEntry[] {
  return entries
}

/** Subscribe to ring changes; returns the unsubscriber. */
export function subscribeLog(listener: () => void): () => void {
  listeners.add(listener)
  return () => { listeners.delete(listener) }
}

/** Test seam: clear the ring. */
export function clearLog(): void {
  entries = []
  emit()
}

/** Whether a message looks like the "log already gone" failure. */
export function isMissingLogFailure(reason: unknown): boolean {
  const text = reason instanceof Error ? reason.message : String(reason)
  return /session-log-not-found|not found|未在会话目录|读取会话日志失败/i.test(text)
}
