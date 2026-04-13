<!-- SPDX-License-Identifier: CC-BY-4.0 -->
# L0172 Dialect Extensions

L0172 generates FigJam board content. Programs describe a board → pages →
nodes hierarchy using the functions below.

## Structural functions

| Function | Arity | Signature | Description |
| :------- | :---- | :-------- | :---------- |
| `board`  | 2 | `<fileKeyOrUrl: string> <rec>` | Root; accepts a Figma file key or full `figma.com/board/...` URL. |
| `pages`  | 2 | `<list> <rec>` | Attaches pages list to the record. |
| `page`   | 2 | `<name: string> <rec>` | One page. |
| `nodes`  | 2 | `<list> <rec>` | Attaches nodes list to the record. |

## Node-type functions (arity 2)

`sticky`, `text`, `connector`, `section`, `stamp`. First argument is the
node's primary string (text / label / name / stamp).

## Shape-with-text functions (arity 2)

First argument is the shape's text content. Emits
`{ type: "shape", shapeType: "<ENUM>", text, ... }`.

`square`, `ellipse`, `rounded-rectangle`, `diamond`, `triangle-up`,
`triangle-down`, `parallelogram-right`, `parallelogram-left`,
`eng-database`, `eng-queue`, `eng-file`, `eng-folder`,
`predefined-process`, `shield`, `document`, `process`, `decision`,
`input-output`, `terminator`, `summing-junction`, `logic-or`,
`internal-storage`, `cloud`, `heart`, `trapezoid`, `star`.

## Property setters (arity 2)

Attach a field to the wrapped record.

`x`, `y`, `width`, `height`, `fill`, `stroke`, `stroke-width`, `opacity`,
`label`, `color`.

## Examples

Rules:
- `..` terminates the entire program — use it only once, at the very end.
- All functions are arity 2 and must be terminated with a record. Use `{}` when there are no more props.

### Single-page shorthand
For a board with one page, `pages [page ...]` may be elided — pass `nodes`
directly to `board`:
```
board "ABC123" nodes [sticky "Hello" {}] {}..
```

### Minimal board
```
board "ABC123" pages [page "Page 1" nodes [] {} ] {}..
```

### Board with mixed nodes
```
board "https://www.figma.com/board/ABC123/Demo" pages [
  page "Flow" nodes [
    sticky "Kickoff" x 0 y 0 {}
    ellipse "Decision" x 200 y 0 fill "#ffcc00" {}
    connector "next" {}
  ] {}
] {}..
```
