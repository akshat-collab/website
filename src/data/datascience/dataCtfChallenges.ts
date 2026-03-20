/**
 * CTF-Style Data Challenges
 * Gamified: points, time-based leaderboard, difficulty ranking
 */

import type { DataCtfChallenge } from "./schema";

export const DATA_CTF_CHALLENGES: DataCtfChallenge[] = [
  {
    id: "ds-ctf-1",
    title: "Hidden Feature Leakage",
    type: "feature_leakage",
    points: 100,
    difficulty: "medium",
    description:
      "Given a dataset, identify which feature leaks the target. The model achieves 99% accuracy—find the culprit column that makes it too good to be true.",
  },
  {
    id: "ds-ctf-2",
    title: "Corrupted Dataset Recovery",
    type: "corrupted_recovery",
    points: 150,
    difficulty: "hard",
    description:
      "A dataset has 30% corrupted rows (wrong types, outliers, encoding errors). Recover the clean dataset and submit the MD5 hash of the cleaned CSV.",
  },
  {
    id: "ds-ctf-3",
    title: "Reverse Engineered Model",
    type: "reverse_model",
    points: 200,
    difficulty: "expert",
    description:
      "A black-box model predicts 0/1. You have API access. Find the decision boundary and reconstruct the equivalent rule (e.g., if x>5 and y<3 then 1).",
  },
  {
    id: "ds-ctf-4",
    title: "Adversarial Input Detection",
    type: "adversarial",
    points: 120,
    difficulty: "hard",
    description:
      "Given a trained classifier, craft 10 inputs that flip the prediction. Submit the inputs that cause misclassification.",
  },
  {
    id: "ds-ctf-5",
    title: "Mystery Dataset Challenge",
    type: "mystery_dataset",
    points: 80,
    difficulty: "medium",
    description:
      "You receive an anonymized dataset (columns A, B, C...). Determine: What does it represent? What is the target? Build a model and achieve >70% accuracy.",
  },
];

export const DATA_CTF_LEADERBOARD_CONFIG = {
  timeBonus: true,
  timeDecayPerHour: 2,
  difficultyMultiplier: { easy: 1, medium: 1.5, hard: 2, expert: 3 },
};
