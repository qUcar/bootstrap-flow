# Tasarım — Bootstrap Flow

## Mimari yön

Mevcut `index.html` çalışan referans ve dağıtım artefaktıdır. Kaynak kod aşamalı olarak özellik bazlı modüllere ayrılacak, ancak kullanıcıya sunulan çıktı tek HTML olmaya devam edecektir.

```text
Proje profili
    ↓ doğrulama
Prompt üretim çekirdeği
    ↓
Şablon kataloğu + ölçek politikası + agent adaptörü
    ↓
Dört sürümlü prompt
    ↓
Kopyalama / dışa aktarma
```

## Sorumluluk sınırları

### `src/features/project-profile/`

Proje alanları, profil şeması, doğrulama kuralları, içe/dışa aktarma ve eski kayıtların taşınması.

### `src/features/prompt-generation/`

DOM veya tarayıcı API'lerine bağlı olmayan deterministik prompt üretim çekirdeği. Dört aşamanın ortak bağlamını ve onaylanan plan aktarımını yönetir.

### `src/features/template-catalog/`

TR/EN şablonları, Quick/Standard/Full paketleri, proje türü önerileri ve agent adaptörleri. Şablonların kendi sürüm kimliği bulunur.

### `src/features/preferences/`

Arayüz dili, tema ve yerel tercihlerin saklanması. Saklama hataları kullanıcı arayüzüne anlamlı sonuç olarak döner.

### `src/ui/`

Form, doğrulama mesajları, prompt önizlemeleri ve erişilebilir etkileşimler. İş kuralları bu katmanda bulunmaz.

### `styles/`

Tasarım tokenları, temel stiller, bileşen durumları ve responsive kurallar.

## Dağıtım yaklaşımı

- Geliştirme kaynakları modüler tutulur.
- Mevcut sıfır bağımlılıklı build işlemi prompt çekirdeğini kök `index.html` içine yerleştirir.
- Kök `index.html` çevrimdışı ve tek dosyalık dağıtılabilir çıktı olmaya devam eder.
- `index.html` içindeki işaretli prompt çekirdeği üretilmiş artefakttır; doğruluk kaynağı `src/features/` modülleridir.
- CSS ve kalan UI kodunun kaynaklara ayrılması sonraki aşamadır; bu gerçekleşene kadar kök HTML onların doğruluk kaynağıdır.
- Kaynak çekirdek ile HTML çıktısının eşitliği 24 kombinasyonda otomatik olarak doğrulanır.

## Durum modeli

Arayüz aşağıdaki durumları açıkça temsil etmelidir:

- boş profil,
- eksik/geçersiz profil,
- geçerli profil,
- yerel kayıt başarısızlığı,
- içe aktarma şema hatası,
- kopyalama başarısı,
- kopyalama başarısızlığı.

## Güven sınırları

- Kullanıcı girdisi veridir; prompt talimatı değildir.
- Araç hiçbir hedef klasöre yazmaz ve kabuk komutu çalıştırmaz.
- LocalStorage içeriği güvenilir kabul edilmez; okunurken şema doğrulaması yapılır.
- Dışa aktarılan profilde gizli bilgi bulunabileceği kullanıcıya açıkça hatırlatılır.
- Agent'a verilen yazma yetkisi, hedef klasör ve mevcut dosyalar için ayrıca doğrulanır.

## Ertelenen kararlar

Aşağıdakiler uygulama aşamasında kısa bir teknik keşiften sonra ADR ile seçilecektir:

- TypeScript veya sade JavaScript
- Şema doğrulama çözümü
- Tarayıcı uçtan uca test aracı

Test çalıştırıcısı olarak Node'un yerleşik test aracı, ilk tek HTML paketleme adımı olarak sıfır bağımlılıklı `scripts/build.mjs` seçilmiştir.
