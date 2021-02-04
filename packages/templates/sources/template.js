/*
 * grunt-init-commonjs
 * https://gruntjs.com/
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

"use strict";

// Basic template description.
exports.description = "Scaffolding for new @kb package";

// Template-specific notes to be displayed before question prompts.
exports.notes = "";

// Template-specific notes to be displayed after question prompts.
exports.after = "done";

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = "*";

// The actual init template.
exports.template = function (grunt, init, done) {
	init.process(
		{},
		[
			// Prompt for these values.
			init.prompt("name"),
			init.prompt("description"),
		],
		function (err, props) {
			props.keywords = [];
			props.devDependencies = {
				"grunt-contrib-concat": "~0.3.0",
				"grunt-contrib-uglify": "~0.2.0",
				"grunt-contrib-jshint": "~0.6.0",
				"grunt-contrib-nodeunit": "~0.2.0",
				"grunt-contrib-watch": "~0.4.0",
			};

			// Files to copy (and process).
			const files = init.filesToCopy(props);

			// Add properly-named license files.
			init.addLicenseFiles(files, props.licenses);

			// Actually copy (and process) files.
			init.copyAndProcess(files, props);

			// Generate package.json file.
			init.writePackageJSON("package.json", props);

			// All done!
			done();
		}
	);
};
