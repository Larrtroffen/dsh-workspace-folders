import { defineConfig } from 'tsdown'
import { transform } from 'esbuild'

const PACKAGE_NAME = 'dsh-workspace-folders'

/**
 * Lower TypeScript stage-3 decorators before the bundler parses the module.
 *
 * The service marks its Remote methods with `@Remote('name')`. Rolldown's
 * built-in TypeScript transform leaves decorators untouched, so without this
 * pass the emitted `lib/index.js` still contains raw `@Remote(...)` syntax and
 * the Node ESM loader rejects the file outright. esbuild already implements
 * the lowering, so the plugin runs the source through it first.
 */
function decoratorsPlugin() {
  return {
    name: 'dsh-session-categories:decorators',
    transform(code: string, id: string) {
      if (!id.endsWith('.ts') || !code.includes('@Remote')) return null
      return transform(code, {
        loader: 'ts',
        format: 'esm',
        target: 'es2024',
        tsconfigRaw: { compilerOptions: { experimentalDecorators: false, useDefineForClassFields: true } },
      })
    },
  }
}

/**
 * Builds the Host half of the session-categories plugin.
 *
 * The Host face owns the Cordis service, the storage-domain document, and the
 * typert Remote surface the Web client talks to. Unlike the client bundle it
 * is ordinary Node ESM: the harness loads it through the plugin row, so the
 * dsh packages stay external and are resolved from the running installation
 * rather than bundled.
 *
 * `lib/index.js` keeps the retired `@deepseek-ai/dsh-client-runtime` name out
 * of its imports (that package no longer exists) and its generated codec
 * entries must carry `create: () =>` factories rather than bare `schema`
 * fields. Both are properties of the source now, not of a patch applied to the
 * emitted file.
 */
export default defineConfig({
  name: `${PACKAGE_NAME}/host`,
  // The upstream package tsconfig extends a monorepo base that is absent from
  // the standalone repository, so this build carries its own.
  tsconfig: 'tsconfig.host.json',
  // The service decorates its Remote methods with `@Remote('name')`; see the
  // plugin above for why they must be lowered before the bundle is parsed.
  plugins: [decoratorsPlugin()],
  entry: {
    index: 'packages/workspace/session-categories/src/index.ts',
    invariant: 'packages/workspace/session-categories/src/invariant.ts',
    spec: 'packages/workspace/session-categories/src/spec.ts',
    types: 'packages/workspace/session-categories/src/types.ts',
  },
  outDir: 'lib',
  format: 'esm',
  platform: 'node',
  target: 'es2024',
  fixedExtension: false,
  dts: false,
  clean: false,
  sourcemap: false,
  // The harness resolves every @deepseek-ai package from its own install tree,
  // and the generated types file is loaded by path rather than bundled.
  external: [/^@deepseek-ai\//, /^node:/],
  outputOptions: {
    entryFileNames: '[name].js',
  },
})
