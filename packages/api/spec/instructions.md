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

All have type `<string record: record>`. First arg is the node's primary
string (text / label / name / stamp).

`sticky`, `text`, `connector`, `section`, `stamp`.

## Shape functions

All have type `<string record: record>`. First arg is the shape's text
content. Emits a FigJam shape-with-text of the given silhouette.

`square`, `ellipse`, `rounded-rectangle`, `diamond`, `triangle-up`,
`triangle-down`, `parallelogram-right`, `parallelogram-left`,
`eng-database`, `eng-queue`, `eng-file`, `eng-folder`,
`predefined-process`, `shield`, `document`, `process`, `decision`,
`input-output`, `terminator`, `summing-junction`, `logic-or`,
`internal-storage`, `cloud`, `heart`, `trapezoid`, `star`.

## Property setters

Attach a field to the wrapped record.

| Function | Type |
| :------- | :--- |
| `x`, `y`, `width`, `height`, `stroke-width`, `opacity` | `<number record: record>` |
| `fill`, `stroke`, `label`, `color`, `from`, `to` | `<string record: record>` |

`opacity` is on a 0–100 scale: `0` fully transparent, `100` fully opaque
(e.g. `opacity 50` is half-transparent). `from`/`to` reference other nodes
by their primary string; the special value `"*"` means all other nodes.

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
