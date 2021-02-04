"use strict";

// Dependencies
const lib = require("./main.js");

lib.main("make docs", { pkgRoot: null }, 0)
	.then(() => console.log(`\nAll done!`))
	.catch((err) => console.error(`\nError: ${err}`));
