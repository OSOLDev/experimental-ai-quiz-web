import { state } from '../state.js';
import { PROF_MAP } from '../constants.js';
import { $, setP, setV, t, api } from '../helpers.js';
import { go } from '../router.js';
import { selectTopic } from './topics.js';

/* ═══════════════════════════════════════════════════════════════════════
   USER DASHBOARD  /dashboard
═══════════════════════════════════════════════════════════════════════ */
export async function renderUserDashboard() {
      setP(30);
      const today = new Date(); today.setHours(0, 0, 0, 0);
  const expiry = state.user.expiryDate ? new Date(state.user.expiryDate) : null;
      if (expiry) expiry.setHours(0, 0, 0, 0);
      const daysLeft = expiry ? Math.ceil((expiry - today) / (86400000)) : null;
      setV(`<div class="page" style="animation:fadeUp .25s ease both">
    <div class="page-header">
      <div class="page-title">${t('user_dashboard')}</div>
      <p class="page-desc">Welcome back, ${state.user.name}</p>
    </div>
    <div class="dashboard-grid">
      <div class="dashboard-card">
        <div class="dashboard-card-title"><i class="fa-solid fa-user" style="color:var(--accent)"></i>${t('candidate')}</div>
        <div class="panel-list-item"><span class="panel-list-label">${t('name')}</span><span class="panel-list-value">${state.user.name}</span></div>
        <div class="panel-list-item"><span class="panel-list-label">${t('email')}</span><span class="panel-list-value" style="font-size:12px">${state.user.email}</span></div>
        ${daysLeft !== null ? `<div class="panel-list-item"><span class="panel-list-label">Access Expires</span><span class="panel-list-value ${daysLeft <= 7 ? 'text-error' : ''}">${daysLeft > 0 ? daysLeft + ' days remaining' : 'Expired'}</span></div>` : ''}
        <div style="margin-top:16px;display:flex;flex-direction:column;gap:8px">
          <button class="btn btn-accent btn-full" onclick="window._go('/topics')">
            <i class="fa-solid fa-play"></i> Start a Quiz
          </button>
          <button class="btn btn-ghost btn-full" onclick="window._go('/quizzes')">
            <i class="fa-solid fa-book-open"></i> Quiz Library
          </button>
        </div>
      </div>
      <div class="dashboard-card">
        <div class="dashboard-card-title">
          <i class="fa-solid fa-list-check" style="color:var(--accent)"></i>${t('my_topics')}
          <button class="btn btn-ghost btn-sm" onclick="window._go('/topics')" style="margin-inline-start:auto;font-size:11px">
            <i class="fa-solid fa-grid-2"></i> View All Professions
          </button>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:6px" id="dash-topics">
          ${(state.user.topics || []).map(id => {
        const p = PROF_MAP[id];
        const nm = p ? (state.uiLang === 'ur' ? p.label_ur : p.label_en) : id;
        return `<span class="tag" onclick="window._selectTopic('${id}')" style="cursor:pointer"><i class="${p?.icon || 'fa-solid fa-book'}" style="font-size:10px"></i>${nm}</span>`;
      }).join('') || `<span style="color:var(--fg-muted);font-size:13px">No topics assigned. Contact admin.</span>`}
        </div>
      </div>
    </div>
    <div style="margin-top:28px">
      <div class="section-head">
        <span class="section-head-title">${t('recent_activity')}</span>
        <div class="section-head-line"></div>
      </div>
      <div id="dash-activity">
        <div class="desktop-only">
          <div class="table-wrap">
            <table class="dashboard-table">
              <thead><tr><th>Topic</th><th>Score</th><th>%</th><th>Result</th><th>Date</th></tr></thead>
              <tbody>${[0, 1, 2, 3, 4].map(() => `
                <tr>
                  <td><div class="skel" style="height:14px;width:180px"></div></td>
                  <td><div class="skel" style="height:14px;width:70px"></div></td>
                  <td><div class="skel" style="height:14px;width:50px"></div></td>
                  <td><div class="skel" style="height:18px;width:45px;border-radius:var(--radius)"></div></td>
                  <td><div class="skel" style="height:12px;width:60px"></div></td>
                </tr>
              `).join('')}</tbody>
            </table>
          </div>
        </div>
        <div class="mobile-only mob-card-list">
          ${[0, 1, 2, 3, 4].map(() => `
            <div class="mob-card">
              <div class="mob-card-header">
                <div>
                  <div class="skel" style="height:16px;width:160px;margin-bottom:6px"></div>
                  <div class="skel" style="height:12px;width:100px"></div>
                </div>
                <div class="skel" style="height:18px;width:50px;border-radius:var(--radius)"></div>
              </div>
              <div class="mob-card-row">
                <span class="mob-card-label">${t('score')}</span>
                <div class="skel" style="height:14px;width:70px"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  </div>`);
      setP(100);
      // Load recent user results
      try {
        console.log('[Dashboard] Fetching recent activity...');
        // Only fetch 5 items for recent activity widget - optimized for performance
        const { ok, status, data: resp } = await api('GET', '/api/results?user=me&limit=5');
        console.log('[Dashboard] Activity response:', { ok, status, resp });

        const el = $('dash-activity');
        if (!el) return;

        const data = resp?.results || [];

        if (!ok || data.length === 0) {
          el.innerHTML = `<div style="color:var(--fg-muted);font-size:13px;padding:16px 0" class="content-fade-in">${t('no_activity')}</div>`;
          return;
        }

        // Fade out skeletons first
        el.querySelectorAll('.skel').forEach(sk => sk.classList.add('fade-out'));
        await new Promise(r => setTimeout(r, 180));

        el.innerHTML = `
          <div class="mobile-only mob-card-list content-fade-in">
            ${data.map(r => `
              <div class="mob-card" onclick="window._go('/result/${r.resultId}?uid=${r.userId}')" style="cursor:pointer">
                <div class="mob-card-header">
                  <div>
                    <div class="mob-card-title">${r.professionLabel || r.profession || '-'}</div>
                    <div class="mob-card-subtitle">${new Date(r.createdAt).toLocaleDateString()}</div>
                  </div>
                  <span class="badge ${r.pass ? 'badge-success' : 'badge-error'}">${r.pass ? t('pass') : t('fail')}</span>
                </div>
                <div class="mob-card-row">
                  <span class="mob-card-label">${t('score')}</span>
                  <span class="mob-card-value" style="font-family:var(--font-mono)">${r.score || 0}/${r.total || 0} (${(r.percentage || 0).toFixed(0)}%)</span>
                </div>
              </div>
            `).join('')}
          </div>
          <div class="desktop-only content-fade-in">
            <div class="table-wrap">
              <table class="dashboard-table">
                <thead><tr><th>Topic</th><th>Score</th><th>%</th><th>Result</th><th>Date</th></tr></thead>
                <tbody>${data.map(r => `
                  <tr onclick="window._go('/result/${r.resultId}?uid=${r.userId}')" style="cursor:pointer" class="hover-row">
                    <td style="font-weight:500">${r.professionLabel || r.profession || '-'}</td>
                    <td style="font-family:var(--font-mono)">${r.score || 0}/${r.total || 0}</td>
                    <td style="font-family:var(--font-mono)">${(r.percentage || 0).toFixed(0)}%</td>
                    <td><span class="badge ${r.pass ? 'badge-success' : 'badge-error'}">${r.pass ? t('pass') : t('fail')}</span></td>
                    <td style="font-size:12px;color:var(--fg-muted)">${new Date(r.createdAt).toLocaleDateString()}</td>
                  </tr>
                `).join('')}</tbody>
              </table>
            </div>
          </div>
          <div style="margin-top:12px;text-align:right" class="content-fade-in">
            <button class="btn btn-ghost btn-sm" onclick="window._go('/topics')">Take another quiz →</button>
          </div>
        `;
      } catch (e) {
        console.error('[Dashboard] Error loading activity:', e);
        const el = $('dash-activity');
        if (el) el.innerHTML = `<div style="color:var(--error);font-size:13px;padding:16px 0" class="content-fade-in"><i class="fa-solid fa-circle-exclamation"></i> Failed to load activity: ${e.message}</div>`;
      }
    }

    
