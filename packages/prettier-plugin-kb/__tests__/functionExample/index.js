"use strict";

/**
 *
 * @module
 * @return {string} returnExample
 * @author Keith Boice
 *
 * @example
 *
 *      functionExample(paramExample).then(response => console.log(response));
 *
 * @param paramExample
 *
 */
async function functionExample(paramExample) {
  return await new Promise((resolve, reject) => {
    const returnExample = "";

    if (returnExample) {
      return resolve(returnExample);
    }
    return reject({ error: "Error in functionExample" });
  });
}

module.exports.functionExample = functionExample;
