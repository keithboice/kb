"use strict";

const target = require("../cmd-jest");

/**
 * @test
 */
test("cmd-jest to be a class", () => {
	expect(typeof target).toBe("object");
});
