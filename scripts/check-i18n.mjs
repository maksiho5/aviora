import { readFileSync } from "node:fs";

const load = (locale) => JSON.parse(readFileSync(new URL(`../messages/${locale}.json`, import.meta.url), "utf8"));

function keys(value, prefix = "") {
  if (Array.isArray(value)) return [`${prefix}[${value.length}]`, ...value.flatMap((v, i) => keys(v, `${prefix}[${i}]`))];
  if (value && typeof value === "object") return Object.entries(value).flatMap(([k, v]) => keys(v, prefix ? `${prefix}.${k}` : k));
  return [prefix];
}

const [en, ru] = ["en", "ru"].map((locale) => new Set(keys(load(locale))));
const missing = [...en].filter((k) => !ru.has(k)).map((k) => `ru is missing ${k}`);
const extra = [...ru].filter((k) => !en.has(k)).map((k) => `ru has extra ${k}`);
const problems = [...missing, ...extra];

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log(`i18n ok: ${en.size} keys`);
