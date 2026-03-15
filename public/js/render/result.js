import { state } from '../state.js';
import { PROFESSIONS, PROF_MAP } from '../constants.js';
import { $, setP, setV, hideBar, toast, api, modal, closeModal, mdInline, applyMath, t } from '../helpers.js';
import { go } from '../router.js';
import { renderQuizAttemptOrPreview } from './quiz-attempt.js';

/* ═══════════════════════════════════════════════════════════════════════
   RESULTS  /quiz/:id/results
═══════════════════════════════════════════════════════════════════════ */

/** Called after quiz submission — saves result and navigates to results URL */
export async function saveAndRenderResults() {
  hideBar(); setP(95);
  const total = state.currentQuiz.length;
  let score = 0;
  const items = state.currentQuiz.map((q, i) => {
    const sel = state.answers[i]; const isC = sel === q.correctAnswer; const sk = sel === undefined;
    if (isC) score++;
    return { 
      question: q.question, options: q.options, correctAnswer: q.correctAnswer, 
      selectedAnswer: sel || null, isCorrect: isC, skipped: sk,
      explanation: q.explanation || '', cognitiveLevel: q.cognitiveLevel || ''
    };
  });
  const elapsed = state.startTime ? Math.floor((Date.now() - state.startTime) / 1000) : 0;
  const timeStr = `${Math.floor(elapsed / 60)}m ${elapsed % 60}s`;
      const pct = (score / total) * 100, pass = pct >= 60;
      const wrong = items.filter(x => !x.isCorrect && !x.skipped).length;
      const skip = items.filter(x => x.skipped).length;

  // Save result — non-blocking, but we want the resultId for the URL
  let savedResultId = null;
  const profession = PROF_MAP[state.currentProfessionId];
  try {
    const { ok, data } = await api('POST', '/api/results', {
      profession: profession?.id || 'unknown', professionLabel: profession?.label_en || 'Quiz',
      score, total, percentage: pct, pass, wrong, skipped: skip, timeTaken: timeStr,
      quizId: state._currentQuizId, quizSource: state._currentQuizSource,
      answers: items.map(({ question, correctAnswer, selectedAnswer, isCorrect, skipped, explanation, cognitiveLevel }) =>
        ({ question, correctAnswer, selectedAnswer, isCorrect, skipped, explanation, cognitiveLevel }))
    });
    if (ok) savedResultId = data.resultId;
  } catch (e) { console.warn('Result save failed:', e.message); }

  // Store in memory for result page render
  window._lastResult = { items, score, total, pct, pass, wrong, skip, timeStr, savedResultId };
  window._lastQuizItems = items;

  // Navigate to shareable results URL
  const uid = state.user?.uid;
  if (state._currentQuizId || savedResultId) {
    const shareId = savedResultId || state._currentQuizId;
    const resultsPath = `/result/${shareId}${uid ? `?uid=${uid}` : ''}`;
    history.replaceState(null, '', resultsPath);
  }
  setP(100);
  renderResultsPage(items, score, total, pct, pass, wrong, skip, timeStr, savedResultId);
}

