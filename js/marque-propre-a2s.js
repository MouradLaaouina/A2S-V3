// ================================================
// JavaScript pour MARQUE-PROPRE-A2S
// ================================================

// Gammes Data
        const gammesData = {
            dcap: {
                name: 'D-CAP',
                description: "Gamme dermocosmétique marocaine spécialisée dans les soins de la peau, offrant des produits pour le traitement des imperfections cutanées, l'hydratation et la protection solaire. Particulièrement adaptée aux peaux méditerranéennes et africaines.",
                instagram: 'https://www.instagram.com/dcap.maroc.a2s/',
                store: 'https://d-cap.ma/',
                produits: [
                    {
                        name: 'Shampooing Reactivateur Anti-Chute',
                        image: '../images/Media/produits/D-Cap/Shampooing Reactivateur Anti-Chute.png',
                        link: 'https://d-cap.ma/produit/shampooing-reactivateur-anti-chute-d-cap/'
                    },
                    {
                        name: 'Ampoules Anti-Chute',
                        image: '../images/Media/produits/D-Cap/Ampoules Anti-Chute.png',
                        link: 'https://d-cap.ma/produit/ampoules-anti-chute-d-cap/'
                    },
                    {
                        name: 'Lotion Spray Anti-Chute',
                        image: '../images/Media/produits/D-Cap/Lotion Spray Anti-Chute.png',
                        link: 'https://d-cap.ma/produit/lotion-spray-anti-chute-d-cap/'
                    }
                ]
            },
            dwhite: {
                name: 'D-WHITE',
                description: "Gamme dermocosmétique marocaine dédiée à l'éclaircissement et l'uniformisation du teint. Propose des solutions pour traiter les taches pigmentaires, les imperfections et apporter de l'éclat à la peau.",
                instagram: 'https://www.instagram.com/dwhite.maroc.a2s/',
                store: 'https://dwhite.ma/',
                produits: [
                    {
                        name: 'Crème Dépigmentante ANTI-TACHES',
                        image: '../images/Media/produits/D-White/Crème Dépigmentante.png',
                        link: 'https://dwhite.ma/product/creme-depigmentante/'
                    },
                    {
                        name: 'Crème Solaire invisible',
                        image: '../images/Media/produits/D-White/Crème Solaire invisible.png',
                        link: 'https://dwhite.ma/product/creme-solaire-invisible/'
                    },
                    {
                        name: 'Crème Solaire Teintée',
                        image: '../images/Media/produits/D-White/Crème Solaire Teintée.jpg',
                        link: 'https://dwhite.ma/product/creme-solaire-teintee/'
                    },
                    {
                        name: 'Crème Solaire Teintée Claire',
                        image: '../images/Media/produits/D-White/Crème Solaire Teintée Claire.jpg',
                        link: 'http://127.0.0.1:5500/marque-partenaire.html'
                    }
                ]
            }
        };

        // Scroll Progress Bar
        function updateScrollProgress() {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            document.getElementById('scrollProgress').style.width = scrolled + '%';
        }

        window.addEventListener('scroll', updateScrollProgress);

        // Theme controlled globally via js/theme.js

        // Show Details Function
        function showDetails(gammeId) {
            const gamme = gammesData[gammeId];
            const detailsSection = document.getElementById('detailsSection');
            const detailsTitle = document.getElementById('detailsTitle');
            const detailsDescription = document.getElementById('detailsDescription');
            const detailsLinks = document.getElementById('detailsLinks');
            const productsGrid = document.getElementById('productsGrid');

            // Update details content
            detailsTitle.textContent = gamme.name;
            detailsDescription.textContent = gamme.description;

            // Update social links
            detailsLinks.innerHTML = `
                <a href="${gamme.instagram}" target="_blank" class="btn btn-secondary">
                    <span>📸</span>
                    <span>Instagram</span>
                </a>
                <a href="${gamme.store}" target="_blank" class="btn btn-primary">
                    <span>🛒</span>
                    <span>Boutique en ligne</span>
                </a>
            `;

            // Update products grid
            productsGrid.innerHTML = gamme.produits.map(product => `
                <article class="product-card">
                    <div class="product-image-container">
                        <img src="${product.image}" alt="${product.name}" class="product-image">
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">${product.name}</h3>
                        <a href="${product.link}" target="_blank" class="product-link">
                            <span>Voir le produit</span>
                            <span>→</span>
                        </a>
                    </div>
                </article>
            `).join('');

            // Show details section
            detailsSection.classList.add('active');

            // Update active card
            document.querySelectorAll('.gamme-card').forEach(card => {
                card.classList.remove('active');
            });
            document.querySelector(`[data-gamme="${gammeId}"]`).classList.add('active');

            // Scroll to details
            setTimeout(() => {
                detailsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }

        // Close Details
        document.getElementById('closeDetails').addEventListener('click', () => {
            const detailsSection = document.getElementById('detailsSection');
            detailsSection.classList.remove('active');
            document.querySelectorAll('.gamme-card').forEach(card => {
                card.classList.remove('active');
            });
        });

        // Smooth scroll for internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

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

