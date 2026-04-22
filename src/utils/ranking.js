const CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function midChar(a, b) {
  const ai = CHARS.indexOf(a);
  const bi = CHARS.indexOf(b);
  const mid = Math.floor((ai + bi) / 2);
  return CHARS[mid];
}

export function lexMid(a, b) {
  if (!a) a = "0";
  if (!b) b = "z";

  let result = "";
  let i = 0;
  while (i < Math.max(a.length, b.length) + 5) {
    const ac = i < a.length ? a[i] : "0";
    const bc = i < b.length ? b[i] : "z";

    if (ac === bc) {
      result += ac;
      i++;
      continue;
    }

    const mid = midChar(ac, bc);
    if (mid !== ac && mid !== bc) {
      result += mid;
      return result;
    }

    result += ac;
    i++;
    if (CHARS.indexOf(bc) - CHARS.indexOf(ac) === 1) {
      result += midChar("0", "z");
      return result;
    }
  }

  return `${result}N`;
}

export function buildNumeric(items) {
  return items.map((item, i) => ({ ...item, rank: i + 1 }));
}

export function buildLexo(items) {
  const ranks = ["G", "N", "T", "a", "g"];
  return items.map((item, i) => ({ ...item, rank: ranks[i] || `z${i}` }));
}
