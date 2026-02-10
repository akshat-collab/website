/**
 * Verify Firebase ID token and attach decoded user to req.
 * Loads dsa_users row into req.user when token is valid.
 */
import { getFirebaseAuth } from '../lib/firebaseAdmin.js';
import { query } from '../db/pool.js';

const auth = getFirebaseAuth();

export function requireFirebaseAuth(optional = false) {
  return async (req, res, next) => {
    if (!auth) {
      if (optional) return next();
      return res.status(503).json({ error: 'Firebase not configured' });
    }
    const header = req.headers.authorization;
    const token = header?.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) {
      if (optional) return next();
      return res.status(401).json({ error: 'Missing or invalid Authorization header' });
    }
    try {
      const decoded = await auth.verifyIdToken(token);
      req.firebaseUid = decoded.uid;
      req.firebaseEmail = decoded.email || null;
      req.firebasePhotoURL = decoded.picture || null;
      const row = await query(
        `SELECT id, username, email, rating, problems_solved, profile_photo_url FROM dsa_users WHERE firebase_uid = $1 LIMIT 1`,
        [decoded.uid]
      );
      req.user = row.rows[0] || null;
      next();
    } catch (err) {
      if (optional) return next();
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
  };
}
