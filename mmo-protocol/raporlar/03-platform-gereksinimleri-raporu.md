# 📱 RAPOR 3: Platform Gereksinimleri Raporu

**Proje:** Business Bank Online — MMO Ekonomi Simülasyonu  
**Hazırlayan:** Antigravity Architect  
**Tarih:** 19 Ekim 2026  
**Revizyon:** v1.0  

---

## 1. Yönetici Özeti

Bu rapor, Business Bank Online'ın **Android, iOS ve Web** platformlarının her biri için ayrı ayrı:
- Build ve dağıtım gereksinimleri
- Mağaza (Store) yönergeleri ve uyumluluk
- Login / Auth gereksinimleri
- In-App Purchase (IAP) entegrasyonu
- Bildirim ve push notification
- Deep linking
- Platform-specific teknik kısıtlamalar
- Performans hedefleri

konularını detaylandırmaktadır.

---

## 2. Platform Karşılaştırma Matrisi

| Özellik | Android | iOS | Web |
|---|---|---|---|
| **Framework** | React Native (Expo) | React Native (Expo) | React (Vite) |
| **Dağıtım** | Google Play + APK | App Store | businessbank.simsekgame.com |
| **Min Sürüm** | Android 7.0 (API 24) | iOS 15.0+ | Modern browsers (Chrome 90+, Safari 15+, Firefox 90+) |
| **Auth** | Email/Password + Google Sign-In | Email/Password + Apple Sign-In + Google | Email/Password + Google + Apple (Safari) |
| **IAP** | Google Play Billing v7 | StoreKit 2 | Stripe (web IAP) |
| **Push** | FCM | APNs via FCM | Web Push API (vapid) |
| **Storage** | MMKV (cache) | MMKV (cache) | localStorage / IndexedDB (cache) |
| **Deep Link** | App Links (verified) | Universal Links | URL routing |
| **Haptics** | expo-haptics | expo-haptics | Vibration API (sınırlı) |
| **Screen Capture** | expo-screen-capture | expo-screen-capture | N/A |
| **Auto Update** | Play Store OTA + EAS Update | App Store + EAS Update | Instant (CDN) |
| **Review Süresi** | 1-3 gün | 1-7 gün | Anında |

---

## 3. Android Platform Gereksinimleri

### 3.1 Build Gereksinimleri

| Gereksinim | Mevcut Durum | Online İçin Güncelleme |
|---|---|---|
| **compileSdkVersion** | 36 | 36 (güncel) ✅ |
| **targetSdkVersion** | 36 | 36 ✅ (Google Play 2026 gereksinimi) |
| **minSdkVersion** | 24 (Android 7.0) | 24 ✅ |
| **Build format** | AAB (App Bundle) | AAB ✅ |
| **Package name** | `com.erkam.businessbank` | Aynı kalacak ✅ |
| **Version Code** | 65 | Artırılacak (66+) |
| **Expo SDK** | 53 | 53 ✅ |
| **React Native** | 0.79.6 | 0.79.6 ✅ |

### 3.2 Google Play Store Gereksinimleri

| Gereksinim | Durum | Aksiyon |
|---|---|---|
| **Gizlilik Politikası** | ✅ Mevcut (`privacy.html`) | URL güncelle: `businessbank.simsekgame.com/privacy` |
| **Data Safety Form** | ⚠️ Güncellenecek | Online olunca toplanan veri artar (email, kullanıcı adı, IP) |
| **İçerik Derecelendirmesi** | ⚠️ Güncellenecek | "Simulated gambling" kategorisi: PEGI 12 / ESRB T hedefle |
| **Target API Level** | ✅ 36 | Uyumlu |
| **64-bit desteği** | ✅ (Expo default) | Uyumlu |
| **Uygulama İzinleri** | Güncelle | `INTERNET`, `CAMERA` (avatar), `ACCESS_NETWORK_STATE` eklenmeli |
| **In-App Purchase** | ⚠️ Güncelle | Google Play Billing Library v7'ye geçiş |
| **Play Integrity API** | ❌ Yeni | Cihaz doğrulama için eklenecek |

