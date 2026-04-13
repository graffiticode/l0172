<!-- SPDX-License-Identifier: CC-BY-4.0 -->
# L0172 Vocabulary

This specification documents dialect-specific functions available in the
**L0172** language of Graffiticode, which produces FigJam board content.

The core language specification including the definition of its syntax,
semantics and base library can be found here:
[Graffiticode Language Specification](./graffiticode-language-spec.html)

## Structural Functions

| Function | Arity | Signature | Description |
| :------- | :---- | :-------- | :---------- |
| `board`  | 2 | `<fileKeyOrUrl: string> <rec: record>` | Root of a board. Accepts a Figma file key or a `figma.com/board/<key>/...` URL. |
| `pages`  | 2 | `<list> <rec: record>` | Attaches a list of `page` records to the wrapped record. |
| `page`   | 2 | `<name: string> <rec: record>` | A single page on the board. |
| `nodes`  | 2 | `<list> <rec: record>` | Attaches a list of node records to the wrapped record. |

## Node Types

All node-type functions are arity 2: `<text-or-name: string> <rec: record>`.

| Function | Emitted `type` | Primary field |
| :------- | :------------- | :------------ |
| `sticky`    | `sticky`    | `text`  |
| `text`      | `text`      | `text`  |
| `connector` | `connector` | `label` |
| `section`   | `section`   | `name`  |
| `stamp`     | `stamp`     | `stamp` |

## Shape Types (shape-with-text)

All shape functions are arity 2: `<text: string> <rec: record>`. They emit
`{ type: "shape", shapeType: "<ENUM>", text, ...rec }` using FigJam's
`shapeType` enum.

`square`, `ellipse`, `rounded-rectangle`, `diamond`, `triangle-up`,
`triangle-down`, `parallelogram-right`, `parallelogram-left`,
`eng-database`, `eng-queue`, `eng-file`, `eng-folder`,
`predefined-process`, `shield`, `document`, `process`, `decision`,
`input-output`, `terminator`, `summing-junction`, `logic-or`,
`internal-storage`, `cloud`, `heart`, `trapezoid`, `star`.

## Property Setters

All property setters are arity 2: `<value> <rec: record>`. They attach a
field to the wrapped record.

`x`, `y`, `width`, `height`, `fill`, `stroke`, `stroke-width`, `opacity`,
`label`, `color`.

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
