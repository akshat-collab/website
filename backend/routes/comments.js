/**
 * Problem comments and likes — all DB-backed, auth via Firebase (optional for GET).
 */
import { Router } from 'express';
import { query } from '../db/pool.js';
import { requireFirebaseAuth } from '../middleware/firebaseAuth.js';

const router = Router();

// GET /api/comments?problem_slug=xxx — list comments (no auth required)
router.get('/', async (req, res) => {
  const slug = req.query.problem_slug;
  if (!slug) return res.status(400).json({ error: 'problem_slug required' });
  try {
    const result = await query(
      `SELECT id, problem_slug, user_id, username, user_avatar, content, parent_comment_id, likes, created_at, updated_at
       FROM problem_comments
       WHERE problem_slug = $1
       ORDER BY created_at DESC`,
      [slug]
    );
    res.json({ comments: result.rows });
  } catch (err) {
    console.error('Comments list error:', err);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// GET /api/comments/count?problem_slug=xxx — count top-level comments
router.get('/count', async (req, res) => {
  const slug = req.query.problem_slug;
  if (!slug) return res.status(400).json({ error: 'problem_slug required' });
  try {
    const result = await query(
      `SELECT COUNT(*)::int AS count FROM problem_comments WHERE problem_slug = $1 AND parent_comment_id IS NULL`,
      [slug]
    );
    res.json({ count: result.rows[0]?.count ?? 0 });
  } catch (err) {
    console.error('Comments count error:', err);
    res.status(500).json({ error: 'Failed to count' });
  }
});

// GET /api/comments/likes — which comments current user liked (comment_ids)
router.get('/likes', requireFirebaseAuth(true), async (req, res) => {
  if (!req.user) return res.json({ commentIds: [] });
  try {
    const result = await query('SELECT comment_id FROM comment_likes WHERE user_id = $1', [req.user.id]);
    res.json({ commentIds: result.rows.map((r) => r.comment_id) });
  } catch (err) {
    console.error('Likes list error:', err);
    res.status(500).json({ commentIds: [] });
  }
});

// POST /api/comments — add comment (auth required)
router.post('/', requireFirebaseAuth(false), async (req, res) => {
  const { problem_slug, content, parent_comment_id } = req.body;
  if (!problem_slug || !content || typeof content !== 'string') {
    return res.status(400).json({ error: 'problem_slug and content required' });
  }
  const text = content.trim().slice(0, 5000);
  if (!text) return res.status(400).json({ error: 'content required' });
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: 'Auth required' });
  const username = req.user.username || 'user';
  const userAvatar = req.user.profile_photo_url || null;
  try {
    const result = await query(
      `INSERT INTO problem_comments (problem_slug, user_id, username, user_avatar, content, parent_comment_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, problem_slug, user_id, username, user_avatar, content, parent_comment_id, likes, created_at, updated_at`,
      [problem_slug, userId, username, userAvatar, text, parent_comment_id || null]
    );
    res.status(201).json({ comment: result.rows[0] });
  } catch (err) {
    console.error('Comment create error:', err);
    res.status(500).json({ error: 'Failed to create comment' });
  }
});

// POST /api/comments/:id/like — toggle like (auth required)
router.post('/:id/like', requireFirebaseAuth(false), async (req, res) => {
  const commentId = req.params.id;
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: 'Auth required' });
  try {
    await query(
      `INSERT INTO comment_likes (comment_id, user_id) VALUES ($1, $2)
       ON CONFLICT (comment_id, user_id) DO NOTHING`,
      [commentId, userId]
    );
    const count = await query('SELECT likes FROM problem_comments WHERE id = $1', [commentId]);
    res.json({ liked: true, likes: count.rows[0]?.likes ?? 0 });
  } catch (err) {
    if (err.code === '23505') {
      return res.json({ liked: true });
    }
    console.error('Like error:', err);
    res.status(500).json({ error: 'Failed to like' });
  }
});

// DELETE /api/comments/:id/like — unlike
router.delete('/:id/like', requireFirebaseAuth(false), async (req, res) => {
  const commentId = req.params.id;
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: 'Auth required' });
  try {
    await query('DELETE FROM comment_likes WHERE comment_id = $1 AND user_id = $2', [commentId, userId]);
    const count = await query('SELECT likes FROM problem_comments WHERE id = $1', [commentId]);
    res.json({ liked: false, likes: count.rows[0]?.likes ?? 0 });
  } catch (err) {
    console.error('Unlike error:', err);
    res.status(500).json({ error: 'Failed to unlike' });
  }
});

export default router;
