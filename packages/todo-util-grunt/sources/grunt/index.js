"use strict";

/**
 *
 * @class
 *
 */
class Handler {
	constructor(argv) {
		// "FooCommand" => "foo"
		this.name = this.constructor.name.replace(/Command$/, "").toLowerCase();

		// composed commands are called from other commands, like publish -> version
		this.composed = typeof argv.composed === "string" && argv.composed !== this.name;

		// launch the command
		let runner = new Promise((resolve, reject) => {
			// run everything inside a Promise chain
			let chain = Promise.resolve();

			chain = chain.then(() => {
				this.project = "foo"; // new Project(argv.cwd);
			});
			chain = chain.then(() => console.log("foo"));

			chain.then(
				(result) => {
					resolve(result);
				},
				(err) => {
					if (err.pkg) {
						console.error("", this.constructor.name);
					}

					// error code is handled by cli.fail()
					reject(err);
				}
			);
		});

		this.runCommand().then((res) => console.info(res));
		console.log(runner);
	}

	runPreparations() {
		return "foo";
	}

	runCommand() {
		return Promise.resolve().then(() => {
			console.info(this.runPreparations());
			return "foo";
		});
	}
}

module.exports = Handler;
