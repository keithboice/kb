const main = require("./index.js");
const bin = require("./cli.js");
const conf = require("./conf.js");
const { which, exec } = require("shelljs");

/**
 * @test
 */

function sum(a, b) {
  return a + b;
}

test("Validate that jest is working", () => {
  expect(sum(1, 2)).toBe(3);
});

/**
 * Tests if dependencies return as expected.
 */
test("Validate that main module returns an object", () => {
  expect(typeof main === "object").toBe(true);
});

test("Validate that bin module returns an object", () => {
  expect(typeof bin === "object").toBe(true);
});

test("Validate that config module returns an object", () => {
  expect(typeof conf === "object").toBe(true);
});

/**
 * Test command line interface
 */
test("Validate that the command is registered", () => {
  expect(which("test")).toBe(true);
});

test("Validate that calling the command from the cli files executes and returns exit code of 0 as expected", () => {
  expect(exec("./cli.js test ./").code === 0).toBe(true);
});

test("Validate that calling the command from npm run executes and returns exit code of 0 as expected", () => {
  expect(exec("npm run test").code === 0).toBe(true);
});
