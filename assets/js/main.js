/**
 * Business Bank & Şimşek Game - V2 Scripts
 * Aligned with in-game mechanics and UI components
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header Scroll
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Drawer
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      if (mobileDrawer.classList.contains('open')) {
        mobileToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
      } else {
        mobileToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      }
    });

    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      });
    });
  }

  // 3. LIVE TAPPER SIMULATOR (HERO PHONE)
  let balance = 0;
  let tapLevel = 1;
  const tapValues = [10, 25, 60, 150, 350, 750];
  const upgradeCosts = [100, 500, 2500, 10000, 50000];

  const tapCard = document.getElementById('live-tap-card');
  const balanceDisplay = document.getElementById('live-balance');
  const tapPowerDisplay = document.getElementById('live-tap-power');
  const upgradeBtn = document.getElementById('live-upgrade-btn');
  const upgradeCostDisplay = document.getElementById('live-upgrade-cost');
  const floatingContainer = document.getElementById('tap-float-container');
  const statusMsg = document.getElementById('live-status-msg');

  function updateDisplay() {
    if (balanceDisplay) {
      balanceDisplay.textContent = '$' + balance.toLocaleString('en-US');
    }
    const currentPower = tapValues[Math.min(tapLevel - 1, tapValues.length - 1)];
    if (tapPowerDisplay) {
      tapPowerDisplay.textContent = `+$${currentPower}/tık`;
    }

    if (upgradeBtn) {
      if (tapLevel <= upgradeCosts.length) {
        const nextCost = upgradeCosts[tapLevel - 1];
        upgradeCostDisplay.textContent = `$${nextCost.toLocaleString('en-US')}`;
        if (balance >= nextCost) {
          upgradeBtn.style.borderColor = '#00FF94';
          upgradeBtn.style.background = 'rgba(0, 255, 148, 0.12)';
        } else {
          upgradeBtn.style.borderColor = '#2A2E35';
          upgradeBtn.style.background = '#1E2128';
        }
      } else {
        upgradeBtn.innerHTML = `<span>Maksimum Güç (Hard Cap)</span><span class="cost">MAX</span>`;
        upgradeBtn.disabled = true;
      }
    }

    // Milestone alerts
    if (statusMsg) {
      if (balance >= 15000) {
        statusMsg.innerHTML = '🎉 Tebrikler! Kripto, Forex, Taksi veya Mevduat yatırımı yapacak sermayeye ulaştın!';
        statusMsg.style.color = '#00FF94';
      } else if (balance >= 5000) {
        statusMsg.innerHTML = '⭐ Silver Ledger Kartına Yaklaştın!';
        statusMsg.style.color = '#FFC837';
      } else if (balance >= 500) {
        statusMsg.innerHTML = '⚡ Nakit akışın hızlanıyor!';
        statusMsg.style.color = '#38bdf8';
      }
    }
  }

  if (tapCard) {
    tapCard.addEventListener('click', (e) => {
      const currentPower = tapValues[Math.min(tapLevel - 1, tapValues.length - 1)];
      balance += currentPower;

      // Card click micro-animation
      tapCard.style.transform = 'scale(0.95)';
      setTimeout(() => {
        tapCard.style.transform = 'scale(1)';
      }, 70);

      // Create floating number
      if (floatingContainer) {
        const floatItem = document.createElement('div');
        floatItem.className = 'tap-float-num';
        floatItem.textContent = `+$${currentPower}`;

        const rect = tapCard.getBoundingClientRect();
        const containerRect = floatingContainer.getBoundingClientRect();
        
        const clientX = e.clientX || (rect.left + rect.width / 2);
        const clientY = e.clientY || (rect.top + rect.height / 2);

        const xPos = clientX - containerRect.left - 20 + (Math.random() * 30 - 15);
        const yPos = clientY - containerRect.top - 20;

        floatItem.style.left = `${Math.max(10, Math.min(xPos, containerRect.width - 60))}px`;
        floatItem.style.top = `${yPos}px`;

        floatingContainer.appendChild(floatItem);

        setTimeout(() => {
          floatItem.remove();
        }, 800);
      }

      updateDisplay();
    });
  }

  if (upgradeBtn) {
    upgradeBtn.addEventListener('click', () => {
      if (tapLevel <= upgradeCosts.length) {
        const nextCost = upgradeCosts[tapLevel - 1];
        if (balance >= nextCost) {
          balance -= nextCost;
          tapLevel++;
          updateDisplay();
        }
      }
    });
  }

  // 4. In-Game Screens Showcase Switcher
  const screenData = {
    kazanclar: {
      title: "Kazanclar (Dashboard): Tıkla ve Servet Biriktir",
      desc: "Oyunun ana kontrol merkezi. Ortadaki özel kartına dokunarak tok haptic titreşimle bakiye biriktir. 20 Seviyeli geliştirme sistemiyle tıklama başına $750 hard cap tavanına ulaş.",
      img: "assets/img/screen_dashboard.png",
      points: [
        "Tok dokunsal his ve gerçekçi kart arayüzü",
        "10 saniyelik Sovereign Pulse kalp atışı",
        "Gelişmiş rozet ve bildirim kontrol merkezi"
      ]
    },
    yatirim: {
      title: "Yatırım Terminali: Canlı Borsa & Kripto",
      desc: "TradingView hassasiyetinde canlı grafikler. Likidite sınırlarına göre hisse al-sat, kripto paralara spekülasyon yap, düzenli temettü ödeyen elit şirketlere ortak ol.",
      img: "assets/img/screen_investment.png",
      points: [
        "Piyasa derinliği (Likiditeye göre alım satım)",
        "Altın, Gümüş ve Petrol emtia pariteleri",
        "Platinum ve üzeri kartlara özel hisse analisti"
      ]
    },
    isletme: {
      title: "Otonom Şirketler: Taksi & Lojistik Filoları",
      desc: "Tek tek tıklamakla milyarder olunmaz; parayı senin için çalıştırmalısın! Fiat Egea'dan başlayıp Mercedes ve Rolls-Royce Ghost filolarına uzanan otonom filo yönetimi.",
      img: "assets/img/screen_business.png",
      points: [
        "15 Farklı Executive Araç Modeli",
        "Aşınma ve dinamik araç bakım maliyetleri",
        "Multi-Instance yapısıyla 30'a kadar şirket slotu"
      ]
    },
    banka: {
      title: "Sovereign Bank: Halka Arz (IPO) & Krediler",
      desc: "Şirketini büyüttükten sonra borsada halka arz et, yüz milyonlarca dolarlık kurumsal fon topla. Acil sermaye için 24 saat vadeli banka kredisi çek.",
      img: "assets/img/screen_bank.png",
      points: [
        "Şirket halka arzı ile devasa nakit enjeksiyonu",
        "Bakiye x 5 Kredi Limiti ve saatlik taksit planı",
        "FX Döviz ve altın mevduat kasası"
      ]
    },
    profil: {
      title: "Profil & Bilanço: Vergi Kilidi ve Prestij",
      desc: "Net varlık dökümü, amortisman değerlemeleri ve acımasız mali disiplin. 16 saatten fazla ödenmeyen vergi borçlarında Sovereign CNS tüm gelirleri dondurur.",
      img: "assets/img/screen_profile.png",
      points: [
        "16 Saatlik vergi dondurma mekaniği",
        "Konsolide net portföy ve mülk değerlemesi",
        "Forbes dünya sıralaması ve statü unvanları"
      ]
    }
  };

  const screenTabBtns = document.querySelectorAll('.screen-tab-btn');
  const screenImg = document.getElementById('screen-view-img');
  const screenTitle = document.getElementById('screen-view-title');
  const screenDesc = document.getElementById('screen-view-desc');
  const screenPoints = document.getElementById('screen-view-points');

  screenTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      screenTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const key = btn.getAttribute('data-screen');
      const data = screenData[key];

      if (data && screenImg) {
        screenImg.style.opacity = '0';
        setTimeout(() => {
          screenImg.src = data.img;
          screenTitle.textContent = data.title;
          screenDesc.textContent = data.desc;
          screenPoints.innerHTML = data.points.map(p => `
            <div class="screen-point-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>${p}</span>
            </div>
          `).join('');
          screenImg.style.opacity = '1';
        }, 150);
      }
    });
  });

  // 5. FAQ Accordion
  const faqCards = document.querySelectorAll('.faq-card');
  faqCards.forEach(card => {
    const btn = card.querySelector('.faq-btn');
    btn.addEventListener('click', () => {
      const isOpen = card.classList.contains('open');
      faqCards.forEach(c => c.classList.remove('open'));
      if (!isOpen) {
        card.classList.add('open');
      }
    });
  });

  // 6. Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 7. SINGLE FEATURED VEHICLE SHOWROOM SPOTLIGHT (15 MODELS)
  const FLEET_DATA = [
    { id: '01', name: '2024 Fiat Egea Sedan', class: 'Ekonomi Sınıfı', cost: '$15,000', rent: '+$110 / saat', km: '500,000 km', maint: '$900', img: 'assets/img/cars/egea.png', desc: 'Şehir içi taksi ağını başlatmak için en ideal, düşük maliyetli ve dayanıklı başlangıç aracı.' },
    { id: '02', name: 'Renault Megane E-Tech', class: 'Ekonomi Sınıfı', cost: '$22,000', rent: '+$180 / saat', km: '450,000 km', maint: '$1,200', img: 'assets/img/cars/meganeetech.png', desc: 'Elektrikli yeni nesil filolar için düşük yakıt/şarj maliyetli modern filo modeli.' },
    { id: '03', name: 'Skoda Superb', class: 'Ekonomi Sınıfı', cost: '$35,000', rent: '+$290 / saat', km: '400,000 km', maint: '$1,800', img: 'assets/img/cars/superb.png', desc: 'Geniş arka diz mesafesiyle yolcu memnuniyetini ve saatlik taksi getirisini artıran tercih.' },
    { id: '04', name: 'Toyota Camry (Hybrid)', class: 'Ekonomi Sınıfı', cost: '$42,000', rent: '+$360 / saat', km: '380,000 km', maint: '$2,200', img: 'assets/img/cars/camry.png', desc: 'Hibrit teknolojisiyle dur-kalk trafiğinde sıfır arıza riski sunan uzun ömürlü yatırım.' },
    { id: '05', name: 'VW Passat Elegance', class: 'İşletme Sınıfı', cost: '$65,000', rent: '+$550 / saat', km: '350,000 km', maint: '$3,500', img: 'assets/img/cars/passatelegance.png', desc: 'Kurumsal transferlerin ve iş dünyasının vazgeçilmez filo standardı.' },
    { id: '06', name: 'Audi A6', class: 'İşletme Sınıfı', cost: '$85,000', rent: '+$780 / saat', km: '320,000 km', maint: '$4,800', img: 'assets/img/cars/audia6.png', desc: 'Quattro teknolojisi ve lüks kokpitiyle kurumsal müşterilere özel yüksek primli taşımacılık.' },
    { id: '07', name: 'BMW 5 Series', class: 'İşletme Sınıfı', cost: '$105,000', rent: '+$980 / saat', km: '300,000 km', maint: '$5,500', img: 'assets/img/cars/bmw5serie.png', desc: 'Sportif dinamizm ve kurumsal prestij sunan, saatlik getirisi yüksek iş makamı.' },
    { id: '08', name: 'Mercedes E-Class', class: 'İşletme Sınıfı', cost: '$120,000', rent: '+$1,150 / saat', km: '280,000 km', maint: '$6,500', img: 'assets/img/cars/eclass.png', desc: 'Executive konfor ve sessiz kabin deneyimiyle işletme sınıfının lideri.' },
    { id: '09', name: 'Porsche Panamera', class: 'VIP Sınıfı', cost: '$210,000', rent: '+$2,200 / saat', km: '250,000 km', maint: '$12,000', img: 'assets/img/cars/panamera.png', desc: 'Süper spor performansını 4 kapılı VIP konforuyla buluşturan elit tercih.' },
    { id: '10', name: 'BMW 7 Series', class: 'VIP Sınıfı', cost: '$250,000', rent: '+$2,800 / saat', km: '240,000 km', maint: '$15,000', img: 'assets/img/cars/bmw7serie.png', desc: 'Tiyatro ekranı ve sinema konforu sunan makam aracıyla saatlik binlerce dolar getiri.' },
    { id: '11', name: 'Mercedes S-Class', class: 'VIP Sınıfı', cost: '$280,000', rent: '+$3,200 / saat', km: '230,000 km', maint: '$18,000', img: 'assets/img/cars/sclass.png', desc: 'Dünya liderlerinin ve üst düzey patronların 1 numaralı lüks şoförlü aracı.' },
    { id: '12', name: 'Range Rover Autobiography', class: 'VIP Sınıfı', cost: '$320,000', rent: '+$3,800 / saat', km: '220,000 km', maint: '$20,000', img: 'assets/img/cars/ranegroverautobiography.png', desc: 'Her türlü arazi ve şehir şartında en üst düzey VIP güvenlik ve konfor.' },
    { id: '13', name: 'Bentley Flying Spur', class: 'Sovereign Sınıfı', cost: '$650,000', rent: '+$8,500 / saat', km: '200,000 km', maint: '$35,000', img: 'assets/img/cars/bentleyflying.png', desc: 'El yapımı ahşap ve deri kaplamalarla sadece milyarderlerin binebildiği şaheser.' },
    { id: '14', name: 'Rolls Royce Ghost', class: 'Sovereign Sınıfı', cost: '$900,000', rent: '+$12,500 / saat', km: '180,000 km', maint: '$50,000', img: 'assets/img/cars/rolsroyceghost.png', desc: 'Yıldızlı tavan ve uçan halı süspansiyonu ile saatlik $12,500 net getiri canavarı.' },
    { id: '15', name: 'Sovereign S1 (Custom)', class: 'Zirve Özel', cost: '$1,500,000', rent: '+$22,000 / saat', km: '150,000 km', maint: '$100,000', img: 'assets/img/cars/executive_s1.png', desc: 'Forbes 1. sırasındaki dünya liderine özel üretilen, zırhlı ve prototip zirve makinesi.' }
  ];

  let currentCarIndex = 0;
  const carImg = document.getElementById('carImg');
  const carClassBadge = document.getElementById('carClassBadge');
  const carSubId = document.getElementById('carSubId');
  const carName = document.getElementById('carName');
  const carDesc = document.getElementById('carDesc');
  const carCost = document.getElementById('carCost');
  const carRent = document.getElementById('carRent');
  const carKm = document.getElementById('carKm');
  const carMaint = document.getElementById('carMaint');
  const fleetCounter = document.getElementById('fleetCounter');
  const fleetTabs = document.querySelectorAll('#fleetTabs .widget-tab');
  const fleetPrevBtn = document.getElementById('fleetPrevBtn');
  const fleetNextBtn = document.getElementById('fleetNextBtn');

  function renderFleet(index) {
    if (index < 0) index = FLEET_DATA.length - 1;
    if (index >= FLEET_DATA.length) index = 0;
    currentCarIndex = index;
    const item = FLEET_DATA[index];

    if (carImg) {
      carImg.style.opacity = '0';
      carImg.style.transform = 'scale(0.96)';
      setTimeout(() => {
        carImg.src = item.img;
        carImg.alt = item.name;
        if (carClassBadge) {
          carClassBadge.textContent = item.class;
          if (item.class === 'Zirve Özel') {
            carClassBadge.style.borderColor = 'var(--primary-neon)';
            carClassBadge.style.color = 'var(--primary-neon)';
          } else if (item.class === 'Sovereign Sınıfı') {
            carClassBadge.style.borderColor = 'var(--gold-bright)';
            carClassBadge.style.color = 'var(--gold-bright)';
          } else {
            carClassBadge.style.borderColor = 'var(--primary-neon)';
            carClassBadge.style.color = 'var(--primary-neon)';
          }
        }
        if (carSubId) carSubId.textContent = `GARAJ MODELİ #${item.id}`;
        if (carName) carName.textContent = item.name;
        if (carDesc) carDesc.textContent = item.desc;
        if (carCost) carCost.textContent = item.cost;
        if (carRent) carRent.textContent = item.rent;
        if (carKm) carKm.textContent = item.km;
        if (carMaint) carMaint.textContent = item.maint;
        if (fleetCounter) fleetCounter.textContent = `${index + 1} / ${FLEET_DATA.length}`;

        fleetTabs.forEach(t => {
          const tabIdx = parseInt(t.getAttribute('data-index'));
          if (tabIdx === index) {
            t.classList.add('active');
          } else {
            t.classList.remove('active');
          }
        });

        carImg.style.opacity = '1';
        carImg.style.transform = 'scale(1)';
      }, 140);
    }
  }

  if (fleetTabs.length > 0) {
    fleetTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const idx = parseInt(tab.getAttribute('data-index'));
        renderFleet(idx);
      });
    });
  }

  if (fleetPrevBtn) {
    fleetPrevBtn.addEventListener('click', () => {
      renderFleet(currentCarIndex - 1);
    });
  }
  if (fleetNextBtn) {
    fleetNextBtn.addEventListener('click', () => {
      renderFleet(currentCarIndex + 1);
    });
  }

  // 8. SINGLE FEATURED VIP CARDS SPOTLIGHT (5 TIERS)
  const VIP_DATA = [
    {
      levelClass: 'card-level-1',
      levelText: 'SEVİYE 1',
      badge: 'EXECUTIVE ELITE',
      name: 'SILVER LEDGER',
      sub: 'Başlangıç Kartı',
      botLeft: 'Bonus: 1x',
      botRight: 'Gereken: $100',
      tierTag: 'PRESTİJ KARTI • KADEME 1',
      title: 'Silver Ledger',
      desc: 'Her yeni girişimcinin finansal serüvenine başladığı temel hesap kartı. Dokundukça sermaye biriktirir, nakit akışının temel taşını oluşturur.',
      bonus: '1x Çarpan',
      req: '$100',
      credit: 'Bakiye x 2.0',
      perk: 'Temel Dokunma Gücü'
    },
    {
      levelClass: 'card-level-2',
      levelText: 'SEVİYE 2',
      badge: 'DIAMOND PRIVILEGE',
      name: 'SAPPHIRE ACCESS',
      sub: 'Safir Kristal',
      botLeft: 'Bonus: 2x',
      botRight: 'Gereken: $500',
      tierTag: 'PRESTİJ KARTI • KADEME 2',
      title: 'Sapphire Access',
      desc: 'Safir kaplama özel alaşımlı kart. Borsa ve Forex işlemlerinde komisyon avantajı ve 2 kat nakit akışı sağlar.',
      bonus: '2x Çarpan',
      req: '$500',
      credit: 'Bakiye x 3.0',
      perk: 'Hızlı Forex Girişi'
    },
    {
      levelClass: 'card-level-3',
      levelText: 'SEVİYE 3',
      badge: 'LEAF SOVEREIGN',
      name: 'EMERALD TIER',
      sub: 'Zümrüt Yeşili',
      botLeft: 'Bonus: 4x',
      botRight: 'Gereken: $2,500',
      tierTag: 'PRESTİJ KARTI • KADEME 3',
      title: 'Emerald Tier',
      desc: 'Zümrüt yeşili kurumsal statü simgesi. Taksi filosu açılışlarında amortisman koruması ve 4 kat gelir çarpanı kazandırır.',
      bonus: '4x Çarpan',
      req: '$2,500',
      credit: 'Bakiye x 4.0',
      perk: 'Taksi Filo Koruması'
    },
    {
      levelClass: 'card-level-4',
      levelText: 'SEVİYE 4',
      badge: 'LION STEWARD',
      name: 'AMBER SPECIALIST',
      sub: '24K Altın Aslan',
      botLeft: 'Bonus: 8x',
      botRight: 'Gereken: $10,000',
      tierTag: 'PRESTİJ KARTI • KADEME 4',
      title: 'Amber Specialist',
      desc: '24 ayar altın işlemeli aslan armalı prestij kartı. Devasa gayrimenkul satın alımları ve bakiye x 5 kredi limitinin kapılarını açar.',
      bonus: '8x Çarpan',
      req: '$10,000',
      credit: 'Bakiye x 5.0',
      perk: 'Gayrimenkul Portföyü'
    },
    {
      levelClass: 'card-level-5',
      levelText: 'SEVİYE 5 • ZİRVE',
      badge: 'SOVEREIGN BLACK',
      name: 'BLACK PROTOCOL',
      sub: 'Dünyanın Patronu',
      botLeft: 'Bonus: 16x + IPO',
      botRight: 'Gereken: $50,000',
      tierTag: 'PRESTİJ KARTI • ZİRVE KADEME',
      title: 'Black Protocol',
      desc: 'Yeryüzünün en zengin forbes elitlerine verilen efsanevi siyah kart. Şirketlerini borsada halka arz etme ve Forbes 1. sırasına oturma hakkı verir.',
      bonus: '16x + IPO',
      req: '$50,000',
      credit: 'Sınırsız Holding Kredisi',
      perk: 'Forbes #1 Tahtı'
    }
  ];

  let currentVipIndex = 0;
  const vipCardPreview = document.getElementById('vipCardPreview');
  const vcLevel = document.getElementById('vcLevel');
  const vcBadge = document.getElementById('vcBadge');
  const vcName = document.getElementById('vcName');
  const vcSub = document.getElementById('vcSub');
  const vcBottomLeft = document.getElementById('vcBottomLeft');
  const vcBottomRight = document.getElementById('vcBottomRight');
  const vipTierTag = document.getElementById('vipTierTag');
  const vipTitle = document.getElementById('vipTitle');
  const vipDesc = document.getElementById('vipDesc');
  const vipBonus = document.getElementById('vipBonus');
  const vipReq = document.getElementById('vipReq');
  const vipCredit = document.getElementById('vipCredit');
  const vipPerk = document.getElementById('vipPerk');
  const vipCounter = document.getElementById('vipCounter');
  const vipTabs = document.querySelectorAll('#vipTabs .widget-tab');
  const vipPrevBtn = document.getElementById('vipPrevBtn');
  const vipNextBtn = document.getElementById('vipNextBtn');

  function renderVip(index) {
    if (index < 0) index = VIP_DATA.length - 1;
    if (index >= VIP_DATA.length) index = 0;
    currentVipIndex = index;
    const item = VIP_DATA[index];

    if (vipCardPreview) {
      vipCardPreview.style.opacity = '0';
      vipCardPreview.style.transform = 'scale(0.95)';
      setTimeout(() => {
        vipCardPreview.className = `ingame-card-item ${item.levelClass}`;
        if (vcLevel) vcLevel.textContent = item.levelText;
        if (vcBadge) vcBadge.textContent = item.badge;
        if (vcName) vcName.textContent = item.name;
        if (vcSub) vcSub.textContent = item.sub;
        if (vcBottomLeft) vcBottomLeft.textContent = item.botLeft;
        if (vcBottomRight) vcBottomRight.textContent = item.botRight;

        if (vipTierTag) vipTierTag.textContent = item.tierTag;
        if (vipTitle) vipTitle.textContent = item.title;
        if (vipDesc) vipDesc.textContent = item.desc;
        if (vipBonus) vipBonus.textContent = item.bonus;
        if (vipReq) vipReq.textContent = item.req;
        if (vipCredit) vipCredit.textContent = item.credit;
        if (vipPerk) vipPerk.textContent = item.perk;
        if (vipCounter) vipCounter.textContent = `${index + 1} / ${VIP_DATA.length}`;

        vipTabs.forEach((t, i) => {
          if (i === index) {
            t.classList.add('active');
          } else {
            t.classList.remove('active');
          }
        });

        vipCardPreview.style.opacity = '1';
        vipCardPreview.style.transform = 'scale(1)';
      }, 140);
    }
  }

  if (vipTabs.length > 0) {
    vipTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const idx = parseInt(tab.getAttribute('data-index'));
        renderVip(idx);
      });
    });
  }

  if (vipPrevBtn) {
    vipPrevBtn.addEventListener('click', () => {
      renderVip(currentVipIndex - 1);
    });
  }
  if (vipNextBtn) {
    vipNextBtn.addEventListener('click', () => {
      renderVip(currentVipIndex + 1);
    });
  }
});
