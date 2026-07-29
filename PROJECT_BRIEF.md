# Proje Özeti — Bootstrap Flow

## Amaç

Bootstrap Flow, ham bir yazılım fikrini doğrudan koda çevirmeye çalışmak yerine, bir kodlama agent'ının projeyi kontrollü biçimde başlatmasını sağlayan taşınabilir bir çalışma protokolü üretir.

Araçta gömülü LLM bulunmaz. Kullanıcıdan alınan proje bağlamı, sürümlenmiş ve test edilebilir prompt şablonlarına yerleştirilir. Üretilen promptlar Codex, Claude Code, Cursor veya benzeri bir dış agent'ta çalıştırılır.

## Hedef kullanıcı

- Yeni bir yazılım projesine nereden başlayacağını sistematikleştirmek isteyen bireysel geliştirici
- Farklı kodlama agent'larında benzer başlangıç kalitesi isteyen ekip
- Proje belgeleri ile gerçek kodun zaman içinde kopmasını azaltmak isteyen teknik lider

## Temel değer önerisi

Tek bir formdan şu güvenli döngüyü üretmek:

1. Anla ve belirsizlikleri sor.
2. Kullanıcı onayından sonra iskeleti oluştur.
3. Gerçek dosyaları bağımsız olarak doğrula.
4. Sonraki oturumlarda görevleri ve değişiklik geçmişini gerçekle mutabık kıl.

## v1 başarı tanımı

Bootstrap Flow v1, en az beş farklı proje senaryosunda:

- eksik bağlamla üretime geçmeyi engeller,
- onaylanan planı bootstrap aşamasına kayıpsız taşır,
- aynı girdiden aynı promptları üretir,
- mevcut dolu projelerde güvenli davranır,
- ürettiği belgelerin tutarlı ve uygulanabilir olduğunu otomatik testlerle gösterir,
- çevrimdışı çalışan tek bir `index.html` olarak dağıtılabilir.

## Bilinçli kapsam dışı

- Gömülü LLM veya model API entegrasyonu
- Kullanıcının hedef klasörüne doğrudan dosya yazma
- Bulut hesabı, senkronizasyon veya telemetri
- Tam özellikli proje yönetimi sistemi
- Kodlama agent'larının yerini alma

