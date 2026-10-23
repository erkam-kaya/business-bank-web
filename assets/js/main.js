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

  // 7. Fleet Carousel & Category Filter
  const fleetTabs = document.querySelectorAll('#fleetTabs .tab-filter-btn');
  const fleetTrack = document.getElementById('fleetTrack');
  const fleetPrevBtn = document.getElementById('fleetPrevBtn');
  const fleetNextBtn = document.getElementById('fleetNextBtn');

  if (fleetTabs && fleetTrack) {
    fleetTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        fleetTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.getAttribute('data-filter');
        const cars = fleetTrack.querySelectorAll('.car-card');

        cars.forEach(car => {
          if (filter === 'all' || car.getAttribute('data-category') === filter) {
            car.classList.remove('hidden');
          } else {
            car.classList.add('hidden');
          }
        });

        fleetTrack.scrollTo({ left: 0, behavior: 'smooth' });
      });
    });

    if (fleetPrevBtn) {
      fleetPrevBtn.addEventListener('click', () => {
        fleetTrack.scrollBy({ left: -330, behavior: 'smooth' });
      });
    }
    if (fleetNextBtn) {
      fleetNextBtn.addEventListener('click', () => {
        fleetTrack.scrollBy({ left: 330, behavior: 'smooth' });
      });
    }
  }

  // 8. VIP Cards Carousel & Tier Filter
  const vipTabs = document.querySelectorAll('#vipTabs .tab-filter-btn');
  const vipTrack = document.getElementById('vipTrack');
  const vipPrevBtn = document.getElementById('vipPrevBtn');
  const vipNextBtn = document.getElementById('vipNextBtn');

  if (vipTabs && vipTrack) {
    vipTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        vipTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.getAttribute('data-filter');
        const cards = vipTrack.querySelectorAll('.ingame-card-item');

        cards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-tier') === filter) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });

        vipTrack.scrollTo({ left: 0, behavior: 'smooth' });
      });
    });

    if (vipPrevBtn) {
      vipPrevBtn.addEventListener('click', () => {
        vipTrack.scrollBy({ left: -270, behavior: 'smooth' });
      });
    }
    if (vipNextBtn) {
      vipNextBtn.addEventListener('click', () => {
        vipTrack.scrollBy({ left: 270, behavior: 'smooth' });
      });
    }
  }
});