/** renderResultPage — called by router for /result/:id (deeplink) */
export async function renderResultPage(quizId, uid) {
  // If we have in-memory results for this quiz, render them directly
  if (window._lastResult && (state._currentQuizId === quizId || window._lastResult.savedResultId === quizId)) {
    const { items, score, total, pct, pass, wrong, skip, timeStr, savedResultId } = window._lastResult;
    renderResultsPage(items, score, total, pct, pass, wrong, skip, timeStr, savedResultId);
    return;
  }
  // Try fetching a saved result record (supports /result/:resultId deeplinks)
  try {
    const { ok, data } = await api('GET', `/api/results/${quizId}`);
    if (ok && data) {
      const items = Array.isArray(data.answers) ? data.answers.map(a => ({
        question: a.question || '',
        options: a.options || [],
        correctAnswer: a.correctAnswer,
        selectedAnswer: a.selectedAnswer ?? null,
        isCorrect: !!a.isCorrect,
        skipped: !!a.skipped,
        explanation: a.explanation || '',
        cognitiveLevel: a.cognitiveLevel || ''
      })) : [];
      const total = Number(data.total) || items.length || 0;
      const score = Number(data.score) || 0;
      const pct = data.percentage != null ? Number(data.percentage) : (total ? (score / total) * 100 : 0);
      const pass = data.pass != null ? !!data.pass : pct >= 60;
      const wrong = data.wrong != null ? Number(data.wrong) : items.filter(x => !x.isCorrect && !x.skipped).length;
      const skip = data.skipped != null ? Number(data.skipped) : items.filter(x => x.skipped).length;
      const timeStr = data.timeTaken || '';

      state._currentQuizId = data.quizId || null;
      state._currentQuizSource = data.quizSource || null;
      state.currentProfessionId = data.profession || null;
      window._lastQuizItems = items;
      window._lastResult = { items, score, total, pct, pass, wrong, skip, timeStr, savedResultId: data.resultId };

      renderResultsPage(items, score, total, pct, pass, wrong, skip, timeStr, data.resultId);
      return;
    }
  } catch (e) {
    console.warn('[Result] Failed to fetch result by id:', e.message);
  }

  // Fallback: try to find result by quizId among user's recent results
  try {
    const { ok, data } = await api('GET', '/api/results?user=me&limit=200');
    if (ok && Array.isArray(data)) {
      const match = data.find(r => r.quizId === quizId);
      if (match) {
        const items = Array.isArray(match.answers) ? match.answers.map(a => ({
          question: a.question || '',
          options: a.options || [],
          correctAnswer: a.correctAnswer,
          selectedAnswer: a.selectedAnswer ?? null,
          isCorrect: !!a.isCorrect,
          skipped: !!a.skipped,
          explanation: a.explanation || '',
          cognitiveLevel: a.cognitiveLevel || ''
        })) : [];
        const total = Number(match.total) || items.length || 0;
        const score = Number(match.score) || 0;
        const pct = match.percentage != null ? Number(match.percentage) : (total ? (score / total) * 100 : 0);
        const pass = match.pass != null ? !!match.pass : pct >= 60;
        const wrong = match.wrong != null ? Number(match.wrong) : items.filter(x => !x.isCorrect && !x.skipped).length;
        const skip = match.skipped != null ? Number(match.skipped) : items.filter(x => x.skipped).length;
        const timeStr = match.timeTaken || '';

        state._currentQuizId = match.quizId || null;
        state._currentQuizSource = match.quizSource || null;
        state.currentProfessionId = match.profession || null;
        window._lastQuizItems = items;
        window._lastResult = { items, score, total, pct, pass, wrong, skip, timeStr, savedResultId: match.resultId };

        renderResultsPage(items, score, total, pct, pass, wrong, skip, timeStr, match.resultId);
        return;
      }
    }
  } catch (e) {
    console.warn('[Result] Failed to fetch user results:', e.message);
  }

  // Otherwise, this is a deeplinked result — we can't reconstruct the full result
  // without the saved result record. Show a "result not available" state.
  setV(`<div class="page"><div class="state-box">
<div class="state-icon warn"><i class="fa-solid fa-clock-rotate-left"></i></div>
<div class="state-title">Result Not Available</div>
<div class="state-desc">Quiz results are only available immediately after completing a quiz in this session. Start the quiz to attempt it.</div>
<div style="display:flex;gap:10px;margin-top:8px">
  <button class="btn btn-accent" onclick="window._renderQuizAttemptOrPreview('${quizId}', new URLSearchParams())">Attempt Quiz</button>
  <button class="btn btn-ghost" onclick="window._go('/topics')">Topics</button>
</div>
</div></div>`);
}

