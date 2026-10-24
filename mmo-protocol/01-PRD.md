# 📄 01 // ÜRÜN GEREKSİNİMLERİ BELGESİ (PRD)
## Business Bank Online — MMO Finans & Holding Simülasyonu

---

### 1. Purpose (Belgenin Amacı)
Bu belge; Business Bank oyununun tek oyunculu (offline MMKV) yapısından, çok oyunculu gerçek zamanlı (MMO) küresel bir ekonomi ve holding simülasyonuna geçişinin ürün gereksinimlerini, kapsamını, kullanıcı hikayelerini ve kabul kriterlerini eksiksiz tanımlar. AI kodlama ajanlarının ve geliştirme ekiplerinin ürünün temel ruhunu ve sınırlarını tahmin yürütmeden anlamasını sağlar.

---

### 2. Product Name and One-Sentence Idea
* **Ürün Adı:** Business Bank Online (Sovereign Holding MMO)
* **Tek Cümlelik Fikir:** Oyuncuların sıfır sermaye ve tok dokunsal tıklarla başlayıp; kripto, Forex, emtia, banka kredisi, mevduat, otonom taksi filoları ve gayrimenkul holdingleri kurarak canlı piyasalarda yarıştığı, şirketlerini halka arz ettiği (IPO) ve Forbes 1. sırasındaki dünya patronluğu tahtını korumaya çalıştığı gerçek zamanlı çok oyunculu finans simülasyonudur.

---

### 3. Target Users (Hedef Kullanıcı Profili)
* **Demografi:** 16–45 yaş arası; ekonomi, finans, borsa, yatırım, holding yönetimi ve strateji simülasyonlarına ilgi duyan mobil (Android & iOS) ve web oyuncuları.
* **Kullanıcı İhtiyaçları:**
  * Tekdüze, içi boş idle/clicker oyunları yerine gerçekçi matematiksel modeller, risk-getiri dengesi ve piyasa derinliği arayan oyuncular.
  * Kazandığı serveti sadece sanal botlara karşı değil, gerçek oyuncuların bulunduğu küresel bir liderlik tablosunda (Forbes 200) kanıtlamak isteyen rekabetçi oyuncular.
  * Mobil ile web arasında kesintisiz çapraz platform (Cross-Platform) senkronizasyonu isteyen modern kullanıcılar.

---

### 4. Problem and Current Workaround (Mevcut Durum & Acı Noktaları)
* **Temel Problem:** Mevcut Business Bank v1 tek oyunculudur; tüm state cihazdaki yerel MMKV veritabanında saklanır. Bu durum:
  1. Oyuncuların piyasa arz-talep dengesine birlikte etki etmesini engeller.
  2. Hileye açıktır (cihaz saati ileri alma, bellek manipülasyonu).
  3. Cihaz değiştirildiğinde veri kaybına yol açar.
  4. Şirket halka arzı (IPO) ve oyuncular arası ortaklık kurulamaz.
* **Mevcut Geçici Çözüm (Workaround):** Oyuncular sabit bir offline Forbes JSON listesindeki yapay botlarla (Elon Mask, Jeff Bozos) yarışmakta, yerel MMKV ile kısıtlı kalmaktadır.

---

### 5. Goal and Success Measure (Hedefler & Başarı Metrikleri)
* **Stratejik Hedef:** 50.000+ anlık aktif kullanıcıyı (CCU) sıfır veri kaybı, %100 sunucu yetkili (server-authoritative) güvenlik ve deterministik 10 saniyelik ekonomi nabzıyla (Tick Engine) çalıştırmak.
* **Ölçülebilir Başarı Göstergeleri (KPIs):**
  * **D1 / D7 / D30 Retention:** Sırasıyla ≥ %40, ≥ %18, ≥ %8.
  * **Ortalama Günlük Seans Süresi:** ≥ 25 dakika (Günde ortalama 3–4 giriş).
  * **Tick Engine Kararlılığı:** 10 saniyelik küresel nabız işleme süresi < 1.500 ms (50.000 kullanıcıda).
  * **Hile & Manipülasyon:** %0 client-side bakiye yetkisi; hileli tıklama ve zaman manipülasyonlarının anında sunucuda engellenmesi.
  * **Platform Uptime:** %99.9 sunucu ve WebSocket kararlılığı.

