# v2.0.1 doğrulama kaydı — 2026-10-05

Tüm denemelerde sentetik proje verileri kullanıldı.

## Otomatik kontroller

- `npm.cmd run build`: başarılı; tek HTML yeniden üretildi.
- `npm.cmd run verify`: başarılı; build güncelliği, tüm ESM kaynakları ve inline HTML JavaScript sözdizimi, 49 test.
- `git diff --check`: başarılı.
- Testler: 24 prompt kombinasyonu, deterministik çıktı, kaynak/HTML eşitliği, sürüm ve güven sınırı, zorunlu alan/plan kapısı, v1 taşıma, JSON roundtrip, geçersiz tür/sürüm/boyut, bozuk kayıt koruması, kayıt tekrar denemesi, profil geçişi/temizleme/silme, kopyalama fallback başarı/hata ve odak geri dönüşü.

## Tarayıcı smoke testi

Codex uygulama içi Chromium tarayıcısında yalnızca index.html sunan 127.0.0.1 önizlemesi kullanıldı; dizin listeleme ve başka dosyalara erişim açılmadı.

- Boş formda dört kopyalama düğmesi kapalı.
- Zorunlu alanlar dolunca 1/3/4 açık, onaylanan plan girilince 2 açık.
- Kopyalama başarı bildirimi görüldü.
- Yeni proje, projeler arası geçiş ve sayfa yenilemesinden sonra kalıcılık doğrulandı.
- Sentetik JSON dosyası yeni proje olarak yüklendi.
- TR/EN etiketleri, açık/koyu tema ve Tab ile odak ilerlemesi kontrol edildi.
- 375, 768, 1280 ve 1440 piksel genişliklerinde yatay sayfa taşması görülmedi.
- Kontrol edilen akışlarda konsol uyarısı/hatası görülmedi.

## Açık doğrulama sınırları

- JSON indirme isteği UI'da oluştu; uygulama içi tarayıcının download olayı zaman aşımına uğradı. Diskte indirme tamamlanması bu tarayıcıda doğrulanamadı. JSON serileştirme/okuma otomatik testleri ve dosyadan içe aktarma başarılı.
- Doğrudan file:// gezinmesi tarayıcı araç politikası tarafından engellendi; üretim HTML'i yerel HTTP üzerinden sınandı. Dosya açılışı farklı tarayıcılarda ayrıca kontrol edilmelidir.
- Ayrı formatter, linter veya TypeScript typecheck kurulumu yok; bunlar çalıştırılmış sayılmıyor. Proje sade JavaScript kullanıyor.
- Kapsamlı WCAG denetimi, ekran okuyucu, Firefox/Safari matrisi ve gerçek proje saha değerlendirmesi tamamlanmadı.
- Uygulama ağ hizmeti kullanmaz; ağ hatası akışı yoktur. Tarayıcı depolama ve pano hata akışları otomatik test edildi.
- Agent'ın gerçek dosya işlemleri bu araç tarafından uygulanamaz/denetlenemez. Promptlardaki güvenlik kuralları ve kanıt talepleri bir dosya sistemi güvenlik garantisi değildir.
