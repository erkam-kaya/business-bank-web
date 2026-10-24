# 🗄️ 05 // VERİTABANI ŞEMASI & VERİ İLİŞKİLERİ (BACKEND SCHEMA)
## Business Bank Online — MMO Finans & Holding Simülasyonu

---

### 1. Purpose (Belgenin Amacı)
Tüm ilişkisel verilerin (PostgreSQL 17), önbellek katmanının (Redis 7), entity tanımlarının, alan tiplerinin, indekslerin, yetkilendirme (RLS) kurallarının ve doğrulama kısıtlarının açıkça belirlenmesi; yapay zeka ajanının veri bütünlüğünü bozan rastgele tablolar veya uyumsuz alanlar üretmesini önlemek.

---

### 2. Entities Summary (Varlık Tanımları)
* `User`: Oyuncunun temel hesap kimliği, cihaz eşleşmesi, Forbes unvanı ve sistem durumu.
* `Wallet`: Oyuncunun nakit kasası, vadeli mevduatları, birikmiş vergi borcu ve tıklama gücü.
* `VehicleInstance`: Oyuncuya ait otonom taksi ve araçlar; anlık km, kondisyon ve aşınma durumu.
* `RealEstateInstance`: Satın alınan gayrimenkul mülkleri (stüdyo, rezidans, AVM, plaza) ve kira getirileri.
* `MarketAsset`: Canlı piyasada işlem gören hisse, kripto, forex ve emtia enstrümanları.
* `PortfolioPosition`: Oyuncunun elinde tuttuğu hisse/kripto miktarı ve ortalama alış maliyeti.
* `OrderBook`: Aktif ve geçmiş borsa alış/satış limit ve piyasa emirleri.
* `BankCredit`: Bankadan çekilen kurumsal krediler, saatlik taksit tutarı ve kalan borç.
* `CorporateHolding`: Oyuncunun kurduğu holding tüzel kişiliği, halka arz (IPO) oranı ve hissedar listesi.
* `TaxAuditLog`: 16 saatlik vergi tahakkukları, gecikme faizleri ve hesap dondurma işlem kayıtları.

---

### 3. Database Tables & Specifications (PostgreSQL 17 / Prisma DDL)

#### 3.1. Tablo: `users`
* **Alanlar ve Tipler:**
  * `id`: UUID (Primary Key, default: `gen_random_uuid()`)
  * `email`: VARCHAR(255) (Nullable, Unique)
  * `password_hash`: VARCHAR(255) (Nullable, Argon2id)
  * `device_uuid`: VARCHAR(128) (NOT NULL, Unique, Indexed)
  * `username`: VARCHAR(32) (NOT NULL, Unique, Indexed)
  * `vip_tier`: INT (NOT NULL, default: `1` [1: Silver -> 5: Black])
  * `forbes_rank`: INT (Nullable, Indexed)
  * `is_frozen`: BOOLEAN (NOT NULL, default: `false`)
  * `created_at`: TIMESTAMPTZ (NOT NULL, default: `NOW()`)
  * `updated_at`: TIMESTAMPTZ (NOT NULL, default: `NOW()`)
* **İndeksler:**
  * `idx_users_device_uuid` (`device_uuid`)
  * `idx_users_forbes_rank` (`forbes_rank`)

#### 3.2. Tablo: `wallets`
* **Alanlar ve Tipler:**
  * `id`: UUID (Primary Key, default: `gen_random_uuid()`)
  * `user_id`: UUID (NOT NULL, Unique, Foreign Key -> `users.id` ON DELETE CASCADE)
  * `cash_balance`: NUMERIC(24, 2) (NOT NULL, default: `0.00`, CHECK `cash_balance >= 0`)
  * `deposit_balance`: NUMERIC(24, 2) (NOT NULL, default: `0.00`)
  * `tax_debt`: NUMERIC(20, 2) (NOT NULL, default: `0.00`, CHECK `tax_debt >= 0`)
  * `last_tax_paid_at`: TIMESTAMPTZ (NOT NULL, default: `NOW()`)
  * `tax_lock_triggered_at`: TIMESTAMPTZ (Nullable)
  * `tap_level`: INT (NOT NULL, default: `1` [Min: 1, Max: 20])
  * `hourly_passive_income`: NUMERIC(20, 2) (NOT NULL, default: `0.00`)
