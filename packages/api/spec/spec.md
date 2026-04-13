<!-- SPDX-License-Identifier: CC-BY-4.0 -->
# L0172 Vocabulary

This specification documents dialect-specific functions available in the
**L0172** language of Graffiticode. L0172 describes ellipse shapes for
rendering on a FigJam board.

The core language specification including the definition of its syntax,
semantics and base library can be found here:
[Graffiticode Language Specification](./graffiticode-language-spec.html)

## Functions

Every shape function takes a *value* and a *rest* record, returning a new
record with its field set. Shapes are built by chaining these calls and
terminating with `{}`.

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

A program is a sequence of such chained records. The compiler collects
every record that has a `name` field into an `ellipses` array. If any
`figjam` call is present, its value is attached at the top level as
`figjamFileKey`.

Output shape:

```
{
  "ellipses": [ { "name": ..., "x": ..., ... }, ... ],
  "figjamFileKey": "..."   // optional
}
```

## Program Examples

### A single ellipse

```
ellipse "a" x 100 y 100 width 200 height 100 fill "#4f46e5" {}..
```

### Multiple ellipses

```
ellipse "a" x  50 y  50 width 120 height  80 fill "#4f46e5" {}
ellipse "b" x 200 y 120 width 140 height  90 fill "#f59e0b" stroke "#000" stroke-width 2 {}..
```

### Targeting a FigJam file

```
figjam "ABC123FileKey" {}
ellipse "a" x 100 y 100 width 200 height 100 fill "#4f46e5" {}..
```
