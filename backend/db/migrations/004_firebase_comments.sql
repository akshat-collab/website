-- Firebase Auth: link dsa_users to Firebase UID
ALTER TABLE dsa_users ADD COLUMN IF NOT EXISTS firebase_uid TEXT UNIQUE;
CREATE INDEX IF NOT EXISTS idx_dsa_users_firebase_uid ON dsa_users(firebase_uid);

-- Problem comments (no RLS; auth via backend Firebase token)
CREATE TABLE IF NOT EXISTS problem_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  problem_slug TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES dsa_users(id) ON DELETE CASCADE,
  username TEXT NOT NULL,
  user_avatar TEXT,
  content TEXT NOT NULL,
  parent_comment_id UUID REFERENCES problem_comments(id) ON DELETE CASCADE,
  likes INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_problem_comments_slug ON problem_comments(problem_slug);
CREATE INDEX IF NOT EXISTS idx_problem_comments_user ON problem_comments(user_id);
CREATE INDEX IF NOT EXISTS idx_problem_comments_created ON problem_comments(created_at DESC);

CREATE TABLE IF NOT EXISTS comment_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  comment_id UUID NOT NULL REFERENCES problem_comments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES dsa_users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(comment_id, user_id)
);
CREATE INDEX IF NOT EXISTS idx_comment_likes_comment ON comment_likes(comment_id);
CREATE INDEX IF NOT EXISTS idx_comment_likes_user ON comment_likes(user_id);

-- Trigger: update comment likes count
CREATE OR REPLACE FUNCTION update_comment_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE problem_comments SET likes = likes + 1, updated_at = NOW() WHERE id = NEW.comment_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE problem_comments SET likes = likes - 1, updated_at = NOW() WHERE id = OLD.comment_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_comment_likes_count ON comment_likes;
CREATE TRIGGER tr_comment_likes_count
  AFTER INSERT OR DELETE ON comment_likes FOR EACH ROW EXECUTE FUNCTION update_comment_likes_count();

-- Trigger: updated_at on problem_comments
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_problem_comments_updated ON problem_comments;
CREATE TRIGGER tr_problem_comments_updated
  BEFORE UPDATE ON problem_comments FOR EACH ROW EXECUTE FUNCTION set_updated_at();
