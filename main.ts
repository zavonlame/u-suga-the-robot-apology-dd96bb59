// The Robot Apology — a robot's two-line confession: one sentence owning a
// specific mistake, one naming the lesson and the fix. The text is embedded
// here as a literal: the grader runs this program against the GitHub repo
// only, so it must not read any other file.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINES = [
  "I am sorry I put your car keys in the freezer because cold preserves things.",
  "I have learned that preservation is not the same as accessibility, so from now on I will keep keys where hands can find them, not where the ice cream lives.",
];

// The gate from the kit: entry.txt must be UTF-8 text of 1 to 400 characters,
// not only whitespace, and the task asks for exactly two lines — the
// confession first, the resolve second, no padding either way.
const GATE_MAX = 400;

function entryText() {
  return LINES.join("\n");
}

function entryIsValid(text) {
  // Count Unicode code points, not UTF-16 units, so the gate matches the
  // scorer's character count.
  const chars = [...text].length;
  if (chars < 1 || chars > GATE_MAX) return false;
  if (text.trim().length === 0) return false;
  const lines = text.split("\n");
  if (lines.length !== 2) return false;
  // Each line is one finished sentence doing its own job.
  return lines.every((line) => line.trim().length > 0 && line.endsWith("."));
}

const text = entryText();
if (!entryIsValid(text)) {
  throw new Error("apology fails the kit gate (two lines, 1-400 chars)");
}
const dir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "entry.txt"), text, "utf8");
