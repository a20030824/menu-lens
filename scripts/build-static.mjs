import { copyFile, mkdir } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const stylesDirectory = new URL("../dist/src/styles/", import.meta.url);
await mkdir(stylesDirectory, { recursive: true });
await copyFile(new URL("index.html", root), new URL("dist/index.html", root));
await Promise.all([
  copyFile(new URL("src/styles/app.css", root), new URL("dist/src/styles/app.css", root)),
  copyFile(
    new URL("src/styles/menu-atlas.css", root),
    new URL("dist/src/styles/menu-atlas.css", root),
  ),
]);
