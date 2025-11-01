   // Le code JavaScript reste exactement le même
    const form = document.getElementById('ambassadorForm');
    const submitBtn = document.getElementById('submitBtn');
    const progressBar = document.getElementById('progressBar');
    const successModal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');

    const requiredFields = form.querySelectorAll('[required]');

    function updateProgress() {
      let filledCount = 0;
      requiredFields.forEach(field => {
        if (field.value.trim() !== '') {
          filledCount++;
        }
      });
      const progress = (filledCount / requiredFields.length) * 100;
      progressBar.style.width = progress + '%';
    }

    requiredFields.forEach(field => {
      field.addEventListener('input', updateProgress);
      field.addEventListener('change', updateProgress);
    });

    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    const phoneInput = document.getElementById('telephone');
    phoneInput.addEventListener('input', function(e) {
      this.value = this.value.replace(/[^0-9+\s-]/g, '');
    });

    function validateField(field) {
      const group = field.closest('.form-group');
      let isValid = true;

      if (field.hasAttribute('required')) {
        isValid = field.value.trim() !== '';
      }

      if (isValid && field.type === 'email') {
        isValid = isValidEmail(field.value);
      }

      if (isValid) {
        group.classList.remove('error');
      } else {
        group.classList.add('error');
      }

      return isValid;
    }

    form.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('blur', function() {
        if (this.hasAttribute('required') || (this.type === 'email' && this.value)) {
          validateField(this);
        }
      });

      field.addEventListener('focus', function() {
        this.closest('.form-group').classList.remove('error');
      });
    });

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      let isFormValid = true;
      requiredFields.forEach(field => {
        if (!validateField(field)) {
          isFormValid = false;
        }
      });

      if (!isFormValid) {
        const firstError = form.querySelector('.form-group.error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      submitBtn.disabled = true;
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>⏳ Envoi en cours...</span>';

      setTimeout(() => {
        successModal.classList.add('show');
        form.reset();
        updateProgress();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        form.querySelectorAll('.form-group').forEach(group => {
          group.classList.remove('error');
        });
      }, 1500);
    });

    closeModal.addEventListener('click', function() {
      successModal.classList.remove('show');
    });

    successModal.addEventListener('click', function(e) {
      if (e.target === successModal) {
        successModal.classList.remove('show');
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && successModal.classList.contains('show')) {
        successModal.classList.remove('show');
      }
    });

    updateProgress();

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    document.querySelectorAll('.benefits-section, .process-section, .form-container').forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(30px)';
      section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(section);
    });

    const instagramInput = document.getElementById('instagram');
    instagramInput.addEventListener('input', function() {
      let value = this.value.trim();
      if (value && !value.startsWith('@')) {
        this.value = '@' + value.replace('@', '');
      }
    });

    const tiktokInput = document.getElementById('tiktok');
    tiktokInput.addEventListener('input', function() {
      let value = this.value.trim();
      if (value && !value.startsWith('@')) {
        this.value = '@' + value.replace('@', '');
      }
    });

    let isSubmitting = false;
    form.addEventListener('submit', function(e) {
      if (isSubmitting) {
        e.preventDefault();
        return;
      }
      isSubmitting = true;
      setTimeout(() => {
        isSubmitting = false;
      }, 2000);
    });