export function renderResultsPage(items, score, total, pct, pass, wrong, skip, timeStr, savedResultId) {
  const circ = 2 * Math.PI * 54, offset = circ - (pct / 100) * circ;
  const circMobile = 2 * Math.PI * 46, offsetMobile = circMobile - (pct / 100) * circMobile;
  const profession = PROF_MAP[state.currentProfessionId];
  const nm = profession ? (state.uiLang === 'ur' ? profession.label_ur : profession.label_en) : 'Quiz';
  const shareId = savedResultId || state._currentQuizId;
  const shareUid = state.user?.uid || '';
  const resultsURL = shareId ? `${location.origin}/result/${shareId}${shareUid ? `?uid=${shareUid}` : ''}` : '';

  const previewBtn = state._currentQuizId
    ? `<button class="btn btn-ghost btn-full btn-sm" onclick="window._openQuizPreview('${state._currentQuizId}', window._lastQuizItems)">
     <i class="fa-solid fa-eye"></i> ${t('preview_quiz')}
   </button>`
    : '';

      // Mobile review cards (collapsible)
      const mobileReviewHTML = items.map((item, i) => {
        const cls = item.isCorrect ? 'correct' : item.skipped ? 'skipped' : 'incorrect';
        const icon = item.isCorrect ? 'fa-check' : item.skipped ? 'fa-minus' : 'fa-xmark';
        const qHtml = mdInline(item.question);
        let ans = '';
        if (item.skipped) {
          ans = `<div class="results-mobile-review-answer skipped"><span class="results-mobile-review-tag">SKIPPED</span></div>
                   <div class="results-mobile-review-answer correct-ans"><span class="results-mobile-review-tag">${t('correct_answer').toUpperCase()}</span><span class="md">${mdInline(item.correctAnswer)}</span></div>`;
        } else if (item.isCorrect) {
          ans = `<div class="results-mobile-review-answer user-correct"><i class="fa-solid fa-check" style="font-size:9px"></i><span class="results-mobile-review-tag">${t('your_answer').toUpperCase()}</span><span class="md">${mdInline(item.selectedAnswer)}</span></div>`;
        } else {
          ans = `<div class="results-mobile-review-answer user-wrong"><i class="fa-solid fa-xmark" style="font-size:9px"></i><span class="results-mobile-review-tag">${t('your_answer').toUpperCase()}</span><span class="md">${mdInline(item.selectedAnswer)}</span></div>
                   <div class="results-mobile-review-answer correct-ans"><i class="fa-solid fa-check" style="font-size:9px"></i><span class="results-mobile-review-tag">${t('correct_answer').toUpperCase()}</span><span class="md">${mdInline(item.correctAnswer)}</span></div>`;
        }
        const tutorID = `tutor-mob-${i}`;
        const cog = item.cognitiveLevel ? `<span class="badge-cognitive badge-${item.cognitiveLevel.toLowerCase()}">${t('lvl_' + item.cognitiveLevel.toLowerCase())}</span>` : '';
        const tutorHtml = item.explanation ? `
          <button class="tutor-toggle-btn" onclick="document.getElementById('${tutorID}').classList.toggle('open');">
            <i class="fa-solid fa-microchip"></i> ${t('ai_tutor')}
          </button>
          <div id="${tutorID}" class="explanation-box">
            <div class="explanation-head"><i class="fa-solid fa-graduation-cap"></i> ${t('ai_tutor')} ${t('explanation')}</div>
            <div class="explanation-text md">${mdInline(item.explanation)}</div>
          </div>` : '';

        return `<div class="results-mobile-review-card ${cls}" style="animation-delay:${i * .02}s">
        <div class="results-mobile-review-card-head">
          <div class="results-mobile-review-icon ${cls}"><i class="fa-solid ${icon}"></i></div>
          <div class="results-mobile-review-q md" style="flex:1"><span style="font-family:var(--font-mono);font-size:10px;color:var(--fg-subtle);margin-inline-end:4px">${i + 1}.</span>${qHtml}</div>
          ${cog}
        </div>
        <div class="results-mobile-review-answers">${ans}${tutorHtml}</div>
      </div>`;
      }).join('');

      // Desktop review cards
      const desktopReviewHTML = items.map((item, i) => {
        const cls = item.isCorrect ? 'correct' : item.skipped ? 'skipped' : 'incorrect';
        const icon = item.isCorrect ? 'fa-check' : item.skipped ? 'fa-minus' : 'fa-xmark';
        const qHtml = mdInline(item.question);
        let ans = '';
        if (item.skipped)
          ans = `<div class="review-answer-row skipped-row"><span class="review-tag">SKIPPED</span></div>
             <div class="review-answer-row correct-ans"><span class="review-tag">${t('correct_answer').toUpperCase()}</span><span class="md">${mdInline(item.correctAnswer)}</span></div>`;
        else if (item.isCorrect)
          ans = `<div class="review-answer-row user-correct"><i class="fa-solid fa-check" style="font-size:10px"></i><span class="review-tag">${t('your_answer').toUpperCase()}</span><span class="md">${mdInline(item.selectedAnswer)}</span></div>`;
        else
          ans = `<div class="review-answer-row user-wrong"><i class="fa-solid fa-xmark" style="font-size:10px"></i><span class="review-tag">${t('your_answer').toUpperCase()}</span><span class="md">${mdInline(item.selectedAnswer)}</span></div>
             <div class="review-answer-row correct-ans"><i class="fa-solid fa-check" style="font-size:10px"></i><span class="review-tag">${t('correct_answer').toUpperCase()}</span><span class="md">${mdInline(item.correctAnswer)}</span></div>`;
        
        const tutorID = `tutor-desk-${i}`;
        const cog = item.cognitiveLevel ? `<span class="badge-cognitive badge-${item.cognitiveLevel.toLowerCase()}">${t('lvl_' + item.cognitiveLevel.toLowerCase())}</span>` : '';
        const tutorHtml = item.explanation ? `
          <button class="tutor-toggle-btn" onclick="document.getElementById('${tutorID}').classList.toggle('open');">
            <i class="fa-solid fa-microchip"></i> ${t('ai_tutor')} ${t('explanation')}
          </button>
          <div id="${tutorID}" class="explanation-box">
            <div class="explanation-head"><i class="fa-solid fa-graduation-cap"></i> ${t('ai_tutor')} ${t('explanation')}</div>
            <div class="explanation-text md">${mdInline(item.explanation)}</div>
          </div>` : '';

        return `<div class="review-card ${cls}" style="animation-delay:${i * .02}s">
        <div class="review-card-head">
          <div class="review-icon ${cls}"><i class="fa-solid ${icon}"></i></div>
          <div class="review-q md" style="flex:1">
            <span style="font-family:var(--font-mono);font-size:11px;color:var(--fg-subtle)">${i + 1}. </span>${qHtml}
          </div>
          ${cog}
        </div>
        <div class="review-answers">${ans}${tutorHtml}</div>
      </div>`;
      }).join('');

      setV(`<div class="page" style="animation:fadeUp .25s ease both">
    
    <!-- Mobile Layout -->
    <div class="results-mobile-layout">
      
      <!-- Mobile Header with Score -->
      <div class="results-mobile-header">
        <div class="page-breadcrumb" style="margin-bottom:12px;justify-content:center">
          <span data-nav onclick="window._go('/topics')">${t('choose_topic')}</span>
          <span class="sep">/</span><span>${nm}</span>
          <span class="sep">/</span><span class="current">${t('result')}</span>
        </div>
        
        <div class="results-mobile-score">
          <div class="results-mobile-score-circle">
            <svg viewBox="0 0 100 100">
              <circle class="score-ring-bg" cx="50" cy="50" r="46"/>
              <circle class="score-ring-arc ${pass ? 'pass' : 'fail'}" cx="50" cy="50" r="46" id="mobile-ring-arc"
                      style="stroke-dasharray:${circMobile};stroke-dashoffset:${circMobile}"/>
            </svg>
            <div class="results-mobile-score-center">
              <span class="results-mobile-score-pct ${pass ? 'pass' : 'fail'}" id="mobile-pct-el">0%</span>
              <span class="results-mobile-score-label">${t('score')}</span>
            </div>
          </div>
        </div>
        
        <div class="results-mobile-verdict ${pass ? 'pass' : 'fail'}" id="mobile-verdict">${pass ? t('verdict_pass') : t('verdict_fail')}</div>
        <div class="results-mobile-detail">${pct.toFixed(1)}% · ${t('threshold')}</div>
        
        <div class="results-mobile-stats">
          <div class="results-mobile-stat">
            <div class="results-mobile-stat-num" style="color:var(--success)">${score}</div>
            <div class="results-mobile-stat-lbl">${t('correct')}</div>
          </div>
          <div class="results-mobile-stat">
            <div class="results-mobile-stat-num" style="color:var(--error)">${wrong}</div>
            <div class="results-mobile-stat-lbl">${t('incorrect')}</div>
          </div>
          <div class="results-mobile-stat">
            <div class="results-mobile-stat-num" style="color:var(--fg-subtle)">${skip}</div>
            <div class="results-mobile-stat-lbl">${t('skipped')}</div>
          </div>
        </div>
      </div>

      <!-- Mobile Info Card -->
      <div class="results-mobile-info">
        <div class="results-mobile-info-head">
          <i class="fa-solid fa-user"></i> ${t('candidate')}
        </div>
        <div class="results-mobile-info-row">
          <span class="results-mobile-info-label">${t('name')}</span>
          <span class="results-mobile-info-value">${state.user?.name || '-'}</span>
        </div>
        <div class="results-mobile-info-row">
          <span class="results-mobile-info-label">${t('email')}</span>
          <span class="results-mobile-info-value mono">${state.user?.email || '-'}</span>
        </div>
        <div class="results-mobile-info-row">
          <span class="results-mobile-info-label">${t('questions')}</span>
          <span class="results-mobile-info-value">${total}</span>
        </div>
        <div class="results-mobile-info-row">
          <span class="results-mobile-info-label">${t('score')}</span>
          <span class="results-mobile-info-value">${score}/${total}</span>
        </div>
        <div class="results-mobile-info-row">
          <span class="results-mobile-info-label">${t('time')}</span>
          <span class="results-mobile-info-value">${timeStr}</span>
        </div>
        ${state._currentQuizId ? `<div class="results-mobile-info-row">
          <span class="results-mobile-info-label">${t('quiz_id')}</span>
          <span class="results-mobile-info-value mono">${state._currentQuizId}</span>
        </div>` : ''}
        ${state._currentQuizSource ? `<div class="results-mobile-info-row">
          <span class="results-mobile-info-label">Source</span>
          <span class="badge" style="${state._currentQuizSource === 'cache' ? 'background:var(--warning-subtle);color:var(--warning)' : 'background:var(--success-subtle);color:var(--success)'}">
            ${state._currentQuizSource === 'cache' ? t('quiz_source_cache') : t('quiz_source_ai')}
          </span>
        </div>` : ''}
        <div class="results-mobile-info-row">
          <span class="results-mobile-info-label">${t('result')}</span>
          <span class="badge ${pass ? 'badge-success' : 'badge-error'}">${pass ? t('pass') : t('fail')}</span>
        </div>
      </div>

      <!-- Mobile Share Bar -->
      ${resultsURL ? `<div class="result-share-bar" style="margin-bottom:12px">
        <i class="fa-solid fa-link" style="color:var(--accent);flex-shrink:0"></i>
        <span class="result-share-url">${resultsURL}</span>
        <button class="btn btn-ghost btn-sm" onclick="window._copyResultLink('${resultsURL}')" style="flex-shrink:0">
          <i class="fa-solid fa-copy"></i>
        </button>
      </div>`: ''}

      <!-- Mobile Review Section (Collapsible) -->
      <div class="results-mobile-review">
        <div class="results-mobile-review-head" onclick="this.nextElementSibling.classList.toggle('open');this.querySelector('.results-mobile-review-chevron').classList.toggle('open')">
          <div class="results-mobile-review-title">
            <i class="fa-solid fa-clipboard-list"></i>
            <span>${t('review')}</span>
            <span class="results-mobile-review-count">${total}</span>
          </div>
          <i class="fa-solid fa-chevron-down results-mobile-review-chevron"></i>
        </div>
        <div class="results-mobile-review-body open">
          ${mobileReviewHTML}
        </div>
      </div>

      <!-- Mobile Action Buttons -->
      <div class="results-mobile-actions">
        ${previewBtn}
        <button class="btn btn-accent btn-full btn-lg" onclick="window._resetQuiz()">
          <i class="fa-solid fa-rotate-right"></i> ${t('new_assessment')}
        </button>
      </div>
    </div>

    <!-- Desktop Layout -->
    <div class="results-layout" style="display:none">
      <div class="results-desktop-sidebar">
        <div class="score-display">
          <div class="score-ring-wrap">
            <svg class="score-ring-svg" viewBox="0 0 120 120">
              <circle class="score-ring-bg" cx="60" cy="60" r="54"/>
              <circle class="score-ring-arc ${pass ? 'pass' : 'fail'}" cx="60" cy="60" r="54" id="desktop-ring-arc"
                      style="stroke-dasharray:${circ};stroke-dashoffset:${circ}"/>
            </svg>
            <div class="score-ring-center">
              <span class="score-pct ${pass ? 'pass' : 'fail'}" id="desktop-pct-el">0%</span>
              <span class="score-label">${t('score')}</span>
            </div>
          </div>
          <div class="score-verdict" style="${pass ? 'color:var(--success)' : 'color:var(--error)'}">${pass ? t('verdict_pass') : t('verdict_fail')}</div>
          <div class="score-detail">${pct.toFixed(1)}% · ${t('threshold')}</div>
          <div class="score-stats">
            <div class="stat-box"><div class="stat-num" style="color:var(--success)">${score}</div><div class="stat-lbl">${t('correct')}</div></div>
            <div class="stat-box"><div class="stat-num" style="color:var(--error)">${wrong}</div><div class="stat-lbl">${t('incorrect')}</div></div>
            <div class="stat-box"><div class="stat-num" style="color:var(--fg-subtle)">${skip}</div><div class="stat-lbl">${t('skipped')}</div></div>
          </div>
        </div>

        <div class="panel-card">
          <div class="panel-head">${t('candidate')}</div>
          <div class="panel-list-item"><span class="panel-list-label">${t('name')}</span><span class="panel-list-value">${state.user?.name || '-'}</span></div>
          <div class="panel-list-item"><span class="panel-list-label">${t('email')}</span><span class="panel-list-value" style="font-size:11px">${state.user?.email || '-'}</span></div>
          <div class="panel-list-item"><span class="panel-list-label">${t('questions')}</span><span class="panel-list-value">${total}</span></div>
          <div class="panel-list-item"><span class="panel-list-label">${t('score')}</span><span class="panel-list-value">${score}/${total}</span></div>
          <div class="panel-list-item"><span class="panel-list-label">${t('time')}</span><span class="panel-list-value">${timeStr}</span></div>
          <div class="panel-list-item"><span class="panel-list-label">${t('quiz_id')}</span><span class="panel-list-value" style="font-size:10px;font-family:var(--font-mono);word-break:break-all">${state._currentQuizId || '-'}</span></div>
          ${state._currentQuizSource ? `<div class="panel-list-item"><span class="panel-list-label">Source</span><span class="badge" style="${state._currentQuizSource === 'cache' ? 'background:var(--warning-subtle);color:var(--warning)' : 'background:var(--success-subtle);color:var(--success)'}">
            ${state._currentQuizSource === 'cache' ? t('quiz_source_cache') : t('quiz_source_ai')}</span></div>` : ''}
          <div class="panel-list-item"><span class="panel-list-label">${t('result')}</span><span class="badge ${pass ? 'badge-success' : 'badge-error'}">${pass ? t('pass') : t('fail')}</span></div>
        </div>

        ${previewBtn}
        <button class="btn btn-accent btn-full btn-lg" onclick="window._resetQuiz()">
          <i class="fa-solid fa-rotate-right"></i> ${t('new_assessment')}
        </button>
      </div>

      <div>
        <div class="section-head">
          <span class="section-head-title">${t('review')}</span>
          <div class="section-head-line"></div>
          <span class="badge badge-default">${total}</span>
        </div>
        ${desktopReviewHTML}
      </div>
    </div>
  </div>`);

      applyMath($('main-content'));

      // Animate both mobile and desktop score rings
      requestAnimationFrame(() => requestAnimationFrame(() => {
        // Mobile ring
        const mobileArc = $('mobile-ring-arc');
        if (mobileArc) mobileArc.style.strokeDashoffset = offsetMobile;
        const mobilePct = $('mobile-pct-el');
        if (mobilePct) {
          let cur = 0; const tgt = pct;
          const ti = setInterval(() => { cur = Math.min(cur + tgt / 60, tgt); mobilePct.textContent = Math.round(cur) + '%'; if (cur >= tgt) clearInterval(ti); }, 20);
        }
        // Desktop ring
        const desktopArc = $('desktop-ring-arc');
        if (desktopArc) desktopArc.style.strokeDashoffset = offset;
        const desktopPct = $('desktop-pct-el');
        if (desktopPct) {
          let cur = 0;
          const ti = setInterval(() => { cur = Math.min(cur + pct / 60, pct); desktopPct.textContent = Math.round(cur) + '%'; if (cur >= pct) clearInterval(ti); }, 20);
        }
      }));
    }

