import { state } from '../state.js';
import { PROF_MAP } from '../constants.js';
import { $, setP, setV, toast, api, modal, closeModal, showBar, mdInline, applyMath, t } from '../helpers.js';
import { go } from '../router.js';
import { saveAndRenderResults } from './result.js';

/* ═══════════════════════════════════════════════════════════════════════
   QUIZ ATTEMPT  /quiz/:id
═══════════════════════════════════════════════════════════════════════ */

/** Called by router for /quiz/:id */
export async function renderQuizAttemptOrPreview(quizId, params) {
  const isPreview = params?.get('preview') === '1';
  if (isPreview) {
    renderQuizPublicPreview(quizId, { showAttempt: !!(state.token && state.user) });
    return;
  }
  // If quiz is already loaded in memory for this quizId, render it directly
  if (state.currentQuiz && state._currentQuizId === quizId) {
    renderQuiz(state.qIdx);
    return;
  }
  // Public preview mode (no auth) OR auth attempt
  if (!state.token || !state.user) {
        renderQuizPublicPreview(quizId, { showAttempt: false });
        return;
      }
  // Authenticated — check topic access before loading
  const isAdmin = state.user?.role === 'admin' || state.user?.uid === 'admin';
      setP(30);
      setV(`<div class="page"><div class="loader-wrap"><div class="spinner"></div><div class="loader-title">Loading quiz…</div></div></div>`);
      try {
        const { ok, data } = await api('GET', `/api/quizzes/${quizId}`);
    if (!ok) {
      const isAccessDenied = data.error?.includes('Forbidden') || data.error?.includes('plan');
      setV(`<div class="page"><div class="state-box">
    <div class="state-icon error"><i class="fa-solid fa-${isAccessDenied ? 'lock' : 'triangle-exclamation'}"></i></div>
    <div class="state-title">${isAccessDenied ? 'Access Denied' : 'Quiz Not Found'}</div>
    <div class="state-desc">${isAccessDenied ? 'This quiz belongs to a topic not included in your plan. Contact admin to get access.' : data.error || 'This quiz does not exist.'}</div>
    <div style="display:flex;gap:10px;margin-top:8px">
      <button class="btn btn-accent" onclick="window._go('/dashboard')">Dashboard</button>
      ${isAccessDenied ? `<a href="https://wa.me/923428910567" target="_blank" class="btn btn-ghost"><i class="fa-brands fa-whatsapp"></i> Contact Admin</a>` : ''}
    </div>
  </div></div>`);
      return;
    }
    state.currentQuiz = data.questions;
    state.answers = {};
    state.qIdx = 0;
    state._currentQuizId = quizId;
    state._currentQuizSource = data._source || 'ai';
    state.startTime = Date.now();
    // Set profession from quiz data for result display
    if (data.professionId && PROF_MAP[data.professionId]) {
      state.currentProfessionId = data.professionId;
    } else if (!state.currentProfessionId) {
      state.currentProfessionId = data.professionId || 'unknown';
    }
    if (state.timerID) clearInterval(state.timerID);
    state.timerID = setInterval(updateBar, 1000);
    setP(70);
    renderQuiz(0);
  } catch (e) {
    toast(e.message, 'error');
    go('/dashboard');
  }
}

/** Public preview — no correct answers shown */
export async function openQuizPreview(quizId) {
  // Navigate to proper preview URL
  go(`/quiz/${quizId}?preview=1`);
}

