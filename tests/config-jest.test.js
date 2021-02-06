"use strict";

const target = require("../packages/config-jest/src/index");

/**
 * @test
 */
test("Config-jest to be a class", () => {
	expect(typeof target).toBe("object");
});
