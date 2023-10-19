import typescript from "@rollup/plugin-typescript";
import banner from "rollup-plugin-banner2";
import terser from "@rollup/plugin-terser";
import mjsEntry from "rollup-plugin-mjs-entry";

const fileHeader = `/** 
* SplitBun
* https://github.com/farisphp/splitbun
* @version <%= pkg.version %>
* @author Faris Perwira <faris.perwira@gmail.com>
*/`;

export default [
  {
    input: "src/index.ts",
    output: {
      file: "umd/index.min.js",
      format: "umd",
      name: "SplitBun",
    },
    plugins: [
      typescript({ tsconfig: "./tsconfig.json" }),
      terser(),
      banner(() => fileHeader),
    ],
  },
  // {
  //   input: "src/index.ts",
  //   output: {
  //     file: "dist/index.js",
  //     format: "esm",
  //     name: "SplitBun",
  //   },
  //   plugins: [
  //     typescript({
  //       tsconfig: "./tsconfig.json",
  //       inlineSources: true,
  //       declaration: true,
  //       outDir: "./dist",
  //       lib: ["es5", "es6", "dom"],
  //       target: "es5",
  //     }),
  //     terser(),
  //     banner(() => fileHeader),
  //   ],
  // },
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.js",
      format: "cjs",
      name: "SplitBun",
    },
    plugins: [
      typescript({
        tsconfig: "./tsconfig.json",
        inlineSources: true,
        declaration: true,
        outDir: "./dist",
        lib: ["es5", "es6", "dom"],
        target: "es5",
      }),
      terser(),
      banner(() => fileHeader),
      mjsEntry(),
    ],
  },
];
