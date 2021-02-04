"use strict";

// Dependencies
const lib = require("../lib/main");
const { Command } = require("commander");
const program = new Command();

/**
 *  /Users/dkb/.npm-packages/lib/node_modules/yarn/bin/yarn.js node "/Users/dkb/Library/Mobile Documents/com~apple~CloudDocs/repos/packages/packages/repo-docs/index.js"
 *
 *   yarn node "./make-docs" make-docs
 *
 */
program
	.name("make-docs")
	.command("make-docs", { isDefault: true })
	.description("Generates all repo docs prior to commit")
	.action(() => {
		console.log("running make-docs");
		lib.main("make docs", { pkgRoot: null }, 0)
			.then(() => {
				console.log("success!");
			})
			.catch((err) => {
				console.error(err);
			});
	});

program.parse(process.argv);

//console.log('Options: ', program.opts());
//console.log('Arguments: ', program.args);
