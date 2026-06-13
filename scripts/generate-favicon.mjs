import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const source = path.resolve("public/favicon.svg");
const destination = path.resolve("public/favicon.ico");
const svg = await readFile(source);

await sharp(svg).resize(32, 32).png().toFile(destination);
console.log(`Generated ${destination}`);
