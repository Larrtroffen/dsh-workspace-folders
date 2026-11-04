# Build notes

The published package ships prebuilt `lib/` (Host ESM + `lib/client.js`), so only maintainers
need these steps.

```sh
npm install --legacy-peer-deps

# Web/Client half: packages/client/ui-session-categories -> lib/client.js (+ style.css)
npm run build                 # tsdown, config: tsdown.config.ts

# Fold the emitted CSS module stylesheet into the client bundle
node scripts/inline-css.mjs

# Contract checks: script syntax, ModuleLoader envelope, CSS inlined, required externals
node scripts/verify-build.cjs

# Typert manifest check: every descriptor is well-formed for dsh-typert-loader
node scripts/verify-typert-manifest.mjs

# Host half (only when packages/workspace/session-categories changes)
npx tsdown --config tsdown.host.config.ts
```

Notes:

- `lib/` is committed; there is no build step for users.
- The client bundle id must equal the npm package name (the loader resolves the factory by it).
- The Typert manifest package name and `typeSymbol` prefixes must match the package name too;
  `scripts/verify-typert-manifest.mjs` reads the name from `package.json`.
- `dsh-typert-loader` caches verdicts for the life of the Host process: after changing the
  package name, restart DSH before expecting the Remote namespace to mount.
