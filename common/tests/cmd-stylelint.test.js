"use strict";

const target = require("../packages/cmd-stylelint");

/**
 * @test
 */
test("cmd-stylelint to be a class", () => {
	expect(typeof target).toBe("object");
});
