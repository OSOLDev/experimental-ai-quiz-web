import { state } from './state.js';
import { $, t, setP, setV, hideBar } from './helpers.js';

// Renderer Imports
import { renderLanding } from './render/landing.js';
import { renderLogin } from './render/login.js';
import { renderUserDashboard } from './render/user-dashboard.js';
import { renderTopicsView } from './render/topics.js';
import { renderQuizAttemptOrPreview } from './render/quiz-attempt.js';
import { renderResultPage } from './render/result.js';
import { renderAdmin } from './render/admin.js';
import { renderQuizLibrary } from './render/quiz-library.js';

/* ═══════════════════════════════════════════════════════════════════════
   HISTORY API ROUTER
═══════════════════════════════════════════════════════════════════════ */

export function navigate(e, path) {
  if (e) { e.preventDefault(); e.stopPropagation(); }
  if (path === location.pathname + location.search) return;
  history.pushState(null, '', path);
  route();
}

export function go(path) {
  history.pushState(null, '', path);
  route();
}

window.addEventListener('popstate', () => route());

export function matchRoute(pattern, path) {
  const patternParts = pattern.split("/");
  const pathParts = path.split("/");
  if (patternParts.length !== pathParts.length) return null;
  const params = {};
  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(":")) {
      params[patternParts[i].slice(1)] = decodeURIComponent(pathParts[i]);
    } else if (patternParts[i] !== pathParts[i]) {
      return null;
    }
  }
  return params;
}

export function route() {
  const p = location.pathname;
  const q = new URLSearchParams(location.search);
  console.log('[Router] Routing to:', p);
  hideBar();
  setP(10);

  const isAdminPage = p.startsWith('/admin');
  $('main-topbar').style.display = isAdminPage ? 'none' : '';

  // EXACT ROUTE DISPATCH AS PER PROMPT
  if (p === '/') {
    if (state.token && state.user) {
      if (state.user.role === 'admin' || state.user.uid === 'admin') return go('/admin');
      else return go('/dashboard');
    }
    console.log('[Router] Matching landing...');
    return renderLanding();
  }
  if (p === '/login') {
    console.log('[Router] Matching login...');
    return renderLogin();
  }
  if (p === '/dashboard') return requireAuth(() => renderUserDashboard());
  if (p === '/topics') return requireAuth(() => renderTopicsView({}));
  
  let match = matchRoute('/topics/:professionId', p);
  if (match) return requireAuth(() => renderTopicsView({ professionId: match.professionId }));

  match = matchRoute('/topics/:professionId/:categoryKey', p);
  if (match) return requireAuth(() => renderTopicsView({ professionId: match.professionId, categoryKey: match.categoryKey }));

  match = matchRoute('/quiz/:id', p);
  if (match) return renderQuizAttemptOrPreview(match.id, q);

  match = matchRoute('/result/:id', p);
  if (match) return requireAuth(() => renderResultPage(match.id, q.get('uid')));

  if (p === '/admin') return requireAdmin(() => renderAdmin('dashboard'));
  if (p === '/admin/users') return requireAdmin(() => renderAdmin('users'));
  if (p === '/admin/results') return requireAdmin(() => renderAdmin('results'));
  if (p === '/admin/quizzes') return requireAdmin(() => renderAdmin('quizzes'));

  if (p === '/quizzes') return renderQuizLibrary();

  // 404
  setV(`<div class="page"><div class="state-box">
    <div class="state-icon warn"><i class="fa-solid fa-map-pin"></i></div>
    <div class="state-title">Page Not Found</div>
    <div class="state-desc">The page <code>${p}</code> doesn't exist.</div>
    <button class="btn btn-accent" onclick="window._go('/')">Go Home</button>
  </div></div>`);
}

function requireAuth(fn) {
  if (!state.token || !state.user) { go('/login'); return; }
  fn();
}

function requireAdmin(fn) {
  if (!state.token || !state.user) { go('/login'); return; }
  if (state.user.role !== 'admin' && state.user.uid !== 'admin') { go('/'); return; }
  fn();
}

/* ═══════════════════════════════════════════════════════════════════════
   THEME & LANG
═══════════════════════════════════════════════════════════════════════ */
export function toggleTheme(e) {
  if (e) { e.preventDefault(); e.stopPropagation(); }
  const h = document.documentElement;
  const current = h.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  h.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  console.log('[Theme] Switched to:', next);
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
} else if (window.matchMedia('(prefers-color-scheme:dark)').matches) {
  document.documentElement.setAttribute('data-theme', 'dark');
}

export function toggleLang() {
  state.uiLang = state.uiLang === 'en' ? 'ur' : 'en';
  document.documentElement.setAttribute('data-lang', state.uiLang);
  document.documentElement.setAttribute('dir', state.uiLang === 'ur' ? 'rtl' : 'ltr');
  const label = $('lang-label');
  if (label) label.textContent = state.uiLang === 'en' ? 'اردو' : 'EN';
  renderChip();
  route();
}