### 3.3 Android Specific Login/Auth Gereksinimleri

```
Android Auth Akışı:
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Onboarding  │────>│  Login /     │────>│  Main Game   │
│  (ilk kez)   │     │  Register    │     │  (Tab Nav)   │
└──────────────┘     └──────┬───────┘     └──────────────┘
                            │
                    ┌───────┼───────┐
                    │       │       │
               ┌────▼──┐ ┌─▼────┐ ┌▼──────────┐
               │ Email │ │Google│ │ Guest Mode │
               │ Pass  │ │SignIn│ │ (optional) │
               └───────┘ └──────┘ └────────────┘
```

**Google Sign-In Gereksinimleri:**
- `@react-native-google-signin/google-signin` paketi
- Firebase Console'da SHA-1 fingerprint (debug + release)
- Google Cloud Console'da OAuth 2.0 client ID
- `google-services.json` → `android/app/`
- Scopes: `email`, `profile`

**Kimlik Bilgisi Saklama:**
- JWT Access Token: `react-native-mmkv` (encrypted)
- Refresh Token: `react-native-mmkv` (encrypted)
- ❌ AsyncStorage kullanılmayacak (güvenli değil)

**Biyometrik Giriş (Opsiyonel, Faz 3):**
- `expo-local-authentication` ile parmak izi / yüz tanıma
- Daha önce giriş yapmış kullanıcılar için hızlı erişim

### 3.4 Android In-App Purchase

| Paket | Fiyat | İçerik | SKU |
|---|---|---|---|
| Cash Pack 1 | $0.99 | $5M + VIP | `com.erkam.businessbank.pack1` |
| Cash Pack 5 | $4.99 | $50M + VIP | `com.erkam.businessbank.pack5` |
| Cash Pack 10 | $9.99 | $150M + VIP | `com.erkam.businessbank.pack10` |
| Cash Pack 25 | $24.99 | $1B + VIP | `com.erkam.businessbank.pack25` |

**Server-Side Verification (Zorunlu):**
```
1. Client IAP satın alma tamamlar
2. Client → Server: purchaseToken gönderir
3. Server → Google Play Developer API: token doğrulama
4. Google → Server: onay + sipariş detayları
5. Server → DB: VIP + cash güncelle
6. Server → Client: başarılı yanıt + güncel bakiye
```

> [!CAUTION]
> **Mevcut yapı GÜVENSİZ:** Şu anda VIP ve cash doğrudan client'ta veriliyor (`grantVIP()` + `addBalance()`). Online'da bu kesinlikle **sunucu tarafından** doğrulanmalıdır. Aksi halde modifiye edilmiş APK ile sınırsız para kazanılabilir.

### 3.5 Android Push Notification

| Gereksinim | Detay |
|---|---|
| **Servis** | Firebase Cloud Messaging (FCM) |
| **Paket** | `@react-native-firebase/messaging` |
| **Token Saklama** | Sunucuda `user.fcm_token` alanı |
| **Kullanım Senaryoları** | Forbes sıralama değişikliği, vergi borcu uyarısı, açık artırma sona erdi, limit emri doldu, maaş borcu/grev |
| **Kanal (Channel)** | `game_events` (yüksek öncelik), `market_news` (normal), `promotions` (düşük) |

### 3.6 Android Deep Linking

```
Scheme: businessbank://
App Links: https://businessbank.simsekgame.com

Rotalar:
├── businessbank://dashboard          → KazanclarScreen
├── businessbank://trade/:stockId     → YatirimScreen + InstrumentDetailModal
├── businessbank://property/:propId   → RealEstateDetailModal
├── businessbank://forbes             → ForbesScreen
├── businessbank://bank               → BankaScreen
└── businessbank://profile            → ProfilScreen

App Links doğrulaması:
├── assetlinks.json → businessbank.simsekgame.com/.well-known/assetlinks.json
└── SHA256 sertifika fingerprint gerekli
```

