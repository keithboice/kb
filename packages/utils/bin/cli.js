#!/usr/bin/env node
"use strict";

const cmd = require("yargs/yargs")(process.argv.slice(2))
	.usage("Usage: $0 <command> [options]")
	.command("utils", "not active", () => {
		console.log("not active");
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
