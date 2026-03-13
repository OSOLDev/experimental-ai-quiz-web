/* ═══════════════════════════════════════════════════════════════════════
   AJK PSC EXAM PREP  ·  Main Entry Point
   ═══════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    setupMarkdown();
    renderChip();
    route();
});

// Global error handler
window.addEventListener('error', (e) => {
    console.error('[Global Error]', e.error);
    toast('An error occurred. Please refresh.', 'error');
});
