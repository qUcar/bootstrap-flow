import test from "node:test";
import assert from "node:assert/strict";
import { cp, mkdtemp, readFile, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

test("single HTML build remains current with CRLF or LF checkout line endings", async () => {
  const root = fileURLToPath(new URL("../../", import.meta.url));
  const temporary = await mkdtemp(path.join(tmpdir(), "bootstrap-flow-build-"));
  try {
    await cp(path.join(root, "src"), path.join(temporary, "src"), { recursive: true });
    await cp(path.join(root, "scripts"), path.join(temporary, "scripts"), { recursive: true });
    const html = await readFile(path.join(root, "index.html"), "utf8");
    for (const newline of ["\r\n", "\n"]) {
      await writeFile(path.join(temporary, "index.html"), html.replace(/\r\n/g, "\n").replace(/\n/g, newline));
      assert.doesNotThrow(() => execFileSync(process.execPath, [path.join(temporary, "scripts/build.mjs"), "--check"], { stdio: "pipe" }));
    }
  } finally {
    // Only the unique directory created above is removed.
    await rm(temporary, { recursive: true, force: true });
  }
});
