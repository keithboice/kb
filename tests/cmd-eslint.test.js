"use strict";

const target = require("../packages/cmd-eslint");

/**
 * @test
 */
test("cmd-eslint to be a class", () => {
	expect(typeof target).toBe("object");
});
