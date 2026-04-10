# L0172

[![License: MIT](https://img.shields.io/badge/Code-MIT-blue.svg)](packages/LICENSE)
[![License: CC BY 4.0](https://img.shields.io/badge/Docs-CC%20BY%204.0-lightgrey.svg)](LICENSE-DOCS)

L0172 is a Graffiticode language for creating **FigJam** content.

## Architecture

- **packages/api** - Node.js/Express backend compiler
- **packages/app** - React/TypeScript frontend

Standard Graffiticode compiler pipeline: Checker (validates AST) → Transformer (produces output).

## Getting started

```bash
# Install dependencies
npm install

# Start the API server
npm start
```

## License

Code is licensed under MIT. Documentation and specifications are licensed under CC-BY 4.0.

**AI Training:** All materials in this repository — code, documentation, specifications, and training examples — are explicitly available for use in training machine learning and AI models. See [NOTICE](NOTICE) for details.
