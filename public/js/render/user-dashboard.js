import { state } from '../state.js';
import { PROF_MAP } from '../constants.js';
import { $, setP, setV, t } from '../helpers.js';
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
          <button class="btn btn-ghost btn-full" onclick="window._go('/topics')">
            <i class="fa-solid fa-book-open"></i> Browse Topics
          </button>
        </div>
      </div>
      <div class="dashboard-card">
        <div class="dashboard-card-title"><i class="fa-solid fa-bell" style="color:var(--accent)"></i>${t('notifications')}</div>
        <div id="dash-notifications" style="max-height: 300px; overflow-y: auto">
          ${(state.user.notifications || []).length > 0 ? 
            [...state.user.notifications].reverse().map(n => `
              <div class="panel-list-item" style="flex-direction: column; align-items: flex-start; gap: 4px; padding: 12px 0">
                <div style="font-weight: 700; font-size: 14px; color: var(--brand)">${n.title}</div>
                <div style="font-size: 13px; line-height: 1.5">${n.message}</div>
                <div style="font-size: 11px; color: var(--fg-muted)">${new Date(n.createdAt).toLocaleDateString()}</div>
              </div>
            `).join('') :
            `<div style="color:var(--fg-muted);font-size:13px;padding:12px 0">No notifications yet.</div>`
          }
        </div>
      </div>
      <div class="dashboard-card">
        <div class="dashboard-card-title"><i class="fa-solid fa-list-check" style="color:var(--accent)"></i>${t('my_topics')}</div>
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
      <div id="dash-activity"><div class="spinner" style="width:20px;height:20px"></div></div>
    </div>
  </div>`);
      setP(100);
      // Load recent user results
      try {
        // We don't have a user-specific results endpoint, so we'll just show a prompt
        $('dash-activity').innerHTML = `<div style="color:var(--fg-muted);font-size:13px;padding:16px 0">${t('no_activity')}</div>`;
      } catch (e) { }
    }

    