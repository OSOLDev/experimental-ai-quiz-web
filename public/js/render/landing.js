import { state } from '../state.js';
import { $, t, setP, setV } from '../helpers.js';
import { go, toggleLang, toggleTheme } from '../router.js';

/* ═══════════════════════════════════════════════════════════════════════
   LANDING PAGE  /
   Professional academic layout — consistent spacing, clean hierarchy
═══════════════════════════════════════════════════════════════════════ */
export function renderLanding() {
  setP(100);
  $('main-topbar').style.display = 'none'; // landing has its own nav

  const topics = [
    { id: 'LEC-ENG-17', icon: 'fa-spell-check', label: 'Lecturer English' },
    { id: 'LEC-URD-17', icon: 'fa-book-open', label: 'Lecturer Urdu' },
    { id: 'LEC-MATH-17', icon: 'fa-square-root-variable', label: 'Lecturer Mathematics' },
    { id: 'LEC-CS-17', icon: 'fa-laptop-code', label: 'Computer Science' },
    { id: 'LEC-PHY-17', icon: 'fa-atom', label: 'Lecturer Physics' },
    { id: 'LEC-CHEM-17', icon: 'fa-flask', label: 'Lecturer Chemistry' },
    { id: 'LEC-ISL-17', icon: 'fa-moon', label: 'Islamic Studies' },
    { id: 'LEC-PAK-17', icon: 'fa-flag', label: 'Pakistan Studies' },
    { id: 'LEC-GEO-17', icon: 'fa-earth-asia', label: 'Lecturer Geography' },
    { id: 'LEC-HIS-17', icon: 'fa-landmark', label: 'Lecturer History' },
    { id: 'LEC-EDU-17', icon: 'fa-school', label: 'Lecturer Education' },
    { id: 'LEC-ECO-17', icon: 'fa-chart-line', label: 'Lecturer Economics' },
    { id: 'LEC-POL-17', icon: 'fa-scale-balanced', label: 'Political Science' },
    { id: 'LEC-BOT-17', icon: 'fa-seedling', label: 'Lecturer Botany' },
    { id: 'LEC-ZOO-17', icon: 'fa-paw', label: 'Lecturer Zoology' },
    { id: 'LEC-COM-17', icon: 'fa-briefcase', label: 'Lecturer Commerce' },
    { id: 'LEC-STAT-17', icon: 'fa-chart-bar', label: 'Lecturer Statistics' },
    { id: 'LEC-ARA-17', icon: 'fa-star-and-crescent', label: 'Lecturer Arabic' },
  ];

  const features = [
    { icon: 'fa-file-lines', title: '10+ Years of Past Papers', desc: 'Access authentic AJK PSC past papers from the last decade to understand exam patterns and question styles.' },
    { icon: 'fa-graduation-cap', title: 'Expertly Curated Mocks', desc: 'Practice with mock tests designed by academy experts to simulate the actual PSC examination experience.' },
    { icon: 'fa-chart-line', title: 'Performance Insights', desc: 'Get detailed analytics on your practice sessions to identify weak areas and track your improvement.' },
    { icon: 'fa-clock-rotate-left', title: 'Revisit & Retake', desc: 'Every paper you attempt is saved. Revisit your mistakes and retake tests anytime for better mastery.' },
  ];

  const steps = [
    { num: '1', title: 'Register & Sign In', desc: 'Contact us via WhatsApp to get your account. Accounts are topic-specific to your exam.' },
    { num: '2', title: 'Select Your Subject', desc: 'Choose from your assigned lecturer subjects and configure how many questions you want.' },
    { num: '3', title: 'Master the Papers', desc: 'Attempt authentic papers, review detailed answers, and track your progress toward success.' },
  ];

  setV(`
<div class="lp" id="landing-page">

  <!-- ─────────────── NAV ─────────────── -->
  <nav class="lp-nav" id="lp-nav">
    <div class="lp-container lp-nav-inner">
      <a class="brand" href="/" onclick="window._navigate(event,'/')">
        <div class="brand-mark"><i class="fa-solid fa-graduation-cap"></i></div>
        <div class="brand-text">
          <span class="brand-name">${t('brand_name')}</span>
          <span class="brand-sub">Career Excellence</span>
        </div>
      </a>
      <div class="lp-nav-spacer"></div>
      <div class="lp-nav-actions">
        <button class="icon-btn" onclick="window._toggleTheme()" title="Toggle theme">
          <i class="fa-solid fa-circle-half-stroke"></i>
        </button>
        <button class="lp-btn-nav" onclick="window._go('/login')">
          ${t('landing_signin')}
        </button>
      </div>
    </div>
  </nav>

  <!-- ─────────────── HERO ─────────────── -->
  <section class="lp-hero">
    <div class="lp-hero-glow"></div>
    <div class="lp-container lp-hero-grid">

      <!-- Left column -->
      <div class="lp-hero-content">
        <div class="lp-eyebrow">
          <span class="lp-eyebrow-dot"></span>
          AJK Public Service Commission
        </div>

        <h1 class="lp-headline">
          ${t('brand_name')}<br>
          <span class="lp-headline-accent">Ace Your PSC Exam</span>
        </h1>

        <p class="lp-subtext">
          ${t('landing_sub')}
        </p>

        <div class="lp-hero-ctas">
          <button class="lp-btn-primary" onclick="window._go('/login')">
            <i class="fa-solid fa-arrow-right-to-bracket"></i> Get Started
          </button>
          <button class="lp-btn-outline" onclick="window._go('/quizzes')">
            <i class="fa-solid fa-book-open"></i> Browse Quizzes
          </button>
        </div>

        <div class="lp-stats">
          <div class="lp-stat">
            <span class="lp-stat-value">10+</span>
            <span class="lp-stat-label">Years Papers</span>
          </div>
          <div class="lp-stat-divider"></div>
          <div class="lp-stat">
            <span class="lp-stat-value">50k+</span>
            <span class="lp-stat-label">MCQs Data</span>
          </div>
          <div class="lp-stat-divider"></div>
          <div class="lp-stat">
            <span class="lp-stat-value">18+</span>
            <span class="lp-stat-label">Subjects</span>
          </div>
          <div class="lp-stat-divider"></div>
          <div class="lp-stat">
            <span class="lp-stat-value">100%</span>
            <span class="lp-stat-label">Authentic</span>
          </div>
        </div>
      </div>

      <!-- Right column: Academy Logo -->
      <div class="lp-hero-logo">
        <img src="/images/logo.png" alt="Career Boost Officers Academy" class="lp-hero-logo-img" />
      </div>
    </div>
  </section>

  <!-- ─────────────── FEATURES ─────────────── -->
  <section class="lp-section" id="features">
    <div class="lp-container">
      <div class="lp-section-header">
        <span class="lp-badge"><i class="fa-solid fa-sparkles"></i> Platform Features</span>
        <h2 class="lp-section-title">Everything you need to prepare</h2>
        <p class="lp-section-desc">
          Our platform is designed specifically for AJK PSC candidates, with tools that adapt to your exam needs.
        </p>
      </div>
      <div class="lp-features-grid">
        ${features.map((f, i) => `
        <div class="lp-feat-card" style="animation-delay:${i * 0.07}s">
          <div class="lp-feat-icon"><i class="fa-solid ${f.icon}"></i></div>
          <h3 class="lp-feat-title">${f.title}</h3>
          <p class="lp-feat-desc">${f.desc}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- ─────────────── TOPICS ─────────────── -->
  <section class="lp-section lp-section-alt" id="topics">
    <div class="lp-container">
      <div class="lp-section-header">
        <span class="lp-badge"><i class="fa-solid fa-list-check"></i> Available Subjects</span>
        <h2 class="lp-section-title">18+ PSC Lecturer Subjects</h2>
        <p class="lp-section-desc">
          Comprehensive topic coverage for all AJK Public Service Commission lecturer positions.
        </p>
      </div>
      <div class="lp-topics-wrap">
        ${topics.map(tp => `
        <span class="lp-topic-pill">
          <i class="fa-solid ${tp.icon}"></i> ${tp.label}
        </span>`).join('')}
      </div>
    </div>
  </section>

  <!-- ─────────────── HOW IT WORKS ─────────────── -->
  <section class="lp-section" id="how-it-works">
    <div class="lp-container">
      <div class="lp-section-header">
        <span class="lp-badge"><i class="fa-solid fa-map"></i> How It Works</span>
        <h2 class="lp-section-title">Start practicing in 3 steps</h2>
      </div>
      <div class="lp-steps">
        ${steps.map(s => `
        <div class="lp-step">
          <div class="lp-step-num">${s.num}</div>
          <div class="lp-step-body">
            <h3 class="lp-step-title">${s.title}</h3>
            <p class="lp-step-desc">${s.desc}</p>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- ─────────────── CTA BANNER ─────────────── -->
  <section class="lp-cta" id="cta">
    <div class="lp-container lp-cta-inner">
      <div class="lp-cta-text">
        <h2 class="lp-cta-title">Ready to start preparing?</h2>
        <p class="lp-cta-desc">Join candidates already using the platform to ace their lecturer exams.</p>
      </div>
      <button class="lp-btn-primary" onclick="window._go('/login')">
        <i class="fa-solid fa-arrow-right-to-bracket"></i> Get Started
      </button>
    </div>
  </section>

  <!-- ─────────────── FOOTER ─────────────── -->
  <footer class="lp-footer">
    <div class="lp-container lp-footer-inner">
      <div class="lp-footer-brand">
        <div class="brand-mark" style="width:24px;height:24px;font-size:10px"><i class="fa-solid fa-graduation-cap"></i></div>
        <span>© ${new Date().getFullYear()} Career Boost Officers Academy · All rights reserved</span>
      </div>
      <div class="lp-footer-links">
        <a href="https://wa.me/923428910567" target="_blank" class="lp-footer-link">Contact</a>
      </div>
    </div>
  </footer>

  <!-- ─────────────── FLOATING WHATSAPP FAB ─────────────── -->
  <a href="https://wa.me/923428910567?text=Hello%2C%20I%20want%20to%20register%20for%20AJK%20PSC%20Exam%20Prep"
     target="_blank" class="lp-fab-whatsapp" title="Contact for Registration">
    <i class="fa-brands fa-whatsapp"></i>
    <span class="lp-fab-label">Register</span>
  </a>

</div>`);

  // Scroll-linked nav background
  const nav = document.getElementById('lp-nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('lp-nav-scrolled', window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
}