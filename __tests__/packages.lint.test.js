"use strict";

const ScriptLintNode = require("./");
const { handler } = new ScriptLintNode("./");

console.log(handler);

/**
 * @test
 */
test("handler method should return code 200", () => {
	expect.assertions(1);

	return new Promise((resolve) => {
		const promise1 = handler().then((response) => {
			expect(response.code).toBe(200);
		});
		return resolve(promise1);
	});
});
