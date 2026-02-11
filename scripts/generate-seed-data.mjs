#!/usr/bin/env node
/**
 * Generates init/seedData.json from src/data/dsaProblems and src/data/dsaTestCases.
 * Run: node scripts/generate-seed-data.mjs
 * Requires: npm install tsx (or use node --loader ts-node/esm)
 */
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Dynamic import of TS - use tsx if available
async function load() {
  try {
    const { getDsaProblemList } = await import('../src/data/dsaProblems.ts');
    const { getAllTestCases } = await import('../src/data/dsaTestCases.ts');
    const problems = getDsaProblemList();
    return problems.map((p) => ({
      slug: p.id,
      title: p.title,
      description: p.description,
      difficulty: p.difficulty,
      topics: p.tags,
      companies: [],
      tags: p.tags,
      examples: p.examples,
      constraints: p.constraints,
      testCases: getAllTestCases(p.id).map((tc) => ({ input: tc.input, expected: tc.expected })),
      acceptanceRate: p.acceptance,
      likes: 0,
      dislikes: 0,
      isPremium: false,
    }));
  } catch (e) {
    console.error('Install tsx: npm install -D tsx, then run: npx tsx scripts/generate-seed-data.mjs');
    throw e;
  }
}

const fs = await import('fs');
const data = await load();
fs.writeFileSync('init/seedData.json', JSON.stringify(data, null, 2));
console.log('Generated init/seedData.json with', data.length, 'problems');