---

### 6. Core Features (Önceliklendirilmiş Temel Özellikler)

| Öncelik | Modül / Özellik | Kullanıcı Faydası & İşlev |
|---|---|---|
| **P0 (Kritik)** | **Server-Authoritative Pulse Engine** | 10 saniyede bir çalışan küresel sunucu nabzı. Pasif gelirler, faizler, taksitler ve amortismanlar hilesiz hesaplanır. |
| **P0 (Kritik)** | **Dokunmatik Sermaye & Haptic Core** | Ekrana dokunarak sermaye üretimi. Seviye 1–20 geliştirme ($750/tık tavanı) ve hız limiti (rate-limiting). |
| **P0 (Kritik)** | **Çok Yönlü Finansal Piyasalar** | Canlı Kripto, Forex, Borsa Hisseleri ve Emtialar (Altın/Petrol). Geometric Brownian Motion fiyat dinamiği. |
| **P0 (Kritik)** | **Sovereign Bank & Kredi Sistemi** | Bakiye x 5 kredi limiti, 24 saatlik taksit planı, altın ve döviz vadeli mevduat faiz getirisi. |
| **P1 (Yüksek)** | **15 Modelli Taksi & Lojistik Filosu** | Egea'dan Rolls-Royce Ghost'a 15 araç. Km birikimi, aşınma ve zorunlu bakım/emeklilik mekaniği. |
| **P1 (Yüksek)** | **Gayrimenkul İmparatorluğu** | Stüdyo daire, rezidans, AVM ve gökdelen alımı. İç dekorasyon ve güvenlik yükseltmeleriyle kira çarpanları. |
| **P1 (Yüksek)** | **16 Saatlik Vergi Kilidi Disiplini** | 16 saati aşan ödenmemiş vergi borçlarında holdingin tüm pasif gelirlerinin otomatik dondurulması. |
| **P1 (Yüksek)** | **5 Kademeli Executive Prestij Kartı** | Silver Ledger'dan Black Protocol'e 5 kart kademesi. Kredi çarpanı, işlem limiti ve statü avantajları. |
| **P2 (Orta)** | **Şirket Halka Arzı (IPO)** | Büyütülen şirketlerin %49'unu borsada halka arz ederek diğer oyunculardan kurumsal fon toplama. |
| **P2 (Orta)** | **Forbes #1 Zirvesi & Taht Savunması** | Canlı küresel net varlık sıralaması. Zirveye oturan oyuncunun ekonomik kriz ve şoklara karşı koltuğunu koruması. |

---

