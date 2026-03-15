import { state } from '../state.js';
import { $, setP, setV, t, api } from '../helpers.js';
import { go } from '../router.js';

/* ═══════════════════════════════════════════════════════════════════════
   QUIZ LIBRARY  /quizzes
═══════════════════════════════════════════════════════════════════════ */
export async function renderQuizLibrary() {
  setP(20);
  setV(`<div class="page"><div class="loader-wrap"><div class="spinner"></div><div class="loader-title">${t('quiz_lib_title')}…</div></div></div>`);

  try {
    const { ok, data } = await api('GET', '/api/quizzes/public?limit=24', null, true);
    if (!ok) throw new Error(data?.error || 'Failed to load quizzes');

    const quizzes = data.quizzes || [];
    const rows = quizzes.length
      ? quizzes.map(q => {
          const date = q.createdAt ? new Date(q.createdAt).toLocaleDateString() : '';
          return `<div class="card" style="padding:18px;cursor:pointer;transition:box-shadow .2s" onclick="window._go('/quiz/${q.quizId}')">
  <div style="display:flex;align-items:center;gap:12px">
    <div class="topic-card-icon"><i class="fa-solid fa-book-open"></i></div>
    <div style="flex:1;min-width:0">
      <div style="font-weight:600;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${q.topic || q.professionId || 'Quiz'}</div>
      <div style="font-size:12px;color:var(--fg-muted);margin-top:2px">${q.count} questions · ${(q.lang||'').toUpperCase()}${date ? ' · ' + date : ''}</div>
    </div>
    <i class="fa-solid fa-arrow-right" style="color:var(--fg-subtle)"></i>
  </div>
</div>`;
        }).join('')
      : `<div class="state-box"><div class="state-icon warn"><i class="fa-solid fa-inbox"></i></div><div class="state-title">No quizzes yet</div><div class="state-desc">No public quizzes are available yet. Check back later.</div></div>`;

    setV(`<div class="page" style="animation:fadeUp .25s ease both">
  <div class="page-header">
    ${state.user ? `<div class="page-breadcrumb"><span data-nav onclick="window._go('/dashboard')">${t('user_dashboard')}</span><span class="sep">/</span><span class="current">${t('quiz_lib_title')}</span></div>` : ''}
    <div class="page-title">${t('quiz_lib_title')}</div>
    <p class="page-desc">${t('quiz_lib_sub')}</p>
  </div>
  <div style="display:flex;flex-direction:column;gap:10px">${rows}</div>
  ${!state.user ? `<div class="callout" style="margin-top:24px;background:var(--accent-subtle);border:1px solid var(--accent-border);border-radius:var(--radius-lg);padding:14px 18px;display:flex;align-items:center;gap:12px;font-size:13px">
    <i class="fa-solid fa-lock" style="color:var(--accent)"></i>
    <div><strong>Sign in to attempt quizzes</strong> — Full quiz results and scoring require an account.
      <button class="btn btn-accent btn-sm" onclick="window._go('/login')" style="margin-inline-start:10px">Sign In</button>
    </div>
  </div>` : ''}
</div>`);
    setP(100);
  } catch (e) {
    setV(`<div class="page"><div class="state-box">
  <div class="state-icon error"><i class="fa-solid fa-triangle-exclamation"></i></div>
  <div class="state-title">Failed to load</div>
  <div class="state-desc">${e.message}</div>
  <button class="btn btn-accent" onclick="window._go('/quizzes')"><i class="fa-solid fa-rotate-right"></i> Retry</button>
</div></div>`);
    setP(0);
  }
}
