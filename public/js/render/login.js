import { state } from '../state.js';
import { $, t, setP, setV, hideBar, api } from '../helpers.js';
import { go, renderChip } from '../router.js';

/* ═══════════════════════════════════════════════════════════════════════
   LOGIN PAGE  /login
═══════════════════════════════════════════════════════════════════════ */
export function renderLogin() {
      setP(0); hideBar();
  // If already logged in, redirect immediately
  if (state.token && state.user) {
    if (state.user.role === 'admin' || state.user.uid === 'admin') go('/admin');
    else go('/dashboard');
    return;
  }
      setV(`
    <div class="login-wrap">
      <div class="login-hero">
        <div class="hero-pattern"></div>
        <div class="hero-content">
          <div class="hero-badge"><i class="fa-solid fa-graduation-cap"></i> AJK PUBLIC SERVICE COMMISSION</div>
          <h1 class="hero-title">AI-Powered Exam<br>Preparation Platform</h1>
          <p class="hero-desc">Prepare for AJK PSC exams with intelligent, topic-specific practice quizzes.</p>
          <div class="hero-features">
            <div class="hero-feature"><div class="hero-feature-icon"><i class="fa-solid fa-brain"></i></div>AI-generated questions</div>
            <div class="hero-feature"><div class="hero-feature-icon"><i class="fa-solid fa-language"></i></div>Bilingual support</div>
            <div class="hero-feature"><div class="hero-feature-icon"><i class="fa-solid fa-chart-line"></i></div>Performance analytics</div>
            <div class="hero-feature"><div class="hero-feature-icon"><i class="fa-solid fa-link"></i></div>Shareable results</div>
          </div>
        </div>
      </div>
      <div class="login-box-wrap">
        <div class="login-box">
          <div class="login-header" style="text-align:center;margin-bottom:20px">
            <h1 class="login-title">${t('login_title')}</h1>
            <p class="login-sub">${t('login_sub')}</p>
          </div>
          <div class="card" style="padding:28px;display:flex;flex-direction:column;gap:18px">
            <div class="field">
              <label class="field-label">${t('login_email')}</label>
              <div class="input-wrap">
                <i class="fa-solid fa-envelope input-icon"></i>
                <input id="l-email" type="email" class="field-input has-icon" placeholder="you@example.com" autocomplete="email">
              </div>
            </div>
            <div class="field">
              <label class="field-label">${t('login_pass')}</label>
              <div class="input-wrap">
                <i class="fa-solid fa-lock input-icon"></i>
                <input id="l-pass" type="password" class="field-input has-icon has-icon-end" placeholder="••••••••" autocomplete="current-password">
                <button class="password-toggle" type="button" onclick="window._togglePassword('l-pass', 'tp-icon')">
                  <i class="fa-solid fa-eye" id="tp-icon"></i>
                </button>
              </div>
              <div class="field-error" id="login-err"></div>
            </div>
            <button class="btn btn-accent btn-full btn-lg" id="login-btn" onclick="window._submitLogin()">
              <i class="fa-solid fa-arrow-right-to-bracket"></i> ${t('login_btn')}
            </button>
          </div>
          <div style="text-align:center;margin-top:14px;font-size:12px;color:var(--fg-subtle)">
            <button class="nav-link" onclick="window._go('/')">← ${t('back')} to home</button>
          </div>
        </div>
      </div>
    </div>`);
  ['l-email', 'l-pass'].forEach((id, i, arr) => {
    $(id)?.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); i < arr.length - 1 ? $(arr[i + 1]).focus() : submitLogin(); } });
  });
  setTimeout(() => $('l-email')?.focus(), 100);
}

export async function submitLogin() {
      const email = $('l-email')?.value.trim();
      const pass = $('l-pass')?.value;
      const errEl = $('login-err'), btn = $('login-btn');
      errEl.textContent = ''; errEl.classList.remove('visible');
      if (!email || !pass) { errEl.textContent = t('err_invalid'); errEl.classList.add('visible'); return; }
      btn.disabled = true; btn.innerHTML = '<div class="spinner" style="width:16px;height:16px;border-width:2px"></div>';
      try {
    const { ok, status, data } = await api('POST', '/api/auth/login', { email, password: pass }, true);
    if (!ok) {
      const msg = status === 403 ? t('err_expired') : status === 401 ? t('err_invalid') : data.error || t('err_generic');
      errEl.textContent = msg; errEl.classList.add('visible');
      btn.disabled = false; btn.innerHTML = `<i class="fa-solid fa-arrow-right-to-bracket"></i> ${t('login_btn')}`;
      return;
    }
    state.token = data.token; 
    state.user = data.user;
    sessionStorage.setItem('psc_token', state.token);
    sessionStorage.setItem('psc_user', JSON.stringify(state.user));
    renderChip();
    if (state.user.role === 'admin' || state.user.uid === 'admin') go('/admin');
    else go('/dashboard');
      } catch (e) {
        errEl.textContent = e.message; errEl.classList.add('visible');
        btn.disabled = false; btn.innerHTML = `<i class="fa-solid fa-arrow-right-to-bracket"></i> ${t('login_btn')}`;
      }
    }

Object.assign(window, {
  _submitLogin: submitLogin
});