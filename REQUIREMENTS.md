# Gereksinimler — Bootstrap Flow

## İşlevsel gereksinimler

### Proje bağlamı

- **F-01:** Kullanıcı proje adı, hedef klasör, açıklama, proje tipi, teknoloji ve MVP hedefini girebilmelidir.
- **F-02:** Zorunlu alanlar eksikken araç eksikleri alan bazında göstermeli ve eksik promptun yanlışlıkla kullanılmasını engellemelidir.
- **F-03:** Kullanıcı arayüz dili, prompt dili ve agent cevap dilini birbirinden bağımsız seçebilmelidir.
- **F-04:** Proje profili yerel olarak saklanmalı, temizlenebilmeli ve taşınabilir bir veri dosyası olarak dışa/içe aktarılabilmelidir.

### Prompt üretimi

- **F-05:** Araç planlama, bootstrap, doğrulama ve devam olmak üzere dört ayrı prompt üretmelidir.
- **F-06:** Aynı profil, şablon sürümü ve seçenekler her zaman aynı prompt çıktısını üretmelidir.
- **F-07:** Her prompt kendi şablon sürümünü ve seçili proje ölçeğini taşımalıdır.
- **F-08:** Planlama aşamasında onaylanan veya kullanıcı tarafından düzeltilen plan, bootstrap promptuna açık bir bağlam olarak eklenebilmelidir.
- **F-09:** Form girdileri, agent talimatlarından belirgin sınırlarla ayrılmalı; proje açıklamasındaki metin sistem talimatı gibi yorumlanmamalıdır.
- **F-10:** Quick, Standard ve Full ölçekleri hangi dosya ve klasörlerin üretileceğini açıkça göstermelidir.

### Güvenlik ve doğrulama

- **F-11:** Bootstrap promptu hedef yolu doğrulamayı, mevcut yapıyı incelemeyi ve dolu dosyaların üzerine yazmamayı zorunlu kılmalıdır.
- **F-12:** Doğrulama promptu dosya varlığının yanında içerik kalitesi, komutların çalışabilirliği, belge tutarlılığı, kapsam ve gizli bilgi riskini değerlendirmelidir.
- **F-13:** Agent'ın çalıştıramadığı her kontrol, gerekçesiyle `çalıştırılamadı` olarak raporlanmalıdır; doğrulanmamış bir kontrol PASS sayılmamalıdır.
- **F-14:** Kopyalama veya yerel kayıt başarısız olduğunda kullanıcıya görünür ve eyleme dönük hata verilmelidir.

### Proje türü uyarlaması

- **F-15:** Ortak prompt çekirdeği agent'a özel küçük adaptörlerden ayrılmalıdır.
- **F-16:** Proje tipine özel ek belgeler yalnızca gerekçesi gösterilerek önerilmelidir.
- **F-17:** Kullanıcı çekirdek setten sapmaları görebilmeli ve bu sapmalar doğrulama aşamasına taşınmalıdır.

## İşlevsel olmayan gereksinimler

- **N-01 — Çevrimdışı çalışma:** Üretim dağıtımı ağ isteği yapmadan çalışmalıdır.
- **N-02 — Gizlilik:** Form verisi cihazdan çıkmamalı; telemetri varsayılan olarak bulunmamalıdır.
- **N-03 — Dağıtım:** Son kullanıcı ürünü tek bir `index.html` dosyası olarak açabilmelidir.
- **N-04 — Erişilebilirlik:** Arayüz WCAG 2.2 AA hedeflemeli; tüm kontroller klavye ve ekran okuyucuyla kullanılabilmelidir.
- **N-05 — Uyumluluk:** Güncel Chrome, Edge, Firefox ve Safari sürümlerinde temel akış çalışmalıdır.
- **N-06 — Performans:** Prompt üretimi tipik bir profilde kullanıcı girdisinden sonra 100 ms içinde tamamlanmalıdır.
- **N-07 — Bakım:** Prompt üretim mantığı DOM'dan bağımsız saf bir çekirdek olarak test edilebilmelidir.
- **N-08 — Geriye uyumluluk:** Saklanan profil şeması sürümlenmeli ve desteklenen eski kayıtlar kayıpsız taşınmalıdır.
- **N-09 — Bağımlılık disiplini:** Yeni üretim bağımlılığı ancak açık bir bakım veya güvenlik faydası sağlıyorsa eklenmelidir.

## v1 kabul ölçütleri

- Tanımlı test matrisindeki tüm zorunlu senaryolar geçer.
- Zorunlu alanı eksik profil, kullanılabilir bootstrap promptu üretemez.
- Onaylanmış plan yeni bir agent oturumuna taşınabilir.
- Üretim paketi tek HTML'dir ve ağ isteği yapmaz.
- Klavye ile form doldurma, dil/tema değiştirme ve dört promptu kopyalama tamamlanabilir.
- Mevcut dolu proje senaryosunda prompt, dosya üzerine yazmayı yasaklar ve çakışma raporu ister.

