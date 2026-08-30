import { build } from "esbuild";

await build({
  entryPoints: ["functions/_worker.ts"],
  outfile: "dist/_worker.js",
  bundle: true,
  format: "esm",
  platform: "browser",
  target: "es2022",
  minify: true,
  sourcemap: false,
  logLevel: "info",
});