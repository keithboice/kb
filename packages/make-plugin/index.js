"use strict";

// Dependencies
const lib = require("./main.js");

module.exports = {
	name: `commit`,
	factory: (require) => {
		const { Command } = require(`clipanion`);

		class PkgCommand extends Command {
			async execute() {
				this.context.stdout.write(`This is my very own commit plugin\n`);

				lib.main("make docs", { pkgRoot: null }, 0)
					.then(() => this.context.stdout.write(`\nAll done!`))
					.catch((err) => this.context.stdout.write(`\nError: ${err}`));
			}
		}

		PkgCommand.addPath(`commit`);

		return {
			commands: [PkgCommand],
		};
	},
};
