"use strict";

const target = require("../packages/cmd-jest/src/index");

/**
 * @test
 */
test("cmd-jest to be a class", () => {
	expect(typeof target).toBe("object");
});
