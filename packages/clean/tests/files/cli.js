const fs = require(`fs`);
const util = require(`util`);
// Const clean = require(`clean`);

module.exports = {
	name: "clean",
	factory: (require) => {
		const { Command } = require(`clipanion`);
		const { structUtils } = require(`@yarn/core`);

		// Const yup = require(`yup`);
		// const { Project } = require(`@yarn/core`);
		// const { Essentials } = require("@yarn/plugin-essentials");

		// const project = new Project();
		// const parent = project.topLevelWorkspace;

		// Need to set cwd to top level workspace and then run custom commands.

		// essentials.executeWorkspaceScript("@kb-clean", "eslint", null, {});

		class CmdClean extends Command {
			async execute() {
				this.context.stdout.write(`Starting code lint and clean process �\n`);
				await this.cli.run(["yarn", "run", "eslint", "."]);
				this.context.this.context.stdout.write("The project root is" + cwd + "\n");
			}
		}

		CmdClean.addPath(`doClean`);

		CmdClean.usage = Command.Usage({
			description: `@kb clean`,
			details: `This command will lint and style all code in the project.  It uses preconfigured rules and config
			from various linters, prettier, and other tools.  It works with javascript, typescript, frontend, backend, html,
			css, yaml, json, md and more!`,
			examples: [[`Run the command at any time`, `yarn clean --all`]],
		});

		return {
			commands: [CmdClean],
		};
	},
};
