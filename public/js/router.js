/* ═══════════════════════════════════════════════════════════════════════
       HISTORY API ROUTER
    ═══════════════════════════════════════════════════════════════════════ */

    /** navigate(event, path) — use in onclick handlers for <a> tags */
    function navigate(e, path) {
      if (e) { e.preventDefault(); e.stopPropagation(); }
      if (path === location.pathname + location.search) return;
      history.pushState(null, '', path);
      route();
    }

    /** go(path) — programmatic navigation */
    function go(path) {
      history.pushState(null, '', path);
      route();
    }

    window.addEventListener('popstate', () => route());

    function route() {
      const p = location.pathname;
      const q = new URLSearchParams(location.search);

      // Hide quiz bar by default; pages that need it show it themselves
      hideBar();
      setP(10);

      // Topbar visibility — hide on admin pages (admin has own sidebar)
      const isAdminPage = p.startsWith('/admin');
      $('main-topbar').style.display = isAdminPage ? 'none' : '';

      // Show lang button only when user is signed in (not on landing — landing has its own)
      const langBtn = $('lang-toggle-btn');
      if (langBtn) langBtn.style.display = (currentUser && p !== '/') ? '' : 'none';

      // Dispatch
      if (p === '/') return renderLanding();
      if (p === '/account' || p === '/user/account' || p === '/admin/account') return renderLogin();
      if (p === '/user/dashboard') return requireAuth(() => renderUserDashboard());
      if (p === '/user/topics') return requireAuth(() => renderTopics());
      if (p === '/quizzes/create') return requireAuth(() => renderConfigure());
      if (p === '/quizzes') return requireAuth(() => renderQuizLibrary());
      if (p === '/admin/dashboard') return requireAdmin(() => renderAdmin('dashboard'));
      if (p === '/admin/users') return requireAdmin(() => renderAdmin('users'));
      if (p === '/admin/results') return requireAdmin(() => renderAdmin('results'));
      if (p === '/admin/quizzes') return requireAdmin(() => renderAdmin('quizzes'));

      // /quizzes/:id/results
      const rm = p.match(/^\/quizzes\/([^/]+)\/results$/);
      if (rm) return requireAuth(() => renderResultPage(rm[1], q.get('uid')));

      // /quizzes/:id
      const qm = p.match(/^\/quizzes\/([^/]+)$/);
      if (qm) return renderQuizAttemptOrPreview(qm[1], q);

      // 404
      setV(`<div class="page"><div class="state-box">
    <div class="state-icon warn"><i class="fa-solid fa-map-pin"></i></div>
    <div class="state-title">Page Not Found</div>
    <div class="state-desc">The page <code>${p}</code> doesn't exist.</div>
    <button class="btn btn-accent" onclick="go('/')">Go Home</button>
  </div></div>`);
    }

    function requireAuth(fn) {
      if (!authToken || !currentUser) { go('/account'); return; }
      fn();
    }
    function requireAdmin(fn) {
      if (!authToken || !currentUser) { go('/account'); return; }
      if (currentUser.role !== 'admin' && currentUser.uid !== 'admin') { go('/'); return; }
      fn();
    }

    /* ═══════════════════════════════════════════════════════════════════════
       THEME & LANG
    ═══════════════════════════════════════════════════════════════════════ */
    function toggleTheme() {
      const h = document.documentElement, cur = h.getAttribute('data-theme');
      const dark = cur === 'dark' || (!cur && window.matchMedia('(prefers-color-scheme:dark)').matches);
      h.setAttribute('data-theme', dark ? 'light' : 'dark');
    }
    if (window.matchMedia('(prefers-color-scheme:dark)').matches)
      document.documentElement.setAttribute('data-theme', 'dark');

    function toggleLang() {
      lang = lang === 'en' ? 'ur' : 'en';
      document.documentElement.setAttribute('data-lang', lang);
      document.documentElement.setAttribute('dir', lang === 'ur' ? 'rtl' : 'ltr');
      $('lang-label').textContent = lang === 'en' ? 'اردو' : 'EN';
      renderChip();
      route();
    }

    /* ═══════════════════════════════════════════════════════════════════════
       USER CHIP & DROPDOWN
    ═══════════════════════════════════════════════════════════════════════ */
    function renderChip() {
      const c = $('user-chip-container');
      if (!currentUser) { c.innerHTML = ''; return; }
      const init = (currentUser.name || '?')[0].toUpperCase();
      const isAdmin = currentUser.role === 'admin' || currentUser.uid === 'admin';
      c.innerHTML = `
    <div class="dropdown" id="user-dd">
      <div class="user-chip" onclick="toggleUMenu()">
        <div class="user-avatar">${init}</div>
        <span class="user-chip-name">${currentUser.name}</span>
        <i class="fa-solid fa-chevron-down" style="font-size:10px;color:var(--fg-subtle);margin-inline-start:2px"></i>
      </div>
      <div class="dropdown-menu" id="user-menu">
        ${!isAdmin ? `<div class="dropdown-item" onclick="closeUMenu();go('/user/dashboard')"><i class="fa-solid fa-gauge"></i>${t('user_dashboard')}</div>` : ''}
        ${!isAdmin ? `<div class="dropdown-item" onclick="closeUMenu();go('/user/topics')"><i class="fa-solid fa-list-check"></i>${t('my_topics')}</div>` : ''}
        ${isAdmin ? `<div class="dropdown-item" onclick="closeUMenu();go('/admin/dashboard')"><i class="fa-solid fa-shield-halved"></i>${t('admin_dash')}</div>` : ''}
        <div class="dropdown-divider"></div>
        <div class="dropdown-item" onclick="closeUMenu();toggleLang()">
          <i class="fa-solid fa-language"></i>${lang === 'en' ? 'اردو میں تبدیل کریں' : 'Switch to English'}
        </div>
        <div class="dropdown-divider"></div>
        <div class="dropdown-item danger" onclick="doLogout()"><i class="fa-solid fa-arrow-right-from-bracket"></i>${t('logout')}</div>
      </div>
    </div>`;
      document.addEventListener('click', function outer(e) {
        if (!$('user-dd')?.contains(e.target)) { closeUMenu(); document.removeEventListener('click', outer); }
      });
    }
    function toggleUMenu() { $('user-menu')?.classList.toggle('open'); }
    function closeUMenu() { $('user-menu')?.classList.remove('open'); }

    function doLogout() {
      authToken = null; currentUser = null; quiz = null; answers = {};
      profession = null; qIdx = 0; startTime = null;
      if (timerID) clearInterval(timerID);
      sessionStorage.removeItem('psc_token');
      sessionStorage.removeItem('psc_user');
      renderChip();
      hideBar(); setP(0);
      go('/');
    }

    