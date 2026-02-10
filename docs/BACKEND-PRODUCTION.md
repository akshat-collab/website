# Backend production readiness (~10k users/day)

This document describes how the backend is tuned for **stable, secure, production use** with capacity for **at least 10k users per day** and a 1-hour peak.

## Security (no unauthorized access)

- **Auth**: All sensitive routes require Firebase ID token (`Authorization: Bearer <token>`). No API key or password in URLs.
- **Firebase Admin**: Used only to verify tokens; never exposes internal errors to clients.
- **CORS**: In production set `CORS_ORIGIN` (or `CORS_ORIGINS`) to your frontend domain(s). Prevents other sites from calling your API.
- **Helmet**: Security headers (CSP in production, XSS, etc.) via `backend/middleware/security.js`.
- **Rate limits**: Global + stricter limits on auth and code execution to prevent abuse and DoS.
- **Input validation**: Profile photo URL validated (https/http/data URL, length limits). All DB access uses parameterized queries (no SQL injection).
- **Errors**: In production, 500 responses return a generic message; details are logged server-side only.

## Profile photo (same everywhere)

- **Single source of truth**: `dsa_users.profile_photo_url` (added by migration `005_profile_photo.sql`).
- **GET /api/auth/me** and **POST /api/auth/register** return `profile_photo_url`. New users get Google/Firebase photo when available.
- **PATCH /api/auth/profile**: Body `{ profile_photo_url?: string }` to update avatar (URL or data URL). Used by DSA profile page upload.
- **Comments**: New comments store `user_avatar` from the author’s `profile_photo_url`, so it appears consistently in the app and in comments.

Apply migration 005 after schema and previous migrations:

```bash
npm run db:init
```

## Database

- **Connection pool**: Tuned for concurrency. Default `DB_POOL_MAX=20`; for 10k/day peak use `DB_POOL_MAX=50` (and optionally `DB_READ_POOL_MAX=30` with `DATABASE_READ_URL` for read replica).
- **Read replica**: Set `DATABASE_READ_URL` and use `queryRead()` for read-heavy GETs (e.g. questions, leaderboard). See `backend/db/pool.js`.
- **Migrations**: Run in order (`schema.sql` then `migrations/*.sql`). Never edit applied migrations; add new ones.

## Rate limits (production server)

Used by `server.production.js`:

| Env var | Default | Purpose |
|--------|---------|--------|
| `RATE_LIMIT_MAX_PER_WINDOW` | 500 | Max requests per IP per minute (global). |
| `RATE_LIMIT_AUTH_PER_WINDOW` | 20 | Stricter limit for `/api/auth`. |
| `RATE_LIMIT_EXECUTE_PER_WINDOW` | 60 | Stricter limit for `/api/execute`. |
| `RATE_LIMIT_WINDOW_MS` | 60000 | Window length (1 min). |

So: ~10k users/day with a 1h peak can stay under these limits; auth and execute are further protected.

## Running in production

1. Use **server.production.js** (not server.js):

   ```bash
   NODE_ENV=production node server.production.js
   ```

2. Put the app behind a **reverse proxy** (e.g. nginx) and set `TRUST_PROXY=1` so client IP is correct for rate limiting.
3. Set **CORS_ORIGIN** to your frontend URL(s).
4. Set **DATABASE_URL** (and optionally **DATABASE_READ_URL**, **DB_POOL_MAX**) as in `.env.example`.
5. Use a **process manager** (e.g. PM2) and restart on failure.

## Health check

- **GET /api/health**: Returns DB status, env, Groq configured. No rate limit so load balancers can probe.
- **GET /api/execute/health**: Returns execution service status and supported languages.

## Capacity summary

- **~10k users/day**: With default global limit (500 req/min per IP), average ~7 req/min per user is fine; peak hour stays within limit when spread across IPs.
- **1-hour peak**: Stricter auth/execute limits prevent a single client from exhausting auth or code execution; DB pool and optional read replica handle read load.
