#!/usr/bin/env node
// One line of horror: a single sentence written to /output/entry.txt.
// The whole entry is the closing of a front door, undone from the wrong side.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// I lock up for the night; before I reach the stairs, somebody already in
// the house slides the chain back off. The ordinary chore is the scare.
const LINE =
  "I locked the front door, set the deadbolt, and started back to bed when the chain slid back from the inside.";

function main(): void {
  const text = LINE.trim();
  const points = [...text].length;
  if (points < 1 || points > 200) {
    throw new Error(`line must be 1 to 200 code points, got ${points}`);
  }
  // One sentence, one breath: no stray control characters and no second
  // full stop hiding a paragraph where the single line should be.
  if (/[\u0000-\u001f\u007f\u2028\u2029]/.test(text)) {
    throw new Error("line must be a single clean line");
  }
  if ((text.match(/[.!?](?=\s|$)/g) ?? []).length > 1) {
    throw new Error("line must be one sentence only");
  }
  if (!/\S/.test(text)) {
    throw new Error("line must contain non-whitespace");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
  mkdirSync(outDir, { recursive: true });
  const path = join(outDir, "entry.txt");
  writeFileSync(path, `${text}\n`, "utf8");
  console.log(`wrote ${points} characters to ${path}`);
}

main();
