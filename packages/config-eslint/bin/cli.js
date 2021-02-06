#!/usr/bin/env node

"use strict";

const path = require("path");
const appRoot = require("app-root-path").toString();
const modPath = path.resolve(appRoot, path.join(__dirname, ".."));
const config = path.resolve(modPath, "src/index.js");
const ignore = path.resolve(modPath, "src/.eslintignore");

const cmd = require("yargs/yargs")(process.argv.slice(2))
	.usage("Usage: $0 <command> [options]")
	.command("eslint", "Lint the code base with ESLint", () => {

	  /**
	   * Applies the kb standard config for eslint.
	   * @module @kb/config-eslint
	   * @constructor
	   */
	  require("child_process").execSync(
		`cd "${appRoot}" && npx eslint -c "${config}" --ignore-path "${ignore}" --quiet --color --fix .`,
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
