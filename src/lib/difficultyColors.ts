/**
 * Difficulty color grading — readable in light & dark themes
 */

export type Difficulty = "Easy" | "Medium" | "Hard";

export function difficultyBadgeClass(difficulty: string): string {
  switch (difficulty) {
    case "Easy":
      return "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30";
    case "Medium":
      return "bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30";
    case "Hard":
      return "bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30";
    default:
      return "bg-muted text-muted-foreground border border-border";
  }
}

export function difficultyDotClass(difficulty: string): string {
  switch (difficulty) {
    case "Easy":
      return "bg-emerald-500";
    case "Medium":
      return "bg-amber-500";
    case "Hard":
      return "bg-rose-500";
    default:
      return "bg-muted-foreground";
  }
}
