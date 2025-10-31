// ================================================
// JavaScript pour VISION-AFRIQUE
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

// Scroll Reveal Animation
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.scroll-reveal').forEach(el => {
            observer.observe(el);
        });

        // Animated Counters
        function animateCounter(element) {
            const target = parseInt(element.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    element.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target;
                }
            };

            updateCounter();
        }

        // Trigger counters when in view
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target.querySelector('[data-target]');
                    if (counter && !counter.classList.contains('counted')) {
                        counter.classList.add('counted');
                        animateCounter(counter);
                    }
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.stat-card').forEach(card => {
            counterObserver.observe(card);
        });

        // FAQ Accordion
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                const isActive = faqItem.classList.contains('active');
                
                // Close all other items
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Toggle current item
                if (!isActive) {
                    faqItem.classList.add('active');
                }
            });
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Parallax effect for hero
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero && scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Image loading fallback
        const royalImage = document.querySelector('.royal-image');
        if (royalImage) {
            royalImage.addEventListener('error', function() {
                this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDQwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjMDY1RjQ2Ii8+CjxwYXRoIGQ9Ik0yMDAgMjUwTDI1MCAzMDBMMzAwIDI1MEwyNTAgMjAwTDIwMCAyNTBaIiBmaWxsPSIjRDU5NzA2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMzUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0Ij5TYSBNYWplc3TDqSBsZSBSb2kgTW9oYW1tZWQgVkk8L3RleHQ+Cjwvc3ZnPgo=';
                this.alt = "Image du Roi Mohammed VI - Placeholder";
            });
        }

(function(){
      const el = document.getElementById('year');
      if (el) el.textContent = new Date().getFullYear();
    })();