---

## 4. iOS Platform Gereksinimleri

### 4.1 Build Gereksinimleri

| Gereksinim | Değer |
|---|---|
| **Min iOS Version** | 15.0 |
| **Xcode Version** | 16.x |
| **Swift Version** | 5.9+ (native modüller için) |
| **Architecture** | arm64 (Apple Silicon native) |
| **Bundle ID** | `com.erkam.businessbank` |
| **Build Format** | `.ipa` (App Store) |
| **Provisioning** | Apple Developer Program ($99/yıl) |
| **TestFlight** | Beta dağıtım için |

### 4.2 Apple App Store Gereksinimleri

| Gereksinim | Durum | Aksiyon |
|---|---|---|
| **Apple Developer Account** | ⚠️ Gerekli | $99/yıl kayıt |
| **App Store Review Guidelines** | ⚠️ Dikkatli | Simulated gambling → 4.7 kurallarına uyum |
| **Apple Sign-In** | ❌ ZORUNLU | 3rd party login varsa Apple Sign-In da zorunlu |
| **Privacy Nutrition Labels** | ⚠️ Gerekli | Toplanan veri kategorileri beyan edilmeli |
| **App Tracking Transparency** | ⚠️ Gerekli | AdMob/reklam kullanıyorsa ATT dialog zorunlu |
| **In-App Purchase** | ⚠️ Güncelle | StoreKit 2 ile server-side verification |
| **IPv6 Compatibility** | ✅ (React Native default) | Uyumlu |
| **App Privacy Details** | ⚠️ Gerekli | Contact Info, Usage Data, Identifiers beyanı |

> [!WARNING]
> **Apple Sign-In ZORUNLU:** iOS'ta Google Sign-In veya herhangi bir 3rd party login sunuyorsanız, Apple Review Guidelines (4.8) gereği **Sign in with Apple** seçeneği de sunmak **zorunludur**. Bu, Android'de opsiyoneldir ama iOS'ta reject sebebidir.

### 4.3 iOS Specific Login/Auth Gereksinimleri

```
iOS Auth Akışı:
┌──────────────┐     ┌──────────────────────────┐     ┌──────────────┐
│  Onboarding  │────>│  Login / Register         │────>│  Main Game   │
│  (ilk kez)   │     │                           │     │  (Tab Nav)   │
└──────────────┘     │  ┌────────────────────┐   │     └──────────────┘
                     │  │ Sign in with Apple │←── │ ZORUNLU (iOS)
                     │  └────────────────────┘   │
                     │  ┌────────────────────┐   │
                     │  │ Google Sign-In     │   │
                     │  └────────────────────┘   │
                     │  ┌────────────────────┐   │
                     │  │ Email / Password   │   │
                     │  └────────────────────┘   │
                     └───────────────────────────┘
```

**Apple Sign-In Implementasyonu:**
- `expo-apple-authentication` paketi
- Apple Developer Console'da Service ID + Key oluşturma
- Server-side token doğrulama: `identityToken` → Apple'ın public key ile JWT verify
- İlk girişte Apple kullanıcının adını döner (sadece 1 kez!) — hemen kaydet

**Keychain Token Saklama:**
- `expo-secure-store` ile Keychain'e kayıt
- Access Token + Refresh Token
- Biometric unlock desteği (Face ID / Touch ID)

### 4.4 iOS In-App Purchase

**Apple'ın %30 Komisyon Kuralı:**
- Oyun içi sanal para satışı = Apple IAP zorunlu
- Apple %30 komisyon alır (ilk yıl %15 küçük işletme programı)
- Web'den IAP yönlendirme YASAK (Anti-steering kuralları)

