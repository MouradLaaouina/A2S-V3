// ================================================
// JavaScript pour HISTORIQUE
// ================================================

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

document.addEventListener('DOMContentLoaded', function() {
      // Navigation par puces
      document.querySelectorAll('.tl-chip').forEach(function(btn) {
        btn.addEventListener('click', function() {
          var sel = btn.getAttribute('data-target');
          var el = sel ? document.querySelector(sel) : null;
          if (!el) return;
          const y = el.getBoundingClientRect().top + window.scrollY - 12;
          window.scrollTo({ top: y, behavior: 'smooth' });
          document.querySelectorAll('.tl-chip').forEach(c => c.removeAttribute('aria-current'));
          btn.setAttribute('aria-current', 'true');
        });
      });

      // Animation au défilement
      var items = Array.from(document.querySelectorAll('.tl-item'));
      
      // Appliquer l'alternance uniquement sur desktop
      function applyAlternateLayout() {
        if (window.innerWidth >= 1024) {
          items.forEach(function(it, idx) {
            if (idx % 2 === 1) it.classList.add('alt-right');
            else it.classList.remove('alt-right');
          });
        } else {
          // Sur mobile/tablette, supprimer l'alternance
          items.forEach(function(it) {
            it.classList.remove('alt-right');
          });
        }
      }
      
      // Appliquer au chargement
      applyAlternateLayout();
      
      // Réappliquer en cas de redimensionnement
      window.addEventListener('resize', applyAlternateLayout);
      
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function(entries) {
          entries.forEach(function(e) {
            if (e.isIntersecting) {
              e.target.classList.add('visible');
              io.unobserve(e.target);
            }
          });
        }, { 
          threshold: 0.15, 
          rootMargin: '0px 0px -10% 0px' 
        });
        items.forEach(function(it) { io.observe(it); });
      } else {
        items.forEach(function(it) { it.classList.add('visible'); });
      }
    });

(function(){
      const el = document.getElementById('year');
      if (el) el.textContent = new Date().getFullYear();
    })();

