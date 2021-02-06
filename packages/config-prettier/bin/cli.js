#!/usr/bin/env node

"use strict";

const path = require("path");
const appRoot = require("app-root-path").toString();
const modPath = path.resolve(appRoot, path.join(__dirname, ".."));
const config = path.resolve(modPath, "src/index.js");
const ignore = path.resolve(modPath, "src/.prettierignore");

const cmd = require("yargs/yargs")(process.argv.slice(2))
  .usage("Usage: $0 <command> [options]")
  .command("prettier", "Fix code style with prettier", () => {

	/**
	 * Applies the kb standard config for prettier.
	 * @module @kb/config-prettier
	 * @constructor
	 */
	require('child_process').execSync(
	  `cd "${appRoot}" && npx prettier -c "${config}" --ignore-path "${ignore}" --color --write .`,
	  { stdio: 'inherit' }
	)
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
