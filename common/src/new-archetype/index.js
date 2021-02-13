"use strict";

/**
 * Scaffolds new builder archetypes
 * @module
 * @constructor
 */
module.exports = class Main {
	/**
	 * Creates the Main object class.
	 * @param {string} name
	 * @example new Main('foo')
	 * //=> 'foo'
	 *
	 */
	constructor(name) {
		this._name = name;
	}

	/**
	 * @returns {string}
	 * @example new Main()._name
	 * //=> 'foo'
	 *
	 */
	get name() {
		return module.Main._name;
	}

	/**
	 * @param {string} name
	 * @example new Main()._name({ foo: 'val' })
	 * //=> 'foo'
	 */
	set name(name) {
		module.Main._name = name;
	}

	/**
	 * Handler method for the Main class.
	 * @params {string} name
	 * @returns {{code: number, response: string}} The response object.
	 * @example new Main().handler()
	 * //=> { code: 200, response: "success" }
	 *
	 */
	handler(name) {
		const shell = require("shelljs");
		const path = require("path");

		// cd to archetypes root
		const rootPath = path.resolve("../");
		shell.cd(rootPath);

		// make new archetype dir
		const archPath = path.resolve(rootPath, name);
		shell.mkdir(archPath);
		shell.cd(archPath);

		//$ cd path/to/new/archetype
		if (shell.exec('git commit -am "Auto-commit"').code !== 0) {
			shell.echo("Error: Git commit failed");
			shell.exit(1);
		}
		//$ npm init
		//$ npm link

		return { code: 200, response: "success" };
	}
};
