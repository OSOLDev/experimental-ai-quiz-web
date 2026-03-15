import { state } from './state.js';
import { T } from './constants.js';

/* ═══════════════════════════════════════════════════════════════════════
       EXTEND TRANSLATIONS
    ═══════════════════════════════════════════════════════════════════════ */
    Object.assign(T.en, {
      admin_quizzes: 'Quiz Library',
      nav_quizzes: 'Quiz Library', nav_topics: 'My Topics', nav_dashboard: 'Dashboard',
      brand_name: 'Career Boost Officers Academy',
      landing_signin: 'Sign In', landing_register: 'Register with Academy',
      landing_hero: 'Career Boost Officers Academy',
      landing_sub: 'Prepare with years of authentic AJK PSC past papers and expertly curated mock tests for lecturer and commission exams.',
      landing_contact_title: 'Academy Registration',
      landing_contact_whatsapp: 'WhatsApp Support',
      landing_contact_note: 'Contact us via WhatsApp to register for the platform. Reach out to get your account.',
      quiz_lib_title: 'Paper Library', quiz_lib_sub: 'Browse years of authentic past papers and mock tests.',
      quiz_attempt_title: 'Quiz Attempt', share_result: 'Share Result',
      copy_link: 'Copy Link', link_copied: 'Link copied!',
      result_shareable: 'Shareable result link',
      user_dashboard: 'Dashboard', my_topics: 'My Topics',
      recent_activity: 'Recent Activity', no_activity: 'No activity yet. Start a quiz to see results here.',
      quiz_source_ai: 'AI Generated', quiz_source_cache: 'Cached Quiz',
      explanation: 'Explanation', ai_tutor: 'AI Tutor', cognitive_level: 'Level',
      lvl_knowledge: 'Knowledge', lvl_understanding: 'Understanding', lvl_application: 'Application',
      show_explanation: 'Show Explanation', hide_explanation: 'Hide Explanation',
      notifications: 'Notifications', welcome_title: 'Welcome to the Academy',
      cred_msg: 'Your account has been created successfully. Your login credentials are:',
      copy_creds: 'Copy Credentials', creds_copied: 'Credentials copied to clipboard!',
      toggle_theme: 'Theme'
    });
    Object.assign(T.ur, {
      admin_quizzes: 'کوئز لائبریری',
      nav_quizzes: 'کوئز لائبریری', nav_topics: 'میرے موضوعات', nav_dashboard: 'ڈیش بورڈ',
      brand_name: 'کیریئر بوسٹ آفیسرز اکیڈمی',
      landing_signin: 'سائن ان', landing_register: 'اکیڈمی رجسٹریشن',
      landing_hero: 'کیریئر بوسٹ آفیسرز اکیڈمی',
      landing_sub: 'AJK PSC کے سالوں کے مستند ماضی کے پرچوں اور مہارت سے تیار کردہ ٹیسٹوں کے ساتھ تیاری کریں۔',
      landing_contact_title: 'اکیڈمی رجسٹریشن',
      landing_contact_whatsapp: 'واٹس ایپ سپورٹ',
      landing_contact_note: 'پلیٹ فارم پر رجسٹر ہونے کے لیے ہم سے واٹس ایپ پر رابطہ کریں۔',
      quiz_lib_title: 'پیپر لائبریری', quiz_lib_sub: 'ماضی کے مستند پرچوں اور ٹیسٹوں تک رسائی حاصل کریں۔',
      quiz_attempt_title: 'کوئز', share_result: 'نتیجہ شیئر کریں',
      copy_link: 'لنک کاپی کریں', link_copied: 'لنک کاپی ہو گیا!',
      result_shareable: 'شیئر کے قابل نتیجہ لنک',
      user_dashboard: 'ڈیش بورڈ', my_topics: 'میرے موضوعات',
      recent_activity: 'حالیہ سرگرمی', no_activity: 'ابھی کوئی سرگرمی نہیں۔ نتائج دیکھنے کے لیے کوئز شروع کریں۔',
      quiz_source_ai: 'AI from AI', quiz_source_cache: 'محفوظ کوئز',
      explanation: 'وضاحت', ai_tutor: 'AI ٹیوٹر', cognitive_level: 'سطح',
      lvl_knowledge: 'علم', lvl_understanding: 'سمجھ', lvl_application: 'اطلاق',
      show_explanation: 'وضاحت دیکھیں', hide_explanation: 'وضاحت چھپائیں',
      notifications: 'اطلاعات', welcome_title: 'اکیڈمی میں خوش آمدید',
      cred_msg: 'آپ کا اکاؤنٹ کامیابی کے ساتھ بنا دیا گیا ہے۔ آپ کے لاگ ان کی تفصیلات درج ذیل ہیں:',
      copy_creds: 'تفصیلات کاپی کریں', creds_copied: 'تفصیلات کاپی ہو گئیں!',
      toggle_theme: 'تھیم بدلیں'
    });

