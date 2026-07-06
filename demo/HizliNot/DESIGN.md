# Tasarım — HizliNot

Bileşenler:
- cli: argüman ayrıştırma (argparse), `ekle` ve `listele` alt komutları
- store: notlar.json okuma/yazma (json + pathlib), atomik yazım
- format: liste çıktısını hizalı yazdırma

Veri akışı: komut → cli → store (oku/yaz) → format → stdout
Veri modeli: [{"ts": "ISO-8601", "metin": "..."}]
Kısıt: üçüncü parti kütüphane yok; veri dosyası kullanıcı ev dizininde tutulur.
