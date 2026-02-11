# Vercel Deployment Guide

## Required Environment Variables

This is a **Vite** app (not Next.js). Only these variables are used:

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_SUPABASE_URL` | ✅ | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | ✅ | Supabase anon/public key |
| `VITE_API_URL` | ❌ | Optional – for duels API |
| `GROQ_API_KEY` | ❌ | Optional – for chat AI (if using serverless functions) |

**Important:** Do NOT use `NEXT_PUBLIC_*` – this app uses Vite, which only exposes `VITE_*` prefixed vars at build time.

## Setup Steps

1. **Vercel Dashboard** → Project → Settings → Environment Variables
2. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` for **All Environments**
3. Mark the anon key as **Sensitive**
4. **Redeploy** after adding variables (env vars are baked in at build time)

## SPA Routing

The `vercel.json` includes rewrites so routes like `/dsa/problems` serve `index.html`. React Router handles client-side routing.

## Build

- **Command:** `npm ci && npm run build`
- **Output:** `dist/`
- **Framework:** Vite (auto-detected)

## Troubleshooting

- **404 on /dsa/problems** – Ensure `vercel.json` is committed and redeploy
- **"Supabase not configured"** – Add env vars in Vercel, then trigger a new deploy
- **Blank page** – Check browser console; verify env vars were set before the build
