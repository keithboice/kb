"use strict";

/**
 *
 * @type {module.Main}
 */
module.exports = class Main {
  /**
   *
   * @param {string} path Overrides cwd value
   */
  constructor(path) {
    this._path = path;
  }

  /**
   *
   * @returns {Promise<object>} The default value returned by method
   */
  handler = () => {
    return new Promise((resolve) => {
      /* handle success response */
      return resolve({
        code: 200,
        message: "reason",
      });
    });
  };
};
