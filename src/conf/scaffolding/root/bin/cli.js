#!/usr/bin/env node

"use strict";

// Dependencies
const lib = require("../lib");
const { Command } = require("commander");
const program = new Command();

/**
 *  /Users/dkb/.npm-packages/lib/node_modules/yarn/bin/yarn.js node "/Users/dkb/Library/Mobile Documents/com~apple~CloudDocs/repos/packages/packages/{{name}}/index.js"
 *
 *   yarn node "./{{name}}" {{name}}
 *
 */
program
	.name("{{name}}")
	.command("{{name}}", { isDefault: true })
	.description("{{description}}")
	.action(() => {
		console.log("running {{name}}");
		lib.main("repo docs", { pkgRoot: null }, 0)
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
