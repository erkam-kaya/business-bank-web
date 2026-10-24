# 🎨 04 // TASARIM DİLİ & UI/UX REHBERİ (DESIGN BRIEF)
## Business Bank Online — MMO Finans & Holding Simülasyonu

---

### 1. Purpose (Belgenin Amacı)
Uygulamanın görsel kimliğini, renk sistemini, tipografi kurallarını, bileşen standartlarını ve etkileşim animasyonlarını sabitlemek; yapay zeka ajanının keyfi renk paletleri, 2005 yılından kalma HTML butonları veya tutarsız font kombinasyonları üretmesini kesin olarak engellemek.

---

### 2. Audience and Tone (Hedef Kitle & Tasarım Ruhu)
* **Hedef Kitle:** Küresel finans dünyasının güç, prestij ve lüks dinamiklerini hissetmek isteyen oyuncular.
* **Üç Tasarım Sıfatı:**
  1. **Executive (Üst Düzey & Seçkin):** Black card ve özel bankacılık estetiği.
  2. **High-Tech Cyber-Finans (Siber-Finans):** Canlı neon veri akışları, mikro TradingView grafikleri ve tok metalik yüzeyler.
  3. **Tactile (Dokunsal & Tok):** Her dokunuşta tok haptic titreşim, fiziksel düğme hissi ve 3D kart eğim efektleri.

---

### 3. Reference Products (Referans Ürünler)
* **Revolut & Metal Black:** Kart tasarımları, statü seviyeleri, karanlık tema kontrast dengesi ve pürüzsüz geçişler.
* **Robinhood & TradingView:** Borsa grafikleri, yeşil/kırmızı kur dalgalanma göstergeleri ve anlık ticker akışları.
* **Apple Wallet:** Kart hiyerarşisi, kabartmalı metalik gölgelendirmeler ve tok dokunma mikro-animasyonları.
* **Kaçınılacak Unsurlar:** Çocuksu çizgi film temaları, neon karmaşası (göz yoran aşırı parlaklık), Bootstrap/Material varsayılan kutuları.

---

### 4. Color Palette (Renk Paleti & Değişken Standartları)

```css
:root {
  /* Zemin & Yüzey Tonları */
  --bg-deep: #0A0C10;         /* Ana ekran karanlık uzay zemini */
  --bg-card: #12161C;         /* Kart ve panel zemin yüzeyi */
  --bg-card-hover: #181E26;   /* Kart hover / basılma durumu */
  --bg-frosted: rgba(18, 22, 28, 0.85); /* Buzlu cam arka planı */

  /* Sınırlar & Cam Efektleri */
  --outline-subtle: rgba(255, 255, 255, 0.08); /* Normal kart kenarlığı */
  --outline-glow: rgba(0, 255, 148, 0.4);      /* Aktif neon yeşil kenarlık */
  --outline-gold: rgba(255, 198, 64, 0.4);     /* VIP gold kenarlık */

  /* Vurgu & Anlamsal Renkler */
  --primary-neon: #00FF94;     /* Nakit, kazanç, başarı ve birincil aksiyon */
  --gold-bright: #FFC640;      /* Forbes zirvesi, 5. seviye kart, prestij */
  --cyan-market: #38BDF8;      /* Forex, kripto ve piyasa likiditesi */
  --danger-red: #FF4D4D;       /* Vergi borcu, amortisman aşınması, zarar */
  --warning-amber: #FACC15;    /* Bekleyen taksit ve bakım gereksinimi */

  /* Tipografi Renkleri */
  --text-main: #FFFFFF;        /* Başlıklar ve birincil metin */
  --text-muted: #94A3B8;       /* İkincil açıklamalar ve etiketler */
  --text-subtle: #64748B;      /* Küçük dipnotlar ve tarih damgaları */
}
```

---

