/* ==========================================================================
   Modern Portfolio Logic - Theme, Animations & Interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Custom Mouse Cursor ---
  const cursorDot = document.getElementById('cursorDot');
  const cursorOutline = document.getElementById('cursorOutline');
  
  let mouseX = 0, mouseY = 0; // Current mouse position
  let outlineX = 0, outlineY = 0; // Trailing outline position
  const speed = 0.15; // Lerp speed for outline cursor

  if (cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Position dot cursor instantly
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    // Animate trailing outline cursor using linear interpolation (lerp)
    const animateOutline = () => {
      const distX = mouseX - outlineX;
      const distY = mouseY - outlineY;
      
      outlineX += distX * speed;
      outlineY += distY * speed;
      
      cursorOutline.style.left = `${outlineX}px`;
      cursorOutline.style.top = `${outlineY}px`;
      
      requestAnimationFrame(animateOutline);
    };
    animateOutline();

    // Hover effects on links, buttons, and custom triggers
    const hoverElements = document.querySelectorAll('a, button, .filter-btn, .tab-btn, .project-card, .social-icon');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorOutline.classList.add('cursor-hover');
        cursorDot.classList.add('cursor-dot-hover');
      });
      el.addEventListener('mouseleave', () => {
        cursorOutline.classList.remove('cursor-hover');
        cursorDot.classList.remove('cursor-dot-hover');
      });
    });
  }

  // --- 2. Dark/Light Theme Manager ---
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle ? themeToggle.querySelector('.theme-toggle-icon') : null;
  const currentTheme = localStorage.getItem('theme') || 'dark';

  // Apply saved theme on load
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      let theme = document.documentElement.getAttribute('data-theme');
      let targetTheme = (theme === 'dark') ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', targetTheme);
      localStorage.setItem('theme', targetTheme);
      updateThemeIcon(targetTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light') {
      // Rotate icon for light transition
      themeIcon.style.transform = 'rotate(180deg)';
      // Change internal SVG path to moon icon
      themeIcon.innerHTML = `<path class="moon-icon" d="M12.3 22h-.1c-5.5 0-10-4.5-10-10 0-4.8 3.5-8.9 8.2-9.8.5-.1 1 .2 1.2.7.2.5 0 1.1-.4 1.4-2.8 2-3.8 5.7-2.3 8.8 1.5 3 4.7 4.7 7.9 3.9.5-.1 1 .1 1.3.6.3.4.2 1.1-.2 1.4-1.8 1.3-4 2-6.1 2z"/>`;
    } else {
      themeIcon.style.transform = 'rotate(0deg)';
      themeIcon.innerHTML = `<path class="sun-icon" d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.01c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>`;
    }
  }

  // --- 3. Mobile Navigation Drawer ---
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav-link');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close menu when clicking link items
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });

    // Close menu when clicking anywhere outside
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      }
    });
  }

  // --- 4. Header Shadow / Blur on Scroll ---
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- 5. Active Link Highlight on Scroll ---
  const sections = document.querySelectorAll('section');
  const scrollActiveLinkHighlight = () => {
    let scrollY = window.pageYOffset;
    
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120; // offset matches nav height
      const sectionId = current.getAttribute('id');
      const activeNav = document.querySelector(`.nav-links a[href*=${sectionId}]`);
      
      if (activeNav) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          activeNav.classList.add('active');
        } else {
          activeNav.classList.remove('active');
        }
      }
    });
  };
  window.addEventListener('scroll', scrollActiveLinkHighlight);

  // --- 6. Typewriter Loop (Hero Section) ---
  const typewriterElement = document.getElementById('typewriter');
  const textStrings = [
    'Senior Frontend Developer',
    'Full Stack Developer',
    'Interactive Frontend Engineer'
  ];
  let stringIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    if (!typewriterElement) return;

    const currentText = textStrings[stringIndex];
    
    if (isDeleting) {
      typewriterElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // faster deleting
    } else {
      typewriterElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100; // standard typing
    }

    if (!isDeleting && charIndex === currentText.length) {
      // Pause at full text
      isDeleting = true;
      typingSpeed = 2000; 
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      stringIndex = (stringIndex + 1) % textStrings.length;
      typingSpeed = 500; // brief pause before next word
    }

    setTimeout(typeEffect, typingSpeed);
  }
  typeEffect();

  // --- 7. Tabs Switcher (About Section) ---
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');
      
      // Reset active states
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanels.forEach(panel => panel.classList.remove('active'));
      
      // Set active target
      button.classList.add('active');
      const targetPanel = document.getElementById(targetTab);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // --- 8. Portfolio Filtering ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active classes
      filterButtons.forEach(button => button.classList.remove('active'));
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          // Quick frame delay to trigger scale animations
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 350); // Matches opacity transition length
        }
      });
    });
  });

  // --- 9. Scroll Reveal Animations (IntersectionObserver) ---
  const revealElements = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Unobserve after showing so it stays loaded
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.15, // trigger when 15% visible
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });
  } else {
    // Fallback if observer is unsupported
    revealElements.forEach(el => el.classList.add('active'));
  }

  // --- 10. Contact Form Submission & Toast Popup ---
  const contactForm = document.getElementById('contactForm');
  const toastContainer = document.getElementById('toastContainer');

  if (contactForm && toastContainer) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simple client-side validation check
      const name = document.getElementById('formName').value.trim();
      const email = document.getElementById('formEmail').value.trim();
      const subject = document.getElementById('formSubject').value.trim();
      const message = document.getElementById('formMessage').value.trim();
      
      if (!name || !email || !subject || !message) {
        showToast('Please fill in all required fields.', 'error');
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const origBtnContent = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `Sending... <i class="fa-solid fa-circle-notch fa-spin"></i>`;
      
      // Formspree endpoint integration (REPLACE 'your_formspree_id' with your actual Formspree form ID)
      const formspreeEndpoint = 'https://formspree.io/f/mqejgryd';
      
      const formData = new FormData(contactForm);
      
      fetch(formspreeEndpoint, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          showToast('Message sent successfully! I will respond soon.', 'success');
          contactForm.reset();
        } else {
          response.json().then(data => {
            if (Object.prototype.hasOwnProperty.call(data, 'errors')) {
              showToast(data['errors'].map(error => error['message']).join(', '), 'error');
            } else {
              showToast('Oops! There was a problem submitting your form.', 'error');
            }
          });
        }
      })
      .catch(() => {
        showToast('Oops! Network error. Please check your connection.', 'error');
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = origBtnContent;
      });
    });
  }

  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const iconClass = type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-exclamation';
    
    toast.innerHTML = `
      <i class="${iconClass} toast-icon"></i>
      <span class="toast-message">${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto-remove toast after 4 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px) scale(0.9)';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 4000);
  }

});
