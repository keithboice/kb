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
  return new Promise(async (resolve, reject) => {
    let returnExample = "";

    if (returnExample) {
      return resolve(returnExample);
    } else {
      return reject({ error: "Error in functionExample" });
    }
  });
}

module.exports.functionExample = functionExample;
