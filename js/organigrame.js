// ================================================
// JavaScript pour ORGANIGRAME
// ================================================

// Configuration Tailwind (préfixe 'tw-' pour éviter les collisions)
    tailwind = { config: {
      prefix: 'tw-',
      corePlugins: { preflight: false },
      theme: {
        extend: {
          colors: { brand: { DEFAULT: '#2f6b2f', dark: '#255825', light: '#e8f5ee' } }
        }
      }
    }};

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

// --- Orgchart zoom/fit ---
    document.addEventListener('DOMContentLoaded', function(){
      const viewport = document.querySelector('.orgchart');
      const canvasWrap = document.querySelector('.oc-canvas');
      const canvas = canvasWrap ? canvasWrap.querySelector('.oc') : null;
      const tools = document.querySelector('.oc-tools');
      if (!viewport || !canvasWrap || !canvas) return;

      let scale = 1, sw = 0, sh = 0;

      function measure(){
        const prev = scale; scale = 1; canvas.style.transform = 'scale(1)';
        sw = canvas.scrollWidth; sh = canvas.scrollHeight; scale = prev;
      }

      function apply(){
        canvas.style.transform = `scale(${scale})`;
        canvasWrap.style.width = (sw * scale) + 'px';
        canvasWrap.style.height = (sh * scale) + 'px';
      }

      function fitAll(){
        measure();
        const vw = viewport.clientWidth - 24;
        const vh = Math.max(viewport.clientHeight, window.innerHeight - 140);
        const s = Math.min(vw / sw, vh / sh, 1);
        scale = Math.max(0.3, Math.min(s, 1));
        apply();
      }

      function zoom(delta){
        scale = Math.max(0.3, Math.min(scale + delta, 1.5));
        apply();
      }

      fitAll();
      window.addEventListener('resize', fitAll);

      tools.addEventListener('click', (e)=>{
        const btn = e.target.closest('.oc-btn'); if (!btn) return;
        const a = btn.getAttribute('data-action');
        if (a === 'fit') fitAll();
        else if (a === 'reset'){ scale = 1; apply(); }
        else if (a === 'plus') zoom(0.1);
        else if (a === 'minus') zoom(-0.1);
      });
    });

(function(){
      const el = document.getElementById('year');
      if (el) el.textContent = new Date().getFullYear();
    })();

