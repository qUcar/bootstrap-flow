# Prompt Kalitesi ve Değerlendirme Stratejisi

Bootstrap Flow'un ana ürünü prompt metinleridir. Bu nedenle sürüm kalitesi yalnızca arayüzün çalışmasıyla değil, promptların güvenilir sonuç üretmesiyle ölçülür.

## Zorunlu senaryo seti

1. Sıfırdan başlayan küçük bir Python CLI projesi
2. Mevcut ve dolu bir TypeScript web uygulaması
3. Veri seti ve değerlendirme gerektiren bir AI projesi
4. Kişisel veri riski taşıyan lead-generation otomasyonu
5. Teknolojisi ve MVP'si eksik, belirsiz bir proje fikri
6. Türkçe prompt + İngilizce cevap kombinasyonu
7. Quick, Standard ve Full ölçeklerinin her biri
8. Kod yazma izninin açık ve kapalı olduğu senaryolar

## Otomatik kontroller

- Aynı girdinin aynı çıktıyı üretmesi
- Her promptta şablon sürümü ve temel proje bağlamının bulunması
- Seçilen ölçeğe ait dosyaların eksiksiz, diğerlerinin hariç olması
- TR/EN bölüm başlıklarının karışmaması
- Onaylanan plan ve sapmaların Phase 2 ile Phase 3'e taşınması
- Boş değerlerin sessizce kullanılabilir prompta dönüşmemesi
- Güvenlik kurallarının her ilgili şablonda bulunması
- Şablonlarda çözülmemiş değişken veya placeholder kalmaması

## İnsan değerlendirme rubriği

Her örnek çıktı 0–2 arasında puanlanır:

| Boyut | 0 | 1 | 2 |
|---|---|---|---|
| Doğruluk | Proje bağlamıyla çelişiyor | Bazı varsayımlar belirsiz | Bağlamla uyumlu |
| Tamlık | Kritik adımlar eksik | Küçük eksikler var | Gerekli akış tamam |
| Uygulanabilirlik | Agent ne yapacağını bilemez | Ek yorum gerekiyor | Doğrudan uygulanabilir |
| Güvenlik | Riskli değişiklik isteyebilir | Koruma kısmi | Açık sınırlar ve kanıt ister |
| Tutarlılık | Aşamalar çelişiyor | Bağlam kısmen kayboluyor | Bağlam aşamalar boyunca korunuyor |
| Ekonomi | Gereksiz ve aşırı uzun | Kısmen tekrarlı | Kısa, yeterli ve odaklı |

Bir sürüm adayı için hiçbir boyut 0 olamaz; toplam ortalama en az 1,7 olmalıdır.

## Saha testi kaydı

Her gerçek kullanımda aşağıdakiler kaydedilir:

- anonim senaryo adı,
- kullanılan şablon sürümü,
- proje ölçeği ve agent,
- agent'ın sorduğu eksik sorular,
- kullanıcı tarafından düzeltilen varsayımlar,
- doğrulama sonucundaki FAIL/WARN maddeleri,
- gereksiz üretilen veya eksik kalan belgeler,
- şablona dönüştürülebilecek öğrenim.

Gerçek proje içeriği, sırlar veya kullanıcı verisi bu depoya kopyalanmaz.

