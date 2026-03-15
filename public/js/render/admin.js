import { state } from '../state.js';
import { PROFESSIONS, PROF_MAP } from '../constants.js';
import { $, setP, setV, toast, api, modal, closeModal, t } from '../helpers.js';
import { go, navigate, doLogout } from '../router.js';
import { openQuizPreview } from './quiz-attempt.js';

/* ═══════════════════════════════════════════════════════════════════════
   ADMIN PANEL  /admin/*
═══════════════════════════════════════════════════════════════════════ */
const ADMIN_NAV = [
  { id: 'dashboard', path: '/admin', icon: 'fa-chart-pie', labelKey: 'admin_dash' },
  { id: 'users', path: '/admin/users', icon: 'fa-users', labelKey: 'admin_users' },
  { id: 'results', path: '/admin/results', icon: 'fa-chart-bar', labelKey: 'admin_results' },
  { id: 'quizzes', path: '/admin/quizzes', icon: 'fa-book-open', labelKey: 'admin_quizzes' },
];

export function renderAdmin(tab) {
      const activeNav = ADMIN_NAV.find(n => n.id === tab) || ADMIN_NAV[0];
      $('main-topbar').style.display = 'none';
      setP(30);
  const navH = ADMIN_NAV.map(n => `
<a class="admin-nav-item ${tab === n.id ? 'active' : ''}" href="${n.path}" onclick="window._navigate(event,'${n.path}')">
  <i class="fa-solid ${n.icon}"></i>${t(n.labelKey)}
</a>`).join('');
      let content = '';
      if (tab === 'dashboard') content = adminDashHTML();
      else if (tab === 'users') content = adminUsersHTML();
      else if (tab === 'results') content = adminResultsHTML();
      else if (tab === 'quizzes') content = adminQuizzesHTML();
  const mobNavH = ADMIN_NAV.map(n => `
<button class="admin-mob-nav-item ${tab === n.id ? 'active' : ''}" onclick="window._go('${n.path}')">
  <i class="fa-solid ${n.icon}"></i><span>${t(n.labelKey)}</span>
</button>`).join('');
      setV(`<div class="admin-shell">
    <aside class="admin-nav">
      <div class="admin-nav-logo">
        <div style="width:34px;height:34px;background:var(--brand);color:var(--brand-fg);border-radius:var(--radius-md);display:grid;place-items:center;font-size:15px;margin-bottom:8px">
          <i class="fa-solid fa-shield-halved"></i></div>
        <div style="font-size:13px;font-weight:700;color:var(--fg)">Admin Panel</div>
        <div style="font-size:10px;color:var(--fg-subtle);font-family:var(--font-mono)">AJK PSC Platform</div>
      </div>
      <div class="admin-nav-section">Navigation</div>
      ${navH}
      <div style="margin-top:auto;padding:12px 16px;border-top:1px solid hsl(var(--border))">
        <button class="btn btn-ghost btn-full btn-sm" onclick="window._go('/')" style="justify-content:flex-start;gap:8px;margin-bottom:6px">
          <i class="fa-solid fa-house"></i>Home
        </button>
        <button class="btn btn-ghost btn-full btn-sm" onclick="window._doLogout()" style="justify-content:flex-start;gap:8px">
          <i class="fa-solid fa-arrow-right-from-bracket"></i>${t('logout')}
        </button>
      </div>
    </aside>
    <div class="admin-content" id="admin-content">${content}</div>
    <nav class="admin-mob-nav">${mobNavH}
      <button class="admin-mob-nav-item" onclick="window._doLogout()">
        <i class="fa-solid fa-arrow-right-from-bracket"></i><span>Logout</span>
      </button>
    </nav>
  </div>`);
      if (tab === 'dashboard') loadDash();
      else if (tab === 'users') loadUsers();
      else if (tab === 'results') loadResults();
      else if (tab === 'quizzes') { _adminQuizCache = null; loadAdminQuizzes(); }
      setP(100);
    }

    /* ─ Admin Dashboard ─ */
    function adminDashHTML() {
      return `<div style="animation:fadeUp .25s ease both">
    <div style="margin-bottom:24px">
      <h1 style="font-family:var(--font-serif);font-size:26px;font-weight:600;margin-bottom:4px">Dashboard</h1>
      <p style="color:var(--fg-muted);font-size:14px">Platform overview</p>
    </div>
    <div class="stats-grid" id="stats-grid">
      ${[0, 1, 2, 3].map(() => `<div class="stat-card"><div class="skel" style="height:28px;width:60px;margin-bottom:8px"></div><div class="skel" style="height:14px;width:80px"></div></div>`).join('')}
    </div>
    <div style="margin-top:28px">
      <div class="section-head"><span class="section-head-title">Recent Results</span><div class="section-head-line"></div></div>
      <div id="recent-results"><div style="padding:20px;color:var(--fg-muted);font-size:13px">Loading…</div></div>
    </div>
  </div>`;
    }
    async function loadDash() {
      try {
        const [{ ok: so, data: stats }, { ok: ro, data: results }] = await Promise.all([
          api('GET', '/api/stats'), api('GET', '/api/results?limit=5')
        ]);
        const sg = $('stats-grid');
        if (so && sg) {
          sg.innerHTML = [
            { n: stats.totalUsers, l: t('total_users'), icon: 'fa-users', c: 'var(--accent)' },
            { n: stats.activeUsers, l: t('active_users'), icon: 'fa-user-check', c: 'var(--success)' },
            { n: stats.totalResults, l: t('total_results'), icon: 'fa-chart-bar', c: 'var(--warning)' },
            { n: stats.totalQuizzes || 0, l: 'Total Quizzes', icon: 'fa-book-open', c: 'var(--accent)' },
            { n: (stats.avgScore || 0) + '%', l: t('avg_score'), icon: 'fa-star', c: 'var(--success)' },
          ].map(s => `<div class="stat-card">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
          <div style="width:32px;height:32px;background:color-mix(in srgb,${s.c} 15%,transparent);color:${s.c};border-radius:var(--radius-md);display:grid;place-items:center;font-size:13px">
            <i class="fa-solid ${s.icon}"></i></div>
          <div class="stat-card-label">${s.l}</div>
        </div>
        <div class="stat-card-num">${s.n}</div>
      </div>`).join('');
        }
        const rr = $('recent-results');
        if (ro && results?.length && rr) {
          rr.innerHTML = `
            <!-- Desktop table -->
            <div class="desktop-only">
              <div class="table-wrap"><table>
                <thead><tr><th>Name</th><th>Topic</th><th>Score</th><th>Result</th><th>Quiz</th><th>Date</th></tr></thead>
                <tbody>${results.slice(0, 5).map(r => `<tr>
                  <td style="font-weight:500">${r.userName || '-'}</td>
                  <td><span class="badge badge-default">${r.profession || '-'}</span></td>
                  <td style="font-family:var(--font-mono)">${r.score || 0}/${r.total || 0} (${(r.percentage || 0).toFixed(0)}%)</td>
                  <td><span class="badge ${r.pass ? 'badge-success' : 'badge-error'}">${r.pass ? t('pass') : t('fail')}</span></td>
              <td>${r.quizId ? `<button class="btn btn-ghost btn-sm" onclick="window._openQuizPreview('${r.quizId}')"><i class="fa-solid fa-eye"></i></button><a href="/quiz/${r.quizId}" target="_blank" class="btn btn-ghost btn-sm" style="text-decoration:none"><i class="fa-solid fa-external-link-alt"></i></a>` : '-'}</td>
                  <td style="font-size:12px;color:var(--fg-muted)">${r.createdAt ? new Date(r.createdAt).toLocaleDateString() : '-'}</td>
                </tr>`).join('')}</tbody>
              </table></div>
            </div>
            <!-- Mobile cards -->
            <div class="mobile-only mob-card-list">
              ${results.slice(0, 5).map(r => `
                <div class="mob-card">
                  <div class="mob-card-header">
                    <div><div class="mob-card-title">${r.userName || '-'}</div>
                    <div class="mob-card-subtitle">${r.profession || '-'}</div></div>
                    <span class="badge ${r.pass ? 'badge-success' : 'badge-error'}">${r.pass ? t('pass') : t('fail')}</span>
                  </div>
                  <div class="mob-card-row">
                    <span class="mob-card-label">${t('score')}</span>
                    <span class="mob-card-value" style="font-family:var(--font-mono)">${r.score || 0}/${r.total || 0} (${(r.percentage || 0).toFixed(0)}%)</span>
                  </div>
                  ${r.createdAt ? `<div class="mob-card-row"><span class="mob-card-label">Date</span><span class="mob-card-value">${new Date(r.createdAt).toLocaleDateString()}</span></div>` : ''}
              ${r.quizId ? `<div class="mob-card-actions">
                <button class="btn btn-ghost btn-sm" onclick="window._openQuizPreview('${r.quizId}')"><i class="fa-solid fa-eye"></i> Preview</button>
                <a href="/quiz/${r.quizId}" target="_blank" class="btn btn-ghost btn-sm" style="text-decoration:none"><i class="fa-solid fa-external-link-alt"></i> Open</a>
              </div>` : ''}
                </div>
              `).join('')}
            </div>
        <div style="margin-top:10px"><a href="/admin/results" class="btn btn-ghost btn-sm" onclick="window._navigate(event,'/admin/results')">View all results →</a></div>`;
        } else if (rr) { rr.innerHTML = `<div style="padding:20px;color:var(--fg-muted);font-size:13px">${t('no_results')}</div>`; }
      } catch (e) { console.error(e); }
    }

    /* ─ Admin Users ─ */
    function adminUsersHTML() {
      return `<div style="animation:fadeUp .25s ease both">
    <div class="admin-page-head" style="margin-bottom:24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-family:var(--font-serif);font-size:26px;font-weight:600;margin-bottom:4px">${t('admin_users')}</h1>
        <p style="color:var(--fg-muted);font-size:14px">Manage platform users and their topic access</p>
      </div>
  <button class="btn btn-accent" onclick="window._openUserModal()"><i class="fa-solid fa-plus"></i> ${t('add_user')}</button>
    </div>
    <div id="users-table"><div style="padding:20px;color:var(--fg-muted);font-size:13px">Loading…</div></div>
  </div>`;
    }
    async function loadUsers() {
      try {
        const { ok, data } = await api('GET', '/api/users');
        const el = $('users-table'); if (!el) return;
        if (!ok || !data.length) { el.innerHTML = `<div style="padding:20px;color:var(--fg-muted);font-size:13px">${t('no_users')}</div>`; return; }
        const today = new Date(); today.setHours(0, 0, 0, 0);

        const rows = data.map(u => {
          const exp = new Date(u.expiryDate); exp.setHours(0, 0, 0, 0);
          const daysLeft = Math.ceil((exp - today) / 86400000);
          const status = daysLeft < 0 ? 'expired' : daysLeft <= 7 ? 'soon' : 'active';
          const statusLabel = { active: t('status_active'), expired: t('status_expired'), soon: t('status_soon') }[status];
          const statusClass = status === 'active' ? 'badge-success' : status === 'soon' ? 'badge-warn' : 'badge-error';
          const topics = (u.topics || []).slice(0, 3).map(id => `<span class="tag" style="font-size:10px">${id}</span>`).join('');
          const more = (u.topics || []).length > 3 ? `<span style="font-size:11px;color:var(--fg-muted)">+${(u.topics || []).length - 3}</span>` : '';
          const allTopics = (u.topics || []).map(id => `<span class="tag" style="font-size:10px">${id}</span>`).join('');
      const editBtn = `<button class="btn btn-ghost btn-sm" onclick="window._openUserModal('${encodeURIComponent(JSON.stringify(u))}')" title="Edit"><i class="fa-solid fa-pen"></i></button>`;
      const delBtn = `<button class="btn btn-ghost btn-sm" onclick="window._confirmDelete('${u.uid}')" title="Delete" style="color:var(--error)"><i class="fa-solid fa-trash"></i></button>`;

          return { u, exp, daysLeft, status, statusLabel, statusClass, topics, more, allTopics, editBtn, delBtn };
        });

        el.innerHTML = `
          <!-- Desktop table -->
          <div class="desktop-only">
            <div class="table-wrap"><table>
              <thead><tr><th>${t('user_name')}</th><th>${t('user_email')}</th><th>${t('user_phone')}</th><th>${t('user_topics')}</th><th>${t('user_expiry')}</th><th>${t('user_status')}</th><th>${t('user_actions')}</th></tr></thead>
              <tbody>${rows.map(({ u, statusClass, statusLabel, topics, more, editBtn, delBtn }) => `<tr>
                <td style="font-weight:500">${u.name}</td>
                <td style="font-size:12px;font-family:var(--font-mono)">${u.email}</td>
                <td style="font-size:12px">${u.phone || '-'}</td>
                <td><div class="tag-list">${topics}${more}</div></td>
                <td style="font-size:12px">${u.expiryDate || '-'}</td>
                <td><span class="badge ${statusClass}">${statusLabel}</span></td>
                <td style="display:flex;gap:6px">${editBtn}${delBtn}</td>
              </tr>`).join('')}</tbody>
            </table></div>
          </div>
          <!-- Mobile cards -->
          <div class="mobile-only mob-card-list">
            ${rows.map(({ u, statusClass, statusLabel, allTopics, editBtn, delBtn }) => `
              <div class="mob-card">
                <div class="mob-card-header">
                  <div>
                    <div class="mob-card-title">${u.name}</div>
                    <div class="mob-card-subtitle">${u.email}</div>
                  </div>
                  <span class="badge ${statusClass}">${statusLabel}</span>
                </div>
                ${u.phone ? `<div class="mob-card-row"><span class="mob-card-label">${t('user_phone')}</span><span class="mob-card-value">${u.phone}</span></div>` : ''}
                <div class="mob-card-row"><span class="mob-card-label">${t('user_expiry')}</span><span class="mob-card-value">${u.expiryDate || '-'}</span></div>
                ${allTopics ? `<div><div class="mob-card-label" style="margin-bottom:5px">${t('user_topics')}</div><div class="tag-list">${allTopics}</div></div>` : ''}
                <div class="mob-card-actions">${editBtn}${delBtn}</div>
              </div>
            `).join('')}
          </div>`;
      } catch (e) { toast('Failed to load users: ' + e.message, 'error'); }
    }

