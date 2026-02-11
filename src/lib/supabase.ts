/**
 * Supabase Client Configuration
 * Frontend-only client for React app
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase credentials not found in environment variables');
}

// Create Supabase client for frontend
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Database types (auto-generated would be better)
export interface Question {
  id: number;
  title: string;
  slug: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topics: string[];
  companies: string[];
  tags: string[];
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints: string[];
  visible_test_cases: Array<{
    id: number;
    input: string;
    output: string;
    explanation?: string;
    visible: boolean;
  }>;
  acceptance_rate: number;
  likes: number;
  dislikes: number;
  is_premium: boolean;
  created_at: string;
  updated_at: string;
}

export interface DsaUser {
  id: string;
  username: string;
  email: string;
  rating: number;
  problems_solved: number;
  created_at: string;
  updated_at: string;
}

export interface DsaSubmission {
  id: string;
  user_id: string;
  problem_id: string;
  status: string;
  language: string;
  runtime_ms?: number;
  memory_mb?: number;
  code_snippet?: string;
  created_at: string;
}
