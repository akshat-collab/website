/**
 * DSA Questions, Leaderboard, Submissions API.
 * Read-only uses queryRead for horizontal scaling.
 */
import { Router } from 'express';
import { query, queryRead } from '../db/pool.js';
import { requireFirebaseAuth } from '../middleware/firebaseAuth.js';

const router = Router();

/**
 * GET /api/dsa/questions
 * Fetch all DSA questions (list view)
 */
function dbErrorMessage(err) {
  const msg = err?.message || '';
  if (!msg) return 'Database error. Check server logs.';
  if (msg.includes('DATABASE_URL') || msg.includes('not configured')) {
    return 'Database not configured. Set DATABASE_URL in .env and restart the server.';
  }
  if (err.code === 'ECONNREFUSED' || msg.includes('connect') || msg.includes('refused')) {
    return 'Cannot connect to PostgreSQL. Is it running? (e.g. docker-compose up -d)';
  }
  if (err.code === 'ENOENT' || msg.includes('does not exist')) {
    return 'Database or table missing. Run: npm run db:init && npm run db:seed';
  }
  return 'Failed to fetch questions. Check server logs.';
}

router.get('/questions', async (req, res) => {
  try {
    const result = await queryRead(
      `SELECT
         slug AS id,
         title,
         difficulty,
         COALESCE(ROUND(acceptance_rate)::int, 0) AS acceptance,
         COALESCE(tags, '[]'::jsonb) AS tags
       FROM questions
       ORDER BY id ASC`
    );

    res.json({ items: result.rows });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: dbErrorMessage(error) });
  }
});

/**
 * GET /api/dsa/questions/:id
 * Fetch a single DSA question by slug (detail view)
 */
router.get('/questions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await queryRead(
      `SELECT
         slug AS id,
         title,
         difficulty,
         COALESCE(ROUND(acceptance_rate)::int, 0) AS acceptance,
         COALESCE(tags, '[]'::jsonb) AS tags,
         description,
         COALESCE(examples, '[]'::jsonb) AS examples,
         COALESCE(constraints, '[]'::jsonb) AS constraints,
         COALESCE(test_cases, '[]'::jsonb) AS "testCases",
         COALESCE(is_premium, false) AS "isPremium",
         COALESCE(likes, 0) AS likes,
         COALESCE(dislikes, 0) AS dislikes
       FROM questions
       WHERE slug = $1
       LIMIT 1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Question not found' });
    }

    res.json({ item: result.rows[0] });
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({ error: 'Failed to fetch question' });
  }
});

/** GET /api/dsa/daily-slug — one problem slug per day (deterministic by date) */
router.get('/daily-slug', async (_req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const result = await queryRead(
      `SELECT slug FROM questions ORDER BY md5(slug || $1) LIMIT 1`,
      [today]
    );
    const slug = result.rows[0]?.slug || null;
    if (!slug) return res.status(404).json({ error: 'No questions in database' });
    res.json({ slug });
  } catch (err) {
    console.error('Daily slug error:', err);
    res.status(500).json({ error: 'Failed to get daily problem' });
  }
});

/** GET /api/dsa/random-slug — one random problem slug */
router.get('/random-slug', async (_req, res) => {
  try {
    const result = await queryRead(
      'SELECT slug FROM questions ORDER BY RANDOM() LIMIT 1'
    );
    const slug = result.rows[0]?.slug || null;
    if (!slug) return res.status(404).json({ error: 'No questions in database' });
    res.json({ slug });
  } catch (err) {
    console.error('Random slug error:', err);
    res.status(500).json({ error: 'Failed to get random problem' });
  }
});

/** GET /api/dsa/leaderboard */
router.get('/leaderboard', async (_req, res) => {
  try {
    const limit = Math.min(parseInt(_req.query.limit, 10) || 100, 200);
    const result = await queryRead(
      `SELECT id, username, rating, problems_solved FROM dsa_users ORDER BY rating DESC NULLS LAST LIMIT $1`,
      [limit]
    );
    res.json({ items: result.rows });
  } catch (err) {
    console.error('Leaderboard error:', err);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

/** GET /api/dsa/submissions — current user's submissions */
router.get('/submissions', requireFirebaseAuth(false), async (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'Auth required' });
  try {
    const result = await queryRead(
      `SELECT id, user_id, problem_id, status, language, runtime_ms, memory_mb, code_snippet, created_at
       FROM dsa_submissions WHERE user_id = $1 ORDER BY created_at DESC LIMIT 200`,
      [req.user.id]
    );
    res.json({ items: result.rows });
  } catch (err) {
    console.error('Submissions list error:', err);
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

/** POST /api/dsa/submissions — submit solution */
router.post('/submissions', requireFirebaseAuth(false), async (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'Auth required' });
  const { problem_id, status, language, runtime_ms, memory_mb, code_snippet } = req.body;
  if (!problem_id || !status) return res.status(400).json({ error: 'problem_id and status required' });
  try {
    const result = await query(
      `INSERT INTO dsa_submissions (user_id, problem_id, status, language, runtime_ms, memory_mb, code_snippet)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, user_id, problem_id, status, language, runtime_ms, memory_mb, created_at`,
      [req.user.id, problem_id, status, language || null, runtime_ms ?? null, memory_mb ?? null, code_snippet?.slice(0, 50000) || null]
    );
    if (status === 'Accepted') {
      await query(
        'UPDATE dsa_users SET problems_solved = COALESCE(problems_solved, 0) + 1, updated_at = NOW() WHERE id = $1',
        [req.user.id]
      );
    }
    res.status(201).json({ submission: result.rows[0] });
  } catch (err) {
    console.error('Submit error:', err);
    res.status(500).json({ error: 'Failed to submit' });
  }
});

export default router;
