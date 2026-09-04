// SPDX-License-Identifier: MIT
// Extracts every fenced code block from spec/instructions.md and compiles the ones
// that are whole programs, so a documented example can never drift from the compiler.
import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { compiler } from "./compiler.js";
import { lexicon as l0172Lexicon } from "./lexicon.js";
import { parser } from "@graffiticode/parser";
import { lexicon as basisLexicon } from "@graffiticode/basis/src/lexicon.js";

const fullLexicon = { ...basisLexicon, ...l0172Lexicon };
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function compileSource(src) {
  const parsed = await parser.parse("0172", src, fullLexicon);
  return new Promise((resolve) => {
    compiler.compile(parsed, {}, {}, (err, data) => {
      resolve({ errors: err && err.length ? err : null, data });
    });
  });
}

const md = fs.readFileSync(path.resolve(__dirname, "../spec/instructions.md"), "utf-8");
const blocks = [...md.matchAll(/```\n([\s\S]*?)```/g)].map((m) => m[1]);
// Whole programs only: the "these are errors" block is fragments, by design.
const programs = blocks.filter((b) => b.trimStart().startsWith("board "));

describe("instructions.md examples", () => {
  it("has at least one whole-program example", () => {
    expect(programs.length).toBeGreaterThan(0);
  });
  programs.forEach((src, i) => {
    it(`example ${i + 1} compiles clean`, async () => {
      const { errors, data } = await compileSource(src);
      expect(errors).toBeNull();
      expect(data).toBeTruthy();
    });
  });
});
