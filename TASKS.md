# Görevler — Bootstrap Flow

## Faz 0 — Ürün sözleşmesi

- [x] Ürün amacı ve bilinçli kapsam dışı alanları tanımla
- [x] v1 işlevsel ve işlevsel olmayan gereksinimlerini yaz
- [x] Hedef kaynak mimarisini ve geçiş stratejisini belgele
- [x] Prompt değerlendirme stratejisini tanımla
- [ ] En az üç gerçek saha testi yürüt ve bulguları anonim biçimde kaydet

## Faz 1 — Test edilebilir çekirdek

- [x] Mevcut davranış için karakterizasyon/snapshot testleri oluştur
- [x] Prompt üretim mantığını DOM'dan bağımsız saf çekirdeğe ayır
- [x] Şablon, profil ve saklama şemalarını sürümle
- [x] Quick/Standard/Full × TR/EN × cevap dili × kod izni test matrisini tamamla
- [x] Mevcut `index.html` ile yeni çekirdeğin çıktı eşitliğini doğrula

## Faz 2 — Güvenilir iş akışı

- [x] Eksik zorunlu alanlarda kopyalamayı engelle ve alan bazında hata göster
- [x] Onaylanan Phase 1 planını Phase 2'ye taşıyan alan/manifest akışını tasarla ve uygula
- [x] Proje girdilerini prompt talimatlarından güvenli sınırlarla ayır
- [x] Kopyalama ve yerel kayıt hatalarını görünür hale getir
- [x] Mevcut dolu proje ve yanlış hedef yol korumalarını güçlendir

## Faz 3 — Ürünleşme

- [x] JSON profil içe/dışa aktarmayı ekle
- [x] Birden fazla yerel proje profili desteği ekle
- [ ] Agent adaptörlerini ortak şablon çekirdeğinden ayır
- [ ] Proje türüne özel belge paketlerini değerlendirme sonuçlarına göre ekle
- [ ] Erişilebilirlik ve responsive testlerini tamamla

## Faz 4 — v1 yayın kapısı

- [ ] Zorunlu değerlendirme senaryolarını geçir
- [ ] Desteklenen tarayıcılarda çevrimdışı akışı doğrula
- [ ] Tek HTML production build'ini doğrula
- [ ] Güncel demo ve doğrulama raporu üret
- [ ] README, STATUS, CHANGELOG ve sürüm bilgisini yayınla eşleştir

## v2 — Güvenilir yerel iş akışı

- [x] Dış agent denetimi sınırını açıkla ve kanıta dayalı doğrulama talimatları ekle
- [x] Mevcut v1 kayıtları koruyarak taşı ve hatalı veriyi sessizce ezme
- [x] Sözdizimi kontrolünü tüm kaynaklara ve inline uygulamaya genişlet
- [x] Tarayıcıda profil, kopyalama ve dört responsive genişlik için smoke testi
- [ ] Tüm desteklenen tarayıcılarda indirme tamamlanması ve kapsamlı erişilebilirlik denetimi
