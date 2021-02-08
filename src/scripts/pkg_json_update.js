'use strict'

const fs = require("fs")
const path = require("path")
const DotJson = require('dot-json')

/**
 * $DESCRIPTION.
 * @constructor
 * @param {string} arg The arg value.
 * @param {object} opt The opt value.
 * @param {number} quantity The quantity value.
 * @returns {Promise} The response object.
 * @example main('test', { val1: 'opt1', val2: 'opt2' }, 9)
 * //=> { code: 200, response: 'success' }
 */
const appRoot = path.join("../../", 'packages').toString();

const dirs = fs.readdirSync(path.join(appRoot, 'packages'))
	.filter(dir => fs.existsSync(path.join(appRoot, dir)) && fs.statSync(path.join(appRoot, dir)).isDirectory);

dirs.forEach(dir => {
	const pkg = path.join(appRoot, dir, "package.json")
	
	if (fs.existsSync(pkg)) {
		const pkgJson = new DotJson(pkg)
		const bin = dir.replace("cmd-","")
		//
		pkgJson
			.set(`bin.${bin}`, 'dist/cli.js')
			.set('files', ["dist/**"])
			.set('main', ["dist/index.js"])
			.set('license', ["MIT"])
			.save(function(){
				console.log('saved');
		});
	}
})

