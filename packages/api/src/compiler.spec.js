// SPDX-License-Identifier: MIT
import { compiler } from "./compiler.js";
import { lexicon as l0172Lexicon } from "./lexicon.js";
import { parser } from "@graffiticode/parser";
import { lexicon as basisLexicon } from "@graffiticode/basis/src/lexicon.js";

const fullLexicon = { ...basisLexicon, ...l0172Lexicon };

async function compileSource(src) {
  const parsed = await parser.parse("0172", src, fullLexicon);
  return new Promise((resolve) => {
    compiler.compile(parsed, {}, {}, (err, data) => {
      resolve({ errors: err && err.length ? err : null, data });
    });
  });
}

const board = (body) => `board "ABC123" nodes [${body}] {}..`;

describe("L0172 enum tags", () => {
  describe("line-type", () => {
    it("accepts tag straight", async () => {
      const { errors, data } = await compileSource(board(`connector "" from "A" to "B" line-type straight {}`));
      expect(errors).toBeNull();
      expect(data.nodes[0].lineType).toBe("straight");
    });
    it("accepts tag elbowed", async () => {
      const { errors, data } = await compileSource(board(`connector "" from "A" to "B" line-type elbowed {}`));
      expect(errors).toBeNull();
      expect(data.nodes[0].lineType).toBe("elbowed");
    });
    it("rejects string form", async () => {
      const { errors } = await compileSource(board(`connector "" from "A" to "B" line-type "elbowed" {}`));
      expect(errors).not.toBeNull();
      expect(errors[0].message).toMatch(/Invalid line-type.*Expected a tag/);
    });
    it("rejects wrong tag from a different enum", async () => {
      const { errors } = await compileSource(board(`connector "" from "A" to "B" line-type top {}`));
      expect(errors).not.toBeNull();
      expect(errors[0].message).toMatch(/Invalid line-type value tag `top`/);
    });
  });

  describe("line-style", () => {
    it("accepts tag solid and dashed", async () => {
      const r1 = await compileSource(board(`connector "" from "A" to "B" line-style solid {}`));
      expect(r1.errors).toBeNull();
      expect(r1.data.nodes[0].lineStyle).toBe("solid");
      const r2 = await compileSource(board(`connector "" from "A" to "B" line-style dashed {}`));
      expect(r2.errors).toBeNull();
      expect(r2.data.nodes[0].lineStyle).toBe("dashed");
    });
    it("rejects string form", async () => {
      const { errors } = await compileSource(board(`connector "" from "A" to "B" line-style "dashed" {}`));
      expect(errors[0].message).toMatch(/Invalid line-style.*Expected a tag/);
    });
  });

  describe("from-cap / to-cap", () => {
    it("accepts every defined cap tag", async () => {
      const caps = ["none", "arrow-lines", "arrow-equilateral", "triangle-filled", "circle-filled", "diamond-filled"];
      for (const cap of caps) {
        const { errors, data } = await compileSource(board(`connector "" from "A" to "B" from-cap ${cap} to-cap ${cap} {}`));
        expect(errors).toBeNull();
        expect(data.nodes[0].fromCap).toBe(cap);
        expect(data.nodes[0].toCap).toBe(cap);
      }
    });
    it("rejects string form for from-cap", async () => {
      const { errors } = await compileSource(board(`connector "" from "A" to "B" from-cap "none" {}`));
      expect(errors[0].message).toMatch(/Invalid from-cap.*Expected a tag/);
    });
  });

  describe("from-side / to-side", () => {
    it("accepts every defined side tag", async () => {
      const sides = ["auto", "top", "bottom", "left", "right", "center"];
      for (const side of sides) {
        const { errors, data } = await compileSource(board(`connector "" from "A" to "B" from-side ${side} to-side ${side} {}`));
        expect(errors).toBeNull();
        expect(data.nodes[0].fromSide).toBe(side);
        expect(data.nodes[0].toSide).toBe(side);
      }
    });
    it("rejects string form for to-side", async () => {
      const { errors } = await compileSource(board(`connector "" from "A" to "B" to-side "left" {}`));
      expect(errors[0].message).toMatch(/Invalid to-side.*Expected a tag/);
    });
  });

  describe("font-size", () => {
    it("resolves tag aliases to pixel numbers", async () => {
      const cases = [["small", 16], ["medium", 24], ["large", 40], ["extra-large", 64], ["huge", 96]];
      for (const [tag, px] of cases) {
        const { errors, data } = await compileSource(board(`text "T" font-size ${tag} {}`));
        expect(errors).toBeNull();
        expect(data.nodes[0].fontSize).toBe(px);
      }
    });
    it("passes numeric values through unchanged", async () => {
      const { errors, data } = await compileSource(board(`text "T" font-size 32 {}`));
      expect(errors).toBeNull();
      expect(data.nodes[0].fontSize).toBe(32);
    });
    it("rejects string form", async () => {
      const { errors } = await compileSource(board(`text "T" font-size "small" {}`));
      expect(errors[0].message).toMatch(/Invalid font-size.*Expected a number or one of the tags/);
    });
  });

  describe("stroke-width", () => {
    it("resolves tag aliases", async () => {
      const r1 = await compileSource(board(`connector "" from "A" to "B" stroke-width thin {}`));
      expect(r1.errors).toBeNull();
      expect(r1.data.nodes[0].strokeWidth).toBe(2);
      const r2 = await compileSource(board(`connector "" from "A" to "B" stroke-width thick {}`));
      expect(r2.errors).toBeNull();
      expect(r2.data.nodes[0].strokeWidth).toBe(4);
    });
    it("passes numeric values through unchanged", async () => {
      const { errors, data } = await compileSource(board(`connector "" from "A" to "B" stroke-width 5 {}`));
      expect(errors).toBeNull();
      expect(data.nodes[0].strokeWidth).toBe(5);
    });
    it("rejects string form", async () => {
      const { errors } = await compileSource(board(`connector "" from "A" to "B" stroke-width "thick" {}`));
      expect(errors[0].message).toMatch(/Invalid stroke-width.*Expected a number or one of the tags/);
    });
  });

  describe("stamp", () => {
    it("accepts tagged stamp variants from the curated allowlist", async () => {
      const variants = ["like", "love", "laugh", "surprised", "celebrate", "heart"];
      for (const v of variants) {
        const { errors, data } = await compileSource(board(`stamp ${v} x 0 y 0 {}`));
        expect(errors).toBeNull();
        expect(data.nodes[0].type).toBe("stamp");
        expect(data.nodes[0].stamp).toBe(v);
      }
    });
    it("rejects string form", async () => {
      const { errors } = await compileSource(board(`stamp "like" x 0 y 0 {}`));
      expect(errors[0].message).toMatch(/Invalid stamp.*Expected a tag/);
    });
  });

  describe("from / to wildcard string", () => {
    it("preserves \"*\" as a string in compiled output", async () => {
      const { errors, data } = await compileSource(board(`connector "" from "*" to "Hub" {}`));
      expect(errors).toBeNull();
      expect(data.nodes[0].from).toBe("*");
      expect(data.nodes[0].to).toBe("Hub");
    });
    it("preserves a list of node ids", async () => {
      const { errors, data } = await compileSource(board(`connector "" from ["A", "B"] to "Hub" {}`));
      expect(errors).toBeNull();
      expect(data.nodes[0].from).toEqual(["A", "B"]);
    });
  });
});
