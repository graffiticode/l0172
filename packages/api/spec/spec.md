<!-- SPDX-License-Identifier: CC-BY-4.0 -->
# L0172 Vocabulary

This specification documents dialect-specific functions available in the
**L0172** language of Graffiticode, which produces FigJam board content.

The core language specification including the definition of its syntax,
semantics and base library can be found here:
[Graffiticode Language Specification](./graffiticode-language-spec.html)

## Structural Functions

| Function | Type | Description |
| :------- | :--- | :---------- |
| `board` | `<string record: record>` | Root of a board. First arg is a Figma file key or a `figma.com/board/<key>/...` URL. |
| `pages` | `<list record: record>` | Attaches a list of `page` records to the wrapped record. |
| `page`  | `<string record: record>` | A single page on the board. |
| `nodes` | `<list record: record>` | Attaches a list of node records to the wrapped record. |

## Node-Type Functions

All node-type functions have type `<string record: record>`. The first
argument is the node's primary string (text / label / name / stamp); the
second is the property record. They emit `{ type, <primary field>, ...rec }`.

| Function | Emitted `type` | Primary field |
| :------- | :------------- | :------------ |
| `sticky`    | `sticky`    | `text`  |
| `text`      | `text`      | `text`  |
| `connector` | `connector` | `label` |
| `section`   | `section`   | `name`  |
| `stamp`     | `stamp`     | `stamp` |

## Shape Functions

All shape functions have type `<string record: record>`. The first argument
is the shape's text content. They emit
`{ type: "shape", shapeType: "<ENUM>", text, ...rec }` using FigJam's
`shapeType` enum.

| Function | `shapeType` |
| :------- | :---------- |
| `square`               | `SQUARE` |
| `ellipse`              | `ELLIPSE` |
| `rounded-rectangle`    | `ROUNDED_RECTANGLE` |
| `diamond`              | `DIAMOND` |
| `triangle-up`          | `TRIANGLE_UP` |
| `triangle-down`        | `TRIANGLE_DOWN` |
| `parallelogram-right`  | `PARALLELOGRAM_RIGHT` |
| `parallelogram-left`   | `PARALLELOGRAM_LEFT` |
| `eng-database`         | `ENG_DATABASE` |
| `eng-queue`            | `ENG_QUEUE` |
| `eng-file`             | `ENG_FILE` |
| `eng-folder`           | `ENG_FOLDER` |
| `predefined-process`   | `PREDEFINED_PROCESS` |
| `shield`               | `SHIELD` |
| `document`             | `DOCUMENT` |
| `process`              | `PROCESS` |
| `decision`             | `DECISION` |
| `input-output`         | `INPUT_OUTPUT` |
| `terminator`           | `TERMINATOR` |
| `summing-junction`     | `SUMMING_JUNCTION` |
| `logic-or`             | `LOGIC_OR` |
| `internal-storage`     | `INTERNAL_STORAGE` |
| `cloud`                | `CLOUD` |
| `heart`                | `HEART` |
| `trapezoid`            | `TRAPEZOID` |
| `star`                 | `STAR` |

## Property Setters

Property setters attach a field to the wrapped record.

| Function | Type |
| :------- | :--- |
| `x`            | `<number record: record>` |
| `y`            | `<number record: record>` |
| `width`        | `<number record: record>` |
| `height`       | `<number record: record>` |
| `fill`         | `<string record: record>` |
| `stroke`       | `<string record: record>` |
| `stroke-width` | `<number record: record>` |
| `opacity`      | `<number record: record>` |
| `label`        | `<string record: record>` |
| `color`        | `<string record: record>` |

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