export function copyResultLink(url) {
  navigator.clipboard?.writeText(url).then(() => toast(t('link_copied'), 'success'))
    .catch(() => { /* fallback */ const i = document.createElement('input'); i.value = url; document.body.appendChild(i); i.select(); document.execCommand('copy'); i.remove(); toast(t('link_copied'), 'success'); });
}

export function resetQuiz() {
  state.currentQuiz = null; state.answers = {}; state.qIdx = 0; state.startTime = null; state._currentQuizId = null; state._currentQuizSource = null;
  window._lastResult = null; window._lastQuizItems = null;
  if (state.timerID) clearInterval(state.timerID);
  go('/topics');
}

/* ═══════════════════════════════════════════════════════════════════════
   PUBLIC QUIZ LIBRARY  /quizzes
═══════════════════════════════════════════════════════════════════════ */
export async function renderQuizLibrary() {
  setP(20);
  const isAdmin = state.user?.role === 'admin' || state.user?.uid === 'admin';
  const allowed = isAdmin ? null : new Set(state.user?.topics || []); // null = all allowed (admin)
  const allowedProfs = isAdmin
    ? PROFESSIONS
    : PROFESSIONS.filter(p => allowed.has(p.id));

  if (!isAdmin && allowedProfs.length === 0) {
    setV(`<div class="page"><div class="state-box">
  <div class="state-icon warn"><i class="fa-solid fa-lock"></i></div>
  <div class="state-title">No Topics Assigned</div>
  <div class="state-desc">You don't have access to any topics yet. Contact the administrator to get access.</div>
  <a href="https://wa.me/923428910567" target="_blank" class="btn btn-accent">
    <i class="fa-brands fa-whatsapp"></i> Contact Admin
  </a>
</div></div>`);
    return;
  }

  const topicOpts = allowedProfs.map(p => `<option value="${p.id}">${state.uiLang === 'ur' ? p.label_ur : p.label_en}</option>`).join('');

  setV(`<div class="page" style="animation:fadeUp .25s ease both">
<div class="page-header">
  <div class="page-breadcrumb">
    <span data-nav onclick="window._go('/dashboard')">${t('user_dashboard')}</span>
    <span class="sep">/</span><span class="current">${t('quiz_lib_title')}</span>
  </div>
  <div class="page-title">${t('quiz_lib_title')}</div>
  <p class="page-desc">${t('quiz_lib_sub')}</p>
</div>
<div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:20px;align-items:flex-end">
  <div style="display:flex;flex-direction:column;gap:4px">
    <label style="font-size:11px;font-weight:600;color:var(--fg-muted);text-transform:uppercase;letter-spacing:.05em">Topic</label>
    <select id="qlib-pid" onchange="window._loadQuizLibrary()" style="height:36px;padding:0 10px;border:1px solid var(--border);border-radius:var(--radius);background:var(--bg);color:var(--fg);font-size:13px;min-width:200px">
      <option value="">All My Topics</option>
      ${topicOpts}
    </select>
  </div>
  <div style="display:flex;flex-direction:column;gap:4px">
    <label style="font-size:11px;font-weight:600;color:var(--fg-muted);text-transform:uppercase;letter-spacing:.05em">Language</label>
    <select id="qlib-lang" onchange="window._loadQuizLibrary()" style="height:36px;padding:0 10px;border:1px solid var(--border);border-radius:var(--radius);background:var(--bg);color:var(--fg);font-size:13px">
      <option value="">All</option><option value="en">English</option><option value="ur">Urdu</option>
    </select>
  </div>
</div>
    ${!isAdmin ? `<div style="margin-bottom:16px;padding:10px 14px;background:var(--accent-subtle);border:1px solid var(--accent-border);border-radius:var(--radius-lg);font-size:13px;color:var(--accent);display:flex;align-items:center;gap:8px">
      <i class="fa-solid fa-shield-halved"></i>
      Showing quizzes for your ${allowedProfs.length} assigned topic${allowedProfs.length !== 1 ? 's' : ''} only.
    </div>`: ''}
    <div id="qlib-results"><div class="loader-wrap" style="padding:40px"><div class="spinner"></div></div></div>
  </div>`);
      await loadQuizLibrary();
    }

