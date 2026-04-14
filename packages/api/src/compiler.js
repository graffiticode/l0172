// SPDX-License-Identifier: MIT
/* Copyright (c) 2023, ARTCOMPILER INC */
import {
  Checker as BasisChecker,
  Transformer as BasisTransformer,
  Compiler as BasisCompiler
} from '@graffiticode/basis';
import { SHAPE_TYPE_ENUM, NODE_TYPE_NAMES } from './lexicon.js';

const toMethodName = (surface) => surface.replace(/-/g, "_").toUpperCase();

const PROP_SETTERS = {
  X: "x",
  Y: "y",
  WIDTH: "width",
  HEIGHT: "height",
  FILL: "fill",
  STROKE: "stroke",
  STROKE_WIDTH: "strokeWidth",
  OPACITY: "opacity",
  LABEL: "label",
  COLOR: "color",
  FROM: "from",
  TO: "to",
};

const NODE_PRIMARY_FIELD = {
  sticky: "text",
  text: "text",
  connector: "label",
  section: "name",
  stamp: "stamp",
};

function parseFileKey(input) {
  if (typeof input !== "string") return input;
  const m = input.match(/figma\.com\/(?:board|design|file)\/([^/?#]+)/);
  return m ? m[1] : input;
}

function visitArity2(node, options, resume) {
  this.visit(node.elts[0], options, () => {
    this.visit(node.elts[1], options, () => {
      resume([], node);
    });
  });
}

function visitArity1(node, options, resume) {
  this.visit(node.elts[0], options, () => {
    resume([], node);
  });
}

export class Checker extends BasisChecker {
  BOARD(node, options, resume) { visitArity2.call(this, node, options, resume); }
  NODES(node, options, resume) { visitArity2.call(this, node, options, resume); }
}

export class Transformer extends BasisTransformer {
  PRINT(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      resume(e0, { print: v0 });
    });
  }

  BOARD(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        resume([], { ...v1, type: "board", fileKey: parseFileKey(v0) });
      });
    });
  }

  NODES(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        resume([], { ...v1, nodes: v0 });
      });
    });
  }

  PROG(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      const data = options?.data || {};
      const items = v0;
      let board;
      for (const item of items) {
        if (item && typeof item === "object" && item.type === "board") {
          board = item;
        }
      }
      if (board) {
        resume(e0, { ...data, ...board });
      } else {
        resume(e0, { ...data, items });
      }
    });
  }
}

// Generate per-prop setter methods (arity 2).
for (const [method, field] of Object.entries(PROP_SETTERS)) {
  Checker.prototype[method] = function (node, options, resume) {
    visitArity2.call(this, node, options, resume);
  };
  Transformer.prototype[method] = function (node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        resume([], { ...v1, [field]: v0 });
      });
    });
  };
}

// Generate node-type methods (arity 2).
for (const surface of NODE_TYPE_NAMES) {
  const method = toMethodName(surface);
  const field = NODE_PRIMARY_FIELD[surface];
  Checker.prototype[method] = function (node, options, resume) {
    visitArity2.call(this, node, options, resume);
  };
  Transformer.prototype[method] = function (node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        resume([], { ...v1, type: surface, [field]: v0 });
      });
    });
  };
}

// Generate shape-with-text type methods (arity 2).
for (const [surface, enumName] of Object.entries(SHAPE_TYPE_ENUM)) {
  const method = toMethodName(surface);
  Checker.prototype[method] = function (node, options, resume) {
    visitArity2.call(this, node, options, resume);
  };
  Transformer.prototype[method] = function (node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        resume([], { ...v1, type: "shape", shapeType: enumName, text: v0 });
      });
    });
  };
}

export const compiler = new BasisCompiler({
  langID: '0172',
  version: 'v0.0.1',
  Checker: Checker,
  Transformer: Transformer,
});
