<!-- SPDX-License-Identifier: CC-BY-4.0 -->
# L0172 Dialect Extensions

L0172 is a Graffiticode dialect for describing ellipse shapes and
rendering them on a FigJam board.

## L0172 Functions

Each function takes a value followed by a *rest* record and returns a
new record with one field set. Chain calls together to build a shape
and terminate with `{}`.

| Function       | Signature                 | Field set       |
| :------------- | :------------------------ | :-------------- |
| `ellipse`      | `<string record: record>` | `name`          |
| `x`            | `<number record: record>` | `x`             |
| `y`            | `<number record: record>` | `y`             |
| `width`        | `<number record: record>` | `width`         |
| `height`       | `<number record: record>` | `height`        |
| `fill`         | `<string record: record>` | `fill`          |
| `stroke`       | `<string record: record>` | `stroke`        |
| `stroke-width` | `<number record: record>` | `strokeWidth`   |
| `opacity`      | `<number record: record>` | `opacity`       |
| `label`        | `<string record: record>` | `label`         |
| `color`        | `<string record: record>` | `color`         |
| `figjam`       | `<string record: record>` | `figjamFileKey` |

A program is one or more chained records, top-level. The compiler
collects every record that has a `name` field into an `ellipses` array.
If any `figjam` call is present, its value becomes `figjamFileKey` at
the top level.

## L0172 Examples

### A single ellipse
```
ellipse "a" x 100 y 100 width 200 height 100 fill "#4f46e5" {}..
```

### Multiple ellipses with stroke
```
ellipse "a" x  50 y  50 width 120 height  80 fill "#4f46e5" {}
ellipse "b" x 200 y 120 width 140 height  90 fill "#f59e0b" stroke "#000" stroke-width 2 {}..
```

### Label and opacity
```
ellipse "a" x 100 y 100 width 200 height 100 fill "#4f46e5" label "hello" color "white" opacity 0.8 {}..
```

### Targeting a FigJam file
```
figjam "ABC123FileKey" {}
ellipse "a" x 100 y 100 width 200 height 100 fill "#4f46e5" {}..
```

### Reusing values via `let`
```
let blue = "#4f46e5"..
ellipse "a" x 100 y 100 width 200 height 100 fill blue {}..
```
