# Agent Kuralları — Bootstrap Flow

Bootstrap Flow, gömülü LLM kullanmadan dış kodlama agent'ları için sürümlü proje başlatma promptları üreten çevrimdışı bir web aracıdır.

## Okuma sırası

1. `STATUS.md`
2. `PROJECT_BRIEF.md`
3. `REQUIREMENTS.md`
4. `DESIGN.md`
5. `EVALUATION.md`
6. `TASKS.md`
7. `DECISIONS.md`

## Mevcut durum

- Çalışan uygulama ve dağıtım artefaktı kök `index.html` dosyasındadır.
- Prompt üretiminin doğruluk kaynağı `src/features/` altındaki ESM modülleridir.
- `scripts/build.mjs` bu modülleri `index.html` içindeki işaretli bölgeye gömer.
- Testler Node'un yerleşik test çalıştırıcısını kullanır; dış bağımlılık yoktur.

## Çalışma kuralları

- Kullanıcı açıkça istemedikçe çalışan `index.html` davranışını değiştirme.
- Önce mevcut davranışı karakterizasyon testleriyle güvenceye al.
- Gömülü LLM, backend, telemetri veya doğrudan dosya yazma ekleme.
- Dağıtımın tek HTML ve çevrimdışı kalmasını koru.
- İş kurallarını DOM ve tarayıcı API'lerinden bağımsız tut.
- Kullanıcı girdisini güvenilmeyen veri olarak ele al.
- Yeni üretim bağımlılığını gerekçesiz ekleme.
- Yapılan işi `TASKS.md` ve `CHANGELOG.md` ile eşleştir.
- Kalıcı ürün veya mimari kararını `DECISIONS.md` içinde ADR olarak kaydet.

## Komutlar

- Sözdizimi kontrolü: `npm.cmd run check` (PowerShell) veya `npm run check`
- Testler: `npm.cmd test` (PowerShell) veya `npm test`
- Build: `npm.cmd run build` (PowerShell) veya `npm run build`
- Tam doğrulama: `npm.cmd run verify` (PowerShell) veya `npm run verify`
- Çalıştırma: kök `index.html` dosyasını tarayıcıda aç

## Kontrol disiplini

Her çekirdek değişikliğinde önce build, ardından tam doğrulama çalıştırılır. `index.html` içindeki `PROMPT_CORE` bölgesini elle düzenleme. Format, lint, tip kontrolü ve tarayıcı erişilebilirlik kontrolleri ilgili araçlar seçildikten sonra yayın kapısına eklenecektir; henüz var olmayan kontrolleri çalışmış gibi raporlama.
