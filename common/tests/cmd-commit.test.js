"use strict";

const Target = require("../packages/cmd-commit");
const target = new Target({});

/**
 * @test
 */
test("Utils to be a class", () => {
	expect(typeof target).toBe("object");
});