export async function loadQuizLibrary() {
  const isAdmin = state.user?.role === 'admin' || state.user?.uid === 'admin';
  const allowed = isAdmin ? null : new Set(state.user?.topics || []);
  const pid = ($('qlib-pid') || {}).value || '';
  const lang_f = ($('qlib-lang') || {}).value || '';
      const el = $('qlib-results'); if (!el) return;
      el.innerHTML = `<div class="loader-wrap" style="padding:40px"><div class="spinner"></div></div>`;

      // If a specific topic is selected, verify the user is allowed (non-admin)
      if (!isAdmin && pid && !allowed.has(pid)) {
        el.innerHTML = `<div class="state-box"><div class="state-icon error"><i class="fa-solid fa-ban"></i></div>
      <div class="state-title">Access Denied</div>
      <div class="state-desc">You don't have access to this topic.</div></div>`;
        return;
      }

      try {
        const p = new URLSearchParams({ limit: 100 });
        if (pid) p.set('professionId', pid);
        if (lang_f) p.set('lang', lang_f);
        const { ok, data } = await api('GET', `/api/quizzes/public?${p}`);
        if (!ok) throw new Error(data.error || 'Failed to load');

        // Filter to only allowed topics (client-side enforcement)
        let quizzes = data.quizzes || [];
        if (!isAdmin) {
          quizzes = quizzes.filter(q => !q.professionId || allowed.has(q.professionId));
        }

    if (!quizzes.length) {
      el.innerHTML = `<div style="padding:40px;text-align:center;color:var(--fg-muted)">
    <i class="fa-solid fa-inbox" style="font-size:32px;margin-bottom:12px;display:block;opacity:.4"></i>
    <div style="font-size:14px">No quizzes found for your topics yet.</div>
    <div style="font-size:13px;margin-top:4px">Generate your first quiz to see it here.</div>
    <button class="btn btn-accent" style="margin-top:16px" onclick="window._go('/topics')">
      <i class="fa-solid fa-wand-magic-sparkles"></i> Generate Quiz
    </button>
  </div>`;
      return;
    }

        el.innerHTML = `<div style="margin-bottom:12px;font-size:13px;color:var(--fg-muted)">${quizzes.length} quiz${quizzes.length !== 1 ? 'zes' : ''}</div>
    <div class="quiz-lib-grid">
      ${quizzes.map(q => {
          const prof = q.professionId ? PROF_MAP[q.professionId] : null;
          const label = prof ? (state.uiLang === 'ur' ? prof.label_ur : prof.label_en) : q.topic || q.professionId || 'General';
          return `<div class="quiz-lib-card" onclick="window._go('/quiz/${q.quizId}')">
          <div class="quiz-lib-card-head">
            <div class="quiz-lib-card-title">${label}</div>
            ${prof ? `<div class="topic-card-icon" style="width:32px;height:32px;font-size:12px;flex-shrink:0"><i class="${prof.icon}"></i></div>` : ''}
          </div>
          <div class="quiz-lib-card-meta">
            ${q.professionId ? `<span class="badge badge-default" style="font-size:10px">${q.professionId}</span>` : ''}
            <span class="badge badge-default" style="font-size:10px">${q.count} Q</span>
            <span class="badge badge-default" style="font-size:10px">${(q.lang || '').toUpperCase()}</span>
          </div>
          <div class="quiz-lib-card-date">${q.createdAt ? new Date(q.createdAt).toLocaleDateString() : ''}</div>
        </div>`;
        }).join('')}
    </div>`;
        setP(100);
      } catch (e) { el.innerHTML = `<div style="padding:20px;color:var(--error);font-size:13px">${e.message}</div>`; }
    }

