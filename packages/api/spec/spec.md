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
| `trapezoid` | `<string record: record>` | Trapezoid |
| `predefined-process` | `<string record: record>` | Subroutine box with side bars |
| `shield` | `<string record: record>` | Shield outline |
| `document-single` | `<string record: record>` | Document with wavy bottom |
| `document-multiple` | `<string record: record>` | Stack of documents |
| `manual-input` | `<string record: record>` | Flowchart manual-input quadrilateral |
| `hexagon` | `<string record: record>` | Regular hexagon |
| `chevron` | `<string record: record>` | Chevron / arrow block |
| `pentagon` | `<string record: record>` | Regular pentagon |
| `octagon` | `<string record: record>` | Regular octagon |
| `star` | `<string record: record>` | Five-point star |
| `plus` | `<string record: record>` | Plus / cross |
| `arrow-left` | `<string record: record>` | Arrow pointing left |
| `arrow-right` | `<string record: record>` | Arrow pointing right |
| `summing-junction` | `<string record: record>` | Circle with cross |
| `or` | `<string record: record>` | Circle with vertical bar |
| `speech-bubble` | `<string record: record>` | Speech bubble |
| `internal-storage` | `<string record: record>` | Rectangle with inset borders |
| `x` | `<number record: record>` | Horizontal position in board units |
| `y` | `<number record: record>` | Vertical position in board units |
| `width` | `<number record: record>` | Width in board units |
| `height` | `<number record: record>` | Height in board units |
| `fill` | `<string record: record>` | Fill color (hex string) |
| `stroke` | `<string record: record>` | Stroke color (hex string) |
| `stroke-width` | `<number\|string record: record>` | Stroke width as a number, or one of `"thin"` (2), `"thick"` (4) |
| `opacity` | `<number record: record>` | Opacity on a 0–100 scale (0 = transparent, 100 = opaque) |
| `label` | `<string record: record>` | Label text (e.g. on a connector) |
| `color` | `<string record: record>` | Text/foreground color (hex); on a connector, sets the line color |
| `from` | `<string\|list record: record>` | Source node(s) for a connector |
| `to` | `<string\|list record: record>` | Target node(s) for a connector |
| `line-type` | `<string record: record>` | Connector routing: `"straight"` or `"elbowed"` |
| `line-style` | `<string record: record>` | Connector line style: `"solid"` or `"dashed"` |
| `from-cap` | `<string record: record>` | Stroke cap at the `from` end of a connector |
| `to-cap` | `<string record: record>` | Stroke cap at the `to` end of a connector |
| `from-side` | `<string record: record>` | Side of the `from` node the connector attaches to |
| `to-side` | `<string record: record>` | Side of the `to` node the connector attaches to |

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
| `color`       |   —    |  ✓   |   —   |    —    |   —   |     ✓     |
| `label`       |   ✓    |  ✓   |   ✓   |    —    |   —   |     ✓     |
| `from`, `to`  |   —    |  —   |   —   |    —    |   —   |     ✓     |
| `line-type`   |   —    |  —   |   —   |    —    |   —   |     ✓     |
| `line-style`  |   —    |  —   |   —   |    —    |   —   |     ✓     |
| `from-cap`, `to-cap` | — | — |  —   |    —    |   —   |     ✓     |
| `from-side`, `to-side` | — | — | —  |    —    |   —   |     ✓     |

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

A FigJam sticky note. The first argument is the sticky's **id** and
default text content. Pass `label "..."` to override the displayed
text while keeping the id as the addressable key.

```
sticky "Kickoff" x 0 y 0 {}
sticky "kickoff-1" label "Kickoff" x 0 y 0 {}
```

### text

A free-floating text node. The first argument is the text node's **id**
and default displayed text. `label "..."` overrides the displayed text.

```
text "Section heading" x 0 y 0 {}
text "heading-1" label "Section heading" x 0 y 0 {}
```

### connector

A connector (line/arrow) between two nodes. The first argument is the
connector's label string — pass `""` for an unlabeled connector. An
explicit `label "..."` property overrides the first argument.

Endpoints are specified with the `from` and `to` property setters. Each
accepts a **node identifier** — matched against the addressable key of
another node on the board — or a list of identifiers, following the
same convention as `edge` in L0169.

| Node function | Identifier used by `from` / `to` |
| :------------ | :------------------------------- |
| `sticky`, `text` | the node's **id** (first argument) |
| `section` | the section's name (first argument) |
| any shape function (`ellipse`, `diamond`, …) | the shape's **id** (first argument) |
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

A section container that groups other nodes. The first argument is the
section name. A section can be a leaf (just a labelled frame) or a true
container — if its property record includes a `nodes` list, those nodes
are rendered as children of the section.

Leaf section (size specified explicitly):

```
section "Phase 1" width 600 height 400 {}
```