**StoreKit 2 Server Verification:**
```
1. Client StoreKit 2 ile satın alma tamamlar
2. Client → Server: Transaction (JWS signed by Apple)
3. Server → Apple: App Store Server API ile doğrulama
4. Apple → Server: signedTransactionInfo
5. Server → DB: VIP + cash güncelle
6. Server → Client: güncel durum
```

**App Store Server Notifications V2:**
- Abonelik yenileme, iptal, iade gibi olaylar webhook ile gelir
- Endpoint: `POST /api/webhooks/apple`
- Server JWS imza doğrulaması yapmalı

### 4.5 iOS Push Notification

| Gereksinim | Detay |
|---|---|
| **Servis** | APNs (Apple Push Notification Service) via FCM |
| **Sertifika** | APNs Auth Key (p8 dosyası) — Apple Developer Console |
| **Entitlement** | `aps-environment: production` |
| **Background Modes** | `remote-notification` capability |
| **Provisional Push** | iOS 12+ "sessiz bildirim" (kullanıcıya sormadan) desteği |

### 4.6 iOS Deep Linking

```
Universal Links:
├── apple-app-site-association dosyası:
│   businessbank.simsekgame.com/.well-known/apple-app-site-association
│
│   {
│     "applinks": {
│       "apps": [],
│       "details": [{
│         "appIDs": ["TEAM_ID.com.erkam.businessbank"],
│         "paths": ["/trade/*", "/property/*", "/forbes", "/profile"]
│       }]
│     }
│   }
│
└── Custom URL Scheme: businessbank://
    (yedek — universal links çalışmazsa)
```

### 4.7 iOS Specific Kısıtlamalar

| Kısıtlama | Etki | Çözüm |
|---|---|---|
| **Background execution** | App arka plana alındığında WS kapanır | Reconnection + offline earning hesaplaması sunucuda |
| **Background fetch** | Max 30s | Bildirimleri push ile gönder, client-side hesaplama yapma |
| **App size limit** | 200 MB (cellular download sınırı) | Asset optimization, on-demand resources |
| **Memory limit** | ~1.4 GB (iPhone 8+) | Büyük listeleri virtualized list ile render |
| **IPv6-only network** | Apple test eder | Hostname kullan, hardcoded IP kullanma |
| **ATT dialog** | Reklam tracking için izin gerekli | İlk reklam gösteriminden önce sor |

---

## 5. Web Platform Gereksinimleri

### 5.1 Tarayıcı Desteği

| Tarayıcı | Min Sürüm | Pazar Payı (TR) | Kritik API'ler |
|---|---|---|---|
| **Chrome** | 90+ | ~70% | WebSocket, Web Crypto, Vibration |
| **Safari** | 15+ | ~15% | WebSocket, ❌ Vibration API yok |
| **Firefox** | 90+ | ~5% | WebSocket, Web Crypto |
| **Edge** | 90+ | ~8% | Chrome ile aynı (Chromium) |
| **Samsung Internet** | 15+ | ~2% | Chrome ile aynı |

### 5.2 Web Login/Auth Gereksinimleri

```
Web Auth Akışı:
┌──────────────┐     ┌──────────────────────────────┐     ┌──────────────┐
│  Landing     │────>│  Login / Register Page        │────>│  Game SPA    │
│  Page        │     │                               │     │  (Dashboard) │
└──────────────┘     │  ┌──────────────────────┐     │     └──────────────┘
                     │  │ Email / Password     │     │
                     │  └──────────────────────┘     │
                     │  ┌──────────────────────┐     │
                     │  │ Google OAuth 2.0     │     │
                     │  │ (popup / redirect)   │     │
                     │  └──────────────────────┘     │
                     │  ┌──────────────────────┐     │
                     │  │ Apple Sign-In (web)  │     │
                     │  │ (Safari kullanıcılar)│     │
                     │  └──────────────────────┘     │
                     └───────────────────────────────┘
```

**Token Yönetimi (Web):**
- Access Token: Memory'de (JavaScript variable) — XSS'e karşı güvenli
- Refresh Token: HttpOnly Secure SameSite cookie — CSRF korumalı
- ❌ `localStorage`'da JWT saklamak = XSS açığı
- `axios` interceptor ile otomatik token yenileme

