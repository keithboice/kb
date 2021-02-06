"use strict";

// noinspection JSUnresolvedFunction
/**
 * Common utility methods for kb packages.
 * @module @kb/utils
 * @constructor
 */
module.exports = class Main {
	/**
	 * Creates the Main object class.
	 * @param {object} args
	 * @example new Main({ _arg: 'test', _opt: { val1: 'opt1', val2: 'opt2' }, _quantity: 9 })
	 * //=> { _arg: 'test', _opt: { val1: 'opt1', val2: 'opt2' }, _quantity: 9 }
	 */
	constructor(args) {
		this._args = args;
	}

	/**
	 * @returns {object}
	 * @example new Main()._args
	 * //=> { _arg: 'test', _opt: { val1: 'opt1', val2: 'opt2' }, _quantity: 9 }
	 */
	get args() {
		return module.Main._args;
	}

	/**
	 * @param {object} args
	 * @example new Main()._args({ foo: 'val' })
	 * //=> { foo: 'val' }
	 */
	set args(args) {
		module.Main._args = args;
	}

	/**
	 * Handler method for the Main class.
	 * @returns {{code: number, response: string}} The response object.
	 * @example new Main().handler()
	 * //=> { code: 200, response: 'success' }
	 */
	handler() {
		return { code: 200, response: "success" };
	}

	/**
	 * Prints styled log to the console.
	 * @param {object} args
	 * @returns {{code: number, response: string}}
	 * @example new Main().consoleColor()
	 * //=> { code: 400, response: 'missing required args' }
	 */
	consoleColor(args) {
		if (!args) return { code: 400, response: "missing required args" };

		const chalk = require("chalk");

		console.log(chalk.hex(args.color)(args.message));

		return { code: 200, response: "success" };
	}

	/**
	 * Prints table-formatted log to the console.
	 * @param {object} args The args.
	 * @returns {{code: number, response: string}}
	 * @example new Main()
	 * 	.consoleTable({
	 * 		head: { chars: {'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': ''} },
	 * 		body: {[ 'main', 'appRoot', 'modPath', 'args' ], [ true,
	 *   true, true, 'foo' ]}
	 * 	})
	 * //=> { code: 200, response: 'success' }
	 */
	consoleTable(args) {
		if (!args) return { code: 400, response: "missing required args" };

		const Table = require("cli-table");
		let table = new Table(args.schema).push(args.header, args.body);
		module.Main.consoleColor({ color: "777777", message: table.toString() });

		return { code: 200, response: "success" };
	}

	/**
	 * Checks if a file exists.
	 * @param {string} path
	 * @returns {boolean}
	 * @example new Main().fileExists('index.js')
	 * //=> true
	 */
	fileExists(path) {
		const fs = require("fs");
		return fs.existsSync(path);
	}

	/**
	 * Prints debug data to the console.
	 * @param {object} args
	 * @returns {{code: number, response: string}} The response object.
	 * @example new Main().debug()
	 * //=> { code: 400, response: 'missing required args' }
	 */
	debug(args) {
		if (!args) return { code: 400, response: "missing required args" };

		const tableBody = [
			module.Main.fileExists(args.main),
			module.Main.fileExists(args.appRoot),
			module.Main.fileExists(args.modPath),
			args.argv,
		];
		module.Main.consoleColor({ color: "777777", message: "\n\n\n\t*******  DEBUGGER  *******" });

		module.Main.consoleTable({
			schema: { chars: { mid: "", "left-mid": "", "mid-mid": "", "right-mid": "" } },
			header: ["main", "appRoot", "modPath", `args`],
			body: tableBody,
		});

		return { code: 200, response: "success" };
	}
};
