/**
 * AJK PSC Exam Preparation Platform — Cloudflare Worker
 * ═══════════════════════════════════════════════════════════════════════════
 * Zero Firebase. All data in Cloudflare KV.
 *
 * PAGE ROUTES (all serve index.html — SPA with History API routing)
 * ─────────────────────────────────────────────────────────────────
 * /                          Landing page
 * /account                   Login (unified — admin auto-redirected)
 * /user/dashboard            User dashboard
 * /user/topics               Topic selection
 * /quizzes/create            Quiz configuration
 * /quizzes                   Public quiz library
 * /quizzes/:id               Quiz attempt / preview
 * /quizzes/:id/results       Quiz results for current user
 * /admin/dashboard           Admin dashboard
 * /admin/users               Admin user management
 * /admin/results             Admin results
 * /admin/quizzes             Admin quiz library
 *
 * API ROUTES
 * ──────────
 * POST   /api/auth/login
 * GET    /api/users              (admin)
 * POST   /api/users              (admin)
 * GET    /api/users/:uid         (admin)
 * PUT    /api/users/:uid         (admin)
 * DELETE /api/users/:uid         (admin)
 * GET    /api/results            (admin)
 * GET    /api/results/:id        (auth — own result only, or admin)
 * POST   /api/results            (auth — upserts by quizId+userId)
 * DELETE /api/results/:id        (admin)
 * GET    /api/stats              (admin)
 * POST   /api/generate           (auth)
 * GET    /api/quizzes/public     (public — paginated metadata)
 * GET    /api/quizzes            (admin — filter by topic/lang/count)
 * GET    /api/quizzes/:id        (auth — full quiz with answers)
 * GET    /api/quizzes/:id?preview=1  (public — quiz without answers)
 *
 * KV KEY SCHEMA
 * ─────────────
 * user:email:{email}                          → string uid
 * user:id:{uid}                               → JSON User
 * users:index                                 → JSON string[]
 * result:id:{resultId}                        → JSON Result
 * results:index                               → JSON string[]
 * results:user:{uid}                          → JSON string[]
 * meta:model_precedence                       → JSON Model[]
 * quiz:id:{quizId}                            → JSON Quiz
 * quizzes:index                               → JSON string[] (newest last, cap 5000)
 * quizzes:topic:{key}:lang:{l}:count:{n}      → JSON string[] (per-bucket, cap 1000)
 * quizzes:user:{uid}                          → JSON string[] (per-user, cap 1500)
 */

/* ═══ CRYPTO ════════════════════════════════════════════════════════════════ */

async function hashPassword(plain) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(plain));
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2,'0')).join('');
}
async function verifyPassword(plain, hash) { return (await hashPassword(plain)) === hash; }
function uid()  { return Date.now().toString(36) + Math.random().toString(36).slice(2,8); }
function rid()  { return 'r_' + Date.now().toString(36) + Math.random().toString(36).slice(2,6); }
function qid()  { return 'q_' + Date.now().toString(36) + Math.random().toString(36).slice(2,8); }

/* ═══ SESSION TOKENS ════════════════════════════════════════════════════════ */

async function makeToken(id, secret) {
    const payload = `${id}:${Date.now()}`;
    const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret),
        { name:'HMAC', hash:'SHA-256' }, false, ['sign']);
    const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
    const hex = [...new Uint8Array(sig)].map(b=>b.toString(16).padStart(2,'0')).join('');
    return btoa(`${payload}:${hex}`);
}
async function readToken(token, secret) {
    try {
        const dec  = atob(token);
        const last = dec.lastIndexOf(':');
        const payload = dec.slice(0, last);
        const hex = dec.slice(last + 1);
        const [id, ts] = payload.split(':');
        if (Date.now() - parseInt(ts) > 43200000) return null; // 12h
        const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret),
            { name:'HMAC', hash:'SHA-256' }, false, ['verify']);
        const sig = new Uint8Array(hex.match(/.{2}/g).map(b=>parseInt(b,16)));
        const ok = await crypto.subtle.verify('HMAC', key, sig, new TextEncoder().encode(payload));
        return ok ? id : null;
    } catch { return null; }
}

