const escapeDictionary = {
  '"': "&quot;",
  "'": "&apos;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
};

const escapeRegExp = new RegExp(
  `[${Object.keys(escapeDictionary).join("")}]`,
  "gv",
);

const escapeReplacerFunction = (key) => escapeDictionary[key];

/**
 * @param {{ raw: string[] }} literals
 * @param {...*} expressions
 * @returns {string}
 */
const html = (literals, ...expressions) => {
  if (literals.raw.length === 0) return "";
  const lastLitI = literals.raw.length - 1;
  let acc = "";

  for (let i = 0; i < lastLitI; ++i) {
    let lit = literals.raw[i];
    let exp =
      typeof expressions[i] === "string"
        ? expressions[i]
        : null == expressions[i]
          ? ""
          : Array.isArray(expressions[i])
            ? expressions[i].join("")
            : `${expressions[i]}`;

    if (lit.length !== 0 && lit.charAt(lit.length - 1) === "!")
      lit = lit.slice(0, -1);
    else if (exp.length !== 0)
      exp = exp.replace(escapeRegExp, escapeReplacerFunction);

    acc += lit += exp;
  }

  acc += literals.raw[lastLitI];

  return acc;
};

export { html };
