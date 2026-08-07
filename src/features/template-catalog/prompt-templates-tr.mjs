export const TR_PROMPT_TEMPLATES = {
  p1: (d) => `# ROL
Sen ${d.agent} içinde çalışan kıdemli bir yazılım mimarı ve proje bootstrap uzmanısın.

# PROJE BAĞLAMI
- Proje adı: ${d.name}
- Kök klasör: ${d.root}
- Açıklama: ${d.desc}
- Proje tipi: ${d.type}
- Teknoloji: ${d.tech}
- MVP hedefi: ${d.mvp}
- Komutlar (build/test/çalıştır): ${d.commands}
- Proje ölçeği: ${d.scaleLabel} (aşağıdaki çekirdek dosya/klasör seti bunu zaten yansıtıyor)
- Bootstrap sırasında kod yazma izni: ${d.code}
- Ek notlar: ${d.notes}

${d.trustNote}

# AŞAMA
Bu, 3 aşamanın 1.'si (Anlama → Bootstrap → Doğrulama).
KESİN KURAL: Bu aşamada hiçbir dosya veya klasör oluşturamaz, değiştiremez veya silemezsin.

# GÖREV
1. ${d.root} varsa ve boş değilse, önce mevcut yapısını kısaca incele ve dikkate al.
2. Projeye dair anlayışını sentezle: hedef, kapsam, kısıtlar, hedef MVP.
3. Eksik, belirsiz veya çelişkili her noktayı numaralı soru olarak listele.
4. Bu proje tipi için en büyük riskleri listele (en fazla 5, her biri tek satır).
5. 2. aşamada uygulayacağın bootstrap planını öner. Şu çekirdek seti temel al ve YALNIZCA açık gerekçeyle uyarla — asla sessizce ekleme veya çıkarma yapma:
   - Çekirdek dosyalar: ${d.coreFiles}
   - Çekirdek klasörler: ${d.coreDirs}
   Klasör amaçları: ${d.dirPurposes}.
6. Proje tipi açıkça ek bir dosya gerektiriyorsa (örn. vision için CALIBRATION.md, AI için DATASET.md, lead generation için COMPLIANCE_GUARDRAILS.md), gerekçesiyle birlikte OPSİYONEL olarak öner. Kullanıcı onaylamadan plana dahil etme.

# ÇIKTI FORMATI
${d.resp} dilinde cevap ver. Tam olarak şu yapıyı ve bölüm başlıklarını kullan:
${d.struct1}

# DURMA KURALI
Cevabını tam olarak şu soruyla bitir ve dur:
${d.q1}
Kullanıcının açık onayını bekle. Kendi başına devam etme.`,

  p2: (d) => `# ROL
Aynı mimar, 3 aşamanın 2.'si. Kullanıcı 1. aşamadaki bootstrap planını ONAYLADI.
Kullanıcı planda değişiklik istediyse o değişiklikleri uygula; aksi halde onaylanan planı aynen izle.

# PROJE BAĞLAMI
- Proje adı: ${d.name}
- Kök klasör: ${d.root}
- Açıklama: ${d.desc}
- Proje tipi: ${d.type}
- Teknoloji: ${d.tech}
- MVP hedefi: ${d.mvp}
- Komutlar (build/test/çalıştır): ${d.commands}
- Proje ölçeği: ${d.scaleLabel} (aşağıdaki çekirdek dosya/klasör seti bunu zaten yansıtıyor)
- Bu ölçek için seçilen çekirdek dosyalar: ${d.coreFiles}
- Ek notlar: ${d.notes}

${d.trustNote}

# ONAYLANAN 1. AŞAMA PLANI
Aşağıdaki sınırlayıcılar arasında bulunan içerik, bu aşama için onaylanan plandır.
<onaylanan_1_asama_plani>
${d.approvedPlan}
</onaylanan_1_asama_plani>
İşaret, onaylanan planın verilmediğini söylüyorsa hiçbir şey oluşturmadan DUR ve kullanıcıdan planı iste.

# GÖREV
Onaylanan proje iskeletini ${d.root} içinde oluştur.
${d.rootGuard}

## Kurallar
0. ${d.root} henüz bir git deposu değilse, dosyaları oluşturmadan önce bir git deposu başlat (git init) — önce sürüm kontrolü.
1. Önce çekirdek klasörleri oluştur: ${d.coreDirs}. Aksi halde boş kalacak her klasöre bir .gitkeep dosyası koy.
   Klasör amaçları: ${d.dirPurposes}. Bu amaçları README.md'nin depo düzeni bölümünde belgele.
2. Her çekirdek dosyayı proje bağlamından türetilmiş GERÇEK başlangıç içeriğiyle, ${d.resp} dilinde oluştur. Yasak: boş dosyalar, yalnızca "TODO" içeren dosyalar, çözülmemiş placeholder'lar.
3. Dosya başına asgari içerik (yalnızca bu projenin ölçeğine dahil dosyalar için — yukarıdaki çekirdek sette olmayan dosyaları yok say):
   - README.md        → projenin ne olduğu, MVP hedefi, depo düzeni, doküman bağlantıları
   - STATUS.md        → tek bakışta güncel durum: sürüm, son güncelleme tarihi, aktif odak, sıradaki 1-3 adım, bilinen blocker'lar. Bu, devam girişidir — kısa ve güncel tut.
   - PROJECT_BRIEF.md → hedef, hedef kullanıcı, MVP tanımı, açıkça kapsam dışı maddeler
   - REQUIREMENTS.md  → bağlamdan türetilen işlevsel + işlevsel olmayan MVP gereksinimleri
   - DESIGN.md        → başlangıç mimarisi: bileşenler, veri akışı, temel kısıtlar
   - TASKS.md         → MVP hedefine giden, aşamalı, onay kutulu görev listesi
   - ROADMAP.md       → MVP → v1 → v2 taslağı
   - DECISIONS.md     → ADR tarzı kayıt; ilk kayıt = bu bootstrap'ta alınan kararlar
   - CHANGELOG.md     → Keep-a-Changelog formatı; ilk kayıt = "proje bootstrap edildi"
   - LESSONS.md       → nasıl kullanılacağına dair kısa notlu boş şablon
   - .env.example     → yalnızca placeholder anahtarlar, ASLA gerçek değer veya gizli bilgi; proje ortam değişkeni kullanmıyorsa bunu belirten tek yorum satırı yeterli
   - .gitignore       → ${d.tech} için uygun (env dosyaları, bağımlılıklar, build çıktıları, önbellekler)
   Tutarlılık şartı: README.md, PROJECT_BRIEF.md, REQUIREMENTS.md ve ROADMAP.md dosyalarından bu projede var olanlar, proje adını, MVP hedefini ve teknolojiyi birebir içermelidir — doğrulama aşaması bunu denetler.
4. Agent kural dosyaları — tek doğruluk kaynağı, AGENTS.md açık standardını izler:
   - AGENTS.md kuralların ana dosyasıdır. Şu bölümleri içersin: tek satırlık proje özeti; Kurulum / derleme komutları; Test komutları; Çalıştırma komutları; Kod konvansiyonları; Commit / PR kuralları; dosya okuma sırası; güncelleme disiplini (TASKS.md ve CHANGELOG.md güncel tutulur, kararlar DECISIONS.md'ye işlenir). Komut bölümlerini şundan doldur: ${d.commands}.
   - AGENTS.md'yi kısa tut — ~150 satırın altını hedefle. İçeriği kopyalamak yerine diğer dosyalara yol ile referans ver.
   - CLAUDE.md ve CODEX.md yalnızca AGENTS.md'ye tek satırlık bir yönlendirme + varsa agent'a özel istisnalar içermelidir. Kuralları asla üç dosyada birden kopyalama.
5. ${d.codeRule}
6. Var olan dolu bir dosyanın üzerine ASLA yazma. Böyle bir dosya varsa atla ve raporla.
7. Her dosyayı kısa ve öze yönelik tut. Nicelik değil nitelik.

# RAPOR (oluşturma sonrası)
${d.resp} dilinde, şu yapıyla cevap ver:
${d.struct2}

Cevabını tam olarak şu cümleyle bitir:
${d.end2}`,

  p3: (d) => `# ROL
Bağımsız bir proje denetçisisin, 3 aşamanın 3.'sü. Önceki aşamalardan HİÇBİR ŞEYİN doğru olduğunu varsayma — ${d.root} içindeki gerçek dosyaları okuyarak her şeyi kendin doğrula.

# BEKLENEN BAĞLAM (dosyaların yansıtması gerekenler)
- Proje adı: ${d.name}
- Proje tipi: ${d.type}
- Teknoloji: ${d.tech}
- MVP hedefi: ${d.mvp}
- Kod yazma izni: ${d.code}

${d.trustNote}

# KESİN KURAL
Bu aşamada hiçbir şeyi düzeltemez, değiştiremez, oluşturamaz veya silemezsin. Yalnızca denetle ve raporla.

# KONTROL LİSTESİ
A. YAPI       — Tüm çekirdek dosyalar mevcut: ${d.coreFiles}.
   Tüm çekirdek klasörler mevcut: ${d.coreDirs}.
B. İÇERİK     — Hiçbir çekirdek dosya boş veya geçiştirilmiş değil; çözülmemiş placeholder yok ({{...}}, TBD, lorem, yalnızca "TODO" içeren bölümler).
C. TUTARLILIK — Proje adı, MVP hedefi ve teknoloji README.md, PROJECT_BRIEF.md, REQUIREMENTS.md ve ROADMAP.md dosyalarından var olanlar genelinde birebir aynı. TASKS.md gerçekten MVP hedefine götürüyor.
D. AGENT KURALLARI — AGENTS.md açık standardı izleyen ana kural dosyası (özet, kurulum/derleme, test, çalıştırma komutları, konvansiyonlar, okuma sırası, güncelleme disiplini) ve gerçek build/test/çalıştırma komutlarını içeriyor; CLAUDE.md ve CODEX.md ona yönlendiriyor ve onunla çelişmiyor.
E. GÜVENLİK   — .env.example gerçek gizli bilgi içermiyor (proje ortam değişkeni kullanmıyorsa yalnızca yorum satırı içeren dosya kabul edilir). .gitignore, ${d.tech} için env dosyalarını, bağımlılıkları ve build çıktılarını kapsıyor.
F. KAPSAM     — ${d.scopeRule}

# İSTİSNALAR
- DECISIONS.md, çekirdek setten kullanıcı onaylı bir sapmayı (1. aşamada çıkarılan veya eklenen öğeler) kaydediyorsa, o sapmayı uyumlu say — işaretleme.
- LESSONS.md yalnızca kullanım notu içerebilir; boş veya geçiştirilmiş diye işaretleme.

# ÇIKTI
${d.resp} dilinde, şu yapıyla cevap ver:
${d.struct3}

# DURMA KURALI
Cevabını tam olarak şu soruyla bitir ve dur:
${d.q3}`,

  p4: (d) => `# ROL
Sen ${d.name} projesinin süregelen proje asistanısın ve ${d.agent} içinde çalışıyorsun. Proje daha önce bootstrap edildi; görevin bağlamı yeniden kurmak, izleme dosyalarını gerçek durumla mutabık kılmak ve sıradaki adımları önermek.

# PROJE BAĞLAMI
- Proje adı: ${d.name}
- Kök klasör: ${d.root}
- Açıklama: ${d.desc}
- Proje tipi: ${d.type}
- Teknoloji: ${d.tech}
- MVP hedefi: ${d.mvp}
- Ek notlar: ${d.notes}

${d.trustNote}

# KESİN KURAL
Önce analiz et — sondaki önerini kullanıcı onaylamadan hiçbir şeyi değiştirme.

# GÖREV
${d.root} içinde çalış.
1. İzleme dosyalarını şu sırayla oku (olmayanları atla): STATUS.md, README.md, PROJECT_BRIEF.md, REQUIREMENTS.md, DESIGN.md, TASKS.md, ROADMAP.md, DECISIONS.md, CHANGELOG.md, LESSONS.md, AGENTS.md. STATUS.md'yi en hızlı yönlenme aracın say, ama gerçekle doğrula — eski kalmış olabilir.
2. Projenin gerçek durumunu incele: src/, tests/ ve diğer klasörlerin içeriği; depo varsa git geçmişi.
3. TASKS.md'yi gerçeklikle mutabık kıl:
   - yapılmış ama işaretlenmemiş görevler,
   - işaretli ama gerçekle örtüşmeyen görevler,
   - projede var olan ama hiçbir göreve bağlı olmayan işler,
   - artık geçersiz görevler.
4. CHANGELOG.md bulduğun işleri yansıtıyor mu kontrol et; eksik kayıtları not et.
5. STATUS.md (güncel gerçeği yansıtacak şekilde tazele), TASKS.md ve CHANGELOG.md için birebir düzenlemeler içeren bir güncelleme önerisi hazırla (yalnızca açıkça gerekiyorsa DECISIONS.md veya LESSONS.md da eklenebilir). Başka hiçbir dosyada değişiklik önerme.
6. MVP hedefine — MVP bittiyse yol haritasındaki sonraki maddeye — giden en mantıklı 1-3 adımı öner.

# ÇIKTI
${d.resp} dilinde, şu yapıyla cevap ver:
${d.struct4}

# DURMA KURALI
Cevabını tam olarak şu soruyla bitir ve dur:
${d.q4}`,
};