export async function renderQuizPublicPreview(quizId, opts = {}) {
      const { showAttempt = false } = opts;
      setP(20);
      setV(`<div class="page"><div class="loader-wrap"><div class="spinner"></div><div class="loader-title">Loading quiz…</div></div></div>`);
      try {
    const { ok, data } = await api('GET', `/api/quizzes/${quizId}?preview=1`, null, true);
    if (!ok) { setV(`<div class="page"><div class="state-box"><div class="state-icon error"><i class="fa-solid fa-triangle-exclamation"></i></div><div class="state-title">Quiz Not Found</div><div class="state-desc">${data.error || 'This quiz does not exist.'}</div><button class="btn btn-ghost" onclick="window._go('/')">Go Home</button></div></div>`); return; }
      const items = (data.questions || []).map((q, i) => {
            const qHtml = mdInline(q.question);
            return `
        <div style="background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-lg);padding:18px;margin-bottom:10px">
          <div style="font-weight:600;font-size:14px;margin-bottom:12px" class="md">${i + 1}. ${qHtml}</div>
          <div style="display:flex;flex-direction:column;gap:6px">
            ${(q.options || []).map((o, j) => `<div style="display:flex;align-items:center;gap:10px;padding:10px 14px;border:1.5px solid var(--border);border-radius:var(--radius-md);font-size:13px">
              <div style="width:24px;height:24px;border-radius:50%;border:1.5px solid var(--border-strong);display:grid;place-items:center;font-size:11px;font-weight:700;font-family:var(--font-mono);flex-shrink:0">${'ABCD'[j]}</div><span class="md">${mdInline(o)}</span>
            </div>`).join('')}
          </div>
        </div>`;
          }).join('');
        setV(`<div class="page" style="animation:fadeUp .25s ease both">
    <div class="page-header">
      <div class="page-breadcrumb">
        <span data-nav onclick="window._go('/')">Home</span>
        <span class="sep">/</span><span class="current">Preview</span>
      </div>
        <div class="page-title">${data.topic || 'Quiz'}</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
          ${data.professionId ? `<span class="badge badge-default">${data.professionId}</span>` : ''}
          <span class="badge badge-default">${data.count} questions</span>
          <span class="badge badge-default">${(data.lang || '').toUpperCase()}</span>
        </div>
      </div>
  ${showAttempt ? `
  <div class="callout" style="background:var(--accent-subtle);border:1px solid var(--accent-border);border-radius:var(--radius-lg);padding:14px 18px;margin-bottom:20px;display:flex;align-items:center;gap:12px;font-size:13px">
    <i class="fa-solid fa-circle-play" style="color:var(--accent)"></i>
    <div><strong>Preview mode</strong> - Correct answers are hidden.
      <button class="btn btn-accent btn-sm" onclick="window._go('/quiz/${quizId}')" style="margin-inline-start:10px">Attempt Quiz</button>
    </div>
  </div>` : `
  <div class="callout" style="background:var(--accent-subtle);border:1px solid var(--accent-border);border-radius:var(--radius-lg);padding:14px 18px;margin-bottom:20px;display:flex;align-items:center;gap:12px;font-size:13px">
    <i class="fa-solid fa-lock" style="color:var(--accent)"></i>
    <div><strong>Sign in to attempt this quiz</strong> — Correct answers are hidden in preview mode.
      <button class="btn btn-accent btn-sm" onclick="window._go('/login')" style="margin-inline-start:10px">Sign In</button>
    </div>
  </div>`}
      ${items}
      </div>`);
          applyMath($('main-content'));
          setP(100);
      } catch (e) { toast(e.message, 'error'); }
    }

/* ═══════════════════════════════════════════════════════════════════════
   QUIZ UI (shared between generate flow and direct URL)
═══════════════════════════════════════════════════════════════════════ */
export function renderQuiz(idx) {
  state.qIdx = idx;
  const q = state.currentQuiz[idx], total = state.currentQuiz.length, answered = Object.keys(state.answers).length;
  const profession = PROF_MAP[state.currentProfessionId];
  const isRTL = profession?.lang === 'ur';
  const qHtml = mdInline(q.question);
  updateBar(answered, total); showBar();
  setP(70 + (answered / total) * 20);
  const opts = q.options.map((o, i) => {
    const sel = state.answers[idx] === o;
    return `<button class="option-btn ${sel ? 'selected' : ''}" data-answer="${encodeURIComponent(o)}" onclick="window._pickAnswer(${idx},this)">
          <div class="option-letter">${'ABCD'[i]}</div>
          <span class="option-text md" style="${isRTL ? 'direction:rtl' : ''}">${mdInline(o)}</span>
        </button>`;
      }).join('');
  const dots = state.currentQuiz.map((_, i) => `<div class="q-dot ${i === idx ? 'current' : state.answers[i] !== undefined ? 'answered' : ''}" onclick="window._renderQuiz(${i})">${i + 1}</div>`).join('');
  const topicLabel = profession ? (state.uiLang === 'ur' ? profession.label_ur : profession.label_en) : 'Quiz';
  setV(`<div class="page page-md" style="animation:fadeUp .2s ease both">
<div class="page-breadcrumb" style="margin-bottom:12px">
  <span data-nav onclick="window._go('/topics')">${t('choose_topic')}</span>
  <span class="sep">/</span><span>${topicLabel}</span><span class="sep">/</span>
      <span class="current">Question ${idx + 1}</span>
    </div>
    <div class="question-card">
      <div class="question-head">
        <span class="question-num">${t('q_of', { n: idx + 1, total })}</span>
      <span class="badge badge-${answered === total ? 'success' : 'default'}">${answered}/${total} ${t('answered')}</span>
      ${state._currentQuizSource === 'cache' ? `<span class="badge" style="background:var(--warning-subtle);color:var(--warning);font-size:10px">${t('quiz_source_cache')}</span>` : ''}
      </div>
      <div class="question-body">
        <div class="question-text md" style="${isRTL ? 'direction:rtl;text-align:right' : ''}">${qHtml}</div>
        <div class="options-list">${opts}</div>
      </div>
    <div class="question-nav">
      <button class="btn btn-ghost" onclick="window._renderQuiz(${idx - 1})" ${idx === 0 ? 'disabled' : ''}>
        <i class="fa-solid fa-arrow-left"></i> ${t('back')}
      </button>
      <div style="display:flex;gap:8px">
        <button class="btn btn-ghost btn-sm" onclick="window._openQNav()"><i class="fa-solid fa-grip"></i></button>
        <button class="btn ${idx < total - 1 ? 'btn-ghost' : 'btn-accent'}" onclick="${idx < total - 1 ? `window._renderQuiz(${idx + 1})` : 'window._openSubmitModal()'}">
          ${idx < total - 1 ? `${t('next')} <i class="fa-solid fa-arrow-right"></i>` : `<i class="fa-solid fa-flag-checkered"></i> ${t('submit_quiz')}`}
        </button>
      </div>
      </div>
    </div>
    <div class="mob-q-nav">
      <div class="mob-q-nav-head" onclick="this.nextElementSibling.classList.toggle('open');this.querySelector('.mob-nav-chevron').style.transform=this.nextElementSibling.classList.contains('open')?'rotate(180deg)':''">
        <span><i class="fa-solid fa-grip" style="margin-inline-end:6px;font-size:11px"></i>${t('answered_of', { n: answered, total })}</span>
        <i class="fa-solid fa-chevron-down mob-nav-chevron" style="font-size:10px;transition:transform 200ms"></i>
      </div>
      <div class="mob-q-nav-body">
        <div class="q-grid">${dots}</div>
      </div>
    </div>
    </div>`);
      applyMath($('main-content'));
  }