/* ═══ KV HELPERS ════════════════════════════════════════════════════════════ */

async function kvGet(kv, key) {
    const v = await kv.get(key, 'text');
    if (v === null) return null;
    try { return JSON.parse(v); } catch { return v; }
}
async function kvSet(kv, key, val) {
    await kv.put(key, typeof val === 'string' ? val : JSON.stringify(val));
}
async function kvDel(kv, key) { await kv.delete(key); }

function normalizeTopicKey(topic, professionId) {
    if (professionId) return `pid:${professionId}`;
    const t = (topic||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
    return `t:${t||'general'}`;
}
function normalizeLangKey(lang) {
    return (lang||'').toLowerCase().startsWith('ur') ? 'ur' : 'en';
}
function quizIndexKey(topicKey, langKey, count) {
    return `quizzes:topic:${topicKey}:lang:${langKey}:count:${count}`;
}

/* ── Users ── */
async function getUser(kv, id)       { return kvGet(kv, `user:id:${id}`); }
async function getUserByEmail(kv, e) {
    const id = await kv.get(`user:email:${e.toLowerCase().trim()}`, 'text');
    return id ? getUser(kv, id) : null;
}
async function saveUser(kv, u) {
    u.updatedAt = new Date().toISOString();
    await kvSet(kv, `user:id:${u.uid}`, u);
    await kv.put(`user:email:${u.email.toLowerCase().trim()}`, u.uid);
    const idx = await kvGet(kv, 'users:index') || [];
    if (!idx.includes(u.uid)) { idx.push(u.uid); await kvSet(kv, 'users:index', idx); }
}
async function deleteUser(kv, id) {
    const u = await getUser(kv, id);
    if (!u) return;
    await kvDel(kv, `user:id:${id}`);
    await kvDel(kv, `user:email:${u.email.toLowerCase().trim()}`);
    const idx = (await kvGet(kv, 'users:index') || []).filter(x => x !== id);
    await kvSet(kv, 'users:index', idx);
    await kvDel(kv, `results:user:${id}`);
}
async function listUsers(kv) {
    const idx = await kvGet(kv, 'users:index') || [];
    return (await Promise.all(idx.map(id => getUser(kv, id)))).filter(Boolean);
}

/* ── Results ── */
async function upsertResult(kv, r) {
    // Check if this user already has a result for this quizId
    if (r.quizId) {
        const userResultIds = await kvGet(kv, `results:user:${r.userId}`) || [];
        for (const rid of userResultIds) {
            const existing = await kvGet(kv, `result:id:${rid}`);
            if (existing && existing.quizId === r.quizId) {
                // Update in-place — keep same resultId, update fields
                const updated = { ...existing, ...r, resultId: existing.resultId, createdAt: new Date().toISOString() };
                await kvSet(kv, `result:id:${existing.resultId}`, updated);
                return updated;
            }
        }
    }
    // No existing record — insert fresh
    await kvSet(kv, `result:id:${r.resultId}`, r);
    let gi = await kvGet(kv, 'results:index') || [];
    gi.push(r.resultId);
    if (gi.length > 2000) gi = gi.slice(-2000);
    await kvSet(kv, 'results:index', gi);
    let ui = await kvGet(kv, `results:user:${r.userId}`) || [];
    ui.push(r.resultId);
    await kvSet(kv, `results:user:${r.userId}`, ui);
    return r;
}
async function deleteResult(kv, resultId) {
    const r = await kvGet(kv, `result:id:${resultId}`);
    if (!r) return false;
    await kvDel(kv, `result:id:${resultId}`);
    // Remove from global index
    const gi = (await kvGet(kv, 'results:index') || []).filter(id => id !== resultId);
    await kvSet(kv, 'results:index', gi);
    // Remove from user index
    if (r.userId) {
        const ui = (await kvGet(kv, `results:user:${r.userId}`) || []).filter(id => id !== resultId);
        await kvSet(kv, `results:user:${r.userId}`, ui);
    }
    return true;
}
async function listResults(kv, limit = 200) {
    const idx = (await kvGet(kv, 'results:index') || []).slice(-limit).reverse();
    return (await Promise.all(idx.map(id => kvGet(kv, `result:id:${id}`)))).filter(Boolean);
}
async function getResult(kv, id) { return kvGet(kv, `result:id:${id}`); }

/* ── Quizzes ── */
async function getQuiz(kv, id) { return kvGet(kv, `quiz:id:${id}`); }
async function addQuizIndex(kv, key, id, max = 1000) {
    let idx = await kvGet(kv, key) || [];
    if (!idx.includes(id)) {
        idx.push(id);
        if (idx.length > max) idx = idx.slice(-max);
        await kvSet(kv, key, idx);
    }
    return idx;
}
async function addUserQuiz(kv, u, quizId) {
    return addQuizIndex(kv, `quizzes:user:${u}`, quizId, 1500);
}
async function saveQuiz(kv, q) {
    await kvSet(kv, `quiz:id:${q.quizId}`, q);
    await addQuizIndex(kv, 'quizzes:index', q.quizId, 5000);
    await addQuizIndex(kv, quizIndexKey(q.topicKey, q.lang, q.count), q.quizId, 1000);
}
async function pickCachedQuiz(kv, {topicKey, langKey, count, userId}) {
    const idxKey = quizIndexKey(topicKey, langKey, count);
    let ids = await kvGet(kv, idxKey) || [];
    if (!ids.length) return null;
    let pool = ids;
    if (userId) {
        const seen = await kvGet(kv, `quizzes:user:${userId}`) || [];
        if (seen.length) {
            const seenSet = new Set(seen);
            const filtered = ids.filter(id => !seenSet.has(id));
            if (filtered.length) pool = filtered;
        }
    }
    for (let tries = 0; tries < 5 && pool.length; tries++) {
        const pick = pool[Math.floor(Math.random() * pool.length)];
        const quiz = await getQuiz(kv, pick);
        if (quiz) return quiz;
        ids = ids.filter(id => id !== pick);
        pool = pool.filter(id => id !== pick);
    }
    if (ids.length) await kvSet(kv, idxKey, ids);
    return null;
}

/* ── Stats ── */
async function getStats(kv) {
    const [users, results] = await Promise.all([listUsers(kv), listResults(kv, 1000)]);
    const today = new Date(); today.setHours(0,0,0,0);
    const active = users.filter(u => {
        const e = new Date(u.expiryDate); e.setHours(0,0,0,0); return e >= today;
    }).length;
    const avg = results.length
        ? parseFloat((results.reduce((s,r)=>s+(r.percentage||0),0)/results.length).toFixed(1)) : 0;
    const totalQuizzes = (await kvGet(kv, 'quizzes:index') || []).length;
    return { totalUsers: users.length, activeUsers: active, totalResults: results.length, avgScore: avg, totalQuizzes };
}

/* ═══ AUTH HELPERS ══════════════════════════════════════════════════════════ */

async function authUser(req, env) {
    const tok = (req.headers.get('Authorization')||'').replace('Bearer ','').trim();
    if (!tok) return null;
    const secret = env.JWT_SECRET || 'psc-secret-change-me';
    const id = await readToken(tok, secret);
    if (!id) return null;
    if (id === 'admin') return { uid:'admin', role:'admin', name:'Administrator', topics:[], email: env.ADMIN_EMAIL||'admin@psc.ajk' };
    const u = await getUser(env.KV_STORE, id);
    return u ? { ...u, role:'user' } : null;
}
async function authAdmin(req, env) {
    const u = await authUser(req, env);
    return (u && (u.role==='admin' || u.uid==='admin')) ? u : null;
}

/* ═══ RESPONSE HELPERS ══════════════════════════════════════════════════════ */

const CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
};
const ok  = (d, s=200) => new Response(JSON.stringify(d), {status:s, headers:{...CORS,'Content-Type':'application/json'}});
const bad = (m, s=400) => ok({error:m}, s);
function safe(u) { if (!u) return null; const {passwordHash:_,password:__,...r}=u; return r; }

