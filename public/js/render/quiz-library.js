import { state } from '../state.js';
import { PROF_MAP } from '../constants.js';
import { $, setP, setV, t, api } from '../helpers.js';
import { go } from '../router.js';

/* ═══════════════════════════════════════════════════════════════════════
   QUIZ LIBRARY  /quizzes
═══════════════════════════════════════════════════════════════════════ */
export async function renderQuizLibrary() {
  setP(20);
  setV(`<div class="page" style="animation:fadeUp .25s ease both">
    <div class="page-header">
      ${state.user ? `<div class="page-breadcrumb"><span data-nav onclick="window._go('/dashboard')">${t('user_dashboard')}</span><span class="sep">/</span><span class="current">${t('quiz_lib_title')}</span></div>` : ''}
      <div class="page-title">${t('quiz_lib_title')}</div>
      <p class="page-desc">${t('quiz_lib_sub')}</p>
    </div>
    <div id="quiz-library-content">
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px">
        ${[0,1,2,3,4,5].map(() => `<div class="card" style="padding:18px">
          <div style="display:flex;align-items:center;gap:12px">
            <div class="skel" style="width:40px;height:40px;border-radius:var(--radius-md)"></div>
            <div style="flex:1">
              <div class="skel" style="height:14px;width:140px;margin-bottom:6px"></div>
              <div class="skel" style="height:12px;width:100px"></div>
            </div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </div>`);

  try {
    // Get user's allowed topics (profession IDs)
    const userTopics = state.user?.topics || [];

    // If user has topics, fetch quizzes for each topic
    // If no topics, show message
    if (!userTopics.length && state.user) {
      const el = $('quiz-library-content');
      if (el) {
        el.innerHTML = `<div class="state-box">
          <div class="state-icon warn"><i class="fa-solid fa-lock"></i></div>
          <div class="state-title">No Topics Assigned</div>
          <div class="state-desc">You don't have access to any topics yet. Contact the administrator to get access.</div>
          <button class="btn btn-accent" onclick="window._go('/dashboard')"><i class="fa-solid fa-arrow-left"></i> Back to Dashboard</button>
        </div>`;
      }
      setP(100);
      return;
    }

    // Fetch quizzes for user's allowed topics
    const quizPromises = userTopics.map(topicId =>
      api('GET', `/api/quizzes/public?professionId=${topicId}&limit=50`, null, true)
    );

    const results = await Promise.all(quizPromises);
    const allQuizzes = results.flatMap(r => r.data?.quizzes || []);

    // Remove duplicates and sort by date
    const uniqueQuizzes = Array.from(new Map(allQuizzes.map(q => [q.quizId, q])).values())
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const rows = uniqueQuizzes.length
      ? uniqueQuizzes.map(q => {
          const date = q.createdAt ? new Date(q.createdAt).toLocaleDateString() : '';
          const prof = q.professionId ? PROF_MAP[q.professionId] : null;
          const topicName = prof ? (state.uiLang === 'ur' ? prof.label_ur : prof.label_en) : (q.topic || 'Quiz');
          return `<div class="card content-fade-in" style="padding:18px;cursor:pointer;transition:box-shadow .2s" onclick="window._go('/quiz/${q.quizId}')">
            <div style="display:flex;align-items:center;gap:12px">
              ${prof ? `<div class="topic-card-icon" style="background:${prof.color || 'var(--accent)'};color:#fff"><i class="${prof.icon}"></i></div>` : '<div class="topic-card-icon"><i class="fa-solid fa-book-open"></i></div>'}
              <div style="flex:1;min-width:0">
                <div style="font-weight:600;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${topicName}</div>
                <div style="font-size:12px;color:var(--fg-muted);margin-top:2px">${q.count} questions · ${(q.lang||'').toUpperCase()}${date ? ' · ' + date : ''}</div>
              </div>
              <i class="fa-solid fa-arrow-right" style="color:var(--fg-subtle)"></i>
            </div>
          </div>`;
        }).join('')
      : `<div class="state-box"><div class="state-icon warn"><i class="fa-solid fa-inbox"></i></div><div class="state-title">No quizzes yet</div><div class="state-desc">No quizzes are available for your topics yet. Check back later.</div></div>`;

    const el = $('quiz-library-content');
    if (el) {
      // Fade out skeletons
      el.querySelectorAll('.skel').forEach(sk => sk.classList.add('fade-out'));
      setTimeout(() => {
        el.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px" class="content-fade-in">${rows}</div>`;
      }, 180);
    }

    setP(100);
  } catch (e) {
    const el = $('quiz-library-content');
    if (el) {
      el.innerHTML = `<div class="state-box">
        <div class="state-icon error"><i class="fa-solid fa-triangle-exclamation"></i></div>
        <div class="state-title">Failed to load</div>
        <div class="state-desc">${e.message}</div>
        <button class="btn btn-accent" onclick="window._go('/quizzes')"><i class="fa-solid fa-rotate-right"></i> Retry</button>
      </div>`;
    }
    setP(0);
  }
}
