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

function safeJsonArray(value: unknown): unknown[] {
  if (Array.isArray(value)) return value;
  if (value == null || value === "") return [];
  try {
    const parsed = JSON.parse(String(value));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function mapRowToListItem(row: Record<string, unknown>): DsaQuestionListItem {
  const tagsRaw = row.tags;
  let tags: string[] = [];
  if (Array.isArray(tagsRaw)) tags = tagsRaw.map(String);
  else if (typeof tagsRaw === "string" && tagsRaw.trim()) {
    try {
      const parsed = JSON.parse(tagsRaw);
      tags = Array.isArray(parsed) ? parsed.map(String) : [];
    } catch {
      tags = tagsRaw.split(",").map((t) => t.trim()).filter(Boolean);
    }
  }
  const difficulty = row.difficulty === "Easy" || row.difficulty === "Hard" || row.difficulty === "Medium"
    ? row.difficulty
    : "Medium";
  return {
    id: String(row.slug ?? row.id ?? ""),
    title: String(row.title ?? "Untitled"),
    difficulty,
    acceptance: Math.round(Number(row.acceptance_rate ?? row.acceptance ?? 0)) || 0,
    tags,
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
  const rawTestCases = safeJsonArray(row.test_cases);
  const testCases = rawTestCases.map(normalizeTestCase);
  return {
    ...list,
    description: String(row.description ?? ""),
    examples: safeJsonArray(row.examples) as DsaQuestionDetail["examples"],
    constraints: safeJsonArray(row.constraints).map(String),
    testCases,
    isPremium: Boolean(row.is_premium ?? false),
    likes: Number(row.likes ?? 0) || 0,
    dislikes: Number(row.dislikes ?? 0) || 0,
  };
}

/** Convert hardcoded DsaProblem to DsaQuestionListItem */
function hardcodedToListItem(p: { id: string; title: string; difficulty: Difficulty; acceptance: number; tags: string[] }): DsaQuestionListItem {
  return { id: p.id, title: p.title, difficulty: p.difficulty, acceptance: p.acceptance, tags: p.tags };
}

export async function fetchDsaQuestions(): Promise<{ items: DsaQuestionListItem[]; source: "hardcoded" }> {
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
  const hardcoded = getDsaProblemById(id);
  if (hardcoded) {
    return { item: hardcodedToDetail(hardcoded) };
  }
  throw new DsaApiError("Question not found", 404, { error: "Not found" });
}

/** One problem slug per day (same for everyone). */
export async function fetchDailySlug(): Promise<{ slug: string }> {
  const list = getDsaProblemList();
  if (list.length === 0) throw new DsaApiError("No questions in database", 404);
  const today = new Date().toISOString().slice(0, 10);
  const idx = today.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % list.length;
  return { slug: list[idx]?.id ?? list[0].id };
}

/** One random problem slug. */
export async function fetchRandomSlug(): Promise<{ slug: string }> {
  const list = getDsaProblemList();
  if (list.length === 0) throw new DsaApiError("No questions in database", 404);
  const idx = Math.floor(Math.random() * list.length);
  return { slug: list[idx]?.id ?? list[0].id };
}

/** Fetch all questions with full detail (for duels, profile, etc.) */
export async function fetchAllDsaQuestions(): Promise<DsaQuestionDetail[]> {
  const list = getDsaProblemList();
  return list.map((p) => hardcodedToDetail(p));
}
