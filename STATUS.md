# STATUS — Bootstrap Flow

> Bu dosya projenin **güncel gidişatını** tek bakışta gösterir. Her oturuma başlarken önce bunu oku; iş bitince güncelle. Geçmiş için [CHANGELOG bölümü](#changelog), kararlar için aracın ürettiği DECISIONS mantığı geçerli.

- **Güncel sürüm:** v0.7.0-alpha.1
- **Son güncelleme:** 2026-07-27
- **Durum:** v0.7.0-alpha.1 yayına alındı. Çekirdek modüllere ayrıldı. 28 test geçiyor ve iki Phase 2 bağlam açığı kapatıldı.
- **Aktif odak:** Profil/şablon şemalarını sürümlemek ve zorunlu alanlar için gerçek kullanım kapısı eklemek.

## Şu an ne durumdayız

Tek dosyalık local HTML prompt üreticisi (`index.html`). Form doldurulur; Claude Code / Codex / Cursor gibi agent'lara verilecek **4 aşamalı** bootstrap promptu üretir (Anlama → Bootstrap → Doğrulama → Devam/Güncelle), hem EN hem TR. Araç hiçbir dosya oluşturmaz; onu promptları alan agent yapar.

## Sıradaki adımlar

1. **Şema sürümü:** profil ve prompt şablonlarına açık sürüm kimliği ekle; eski localStorage kayıtlarının taşınmasını test et.
2. **Doğrulama kapısı:** zorunlu alanlar eksikken ilgili promptların kopyalanmasını engelle.
3. **Saha testi:** aracı en az üç gerçek projede kullan; özellikle dolu klasöre bootstrap senaryosunu doğrula.
4. Ayrıntılı iş sırası için `TASKS.md`, kalite kapısı için `EVALUATION.md` dosyasını izle.

## Yakın geçmiş (changelog özeti)

- **v0.6** — Proje ölçeği seçici (Hızlı 7 / Standart 12 / Tam 14 dosya; her kademe alttakini kapsar). Tutarlılık ve doğrulama kuralları ölçek-güvenli.
- **v0.5** — AGENTS.md kalite paketi: opsiyonel komut alanı → AGENTS.md'ye build/test/run komutları; AGENTS.md açık standardına hizalandı ve "ince tut, referans ver" kuralı; Bootstrap'a `git init` 0. adımı. STATUS.md eklendi.
- **v0.4** — 4. prompt "Devam / Güncelle" (sonraki oturumlarda proje durumunu mutabık kılar).
- **v0.3** — Zorunlu alan kırmızı/yeşil çerçeveleri + "i" bilgi balonları.
- **v0.2** — Dogfooding düzeltmeleri (cevap diline duyarlı yapı, tutarlılık şartı, denetim istisnaları).
- **v0.1** — İlk MVP.

## Bilinçli kapsam dışı

LLM API entegrasyonu, HTML'in dosya yazması, framework/backend, ağır spec-kit tarzı çok-dosyalı döngü. Aracın gücü: deterministik, çevrimdışı, tek dosya, agent-bağımsız.
