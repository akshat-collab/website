-- Problem feedback (rating + text) from users
CREATE TABLE IF NOT EXISTS public.dsa_feedback (
  id SERIAL PRIMARY KEY,
  user_id TEXT,
  problem_slug TEXT NOT NULL,
  feedback_text TEXT NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_dsa_feedback_problem ON public.dsa_feedback(problem_slug);
CREATE INDEX IF NOT EXISTS idx_dsa_feedback_user ON public.dsa_feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_dsa_feedback_created ON public.dsa_feedback(created_at DESC);

ALTER TABLE public.dsa_feedback ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (for anonymous feedback)
CREATE POLICY "Anyone can insert feedback" ON public.dsa_feedback
  FOR INSERT WITH CHECK (true);

-- Anyone can read feedback (for moderation/display)
CREATE POLICY "Anyone can view feedback" ON public.dsa_feedback
  FOR SELECT USING (true);
