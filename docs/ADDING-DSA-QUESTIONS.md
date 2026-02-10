# Adding DSA Questions (Including 1000+ Bulk Import)

All DSA questions are stored in the **PostgreSQL `questions`** table. You can add a few manually or bulk-import hundreds/thousands.

## Option 1: Bulk import from a JSON file (recommended for 1000+ questions)

1. **Create a JSON file** (e.g. `questions-bulk.json`) with an array of question objects. Each object should match the shape below.

2. **Run the bulk seed script:**
   ```bash
   node init/seedFromFile.js path/to/questions-bulk.json
   ```
   Or with reset (deletes existing questions first):
   ```bash
   node init/seedFromFile.js path/to/questions-bulk.json --reset
   ```

3. **Required env:** `DATABASE_URL` in `.env`.

### JSON shape for each question

```json
{
  "title": "Two Sum",
  "slug": "two-sum",
  "description": "Given an array of integers...",
  "difficulty": "Easy",
  "topics": ["Array", "Hash Table"],
  "companies": ["Amazon", "Google"],
  "tags": ["Arrays", "Hashing"],
  "examples": [
    { "input": "nums = [2,7,11,15], target = 9", "output": "[0,1]", "explanation": "..." }
  ],
  "constraints": ["2 <= nums.length <= 10^4"],
  "testCases": [
    { "input": { "nums": [2,7,11,15], "target": 9 }, "output": [0, 1] }
  ],
  "acceptanceRate": 47.5,
  "likes": 0,
  "dislikes": 0,
  "isPremium": false
}
```

- **Required:** `title`, `slug`, `description`, `difficulty` (Easy/Medium/Hard).
- **Optional:** `topics`, `companies`, `tags` (arrays), `examples`, `constraints`, `testCases`, `acceptanceRate`, `likes`, `dislikes`, `isPremium`.
- `slug` must be **unique**; duplicate slugs are skipped (or use `--reset` to replace all).

## Option 2: Add to `init/data.js` and run seed

1. Edit `init/data.js`: add or extend the `questions` array with the same shape as above.
2. Run:
   ```bash
   npm run db:seed
   ```
   This uses `ON CONFLICT (title) DO NOTHING`, so existing titles are not duplicated.

## Option 3: Database migration or SQL

For one-off or scripted inserts, run SQL against your database:

```sql
INSERT INTO questions (title, slug, description, difficulty, topics, companies, tags, examples, constraints, test_cases, acceptance_rate, likes, dislikes, is_premium)
VALUES (
  'Your Question Title',
  'your-question-slug',
  'Description text...',
  'Easy',
  '["Array"]'::jsonb,
  '["Google"]'::jsonb,
  '["Arrays"]'::jsonb,
  '[]'::jsonb,
  '[]'::jsonb,
  '[]'::jsonb,
  0, 0, 0, false
);
```

## Where questions appear in the app

- **Problems list:** `/dsa/problems` — loads from `GET /api/dsa/questions` (reads from `questions` table).
- **Problem detail:** `/dsa/problem/:id` — `:id` is the **slug** (e.g. `two-sum`).

After adding or importing, ensure the backend is running and the frontend uses the same `DATABASE_URL` (or same backend) so the new questions show up.
