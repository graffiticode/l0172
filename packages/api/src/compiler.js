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
  FONT_SIZE: "fontSize",
  FROM: "from",
  TO: "to",
  LINE_TYPE: "lineType",
  LINE_STYLE: "lineStyle",
  FROM_CAP: "fromCap",
  TO_CAP: "toCap",
  FROM_SIDE: "fromSide",
  TO_SIDE: "toSide",
};

const FONT_SIZE_ALIASES = {
  "small": 16,
  "medium": 24,
  "large": 40,
  "extra-large": 64,
  "huge": 96,
};

const STROKE_WIDTH_ALIASES = {
  "thin": 2,
  "thick": 4,
};

const LINE_STYLES = new Set(["solid", "dashed"]);

const NODE_PRIMARY_FIELD = {
  sticky: "text",
  text: "text",
  connector: "label",
  section: "name",
  stamp: "stamp",
};

// Text-bearing node types use the first arg as both id (addressable key
// for connectors) and default text. An explicit text property overrides
// the text but never the id.
const TEXT_BEARING_NODES = new Set(["sticky", "text"]);

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

Checker.prototype.FONT_SIZE = function (node, options, resume) {
  this.visit(node.elts[0], options, (e0, v0) => {
    this.visit(node.elts[1], options, (e1, v1) => {
      let err = [...e0, ...e1];
      if (v0 && v0.tag === "STR" && !(v0.elts[0] in FONT_SIZE_ALIASES)) {
        const valid = Object.keys(FONT_SIZE_ALIASES).map((k) => `"${k}"`).join(", ");
        err = [...err, `Invalid font-size alias "${v0.elts[0]}". Expected ${valid}, or a number.`];
      }
      resume(err, node);
    });
  });
};

Transformer.prototype.FONT_SIZE = function (node, options, resume) {
  this.visit(node.elts[0], options, (e0, v0) => {
    this.visit(node.elts[1], options, (e1, v1) => {
      const resolved = typeof v0 === "string" && v0 in FONT_SIZE_ALIASES
        ? FONT_SIZE_ALIASES[v0]
        : v0;
      resume([], { ...v1, fontSize: resolved });
    });
  });
};

Checker.prototype.STROKE_WIDTH = function (node, options, resume) {
  this.visit(node.elts[0], options, (e0, v0) => {
    this.visit(node.elts[1], options, (e1, v1) => {
      let err = [...e0, ...e1];
      if (v0 && v0.tag === "STR" && !(v0.elts[0] in STROKE_WIDTH_ALIASES)) {
        const valid = Object.keys(STROKE_WIDTH_ALIASES).map((k) => `"${k}"`).join(", ");
        err = [...err, `Invalid stroke-width alias "${v0.elts[0]}". Expected ${valid}, or a number.`];
      }
      resume(err, node);
    });
  });
};

Transformer.prototype.STROKE_WIDTH = function (node, options, resume) {
  this.visit(node.elts[0], options, (e0, v0) => {
    this.visit(node.elts[1], options, (e1, v1) => {
      const resolved = typeof v0 === "string" && v0 in STROKE_WIDTH_ALIASES
        ? STROKE_WIDTH_ALIASES[v0]
        : v0;
      resume([], { ...v1, strokeWidth: resolved });
    });
  });
};

Checker.prototype.LINE_STYLE = function (node, options, resume) {
  this.visit(node.elts[0], options, (e0, v0) => {
    this.visit(node.elts[1], options, (e1, v1) => {
      let err = [...e0, ...e1];
      if (v0 && v0.tag === "STR" && !LINE_STYLES.has(v0.elts[0])) {
        const valid = [...LINE_STYLES].map((k) => `"${k}"`).join(", ");
        err = [...err, `Invalid line-style "${v0.elts[0]}". Expected ${valid}.`];
      }
      resume(err, node);
    });
  });
};

// Generate node-type methods (arity 2).
for (const surface of NODE_TYPE_NAMES) {
  const method = toMethodName(surface);
  const field = NODE_PRIMARY_FIELD[surface];
  Checker.prototype[method] = function (node, options, resume) {
    visitArity2.call(this, node, options, resume);
  };
  if (TEXT_BEARING_NODES.has(surface)) {
    Transformer.prototype[method] = function (node, options, resume) {
      this.visit(node.elts[0], options, (e0, v0) => {
        this.visit(node.elts[1], options, (e1, v1) => {
          const { label, ...rest } = v1;
          const text = label !== undefined ? label : v0;
          resume([], { ...rest, type: surface, id: v0, text });
        });
      });
    };
  } else {
    Transformer.prototype[method] = function (node, options, resume) {
      this.visit(node.elts[0], options, (e0, v0) => {
        this.visit(node.elts[1], options, (e1, v1) => {
          const primary = v1[field] !== undefined ? v1[field] : v0;
          resume([], { ...v1, type: surface, [field]: primary });
        });
      });
    };
  }
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
        const { label, ...rest } = v1;
        const text = label !== undefined ? label : v0;
        resume([], { ...rest, type: "shape", shapeType: enumName, id: v0, text });
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
