/**
 * AJK PSC Exam Preparation Platform — Cloudflare Worker
 * ═══════════════════════════════════════════════════════════════════════════
 * Storage: Google Cloud Firestore (replaces Cloudflare KV)
 *
 * Required Cloudflare Worker secrets (set via wrangler secret put):
 *   FIRESTORE_PROJECT_ID     GCP project ID
 *   FIRESTORE_CLIENT_EMAIL   Service account email
 *   FIRESTORE_PRIVATE_KEY    Service account private key (full PEM, newlines as \n)
 *   JWT_SECRET
 *   ADMIN_EMAIL
 *   ADMIN_PASSWORD
 *   GEMINI_API_KEY
 *   GROQ_API_KEY
 *   CEREBRAS_API_KEY
 *
 * PAGE ROUTES (SPA — all serve index.html)
 * API ROUTES — unchanged from original
 */

/* ═══ FIRESTORE REST CLIENT ═════════════════════════════════════════════════
 *
 * Cloudflare Workers cannot run the Node.js Firebase Admin SDK.
 * We use the Firestore REST API directly, authenticated with a
 * service account JWT (signed with WebCrypto — available in Workers).
 *
 * Firestore REST base:
 *   https://firestore.googleapis.com/v1/projects/{project}/databases/(default)/documents
 */

/**
 * Sign a Google service-account JWT and exchange it for an OAuth2 access token.
 * Result is cached in memory for 50 minutes (tokens last 60 min).
 */
let _tokenCache = { token: null, exp: 0 };

async function getAccessToken(env) {
    if (_tokenCache.token && Date.now() < _tokenCache.exp) return _tokenCache.token;

    const now = Math.floor(Date.now() / 1000);
    const header = { alg: 'RS256', typ: 'JWT' };
    const payload = {
        iss: env.FIRESTORE_CLIENT_EMAIL,
        scope: 'https://www.googleapis.com/auth/datastore',
        aud: 'https://oauth2.googleapis.com/token',
        iat: now,
        exp: now + 3600,
    };
    const enc = v => btoa(JSON.stringify(v)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    const unsigned = `${enc(header)}.${enc(payload)}`;

    // Import the RSA private key (PEM → CryptoKey)
    const pemKey = env.FIRESTORE_PRIVATE_KEY.replace(/\\n/g, '\n');
    const pemBody = pemKey.replace(/-----[^-]+-----/g, '').replace(/\s/g, '');
    const der = Uint8Array.from(atob(pemBody), c => c.charCodeAt(0));
    const cryptoKey = await crypto.subtle.importKey(
        'pkcs8', der.buffer,
        { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
        false, ['sign']
    );
    const sig = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', cryptoKey, new TextEncoder().encode(unsigned));
    const sigB64 = btoa(String.fromCharCode(...new Uint8Array(sig)))
        .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    const jwt = `${unsigned}.${sigB64}`;

    const r = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
    });
    if (!r.ok) throw new Error(`SA token error: ${await r.text()}`);
    const { access_token, expires_in } = await r.json();
    _tokenCache = { token: access_token, exp: (Date.now() + (expires_in - 60) * 1000) };
    return access_token;
}

/**
 * Low-level Firestore REST helpers
 */
function fsBase(env) {
    return `https://firestore.googleapis.com/v1/projects/${env.FIRESTORE_PROJECT_ID}/databases/(default)/documents`;
}

/** Convert a plain JS object → Firestore Value map (simplified — handles our data types) */
function toFsValue(v) {
    if (v === null || v === undefined) return { nullValue: null };
    if (typeof v === 'boolean') return { booleanValue: v };
    if (typeof v === 'number') return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
    if (typeof v === 'string') return { stringValue: v };
    if (Array.isArray(v)) return { arrayValue: { values: v.map(toFsValue) } };
    if (typeof v === 'object') return { mapValue: { fields: objToFsFields(v) } };
    return { stringValue: String(v) };
}
function objToFsFields(obj) {
    const f = {};
    for (const [k, v] of Object.entries(obj)) {
        if (v !== undefined) f[k] = toFsValue(v);
    }
    return f;
}

/** Convert a Firestore document → plain JS object */
function fromFsDoc(doc) {
    if (!doc?.fields) return null;
    return fromFsFields(doc.fields);
}
function fromFsValue(v) {
    if ('nullValue' in v) return null;
    if ('booleanValue' in v) return v.booleanValue;
    if ('integerValue' in v) return parseInt(v.integerValue);
    if ('doubleValue' in v) return v.doubleValue;
    if ('stringValue' in v) return v.stringValue;
    if ('arrayValue' in v) return (v.arrayValue.values || []).map(fromFsValue);
    if ('mapValue' in v) return fromFsFields(v.mapValue.fields || {});
    return null;
}
function fromFsFields(fields) {
    const obj = {};
    for (const [k, v] of Object.entries(fields)) obj[k] = fromFsValue(v);
    return obj;
}

