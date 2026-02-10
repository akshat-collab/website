# Deploying TechMaster on Hostinger

This app is **Hostinger-friendly**: one Node.js backend, PostgreSQL database, and Firebase Auth. No Supabase.

## Architecture

- **Frontend**: Static build (Vite/React) — serve from Hostinger’s **public_html** or any static hosting.
- **Backend**: Node.js (Express) — run on Hostinger **VPS** or **Node.js hosting** (if available).
- **Database**: PostgreSQL (e.g. Hostinger VPS, or external: Neon, Aiven, etc.).
- **Auth**: Firebase Authentication (no Supabase).

## 1. Firebase

1. Create a project at [Firebase Console](https://console.firebase.google.com).
2. Enable **Email/Password** sign-in under Authentication.
3. In Project settings > General, copy the config and add to your env:
   - `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID`
4. For the backend (token verification): Project settings > Service accounts > Generate new private key. Then either:
   - Set `GOOGLE_APPLICATION_CREDENTIALS` to the path of the JSON file, or
   - Paste the full JSON into one line and set `FIREBASE_SERVICE_ACCOUNT_JSON`.
5. Set `FIREBASE_PROJECT_ID` on the server (same as in frontend config).

## 2. Database (PostgreSQL)

- On Hostinger VPS you can install PostgreSQL, or use a managed Postgres (Neon, Aiven, etc.).
- Set `DATABASE_URL` (e.g. `postgresql://user:pass@host:5432/dbname`).
- Run migrations:
  ```bash
  npm run db:init
  node backend/db/runMigrations.js
  npm run db:seed   # optional: seed questions
  ```

## 3. Backend on Hostinger VPS

1. Upload the project (or clone from Git).
2. Install and build:
   ```bash
   npm ci
   npm run build
   ```
3. Set env (see `.env.example`): `DATABASE_URL`, `FIREBASE_PROJECT_ID`, `FIREBASE_SERVICE_ACCOUNT_JSON` (or `GOOGLE_APPLICATION_CREDENTIALS`), `GROQ_API_KEY` (optional), `PORT`, etc.
4. Run the production server:
   ```bash
  npm run start:production
  ```
5. Keep it running: use **PM2** or **systemd**:
   ```bash
  npx pm2 start server.production.js --name techmaster-api
  pm2 save && pm2 startup
  ```
6. Put **nginx** (or Apache) in front: reverse proxy to `http://127.0.0.1:3001` (or your `PORT`). Use SSL (e.g. Let’s Encrypt).

## 4. Frontend (static)

1. Set `VITE_API_URL` to your backend URL (e.g. `https://api.yourdomain.com`) before building.
2. Build:
   ```bash
  npm run build
  ```
3. Upload the contents of **dist/** to Hostinger’s **public_html** (or the docroot you use for the main site).
4. Ensure your domain points to this docroot and that API requests go to the same origin or the URL set in `VITE_API_URL` (CORS is configured on the backend).

## 5. Env checklist (backend)

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `FIREBASE_PROJECT_ID` | Yes | Firebase project ID |
| `FIREBASE_SERVICE_ACCOUNT_JSON` or `GOOGLE_APPLICATION_CREDENTIALS` | Yes | For ID token verification |
| `PORT` | No | Default 3001 |
| `GROQ_API_KEY` | No | For chat/DSA AI |
| `NODE_ENV=production` | Recommended | Production mode |

## 6. Env checklist (frontend build)

Set before `npm run build` (or in your CI/Hostinger build step):

- All `VITE_FIREBASE_*` variables
- `VITE_API_URL` = your backend URL (e.g. `https://api.yourdomain.com`)

## 7. No Supabase

Supabase has been removed. Auth is **Firebase**; data (users, questions, submissions, comments) is in your **PostgreSQL** database and accessed via the **Node backend** only.

## 8. Quick test

- Backend: `curl https://api.yourdomain.com/api/health`
- Frontend: open your site, go to DSA section, register/login with Firebase, then use problems and comments.

For more on the production server (rate limits, caching, read replica), see [PRODUCTION-SERVER.md](./PRODUCTION-SERVER.md).
