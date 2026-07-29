# Değişiklik Günlüğü — Bootstrap Flow

Bu proje Keep a Changelog yaklaşımını izler.

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
