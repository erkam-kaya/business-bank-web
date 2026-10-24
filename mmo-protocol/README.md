# 🏛️ BUSINESS BANK ONLINE // AI KODLAMA PROTOKOLÜ
## 6 Temel Talimat & Planlama Belgesi Rehberi

Bu dizin, **Business Bank Online (MMO Holding & Finans Simülasyonu)** projesinin offline (MMKV) mimariden tam teşekküllü çok oyunculu (PostgreSQL, Redis, NestJS, WebSocket) bir MMO ekosistemine dönüştürülmesi için hazırlanan **6 standart talimat belgesini** içerir.

Yapay zeka ajanlarının (Claude Code, Cursor, Devin, v0, Antigravity) tahmin yürütmesini engellemek, %70 token tasarrufu sağlamak ve devasa projeyi risksiz fazlandırmak üzere tasarlanmıştır.

---

### 📂 Belge Listesi & Dosya Bağlantıları

| No | Belge Adı | Açıklama & İşlev | Dosya Bağlantısı |
|---|---|---|---|
| **01** | **Product Requirements Document (PRD)** | Uygulamanın ne yaptığını, hangi problemi çözdüğünü, kullanıcı hikayelerini ve kabul kriterlerini netleştirir. | [01-PRD.md](file:///d:/finance/mmo-protocol/01-PRD.md) |
| **02** | **Technical Requirements Document (TRD)** | Teknoloji stack'i, NestJS/PostgreSQL/Redis mimarisini, güvenlik protokollerini ve veri akışını kilitler. | [02-TRD.md](file:///d:/finance/mmo-protocol/02-TRD.md) |
| **03** | **App Flow (User Journey & Navigation)** | Ekran envanteri, sıfırdan Forbes zirvesine giden yolculuk, durum matrisi ve boş/kilitli ekran davranışları. | [03-APP-FLOW.md](file:///d:/finance/mmo-protocol/03-APP-FLOW.md) |
| **04** | **UI and UX Design Brief** | Tasarım dili, hex renk paleti, Manrope/Inter/JetBrains Mono tipografisi ve bileşen kuralları. | [04-DESIGN-BRIEF.md](file:///d:/finance/mmo-protocol/04-DESIGN-BRIEF.md) |
| **05** | **Backend Schema** | PostgreSQL 17 tabloları, Prisma veri modelleri, pessimistic locking (`FOR UPDATE`), RLS ve doğrulama kısıtları. | [05-BACKEND-SCHEMA.md](file:///d:/finance/mmo-protocol/05-BACKEND-SCHEMA.md) |
| **06** | **Implementation Plan** | 6 kilometre taşından (M1 - M6) oluşan adım adım inşa sıralaması, Definition of Done (DoD) ve kontrol noktaları. | [06-IMPLEMENTATION-PLAN.md](file:///d:/finance/mmo-protocol/06-IMPLEMENTATION-PLAN.md) |

---

### 📑 Temel Kaynak Mimari Raporları & Resmi PDF Belgeleri (`/raporlar`)

Bu 6 protokol belgesinin dayandığı 4 temel teknik mimari raporu ve resmi imzalı PDF versiyonları `raporlar/` dizininde saklanmaktadır:

1. **Rapor 1: Yazılım Mimari & Teknoloji Seçimi Raporu**
   * Markdown: [01-yazilim-mimari-raporu.md](file:///d:/finance/mmo-protocol/raporlar/01-yazilim-mimari-raporu.md)
   * Resmi PDF: [01_Yazilim_Mimari_Raporu.pdf](file:///d:/finance/mmo-protocol/raporlar/01_Yazilim_Mimari_Raporu.pdf)
2. **Rapor 2: Teknik Altyapı, Dağıtım & Güvenlik Raporu**
   * Markdown: [02-teknik-altyapi-raporu.md](file:///d:/finance/mmo-protocol/raporlar/02-teknik-altyapi-raporu.md)
   * Resmi PDF: [02_Teknik_Altyapi_Raporu.pdf](file:///d:/finance/mmo-protocol/raporlar/02_Teknik_Altyapi_Raporu.pdf)
3. **Rapor 3: Platform Gereksinimleri & Veri Şeması Raporu**
   * Markdown: [03-platform-gereksinimleri-raporu.md](file:///d:/finance/mmo-protocol/raporlar/03-platform-gereksinimleri-raporu.md)
   * Resmi PDF: [03_Platform_Gereksinimleri_Raporu.pdf](file:///d:/finance/mmo-protocol/raporlar/03_Platform_Gereksinimleri_Raporu.pdf)
4. **Rapor 4: Uyum, Migrasyon & Uygulama Yol Haritası**
   * Markdown: [04-uyum-migrasyon-raporu.md](file:///d:/finance/mmo-protocol/raporlar/04-uyum-migrasyon-raporu.md)
   * Resmi PDF: [04_Uyum_ve_Migrasyon_Raporu.pdf](file:///d:/finance/mmo-protocol/raporlar/04_Uyum_ve_Migrasyon_Raporu.pdf)

---

### 🚦 Yapay Zeka Ajanları İle Çalışma Protokolü

1. **Toplu İnceleme (Context Alignment):**
   Geliştirmeye başlamadan önce yapay zeka ajanına bu 6 dosya verilir ve şu komut iletilir:
   > *"Bu 6 standart belgeyi incele. İş kuralları, veritabanı şeması ve inşa adımları arasındaki olası çelişkileri tespit et ve başlamadan önce tüm sorularını listele."*

2. **Faz Faz Yürütme (Milestone Locking):**
   `06-IMPLEMENTATION-PLAN.md` dosyasındaki her Milestone tek tek yürütülür. Ajan bir fazı tamamlayıp `Definition of Done` kriterlerini doğrulamadan bir sonraki faza geçirilmez.

3. **Bağlam (Context) Tasarrufu:**
   Yeni bir faza başlarken tüm chat geçmişi yerine yalnızca ilgili Milestone maddesi ve `05-BACKEND-SCHEMA.md` verilerek context aşımı (%70 tasarruf) önlenir.
