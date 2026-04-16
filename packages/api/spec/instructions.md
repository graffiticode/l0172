<!-- SPDX-License-Identifier: CC-BY-4.0 -->
# L0172 Dialect Extensions

L0172 generates FigJam board content. A program describes a board and its
flat list of nodes. Types are written in Graffiticode lambda-type syntax:
`<arg1 arg2: return>`.

## Structural functions

| Function | Type | Description |
| :------- | :--- | :---------- |
| `board` | `<string record: record>` | Root; first arg is a Figma file key or full `figma.com/board/...` URL. |
| `nodes` | `<list record: record>` | Attaches the node list to the board. |

## Node-type functions

All have type `<string record: record>`.

- `sticky`, `text`, and shape functions: first arg is the node's **id**
  (unique, addressable key used by connector `from`/`to`) and doubles as
  the default displayed text. Use `label "..."` to override the display
  text while keeping the id.
- `section`: first arg is the section's name.
- `stamp`: first arg is the reaction variant (`"like"`, `"love"`, …).
- `connector`: first arg is the connector's label. `label "..."`
  overrides it.

`sticky`, `text`, `connector`, `section`, `stamp`.

`section` is a container: attach a nested `nodes [...]` list to render
its children inside it. If `nodes` is omitted, the section is drawn as a
labelled frame at its given size.

## Shape functions

All have type `<string record: record>`. First arg is the shape's **id**
(addressable; defaults to the displayed text). `label "..."` overrides
the displayed text.

Surface names are lower kebab-case of Figma's `ShapeWithTextNode.shapeType`:
`square`, `ellipse`, `rounded-rectangle`, `diamond`, `triangle-up`,
`triangle-down`, `parallelogram-right`, `parallelogram-left`,
`eng-database`, `eng-queue`, `eng-file`, `eng-folder`, `trapezoid`,
`predefined-process`, `shield`, `document-single`, `document-multiple`,
`manual-input`, `hexagon`, `chevron`, `pentagon`, `octagon`, `star`,
`plus`, `arrow-left`, `arrow-right`, `summing-junction`, `or`,
`speech-bubble`, `internal-storage`.

## Property setters

Attach a field to the wrapped record.

| Function | Type |
| :------- | :--- |
| `x`, `y`, `width`, `height`, `stroke-width`, `opacity` | `<number record: record>` |
| `fill`, `stroke`, `label`, `color`, `from`, `to` | `<string record: record>` |
| `font-size` | `<number\|string record: record>` |

`opacity` is on a 0–100 scale: `0` fully transparent, `100` fully opaque
(e.g. `opacity 50` is half-transparent). `from`/`to` reference other
nodes by their **id** (first argument); the special value `"*"` means
all other nodes. `label` sets the displayed text on sticky/text/shape
nodes, or the connector label. `font-size` accepts a pixel number or
one of FigJam's aliases — `"small"` (16), `"medium"` (24), `"large"`
(40), `"extra-large"` (64), `"huge"` (96).

## Layout sizing

The renderer takes positions and sizes literally — nothing auto-lays-out.
Common failure modes to avoid:

- **Sticky notes are ~240×240 at their default size.** Two stickies placed
  160 units apart will overlap. Space them by at least 260 units
  horizontally or vertically to leave a small gutter. Titled groups of
  stickies usually want 280–320 unit spacing.
- **Sections need room for their contents and their title bar.** A
  section's header takes ~60 units at the top. Size a section so
  `width` ≥ (rightmost child x + child width + 40) and `height` ≥
  (bottommost child y + child height + 80). When in doubt, over-size —
  a loose section reads better than a cramped one that clips its
  children.
- **Wide text and long labels inflate shape/sticky sizes** beyond the
  defaults. If a sticky contains a multi-word phrase, assume it will
  occupy closer to 280 units wide.
- **Shapes-with-text** default to roughly 200×120. Set explicit `width`
  and `height` when packing several in a row; otherwise they collide.
- **Connectors are routed on top of whatever is there.** Leave at least
  60 units of empty space between any two nodes that a connector runs
  between, so the arrow has somewhere to draw.

When a board contains many nodes, sketch the layout as a grid first: pick
a cell size (e.g. 300×300) and place each node on a cell origin. Size
sections to span whole-cell counts.

## Examples

Rules:
- `..` terminates the entire program — use it only once, at the very end.
- All functions are arity 2 and must be terminated with a record. Use `{}` when there are no more props.

### Minimal board
```
board "ABC123" nodes [] {}..
```

### Board with mixed nodes
```
board "https://www.figma.com/board/ABC123/Demo" nodes [
  sticky "Kickoff" x 0 y 0 {}
  ellipse "Decision" x 200 y 0 fill "#ffcc00" {}
  connector "next" from "Kickoff" to "Decision" {}
] {}..
```

### Grouping nodes inside a section
```
board "ABC123" nodes [
  section "Phase 1" nodes [
    sticky "Kickoff" x 40 y 40 {},
    ellipse "Decide?" x 240 y 40 {}
  ] {}
] {}..
```
