import { readFileSync } from "node:fs";

const fileCache = new Map();

const readOpts = {
  encoding: "utf8",
};

/**
 * @param {string} path
 * @returns {string}
 */
const includeFile = (path) => {
  let file = fileCache.get(path);

  if (file === undefined) {
    file = readFileSync(path, readOpts);
    fileCache.set(path, file);
  }

  return file;
};

export { includeFile };
