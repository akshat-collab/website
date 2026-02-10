# Production Server

This document describes the **production-grade server** (`server.production.js`) with horizontal database scaling and optimizations.

## Run

```bash
npm run start:production
```

Or with explicit env:

```bash
NODE_ENV=production node server.production.js
```

## Features

- **Horizontal database scaling**: Optional read replica via `DATABASE_READ_URL`. Writes and primary reads use `DATABASE_URL`; read-only queries (e.g. DSA questions list, question by id, notes) use the replica when configured.
- **Security**: Helmet (headers), configurable CORS, trust proxy for correct client IP.
- **Performance**: Response compression (gzip), in-memory response cache for DSA GET endpoints, connection pooling with configurable limits.
- **Observability**: Request ID (`x-request-id`), structured request logging, health endpoint with DB and read-replica status.
- **Rate limiting**: Global rate limit (per IP/window) plus per-session limits for chat/DSA AI.
- **Graceful shutdown**: Closes HTTP server and DB pools on SIGTERM/SIGINT.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3001` |
| `NODE_ENV` | `production` recommended | - |
| `DATABASE_URL` | Primary PostgreSQL connection string | Required for DB |
| `DATABASE_READ_URL` | Optional read-replica connection string | - |
| `DB_POOL_MAX` | Max connections in primary pool | `20` |
| `DB_POOL_MIN` | Min connections in primary pool | `2` |
| `DB_READ_POOL_MAX` | Max connections in read pool | `20` |
| `DB_READ_POOL_MIN` | Min connections in read pool | `2` |
| `CORS_ORIGIN` or `CORS_ORIGINS` | Allowed origins (comma-separated) | Allow all |
| `TRUST_PROXY` | Set to `0` to disable trust proxy | Enabled |
| `RATE_LIMIT_WINDOW_MS` | Global rate limit window (ms) | `60000` |
| `RATE_LIMIT_MAX_PER_WINDOW` | Max requests per IP per window | `200` |
| `RATE_LIMIT_REQUESTS_PER_MINUTE` | Per-session chat/AI limit | `10` |
| `CACHE_TTL_MS` | Response cache TTL for DSA GETs (ms) | `60000` |
| `CACHE_MAX_ENTRIES` | Max cache entries | `100` |
| `BODY_LIMIT` | Max JSON body size | `10kb` |
| `GROQ_API_KEY` | Groq API key for chat/DSA AI | - |
| `FIREBASE_PROJECT_ID` | Firebase project ID (required for auth) | - |
| `FIREBASE_SERVICE_ACCOUNT_JSON` | Service account JSON string (for ID token verification) | - |
| `GOOGLE_APPLICATION_CREDENTIALS` | Path to service account JSON file (alternative) | - |

## Read replica setup

1. Add a read replica to your PostgreSQL provider (e.g. Supabase read replica, AWS RDS read replica, or a second Postgres instance with streaming replication).
2. Set `DATABASE_READ_URL` to the replica connection string.
3. Restart the server. Read-only queries (DSA questions list, question by id, notes) will use the replica; writes and auth/feedback/notes writes use the primary.

## Deployment

- Run behind a reverse proxy (nginx, Caddy) or load balancer. Enable `trust proxy` (default on).
- Use a process manager (e.g. PM2, systemd) for restarts and logging.
- Set `NODE_ENV=production` and strong `JWT_SECRET`; restrict `CORS_ORIGIN` to your frontend origin(s).

## Endpoints

Same as the development server:

- `GET /api/health` – health + DB status
- `POST /api/chat` – Nova chat
- `POST /api/dsa/ai-assist` – DSA AI coach
- `POST /api/chat/fallback` – fallback when AI is down
- `GET/POST /api/dsa/*` – questions, feedback, notes (GETs cached when cache enabled)
- `POST /api/execute/run`, `POST /api/execute/submit` – code execution
- `POST /api/duels/bot-match` – duels bot match
- `GET /api/auth/me`, `POST /api/auth/login`, `POST /api/auth/register` – auth
- WebSocket: `ws://host/ws/duels` – duels
