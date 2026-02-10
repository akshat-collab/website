/**
 * Initialize database: run schema.sql then migrations (adds firebase_uid etc.).
 * Usage: node backend/db/init.js
 * Requires DATABASE_URL in .env.
 */
import { readFileSync, readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { getPool, query, closePool } from './pool.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaPath = join(__dirname, 'schema.sql');
const migrationsDir = join(__dirname, 'migrations');

async function init() {
  const pool = getPool();
  if (!pool) {
    console.error('❌ DATABASE_URL is not set.');
    console.error('');
    console.error('  Option A — use a .env file (recommended):');
    console.error('    cp .env.example .env');
    console.error('    # Edit .env and set: DATABASE_URL=postgresql://postgres:postgres@localhost:5432/techmaster');
    console.error('');
    console.error('  Option B — pass it inline (Docker default):');
    console.error('    DATABASE_URL=postgresql://postgres:postgres@localhost:5432/techmaster npm run db:init');
    console.error('');
    process.exit(1);
  }
  try {
    const sql = readFileSync(schemaPath, 'utf8');
    await pool.query(sql);
    console.log('✅ Schema applied successfully.');

    const files = readdirSync(migrationsDir).filter((f) => f.endsWith('.sql')).sort();
    for (const file of files) {
      const migrationSql = readFileSync(join(migrationsDir, file), 'utf8');
      await query(migrationSql);
      console.log('✅ Migration:', file);
    }
  } catch (err) {
    console.error('❌ Schema init failed:', err.message);
    process.exit(1);
  } finally {
    await closePool();
  }
}

init();