/** GET a single document. Returns plain object or null. */
async function fsGet(env, collection, docId) {
    const token = await getAccessToken(env);
    const r = await fetch(`${fsBase(env)}/${collection}/${encodeURIComponent(docId)}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    if (r.status === 404) return null;
    if (!r.ok) throw new Error(`Firestore GET ${collection}/${docId}: ${r.status} ${await r.text()}`);
    return fromFsDoc(await r.json());
}

/** CREATE or REPLACE a document. */
async function fsSet(env, collection, docId, data) {
    const token = await getAccessToken(env);
    const url = `${fsBase(env)}/${collection}/${encodeURIComponent(docId)}`;
    const body = { fields: objToFsFields(data) };
    const r = await fetch(url, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
    if (!r.ok) throw new Error(`Firestore SET ${collection}/${docId}: ${r.status} ${await r.text()}`);
    return fromFsDoc(await r.json());
}

/** DELETE a document (ignores 404). */
async function fsDel(env, collection, docId) {
    const token = await getAccessToken(env);
    const r = await fetch(`${fsBase(env)}/${collection}/${encodeURIComponent(docId)}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!r.ok && r.status !== 404) throw new Error(`Firestore DEL ${collection}/${docId}: ${r.status}`);
}

/**
 * Run a structured query.
 * collectionId: e.g. 'results'
 * filters: array of { field, op, value } — op is Firestore operator string
 *   e.g. { field: 'userId', op: 'EQUAL', value: 'abc' }
 * orderBy: { field, direction } — direction: 'ASCENDING' | 'DESCENDING'
 * limitCount: number
 */
async function fsQuery(env, collectionId, filters = [], orderBy = null, limitCount = null) {
    const token = await getAccessToken(env);
    const url = `${fsBase(env)}:runQuery`;

    const where = filters.length === 1
        ? {
            fieldFilter: {
                field: { fieldPath: filters[0].field },
                op: filters[0].op,
                value: toFsValue(filters[0].value)
            }
        }
        : filters.length > 1
            ? {
                compositeFilter: {
                    op: 'AND',
                    filters: filters.map(f => ({
                        fieldFilter: {
                            field: { fieldPath: f.field },
                            op: f.op,
                            value: toFsValue(f.value)
                        }
                    }))
                }
            }
            : undefined;

    const query = { from: [{ collectionId }] };
    if (where) query.where = where;
    if (orderBy) query.orderBy = [{ field: { fieldPath: orderBy.field }, direction: orderBy.direction }];
    if (limitCount) query.limit = limitCount;

    const r = await fetch(url, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ structuredQuery: query }),
    });
    if (!r.ok) throw new Error(`Firestore query ${collectionId}: ${r.status} ${await r.text()}`);
    const rows = await r.json();
    return rows.filter(row => row.document).map(row => fromFsDoc(row.document));
}

/* ═══ CRYPTO ════════════════════════════════════════════════════════════════ */

