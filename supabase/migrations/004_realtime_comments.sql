-- Enable Realtime for problem_comments so postgres_changes subscriptions work
-- Only runs if problem_comments exists (002_comments_schema.sql must run first)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'problem_comments')
     AND NOT EXISTS (
       SELECT 1 FROM pg_publication_tables
       WHERE pubname = 'supabase_realtime' AND tablename = 'problem_comments'
     ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE problem_comments;
  END IF;
END $$;