### 7. Out of Scope for Version One (v1.0 Dışında Tutulanlar)
* Oyuncular arası serbest sohbet / özel mesajlaşma (KVKK, küfür/hakaret ve moderasyon yükünü önlemek için v1.5'e bırakıldı).
* Gerçek para ile oyuncular arası varlık transferi (RMT - Real Money Trading yasak).
* Guild / Şirket birleşmeleri (v2.0 yol haritasına dahil edildi).
* 3D serbest şehir içi sürüş modu (Oyun finans/strateji simülasyonudur, sürüş mekaniği kapsama dahil değildir).

---

### 8. User Stories (Kullanıcı Hikayeleri)
1. **US-01 (Girişimci Başlangıcı):** *Bir yeni oyuncu olarak,* ekrandaki prestij kartıma dokunduğumda tok haptic titreşim ve parlayan sayılarla anında nakit kazanmak istiyorum, *böylece* ilk yatırım sermayemi sıfırdan oluşturabilirim.
2. **US-02 (Çoklu Yatırım Tercihi):** *Bir yatırımcı olarak,* ilk sermayemi kazandıktan sonra sadece taksi almak zorunda kalmayıp Forex'te pozisyon açmak veya bankaya vadeli mevduat yatırmak istiyorum, *böylece* kendi finansal stratejimi özgürce seçebilirim.
3. **US-03 (Kaldıraçlı Büyüme):** *Bir filo patronu olarak,* büyük bir filo genişletme fırsatında nakdim yetmediğinde bankadan bakiye x 5 kurumsal kredi çekmek istiyorum, *böylece* büyümemi finanse edip borcumu saatlik karlarımla ödeyebilirim.
4. **US-04 (Finansal Risk & Ceza):** *Bir holding yöneticisi olarak,* 16 saat boyunca vergi borcumu ödemezsem gelirlerimin dondurulmasını ve ödediğimde anında açılmasını istiyorum, *böylece* oyunda gerçek bir mali disiplin hissedebileyim.
5. **US-05 (Forbes Zirve Hırsı):** *Bir rekabetçi oyuncu olarak,* portföyüm büyüdükçe gerçek zamanlı dünya sıralamasında yükselmek ve 1. sıraya oturup efsanevi Sovereign Black tacını takmak istiyorum.

---

### 9. Acceptance Criteria (Kabul Kriterleri)
* **AC-01 (Tıklama Tavanı & Hız Sınırı):**
  * *Given* Oyuncu tıklama geliştirme seviyesi 20 (maksimum) iken;
  * *When* Oyuncu ekrana dokunduğunda;
  * *Then* Tek dokunuş geliri tam olarak $750 olmalı; saniyede 15 dokunuştan fazlası bot/otomasyon sayılarak sunucuda geçersiz kılınmalıdır.
* **AC-02 (Vergi Kilitlenme Davranışı):**
  * *Given* Oyuncunun son vergi tahakkukundan bu yana 16 saat geçmiş ve vergi ödenmemiş iken;
  * *When* 10 saniyelik küresel tick çalıştığında;
  * *Then* Oyuncunun pasif nakit akışı sıfırlanmalı, hesap durumu `isFrozen: true` yapılmalı ve istemcide "Hesap Donduruldu" kırmızı paneli açılmalıdır.
* **AC-03 (Banka Kredi Limitasyonu):**
  * *Given* Oyuncunun cüzdan net bakiyesi $20.000 ve aktif ödenmemiş kredisi yok iken;
  * *When* Kredi başvurusu yaptığında;
  * *Then* Çekebileceği maksimum miktar $100.000 ($20.000 x 5) olarak sınırlandırılmalı ve 24 eşit saatlik taksite bölünmelidir.
* **AC-04 (Araç Amortisman & Emeklilik):**
  * *Given* Bir taksi modeli maksimum km ömrüne ulaştığında (ör. Fiat Egea 500.000 km);
  * *When* Bir sonraki saatlik tick tamamlandığında;
  * *Then* Araç otomatik olarak `isRetired: true` durumuna geçmeli, filodan düşmeli ve oyuncuya hurda bedeli ödenmelidir.

---

### 10. Open Questions (Karara Bağlanacak Açık Noktalar)
1. **Halka Arz Temettü Oranı:** Oyuncuların halka arz ettiği şirketlerde dış yatırımcılara zorunlu kâr payı (temettü) dağıtımı saatlik mi yoksa 24 saatte bir mi tahakkuk etmeli? *(Tavsiye: 24 saatte bir toplu temettü).*
2. **Çevrimdışı Gelir Tavanı (Offline Cap):** Oyuncu oyunda değilken 10 saniyelik tick motoru maksimum kaç saatlik pasif gelir biriktirmeli? *(Tavsiye: Standart 8 saat, VIP kart seviyesine göre maksimum 24 saat).*
