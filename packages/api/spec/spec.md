<!-- SPDX-License-Identifier: CC-BY-4.0 -->
# L0172 Vocabulary

This specification documents dialect-specific functions available in the
**L0172** language of Graffiticode. These functions extend the core language
with functionality for authoring FigJam board content.

The core language specification including the definition of its syntax,
semantics and base library can be found here:
[Graffiticode Language Specification](./graffiticode-language-spec.html)

## Functions

| Function | Signature | Description |
| :------- | :-------- | :---------- |
| `board` | `<string record: record>` | Root of a board; file key or board URL |
| `nodes` | `<list record: record>` | Attaches a list of nodes to the board |
| `sticky` | `<string record: record>` | A FigJam sticky note |
| `text` | `<string record: record>` | A free-floating text node |
| `connector` | `<string record: record>` | A line/arrow between nodes |
| `section` | `<string record: record>` | A section container grouping nodes |
| `stamp` | `<string record: record>` | A FigJam stamp/reaction |
| `square` | `<string record: record>` | Square / rectangle shape |
| `ellipse` | `<string record: record>` | Ellipse / oval shape |
| `rounded-rectangle` | `<string record: record>` | Rectangle with rounded corners |
| `diamond` | `<string record: record>` | Rhombus shape |
| `triangle-up` | `<string record: record>` | Triangle pointing up |
| `triangle-down` | `<string record: record>` | Triangle pointing down |
| `parallelogram-right` | `<string record: record>` | Parallelogram skewed right |
| `parallelogram-left` | `<string record: record>` | Parallelogram skewed left |
| `eng-database` | `<string record: record>` | Cylindrical database symbol |
| `eng-queue` | `<string record: record>` | Queue symbol |
| `eng-file` | `<string record: record>` | File symbol |
| `eng-folder` | `<string record: record>` | Folder symbol |
| `predefined-process` | `<string record: record>` | Subroutine box with side bars |
| `shield` | `<string record: record>` | Shield outline |
| `document` | `<string record: record>` | Document with wavy bottom |
| `process` | `<string record: record>` | Flowchart process box |
| `decision` | `<string record: record>` | Flowchart decision diamond |
| `input-output` | `<string record: record>` | Flowchart I/O parallelogram |
| `terminator` | `<string record: record>` | Flowchart start/end pill |
| `summing-junction` | `<string record: record>` | Circle with cross |
| `logic-or` | `<string record: record>` | Circle with vertical bar |
| `internal-storage` | `<string record: record>` | Rectangle with inset borders |
| `cloud` | `<string record: record>` | Cloud outline |
| `heart` | `<string record: record>` | Heart |
| `trapezoid` | `<string record: record>` | Trapezoid |
| `star` | `<string record: record>` | Five-point star |
| `x` | `<number record: record>` | Horizontal position in board units |
| `y` | `<number record: record>` | Vertical position in board units |
| `width` | `<number record: record>` | Width in board units |
| `height` | `<number record: record>` | Height in board units |
| `fill` | `<string record: record>` | Fill color (hex string) |
| `stroke` | `<string record: record>` | Stroke color (hex string) |
| `stroke-width` | `<number record: record>` | Stroke width in board units |
| `opacity` | `<number record: record>` | Opacity on a 0–100 scale (0 = transparent, 100 = opaque) |
| `label` | `<string record: record>` | Label text (e.g. on a connector) |
| `color` | `<string record: record>` | Generic text/foreground color (hex) |
| `from` | `<string\|list record: record>` | Source node(s) for a connector |
| `to` | `<string\|list record: record>` | Target node(s) for a connector |

All functions in this dialect are arity 2, take their property record as
the final argument, and return a record. Use `{}` as a terminating empty
record. A program is terminated with `..`.

### Property applicability

Not every property setter is meaningful on every node type. The table
below lists which properties are honored by the renderer.

| Property      | sticky | text | shape | section | stamp | connector |
| :------------ | :----: | :--: | :---: | :-----: | :---: | :-------: |
| `x`, `y`      |   ✓    |  ✓   |   ✓   |    ✓    |   ✓   |     —     |
| `width`, `height` | — | —  |   ✓   |    ✓    |   —   |     —     |
| `fill`        |   ✓    |  —   |   ✓   |    ✓    |   —   |     —     |
| `stroke`, `stroke-width` | — | — | ✓ |   —    |   —   |     ✓     |
| `opacity`     |   ✓    |  ✓   |   ✓   |    ✓    |   ✓   |     ✓     |
| `color`       |   —    |  ✓   |   —   |    —    |   —   |     —     |
| `label`       |   —    |  —   |   —   |    —    |   —   |     ✓     |
| `from`, `to`  |   —    |  —   |   —   |    —    |   —   |     ✓     |

### board

Root of a board. The first argument is a Figma file key (e.g. `"ABC123"`)
or a full board URL of the form `figma.com/board/<key>/<name>` — URL forms
are normalized to the file key. The property record carries a `nodes`
list and any other board-level properties.

