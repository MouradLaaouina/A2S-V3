// ================================================
// JavaScript pour EMBASSADEUR
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

// Scroll animations
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

        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });

        // Form handling
        const form = document.getElementById('ambassadorForm');
        const progressBar = document.getElementById('progressBar');
        const submitBtn = document.getElementById('submitBtn');
        const successModal = document.getElementById('successModal');

        // Form progress tracking
        function updateProgress() {
            const inputs = form.querySelectorAll('input[required], select[required]');
            let filled = 0;
            inputs.forEach(input => {
                if (input.value.trim() !== '') filled++;
            });
            const progress = (filled / inputs.length) * 100;
            progressBar.style.width = progress + '%';
        }

        // Real-time validation
        function validateField(field) {
            const value = field.value.trim();
            const error = field.parentNode.querySelector('.form-error');
            let isValid = true;

            if (field.hasAttribute('required') && !value) {
                isValid = false;
            } else if (field.type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailRegex.test(value);
            }

            if (isValid) {
                field.classList.remove('error');
                error.style.display = 'none';
            } else {
                field.classList.add('error');
                error.style.display = 'block';
            }

            return isValid;
        }

        // Add event listeners to form fields
        form.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('input', () => {
                updateProgress();
                if (field.hasAttribute('required')) {
                    validateField(field);
                }
            });

            field.addEventListener('blur', () => {
                if (field.hasAttribute('required')) {
                    validateField(field);
                }
            });
        });

        // Form submission
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Validate all required fields
            const requiredFields = form.querySelectorAll('input[required], select[required]');
            let isFormValid = true;

            requiredFields.forEach(field => {
                if (!validateField(field)) {
                    isFormValid = false;
                }
            });

            if (!isFormValid) {
                return;
            }

            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.querySelector('.btn-text').textContent = '';

            // Simulate form submission delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Collect form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            try {
                // In a real application, you would submit to your backend
                // For now, we'll just show the success modal
                console.log('Form submitted:', data);
                
                showSuccessModal();
                form.reset();
                updateProgress();
            } catch (error) {
                console.error('Submission error:', error);
                alert('Une erreur est survenue. Veuillez réessayer.');
            } finally {
                // Reset button state
                submitBtn.classList.remove('loading');
                submitBtn.querySelector('.btn-text').textContent = 'Envoyer ma candidature';
            }
        });

        // Success modal functions
        function showSuccessModal() {
            successModal.classList.add('show');
            createConfetti();
            
            // Auto-close after 5 seconds
            setTimeout(() => {
                closeModal();
            }, 5000);
        }

        function closeModal() {
            successModal.classList.remove('show');
            document.getElementById('confetti').innerHTML = '';
        }

        // Create confetti effect
        function createConfetti() {
            const confettiContainer = document.getElementById('confetti');
            const colors = ['#d4af37', '#f0e68c', '#2e7d32', '#1b5e20'];
            
            for (let i = 0; i < 100; i++) {
                const piece = document.createElement('div');
                piece.className = 'confetti-piece';
                piece.style.left = Math.random() * 100 + '%';
                piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                piece.style.animationDelay = Math.random() * 3 + 's';
                piece.style.animationDuration = (Math.random() * 2 + 2) + 's';
                confettiContainer.appendChild(piece);
                
                setTimeout(() => {
                    piece.remove();
                }, 5000);
            }
        }

        // Close modal when clicking outside
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                closeModal();
            }
        });

        // Initialize progress bar
        updateProgress();

        // Performance optimization: Reduce particle creation on mobile
        if (window.innerWidth <= 768) {
            // Reduce particle count on mobile for better performance
            const particles = document.querySelectorAll('.particle');
            particles.forEach((particle, index) => {
                if (index > 10) particle.remove();
            });
        }

(function(){
        const el = document.getElementById('year');
        if (el) el.textContent = new Date().getFullYear();
      })();

