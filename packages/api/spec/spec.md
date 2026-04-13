<!-- SPDX-License-Identifier: CC-BY-4.0 -->
# L0172 Vocabulary

This specification documents dialect-specific functions available in the
**L0172** language of Graffiticode, which produces FigJam board content.

The core language specification including the definition of its syntax,
semantics and base library can be found here:
[Graffiticode Language Specification](./graffiticode-language-spec.html)

Function types are written in Graffiticode lambda-type syntax:
`<arg1 arg2: return>`. All functions in this dialect are arity 2, take
their property record as the final argument, and return a record. Use `{}`
as a terminating empty record. Programs are terminated with `..`.

---

## Structural Functions

### `board`
**Type:** `<string record: record>`

Root of a board. The first argument is a Figma file key (e.g. `"ABC123"`)
or a full board URL of the form `figma.com/board/<key>/<name>` — URL forms
are normalized to the file key. The second argument is the board's
property record, typically containing `pages` (or `nodes` as a single-page
shorthand).

Emits `{ type: "board", fileKey, ...rec }`. If `rec` has `nodes` but no
`pages`, the nodes are auto-wrapped in a single anonymous page.

### `pages`
**Type:** `<list record: record>`

Attaches a list of `page` records as the `pages` field of the wrapped
record. Used as the second argument's child of `board`.

Emits `{ ...rec, pages: <list> }`.

### `page`
**Type:** `<string record: record>`

A single page on the board. The first argument is the page name; the
second is its property record, typically containing `nodes`.

Emits `{ type: "page", name, ...rec }`.

### `nodes`
**Type:** `<list record: record>`

Attaches a list of node records as the `nodes` field of the wrapped
record. Used inside `page` (or directly inside `board` for the
single-page shorthand).

Emits `{ ...rec, nodes: <list> }`.

---

## Node-Type Functions

All node-type functions have type `<string record: record>`. The first
argument is the node's primary string; the second is the property record.
Each emits `{ type: "<type>", <primaryField>: <string>, ...rec }`.

### `sticky`
**Type:** `<string record: record>` — Primary field: `text`

A FigJam sticky note. The first argument is the sticky's text content.
Emits `{ type: "sticky", text, ...rec }`.

### `text`
**Type:** `<string record: record>` — Primary field: `text`

A free-floating text node. The first argument is the displayed text.
Emits `{ type: "text", text, ...rec }`.

### `connector`
**Type:** `<string record: record>` — Primary field: `label`

A connector (line/arrow) between nodes. The first argument is the
connector's label string (use `""` for unlabeled connectors). Endpoint
attachment is supplied via the property record on a per-deployment basis.
Emits `{ type: "connector", label, ...rec }`.

### `section`
**Type:** `<string record: record>` — Primary field: `name`

A section container that visually groups nodes. The first argument is the
section name. Emits `{ type: "section", name, ...rec }`.

### `stamp`
**Type:** `<string record: record>` — Primary field: `stamp`

A FigJam stamp/reaction. The first argument identifies the stamp variant
(e.g. `"like"`). Emits `{ type: "stamp", stamp, ...rec }`.

---

## Shape Functions

All shape functions have type `<string record: record>`. The first
argument is the shape's text content (use `""` for an unlabeled shape).
Each emits `{ type: "shape", shapeType: "<ENUM>", text, ...rec }` using
FigJam's `shapeType` enum. Shape functions differ only in the
`shapeType` value they emit.

| Function | `shapeType` | Visual |
| :------- | :---------- | :----- |
| `square`               | `SQUARE`               | square / rectangle |
| `ellipse`              | `ELLIPSE`              | ellipse / oval |
| `rounded-rectangle`    | `ROUNDED_RECTANGLE`    | rectangle with rounded corners |
| `diamond`              | `DIAMOND`              | rhombus |
| `triangle-up`          | `TRIANGLE_UP`          | triangle pointing up |
| `triangle-down`        | `TRIANGLE_DOWN`        | triangle pointing down |
| `parallelogram-right`  | `PARALLELOGRAM_RIGHT`  | parallelogram skewed right |
| `parallelogram-left`   | `PARALLELOGRAM_LEFT`   | parallelogram skewed left |
| `eng-database`         | `ENG_DATABASE`         | cylindrical database symbol |
| `eng-queue`            | `ENG_QUEUE`            | queue symbol |
| `eng-file`             | `ENG_FILE`             | file symbol |
| `eng-folder`           | `ENG_FOLDER`           | folder symbol |
| `predefined-process`   | `PREDEFINED_PROCESS`   | rectangle with side bars (subroutine) |
| `shield`               | `SHIELD`               | shield outline |
| `document`             | `DOCUMENT`             | document with wavy bottom |
| `process`              | `PROCESS`              | flowchart process box |
| `decision`             | `DECISION`             | flowchart decision diamond |
| `input-output`         | `INPUT_OUTPUT`         | flowchart I/O parallelogram |
| `terminator`           | `TERMINATOR`           | flowchart start/end pill |
| `summing-junction`     | `SUMMING_JUNCTION`     | circle with cross |
| `logic-or`             | `LOGIC_OR`             | circle with vertical bar |
| `internal-storage`     | `INTERNAL_STORAGE`     | rectangle with inset borders |
| `cloud`                | `CLOUD`                | cloud outline |
| `heart`                | `HEART`                | heart |
| `trapezoid`            | `TRAPEZOID`            | trapezoid |
| `star`                 | `STAR`                 | five-point star |

---

## Property Setters

Property setters are arity-2 functions that attach a single named field
to the wrapped record and return the resulting record. They can be
chained: each setter consumes the record produced by the next call.

| Function       | Type                        | Field on record | Description |
| :------------- | :-------------------------- | :-------------- | :---------- |
| `x`            | `<number record: record>`   | `x`             | Horizontal position in board units. |
| `y`            | `<number record: record>`   | `y`             | Vertical position in board units. |
| `width`        | `<number record: record>`   | `width`         | Width in board units. |
| `height`       | `<number record: record>`   | `height`        | Height in board units. |
| `fill`         | `<string record: record>`   | `fill`          | Fill color (hex string, e.g. `"#ffcc00"`). |
| `stroke`       | `<string record: record>`   | `stroke`        | Stroke color (hex string). |
| `stroke-width` | `<number record: record>`   | `strokeWidth`   | Stroke width in board units. |
| `opacity`      | `<number record: record>`   | `opacity`       | Opacity in `[0, 1]`. |
| `label`        | `<string record: record>`   | `label`         | Label text (e.g. on a connector). |
| `color`        | `<string record: record>`   | `color`         | Generic color (text/foreground), hex string. |

---

## Program Example

```
board "https://www.figma.com/board/ABC123/My-Board" pages [
  page "Page 1" nodes [
    sticky "Hello" {}
    ellipse "Center" x 100 y 100 {}
    connector "link" {}
  ] {}
] {}..
```