export function openUserModal(userJson = null) {
  const u = userJson ? JSON.parse(decodeURIComponent(userJson)) : null;
  const title = u ? t('edit_user') : t('add_user');
      const topicOpts = PROFESSIONS.map(p => `
<div class="multi-opt ${(u?.topics || []).includes(p.id) ? 'selected' : ''}" data-id="${p.id}" onclick="window._toggleTopic(this,'${p.id}')">
      <div class="multi-opt-check">${(u?.topics || []).includes(p.id) ? '<i class="fa-solid fa-check" style="font-size:10px"></i>' : ''}</div>
      <div style="flex:1;font-size:12px">${p.label_en}</div>
      <span style="font-family:var(--font-mono);font-size:10px;color:var(--fg-subtle)">${p.id}</span>
    </div>`).join('');
      modal(title, `
    <div class="field"><label class="field-label">${t('user_name')} *</label>
      <input id="u-name" class="field-input" value="${u?.name || ''}" placeholder="Full name"></div>
    <div class="field"><label class="field-label">${t('user_email')} *</label>
      <input id="u-email" class="field-input" type="email" value="${u?.email || ''}" placeholder="email@example.com"></div>
    <div class="field"><label class="field-label">${t('user_phone')}</label>
      <input id="u-phone" class="field-input" value="${u?.phone || ''}" placeholder="+92..."></div>
    <div class="field"><label class="field-label">${t('user_pass')} ${u ? '(leave blank to keep)' : ' *'}</label>
      <div class="input-wrap">
        <input id="u-pass" class="field-input has-icon-end" type="password" placeholder="••••••••">
        <button class="password-toggle" type="button" onclick="window._togglePassword('u-pass', 'tp-icon-admin')">
          <i class="fa-solid fa-eye" id="tp-icon-admin"></i>
        </button>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
      <div class="field"><label class="field-label">${t('user_start')}</label>
        <input id="u-start" class="field-input" type="date" value="${u?.startDate || new Date().toISOString().slice(0, 10)}"></div>
      <div class="field"><label class="field-label">${t('user_expiry')} *</label>
        <input id="u-expiry" class="field-input" type="date" value="${u?.expiryDate || ''}"></div>
    </div>
    <div class="field"><label class="field-label">${t('user_topics')} *</label>
      <div style="border:1.5px solid var(--border-strong);border-radius:var(--radius-md);max-height:180px;overflow-y:auto">${topicOpts}</div>
    </div>
    <div class="field"><label class="field-label">${t('user_notes')}</label>
      <input id="u-notes" class="field-input" value="${u?.additionalNotes || ''}" placeholder="Optional notes"></div>
    <input type="hidden" id="u-uid" value="${u?.uid || ''}">`,
    `<div style="display:flex;gap:8px;width:100%">
      <button class="btn btn-ghost" style="margin-inline-end:auto" onclick="window._copyCredentials()"><i class="fa-solid fa-copy"></i> ${t('copy_creds')}</button>
      <button class="btn btn-ghost" onclick="window._closeModal()">${t('cancel')}</button>
      <button class="btn btn-accent" onclick="window._saveUser('${u?.uid || ''}')">${t('save')}</button>
    </div>`);
}
let _selectedTopics = [];
export function toggleTopic(el, id) {
      el.classList.toggle('selected');
      const chk = el.querySelector('.multi-opt-check');
      if (el.classList.contains('selected')) chk.innerHTML = '<i class="fa-solid fa-check" style="font-size:10px"></i>';
      else chk.innerHTML = '';
    }
