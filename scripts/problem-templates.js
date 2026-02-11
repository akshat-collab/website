/**
 * Templates for generating problems. Each has paramNames, testCases, boilerplate.
 * Slug patterns map to template keys.
 */
// Use {{fn}} placeholder - replaced with camelCase slug (e.g. twoSum)
const BOILERPLATE = {
  nums_target: {
    javascript: `/** @param {number[]} nums @param {number} target @return {number[]} */\nfunction {{fn}}(nums, target) { return []; }`,
    typescript: `function {{fn}}(nums: number[], target: number): number[] { return []; }`,
    python: `def {{fn}}(nums: list, target: int) -> list: return []`,
    java: `public int[] {{fn}}(int[] nums, int target) { return new int[0]; }`,
    cpp: `vector<int> {{fn}}(vector<int>& nums, int target) { return {}; }`,
  },
  nums: {
    javascript: `/** @param {number[]} nums @return {number} */\nfunction {{fn}}(nums) { return 0; }`,
    typescript: `function {{fn}}(nums: number[]): number { return 0; }`,
    python: `def {{fn_snake}}(nums: list) -> int: return 0`,
    java: `public int {{fn}}(int[] nums) { return 0; }`,
    cpp: `int {{fn}}(vector<int>& nums) { return 0; }`,
  },
  s: {
    javascript: `/** @param {string} s @return {boolean} */\nfunction {{fn}}(s) { return false; }`,
    typescript: `function {{fn}}(s: string): boolean { return false; }`,
    python: `def {{fn_snake}}(s: str) -> bool: return False`,
    java: `public boolean {{fn}}(String s) { return false; }`,
    cpp: `bool {{fn}}(string s) { return false; }`,
  },
  n: {
    javascript: `/** @param {number} n @return {number} */\nfunction {{fn}}(n) { return 0; }`,
    typescript: `function {{fn}}(n: number): number { return 0; }`,
    python: `def {{fn_snake}}(n: int) -> int: return 0`,
    java: `public int {{fn}}(int n) { return 0; }`,
    cpp: `int {{fn}}(int n) { return 0; }`,
  },
  nums_k: {
    javascript: `/** @param {number[]} nums @param {number} k @return {number} */\nfunction {{fn}}(nums, k) { return 0; }`,
    typescript: `function {{fn}}(nums: number[], k: number): number { return 0; }`,
    python: `def {{fn_snake}}(nums: list, k: int) -> int: return 0`,
    java: `public int {{fn}}(int[] nums, int k) { return 0; }`,
    cpp: `int {{fn}}(vector<int>& nums, int k) { return 0; }`,
  },
  x: {
    javascript: `/** @param {number} x @return {number} */\nfunction {{fn}}(x) { return 0; }`,
    typescript: `function {{fn}}(x: number): number { return 0; }`,
    python: `def {{fn_snake}}(x: int) -> int: return 0`,
    java: `public int {{fn}}(int x) { return 0; }`,
    cpp: `int {{fn}}(int x) { return 0; }`,
  },
  strs: {
    javascript: `/** @param {string[]} strs @return {string} */\nfunction {{fn}}(strs) { return ""; }`,
    typescript: `function {{fn}}(strs: string[]): string { return ""; }`,
    python: `def {{fn_snake}}(strs: list) -> str: return ""`,
    java: `public String {{fn}}(String[] strs) { return ""; }`,
    cpp: `string {{fn}}(vector<string>& strs) { return ""; }`,
  },
  s_t: {
    javascript: `/** @param {string} s @param {string} t @return {boolean} */\nfunction {{fn}}(s, t) { return false; }`,
    typescript: `function {{fn}}(s: string, t: string): boolean { return false; }`,
    python: `def {{fn_snake}}(s: str, t: str) -> bool: return False`,
    java: `public boolean {{fn}}(String s, String t) { return false; }`,
    cpp: `bool {{fn}}(string s, string t) { return false; }`,
  },
  grid: {
    javascript: `/** @param {number[][]} grid @return {number} */\nfunction {{fn}}(grid) { return 0; }`,
    typescript: `function {{fn}}(grid: number[][]): number { return 0; }`,
    python: `def {{fn_snake}}(grid: list) -> int: return 0`,
    java: `public int {{fn}}(int[][] grid) { return 0; }`,
    cpp: `int {{fn}}(vector<vector<int>>& grid) { return 0; }`,
  },
};

const TEST_CASES = {
  nums_target: [
    { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] },
    { input: { nums: [3, 2, 4], target: 6 }, expected: [1, 2] },
    { input: { nums: [3, 3], target: 6 }, expected: [0, 1] },
  ],
  nums: [
    { input: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4] }, expected: 6 },
    { input: { nums: [1] }, expected: 1 },
    { input: { nums: [5, 4, -1, 7, 8] }, expected: 23 },
  ],
  s: [
    { input: { s: "A man, a plan, a canal: Panama" }, expected: true },
    { input: { s: "race a car" }, expected: false },
    { input: { s: " " }, expected: true },
  ],
  n: [
    { input: { n: 2 }, expected: 2 },
    { input: { n: 3 }, expected: 3 },
    { input: { n: 1 }, expected: 1 },
  ],
  nums_k: [
    { input: { nums: [3, 2, 1, 5, 6, 4], k: 2 }, expected: 5 },
    { input: { nums: [3, 2, 3, 1, 2, 4, 5, 5, 6], k: 4 }, expected: 4 },
    { input: { nums: [1], k: 1 }, expected: 1 },
  ],
  x: [
    { input: { x: 4 }, expected: 2 },
    { input: { x: 8 }, expected: 2 },
    { input: { x: 0 }, expected: 0 },
  ],
  strs: [
    { input: { strs: ["flower", "flow", "flight"] }, expected: "fl" },
    { input: { strs: ["dog", "racecar", "car"] }, expected: "" },
  ],
  s_t: [
    { input: { s: "anagram", t: "nagaram" }, expected: true },
    { input: { s: "rat", t: "car" }, expected: false },
  ],
  grid: [
    { input: { grid: [[1, 1], [1, 1]] }, expected: 4 },
    { input: { grid: [[0, 0, 0], [0, 1, 0]] }, expected: 1 },
  ],
};

function getTemplateForSlug(slug) {
  const s = slug.toLowerCase();
  if (s.includes('two-sum') || s.includes('2sum') || s.includes('3sum') || s.includes('4sum')) return 'nums_target';
  if (s.includes('subarray') || s.includes('max') || s.includes('sum') || s.includes('product')) return 'nums';
  if (s.includes('palindrome') || s.includes('valid') || s.includes('string')) return 's';
  if (s.includes('climb') || s.includes('stair') || s.includes('fib')) return 'n';
  if (s.includes('kth') || s.includes('top-k') || s.includes('element')) return 'nums_k';
  if (s.includes('sqrt') || s.includes('sqrtx')) return 'x';
  if (s.includes('prefix') || s.includes('common')) return 'strs';
  if (s.includes('anagram')) return 's_t';
  if (s.includes('island') || s.includes('matrix') || s.includes('grid')) return 'grid';
  return 'nums';
}

export { BOILERPLATE, TEST_CASES, getTemplateForSlug };
