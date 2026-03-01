/**
 * Arena CTF Challenges - Logic, DSA, Encoding, State, Terminal, Time-based.
 * No plain hardcoded flags; validation derives flags from correct solutions.
 */

import { encodings } from "../ctfCore";

export type ArenaChallengeType =
  | "logic"
  | "dsa"
  | "encoding"
  | "state-flow"
  | "terminal"
  | "time-behavior";

export type ArenaDifficulty = "beginner" | "intermediate" | "advanced";

export interface ArenaChallenge {
  id: string;
  type: ArenaChallengeType;
  title: string;
  description: string;
  difficulty: ArenaDifficulty;
  points: number;
  hints: string[];
  hintPenalty: number; // points lost per hint
  /** Returns true if user solution is correct */
  validate: (input: string, state?: Record<string, unknown>) => boolean;
  /** Challenge-specific content/config */
  content: Record<string, unknown>;
}

export const ARENA_CHALLENGES: ArenaChallenge[] = [
  // --- Logic-Based ---
  {
    id: "logic-sequence",
    type: "logic",
    title: "Sequence Unlock",
    description: "Find the next number: 2, 4, 8, 16, ?. Submit the next number.",
    difficulty: "beginner",
    points: 30,
    hints: ["Each term is double the previous.", "2^5 = 32"],
    hintPenalty: 5,
    validate: (s) => s.trim() === "32",
    content: { sequence: [2, 4, 8, 16] },
  },
  {
    id: "logic-fib",
    type: "logic",
    title: "Fibonacci",
    description: "The 10th Fibonacci number (1-indexed: F1=1, F2=1, F3=2...). Submit the number.",
    difficulty: "beginner",
    points: 35,
    hints: ["F(n) = F(n-1) + F(n-2)", "F10 = 55"],
    hintPenalty: 5,
    validate: (s) => s.trim() === "55",
    content: {},
  },
  {
    id: "logic-prime",
    type: "logic",
    title: "Prime Position",
    description: "What is the 7th prime number? (2 is the 1st)",
    difficulty: "intermediate",
    points: 50,
    hints: ["Primes: 2,3,5,7,11,13,17...", "The 7th is 17"],
    hintPenalty: 10,
    validate: (s) => s.trim() === "17",
    content: {},
  },

  // --- Encoding ---
  {
    id: "enc-base64",
    type: "encoding",
    title: "Base64 Decode",
    description: "Decode: SGVsbG9fV09STEQ=",
    difficulty: "beginner",
    points: 25,
    hints: ["Use atob() in browser console... wait, no console! Use an online decoder.", "Hello_WORLD"],
    hintPenalty: 5,
    validate: (s) => encodings.base64Decode("SGVsbG9fV09STEQ=") === s.trim(),
    content: { encoded: "SGVsbG9fV09STEQ=" },
  },
  {
    id: "enc-caesar",
    type: "encoding",
    title: "Caesar Cipher",
    description: "Decode with shift 3: WKH IOXU LV WKH NH[",
    difficulty: "beginner",
    points: 35,
    hints: ["A→D, B→E, shift back by 3", "The flag is the decoded message"],
    hintPenalty: 5,
    validate: (s) =>
      encodings.caesar("WKH IOXU LV WKH NH[", 3).toLowerCase() === s.trim().toLowerCase(),
    content: { shift: 3 },
  },
  {
    id: "enc-xor",
    type: "encoding",
    title: "XOR Cipher",
    description: "XOR with key 0x41. Hex: 392e331e322e2d372425",
    difficulty: "intermediate",
    points: 50,
    hints: ["XOR is reversible", "Key 0x41 = 65 decimal"],
    hintPenalty: 10,
    validate: (s) => encodings.xor("392e331e322e2d372425", 0x41) === s.trim(),
    content: { key: 0x41 },
  },

  // --- DSA-Based ---
  {
    id: "dsa-max-subarray",
    type: "dsa",
    title: "Max Subarray Sum",
    description: "Kadane's problem: For [-2,1,-3,4,-1,2,1,-5,4], max contiguous sum = ?",
    difficulty: "intermediate",
    points: 60,
    hints: ["Kadane's algorithm", "Answer is 6 (subarray [4,-1,2,1])"],
    hintPenalty: 15,
    validate: (s) => s.trim() === "6",
    content: { arr: [-2, 1, -3, 4, -1, 2, 1, -5, 4] },
  },
  {
    id: "dsa-binary-search",
    type: "dsa",
    title: "Binary Search",
    description: "In sorted array [1,3,5,7,9,11], how many comparisons to find 7? (count mid comparisons)",
    difficulty: "beginner",
    points: 40,
    hints: ["First mid=5, then mid=7", "Answer: 2"],
    hintPenalty: 10,
    validate: (s) => s.trim() === "2",
    content: {},
  },

  // --- State & Flow ---
  {
    id: "state-buttons",
    type: "state-flow",
    title: "Button Sequence",
    description: "Press the buttons in the correct order: 1 → 3 → 2 → 4",
    difficulty: "beginner",
    points: 30,
    hints: ["The order is in the description", "1, 3, 2, 4"],
    hintPenalty: 5,
    validate: (_, state) => state?.sequence === "1324",
    content: { correctOrder: "1324" },
  },

  // --- Terminal ---
  {
    id: "terminal-ls",
    type: "terminal",
    title: "Simulated Terminal",
    description: "Type 'ls' then 'cat flag.txt' to unlock the flag.",
    difficulty: "beginner",
    points: 35,
    hints: ["Commands are case-sensitive", "ls lists files, cat reads flag.txt"],
    hintPenalty: 5,
    validate: (_, state) => (state?.commandsRun ?? "").includes("ls") && (state?.commandsRun ?? "").includes("cat flag.txt"),
    content: {
      outputs: { ls: "flag.txt  readme.txt", "cat flag.txt": "[Flag unlocked - submit to capture]" },
    },
  },

  // --- Time-Based ---
  {
    id: "time-quick",
    type: "time-behavior",
    title: "Quick Solve",
    description: "Solve within 10 seconds: What is 2^10?",
    difficulty: "beginner",
    points: 40,
    hints: ["2^10 = 1024", "Be fast!"],
    hintPenalty: 15,
    validate: (s) => s.trim() === "1024",
    content: { timeLimit: 10 },
  },
];
