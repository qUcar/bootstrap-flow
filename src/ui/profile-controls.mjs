const PROFILE_TEXT = {
  tr: {
    profiles: "Yerel projeler", unnamed: "Adsız proje", new: "Yeni proje", delete: "Projeyi sil",
    export: "JSON indir", import: "JSON yükle", recovery: "Kaydı yeniden dene",
    required: "Bu alan zorunlu.", plan: "Bootstrap için onaylanan planı girin.",
    storage: "Yerel kayıt başarısız. Değişiklikler yalnızca bu oturumda. JSON indirerek yedekleyin ve kaydı yeniden deneyin.",
    load: "Yerel kayıt okunamadı veya sürümü desteklenmiyor. Eski veri korundu. Devam etmek için JSON yükleyin ya da kaydı yeniden denemeyi seçin.",
    replace: "Okunamayan kaydın yerine bu oturumdaki projeler kaydedilsin mi? Eski kaydı kaybedebilirsiniz.",
    saved: "Projeler bu tarayıcıya kaydedildi.", copied: "Prompt kopyalandı.",
    copyError: "Kopyalanamadı. Prompt metnini seçip Ctrl+C veya ⌘C kullanın.",
    importError: "JSON yüklenemedi. Bootstrap Flow profil dosyası ve desteklenen sürüm olduğundan emin olun (en fazla 2 MB).",
    imported: "Profil yeni bir proje olarak yüklendi.", exported: "Profil indirme isteği oluşturuldu.",
    exportError: "İndirme başlatılamadı. Tarayıcı indirme izinlerini kontrol edin.",
    deleteConfirm: "Seçili yerel proje silinsin mi? Bu işlem geri alınamaz.",
    limit: "En fazla 100 yerel proje saklanabilir. Önce bir projeyi yedekleyip silin.",
    privacy: "JSON dosyası proje metinlerinizi içerir. Paylaşmadan önce hassas bilgileri çıkarın.",
    boundary: "Bu araç yalnızca prompt üretir; hedef klasöre erişmez ve dış agent’ın işlemlerini denetleyemez. Mevcut dosyaları koruma kuralları agent’a verilen talimatlardır. Değişiklikleri agent’ın raporu ve Git diff ile inceleyin.",
  },
  en: {
    profiles: "Local projects", unnamed: "Untitled project", new: "New project", delete: "Delete project",
    export: "Download JSON", import: "Import JSON", recovery: "Retry saving",
    required: "This field is required.", plan: "Enter the approved plan for Bootstrap.",
    storage: "Local save failed. Changes exist only in this session. Download JSON to back up and retry saving.",
    load: "Local data could not be read or its version is unsupported. The original was preserved. Import JSON or explicitly retry saving to continue.",
    replace: "Replace the unreadable saved data with this session's projects? The old data may be lost.",
    saved: "Projects saved in this browser.", copied: "Prompt copied.",
    copyError: "Copy failed. Select the prompt text and use Ctrl+C or ⌘C.",
    importError: "Could not import JSON. Use a supported Bootstrap Flow profile file (maximum 2 MB).",
    imported: "Profile imported as a new project.", exported: "Profile download requested.",
    exportError: "Download could not start. Check browser download permissions.",
    deleteConfirm: "Delete the selected local project? This cannot be undone.",
    limit: "Up to 100 local projects are supported. Back up and delete a project first.",
    privacy: "JSON includes your project text. Remove sensitive information before sharing.",
    boundary: "This tool only generates prompts; it cannot access the target folder or enforce an external agent's actions. File protection rules are instructions to the agent. Review its report and Git diff before accepting changes.",
  },
};
const profileText = () => PROFILE_TEXT[state.ui.lang];
let profileNoticeKey = null;
function showNotice(key) {
  profileNoticeKey = key;
  $("profile-notice").textContent = profileText()[key];
}
function renderStorageNotice() {
  $("storage-notice").textContent = storageProblem ? profileText()[storageProblem] : "";
  $("retry-save").hidden = !storageProblem;
}
function renderProfileControls() {
  const text = profileText();
  if (profileNoticeKey) $("profile-notice").textContent = text[profileNoticeKey];
  $("theme-btn").setAttribute("aria-label", state.ui.lang === "tr" ? "Tema" : "Theme");
  $("profile-label").textContent = text.profiles;
  for (const [id, key] of [["new-profile", "new"], ["delete-profile", "delete"], ["export-profile", "export"], ["import-label", "import"], ["retry-save", "recovery"]]) $(id).textContent = text[key];
  $("profile-privacy").textContent = text.privacy;
  $("agent-boundary").textContent = text.boundary;
  const select = $("profile-select");
  select.innerHTML = "";
  for (const entry of profileStore.profiles) {
    const option = document.createElement("option");
    option.value = entry.id;
    option.textContent = entry.profile.name.trim() || text.unnamed;
    select.appendChild(option);
  }
  select.value = profileStore.activeId;
  renderStorageNotice();
}
function refreshProfileForm() {
  FIELD_MAP.forEach(([id, key]) => { $(id).value = state.f[key]; });
  $("f-code").checked = state.f.code;
  buildSelects(); applyLabels(); renderPrompts();
}
function activateProfile(id) {
  const entry = profileStore.profiles.find((item) => item.id === id);
  if (!entry) return;
  profileStore.activeId = id;
  state.f = entry.profile;
  refreshProfileForm(); save();
}
function addProfile(profile) {
  if (profileStore.profiles.length >= 100) { showNotice("limit"); return false; }
  let number = 1;
  while (profileStore.profiles.some((entry) => entry.id === `project-${number}`)) number++;
  const id = `project-${number}`;
  profileStore.profiles.push({ id, profile: validateProfile(profile) });
  activateProfile(id);
  return true;
}
function setupProfileControls() {
  $("profile-select").addEventListener("change", (event) => activateProfile(event.target.value));
  $("new-profile").addEventListener("click", () => { addProfile(PROFILE_DEFAULTS); $("f-name").focus(); });
  $("delete-profile").addEventListener("click", () => {
    if (!confirm(profileText().deleteConfirm)) return;
    profileStore.profiles = profileStore.profiles.filter((entry) => entry.id !== profileStore.activeId);
    if (!profileStore.profiles.length) profileStore.profiles = createProfileStore().profiles;
    activateProfile(profileStore.profiles[0].id);
  });
  $("retry-save").addEventListener("click", () => {
    if (storageBlocked && !confirm(profileText().replace)) return;
    storageBlocked = false;
    if (save()) showNotice("saved");
  });
  $("export-profile").addEventListener("click", () => {
    let url;
    try {
      url = URL.createObjectURL(new Blob([exportProfile(state.f)], { type: "application/json" }));
      const link = document.createElement("a");
      link.href = url; link.download = "bootstrap-flow-profile.json";
      document.body.appendChild(link); link.click(); link.remove();
      showNotice("exported");
    } catch { showNotice("exportError"); }
    finally { if (url) setTimeout(() => URL.revokeObjectURL(url), 1000); }
  });
  $("import-profile").addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      if (file.size > MAX_PROFILE_BYTES) throw new Error("too-large");
      const profile = importProfile(await file.text());
      if (addProfile(profile)) showNotice("imported");
    } catch { showNotice("importError"); }
    finally { event.target.value = ""; }
  });
}
