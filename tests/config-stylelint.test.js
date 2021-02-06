"use strict";

const target = require("../packages/config-stylelint");

/**
 * @test
 */
test("Config-stylelint to be a class", () => {
	expect(typeof target).toBe("object");
});
