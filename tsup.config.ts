import { defineConfig } from "tsup";

import pkg from "./package.json";

const banner = `
/**
 * @license MIT
 * @author Dexxiez
 * @version ${pkg.version}
 * @description A lightishweight DOM framework for ESM modules
 */
`;

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
    banner: {
      js: banner,
    },
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
    banner: {
      js: banner,
    },
  },
]);