* **İndeksler:**
  * `idx_wallets_user_id` (`user_id`)

#### 3.3. Tablo: `vehicle_instances`
* **Alanlar ve Tipler:**
  * `id`: UUID (Primary Key, default: `gen_random_uuid()`)
  * `user_id`: UUID (NOT NULL, Foreign Key -> `users.id` ON DELETE CASCADE)
  * `catalog_id`: VARCHAR(32) (NOT NULL [veh_01 -> veh_15])
  * `class_name`: VARCHAR(32) (NOT NULL [Ekonomi, Isletme, VIP, Sovereign])
  * `current_km`: INT (NOT NULL, default: `0`)
  * `max_km`: INT (NOT NULL)
  * `condition_pct`: NUMERIC(5, 2) (NOT NULL, default: `100.00`)
  * `hourly_revenue`: NUMERIC(15, 2) (NOT NULL)
  * `maintenance_cost`: NUMERIC(15, 2) (NOT NULL)
  * `is_retired`: BOOLEAN (NOT NULL, default: `false`)
  * `created_at`: TIMESTAMPTZ (NOT NULL, default: `NOW()`)
* **İndeksler:**
  * `idx_vehicles_user_active` (`user_id`, `is_retired`)

#### 3.4. Tablo: `portfolio_positions`
* **Alanlar ve Tipler:**
  * `id`: UUID (Primary Key, default: `gen_random_uuid()`)
  * `user_id`: UUID (NOT NULL, Foreign Key -> `users.id` ON DELETE CASCADE)
  * `symbol`: VARCHAR(16) (NOT NULL [BTC, ETH, GOLD, OIL, SOV_CORP])
  * `quantity`: NUMERIC(24, 8) (NOT NULL, CHECK `quantity >= 0`)
  * `average_cost`: NUMERIC(24, 4) (NOT NULL)
  * `updated_at`: TIMESTAMPTZ (NOT NULL, default: `NOW()`)
* **İndeksler & Kısıtlar:**
  * Unique Constraint: `(user_id, symbol)`

#### 3.5. Tablo: `bank_credits`
* **Alanlar ve Tipler:**
  * `id`: UUID (Primary Key, default: `gen_random_uuid()`)
  * `user_id`: UUID (NOT NULL, Foreign Key -> `users.id` ON DELETE CASCADE)
  * `principal_amount`: NUMERIC(20, 2) (NOT NULL)
  * `remaining_debt`: NUMERIC(20, 2) (NOT NULL, CHECK `remaining_debt >= 0`)
  * `hourly_installment`: NUMERIC(15, 2) (NOT NULL)
  * `remaining_hours`: INT (NOT NULL, default: `24`)
  * `is_settled`: BOOLEAN (NOT NULL, default: `false`)
  * `created_at`: TIMESTAMPTZ (NOT NULL, default: `NOW()`)
* **İndeksler:**
  * `idx_credits_user_active` (`user_id`, `is_settled`)

#### 3.6. Tablo: `corporate_holdings` (Halka Arz - IPO)
* **Alanlar ve Tipler:**
  * `id`: UUID (Primary Key, default: `gen_random_uuid()`)
  * `owner_id`: UUID (NOT NULL, Foreign Key -> `users.id` ON DELETE CASCADE)
  * `holding_name`: VARCHAR(64) (NOT NULL, Unique)
  * `total_valuation`: NUMERIC(24, 2) (NOT NULL)
  * `shares_issued`: BIGINT (NOT NULL, default: `10000000`)
  * `public_float_pct`: NUMERIC(5, 2) (NOT NULL, default: `49.00` [Maks %49])
  * `share_price`: NUMERIC(15, 4) (NOT NULL)
  * `dividend_rate`: NUMERIC(5, 2) (NOT NULL, default: `5.00`)
  * `is_public`: BOOLEAN (NOT NULL, default: `false`)
  * `created_at`: TIMESTAMPTZ (NOT NULL, default: `NOW()`)

---

