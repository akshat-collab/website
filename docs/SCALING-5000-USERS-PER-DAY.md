# How We Handle 5,000 Users Per Day Without Crashing

This document explains how we keep the **server stable** and the **database manageable** when serving around **5,000 users per day**.

---

## What Does “5,000 Users Per Day” Mean?

- **Roughly:** ~3–4 requests per second on average (5000 ÷ 86400 ≈ 0.06 req/s; with peaks it can be 2–5× higher).
- **Peak hours:** Assume 2–3× average → **~6–12 requests per second** at peak.
- **Goal:** Server stays up, responses stay fast, and the database doesn’t run out of connections or slow down.

---

## 1. Server: How We Avoid Crashing

### 1.1 Connection pooling (already in place)

We use a **PostgreSQL connection pool** (`backend/db/pool.js` and `backend/db/config.js`):

- **`DB_POOL_MAX`** (default 20): Max number of DB connections per app instance. Prevents “too many connections” and keeps the DB stable.
- **`DB_POOL_MIN`**: Keeps a minimum number of warm connections so we don’t open/close connections on every request.

**Recommendation for ~5K users/day:** Keep `DB_POOL_MAX` in the **10–30** range per instance. If you run multiple instances, ensure **total connections &lt; your Postgres `max_connections`** (e.g. leave headroom: 2 instances × 20 = 40, Postgres often allows 100).

### 1.2 Rate limiting (already in place)

`server.js` uses **rate limiting** (e.g. `RATE_LIMIT_REQUESTS_PER_MINUTE`). This:

- Caps how many requests one user/session can make per minute.
- Prevents a few heavy users or bots from overloading the server.

**Recommendation:** Keep rate limits strict enough to protect the server (e.g. 10–30 req/min per user), but loose enough for normal use.

### 1.3 Stateless app + horizontal scaling

- **Stateless:** We don’t rely on in-memory session state for correctness (sessions can be in DB or cache). That way any instance can serve any request.
- **Horizontal scaling:** For Netlify, more traffic = more function invocations; for a long-running Node server, we can run **multiple instances** behind a load balancer. Each instance uses its own pool (e.g. 20 connections); total DB connections = instances × pool size.

### 1.4 Caching (optional but helpful)

- Cache **read-heavy** data (e.g. question lists, config) in memory or Redis with a short TTL (e.g. 1–5 minutes).
- Reduces repeated DB hits for the same data and keeps the server and DB responsive under load.

### 1.5 Timeouts and limits

- **Connection timeouts** (`DB_CONNECT_TIMEOUT_MS`) and **query timeouts** (if added) ensure one slow query doesn’t block the pool forever.
- **Max tokens / request size** (e.g. `MAX_TOKENS_PER_REQUEST`) limit how much work each request does so the server stays predictable.

---

## 2. Database: How We Keep It Manageable

### 2.1 Connection pool (same as above)

- One pool per app instance, with a **bounded max** (e.g. 20). This **is** how we avoid “too many connections” and keep the DB manageable under 5K users/day.

### 2.2 Indexes

- Add indexes on columns used in **WHERE**, **ORDER BY**, and **JOIN**.
- Prefer **single-column** or **small composite** indexes; avoid indexing every column.
- Check slow-query logs (or `duration > 100ms` in `pool.js`) and add indexes for those queries.

**Example:** If we often query “comments by `user_id`” or “by `created_at`”, we add indexes on `user_id` and `created_at` (or one composite if the query pattern matches).

### 2.3 Migrations and schema changes

- All schema changes go through **migrations** (`backend/db/migrations/`, `supabase/migrations/`).
- Test migrations on a copy of production data; for big tables, prefer **online** migrations (e.g. add column → backfill → add constraint) to avoid long locks.

### 2.4 Data growth and archiving

- **Estimate growth:** e.g. “X new rows per user per day” × 5000 users → plan table sizes and retention.
- **Archiving:** Move old or rarely read data to an **archive table** or cold storage, and keep the main tables smaller. Run archiving in a **scheduled job** (e.g. nightly), not during peak.

### 2.5 Monitoring and slow-query handling

- Use **health checks** (`healthCheck()` in `pool.js`) for liveness/readiness.
- Log or alert on **slow queries** (e.g. &gt; 100ms in dev). In production, use DB metrics (e.g. Supabase dashboard, or Postgres `pg_stat_statements`) to find and optimize slow queries.
- Set **statement timeouts** in Postgres so a single bad query doesn’t hold connections for minutes.

---

## 3. Quick Checklist for “5K Users/Day”

| Area              | What we do / recommend                                      |
|-------------------|-------------------------------------------------------------|
| **Server**        | Connection pool (10–30 per instance), rate limiting, timeouts |
| **Scaling**       | Stateless app; scale horizontally (more instances / functions) |
| **Database**      | Pool size &lt; Postgres `max_connections`; indexes on hot paths |
| **Migrations**    | Use migrations; test and avoid long locks on big tables    |
| **Data growth**   | Estimate growth; archive old data; monitor table sizes      |
| **Monitoring**    | Health checks; slow-query logging; DB connection and CPU    |

---

## 4. Summary

- **5,000 users per day** is a moderate load. We handle it by:
  - **Server:** Bounded DB connections (pool), rate limiting, optional caching, and scaling out (more instances/functions).
  - **Database:** Same pool limits, indexes on important queries, migrations for schema, archiving for growth, and monitoring for slow queries and connection usage.

With these in place, we keep the server from crashing and the database manageable as we grow toward and beyond 5K users/day.
