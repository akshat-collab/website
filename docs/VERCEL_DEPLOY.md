# Vercel Deployment Guide

## Required Environment Variables

This is a **Vite** app (not Next.js). Only these variables are used:

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_SUPABASE_URL` | ✅ | Supabase project URL (for DSA questions, comments) |
| `VITE_SUPABASE_ANON_KEY` | ✅ | Supabase anon/public key |
| `VITE_API_URL` | ❌ | Optional – for duels API |
| `GROQ_API_KEY` | ❌ | Optional – for chat AI |

**Important:** Do NOT use `NEXT_PUBLIC_*` – this app uses Vite, which only exposes `VITE_*` prefixed vars at build time.

## Setup Steps

1. **Vercel Dashboard** → Project → Settings → Environment Variables
2. Add all `VITE_*` variables for **All Environments**
3. Mark sensitive keys as **Sensitive** if desired
4. **Redeploy** after adding variables

## SPA Routing

The `vercel.json` includes rewrites so routes like `/dsa/problems` serve `index.html`. React Router handles client-side routing.

## Build

- **Command:** `npm ci && npm run build`
- **Output:** `dist/`
- **Framework:** Vite (auto-detected)

## Auth Flow

- **Main site & DSA:** Local auth (email/password, no server). Users stored in localStorage. Profile updates in localStorage.
- **Supabase:** Used for DSA questions, comments, feedback (not auth)

## Troubleshooting

| Issue | Fix |
|-------|-----|
| **Invalid API key** | Supabase → Settings → API → copy anon key; update `VITE_SUPABASE_ANON_KEY`; redeploy |
| **Blank page** | Check browser console; verify env vars were set before the build |
| **404 on /dsa/problems** | Ensure `vercel.json` is committed and redeploy |

## RLS Policies (Supabase)

`questions` table: `USING (true)` — public read.  
`dsa_users` table: view all, update/insert own.  
Auth is local (localStorage); Supabase is used for DSA data only.