/* ═══════════════════════════════════════════════════════════════════════
   QUIZ PREVIEW MODAL
═══════════════════════════════════════════════════════════════════════ */
export function quizPreviewHTML(qz, userAnswers) {
      const items = (qz.questions || []).map((q, i) => {
        const ua = userAnswers ? userAnswers[i] : null;
        const qHtml = mdInline(q.question);
        const opts = (q.options || []).map(o => {
          const isC = o === q.correctAnswer;
          const isSel = ua && ua.selectedAnswer === o;
          let style = 'padding:6px 10px;border:1px solid var(--border);border-radius:8px;display:flex;align-items:center;gap:6px;';
          let icon = '';
          if (isC && isSel) { style += `background:var(--success-subtle);color:var(--success);border-color:var(--success-border);`; icon = `<i class="fa-solid fa-check" style="font-size:10px;flex-shrink:0"></i>`; }
          else if (isC) { style += `background:var(--success-subtle);color:var(--success);border-color:var(--success-border);`; icon = `<i class="fa-solid fa-check" style="font-size:10px;flex-shrink:0"></i>`; }
          else if (isSel) { style += `background:var(--error-subtle);color:var(--error);border-color:var(--error-border);`; icon = `<i class="fa-solid fa-xmark" style="font-size:10px;flex-shrink:0"></i>`; }
          return `<div style="${style}">${icon}<span class="md">${mdInline(o)}</span></div>`;
        }).join('');
        let statusBadge = '';
        if (ua) {
          if (ua.skipped) statusBadge = `<span style="font-size:11px;color:var(--fg-subtle);background:var(--bg-muted);padding:2px 8px;border-radius:4px"><i class="fa-solid fa-minus"></i> Skipped</span>`;
          else if (ua.isCorrect) statusBadge = `<span style="font-size:11px;color:var(--success);background:var(--success-subtle);padding:2px 8px;border-radius:4px"><i class="fa-solid fa-check"></i> Correct</span>`;
          else statusBadge = `<span style="font-size:11px;color:var(--error);background:var(--error-subtle);padding:2px 8px;border-radius:4px"><i class="fa-solid fa-xmark"></i> Incorrect</span>`;
        }
        return `<div style="border:1px solid var(--border);border-radius:12px;padding:12px;display:flex;flex-direction:column;gap:8px">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">
          <div style="font-weight:600;font-size:13px;flex:1" class="md"><span style="font-family:var(--font-mono);font-size:11px;color:var(--fg-subtle)">${i + 1}. </span>${qHtml}</div>${statusBadge}
        </div>
      <div style="display:flex;flex-direction:column;gap:6px">${opts}</div>
    </div>`;
      }).join('');
      const srcColor = qz._source === 'cache' ? 'var(--warning)' : 'var(--success)';
      const meta = `<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;padding-bottom:8px;border-bottom:1px solid var(--border);margin-bottom:4px">
    ${qz.professionId ? `<span class="badge badge-default">${qz.professionId}</span>` : ''}
    ${qz.count ? `<span class="badge badge-default">${qz.count} Q</span>` : ''}
    ${qz.lang ? `<span class="badge badge-default">${qz.lang.toUpperCase()}</span>` : ''}
    ${qz._source ? `<span class="badge" style="background:color-mix(in srgb,${srcColor} 12%,transparent);color:${srcColor};border:1px solid color-mix(in srgb,${srcColor} 25%,transparent)">${qz._source === 'cache' ? 'Cached' : 'AI Generated'}</span>` : ''}
    <span style="font-size:10px;color:var(--fg-subtle);font-family:var(--font-mono);margin-inline-start:auto">${qz.quizId || ''}</span>
  </div>`;
  return `<div style="display:flex;flex-direction:column;gap:10px;max-height:65vh;overflow-y:auto;padding-right:4px">${meta}${items || '<div style="color:var(--fg-muted)">No questions.</div>'}</div>`;
}
export async function openQuizPreview(quizId, answerItems) {
  if (!quizId) { toast('Quiz not available', 'warn'); return; }
  try {
    const { ok, data } = await api('GET', `/api/quizzes/${quizId}`);
    if (!ok) { toast(data.error || 'Quiz not found', 'error'); return; }
    if (state._currentQuizSource) data._source = state._currentQuizSource;
    modal(t('preview_quiz'), quizPreviewHTML(data, answerItems || null),
      `<button class="btn btn-ghost" onclick="window._closeModal()">${t('cancel')}</button>
     <button class="btn btn-accent" onclick="window._closeModal();window._go('/quiz/${quizId}')"><i class="fa-solid fa-external-link-alt"></i> Open</button>`);
    applyMath($('modal-body'));
      } catch (e) { toast(e.message, 'error'); }
    }

Object.assign(window, {
  _copyResultLink: copyResultLink,
  _resetQuiz: resetQuiz,
  _loadQuizLibrary: loadQuizLibrary
});
