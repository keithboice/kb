#!/usr/bin/env node

"use strict";

//const Utils = require("../../utils/src/index");

const path = require("path");
const appRoot = require("app-root-path").toString();
const modPath = path.resolve(appRoot, path.join(__dirname, ".."));
const config = path.resolve(modPath, "src/index.js");
//const fs = require("fs");
//const main = require("require-main-filename")();

const cmd = require("yargs/yargs")(process.argv.slice(2))
	.usage("Usage: $0 <command> [options]")
	.command("test", "Jest test the app", () => {
		/**
		 *
		 * @example jest my-test --notify --config=config.json
		 */
		require("child_process").execSync(`npx jest -o --config="${config}"`, { stdio: "inherit" });

		//const utils = new Utils({});
		//utils.debug({ main: main,appRoot: appRoot, modPath: modPath, argv: argv });
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
