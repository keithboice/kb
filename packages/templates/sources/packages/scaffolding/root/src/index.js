"use strict";

/**
 * Class representing a {{name}}.
 * @module @kb/{{name}}
 * @constructor
 */
module.exports = class Main {
	/**
	 * Creates the Main object class.
	 * @constructor
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
	 * @constructor
	 * @returns {string}
	 * @example new Main('test', { val1: 'opt1', val2: 'opt2' }, 9)._arg
	 * //=> 'test'
	 */
	get arg() {
		return this._arg;
	}

	/**
	 * @constructor
	 * @param {string} value
	 * @example new Main('new arg val', { val1: 'opt1', val2: 'opt2' }, 9)._arg
	 * //=> 'new arg val'
	 */
	set arg(value) {
		this._arg = value;
	}

	/**
	 * @constructor
	 * @returns {Object}
	 * @example new Main('test', { val1: 'opt1', val2: 'opt2' }, 9)._opt
	 * //=> '{ val1: 'opt1', val2: 'opt2' }'
	 */
	get opt() {
		return this._opt;
	}

	/**
	 * @constructor
	 * @param {Object} value
	 * @example new Main('test', { val1: 'new val1', val2: 'new val2' }, 9)._opt
	 * //=> { val1: 'new val1', val2: 'new val2' }
	 */
	set opt(value) {
		this._opt = value;
	}

	/**
	 * @constructor
	 * @returns {number}
	 * @example new Main('new arg val', { val1: 'opt1', val2: 'opt2' }, 9)._quantity
	 * //=> 9
	 */
	get quantity() {
		return this._quantity;
	}

	/**
	 * @constructor
	 * @param {number} value
	 * @example new Main('test', { val1: 'new val1', val2: 'new val2' }, 9)._quantity
	 * //=> { val1: 'new val1', val2: 'new val2' }
	 */
	set quantity(value) {
		this._quantity = value;
	}

	/**
	 * @constructor
	 * Convert a string containing into a point.
	 * @param {string} str The string to convert.
	 * @return {number} A number.
	 * @example new Main('test', { val1: 'opt1', val2: 'opt2' }, 9).fromString('9')
	 * //=> 9
	 */
	static fromString(str) {
		return Number(str);
	}

	/**
	 * @method
	 * @constructor
	 * Does this and that and this.
	 * @param {object} arg The arg.
	 * @returns {{code: number, response: string}} The response object.
	 * @example new Main('test', { val1: 'opt1', val2: 'opt2' }, 9).aMethod('test')
	 * //=> true
	 */
	aMethod(arg) {
		if (!arg) return { code: 400, response: "missing required arguments" };

		return { code: 200, response: "success" };
	}
};
