import { rmSync } from "node:fs";

// Server-only routes a static export cannot produce, plus stale build output. Run before `next build`.
const serverOnly = ["src/proxy.ts", "src/app/[locale]/[...rest]", ".next"];

for (const path of serverOnly) {
  rmSync(path, { recursive: true, force: true });
  console.log(`removed ${path}`);
}
