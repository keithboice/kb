"use strict";

/**
 * The cmd-commit command.
 * @module @kb/cmd-commit
 * @constructor
 */
module.exports = {
	/**
	 * Creates the cmd-commit command.
	 * @constructor
	 * @param {string} arg The arg value.
	 * @param {object} opt The opt value.
	 * @param {number} quantity The quantity value.
	 * @returns {Promise} The cmd-commit command.
	 * @example this
	 * //=> { command: name }
	 */
	name: "cmd_cmd-commit",
	factory: (require) => {
		const { Command } = require(`clipanion`);
		const { Yarn } = require(`@yarnpkg/core`);

		/**
		 * Command handler class.
		 * @module @kb/cmd_cmd-commit
		 * @constructor
		 */
		class CmdHandler extends Command {
			/**
			 * Create a...
			 */
			async execute() {
				this.context.stdout.write(`Starting cmd-commit\n`);

				await this.cli.run(["yarn", "run", "cmd-commit"]);

				this.context.stdout.write(`Finishing cmd-commit\n`);
			}
		}

		CmdHandler.addPath(`cmd-commit`);

		CmdHandler.usage = Command.Usage({
			description: `@kb {%= name %}`,
			details: `{%= description %}`,
			examples: [[`Run the command`, `yarn {%= name %}`]],
		});

		return {
			commands: [CmdHandler],
		};
	},
};