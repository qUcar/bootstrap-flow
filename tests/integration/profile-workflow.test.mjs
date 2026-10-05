import assert from "node:assert/strict";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { PROFILE_DEFAULTS, validateProfile, missingFields, exportProfile, importProfile } from "../../src/features/project-profile/profile-schema.mjs";
import { createProfileStore, parseProfileStore, readProfileStore, writeProfileStore, STORAGE_KEY, LEGACY_STORAGE_KEY } from "../../src/features/project-profile/profile-store.mjs";
import { writeClipboard } from "../../src/features/preferences/clipboard.mjs";
import { loadIndexApplication } from "../index-app-harness.mjs";

const indexPath = fileURLToPath(new URL("../../index.html", import.meta.url));
const profile = { ...PROFILE_DEFAULTS, name: "Synthetic test", root: "C:/test", desc: "Synthetic fixture", type: "web", tech: "JS", mvp: "Demo" };

test("required fields gate all phases and the approved plan gates bootstrap", () => {
  for (let phase = 0; phase < 4; phase++) {
    assert.ok(missingFields(PROFILE_DEFAULTS, phase).includes("root"));
    assert.deepEqual(missingFields(profile, phase), phase === 1 ? ["approvedPlan"] : []);
  }
  assert.deepEqual(missingFields({ ...profile, approvedPlan: "Approved" }, 1), []);
});
test("schema rejects wrong types, options, large values and unsupported imports", () => {
  for (const invalid of [null, [], { name: 3 }, { code: "false" }, { scale: "huge" }, { promptLang: "de" }, { desc: "x".repeat(100001) }]) assert.throws(() => validateProfile(invalid));
  for (const invalid of ["{", "null", '{"format":"bootstrap-flow-profile","schemaVersion":3,"profile":{}}', '{"format":"bootstrap-flow-profile","schemaVersion":2,"profile":{}}']) assert.throws(() => importProfile(invalid));
  assert.throws(() => importProfile(" ".repeat(2_000_001)));
});
test("JSON roundtrip preserves Unicode and strips unknown properties", () => {
  const original = { ...profile, name: "İş akışı 🚀", notes: "<script>alert(1)</script>\nline", approvedPlan: "Plan" };
  assert.deepEqual(importProfile(exportProfile(original)), original);
  assert.equal(Object.hasOwn(validateProfile(JSON.parse('{"__proto__":{"polluted":true}}')), "__proto__"), false);
  assert.equal({}.polluted, undefined);
});
test("legacy migration preserves data and preferences without removing original storage", () => {
  const old = JSON.stringify({ ui: { lang: "en", theme: "dark" }, f: { ...profile, agent: "Agent" } });
  const values = new Map([[LEGACY_STORAGE_KEY, old]]);
  const storage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
  const result = readProfileStore(storage);
  assert.equal(result.error, false);
  assert.equal(result.store.ui.theme, "dark");
  assert.equal(result.store.profiles[0].profile.agent, "a coding agent");
  assert.equal(writeProfileStore(storage, result.store), true);
  assert.equal(values.get(LEGACY_STORAGE_KEY), old);
  assert.equal(parseProfileStore(values.get(STORAGE_KEY)).schemaVersion, 2);
});
test("corrupt or future storage is reported and never silently replaced", async () => {
  let writes = 0;
  const localStorage = { getItem: () => '{"schemaVersion":99}', setItem: () => { writes++; } };
  const app = await loadIndexApplication(indexPath, { localStorage });
  assert.equal(app.save(), false);
  assert.equal(writes, 0);
  assert.match(app.document.getElementById("storage-notice").textContent, /okunamadı/);
});
test("storage failures remain visible independently of other notices", async () => {
  const app = await loadIndexApplication(indexPath, { localStorage: { getItem: () => null, setItem: () => { throw new Error("quota"); } } });
  assert.equal(app.save(), false);
  assert.match(app.document.getElementById("storage-notice").textContent, /başarısız/);
  assert.equal(app.document.getElementById("retry-save").hidden, false);
});
test("store rejects duplicates, missing active IDs and invalid preferences", () => {
  const store = createProfileStore();
  assert.throws(() => parseProfileStore(JSON.stringify({ ...store, activeId: "missing" })));
  assert.throws(() => parseProfileStore(JSON.stringify({ ...store, profiles: [...store.profiles, ...store.profiles] })));
  assert.throws(() => parseProfileStore(JSON.stringify({ ...store, ui: { lang: "invalid" } })));
});
test("UI gates copy and keeps projects independent across switching and reload", async () => {
  let writes = 0;
  const app = await loadIndexApplication(indexPath, { navigator: { clipboard: { writeText: async () => { writes++; } } } });
  const buttons = app.document.querySelectorAll(".copy-btn");
  assert.ok(buttons.every(button => button.disabled));
  await buttons[0].dispatch("click");
  assert.equal(writes, 0);
  app.addProfile(profile);
  assert.equal(buttons[0].disabled, false);
  assert.equal(buttons[1].disabled, true);
  await buttons[0].dispatch("click");
  assert.equal(writes, 1);
  app.addProfile({ ...profile, name: "Second", approvedPlan: "Approved" });
  assert.equal(buttons[1].disabled, false);
  app.activateProfile("project-1");
  assert.equal(app.state().f.name, profile.name);
  assert.equal(app.state().f.approvedPlan, "");
  const restored = await loadIndexApplication(indexPath, { localStorage: { getItem: key => app.storage.get(key) ?? null, setItem: () => {} } });
  assert.equal(restored.state().f.name, profile.name);
  assert.equal(restored.store().profiles.length, 3);
});
test("clipboard reports both failed fallback and thrown fallback without false success", async () => {
  for (const outcome of [false, true, "throw"]) {
    let removed = false;
    let focused = false;
    const doc = { activeElement: { focus: () => { focused = true; } }, body: { appendChild() {} }, createElement: () => ({ select() {}, remove: () => { removed = true; } }), execCommand: () => { if (outcome === "throw") throw new Error("denied"); return outcome; } };
    assert.equal(await writeClipboard("Synthetic", {}, doc), outcome === true);
    assert.equal(removed, true);
    assert.equal(focused, true);
  }
});
test("invalid JSON import leaves existing projects unchanged", async () => {
  const app = await loadIndexApplication(indexPath);
  const before = JSON.stringify(app.store());
  const input = app.document.getElementById("import-profile");
  input.files = [{ size: 10, text: async () => '{"bad":1}' }];
  await input.dispatch("change");
  assert.equal(JSON.stringify(app.store()), before);
  assert.match(app.document.getElementById("profile-notice").textContent, /yüklenemedi/);
});

