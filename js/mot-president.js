// ================================================
// JavaScript pour MOT-PRESIDENT
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
    const root = document.documentElement;
    const META_THEME = document.querySelector('meta[name="theme-color"]');
    const BASE_TZ = root.getAttribute('data-theme-tz') || 'Africa/Casablanca';
    const DAY_START = 7;   // 07:00
    const NIGHT_START = 22; // 22:00
    const LS_KEY = 'theme-override';

    function setTheme(mode){
      // Dark mode disabled: always enforce light
      root.setAttribute('data-theme', 'light');
      if (META_THEME) META_THEME.setAttribute('content', '#2f6b2f');
    }
    function getHourInTZ(tz, date = new Date()){
      const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', hour12: false });
      return Number(fmt.format(date));
    }
    function applyThemeByTZ(){
      const h = getHourInTZ(BASE_TZ);
      const isDay = (h >= DAY_START && h < NIGHT_START);
      setTheme(isDay ? 'light' : 'dark');
    }
    function apply(){
      let override = null;
      try { override = localStorage.getItem(LS_KEY); } catch(e) { override = null; }
      if (override === 'light' || override === 'dark') { setTheme(override); return; }
      applyThemeByTZ();
    }
    apply();
    (function scheduleMinuteAligned(){
      const now = new Date();
      const delay = (60 - now.getSeconds()) * 1000 - now.getMilliseconds() + 50;
      setTimeout(()=>{ apply(); setInterval(apply, 60*1000); }, Math.max(250, delay));
    })();
    document.addEventListener('visibilitychange', ()=> { if(!document.hidden) apply(); });
    window.clearThemeOverride = function(){ try { localStorage.removeItem(LS_KEY); } catch(e) {} apply(); };
  })();

(function(){
      const el = document.getElementById('year');
      if (el) el.textContent = new Date().getFullYear();
    })();

