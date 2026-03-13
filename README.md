# AJK PSC Exam Preparation Platform

An AI-powered exam preparation platform for AJK Public Service Commission exams, built on Cloudflare Workers and Cloudflare KV. Includes a bilingual (English/Urdu) single-page app with admin dashboard, topic-gated access, and AI-generated quizzes.

## Architecture

```
Browser -> Cloudflare Workers (src/index.js)
              |-- /api/auth/login      POST  - Login, returns JWT token
              |-- /api/users           GET   - List users (admin)
              |-- /api/users           POST  - Create user (admin)
              |-- /api/users/:uid      GET   - Get user (admin)
              |-- /api/users/:uid      PUT   - Update user (admin)
              |-- /api/users/:uid      DELETE - Delete user (admin)
              |-- /api/results         GET   - List results (admin)
              |-- /api/results         POST  - Save result (auth)
              |-- /api/stats           GET   - Dashboard stats (admin)
              |-- /api/generate        POST  - Generate quiz via AI (auth)
              |-- /*                   GET   - Serve SPA (public/index.html)
```

## Project Structure

```
public/
  index.html          # Full single-page app (login, quiz, admin)
src/
  index.js            # Cloudflare Worker backend
wrangler.toml         # Cloudflare deployment config
```

## Features

- Access control with admin-managed users
- Account expiry and per-topic gating
- Admin panel (users, results, dashboard)
- Bilingual UI with RTL support for Urdu
- 19 AJK PSC profession topics and concept maps
- AI quiz generation with automatic failover
- Results review with pass/fail indicators

## KV Data Structure

| Key | Value | Description |
|-----|-------|-------------|
| `user:email:{email}` | `"uid"` | Email -> UID index |
| `user:id:{uid}` | `JSON User` | Primary user record |
| `users:index` | `JSON string[]` | All UIDs ordered |
| `result:id:{resultId}` | `JSON Result` | Primary result record |
| `results:index` | `JSON string[]` | All resultIds, newest last |
| `results:user:{uid}` | `JSON string[]` | Per-user resultIds |
| `meta:model_precedence` | `JSON Model[]` | AI model routing order |

## Setup

### 1. Install Wrangler and log in

```
npm install -g @cloudflare/wrangler
wrangler login
```

### 2. Create KV Namespace

```
wrangler kv:namespace create KV_STORE
# Copy the ID into wrangler.toml
```

### 3. Set Secrets

```
wrangler secret put JWT_SECRET        # Random long string
wrangler secret put ADMIN_EMAIL       # e.g. admin@yourorg.com
wrangler secret put ADMIN_PASSWORD    # Strong password
wrangler secret put GEMINI_API_KEY
wrangler secret put GROQ_API_KEY
wrangler secret put CEREBRAS_API_KEY
```

### 4. Deploy

```
wrangler deploy
```

## Admin Access

- URL: `https://your-worker.workers.dev/admin`
- Default email: `admin@psc.ajk` (override with `ADMIN_EMAIL` secret)
- Default password: `Admin@PSC2024!` (override with `ADMIN_PASSWORD` secret)

## Profession IDs

| ID | Subject |
|----|---------|
| LEC-URD-17 | Lecturer Urdu |
| LEC-ENG-17 | Lecturer English |
| LEC-ISL-17 | Lecturer Islamic Studies |
| LEC-PAK-17 | Lecturer Pakistan Studies |
| LEC-ARA-17 | Lecturer Arabic |
| LEC-PER-17 | Lecturer Persian |
| LEC-HIS-17 | Lecturer History |
| LEC-POL-17 | Lecturer Political Science |
| LEC-ECO-17 | Lecturer Economics |
| LEC-EDU-17 | Lecturer Education |
| LEC-PHY-17 | Lecturer Physics |
| LEC-CHEM-17 | Lecturer Chemistry |
| LEC-MATH-17 | Lecturer Mathematics |
| LEC-CS-17 | Lecturer Computer Science |
| LEC-BOT-17 | Lecturer Botany |
| LEC-ZOO-17 | Lecturer Zoology |
| LEC-STAT-17 | Lecturer Statistics |
| LEC-GEO-17 | Lecturer Geography |
| LEC-COM-17 | Lecturer Commerce |

## AI Model Fallback Chain

1. Gemini 2.0 Flash Lite (fastest, cheapest)
2. Gemini 2.0 Flash
3. Llama 3.3 70B via Groq
4. Llama 3.3 70B via Cerebras

Failed models are rotated to the end automatically and persisted in KV.

## Security Notes

- Passwords are SHA-256 hashed in KV (never stored plaintext)
- Sessions use HMAC-SHA-256 signed tokens, valid 12 hours
- All admin endpoints require valid admin token
- Topic access is enforced server-side per user

## Troubleshooting

- "KV_STORE binding is missing": confirm KV binding in `wrangler.toml`
- "API key missing": ensure secrets are set with `wrangler secret put <KEY>`

## License

MIT License
