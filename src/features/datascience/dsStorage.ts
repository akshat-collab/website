/**
 * Data Science Track - Progress & Anti-Cheat Storage
 * Professional course: assignments, MCQs, exercises protected.
 */

const DS_PREFIX = "techmasterai_ds_";
const COMPLETED_TOPICS = DS_PREFIX + "completed_topics";
const COMPLETED_EXERCISES = DS_PREFIX + "completed_exercises";
const MCQ_ANSWERS = DS_PREFIX + "mcq_answers";
const ASSIGNMENT_SUBMISSIONS = DS_PREFIX + "assignments";
const SESSION_START = DS_PREFIX + "session_start";
const TAB_SWITCH_COUNT = DS_PREFIX + "tab_switch";
const BADGES_EARNED = DS_PREFIX + "badges";
const CONCEPT_VIEWED = DS_PREFIX + "concept_viewed";

// ─── Topic completion (tick) ─────────────────────────────────────────────
export function getCompletedTopics(): string[] {
  try {
    const raw = localStorage.getItem(COMPLETED_TOPICS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function markTopicComplete(topicId: string): void {
  const ids = getCompletedTopics();
  if (ids.includes(topicId)) return;
  localStorage.setItem(COMPLETED_TOPICS, JSON.stringify([...ids, topicId]));
}

export function isTopicComplete(topicId: string): boolean {
  return getCompletedTopics().includes(topicId);
}

// ─── Exercise completion ───────────────────────────────────────────────
export function getCompletedExercises(): string[] {
  try {
    const raw = localStorage.getItem(COMPLETED_EXERCISES);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function markExerciseComplete(exerciseId: string): void {
  const ids = getCompletedExercises();
  if (ids.includes(exerciseId)) return;
  localStorage.setItem(COMPLETED_EXERCISES, JSON.stringify([...ids, exerciseId]));
}

export function isExerciseComplete(exerciseId: string): boolean {
  return getCompletedExercises().includes(exerciseId);
}

// ─── MCQ answers (protected: store only after submit, no reveal before) ───
export interface McqAttempt {
  mcqId: string;
  selectedId: string;
  correct: boolean;
  timestamp: number;
}

export function getMcqAttempts(): McqAttempt[] {
  try {
    const raw = localStorage.getItem(MCQ_ANSWERS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function recordMcqAttempt(mcqId: string, selectedId: string, correct: boolean): void {
  const attempts = getMcqAttempts();
  const filtered = attempts.filter((a) => a.mcqId !== mcqId);
  localStorage.setItem(
    MCQ_ANSWERS,
    JSON.stringify([...filtered, { mcqId, selectedId, correct, timestamp: Date.now() }])
  );
}

export function getMcqResult(mcqId: string): McqAttempt | undefined {
  return getMcqAttempts().find((a) => a.mcqId === mcqId);
}

export function getMcqsCorrectForTopic(topicId: string, mcqIds: string[]): number {
  const attempts = getMcqAttempts();
  return mcqIds.filter((id) => {
    const a = attempts.find((x) => x.mcqId === id);
    return a?.correct;
  }).length;
}

// ─── Assignment submissions ────────────────────────────────────────────
export interface AssignmentSubmission {
  assignmentId: string;
  topicId: string;
  code?: string;
  notes?: string;
  submittedAt: number;
  status: "submitted" | "graded";
  score?: number;
}

export function getAssignmentSubmissions(): AssignmentSubmission[] {
  try {
    const raw = localStorage.getItem(ASSIGNMENT_SUBMISSIONS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function submitAssignment(
  assignmentId: string,
  topicId: string,
  code?: string,
  notes?: string
): void {
  const subs = getAssignmentSubmissions().filter((s) => s.assignmentId !== assignmentId);
  localStorage.setItem(
    ASSIGNMENT_SUBMISSIONS,
    JSON.stringify([
      ...subs,
      { assignmentId, topicId, code, notes, submittedAt: Date.now(), status: "submitted" },
    ])
  );
}

export function isAssignmentSubmitted(assignmentId: string): boolean {
  return getAssignmentSubmissions().some((s) => s.assignmentId === assignmentId);
}

// ─── Session tracking (anti-cheat) ─────────────────────────────────────
export function startSession(): void {
  localStorage.setItem(SESSION_START, String(Date.now()));
  localStorage.setItem(TAB_SWITCH_COUNT, "0");
}

export function getSessionStart(): number | null {
  const raw = localStorage.getItem(SESSION_START);
  return raw ? parseInt(raw, 10) : null;
}

export function recordTabSwitch(): number {
  const raw = localStorage.getItem(TAB_SWITCH_COUNT);
  const count = raw ? parseInt(raw, 10) + 1 : 1;
  localStorage.setItem(TAB_SWITCH_COUNT, String(count));
  return count;
}

export function getTabSwitchCount(): number {
  const raw = localStorage.getItem(TAB_SWITCH_COUNT);
  return raw ? parseInt(raw, 10) : 0;
}

// ─── Concept viewed ─────────────────────────────────────────────────────
export function markConceptViewed(topicId: string): void {
  try {
    const raw = localStorage.getItem(CONCEPT_VIEWED);
    const ids: string[] = raw ? JSON.parse(raw) : [];
    if (ids.includes(topicId)) return;
    localStorage.setItem(CONCEPT_VIEWED, JSON.stringify([...ids, topicId]));
  } catch {
    localStorage.setItem(CONCEPT_VIEWED, JSON.stringify([topicId]));
  }
}

export function hasViewedConcept(topicId: string): boolean {
  try {
    const raw = localStorage.getItem(CONCEPT_VIEWED);
    const ids: string[] = raw ? JSON.parse(raw) : [];
    return ids.includes(topicId);
  } catch {
    return false;
  }
}

// ─── Badges ─────────────────────────────────────────────────────────────
export function getEarnedBadges(): string[] {
  try {
    const raw = localStorage.getItem(BADGES_EARNED);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function awardBadge(badgeId: string): void {
  const ids = getEarnedBadges();
  if (ids.includes(badgeId)) return;
  localStorage.setItem(BADGES_EARNED, JSON.stringify([...ids, badgeId]));
}

export function hasBadge(badgeId: string): boolean {
  return getEarnedBadges().includes(badgeId);
}
