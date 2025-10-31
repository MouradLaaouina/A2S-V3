// ================================================
// JavaScript pour CONTACT
// ================================================

(function(){
      const el = document.getElementById('year');
      if (el) el.textContent = new Date().getFullYear();
    })();

// Customizable Variables
    const waNumber = "212668173690";
    const mailTo = "mourad.laaouina@gmail.com";
    const tgUser = "Mrlaa12";
    let clientsServis = 124;

    // Dynamic Welcome Message Based on Time
    function bienvenue() {
      const h = new Date().getHours();
      let result = "👋 ";
      if (h < 12) result += "Bonjour !";
      else if (h < 18) result += "Bon après-midi !";
      else result += "Bonsoir !";
      document.getElementById('welcomeBubble').textContent = result + " Choisissez comment nous écrire.";
    }
    bienvenue();

    // Live Clock and Response Time Update
    function updateTime() {
      const now = new Date();
      const hh = now.getHours().toString().padStart(2, '0');
      const mm = now.getMinutes().toString().padStart(2, '0');
      document.getElementById('liveTime').textContent = `${hh}:${mm}`;
      document.getElementById('responseTime').textContent = "Dernière réponse en moins de " + (Math.floor(Math.random() * 4) + 2) + " min";
    }
    updateTime();
    setInterval(updateTime, 15000);

    // Dynamic Client Stats Update
    function updateStats() {
      let target = clientsServis + Math.floor(Math.random() * 7);
      let el = document.getElementById('clientsCount');
      let count = clientsServis;
      const intv = setInterval(() => {
        if (count < target) {
          count++;
          el.textContent = '+ ' + count + ' clients servis cette semaine';
        } else {
          clearInterval(intv);
        }
      }, 45);
    }
    updateStats();
    setInterval(updateStats, 21000);

    // Mode Selection and Form Switching
    const btns = {
      wa: document.getElementById('wa-btn'),
      mail: document.getElementById('mail-btn'),
      tg: document.getElementById('tg-btn')
    };
    const forms = {
      wa: document.getElementById('wa-form'),
      mail: document.getElementById('mail-form'),
      tg: document.getElementById('tg-form')
    };

    function showForm(mode) {
      Object.values(btns).forEach(b => b.classList.remove('active'));
      Object.values(forms).forEach(f => f.classList.remove('show'));
      btns[mode].classList.add('active');
      forms[mode].classList.add('show');
      const bgMode = (mode === 'mail') ? 'email' : mode;
      document.body.setAttribute('data-mode', bgMode);
    }

    // Initialize Visual State
    document.body.setAttribute('data-mode', 'wa');
    btns.wa.onclick = () => showForm('wa');
    btns.mail.onclick = () => showForm('mail');
    btns.tg.onclick = () => showForm('tg');

    // Confetti Effect on Send
    function fireConfetti() {
      confetti({
        particleCount: 48,
        spread: 60,
        origin: { y: 0.6 }
      });
    }

    function sentEffect(btn) {
      btn.classList.add('sent');
      setTimeout(() => {
        btn.classList.remove('sent');
      }, 520);
    }

    // Form Submissions
    forms.wa.onsubmit = function(e) {
      e.preventDefault();
      const nom = document.getElementById('wa-name').value.trim();
      const msg = document.getElementById('wa-msg').value.trim();
      if (!msg) return;
      const final = encodeURIComponent((nom ? ("Je m'appelle " + nom + ". ") : "") + msg);
      window.open("https://wa.me/" + waNumber + "?text=" + final, "_blank");
      sentEffect(forms.wa.querySelector(".send-btn"));
      fireConfetti();
      document.getElementById('wa-ok').textContent = "Merci, votre message est parti ! ✓";
      setTimeout(() => {
        document.getElementById('wa-ok').textContent = "";
      }, 1800);
      forms.wa.reset();
    };

    forms.mail.onsubmit = function(e) {
      e.preventDefault();
      const nom = document.getElementById('mail-name').value.trim();
      const msg = document.getElementById('mail-msg').value.trim();
      if (!msg) return;
      const subject = encodeURIComponent("Contact ultra dynamique");
      const body = encodeURIComponent((nom ? ("Je m'appelle " + nom + ". ") : "") + msg);
      window.open("mailto:" + mailTo + "?subject=" + subject + "&body=" + body, "_blank");
      sentEffect(forms.mail.querySelector(".send-btn"));
      fireConfetti();
      document.getElementById('mail-ok').textContent = "Merci, votre message est parti ! ✓";
      setTimeout(() => {
        document.getElementById('mail-ok').textContent = "";
      }, 1800);
      forms.mail.reset();
    };

    forms.tg.onsubmit = function(e) {
      e.preventDefault();
      const nom = document.getElementById('tg-name').value.trim();
      const msg = document.getElementById('tg-msg').value.trim();
      if (!msg) return;
      window.open("https://t.me/" + tgUser, "_blank");
      sentEffect(forms.tg.querySelector(".send-btn"));
      fireConfetti();
      document.getElementById('tg-ok').textContent = "Ouverture du chat Telegram ! ✓";
      setTimeout(() => {
        document.getElementById('tg-ok').textContent = "";
      }, 1800);
      forms.tg.reset();
    };

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

