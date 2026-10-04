import { copyFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

// The static export writes prefetch segments as nested folders, while the client
// asks for flat names (e.g. __next.$d$locale.first-30.__PAGE__.txt). Add flat copies.
const root = process.argv[2] ?? "out";
let copied = 0;

function filesIn(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? filesIn(path) : [path];
  });
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (!statSync(path).isDirectory()) continue;
    if (!name.startsWith("__next.")) {
      walk(path);
      continue;
    }
    for (const file of filesIn(path)) {
      const flat = [name, ...relative(path, file).split(sep)].join(".");
      copyFileSync(file, join(dir, flat));
      copied += 1;
    }
  }
}

walk(root);
console.log(`flattened ${copied} segment files`);
