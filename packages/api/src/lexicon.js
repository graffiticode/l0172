// SPDX-License-Identifier: MIT
const fn1 = (name) => ({ tk: 1, name, cls: "function", length: 1, arity: 1 });
const fn2 = (name) => ({ tk: 1, name, cls: "function", length: 2, arity: 2 });

const SHAPE_TYPES = {
  "square": "SQUARE",
  "ellipse": "ELLIPSE",
  "rounded-rectangle": "ROUNDED_RECTANGLE",
  "diamond": "DIAMOND",
  "triangle-up": "TRIANGLE_UP",
  "triangle-down": "TRIANGLE_DOWN",
  "parallelogram-right": "PARALLELOGRAM_RIGHT",
  "parallelogram-left": "PARALLELOGRAM_LEFT",
  "eng-database": "ENG_DATABASE",
  "eng-queue": "ENG_QUEUE",
  "eng-file": "ENG_FILE",
  "eng-folder": "ENG_FOLDER",
  "predefined-process": "PREDEFINED_PROCESS",
  "shield": "SHIELD",
  "document": "DOCUMENT",
  "process": "PROCESS",
  "decision": "DECISION",
  "input-output": "INPUT_OUTPUT",
  "terminator": "TERMINATOR",
  "summing-junction": "SUMMING_JUNCTION",
  "logic-or": "LOGIC_OR",
  "internal-storage": "INTERNAL_STORAGE",
  "cloud": "CLOUD",
  "heart": "HEART",
  "trapezoid": "TRAPEZOID",
  "star": "STAR",
};

const NODE_TYPES = ["sticky", "text", "connector", "section", "stamp"];

const PROP_SETTERS = [
  "x", "y", "width", "height",
  "fill", "stroke", "stroke-width", "opacity",
  "label", "color",
  "from", "to",
];

const toMethodName = (surface) => surface.replace(/-/g, "_").toUpperCase();

export const lexicon = {
  "board": fn2("BOARD"),
  "nodes": fn2("NODES"),
  ...Object.fromEntries(NODE_TYPES.map((n) => [n, fn2(toMethodName(n))])),
  ...Object.fromEntries(Object.keys(SHAPE_TYPES).map((n) => [n, fn2(toMethodName(n))])),
  ...Object.fromEntries(PROP_SETTERS.map((n) => [n, fn2(toMethodName(n))])),
};

export const SHAPE_TYPE_ENUM = SHAPE_TYPES;
export const NODE_TYPE_NAMES = NODE_TYPES;
