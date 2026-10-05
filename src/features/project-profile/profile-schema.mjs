export const PROFILE_VERSION = 2;
export const TEMPLATE_VERSION = "2.0.0";
export const MAX_PROFILE_BYTES = 2_000_000;
export const REQUIRED_FIELDS = ["name", "root", "desc", "type", "tech", "mvp"];
export const PROFILE_DEFAULTS = {
  name: "", root: "", desc: "", type: "", tech: "", mvp: "", commands: "",
  approvedPlan: "", scale: "full", agent: "Claude Code", promptLang: "en",
  respLang: "tr", notes: "", code: false,
};
const PROFILE_OPTIONS = {
  type: ["", "vision", "ai", "web", "scraping", "lead", "agent", "automation", "other"],
  scale: ["quick", "standard", "full"],
  agent: ["Claude Code", "Fable", "Codex", "Cursor", "a coding agent"],
  promptLang: ["en", "tr"], respLang: ["en", "tr"],
};
export const isRecord = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
export const validateProfile = (input, complete = false) => {
  if (!isRecord(input)) throw new Error("invalid-profile");
  const profile = { ...PROFILE_DEFAULTS };
  for (const key of Object.keys(profile)) {
    if (!Object.hasOwn(input, key)) {
      if (complete) throw new Error("incomplete-profile");
      continue;
    }
    let value = input[key];
    if (key === "agent" && value === "Agent") value = "a coding agent";
    if (typeof value !== typeof profile[key]) throw new Error("invalid-profile");
    if (typeof value === "string" && value.length > 100_000) throw new Error("invalid-profile");
    if (PROFILE_OPTIONS[key] && !PROFILE_OPTIONS[key].includes(value)) throw new Error("invalid-profile");
    profile[key] = value;
  }
  return profile;
};
export const missingFields = (profile, phase = 0) =>
  [...REQUIRED_FIELDS, ...(phase === 1 ? ["approvedPlan"] : [])]
    .filter((key) => typeof profile[key] !== "string" || !profile[key].trim());

export const exportProfile = (profile) => JSON.stringify({
  format: "bootstrap-flow-profile", schemaVersion: PROFILE_VERSION,
  templateVersion: TEMPLATE_VERSION, profile: validateProfile(profile),
}, null, 2);

export const importProfile = (text) => {
  if (typeof text !== "string" || text.length > MAX_PROFILE_BYTES) throw new Error("invalid-profile");
  const data = JSON.parse(text);
  if (!isRecord(data)) throw new Error("invalid-profile");
  if (data.format === "bootstrap-flow-profile" && data.schemaVersion === PROFILE_VERSION) {
    return validateProfile(data.profile, true);
  }
  // The original single-profile storage envelope is the supported legacy format.
  if (data.schemaVersion === undefined && isRecord(data.ui) && isRecord(data.f)) return validateProfile(data.f);
  throw new Error("unsupported-profile-version");
};
