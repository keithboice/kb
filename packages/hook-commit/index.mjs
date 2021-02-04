"use strict";

/**
 * $DESCRIPTION.
 * @module @kb/${NAME}
 * @constructor
 */
module.exports = class Main {
	/**
	 * Creates the Main object class.
	 * @param {string} arg The arg value.
	 * @param {object} opt The opt value.
	 * @param {number} quantity The quantity value.
	 * @example new Main('test', { val1: 'opt1', val2: 'opt2' }, 9)
	 * //=> { _arg: 'test', _opt: { val1: 'opt1', val2: 'opt2' }, _quantity: 9 }
	 */
	constructor(arg, opt, quantity) {
		this._arg = arg;
		this._opt = opt;
		this._quantity = quantity;
	}

	/**
	 * @returns {string}
	 * @example new Main('test', { val1: 'opt1', val2: 'opt2' }, 9)._arg
	 * //=> 'test'
	 */
	get arg() {
		return this._arg;
	}

	/**
	 * @param {string} value
	 * @example new Main('new arg val', { val1: 'opt1', val2: 'opt2' }, 9)._arg
	 * //=> 'new arg val'
	 */
	set arg(value) {
		this._arg = value;
	}

	/**
	 * Static helper for the Main class.
	 * @param {string} str The string to convert.
	 * @return {number} A number.
	 * @example new Main('test', { val1: 'opt1', val2: 'opt2' }, 9).fromString('9')
	 * //=> 9
	 */
	static helper(str) {
		return Number(str);
	}

	/**
	 * Handler method for the Main class.
	 * @param {object} arg The arg..
	 * @returns {{code: number, response: string}} The response object.
	 * @example new Main('test', { val1: 'opt1', val2: 'opt2' }, 9).aMethod('test')
	 * //=> { code: 200, response: 'success' }
	 */
	handler(arg) {
		if (!arg) return { code: 400, response: "missing required arguments" };

		return { code: 200, response: "success" };
	}
};