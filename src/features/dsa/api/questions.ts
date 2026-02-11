import { supabase } from "@/lib/supabase";
import { getDsaProblemById, getDsaProblemList } from "@/data/dsaProblems";
import { getAllTestCases } from "@/data/dsaTestCases";

export type Difficulty = "Easy" | "Medium" | "Hard";

export interface DsaQuestionListItem {
  id: string; // slug
  title: string;
  difficulty: Difficulty;
  acceptance: number; // percent integer
  tags: string[];
}

export interface DsaQuestionDetail extends DsaQuestionListItem {
  description: string;
  examples: Array<{ input: string; output: string; explanation?: string }>;
  constraints: string[];
  testCases: unknown[];
  isPremium: boolean;
  likes: number;
  dislikes: number;
}

export class DsaApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public body?: { error?: string }
  ) {
    super(message);
    this.name = "DsaApiError";
  }
}

function mapRowToListItem(row: Record<string, unknown>): DsaQuestionListItem {
  return {
    id: String(row.slug ?? row.id),
    title: String(row.title ?? ""),
    difficulty: (row.difficulty as Difficulty) ?? "Medium",
    acceptance: Math.round(Number(row.acceptance_rate ?? 0)),
    tags: Array.isArray(row.tags) ? (row.tags as string[]) : (row.tags ? JSON.parse(String(row.tags || "[]")) : []),
  };
}

function normalizeTestCase(tc: unknown): { input: unknown; expected: unknown } {
  if (tc && typeof tc === "object" && "input" in tc) {
    const t = tc as Record<string, unknown>;
    return {
      input: t.input,
      expected: t.expected ?? t.output ?? null,
    };
  }
  return { input: tc, expected: null };
}

function mapRowToDetail(row: Record<string, unknown>): DsaQuestionDetail {
  const list = mapRowToListItem(row);
  let rawTestCases: unknown[] = [];
  if (Array.isArray(row.test_cases)) rawTestCases = row.test_cases;
  else if (row.test_cases) {
    try {
      rawTestCases = JSON.parse(String(row.test_cases || "[]"));
    } catch {
      rawTestCases = [];
    }
  }
  const testCases = rawTestCases.map(normalizeTestCase);
  return {
    ...list,
    description: String(row.description ?? ""),
    examples: Array.isArray(row.examples) ? row.examples as DsaQuestionDetail["examples"] : (row.examples ? JSON.parse(String(row.examples || "[]")) : []),
    constraints: Array.isArray(row.constraints) ? row.constraints as string[] : (row.constraints ? JSON.parse(String(row.constraints || "[]")) : []),
    testCases,
    isPremium: Boolean(row.is_premium ?? false),
    likes: Number(row.likes ?? 0),
    dislikes: Number(row.dislikes ?? 0),
  };
}

/** Convert hardcoded DsaProblem to DsaQuestionListItem */
function hardcodedToListItem(p: { id: string; title: string; difficulty: Difficulty; acceptance: number; tags: string[] }): DsaQuestionListItem {
  return { id: p.id, title: p.title, difficulty: p.difficulty, acceptance: p.acceptance, tags: p.tags };
}

export async function fetchDsaQuestions(): Promise<{ items: DsaQuestionListItem[]; source: "supabase" | "hardcoded" }> {
  try {
    const { data, error } = await supabase
      .from("questions")
      .select("slug, title, difficulty, acceptance_rate, tags")
      .order("id", { ascending: true });

    if (error) throw error;
    const items = (data ?? []).map((row) => mapRowToListItem(row as Record<string, unknown>));
    if (items.length > 0) return { items, source: "supabase" };
  } catch {
    // Supabase failed or empty - use hardcoded list
  }
  const hardcoded = getDsaProblemList();
  return { items: hardcoded.map(hardcodedToListItem), source: "hardcoded" };
}

/** Convert hardcoded DsaProblem + test cases to DsaQuestionDetail */
function hardcodedToDetail(p: {
  id: string;
  title: string;
  difficulty: Difficulty;
  acceptance: number;
  tags: string[];
  description: string;
  examples: Array<{ input: string; output: string; explanation?: string }>;
  constraints: string[];
}): DsaQuestionDetail {
  const testCases = getAllTestCases(p.id).map((tc) => ({ input: tc.input, expected: tc.expected }));
  return {
    id: p.id,
    title: p.title,
    difficulty: p.difficulty,
    acceptance: p.acceptance,
    tags: p.tags,
    description: p.description,
    examples: p.examples,
    constraints: p.constraints,
    testCases,
    isPremium: false,
    likes: 0,
    dislikes: 0,
  };
}

export async function fetchDsaQuestionById(id: string): Promise<{ item: DsaQuestionDetail }> {
  try {
    const { data, error } = await supabase
      .from("questions")
      .select("*")
      .eq("slug", id)
      .single();

    if (!error && data) {
      return { item: mapRowToDetail(data as Record<string, unknown>) };
    }
  } catch {
    // Supabase failed - fall through to hardcoded
  }
  const hardcoded = getDsaProblemById(id);
  if (hardcoded) {
    return { item: hardcodedToDetail(hardcoded) };
  }
  throw new DsaApiError("Question not found", 404, { error: "Not found" });
}

/** One problem slug per day (same for everyone). */
export async function fetchDailySlug(): Promise<{ slug: string }> {
  try {
    const { data, error } = await supabase
      .from("questions")
      .select("slug")
      .order("id", { ascending: true });

    if (!error && data?.length) {
      const today = new Date().toISOString().slice(0, 10);
      const idx = today.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % data.length;
      return { slug: String(data[idx]?.slug ?? data[0]?.slug) };
    }
  } catch {
    // fall through
  }
  const list = getDsaProblemList();
  if (list.length === 0) throw new DsaApiError("No questions in database", 404);
  const today = new Date().toISOString().slice(0, 10);
  const idx = today.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % list.length;
  return { slug: list[idx]?.id ?? list[0].id };
}

/** One random problem slug. */
export async function fetchRandomSlug(): Promise<{ slug: string }> {
  try {
    const { data, error } = await supabase
      .from("questions")
      .select("slug")
      .order("id", { ascending: true });

    if (!error && data?.length) {
      const idx = Math.floor(Math.random() * data.length);
      return { slug: String(data[idx]?.slug ?? data[0]?.slug) };
    }
  } catch {
    // fall through
  }
  const list = getDsaProblemList();
  if (list.length === 0) throw new DsaApiError("No questions in database", 404);
  const idx = Math.floor(Math.random() * list.length);
  return { slug: list[idx]?.id ?? list[0].id };
}

/** Fetch all questions with full detail (for duels, profile, etc.) */
export async function fetchAllDsaQuestions(): Promise<DsaQuestionDetail[]> {
  try {
    const { data, error } = await supabase
      .from("questions")
      .select("*")
      .order("id", { ascending: true });

    if (!error && data?.length) {
      return (data ?? []).map((row) => mapRowToDetail(row as Record<string, unknown>));
    }
  } catch {
    // fall through
  }
  const list = getDsaProblemList();
  return list.map((p) => hardcodedToDetail(p));
}