### 5.3 Web IAP (Ödeme)

> [!IMPORTANT]
> Web'de Apple/Google IAP komisyonu YOKTUR. Bu, web'i ödeme için en avantajlı platform yapar.

| Yöntem | Komisyon | Entegrasyon |
|---|---|---|
| **Stripe** | %2.9 + $0.30 | Stripe Elements / Checkout |
| **PayPal** | %3.49 + $0.49 | PayPal JS SDK |
| **iyzico** (TR) | %2.79 + ₺0.35 | iyzico JS SDK |

**Web Ödeme Akışı:**
```
1. Client: "VIP Paket 10 satın al" → Server'a POST /api/payments/create
2. Server: Stripe PaymentIntent oluştur → client_secret döndür
3. Client: Stripe.confirmCardPayment(client_secret)
4. Stripe → Server: webhook (payment_intent.succeeded)
5. Server → DB: VIP + cash güncelle
6. Server → Client: WebSocket üzerinden güncel durum
```

### 5.4 Web Push Notification

| Gereksinim | Detay |
|---|---|
| **Protokol** | Web Push API (VAPID) |
| **Service Worker** | `/sw.js` — push event listener |
| **İzin** | Kullanıcıdan explicit izin gerekli |
| **Paket** | `web-push` (server-side) |
| **Desteklenmeyen** | iOS Safari (17.4+ destekliyor, PWA olarak) |
| **Kullanım** | Limit emri doldu, açık artırma, vergi uyarısı |

### 5.5 Web Responsive Tasarım Gereksinimleri

```
Breakpoints:
├── 320px - 480px    → Mobile (telefon düşey)
├── 481px - 768px    → Tablet (veya telefon yatay)
├── 769px - 1024px   → Küçük laptop
├── 1025px - 1440px  → Desktop
└── 1441px+          → Geniş ekran

Layout Stratejisi:
├── Mobile: Tek kolon, alt tab bar, tam ekran modaller
├── Tablet: İki kolon (sol panel + sağ detay)
└── Desktop: Üç kolon (sidebar + ana içerik + detay panel)
```

### 5.6 Web-Specific Kısıtlamalar

| Kısıtlama | Etki | Çözüm |
|---|---|---|
| **Tab arka planı** | Browser tab inaktif olunca WS throttle olur | `visibilitychange` event → reconnect + offline catch-up |
| **No haptics** | Tıklama hissi yok (Safari hariç) | Görsel/ses geri bildirim |
| **No native storage** | MMKV yok | `localStorage` (cache) + HTTP-only cookie (auth) |
| **No screen capture block** | Engel yok | N/A (gerekli değil) |
| **SEO** | SPA indexlenmez | Landing page SSR, oyun SPA olarak kalır |
| **PWA** | Kurulabilir uygulama | `manifest.json` + service worker + offline shell |

### 5.7 PWA (Progressive Web App) Gereksinimleri

```json
// manifest.json
{
  "name": "Business Bank Online",
  "short_name": "BusinessBank",
  "start_url": "/game",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#0D0E12",
  "theme_color": "#00FF94",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

---

## 6. Cross-Platform Auth Senkronizasyonu

### 6.1 Tek Hesap, Çoklu Platform

```
Kullanıcı Senaryosu:
1. Android'de Google Sign-In ile kayıt olur
2. Web'de aynı Google hesabıyla giriş yapar
3. iOS'ta Apple Sign-In ile giriş yapar (e-posta eşleşirse aynı hesap)

