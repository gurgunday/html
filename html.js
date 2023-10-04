"use strict";

const escapeDict = {
  '"': "&quot;",
  "'": "&apos;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
};

const escapeRegExp = new RegExp(`[${Object.keys(escapeDict).join("")}]`, "gv");

const escapeReplacer = (key) => escapeDict[key];

const stringify = (exp) =>
  typeof exp === "string"
    ? exp
    : Array.isArray(exp)
    ? exp.join("")
    : exp?.toString() ?? "";

/**
 * @param {{ raw: string[] }} literals
 * @param {...*} expressions
 * @returns {string}
 */
const html = ({ raw: literals }, ...expressions) => {
  switch (literals.length) {
    case 0:
      return "";
    case 1:
      return literals[0];
  }

  const lastLitIndex = literals.length - 1;
  let acc = "";

  for (let i = 0; i < lastLitIndex; ++i) {
    let lit = literals[i];
    let str = stringify(expressions[i]);

    if (lit && lit[lit.length - 1] === "!") {
      lit = lit.slice(0, -1);
    } else if (str) {
      str = str.replace(escapeRegExp, escapeReplacer);
    }

    acc += lit += str;
  }

  acc += literals[lastLitIndex];

  return acc;
};

module.exports.html = html;
