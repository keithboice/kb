const expect = require("chai").expect;
const functionExample = require("./index.js");

/**
 *
 * @test
 *
 */
describe("functionExample", function () {
  describe("functionExample", function () {
    it("should accept paramExample (string) and return returnExample (string)", function () {
      functionExample("string").then((response) => {
        expect(response).to.be.a("string");
      });
    });
  });
});
