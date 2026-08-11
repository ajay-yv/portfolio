/**
 * PORTFOLIO ADVANCED ENGINE - AJAY Y.V
 * Particle Canvas, Preloader, Mouse Spotlight, Stats Count-Up,
 * Skill Bar Triggers, LeetCode/GitHub Heatmap, Toast System & QR Modal
 */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initParticleCanvas();
  initCursorGlow();
  initScrollProgress();
  initTypewriter();
  initThemeToggle();
  initMobileNav();
  initScrollSpy();
  initCountUp();
  initSkillBars();
  initGithubHeatmap();
  initProjectFilters();
  initCertFilters();
  initClipboardAndToasts();
  initQrModal();
  initContactForm();
});

/* ==========================================================================
   1. PRELOADER ANIMATION
   ========================================================================== */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const fill = document.getElementById('preloaderFill');
  const status = document.getElementById('preloaderStatus');

  if (!preloader || !fill) return;

  const steps = [
    { pct: 25, msg: "Compiling Data Structures & ML Models..." },
    { pct: 55, msg: "Connecting FastAPI & Next.js Endpoints..." },
    { pct: 85, msg: "Rendering Recruiter Metrics & Credentials..." },
    { pct: 100, msg: "Workspace Ready! 🚀" }
  ];

  let currentStep = 0;
  const interval = setInterval(() => {
    if (currentStep < steps.length) {
      fill.style.width = `${steps[currentStep].pct}%`;
      if (status) status.textContent = steps[currentStep].msg;
      currentStep++;
    } else {
      clearInterval(interval);
      setTimeout(() => {
        preloader.classList.add('fade-out');
      }, 350);
    }
  }, 220);
}

/* ==========================================================================
   2. INTERACTIVE PARTICLE CANVAS BACKGROUND
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particlesArray = [];
  let width, height;
  let mouse = { x: null, y: null, radius: 140 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 1;
      this.baseX = this.x;
      this.baseY = this.y;
      this.speedX = (Math.random() - 0.5) * 0.7;
      this.speedY = (Math.random() - 0.5) * 0.7;
      this.color = Math.random() > 0.5 ? 'rgba(99, 102, 241, ' : 'rgba(6, 182, 212, ';
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color + '0.7)';
      ctx.fill();
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > width) this.speedX = -this.speedX;
      if (this.y < 0 || this.y > height) this.speedY = -this.speedY;

      // Mouse repulsion / attraction interaction
      if (mouse.x !== null && mouse.y !== null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const directionX = (dx / distance) * force * 3;
          const directionY = (dy / distance) * force * 3;
          this.x -= directionX;
          this.y -= directionY;
        }
      }
    }
  }

  function init() {
    particlesArray = [];
    const numParticles = Math.floor((width * height) / 16000);
    for (let i = 0; i < Math.min(numParticles, 90); i++) {
      particlesArray.push(new Particle());
    }
  }

  init();

  function connect() {
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a + 1; b < particlesArray.length; b++) {
        let dx = particlesArray[a].x - particlesArray[b].x;
        let dy = particlesArray[a].y - particlesArray[b].y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          let opacity = 1 - distance / 120;
          ctx.strokeStyle = `rgba(99, 102, 241, ${opacity * 0.15})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    }
    connect();
    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   3. MOUSE CURSOR GLOW SPOTLIGHT
   ========================================================================== */
function initCursorGlow() {
  const cursorGlow = document.getElementById('cursorGlow');
  if (!cursorGlow) return;

  // Only enable on desktop pointer devices
  if (window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });
  } else {
    cursorGlow.style.display = 'none';
  }
}

/* ==========================================================================
   4. SCROLL PROGRESS BAR & FLOATING BACK-TO-TOP RING
   ========================================================================== */
function initScrollProgress() {
  const scrollProgress = document.getElementById('scrollProgress');
  const floatingBtn = document.getElementById('floatingBackToTop');
  const circle = document.querySelector('.progress-ring-circle');
  const circumference = 2 * Math.PI * 18; // r=18

  if (circle) {
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;
  }

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (scrollProgress) {
      scrollProgress.style.width = `${scrollPercent}%`;
    }

    if (circle) {
      const offset = circumference - (scrollPercent / 100) * circumference;
      circle.style.strokeDashoffset = offset;
    }

    if (floatingBtn) {
      if (scrollTop > 300) {
        floatingBtn.classList.add('visible');
      } else {
        floatingBtn.classList.remove('visible');
      }
    }
  });
}

/* ==========================================================================
   5. DYNAMIC TYPEWRITER
   ========================================================================== */
function initTypewriter() {
  const words = [
    "AI & Machine Learning Engineer.",
    "Software Development Engineer.",
    "Full-Stack Web Architect.",
    "Data Science Specialist.",
    "Algorithmic Problem Solver."
  ];

  const target = document.getElementById('typewriterText');
  if (!target) return;

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      target.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      target.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typingSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   6. COUNT-UP ANIMATION OBSERVER
   ========================================================================== */
function initCountUp() {
  const counters = document.querySelectorAll('.count-up');
  if (!counters.length) return;

  const observerOptions = { threshold: 0.5 };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target'));
        const decimal = parseInt(el.getAttribute('data-decimal')) || 0;
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1500;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out expo
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const currentVal = easeProgress * target;

          el.textContent = currentVal.toFixed(decimal) + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = target.toFixed(decimal) + suffix;
          }
        }

        requestAnimationFrame(updateCounter);
        obs.unobserve(el);
      }
    });
  }, observerOptions);

  counters.forEach(counter => observer.observe(counter));
}

