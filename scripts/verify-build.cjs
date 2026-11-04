/**
 * Validates the freshly built client bundle before it is installed.
 *
 * Three things have to hold for the dsh web host to load the bundle:
 *   1. it parses as a script,
 *   2. evaluating it registers a factory through `window.__ModuleLoader__`,
 *   3. the stylesheet travels inside the bundle rather than as a side-car.
 *
 * The factory itself is not invoked here: it reaches for React and the dsh
 * client services through `require`, which only the live host can satisfy.
 */
const fs = require('node:fs')
const vm = require('node:vm')
const path = require('node:path')

const target = path.join(__dirname, '..', 'lib', 'client.js')
const source = fs.readFileSync(target, 'utf8')

let failed = false

try {
  new vm.Script(source, { filename: 'client.js' })
  console.log('SYNTAX      : OK')
} catch (error) {
  console.log('SYNTAX      : FAIL -', error.message)
  failed = true
}

let captured
const sandbox = {
  window: { __ModuleLoader__: { load(entry) { captured = entry } } },
  document: undefined,
  console,
}
vm.createContext(sandbox)
try {
  vm.runInContext(source, sandbox, { filename: 'client.js' })
  if (captured === undefined) {
    console.log('LOADER      : FAIL - no __ModuleLoader__.load call')
    failed = true
  } else {
    console.log(`LOADER      : OK - id=${captured.id} factory=${typeof captured.factory}`)
  }
} catch (error) {
  console.log('LOADER      : FAIL -', error.message)
  failed = true
}

const inlineCss = source.includes('data-plugin-css')
console.log(`CSS INLINE  : ${inlineCss ? 'OK' : 'FAIL - stylesheet left as a side-car'}`)
if (!inlineCss) failed = true

const sideCar = fs.existsSync(path.join(__dirname, '..', 'lib', 'style.css'))
console.log(`SIDE-CAR    : ${sideCar ? 'FAIL - lib/style.css still present' : 'OK - none emitted'}`)
if (sideCar) failed = true

const requires = [...source.matchAll(/require\("([^"]+)"\)/g)].map((m) => m[1])
const unique = [...new Set(requires)].sort()
console.log(`REQUIRES    : ${unique.join(', ')}`)

console.log(`SIZE        : ${source.length} bytes`)
process.exit(failed ? 1 : 0)