export async function saveUser(uid_ = '') {
      const name = $('u-name')?.value.trim(), email = $('u-email')?.value.trim(),
        pass = $('u-pass')?.value, phone = $('u-phone')?.value.trim(),
        startDate = $('u-start')?.value, expiryDate = $('u-expiry')?.value,
        additionalNotes = $('u-notes')?.value.trim();
      const topics = [...document.querySelectorAll('.multi-opt.selected')].map(el => el.dataset.id);
      if (!name || !email || !expiryDate || !topics.length) { toast('Fill all required fields', 'error'); return; }
      const body = { name, email, phone, startDate, expiryDate, topics, additionalNotes };
      if (pass) body.password = pass;
      try {
        const { ok, data } = uid_
          ? await api('PUT', `/api/users/${uid_}`, body)
          : await api('POST', '/api/users', { ...body, password: pass });
        if (!ok) { toast(data.error || 'Save failed', 'error'); return; }
        closeModal(); toast('User saved', 'success'); loadUsers();
      } catch (e) { toast(e.message, 'error'); }
    }
export async function confirmDelete(uid_) {
      modal(t('confirm_delete'),
        `<div class="callout warn"><i class="fa-solid fa-triangle-exclamation"></i><div>This will permanently delete the user and all their data.</div></div>`,
    `<button class="btn btn-ghost" onclick="window._closeModal()">${t('cancel')}</button>
 <button class="btn btn-accent" style="background:var(--error);border-color:var(--error)" onclick="window._deleteUser('${uid_}')">${t('delete')}</button>`);
}
export async function deleteUser(uid_) {
      try {
        const { ok, data } = await api('DELETE', `/api/users/${uid_}`);
        if (!ok) { toast(data.error || 'Delete failed', 'error'); return; }
        closeModal(); toast('User deleted', 'success'); loadUsers();
      } catch (e) { toast(e.message, 'error'); }
    }

    /* ─ Admin Results ─ */
    function adminResultsHTML() {
      return `<div style="animation:fadeUp .25s ease both">
    <div style="margin-bottom:24px">
      <h1 style="font-family:var(--font-serif);font-size:26px;font-weight:600;margin-bottom:4px">${t('admin_results')}</h1>
      <p style="color:var(--fg-muted);font-size:14px">All candidate assessment results</p>
    </div>
    <div id="results-table"><div style="padding:20px;color:var(--fg-muted);font-size:13px">Loading…</div></div>
  </div>`;
    }
    async function loadResults() {
      try {
        const { ok, data } = await api('GET', '/api/results?limit=200');
        const el = $('results-table'); if (!el) return;
        if (!ok || !data.length) { el.innerHTML = `<div style="padding:20px;color:var(--fg-muted);font-size:13px">${t('no_results')}</div>`; return; }

        el.innerHTML = `
          <!-- Desktop table -->
          <div class="desktop-only">
            <div class="table-wrap"><table>
              <thead><tr><th>${t('name')}</th><th>${t('email')}</th><th>Topic</th>
                <th>${t('score')}</th><th>%</th><th>${t('time')}</th><th>${t('result')}</th><th>Source</th><th>Quiz</th><th>Date</th><th></th></tr></thead>
              <tbody>${data.map(r => `<tr>
                <td style="font-weight:500">${r.userName || '-'}</td>
                <td style="font-size:12px;font-family:var(--font-mono)">${r.userEmail || '-'}</td>
                <td><span class="badge badge-default">${r.profession || '-'}</span></td>
                <td style="font-family:var(--font-mono)">${r.score || 0}/${r.total || 0}</td>
                <td style="font-family:var(--font-mono)">${(r.percentage || 0).toFixed(1)}%</td>
                <td style="font-size:12px">${r.timeTaken || '-'}</td>
                <td><span class="badge ${r.pass ? 'badge-success' : 'badge-error'}">${r.pass ? t('pass') : t('fail')}</span></td>
                <td>${r.quizSource === 'cache' ? `<span class="badge" style="background:var(--warning-subtle);color:var(--warning);font-size:10px">Cached</span>` : `<span class="badge badge-default" style="font-size:10px">AI</span>`}</td>
            <td style="display:flex;gap:4px">
              ${r.quizId ? `<button class="btn btn-ghost btn-sm" onclick="window._openQuizPreview('${r.quizId}')" title="Preview"><i class="fa-solid fa-eye"></i></button>
                <a href="/quiz/${r.quizId}" target="_blank" class="btn btn-ghost btn-sm" title="Open" style="text-decoration:none"><i class="fa-solid fa-external-link-alt"></i></a>` : '-'}
            </td>
            <td style="font-size:12px;color:var(--fg-muted)">${r.createdAt ? new Date(r.createdAt).toLocaleDateString() : '-'}</td>
            <td>
              <button class="btn btn-ghost btn-sm" style="color:var(--error)" title="Delete result"
                onclick="window._deleteAdminResult('${r.resultId}', this)">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>`).join('')}</tbody>
            </table></div>
          </div>
          <!-- Mobile cards -->
          <div class="mobile-only mob-card-list">
            ${data.map(r => `
              <div class="mob-card" id="mob-result-${r.resultId}">
                <div class="mob-card-header">
                  <div>
                    <div class="mob-card-title">${r.userName || '-'}</div>
                    <div class="mob-card-subtitle">${r.userEmail || '-'}</div>
                  </div>
                  <span class="badge ${r.pass ? 'badge-success' : 'badge-error'}">${r.pass ? t('pass') : t('fail')}</span>
                </div>
                <div class="mob-card-row">
                  <span class="mob-card-label">Topic</span>
                  <span class="badge badge-default">${r.profession || '-'}</span>
                </div>
                <div class="mob-card-row">
                  <span class="mob-card-label">${t('score')}</span>
                  <span class="mob-card-value" style="font-family:var(--font-mono)">${r.score || 0}/${r.total || 0} · ${(r.percentage || 0).toFixed(1)}%</span>
                </div>
                <div class="mob-card-row">
                  <span class="mob-card-label">${t('time')}</span>
                  <span class="mob-card-value">${r.timeTaken || '-'}</span>
                </div>
                <div class="mob-card-row">
                  <span class="mob-card-label">Source</span>
                  ${r.quizSource === 'cache' ? `<span class="badge" style="background:var(--warning-subtle);color:var(--warning)">Cached</span>` : `<span class="badge badge-default">AI</span>`}
                </div>
                ${r.createdAt ? `<div class="mob-card-row"><span class="mob-card-label">Date</span><span class="mob-card-value">${new Date(r.createdAt).toLocaleDateString()}</span></div>` : ''}
              <div class="mob-card-actions" style="justify-content:space-between">
              <div style="display:flex;gap:6px">
                ${r.quizId ? `<button class="btn btn-ghost btn-sm" onclick="window._openQuizPreview('${r.quizId}')"><i class="fa-solid fa-eye"></i> Preview</button>
                <a href="/quiz/${r.quizId}" target="_blank" class="btn btn-ghost btn-sm" style="text-decoration:none"><i class="fa-solid fa-external-link-alt"></i> Open</a>` : ''}
              </div>
              <button class="btn btn-ghost btn-sm" style="color:var(--error)"
                onclick="window._deleteAdminResult('${r.resultId}', this)">
                    <i class="fa-solid fa-trash"></i> Delete
                  </button>
                </div>
              </div>
            `).join('')}
          </div>`;
      } catch (e) { toast('Failed to load results: ' + e.message, 'error'); }
    }

