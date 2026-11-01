// Checks every clue in index.html and daily.js. Run: node tools/check-clues.js
// Exits with an error if anything is wrong, so a bad clue set never gets pushed.
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const grab = (name, end) => { const i = html.indexOf("const " + name + " = "); const j = html.indexOf(end, i); if (i < 0 || j < 0) throw new Error("Could not find " + name); return eval("(" + html.slice(i + name.length + 9, j + end.length - 1) + ")"); };
const CLUES = grab("CLUES", "\n};"), BONUS = grab("BONUS_ROUNDS", "\n}];");
const window = {}; eval(fs.readFileSync(path.join(root, "daily.js"), "utf8"));
const DAILY = window.TWISTY_DAILY || {};
const LEVELS = ["beginner", "easy", "medium", "hard", "impossible"];
const letters = s => s.toUpperCase().replace(/[^A-Z]/g, "");
const sorted = s => letters(s).split("").sort().join("");
let errors = 0; const seen = new Map();
const fail = (where, msg) => { errors++; console.log("✗ " + where + ": " + msg); };
function check(where, c, level) {
  for (const k of ["c", "a", "t", "x"]) if (typeof c[k] !== "string" || !c[k].trim()) return fail(where, "missing field " + k);
  if (!/^[A-Z]+$/.test(c.a)) fail(where, "answer must be capital letters only: " + c.a);
  if (!/\[d:[^\]]+\]/.test(c.c)) fail(where, "no [d:...] definition marked");
  if (/\[(?![dif]:)/.test(c.c)) fail(where, "bad markup, only [d:], [i:], [f:] allowed");
  const stripped = c.c.replace(/\[[dif]:([^\]]+)\]/g, "$1");
  if (/[\[\]]/.test(stripped)) fail(where, "unbalanced brackets");
  const fod = [...c.c.matchAll(/\[f:([^\]]+)\]/g)].map(m => m[1]).join(" ");
  const t = c.t.toLowerCase();
  if (t === "anagram" && sorted(fod) !== sorted(c.a)) fail(where, `anagram letters "${fod}" do not match ${c.a}`);
  if (t === "hidden word" && !letters(fod).includes(c.a)) fail(where, `${c.a} is not hidden in "${fod}"`);
  if (t === "reversal" && letters(fod).split("").reverse().join("") !== c.a) fail(where, `"${fod}" reversed is not ${c.a}`);
  if (seen.has(c.a)) fail(where, `answer ${c.a} already used at ${seen.get(c.a)}`); else seen.set(c.a, where);
}
for (const l of LEVELS) CLUES[l].forEach((c, i) => check(`rotation ${l} #${i + 1}`, c, l));
BONUS.forEach((r, i) => LEVELS.forEach(l => r.clues[l] ? check(`bonus ${i + 1} ${l}`, r.clues[l], l) : fail(`bonus ${i + 1}`, "missing " + l)));

// Variety: anagrams are welcome in any number, but a set can't be all one clue type
function variety(where, clues) {
  const types = new Set(clues.map(c => (c.t || "").toLowerCase()));
  if (clues.length > 1 && types.size < 2) fail(where, "every clue is the same type; mix in at least one other kind");
}
for (const [date, set] of Object.entries(DAILY)) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) fail(date, "date must be YYYY-MM-DD");
  for (const l of LEVELS) set[l] ? check(`daily ${date} ${l}`, set[l], l) : fail(`daily ${date}`, "missing " + l);
  variety(`daily ${date}`, LEVELS.map(l => set[l]).filter(Boolean));
}
BONUS.forEach((r, i) => variety(`bonus ${i + 1}`, LEVELS.map(l => r.clues[l]).filter(Boolean)));
console.log(errors ? `\n${errors} problem(s) found.` : `All ${seen.size} clues pass.`);
process.exit(errors ? 1 : 0);
