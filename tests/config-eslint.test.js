"use strict";

const target = require("../packages/config-eslint");

/**
 * @test
 */
test("Config-eslint to be a class", () => {
	expect(typeof target).toBe("object");
});
