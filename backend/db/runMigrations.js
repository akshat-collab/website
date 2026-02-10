/**
 * Run pending migrations from backend/db/migrations/.
 * Usage: node backend/db/runMigrations.js
 */
import { readdirSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { getPool, query, closePool } from './pool.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const migrationsDir = join(__dirname, 'migrations');

async function run() {
  const pool = getPool();
  if (!pool) {
    console.error('❌ DATABASE_URL is not set.');
    process.exit(1);
  }
  const files = readdirSync(migrationsDir).filter((f) => f.endsWith('.sql')).sort();
  for (const file of files) {
    try {
      const sql = readFileSync(join(migrationsDir, file), 'utf8');
      await query(sql);
      console.log('✅', file);
    } catch (err) {
      console.error('❌', file, err.message);
      process.exit(1);
    }
  }
  await closePool();
}

run();
