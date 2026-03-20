/**
 * Professional Data Science Learning Track - Schema & Types
 * Production-ready, modular, auto-gradable, certification-based
 */

export type Difficulty = "easy" | "medium" | "hard" | "expert";
export type PracticeType = "mcq" | "coding" | "fill_blank" | "debug" | "output_prediction" | "optimization" | "case_study";

export interface TestCase {
  input: string | Record<string, unknown>;
  expectedOutput: string | number | boolean | unknown[] | null;
  isHidden?: boolean;
  weight?: number;
}

export interface CodingExercise {
  id: string;
  topicId: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  type: "short" | "medium" | "mini_assignment";
  boilerplate: Record<string, string>;
  testCases: TestCase[];
  hints: string[];
  solution?: string;
  timeLimitSeconds?: number;
}

export interface McqOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation?: string;
}

export interface Mcq {
  id: string;
  topicId: string;
  question: string;
  options: McqOption[];
  difficulty: Difficulty;
  type: "basic" | "scenario";
  explanation?: string;
}

export interface Topic {
  id: string;
  levelId: string;
  title: string;
  order: number;
  conceptMarkdown: string;
  shortExercises: string[];
  mediumProblems: string[];
  mcqs: string[];
  miniAssignment?: string;
}

export interface Level {
  id: string;
  order: number;
  title: string;
  color: string;
  description: string;
  topics: Topic[];
  totalPoints: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requiredLevels: string[];
  scoreThreshold: number;
  metadata: Record<string, string>;
}

export interface CapstoneProject {
  id: string;
  title: string;
  businessProblem: string;
  datasetUrl?: string;
  requirements: string[];
  rubric: Record<string, number>;
  submissionStructure: string[];
}

export interface DataCtfChallenge {
  id: string;
  title: string;
  type: "feature_leakage" | "corrupted_recovery" | "reverse_model" | "adversarial" | "mystery_dataset";
  points: number;
  difficulty: Difficulty;
  description: string;
}