/* ==========================================================================
   7. ANIMATED SKILL BARS OBSERVER
   ========================================================================== */
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  if (!skillBars.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetWidth = bar.getAttribute('data-progress') || '85%';
        bar.style.width = targetWidth;
        obs.unobserve(bar);
      }
    });
  }, { threshold: 0.2 });

  skillBars.forEach(bar => observer.observe(bar));
}

/* ==========================================================================
   8. GITHUB CONTRIBUTION HEATMAP GENERATOR
   ========================================================================== */
function initGithubHeatmap() {
  const heatmapContainer = document.getElementById('githubHeatmap');
  if (!heatmapContainer) return;

  // Generate 80 simulated contribution cells with realistic density
  const levels = ['gh-cell', 'gh-cell gh-lvl-1', 'gh-cell gh-lvl-2', 'gh-cell gh-lvl-3', 'gh-cell gh-lvl-4'];
  let html = '';

  for (let i = 0; i < 80; i++) {
    const random = Math.random();
    let lvl = 0;
    if (random > 0.25 && random <= 0.55) lvl = 1;
    else if (random > 0.55 && random <= 0.78) lvl = 2;
    else if (random > 0.78 && random <= 0.92) lvl = 3;
    else if (random > 0.92) lvl = 4;

    html += `<div class="${levels[lvl]}" title="Day ${i + 1}: ${lvl * 3 + 1} commits"></div>`;
  }

  heatmapContainer.innerHTML = html;
}

/* ==========================================================================
   9. PROJECT CATEGORY FILTERS
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

function initCertFilters() {
  const certBtns = document.querySelectorAll('[data-cert-filter]');
  const certCards = document.querySelectorAll('.cert-card');

  if (!certBtns.length || !certCards.length) return;

  certBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      certBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-cert-filter');

      certCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   10. TOAST NOTIFICATION ENGINE & CLIPBOARD HANDLERS
   ========================================================================== */
function showToast(message, icon = 'fa-circle-check') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-item';
  toast.innerHTML = `<i class="fa-solid ${icon}"></i><span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 3500);
}

function initClipboardAndToasts() {
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyPhoneBtn = document.getElementById('copyPhoneBtn');
  const quickCopyBtn = document.getElementById('quickCopyEmailBtn');

  function copyToClipboard(text, successMsg) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMsg, 'fa-check');
      }).catch(() => {
        fallbackCopy(text, successMsg);
      });
    } else {
      fallbackCopy(text, successMsg);
    }
  }

  function fallbackCopy(text, successMsg) {
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    showToast(successMsg, 'fa-check');
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      copyToClipboard('ajayyv1432@gmail.com', 'Email copied to clipboard!');
    });
  }

  if (quickCopyBtn) {
    quickCopyBtn.addEventListener('click', () => {
      copyToClipboard('ajayyv1432@gmail.com', 'Email copied to clipboard!');
    });
  }

  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      copyToClipboard('+917676495157', 'Phone number copied to clipboard!');
    });
  }
}

/* ==========================================================================
   11. QR CODE MODAL
   ========================================================================== */
function initQrModal() {
  const qrModal = document.getElementById('qrModal');
  const openBtn = document.getElementById('qrModalBtn');
  const closeBtn = document.getElementById('closeQrModal');
  const copyLinkBtn = document.getElementById('copyPortfolioLinkBtn');

  if (openBtn && qrModal) {
    openBtn.addEventListener('click', () => {
      qrModal.classList.add('open');
    });
  }

  if (closeBtn && qrModal) {
    closeBtn.addEventListener('click', () => {
      qrModal.classList.remove('open');
    });
  }

  if (qrModal) {
    qrModal.addEventListener('click', (e) => {
      if (e.target === qrModal) {
        qrModal.classList.remove('open');
      }
    });
  }

  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', () => {
      const link = window.location.href;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(link).then(() => {
          showToast('Portfolio link copied to clipboard!', 'fa-link');
        });
      }
    });
  }
}

/* ==========================================================================
   12. THEME TOGGLING (DARK / LIGHT)
   ========================================================================== */
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const html = document.documentElement;

  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme.toUpperCase()} mode`, newTheme === 'dark' ? 'fa-moon' : 'fa-sun');
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light') {
      themeIcon.className = 'fa-solid fa-moon';
      themeIcon.style.color = '#f59e0b';
    } else {
      themeIcon.className = 'fa-solid fa-sun';
      themeIcon.style.color = '#38bdf8';
    }
  }
}

/* ==========================================================================
   13. MOBILE NAVIGATION
   ========================================================================== */
function initMobileNav() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileBtn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }
}

/* ==========================================================================
   14. SCROLL SPY & NAVBAR BLUR
   ========================================================================== */
function initScrollSpy() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.style.borderBottomColor = 'var(--border-glow)';
        navbar.style.boxShadow = 'var(--shadow-md)';
      } else {
        navbar.style.borderBottomColor = 'var(--border-color)';
        navbar.style.boxShadow = 'none';
      }
    }

    let current = '';
    const scrollPosition = window.scrollY + 220;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   15. CONTACT FORM
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolioContactForm');
  const feedback = document.getElementById('formFeedback');

  if (form && feedback) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('senderName').value;

      feedback.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you, ${name}! Your message has been received. I will get back to you promptly.`;
      feedback.className = 'form-feedback success';
      feedback.style.display = 'block';

      showToast(`Message sent from ${name}!`, 'fa-paper-plane');
      form.reset();

      setTimeout(() => {
        feedback.style.display = 'none';
      }, 6000);
    });
  }
}
