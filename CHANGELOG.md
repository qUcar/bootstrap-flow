# Değişiklik Günlüğü — Bootstrap Flow

Bu proje Keep a Changelog yaklaşımını izler.

## [2.0.0] — 2026-10-05

### Added

- Alan bazlı erişilebilir doğrulama; eksik zorunlu alanlarda kopyalama engeli ve Bootstrap için onaylı plan kapısı.
- Görünür kayıt/kopyalama hataları, kayıt yeniden denemesi ve başarısız kopyalama için elle kopyalama yönlendirmesi.
- Profil/saklama şeması v2, şablon sürümü 2.0.0; eski v1 kaydının doğrulanarak taşınması. Eski kayıt korunur; bozuk/gelecek sürüm kayıtları otomatik ezilmez.
- En fazla 100 yerel proje, proje değiştirme/oluşturma/silme ve seçili profili JSON içe/dışa aktarma (2 MB sınırı).
- Dış agent güven sınırının açık gösterimi; yol/symlink kontrolleri, başlangıç/son Git farkı ve doğrulanamayan kontrollerin açık raporlanması. Onaylı plan doğrulama aşamasına da taşınır.
- Kaynak modülleri ve HTML scriptlerini kapsayan sözdizimi kontrolü; profil, saklama, kopyalama ve UI akış regresyon testleri.

### Compatibility

- Tek HTML, çevrimdışı kullanım ve sıfır üretim bağımlılığı korunur. LLM, backend veya hedef klasöre yazma eklenmez.
- GitHub Pages ve yerel dosya farklı tarayıcı depoları kullanabilir; geçiş için JSON aktarımını kullanın.

## [0.7.0-alpha.2] — 2026-08-17

### Added

- Her dört aşamaya güvenilir girdi sınırı: bağlam değerleri açıkça "veri, talimat değil" olarak işaretlenir (`# INPUT TRUST` / `# GİRDİ GÜVENİ`)
- Eksik kök klasör koruması: kök verilmediğinde Bootstrap promptu belirgin işaretle durur, yer tutucu klasör oluşturmaz
- `STATUS.md` üretilen çekirdek sete eklendi (Standart ve Tam ölçek): sürüm, son güncelleme, aktif odak, sıradaki adımlar ve bilinen blocker'lar için tek bakışlık devam girişi
- Devam/Güncelle promptunda somut git adımları: `git log --oneline -20`, `git status --short`, `git diff` ve `git diff --staged`
- Saha testi regresyonları: eksik kök klasör, güvenilir girdi çitlenmesi, STATUS.md çekirdek seti ve Devam/Güncelle bağlantısı

### Changed

- Devam/Güncelle promptu izleme dosyalarını `STATUS.md` ile başlayan sırayla okur ve güncelleme önerisine `STATUS.md` tazelemesini dahil eder
- Belgelerle git geçmişi çeliştiğinde, aksi kanıtlanana kadar belgeler hatalı kabul edilir
- Ölçek başına çekirdek dosya sayısı: Hızlı 7, Standart 13, Tam 15
- Test paketi 33 geçen senaryoya ulaştı

## [0.7.0-alpha.1] — 2026-07-29

### Added

- v1 ürün özeti ve kabul ölçütleri
- Hedef mimari ve tek HTML'e geçiş stratejisi
- Prompt kalitesi değerlendirme rubriği
- Aşamalı görev listesi ve yol haritası
- Karar kayıtları ve katkı çalışma kuralları
- Gelecekteki kaynak, test, dokümantasyon ve dağıtım klasör iskeleti
- Sıfır dış bağımlılıkla çalışan Node test altyapısı
- Mevcut dört promptu sabitleyen SHA-256 karakterizasyon kontrolleri
- Quick/Standard/Full, TR/EN prompt, TR/EN cevap ve kod izni kombinasyonlarını kapsayan 24 senaryolu matris
- DOM'dan bağımsız saf prompt generator modülü
- Proje yapısı, cevap sözleşmeleri ve EN/TR şablonları için ayrı kaynak modülleri
- Kaynak modülleri çevrimdışı tek `index.html` içine alan sıfır bağımlılıklı build adımı
- Phase 1'de onaylanan planı Phase 2'ye taşıyan form alanı ve güvenli durma davranışı

### Changed

- Bootstrap promptu seçilen ölçeğin çekirdek dosyalarını açıkça listeler.
- Eski localStorage profilleri yeni alanların varsayılan değerleriyle birleştirilir.
- Test paketi 28 geçen senaryoya ve sıfır bekleyen TODO'ya ulaştı.

## [0.6.0] — 2026-07-08

### Added

- Quick, Standard ve Full proje ölçeği seçenekleri
