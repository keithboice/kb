"use strict";

const target = require("../packages/config-prettier");

/**
 * @test
 */
test("Config-prettier to be a class", () => {
	expect(typeof target).toBe("object");
});
