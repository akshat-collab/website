# Vercel Deployment Guide

## Required Environment Variables

This is a **Vite** app (not Next.js). Only these variables are used:

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_SUPABASE_URL` | ✅ | Your Supabase project URL (for DSA questions, comments) |
| `VITE_SUPABASE_ANON_KEY` | ✅ | Supabase anon/public key |
| `VITE_FIREBASE_API_KEY` | ✅ | Firebase API key (for auth, Google login) |
| `VITE_FIREBASE_AUTH_DOMAIN` | ✅ | Firebase auth domain (e.g. `website-b446b.firebaseapp.com`) |
| `VITE_FIREBASE_PROJECT_ID` | ✅ | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | ✅ | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | ✅ | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | ✅ | Firebase app ID |
| `VITE_FIREBASE_MEASUREMENT_ID` | ❌ | Optional – for Analytics |
| `VITE_API_URL` | ❌ | Optional – for duels API |
| `GROQ_API_KEY` | ❌ | Optional – for chat AI (if using serverless functions) |

**Important:** Do NOT use `NEXT_PUBLIC_*` – this app uses Vite, which only exposes `VITE_*` prefixed vars at build time.

## Where to Add Firebase Config in Vercel (for Google Login)

1. **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Add each variable above (e.g. `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, etc.)
3. Set the scope to **Production**, **Preview**, and **Development** (or as needed)
4. **Redeploy** after adding variables (env vars are baked in at build time)

### Example values (from your Firebase config)

```
VITE_FIREBASE_API_KEY=AIzaSyBcHF94OFbIE7R17DIVTGDrW07brw-hX64
VITE_FIREBASE_AUTH_DOMAIN=website-b446b.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=website-b446b
VITE_FIREBASE_STORAGE_BUCKET=website-b446b.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=895029794575
VITE_FIREBASE_APP_ID=1:895029794575:web:3bfe5600f6123f1002d07a
VITE_FIREBASE_MEASUREMENT_ID=G-ECYGE5R59C
```

## Firebase Console – Enable Google Sign-In

1. Open [Firebase Console](https://console.firebase.google.com) → Your project
2. **Authentication** → **Sign-in method**
3. Enable **Google** provider
4. Add your **authorized domains**:
   - `localhost` (for dev)
   - `website-seven-kappa-80.vercel.app` (or your Vercel domain)
   - Any custom domain you use

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

- **Main site (Login, Signup):** Firebase Auth (email/password + Google)
- **DSA Practice:** Firebase Auth (email/password + Google via DsaAuthContext)
- **Supabase:** Used for DSA questions, comments, feedback (not auth)

## Troubleshooting

| Issue | Fix |
|-------|-----|
| **Invalid API key** | Copy from Firebase Console → Project Settings → General; update env vars in Vercel; redeploy |
| **Google sign-in popup blocked** | Check Firebase Console → Auth → Authorized domains; add your Vercel URL |
| **401 on auth** | Ensure Firebase env vars are set before build; redeploy |
| **Blank page** | Check browser console; verify env vars were set before the build |
| **404 on /dsa/problems** | Ensure `vercel.json` is committed and redeploy |

## RLS Policies (Supabase)

`questions` table: `USING (true)` — public read.  
`dsa_users` table: view all, update/insert own.  
Auth is handled by Firebase; Supabase is used for data only.