Server-Side Hesap Birleştirme:
┌─────────────┐
│   User #42  │
│             │
│ email: x@y  │ ← PRIMARY IDENTIFIER
│             │
│ providers:  │
│ ├── google: │ → Google UID
│ ├── apple:  │ → Apple UID  
│ └── email:  │ → password hash
└─────────────┘
```

**Kurallar:**
- E-posta adresi = birincil kimlik
- Bir e-posta birden fazla auth provider'a bağlanabilir
- İlk kayıt hangi platformda yapılırsa yapılsın, aynı e-posta ile diğer platformlarda giriş yapılabilir
- Profil fotoğrafı, kullanıcı adı ve oyun ilerlemesi tüm platformlarda senkron

### 6.2 Session Yönetimi

```
Platform      │ Access Token     │ Refresh Token      │ WS Auth
──────────────┼──────────────────┼────────────────────┼──────────────
Android       │ MMKV (encrypted) │ MMKV (encrypted)   │ Auth header
iOS           │ Keychain         │ Keychain           │ Auth header
Web           │ Memory (JS var)  │ HttpOnly cookie    │ Auth header
```

---

## 7. Offline / Reconnection Stratejisi

### 7.1 Bağlantı Kopması Senaryoları

| Senaryo | Tespit | Çözüm |
|---|---|---|
| **Kısa kesinti** (<10s) | Socket.IO heartbeat timeout | Otomatik reconnect, missed tick'ler sunucudan pull |
| **Orta kesinti** (10s-5dk) | Reconnect + state sync | Full state snapshot sunucudan çekilir |
| **Uzun kesinti** (5dk-12s) | Reconnect + offline earnings | Sunucu offline süreyi hesaplar, delta earning verir |
| **Çok uzun kesinti** (>12s) | Login gerekebilir | Sunucu 12 saat cap uygular, bakiye günceller |
| **App kill** (Android/iOS) | WebSocket kapanır | Push notification ile critical bildirimler gönderilir |

### 7.2 Reconnection Akışı

```
[Bağlantı koptu]
       │
       ▼
[Socket.IO otomatik reconnect]
[Exponential backoff: 1s, 2s, 4s, 8s... max 30s]
       │
       ▼ (Bağlantı kuruldu)
       │
[Client → Server: SYNC_REQUEST]
[{ lastKnownTick, lastBalance, lastPortfolio }]
       │
       ▼
[Server hesaplar:]
[• Kaçırılan tick sayısı]
[• Offline pasif gelirler]
[• Fiyat güncellemeleri]
[• Vergi borç birikimi]
[• Forex likidasyon kontrolü]
       │
       ▼
[Server → Client: SYNC_RESPONSE]
[{ currentState, offlineEarnings, priceUpdates, notifications }]
       │
       ▼