export function pickAnswer(idx, btn) {
  const answer = decodeURIComponent(btn.dataset.answer || '');
  state.answers[idx] = answer;
  btn.closest('.options-list').querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  const dot = document.querySelectorAll('.q-dot')[idx];
  if (dot) { dot.classList.remove('current'); dot.classList.add('answered'); }
  updateBar();
  setTimeout(() => { if (idx < state.currentQuiz.length - 1) renderQuiz(idx + 1); else openSubmitModal(); }, 400);
}

export function updateBar() {
  const answered = Object.keys(state.answers).length, total = state.currentQuiz?.length || 0;
  const el = $('sb-answered'); if (el) el.textContent = t('answered_of', { n: answered, total });
  const tel = $('sb-time');
  if (tel && state.startTime) {
    const e = Math.floor((Date.now() - state.startTime) / 1000);
    tel.textContent = `${String(Math.floor(e / 60)).padStart(2, '0')}:${String(e % 60).padStart(2, '0')}`;
  }
}
export function openQNav() {
  const total = state.currentQuiz.length, answered = Object.keys(state.answers).length;
  const grid = state.currentQuiz.map((_, i) => `<div class="q-dot ${i === state.qIdx ? 'current' : state.answers[i] !== undefined ? 'answered' : ''}"
onclick="window._closeModal();window._renderQuiz(${i})" style="width:36px;height:36px;font-size:12px;cursor:pointer">${i + 1}</div>`).join('');
  modal('Questions', `<div style="font-size:13px;color:var(--fg-muted);margin-bottom:12px">${answered}/${total} answered</div>
<div class="q-grid" style="gap:8px">${grid}</div>`,
    `<button class="btn btn-ghost" onclick="window._closeModal()">${t('cancel')}</button>`);
}
export function openSubmitModal() {
  const total = state.currentQuiz.length, unanswered = total - Object.keys(state.answers).length;
  if (unanswered > 0) {
    modal(t('submit_quiz'),
      `<div class="callout warn"><i class="fa-solid fa-triangle-exclamation"></i>
   <div><div style="font-weight:600;margin-bottom:4px">${t('unanswered', { n: unanswered })}</div>
   <div style="font-size:13px">${t('unanswered_tip')}</div></div></div>`,
      `<button class="btn btn-ghost" onclick="window._closeModal()">${t('cancel')}</button>
   <button class="btn btn-accent" onclick="window._closeModal();window._submitQuiz()">${t('submit_anyway')}</button>`);
  } else { submitQuiz(); }
}

export function submitQuiz() { window._closeModal(); if (state.timerID) clearInterval(state.timerID); saveAndRenderResults(); }

Object.assign(window, {
  _renderQuizAttemptOrPreview: renderQuizAttemptOrPreview,
  _openQuizPreview: openQuizPreview,
  _renderQuiz: renderQuiz,
  _pickAnswer: pickAnswer,
  _openQNav: openQNav,
  _openSubmitModal: openSubmitModal,
  _submitQuiz: submitQuiz
});
