# L0172 Usage Guide

**L0172** is a Graffiticode language for describing ellipse shapes and
rendering them on a FigJam board. You describe shapes in natural
language through the Graffiticode MCP tool or console, and the system
generates L0172 code.

## What You Can Create with L0172

### Ellipse shapes

Describe one or more ellipses with position, size, fill, stroke, and
label. Each shape is a chain of calls beginning with `ellipse` and
terminating with `{}`.

Example requests:
- "Draw a blue ellipse at (100, 100) that is 200 wide and 100 tall."
- "Add a second ellipse with a black stroke and orange fill."
- "Make the ellipse 50% transparent."
- "Label the ellipse 'hello' in white."

**Capabilities**: position, size, fill color, stroke color and width,
opacity, text label, and label color.
**Limitations**: L0172 only renders ellipses — no rectangles, lines,
paths, or text-only nodes.

### Targeting a FigJam file

Use `figjam "FileKey"` once in the program to direct rendering at a
specific FigJam file. If omitted, the renderer uses its default file.

Example requests:
- "Render these shapes into FigJam file ABC123."
- "Target FigJam file XYZ and draw two ellipses."

### Combining with core language features

L0172 sits on top of the Graffiticode core language, so you can bind
values with `let`, build lists, and use lambdas/map/reduce to generate
many shapes programmatically.

Example requests:
- "Create 5 ellipses in a row, 100 pixels apart."
- "Use the same fill color for both ellipses via a `let` binding."

## Compiled Output

A program compiles to a record of the form:

```
{
  "ellipses": [ { "name": ..., "x": ..., "y": ..., ... }, ... ],
  "figjamFileKey": "..."   // optional
}
```

The renderer consumes this record and draws each ellipse on the target
FigJam board.

## Iterating and Refining

You can iterate on an existing program by adjusting individual fields
or adding new shapes.

Example requests:
- "Move the first ellipse to (200, 150)."
- "Change the fill of ellipse 'a' to red."
- "Add a third ellipse between the other two."
