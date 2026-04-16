// SPDX-License-Identifier: MIT
const fn1 = (name) => ({ tk: 1, name, cls: "function", length: 1, arity: 1 });
const fn2 = (name) => ({ tk: 1, name, cls: "function", length: 2, arity: 2 });

// Surface names mirror Figma's ShapeWithTextNode.shapeType enum (lower
// kebab-case ↔ SCREAMING_SNAKE_CASE). Only shapes Figma actually renders
// are exposed here — dropping flowchart aliases (process, decision,
// input-output, terminator, document, heart, cloud, logic-or) that Figma
// would silently render as an ellipse.
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
  "trapezoid": "TRAPEZOID",
  "predefined-process": "PREDEFINED_PROCESS",
  "shield": "SHIELD",
  "document-single": "DOCUMENT_SINGLE",
  "document-multiple": "DOCUMENT_MULTIPLE",
  "manual-input": "MANUAL_INPUT",
  "hexagon": "HEXAGON",
  "chevron": "CHEVRON",
  "pentagon": "PENTAGON",
  "octagon": "OCTAGON",
  "star": "STAR",
  "plus": "PLUS",
  "arrow-left": "ARROW_LEFT",
  "arrow-right": "ARROW_RIGHT",
  "summing-junction": "SUMMING_JUNCTION",
  "or": "OR",
  "speech-bubble": "SPEECH_BUBBLE",
  "internal-storage": "INTERNAL_STORAGE",
};

const NODE_TYPES = ["sticky", "text", "connector", "section", "stamp"];

const PROP_SETTERS = [
  "x", "y", "width", "height",
  "fill", "stroke", "stroke-width", "opacity",
  "label", "color",
  "from", "to",
  "line-type", "from-cap", "to-cap",
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
