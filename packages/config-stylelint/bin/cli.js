#!/usr/bin/env node

"use strict";

const path = require("path");
const appRoot = require("app-root-path").toString();
const modPath = path.resolve(appRoot, path.join(__dirname, ".."));
const config = path.resolve(modPath, "src/index.js");
const ignore = path.resolve(modPath, "src/.stylelintignore");

const cmd = require("yargs/yargs")(process.argv.slice(2))
	.usage("Usage: $0 <command> [options]")
	.command("stylelint", "Lint the code base with stylelint", () => {

	  /**
	   * Applies the kb standard config for stylelint.
	   * @module @kb/config-stylelint
	   * @constructor
	   */
	  require("child_process").execSync(
		// stylelint --cache --color --quiet --fix '**/*.{css,scss,sass}'
		`cd "${appRoot}" && npx stylelint --allow-empty-input --formatter compact --cache --config "${config}" --ignore-path "${ignore}" --quiet --color --fix "**/*.{css,scss,sass}" `,
		{ stdio: "inherit" }
	  );
	})
	.example("$0 test ./ -f foo.js", "Test the app from the repository root")
	.alias("f", "file")
	.nargs("f", 1)
	.describe("f", "Load a file")
	.demandOption(["f"])
	.help("h")
	.alias("h", "help")
	.epilog("copyright 2019").argv;

console.log("\n\n\n\n\n\n\n\n\n", cmd._[0]);
