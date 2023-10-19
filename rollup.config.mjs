import typescript from "@rollup/plugin-typescript";
import banner from "rollup-plugin-banner2";
import terser from "@rollup/plugin-terser";

const fileHeader = `/** 
* SplitBun
* https://github.com/farisphp/splitbun
* @version <%= pkg.version %>
* @author Faris Perwira <faris.perwira@gmail.com>
*/`;

export default [
  // Minified UMD bundle
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
  // UMD bundle
  {
    input: "src/index.ts",
    output: {
      file: "umd/index.js",
      format: "umd",
      name: "SplitBun",
    },
    plugins: [
      typescript({ tsconfig: "./tsconfig.json" }),
      banner(() => fileHeader),
    ],
  },
  // ESM Module
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.js",
      format: "esm",
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
    ],
  },
];