Container section (wraps nested nodes; size defaults to fit):

```
section "Phase 1" nodes [
  sticky "Kickoff" x 40 y 40 {},
  ellipse "Decide?" x 240 y 40 {}
] {}
```

Connectors declared at the board level can still target nodes inside a
section by their primary string — the name lookup is global.

### stamp

A FigJam stamp/reaction. The first argument identifies the stamp variant.

```
stamp "like" x 100 y 100 {}
```

### Shape functions

Each shape function takes the shape's **id** as its first argument (use
`""` for an unidentified shape). The id doubles as the default displayed
text; pass `label "..."` to override the displayed text while keeping
the id as the addressable key. Shape functions share the same signature
and differ only in the shape they render.

```
ellipse "Start" x 0 y 0 fill "#ffcc00" {}
ellipse "start-1" label "Start" x 0 y 0 {}
diamond "Decision?" x 200 y 0 {}
predefined-process "Compute" x 400 y 0 {}
speech-bubble "Aside" x 600 y 0 {}
```

Shape surface names mirror Figma's `ShapeWithTextNode.shapeType` enum in
lower kebab-case. Available shape functions: `square`, `ellipse`,
`rounded-rectangle`, `diamond`, `triangle-up`, `triangle-down`,
`parallelogram-right`, `parallelogram-left`, `eng-database`, `eng-queue`,
`eng-file`, `eng-folder`, `trapezoid`, `predefined-process`, `shield`,
`document-single`, `document-multiple`, `manual-input`, `hexagon`,
`chevron`, `pentagon`, `octagon`, `star`, `plus`, `arrow-left`,
`arrow-right`, `summing-junction`, `or`, `speech-bubble`,
`internal-storage`.

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

Sets the node's stroke width in board units. Accepts a number or one of
the aliases `"thin"` (2) or `"thick"` (4), mirroring FigJam's preset
weights.

```
square "Box" stroke "#333333" stroke-width 2 {}
connector "" from "A" to "B" stroke-width "thick" {}
```

### opacity

Sets the node's opacity on a 0–100 scale (`0` fully transparent, `100`
fully opaque).

```
ellipse "Ghost" opacity 50 {}
```

### label

Sets the displayed text of the wrapped node. On a sticky, text, or
shape, `label` overrides the default text (which comes from the id).
On a connector, `label` overrides the first-argument label. In every
case the first argument remains the node's addressable id.

```
sticky "s1" label "Kickoff" {}
ellipse "start-1" label "Start" {}
connector "c1" label "leads to" from "s1" to "start-1" {}
```

### color

Sets a text/foreground color as a hex string. On a `text` node, this is
the text color. On a `connector`, this sets the line color (equivalent
to `stroke` — useful when authoring connectors so the same `color`
keyword reads naturally as "the connector is red").

```
text "Heading" color "#111111" {}
connector "" from "A" to "B" color "#ef4444" {}
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

### line-type

Sets the connector's routing style. Values: `"straight"` or `"elbowed"`.
Maps to Figma's `connectorLineType`.

```
connector "" from "A" to "B" line-type "elbowed" {}
```

### line-style

Sets the connector's line style. Values: `"solid"` (default) or
`"dashed"`. Arrowhead caps remain solid even when the line is dashed —
this matches Figma's rendering.

```
connector "" from "A" to "B" line-style "dashed" {}
```

### from-cap / to-cap

Sets the stroke cap at the `from` or `to` end of a connector. Values
are the lower-kebab-case form of Figma's `ConnectorStrokeCap` enum:
`"none"`, `"arrow-lines"`, `"arrow-equilateral"`, `"triangle-filled"`,
`"circle-filled"`, `"diamond-filled"`. Default is `none` on the from
end and an arrow on the to end. Set both to an arrow for a
bidirectional connector.

```
connector "syncs" from "A" to "B" from-cap "arrow-lines" to-cap "arrow-lines" {}
```

### from-side / to-side

Sets which side of the `from` or `to` node the connector attaches to.
Values are the lower-kebab-case form of Figma's `ConnectorMagnet` enum:
`"auto"`, `"top"`, `"bottom"`, `"left"`, `"right"`, `"center"`. Default
is `"auto"`, which picks a side based on the relative positions of the
two nodes.

Because `auto` considers only node positions (not other connectors),
two connectors between the same pair of nodes will stack on top of
each other. Set explicit sides to separate them:

```
connector "primary"   from "A" to "B" from-side "right"  to-side "left" {}
connector "secondary" from "A" to "B" from-side "bottom" to-side "top"  {}
```

## Program Example

```
board "https://www.figma.com/board/ABC123/My-Board" nodes [
  sticky "Hello" {}
  ellipse "Center" x 100 y 100 {}
  connector "link" from "Hello" to "Center" {}
] {}..
```
