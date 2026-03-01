#!/usr/bin/env node
/**
 * Generates ~1000 CTF challenges with validator-based flag derivation.
 * Run: npm run generate:ctf
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function toBase64(s) {
  return Buffer.from(s, "utf8").toString("base64");
}
function toHex(s) {
  return Buffer.from(s, "utf8").toString("hex");
}
function rot13(s) {
  return s.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= "Z" ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
  });
}
function caesarEncrypt(s, shift) {
  return s.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= "Z" ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + shift + 26) % 26) + base);
  });
}
function xorHex(s, key) {
  return Buffer.from(s, "utf8")
    .map((b) => b ^ key)
    .toString("hex");
}
function reverse(s) {
  return s.split("").reverse().join("");
}
function toBinary(s) {
  return s
    .split("")
    .map((c) => c.charCodeAt(0).toString(2).padStart(8, "0"))
    .join(" ");
}
function toAsciiCodes(s) {
  return s
    .split("")
    .map((c) => c.charCodeAt(0))
    .join(" ");
}

function esc(s) {
  return JSON.stringify(s);
}

const challenges = [];
let idx = 0;

// Helper to add challenge
function add(c) {
  challenges.push(c);
  idx++;
}

// ─── Base64 (200) ─────────────────────────────────────────────────────────
for (let i = 1; i <= 200; i++) {
  const ans = `TMAI{base64_${String(i).padStart(3, "0")}}`;
  const enc = toBase64(ans);
  const diff = i <= 80 ? "beginner" : i <= 140 ? "intermediate" : "advanced";
  const pts = i <= 80 ? 25 : i <= 140 ? 35 : 45;
  const hintPen = i <= 80 ? 5 : i <= 140 ? 10 : 15;
  add({
    id: `base64-${i}`,
    type: "encoding",
    title: `Base64 Decode #${i}`,
    description: `Decode: ${enc}`,
    difficulty: diff,
    points: pts,
    hints: ["Use atob() or an online Base64 decoder.", ans],
    hintPenalty: hintPen,
    validator: "base64",
    encoded: enc,
    content: { encoded: enc },
  });
}

// ─── Hex (200) ──────────────────────────────────────────────────────────────
for (let i = 1; i <= 200; i++) {
  const ans = `TMAI{hex_${String(i).padStart(3, "0")}}`;
  const enc = toHex(ans);
  const diff = i <= 80 ? "beginner" : i <= 140 ? "intermediate" : "advanced";
  const pts = i <= 80 ? 25 : i <= 140 ? 35 : 45;
  const hintPen = i <= 80 ? 5 : i <= 140 ? 10 : 15;
  add({
    id: `hex-${i}`,
    type: "encoding",
    title: `Hex to ASCII #${i}`,
    description: `Convert to ASCII: ${enc}`,
    difficulty: diff,
    points: pts,
    hints: ["Each pair of hex digits = one byte.", ans],
    hintPenalty: hintPen,
    validator: "hex",
    encoded: enc,
    content: {},
  });
}

// ─── ROT13 (150) ───────────────────────────────────────────────────────────
for (let i = 1; i <= 150; i++) {
  const ans = `TMAI{rot13_${String(i).padStart(3, "0")}}`;
  const enc = rot13(ans);
  const diff = i <= 50 ? "beginner" : i <= 100 ? "intermediate" : "advanced";
  const pts = i <= 50 ? 30 : i <= 100 ? 40 : 50;
  const hintPen = i <= 50 ? 5 : i <= 100 ? 10 : 15;
  add({
    id: `rot13-${i}`,
    type: "encoding",
    title: `ROT13 #${i}`,
    description: `Decode: ${enc}`,
    difficulty: diff,
    points: pts,
    hints: ["ROT13 shifts each letter by 13.", ans],
    hintPenalty: hintPen,
    validator: "rot13",
    encoded: enc,
    content: {},
  });
}

// ─── Caesar (100) ──────────────────────────────────────────────────────────
for (let i = 1; i <= 100; i++) {
  const shift = (i % 25) + 1;
  const ans = `TMAI{caesar_${String(i).padStart(3, "0")}}`;
  const enc = caesarEncrypt(ans, shift);
  const diff = i <= 40 ? "beginner" : i <= 70 ? "intermediate" : "advanced";
  const pts = i <= 40 ? 35 : i <= 70 ? 45 : 55;
  const hintPen = i <= 40 ? 5 : i <= 70 ? 10 : 15;
  add({
    id: `caesar-${i}`,
    type: "encoding",
    title: `Caesar Cipher #${i}`,
    description: `Decode (shift ${shift}): ${enc}`,
    difficulty: diff,
    points: pts,
    hints: [`Shift each letter by ${shift} (forward or backward).`, ans],
    hintPenalty: hintPen,
    validator: "caesar",
    encoded: enc,
    shift,
    content: { shift },
  });
}

// ─── XOR (80) ───────────────────────────────────────────────────────────────
for (let i = 1; i <= 80; i++) {
  const key = (i % 256) || 0x42;
  const ans = `TMAI{xor_${String(i).padStart(3, "0")}}`;
  const enc = xorHex(ans, key);
  const diff = i <= 30 ? "intermediate" : "advanced";
  const pts = i <= 30 ? 50 : 75;
  add({
    id: `xor-${i}`,
    type: "encoding",
    title: `XOR Cipher #${i}`,
    description: `Flag XOR'd with key 0x${key.toString(16).padStart(2, "0")}. Hex: ${enc}`,
    difficulty: diff,
    points: pts,
    hints: ["XOR is reversible: A XOR B XOR B = A", ans],
    hintPenalty: 15,
    validator: "xor",
    encoded: enc,
    key,
    content: { key },
  });
}

// ─── Reverse (60) ──────────────────────────────────────────────────────────
for (let i = 1; i <= 60; i++) {
  const ans = `TMAI{reverse_${String(i).padStart(3, "0")}}`;
  const enc = reverse(ans);
  add({
    id: `reverse-${i}`,
    type: "encoding",
    title: `Reverse #${i}`,
    description: `Reverse this: ${enc}`,
    difficulty: "beginner",
    points: 20,
    hints: ["Read the string backwards.", ans],
    hintPenalty: 5,
    validator: "exact",
    expected: ans,
    content: {},
  });
}

// ─── Binary (60) ───────────────────────────────────────────────────────────
for (let i = 1; i <= 60; i++) {
  const ans = `TMAI{bin_${String(i).padStart(3, "0")}}`;
  const enc = toBinary(ans);
  const diff = i <= 30 ? "beginner" : "intermediate";
  const pts = i <= 30 ? 30 : 45;
  add({
    id: `binary-${i}`,
    type: "encoding",
    title: `Binary to Text #${i}`,
    description: `Convert binary to ASCII: ${enc}`,
    difficulty: diff,
    points: pts,
    hints: ["Each 8 bits = one character.", ans],
    hintPenalty: 5,
    validator: "exact",
    expected: ans,
    content: {},
  });
}

// ─── ASCII codes (50) ───────────────────────────────────────────────────────
for (let i = 1; i <= 50; i++) {
  const ans = `TMAI{ascii_${String(i).padStart(3, "0")}}`;
  const enc = toAsciiCodes(ans);
  const diff = i <= 25 ? "beginner" : "intermediate";
  const pts = i <= 25 ? 30 : 45;
  add({
    id: `ascii-${i}`,
    type: "encoding",
    title: `ASCII Codes #${i}`,
    description: `Convert to text (space-separated): ${enc}`,
    difficulty: diff,
    points: pts,
    hints: ["Each number is a character code (chr/fromCharCode).", ans],
    hintPenalty: 5,
    validator: "exact",
    expected: ans,
    content: {},
  });
}

// ─── Logic sequences (80) ───────────────────────────────────────────────────
const seqs = [
  { seq: [2, 4, 8, 16], next: 32, hint: "Each term is double the previous." },
  { seq: [1, 3, 5, 7], next: 9, hint: "Odd numbers." },
  { seq: [1, 1, 2, 3, 5], next: 8, hint: "Fibonacci." },
  { seq: [1, 4, 9, 16], next: 25, hint: "Squares: 1², 2², 3²..." },
  { seq: [2, 3, 5, 7, 11], next: 13, hint: "Prime numbers." },
  { seq: [1, 2, 4, 8], next: 16, hint: "Powers of 2." },
  { seq: [3, 6, 9, 12], next: 15, hint: "Multiples of 3." },
  { seq: [1, 2, 6, 24], next: 120, hint: "Factorials: 1!, 2!, 3!..." },
];
for (let i = 0; i < 80; i++) {
  const s = seqs[i % seqs.length];
  const diff = i < 40 ? "beginner" : i < 60 ? "intermediate" : "advanced";
  const pts = i < 40 ? 30 : i < 60 ? 45 : 60;
  add({
    id: `logic-seq-${i + 1}`,
    type: "logic",
    title: `Sequence #${i + 1}`,
    description: `Find the next number: ${s.seq.join(", ")}, ?`,
    difficulty: diff,
    points: pts,
    hints: [s.hint, String(s.next)],
    hintPenalty: 5,
    validator: "exact",
    expected: String(s.next),
    content: { sequence: s.seq },
  });
}

// ─── Fibonacci (50) ────────────────────────────────────────────────────────
function fib(n) {
  let a = 1, b = 1;
  for (let i = 2; i < n; i++) [a, b] = [b, a + b];
  return b;
}
for (let i = 5; i <= 54; i++) {
  const ans = fib(i);
  const diff = i <= 15 ? "beginner" : i <= 35 ? "intermediate" : "advanced";
  const pts = i <= 15 ? 35 : i <= 35 ? 50 : 65;
  add({
    id: `logic-fib-${i}`,
    type: "logic",
    title: `Fibonacci #${i}`,
    description: `The ${i}th Fibonacci number (F1=1, F2=1). Submit the number.`,
    difficulty: diff,
    points: pts,
    hints: ["F(n) = F(n-1) + F(n-2)", String(ans)],
    hintPenalty: 5,
    validator: "exact",
    expected: String(ans),
    content: {},
  });
}

// ─── Primes (40) ───────────────────────────────────────────────────────────
function nthPrime(n) {
  const primes = [];
  for (let p = 2; primes.length < n; p++) {
    if (primes.every((x) => p % x !== 0)) primes.push(p);
  }
  return primes[n - 1];
}
for (let i = 5; i <= 44; i++) {
  const ans = nthPrime(i);
  const diff = i <= 15 ? "beginner" : i <= 30 ? "intermediate" : "advanced";
  const pts = i <= 15 ? 40 : i <= 30 ? 55 : 70;
  add({
    id: `logic-prime-${i}`,
    type: "logic",
    title: `Prime #${i}`,
    description: `What is the ${i}th prime number? (2 is the 1st)`,
    difficulty: diff,
    points: pts,
    hints: ["Primes: 2,3,5,7,11,13...", String(ans)],
    hintPenalty: 10,
    validator: "exact",
    expected: String(ans),
    content: {},
  });
}

// ─── Sum series (30) ───────────────────────────────────────────────────────
for (let i = 1; i <= 30; i++) {
  const n = 10 * i;
  const ans = (n * (n + 1)) / 2;
  add({
    id: `logic-sum-${i}`,
    type: "logic",
    title: `Sum #${i}`,
    description: `1 + 2 + 3 + ... + ${n} = ?`,
    difficulty: "beginner",
    points: 25,
    hints: ["n(n+1)/2", String(ans)],
    hintPenalty: 5,
    validator: "exact",
    expected: String(ans),
    content: {},
  });
}

// ─── DSA: Factorial (40) ──────────────────────────────────────────────────
function fact(n) {
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}
for (let i = 5; i <= 44; i++) {
  const ans = fact(i);
  const diff = i <= 15 ? "beginner" : i <= 30 ? "intermediate" : "advanced";
  const pts = i <= 15 ? 25 : i <= 30 ? 40 : 55;
  add({
    id: `dsa-fact-${i}`,
    type: "dsa",
    title: `Factorial #${i}`,
    description: `What is ${i}!?`,
    difficulty: diff,
    points: pts,
    hints: [`${i}! = ${i} × (${i}-1) × ... × 1`, String(ans)],
    hintPenalty: 5,
    validator: "exact",
    expected: String(ans),
    content: {},
  });
}

// ─── DSA: Two Sum variants (30) ────────────────────────────────────────────
const twoSums = [
  { arr: [2, 7, 11, 15], target: 9, smaller: 2 },
  { arr: [3, 2, 4], target: 6, smaller: 2 },
  { arr: [1, 5, 3, 7], target: 8, smaller: 1 },
  { arr: [10, 20, 30, 40], target: 50, smaller: 10 },
  { arr: [4, 5, 6, 7], target: 11, smaller: 4 },
];
for (let i = 0; i < 30; i++) {
  const t = twoSums[i % twoSums.length];
  add({
    id: `dsa-twosum-${i + 1}`,
    type: "dsa",
    title: `Two Sum #${i + 1}`,
    description: `In [${t.arr.join(",")}], two numbers sum to ${t.target}. Submit the smaller.`,
    difficulty: "beginner",
    points: 35,
    hints: [`${t.smaller} + ${t.target - t.smaller} = ${t.target}`, String(t.smaller)],
    hintPenalty: 5,
    validator: "exact",
    expected: String(t.smaller),
    content: { arr: t.arr, target: t.target },
  });
}

// ─── Misc word (50) ────────────────────────────────────────────────────────
const words = ["flag", "code", "hack", "win", "solve", "capture", "key", "secret", "cipher", "decode"];
for (let i = 1; i <= 50; i++) {
  const w = words[(i - 1) % words.length];
  const ans = `TMAI{${w}_${i}}`;
  add({
    id: `misc-${i}`,
    type: "encoding",
    title: `Misc #${i}`,
    description: `The answer is ${ans}. Submit it.`,
    difficulty: "beginner",
    points: 15,
    hints: ["Read the description.", ans],
    hintPenalty: 3,
    validator: "exact",
    expected: ans,
    content: {},
  });
}

// ─── Build output ───────────────────────────────────────────────────────────
const base64Challs = challenges.filter((c) => c.validator === "base64");
const hexChalls = challenges.filter((c) => c.validator === "hex");
const rot13Challs = challenges.filter((c) => c.validator === "rot13");
const caesarChalls = challenges.filter((c) => c.validator === "caesar");
const xorChalls = challenges.filter((c) => c.validator === "xor");
const exactChalls = challenges.filter((c) => c.validator === "exact");

function buildValidator(c) {
  if (c.validator === "base64") {
    return `(s) => encodings.base64Decode(${esc(c.encoded)}) === s.trim()`;
  }
  if (c.validator === "hex") {
    return `(s) => encodings.hexDecode(${esc(c.encoded)}).toLowerCase() === s.trim().toLowerCase()`;
  }
  if (c.validator === "rot13") {
    return `(s) => encodings.rot13(${esc(c.encoded)}).toLowerCase() === s.trim().toLowerCase()`;
  }
  if (c.validator === "caesar") {
    return `(s) => encodings.caesar(${esc(c.encoded)}, ${c.shift}).toLowerCase() === s.trim().toLowerCase()`;
  }
  if (c.validator === "xor") {
    return `(s) => encodings.xor(${esc(c.encoded)}, ${c.key}) === s.trim()`;
  }
  if (c.validator === "exact") {
    return `(s) => s.trim() === ${esc(c.expected)}`;
  }
  return `(s) => false`;
}

const items = challenges.map((c) => {
  const v = buildValidator(c);
  return `  {
    id: ${esc(c.id)},
    type: ${esc(c.type)},
    title: ${esc(c.title)},
    description: ${esc(c.description)},
    difficulty: ${esc(c.difficulty)},
    points: ${c.points},
    hints: ${JSON.stringify(c.hints)},
    hintPenalty: ${c.hintPenalty},
    validate: ${v},
    content: ${JSON.stringify(c.content)},
  }`;
});

const out = `/**
 * Auto-generated CTF challenges (~1000). Validator-based, no plain flags.
 * Run: npm run generate:ctf
 */
import { encodings } from "./ctfCore";
import type { CtfChallenge } from "./ctfChallenges";

export const CTF_CHALLENGES_GENERATED: CtfChallenge[] = [
${items.join(",\n")}
];
`;

const outPath = path.join(__dirname, "../src/features/ctf/ctfChallenges.generated.ts");
fs.writeFileSync(outPath, out, "utf8");
console.log(`Generated ${challenges.length} CTF challenges at ${outPath}`);
console.log(`Breakdown: base64=${base64Challs.length} hex=${hexChalls.length} rot13=${rot13Challs.length} caesar=${caesarChalls.length} xor=${xorChalls.length} exact=${exactChalls.length}`);
