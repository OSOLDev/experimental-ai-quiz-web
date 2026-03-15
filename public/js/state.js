/* ═══════════════════════════════════════════════════════════════════════
       STATE
    ═══════════════════════════════════════════════════════════════════════ */
export const state = {
  token: sessionStorage.getItem('psc_token') || null,          
  user: null,           
  uiLang: 'en',         
  currentQuiz: null,    
  currentProfessionId: null,  
  _quizConfig: null,
  answers: {},
  qIdx: 0,
  qCount: 30,
  currentQuizId: null,
  currentQuizSource: null,
  startTime: null,
  timerID: null,
  adminTab: 'dashboard'
};

try { 
  state.user = JSON.parse(sessionStorage.getItem('psc_user')); 
} catch {
  state.user = null;
}
