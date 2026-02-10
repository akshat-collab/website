/**
 * Production server: full backend with horizontal DB scaling, security, and optimization.
 * Run: NODE_ENV=production node server.production.js
 * Use with process manager (PM2, systemd) and behind reverse proxy (nginx, load balancer).
 */
import 'dotenv/config';
import express from 'express';
import compression from 'compression';
import { healthCheck as dbHealthCheck, closePool, getReadPool, getPool, query } from './backend/db/pool.js';
import { securityMiddleware } from './backend/middleware/security.js';
import { requestIdMiddleware, requestLoggerMiddleware } from './backend/middleware/requestLogger.js';
import { globalRateLimiter, authStrictLimiter, executeStrictLimiter } from './backend/middleware/rateLimitProduction.js';
import { cacheMiddleware } from './backend/middleware/cache.js';
import { createChatRouter } from './backend/routes/chat.js';
import dsaRoutes from './backend/routes/dsa.js';
import dsaAiRoutes from './backend/routes/dsaAi.js';
import executeRoutes from './backend/routes/execute.js';
import authRoutes from './backend/routes/auth.js';
import commentsRoutes from './backend/routes/comments.js';
import { attachDuelWs, createBotMatch, setProblemSlugs } from './backend/duels/duelWs.js';
import { query, getPool } from './backend/db/pool.js';
import Groq from 'groq-sdk';

const app = express();
const PORT = parseInt(process.env.PORT || '3001', 10);
const isProduction = process.env.NODE_ENV === 'production';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const groq = GROQ_API_KEY?.trim() ? new Groq({ apiKey: GROQ_API_KEY }) : null;

// ---------------------------------------------------------------------------
// Trust proxy (required when behind nginx / load balancer for correct IP)
// ---------------------------------------------------------------------------
app.set('trust proxy', process.env.TRUST_PROXY !== '0');

// ---------------------------------------------------------------------------
// Middleware: compression, security, request ID, logging
// ---------------------------------------------------------------------------
app.use(compression());
app.use(securityMiddleware());
app.use(requestIdMiddleware);
app.use(requestLoggerMiddleware);
app.use(express.json({ limit: process.env.BODY_LIMIT || '200kb' }));

// ---------------------------------------------------------------------------
// Health: no rate limit so load balancers can probe
// ---------------------------------------------------------------------------
app.get('/api/health', async (_req, res) => {
  const db = await dbHealthCheck();
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development',
    database: db.ok ? { connected: true, readReplica: db.readReplica ?? false } : { connected: false, error: db.error },
    groq: { configured: !!GROQ_API_KEY },
  });
});

// ---------------------------------------------------------------------------
// Global rate limit (then all API routes)
// ---------------------------------------------------------------------------
app.use(globalRateLimiter);

// ---------------------------------------------------------------------------
// API Routes (auth and execute have stricter per-route limits)
// ---------------------------------------------------------------------------
app.use('/api/auth', authStrictLimiter, authRoutes);
app.use('/api/comments', commentsRoutes);

app.use('/api/dsa', cacheMiddleware(parseInt(process.env.CACHE_TTL_MS || '60000', 10)), dsaRoutes, dsaAiRoutes);

app.use('/api/execute', executeStrictLimiter, executeRoutes);

app.post('/api/duels/bot-match', (req, res) => {
  try {
    const gender = req.body?.gender === 'male' || req.body?.gender === 'female' ? req.body.gender : null;
    const { roomId, problemId, botName } = createBotMatch(gender);
    res.json({ roomId, problemId, opponent: botName, isBot: true });
  } catch (err) {
    console.error('[duels] bot-match error:', err);
    res.status(500).json({ error: 'Failed to create bot match' });
  }
});

app.use('/api', createChatRouter(groq));

// ---------------------------------------------------------------------------
// 404 and error handler
// ---------------------------------------------------------------------------
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found', path: _req.path });
});

app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err?.message || err);
  const msg = isProduction ? 'An unexpected error occurred.' : (err?.message || 'An unexpected error occurred.');
  res.status(500).json({ error: msg });
});

// ---------------------------------------------------------------------------
// Start server and WebSocket
// ---------------------------------------------------------------------------
const server = app.listen(PORT, () => {
  attachDuelWs(server);
  getPool() && query('SELECT slug FROM questions').then((r) => {
    setProblemSlugs(r.rows.map((x) => x.slug));
    console.log(`  Duels: ${r.rows.length} problem(s) loaded`);
  }).catch(() => {});
  const readReplica = !!getReadPool();
  console.log(`
======================================================================
  TechMaster Production Server
======================================================================
  Port:          http://localhost:${PORT}
  Health:        GET /api/health
  Duels WS:      ws://localhost:${PORT}/ws/duels
  DB read replica: ${readReplica ? 'enabled' : 'disabled'}
  NODE_ENV:      ${process.env.NODE_ENV || 'development'}
======================================================================
`);
});

// ---------------------------------------------------------------------------
// Graceful shutdown
// ---------------------------------------------------------------------------
async function shutdown(signal) {
  console.log(`${signal} received, shutting down...`);
  server.close(() => {
    console.log('HTTP server closed');
  });
  await closePool();
  process.exit(0);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
