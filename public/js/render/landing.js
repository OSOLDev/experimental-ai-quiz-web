/* ═══════════════════════════════════════════════════════════════════════
       LANDING PAGE  /
    ═══════════════════════════════════════════════════════════════════════ */
    function renderLanding() {
      setP(100);
      $('main-topbar').style.display = 'none'; // landing has its own nav

      const topics = [
        { id:'LEC-ENG-17', icon:'fa-spell-check',   label:'Lecturer English' },
        { id:'LEC-URD-17', icon:'fa-book-open',      label:'Lecturer Urdu' },
        { id:'LEC-MATH-17',icon:'fa-square-root-variable', label:'Lecturer Mathematics' },
        { id:'LEC-CS-17',  icon:'fa-laptop-code',   label:'Computer Science' },
        { id:'LEC-PHY-17', icon:'fa-atom',           label:'Lecturer Physics' },
        { id:'LEC-CHEM-17',icon:'fa-flask',          label:'Lecturer Chemistry' },
        { id:'LEC-ISL-17', icon:'fa-moon',           label:'Islamic Studies' },
        { id:'LEC-PAK-17', icon:'fa-flag',           label:'Pakistan Studies' },
        { id:'LEC-GEO-17', icon:'fa-earth-asia',     label:'Lecturer Geography' },
        { id:'LEC-HIS-17', icon:'fa-landmark',       label:'Lecturer History' },
        { id:'LEC-EDU-17', icon:'fa-school',         label:'Lecturer Education' },
        { id:'LEC-ECO-17', icon:'fa-chart-line',     label:'Lecturer Economics' },
        { id:'LEC-POL-17', icon:'fa-scale-balanced', label:'Political Science' },
        { id:'LEC-BOT-17', icon:'fa-seedling',       label:'Lecturer Botany' },
        { id:'LEC-ZOO-17', icon:'fa-paw',            label:'Lecturer Zoology' },
        { id:'LEC-COM-17', icon:'fa-briefcase',      label:'Lecturer Commerce' },
        { id:'LEC-STAT-17',icon:'fa-chart-bar',      label:'Lecturer Statistics' },
        { id:'LEC-ARA-17', icon:'fa-star-and-crescent', label:'Lecturer Arabic' },
      ];

      setV(`
<div class="landing-page">

  <!-- ── NAV ── -->
  <nav class="landing-nav">
    <div class="landing-nav-inner">
      <a class="brand" href="/" onclick="navigate(event,'/')">
        <div class="brand-mark"><i class="fa-solid fa-graduation-cap"></i></div>
        <div class="brand-text">
          <span class="brand-name">AJK PSC Prep</span>
          <span class="brand-sub">Exam Platform</span>
        </div>
      </a>
      <div class="landing-nav-links">
        <button class="nav-link" onclick="go('/quizzes')">
          <i class="fa-solid fa-book-open"></i> ${t('quiz_lib_title')}
        </button>
      </div>
      <div style="display:flex;gap:8px;align-items:center;margin-inline-start:auto">
        <button class="lang-btn" onclick="toggleLang()">
          <i class="fa-solid fa-language"></i><span>${lang === 'en' ? 'اردو' : 'EN'}</span>
        </button>
        <button class="icon-btn" onclick="toggleTheme()"><i class="fa-solid fa-circle-half-stroke"></i></button>
        ${currentUser
          ? `<button class="btn btn-ghost btn-sm" onclick="go('/account')">
               <i class="fa-solid fa-arrow-right-to-bracket"></i> ${t('landing_signin')}
             </button>`
          : `<button class="btn btn-ghost btn-sm" onclick="go('/account')">
               <i class="fa-solid fa-arrow-right-to-bracket"></i> ${t('landing_signin')}
             </button>`
        }
      </div>
    </div>
  </nav>

  <!-- ── HERO SECTION ── -->
  <section class="landing-hero-section">
    <div class="landing-hero-inner">

      <!-- Left: Headline + CTA -->
      <div>
        <div class="landing-hero-eyebrow">
          <div class="landing-eyebrow-dot"></div>
          AJK Public Service Commission
        </div>

        <h1 class="landing-headline">
          Ace Your PSC Exam with<br>
          <em>AI-Powered</em> Practice
        </h1>

        <p class="landing-sub">
          ${t('landing_sub')}
        </p>

        <div class="landing-actions">
          <button class="btn-landing-primary" onclick="go('/account')">
            <i class="fa-solid fa-arrow-right-to-bracket"></i> ${t('landing_signin')}
          </button>
          <button class="btn-landing-ghost" onclick="go('/quizzes')">
            <i class="fa-solid fa-book-open"></i> Browse Quizzes
          </button>
        </div>

        <!-- Stats -->
        <div class="landing-stats-bar">
          <div class="landing-stat-item">
            <div class="landing-stat-num">18+</div>
            <div class="landing-stat-label">Exam Topics</div>
          </div>
          <div class="landing-stat-item">
            <div class="landing-stat-num">AI</div>
            <div class="landing-stat-label">Generated Qs</div>
          </div>
          <div class="landing-stat-item">
            <div class="landing-stat-num">2</div>
            <div class="landing-stat-label">Languages</div>
          </div>
          <div class="landing-stat-item">
            <div class="landing-stat-num">100%</div>
            <div class="landing-stat-label">Unique Quizzes</div>
          </div>
        </div>
      </div>

      <!-- Right: Sign-in Card -->
      <div class="landing-signin-card">
        <div class="landing-signin-card-title">
          <i class="fa-solid fa-graduation-cap" style="color:var(--brand);margin-inline-end:8px"></i>${t('landing_contact_title')}
        </div>
        <p class="landing-signin-card-sub">${t('landing_contact_note')}</p>

        <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:20px">
          <button class="btn btn-accent btn-full btn-lg" onclick="go('/account')">
            <i class="fa-solid fa-arrow-right-to-bracket"></i> ${t('landing_signin')}
          </button>
          <a href="https://wa.me/923428910567?text=Hello%2C%20I%20want%20to%20register%20for%20AJK%20PSC%20Exam%20Prep"
             target="_blank" class="btn btn-ghost btn-full" style="text-align:center;text-decoration:none">
            <i class="fa-brands fa-whatsapp"></i> ${t('landing_register')}
          </a>
        </div>

        <div class="landing-contact-row">
          <div class="landing-contact-icon"><i class="fa-brands fa-whatsapp"></i></div>
          <div>
            <div style="font-weight:600;font-size:13px">${t('landing_contact_whatsapp')}</div>
            <a href="https://wa.me/923428910567" target="_blank"
               style="font-size:13px;color:var(--brand);text-decoration:none;font-family:var(--font-mono)">+92 342 891 0567</a>
          </div>
        </div>

        <div style="margin-top:16px;padding:10px 12px;background:var(--brand-subtle);border:1px solid var(--brand-border);border-radius:var(--radius-md);font-size:12px;color:var(--brand);display:flex;align-items:center;gap:8px">
          <i class="fa-solid fa-circle-info"></i>
          Contact us on WhatsApp to register for the platform.
        </div>
      </div>
    </div>
  </section>

  <!-- ── FEATURES SECTION ── -->
  <div class="landing-features-section">
    <div class="landing-section-label">
      <i class="fa-solid fa-sparkles"></i> Platform Features
    </div>
    <h2 class="landing-section-title">Everything you need to prepare</h2>
    <p class="landing-section-desc">
      Our platform is designed specifically for AJK PSC candidates, with tools that adapt to your exam needs.
    </p>

    <div class="landing-features-grid">
      <div class="landing-feat-card" style="animation-delay:0.05s">
        <div class="landing-feat-card-icon"><i class="fa-solid fa-brain"></i></div>
        <div class="landing-feat-card-title">AI-Generated Questions</div>
        <div class="landing-feat-card-desc">Every quiz is freshly generated by advanced AI — no two sessions are the same.</div>
      </div>
      <div class="landing-feat-card" style="animation-delay:0.1s">
        <div class="landing-feat-card-icon"><i class="fa-solid fa-language"></i></div>
        <div class="landing-feat-card-title">Bilingual Support</div>
        <div class="landing-feat-card-desc">Full English and Urdu support with right-to-left layout for Urdu-medium exams.</div>
      </div>
      <div class="landing-feat-card" style="animation-delay:0.15s">
        <div class="landing-feat-card-icon"><i class="fa-solid fa-chart-pie"></i></div>
        <div class="landing-feat-card-title">Detailed Analytics</div>
        <div class="landing-feat-card-desc">See your score breakdown, correct/incorrect answers, and time taken per quiz.</div>
      </div>
      <div class="landing-feat-card" style="animation-delay:0.2s">
        <div class="landing-feat-card-icon"><i class="fa-solid fa-link"></i></div>
        <div class="landing-feat-card-title">Shareable Results</div>
        <div class="landing-feat-card-desc">Every quiz and result gets a unique URL — share with your tutors or revisit anytime.</div>
      </div>
    </div>
  </div>

  <!-- ── TOPICS SECTION ── -->
  <div class="landing-topics-section">
    <div class="landing-topics-inner">
      <div class="landing-section-label">
        <i class="fa-solid fa-list-check"></i> Available Subjects
      </div>
      <h2 class="landing-section-title">18+ PSC Lecturer Subjects</h2>
      <p class="landing-section-desc" style="margin-bottom:0">
        Comprehensive topic coverage for all AJK Public Service Commission lecturer positions.
      </p>
      <div class="landing-topics-grid">
        ${topics.map(tp => `
          <span class="landing-topic-pill">
            <i class="fa-solid ${tp.icon}"></i> ${tp.label}
          </span>`).join('')}
      </div>
    </div>
  </div>

  <!-- ── HOW IT WORKS ── -->
  <div class="landing-how-section">
    <div class="landing-section-label">
      <i class="fa-solid fa-map"></i> How It Works
    </div>
    <h2 class="landing-section-title">Start practicing in 3 steps</h2>
    <div class="landing-steps">
      <div class="landing-step">
        <div class="landing-step-num">1</div>
        <div>
          <div class="landing-step-title">Register & Sign In</div>
          <div class="landing-step-desc">Contact us via WhatsApp to get your account. Accounts are topic-specific to your exam.</div>
        </div>
      </div>
      <div class="landing-step">
        <div class="landing-step-num">2</div>
        <div>
          <div class="landing-step-title">Select Your Topic</div>
          <div class="landing-step-desc">Choose from your assigned lecturer subjects and configure how many questions you want.</div>
        </div>
      </div>
      <div class="landing-step">
        <div class="landing-step-num">3</div>
        <div>
          <div class="landing-step-title">Practice & Review</div>
          <div class="landing-step-desc">AI generates a unique quiz. Submit and get instant feedback with detailed answer review.</div>
        </div>
      </div>
    </div>
  </div>

  <!-- ── CTA BANNER ── -->
  <div class="landing-cta-section">
    <div class="landing-cta-inner">
      <div>
        <div class="landing-cta-title">Ready to start preparing?</div>
        <div class="landing-cta-desc">Join candidates already using AJK PSC Prep to ace their lecturer exams.</div>
      </div>
      <div class="landing-cta-btns">
        <button class="btn-landing-primary" onclick="go('/account')">
          <i class="fa-solid fa-arrow-right-to-bracket"></i> ${t('landing_signin')}
        </button>
        <a href="https://wa.me/923428910567?text=Hello%2C%20I%20want%20to%20register%20for%20AJK%20PSC%20Exam%20Prep"
           target="_blank" class="btn-landing-ghost" style="text-decoration:none">
          <i class="fa-brands fa-whatsapp"></i> Register Now
        </a>
      </div>
    </div>
  </div>

  <!-- ── FOOTER ── -->
  <footer style="border-top:1px solid hsl(var(--border));width:100%">
    <div class="landing-footer">
      <div style="display:flex;align-items:center;gap:10px">
        <div class="brand-mark" style="width:26px;height:26px;font-size:11px"><i class="fa-solid fa-graduation-cap"></i></div>
        <span>AJK PSC Exam Preparation Platform · Authorized access only</span>
      </div>
      <span style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="nav-link" onclick="go('/quizzes')">Quiz Library</button>
        <button class="nav-link" onclick="go('/account')">${t('landing_signin')}</button>
        <a href="https://wa.me/923428910567" target="_blank" class="nav-link">Contact</a>
      </span>
    </div>
  </footer>

</div>`);
    }

    