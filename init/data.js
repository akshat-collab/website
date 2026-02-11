/**
 * Seed data for Supabase questions table.
 * Run: node supabase-seed.js (requires VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env)
 * Regenerate: npx tsx scripts/generate-seed-data.mjs
 */
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(readFileSync(join(__dirname, 'seedData.json'), 'utf8'));
export default data;
