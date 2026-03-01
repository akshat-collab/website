const CTF_SOLVED_KEY = "techmasterai_ctf_solved";
const CTF_SCORE_KEY = "techmasterai_ctf_score";
const CTF_HINTS_KEY = "techmasterai_ctf_hints";

export function getSolvedIds(): string[] {
  try {
    const raw = localStorage.getItem(CTF_SOLVED_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function markSolved(id: string, points = 0, hintPenalty = 0): void {
  const ids = getSolvedIds();
  if (ids.includes(id)) return;
  localStorage.setItem(CTF_SOLVED_KEY, JSON.stringify([...ids, id]));

  if (points > 0) {
    const score = getTotalScore();
    localStorage.setItem(CTF_SCORE_KEY, String(score + Math.max(0, points - hintPenalty)));
  }
}

export function isSolved(id: string): boolean {
  return getSolvedIds().includes(id);
}

export function getTotalScore(): number {
  try {
    return parseInt(localStorage.getItem(CTF_SCORE_KEY) ?? "0", 10);
  } catch {
    return 0;
  }
}

export function getHintsUsed(challengeId: string): number {
  try {
    const raw = localStorage.getItem(CTF_HINTS_KEY);
    if (!raw) return 0;
    const obj = JSON.parse(raw);
    return typeof obj[challengeId] === "number" ? obj[challengeId] : 0;
  } catch {
    return 0;
  }
}

export function recordHint(challengeId: string): number {
  const obj: Record<string, number> = (() => {
    try {
      const raw = localStorage.getItem(CTF_HINTS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  })();
  obj[challengeId] = (obj[challengeId] ?? 0) + 1;
  localStorage.setItem(CTF_HINTS_KEY, JSON.stringify(obj));
  return obj[challengeId];
}