test("valid JSON import creates an independent project and clear affects only that project", async () => {
  const app = await loadIndexApplication(indexPath);
  const input = app.document.getElementById("import-profile");
  input.files = [{ size: 600, text: async () => exportProfile(profile) }];
  await input.dispatch("change");
  assert.equal(app.state().f.name, profile.name);
  assert.equal(app.store().profiles.length, 2);
  await app.document.getElementById("clear-btn").dispatch("click");
  assert.equal(app.state().f.name, "");
  assert.equal(app.store().profiles.length, 2);
  await app.document.getElementById("delete-profile").dispatch("click");
  await app.document.getElementById("delete-profile").dispatch("click");
  assert.equal(app.store().profiles.length, 1);
});
test("copy fallback failure is visible without a success style", async () => {
  const app = await loadIndexApplication(indexPath, { navigator: {} });
  app.addProfile(profile);
  app.document.execCommand = () => false;
  const button = app.document.querySelectorAll(".copy-btn")[0];
  await button.dispatch("click");
  assert.equal(button.classList.contains("ok"), false);
  assert.match(app.document.getElementById("profile-notice").textContent, /Kopyalanamadı/);
});
test("failed save can be retried without losing current edits", async () => {
  let denied = true;
  let saved;
  const app = await loadIndexApplication(indexPath, { localStorage: { getItem: () => null, setItem: (key, value) => { if (denied) throw new Error("denied"); saved = value; } } });
  app.addProfile(profile);
  denied = false;
  await app.document.getElementById("retry-save").dispatch("click");
  assert.equal(parseProfileStore(saved).profiles[1].profile.name, profile.name);
  assert.equal(app.document.getElementById("storage-notice").textContent, "");
});
