/**
 * Loads the patched typert manifest the way the harness would.
 *
 * The manifest is what `dsh-typert-loader` reads to decide which Remote
 * methods a plugin may expose. A malformed descriptor does not fail quietly:
 * the loader rejects the package and the affected face never mounts, so the
 * check has to happen before the file is installed rather than after a
 * restart.
 *
 * This script imports the manifest as a module, walks every descriptor, and
 * asserts the invariants the loader relies on — a well-formed id, a service
 * and method name, and codecs that expose `create()` returning a schema (the
 * shape the current protocol requires rather than a bare `schema` field).
 *
 * Run: node scripts/verify-typert-manifest.mjs [path-to-manifest]
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const target = process.argv[2] ?? path.join(root, 'lib', 'typert.remote-client.js')
/** The install name this package publishes under; kept in one place. */
const PACKAGE_NAME = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8')).name

const problems = []
const note = (message) => problems.push(message)

let manifest
try {
  const loaded = await import(pathToFileURL(target).href)
  manifest = loaded.default ?? loaded.TYPERT_REMOTE
} catch (error) {
  console.error(`FAIL  the manifest could not be imported: ${error.message}`)
  process.exit(1)
}

if (manifest === undefined) {
  console.error('FAIL  the module exports no Remote manifest')
  process.exit(1)
}

console.log(`manifest package : ${manifest.package}`)
if (manifest.package !== PACKAGE_NAME) {
  note(`package name must be the bare install name, saw ${JSON.stringify(manifest.package)}`)
}

const descriptors = manifest.descriptors
if (!Array.isArray(descriptors)) {
  console.error('FAIL  descriptors is not an array')
  process.exit(1)
}
console.log(`descriptors      : ${descriptors.length}`)

const seen = new Set()
for (const descriptor of descriptors) {
  const label = descriptor?.id ?? '(missing id)'

  if (typeof descriptor?.id !== 'string' || !descriptor.id.includes('#')) {
    note(`${label}: id must be "<package>#<service>/<method>"`)
    continue
  }
  if (seen.has(descriptor.id)) note(`${label}: duplicate descriptor id`)
  seen.add(descriptor.id)

  if (descriptor.service !== 'sessionCategories') note(`${label}: unexpected service ${descriptor.service}`)
  if (typeof descriptor.method !== 'string' || descriptor.method === '') note(`${label}: missing method name`)
  if (!descriptor.id.endsWith(`/${descriptor.method}`)) note(`${label}: id does not end with the method name`)
  if (descriptor.invocation?.kind !== 'direct') note(`${label}: invocation.kind should be "direct"`)

  for (const parameter of descriptor.parameters ?? []) {
    const codec = parameter?.codec
    if (codec === undefined) {
      note(`${label}: parameter ${parameter?.name} has no codec`)
      continue
    }
    // The current protocol requires a lazy factory; a bare `schema` field is
    // the retired pre-release shape and the loader rejects it.
    if (typeof codec.create !== 'function') {
      note(`${label}: parameter codec must expose create() (saw ${Object.keys(codec).join(', ')})`)
      continue
    }
    let schema
    try {
      schema = codec.create()
    } catch (error) {
      note(`${label}: parameter codec create() threw: ${error.message}`)
      continue
    }
    if (typeof schema?.parse !== 'function') {
      note(`${label}: parameter codec create() did not return a schema`)
    }
    if (codec.typeSymbol !== undefined && !codec.typeSymbol.startsWith(`${PACKAGE_NAME}/types#`)) {
      note(`${label}: parameter typeSymbol must name this package's types entry`)
    }
  }

  const result = descriptor.result
  if (result === undefined) {
    note(`${label}: missing result codec`)
    continue
  }
  if (typeof result.create !== 'function') {
    note(`${label}: result codec must expose create()`)
    continue
  }
  try {
    const schema = result.create()
    if (typeof schema?.parse !== 'function') note(`${label}: result codec create() did not return a schema`)
  } catch (error) {
    note(`${label}: result codec create() threw: ${error.message}`)
  }
}

// The four recycle methods are authored by hand, so verify they survived the
// injection rather than trusting the count above.
const EXPECTED = ['deleteSessions', 'undoDeleteSessions', 'listRecycledSessions', 'sweepRecycledSessions']
for (const method of EXPECTED) {
  if (!descriptors.some(descriptor => descriptor.method === method)) note(`missing descriptor for ${method}`)
}

// Exercise one recycle schema end to end: the round trip is what the client
// actually relies on, and it catches a schema that parses but describes the
// wrong shape.
const deleteDescriptor = descriptors.find(descriptor => descriptor.method === 'deleteSessions')
if (deleteDescriptor !== undefined) {
  const requestSchema = deleteDescriptor.parameters?.[0]?.codec?.create()
  const resultSchema = deleteDescriptor.result?.create()
  try {
    requestSchema.parse({ sessionIds: ['session-x'], workspaceId: 'ws-1' })
    console.log('round trip       : deleteSessions request accepted')
  } catch (error) {
    note(`deleteSessions request rejected a valid payload: ${error.message}`)
  }
  try {
    resultSchema.parse({
      ok: true,
      value: {
        batchId: 'b',
        deletedAt: '2026-10-17T00:00:00.000Z',
        sessionIds: ['session-x'],
        bytes: 10,
        artifactCount: 0,
        artifactBytes: 0,
        releasedArchived: [],
        detachedFrom: [],
      },
    })
    console.log('round trip       : deleteSessions success accepted')
  } catch (error) {
    note(`deleteSessions success result rejected a valid payload: ${error.message}`)
  }
  try {
    resultSchema.parse({ ok: false, error: { code: 'session-log-not-found', sessionId: 'session-x' } })
    console.log('round trip       : deleteSessions failure accepted')
  } catch (error) {
    note(`deleteSessions failure result rejected a valid payload: ${error.message}`)
  }
}

if (problems.length > 0) {
  console.error(`\n${problems.length} problem(s):`)
  for (const problem of problems) console.error(`  - ${problem}`)
  process.exit(1)
}

console.log('\nTYPTERT_MANIFEST_OK')
