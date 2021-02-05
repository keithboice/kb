"use strict";

/**
 * @function
 * @param a
 * @param b
 * @returns {*}
 */
function doSum(a, b) {
	return a + b;
}

/**
 * @test
 */
test("adds 1 + 2 to equal 3", () => {
	expect(doSum(1, 2)).toBe(3);
});
