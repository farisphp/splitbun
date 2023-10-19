import { defineConfig } from "tsup";

export default defineConfig({
  target: "es2015",
  entry: ["src/index.ts"],
  format: ["esm", "cjs", "iife"],
  dts: true, // Generate declaration file (.d.ts)
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
});
