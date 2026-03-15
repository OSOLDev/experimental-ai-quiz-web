import { state } from '../state.js';
import { PROFESSIONS, PROF_MAP } from '../constants.js';
import { $, setP, setV, hideBar, toast, api, t } from '../helpers.js';
import { go } from '../router.js';
import { renderQuiz } from './quiz-attempt.js';

/* ═══════════════════════════════════════════════════════════════════════
   TOPICS  /topics
═══════════════════════════════════════════════════════════════════════ */
export function renderTopicsView(params = {}) {
  // If we have both profession and category, configure the quiz:
  if (params.professionId && params.categoryKey) {
    return renderConfigure(params.professionId, params.categoryKey);
  }
  // If we only have profession, show its sub-topics (concepts):
  if (params.professionId) {
    return renderSubTopics(params.professionId);
  }

  hideBar(); setP(20);
  const allowed = new Set(state.user.topics || []);
  const cards = PROFESSIONS.map(p => {
    const ok_ = state.user.role === 'admin' || state.user.uid === 'admin' || allowed.has(p.id);
    const nm = state.uiLang === 'ur' ? p.label_ur : p.label_en;
    return `<div class="topic-card ${ok_ ? '' : 'locked'}" onclick="${ok_ ? `window._selectTopic('${p.id}')` : ``}" ${ok_ ? '' : `title="${t('locked')}"`}>
  <div style="display:flex;align-items:center;gap:12px">
    <div class="topic-card-icon"><i class="${p.icon}"></i></div>
    <div><div class="topic-card-name">${nm}</div><div class="topic-card-id">${p.id}</div></div>
    <div class="topic-card-arrow" style="margin-inline-start:auto">
      ${ok_ ? '<i class="fa-solid fa-arrow-right"></i>' : '<i class="fa-solid fa-lock"></i>'}
    </div>
  </div>
</div>`;
  }).join('');
  setV(`<div class="page" style="animation:fadeUp .25s ease both">
<div class="page-header">
  <div class="page-breadcrumb">
    <span data-nav onclick="window._go('/dashboard')">${t('user_dashboard')}</span>
    <span class="sep">/</span><span class="current">${t('choose_topic')}</span>
  </div>
  <div class="page-title">${t('choose_topic')}</div>
  <p class="page-desc">${t('choose_desc')}</p>
</div>
<div class="topic-grid">${cards}</div>
</div>`);
  setP(100);
}

export function selectTopic(id) {
  go(`/topics/${id}`);
}

/* ═══════════════════════════════════════════════════════════════════════
   SUB-TOPICS / CONCEPTS /topics/:id
═══════════════════════════════════════════════════════════════════════ */
function renderSubTopics(professionId) {
  const profession = PROF_MAP[professionId];
  if (!profession) { go('/topics'); return; }
  
  hideBar(); setP(25);
  const nm = state.uiLang === 'ur' ? profession.label_ur : profession.label_en;
  
  // Render sub-topic cards
  const cards = profession.concepts.map(concept => {
    // encode concept for URL safety
    const safeConcept = encodeURIComponent(concept);
    return `<div class="topic-card" onclick="window._go('/topics/${professionId}/${safeConcept}')">
  <div style="display:flex;align-items:center;gap:12px">
    <div class="topic-card-icon" style="background:var(--bg-muted);color:var(--accent)"><i class="fa-solid fa-layer-group"></i></div>
    <div><div class="topic-card-name" style="font-size:15px">${concept}</div></div>
    <div class="topic-card-arrow" style="margin-inline-start:auto">
      <i class="fa-solid fa-arrow-right"></i>
    </div>
  </div>
</div>`;
  }).join('');
  
  setV(`<div class="page" style="animation:fadeUp .25s ease both">
<div class="page-header">
  <div class="page-breadcrumb">
    <span data-nav onclick="window._go('/topics')">${t('choose_topic')}</span>
    <span class="sep">/</span><span class="current">${nm}</span>
  </div>
  <div class="page-title">${nm} Concepts</div>
  <p class="page-desc">Select a specific sub-topic area to focus on.</p>
</div>
<div class="topic-grid">${cards}</div>
</div>`);
  setP(100);
}

