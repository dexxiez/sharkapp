import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/index.ts"],
    format: ["esm"],
    dts: true,
    splitting: false,
    sourcemap: false,
    clean: true,
    outDir: "dist",
    minify: false,
  },
  {
    entry: ["src/index.ts"],
    format: ["esm"],
    dts: false,
    splitting: false,
    sourcemap: false,
    clean: false,
    outDir: "dist",
    outExtension: () => ({ js: ".min.js" }),
    minify: true,
  },
]);
