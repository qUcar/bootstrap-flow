import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { generatePrompts } from "../../src/features/prompt-generation/prompt-generator.mjs";
import { loadIndexApplication } from "../index-app-harness.mjs";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const application = await loadIndexApplication(path.join(repositoryRoot, "index.html"));

const baselineProfile = {
  agent: "Codex",
  approvedPlan: "Create the approved full-scale documentation skeleton without application code.",
  code: false,
  commands: "python -m unittest; python -m hizlinot",
  desc: "Offline CLI for taking quick notes from the terminal.",
  mvp: "Add notes and list them in chronological order.",
  name: "HizliNot",
  notes: "Use no third-party dependencies.",
  promptLang: "en",
  respLang: "tr",
  root: "C:\\work\\HizliNot",
  scale: "full",
  tech: "Python 3.10 standard library",
  type: "automation",
};

const baselineDigests = [
  "6bc6b1dd9aeff6c12e73b2739b1c43cd152249cb87ad5c7a53c9b2b30c1f4d77",
  "ab377b3427c06a67a5bf11abcb42cc0520c99425a99ce0e35553f8761d8fd40f",
  "ee240a5c899e2c1dae0b7b20403a276fa0a5f64af1a100c1f1ddea7a32f15928",
  "a468c6a7396cb416d9f26e40f3ebeac108c54256d99156858f27b8b301f39658",
];

const digest = (value) => createHash("sha256").update(value).digest("hex");

test("baseline profile keeps the current four prompt outputs stable", () => {
  const prompts = application.generate(baselineProfile, { lang: "tr" });
  assert.deepEqual(Array.from(prompts, digest), baselineDigests);
});

test("prompt generation is deterministic", () => {
  const first = Array.from(application.generate(baselineProfile, { lang: "tr" }));
  const second = Array.from(application.generate(baselineProfile, { lang: "tr" }));
  assert.deepEqual(first, second);
});

const scaleFiles = {
  quick: ["README.md", "CLAUDE.md", "AGENTS.md", "CODEX.md", "TASKS.md", "CHANGELOG.md", ".gitignore"],
  standard: [
    "README.md",
    "PROJECT_BRIEF.md",
    "REQUIREMENTS.md",
    "DESIGN.md",
    "CLAUDE.md",
    "AGENTS.md",
    "CODEX.md",
    "TASKS.md",
    "DECISIONS.md",
    "CHANGELOG.md",
    ".env.example",
    ".gitignore",
  ],
  full: [
    "README.md",
    "PROJECT_BRIEF.md",
    "REQUIREMENTS.md",
    "DESIGN.md",
    "CLAUDE.md",
    "AGENTS.md",
    "CODEX.md",
    "TASKS.md",
    "ROADMAP.md",
    "DECISIONS.md",
    "CHANGELOG.md",
    "LESSONS.md",
    ".env.example",
    ".gitignore",
  ],
};

for (const scale of Object.keys(scaleFiles)) {
  for (const promptLang of ["en", "tr"]) {
    for (const respLang of ["en", "tr"]) {
      for (const code of [false, true]) {
        const caseName = `${scale}/${promptLang}/${respLang}/code-${code}`;

        test(`generates a complete prompt matrix case: ${caseName}`, () => {
          const profile = { ...baselineProfile, code, promptLang, respLang, scale };
          const prompts = application.generate(profile, { lang: promptLang });
          const projectTypeLabel = promptLang === "en" ? "Software automation" : "Yazılım otomasyonu";
          const corePrompts = generatePrompts(profile, projectTypeLabel);

          assert.equal(prompts.length, 4);
          assert.deepEqual(Array.from(prompts), corePrompts);
          prompts.forEach((prompt) => {
            assert.ok(prompt.length > 500);
            assert.match(prompt, /HizliNot/);
            assert.doesNotMatch(prompt, /\$\{[^}]+\}/);
          });

          assert.match(prompts[0], promptLang === "en" ? /^# ROLE/ : /^# ROL/);
          assert.match(prompts[0], respLang === "en" ? /1\. Understanding/ : /1\. Anlayış/);

          const expectedFiles = scaleFiles[scale].join(", ");
          assert.ok(prompts[0].includes(expectedFiles));
          assert.ok(prompts[1].includes(expectedFiles));
          assert.ok(prompts[2].includes(expectedFiles));

          const expectedCodeRule = promptLang === "en"
            ? code ? "Code writing IS allowed" : "Code writing is NOT allowed"
            : code ? "Kod yazma İZNİ VAR" : "Kod yazma izni YOK";
          assert.ok(prompts[1].includes(expectedCodeRule));
        });
      }
    }
  }
}

test("bootstrap prompt carries the approved Phase 1 plan", () => {
  const prompts = generatePrompts(baselineProfile, "Software automation");
  assert.match(prompts[1], /# APPROVED PHASE 1 PLAN/);
  assert.match(prompts[1], /Create the approved full-scale documentation skeleton/);
});

test("bootstrap prompt stops safely when the approved plan is missing", () => {
  const prompts = generatePrompts({ ...baselineProfile, approvedPlan: "" }, "Software automation");
  assert.match(prompts[1], /APPROVED PLAN NOT PROVIDED/);
  assert.match(prompts[1], /STOP without creating anything/);
});
