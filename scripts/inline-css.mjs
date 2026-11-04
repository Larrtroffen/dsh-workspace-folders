#!/usr/bin/env node
/**
 * Folds the emitted side-car stylesheet back into `lib/client.js`.
 *
 * `@tsdown/css` always writes CSS modules to a separate file and leaves an ESM
 * side-effect import (`import './style.css'`) in the JS output. Neither form
 * works for a dsh client bundle: the host hands the bundle to
 * `window.__ModuleLoader__.load({ factory })` with a CommonJS `require` and no
 * CSS loader, so a side-car sheet never reaches the document and the bare ESM
 * import is not even valid inside the factory envelope.
 *
 * The shipped artifact therefore inlines each sheet as a single
 * `<style data-plugin-css>` tag guarded by a presence check, keyed by the
 * stylesheet's original path. This script reproduces that shape:
 *
 *   1. read the emitted `lib/style.css`,
 *   2. strip the `import '<sheet>'` statement the bundler left behind,
 *   3. splice an injection block after the module preamble so the style lands
 *      before any component renders.
 *
 * The scoped class names are already baked into the JS as the CSS-module
 * default export, so nothing else needs rewriting.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Resolve against the build root rather than the caller's cwd, so the script
// behaves the same whether it is run from the package root or a parent shell.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const clientPath = path.join(root, 'lib', 'client.js')
const stylePath = path.join(root, 'lib', 'style.css')
const packageName = 'dsh-workspace-folders'

if (!fs.existsSync(clientPath)) throw new Error(`missing build output: ${clientPath}`)
if (!fs.existsSync(stylePath)) {
  console.log('inline-css: no lib/style.css emitted; nothing to inline')
  process.exit(0)
}

let js = fs.readFileSync(clientPath, 'utf8')
const css = fs.readFileSync(stylePath, 'utf8')

// 1. Drop the ESM side-effect import the bundler emitted. It is invalid inside
//    the CommonJS factory envelope and the CSS is about to be inlined anyway.
const importPattern = /^\s*import\s+['"][^'"]*\.css['"];?\s*$/gm
const removed = js.match(importPattern) ?? []
js = js.replace(importPattern, '')

// 2. Splice the injection right after the factory preamble so the stylesheet is
//    installed as soon as the module is materialised.
const tagId = `${packageName}/style.css`
const injection = `
	// Inlined from lib/style.css by scripts/inline-css.mjs.
	(() => {
		const css = ${JSON.stringify(css)};
		const tagId = ${JSON.stringify(tagId)};
		if (typeof document !== 'undefined' && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = ${JSON.stringify(packageName)};
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
	})();
`

const anchor = 'var exports = module.exports;'
const at = js.indexOf(anchor)
if (at < 0) throw new Error('could not find the factory preamble to anchor the injection')
js = js.slice(0, at + anchor.length) + '\n' + injection + js.slice(at + anchor.length)

fs.writeFileSync(clientPath, js)
fs.rmSync(stylePath)

console.log(
  `inline-css: inlined ${css.length} bytes of CSS, removed ${removed.length} import(s), ` +
    `client.js is now ${js.length} bytes`,
)
