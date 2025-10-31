// ================================================
// JavaScript pour CARRIERES
// ================================================

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

(function(){
      const el = document.getElementById('year');
      if (el) el.textContent = new Date().getFullYear();
    })();

// WAIT FOR DOM TO BE READY
    document.addEventListener('DOMContentLoaded', function() {
      // CHECK FOR REDUCED MOTION PREFERENCE
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // INTERSECTION OBSERVER FOR REVEAL ANIMATIONS
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, observerOptions);

      // OBSERVE ALL REVEAL ELEMENTS
      document.querySelectorAll('.reveal, .car-section').forEach(el => {
        observer.observe(el);
      });

      // QUICK ACTION BUTTON
      const quickAction = document.getElementById('quickAction');
      const quickBtn = quickAction.querySelector('.quick-action-btn');
      
      // SHOW/HIDE QUICK ACTION BUTTON ON SCROLL
      let scrollTimeout;
      window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        
        if (window.scrollY > 300) {
          quickAction.classList.add('visible');
        } else {
          quickAction.classList.remove('visible');
        }
      });

      // SCROLL TO TOP ON CLICK
      quickBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });

      // GSAP ANIMATIONS (IF AVAILABLE AND MOTION NOT REDUCED)
      if (!prefersReducedMotion && window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        // PARALLAX EFFECT ON HERO
        gsap.to('.car-hero::before', {
          rotation: 360,
          duration: 20,
          repeat: -1,
          ease: 'none'
        });

        // FLOATING ANIMATION FOR ILLUSTRATION
        gsap.to('.car-illu', {
          y: -15,
          duration: 3,
          ease: 'power1.inOut',
          yoyo: true,
          repeat: -1
        });

        // CARDS STAGGER ANIMATION
        gsap.from('.car-chip', {
          scrollTrigger: {
            trigger: '.car-chips',
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          scale: 0.8,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.7)'
        });

        // LIST ITEMS ANIMATION
        gsap.from('.car-list li', {
          scrollTrigger: {
            trigger: '.car-list',
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          x: -20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.15,
          ease: 'power2.out'
        });
      }

      // ADD SMOOTH REVEAL TO SECTIONS
      const sections = document.querySelectorAll('.car-section');
      sections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.1}s`;
      });

      // ENHANCED LINK HOVER EFFECT
      document.querySelectorAll('a[href^="mailto"]').forEach(link => {
        link.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-2px)';
        });
        link.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0)';
        });
      });

      // ADD RIPPLE EFFECT TO CHIPS
      document.querySelectorAll('.car-chip').forEach(chip => {
        chip.addEventListener('click', function(e) {
          const ripple = document.createElement('span');
          const rect = this.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height);
          const x = e.clientX - rect.left - size / 2;
          const y = e.clientY - rect.top - size / 2;
          
          ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(47, 107, 47, 0.3);
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
          `;
          
          this.appendChild(ripple);
          setTimeout(() => ripple.remove(), 600);
        });
      });

      // ADD RIPPLE ANIMATION
      const style = document.createElement('style');
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);

      // PERFORMANCE: LAZY LOAD GSAP IF NOT ALREADY LOADED
      if (!window.gsap) {
        console.log('GSAP animations disabled - library not loaded');
      }
    });

