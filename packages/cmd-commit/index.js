"use strict";

// noinspection JSUnresolvedFunction
/**
 * Git commit handler.  Ensures adherence to Angular conventional commit standards.
 * @module @kb/cmd-commit
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
};
