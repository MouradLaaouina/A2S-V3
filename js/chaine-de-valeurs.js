// ================================================
// JavaScript pour CHAINE-DE-VALEURS
// ================================================

(function () {
        try {
          var root = document.documentElement;
          var hour = new Date().getHours();
          var autoDark = (hour >= 20 || hour < 6);
          var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
          if (!root.classList.contains('dark') && (autoDark || prefersDark)) {
            root.classList.add('dark');
          }
        } catch(e) {}
      })();

(function() {
        const root = document.documentElement;
        // Dark mode disabled: always enforce light
        function setTheme(mode) { root.setAttribute('data-theme', 'light'); }
        setTheme('light');
      })();

      (function() {
        const items = document.querySelectorAll('.nav__item');
        items.forEach((li) => {
          const btn = li.querySelector('button.nav__btn');
          const drop = li.querySelector('.dropdown');
          if (!btn || !drop) return;
          let closeTO;
          const open = () => { li.setAttribute('aria-expanded', 'true'); btn.setAttribute('aria-expanded', 'true'); };
          const close = () => { li.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-expanded', 'false'); };
          btn.addEventListener('click', (e) => { e.stopPropagation(); (li.getAttribute('aria-expanded') === 'true') ? close() : open(); });
          li.addEventListener('mouseenter', open);
          li.addEventListener('mouseleave', () => { closeTO = setTimeout(close, 80); });
          drop.addEventListener('mouseenter', () => clearTimeout(closeTO));
          document.addEventListener('click', (e) => { if (!li.contains(e.target)) close(); });
          btn.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
        });
      })();

      (function() {
        const burger = document.getElementById('burger');
        const panel = document.getElementById('panel');
        const sections = panel?.querySelectorAll('.panel__section');
        function setOpen(open) { if (!panel) return; panel.hidden = !open; panel.classList.toggle('panel--open', open); burger?.setAttribute('aria-expanded', String(open)); document.body.style.overflow = open ? 'hidden' : ''; }
        burger?.addEventListener('click', () => setOpen(!(panel?.classList.contains('panel--open'))));
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && panel?.classList.contains('panel--open')) setOpen(false); });
        panel?.addEventListener('click', (e) => { if (e.target === panel) setOpen(false); });
        sections?.forEach(sec => { const trigger = sec.querySelector('.panel__trigger'); trigger?.addEventListener('click', () => { const open = sec.getAttribute('aria-expanded') === 'true'; sec.setAttribute('aria-expanded', String(!open)); }); });
        panel?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
      })();

      (function() {
        const upd = () => { const nav = document.querySelector('.nav'); const h = nav ? nav.offsetHeight : 72; document.documentElement.style.setProperty('--nav-h', h + 'px'); };
        if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', upd, { once: true }); } else { upd(); }
        window.addEventListener('resize', upd, { passive: true });
        window.addEventListener('load', upd);
      })();

(function(){
        const el = document.getElementById('year');
        if (el) el.textContent = new Date().getFullYear();
      })();

