// SPDX-License-Identifier: MIT
/* Copyright (c) 2023, ARTCOMPILER INC */
import {
  Checker as BasisChecker,
  Transformer as BasisTransformer,
  Compiler as BasisCompiler
} from '@graffiticode/basis';

export class Checker extends BasisChecker {
  THEME(node, options, resume) {
    this.visit(node.elts[0], options, async (e0, v0) => {
      this.visit(node.elts[1], options, async (e1, v1) => {
        const node0 = this.nodePool[node.elts[0]]
        console.log(
          "THEME()",
          "node0=" + JSON.stringify(node0, null, 2),
          "v0=" + JSON.stringify(v0, null, 2),
        );
        if (v0.tag === "TAG" && v0.elts[0] === "DARK" || v0.elts[0] === "LIGHT") {
          const err = [];
          const val = node;
          resume(err, val);
        } else {
          const err = [{
            message: `Expecting a tag DARK or tag LIGHT. Got ${v0.tag && "tag " + v0.elts[0] || v0}.`,
            ...node0.coord,
          }];
          const val = node;
          resume(err, val);
        }
      });
    });
  }

  HELLO(node, options, resume) {
    this.visit(node.elts[0], options, async (e0, v0) => {
      const err = [];
      const val = node;
      resume(err, val);
    });
  }
}

export class Transformer extends BasisTransformer {
  PRINT(node, options, resume) {
    this.visit(node.elts[0], options, (e0, v0) => {
      const err = e0;
      const val = {
        print: v0,
      };
      resume(err, val);
    })
  }
  HELLO(node, options, resume) {
    this.visit(node.elts[0], options, async (e0, v0) => {
      const data = options?.data || {};
      const err = [];
      const val = {
        ...data,
        hello: data.hello !== undefined ? data.hello : v0,
      };
      resume(err, val);
    });
  }

  IMAGE(node, options, resume) {
    this.visit(node.elts[0], options, async (e0, v0) => {
      const data = options?.data || {};
      const err = [];
      const val = {
        image: v0,
        ...data,
      };
      resume(err, val);
    });
  }

  THEME(node, options, resume) {
    this.visit(node.elts[0], options, async (e0, v0) => {
      this.visit(node.elts[1], options, async (e1, v1) => {
        const data = options?.data || {};
        const err = [];
        const val = {
          theme: v0?.tag.toLowerCase(),
          _: v1,
          ...data,
        };
        resume(err, val);
      });
    });
  }

  PROG(node, options, resume) {
    this.visit(node.elts[0], options, async (e0, v0) => {
      const data = options?.data || {};
      const err = e0;
      const val = v0.pop();
      console.log(
        "PROG()",
        "val=" + JSON.stringify(val, null, 2),
      );
      const hasUnderscore = typeof val === 'object' && val !== null && !Array.isArray(val) && '_' in val;
      resume(err, {
        ...(hasUnderscore ? val : { _: val }),
        ...data,
      });
    });
  }

  // CATCH_ALL(node, options, resume) {
  //   console.log(
  //     "L0172/CATCH_ALL()",
  //     "nodePool=" + JSON.stringify(this.nodePool, null, 2),
  //     "node=" + JSON.stringify(node, null, 2),
  //   );
  //   this.visit(node.elts[0], options, async (e0, v0) => {
  //     const data = options?.data || {};
  //     const err = e0;
  //     const val = v0;
  //     resume(err, {
  //       ...val,
  //       ...data,
  //     });
  //   });
  // }
}

export const compiler = new BasisCompiler({
  langID: '0172',
  version: 'v0.0.1',
  Checker: Checker,
  Transformer: Transformer,
});