### 4. Relationships (İlişki Modeli)
* `User` 1 — 1 `Wallet` (Zorunlu tekil cüzdan).
* `User` 1 — N `VehicleInstance` (Bir kullanıcının birden fazla taksisi olabilir).
* `User` 1 — N `PortfolioPosition` (Bir kullanıcının portföyünde birden fazla hisse/kripto olabilir).
* `User` 1 — N `BankCredit` (Aktif kredi bittiğinde yeni krediler açılabilir).
* `User` 1 — 1 `CorporateHolding` (Her kullanıcı tek bir ana holding şirketi kurabilir).

---

### 5. User Ownership & Authorization Rules (Yetkilendirme)
* **Mülkiyet Kuralı:** Oyuncular yalnızca `user_id === req.user.id` olan cüzdan, araç, gayrimenkul ve portföy satırlarını okuyabilir ve güncelleyebilir.
* **RLS & Guard Kontrolü:** NestJS `JwtAuthGuard` ve `OwnershipGuard` katmanları her istekte token'daki `userId` ile hedef satırın `user_id` alanını doğrular.
* **Borsa Emirleri:** Alış ve satış emirleri anonimleştirilmiş sipariş defterinde (`OrderBook`) eşleştirilir, oyuncular karşı tarafın kimliğini göremez.

---

### 6. Authentication Flow & Session Lifecycle (Oturum Döngüsü)
1. **Misafir Başlangıcı (Guest):** İstemci cihaz parmak izini (`device_uuid`) gönderir. Kayıt yoksa anında `users` ve `wallets` tablosunda yeni satır açılır; 15 dakikalık JWT ve 30 günlük Refresh Token döner.
2. **Hesap Bağlama (Link Account):** Misafir kullanıcı Google veya Apple ile giriş yaptığında, mevcut `device_uuid` kaydına `email` ve sosyal ID bağlanır; varlıklar kaybolmadan kalıcı hesaba dönüşür.
3. **Token Yenileme (Refresh):** Access token süresi dolduğunda (`401 Unauthorized`), istemci `/auth/refresh` endpoint'ine sessiz istek atarak yeni JWT alır.

---

### 7. Data Validation Rules (Veri Doğrulama Kuralları)
* **Kasa Bakiyesi Koruması:** `cash_balance` asla negatif olamaz (PostgreSQL check constraint). Yetersiz bakiye durumunda işlem veritabanı seviyesinde `TransactionRollback` ile iptal edilir.
* **Pessimistic Kilit:** Kredi çekme, borsa emri verme ve araç satın alma sırasında cüzdan satırı `SELECT * FROM wallets WHERE user_id = $1 FOR UPDATE` ile kilitlenir; aynı anda gelen iki tıklama yarış durumu (race condition) yaratamaz.
* **Hız Limiti:** 1 saniyede maksimum 15 dokunma olayı işlenir.

---

### 8. Retention and Deletion (Veri Saklama & Temizleme)
* **Aktif Olmayan Hesaplar:** 180 gün boyunca giriş yapmayan misafir hesaplar, veritabanı performansını korumak için arşiv tablosuna (`archived_users`) taşınır.
* **Log Temizliği:** `TaxAuditLog` ve tamamlanmış `BankCredit` kayıtları 90 gün sonra soğuk depolamaya (Cloudflare R2) yedeklenip ana tablodan silinir.
* **Hesap Silme (KVKK/GDPR):** Kullanıcı "Hesabımı Sil" talep ettiğinde tüm ilişkili kayıtlar (`User`, `Wallet`, `Vehicles`, `Portfolio`) `CASCADE` ile kalıcı olarak silinir.

---

### 9. Migration & Seed Data (Migrasyon & Başlangıç Verisi)
* **Prisma Migrations:** `npx prisma migrate deploy` üretim ortamında kesintisiz çalışır.
* **Seed Verisi:**
  * 15 Araçlık Taksi Kataloğu (`veh_01` Fiat Egea Sedan'dan `veh_15` Sovereign S1'e kadar fiyat ve saatlik getiri tablosu).
  * 5 VIP Kart Seviye Tanımları (Silver, Sapphire, Emerald, Amber, Black).
  * 4 Başlangıç Borsa Enstrümanı (Bitcoin, Ethereum, Ons Altın, Brent Petrol).
