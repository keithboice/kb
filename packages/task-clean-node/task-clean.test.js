"use strict";

const { registry, series, task } = require("gulp");
const CommonRegistry = require("@kb/task-clean-node");

registry(new CommonRegistry({ $PARAMS }));

task(
	"default",
	series("clean", function clean(cb) {
		/**
		 * @test
		 */
		test("@kb/task-clean-node", () => {
			expect(typeof cb()).toBe("object");
		});
	})
);