/* ═══════════════════════════════════════════════════════════════════════
   USER CHIP & DROPDOWN
═══════════════════════════════════════════════════════════════════════ */
export function renderChip() {
  const c = $('user-chip-container');
  const n = $('notif-dd');
  if (!state.user) { 
    if(c) c.innerHTML = ''; 
    if(n) n.style.display = 'none';
    return; 
  }
  if (n) {
    n.style.display = 'block';
    updateNotifs();
  }
  const init = (state.user.name || '?')[0].toUpperCase();
  const isAdmin = state.user.role === 'admin' || state.user.uid === 'admin';
  c.innerHTML = `
    <div class="dropdown" id="user-dd">
      <div class="user-chip" onclick="window._toggleUMenu()">
        <div class="user-avatar">${init}</div>
      </div>
      <div class="dropdown-menu" id="user-menu">
        <div class="dropdown-item user-info-header">
          <div class="user-avatar-large">${init}</div>
          <div class="user-details">
            <div class="user-name-title">${state.user.name || 'User'}</div>
            <div class="user-email-label">${state.user.email || (isAdmin ? 'Admin' : 'Student')}</div>
          </div>
        </div>
        <div class="dropdown-divider"></div>
        ${!isAdmin ? `<div class="dropdown-item" onclick="window._closeUMenu();window._go('/dashboard')"><i class="fa-solid fa-gauge"></i>${t('user_dashboard')}</div>` : ''}
        ${!isAdmin ? `<div class="dropdown-item" onclick="window._closeUMenu();window._go('/topics')"><i class="fa-solid fa-list-check"></i>${t('my_topics')}</div>` : ''}
        ${isAdmin ? `<div class="dropdown-item" onclick="window._closeUMenu();window._go('/admin')"><i class="fa-solid fa-shield-halved"></i>${t('admin_dash')}</div>` : ''}

        <div class="dropdown-divider"></div>
        <div class="dropdown-item" onclick="event.stopPropagation();window._toggleTheme(event)">
          <i class="fa-solid fa-circle-half-stroke"></i>${t('toggle_theme') || 'Theme'}
        </div>
        <div class="dropdown-item" onclick="event.stopPropagation();window._toggleLang()">
          <i class="fa-solid fa-language"></i>${state.uiLang === 'en' ? 'اردو (Urdu)' : 'English'}
        </div>

        <div class="dropdown-divider"></div>
        <div class="dropdown-item danger" onclick="window._doLogout()"><i class="fa-solid fa-arrow-right-from-bracket"></i>${t('logout')}</div>
      </div>
    </div>`;
  document.addEventListener('click', function outer(e) {
    if (!$('user-dd')?.contains(e.target)) { closeUMenu(); }
    if (!$('notif-dd')?.contains(e.target)) { closeNotifMenu(); }
  });
}

/* ═══════════════════════════════════════════════════════════════════════
   NOTIFICATIONS
   ═══════════════════════════════════════════════════════════════════════ */
export function toggleNotifMenu(e) {
  if (e) { e.preventDefault(); e.stopPropagation(); }
  $('notif-menu')?.classList.toggle('open');
}

export function closeNotifMenu() {
  $('notif-menu')?.classList.remove('open');
}

export function updateNotifs() {
  const list = $('notif-list');
  const dot = $('notif-dot');
  if (!list) return;

  const notifs = state.user?.notifications || [];
  if (notifs.length === 0) {
    list.innerHTML = `<div class="notif-empty">No new notifications</div>`;
    if (dot) dot.style.display = 'none';
    return;
  }

  if (dot) dot.style.display = 'block';

  list.innerHTML = [...notifs].reverse().map(n => `
    <div class="notif-item">
      <div class="notif-item-title">${n.title}</div>
      <div class="notif-item-msg">${n.message}</div>
      <div class="notif-item-time">${new Date(n.createdAt).toLocaleDateString()}</div>
    </div>
  `).join('');
}

export function markAllRead(e) {
  if (e) { e.preventDefault(); e.stopPropagation(); }
  // For now, just clear locally
  if (state.user) {
    state.user.notifications = [];
    sessionStorage.setItem('psc_user', JSON.stringify(state.user));
    updateNotifs();
  }
}

export function toggleUMenu() { $('user-menu')?.classList.toggle('open'); }
export function closeUMenu() { $('user-menu')?.classList.remove('open'); }

export function doLogout() {
  state.token = null; 
  state.user = null; 
  state.currentQuiz = null; 
  state.answers = {};
  state.currentProfessionId = null; 
  state.qIdx = 0; 
  state.startTime = null;
  if (state.timerID) clearInterval(state.timerID);
  sessionStorage.removeItem('psc_token');
  sessionStorage.removeItem('psc_user');
  renderChip();
  hideBar(); setP(0);
  go('/');
}

Object.assign(window, {
  _go: go,
  _navigate: navigate,
  _toggleTheme: toggleTheme,
  _toggleUMenu: toggleUMenu,
  _closeUMenu: closeUMenu,
  _toggleNotifMenu: toggleNotifMenu,
  _closeNotifMenu: closeNotifMenu,
  _markAllRead: markAllRead,
  _toggleLang: toggleLang,
  _doLogout: doLogout
});