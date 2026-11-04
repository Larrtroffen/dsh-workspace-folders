/**
 * Wire types for the session recycle bin's Remote surface.
 *
 * The host service and the browser share these shapes verbatim: every one of
 * them is either a request the client sends or a value it reads back, and the
 * descriptor generator turns them into the zod schemas the gateway validates
 * against. Adding a field here is how a verb grows an argument - there is no
 * hand-written schema to keep in sync.
 *
 * @module
 */
// ⚠️ 这里的 *Result 接口记的是内层 value 的形状：线上每个结果都多包一层
// `{ ok: true; value: … } | { ok: false; error: … }`（服务返回形状，typert
// 描述符的 result schema 记的就是它）。读取方要剥两层，别只剥一层。
import type { RecycleScope, StoredSessionId } from './recycle.ts'

/** One entry of a delete batch, as the browser sees it. */
export interface RecycledSessionSummary {
  sessionId: StoredSessionId
  container: string
  sizeBytes: number
  workspaceId?: string
}

/** One batch of deletions, summarised for the recycle-bin list. */
export interface RecycledBatchSummary {
  batchId: string
  deletedAt: string
  sessionIds: StoredSessionId[]
  bytes: number
  reason?: string
  scope?: RecycleScope
  artifactCount?: number
}

/** One Session currently inside the bin. */
export interface TrashedSessionSummary {
  sessionId: StoredSessionId
  batchId: string
  deletedAt: string
  bytes: number
  container: string
}

/** One message row of a stored transcript. */
export interface TranscriptMessage {
  role: 'user' | 'assistant' | 'tool'
  type: string
  text: string
  time?: number
}

/** Request: move Sessions into the recycle bin. */
export interface SessionRecycleDeleteRequest {
  sessionIds: string[]
  workspaceId?: string
  reason?: string
  /** How much to take with the log; defaults to `record`. */
  scope?: RecycleScope
}

/** Result: the batch that was created. */
export interface SessionRecycleDeleteResult {
  batchId: string
  deletedAt: string
  sessionIds: StoredSessionId[]
  bytes: number
  artifactCount: number
  artifactBytes: number
  releasedArchived: StoredSessionId[]
  detachedFrom: string[]
}

/** Request: put a batch back. */
export interface SessionRecycleUndoRequest {
  batchId?: string
}

/** Result: what came back. */
export interface SessionRecycleUndoResult {
  batchId: string
  restored: StoredSessionId[]
  failed: { sessionId: StoredSessionId; reason: string }[]
  reattached: StoredSessionId[]
  rearchived: StoredSessionId[]
}

/** Result: every batch in the bin, newest first. */
export interface SessionRecycleListResult {
  batches: RecycledBatchSummary[]
  totalBytes: number
  workspacePath?: string
}

/** Request: the retention sweep. */
export interface SessionRecycleSweepRequest {
  maxBatches?: number
  maxAgeDays?: number
}

/** Result: what the sweep removed. */
export interface SessionRecycleSweepResult {
  removedBatches: string[]
  reclaimedBytes: number
}

/** Request: what would deleting this Session take with it. */
export interface SessionRecycleScanRequest {
  sessionId: string
}

/** One file the scan would move. */
export interface SessionRecycleScanArtifact {
  displayPath: string
  bytes: number
  ops: string
}

/** One candidate the scan refused. */
export interface SessionRecycleScanRefusal {
  path: string
  reason: string
}

/** Result: the scan, computed without touching the disk. */
export interface SessionRecycleScanResult {
  sessionId: StoredSessionId
  cwd: string
  storeBytes: number
  directories: number
  artifacts: SessionRecycleScanArtifact[]
  refused: SessionRecycleScanRefusal[]
  artifactBytes: number
  warnings: string[]
}

/** Request: read one stored transcript, live or trashed. */
export interface SessionRecycleTranscriptRequest {
  sessionId: string
  limit?: number
}

/** Result: the readable transcript. */
export interface SessionRecycleTranscriptResult {
  sessionId: StoredSessionId
  found: boolean
  trashed: boolean
  total: number
  toolCalls: number
  messages: TranscriptMessage[]
}

/** Result: every Session currently in the bin. */
export interface SessionRecycleTrashedResult {
  sessions: TrashedSessionSummary[]
}

/** Request: erase one batch for good. */
export interface SessionRecyclePurgeRequest {
  batchId: string
}

/** Result: the bytes a purge freed. */
export interface SessionRecyclePurgeResult {
  batchId: string
  reclaimedBytes: number
}
