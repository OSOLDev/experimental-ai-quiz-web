/**
 * AJK PSC Exam Preparation Platform — Cloudflare Worker
 * ═══════════════════════════════════════════════════════
 * Zero Firebase. All data in Cloudflare KV.
 *
 * KV KEY SCHEMA
 * ─────────────
 * user:email:{email}       → string uid          (email→uid index)
 * user:id:{uid}            → JSON User           (primary user record)
 * users:index              → JSON string[]       (all uids, ordered)
 *
 * result:id:{resultId}     → JSON Result         (primary result record)
 * results:index            → JSON string[]       (all resultIds, newest last)
 * results:user:{uid}       → JSON string[]       (per-user resultIds)
 *
 * meta:model_precedence    → JSON Model[]        (AI model routing order)
 *
 * USER   { uid, name, email, passwordHash, phone, startDate, expiryDate,
 *          topics[], additionalNotes, createdAt, updatedAt }
 * RESULT { resultId, userId, userName, userEmail, profession, professionLabel,
 *          score, total, percentage, pass, wrong, skipped, timeTaken,
 *          createdAt, answers[] }
 */

/* ═══ CRYPTO ═════════════════════════════════════════════════════════════ */

async function hashPassword(plain) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(plain));
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2,'0')).join('');
}
async function verifyPassword(plain, hash) {
    return (await hashPassword(plain)) === hash;
}
function uid()      { return Date.now().toString(36) + Math.random().toString(36).slice(2,8); }
function rid()      { return 'r_' + Date.now().toString(36) + Math.random().toString(36).slice(2,6); }

/* ═══ SESSION TOKENS ═════════════════════════════════════════════════════ */

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

/* ═══ KV DATA LAYER ══════════════════════════════════════════════════════ */

async function kvGet(kv, key) {
    const v = await kv.get(key, 'text');
    if (v === null) return null;
    try { return JSON.parse(v); } catch { return v; }
}
async function kvSet(kv, key, val) {
    await kv.put(key, typeof val === 'string' ? val : JSON.stringify(val));
}
async function kvDel(kv, key) { await kv.delete(key); }

/* -- Users -- */
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

/* -- Results -- */
async function saveResult(kv, r) {
    await kvSet(kv, `result:id:${r.resultId}`, r);
    let gi = await kvGet(kv, 'results:index') || [];
    gi.push(r.resultId);
    if (gi.length > 2000) gi = gi.slice(-2000);
    await kvSet(kv, 'results:index', gi);
    let ui = await kvGet(kv, `results:user:${r.userId}`) || [];
    ui.push(r.resultId);
    await kvSet(kv, `results:user:${r.userId}`, ui);
}
async function listResults(kv, limit = 200) {
    const idx = (await kvGet(kv, 'results:index') || []).slice(-limit).reverse();
    return (await Promise.all(idx.map(id => kvGet(kv, `result:id:${id}`)))).filter(Boolean);
}

/* -- Stats -- */
async function getStats(kv) {
    const [users, results] = await Promise.all([listUsers(kv), listResults(kv, 1000)]);
    const today = new Date(); today.setHours(0,0,0,0);
    const active = users.filter(u => { const e = new Date(u.expiryDate); e.setHours(0,0,0,0); return e >= today; }).length;
    const avg = results.length
        ? parseFloat((results.reduce((s,r)=>s+(r.percentage||0),0)/results.length).toFixed(1)) : 0;
    return { totalUsers: users.length, activeUsers: active, totalResults: results.length, avgScore: avg };
}

/* ═══ AUTH HELPERS ═══════════════════════════════════════════════════════ */

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

/* ═══ RESPONSE HELPERS ═══════════════════════════════════════════════════ */

const CORS = {
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods':'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers':'Content-Type,Authorization',
};
const ok  = (d, s=200) => new Response(JSON.stringify(d), {status:s, headers:{...CORS,'Content-Type':'application/json'}});
const bad = (m, s=400) => ok({error:m}, s);
function safe(u) { if (!u) return null; const {passwordHash:_,password:__,...r}=u; return r; }

