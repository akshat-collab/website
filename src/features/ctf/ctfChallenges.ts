/**
 * CTF Challenge Registry - Frontend-safe, validator-based.
 * No plain hardcoded flags. Flags derived from correct solutions via ctfCore.
 */

import { encodings } from "./ctfCore";
import { CTF_CHALLENGES_GENERATED } from "./ctfChallenges.generated";

export type CtfChallengeType =
  | "logic"
  | "dsa"
  | "encoding"
  | "state-flow"
  | "terminal"
  | "time-behavior";

export type CtfDifficulty = "beginner" | "intermediate" | "advanced";

export interface CtfChallenge {
  id: string;
  type: CtfChallengeType;
  title: string;
  description: string;
  difficulty: CtfDifficulty;
  points: number;
  hints: string[];
  hintPenalty: number;
  /** Returns true if user solution is correct. For state/terminal, state holds the solution. */
  validate: (input: string, state?: Record<string, unknown>) => boolean;
  content: Record<string, unknown>;
}

export const CTF_CHALLENGES: CtfChallenge[] = [
  // ─── Logic-Based Unlock ─────────────────────────────────────────────────
  {
    id: "logic-welcome",
    type: "logic",
    title: "Welcome",
    description: "Your first flag! Submit the number 42.",
    difficulty: "beginner",
    points: 10,
    hints: ["The answer to life, the universe, and everything."],
    hintPenalty: 2,
    validate: (s) => s.trim() === "42",
    content: {},
  },
  {
    id: "logic-sequence",
    type: "logic",
    title: "Sequence Unlock",
    description: "Find the next number: 2, 4, 8, 16, ?",
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
  {
    id: "logic-sum-series",
    type: "logic",
    title: "Sum of Series",
    description: "1 + 2 + 3 + ... + 100 = ?",
    difficulty: "beginner",
    points: 25,
    hints: ["n(n+1)/2", "5050"],
    hintPenalty: 5,
    validate: (s) => s.trim() === "5050",
    content: {},
  },

  // ─── Encoding & Decoding ─────────────────────────────────────────────────
  {
    id: "enc-base64",
    type: "encoding",
    title: "Base64 Decode",
    description: "Decode: SGVsbG9fV09STEQ=",
    difficulty: "beginner",
    points: 25,
    hints: ["Use an online Base64 decoder or implement atob().", "Hello_WORLD"],
    hintPenalty: 5,
    validate: (s) => encodings.base64Decode("SGVsbG9fV09STEQ=") === s.trim(),
    content: { encoded: "SGVsbG9fV09STEQ=" },
  },
  {
    id: "enc-hex",
    type: "encoding",
    title: "Hex to ASCII",
    description: "Convert to text: 546563684d6173746572",
    difficulty: "beginner",
    points: 25,
    hints: ["Each pair of hex digits = one byte.", "TechMaster"],
    hintPenalty: 5,
    validate: (s) => encodings.hexDecode("546563684d6173746572").toLowerCase() === s.trim().toLowerCase(),
    content: {},
  },
  {
    id: "enc-rot13",
    type: "encoding",
    title: "ROT13",
    description: "Decode: GUR SYNT VF GUR NAFJRE",
    difficulty: "beginner",
    points: 30,
    hints: ["ROT13 shifts each letter by 13.", "The flag is the answer"],
    hintPenalty: 5,
    validate: (s) => encodings.rot13("GUR SYNT VF GUR NAFJRE").toLowerCase() === s.trim().toLowerCase(),
    content: {},
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
    hints: ["XOR is reversible: A XOR B XOR B = A", "Key 0x41 = 65 decimal"],
    hintPenalty: 10,
    validate: (s) => encodings.xor("392e331e322e2d372425", 0x41) === s.trim(),
    content: { key: 0x41 },
  },
  {
    id: "enc-binary",
    type: "encoding",
    title: "Binary to Text",
    description: "Convert: 01001000 01101001 (space-separated 8-bit groups)",
    difficulty: "beginner",
    points: 30,
    hints: ["Each 8 bits = one ASCII character.", "Hi"],
    hintPenalty: 5,
    validate: (s) => {
      const bin = "01001000 01101001".replace(/\s/g, "");
      const decoded = bin.match(/.{8}/g)?.map((b) => String.fromCharCode(parseInt(b, 2))).join("") ?? "";
      return decoded.toLowerCase() === s.trim().toLowerCase();
    },
    content: {},
  },

  // ─── DSA-Based ───────────────────────────────────────────────────────────
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
    title: "Binary Search Comparisons",
    description: "In sorted array [1,3,5,7,9,11], how many comparisons to find 7? (count mid comparisons)",
    difficulty: "beginner",
    points: 40,
    hints: ["First mid=5, then mid=7", "Answer: 2"],
    hintPenalty: 10,
    validate: (s) => s.trim() === "2",
    content: {},
  },
  {
    id: "dsa-factorial",
    type: "dsa",
    title: "Factorial",
    description: "What is 6! (6 factorial)?",
    difficulty: "beginner",
    points: 25,
    hints: ["6! = 6 × 5 × 4 × 3 × 2 × 1", "720"],
    hintPenalty: 5,
    validate: (s) => s.trim() === "720",
    content: {},
  },
  {
    id: "dsa-gcd",
    type: "dsa",
    title: "Greatest Common Divisor",
    description: "GCD(48, 18) = ?",
    difficulty: "beginner",
    points: 30,
    hints: ["Euclidean algorithm", "6"],
    hintPenalty: 5,
    validate: (s) => s.trim() === "6",
    content: {},
  },
  {
    id: "dsa-two-sum",
    type: "dsa",
    title: "Two Sum",
    description: "In [2,7,11,15], two numbers sum to 9. Submit the smaller number.",
    difficulty: "beginner",
    points: 35,
    hints: ["2 + 7 = 9", "2"],
    hintPenalty: 5,
    validate: (s) => s.trim() === "2",
    content: {},
  },

  // ─── State & Flow ────────────────────────────────────────────────────────
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
  {
    id: "state-toggle",
    type: "state-flow",
    title: "Toggle Master",
    description: "Press A, then B, then A again (order matters).",
    difficulty: "intermediate",
    points: 45,
    hints: ["A → B → A", "Follow the sequence exactly"],
    hintPenalty: 10,
    validate: (_, state) => state?.sequence === "ABA",
    content: { correctOrder: "ABA", buttons: ["A", "B"] },
  },

  // ─── Simulated Terminal ──────────────────────────────────────────────────
  {
    id: "terminal-ls",
    type: "terminal",
    title: "Simulated Terminal",
    description: "Type 'ls' then 'cat flag.txt' to unlock the flag.",
    difficulty: "beginner",
    points: 35,
    hints: ["Commands are case-sensitive", "ls lists files, cat reads flag.txt"],
    hintPenalty: 5,
    validate: (_, state) =>
      (state?.commandsRun ?? "").includes("ls") &&
      (state?.commandsRun ?? "").includes("cat flag.txt"),
    content: {
      outputs: {
        ls: "flag.txt  readme.txt",
        "cat flag.txt": "[Flag unlocked - capture it below]",
        "cat readme.txt": "Welcome. Use ls and cat to explore.",
      },
    },
  },
  {
    id: "terminal-pwd",
    type: "terminal",
    title: "Navigate & Read",
    description: "Run: pwd, then ls, then cat secret.txt",
    difficulty: "intermediate",
    points: 50,
    hints: ["Run commands in order", "pwd → ls → cat secret.txt"],
    hintPenalty: 10,
    validate: (_, state) => {
      const run = (state?.commandsRun ?? "") as string;
      return run.includes("pwd") && run.includes("ls") && run.includes("cat secret.txt");
    },
    content: {
      outputs: {
        pwd: "/home/ctf",
        ls: "secret.txt  config",
        "cat secret.txt": "[Flag unlocked - capture below]",
        "cat config": "config file contents",
      },
    },
  },

  // ─── Time & Behavior ────────────────────────────────────────────────────
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
  {
    id: "time-efficiency",
    type: "time-behavior",
    title: "Efficiency Test",
    description: "Solve within 15 seconds: 7 × 8 × 9 = ?",
    difficulty: "beginner",
    points: 35,
    hints: ["7×8=56, 56×9=504", "504"],
    hintPenalty: 10,
    validate: (s) => s.trim() === "504",
    content: { timeLimit: 15 },
  },

  // ─── Generated challenges (~1000) ───────────────────────────────────────────
  ...CTF_CHALLENGES_GENERATED,
];
