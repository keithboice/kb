#!/usr/bin/env node

"use strict";

const cmd = require("yargs/yargs")(process.argv.slice(2))
	.usage("Usage: $0 <command> [options]")
	.command("clean", "Clean out specified artifacts", () => {
		/**
		 * rimraf packages/\**\/dist
		 * @example clean dist
		 * @options unlink, chmod, stat, lstat, rmdir, readdir, unlinkSync, chmodSync, statSync, lstatSync,
		 * rmdirSync, readdirSync
		 *
		 */
		require("child_process").execSync(`rimraf packages/**/dist --config="${config}"`, { stdio: "inherit" });
	})
	.example("$0 clean -g **/*/dist", "Clean out all dist folders throughout the app")
	.alias("g", "glob")
	.nargs("g", 1)
	.describe("g", "glob pattern to clean out")
	.demandOption(["g"])
	.help("h")
	.alias("h", "help")
	.epilog("copyright 2019").argv;

console.log("\n\n\n\n\n\n\n\n\n", cmd._[0]);
