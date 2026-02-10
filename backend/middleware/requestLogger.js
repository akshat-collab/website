/**
 * Request ID and structured request logging for production.
 */
import { randomUUID } from 'crypto';

const REQUEST_ID_HEADER = 'x-request-id';

export function requestIdMiddleware(req, res, next) {
  const id = req.headers[REQUEST_ID_HEADER] || randomUUID();
  req.id = id;
  res.setHeader(REQUEST_ID_HEADER, id);
  next();
}

export function requestLoggerMiddleware(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const log = {
      requestId: req.id,
      method: req.method,
      path: req.path,
      status: res.statusCode,
      durationMs: duration,
      userAgent: req.get('user-agent')?.slice(0, 80),
    };
    if (process.env.NODE_ENV === 'production') {
      console.log(JSON.stringify(log));
    } else {
      console.log(`[${req.id}] ${req.method} ${req.path} ${res.statusCode} ${duration}ms`);
    }
  });
  next();
}

export { REQUEST_ID_HEADER };
