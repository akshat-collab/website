/**
 * PostgreSQL connection pool with solid connection handling:
 * - Primary pool (writes + default reads)
 * - Optional read-replica pool for horizontal scaling (when DATABASE_READ_URL is set)
 * - Health check helper, graceful shutdown
 */
import pg from 'pg';
import { DATABASE_URL, poolConfig, readPoolConfig } from './config.js';

const { Pool } = pg;

let pool = null;
let readPool = null;

/**
 * Get or create the primary connection pool. Returns null if DATABASE_URL is not set.
 */
export function getPool() {
  if (!DATABASE_URL || DATABASE_URL.trim() === '') {
    return null;
  }
  if (!pool) {
    pool = new Pool(poolConfig);
    pool.on('error', (err) => {
      console.error('⚠️  Database pool error:', err.message);
    });
  }
  return pool;
}

/**
 * Get or create the read-replica pool. Returns null if DATABASE_READ_URL is not set.
 */
export function getReadPool() {
  if (!readPoolConfig) return null;
  if (!readPool) {
    readPool = new Pool(readPoolConfig);
    readPool.on('error', (err) => {
      console.error('⚠️  Database read pool error:', err.message);
    });
  }
  return readPool;
}

/**
 * Execute a query using the primary pool (writes and default reads).
 */
export async function query(text, params) {
  const p = getPool();
  if (!p) throw new Error('Database not configured: DATABASE_URL is missing');
  const start = Date.now();
  try {
    const res = await p.query(text, params);
    const duration = Date.now() - start;
    if (process.env.NODE_ENV === 'development' && duration > 100) {
      console.warn(`Slow query (${duration}ms):`, text?.slice(0, 80));
    }
    return res;
  } catch (err) {
    // Don't log unique constraint violations; callers often handle them (e.g. seed skips duplicates)
    if (err.code !== '23505') {
      console.error('Query error:', err.message);
    }
    throw err;
  }
}

/**
 * Execute a read-only query. Uses read replica if DATABASE_READ_URL is set, else primary.
 * Use for SELECTs to distribute load in horizontal scaling.
 */
export async function queryRead(text, params) {
  const p = getReadPool() || getPool();
  if (!p) throw new Error('Database not configured: DATABASE_URL is missing');
  const start = Date.now();
  try {
    const res = await p.query(text, params);
    const duration = Date.now() - start;
    if (process.env.NODE_ENV === 'development' && duration > 100) {
      console.warn(`Slow read (${duration}ms):`, text?.slice(0, 80));
    }
    return res;
  } catch (err) {
    if (err.code !== '23505') {
      console.error('Query read error:', err.message);
    }
    throw err;
  }
}

/**
 * Get a client from the pool for transactions. Call client.release() when done.
 */
export async function getClient() {
  const p = getPool();
  if (!p) throw new Error('Database not configured: DATABASE_URL is missing');
  return p.connect();
}

/**
 * Health check: run a simple query on primary (and read replica if configured).
 * Returns { ok: true } or { ok: false, error, readOk?: boolean }.
 */
export async function healthCheck() {
  const p = getPool();
  if (!p) {
    return { ok: false, error: 'DATABASE_URL not set' };
  }
  let readOk = null;
  try {
    await p.query('SELECT 1');
    const rp = getReadPool();
    if (rp) {
      await rp.query('SELECT 1');
      readOk = true;
    }
    return { ok: true, readReplica: !!rp, readOk: readOk ?? undefined };
  } catch (err) {
    return { ok: false, error: err.message, readOk: readOk ?? undefined };
  }
}

/**
 * Close all pools (call on graceful shutdown).
 */
export async function closePool() {
  const closing = [];
  if (pool) {
    closing.push(pool.end().then(() => { pool = null; }));
  }
  if (readPool) {
    closing.push(readPool.end().then(() => { readPool = null; }));
  }
  await Promise.all(closing);
  if (closing.length) console.log('✅ Database pool(s) closed');
}
