"use strict";

const target = require("../packages/cmd-prettier");

/**
 * @test
 */
test("cmd-prettier to be a class", () => {
	expect(typeof target).toBe("object");
});