### 5. Typography (Tipografi Standartları)
* **Başlık Fontu (Headings):** `Manrope`, sans-serif (Font-weight: 700, 800) — Modern, kurumsal ve otoriter.
* **Gövde Fontu (Body Text):** `Inter`, sans-serif (Font-weight: 400, 500, 600) — Mükemmel mobil okunabilirlik.
* **Finansal Veri Fontu (Numbers):** `JetBrains Mono`, monospace (Font-weight: 700, 800) — Eşit genişlikli rakamlar (Tabular numbers) sayesinde bakiyeler artarken sayıların titremesini (jitter) önler.
* **Tipografi Ölçeği:**
  * **Display / Hero Balance:** `2.5rem` (40px) / Line-height: `1.1` / Letter-spacing: `-0.03em`.
  * **H1 (Sayfa Başlığı):** `1.85rem` (29px) / Line-height: `1.2`.
  * **H2 (Bölüm Başlığı):** `1.35rem` (21px) / Line-height: `1.3`.
  * **Body Text:** `0.92rem` (14.7px) / Line-height: `1.6`.
  * **Caption / Meta:** `0.75rem` (12px) / Letter-spacing: `0.05em` (Tümü büyük harf).

---

### 6. Component Guidelines (Standart Arayüz Bileşenleri)

#### 6.1. Tekli Spotlight Vitrin Widget'ı (Showcase Hub Widget)
* **Konteyner:** Oval hap şeklinde kapsül başlık barı (`border-radius: 50px`), koyu buzlu cam arka plan (`backdrop-filter: blur(16px)`), ince sınır (`1px solid rgba(255, 255, 255, 0.08)`).
* **Sekmeler (Tabs):** Yatayda taşma yapmayan, tıklandığında neon/altın arka plan ve gölge kazanan hap butonlar.
* **Ok Navigasyonu:** Sağda dairesel `❮` ve `❯` butonları ile ortasında `1 / 15` veya `1 / 5` sayaç rozeti.
* **Görsel Alanı:** Ekranda asla alt alta sıralanmaz; **yalnızca 1 aktif araç veya kart** radyal ışıma zemininde öne çıkarılır.

#### 6.2. İnteraktif Dokunmatik Kart (Tappable Card)
* **Görünüm:** Kredi kartı en-boy oranı (1.586 : 1), 3D eğim perspektifi, parlayan metalik çip, sağ üstte statü rozeti (`EXECUTIVE ELITE`), sol altta kabartma kullanıcı adı.
* **Dokunma Animasyonu:** Dokunulduğunda anında `scale(0.96)` küçülme ve 70ms sonra geri sekme (Spring effect).
* **Uçuşan Sayılar (Floating Numbers):** Dokunulan koordinattan yukarı doğru süzülen ve 800ms içinde kaybolan `+$750` neon parçacıkları.

#### 6.3. Finansal Metrik Kutuları (Stat Box)
* İnce gri bordürlü (`rgba(255, 255, 255, 0.06)`), hafif koyu zeminli dikdörtgen kartlar.
* Üstte küçük gri etiket (`s-label`), altta büyük `JetBrains Mono` formatlanmış değer (`s-value neon` veya `cyan`).

#### 6.4. Buton Standartları
* **Primary Buton:** Yeşil dolgu (`#00FF94`), zemin rengi siyah metin (`#0A0C10`), font-weight 700, padding 14px 24px, radius 12px. Hover'da `box-shadow: 0 0 20px rgba(0, 255, 148, 0.4)`.
* **Gold Buton:** Altın sarısı dolgu (`#FFC640`), siyah metin, VIP seviyelerinde kullanılır.
* **Secondary / Danger Buton:** Şeffaf koyu cam, kırmızı kenarlık (`#FF4D4D`), tehlikeli işlemler veya vergi ödemelerinde kullanılır.

---

