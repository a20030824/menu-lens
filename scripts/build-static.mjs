import { copyFile, mkdir } from "node:fs/promises";

const root = new URL("../", import.meta.url);
await mkdir(new URL("../dist/src/styles/", import.meta.url), { recursive: true });
await copyFile(new URL("index.html", root), new URL("dist/index.html", root));
await copyFile(
  new URL("src/styles/app.css", root),
  new URL("dist/src/styles/app.css", root),
);
