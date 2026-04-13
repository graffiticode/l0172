<!-- SPDX-License-Identifier: CC-BY-4.0 -->
# L0172 User Manual

**Introduction**

*Graffiticode* is a collection of domain languages used for creating task
specific web apps. **L0172** is a *Graffiticode* language for describing
ellipse shapes and rendering them on a FigJam board.

### Overview

The code

```
ellipse "a" x 100 y 100 width 200 height 100 fill "#4f46e5" {}..
```

produces the data

```
{ "ellipses": [ { "name": "a", "x": 100, "y": 100, "width": 200, "height": 100, "fill": "#4f46e5" } ] }
```

which the browser view renders as a single filled ellipse.

### Vocabulary

| Function         | Arity | Example                 | Description                                             |
| ---------------- | :---: | ----------------------- | ------------------------------------------------------- |
| **ellipse**      | 2     | `ellipse "a" {}`        | starts an ellipse record named `"a"`                    |
| **x**            | 2     | `x 100 rest`            | sets the ellipse's x position                           |
| **y**            | 2     | `y 100 rest`            | sets the ellipse's y position                           |
| **width**        | 2     | `width 200 rest`        | sets the ellipse's width                                |
| **height**       | 2     | `height 100 rest`       | sets the ellipse's height                               |
| **fill**         | 2     | `fill "#4f46e5" rest`   | sets the fill color                                     |
| **stroke**       | 2     | `stroke "#000" rest`    | sets the stroke color                                   |
| **stroke-width** | 2     | `stroke-width 2 rest`   | sets the stroke width                                   |
| **opacity**      | 2     | `opacity 0.5 rest`      | sets the opacity (0 – 1)                                |
| **label**        | 2     | `label "hello" rest`    | attaches a text label                                   |
| **color**        | 2     | `color "red" rest`      | sets a named color (used by the renderer for the label) |
| **figjam**       | 2     | `figjam "FileKey" rest` | targets a specific FigJam file for rendering            |

Each function takes a value followed by a *rest* record and returns a new
record. Chain them together, terminating with `{}`, to build a shape.

### Output

A program compiles to:

```
{
  "ellipses": [ ... ],     // every chained record that has a `name`
  "figjamFileKey": "..."   // optional — present if `figjam` was used
}
```