/* ═══ LLM ROUTER ═════════════════════════════════════════════════════════ */

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
            body:JSON.stringify({model,response_format:{type:'json_object'},
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

/* ═══ ROUTE HANDLERS ═════════════════════════════════════════════════════ */

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
        answers:b.answers||[]
    };
    await saveResult(env.KV_STORE, r);
    return ok({ok:true,resultId:r.resultId},201);
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

Return ONLY valid JSON, no markdown:
{"questions":[{"question":"...","options":["...","...","...","..."],"correctAnswer":"..."}]}`;

    try {
        const raw = await generate(prompt, env);
        let parsed;
        try { parsed=JSON.parse(raw); }
        catch { parsed=JSON.parse(raw.replace(/```json|```/g,'').trim()); }
        if (!Array.isArray(parsed?.questions)) throw new Error('Invalid structure');
        const valid = parsed.questions.filter(q =>
            q.question?.trim() && Array.isArray(q.options) && q.options.length>=2 &&
            q.correctAnswer?.trim() && q.options.includes(q.correctAnswer));
        if (!valid.length) throw new Error('No valid questions returned');
        return ok({questions:valid});
    } catch(e) {
        console.error('[generate]',e.message);
        return bad(e.message, 502);
    }
}

/* ═══ MAIN EXPORT ════════════════════════════════════════════════════════ */

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const p = url.pathname, m = request.method;

        if (m==='OPTIONS') return new Response(null,{headers:CORS});

        /* Auth */
        if (p==='/api/auth/login'     && m==='POST')   return routeLogin(request,env);

        /* Users */
        if (p==='/api/users'          && m==='GET')    return routeListUsers(request,env);
        if (p==='/api/users'          && m==='POST')   return routeCreateUser(request,env);
        const um = p.match(/^\/api\/users\/([^/]+)$/);
        if (um) {
            if (m==='GET')    return routeGetUser(request,env,um[1]);
            if (m==='PUT')    return routeUpdateUser(request,env,um[1]);
            if (m==='DELETE') return routeDeleteUser(request,env,um[1]);
        }

        /* Results */
        if (p==='/api/results'        && m==='GET')    return routeListResults(request,env);
        if (p==='/api/results'        && m==='POST')   return routeSaveResult(request,env);

        /* Stats */
        if (p==='/api/stats'          && m==='GET')    return routeStats(request,env);

        /* Quiz */
        if (p==='/api/generate'       && m==='POST')   return routeGenerate(request,env);

        /* LLM health */
        if (p.startsWith('/api/test')||p.startsWith('/test')) {
            const llm=url.searchParams.get('llm');
            if (!['groq','gemini','cerebras'].includes(llm)) return ok({ok:false,error:'Invalid ?llm='},400);
            const model=DEFAULT_MODELS.find(x=>x.provider===llm);
            try {
                const r = await callLLM(llm, model.id, 'Say: true', env);
                return ok({ok:true,llm,model:model.id,reply:r?.trim()});
            } catch(e) { return ok({ok:false,error:e.message},502); }
        }

        /* SPA fallback */
        try {
            const isPage = (request.headers.get('Accept')||'').includes('text/html') ||
                           (!p.includes('.')&&!p.startsWith('/api/'));
            if (isPage) {
                if (p.startsWith('/admin')) {
                    const tab = p.replace('/admin','').replace(/^\//,'') || 'dashboard';
                    return Response.redirect(new URL(`/#admin/${tab}`,url.origin).toString(),302);
                }
                return env.ASSETS.fetch(new Request(new URL('/',url.origin).toString(),request));
            }
            return env.ASSETS.fetch(request);
        } catch {
            try { return env.ASSETS.fetch(new Request(new URL('/',url.origin).toString(),request)); }
            catch { return new Response('Not Found',{status:404}); }
        }
    }
};