/* ═══════════════════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════════════════ */
export const $ = id => document.getElementById(id);
export const t = (k, v = {}) => { 
  let s = T[state.uiLang]?.[k] || T.en[k] || k; 
  Object.entries(v).forEach(([a, b]) => { s = s.replace(`{${a}}`, b); }); 
  return s; 
};
export const setP = pct => { const el = $('progress-fill'); if (el) el.style.width = pct + '%'; };
export const setV = html => { $('main-content').innerHTML = html; };
export const showBar = () => $('submit-bar').classList.add('visible');
export const hideBar = () => $('submit-bar').classList.remove('visible');

export function toast(msg, type = 'info', ms = 3500) {
      const c = $('toast-container'), el = document.createElement('div');
      el.className = `toast ${type}`;
      const ic = { success: 'fa-check-circle', error: 'fa-circle-exclamation', info: 'fa-circle-info', warn: 'fa-triangle-exclamation' }[type] || 'fa-circle-info';
      el.innerHTML = `<i class="fa-solid ${ic}"></i><div>${msg}</div>`;
      c.appendChild(el);
      setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity .3s'; setTimeout(() => el.remove(), 300); }, ms);
    }
export function modal(title, body, footer) {
      $('modal-title').innerHTML = title;
      $('modal-body').innerHTML = body;
      $('modal-footer').innerHTML = footer;
      $('modal-overlay').classList.add('open');
    }
export function closeModal() { $('modal-overlay').classList.remove('open'); }

    /* ── API wrapper ── */
export async function api(method, path, body, noAuth = false) {
  const headers = { 'Content-Type': 'application/json' };
  if (!noAuth && state.token) headers['Authorization'] = `Bearer ${state.token}`;
      const opts = { method, headers };
      if (body) opts.body = JSON.stringify(body);
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000);
      try {
        const r = await fetch(path, { ...opts, signal: controller.signal });
        clearTimeout(timeout);
        const data = await r.json().catch(() => ({}));
        return { ok: r.ok, status: r.status, data };
      } catch (e) {
        clearTimeout(timeout);
        if (e.name === 'AbortError') throw new Error('Request timed out. Check your connection.');
        throw new Error('Network error. Check your connection.');
      }
    }

export function setupMarkdown() {
      if (window.marked) marked.setOptions({ breaks: true, gfm: true });
    }
export function escapeHTML(str) {
      return String(str || '').replace(/[&<>"']/g, s => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s]));
    }
export function sanitizeHTML(html, inline = false) {
      if (!window.DOMPurify) return html;
      const allowedInline = ['em', 'strong', 'code', 'br', 'sub', 'sup', 'span', 'del', 'u'];
      const allowedBlock = ['p', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'em', 'strong', 'br', 'sub', 'sup', 'span', 'del', 'u'];
      return DOMPurify.sanitize(html, { ALLOWED_TAGS: inline ? allowedInline : allowedBlock, ALLOWED_ATTR: [] });
    }
export function hasMathDelimiters(s) {
      return /(\$\$[\s\S]+?\$\$)|(\$[^$\n]+\$)|\\\(|\\\[/.test(s);
    }
export function mdInline(text) {
      const s = String(text || '');
      if (hasMathDelimiters(s)) return escapeHTML(s).replace(/\n/g, '<br>');
      if (window.marked) return sanitizeHTML(marked.parseInline(s), true);
      return escapeHTML(s).replace(/\n/g, '<br>');
    }
export function mdBlock(text) {
      const s = String(text || '');
      if (hasMathDelimiters(s)) return escapeHTML(s).replace(/\n/g, '<br>');
      if (window.marked) return sanitizeHTML(marked.parse(s), false);
      return escapeHTML(s).replace(/\n/g, '<br>');
    }
export function applyMath(el) {
  if (!el || !window.renderMathInElement) return;
  renderMathInElement(el, {
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '\\[', right: '\\]', display: true },
      { left: '$', right: '$', display: false },
      { left: '\\(', right: '\\)', display: false },
    ],
    throwOnError: false
  });
}
export function togglePassword(inputId, iconId) {
  const input = $(inputId), icon = $(iconId);
  if (!input || !icon) return;
  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else {
    input.type = 'password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
}

Object.assign(window, {
  _closeModal: closeModal,
  _togglePassword: togglePassword
});