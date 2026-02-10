/**
 * Bulk seed DSA questions from a JSON file.
 * Usage: node init/seedFromFile.js <path-to-questions.json> [--reset]
 * Example: node init/seedFromFile.js ./questions-bulk.json --reset
 * Requires: DATABASE_URL in .env
 */
import 'dotenv/config';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { query, getPool, closePool } from '../backend/db/pool.js';

const args = process.argv.slice(2);
const filePath = args.find((a) => !a.startsWith('--'));
const reset = args.includes('--reset');

if (!filePath) {
  console.error('Usage: node init/seedFromFile.js <path-to-questions.json> [--reset]');
  process.exit(1);
}

const absolutePath = resolve(process.cwd(), filePath);
let questions;
try {
  const raw = readFileSync(absolutePath, 'utf8');
  questions = JSON.parse(raw);
} catch (err) {
  console.error('Failed to read or parse file:', err.message);
  process.exit(1);
}

if (!Array.isArray(questions)) {
  console.error('JSON file must export an array of question objects.');
  process.exit(1);
}

async function run() {
  const pool = getPool();
  if (!pool) {
    console.error('❌ DATABASE_URL is not set. Add it to .env and try again.');
    process.exit(1);
  }

  try {
    if (reset) {
      console.log('⚠️ Deleting all existing questions...');
      await query('DELETE FROM questions');
      await query('ALTER SEQUENCE questions_id_seq RESTART WITH 1');
      console.log('🗑️ Done');
    }

    let inserted = 0;
    let skipped = 0;
    for (const q of questions) {
      const title = q.title || '';
      const slug = q.slug || title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      if (!slug || !q.description || !q.difficulty) {
        skipped++;
        continue;
      }
      try {
        const res = await query(
          `INSERT INTO questions (
            title, slug, description, difficulty,
            topics, companies, tags, examples, constraints, test_cases,
            acceptance_rate, likes, dislikes, is_premium
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
          ON CONFLICT (slug) DO NOTHING`,
          [
            title,
            slug,
            q.description,
            q.difficulty,
            q.topics ? JSON.stringify(q.topics) : null,
            q.companies ? JSON.stringify(q.companies) : null,
            q.tags ? JSON.stringify(q.tags) : null,
            q.examples ? JSON.stringify(q.examples) : null,
            q.constraints ? JSON.stringify(q.constraints) : null,
            q.testCases ? JSON.stringify(q.testCases) : null,
            q.acceptanceRate ?? 0,
            q.likes ?? 0,
            q.dislikes ?? 0,
            q.isPremium ?? false,
          ]
        );
        if (res.rowCount > 0) inserted++;
        else skipped++;
      } catch (e) {
        skipped++;
      }
    }
    console.log(`🎉 Done. Inserted: ${inserted}, skipped/duplicate: ${skipped}`);
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  } finally {
    await closePool();
  }
}

run();
