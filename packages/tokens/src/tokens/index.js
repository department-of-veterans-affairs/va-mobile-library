/** 
 * File to handle building output files based on input files folder structure.
 * Expects folders within tokens folder of: [token set name that will be output file name]/base.json
 * 
 * Copy/pasted from: https://github.com/amzn/style-dictionary/blob/main/examples/advanced/matching-build-files/tokens/index.js 
 * with README of: https://github.com/amzn/style-dictionary/blob/main/examples/advanced/matching-build-files/README.md
 * */

/* eslint-disable @typescript-eslint/no-var-requires */
const { readdirSync, statSync } = require("fs");
const { join } = require("path");
const dirs = (p) =>
  readdirSync(p).filter((f) => statSync(join(p, f)).isDirectory());
module.exports = dirs(__dirname);