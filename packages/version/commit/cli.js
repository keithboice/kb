#!/usr/bin/env node

"use strict";

/**
 * The kb commit command.  Handles following commitizen standard for git commits.
 * @module @kb/cmd-commit
 * @constructor
 * @example yarn run commit
 * //=> "success!"
 */
const path = require("path");
const bootstrap = require("commitizen/dist/cli/git-cz").bootstrap;

bootstrap({
	cliPath: path.join(__dirname, "../../node_modules/commitizen"),
	// this is new
	config: {
		path: "cz-conventional-changelog",
	},
});
