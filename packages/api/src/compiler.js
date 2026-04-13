// SPDX-License-Identifier: MIT
/* Copyright (c) 2023, ARTCOMPILER INC */
import {
  Checker as BasisChecker,
  Transformer as BasisTransformer,
  Compiler as BasisCompiler
} from '@graffiticode/basis';

export class Checker extends BasisChecker {
  ELLIPSE(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        resume([], node);
      });
    });
  }

  X(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        resume([], node);
      });
    });
  }

  Y(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        resume([], node);
      });
    });
  }

  WIDTH(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        resume([], node);
      });
    });
  }

  HEIGHT(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        resume([], node);
      });
    });
  }

  FILL(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        resume([], node);
      });
    });
  }

  STROKE(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        resume([], node);
      });
    });
  }

  STROKE_WIDTH(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        resume([], node);
      });
    });
  }

  OPACITY(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        resume([], node);
      });
    });
  }

  LABEL(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        resume([], node);
      });
    });
  }

  COLOR(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        resume([], node);
      });
    });
  }

  FIGJAM(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        resume([], node);
      });
    });
  }
}

export class Transformer extends BasisTransformer {
  PRINT(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      resume(e0, { print: v0 });
    });
  }

  ELLIPSE(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        resume([], { ...v1, name: v0 });
      });
    });
  }

  X(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        resume([], { ...v1, x: v0 });
      });
    });
  }

  Y(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        resume([], { ...v1, y: v0 });
      });
    });
  }

  WIDTH(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        resume([], { ...v1, width: v0 });
      });
    });
  }

  HEIGHT(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        resume([], { ...v1, height: v0 });
      });
    });
  }

  FILL(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        resume([], { ...v1, fill: v0 });
      });
    });
  }

  STROKE(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        resume([], { ...v1, stroke: v0 });
      });
    });
  }

  STROKE_WIDTH(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        resume([], { ...v1, strokeWidth: v0 });
      });
    });
  }

  OPACITY(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        resume([], { ...v1, opacity: v0 });
      });
    });
  }

  LABEL(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        resume([], { ...v1, label: v0 });
      });
    });
  }

  COLOR(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        resume([], { ...v1, color: v0 });
      });
    });
  }

  FIGJAM(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      this.visit(node.elts[1], options, (e1, v1) => {
        resume([], { ...v1, figjamFileKey: v0 });
      });
    });
  }

  PROG(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      const data = options?.data || {};
      const items = Array.isArray(v0) ? v0 : [v0];
      const ellipses = [];
      let figjamFileKey;
      for (const item of items) {
        if (typeof item === 'object' && item !== null) {
          if (item.figjamFileKey) {
            figjamFileKey = item.figjamFileKey;
          }
          if (item.name !== undefined) {
            ellipses.push(item);
          }
        }
      }
      resume(e0, {
        ellipses,
        ...(figjamFileKey && { figjamFileKey }),
        ...data,
      });
    });
  }
}

export const compiler = new BasisCompiler({
  langID: '0172',
  version: 'v0.0.1',
  Checker: Checker,
  Transformer: Transformer,
});
