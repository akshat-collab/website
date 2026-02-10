import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import questionsData from './init/data.js';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  console.error('Please set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedQuestions() {
  console.log('🌱 Starting to seed questions...');
  console.log(`📊 Total questions to insert: ${questionsData.length}`);

  try {
    // Transform data to match database schema (snake_case)
    const transformedData = questionsData.map(q => ({
      title: q.title,
      slug: q.slug,
      description: q.description,
      difficulty: q.difficulty,
      topics: q.topics,
      companies: q.companies,
      tags: q.tags,
      examples: q.examples,
      constraints: q.constraints,
      test_cases: q.testCases,
      acceptance_rate: q.acceptanceRate,
      likes: q.likes,
      dislikes: q.dislikes,
      is_premium: q.isPremium
    }));

    // Insert questions in batches
    const batchSize = 50;
    let inserted = 0;

    for (let i = 0; i < transformedData.length; i += batchSize) {
      const batch = transformedData.slice(i, i + batchSize);
      
      const { data, error } = await supabase
        .from('questions')
        .upsert(batch, { onConflict: 'slug' });

      if (error) {
        console.error(`❌ Error inserting batch ${i / batchSize + 1}:`, error);
      } else {
        inserted += batch.length;
        console.log(`✅ Inserted batch ${i / batchSize + 1} (${inserted}/${transformedData.length})`);
      }
    }

    console.log(`\n🎉 Successfully seeded ${inserted} questions!`);
    
    // Verify the data
    const { count, error: countError } = await supabase
      .from('questions')
      .select('*', { count: 'exact', head: true });

    if (!countError) {
      console.log(`📈 Total questions in database: ${count}`);
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error);
    process.exit(1);
  }
}

seedQuestions();
