// SPDX-License-Identifier: MIT
/* Copyright (c) 2023, ARTCOMPILER INC */
import {
  Checker as BasisChecker,
  Transformer as BasisTransformer,
  Compiler as BasisCompiler
} from '@graffiticode/basis';
import { SHAPE_TYPE_ENUM, NODE_TYPE_NAMES, ENUM_TAG_VALUES } from './lexicon.js';

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

const FONT_SIZE_VALUES = {
  "small": 16,
  "medium": 24,
  "large": 40,
  "extra-large": 64,
  "huge": 96,
};

const STROKE_WIDTH_VALUES = {
  "thin": 2,
  "thick": 4,
};

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
  this.visit(node.elts[0], options, (e0) => {
    this.visit(node.elts[1], options, (e1) => {
      resume([...(e0 || []), ...(e1 || [])], node);
    });
  });
}

function formatTagList(tags) {
  return tags.map((t) => `\`${t}\``).join(", ");
}

function describeValue(v) {
  if (typeof v === "number") return `number ${v}`;
  if (typeof v === "string") return `"${v}"`;
  if (!v || typeof v !== "object") return String(v);
  if (v.tag === "STR") return `string "${v.elts[0]}"`;
  if (v.tag === "TAG") return `tag \`${v.elts[0]}\``;
  if (v.tag === "NUM") return `number ${v.elts[0]}`;
  return v.tag;
}

function checkTagOnly(v0, allowed, propName) {
  if (v0 && v0.tag === "TAG" && allowed.includes(v0.elts[0])) {
    return [];
  }
  const valid = formatTagList(allowed);
  return [`Invalid ${propName} value ${describeValue(v0)}. Expected a tag: ${valid}.`];
}

function checkTagOrNumber(v0, allowed, propName) {
  if (typeof v0 === "number") return [];
  if (v0 && v0.tag === "TAG" && allowed.includes(v0.elts[0])) return [];
  const valid = formatTagList(allowed);
  return [`Invalid ${propName} value ${describeValue(v0)}. Expected a number or one of the tags: ${valid}.`];
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

// Generate per-prop setter methods (arity 2). Enum properties below
// override these with tag-validating Checkers and tag-extracting
// Transformers.
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

// Tag-only enum prop setters: line-type, line-style, from-cap, to-cap,
// from-side, to-side. Checker validates; Transformer extracts v0.tag so
// the compiled record carries a plain string (FigJam consumer unchanged).
const TAG_ONLY_PROP_SETTERS = {
  LINE_TYPE:  { field: "lineType",  surface: "line-type",  allowed: ENUM_TAG_VALUES.lineType  },
  LINE_STYLE: { field: "lineStyle", surface: "line-style", allowed: ENUM_TAG_VALUES.lineStyle },
  FROM_CAP:   { field: "fromCap",   surface: "from-cap",   allowed: ENUM_TAG_VALUES.fromCap   },
  TO_CAP:     { field: "toCap",     surface: "to-cap",     allowed: ENUM_TAG_VALUES.toCap     },
  FROM_SIDE:  { field: "fromSide",  surface: "from-side",  allowed: ENUM_TAG_VALUES.fromSide  },
  TO_SIDE:    { field: "toSide",    surface: "to-side",    allowed: ENUM_TAG_VALUES.toSide    },
};

for (const [method, { field, surface, allowed }] of Object.entries(TAG_ONLY_PROP_SETTERS)) {
  Checker.prototype[method] = function (node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1) => {
        const err = [...e0, ...e1, ...checkTagOnly(v0, allowed, surface)];
        resume(err, node);
      });
    });
  };
  Transformer.prototype[method] = function (node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        const value = v0 && v0.tag ? v0.tag : v0;
        resume([], { ...v1, [field]: value });
      });
    });
  };
}

// Tag-or-number setters: font-size, stroke-width. Tag values resolve to
// the corresponding pixel number.
Checker.prototype.FONT_SIZE = function (node, options, resume) {
  this.visit(node.elts[0], options, (e0, v0) => {
    this.visit(node.elts[1], options, (e1) => {
      const err = [...e0, ...e1, ...checkTagOrNumber(v0, ENUM_TAG_VALUES.fontSize, "font-size")];
      resume(err, node);
    });
  });
};

Transformer.prototype.FONT_SIZE = function (node, options, resume) {
  this.visit(node.elts[0], options, (e0, v0) => {
    this.visit(node.elts[1], options, (e1, v1) => {
      const resolved = v0 && v0.tag && v0.tag in FONT_SIZE_VALUES
        ? FONT_SIZE_VALUES[v0.tag]
        : v0;
      resume([], { ...v1, fontSize: resolved });
    });
  });
};

Checker.prototype.STROKE_WIDTH = function (node, options, resume) {
  this.visit(node.elts[0], options, (e0, v0) => {
    this.visit(node.elts[1], options, (e1) => {
      const err = [...e0, ...e1, ...checkTagOrNumber(v0, ENUM_TAG_VALUES.strokeWidth, "stroke-width")];
      resume(err, node);
    });
  });
};

Transformer.prototype.STROKE_WIDTH = function (node, options, resume) {
  this.visit(node.elts[0], options, (e0, v0) => {
    this.visit(node.elts[1], options, (e1, v1) => {
      const resolved = v0 && v0.tag && v0.tag in STROKE_WIDTH_VALUES
        ? STROKE_WIDTH_VALUES[v0.tag]
        : v0;
      resume([], { ...v1, strokeWidth: resolved });
    });
  });
};

// Generate node-type methods (arity 2).
for (const surface of NODE_TYPE_NAMES) {
  const method = toMethodName(surface);
  const field = NODE_PRIMARY_FIELD[surface];
  if (surface === "stamp") {
    Checker.prototype[method] = function (node, options, resume) {
      this.visit(node.elts[0], options, (e0, v0) => {
        this.visit(node.elts[1], options, (e1) => {
          const err = [...e0, ...e1, ...checkTagOnly(v0, ENUM_TAG_VALUES.stamp, "stamp")];
          resume(err, node);
        });
      });
    };
    Transformer.prototype[method] = function (node, options, resume) {
      this.visit(node.elts[0], options, (e0, v0) => {
        this.visit(node.elts[1], options, (e1, v1) => {
          const variant = v0 && v0.tag ? v0.tag : v0;
          const primary = v1[field] !== undefined ? v1[field] : variant;
          resume([], { ...v1, type: surface, [field]: primary });
        });
      });
    };
    continue;
  }
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
