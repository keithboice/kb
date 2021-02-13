"use strict";

const Utils = require("../utils");
const utils = new Utils({});
//const path = require("path");
//const res = utils.debug({ main: path.join(__dirname, ".."), appRoot: path.join(__dirname, ".."), modPath: path.resolve(__dirname), argv: "args" });

/**
 * @test
 */
test("Utils to be a class", () => {
	expect(typeof utils).toBe("object");
});
