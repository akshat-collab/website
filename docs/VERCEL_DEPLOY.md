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

## Supabase Auth (Login / OAuth)

**Vite env vars:** Use `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (not `SUPABASE_URL`). Vite only exposes `VITE_` prefixed vars to the browser.

**Supabase Dashboard → Authentication → URL Configuration:**
1. **Site URL:** `https://website-seven-kappa-80.vercel.app` (or your production URL)
2. **Redirect URLs:** Add:
   - `https://website-seven-kappa-80.vercel.app/**`
   - `https://website-seven-kappa-80.vercel.app/dsa/dashboard`
   - `http://localhost:5173/**` (for local dev)

**Auth providers:** Enable Email/Password and Google in Authentication → Providers.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| **Invalid API key** | Supabase → Settings → API → copy **anon public** key; update `VITE_SUPABASE_ANON_KEY` in Vercel; redeploy |
| **401 on auth** | Wrong anon key, or keys not set before build; redeploy after adding env vars |
| **403 / CORS** | Add your Vercel URL to Supabase Auth → Site URL & Redirect URLs |
| **404 on /dsa/problems** | Ensure `vercel.json` is committed and redeploy |
| **Blank page** | Check browser console; verify env vars were set before the build |

## RLS Policies

`questions` table: `USING (true)` — public read.  
`dsa_users` table: view all, update/insert own.  
Auth uses anon key only (never service_role in browser).
