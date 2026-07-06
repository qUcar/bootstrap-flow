# Kararlar — HizliNot

## ADR-001 — Bootstrap kararları (2026-07-06)
- Yalnızca Python 3.10 standart kütüphanesi kullanılacak (kullanıcı kısıtı).
- Veri deposu tek JSON dosyası; veritabanı bilinçli olarak kapsam dışı.
- Kod yazımı bootstrap kapsamında değil; src/ boş bırakıldı.

## ADR-002 — Çekirdek setten onaylı sapma (2026-07-06)
- prompts/ ve skills/ klasörleri OLUŞTURULMADI.
- Gerekçe: tek kullanıcılık küçük CLI aracında yeniden kullanılabilir agent
  promptu veya yetenek tanımı ihtiyacı yok; boş klasör gürültü üretir.
- Durum: Faz 1 planında önerildi, kullanıcı tarafından onaylandı.
