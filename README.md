# ProQuiz AI - Intelligent Assessment Platform

An AI-powered quiz generation and assessment platform built with Cloudflare Workers, Firebase, and modern web technologies.

## 🚀 Live Demo

**[ProQuiz AI Demo](https://quiz-backend.akhlasahmed-aka.workers.dev)**

## 📋 Features

- **AI-Powered Quiz Generation** - Dynamically generate quizzes on any topic using multiple LLM providers
- **Multi-Provider LLM Support** - Seamless fallback between Gemini, Groq, and Cerebras
- **Real-Time Results Dashboard** - Beautiful, responsive results analytics page
- **Firebase Integration** - Secure authentication and data persistence
- **Responsive Design** - Mobile-first UI with smooth animations
- **Progress Tracking** - Visual progress indicators and intelligent scoring
- **Modal Reviews** - Detailed answer reviews with pass/fail indicators
- **Submission Analytics** - Comprehensive dashboard for quiz submissions and statistics

## 🏗️ Project Structure

```
├── public/
│   ├── index.html          # Main quiz application
│   ├── results.html        # Results dashboard
│   └── [assets]            # Static assets
├── src/
│   └── index.js            # Cloudflare Worker backend
├── wrangler.toml           # Cloudflare Workers configuration
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Advanced animations and responsive design
- **Vanilla JavaScript** - No dependencies
- **Firebase SDK** - Authentication & Firestore
- **Font Awesome** - Icons
- **Google Fonts** - Typography (Syne, DM Sans)

### Backend
- **Cloudflare Workers** - Serverless compute
- **Cloudflare KV Store** - Key-value data persistence
- **LLM APIs**:
  - Google Gemini Flash
  - Groq (OpenAI compatible)
  - Cerebras (OpenAI compatible)

## 📦 Installation

### Prerequisites
- Node.js (v16+)
- Wrangler CLI (`npm install -g @cloudflare/wrangler`)
- Cloudflare account
- Firebase project

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/akhlashashmi/ai-quiz-web.git
   cd ai-quiz-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create KV Namespace**
   
   ```bash
   # Create production namespace
   wrangler kv namespace create "KV_STORE"
   
   # Create preview namespace for local development
   wrangler kv namespace create "KV_STORE" --preview
   ```
   
   Copy the returned namespace IDs and update `wrangler.toml`:
   ```toml
   [[kv_namespaces]]
   binding = "KV_STORE"
   id = "your-production-namespace-id"
   preview_id = "your-preview-namespace-id"
   ```

4. **Configure environment variables & secrets**
   
   Set API keys securely using Cloudflare secrets:
   ```bash
   wrangler secret put GEMINI_API_KEY
   wrangler secret put GROQ_API_KEY
   wrangler secret put CEREBRAS_API_KEY
   ```
   
   Or for local development, create `.dev.vars`:
   ```env
   GEMINI_API_KEY=your_gemini_key_here
   GROQ_API_KEY=your_groq_key_here
   CEREBRAS_API_KEY=your_cerebras_key_here
   ```

5. **Deploy**
   ```bash
   wrangler deploy
   ```

## 🎯 How It Works

### Quiz Generation Flow
1. User registers with name, email, phone
2. User selects topic and desired number of questions (5-60)
3. Backend selects optimal LLM provider with fallback logic
4. LLM generates structured quiz in JSON format
5. Quiz is rendered in responsive UI
6. User answers all questions
7. Results calculated and saved to Firebase
8. Beautiful results page displays score and detailed review

### LLM Provider Selection
The system intelligently selects and fallbacks between providers:
- **Priority List**: Configurable in `MODEL_PRECEDENCE` KV store
- **Automatic Retry**: If primary provider fails, tries next in precedence
- **JSON Validation**: Ensures all responses are valid JSON with required structure

## 🎨 UI/UX Features

- **Smooth Animations** - Slide-up, fade-in, and staggered animations
- **Progress Tracking** - Real-time progress bar and submission counter
- **Interactive Cards** - Hover states and selection feedback
- **Modal Dialogs** - Incomplete submission warnings
- **Responsive Tables** - Sortable results with pagination
- **Status Indicators** - Visual badges for pass/fail status
- **Loading States** - Shimmer loaders and spinning indicators

## 📊 API Endpoints

### POST `/api/generate-quiz`
Generate AI-powered quiz questions.

**Request:**
```json
{
  "topic": "JavaScript Basics",
  "count": 10
}
```

**Response:**
```json
{
  "questions": [
    {
      "question": "What is a closure?",
      "options": ["...", "...", "...", "..."],
      "correctAnswer": "..."
    }
  ]
}
```

### POST `/api/submit-results`
Submit quiz results and save to Firestore.

**Request:**
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "phone": "+1234567890",
  "score": 8,
  "totalQuestions": 10,
  "percentage": 80,
  "details": [
    {
      "question": "...",
      "userAnswer": "...",
      "correctAnswer": "...",
      "isCorrect": true
    }
  ]
}
```

## 🔐 Security

- **Anonymous Firebase Auth** - No user account required
- **API Key Protection** - Secrets stored in Cloudflare
- **CORS Headers** - Proper cross-origin handling
- **Input Validation** - Topic and count validation
- **Rate Limiting Ready** - Can be added via Cloudflare rules

## 📈 Performance

- **Edge Deployment** - Global Cloudflare network
- **Client-Side Rendering** - Minimal server payload
- **Optimized Assets** - Inline CSS, minimal JavaScript
- **Caching Strategy** - Static assets cached by Cloudflare
- **Lazy Loading** - Responsive image loading

## 🚀 Deployment

### Deploy to Production
```bash
wrangler deploy --env production
```

### View Logs
```bash
wrangler tail
```

### Local Development
```bash
wrangler dev
```

## ✅ Quick Setup Checklist

Before deploying, make sure you've completed these steps:

- [ ] Clone the repository
- [ ] Run `npm install`
- [ ] Create KV namespaces: `wrangler kv namespace create "KV_STORE"` (and `--preview` version)
- [ ] Update `wrangler.toml` with your KV namespace IDs
- [ ] Set API secrets: `wrangler secret put GEMINI_API_KEY` (and other keys)
- [ ] Set up Firebase project and update config in HTML files
- [ ] Test locally: `wrangler dev`
- [ ] Deploy to Cloudflare: `wrangler deploy`
- [ ] Verify deployed app at your Workers URL

## 🔐 Security Checklist

- [ ] All API keys stored as Cloudflare secrets (not in wrangler.toml)
- [ ] `.dev.vars` file in `.gitignore` (don't commit local secrets)
- [ ] Firebase config uses anonymous auth (no sensitive data in HTML)
- [ ] KV namespace IDs not exposed in commits
- [ ] No API keys in environment files committed to git

## 📝 Configuration

### `wrangler.toml`
```toml
name = "quiz-backend"
main = "src/index.js"
compatibility_date = "2024-03-07"

[assets]
directory = "public"
binding = "ASSETS"

[[kv_namespaces]]
binding = "KV_STORE"
id = "YOUR_KV_NAMESPACE_ID_HERE"
preview_id = "YOUR_KV_PREVIEW_NAMESPACE_ID_HERE"
```

### Environment Variables

**Never commit secrets to version control!** Use one of these methods:

**Option 1: Cloudflare Secrets (Recommended for Production)**
```bash
wrangler secret put GEMINI_API_KEY
wrangler secret put GROQ_API_KEY
wrangler secret put CEREBRAS_API_KEY
```

**Option 2: Local Development (.dev.vars)**
Create a `.dev.vars` file (already in .gitignore):
```env
GEMINI_API_KEY=sk-...your-key...
GROQ_API_KEY=gsk-...your-key...
CEREBRAS_API_KEY=csk-...your-key...
```

**Option 3: Environment Variables**
```bash
export GEMINI_API_KEY="sk-...your-key..."
export GROQ_API_KEY="gsk-...your-key..."
export CEREBRAS_API_KEY="csk-...your-key..."
```

## 🎓 Example Usage

1. Visit: https://quiz-backend.akhlasahmed-aka.workers.dev
2. Enter your details (name, email, phone)
3. Choose a topic (e.g., "Python Fundamentals", "Web Development", "Data Science")
4. Select number of questions (5-60)
5. Answer all questions
6. View your score and detailed review
7. Check results dashboard to see all submissions

## 🐛 Troubleshooting

### "KV_STORE binding is missing"
- Ensure KV namespace is correctly bound in `wrangler.toml`
- Check that `ASSETS` directory points to `public/`

### "API Key missing"
- Verify secrets are set: `wrangler secret list`
- Add missing keys: `wrangler secret put <KEY_NAME>`

### "Firebase connection failed"
- Check Firebase config in `index.html` and `results.html`
- Verify project ID and API keys

## 📄 License

MIT License - feel free to use this project for educational and commercial purposes.

## 👤 Author

[Akhlash Hashmi](https://github.com/akhlashashmi)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For issues and questions, please open an issue on the [GitHub repository](https://github.com/akhlashashmi/ai-quiz-web/issues).

---

**Happy Quizzing! 🎉**
