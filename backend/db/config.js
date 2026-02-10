/**
 * Database configuration. Uses DATABASE_URL from environment.
 * Supports PostgreSQL and optional read replica for horizontal scaling.
 * - DATABASE_URL: primary (writes + reads when no replica)
 * - DATABASE_READ_URL: optional read replica (SELECTs only)
 */
import 'dotenv/config';

const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_READ_URL = process.env.DATABASE_READ_URL || '';

const poolConfig = {
  connectionString: DATABASE_URL,
  max: parseInt(process.env.DB_POOL_MAX || '20', 10),
  min: parseInt(process.env.DB_POOL_MIN || '2', 10),
  idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT_MS || '30000', 10),
  connectionTimeoutMillis: parseInt(process.env.DB_CONNECT_TIMEOUT_MS || '5000', 10),
  allowExitOnIdle: true,
};

const readPoolConfig = DATABASE_READ_URL
  ? {
      connectionString: DATABASE_READ_URL,
      max: parseInt(process.env.DB_READ_POOL_MAX || '20', 10),
      min: parseInt(process.env.DB_READ_POOL_MIN || '2', 10),
      idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT_MS || '30000', 10),
      connectionTimeoutMillis: parseInt(process.env.DB_CONNECT_TIMEOUT_MS || '5000', 10),
      allowExitOnIdle: true,
    }
  : null;

export { DATABASE_URL, DATABASE_READ_URL, poolConfig, readPoolConfig };
