// ================================================
// EXTRACTED AND OPTIMIZED JAVASCRIPT FROM INDEX.HTML
// ================================================


// ========== SCRIPT BLOCK 3 ==========
// ========================================
  // NOTRE IMPACT NATUREL - SIMPLIFIED VERSION
  // ========================================

  (function () {
    'use strict';

    // ========================================
    // INTERSECTION OBSERVER FOR IMPACT SECTION
    // ========================================

    const observeImpactElements = () => {
      const elements = document.querySelectorAll('[data-impact-animate]');
      
      if (!elements.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const delay = entry.target.dataset.impactDelay || 0;
              setTimeout(() => {
                entry.target.classList.add('animate-in');
                
                // Trigger green counter animations if this is an impact card
                if (entry.target.classList.contains('impact-card')) {
                  animateGreenCounter(entry.target);
                }
              }, parseInt(delay));
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.15,
          rootMargin: '0px 0px -50px 0px',
        }
      );

      elements.forEach((el) => observer.observe(el));
    };

    // ========================================
    // ANIMATED GREEN COUNTER
    // ========================================

    const animateGreenCounter = (card) => {
      const statValue = card.querySelector('.stat-value[data-green-count]');
      if (!statValue) return;
      
      const target = parseInt(statValue.dataset.greenCount || 0);
      const duration = 2000; // 2 seconds
      const startTime = performance.now();
      const startValue = 0;
      
      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function: ease-out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(startValue + (target - startValue) * easeOut);
        
        statValue.textContent = currentValue;
        
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          statValue.textContent = target;
        }
      };
      
      requestAnimationFrame(updateCounter);
    };

    // ========================================
    // CARD HOVER EFFECTS
    // ========================================

    const initCardEffects = () => {
      const cards = document.querySelectorAll('.impact-card');
      
      cards.forEach((card) => {
        // Add click effect
        card.addEventListener('click', (e) => {
          createGreenRipple(e, card);
        });
        
        // Keyboard accessibility
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'article');
        
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            card.click();
          }
        });
      });
    };

    // ========================================
    // GREEN RIPPLE EFFECT
    // ========================================

    const createGreenRipple = (event, element) => {
      const ripple = document.createElement('span');
      const rect = element.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(16, 185, 129, 0.5)';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'greenRipple 600ms ease-out';
      ripple.style.pointerEvents = 'none';
      ripple.style.zIndex = '100';

      element.style.position = 'relative';
      element.style.overflow = 'hidden';
      element.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    };

    // Add green ripple animation to document
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
      @keyframes greenRipple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(rippleStyle);

    // ========================================
    // INITIALIZATION
    // ========================================

    const initImpact = () => {
      // Check if impact section exists
      if (!document.querySelector('.impact-section')) {
        return;
      }
      
      // Initialize all impact features
      observeImpactElements();
      initCardEffects();
      
      console.log('✨ Notre Impact Naturel Section Initialized');
    };

    // Start when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initImpact);
    } else {
      initImpact();
    }
  })();


// ========== SCRIPT BLOCK 4 ==========
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


// ========== SCRIPT BLOCK 5 ==========
// Pause 3D rings when tab is hidden for performance
    const rings = document.querySelectorAll('.orbit__ring');
    if(rings.length) {
      document.addEventListener('visibilitychange', () => {
        rings.forEach(ring => {
          ring.style.animationPlayState = document.hidden ? 'paused' : 'running';
        });
      });
    }

    // Add interactive behavior to chips
    document.querySelectorAll('.chip').forEach(chip => {
      chip.addEventListener('click', function() {
        // Add your custom behavior here
        console.log('Clicked on:', this.textContent.trim());
        
        // Example: highlight the clicked chip
        this.style.transform = this.style.transform + ' scale(1.2)';
        setTimeout(() => {
          this.style.transform = this.style.transform.replace(' scale(1.2)', '');
        }, 500);
      });
    });


// ========== SCRIPT BLOCK 6 ==========
(function(){
      const el = document.getElementById('year');
      if (el) el.textContent = new Date().getFullYear();
    })();


