/* ═══════════════════════════════════════════════════════════════════════
       TOPICS  /user/topics
    ═══════════════════════════════════════════════════════════════════════ */
    function renderTopics() {
      hideBar(); setP(20);
      const allowed = new Set(currentUser.topics || []);
      const cards = PROFESSIONS.map(p => {
        const ok_ = allowed.has(p.id);
        const nm = lang === 'ur' ? p.label_ur : p.label_en;
        return `<div class="topic-card ${ok_ ? '' : 'locked'}" onclick="${ok_ ? `selectTopic('${p.id}')` : ``}" ${ok_ ? '' : `title="${t('locked')}"`}>
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
        <span data-nav onclick="go('/user/dashboard')">${t('user_dashboard')}</span>
        <span class="sep">/</span><span class="current">${t('choose_topic')}</span>
      </div>
      <div class="page-title">${t('choose_topic')}</div>
      <p class="page-desc">${t('choose_desc')}</p>
    </div>
    <div class="topic-grid">${cards}</div>
  </div>`);
      setP(100);
    }

    function selectTopic(id) {
      profession = PROF_MAP[id];
      go('/quizzes/create');
    }

    /* ═══════════════════════════════════════════════════════════════════════
       CONFIGURE  /quizzes/create
    ═══════════════════════════════════════════════════════════════════════ */
    function renderConfigure() {
      if (!profession) { go('/user/topics'); return; }
      hideBar(); setP(40);
      const nm = lang === 'ur' ? profession.label_ur : profession.label_en;
      qCount = 30;
      setV(`<div class="page page-md" style="animation:fadeUp .25s ease both">
    <div class="page-header">
      <div class="page-breadcrumb">
        <span data-nav onclick="go('/user/topics')">${t('choose_topic')}</span>
        <span class="sep">/</span><span class="current">${nm}</span>
      </div>
      <div class="page-title">${t('configure')}</div>
      <p class="page-desc">${t('configure_desc')}</p>
    </div>
    <div class="card" style="padding:28px">
      <div class="field">
        <label class="field-label">${t('count_label')}</label>
        <div class="count-selector" id="count-sel">
          ${[5, 10, 15, 30, 50].map(n => `<button class="count-opt ${n === 30 ? 'active' : ''}" onclick="setCount(${n},this)">${n}</button>`).join('')}
        </div>
        <div class="field-hint" style="margin-top:8px">${t('count_info')}</div>
      </div>
      <button class="btn btn-accent btn-full btn-lg" style="margin-top:24px" onclick="doGenerate()">
        <i class="fa-solid fa-wand-magic-sparkles"></i> ${t('generate')}
      </button>
    </div>
  </div>`);
      setP(100);
    }

    function setCount(n, btn) {
      qCount = n;
      document.querySelectorAll('.count-opt').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    }

    /* ═══════════════════════════════════════════════════════════════════════
       GENERATE
    ═══════════════════════════════════════════════════════════════════════ */
    async function doGenerate() {
      if (!profession) { go('/user/topics'); return; }
      setP(60);
      const nm = lang === 'ur' ? profession.label_ur : profession.label_en;
      const concepts = profession.concepts.join(', ');
      const ql = profession.lang === 'ur' ? 'Urdu' : 'English';
      setV(`<div class="page" style="animation:fadeUp .2s ease both">
    <div class="loader-wrap">
      <div class="spinner" style="width:48px;height:48px;border-width:4px"></div>
      <div class="loader-title">${t('generating')}</div>
      <div class="loader-sub">${t('generating_sub')}</div>
      <div style="font-size:12px;color:var(--fg-subtle);font-family:var(--font-mono);margin-top:8px">${profession.id} · ${qCount} questions</div>
    </div>
  </div>`);
      try {
        const controller = new AbortController();
        const to = setTimeout(() => controller.abort(), 90000);
        let res;
        try {
          res = await fetch('/api/generate', {
            method: 'POST', signal: controller.signal,
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
            body: JSON.stringify({
              topic: `${profession.label_en} for AJK PSC`, count: qCount,
              concepts, lang: ql, professionId: profession.id
            })
          });
        } finally { clearTimeout(to); }
        if (!res.ok) {
          const d = await res.json().catch(() => ({}));
          throw new Error(d.error || `Server error ${res.status}`);
        }
        const data = await res.json();
        if (!data.questions?.length) throw new Error('No questions returned by AI.');
        quiz = data.questions; answers = {}; qIdx = 0;
        currentQuizId = data.quizId || null;
        currentQuizSource = data.source || 'ai';
        if (currentQuizSource === 'cache') toast(t('quiz_cached'), 'warn');
        startTime = Date.now();
        if (timerID) clearInterval(timerID);
        timerID = setInterval(updateBar, 1000);
        // Navigate to quiz URL (shareable)
        if (currentQuizId) {
          history.replaceState(null, '', `/quizzes/${currentQuizId}`);
        }
        setP(70); renderQuiz(0);
      } catch (e) {
        const isAbort = e.name === 'AbortError';
        setV(`<div class="page"><div class="state-box">
      <div class="state-icon error"><i class="fa-solid fa-triangle-exclamation"></i></div>
      <div class="state-title">${isAbort ? 'Timed Out' : 'Generation Failed'}</div>
      <div class="state-desc">${isAbort ? 'AI took too long. Try fewer questions.' : e.message}</div>
      <div style="display:flex;gap:10px;margin-top:8px">
        <button class="btn btn-accent" onclick="doGenerate()"><i class="fa-solid fa-rotate-right"></i> Try Again</button>
        <button class="btn btn-ghost" onclick="go('/quizzes/create')"><i class="fa-solid fa-arrow-left"></i> ${t('back')}</button>
      </div>
    </div></div>`);
      }
    }

    