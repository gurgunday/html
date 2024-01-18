const escapeDictionary = {
  '"': "&quot;",
  "'": "&apos;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
};

const escapeRegExp = new RegExp(
  `[${Object.keys(escapeDictionary).join("")}]`,
  "gu",
);

const escapeFunction = (key) => escapeDictionary[key];

/**
 * @param {{ raw: string[] }} literals
 * @param {...any} expressions
 * @returns {string}
 */
const html = (literals, ...expressions) => {
  const lastLitI = literals.raw.length - 1;
  let acc = "";

  if (lastLitI === -1) {
    return acc;
  }

  for (let i = 0; i < lastLitI; ++i) {
    let lit = literals.raw[i];
    let exp =
      typeof expressions[i] === "string"
        ? expressions[i]
        : expressions[i] == null
          ? ""
          : Array.isArray(expressions[i])
            ? expressions[i].join("")
            : `${expressions[i]}`;

    if (lit.length && lit.charCodeAt(lit.length - 1) === 33) {
      lit = lit.slice(0, -1);
    } else if (exp.length) {
      exp = exp.replace(escapeRegExp, escapeFunction);
    }

    acc += lit + exp;
  }

  acc += literals.raw[lastLitI];

  return acc;
};

export { html };
