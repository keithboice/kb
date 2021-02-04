"use strict";

// Dependencies
const lib = require("../lib/main");

lib.main("make docs", { pkgRoot: null }, 0)
	.then(() => console.log("done"))
	.catch((err) => console.error(`error: ${err}`));