export async function deleteAdminResult(resultId, btn) {
      if (!confirm('Delete this result? This cannot be undone.')) return;
      btn.disabled = true;
      btn.innerHTML = '<div class="spinner" style="width:12px;height:12px;border-width:2px"></div>';
      try {
        const { ok, data } = await api('DELETE', `/api/results/${resultId}`);
        if (!ok) { toast(data?.error || 'Delete failed', 'error'); btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-trash"></i>'; return; }
        // Remove the row (desktop) and card (mobile)
        const row = btn.closest('tr');
        if (row) row.remove();
        const card = document.getElementById(`mob-result-${resultId}`);
        if (card) card.remove();
        toast('Result deleted', 'success');
      } catch (e) { toast('Delete failed: ' + e.message, 'error'); btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-trash"></i>'; }
    }

    /* ─ Admin Quiz Library ─ */
    const PROFESSIONS_LIST_ADMIN = PROFESSIONS.map(p => ({ id: p.id, label: p.label_en }));
    /* All quizzes cache — loaded once per tab visit, filtered client-side */
    let _adminQuizCache = null;

    function adminQuizzesHTML() {
      const profOpts = PROFESSIONS_LIST_ADMIN.map(p => `<option value="${p.id}">${p.label}</option>`).join('');
      return `<div style="animation:fadeUp .25s ease both">
    <div style="margin-bottom:20px;display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:12px">
  <div>
    <h1 style="font-family:var(--font-serif);font-size:26px;font-weight:600;margin-bottom:4px">${t('admin_quizzes')}</h1>
    <p style="color:var(--fg-muted);font-size:14px">All stored quizzes — served as AI fallback when models are unavailable.</p>
  </div>
  <button class="btn btn-ghost btn-sm" onclick="window._adminQuizCache=null;window._loadAdminQuizzes()">
        <i class="fa-solid fa-rotate-right"></i> Refresh
      </button>
    </div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:16px;align-items:flex-end" class="admin-filter-row">
    <div style="display:flex;flex-direction:column;gap:4px">
    <label style="font-size:11px;font-weight:600;color:var(--fg-muted);text-transform:uppercase;letter-spacing:.05em">Filter by Topic</label>
    <select id="ql-pid" onchange="window._renderAdminQuizTable()" style="height:36px;padding:0 10px;border:1px solid var(--border);border-radius:var(--radius);background:var(--bg);color:var(--fg);font-size:13px;min-width:180px">
          <option value="">All Topics</option>${profOpts}
        </select>
      </div>
    <div style="display:flex;flex-direction:column;gap:4px">
    <label style="font-size:11px;font-weight:600;color:var(--fg-muted);text-transform:uppercase;letter-spacing:.05em">Language</label>
    <select id="ql-lang" onchange="window._renderAdminQuizTable()" style="height:36px;padding:0 10px;border:1px solid var(--border);border-radius:var(--radius);background:var(--bg);color:var(--fg);font-size:13px">
          <option value="">All</option><option value="en">English</option><option value="ur">Urdu</option>
        </select>
      </div>
    <div style="display:flex;flex-direction:column;gap:4px">
    <label style="font-size:11px;font-weight:600;color:var(--fg-muted);text-transform:uppercase;letter-spacing:.05em">Questions</label>
    <select id="ql-count" onchange="window._renderAdminQuizTable()" style="height:36px;padding:0 10px;border:1px solid var(--border);border-radius:var(--radius);background:var(--bg);color:var(--fg);font-size:13px">
          <option value="">Any</option><option value="5">5</option><option value="10">10</option><option value="15">15</option><option value="30">30</option><option value="50">50</option>
        </select>
      </div>
    </div>
    <div id="ql-stats" style="margin-bottom:12px"></div>
    <div id="quiz-lib-table"><div class="loader-wrap" style="padding:40px"><div class="spinner"></div><div class="loader-sub">Loading quizzes…</div></div></div>
  </div>`;
    }

export async function loadAdminQuizzes() {
      const el = $('quiz-lib-table'); if (!el) return;
      if (_adminQuizCache) { renderAdminQuizTable(); return; }
      el.innerHTML = `<div class="loader-wrap" style="padding:40px"><div class="spinner"></div><div class="loader-sub">Loading quizzes…</div></div>`;
      try {
        // Fetch up to 500 quizzes using the public endpoint (no filter needed, admin can see all)
        const { ok, data } = await api('GET', '/api/quizzes/public?limit=100', null, false);
        if (!ok) throw new Error(data.error || 'Failed to load quizzes');
        _adminQuizCache = data.quizzes || [];
        renderAdminQuizTable();
      } catch (e) {
        if (el) el.innerHTML = `<div style="padding:20px;color:var(--error);font-size:13px"><i class="fa-solid fa-circle-exclamation"></i> ${e.message}</div>`;
      }
    }

export function renderAdminQuizTable() {
      const el = $('quiz-lib-table'), statsEl = $('ql-stats'); if (!el || !_adminQuizCache) return;
      const pid = ($('ql-pid') || {}).value || '';
      const lang_ = ($('ql-lang') || {}).value || '';
      const count = ($('ql-count') || {}).value || '';

      let list = _adminQuizCache;
      if (pid) list = list.filter(q => q.professionId === pid);
      if (lang_) list = list.filter(q => (q.lang || '') === lang_);
      if (count) list = list.filter(q => String(q.count) === count);

      if (statsEl) statsEl.innerHTML = `
    <span class="badge badge-default">${list.length} of ${_adminQuizCache.length} quiz${_adminQuizCache.length !== 1 ? 'zes' : ''}</span>
    ${pid || lang_ || count ? `<button class="btn btn-ghost btn-sm" style="margin-inline-start:6px" onclick="
      const s=['ql-pid','ql-lang','ql-count'];s.forEach(id=>{const e=document.getElementById(id);if(e)e.value='';});window._renderAdminQuizTable()">
      <i class='fa-solid fa-xmark'></i> Clear filters</button>`: ''}`;

      if (!list.length) {
        el.innerHTML = `<div style="padding:40px;text-align:center;color:var(--fg-muted)">
      <i class="fa-solid fa-inbox" style="font-size:32px;margin-bottom:12px;display:block;opacity:.4"></i>
      <div style="font-size:14px">${_adminQuizCache.length ? 'No quizzes match these filters.' : 'No quizzes stored yet.'}</div>
      ${_adminQuizCache.length === 0 ? '<div style="font-size:13px;margin-top:4px">Quizzes are saved automatically when users generate them.</div>' : ''}
    </div>`;
        return;
      }

      el.innerHTML = `
        <!-- Desktop table -->
        <div class="desktop-only">
          <div class="table-wrap"><table>
            <thead><tr><th>Quiz ID</th><th>Topic</th><th>Lang</th><th>Qs</th><th>Created</th><th>Actions</th></tr></thead>
            <tbody>${list.map(q => {
          const prof = q.professionId ? PROF_MAP[q.professionId] : null;
          const label = prof ? prof.label_en : (q.topic || q.professionId || '—');
          return `<tr>
              <td style="font-family:var(--font-mono);font-size:11px;color:var(--fg-subtle)">${q.quizId}</td>
              <td>
                <div style="display:flex;align-items:center;gap:6px">
                  ${prof ? `<div style="width:22px;height:22px;background:var(--accent-subtle);color:var(--accent);border-radius:4px;display:grid;place-items:center;font-size:10px;flex-shrink:0"><i class="${prof.icon}"></i></div>` : ''}
                  <span style="font-size:13px;font-weight:500">${label}</span>
                </div>
              </td>
              <td><span class="badge badge-default">${(q.lang || '').toUpperCase()}</span></td>
              <td style="font-family:var(--font-mono);font-weight:600">${q.count}</td>
              <td style="font-size:12px;color:var(--fg-muted)">${q.createdAt ? new Date(q.createdAt).toLocaleDateString() : '-'}</td>
        <td style="display:flex;gap:4px">
          <button class="btn btn-ghost btn-sm" onclick="window._openQuizPreview('${q.quizId}')" title="Preview"><i class="fa-solid fa-eye"></i></button>
          <a href="/quiz/${q.quizId}" target="_blank" class="btn btn-ghost btn-sm" title="Open" style="text-decoration:none"><i class="fa-solid fa-external-link-alt"></i></a>
        </td>
            </tr>`;
        }).join('')}</tbody>
          </table></div>
        </div>
        <!-- Mobile cards -->
        <div class="mobile-only mob-card-list">
          ${list.map(q => {
          const prof = q.professionId ? PROF_MAP[q.professionId] : null;
          const label = prof ? prof.label_en : (q.topic || q.professionId || '—');
          return `<div class="mob-card">
              <div class="mob-card-header">
                <div style="display:flex;align-items:center;gap:8px;flex:1;min-width:0">
                  ${prof ? `<div style="width:32px;height:32px;background:var(--accent-subtle);color:var(--accent);border-radius:6px;display:grid;place-items:center;font-size:12px;flex-shrink:0"><i class="${prof.icon}"></i></div>` : ''}
                  <div style="min-width:0">
                    <div class="mob-card-title" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${label}</div>
                    <div class="mob-card-subtitle" style="font-size:10px">${q.quizId}</div>
                  </div>
                </div>
                <div style="display:flex;gap:4px;flex-shrink:0">
                  <span class="badge badge-default">${(q.lang || '').toUpperCase()}</span>
                  <span class="badge badge-default">${q.count}Q</span>
                </div>
              </div>
              ${q.createdAt ? `<div class="mob-card-row"><span class="mob-card-label">Created</span><span class="mob-card-value">${new Date(q.createdAt).toLocaleDateString()}</span></div>` : ''}
          <div class="mob-card-actions">
            <button class="btn btn-ghost btn-sm" onclick="window._openQuizPreview('${q.quizId}')"><i class="fa-solid fa-eye"></i> Preview</button>
            <a href="/quiz/${q.quizId}" target="_blank" class="btn btn-ghost btn-sm" style="text-decoration:none"><i class="fa-solid fa-external-link-alt"></i> Open</a>
          </div>
            </div>`;
        }).join('')}
        </div>`;
    }

Object.assign(window, {
  _openUserModal: openUserModal,
  _toggleTopic: toggleTopic,
  _saveUser: saveUser,
  _confirmDelete: confirmDelete,
  _deleteUser: deleteUser,
  _deleteAdminResult: deleteAdminResult,
  _loadAdminQuizzes: loadAdminQuizzes,
  _renderAdminQuizTable: renderAdminQuizTable,
  _copyCredentials: () => {
    const name = $('u-name')?.value.trim();
    const email = $('u-email')?.value.trim();
    const pass = $('u-pass')?.value;
    if (!name || !email || !pass) return toast('Please fill name, email and password first', 'warn');
    const text = `*${t('welcome_title')}*\n\n${t('cred_msg')}\n\n*Name:* ${name}\n*Email:* ${email}\n*Password:* ${pass}\n\n*Portal:* ${location.origin}`;
    navigator.clipboard.writeText(text).then(() => {
      toast(t('creds_copied'));
    });
  }
});