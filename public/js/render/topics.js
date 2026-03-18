import { state } from '../state.js';
import { PROFESSIONS, PROF_MAP, getTopicsForProfession, getTopicById, getSubtopicsForTopic, getSubtopicById, getProfessionExtended, TOPIC_MAP, SUBTOPIC_MAP } from '../constants.js';
import { $, setP, setV, hideBar, toast, t } from '../helpers.js';
import { renderQuiz } from './quiz-attempt.js';

// Use window._go to avoid circular dependency with router.js
const go = (path) => {
  if (window._go) {
    window._go(path);
  } else {
    // Fallback: use history API directly
    history.pushState(null, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
};

/* ═══════════════════════════════════════════════════════════════════════
   TOPICS VIEW - 3-Level Navigation
   Level 1: /topics - All professions
   Level 2: /topics/:professionId - All topics for a profession
   Level 3: /topics/:professionId/:topicId - All subtopics for a topic
   Level 4: /topics/:professionId/:topicId/:subtopicId - Configure quiz
═══════════════════════════════════════════════════════════════════════ */

export function renderTopicsView(params = {}) {
  console.log('[TopicsView] Rendering with params:', params);

  // Level 4: Configure quiz for a specific subtopic
  if (params.professionId && params.topicId && params.subtopicId) {
    return renderConfigureQuiz(params.professionId, params.topicId, params.subtopicId);
  }

  // Level 3: Show subtopics for a specific topic
  if (params.professionId && params.topicId) {
    return renderSubtopicsList(params.professionId, params.topicId);
  }

  // Level 2: Show topics for a specific profession
  if (params.professionId) {
    return renderTopicsList(params.professionId);
  }

  // Level 1: Show all professions
  return renderProfessionsList();
}

/* ═══════════════════════════════════════════════════════════════════════
   LEVEL 1: PROFESSIONS LIST /topics
   Show ALL professions - locked ones are disabled but visible
═══════════════════════════════════════════════════════════════════════ */
function renderProfessionsList() {
  hideBar();
  setP(20);

  const allowed = new Set(state.user.topics || []);
  const isAdmin = state.user.role === 'admin' || state.user.uid === 'admin';

  // Show ALL professions (not filtered)
  const cards = PROFESSIONS.map(p => {
    const ok_ = isAdmin || allowed.has(p.id);
    const nm = state.uiLang === 'ur' ? p.label_ur : p.label_en;
    return `
      <div class="topic-card ${ok_ ? '' : 'locked'}"
           onclick="${ok_ ? `window._navigateToProfession('${p.id}')` : ``}"
           ${ok_ ? '' : `title="${t('locked')}"`}>
        <div style="display:flex;align-items:center;gap:12px">
          <div class="topic-card-icon"><i class="${p.icon}"></i></div>
          <div>
            <div class="topic-card-name">${nm}</div>
          </div>
          <div class="topic-card-arrow" style="margin-inline-start:auto">
            ${ok_ ? '<i class="fa-solid fa-arrow-right"></i>' : '<i class="fa-solid fa-lock"></i>'}
          </div>
        </div>
      </div>`;
  }).join('');

  setV(`
    <div class="page" style="animation:fadeUp .25s ease both">
      <div class="page-header">
        <div class="page-breadcrumb">
          <span data-nav onclick="window._go('/dashboard')">${t('user_dashboard')}</span>
          <span class="sep">/</span>
          <span class="current">${t('choose_topic')}</span>
        </div>
        <div class="page-title">${t('choose_topic')}</div>
        <p class="page-desc">${t('choose_desc')}</p>
      </div>
      <div class="topic-grid">${cards}</div>
    </div>
  `);
  setP(100);
}

/* ═══════════════════════════════════════════════════════════════════════
   LEVEL 2: TOPICS LIST /topics/:professionId
═══════════════════════════════════════════════════════════════════════ */
function renderTopicsList(professionId) {
  const profession = PROF_MAP[professionId];
  if (!profession) {
    toast('Profession not found', 'error');
    go('/topics');
    return;
  }

  // Get topics from CURRICULUM_DATA
  const topics = getTopicsForProfession(professionId);

  if (topics.length === 0) {
    toast('No topics available for this profession', 'error');
    go('/topics');
    return;
  }

  hideBar();
  setP(30);

  const profName = state.uiLang === 'ur' ? profession.label_ur : profession.label_en;

  const cards = topics.map(topic => {
    const title = state.uiLang === 'ur' ? (topic.title_ur || topic.title_en) : topic.title_en;
    const subtopicCount = topic.subtopics?.length || 0;
    return `
      <div class="topic-card" onclick="window._navigateToTopic('${professionId}', '${topic.topic_id}')">
        <div style="display:flex;align-items:center;gap:12px">
          <div class="topic-card-icon" style="background:var(--bg-muted);color:var(--accent)">
            <i class="fa-solid fa-folder-open"></i>
          </div>
          <div style="flex:1">
            <div class="topic-card-name" style="font-size:15px">${title}</div>
            <div class="topic-card-id" style="color:var(--fg-subtle);font-family:var(--font-sans)">
              <i class="fa-solid fa-layer-group" style="margin-right:4px"></i>${subtopicCount} Subtopics
            </div>
          </div>
          <div class="topic-card-arrow" style="margin-inline-start:auto">
            <i class="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      </div>`;
  }).join('');

  setV(`
    <div class="page" style="animation:fadeUp .25s ease both">
      <div class="page-header">
        <div class="page-breadcrumb">
          <span data-nav onclick="window._go('/topics')">${t('choose_topic')}</span>
          <span class="sep">/</span>
          <span class="current">${profName}</span>
        </div>
        <div class="page-title">${profName}</div>
        <p class="page-desc">Select a topic to view its subtopics</p>
      </div>
      <div class="topic-grid">${cards}</div>
    </div>
  `);
  setP(100);
}

/* ═══════════════════════════════════════════════════════════════════════
   LEVEL 3: SUBTOPICS LIST /topics/:professionId/:topicId
═══════════════════════════════════════════════════════════════════════ */
function renderSubtopicsList(professionId, topicId) {
  const topic = getTopicById(professionId, topicId);
  const profession = PROF_MAP[professionId];

  if (!topic || !profession) {
    toast('Topic not found', 'error');
    go(`/topics/${professionId}`);
    return;
  }

  const subtopics = topic.subtopics || [];

  if (subtopics.length === 0) {
    toast('No subtopics available for this topic', 'error');
    go(`/topics/${professionId}`);
    return;
  }

  hideBar();
  setP(40);

  const topicTitle = state.uiLang === 'ur' ? (topic.title_ur || topic.title_en) : topic.title_en;
  const profName = state.uiLang === 'ur' ? profession.label_ur : profession.label_en;

  const cards = subtopics.map(subtopic => {
    const title = state.uiLang === 'ur' ? (subtopic.title_ur || subtopic.title_en) : subtopic.title_en;
    return `
      <div class="topic-card" onclick="window._navigateToSubtopic('${professionId}', '${topicId}', '${subtopic.subtopic_id}')">
        <div style="display:flex;align-items:center;gap:12px">
          <div class="topic-card-icon" style="background:var(--accent);color:white">
            <i class="fa-solid fa-bullseye"></i>
          </div>
          <div style="flex:1">
            <div class="topic-card-name" style="font-size:15px">${title}</div>
          </div>
          <div class="topic-card-arrow" style="margin-inline-start:auto">
            <i class="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      </div>`;
  }).join('');

  setV(`
    <div class="page" style="animation:fadeUp .25s ease both">
      <div class="page-header">
        <div class="page-breadcrumb">
          <span data-nav onclick="window._go('/topics')">${t('choose_topic')}</span>
          <span class="sep">/</span>
          <span data-nav onclick="window._go('/topics/${professionId}')">${profName}</span>
          <span class="sep">/</span>
          <span class="current">${topicTitle}</span>
        </div>
        <div class="page-title">${topicTitle}</div>
        <p class="page-desc">Select a subtopic to generate a quiz</p>
      </div>
      <div class="topic-grid">${cards}</div>
    </div>
  `);
  setP(100);
}

/* ═══════════════════════════════════════════════════════════════════════
   LEVEL 4: CONFIGURE QUIZ /topics/:professionId/:topicId/:subtopicId
═══════════════════════════════════════════════════════════════════════ */
function renderConfigureQuiz(professionId, topicId, subtopicId) {
  const subtopic = getSubtopicById(professionId, topicId, subtopicId);
  const topic = getTopicById(professionId, topicId);
  const profession = PROF_MAP[professionId];

  if (!subtopic || !topic || !profession) {
    toast('Invalid selection', 'error');
    go(`/topics/${professionId}`);
    return;
  }

  // Store in state for quiz generation
  state.currentProfessionId = professionId;
  state.currentTopicId = topicId;
  state.currentSubtopicId = subtopicId;
  state._quizConfig = { qCount: 30 };

  hideBar();
  setP(50);

  // Get titles in user's language (NOT IDs - show human-readable names only)
  const professionTitle = state.uiLang === 'ur' ? profession.label_ur : profession.label_en;
  const topicTitle = state.uiLang === 'ur' ? (topic.title_ur || topic.title_en) : topic.title_en;
  const subtopicTitle = state.uiLang === 'ur' ? (subtopic.title_ur || subtopic.title_en) : subtopic.title_en;
  const quizLang = profession.lang === 'ur' ? 'Urdu' : 'English';

  setV(`
    <div class="page page-md" style="animation:fadeUp .25s ease both">
      <div class="page-header">
        <div class="page-breadcrumb">
          <span data-nav onclick="window._go('/topics')">${t('choose_topic')}</span>
          <span class="sep">/</span>
          <span data-nav onclick="window._go('/topics/${professionId}')">${professionTitle}</span>
          <span class="sep">/</span>
          <span data-nav onclick="window._go('/topics/${professionId}/${topicId}')">${topicTitle}</span>
          <span class="sep">/</span>
          <span class="current">${subtopicTitle}</span>
        </div>
        <div class="page-title">${t('configure')}</div>
        <p class="page-desc">${t('configure_desc')}</p>
      </div>
      <div class="card" style="padding:28px">
        <div class="info-box" style="background:var(--bg-muted);padding:16px;border-radius:8px;margin-bottom:20px">
          <div style="font-size:13px;color:var(--fg-subtle);margin-bottom:8px">Quiz Configuration</div>
          <div style="font-weight:600;margin-bottom:4px">${subtopicTitle}</div>
          <div style="font-size:11px;color:var(--fg-subtle);font-family:var(--font-sans)">
            ${professionTitle} › ${topicTitle} › ${subtopicTitle}
          </div>
          <div style="font-size:12px;color:var(--fg-subtle);margin-top:8px">
            Language: ${quizLang}
          </div>
        </div>
        <div class="field">
          <label class="field-label">${t('count_label')}</label>
          <div class="count-selector" id="count-sel">
            ${[5, 10, 15, 30, 50].map(n => `
              <button class="count-opt ${n === 30 ? 'active' : ''}" 
                      onclick="window._setCount(${n},this)">${n}</button>
            `).join('')}
          </div>
          <div class="field-hint" style="margin-top:8px">${t('count_info')}</div>
        </div>
        <button class="btn btn-accent btn-full btn-lg" style="margin-top:24px" onclick="window._doGenerate()">
          <i class="fa-solid fa-wand-magic-sparkles"></i> ${t('generate')}
        </button>
      </div>
    </div>
  `);
  setP(100);
}

/* ═══════════════════════════════════════════════════════════════════════
   QUIZ GENERATION
═══════════════════════════════════════════════════════════════════════ */
export function setCount(n, btn) {
  state._quizConfig.qCount = n;
  document.querySelectorAll('.count-opt').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

export async function doGenerate() {
  const professionId = state.currentProfessionId;
  const topicId = state.currentTopicId;
  const subtopicId = state.currentSubtopicId;

  const subtopic = getSubtopicById(professionId, topicId, subtopicId);
  const topic = getTopicById(professionId, topicId);
  const profession = PROF_MAP[professionId];

  if (!subtopic || !topic || !profession) {
    toast('Invalid selection', 'error');
    go('/topics');
    return;
  }

  setP(60);

  // Get titles in user's language (NOT IDs - AI sees human-readable titles only)
  const professionTitle = state.uiLang === 'ur' ? profession.label_ur : profession.label_en;
  const topicTitle = state.uiLang === 'ur' ? (topic.title_ur || topic.title_en) : topic.title_en;
  const subtopicTitle = state.uiLang === 'ur' ? (subtopic.title_ur || subtopic.title_en) : subtopic.title_en;
  const quizLang = profession.lang === 'ur' ? 'Urdu' : 'English';
  const qCount = state._quizConfig.qCount || 30;

  setV(`
    <div class="page" style="animation:fadeUp .2s ease both">
      <div class="loader-wrap">
        <div class="spinner" style="width:48px;height:48px;border-width:4px"></div>
        <div class="loader-title">${t('generating')}</div>
        <div class="loader-sub">${t('generating_sub')}</div>
        <div style="font-size:12px;color:var(--fg-subtle);margin-top:8px">
          Profession: ${professionTitle}
        </div>
        <div style="font-size:12px;color:var(--fg-subtle);margin-top:4px">
          Topic: ${topicTitle}
        </div>
        <div style="font-size:12px;color:var(--fg-subtle);margin-top:4px">
          Subtopic: ${subtopicTitle} · ${qCount} questions
        </div>
      </div>
    </div>
  `);

  try {
    const controller = new AbortController();
    const to = setTimeout(() => controller.abort(), 90000);
    let res;
    try {
      res = await fetch('/api/generate', {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.token}`
        },
        body: JSON.stringify({
          // AI sees only human-readable titles, NOT internal IDs
          profession: professionTitle,
          topic: topicTitle,
          subtopic: subtopicTitle,
          topicContext: `${topicTitle} - ${subtopicTitle} (in the context of ${profession.label_en} for AJK PSC)`,
          count: qCount,
          lang: quizLang,
          // Internal IDs for our database tracking only (not sent to AI)
          metadata: {
            professionId: profession.id,
            topicId: topic.topic_id,
            subtopicId: subtopic.subtopic_id
          }
        })
      });
    } finally {
      clearTimeout(to);
    }

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
      window.dispatchEvent(new CustomEvent('updateQuizTimer'));
    }, 1000);

    // Navigate to quiz URL (shareable)
    if (state._currentQuizId) {
      history.pushState(null, '', `/quiz/${state._currentQuizId}`);
    } else {
      history.pushState(null, '', `/quiz/local-${Date.now()}`);
    }

    setP(70);
    renderQuiz(0);
  } catch (e) {
    const isAbort = e.name === 'AbortError';
    setV(`
      <div class="page">
        <div class="state-box">
          <div class="state-icon error">
            <i class="fa-solid fa-triangle-exclamation"></i>
          </div>
          <div class="state-title">${isAbort ? 'Timed Out' : 'Generation Failed'}</div>
          <div class="state-desc">
            ${isAbort ? 'AI took too long. Try fewer questions.' : e.message}
          </div>
          <div style="display:flex;gap:10px;margin-top:8px">
            <button class="btn btn-accent" onclick="window._doGenerate()">
              <i class="fa-solid fa-rotate-right"></i> Try Again
            </button>
            <button class="btn btn-ghost" onclick="window._go('/topics/${professionId}/${topicId}/${subtopicId}')">
              <i class="fa-solid fa-arrow-left"></i> ${t('back')}
            </button>
          </div>
        </div>
      </div>
    `);
  }
}

/* ═══════════════════════════════════════════════════════════════════════
   NAVIGATION HELPERS
═══════════════════════════════════════════════════════════════════════ */
export function selectTopic(professionId) {
  // Backward compatibility function for user-dashboard.js
  go(`/topics/${professionId}`);
}

export function navigateToProfession(professionId) {
  go(`/topics/${professionId}`);
}

export function navigateToTopic(professionId, topicId) {
  go(`/topics/${professionId}/${topicId}`);
}

export function navigateToSubtopic(professionId, topicId, subtopicId) {
  go(`/topics/${professionId}/${topicId}/${subtopicId}`);
}

// Expose functions to window for inline event handlers
Object.assign(window, {
  _navigateToProfession: navigateToProfession,
  _navigateToTopic: navigateToTopic,
  _navigateToSubtopic: navigateToSubtopic,
  _setCount: setCount,
  _doGenerate: doGenerate
});