// ========== SCRIPT BLOCK 7 ==========
// ===================== THÈME AUTO AVEC CONVERSION DE FUSEAU =====================
  (function(){
    const root = document.documentElement;
    const META_THEME = document.querySelector('meta[name="theme-color"]');

    // Fuseau de référence pour la fenêtre 07:00–22:00 (modifiable via data-theme-tz sur <html>)
    const BASE_TZ = root.getAttribute('data-theme-tz') || 'Africa/Casablanca';
    // Fenêtre de jour (heures incluses/exclues dans le fuseau de référence)
    const DAY_START = 7;   // 07:00
    const NIGHT_START = 22; // 22:00

    function setTheme(mode){
      // Dark mode disabled: always enforce light
      root.setAttribute('data-theme', 'light');
      if (META_THEME) META_THEME.setAttribute('content', '#2f6b2f');
    }

    // Récupère l'heure courante (0–23) **dans un fuseau donné**
    function getHourInTZ(tz, date = new Date()){
      // format "HH" en 24h dans le tz cible
      const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', hour12: false });
      const h = fmt.format(date);
      return Number(h); // 0..23
    }

    function applyThemeByTZ(){
      const hourInBaseTZ = getHourInTZ(BASE_TZ);
      const isDay = (hourInBaseTZ >= DAY_START && hourInBaseTZ < NIGHT_START);
      setTheme(isDay ? 'light' : 'dark');
    }

    // Applique maintenant, puis vérifie régulièrement (chaque minute suffit et gère les changements d'heure)
    applyThemeByTZ();

    // Synchronise le premier tick sur la minute suivante pour lisser la mise à jour
    (function scheduleMinuteAligned(){
      const now = new Date();
      const delayToNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds() + 50;
      setTimeout(()=>{
        applyThemeByTZ();
        setInterval(applyThemeByTZ, 60 * 1000); // toutes les minutes
      }, Math.max(250, delayToNextMinute));
    })();

    // Réapplique quand l'onglet redevient visible
    document.addEventListener('visibilitychange', ()=> { if(!document.hidden){ applyThemeByTZ(); } });

    // Expose en console pour debug
    console.debug('[A2S] Thème auto avec fuseau:', { BASE_TZ, DAY_START, NIGHT_START });
  })();

  // ===================== SCROLL REVEAL =====================
  class ScrollAnimator {
    constructor(){
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      this.io = new IntersectionObserver((entries)=>{
        entries.forEach(e=>{
          if(e.isIntersecting){
            e.target.classList.add('fade-in-up');
            this.io.unobserve(e.target);
          }
        });
      },{ threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
      // .card-img retiré (Galerie supprimée)
      document.querySelectorAll('.kpi__card, .section__title').forEach(el => this.io.observe(el));
    }
  }

  // ===================== COMPTEURS (KPI) =====================
  class CounterAnimator {
    constructor(){
      const io = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
          if(entry.isIntersecting){
            this.animate(entry.target);
            io.unobserve(entry.target);
          }
        });
      },{threshold:.5});
      document.querySelectorAll('.kpi__value[data-target]').forEach(el => io.observe(el));
    }
    animate(el){
      const target = parseInt(el.getAttribute('data-target'),10);
      const prefix = el.getAttribute('data-prefix') || '';
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.textContent = prefix + target.toLocaleString('fr-FR');
        return;
      }
      const duration = Math.min(2000, Math.max(800, target > 5000 ? 1500 : 1000));
      let start = 0;
      const inc = target / (duration/16);
      (function step(){
        start += inc;
        if(start < target){
          el.textContent = prefix + Math.floor(start).toLocaleString('fr-FR');
          requestAnimationFrame(step);
        } else {
          el.textContent = prefix + target.toLocaleString('fr-FR');
        }
      })();
    }
  }

  // ===================== AIDES PERFORMANCE =====================
  function shuffleLogos(){
    const grid = document.getElementById('logoGrid');
    if(!grid) return;
    const featured = Array.from(grid.querySelectorAll('.logo-tile--featured'));
    const others = Array.from(grid.querySelectorAll('.logo-tile:not(.logo-tile--featured)'));
    others.sort(()=> Math.random() - .5).forEach(c => grid.appendChild(c));
    // Ensure featured stay at the top in their original order
    featured.slice().reverse().forEach(c => grid.insertBefore(c, grid.firstChild));
  }
  

  // ===================== INIT GLOBAL =====================
  document.addEventListener('DOMContentLoaded', ()=>{
    new ScrollAnimator();
    new CounterAnimator();
    // new Lightbox(); // supprimé
    shuffleLogos();
    
  });

  // Journalisation d'erreurs non bloquantes
  window.addEventListener('error', (e)=> console.error('Erreur JavaScript:', e.error || e.message));

  // ===================== NAVBAR — Desktop/Mobile =====================


