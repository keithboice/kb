#!/usr/bin/env node
'use strict'

// Dependencies

/**
 *
 * @type {{factory: (function(*): {commands: [PkgCommand]}), name: string}}
 */
module.exports = {
	name: `clean`,
	factory: (require) => {
		/**
		 * @class
		 * @constructor
		 */
		const { Command, PassThrough } = require(`clipanion`)

		class PkgCommand extends Command {
			async execute() {
				this.context.stdout.write(`Running clean\n`)
				this.context.stdout.write(`cwd is ${process.cwd()}\n`)

				// eslint --config lib/.eslintrc.js --ignore-path lib/.cleanignore --quiet --color --cache --fix .
				// "yarn dlx prettier --config packages/clean/lib/.prettierrc.js --ignore-path packages/clean/lib/.cleanignore --ignore-unknown --write . "
				await this.cli
					.run(
						[
							'dlx',
							'prettier',
							'--config packages/clean/lib/.prettierrc.js',
							'--ignore-path packages/clean/lib/.cleanignore',
							'--ignore-unknown',
							'--write',
							'.',
						],
						{}
					)
					.then((r) => Promise.resolve(this.context.stdout.write(`clean is done!\n`)))
			}
		}

		PkgCommand.addPath(`clean`)

		return {
			commands: [PkgCommand],
		}
	},
}
