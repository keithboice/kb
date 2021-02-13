const main = require( './index.js')
const bin = require( './cli.js')
const conf = require('./conf.js')

/**
 * @test
 */

const shell = require('shelljs')

/**
 * Tests if requires return as expected.
 */
console.log(`main: ${typeof main === 'object'}`)
console.log(`bin: ${typeof bin === 'object'}`)
console.log(`conf: ${typeof conf === 'object'}`)

/**
 * Tests if command is registered.
 */
if (!shell.which('build')) {
	shell.echo('Sorry, this script requires git')
	shell.exit(1)
}

/**
 * Tests if commands execute and return exit code of 0 as expected.
 */
if (shell.exec('./cli.js build ./').code !== 0) {
	shell.echo('Error: Failed')
	shell.exit(1)
}

if (shell.exec('npm run build').code !== 0) {
	shell.echo('Error: Failed')
	shell.exit(1)
}

if (shell.exec('rollup --config conf.js').code !== 0) {
	shell.echo('Error: Failed')
	shell.exit(1)
}
