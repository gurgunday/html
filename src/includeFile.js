import { readFileSync } from "node:fs";

const readOptions = {
  encoding: "utf8",
};

const fileCache = new Map();

/**
 * @param {string} path
 * @returns {string}
 */
const includeFile = (path) => {
  let file = fileCache.get(path);

  if (file === undefined) {
    file = readFileSync(path, readOptions);
    fileCache.set(path, file);
  }

  return file;
};

export { includeFile };
