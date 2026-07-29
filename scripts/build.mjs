import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = path.join(repositoryRoot, "index.html");
const coreStart = "/* PROMPT_CORE_START */";
const coreEnd = "/* PROMPT_CORE_END */";

const sourcePaths = [
  "src/features/template-catalog/project-structure.mjs",
  "src/features/template-catalog/response-contracts.mjs",
  "src/features/template-catalog/prompt-templates-en.mjs",
  "src/features/template-catalog/prompt-templates-tr.mjs",
  "src/features/prompt-generation/prompt-generator.mjs",
];

const removeModuleSyntax = (source) =>
  source
    .replace(/^import\s+[\s\S]*?\s+from\s+"[^"]+";\r?\n/gm, "")
    .replace(/^export\s+/gm, "")
    .trim();

const buildCoreBundle = async () => {
  const sources = await Promise.all(
    sourcePaths.map(async (sourcePath) => {
      const source = await readFile(path.join(repositoryRoot, sourcePath), "utf8");
      return `// Source: ${sourcePath}\n${removeModuleSyntax(source)}`;
    }),
  );

  return sources.join("\n\n");
};

const replaceCoreBundle = (html, coreBundle) => {
  const startIndex = html.indexOf(coreStart);
  const endIndex = html.indexOf(coreEnd);

  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    throw new Error("index.html içinde prompt çekirdeği işaretçileri bulunamadı.");
  }

  const beforeCore = html.slice(0, startIndex + coreStart.length);
  const afterCore = html.slice(endIndex);
  return `${beforeCore}\n${coreBundle}\n${afterCore}`;
};

const html = await readFile(indexPath, "utf8");
const coreBundle = await buildCoreBundle();
const builtHtml = replaceCoreBundle(html, coreBundle);

if (process.argv.includes("--check")) {
  if (builtHtml !== html) {
    throw new Error("index.html güncel kaynak modüllerle eşleşmiyor. `npm run build` çalıştırın.");
  }

  console.log("index.html prompt çekirdeği kaynak modüllerle güncel.");
  process.exit(0);
}

await writeFile(indexPath, builtHtml, "utf8");
console.log("index.html prompt çekirdeği kaynak modüllerden üretildi.");
