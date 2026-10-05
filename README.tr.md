# Bootstrap Flow v2 — Prompt Üretici

English: [README.md](README.md)

Yerel, tek dosyalık HTML aracı. Proje bilgilerini formdan alır ve Claude Code, Fable, Codex, Cursor gibi agent'lara verilecek 3 başlangıç aşaması ve devam akışından oluşan "Project Bootstrap Flow" promptları üretir.

**Bu araç dosya veya klasör oluşturmaz.** Dosya üretimini, promptları verdiğiniz agent yapar.

## Kullanım

1. `index.html` dosyasını çift tıklayıp tarayıcıda açın (internet gerekmez).
2. Formu doldurun — form her değişiklikte tarayıcıya otomatik kaydedilir.
3. Üretilen 3 promptu **sırayla** agent'a verin:

| Sıra | Prompt | Ne yapar | Ne beklemeli |
|------|--------|----------|--------------|
| 1 | Anlama ve plan | Agent projeyi sentezler, plan sunar | Dosya üretmez; sizden **onay** ister |
| 2 | Bootstrap | 1. aşamada onaylanan planı forma yapıştırdıktan sonra agent klasör ve kök `.md` dosyalarını oluşturur | Plan yoksa durur; varsa üretim raporu verir |
| 3 | Doğrulama | Agent üretilenleri denetler (tercihen **yeni oturumda** verin) | PASS/WARN/FAIL raporu; düzeltme için onay ister |

Projeye sonraki oturumlarda dönerken 4. promptu kullanın:

| Sıra | Prompt | Ne yapar | Ne beklemeli |
|------|--------|----------|--------------|
| 4 | Devam / Güncelle | Agent izleme dosyalarını gerçek durumla karşılaştırır | Durum özeti + TASKS/CHANGELOG güncelleme önerisi + sıradaki adımlar; onaysız değişiklik yapmaz |

## Özellikler

- Sade-modern arayüz, karanlık/aydınlık tema
- TR/EN arayüz dili; prompt dili (EN önerilen / TR) ve agent cevap dili ayrı ayrı seçilebilir
- Proje tipi seçilince teknoloji ve MVP alanlarında örnek ipuçları görünür
- Karakter sayacı ve tek tık kopyalama
- Veriler yalnızca tarayıcının localStorage'ında tutulur; hiçbir yere gönderilmez

## v2 yenilikleri

- Zorunlu alanlar eksikken kopyalama kapalıdır. Bootstrap ayrıca onaylanan planı ister.
- En fazla 100 yerel proje oluşturulur, değiştirilir ve silinir. Seçici etiketi proje adıdır.
- Seçili profil JSON olarak indirilir; desteklenen JSON dosyası yeni proje olarak yüklenir (en fazla 2 MB). Eksik taslaklar da yedeklenebilir.
- Eski v1 kayıtları ilk başarılı kayıtta v2'ye taşınır; eski anahtar korunur. Bozuk ve gelecek sürüm kayıtlar açık kurtarma onayına kadar ezilmez.
- Kayıt hatasında JSON yedeği alın ve yeniden deneyin; başarısız değişiklikler sayfa kapanınca kaybolabilir.
- Yerel HTML ve GitHub Pages farklı depolar kullanabilir. Profilinizi JSON ile taşıyın; paylaşmadan önce hassas bilgileri çıkarın.
- Araç dış agent'ın dosya işlemlerini uygulamalı olarak denetleyemez. Hedef yolu, mevcut dosyaları, agent raporunu ve Git diff çıktısını inceleyin. Kanıtsız kontroller başarılı sayılmamalıdır.

## Projenin geliştirilmesi

Mevcut çalışan ürün kök `index.html` dosyasıdır. Prompt çekirdeği `src/features/` altında DOM'dan bağımsız kaynak modüllerine ayrılmıştır; build işlemi bu modülleri tekrar tek HTML içine gömer.

Başlangıç belgeleri:

