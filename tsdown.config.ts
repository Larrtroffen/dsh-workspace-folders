import { defineConfig } from 'tsdown'
import path from 'node:path'

const PACKAGE_NAME = 'dsh-workspace-folders'

/**
 * Builds the Web client bundle for the session-categories plugin.
 *
 * Mirrors the module-loader envelope used by the shipped client bundles: the
 * emitted `lib/client.js` assigns itself into
 * `window.__ModuleLoader__.load({ id, factory })` so the dsh web host can
 * materialise it without a bundler on its side.
 *
 * CSS Modules scoping is auto-detected through `@tsdown/css`. That plugin
 * always emits a side-car stylesheet, so `inject: true` keeps the JS pointing
 * at it; `scripts/inline-css.mjs` then folds that stylesheet back into
 * `lib/client.js` as the runtime `<style>` injection the host expects.
 *
 * `clsx` is deliberately absent from `external`: the host's module loader only
 * resolves the peer packages named in the plugin's `inject` list, so a small
 * pure-JS helper like `clsx` has to travel inside the bundle. The shipped
 * artifact bundles it the same way.
 */
export default defineConfig({
  name: `${PACKAGE_NAME}/client`,
  entry: { client: 'packages/client/ui-session-categories/src/client/index.ts' },
  tsconfig: 'tsconfig.client.json',
  outDir: 'lib',
  format: 'cjs',
  platform: 'browser',
  target: 'es2022',
  fixedExtension: false,
  dts: false,
  clean: false,
  sourcemap: true,
  css: { inject: true },
  // The host's module loader resolves only the peer packages named in the
  // plugin's `inject` list. Everything else the bundle needs — the `clsx`
  // class-name helper and the `zod` validators inside the generated typert
  // Remote namespace — therefore has to travel inside the bundle, exactly as
  // the shipped artifact does.
  deps: { alwaysBundle: ['clsx', 'zod'] },
  // The generated typert Remote namespace lives outside the source graph. The
  // shipped artifact carries it inside `lib/client.js` as a literal
  // `TYPERT_REMOTE` object rather than resolving the package export at load
  // time, so the alias below points the import at the generated module and
  // lets the bundler fold it (and zod) into the bundle.
  alias: {
    // The source imports the namespaced specifier; map both spellings so the
    // alias survives whichever prefix the source tree carries.
    '@deepseek-ai/dsh-session-categories/remote': path.resolve(
      'packages/client/ui-session-categories/src/typert.remote-client.js',
    ),
    'dsh-session-categories/remote': path.resolve(
      'packages/client/ui-session-categories/src/typert.remote-client.js',
    ),
  },
  external: [
    'react',
    'react/jsx-runtime',
    'react-dom',
    'react-dom/client',
    '@deepseek-ai/cordis',
    '@deepseek-ai/dsh-client-locale',
    '@deepseek-ai/dsh-client-locale/client',
    '@deepseek-ai/dsh-client-store',
    '@deepseek-ai/dsh-client-ui-conversation',
    '@deepseek-ai/dsh-client-ui-conversation/client',
    '@deepseek-ai/dsh-client-ui-primitives',
    '@deepseek-ai/dsh-client-ui-sidebar',
    '@deepseek-ai/dsh-client-ui-sidebar/client',
    '@deepseek-ai/dsh-client-ui-slots',
    '@deepseek-ai/dsh-api-gateway',
    '@deepseek-ai/dsh-api-gateway/client',
  ],
  outputOptions: {
    entryFileNames: 'client.js',
    banner: `window.__ModuleLoader__.load({ id: ${JSON.stringify(PACKAGE_NAME)}, factory: (require) => {`,
    footer: 'return module.exports; } });',
    intro: 'var module = { exports: {} }; var exports = module.exports;',
  },
})