async function hashPassword(plain) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(plain));
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}
async function verifyPassword(plain, hash) { return (await hashPassword(plain)) === hash; }
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }
function rid() { return 'r_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
function qid() { return 'q_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }

/* ═══ SESSION TOKENS ════════════════════════════════════════════════════════ */

async function makeToken(id, secret) {
    const payload = `${id}:${Date.now()}`;
    const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret),
        { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
    const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
    const hex = [...new Uint8Array(sig)].map(b => b.toString(16).padStart(2, '0')).join('');
    return btoa(`${payload}:${hex}`);
}
async function verifyToken(token, secret) {
    try {
        const dec = atob(token);
        const last = dec.lastIndexOf(':');
        const payload = dec.slice(0, last);
        const hex = dec.slice(last + 1);
        const [id, ts] = payload.split(':');
        if (Date.now() - parseInt(ts) > 43200000) return null; // 12h
        const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret),
            { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
        const sig = new Uint8Array(hex.match(/.{2}/g).map(b => parseInt(b, 16)));
        const ok = await crypto.subtle.verify('HMAC', key, sig, new TextEncoder().encode(payload));
        return ok ? id : null;
    } catch { return null; }
}

/* ═══ DATA HELPERS (Firestore-backed) ══════════════════════════════════════ */

function normalizeTopicKey(topic, professionId) {
    if (professionId) return `pid:${professionId}`;
    const t = (topic || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return `t:${t || 'general'}`;
}
function normalizeLangKey(lang) {
    return (lang || '').toLowerCase().startsWith('ur') ? 'ur' : 'en';
}

/* ── Users ── */

async function getUser(env, id) { return fsGet(env, 'users', id); }

async function getUserByEmail(env, email) {
    const docs = await fsQuery(env, 'users', [
        { field: 'email', op: 'EQUAL', value: email.toLowerCase().trim() }
    ], null, 1);
    return docs[0] || null;
}

async function saveUser(env, u) {
    u.updatedAt = new Date().toISOString();
    await fsSet(env, 'users', u.uid, u);
}

async function deleteUser(env, id) {
    const u = await getUser(env, id);
    if (!u) return;
    await fsDel(env, 'users', id);
    // Delete all results for this user
    const results = await fsQuery(env, 'results', [
        { field: 'userId', op: 'EQUAL', value: id }
    ]);
    for (const r of results) await fsDel(env, 'results', r.resultId);
}

async function listUsers(env) {
    return fsQuery(env, 'users', [], { field: 'createdAt', direction: 'ASCENDING' });
}

/* ── Results ── */

async function upsertResult(env, r) {
    // Check if user already has a result for this quiz
    if (r.quizId && r.userId) {
        const existing = await fsQuery(env, 'results', [
            { field: 'userId', op: 'EQUAL', value: r.userId },
            { field: 'quizId', op: 'EQUAL', value: r.quizId },
        ], null, 1);
        if (existing.length) {
            const updated = { ...existing[0], ...r, resultId: existing[0].resultId, createdAt: new Date().toISOString() };
            await fsSet(env, 'results', updated.resultId, updated);
            return updated;
        }
    }
    // New result
    await fsSet(env, 'results', r.resultId, r);
    return r;
}

async function deleteResult(env, resultId) {
    const r = await fsGet(env, 'results', resultId);
    if (!r) return false;
    await fsDel(env, 'results', resultId);
    return true;
}

async function listResults(env, limit = 200) {
    return fsQuery(env, 'results', [], { field: 'createdAt', direction: 'DESCENDING' }, limit);
}

async function listResultsForUser(env, userId, limit = 200) {
    return fsQuery(env, 'results', [
        { field: 'userId', op: 'EQUAL', value: userId }
    ], { field: 'createdAt', direction: 'DESCENDING' }, limit);
}

async function getResult(env, id) { return fsGet(env, 'results', id); }

/* ── Quizzes ── */

async function getQuiz(env, id) { return fsGet(env, 'quizzes', id); }

async function saveQuiz(env, q) {
    await fsSet(env, 'quizzes', q.quizId, q);
}

async function pickCachedQuiz(env, { topicKey, langKey, count, userId }) {
    const filters = [
        { field: 'topicKey', op: 'EQUAL', value: topicKey },
        { field: 'lang', op: 'EQUAL', value: langKey },
        { field: 'count', op: 'EQUAL', value: count },
    ];
    const candidates = await fsQuery(env, 'quizzes', filters, { field: 'createdAt', direction: 'DESCENDING' }, 20);
    if (!candidates.length) return null;

    if (userId) {
        // Get quizzes this user has already seen
        const seen = await fsQuery(env, 'results', [
            { field: 'userId', op: 'EQUAL', value: userId }
        ]);
        const seenIds = new Set(seen.map(r => r.quizId).filter(Boolean));
        const unseen = candidates.filter(q => !seenIds.has(q.quizId));
        if (unseen.length) return unseen[Math.floor(Math.random() * unseen.length)];
    }
    return candidates[Math.floor(Math.random() * candidates.length)];
}

/* ── Stats ── */

async function getStats(env) {
    const [users, results, quizzes] = await Promise.all([
        listUsers(env),
        listResults(env, 1000),
        fsQuery(env, 'quizzes', [], { field: 'createdAt', direction: 'DESCENDING' }, 1000),
    ]);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const active = users.filter(u => {
        const e = new Date(u.expiryDate); e.setHours(0, 0, 0, 0); return e >= today;
    }).length;
    const avg = results.length
        ? parseFloat((results.reduce((s, r) => s + (r.percentage || 0), 0) / results.length).toFixed(1)) : 0;
    return { totalUsers: users.length, activeUsers: active, totalResults: results.length, avgScore: avg, totalQuizzes: quizzes.length };
}

/* ── Meta ── */

async function getModelPrecedence(env) {
    const doc = await fsGet(env, 'meta', 'model_precedence');
    return doc?.models || null;
}

async function setModelPrecedence(env, models) {
    await fsSet(env, 'meta', 'model_precedence', { models });
}

/* ═══ AUTH ══════════════════════════════════════════════════════════════════ */

async function authUser(req, env) {
    const tok = (req.headers.get('Authorization') || '').replace('Bearer ', '').trim();
    if (!tok) return null;
    const secret = env.JWT_SECRET || 'psc-secret-change-me';
    const id = await verifyToken(tok, secret);
    if (!id) return null;
    if (id === 'admin') return { uid: 'admin', role: 'admin', name: 'Administrator', topics: [], email: env.ADMIN_EMAIL || 'admin@psc.ajk' };
    const u = await getUser(env, id);
    return u ? { ...u, role: 'user' } : null;
}
async function authAdmin(req, env) {
    const u = await authUser(req, env);
    return (u && (u.role === 'admin' || u.uid === 'admin')) ? u : null;
}

/* ═══ RESPONSE HELPERS ══════════════════════════════════════════════════════ */

const CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
};
const ok = (d, s = 200) => new Response(JSON.stringify(d), { status: s, headers: { ...CORS, 'Content-Type': 'application/json' } });
const bad = (m, s = 400) => ok({ error: m }, s);
function safe(u) { if (!u) return null; const { passwordHash: _, password: __, ...r } = u; return r; }

/* ═══ LLM ROUTER ════════════════════════════════════════════════════════════ */

const DEFAULT_MODELS = [
    { provider: 'gemini', id: 'gemini-flash-lite-latest' },
    { provider: 'gemini', id: 'gemini-flash-latest' },
    { provider: 'groq', id: 'llama-3.1-8b-instant' },
    { provider: 'cerebras', id: 'llama3.1-8b' },
];

async function callLLM(provider, model, prompt, env) {
    if (provider === 'gemini') {
        const k = env.GEMINI_API_KEY; if (!k) throw new Error('GEMINI_API_KEY missing');
        const payload = {
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: 'OBJECT', properties: {
                        questions: {
                            type: 'ARRAY', items: {
                                type: 'OBJECT',
                                properties: {
                                    question: { type: 'STRING' },
                                    options: { type: 'ARRAY', items: { type: 'STRING' } },
                                    correctAnswer: { type: 'STRING' },
                                    explanation: { type: 'STRING' },
                                    cognitiveLevel: { type: 'STRING', enum: ['Knowledge', 'Understanding', 'Application'] }
                                },
                                required: ['question', 'options', 'correctAnswer', 'explanation', 'cognitiveLevel']
                            }
                        }
                    }, required: ['questions']
                }
            }
        };
        const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${k}`,
            { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!r.ok) throw new Error(`Gemini ${r.status}: ${await r.text()}`);
        const d = await r.json();
        return d.candidates?.[0]?.content?.parts?.[0]?.text;
    }
    if (provider === 'groq' || provider === 'cerebras') {
        const keys = { groq: 'GROQ_API_KEY', cerebras: 'CEREBRAS_API_KEY' };
        const k = env[keys[provider]]; if (!k) throw new Error(`${keys[provider]} missing`);
        const url = provider === 'groq'
            ? 'https://api.groq.com/openai/v1/chat/completions'
            : 'https://api.cerebras.ai/v1/chat/completions';
        const r = await fetch(url, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${k}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model, response_format: { type: 'json_object' },
                messages: [
                    { role: 'system', content: 'Expert exam writer. Output valid JSON only, no markdown, no preamble.' },
                    { role: 'user', content: prompt }
                ]
            })
        });
        if (!r.ok) throw new Error(`${provider} ${r.status}: ${await r.text()}`);
        return (await r.json()).choices?.[0]?.message?.content;
    }
    throw new Error(`Unknown provider: ${provider}`);
}

async function generate(prompt, env) {
    let models = await getModelPrecedence(env);
    if (!Array.isArray(models) || !models.length) models = [...DEFAULT_MODELS];
    let last;
    for (let i = 0; i < models.length; i++) {
        try {
            const txt = await callLLM(models[i].provider, models[i].id, prompt, env);
            if (txt) return txt;
        } catch (e) {
            last = e;
            console.error(`[LLM] ${models[i].provider}/${models[i].id}: ${e.message}`);
            const f = models.splice(i, 1)[0]; models.push(f);
            await setModelPrecedence(env, models);
            i--;
        }
    }
    throw new Error(`All AI models failed. ${last?.message}`);
}

/* ═══ API HANDLERS ══════════════════════════════════════════════════════════ */

async function routeLogin(req, env) {
    const { email = '', password = '' } = await req.json().catch(() => ({}));
    if (!email || !password) return bad('Email and password required');
    const secret = env.JWT_SECRET || 'psc-secret-change-me';
    const aEmail = (env.ADMIN_EMAIL || 'admin@psc.ajk').toLowerCase();
    const aPass = env.ADMIN_PASSWORD || 'Admin@PSC2024!';
    if (email.toLowerCase().trim() === aEmail && password === aPass) {
        const token = await makeToken('admin', secret);
        return ok({ token, user: { uid: 'admin', name: 'Administrator', email: aEmail, role: 'admin', topics: [], phone: '' } });
    }
    const u = await getUserByEmail(env, email);
    if (!u) return bad('Invalid email or password', 401);
    const passOk = u.passwordHash ? await verifyPassword(password, u.passwordHash) : u.password === password;
    if (!passOk) return bad('Invalid email or password', 401);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const exp = new Date(u.expiryDate); exp.setHours(0, 0, 0, 0);
    if (exp < today) return bad('Account expired. Contact administrator.', 403);
    const token = await makeToken(u.uid, secret);
    return ok({ token, user: { ...safe(u), role: 'user' } });
}

async function routeListUsers(req, env) {
    if (!await authAdmin(req, env)) return bad('Unauthorized', 401);
    return ok((await listUsers(env)).map(safe));
}
async function routeGetUser(req, env, id) {
    if (!await authAdmin(req, env)) return bad('Unauthorized', 401);
    const u = await getUser(env, id);
    return u ? ok(safe(u)) : bad('Not found', 404);
}
async function routeCreateUser(req, env) {
    if (!await authAdmin(req, env)) return bad('Unauthorized', 401);
    const b = await req.json().catch(() => ({}));
    const { name, email, password, phone, startDate, expiryDate, topics, additionalNotes } = b;
    if (!name || !email || !password || !expiryDate || !topics?.length)
        return bad('Required: name, email, password, expiryDate, topics');
    if (await getUserByEmail(env, email)) return bad('Email already registered', 409);
    const u = {
        uid: uid(), name, email: email.toLowerCase().trim(),
        passwordHash: await hashPassword(password),
        phone: phone || '', startDate: startDate || new Date().toISOString().slice(0, 10),
        expiryDate, topics: topics || [], additionalNotes: additionalNotes || '',
        notifications: [{
            id: qid(), type: 'welcome', title: 'Welcome to the Academy',
            message: `Your account has been created successfully. Your login password is: ${password}`,
            read: false, createdAt: new Date().toISOString()
        }],
        createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()
    };
    await saveUser(env, u);
    return ok(safe(u), 201);
}
async function routeUpdateUser(req, env, id) {
    if (!await authAdmin(req, env)) return bad('Unauthorized', 401);
    const ex = await getUser(env, id);
    if (!ex) return bad('Not found', 404);
    const b = await req.json().catch(() => ({}));
    const newEmail = b.email ? b.email.toLowerCase().trim() : ex.email;
    if (newEmail !== ex.email) {
        const clash = await getUserByEmail(env, newEmail);
        if (clash && clash.uid !== id) return bad('Email already in use', 409);
    }
    const u = {
        ...ex,
        name: b.name ?? ex.name,
        email: newEmail,
        phone: b.phone ?? ex.phone,
        startDate: b.startDate ?? ex.startDate,
        expiryDate: b.expiryDate ?? ex.expiryDate,
        topics: b.topics ?? ex.topics,
        additionalNotes: b.additionalNotes ?? ex.additionalNotes,
    };
    if (b.password) u.passwordHash = await hashPassword(b.password);
    await saveUser(env, u);
    return ok(safe(u));
}
async function routeDeleteUser(req, env, id) {
    if (!await authAdmin(req, env)) return bad('Unauthorized', 401);
    const u = await getUser(env, id);
    if (!u) return bad('Not found', 404);
    await deleteUser(env, id);
    return ok({ ok: true, deleted: id });
}

async function routeListResults(req, env) {
    const u = await authUser(req, env);
    if (!u) return bad('Unauthorized', 401);
    const url = new URL(req.url);
    const lim = Math.min(parseInt(url.searchParams.get('limit')) || 200, 500);
    const isMe = url.searchParams.get('user') === 'me';
    if ((u.role === 'admin' || u.uid === 'admin') && !isMe) return ok(await listResults(env, lim));
    return ok(await listResultsForUser(env, u.uid, lim));
}
async function routeGetResult(req, env, id) {
    const u = await authUser(req, env);
    if (!u) return bad('Unauthorized', 401);
    const r = await getResult(env, id);
    if (!r) return bad('Not found', 404);
    if (u.role !== 'admin' && r.userId !== u.uid) return bad('Forbidden', 403);
    return ok(r);
}
async function routeSaveResult(req, env) {
    const u = await authUser(req, env);
    if (!u) return bad('Unauthorized', 401);
    const b = await req.json().catch(() => ({}));
    if (!b.profession || b.score === undefined || !b.total) return bad('Missing result fields');
    const r = {
        resultId: rid(), userId: u.uid, userName: u.name, userEmail: u.email,
        profession: b.profession, professionLabel: b.professionLabel || b.profession,
        score: +b.score, total: +b.total, percentage: parseFloat(b.percentage) || 0,
        pass: !!b.pass, wrong: +b.wrong || 0, skipped: +b.skipped || 0,
        timeTaken: b.timeTaken || '', createdAt: new Date().toISOString(),
        answers: b.answers || [], quizId: b.quizId || null, quizSource: b.quizSource || null
    };
    const saved = await upsertResult(env, r);
    return ok({ ok: true, resultId: saved.resultId, path: `/quizzes/${saved.quizId}/results?uid=${u.uid}` }, 201);
}
async function routeDeleteResult(req, env, id) {
    if (!await authAdmin(req, env)) return bad('Unauthorized', 401);
    const deleted = await deleteResult(env, id);
    if (!deleted) return bad('Not found', 404);
    return ok({ ok: true });
}

async function routeStats(req, env) {
    if (!await authAdmin(req, env)) return bad('Unauthorized', 401);
    return ok(await getStats(env));
}

async function routeGenerate(req, env) {
    const u = await authUser(req, env);
    if (!u) return bad('Unauthorized', 401);
    const b = await req.json().catch(() => ({}));
    const { topic, concepts, lang, professionId } = b;
    const count = [5, 10, 15, 30, 50].includes(+b.count) ? +b.count : 30;
    if (!topic) return bad('topic required');
    if (u.uid !== 'admin' && professionId && !(u.topics || []).includes(professionId))
        return bad('Access denied for this topic', 403);
    const isUrdu = lang === 'Urdu';
    const topicKey = normalizeTopicKey(topic, professionId);
    const langKey = normalizeLangKey(lang || 'English');

    const prompt = `You are an expert exam question writer for the AJK (Azad Jammu & Kashmir) Public Service Commission.

Topic: ${topic}
Concepts: ${concepts || topic}
Language: ${lang || 'English'}
Target Level: BSc/MSc (High difficulty, AJKPSC Standard)

Cognitive Distribution Rules (CRITICAL):
- 40% Knowledge based (Definitions, facts, core principles)
- 30% Understanding based (Comparison, interpretation, conceptual depth)
- 30% Application based (Problem solving, scenarios, calculations)

General Rules:
- Write exactly ${count} multiple-choice questions.
- Distribute questions evenly across all listed concepts.
- ${isUrdu ? 'Write ALL questions, options, and explanations in Urdu Nastaliq script only.' : 'Write everything in English.'}
- Each question must have exactly 4 options.
- correctAnswer must be a byte-for-byte copy of one option string.
- No option labels like A. B. C. D. in the options strings.
- explanation: Provide a detailed "AI Tutor" style step-by-step explanation (2-3 sentences) explaining WHY the correct answer is right and why others are wrong.
- For any mathematical expressions, use LaTeX wrapped in $...$ (inline) or $$...$$ (display).

Return ONLY valid JSON, no markdown:
{
  "questions": [
    {
      "question": "...",
      "options": ["...", "...", "...", "..."],
      "correctAnswer": "...",
      "explanation": "...",
      "cognitiveLevel": "Knowledge | Understanding | Application"
    }
  ]
}`;

    try {
        const raw = await generate(prompt, env);
        let parsed;
        try { parsed = JSON.parse(raw); }
        catch { parsed = JSON.parse(raw.replace(/```json|```/g, '').trim()); }
        if (!Array.isArray(parsed?.questions)) throw new Error('Invalid structure');
        let valid = parsed.questions.filter(q =>
            q.question?.trim() && Array.isArray(q.options) && q.options.length === 4 &&
            q.correctAnswer?.trim() && q.options.includes(q.correctAnswer));
        if (!valid.length) throw new Error('No valid questions returned');
        if (valid.length > count) valid = valid.slice(0, count);
        if (valid.length < count) throw new Error(`AI returned ${valid.length} questions (expected ${count})`);
        const quizId = qid();
        const quizObj = {
            quizId, topic, topicKey, professionId: professionId || null,
            lang: langKey, count: valid.length,
            questions: valid, createdAt: new Date().toISOString(), createdBy: u.uid
        };
        await saveQuiz(env, quizObj);
        return ok({ quizId, questions: valid, source: 'ai', path: `/quizzes/${quizId}` });
    } catch (e) {
        console.error('[generate]', e.message);
        const cached = await pickCachedQuiz(env, { topicKey, langKey, count, userId: u.uid });
        if (cached) {
            return ok({ quizId: cached.quizId, questions: cached.questions, source: 'cache', path: `/quizzes/${cached.quizId}` });
        }
        return bad(e.message, 502);
    }
}

async function routePublicQuizzes(req, env) {
    const url = new URL(req.url);
    const professionId = url.searchParams.get('professionId') || '';
    const lang = url.searchParams.get('lang') || '';
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '24') || 24, 100);
    const offset = parseInt(url.searchParams.get('offset') || '0') || 0;

    const filters = [];
    if (professionId) filters.push({ field: 'professionId', op: 'EQUAL', value: professionId });
    if (lang) filters.push({ field: 'lang', op: 'EQUAL', value: normalizeLangKey(lang) });

    const all = await fsQuery(env, 'quizzes', filters, { field: 'createdAt', direction: 'DESCENDING' }, offset + limit + 100);
    const total = all.length;
    const page = all.slice(offset, offset + limit);
    return ok({
        total,
        quizzes: page.map(q => ({ quizId: q.quizId, topic: q.topic, professionId: q.professionId, lang: q.lang, count: q.count, createdAt: q.createdAt }))
    });
}

async function routeListQuizzes(req, env) {
    if (!await authAdmin(req, env)) return bad('Unauthorized', 401);
    const url = new URL(req.url);
    const topic = url.searchParams.get('topic') || '';
    const professionId = url.searchParams.get('professionId') || '';
    const lang = url.searchParams.get('lang') || '';
    const count = parseInt(url.searchParams.get('count') || '0') || 0;
    if (!topic && !professionId) return bad('topic or professionId required');
    if (!count) return bad('count required');
    const topicKey = normalizeTopicKey(topic, professionId);
    const langKey = normalizeLangKey(lang);
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '50') || 50, 200);
    const quizzes = await fsQuery(env, 'quizzes', [
        { field: 'topicKey', op: 'EQUAL', value: topicKey },
        { field: 'lang', op: 'EQUAL', value: langKey },
        { field: 'count', op: 'EQUAL', value: count },
    ], { field: 'createdAt', direction: 'DESCENDING' }, limit);
    return ok({ quizzes: quizzes.map(q => ({ quizId: q.quizId, topic: q.topic, professionId: q.professionId, lang: q.lang, count: q.count, createdAt: q.createdAt })) });
}

async function routeGetQuiz(req, env, id) {
    const url = new URL(req.url);
    const preview = url.searchParams.get('preview') === '1';
    if (preview) {
        const q = await getQuiz(env, id);
        if (!q) return bad('Not found', 404);
        return ok({ ...q, questions: (q.questions || []).map(({ question, options }) => ({ question, options })) });
    }
    const u = await authUser(req, env);
    if (!u) return bad('Unauthorized', 401);
    const q = await getQuiz(env, id);
    if (!q) return bad('Not found', 404);
    if (u.role !== 'admin') {
        if (q.professionId && !(u.topics || []).includes(q.professionId))
            return bad('Forbidden — topic not in your plan', 403);
    }
    return ok(q);
}

/* ═══ ONE-TIME MIGRATION: KV → Firestore ════════════════════════════════════
 * Public GET endpoint — no auth required.
 * Reads all data from KV_STORE binding and writes to Firestore.
 * Supports batching via ?collection=users|results|quizzes|meta
 * ⚠ REMOVE THIS ROUTE after migration is confirmed complete.
 */
async function routeMigrateKV(req, env) {
    if (!env.KV_STORE) {
        return ok({ ok: false, error: 'KV_STORE binding not found. Add it to wrangler.toml first.' }, 400);
    }

    const url = new URL(req.url);
    // Optional: migrate only one collection at a time to avoid CPU timeout
    // e.g. /api/migrate-kv?collection=quizzes
    const only = url.searchParams.get('collection') || 'all';

    async function kvGet(key) {
        const v = await env.KV_STORE.get(key, 'text');
        if (v === null) return null;
        try { return JSON.parse(v); } catch { return v; }
    }

    const report = {};

    /* ── users ── */
    if (only === 'all' || only === 'users') {
        const r = { migrated: 0, skipped: 0, errors: [] };
        try {
            const idx = await kvGet('users:index') || [];
            for (const id of idx) {
                try {
                    const user = await kvGet(`user:id:${id}`);
                    if (!user) { r.skipped++; continue; }
                    await fsSet(env, 'users', id, user);
                    r.migrated++;
                } catch (e) { r.errors.push(`${id}: ${e.message}`); }
            }
        } catch (e) { r.errors.push(`index read failed: ${e.message}`); }
        report.users = r;
    }

    /* ── results ── */
    if (only === 'all' || only === 'results') {
        const r = { migrated: 0, skipped: 0, errors: [] };
        try {
            const idx = await kvGet('results:index') || [];
            for (const id of idx) {
                try {
                    const result = await kvGet(`result:id:${id}`);
                    if (!result) { r.skipped++; continue; }
                    await fsSet(env, 'results', id, result);
                    r.migrated++;
                } catch (e) { r.errors.push(`${id}: ${e.message}`); }
            }
        } catch (e) { r.errors.push(`index read failed: ${e.message}`); }
        report.results = r;
    }

    /* ── quizzes ── */
    if (only === 'all' || only === 'quizzes') {
        const r = { migrated: 0, skipped: 0, errors: [] };
        try {
            const idx = await kvGet('quizzes:index') || [];
            for (const id of idx) {
                try {
                    const quiz = await kvGet(`quiz:id:${id}`);
                    if (!quiz) { r.skipped++; continue; }
                    await fsSet(env, 'quizzes', id, quiz);
                    r.migrated++;
                } catch (e) { r.errors.push(`${id}: ${e.message}`); }
            }
        } catch (e) { r.errors.push(`index read failed: ${e.message}`); }
        report.quizzes = r;
    }

    /* ── meta ── */
    if (only === 'all' || only === 'meta') {
        const r = { migrated: 0, errors: [] };
        try {
            const models = await kvGet('meta:model_precedence');
            if (models) {
                await fsSet(env, 'meta', 'model_precedence', { models });
                r.migrated++;
            }
        } catch (e) { r.errors.push(e.message); }
        report.meta = r;
    }

    return ok({ ok: true, report });
}

/* ═══ ROUTING ════════════════════════════════════════════════════════════════ */

function isSpaRoute(p) {
    if ([
        '/', '/login',
        '/dashboard', '/topics',
        '/quizzes',
        '/admin', '/admin/users', '/admin/results', '/admin/quizzes',
    ].includes(p)) return true;
    if (/^\/topics\/[^/]+$/.test(p)) return true;
    if (/^\/topics\/[^/]+\/[^/]+$/.test(p)) return true;
    if (/^\/quiz\/[^/]+$/.test(p)) return true;
    if (/^\/result\/[^/]+$/.test(p)) return true;
    return false;
}

async function serveSpa(request, env, url) {
    try {
        return env.ASSETS.fetch(
            new Request(new URL('/', url.origin).toString(), { method: 'GET', headers: request.headers })
        );
    } catch {
        return new Response('Not Found', { status: 404 });
    }
}

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const p = url.pathname, m = request.method;

        if (m === 'OPTIONS') return new Response(null, { headers: CORS });

        /* ── API ── */
        if (p === '/api/auth/login' && m === 'POST') return routeLogin(request, env);

        if (p === '/api/users' && m === 'GET') return routeListUsers(request, env);
        if (p === '/api/users' && m === 'POST') return routeCreateUser(request, env);
        const um = p.match(/^\/api\/users\/([^/]+)$/);
        if (um) {
            if (m === 'GET') return routeGetUser(request, env, um[1]);
            if (m === 'PUT') return routeUpdateUser(request, env, um[1]);
            if (m === 'DELETE') return routeDeleteUser(request, env, um[1]);
        }

        if (p === '/api/results' && m === 'GET') return routeListResults(request, env);
        if (p === '/api/results' && m === 'POST') return routeSaveResult(request, env);
        const rm = p.match(/^\/api\/results\/([^/]+)$/);
        if (rm && m === 'GET') return routeGetResult(request, env, rm[1]);
        if (rm && m === 'DELETE') return routeDeleteResult(request, env, rm[1]);

        if (p === '/api/stats' && m === 'GET') return routeStats(request, env);
        if (p === '/api/generate' && m === 'POST') return routeGenerate(request, env);

        if (p === '/api/quizzes/public' && m === 'GET') return routePublicQuizzes(request, env);
        if (p === '/api/quizzes' && m === 'GET') return routeListQuizzes(request, env);
        const qm = p.match(/^\/api\/quizzes\/([^/]+)$/);
        if (qm && m === 'GET') return routeGetQuiz(request, env, qm[1]);

        /* ── ONE-TIME MIGRATION — remove after use ── */
        if (p === '/api/migrate-kv' && m === 'GET') return routeMigrateKV(request, env);

        /* ── LLM health check ── */
        if (p.startsWith('/api/test')) {
            const llm = url.searchParams.get('llm');
            if (!['groq', 'gemini', 'cerebras'].includes(llm)) return ok({ ok: false, error: 'Invalid ?llm=' }, 400);
            const model = DEFAULT_MODELS.find(x => x.provider === llm);
            try {
                const r = await callLLM(llm, model.id, 'Say: true', env);
                return ok({ ok: true, llm, model: model.id, reply: r?.trim() });
            } catch (e) { return ok({ ok: false, error: e.message }, 502); }
        }

        /* ── SPA ── */
        if (isSpaRoute(p)) return serveSpa(request, env, url);

        /* ── Static assets ── */
        try { return env.ASSETS.fetch(request); }
        catch { return new Response('Not Found', { status: 404 }); }
    }
};