-- Profile photo URL: single source of truth for avatar everywhere (DSA, comments, duels).
-- Store URL only (e.g. Firebase Storage, Google photo URL); max 2048 chars.
ALTER TABLE dsa_users ADD COLUMN IF NOT EXISTS profile_photo_url TEXT;
COMMENT ON COLUMN dsa_users.profile_photo_url IS 'User avatar URL (Firebase/Google or uploaded). Same everywhere.';
