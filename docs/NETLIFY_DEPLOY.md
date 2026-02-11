# Netlify Deployment Guide

## Prerequisites

- Node.js 20+
- Supabase project with `questions` table (slug, title, difficulty, test_cases, etc.)

## Environment Variables

Create `.env` for local dev (copy from `.env.example`):

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

For Netlify (Site settings → Environment variables), add:

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Supabase project URL (required) |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon/public key (required) |
| `VITE_API_URL` | Optional – API base URL for duels (e.g. `https://your-api.netlify.app`) |
| `GROQ_API_KEY` | Optional – for Nova chat AI |

## Local Development

```bash
# Install dependencies (includes netlify-cli)
npm install

# Option A: Run with Netlify Dev (proxies /api/*, injects env, runs functions)
npm run netlify:dev

# Option B: Plain Vite dev (no API proxy; Supabase still works)
npm run dev
```

Netlify Dev runs at `http://localhost:8888`. It loads `.env` and proxies `/api/chat` to the chat function.

## Deploy

```bash
# Build
npm run build

# Deploy to Netlify
npm run netlify:deploy
```

Or connect the repo in Netlify Dashboard for automatic deploys on push.

## "Backend unavailable. Showing sample problems"?

This means the app cannot connect to Supabase. Fix in order:

1. **Local dev**  
   - Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to `.env`  
   - Restart the dev server (`npm run dev`) – Vite loads env at startup

2. **Netlify deploy**  
   - `.env` is not deployed (it's ignored by git)  
   - Add env vars in Netlify → Site settings → Environment variables  
   - Redeploy (env vars are baked in at build time)

3. **Supabase setup**  
   - Run migrations in Supabase SQL Editor: `supabase/migrations/20240101000000_initial_schema.sql`  
   - Ensure the `questions` table exists and has data (seed if needed)

4. **Check browser console**  
   - Open DevTools (F12) → Console. Look for Supabase/network errors.

## Blank/Black Page After Deploy?

1. **Deploy the `dist` folder**  
   For drag-and-drop: run `npm run build`, then drag the **contents** of the `dist` folder (index.html + assets + images) into Netlify. Do not deploy the project root.

2. **Environment variables**  
   For Git deploy: add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Netlify → Site settings → Environment variables **before** the first build. Vite bakes these in at build time.

3. **Check browser console**  
   Open DevTools (F12) → Console. Look for errors (e.g. Supabase, module not found). Fix any reported errors.

4. **Direct URL**  
   Try `https://yoursite.netlify.app/` (trailing slash is fine). Make sure `index.html` is at the root of the deployed site.

## Supabase Backend

- **Questions + test cases**: `questions` table (`slug`, `title`, `description`, `difficulty`, `test_cases` JSONB, etc.)
- **Auth**: Supabase Auth + `dsa_users` table
- **Comments**: `problem_comments`, `comment_likes`
- **Feedback**: `dsa_feedback`

Run migrations in order: `001` → `002` → `003` → `004`.

## Frontend Routes (SPA)

All routes serve `index.html`; React Router handles:

- `/` – Home
- `/dsa/*` – DSA practice (problems, duels, profile, leaderboard)
- `/typeforge/*` – TypeForge
- `/login`, `/signup`, `/profile` – Auth
