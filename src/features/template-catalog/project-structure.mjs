const SCALE_LEVEL = { quick: 1, standard: 2, full: 3 };

const CORE_FILE_DEFINITIONS = [
  ["README.md", 1],
  ["STATUS.md", 2],
  ["PROJECT_BRIEF.md", 2],
  ["REQUIREMENTS.md", 2],
  ["DESIGN.md", 2],
  ["CLAUDE.md", 1],
  ["AGENTS.md", 1],
  ["CODEX.md", 1],
  ["TASKS.md", 1],
  ["ROADMAP.md", 3],
  ["DECISIONS.md", 2],
  ["CHANGELOG.md", 1],
  ["LESSONS.md", 3],
  [".env.example", 2],
  [".gitignore", 1],
];

const CORE_DIRECTORY_DEFINITIONS = [
  ["docs/", 1, "documentation", "dokümantasyon"],
  ["src/", 1, "application code", "uygulama kodu"],
  ["tests/", 1, "tests", "testler"],
  ["scripts/", 2, "helper scripts", "yardımcı betikler"],
  ["configs/", 2, "configuration files", "yapılandırma dosyaları"],
  ["prompts/", 3, "reusable agent prompts", "yeniden kullanılabilir agent promptları"],
  ["skills/", 3, "agent skill definitions", "agent yetenek tanımları"],
  [".agent/", 3, "agent working notes and state", "agent çalışma notları ve durumu"],
];

export const SCALE_PROMPT_LABELS = {
  en: { quick: "Quick", standard: "Standard", full: "Full" },
  tr: { quick: "Hızlı", standard: "Standart", full: "Tam" },
};

const scaleLevel = (scale) => SCALE_LEVEL[scale] || SCALE_LEVEL.full;

const selectForScale = (definitions, scale) => {
  const selectedLevel = scaleLevel(scale);
  return definitions.filter((definition) => definition[1] <= selectedLevel);
};

export const filesFor = (scale) =>
  selectForScale(CORE_FILE_DEFINITIONS, scale)
    .map((definition) => definition[0])
    .join(", ");

export const directoriesFor = (scale) =>
  selectForScale(CORE_DIRECTORY_DEFINITIONS, scale)
    .map((definition) => definition[0])
    .join(", ");

export const directoryPurposesFor = (scale, language) => {
  const purposeIndex = language === "tr" ? 3 : 2;
  return selectForScale(CORE_DIRECTORY_DEFINITIONS, scale)
    .map((definition) => `${definition[0]} ${definition[purposeIndex]}`)
    .join(", ");
};