- [PROJECT_BRIEF.md](PROJECT_BRIEF.md) — ürün amacı ve v1 başarı tanımı
- [REQUIREMENTS.md](REQUIREMENTS.md) — gereksinimler ve kabul ölçütleri
- [DESIGN.md](DESIGN.md) — hedef mimari ve geçiş yaklaşımı
- [EVALUATION.md](EVALUATION.md) — prompt kalite rubriği ve test senaryoları
- [TASKS.md](TASKS.md) — uygulanabilir iş sırası
- [ROADMAP.md](ROADMAP.md) — v0.7'den v1'e yayın planı
- [DECISIONS.md](DECISIONS.md) — mimari karar kayıtları

Yeni üretim bağımlılığı eklenmemiştir. Build ve testler Node'un yerleşik araçlarıyla çalışır.

Karakterizasyon testleri artık Node'un yerleşik test araçlarıyla çalışır ve dış paket gerektirmez:

```powershell
npm.cmd run build
npm.cmd run check
npm.cmd test
npm.cmd run verify
```

## Üretilen promptların hedef projede oluşturttuğu çekirdek set

Dosyalar: `README.md`, `PROJECT_BRIEF.md`, `REQUIREMENTS.md`, `DESIGN.md`, `CLAUDE.md`, `AGENTS.md`, `CODEX.md`, `TASKS.md`, `ROADMAP.md`, `DECISIONS.md`, `CHANGELOG.md`, `LESSONS.md`, `.env.example`, `.gitignore`

Klasörler: `docs/`, `src/`, `tests/`, `scripts/`, `configs/`, `prompts/`, `skills/`, `.agent/`

Kural dosyalarında tek doğruluk kaynağı `AGENTS.md`'dir; `CLAUDE.md` ve `CODEX.md` ona yönlendirir.

## Sürüm

- v0.6 — **Proje ölçeği seçici (Hızlı / Standart / Tam).** Çekirdek dosya/klasör seti proje büyüklüğüne göre ayarlanır: Hızlı = 7 dosya + 3 klasör (küçük betik), Standart = 12 + 5, Tam = 14 + 8 (varsayılan, kapsamlı proje). Her kademe alttakini kapsar. Araştırmanın "küçük iş için 14 dosya fazla" bulgusunu çözer; tutarlılık ve doğrulama kuralları ölçeğe göre uyarlanır.
- v0.5 — **AGENTS.md kalite paketi.** Opsiyonel "Komutlar" alanı: agent build/test/run komutlarını AGENTS.md'ye yazar (araştırmaya göre agent'a en çok yarayan içerik). AGENTS.md artık açık standardın başlıklarıyla üretilir ve "ince tut, kopyalama yerine referans ver" kuralına uyar. Bootstrap'a `git init` 0. adımı eklendi. Projeye `STATUS.md` (gidişat takip dosyası) eklendi.
- v0.4 — **4. prompt: Devam / Güncelle.** Projeye sonraki oturumlarda dönerken kullanılır: agent izleme dosyalarını okur, TASKS.md'yi depodaki gerçek durumla mutabık kılar, CHANGELOG eksiklerini bulur, güncelleme önerisi sunar ve sıradaki 1-3 adımı söyler; onaysız değişiklik yapmaz.
- v0.3 — Zorunlu alanlarda ince kırmızı/yeşil çerçeve; tüm alanlarda "i" bilgi balonları (açıklama + örnek; hover, tık ve klavye ile açılır; TR/EN).
- v0.2 — Dogfooding sonrası şablon düzeltmeleri: kapanış cümleleri ve bölüm başlıkları cevap diline göre üretilir, Bootstrap–Validation tutarlılık şartı, denetim istisnaları (onaylı sapmalar, LESSONS.md), esnek `.env.example` kuralı, klasör amaç tanımları, içerik dili kuralı.
- v0.1 — İlk MVP.

Planlanan v2: proje tipine özel ek dosya paketleri (ör. vision → `CALIBRATION.md`), JSON dışa/içe aktarma, çoklu proje profilleri, şablon düzenleme modu.