[Client store'ları günceller]
[UI yeniden render]
```

---

## 8. Platform-Specific Performans Hedefleri

| Metrik | Android | iOS | Web |
|---|---|---|---|
| **Uygulama açılış** | <2s | <2s | <3s (FCP) |
| **Login süresi** | <1s | <1s | <1s |
| **WS bağlantı** | <500ms | <500ms | <500ms |
| **Tap → bakiye güncellemesi** | <100ms | <100ms | <150ms |
| **Trade → onay** | <200ms | <200ms | <250ms |
| **Liste scroll** | 60 FPS | 60 FPS | 60 FPS |
| **Memory kullanımı** | <200 MB | <200 MB | <150 MB |
| **Bundle boyutu** | <50 MB (APK) | <50 MB (IPA) | <5 MB (gzip) |
| **Offline → Online sync** | <2s | <2s | <2s |

---

## 9. Geliştirme Ortamı Gereksinimleri

### 9.1 Developer Workstation

| Bileşen | Android Dev | iOS Dev | Web Dev | Full-Stack |
|---|---|---|---|---|
| **İşletim Sistemi** | Windows/macOS/Linux | **macOS only** | Herhangi | macOS (iOS için) |
| **Node.js** | 22 LTS | 22 LTS | 22 LTS | 22 LTS |
| **Java (JDK)** | 17 | — | — | 17 |
| **Android Studio** | Gerekli | — | — | Gerekli |
| **Xcode** | — | 16.x (macOS only) | — | 16.x |
| **Expo CLI** | Gerekli | Gerekli | — | Gerekli |
| **Docker** | Gerekli (backend) | Gerekli (backend) | Gerekli (backend) | Gerekli |
| **PostgreSQL** | Docker | Docker | Docker | Docker |
| **Redis** | Docker | Docker | Docker | Docker |

### 9.2 EAS Build Konfigürasyonu (Expo)

```json
// eas.json
{
  "cli": { "version": ">= 12.0.0" },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "env": {
        "API_URL": "http://192.168.1.x:3000",
        "WS_URL": "ws://192.168.1.x:3001"
      }
    },
    "preview": {
      "distribution": "internal",
      "android": { "buildType": "apk" },
      "env": {
        "API_URL": "https://staging-api.simsekgame.com",
        "WS_URL": "wss://staging-api.simsekgame.com"
      }
    },
    "production": {
      "android": { "buildType": "app-bundle" },
      "ios": { "autoIncrement": true },
      "env": {
        "API_URL": "https://api.businessbank.simsekgame.com",
        "WS_URL": "wss://api.businessbank.simsekgame.com"
      }
    }
  }
}
```

---

## 10. Platform Gereksinim Checklist

### Android Launch Checklist

- [ ] Google Play Developer Account ($25 tek seferlik)
- [ ] `google-services.json` (Firebase + Google Sign-In)
- [ ] SHA-1 fingerprint (debug + release)
- [ ] Play Integrity API entegrasyonu
- [ ] Google Play Billing Library v7 (IAP)
- [ ] FCM push notification setup
- [ ] App Links (assetlinks.json)
- [ ] Data Safety Form güncelleme
- [ ] İçerik derecelendirmesi (IARC)
- [ ] Privacy Policy URL güncelleme
- [ ] APK → AAB format (zaten mevcut)
- [ ] ProGuard / R8 obfuscation
- [ ] Crash reporting (Sentry / Firebase Crashlytics)
- [ ] 64-bit support (✅ default)

### iOS Launch Checklist

- [ ] Apple Developer Program kayıt ($99/yıl)
- [ ] App Store Connect uygulaması oluşturma
- [ ] Apple Sign-In implementasyonu (ZORUNLU)
- [ ] StoreKit 2 IAP entegrasyonu
- [ ] APNs Auth Key (p8) oluşturma
- [ ] Provisioning profile (development + distribution)
- [ ] Universal Links (apple-app-site-association)
- [ ] App Privacy Details (Nutrition Label) beyanı
- [ ] App Tracking Transparency (ATT) dialog
- [ ] TestFlight beta dağıtım
- [ ] App Store screenshot'lar (6.7", 6.5", 5.5", 12.9" iPad)
- [ ] App Store açıklama (TR + EN)
- [ ] Age rating (4+, 12+, 17+ seçimi)
- [ ] Export compliance beyanı (şifreleme)

### Web Launch Checklist

- [ ] `businessbank.simsekgame.com` subdomain DNS
- [ ] SSL sertifika (Cloudflare / Let's Encrypt)
- [ ] `manifest.json` (PWA)
- [ ] Service Worker (offline shell + push)
- [ ] Responsive tasarım (320px → 1440px+)
- [ ] VAPID keys (Web Push)
- [ ] Stripe / iyzico ödeme entegrasyonu
- [ ] Google OAuth 2.0 web client ID
- [ ] Apple Sign-In web config (opsiyonel)
- [ ] Open Graph meta tags (sosyal paylaşım)
- [ ] Favicon + app icons
- [ ] Cookie consent banner (KVKK)
- [ ] CSP headers
- [ ] Performance audit (Lighthouse > 90)

---

> [!NOTE]
> **En kritik platform kararı:** iOS geliştirmesi macOS bilgisayar gerektirir. Eğer mevcut ortamda macOS yoksa, başlangıçta Android + Web ile başlayıp iOS'u sonraki fazda eklemek stratejik olarak mantıklıdır.
