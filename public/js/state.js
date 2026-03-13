/* ═══════════════════════════════════════════════════════════════════════
       STATE
    ═══════════════════════════════════════════════════════════════════════ */
    let lang = 'en';
    let authToken = sessionStorage.getItem('psc_token') || null;
    let currentUser = null;
    try { currentUser = JSON.parse(sessionStorage.getItem('psc_user')); } catch { }
    let profession = null;
    let quiz = null;
    let answers = {};
    let qIdx = 0;
    let qCount = 30;
    let currentQuizId = null;
    let currentQuizSource = null;
    let startTime = null;
    let timerID = null;
    let adminTab = 'dashboard';
