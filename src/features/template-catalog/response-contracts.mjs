export const RESPONSE_CONTRACTS = {
  en: {
    p1struct: `1. Understanding (max 10 lines)
2. Open questions (numbered)
3. Risks (max 5)
4. Bootstrap plan — table with columns: Path | Type (file/folder) | Purpose (one line) | Core/Adapted/Optional
5. Approval request`,
    p1q: `"Do you approve this plan as-is, or should I adjust it? I will not create anything until you confirm."`,
    p2struct: `1. Tree view of the created structure
2. Table: Path | Status (created/skipped-existing) | One-line content summary
3. Anything adapted or skipped, with reason
4. Suggested immediate next step for the project`,
    p2end: `"Bootstrap complete. Run the Validation prompt to verify the result."`,
    p3struct: `1. Audit table — columns: Check | Status (PASS/WARN/FAIL) | Evidence (file + finding) | Suggested fix
2. Overall verdict: READY or NEEDS FIXES
3. If NEEDS FIXES: numbered fix list ordered by severity (FAIL items first)`,
    p3q: `"Shall I apply the fixes listed above? I will not modify anything until you confirm."`,
    p4struct: `1. Project status summary (max 8 lines)
2. Reconciliation findings — table: Finding | File | Suggested update
3. Proposed file updates (exact new content)
4. Next steps (1-3, ordered, with reason)`,
    p4q: `"Shall I apply the proposed updates to the tracking files? I will not modify anything until you confirm."`,
  },
  tr: {
    p1struct: `1. Anlayış (en fazla 10 satır)
2. Açık sorular (numaralı)
3. Riskler (en fazla 5)
4. Bootstrap planı — tablo sütunları: Yol | Tip (dosya/klasör) | Amaç (tek satır) | Çekirdek/Uyarlanmış/Opsiyonel
5. Onay talebi`,
    p1q: `"Bu planı olduğu gibi onaylıyor musun, yoksa düzenleyeyim mi? Sen onaylamadan hiçbir şey oluşturmayacağım."`,
    p2struct: `1. Oluşturulan yapının ağaç görünümü
2. Tablo: Yol | Durum (oluşturuldu/atlandı-mevcut) | Tek satırlık içerik özeti
3. Uyarlanan veya atlanan her şey, gerekçesiyle
4. Proje için önerilen ilk sonraki adım`,
    p2end: `"Bootstrap tamamlandı. Sonucu doğrulamak için Validation promptunu çalıştırın."`,
    p3struct: `1. Denetim tablosu — sütunlar: Kontrol | Durum (PASS/WARN/FAIL) | Kanıt (dosya + bulgu) | Önerilen düzeltme
2. Genel hüküm: READY veya NEEDS FIXES
3. NEEDS FIXES ise: önem sırasına göre numaralı düzeltme listesi (önce FAIL maddeleri)`,
    p3q: `"Yukarıda listelenen düzeltmeleri uygulayayım mı? Sen onaylamadan hiçbir şeyi değiştirmeyeceğim."`,
    p4struct: `1. Proje durum özeti (en fazla 8 satır)
2. Mutabakat bulguları — tablo: Bulgu | Dosya | Önerilen güncelleme
3. Önerilen dosya güncellemeleri (yeni içerik birebir)
4. Sıradaki adımlar (1-3, sıralı, gerekçeli)`,
    p4q: `"Önerilen güncellemeleri izleme dosyalarına uygulayayım mı? Sen onaylamadan hiçbir şeyi değiştirmeyeceğim."`,
  },
};
