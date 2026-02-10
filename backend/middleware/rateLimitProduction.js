/**
 * Production rate limiting: global + strict per-route.
 * Tuned for ~10k users/day with 1h peak (e.g. 500 req/min per IP global, stricter on auth/execute).
 * Use with trust proxy when behind load balancer.
 */
import rateLimit from 'express-rate-limit';

const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10); // 1 min
const maxGlobal = parseInt(process.env.RATE_LIMIT_MAX_PER_WINDOW || '500', 10); // 10k/day peak ~7/min avg, allow burst
const maxAuth = parseInt(process.env.RATE_LIMIT_AUTH_PER_WINDOW || '20', 10);
const maxExecute = parseInt(process.env.RATE_LIMIT_EXECUTE_PER_WINDOW || '60', 10);

const keyGenerator = (req) => req.ip || req.socket?.remoteAddress || 'unknown';

export const globalRateLimiter = rateLimit({
  windowMs,
  max: maxGlobal,
  message: { error: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator,
});

export const authStrictLimiter = rateLimit({
  windowMs,
  max: maxAuth,
  message: { error: 'Too many auth attempts. Try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator,
});

export const executeStrictLimiter = rateLimit({
  windowMs,
  max: maxExecute,
  message: { error: 'Code execution limit. Try again in a minute.' },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator,
});
