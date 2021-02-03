"use strict";

// Dependencies
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const { readdirSync, statSync } = require("fs");

// Paths
console.log("got to approot");
const appRoot = require("app-root-path").toString();
console.log("got to pkgRoot");
const pkgRoot = path.join(appRoot, "packages").toString();
console.log("got to tmpltRoot");
const tmpltRoot = path.join(pkgRoot, "templates", "sources").toString();

// Objects
const templates = {
	packages: {
		readme: path.resolve(tmpltRoot, "package-readme.md.template"),
		package_json: path.resolve(tmpltRoot, "package-package.json.template"),
	},
	mono: {
		readme: path.resolve(tmpltRoot, "mono-readme.md.template"),
		package_json: path.resolve(tmpltRoot, "mono-package.json.template"),
	},
	license: path.resolve(tmpltRoot, "LICENSE"),
};

/**
 * Generates boilerplate repository docs prior to each new commit.
 * @module @kb/repo-docs
 * @constructor
 */
const lib = {
	/**
	 * Generates github repository docs for mono, packages, etc. prior to each new commit.
	 * @constructor
	 * @param {string} arg The arg value.
	 * @param {object} opt The opt value.
	 * @param {number} quantity The quantity value.
	 * @returns {Promise} The response object.
	 * @example main('test', { val1: 'opt1', val2: 'opt2' }, 9)
	 * //=> { code: 200, response: 'success' }
	 */
	main: (arg, opt, quantity) => {
		return new Promise(async (resolve, reject) => {
			if (!arg) return reject({ code: 400, response: `missing required arguments` });

			console.log("got to lists");
			// Lists
			const dirs = readdirSync(path.join(appRoot, "packages")).filter(
				(dir) => fs.existsSync(path.join(pkgRoot, dir)) && statSync(path.join(pkgRoot, dir)).isDirectory
			);

			console.log("got to register blocks");
			lib.registerBlocks()
				.then(() => {
					console.log("got to packages");
					lib.packages(dirs)
						.then(() => {
							console.log("packages done");
						})
						.catch((err) => console.error("error in packages" + err));
					lib.mono(appRoot, templates.mono.readme, "README.md")
						.then(() => console.log("mono done"))
						.catch((err) => console.error("error in mono" + err));
				})
				.catch((err) => console.error("error in registerBlocks" + err));

			return resolve({ code: 200, response: "success", arg: arg, opt: opt, quantity: quantity });
		});
	},

	/**
	 *
	 * @returns {Promise<unknown>}
	 */
	registerBlocks: () => {
		return new Promise(async function (resolve) {
			const blocksRoot = path.join(tmpltRoot, "blocks").toString();

			// Blocks list
			const blocks = readdirSync(blocksRoot).filter(
				(block) => fs.existsSync(path.join(blocksRoot, block)) && statSync(path.join(blocksRoot, block)).isFile
			);

			return resolve(
				await blocks.forEach((block) => {
					const name = block.split(".")[0];

					handlebars.registerPartial(
						name,
						`${fs.readFileSync(path.resolve(tmpltRoot, "blocks", name + ".md"))}`
					);
				})
			);
		});
	},

	/**
	 *
	 * @param arr
	 * @returns {Promise<unknown>}
	 */
	packages: (arr) => {
		return new Promise(async function (resolve) {
			// Execute
			return resolve(
				await arr.forEach((dir) => {
					if (dir !== ".DS_Store") {
						const context = { name: `${dir}` };

						// Readme file.
						lib.hydrate(
							templates.packages.readme,
							"README.md",
							context,
							path.resolve(pkgRoot, dir, "README.md")
						);

						// License.
						lib.hydrate(
							templates.packages.license,
							"LICENSE",
							context,
							path.resolve(pkgRoot, dir, "LICENSE")
						);

						// Package.json.
						lib.packageJson(dir, context);
					}
				})
			);
		});
	},

	/**
	 *
	 * @param dir
	 * @param context
	 * @returns {Promise<unknown>}
	 */
	packageJson: (dir, context) => {
		return new Promise(async function (resolve) {
			// Execute
			//return resolve(
			const pkgJsonPath = await path.resolve(pkgRoot, dir, "package.json");
			const pkgJson = await fs.existsSync(pkgJsonPath);

			let newContext;
			if (pkgJson) {
				const obj = require(pkgJsonPath);
				const gitHead = { gitHead: obj.gitHead } || { gitHead: "" };
				const description = obj.description || `kb ${context.name} package`;
				newContext = {
					...context,
					...{ dependencies: obj.dependencies },
					...{ devDependencies: obj.devDependencies },
					...{ description: description },
					...{ version: obj.version },
					...gitHead,
				};
			} else {
				newContext = { ...context, ...{ description: `kb ${context.name} package` } };
			}

			return resolve(
				await lib.hydrate(
					templates.packages.package_json,
					"package.json",
					newContext,
					path.resolve(pkgRoot, dir, "package.json")
				)
			);
			//)
		});
	},

	/**
	 *
	 * @param root
	 * @param templateSrc
	 * @param outputName
	 * @returns {Promise<unknown>}
	 */
	mono: (root, templateSrc, outputName) => {
		return new Promise(async function (resolve) {
			// Execute
			return resolve(
				await lib.hydrate(root, templateSrc, outputName, { name: `kb` }, path.resolve(root, outputName))
			);
		});
	},

	/**
	 *
	 * @param templateSrc
	 * @param outputName
	 * @param context
	 * @param destination
	 */
	hydrate: (templateSrc, outputName, context, destination) => {
		// Readme file.
		fs.readFile(templateSrc, "utf8", function (err, data) {
			if (err) throw err;

			const template = handlebars.compile(data);
			const result = template(context);
			const writeStream = fs.createWriteStream(destination);
			writeStream.write(result);
			console.log("hydrated file: " + destination);
			writeStream.end();
		});
	},
};

module.exports = lib;
