/**
 * In-memory response cache for read-heavy GET endpoints.
 * Optional: set CACHE_TTL_MS and CACHE_MAX_ENTRIES for production.
 */
const TTL_MS = parseInt(process.env.CACHE_TTL_MS || '60000', 10); // 1 min default
const MAX_ENTRIES = parseInt(process.env.CACHE_MAX_ENTRIES || '100', 10);

const store = new Map();
let keysByTime = [];

function prune() {
  const now = Date.now();
  while (keysByTime.length && store.size > MAX_ENTRIES) {
    const key = keysByTime.shift();
    store.delete(key);
  }
}

export function getCached(key) {
  const entry = store.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    keysByTime = keysByTime.filter((k) => k !== key);
    return null;
  }
  return entry.value;
}

export function setCached(key, value, ttlMs = TTL_MS) {
  prune();
  if (store.size >= MAX_ENTRIES) {
    const oldest = keysByTime.shift();
    if (oldest) store.delete(oldest);
  }
  store.set(key, { value, expiresAt: Date.now() + ttlMs });
  keysByTime.push(key);
}

/**
 * Express middleware: cache GET responses by req.path + sorted query string.
 * Only caches 200 JSON responses. Skip with x-skip-cache: 1.
 */
export function cacheMiddleware(ttlMs = TTL_MS) {
  return (req, res, next) => {
    if (req.method !== 'GET' || req.get('x-skip-cache')) return next();
    const q = new URLSearchParams(req.query).toString();
    const cacheKey = `GET:${req.path}${q ? `?${q}` : ''}`;
    const cached = getCached(cacheKey);
    if (cached) {
      return res.status(200).json(cached);
    }
    const originalJson = res.json.bind(res);
    res.json = (body) => {
      if (res.statusCode === 200 && body != null) {
        setCached(cacheKey, body, ttlMs);
      }
      return originalJson(body);
    };
    next();
  };
}
