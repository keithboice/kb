"use strict";

const expect = require("chai").expect;
const eslintConfig = require("../lib/index.js");

/**
 *
 * @test
 *
 */
describe("package_eslint-config", function () {
  describe("eslint-config", () => {
    it("needs tests", function () {
      expect(eslintConfig).to.be.an("object");
    });
  });
});
