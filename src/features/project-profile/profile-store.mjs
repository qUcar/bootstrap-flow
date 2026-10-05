import { isRecord, validateProfile, PROFILE_DEFAULTS, PROFILE_VERSION } from "./profile-schema.mjs";

export const STORAGE_KEY = "bsf_state_v2";
export const LEGACY_STORAGE_KEY = "bsf_state_v1";
export const createProfileStore = () => ({
  schemaVersion: PROFILE_VERSION, activeId: "default", ui: { lang: "tr", theme: null },
  profiles: [{ id: "default", profile: { ...PROFILE_DEFAULTS } }],
});
const validatePreferences = (input) => {
  if (!isRecord(input)) throw new Error("invalid-preferences");
  const ui = { lang: "tr", theme: null, ...input };
  if (!["tr", "en"].includes(ui.lang) || ![null, "light", "dark"].includes(ui.theme)) throw new Error("invalid-preferences");
  return { lang: ui.lang, theme: ui.theme };
};
export const parseProfileStore = (text) => {
  const data = JSON.parse(text);
  if (!isRecord(data)) throw new Error("invalid-store");
  if (data.schemaVersion === undefined && isRecord(data.f)) {
    return { ...createProfileStore(), ui: validatePreferences(data.ui), profiles: [{ id: "default", profile: validateProfile(data.f) }] };
  }
  if (data.schemaVersion !== PROFILE_VERSION || !Array.isArray(data.profiles) || !data.profiles.length || data.profiles.length > 100) throw new Error("invalid-store-version");
  const ids = new Set();
  const profiles = data.profiles.map((entry) => {
    if (!isRecord(entry) || typeof entry.id !== "string" || !/^[a-zA-Z0-9-]{1,80}$/.test(entry.id) || ids.has(entry.id)) throw new Error("invalid-profile-id");
    ids.add(entry.id);
    return { id: entry.id, profile: validateProfile(entry.profile, true) };
  });
  if (!ids.has(data.activeId)) throw new Error("invalid-active-profile");
  return { schemaVersion: PROFILE_VERSION, ui: validatePreferences(data.ui), activeId: data.activeId, profiles };
};
export const readProfileStore = (storage) => {
  try {
    const current = storage.getItem(STORAGE_KEY);
    const legacy = current === null ? storage.getItem(LEGACY_STORAGE_KEY) : null;
    return { store: current !== null || legacy !== null ? parseProfileStore(current ?? legacy) : createProfileStore(), error: false };
  } catch {
    // Preserve unreadable data; the UI requires explicit recovery before overwriting it.
    return { store: createProfileStore(), error: true };
  }
};
export const writeProfileStore = (storage, store) => {
  try {
    const normalized = parseProfileStore(JSON.stringify(store));
    storage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return true;
  } catch { return false; }
};
