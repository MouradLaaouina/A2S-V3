// ================================================
// JavaScript pour MARQUE-PARTENAIRE
// ================================================

// Product data
    const gammes = [
      {
        name: 'BABÉ',
        country: 'Espagne',
        flag: '🇪🇸',
        instagram: 'https://www.instagram.com/babelaboratorios.maroc/',
        logos: ['../images/9.png'],
        logoHeight: 64,
        description: "Marque dermocosmétique espagnole offrant des solutions complètes pour tous les types de peaux et tous les âges. Reconnue pour son excellent rapport qualité-prix et ses formules testées dermatologiquement."
      },
      {
        name: 'Sensilis',
        country: 'Espagne',
        flag: '🇪🇸',
        instagram: 'https://www.instagram.com/sensilis.maroc/',
        logos: ['../images/10.png'],
        logoHeight: 70,
        description: "Marque dermocosmétique espagnole haut de gamme alliant efficacité dermatologique et plaisir sensoriel. Spécialisée dans les soins anti-âge, hydratants et correcteurs avec des textures sophistiquées et des parfums délicats."
      },
      {
        name: 'Buccotherm',
        country: 'France',
        flag: '🇫🇷',
        instagram: 'https://www.instagram.com/buccotherm.maroc.a2s/',
        logos: ['../images/2.png'],
        logoHeight: 60,
        description: "Gamme française de soins bucco-dentaires à base d'eau thermale de Castéra-Verduzan. Propose des dentifrices, bains de bouche et soins pour gencives sensibles, adaptés à toute la famille."
      },
      {
        name: 'Casmara',
        country: 'Espagne',
        flag: '🇪🇸',
        instagram: 'https://www.instagram.com/casmara_oficial/',
        logos: ['../images/3.png'],
        logoHeight: 60,
        description: "Marque espagnole professionnelle spécialisée dans les masques peel-off et les protocoles de soins en cabine. Reconnue pour ses traitements innovants combinant efficacité et expérience sensorielle luxueuse."
      },
      {
        name: 'CASTERA',
        country: 'France',
        flag: '🇫🇷',
        instagram: 'https://www.instagram.com/castera.maroc.a2s/',
        logos: ['../images/5.png'],
        logoHeight: 58,
        description: "Gamme française de soins capillaires à base d'eau thermale de Castéra-Verduzan. Propose des shampoings et traitements pour cuirs chevelus sensibles, irrités ou sujets aux pellicules."
      },
      {
        name: 'Florame',
        country: 'France',
        flag: '🇫🇷',
        instagram: 'https://www.instagram.com/florame.a2s.maroc/',
        logos: ['../images/6.png'],
        logoHeight: 62,
        description: "Marque française pionnière en aromathérapie et cosmétique bio certifiée. Spécialisée dans les huiles essentielles, huiles végétales et soins naturels respectueux de l'environnement."
      }
    ];

    const slidesEl = document.getElementById('slides');

    // Instagram icon SVG
    const instagramIcon = `<svg viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`;

    // Generate card HTML
    function cardTemplate(g) {
      const logo = (g.logos && g.logos[0]) || 'images/placeholder.png';
      const h = g.logoHeight || 64;
      const instaClass = (g.instagram && g.instagram !== '#') ? 'insta-btn' : 'insta-btn is-disabled';
      const instaTitle = (g.instagram && g.instagram !== '#') ? `Aller sur Instagram de ${g.name}` : 'Instagram bientôt disponible';
      const instaHref = (g.instagram && g.instagram !== '#') ? g.instagram : '#';
      const filterClass = g.country === 'France' ? 'france' : 'espagne';

      return `
        <article class="brand-card" data-country="${filterClass}">
          <div class="card-logo-area">
            <img class="card-logo" src="${logo}" alt="${g.name}" style="height:${h}px">
          </div>
          <div class="card-content">
            <div class="card-header">
              <div class="card-info">
                <h3 class="card-title">${g.name}</h3>
                <div class="card-meta">
                  <span class="card-flag">${g.flag}</span>
                  <span>${g.country}</span>
                </div>
              </div>
              <a class="${instaClass}" href="${instaHref}" target="_blank" rel="noopener" aria-label="${instaTitle}" title="${instaTitle}">
                ${instagramIcon}
              </a>
            </div>
            <p class="card-desc">${g.description}</p>
          </div>
        </article>
      `;
    }

    // Render all cards
    const gridEl = document.getElementById('brandGrid');
    let currentFilter = 'all';

    function render() {
      const filtered = currentFilter === 'all' 
        ? gammes 
        : gammes.filter(g => {
            if (currentFilter === 'france') return g.country === 'France';
            if (currentFilter === 'espagne') return g.country === 'Espagne';
            return true;
          });
      
      gridEl.innerHTML = filtered.map(cardTemplate).join('');
      
      // Stagger animation
      const cards = gridEl.querySelectorAll('.brand-card');
      cards.forEach((card, i) => {
        card.style.animationDelay = `${i * 0.08}s`;
      });
    }

    // Filter functionality
    const filterChips = document.querySelectorAll('.filter-chip');
    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentFilter = chip.getAttribute('data-filter');
        render();
      });
    });

    // Initialize
    render();

    // Theme disabled: enforce light mode only
    (function() {
      const root = document.documentElement;
      function setTheme(mode) { root.setAttribute('data-theme', 'light'); }
      setTheme('light');
    })();

