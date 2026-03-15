/* ═══════════════════════════════════════════════════════════════════════
   AJK PSC EXAM PREP  ·  Main Entry Point
   ═══════════════════════════════════════════════════════════════════════ */

import { setupMarkdown, toast, $, t } from './helpers.js';
import { route, go, renderChip } from './router.js';
import { state } from './state.js';

console.log('[App] Script started');
try {
    // Setup some globals needed for inline event handlers in the HTML files.
    window._go = go;
    window._renderChip = renderChip;
    window._t = t;
    window.state = state;
    console.log('[App] Globals set:', { go: typeof go, renderChip: typeof renderChip, t: typeof t, state: typeof state });

    document.addEventListener('DOMContentLoaded', () => {
        console.log('[App] DOMContentLoaded');
        try {
            console.log('[App] Setting up markdown...');
            setupMarkdown();
            console.log('[App] Rendering chip...');
            renderChip();
            console.log('[App] Routing...');
            route();
            console.log('[App] Init complete');
        } catch (err) {
            console.error('[App] DOMContentLoaded Init Error:', err);
        }
    });
} catch (err) {
    console.error('[App] Top-level Execution Error:', err);
}

// Global error handler
window.addEventListener('error', (e) => {
    console.error('[Global Error Listener]', e.error || e.message);
    if (typeof toast === 'function') toast('An error occurred. Please refresh.', 'error');
});
