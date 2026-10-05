# Kararlar — Bootstrap Flow

## ADR-001 — Gömülü LLM kullanılmayacak

- **Durum:** Kabul edildi
- **Karar:** Bootstrap Flow deterministik bir prompt üretici olarak kalacak.
- **Gerekçe:** Çevrimdışı kullanım, gizlilik, sıfır API maliyeti ve agent bağımsızlığı ürünün temel değeridir.
- **Sonuç:** Proje fikrini yorumlama ve dosya üretme sorumluluğu dış kodlama agent'ındadır.

## ADR-002 — Tek HTML dağıtımı korunacak

- **Durum:** Kabul edildi
- **Karar:** Geliştirme kaynakları modüllere ayrılabilir; kullanıcıya sunulan üretim çıktısı tek HTML olacaktır.
- **Gerekçe:** Mevcut ürünün kurulum gerektirmeyen yapısı kaybedilmeden test edilebilirlik ve bakım kalitesi artırılabilir.
- **Sonuç:** Kaynak ağacı ile dağıtım artefaktı birbirinden ayrılır.

## ADR-003 — Mevcut uygulama referans davranış olarak korunacak

- **Durum:** Kabul edildi
- **Karar:** Kök `index.html`, yeni üretim hattı davranış eşitliğini kanıtlayana kadar değiştirilmeden korunur.
- **Gerekçe:** Mimari iyileştirme çalışan ürünü gereksiz riske atmamalıdır.
- **Sonuç:** İlk teknik iş yeniden yazım değil, karakterizasyon testidir.

## ADR-004 — Kalite belge sayısıyla ölçülmeyecek

- **Durum:** Kabul edildi
- **Karar:** Başarı; doğruluk, tamlık, uygulanabilirlik, güvenlik, aşamalar arası tutarlılık ve ekonomi rubriğiyle ölçülür.
- **Gerekçe:** Çok sayıda düzgün biçimli belge doğru proje anlayışını garanti etmez.
- **Sonuç:** Her sürüm zorunlu senaryo setinden geçmelidir.

## ADR-005 — Üretim teknolojisi seçimi ertelendi

- **Durum:** ADR-006 ile test aracı yönünden güncellendi; kaynak dili ve paketleyici yönünden geçerli
- **Karar:** Üretim kaynak dili ve paketleyici kısa bir teknik keşif sonrasında seçilecek.
- **Gerekçe:** Bu iskelet aşamasında üretim bağımlılığı eklemek erken bağlanma yaratır.
- **Sonuç:** Henüz üretim bağımlılığı veya build yapılandırması oluşturulmaz.

## ADR-006 — İlk test katmanında Node yerleşik araçları kullanılacak

- **Durum:** Kabul edildi
- **Karar:** Karakterizasyon testleri Node'un yerleşik `node:test`, `assert`, `vm` ve `crypto` modülleriyle çalışacak.
- **Gerekçe:** Mevcut tek HTML uygulamasını üretim bağımlılığı eklemeden gerçek JavaScript'i üzerinden sınamak mümkündür.
- **Sonuç:** `package.json` yalnızca komut ve Node sürümü sözleşmesini taşır; dış paket veya lock dosyası yoktur. Build aracı ve nihai kaynak dili kararı ertelenmeye devam eder.

## ADR-007 — Saf kaynak modülleri tek HTML içine build sırasında gömülecek

- **Durum:** Kabul edildi
- **Karar:** Prompt üretim çekirdeği ESM kaynak modüllerinde tutulacak; sıfır bağımlılıklı Node build adımı bu modülleri kök `index.html` içindeki işaretli bölgeye gömecek.
- **Gerekçe:** İş mantığını DOM'dan bağımsız test etmek ve son kullanıcının tek dosyalık çevrimdışı deneyimini aynı anda korumak gerekir.
- **Sonuç:** Kaynak modülleri doğruluk kaynağıdır. `index.html` içindeki prompt çekirdeği elle düzenlenmez; `npm run build` ile üretilir ve `npm run build:check` ile güncelliği doğrulanır.

## ADR-008 — v2 yerel profil ve doğrulama sözleşmesi

- **Durum:** Kabul edildi (2026-10-05)
- **Karar:** Sıfır bağımlılıklı doğrulama, profil ve saklama şeması v2 ile sürümlenir; profil mantığı DOM'dan bağımsızdır. JSON mevcut veriyi değiştirmek yerine yeni proje ekler. Her zorunlu alanda kopyalama, Bootstrap'ta ayrıca plan kapısı uygulanır.
- **Gerekçe:** Tek HTML ve çevrimdışı sözleşmesi korunurken eski verinin kaybolması, bozuk veriyle çökme ve eksik prompt kullanımı önlenmelidir. Bu küçük sabit şema için ek üretim bağımlılığı gerekmez.
- **Sonuç:** v1 anahtarı saklanır; bozuk kayıt açık kurtarma seçimine kadar ezilmez. Harici agent denetimi bir güvenlik garantisi değildir; kanıt isteme ve kullanıcı incelemesiyle sınır açıkça belirtilir. UI profil kontrolleri src/ui altında geliştirilir ve mevcut build bölgesine gömülür.