```
board "ABC123" nodes [sticky "Hello" {}] {}..
```

### nodes

Attaches a list of node records to the board.

```
board "ABC123" nodes [
  sticky "Kickoff" {},
  ellipse "Decision" {}
] {}..
```

### sticky

A FigJam sticky note. The first argument is the sticky's text content.

```
sticky "Kickoff" x 0 y 0 {}
```

### text

A free-floating text node. The first argument is the displayed text.

```
text "Section heading" x 0 y 0 {}
```

### connector

A connector (line/arrow) between two nodes. The first argument is the
connector's label string — pass `""` for an unlabeled connector.

Endpoints are specified with the `from` and `to` property setters. Each
accepts a **node identifier** — matched against the primary string of
another node on the board — or a list of identifiers, following the
same convention as `edge` in L0169.

| Node function | Identifier used by `from` / `to` |
| :------------ | :------------------------------- |
| `sticky`, `text` | the node's text (first argument) |
| `section` | the section's name (first argument) |
| any shape function (`ellipse`, `diamond`, …) | the shape's text (first argument) |
| `stamp` | the stamp's variant (first argument) |

Identifier matching is by exact string. When a list is supplied, the
connector fans out to every matching node. The special value `"*"` means
all nodes on the board except those specified on the opposite endpoint
(same semantics as L0169's `edge`).

Basic connector between two sticky notes:

```
board "ABC123" nodes [
  sticky "A" x 0 y 0 {},
  sticky "B" x 200 y 0 {},
  connector "leads to" from "A" to "B" {}
] {}..
```

Fan-out to multiple targets:

```
connector "feeds" from "Hub" to ["A", "B", "C"] {}
```

Wildcard — connect `Hub` to every other node on the board:

```
connector "" from "Hub" to "*" {}
```

Connectors sharing endpoints but differing in label are distinct:

```
connector "yes" from "Decision?" to "Ship" {}
connector "no"  from "Decision?" to "Hold" {}
```

### section

A section container that visually groups nodes. The first argument is the
section name.

```
section "Phase 1" width 600 height 400 {}
```

### stamp

A FigJam stamp/reaction. The first argument identifies the stamp variant.

```
stamp "like" x 100 y 100 {}
```

### Shape functions

Each shape function takes the shape's text content as its first argument
(use `""` for an unlabeled shape) and produces a FigJam shape-with-text of
the corresponding silhouette. Shape functions share the same signature and
differ only in the shape they render.

```
ellipse "Start" x 0 y 0 fill "#ffcc00" {}
diamond "Decision?" x 200 y 0 {}
process "Compute" x 400 y 0 {}
cloud "External" x 600 y 0 {}
```

Available shape functions: `square`, `ellipse`, `rounded-rectangle`,
`diamond`, `triangle-up`, `triangle-down`, `parallelogram-right`,
`parallelogram-left`, `eng-database`, `eng-queue`, `eng-file`,
`eng-folder`, `predefined-process`, `shield`, `document`, `process`,
`decision`, `input-output`, `terminator`, `summing-junction`, `logic-or`,
`internal-storage`, `cloud`, `heart`, `trapezoid`, `star`.

### x

Sets the node's horizontal position in board units.

```
sticky "A" x 100 {}
```

### y

Sets the node's vertical position in board units.

```
sticky "A" y 100 {}
```

### width

Sets the node's width in board units.

```
section "Group" width 600 {}
```

### height

Sets the node's height in board units.

```
section "Group" height 400 {}
```

### fill

Sets the node's fill color as a hex string.

```
ellipse "Warn" fill "#ffcc00" {}
```

### stroke

Sets the node's stroke color as a hex string.

```
square "Box" stroke "#333333" {}
```

### stroke-width

Sets the node's stroke width in board units.

```
square "Box" stroke "#333333" stroke-width 2 {}
```

### opacity

Sets the node's opacity on a 0–100 scale (`0` fully transparent, `100`
fully opaque).

```
ellipse "Ghost" opacity 50 {}
```

### label

Sets a label on the wrapped record (e.g. an alternative label on a
connector).

```
connector "" label "leads to" {}
```

### color

Sets a generic text/foreground color as a hex string.

```
text "Heading" color "#111111" {}
```

### from

Sets the source node(s) for a connector. Matched against the primary
string of a node on the board. Accepts a single string or a list of
strings. The special value `"*"` means all nodes except those specified
in `to`.

```
from "Hub"
from ["Hub", "Foo"]
from "*"
```

### to

Sets the target node(s) for a connector. Matched against the primary
string of a node on the board. Accepts a single string or a list of
strings. The special value `"*"` means all nodes except those specified
in `from`.

```
to "Foo"
to ["Foo", "Bar"]
to "*"
```

## Program Example

```
board "https://www.figma.com/board/ABC123/My-Board" nodes [
  sticky "Hello" {}
  ellipse "Center" x 100 y 100 {}
  connector "link" from "Hello" to "Center" {}
] {}..
```
