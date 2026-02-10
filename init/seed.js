/**
 * Seed DSA questions into PostgreSQL.
 * Usage: node init/seed.js
 * Requires: DATABASE_URL in .env, run npm run db:init first
 */
import 'dotenv/config';
import { query, getPool, closePool } from '../backend/db/pool.js';
import questions from './data.js';

async function seedQuestions({ reset = false } = {}) {
  const pool = getPool();
  if (!pool) {
    console.error('❌ DATABASE_URL is not set.');
    console.error('');
    console.error('  Option A — use a .env file (recommended):');
    console.error('    cp .env.example .env');
    console.error('    # Edit .env and set: DATABASE_URL=postgresql://postgres:postgres@localhost:5432/techmaster');
    console.error('    npm run db:init && npm run db:seed');
    console.error('');
    console.error('  Option B — pass it inline (after db:init, same terminal):');
    console.error('    DATABASE_URL=postgresql://postgres:postgres@localhost:5432/techmaster npm run db:seed');
    console.error('');
    process.exit(1);
  }

  try {
    if (reset) {
      console.log('⚠️ Deleting all existing questions...');
      await query('DELETE FROM questions');
      await query('ALTER SEQUENCE questions_id_seq RESTART WITH 1');
      console.log('🗑️ All questions deleted');
    }

    const slugFor = (q) => q.slug || q.title.toLowerCase().replace(/\s+/g, '-');
    let inserted = 0;
    let skipped = 0;
    for (const q of questions) {
      const slug = slugFor(q);
      try {
        const result = await query(
          `INSERT INTO questions (
            title, slug, description, difficulty,
            topics, companies, tags, examples, constraints, test_cases,
            acceptance_rate, likes, dislikes, is_premium
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
          ON CONFLICT (slug) DO NOTHING`,
          [
            q.title,
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
        if (result.rowCount > 0) {
          inserted++;
          console.log('✅ Inserted:', q.title);
        } else {
          skipped++;
        }
      } catch (rowErr) {
        // Duplicate title or slug (unique constraint) — skip this row
        if (rowErr.code === '23505') {
          skipped++;
        } else {
          throw rowErr;
        }
      }
    }
    if (skipped > 0) {
      console.log(`⏭️  Skipped ${skipped} question(s) (duplicate slug or title)`);
    }

    console.log('🎉 Seeding completed');
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  } finally {
    await closePool();
  }
}

seedQuestions({ reset: true });
