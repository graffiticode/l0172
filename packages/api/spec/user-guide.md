<!-- SPDX-License-Identifier: CC-BY-4.0 -->
# L0172 User Guide

Agent-facing guide for authoring FigJam board content through L0172. Read this before composing a `create_item` prompt or an `update_item` modification.

## Overview

L0172 is an authoring language for FigJam board content. Input is a natural-language description of a board — target file, nodes to place, how they connect, how they're grouped into sections; output is an L0172 program that emits a node list which the renderer draws onto the target FigJam board. Node types include sticky notes, text, a broad catalog of shapes (ellipse, rounded rectangle, diamond, hexagon, pentagon, star, arrow, chevron, flowchart shapes like eng-database / predefined-process / speech-bubble), sections that group other nodes, connectors that run labeled edges between nodes, and stamps for reactions. L0172 is the right tool when the job is "put these nodes on a FigJam board in a specific layout"; it is not an auto-layout engine and it is not a Figma design-file authoring tool.

When composing a request, name the target board first (a Figma file key or a `figma.com/board/...` URL), then the nodes with their positions and any distinguishing properties, then any connectors between them (by node id), then any section grouping. Be explicit about positions and sizes — **the renderer takes coordinates literally and does no auto-layout**. Two stickies at the same position will overlap; a 200-wide shape at x=0 and another at x=100 will collide. Sketch the layout on a grid (300×300 cell spacing works well) and place each node on a cell origin. Every node's first argument is its **id** (also the default displayed text); use `label "..."` when the displayed text should differ from the id, and refer to nodes by id in `from`/`to` on connectors.

In scope: a complete FigJam node catalog — sticky, text, section, stamp, connector, and 25+ shape types; positioning and sizing; fill / stroke / opacity / color styling; font size (pixel or alias); connector routing with `from`/`to` and labels; section containers with nested `nodes [...]`; targeting a specific FigJam file by key or URL. Out of scope: Figma design-file authoring (this is FigJam, not Figma Design), auto-layout, real-time collaboration state, board-level settings (viewport, zoom), comments, and host-app embedding — those belong elsewhere.

## Vocabulary Cues

Say this to get that:

- **Board** — `board "FILE_KEY"` or `board "https://www.figma.com/board/FILE_KEY/..."`. The root of every program. "Target FigJam file ABC123" / "render these onto this Figma board URL".
- **Nodes** — the flat list of items attached to the board or nested in a section. Always wrap node lists in `nodes [...]`.
- **Sticky** — a sticky note. `sticky "id" x N y N label "displayed text" fill "#ffcc00" {}`. Default size ~240×240; space stickies by at least 260 units to avoid overlap.
- **Text** — a free-standing text node. `text "id" x N y N {}`. Use `font-size` with a number or one of the tag aliases — `small` (16), `medium` (24), `large` (40), `extra-large` (64), `huge` (96).
- **Shape** — one of the 25+ named shapes: `ellipse`, `square`, `rounded-rectangle`, `diamond`, `triangle-up`, `triangle-down`, `hexagon`, `pentagon`, `octagon`, `star`, `plus`, `chevron`, `arrow-left`, `arrow-right`, `parallelogram-right`, `parallelogram-left`, `trapezoid`, `speech-bubble`, `summing-junction`, `or`, `internal-storage`, `predefined-process`, `manual-input`, `document-single`, `document-multiple`, `shield`, `eng-database`, `eng-queue`, `eng-file`, `eng-folder`. Shapes default to roughly 200×120; set explicit `width`/`height` when packing several.
- **Connector** — a labeled edge between two nodes. `connector "label text" from "source-id" to "target-id" {}`. `from "*"` means all other nodes (fan-out); `to "*"` means fan-in.
- **Section** — a group container with a title bar. `section "Phase 1" nodes [ ... ] {}`. Size a section so `width >= (rightmost child x + child width + 40)` and `height >= (bottommost child y + child height + 80)`; the title bar needs ~60 units at the top.
- **Stamp** — a reaction marker. `stamp like x N y N {}`. The variant is a tag — one of `like`, `love`, `laugh`, `surprised`, `celebrate`, `heart`.
- **Id vs label** — the first argument is the id (addressable for connectors); `label "..."` overrides the displayed text. Say "sticky with id 'kickoff' showing 'Kick off'" when the two should differ.
- **Position and size** — `x`, `y`, `width`, `height`, all numbers. Always set `x` and `y` on every node; defaults otherwise stack at origin.
- **Styling** — `fill` (hex color), `stroke` (hex color), `stroke-width` (number, or tag `thin`/`thick`), `opacity` (0–100 scale; 50 = half transparent), `color` (text color). Apply per-node. Connector-only style tags: `line-type` (`straight`/`elbowed`), `line-style` (`solid`/`dashed`), `from-cap`/`to-cap` (`none`/`arrow-lines`/`arrow-equilateral`/`triangle-filled`/`circle-filled`/`diamond-filled`), `from-side`/`to-side` (`auto`/`top`/`bottom`/`left`/`right`/`center`).
- **Layout discipline** — "lay these out on a 300×300 grid" or "space stickies 280 units apart" triggers the translator to space things so they don't collide.

## Example Prompts

- *"Create a FigJam board targeting file ABC123 with two stickies 'Kickoff' and 'Launch' at (0, 0) and (400, 0), and a connector labeled 'then' from Kickoff to Launch."* → `figjam_board`
- *"Board https://www.figma.com/board/ABC123/Demo with three ellipses labeled Start, Decide, End laid out horizontally 300 units apart. Connect Start→Decide with a connector labeled 'begin' and Decide→End with a connector labeled 'finish'."* → `figjam_board`
- *"Make a FigJam flowchart with a rounded-rectangle 'Input' at (0, 0), a diamond 'Valid?' at (300, 0), a rounded-rectangle 'Process' at (600, 0), and a rounded-rectangle 'Error' at (300, 200). Connect Input→Valid?, Valid?→Process labeled 'yes', and Valid?→Error labeled 'no'. Target file XYZ."* → `figjam_board`
- *"Create a section titled 'Phase 1' at position (0, 0) sized 700×400 containing two stickies at (40, 80) and (320, 80), and a section titled 'Phase 2' at (740, 0) sized 700×400 with two stickies inside it. Target file ABC123."* → `figjam_board`
- *"Retrospective board: a section 'Went Well' with three green stickies, a section 'To Improve' with three yellow stickies, and a section 'Action Items' with three blue stickies. Lay the sections in a row, each 400 wide and 600 tall, with 40 units between them."* → `figjam_board`
- *"Stakeholder map board with a central ellipse 'Project' at (400, 300), surrounded by four rounded-rectangles (Engineering, Design, Sales, Support) arranged at 12/3/6/9 o'clock positions 300 units from the center. Connect each team to Project with a dashed connector."* → `figjam_board`

## Out of Scope

- **Figma design-file authoring** — this is FigJam board content only, not Figma design frames, components, or variants. Use the Figma MCP for design-file work.
- **Auto-layout** — the renderer takes coordinates literally. Plan positions explicitly or the result will collide.
- **Board-level settings** — viewport, zoom, grid, theme. L0172 only writes node content.
- **Realtime collaboration state** — cursors, reactions-in-flight, presence. L0172 produces a static snapshot.
- **Comments and threads** — not part of the node surface.
- **Host-app embedding** — rendering and syncing to FigJam is handled by the renderer; L0172 just emits the content record.