// ========== SCRIPT BLOCK 8 ==========
/* ====== NOTRE UNIVERS – JS scoppé ====== */
  (function () {
    'use strict';

    const debounce = (func, wait) => {
      let t; return (...args) => { clearTimeout(t); t = setTimeout(() => func(...args), wait); };
    };

    // Initialise une instance dans un conteneur .nu-vars
    const initUniverse = (root) => {
      if (!root) return;

      // ----- Scroll reveal (data-animate) -----
      const observeElements = () => {
        const elements = root.querySelectorAll('[data-animate]');
        if (!elements.length) return;

        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const delay = entry.target.dataset.delay || 0;
              setTimeout(() => entry.target.classList.add('animate-in'), parseInt(delay));
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        elements.forEach((el) => observer.observe(el));
      };

      // ----- Images : état "loaded" pour masquer le shimmer -----
      const handleImageLoading = () => {
        root.querySelectorAll('.gallery-img').forEach((img) => {
          if (img.complete) img.classList.add('loaded');
          else img.addEventListener('load', () => img.classList.add('loaded'), { once: true });
        });
      };

      // ----- Ripple -----
      const createRipple = (event, container) => {
        const ripple = document.createElement('span');
        const rect = container.getBoundingClientRect();
               const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2 + window.scrollX;
        const y = event.clientY - rect.top - size / 2 + window.scrollY;
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.className = 'ripple';
        const holder = container.querySelector('.ripple-container');
        if (!holder) return;
        holder.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      };

      // ----- Lightbox -----
      const Lightbox = function () {
        this.overlay = root.querySelector('#nu-lightbox');
        this.img = this.overlay?.querySelector('.lightbox-img');
        this.closeBtn = this.overlay?.querySelector('.lightbox-close');
        this.textEl = this.overlay?.querySelector('.lightbox-text');
        this.typingTimer = null; this.typingSpeed = 45;
        this.init();
      };
      Lightbox.prototype.init = function () {
        this.closeBtn?.addEventListener('click', () => this.close());
        this.overlay?.addEventListener('click', (e) => {
          if (e.target === this.overlay || e.target.classList.contains('lightbox-backdrop')) this.close();
        });
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && this.overlay?.classList.contains('open')) this.close();
        });
      };
      Lightbox.prototype.typewriter = function (text) {
        if (!this.textEl) return;
        clearInterval(this.typingTimer);
        this.textEl.textContent = '';
        let i = 0;
        this.typingTimer = setInterval(() => {
          if (i < text.length) { this.textEl.textContent += text[i++]; }
          else { clearInterval(this.typingTimer); }
        }, this.typingSpeed);
      };
      Lightbox.prototype.open = function (src, caption) {
        if (!this.overlay || !this.img) return;
        this.img.classList.remove('animate-in');
        this.img.src = src;
        this.overlay.classList.add('open');
        this.overlay.setAttribute('aria-hidden', 'false');
        requestAnimationFrame(() => requestAnimationFrame(() => this.img.classList.add('animate-in')));
        if (caption) this.typewriter(caption);
        this.closeBtn?.focus();
        document.body.classList.add('nu-lightbox-open');
      };
      Lightbox.prototype.close = function () {
        if (!this.overlay) return;
        this.overlay.classList.remove('open');
        this.overlay.setAttribute('aria-hidden', 'true');
        this.img?.classList.remove('animate-in');
        setTimeout(() => {
          if (this.img) this.img.src = '';
          if (this.textEl) this.textEl.textContent = '';
        }, 250);
        clearInterval(this.typingTimer);
        document.body.classList.remove('nu-lightbox-open');
      };

      // ----- Cartes (clic + accessibilité) -----
      const initGalleryCards = (lightbox) => {
        root.querySelectorAll('.gallery-item').forEach((card) => {
          const cardInner = card.querySelector('.card-inner');
          const img = card.querySelector('.gallery-img');
          const descriptionEl = card.querySelector('.card-description');
          if (!cardInner || !img) return;

          const handleClick = (e) => {
            e.preventDefault();
            createRipple(e, cardInner);
            const caption = descriptionEl?.dataset?.lightboxText || img.alt || '';
            setTimeout(() => lightbox.open(img.src, caption), 100);
          };

          cardInner.addEventListener('click', handleClick);
          cardInner.setAttribute('tabindex', '0');
          cardInner.setAttribute('role', 'button');
          cardInner.setAttribute('aria-label', `Voir détails: ${img.alt}`);
          cardInner.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(e); }
          });
        });
      };

      // ----- Init -----
      observeElements();
      handleImageLoading();
      const lightbox = new Lightbox();
      initGalleryCards(lightbox);

      // Annonce SR
      const sr = document.createElement('div');
      sr.setAttribute('role', 'status'); sr.setAttribute('aria-live', 'polite');
      sr.className = 'sr-only';
      sr.textContent = 'La galerie Notre Univers est chargée et prête à être explorée';
      root.appendChild(sr);

      // Petite trace console
      // console.log('✨ Notre Univers initialisé');
    };

    // Autoinit pour chaque instance .nu-vars
    const initAll = () => document.querySelectorAll('.nu-vars[data-nu]').forEach(initUniverse);
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initAll);
    else initAll();
  })();


