# AJK PSC Exam Preparation Platform

An AI-powered exam preparation platform for AJK Public Service Commission exams, built on Cloudflare Workers and Cloudflare KV. Features a bilingual (English/Urdu) single-page application with admin dashboard, topic-gated access, and AI-generated quizzes.

## 🏗️ Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                            Client (Browser)                              │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                    SPA Frontend (public/)                       │    │
│  │  ├── index.html          │  ├── styles/main.css                │    │
│  │  ├── js/constants.js     │  ├── js/state.js                    │    │
│  │  ├── js/helpers.js       │  ├── js/router.js                   │    │
│  │  ├── js/app.js           │  └── js/render/*.js                 │    │
│  └─────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ HTTPS
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      Cloudflare Workers                                  │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                  Backend API (src/index.js)                     │    │
│  │                                                                  │    │
│  │  API Routes:                                                     │    │
│  │  ├── POST /api/auth/login       - User authentication          │    │
│  │  ├── GET  /api/users            - List users (admin)           │    │
│  │  ├── POST /api/users            - Create user (admin)          │    │
│  │  ├── GET  /api/users/:uid       - Get user (admin)             │    │
│  │  ├── PUT  /api/users/:uid       - Update user (admin)          │    │
│  │  ├── DELETE /api/users/:uid     - Delete user (admin)          │    │
│  │  ├── GET  /api/results          - List results (admin)         │    │
│  │  ├── POST /api/results          - Save result (authenticated)  │    │
│  │  ├── GET  /api/results/:id      - Get result (auth/admin)      │    │
│  │  ├── DELETE /api/results/:id    - Delete result (admin)        │    │
│  │  ├── GET  /api/stats            - Dashboard stats (admin)      │    │
│  │  ├── POST /api/generate         - Generate quiz via AI         │    │
│  │  ├── GET  /api/quizzes/public   - Public quiz library          │    │
│  │  ├── GET  /api/quizzes          - Admin quiz filter            │    │
│  │  └── GET  /api/quizzes/:id      - Get quiz (auth/preview)      │    │
│  └─────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ KV API
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      Cloudflare KV Store                                 │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  Key Patterns:                                                   │    │
│  │  ├── user:email:{email}         → uid (string)                 │    │
│  │  ├── user:id:{uid}              → User object (JSON)           │    │
│  │  ├── users:index                → UID array (JSON)             │    │
│  │  ├── result:id:{resultId}       → Result object (JSON)         │    │
│  │  ├── results:index              → Result ID array (JSON)       │    │
│  │  ├── results:user:{uid}         → User result IDs (JSON)       │    │
│  │  ├── quiz:id:{quizId}           → Quiz object (JSON)           │    │
│  │  ├── quizzes:index              → Quiz ID array (JSON)         │    │
│  │  ├── quizzes:topic:{key}:...    → Topic-filtered quizzes       │    │
│  │  ├── quizzes:user:{uid}         → User quiz history            │    │
│  │  └── meta:model_precedence      → AI model order (JSON)        │    │
│  └─────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────┘
```

### Request Flow

1. **Static Assets**: Served from `public/` directory via Cloudflare Workers Assets
2. **API Requests**: Handled by `src/index.js` Cloudflare Worker
3. **Data Storage**: All persistent data stored in Cloudflare KV
4. **AI Generation**: Multi-provider fallback (Gemini → Groq → Cerebras)

## 📁 Project Structure

```
backend/
├── public/                     # Frontend static assets
│   ├── index.html              # Main HTML entry point (imports all assets)
│   ├── styles/
│   │   └── main.css            # All application styles (~106KB)
│   └── js/
│       ├── constants.js        # Professions data and translations (~19KB)
│       ├── state.js            # Application state variables
│       ├── helpers.js          # Utility functions (markdown, math, etc.)
│       ├── router.js           # SPA routing with History API
│       ├── app.js              # Main entry point
│       └── render/             # Page render functions
│           ├── landing.js      # Landing page
│           ├── login.js        # Login/authentication page
│           ├── user-dashboard.js  # User dashboard
│           ├── topics.js       # Topic selection page
│           ├── quiz-attempt.js # Quiz taking interface
│           ├── result.js       # Results display
│           └── admin.js        # Admin panel (users, results, quizzes)
│
├── src/
│   └── index.js                # Cloudflare Worker backend (~675 lines)
│                               # - API route handlers
│                               # - Authentication middleware
│                               # - KV data operations
│                               # - AI model integration
│
├── wrangler.toml               # Cloudflare Workers configuration
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

## ✨ Features

### User Features
- **Bilingual Interface**: Full English and Urdu support with RTL layout
- **Topic-Gated Access**: Users can only access assigned subjects
- **AI-Generated Quizzes**: Unique questions generated on-demand
- **Instant Results**: Immediate scoring with detailed review
- **Shareable Results**: Each quiz gets a unique URL for sharing
- **Progress Tracking**: View quiz history and performance

### Admin Features
- **User Management**: Create, edit, delete users with topic assignments
- **Account Control**: Set expiry dates and access permissions
- **Results Dashboard**: View all candidate results with filtering
- **Quiz Library**: Browse and preview all stored quizzes
- **Statistics**: Platform overview with key metrics

### Technical Features
- **Zero Database**: All data in Cloudflare KV (serverless)
- **Multi-Provider AI**: Automatic failover between 4 AI models
- **Secure Auth**: HMAC-signed tokens with 12-hour expiry
- **Password Hashing**: SHA-256 hashed passwords
- **Mobile-First UI**: Responsive design for all devices
- **SPA Architecture**: History API routing, no page reloads

## 🚀 Setup & Deployment

### Prerequisites

- Node.js 18+ and npm
- Cloudflare account (free tier works)
- API keys for AI providers (see below)

### Step 1: Install Wrangler

```bash
npm install -g wrangler
wrangler login
```

### Step 2: Create KV Namespace

```bash
wrangler kv:namespace create KV_STORE
```

Copy the returned namespace ID and update `wrangler.toml`:

```toml
[[kv_namespaces]]
binding = "KV_STORE"
id = "your-namespace-id-here"
```

### Step 3: Configure Secrets

Set the following secrets (encrypted in Cloudflare):

```bash
# Authentication
wrangler secret put JWT_SECRET           # Random 32+ character string

# Admin credentials
wrangler secret put ADMIN_EMAIL          # e.g., admin@psc.ajk
wrangler secret put ADMIN_PASSWORD       # Strong password

# AI providers (at least one required)
wrangler secret put GEMINI_API_KEY       # Google AI Studio
wrangler secret put GROQ_API_KEY         # Groq Cloud
wrangler secret put CEREBRAS_API_KEY     # Cerebras AI
```

**Getting API Keys:**
- **Gemini**: https://aistudio.google.com/apikey
- **Groq**: https://console.groq.com/keys
- **Cerebras**: https://cloud.cerebras.ai/

### Step 4: Deploy

```bash
# Development (local testing)
wrangler dev

# Production deployment
wrangler deploy
```

## 🔐 Admin Access

| Setting | Default | Override |
|---------|---------|----------|
| Admin URL | `https://your-worker.workers.dev/admin` | - |
| Email | `admin@psc.ajk` | `ADMIN_EMAIL` secret |
| Password | `Admin@PSC2024!` | `ADMIN_PASSWORD` secret |

## 📚 Profession Topics

The platform supports 19 AJK PSC lecturer subjects:

| ID | Subject | ID | Subject |
|----|---------|----|---------|
| LEC-URD-17 | Lecturer Urdu | LEC-ECO-17 | Lecturer Economics |
| LEC-ENG-17 | Lecturer English | LEC-EDU-17 | Lecturer Education |
| LEC-ISL-17 | Lecturer Islamic Studies | LEC-PHY-17 | Lecturer Physics |
| LEC-PAK-17 | Lecturer Pakistan Studies | LEC-CHEM-17 | Lecturer Chemistry |
| LEC-ARA-17 | Lecturer Arabic | LEC-MATH-17 | Lecturer Mathematics |
| LEC-PER-17 | Lecturer Persian | LEC-CS-17 | Lecturer Computer Science |
| LEC-HIS-17 | Lecturer History | LEC-BOT-17 | Lecturer Botany |
| LEC-POL-17 | Lecturer Political Science | LEC-ZOO-17 | Lecturer Zoology |
| LEC-STAT-17 | Lecturer Statistics | LEC-GEO-17 | Lecturer Geography |
| LEC-COM-17 | Lecturer Commerce | | |

Each topic includes 15-20 concept areas for targeted quiz generation.

## 🤖 AI Model Fallback Chain

Quizzes are generated using this priority order:

1. **Gemini 2.0 Flash Lite** - Fastest, most cost-effective
2. **Gemini 2.0 Flash** - Primary fallback
3. **Llama 3.3 70B (Groq)** - High-quality alternative
4. **Llama 3.3 70B (Cerebras)** - Final fallback

Failed models are automatically rotated to the end of the queue and persisted in KV storage.

## 🔒 Security

| Feature | Implementation |
|---------|---------------|
| Passwords | SHA-256 hashed before storage |
| Sessions | HMAC-SHA-256 signed JWT tokens |
| Token Validity | 12 hours from issuance |
| Admin Routes | Require valid admin token |
| Topic Access | Server-side enforcement per user |
| Account Expiry | Checked on every login |

## 🛠️ Development

### Local Testing

```bash
# Start development server
wrangler dev

# The app will be available at http://localhost:8787
```

### Running Tests

Currently, the project uses manual testing. Consider adding:
- Unit tests for API handlers
- Integration tests for KV operations
- E2E tests for user flows

### Code Style

- JavaScript (no transpilation required)
- Mobile-first CSS with shadcn/ui design tokens
- History API for client-side routing

## 🐛 Troubleshooting

| Error | Solution |
|-------|----------|
| `KV_STORE binding is missing` | Add KV namespace ID to `wrangler.toml` |
| `API key missing` | Set required secrets with `wrangler secret put` |
| `Unauthorized` | Check JWT_SECRET matches between sessions |
| `Account expired` | Update user's expiryDate in admin panel |
| `Topic not in your plan` | Admin must assign topic to user account |
| AI generation fails | Check API keys; cached quizzes serve as fallback |

## 📊 KV Data Limits

| Limit | Value |
|-------|-------|
| Max users | ~10,000 (indexed) |
| Max results | ~2,000 (recent kept) |
| Max quizzes per topic | 1,000 |
| Max total quizzes | 5,000 |
| Max quizzes per user | 1,500 |
| Token validity | 12 hours |

## 📝 API Reference

### Authentication

**POST /api/auth/login**
```json
// Request
{ "email": "user@example.com", "password": "secret" }

// Response (200)
{
  "token": "eyJhbGc...",
  "user": { "uid": "...", "name": "...", "role": "user", "topics": [...] }
}
```

### Users (Admin Only)

**GET /api/users** - List all users

**POST /api/users** - Create user
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure123",
  "expiryDate": "2026-12-31",
  "topics": ["LEC-ENG-17", "LEC-URD-17"]
}
```

**PUT /api/users/:uid** - Update user

**DELETE /api/users/:uid** - Delete user

### Results

**POST /api/results** - Save quiz result
```json
{
  "profession": "LEC-ENG-17",
  "score": 24,
  "total": 30,
  "percentage": 80,
  "pass": true,
  "quizId": "q_abc123",
  "answers": [...]
}
```

**GET /api/results?limit=50** - List results (admin)

### Quizzes

**POST /api/generate** - Generate new quiz
```json
{
  "topic": "English Literature",
  "concepts": "Poetry, Drama",
  "count": 30,
  "lang": "English",
  "professionId": "LEC-ENG-17"
}
```

**GET /api/quizzes/public?limit=24&offset=0** - Browse library

**GET /api/quizzes/:id** - Get quiz (with answers if authenticated)

**GET /api/quizzes/:id?preview=1** - Public preview (no answers)

## 📄 License

MIT License

## 🤝 Support

For registration or technical support, contact via WhatsApp: +92 342 891 0567
