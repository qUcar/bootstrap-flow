import { EN_PROMPT_TEMPLATES } from "../template-catalog/prompt-templates-en.mjs";
import { TR_PROMPT_TEMPLATES } from "../template-catalog/prompt-templates-tr.mjs";
import { RESPONSE_CONTRACTS } from "../template-catalog/response-contracts.mjs";
import {
  directoriesFor,
  directoryPurposesFor,
  filesFor,
  SCALE_PROMPT_LABELS,
} from "../template-catalog/project-structure.mjs";

const valueOr = (value, fallback) => {
  const normalized = (value || "").trim();
  return normalized || fallback;
};

const codeRulesFor = (promptLanguage, codeAllowed) => {
  if (promptLanguage === "en") {
    return {
      codeRule: codeAllowed
        ? "Code writing IS allowed: create only a minimal entry point in src/, nothing more."
        : "Code writing is NOT allowed: write NO application code; src/ contains only .gitkeep.",
      scopeRule: codeAllowed
        ? "Code writing was allowed: verify src/ contains only a minimal entry point, nothing more."
        : "Code writing was NOT allowed: verify no application code exists in src/.",
    };
  }

  return {
    codeRule: codeAllowed
      ? "Kod yazma İZNİ VAR: src/ içinde yalnızca minimal bir giriş noktası oluştur, fazlasını yazma."
      : "Kod yazma izni YOK: hiçbir uygulama kodu yazma; src/ yalnızca .gitkeep içersin.",
    scopeRule: codeAllowed
      ? "Kod yazma izni VARDI: src/ içinde yalnızca minimal bir giriş noktası olduğunu doğrula."
      : "Kod yazma izni YOKTU: src/ içinde hiçbir uygulama kodu bulunmadığını doğrula.",
  };
};

const responseLanguageName = (promptLanguage, responseLanguage) => {
  if (promptLanguage === "en") return responseLanguage === "tr" ? "Turkish" : "English";
  return responseLanguage === "tr" ? "Türkçe" : "İngilizce";
};

const buildTemplateData = (profile, projectTypeLabel) => {
  const promptLanguage = profile.promptLang;
  const fallback = promptLanguage === "en" ? "(not specified)" : "(belirtilmedi)";
  const responseContracts = RESPONSE_CONTRACTS[profile.respLang] || RESPONSE_CONTRACTS.en;
  const codeRules = codeRulesFor(promptLanguage, profile.code);

  return {
    agent: profile.agent || "Claude Code",
    approvedPlan: valueOr(
      profile.approvedPlan,
      promptLanguage === "en"
        ? "[APPROVED PLAN NOT PROVIDED — STOP and ask the user to paste the approved Phase 1 plan.]"
        : "[ONAYLANAN PLAN VERİLMEDİ — DUR ve kullanıcıdan onaylanan 1. aşama planını yapıştırmasını iste.]",
    ),
    code: promptLanguage === "en" ? (profile.code ? "yes" : "no") : profile.code ? "evet" : "hayır",
    commands: valueOr(
      profile.commands,
      promptLanguage === "en"
        ? "not provided — infer the build, test and run commands from the tech stack and project files"
        : "verilmedi — build, test ve çalıştırma komutlarını teknolojiden ve proje dosyalarından çıkar",
    ),
    coreDirs: directoriesFor(profile.scale),
    coreFiles: filesFor(profile.scale),
    desc: valueOr(profile.desc, fallback),
    dirPurposes: directoryPurposesFor(profile.scale, promptLanguage),
    end2: responseContracts.p2end,
    mvp: valueOr(profile.mvp, fallback),
    name: valueOr(profile.name, fallback),
    notes: valueOr(profile.notes, promptLanguage === "en" ? "None" : "Yok"),
    q1: responseContracts.p1q,
    q3: responseContracts.p3q,
    q4: responseContracts.p4q,
    resp: responseLanguageName(promptLanguage, profile.respLang),
    root: valueOr(profile.root, fallback),
    scaleLabel:
      (SCALE_PROMPT_LABELS[promptLanguage] || SCALE_PROMPT_LABELS.en)[profile.scale] ||
      (SCALE_PROMPT_LABELS[promptLanguage] || SCALE_PROMPT_LABELS.en).full,
    struct1: responseContracts.p1struct,
    struct2: responseContracts.p2struct,
    struct3: responseContracts.p3struct,
    struct4: responseContracts.p4struct,
    tech: valueOr(profile.tech, fallback),
    type: projectTypeLabel || fallback,
    ...codeRules,
  };
};

export const generatePrompts = (profile, projectTypeLabel) => {
  const templateData = buildTemplateData(profile, projectTypeLabel);
  const templates = profile.promptLang === "en" ? EN_PROMPT_TEMPLATES : TR_PROMPT_TEMPLATES;

  return [
    templates.p1(templateData),
    templates.p2(templateData),
    templates.p3(templateData),
    templates.p4(templateData),
  ];
};