/* ═══════════════════════════════════════════════════════════════════════
   CONFIGURE  /topics/:id/:categoryKey
═══════════════════════════════════════════════════════════════════════ */
function renderConfigure(professionId, categoryKey) {
  const profession = PROF_MAP[professionId];
  if (!profession || !categoryKey) { go('/topics'); return; }
  
  state.currentProfessionId = professionId;
  state.currentCategoryKey = decodeURIComponent(categoryKey);
  
  hideBar(); setP(40);
  const nm = state.uiLang === 'ur' ? profession.label_ur : profession.label_en;
  state._quizConfig = { qCount: 30 };
  
  setV(`<div class="page page-md" style="animation:fadeUp .25s ease both">
<div class="page-header">
  <div class="page-breadcrumb">
    <span data-nav onclick="window._go('/topics')">${t('choose_topic')}</span>
    <span class="sep">/</span><span data-nav onclick="window._go('/topics/${professionId}')">${nm}</span>
    <span class="sep">/</span><span class="current">${state.currentCategoryKey}</span>
  </div>
  <div class="page-title">${t('configure')}</div>
  <p class="page-desc">${t('configure_desc')}</p>
</div>
<div class="card" style="padding:28px">
  <div class="field">
    <label class="field-label">${t('count_label')}</label>
    <div class="count-selector" id="count-sel">
      ${[5, 10, 15, 30, 50].map(n => `<button class="count-opt ${n === 30 ? 'active' : ''}" onclick="window._setCount(${n},this)">${n}</button>`).join('')}
    </div>
    <div class="field-hint" style="margin-top:8px">${t('count_info')}</div>
  </div>
  <button class="btn btn-accent btn-full btn-lg" style="margin-top:24px" onclick="window._doGenerate()">
    <i class="fa-solid fa-wand-magic-sparkles"></i> ${t('generate')}
  </button>
</div>
</div>`);
  setP(100);
}

export function setCount(n, btn) {
  state._quizConfig.qCount = n;
  document.querySelectorAll('.count-opt').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

/* ═══════════════════════════════════════════════════════════════════════
   GENERATE
═══════════════════════════════════════════════════════════════════════ */
export async function doGenerate() {
  const profession = PROF_MAP[state.currentProfessionId];
  const conceptKey = state.currentCategoryKey;
  if (!profession || !conceptKey) { go('/topics'); return; }
  
  setP(60);
  const nm = state.uiLang === 'ur' ? profession.label_ur : profession.label_en;
  const ql = profession.lang === 'ur' ? 'Urdu' : 'English';
  const qCount = state._quizConfig.qCount || 30;

  setV(`<div class="page" style="animation:fadeUp .2s ease both">
<div class="loader-wrap">
  <div class="spinner" style="width:48px;height:48px;border-width:4px"></div>
  <div class="loader-title">${t('generating')}</div>
  <div class="loader-sub">${t('generating_sub')}</div>
  <div style="font-size:12px;color:var(--fg-subtle);font-family:var(--font-mono);margin-top:8px">${profession.id} · ${conceptKey} · ${qCount} questions</div>
</div>
</div>`);
  
  try {
    const controller = new AbortController();
    const to = setTimeout(() => controller.abort(), 90000);
    let res;
    try {
      res = await fetch('/api/generate', {
        method: 'POST', signal: controller.signal,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${state.token}` },
        body: JSON.stringify({
          topic: `${conceptKey} (in the context of ${profession.label_en} for AJK PSC)`, count: qCount,
          concepts: conceptKey, lang: ql, professionId: profession.id
        })
      });
    } finally { clearTimeout(to); }
    
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      throw new Error(d.error || `Server error ${res.status}`);
    }
    const data = await res.json();
    if (!data.questions?.length) throw new Error('No questions returned by AI.');
    
    // Update state with newly generated quiz
    state.currentQuiz = data.questions; 
    state.answers = {}; 
    state.qIdx = 0;
    state._currentQuizId = data.quizId || null;
    state._currentQuizSource = data.source || 'ai';
    
    if (state._currentQuizSource === 'cache') toast(t('quiz_cached'), 'warn');
    
    state.startTime = Date.now();
    if (state.timerID) clearInterval(state.timerID);
    state.timerID = setInterval(() => {
      // the updateBar function needs to be exposed from quiz-attempt or handled globally
      // For now we'll trigger a custom event
      window.dispatchEvent(new CustomEvent('updateQuizTimer'));
    }, 1000);
    
    // Navigate to quiz URL (shareable)
    if (state._currentQuizId) {
      history.pushState(null, '', `/quiz/${state._currentQuizId}`);
    } else {
      // In case we don't have a persisted quiz ID
      history.pushState(null, '', `/quiz/local-${Date.now()}`);
    }
    
    setP(70); 
    renderQuiz(0);
  } catch (e) {
    const isAbort = e.name === 'AbortError';
    setV(`<div class="page"><div class="state-box">
  <div class="state-icon error"><i class="fa-solid fa-triangle-exclamation"></i></div>
  <div class="state-title">${isAbort ? 'Timed Out' : 'Generation Failed'}</div>
  <div class="state-desc">${isAbort ? 'AI took too long. Try fewer questions.' : e.message}</div>
  <div style="display:flex;gap:10px;margin-top:8px">
    <button class="btn btn-accent" onclick="window._doGenerate()"><i class="fa-solid fa-rotate-right"></i> Try Again</button>
    <button class="btn btn-ghost" onclick="window._go('/topics/${profession.id}/${encodeURIComponent(conceptKey)}')"><i class="fa-solid fa-arrow-left"></i> ${t('back')}</button>
  </div>
</div></div>`);
  }
}

Object.assign(window, {
  _selectTopic: selectTopic,
  _setCount: setCount,
  _doGenerate: doGenerate
});