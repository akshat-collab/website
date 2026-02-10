/**
 * Production security middleware: Helmet + CORS.
 * Use behind reverse proxy (trust proxy) for correct client IP.
 */
import helmet from 'helmet';
import cors from 'cors';

const isProduction = process.env.NODE_ENV === 'production';

const helmetOptions = {
  contentSecurityPolicy: isProduction,
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: 'cross-origin' },
};

export function securityMiddleware() {
  return [
    helmet(helmetOptions),
    cors({
      origin: corsOrigin(),
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID', 'X-User-Id'],
    }),
  ];
}

function corsOrigin() {
  const allowed = process.env.CORS_ORIGIN || process.env.CORS_ORIGINS;
  if (allowed) {
    return allowed.split(',').map((o) => o.trim()).filter(Boolean);
  }
  return true; // allow all in dev / default
}
