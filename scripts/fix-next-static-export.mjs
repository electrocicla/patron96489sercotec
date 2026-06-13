import { copyFile, readdir } from "node:fs/promises";
import path from "node:path";

const outputDirectory = path.resolve("out");
let copiedFiles = 0;

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await walk(absolutePath);
      continue;
    }

    const relativeParts = path.relative(outputDirectory, absolutePath).split(path.sep);
    const segmentIndex = relativeParts.findIndex((part) => part.startsWith("__next."));

    if (segmentIndex === -1 || segmentIndex === relativeParts.length - 1) {
      continue;
    }

    const targetParts = [
      ...relativeParts.slice(0, segmentIndex),
      relativeParts.slice(segmentIndex).join(".")
    ];
    const targetPath = path.join(outputDirectory, ...targetParts);

    await copyFile(absolutePath, targetPath);
    copiedFiles += 1;
  }
}

await walk(outputDirectory);
console.log(`Static export compatibility files: ${copiedFiles}`);
