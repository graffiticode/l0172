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
shorthand). When `nodes` is supplied without `pages`, the nodes are
auto-wrapped in a single anonymous page.

### `pages`
**Type:** `<list record: record>`

Attaches a list of `page` records to the wrapped record. Used as the
second argument's child of `board`.

### `page`
**Type:** `<string record: record>`

A single page on the board. The first argument is the page name; the
second is its property record, typically containing `nodes`.

### `nodes`
**Type:** `<list record: record>`

Attaches a list of node records to the wrapped record. Used inside `page`
(or directly inside `board` for the single-page shorthand).

---

## Node-Type Functions

All node-type functions have type `<string record: record>`. The first
argument is the node's primary string; the second is the property record.

### `sticky`
**Type:** `<string record: record>`

A FigJam sticky note. The first argument is the sticky's text content.

### `text`
**Type:** `<string record: record>`

A free-floating text node. The first argument is the displayed text.

### `connector`
**Type:** `<string record: record>`

A connector (line/arrow) between nodes. The first argument is the
connector's label string (use `""` for unlabeled connectors). Endpoint
attachment is supplied via the property record on a per-deployment basis.

### `section`
**Type:** `<string record: record>`

A section container that visually groups nodes. The first argument is the
section name.

### `stamp`
**Type:** `<string record: record>`

A FigJam stamp/reaction. The first argument identifies the stamp variant
(e.g. `"like"`).

---

## Shape Functions

All shape functions have type `<string record: record>`. The first
argument is the shape's text content (use `""` for an unlabeled shape).
Shape functions differ only in the visual silhouette they produce.

| Function | Visual |
| :------- | :----- |
| `square`               | square / rectangle |
| `ellipse`              | ellipse / oval |
| `rounded-rectangle`    | rectangle with rounded corners |
| `diamond`              | rhombus |
| `triangle-up`          | triangle pointing up |
| `triangle-down`        | triangle pointing down |
| `parallelogram-right`  | parallelogram skewed right |
| `parallelogram-left`   | parallelogram skewed left |
| `eng-database`         | cylindrical database symbol |
| `eng-queue`            | queue symbol |
| `eng-file`             | file symbol |
| `eng-folder`           | folder symbol |
| `predefined-process`   | rectangle with side bars (subroutine) |
| `shield`               | shield outline |
| `document`             | document with wavy bottom |
| `process`              | flowchart process box |
| `decision`             | flowchart decision diamond |
| `input-output`         | flowchart I/O parallelogram |
| `terminator`           | flowchart start/end pill |
| `summing-junction`     | circle with cross |
| `logic-or`             | circle with vertical bar |
| `internal-storage`     | rectangle with inset borders |
| `cloud`                | cloud outline |
| `heart`                | heart |
| `trapezoid`            | trapezoid |
| `star`                 | five-point star |

---

## Property Setters

Property setters are arity-2 functions that attach a single named
property to the wrapped record. They can be chained.

| Function       | Type                        | Description |
| :------------- | :-------------------------- | :---------- |
| `x`            | `<number record: record>`   | Horizontal position in board units. |
| `y`            | `<number record: record>`   | Vertical position in board units. |
| `width`        | `<number record: record>`   | Width in board units. |
| `height`       | `<number record: record>`   | Height in board units. |
| `fill`         | `<string record: record>`   | Fill color (hex string, e.g. `"#ffcc00"`). |
| `stroke`       | `<string record: record>`   | Stroke color (hex string). |
| `stroke-width` | `<number record: record>`   | Stroke width in board units. |
| `opacity`      | `<number record: record>`   | Opacity in `[0, 1]`. |
| `label`        | `<string record: record>`   | Label text (e.g. on a connector). |
| `color`        | `<string record: record>`   | Generic color (text/foreground), hex string. |

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
