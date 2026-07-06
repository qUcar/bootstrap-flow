# Gereksinimler — HizliNot

- Proje adı: HizliNot
- Teknoloji: Python 3.10
- MVP hedefi: not ekle ve not listele komutlariyla notlari JSON dosyasinda saklayan CLI

## İşlevsel
- F1: `not ekle "<metin>"` komutu notu zaman damgasıyla JSON dosyasına ekler.
- F2: `not listele` komutu notları tarih sırasıyla numaralandırıp gösterir.
- F3: JSON dosyası yoksa ilk eklemede otomatik oluşturulur.

## İşlevsel olmayan
- N1: Python 3.10 standart kütüphanesi dışında bağımlılık yok.
- N2: Windows'ta çalışır; tek dosyalık veri deposu (notlar.json).
- N3: Bozuk JSON durumunda veri kaybetmeden anlaşılır hata verir.