(function(){
      const el = document.getElementById('year');
      if (el) el.textContent = new Date().getFullYear();
    })();

// Theme controlled globally via js/theme.js

  // Navigation dropdown functionality
  (function() {
    const items = document.querySelectorAll('.nav__item');
    items.forEach((li) => {
      const btn = li.querySelector('button.nav__btn');
      const drop = li.querySelector('.dropdown');
      if (!btn || !drop) return;

      let closeTO;
      const open = () => { li.setAttribute('aria-expanded', 'true'); btn.setAttribute('aria-expanded', 'true'); };
      const close = () => { li.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-expanded', 'false'); };

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        (li.getAttribute('aria-expanded') === 'true') ? close() : open();
      });
      li.addEventListener('mouseenter', open);
      li.addEventListener('mouseleave', () => { closeTO = setTimeout(close, 80); });
      drop.addEventListener('mouseenter', () => clearTimeout(closeTO));
      document.addEventListener('click', (e) => { if (!li.contains(e.target)) close(); });
      btn.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
    });
  })();

  // Mobile panel functionality
  (function() {
    const burger = document.getElementById('burger');
    const panel = document.getElementById('panel');
    const sections = panel?.querySelectorAll('.panel__section');

    function setOpen(open) {
      if (!panel) return;
      panel.hidden = !open;
      panel.classList.toggle('panel--open', open);
      burger?.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    }

    burger?.addEventListener('click', () => setOpen(!(panel?.classList.contains('panel--open'))));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && panel?.classList.contains('panel--open')) setOpen(false); });
    panel?.addEventListener('click', (e) => { if (e.target === panel) setOpen(false); });

    sections?.forEach(sec => {
      const trigger = sec.querySelector('.panel__trigger');
      trigger?.addEventListener('click', () => {
        const open = sec.getAttribute('aria-expanded') === 'true';
        sec.setAttribute('aria-expanded', String(!open));
      });
    });

    panel?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  })();

  // Update nav height CSS variable
  (function() {
    const upd = () => {
      const nav = document.querySelector('.nav');
      const h = nav ? nav.offsetHeight : 72;
      document.documentElement.style.setProperty('--nav-h', h + 'px');
    };
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', upd, { once: true });
    } else {
      upd();
    }
    window.addEventListener('resize', upd, { passive: true });
    window.addEventListener('load', upd);
  })();

