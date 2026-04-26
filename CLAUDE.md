# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` — Start API server on port 50172 with Firestore emulator (delegates to `packages/api`).
- `npm run start` — Production server start (loads `@graffiticode/tracing`).
- `npm run build` — Build app, then api, then static artifacts (lexicon, spec, instructions, language-info).

### Linting
- `npm run lint` — Lint root `test/` directory.
- `cd packages/api && npm run lint` — Lint API source (`src/`, `tools/`).
- `cd packages/app && npm run lint` — Lint app library (TS/TSX, `--max-warnings 0`).
- Append `:fix` to any lint command to auto-fix.

### Static artifacts (`packages/api`)
- `build-lexicon` → `dist/lexicon.js` (generated from `src/lexicon.js`).
- `build-spec` → renders `spec/spec.md` to `dist/spec.html`, copies `template.gc` and `usage-guide.md`.
- `build-instructions` → merges basis + l0172 instructions into `dist/instructions.md` for the AI code generator.
- `build-language-info` → `dist/language-info.json`.

These outputs ship with the package; regenerate them whenever you change the lexicon, spec, or instructions.

### Testing
There are `*.spec.js` files (`src/`, `src/routes/`) using Jest config in the root `package.json`, but no `test` script is wired up. Run individual specs with `npx jest <path>` from the repo root if needed.

### Deployment
- `npm run gcp:build` — Cloud Build via `cloudbuild.yaml` (also `cloudbuild.staging.yaml` / `cloudbuild.production.yaml`).
- `npm run gcp:deploy` — Deploy from source to Cloud Run service `l0172` (us-central1).
- `npm run gcp:logs` — Tail Cloud Run logs.

## Architecture

L0172 is a Graffiticode language for generating **FigJam** boards. Monorepo with two npm workspaces:

- `packages/api/` — Express server (port 50172) that compiles L0172 source into a board description. Auth via `@graffiticode/auth`. Compiler built on `@graffiticode/basis` (symlinked from `../../../basis` in dev).
- `packages/app/` — React/TS component library (`@graffiticode/l0172`) that renders the compiled output as a Figma embed. Built with Vite + Tailwind, published as `dist/index.es.js` / `index.umd.js`.

### Compiler pipeline (`packages/api/src/`)

`compiler.js` defines `Checker` and `Transformer` extending `BasisChecker`/`BasisTransformer`, then **generates methods on the prototype** for three families declared in `lexicon.js`:

1. **Prop setters** (`PROP_SETTERS` map: `X`, `Y`, `WIDTH`, `FILL`, `LABEL`, `FROM`, `TO`, `LINE_TYPE`, etc.) — arity-2 functions that set a single field on the receiving record. `FONT_SIZE` is special-cased: it accepts numbers or string aliases (`"small"`/`"medium"`/`"large"`/`"extra-large"`/`"huge"`) resolved via `FONT_SIZE_ALIASES`.
2. **Node types** (`NODE_TYPES` = `sticky`, `text`, `connector`, `section`, `stamp`) — each becomes a method that emits `{ type, id, ...}`. For `TEXT_BEARING_NODES` (`sticky`, `text`) the first arg is both `id` and default `text`; an explicit `label` setter overrides `text` only.
3. **Shape-with-text types** (`SHAPE_TYPE_ENUM`, ~30 entries from `square` to `internal-storage`) — emit `{ type: "shape", shapeType: <ENUM>, id, text }`. Surface names mirror Figma's `ShapeWithTextNode.shapeType` enum (kebab-case ↔ SCREAMING_SNAKE_CASE).

Top-level structure:
- `BOARD <fileKey> <record>` — top-level container; `parseFileKey` accepts a raw key or any `figma.com/{board,design,file}/<key>` URL.
- `NODES <list> <record>` — attaches a list of nodes to the surrounding record.
- `PROG` — if any item has `type: "board"`, the program output is `{ ...data, ...board }`; otherwise it falls back to `{ ...data, items }`.
- `PRINT` — debug helper that wraps a value as `{ print: <value> }`.

When adding a new keyword: add it to the right group in `lexicon.js` (the prototype methods are generated automatically). Only add a hand-written handler in `compiler.js` if behavior diverges from the generic pattern (see `FONT_SIZE`, text-bearing nodes).

### API surface (`packages/api/src/app.js`)
- `POST /compile` — main compile endpoint (`routes/compile.js` → `compile.js` → `compiler.compile`).
- `GET /form` — serves the built React app from `dist/index.html`.
- Static `dist/` and `public/` (so generated `lexicon.js`, `spec.html`, `instructions.md`, `language-info.json`, `usage-guide.md` are publicly served).
- All routes go through `buildValidateToken({ authUrl })` from `auth.js`.

### App rendering (`packages/app/lib/`)
- `view.jsx` — reads `id`, `access_token`, `origin`, and initial `data` from URL params; manages state through `lib/state.js` (simple reducer); compiles via SWR (`swr/fetchers.js`) when `id` + `accessToken` are present; posts `onload` and `data-updated` messages to `targetOrigin` for iframe embedding.
- `components/form/Form.tsx` — branches on the compiled output:
  - `errors[]` → red error cards.
  - `print` → text or JSON dump.
  - `type === "board"` or any `fileKey` → `BoardView` (renders `https://www.figma.com/embed?...&url=https://www.figma.com/board/<fileKey>` in an iframe).
  - Otherwise → JSON dump.
- `components/form/ThemeToggle.tsx` — theme toggle component.

### Data flow

```
URL params → state.init → POST /compile → Checker → Transformer → board record
           → state.compiled → Form → BoardView <iframe src="figma.com/embed/...">
           → postMessage({type: "data-updated", data}) to parent origin
```

## Environment
- `PORT` (default `50172`)
- `AUTH_URL` (default `https://auth.graffiticode.org`; dev sets `http://127.0.0.1:4100`)
- `FIRESTORE_EMULATOR_HOST` (dev sets `127.0.0.1:8080`)
- `NODE_ENV` (`development`/`test` enables `morgan("dev")` + `errorhandler`; `production` redirects non-https → https)