// ========== SCRIPT BLOCK 9 ==========
// ========================================
        // NOTRE ENGAGEMENT SECTION - INTERACTIVE ANIMATIONS
        // ========================================

        (function () {
            'use strict';

            // ========================================
            // INTERSECTION OBSERVER FOR ENGAGEMENT SECTION
            // ========================================

            const observeEngagementElements = () => {
                const elements = document.querySelectorAll('[data-engage-animate]');
                
                if (!elements.length) return;

                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                const delay = entry.target.dataset.engageDelay || 0;
                                setTimeout(() => {
                                    entry.target.classList.add('animate-in');
                                }, parseInt(delay));
                                observer.unobserve(entry.target);
                            }
                        });
                    },
                    {
                        threshold: 0.15,
                        rootMargin: '0px 0px -80px 0px',
                    }
                );

                elements.forEach((el) => observer.observe(el));
            };

            // ========================================
            // TEXT REVEAL ANIMATION
            // ========================================

            const initTextReveal = () => {
                const textElements = document.querySelectorAll('[data-text-animate]');
                
                if (!textElements.length) return;
                
                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                const element = entry.target;
                                
                                // Add staggered fade-in for paragraphs
                                if (element.classList.contains('block-description')) {
                                    const paragraphs = element.querySelectorAll('p');
                                    paragraphs.forEach((p, index) => {
                                        p.style.opacity = '0';
                                        p.style.transform = 'translateY(20px)';
                                        p.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                                        
                                        setTimeout(() => {
                                            p.style.opacity = '1';
                                            p.style.transform = 'translateY(0)';
                                        }, index * 150);
                                    });
                                }
                                
                                // Add underline animation for titles
                                if (element.classList.contains('block-title')) {
                                    element.style.opacity = '0';
                                    element.style.transform = 'translateX(-20px)';
                                    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                                    
                                    setTimeout(() => {
                                        element.style.opacity = '1';
                                        element.style.transform = 'translateX(0)';
                                    }, 100);
                                }
                                
                                observer.unobserve(element);
                            }
                        });
                    },
                    {
                        threshold: 0.2,
                        rootMargin: '0px 0px -50px 0px',
                    }
                );
                
                textElements.forEach((el) => observer.observe(el));
            };

            // ========================================
            // INITIALIZATION
            // ========================================

            const initEngagement = () => {
                // Check if engagement section exists
                if (!document.querySelector('.engagement-section')) {
                    return;
                }
                
                // Initialize all engagement features
                observeEngagementElements();
                initTextReveal();
                
                console.log('✨ Notre Engagement Section Initialized');
            };

            // Start when DOM is ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initEngagement);
            } else {
                initEngagement();
            }
        })();