/* ═══ LLM ROUTER ════════════════════════════════════════════════════════════ */

const DEFAULT_MODELS = [
    { provider:'gemini',   id:'gemini-2.0-flash-lite' },
    { provider:'gemini',   id:'gemini-2.0-flash'      },
    { provider:'groq',     id:'llama-3.3-70b-versatile' },
    { provider:'cerebras', id:'llama3.3-70b'           },
];

async function callLLM(provider, model, prompt, env) {
    if (provider === 'gemini') {
        const k = env.GEMINI_API_KEY; if (!k) throw new Error('GEMINI_API_KEY missing');
        const payload = {
            contents:[{parts:[{text:prompt}]}],
            generationConfig:{
                responseMimeType:'application/json',
                responseSchema:{type:'OBJECT',properties:{questions:{type:'ARRAY',items:{type:'OBJECT',
                    properties:{question:{type:'STRING'},options:{type:'ARRAY',items:{type:'STRING'}},correctAnswer:{type:'STRING'}},
                    required:['question','options','correctAnswer']}}},required:['questions']}
            }
        };
        const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${k}`,
            {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
        if (!r.ok) throw new Error(`Gemini ${r.status}: ${await r.text()}`);
        const d = await r.json();
        return d.candidates?.[0]?.content?.parts?.[0]?.text;
    }
    if (provider === 'groq' || provider === 'cerebras') {
        const keys = {groq:'GROQ_API_KEY',cerebras:'CEREBRAS_API_KEY'};
        const k = env[keys[provider]]; if (!k) throw new Error(`${keys[provider]} missing`);
        const url = provider==='groq'
            ? 'https://api.groq.com/openai/v1/chat/completions'
            : 'https://api.cerebras.ai/v1/chat/completions';
        const r = await fetch(url, {method:'POST',
            headers:{'Authorization':`Bearer ${k}`,'Content-Type':'application/json'},
            body:JSON.stringify({model, response_format:{type:'json_object'},
                messages:[
                    {role:'system',content:'Expert exam writer. Output valid JSON only, no markdown, no preamble.'},
                    {role:'user',content:prompt}
                ]})});
        if (!r.ok) throw new Error(`${provider} ${r.status}: ${await r.text()}`);
        return (await r.json()).choices?.[0]?.message?.content;
    }
    throw new Error(`Unknown provider: ${provider}`);
}

async function generate(prompt, env) {
    const kv = env.KV_STORE;
    let models = await kv.get('meta:model_precedence','json');
    if (!Array.isArray(models)||!models.length) models=[...DEFAULT_MODELS];
    let last;
    for (let i=0; i<models.length; i++) {
        try {
            const txt = await callLLM(models[i].provider, models[i].id, prompt, env);
            if (txt) return txt;
        } catch(e) {
            last=e;
            console.error(`[LLM] ${models[i].provider}/${models[i].id}: ${e.message}`);
            const f=models.splice(i,1)[0]; models.push(f);
            await kv.put('meta:model_precedence', JSON.stringify(models));
            i--;
        }
    }
    throw new Error(`All AI models failed. ${last?.message}`);
}

/* ═══ API HANDLERS ══════════════════════════════════════════════════════════ */

async function routeLogin(req, env) {
    const {email='', password=''} = await req.json().catch(()=>({}));
    if (!email||!password) return bad('Email and password required');
    const secret = env.JWT_SECRET || 'psc-secret-change-me';
    const aEmail = (env.ADMIN_EMAIL||'admin@psc.ajk').toLowerCase();
    const aPass  =  env.ADMIN_PASSWORD||'Admin@PSC2024!';
    if (email.toLowerCase().trim()===aEmail && password===aPass) {
        const token = await makeToken('admin', secret);
        return ok({token, user:{uid:'admin',name:'Administrator',email:aEmail,role:'admin',topics:[],phone:''}});
    }
    const u = await getUserByEmail(env.KV_STORE, email);
    if (!u) return bad('Invalid email or password',401);
    const passOk = u.passwordHash ? await verifyPassword(password, u.passwordHash) : u.password===password;
    if (!passOk) return bad('Invalid email or password',401);
    const today=new Date(); today.setHours(0,0,0,0);
    const exp=new Date(u.expiryDate); exp.setHours(0,0,0,0);
    if (exp<today) return bad('Account expired. Contact administrator.',403);
    const token = await makeToken(u.uid, secret);
    return ok({token, user:{...safe(u), role:'user'}});
}

async function routeListUsers(req, env) {
    if (!await authAdmin(req,env)) return bad('Unauthorized',401);
    return ok((await listUsers(env.KV_STORE)).map(safe));
}
async function routeGetUser(req, env, id) {
    if (!await authAdmin(req,env)) return bad('Unauthorized',401);
    const u = await getUser(env.KV_STORE, id);
    return u ? ok(safe(u)) : bad('Not found',404);
}
async function routeCreateUser(req, env) {
    if (!await authAdmin(req,env)) return bad('Unauthorized',401);
    const b = await req.json().catch(()=>({}));
    const {name,email,password,phone,startDate,expiryDate,topics,additionalNotes} = b;
    if (!name||!email||!password||!expiryDate||!topics?.length)
        return bad('Required: name, email, password, expiryDate, topics');
    if (await getUserByEmail(env.KV_STORE, email)) return bad('Email already registered',409);
    const u = {
        uid:uid(), name, email:email.toLowerCase().trim(),
        passwordHash:await hashPassword(password),
        phone:phone||'', startDate:startDate||new Date().toISOString().slice(0,10),
        expiryDate, topics:topics||[], additionalNotes:additionalNotes||'',
        createdAt:new Date().toISOString(), updatedAt:new Date().toISOString()
    };
    await saveUser(env.KV_STORE, u);
    return ok(safe(u),201);
}
async function routeUpdateUser(req, env, id) {
    if (!await authAdmin(req,env)) return bad('Unauthorized',401);
    const ex = await getUser(env.KV_STORE, id);
    if (!ex) return bad('Not found',404);
    const b = await req.json().catch(()=>({}));
    const newEmail = b.email ? b.email.toLowerCase().trim() : ex.email;
    if (newEmail!==ex.email) {
        const clash = await getUserByEmail(env.KV_STORE, newEmail);
        if (clash&&clash.uid!==id) return bad('Email already in use',409);
        await kvDel(env.KV_STORE, `user:email:${ex.email}`);
    }
    const u = {...ex,
        name:            b.name            ??ex.name,
        email:           newEmail,
        phone:           b.phone           ??ex.phone,
        startDate:       b.startDate       ??ex.startDate,
        expiryDate:      b.expiryDate      ??ex.expiryDate,
        topics:          b.topics          ??ex.topics,
        additionalNotes: b.additionalNotes ??ex.additionalNotes,
    };
    if (b.password) u.passwordHash = await hashPassword(b.password);
    await saveUser(env.KV_STORE, u);
    return ok(safe(u));
}
async function routeDeleteUser(req, env, id) {
    if (!await authAdmin(req,env)) return bad('Unauthorized',401);
    const u = await getUser(env.KV_STORE, id);
    if (!u) return bad('Not found',404);
    await deleteUser(env.KV_STORE, id);
    return ok({ok:true,deleted:id});
}

async function routeListResults(req, env) {
    if (!await authAdmin(req,env)) return bad('Unauthorized',401);
    const lim = Math.min(parseInt(new URL(req.url).searchParams.get('limit'))||200,500);
    return ok(await listResults(env.KV_STORE, lim));
}
async function routeGetResult(req, env, id) {
    const u = await authUser(req, env);
    if (!u) return bad('Unauthorized',401);
    const r = await getResult(env.KV_STORE, id);
    if (!r) return bad('Not found',404);
    if (u.role !== 'admin' && r.userId !== u.uid) return bad('Forbidden',403);
    return ok(r);
}
async function routeSaveResult(req, env) {
    const u = await authUser(req,env);
    if (!u) return bad('Unauthorized',401);
    const b = await req.json().catch(()=>({}));
    if (!b.profession||b.score===undefined||!b.total) return bad('Missing result fields');
    const r = {
        resultId:rid(), userId:u.uid, userName:u.name, userEmail:u.email,
        profession:b.profession, professionLabel:b.professionLabel||b.profession,
        score:+b.score, total:+b.total, percentage:parseFloat(b.percentage)||0,
        pass:!!b.pass, wrong:+b.wrong||0, skipped:+b.skipped||0,
        timeTaken:b.timeTaken||'', createdAt:new Date().toISOString(),
        answers:b.answers||[], quizId:b.quizId||null, quizSource:b.quizSource||null
    };
    const saved = await upsertResult(env.KV_STORE, r);
    if (r.quizId) await addUserQuiz(env.KV_STORE, u.uid, r.quizId);
    return ok({ok:true, resultId:saved.resultId, path:`/quizzes/${saved.quizId}/results?uid=${u.uid}`}, 201);
}
async function routeDeleteResult(req, env, id) {
    if (!await authAdmin(req,env)) return bad('Unauthorized',401);
    const deleted = await deleteResult(env.KV_STORE, id);
    if (!deleted) return bad('Not found',404);
    return ok({ok:true});
}

async function routeStats(req, env) {
    if (!await authAdmin(req,env)) return bad('Unauthorized',401);
    return ok(await getStats(env.KV_STORE));
}

async function routeGenerate(req, env) {
    const u = await authUser(req,env);
    if (!u) return bad('Unauthorized',401);
    const b = await req.json().catch(()=>({}));
    const {topic, concepts, lang, professionId} = b;
    const count = [5,10,15,30,50].includes(+b.count) ? +b.count : 30;
    if (!topic) return bad('topic required');
    if (u.uid!=='admin' && professionId && !(u.topics||[]).includes(professionId))
        return bad('Access denied for this topic',403);
    const isUrdu = lang==='Urdu';
    const topicKey = normalizeTopicKey(topic, professionId);
    const langKey = normalizeLangKey(lang||'English');

    const prompt = `You are an expert exam question writer for the AJK (Azad Jammu & Kashmir) Public Service Commission.

Topic: ${topic}
Concepts: ${concepts||topic}
Language: ${lang||'English'}

Rules:
- Write exactly ${count} multiple-choice questions at BSc/MSc level for government service exam.
- Distribute questions evenly across all listed concepts.
- ${isUrdu?'Write ALL questions and options in Urdu Nastaliq script only.':'Write everything in English.'}
- Each question has exactly 4 options.
- correctAnswer must be a byte-for-byte copy of one option string.
- Vary question types: definition, application, analysis, comparison.
- No option labels like A. B. C. D. in the options strings.
- For any mathematical expressions, use LaTeX wrapped in $...$ (inline) or $$...$$ (display).

Return ONLY valid JSON, no markdown:
{"questions":[{"question":"...","options":["...","...","...","..."],"correctAnswer":"..."}]}`;

    try {
        const raw = await generate(prompt, env);
        let parsed;
        try { parsed=JSON.parse(raw); }
        catch { parsed=JSON.parse(raw.replace(/```json|```/g,'').trim()); }
        if (!Array.isArray(parsed?.questions)) throw new Error('Invalid structure');
        let valid = parsed.questions.filter(q =>
            q.question?.trim() && Array.isArray(q.options) && q.options.length===4 &&
            q.correctAnswer?.trim() && q.options.includes(q.correctAnswer));
        if (!valid.length) throw new Error('No valid questions returned');
        if (valid.length > count) valid = valid.slice(0, count);
        if (valid.length < count) throw new Error(`AI returned ${valid.length} questions (expected ${count})`);
        const quizId = qid();
        const quizObj = {
            quizId, topic, topicKey, professionId: professionId||null,
            lang: langKey, count: valid.length,
            questions: valid, createdAt: new Date().toISOString(), createdBy: u.uid
        };
        await saveQuiz(env.KV_STORE, quizObj);
        await addUserQuiz(env.KV_STORE, u.uid, quizId);
        return ok({quizId, questions: valid, source:'ai', path:`/quizzes/${quizId}`});
    } catch(e) {
        console.error('[generate]',e.message);
        const cached = await pickCachedQuiz(env.KV_STORE, {topicKey, langKey, count, userId: u.uid});
        if (cached) {
            await addUserQuiz(env.KV_STORE, u.uid, cached.quizId);
            return ok({quizId: cached.quizId, questions: cached.questions, source:'cache', path:`/quizzes/${cached.quizId}`});
        }
        return bad(e.message, 502);
    }
}

/* Public paginated quiz list — metadata only, no answers */
async function routePublicQuizzes(req, env) {
    const url = new URL(req.url);
    const professionId = url.searchParams.get('professionId')||'';
    const lang = url.searchParams.get('lang')||'';
    const limit = Math.min(parseInt(url.searchParams.get('limit')||'24')||24, 100);
    const offset = parseInt(url.searchParams.get('offset')||'0')||0;

    let ids = (await kvGet(env.KV_STORE, 'quizzes:index') || []).reverse();

    if (professionId || lang) {
        const all = await Promise.all(ids.slice(0, 500).map(id => getQuiz(env.KV_STORE, id)));
        let filtered = all.filter(Boolean);
        if (professionId) filtered = filtered.filter(q => q.professionId === professionId);
        if (lang) filtered = filtered.filter(q => q.lang === normalizeLangKey(lang));
        const page = filtered.slice(offset, offset + limit);
        return ok({
            total: filtered.length,
            quizzes: page.map(q => ({quizId:q.quizId, topic:q.topic, professionId:q.professionId, lang:q.lang, count:q.count, createdAt:q.createdAt}))
        });
    }

    const total = ids.length;
    const page = ids.slice(offset, offset + limit);
    const quizzes = (await Promise.all(page.map(id => getQuiz(env.KV_STORE, id)))).filter(Boolean)
        .map(q => ({quizId:q.quizId, topic:q.topic, professionId:q.professionId, lang:q.lang, count:q.count, createdAt:q.createdAt}));
    return ok({total, quizzes});
}

/* Admin quiz list — filtered by topic/lang/count */
async function routeListQuizzes(req, env) {
    if (!await authAdmin(req,env)) return bad('Unauthorized',401);
    const url = new URL(req.url);
    const topic = url.searchParams.get('topic')||'';
    const professionId = url.searchParams.get('professionId')||'';
    const lang = url.searchParams.get('lang')||'';
    const count = parseInt(url.searchParams.get('count')||'0')||0;
    if (!topic && !professionId) return bad('topic or professionId required');
    if (!count) return bad('count required');
    const topicKey = normalizeTopicKey(topic, professionId);
    const langKey = normalizeLangKey(lang);
    const idxKey = quizIndexKey(topicKey, langKey, count);
    const limit = Math.min(parseInt(url.searchParams.get('limit')||'50')||50, 200);
    const ids = (await kvGet(env.KV_STORE, idxKey) || []).slice(-limit).reverse();
    const quizzes = (await Promise.all(ids.map(id => getQuiz(env.KV_STORE, id)))).filter(Boolean)
        .map(q => ({quizId:q.quizId, topic:q.topic, professionId:q.professionId, lang:q.lang, count:q.count, createdAt:q.createdAt}));
    return ok({quizzes});
}

/* Single quiz fetch */
async function routeGetQuiz(req, env, id) {
    const url = new URL(req.url);
    const preview = url.searchParams.get('preview') === '1';

    if (preview) {
        // Public preview — return quiz without correct answers
        const q = await getQuiz(env.KV_STORE, id);
        if (!q) return bad('Not found',404);
        return ok({...q, questions: (q.questions||[]).map(({question,options}) => ({question,options}))});
    }

    const u = await authUser(req, env);
    if (!u) return bad('Unauthorized',401);
    const q = await getQuiz(env.KV_STORE, id);
    if (!q) return bad('Not found',404);
    if (u.role !== 'admin') {
        if (q.professionId && !(u.topics||[]).includes(q.professionId))
            return bad('Forbidden — topic not in your plan',403);
    }
    return ok(q);
}

/* ═══ ROUTING ════════════════════════════════════════════════════════════════ */

/* All SPA page paths — served as index.html */
function isSpaRoute(p) {
    if ([
        '/',
        '/account', '/user/account', '/admin/account',  // unified login + legacy compat
        '/user/dashboard', '/user/topics',
        '/quizzes', '/quizzes/create',
        '/admin/dashboard', '/admin/users', '/admin/results', '/admin/quizzes',
    ].includes(p)) return true;
    if (/^\/quizzes\/[^/]+$/.test(p)) return true;           // /quizzes/:id
    if (/^\/quizzes\/[^/]+\/results$/.test(p)) return true;  // /quizzes/:id/results
    return false;
}

async function serveSpa(request, env, url) {
    try {
        return env.ASSETS.fetch(
            new Request(new URL('/', url.origin).toString(), { method:'GET', headers: request.headers })
        );
    } catch {
        return new Response('Not Found', {status:404});
    }
}

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const p = url.pathname, m = request.method;

        if (m === 'OPTIONS') return new Response(null, {headers: CORS});

        /* ── API ── */
        if (p === '/api/auth/login'     && m==='POST') return routeLogin(request, env);

        if (p === '/api/users'          && m==='GET')  return routeListUsers(request, env);
        if (p === '/api/users'          && m==='POST') return routeCreateUser(request, env);
        const um = p.match(/^\/api\/users\/([^/]+)$/);
        if (um) {
            if (m==='GET')    return routeGetUser(request, env, um[1]);
            if (m==='PUT')    return routeUpdateUser(request, env, um[1]);
            if (m==='DELETE') return routeDeleteUser(request, env, um[1]);
        }

        if (p === '/api/results'        && m==='GET')  return routeListResults(request, env);
        if (p === '/api/results'        && m==='POST') return routeSaveResult(request, env);
        const rm = p.match(/^\/api\/results\/([^/]+)$/);
        if (rm && m==='GET')    return routeGetResult(request, env, rm[1]);
        if (rm && m==='DELETE') return routeDeleteResult(request, env, rm[1]);

        if (p === '/api/stats'          && m==='GET')  return routeStats(request, env);
        if (p === '/api/generate'       && m==='POST') return routeGenerate(request, env);

        if (p === '/api/quizzes/public' && m==='GET')  return routePublicQuizzes(request, env);
        if (p === '/api/quizzes'        && m==='GET')  return routeListQuizzes(request, env);
        const qm = p.match(/^\/api\/quizzes\/([^/]+)$/);
        if (qm && m==='GET') return routeGetQuiz(request, env, qm[1]);

        /* ── LLM health check ── */
        if (p.startsWith('/api/test')) {
            const llm = url.searchParams.get('llm');
            if (!['groq','gemini','cerebras'].includes(llm)) return ok({ok:false,error:'Invalid ?llm='},400);
            const model = DEFAULT_MODELS.find(x=>x.provider===llm);
            try {
                const r = await callLLM(llm, model.id, 'Say: true', env);
                return ok({ok:true,llm,model:model.id,reply:r?.trim()});
            } catch(e) { return ok({ok:false,error:e.message},502); }
        }

        /* ── SPA page routes ── serve index.html ── */
        if (isSpaRoute(p)) return serveSpa(request, env, url);

        /* ── Static assets ── */
        try { return env.ASSETS.fetch(request); }
        catch { return new Response('Not Found', {status:404}); }
    }
};