/**
 * Firebase Auth API: sync profile with dsa_users.
 * - GET /api/auth/me — require Firebase Bearer token, return dsa user (create if missing). Profile photo from DB or Firebase.
 * - POST /api/auth/register — require Firebase Bearer token, body { username }; create dsa_users row.
 * - PATCH /api/auth/profile — update username and/or profile_photo_url (auth required).
 */
import express from 'express';
import { query } from '../db/pool.js';
import { requireFirebaseAuth } from '../middleware/firebaseAuth.js';

const router = express.Router();
const MAX_PHOTO_URL_LEN = 2048;
const MAX_DATA_URL_LEN = 100000; // data:image/... base64 can be large

function toUserRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    username: row.username,
    email: row.email,
    rating: row.rating ?? 1200,
    problems_solved: row.problems_solved ?? 0,
    profile_photo_url: row.profile_photo_url ?? null,
  };
}

function isValidPhotoUrl(url) {
  if (typeof url !== 'string') return false;
  const t = url.trim();
  if (t.length === 0) return true;
  if (t.startsWith('data:image/')) return t.length <= MAX_DATA_URL_LEN;
  if (t.startsWith('https://') || t.startsWith('http://')) return t.length <= MAX_PHOTO_URL_LEN;
  return false;
}

// GET /api/auth/me — return current user (create from Firebase if not in dsa_users)
router.get('/me', requireFirebaseAuth(false), async (req, res) => {
  try {
    if (req.user) {
      const u = toUserRow(req.user);
      if (!u.profile_photo_url && req.firebasePhotoURL) u.profile_photo_url = req.firebasePhotoURL;
      return res.json({ user: u });
    }
    const uid = req.firebaseUid;
    const email = req.firebaseEmail || '';
    const photoUrl = req.firebasePhotoURL || null;
    const baseName = (email.split('@')[0] || 'user').replace(/\s/g, '') || 'user';
    const username = baseName.length + 9 <= 64 ? baseName + '_' + uid.slice(0, 8) : baseName.slice(0, 55) + '_' + uid.slice(0, 8);
    const result = await query(
      `INSERT INTO dsa_users (firebase_uid, username, email, rating, problems_solved, profile_photo_url)
       VALUES ($1, $2, $3, 1200, 0, $4)
       ON CONFLICT (firebase_uid) DO UPDATE SET updated_at = NOW()
       RETURNING id, username, email, rating, problems_solved, profile_photo_url`,
      [uid, username, email, photoUrl]
    );
    const user = result.rows[0];
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (!user.profile_photo_url && photoUrl) user.profile_photo_url = photoUrl;
    res.json({ user: toUserRow(user) });
  } catch (err) {
    console.error('Auth me error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/auth/register — create or update dsa_users profile (Firebase token required)
router.post('/register', requireFirebaseAuth(false), async (req, res) => {
  const username = (req.body?.username || req.firebaseEmail?.split('@')[0] || 'user').toString().trim().slice(0, 64);
  const email = req.firebaseEmail || '';
  const uid = req.firebaseUid;
  const photoUrl = req.firebasePhotoURL || null;
  if (!uid) return res.status(401).json({ error: 'Token required' });
  try {
    const result = await query(
      `INSERT INTO dsa_users (firebase_uid, username, email, rating, problems_solved, profile_photo_url)
       VALUES ($1, $2, $3, 1200, 0, $4)
       ON CONFLICT (firebase_uid) DO UPDATE SET username = EXCLUDED.username, email = EXCLUDED.email,
         profile_photo_url = COALESCE(EXCLUDED.profile_photo_url, dsa_users.profile_photo_url),
         updated_at = NOW()
       RETURNING id, username, email, rating, problems_solved, profile_photo_url`,
      [uid, username || 'user', email, photoUrl]
    );
    const user = result.rows[0];
    res.status(201).json({ success: true, user: toUserRow(user) });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PATCH /api/auth/profile — update profile (username and/or profile_photo_url). Auth required.
router.patch('/profile', requireFirebaseAuth(false), async (req, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: 'Auth required' });
  const { username, profile_photo_url: photoUrl } = req.body || {};
  const updates = [];
  const values = [];
  let n = 1;
  if (typeof username === 'string') {
    const u = username.trim().slice(0, 64);
    if (u.length > 0) {
      updates.push(`username = $${n++}`);
      values.push(u);
    }
  }
  if (photoUrl !== undefined) {
    if (photoUrl === null || photoUrl === '') {
      updates.push(`profile_photo_url = NULL`);
    } else if (isValidPhotoUrl(photoUrl)) {
      updates.push(`profile_photo_url = $${n++}`);
      const val = String(photoUrl).trim();
      values.push(val.length > MAX_DATA_URL_LEN ? val.slice(0, MAX_DATA_URL_LEN) : val);
    } else {
      return res.status(400).json({ error: 'Invalid profile_photo_url (use https/http/data URL, max 2048 chars)' });
    }
  }
  if (updates.length === 0) return res.status(400).json({ error: 'Provide username and/or profile_photo_url' });
  updates.push('updated_at = NOW()');
  values.push(userId);
  try {
    const result = await query(
      `UPDATE dsa_users SET ${updates.join(', ')} WHERE id = $${n} RETURNING id, username, email, rating, problems_solved, profile_photo_url`,
      values
    );
    const user = result.rows[0];
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user: toUserRow(user) });
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