### 7. Layout Rules & Responsive Breakpoints
* **Mobil (Varsayılan - 360px — 640px):**
  * Tek sütunlu dikey akış.
  * Alt tab bar sabittir (`position: fixed; bottom: 0; z-index: 100`).
  * Spotlight vitrini dikeyde üstte görsel, altta istatistikler olarak hizalanır.
* **Tablet & Masaüstü (> 768px — 1280px):**
  * İki sütunlu grid yapısı (Görsel solda, finansal detaylar sağda).
  * Dashboard'da TradingView grafiği ile emir defteri yan yana yerleşir.
  * Maksimum sayfa konteyner genişliği: `1240px` (Ortalanmış).

---

### 8. Screen Notes (Ekran Hiyerarşileri)
* **SCR-01 Dashboard:** Hiyerarşi sırasıyla; 1) Kasa Bakiyesi (En büyük font), 2) Dokunmatik Kart, 3) 10s Nabız & Saatlik Gelir Şeridi, 4) Hızlı Yükseltme Butonu.
* **SCR-02 Finansal Piyasalar:** 1) Portföy Özeti, 2) Sembol Seçici Tabs (Kripto / Borsa / Emtia / FX), 3) Grafik Alanı, 4) Alış/Satış Kontrol Barı.
* **SCR-03 Otonom Filo:** 1) Toplam Filo Saatlik Geliri, 2) Spotlight Araç Vitrini (15 model), 3) Garaj Genişletme & Bakım İstasyonu.
* **SCR-06 Profil & Forbes:** 1) Net Varlık Değeri, 2) Vergi Durum Rozeti (Yeşil veya Kırmızı Kilit), 3) Forbes İlk 200 Listesi.

---

### 9. Accessibility (Erişilebilirlik Standartları)
* **Kontrast:** Koyu zemin üzerinde tüm metinler minimum WCAG AAA (7:1) kontrastına uyar.
* **Dokunma Alanı (Touch Target):** Mobildeki tüm etkileşimli alanlar minimum `44x44px`.
* **Semantik Etiketler:** Butonlarda `aria-label` (Örnek: `aria-label="Önceki Araç Modeli"`).
* **Renk Bağımsızlığı:** Başarı/hata durumları yalnızca renk ile değil, ikonlar (✓, ✕, ⚠, 🔒) ile de desteklenir.

---

### 10. Interaction States (Etkileşim Durumları)
* **Hover:** Masaüstünde butonlar %5 aydınlanır, sınır çizgisi neon rengini alır (`border-color: var(--primary-neon)`).
* **Focus:** Klavye veya ekran okuyucu gezintisinde 2px parlayan dış çizgi (`outline: 2px solid var(--primary-neon)`).
* **Disabled:** Yetersiz bakiye veya kilitli işlemlerde buton %35 opaklığa iner, `cursor: not-allowed`.
* **Loading:** Buton içindeki metin kaybolur, yerine dönen 18px neon spinner gelir.

---

### 11. Assets Needed (Gerekli Medya Assetleri)
* **Araç Görselleri (15 Adet PNG - Transparan Zemin):** `egea.png`, `meganeetech.png`, `superb.png`, `camry.png`, `passatelegance.png`, `audia6.png`, `bmw5serie.png`, `eclass.png`, `panamera.png`, `bmw7serie.png`, `sclass.png`, `ranegroverautobiography.png`, `bentleyflying.png`, `rolsroyceghost.png`, `executive_s1.png`.
* **VIP Kart Kaplamaları (5 Adet CSS Gradient / Metal Shader):** Silver Ledger, Sapphire Access, Emerald Tier, Amber Specialist, Black Protocol.
* **İkon Kiti:** Lucide Icons / SVG tabanlı finansal semboller.
* **Ses & Haptic Assetleri:** Tok tıklama sesi (`tap.mp3`), para akış sesi (`cash.mp3`), seviye atlama fanfarı (`levelup.mp3`), vergi kilitlenme alarmı (`lock.mp3`).
