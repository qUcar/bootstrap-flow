import { readdir, readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import vm from "node:vm";

const checkDirectory = async (directory) => {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = `${directory}/${entry.name}`;
    if (entry.isDirectory()) await checkDirectory(path);
    else if (entry.name.endsWith(".mjs")) {
      const result = spawnSync(process.execPath, ["--check", path], { stdio: "inherit" });
      if (result.error || result.status !== 0) throw new Error(`Syntax check failed: ${path}`);
    }
  }
};
for (const directory of ["scripts", "src", "tests"]) await checkDirectory(directory);
const html = await readFile("index.html", "utf8");
for (const match of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) new vm.Script(match[1]);
console.log("All source modules and inline application scripts passed syntax checks.");
