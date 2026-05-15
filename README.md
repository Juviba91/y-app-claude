# The Y App

A cultural knowledge engine. Enter any word and explore 15 objective facts across different lenses (General, History, Geography). Tap any fact to dive infinitely deeper.

Powered by Claude AI.

---

## Stack

- React 18 + Vite
- Anthropic Claude API
- Zero external UI libraries

## Project Structure

```
src/
├── api/
│   └── claude.js          # API calls, prompt builder, response parser
├── components/
│   ├── Breadcrumb.jsx
│   ├── Icons.jsx
│   ├── SkeletonCards.jsx
│   ├── SentenceCard.jsx
│   ├── TabBar.jsx
│   └── YLogo.jsx
├── screens/
│   ├── HomeScreen.jsx
│   ├── SentencesScreen.jsx
│   ├── TrendingScreen.jsx
│   └── SettingsScreen.jsx
├── utils/
│   └── history.js
├── constants.js
├── App.jsx
├── main.jsx
└── index.css
```

## Setup

**1. Install dependencies**
```bash
npm install
```

**2. Add your API key**
```bash
cp .env.example .env
# Edit .env and add your Anthropic API key
# Get one at https://console.anthropic.com
```

**3. Run locally**
```bash
npm run dev
```

---

## Deploy to Vercel

### Option A: Via Vercel CLI
```bash
npm install -g vercel
vercel
# Follow prompts
# Add VITE_ANTHROPIC_API_KEY in Vercel dashboard → Settings → Environment Variables
```

### Option B: Via GitHub (recommended)

1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. In **Environment Variables**, add:
   - Key: `VITE_ANTHROPIC_API_KEY`
   - Value: your Anthropic API key
5. Click **Deploy**

Your app will be live at `https://your-project.vercel.app`

---

## Notes

- The API key is exposed client-side (VITE_ prefix). For production, consider proxying through a serverless function to keep the key private.
- History is stored in memory and resets on page refresh.
