// ================================================
// JavaScript pour MEDIATHEQUE
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

// Données des médias regroupés par événements
        const eventsData = [
            {
                id: 1,
                title: "Mouna Fettou, nouvelle égérie D-CAP & D-WHITE",
                date: "24 Septembre 2025",
                location: "Hotel HR",
                category: "evenements",
                description: "Retour sur la conférence de presse marquant l’alliance entre A2S, Dermalliance et Mouna Fettou : une rencontre inspirante, placée sous le signe de l’excellence et de la fierté nationale.",
                medias: [
                    {
                        id: 1,
                        type: 'photo',
                        src: '../images/Media/A2S-Mouna.Fettou/1.jpg',
                        title: 'Mr. PDG-A2S & Mme. Mouna Fettou'
                    },
                    {
                        id: 2,
                        type: 'photo',
                        src: '../images/Media/A2S-Mouna.Fettou/2.jpg',
                        title: 'D-CAP & D-WHITE'
                    },
                    {
                        id: 3,
                        type: 'photo',
                        src: '../images/Media/A2S-Mouna.Fettou/3.jpg',
                        title: 'D-CAP & D-WHITE'
                    },
                    {
                        id: 4,
                        type: 'photo',
                        src: '../images/Media/A2S-Mouna.Fettou/4.jpg',
                        title: 'D-CAP & D-WHITE'
                    },
                    {
                        id: 5,
                        type: 'photo',
                        src: '../images/Media/A2S-Mouna.Fettou/5.jpg',
                        title: 'D-CAP & D-WHITE'
                    },
                    {
                        id: 6,
                        type: 'photo',
                        src: '../images/Media/A2S-Mouna.Fettou/6.jpg',
                        title: 'D-CAP & D-WHITE'
                    },
                    {
                        id: 7,
                        type: 'photo',
                        src: '../images/Media/A2S-Mouna.Fettou/7.jpg',
                        title: 'D-CAP & D-WHITE'
                    },
                    {
                        id: 8,
                        type: 'photo',
                        src: '../images/Media/A2S-Mouna.Fettou/8.jpg',
                        title: 'D-CAP & D-WHITE'
                    },
                    {
                        id: 9,
                        type: 'photo',
                        src: '../images/Media/A2S-Mouna.Fettou/9.jpg',
                        title: 'D-CAP & D-WHITE'
                    },
                    {
                        id: 10,
                        type: 'photo',
                        src: '../images/Media/A2S-Mouna.Fettou/10.jpg',
                        title: 'D-CAP & D-WHITE'
                    },
                    {
                        id: 11,
                        type: 'photo',
                        src: '../images/Media/A2S-Mouna.Fettou/11.jpg',
                        title: 'D-CAP & D-WHITE'
                    },
                    {
                        id: 12,
                        type: 'photo',
                        src: '../images/Media/A2S-Mouna.Fettou/12.jpg',
                        title: 'D-CAP & D-WHITE'
                    },
                     {
                        id: 12,
                        type: 'photo',
                        src: '../images/Media/A2S-Mouna.Fettou/13.jpg',
                        title: 'D-CAP & D-WHITE'
                    },
                     {
                        id: 12,
                        type: 'photo',
                        src: '../images/Media/A2S-Mouna.Fettou/14.jpg',
                        title: 'D-CAP & D-WHITE'
                    }
                ]
            },
            {
                id: 2,
                title: "Revivez les moments forts d’un événement exceptionnel",
                date: "11 Février 2025",
                location: "Inconnu",
                category: "evenements",
                description: "Revivez les meilleurs moments du Grand Gala A2S, un événement réussi grâce à nos équipes, partenaires et clients. Ensemble, bâtissons l’avenir !",
                medias: [
                    {
                        id: 13,
                        type: 'photo',
                        src: '../images/Media/GALA 2025/a1.jpg',
                        title: 'GALA25'
                    },
                    {
                        id: 14,
                        type: 'photo',
                        src: '../images/Media/GALA 2025/a2.jpg',
                        title: 'Ambassadeurs - A2S'
                    },
                    {
                        id: 15,
                        type: 'photo',
                        src: '../images/Media/GALA 2025/a3.jpg',
                        title: 'GALA25'
                    },
                    {
                        id: 16,
                        type: 'photo',
                        src: '../images/Media/GALA 2025/a4.jpg',
                        title: 'GALA25'
                    },
                    {
                        id: 17,
                        type: 'photo',
                        src: '../images/Media/GALA 2025/a5.jpg',
                        title: 'GALA25'
                    },
                    {
                        id: 18,
                        type: 'photo',
                        src: '../images/Media/GALA 2025/a6.jpg',
                        title: 'GALA25'
                    },
                    {
                        id: 19,
                        type: 'photo',
                        src: '../images/Media/GALA 2025/a7.jpg',
                        title: 'GALA25'
                    },
                    {
                        id: 20,
                        type: 'photo',
                        src: '../images/Media/GALA 2025/a8.jpg',
                        title: 'GALA25'
                    },
                    {
                        id: 21,
                        type: 'photo',
                        src: '../images/Media/GALA 2025/a9.jpg',
                        title: 'GALA25'
                    },
                    {
                        id: 22,
                        type: 'photo',
                        src: '../images/Media/GALA 2025/a10.jpg',
                        title: 'GALA25'
                    },
                    {
                        id: 23,
                        type: 'photo',
                        src: '../images/Media/GALA 2025/a11.jpg',
                        title: 'GALA25'
                    },
                    {
                        id: 24,
                        type: 'photo',
                        src: '../images/Media/GALA 2025/a12.jpg',
                        title: 'GALA25'
                    },
                    {
                        id: 25,
                        type: 'photo',
                        src: '../images/Media/GALA 2025/a13.jpg',
                        title: 'GALA25'
                    },
                    {
                        id: 26,
                        type: 'photo',
                        src: '../images/Media/GALA 2025/a14.jpg',
                        title: 'GALA25'
                    },
                    {
                        id: 27,
                        type: 'photo',
                        src: '../images/Media/GALA 2025/a15.jpg',
                        title: 'GALA25'
                    },
                    {
                        id: 28,
                        type: 'photo',
                        src: '../images/Media/GALA 2025/a16.jpg',
                        title: 'GALA25'
                    },
                    {
                        id: 29,
                        type: 'photo',
                        src: '../images/Media/GALA 2025/a17.jpg',
                        title: 'GALA25'
                    },
                    {
                        id: 30,
                        type: 'photo',
                        src: '../images/Media/GALA 2025/a18.jpg',
                        title: 'GALA25'
                    },
                    {
                        id: 31,
                        type: 'photo',
                        src: '../images/Media/GALA 2025/a19.jpg',
                        title: 'GALA25'
                    },
                    {
                        id: 32,
                        type: 'photo',
                        src: '../images/Media/GALA 2025/a20.jpg',
                        title: 'GALA25'
                    }
                ]
            },
            {
                id: 3,
                title: "Formation professionnelle et le gala exclusif du Laboratoire A2S",
                date: "24 juillet 2024",
                location: "Parc 'd'expo X",
                category: "Formation",
                description: "Formation et gala du Laboratoire A2S : expertise, innovation et convivialité au service de la beauté et de la santé au Maroc.",
                medias: [
                    {
                        id: 33,
                        type: 'photo',
                        src: '../images/Media/Formation-Gala24/7.jpg',
                        title: 'Activités en équipe'
                    },
                    {
                        id: 34,
                        type: 'photo',
                        src: '../images/Media/Formation-Gala24/6.jpg',
                        title: 'Activités en équipe'
                    },
                    {
                        id: 35,
                        type: 'photo',
                        src: '../images/Media/Formation-Gala24/3.jpg',
                        title: 'Activités en équipe'
                    },
                    {
                        id: 36,
                        type: 'photo',
                        src: '../images/Media/Formation-Gala24/2.jpg',
                        title: 'Activités en équipe'
                    },
                    {
                        id: 36,
                        type: 'photo',
                        src: '../images/Media/Formation-Gala24/1.jpg',
                        title: 'Activités en équipe'
                    },
                    {
                        id: 36,
                        type: 'photo',
                        src: '../images/Media/Formation-Gala24/4.jpg',
                        title: 'Activités en équipe'
                    },
                    {
                        id: 36,
                        type: 'photo',
                        src: '../images/Media/Formation-Gala24/5.jpg',
                        title: 'Activités en équipe'
                    },
                    {
                        id: 36,
                        type: 'photo',
                        src: '../images/Media/Formation-Gala24/8.jpg',
                        title: 'Activités en équipe'
                    },
                    {
                        id: 36,
                        type: 'photo',
                        src: '../images/Media/Formation-Gala24/9.jpg',
                        title: 'Activités en équipe'
                    },
                    {
                        id: 36,
                        type: 'photo',
                        src: '../images/Media/Formation-Gala24/10.jpg',
                        title: 'Activités en équipe'
                    },
                    {
                        id: 36,
                        type: 'photo',
                        src: '../images/Media/Formation-Gala24/11.jpg',
                        title: 'Activités en équipe'
                    },
                    {
                        id: 36,
                        type: 'photo',
                        src: '../images/Media/Formation-Gala24/12.jpg',
                        title: 'Activités en équipe'
                    },
                    {
                        id: 36,
                        type: 'photo',
                        src: '../images/Media/Formation-Gala24/13.jpg',
                        title: 'Activités en équipe'
                    },
                    {
                        id: 36,
                        type: 'photo',
                        src: '../images/Media/Formation-Gala24/14.jpg',
                        title: 'Activités en équipe'
                    },
                    {
                        id: 36,
                        type: 'photo',
                        src: '../images/Media/Formation-Gala24/15.jpg',
                        title: 'Activités en équipe'
                    },
                    {
                        id: 36,
                        type: 'photo',
                        src: '../images/Media/Formation-Gala24/16.jpg',
                        title: 'Activités en équipe'
                    }
                ]
            },
            
        ];

        // Variables pour la navigation
        let currentMediaIndex = 0;
        let currentEventIndex = 0;
        let filteredEventsData = [];

        // Initialisation de la page
        document.addEventListener('DOMContentLoaded', function() {
            // Initialiser les données filtrées
            filteredEventsData = [...eventsData];
            
            // Remplir la galerie avec les événements
            populateEvents();
            
            // Configurer les filtres
            setupFilters();
            
            // Configurer les lightboxes
            setupLightboxes();
            
            // Animation au défilement
            setupScrollAnimation();
        });

        // Remplir la galerie avec les événements
        function populateEvents() {
            const eventsContainer = document.getElementById('events-container');
            eventsContainer.innerHTML = '';
            
            filteredEventsData.forEach(event => {
                const eventCard = createEventCard(event);
                eventsContainer.appendChild(eventCard);
            });
        }

        // Créer une carte d'événement
        function createEventCard(event) {
            const eventCard = document.createElement('div');
            eventCard.className = `event-card ${event.category}`;
            eventCard.setAttribute('data-id', event.id);
            
            // Prendre les 4 premiers médias pour l'affichage en grille
            const previewMedias = event.medias.slice(0, 4);
            
            let mediaGridHTML = '';
            previewMedias.forEach((media, index) => {
                let mediaContent;
                if (media.type === 'photo') {
                    mediaContent = `<img src="${media.src}" alt="${media.title}">`;
                } else {
                    mediaContent = `
                        <video poster="${media.poster}">
                            <source src="${media.src}" type="video/mp4">
                        </video>
                        <div class="media-badge">
                            <i class="fas fa-play"></i> Vidéo
                        </div>
                    `;
                }
                
                mediaGridHTML += `
                    <div class="event-media-item" data-media-id="${media.id}">
                        ${mediaContent}
                        ${index === 3 && event.medias.length > 4 ? 
                          `<div class="media-count">+${event.medias.length - 4} autres</div>` : ''}
                    </div>
                `;
            });
            
            eventCard.innerHTML = `
                <div class="event-header">
                    <div>
                        <div class="event-title">${event.title}</div>
                        <span class="event-category">${event.category}</span>
                    </div>
                    <div class="event-date">
                        <i class="far fa-calendar"></i> ${event.date}
                    </div>
                </div>
                <div class="event-media-grid">
                    ${mediaGridHTML}
                </div>
                <div class="event-footer">
                    <div class="event-location">
                        <i class="fas fa-map-marker-alt"></i> ${event.location}
                    </div>
                    <button class="view-event-btn" data-event-id="${event.id}">
                        Voir l'événement (${event.medias.length})
                    </button>
                </div>
            `;
            
            // Ajouter l'événement de clic pour ouvrir la lightbox d'événement
            const viewBtn = eventCard.querySelector('.view-event-btn');
            viewBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                openEventLightbox(event.id);
            });
            
            // Ajouter l'événement de clic sur les médias pour ouvrir la lightbox individuelle
            const mediaItems = eventCard.querySelectorAll('.event-media-item');
            mediaItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const mediaId = parseInt(this.getAttribute('data-media-id'));
                    openMediaLightbox(event.id, mediaId);
                });
            });
            
            return eventCard;
        }

        // Configurer les filtres
        function setupFilters() {
            const filterButtons = document.querySelectorAll('.filter-btn');
            
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Retirer la classe active de tous les boutons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Ajouter la classe active au bouton cliqué
                    this.classList.add('active');
                    
                    // Filtrer les données
                    const filter = this.getAttribute('data-filter');
                    
                    if (filter === 'all') {
                        filteredEventsData = [...eventsData];
                    } else {
                        filteredEventsData = eventsData.filter(event => event.category === filter);
                    }
                    
                    // Mettre à jour la galerie
                    populateEvents();
                    
                    // Réappliquer l'animation au défilement
                    setupScrollAnimation();
                });
            });
        }

        // Configurer les lightboxes
        function setupLightboxes() {
            // Lightbox pour médias individuels
            const lightbox = document.getElementById('lightbox');
            const lightboxClose = document.getElementById('lightbox-close');
            const lightboxPrev = document.getElementById('lightbox-prev');
            const lightboxNext = document.getElementById('lightbox-next');
            
            // Fermer la lightbox
            lightboxClose.addEventListener('click', closeMediaLightbox);
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    closeMediaLightbox();
                }
            });
            
            // Navigation dans la lightbox
            lightboxPrev.addEventListener('click', showPrevMedia);
            lightboxNext.addEventListener('click', showNextMedia);
            
            // Lightbox pour événements
            const eventLightbox = document.getElementById('event-lightbox');
            const eventLightboxClose = document.getElementById('event-lightbox-close');
            
            // Fermer la lightbox d'événement
            eventLightboxClose.addEventListener('click', closeEventLightbox);
            eventLightbox.addEventListener('click', function(e) {
                if (e.target === eventLightbox) {
                    closeEventLightbox();
                }
            });
            
            // Navigation au clavier
            document.addEventListener('keydown', function(e) {
                if (lightbox.classList.contains('active')) {
                    if (e.key === 'Escape') closeMediaLightbox();
                    if (e.key === 'ArrowLeft') showPrevMedia();
                    if (e.key === 'ArrowRight') showNextMedia();
                }
                if (eventLightbox.classList.contains('active')) {
                    if (e.key === 'Escape') closeEventLightbox();
                }
            });
        }

        // Ouvrir la lightbox d'événement
        function openEventLightbox(eventId) {
            // Trouver l'événement
            const event = eventsData.find(e => e.id === eventId);
            if (!event) return;
            
            // Mettre à jour le titre et les métadonnées
            document.getElementById('event-lightbox-title').textContent = event.title;
            document.getElementById('event-lightbox-meta').innerHTML = `
                <span><i class="far fa-calendar"></i> ${event.date}</span>
                <span><i class="fas fa-map-marker-alt"></i> ${event.location}</span>
            `;
            
            // Remplir le corps avec les médias
            const eventLightboxBody = document.getElementById('event-lightbox-body');
            eventLightboxBody.innerHTML = '';
            
            event.medias.forEach(media => {
                const mediaElement = document.createElement('div');
                mediaElement.className = 'event-lightbox-media';
                mediaElement.setAttribute('data-media-id', media.id);
                
                let mediaContent;
                if (media.type === 'photo') {
                    mediaContent = `<img src="${media.src}" alt="${media.title}">`;
                } else {
                    mediaContent = `
                        <video poster="${media.poster}">
                            <source src="${media.src}" type="video/mp4">
                        </video>
                        <div class="media-badge">
                            <i class="fas fa-play"></i> Vidéo
                        </div>
                    `;
                }
                
                mediaElement.innerHTML = mediaContent;
                
                // Ajouter l'événement de clic pour ouvrir la lightbox individuelle
                mediaElement.addEventListener('click', function() {
                    closeEventLightbox();
                    setTimeout(() => {
                        openMediaLightbox(event.id, media.id);
                    }, 300);
                });
                
                eventLightboxBody.appendChild(mediaElement);
            });
            
            // Afficher la lightbox d'événement
            document.getElementById('event-lightbox').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        // Fermer la lightbox d'événement
        function closeEventLightbox() {
            document.getElementById('event-lightbox').classList.remove('active');
            document.body.style.overflow = '';
        }

        // Ouvrir la lightbox de média individuel
        function openMediaLightbox(eventId, mediaId) {
            // Trouver l'événement et l'index du média
            const event = eventsData.find(e => e.id === eventId);
            if (!event) return;
            
            currentEventIndex = eventsData.findIndex(e => e.id === eventId);
            currentMediaIndex = event.medias.findIndex(m => m.id === mediaId);
            
            // Afficher le média dans la lightbox
            displayMediaInLightbox(event.medias[currentMediaIndex], event);
            
            // Afficher la lightbox
            document.getElementById('lightbox').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        // Fermer la lightbox de média individuel
        function closeMediaLightbox() {
            document.getElementById('lightbox').classList.remove('active');
            document.body.style.overflow = '';
            
            // Arrêter la vidéo si elle est en cours de lecture
            const video = document.querySelector('#lightbox-content video');
            if (video) {
                video.pause();
            }
        }

        // Afficher le média précédent
        function showPrevMedia() {
            const event = eventsData[currentEventIndex];
            currentMediaIndex = (currentMediaIndex - 1 + event.medias.length) % event.medias.length;
            displayMediaInLightbox(event.medias[currentMediaIndex], event);
        }

        // Afficher le média suivant
        function showNextMedia() {
            const event = eventsData[currentEventIndex];
            currentMediaIndex = (currentMediaIndex + 1) % event.medias.length;
            displayMediaInLightbox(event.medias[currentMediaIndex], event);
        }

        // Afficher le média dans la lightbox
        function displayMediaInLightbox(media, event) {
            const lightboxContent = document.getElementById('lightbox-content');
            
            let mediaElement;
            if (media.type === 'photo') {
                mediaElement = `<img src="${media.src}" alt="${media.title}">`;
            } else {
                mediaElement = `
                    <video controls autoplay poster="${media.poster}">
                        <source src="${media.src}" type="video/mp4">
                    </video>
                `;
            }
            
            lightboxContent.innerHTML = `
                ${mediaElement}
                <div class="lightbox-info">
                    <div class="lightbox-title">${media.title}</div>
                    <div class="lightbox-description">${event.description}</div>
                    <div class="lightbox-meta">
                        <span><i class="far fa-calendar"></i> ${event.date}</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${event.location}</span>
                        <span><i class="fas fa-images"></i> ${currentMediaIndex + 1} / ${event.medias.length}</span>
                    </div>
                </div>
            `;
        }

        // Configuration de l'animation au défilement
        function setupScrollAnimation() {
            // Réinitialiser l'animation pour les nouveaux éléments
            const eventCards = document.querySelectorAll('.event-card');
            
            eventCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.5s, transform 0.5s';
            });
            
            // Déclencher l'animation au défilement
            window.addEventListener('scroll', function() {
                const windowHeight = window.innerHeight;
                
                eventCards.forEach(card => {
                    const position = card.getBoundingClientRect().top;
                    
                    if (position < windowHeight - 100) {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }
                });
            });
            
            // Déclencher l'animation initiale
            window.dispatchEvent(new Event('scroll'));
        }

(function(){
        const el = document.getElementById('year');
        if (el) el.textContent = new Date().getFullYear();
      })();

