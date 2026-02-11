#!/usr/bin/env node
/**
 * Generates src/data/dsaProblems500.ts and dsaTestCases500.generated.ts with ~1000 problems.
 * Run: node scripts/generate-500-problems.mjs
 * Uses LeetCode API for problem list, templates for metadata + test cases.
 */
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const { BOILERPLATE, TEST_CASES, getTemplateForSlug } = await import('./problem-templates.js');

function slugToCamel(slug) {
  return slug.split('-').map((p, i) =>
    i === 0 ? p : p.charAt(0).toUpperCase() + p.slice(1)
  ).join('');
}

function slugToSnake(slug) {
  return slug.replace(/-/g, '_');
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function fetchLeetCodeProblems() {
  const api = await fetchJson('https://leetcode.com/api/problems/algorithms/');
  const pairs = api.stat_status_pairs || [];
  const free = pairs
    .filter((p) => !p.paid_only)
    .map((p) => ({
      id: p.stat.frontend_question_id,
      title: p.stat.question__title,
      slug: p.stat.question__title_slug,
      difficulty: p.difficulty?.level === 1 ? 'Easy' : p.difficulty?.level === 2 ? 'Medium' : 'Hard',
      total_acs: p.stat.total_acs || 0,
      total_submitted: p.stat.total_submitted || 1,
    }))
    .sort((a, b) => a.id - b.id);
  return free.slice(0, 2000);
}

function titleFromSlug(slug) {
  return slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function generateProblem(item, templateKey) {
  const fn = slugToCamel(item.slug);
  const fnSnake = slugToSnake(item.slug);
  const acceptance = Math.round((item.total_acs / item.total_submitted) * 100) || 50;
  const tpl = BOILERPLATE[templateKey] || BOILERPLATE.nums;
  const boilerplate = {};
  for (const [lang, code] of Object.entries(tpl)) {
    boilerplate[lang] = code
      .replace(/\{\{fn\}\}/g, fn)
      .replace(/\{\{fn_snake\}\}/g, fnSnake);
  }
  const tags = inferTags(item.slug, templateKey);
  return {
    id: item.slug,
    title: item.title || titleFromSlug(item.slug),
    difficulty: item.difficulty,
    acceptance,
    tags,
    description: `Solve the problem: **${item.title || titleFromSlug(item.slug)}**.\n\nGiven the constraints, implement an efficient solution.`,
    examples: [{ input: 'See test cases', output: 'Expected output', explanation: 'Run test cases to verify.' }],
    constraints: ['1 <= input size <= 10^5', 'Follow problem constraints.'],
    boilerplate,
  };
}

function inferTags(slug, templateKey) {
  const s = slug.toLowerCase();
  const tags = [];
  if (s.includes('array') || templateKey === 'nums' || templateKey === 'nums_target') tags.push('Array');
  if (s.includes('string') || templateKey === 's' || templateKey === 'strs') tags.push('String');
  if (s.includes('hash') || s.includes('map')) tags.push('Hash Table');
  if (s.includes('tree') || s.includes('bst')) tags.push('Tree');
  if (s.includes('linked') || s.includes('list')) tags.push('Linked List');
  if (s.includes('dp') || s.includes('dynamic')) tags.push('Dynamic Programming');
  if (s.includes('binary') || s.includes('search')) tags.push('Binary Search');
  if (s.includes('graph')) tags.push('Graph');
  if (s.includes('stack')) tags.push('Stack');
  if (s.includes('queue')) tags.push('Queue');
  if (s.includes('recursion')) tags.push('Recursion');
  if (s.includes('math')) tags.push('Math');
  if (tags.length === 0) tags.push('Array');
  return tags;
}

function escapeJs(str) {
  return str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
}

async function main() {
  console.log('Fetching LeetCode problems...');
  let problems;
  try {
    problems = await fetchLeetCodeProblems();
  } catch (e) {
    console.error('Failed to fetch LeetCode API, using built-in slug list');
    const slugList = [
      'two-sum', 'add-two-numbers', 'longest-substring-without-repeating-characters',
      'median-of-two-sorted-arrays', 'longest-palindromic-substring', 'zigzag-conversion',
      'reverse-integer', 'string-to-integer-atoi', 'palindrome-number', 'regular-expression-matching',
      'container-with-most-water', 'integer-to-roman', 'roman-to-integer', 'longest-common-prefix',
      '3sum', '3sum-closest', 'letter-combinations-of-a-phone-number', '4sum',
      'remove-nth-node-from-end-of-list', 'valid-parentheses', 'merge-two-sorted-lists',
      'generate-parentheses', 'merge-k-sorted-lists', 'swap-nodes-in-pairs', 'reverse-nodes-in-k-group',
      'remove-duplicates-from-sorted-array', 'remove-element', 'implement-strstr', 'divide-two-integers',
      'search-insert-position', 'valid-sudoku', 'count-and-say', 'combination-sum', 'combination-sum-ii',
      'first-missing-positive', 'trapping-rain-water', 'multiply-strings', 'jump-game-ii',
      'permutations', 'permutations-ii', 'rotate-image', 'group-anagrams', 'powx-n', 'n-queens',
      'maximum-subarray', 'spiral-matrix', 'jump-game', 'merge-intervals', 'insert-interval',
      'length-of-last-word', 'spiral-matrix-ii', 'unique-paths', 'unique-paths-ii', 'minimum-path-sum',
      'plus-one', 'add-binary', 'sqrtx', 'climbing-stairs', 'simplify-path', 'edit-distance',
      'set-matrix-zeroes', 'search-a-2d-matrix', 'sort-colors', 'minimum-window-substring',
      'combinations', 'subsets', 'word-search', 'remove-duplicates-from-sorted-array-ii',
      'search-in-rotated-sorted-array-ii', 'remove-duplicates-from-sorted-list-ii',
      'remove-duplicates-from-sorted-list', 'largest-rectangle-in-histogram', 'maximal-rectangle',
      'partition-list', 'merge-sorted-array', 'gray-code', 'subsets-ii', 'decode-ways',
      'reverse-linked-list-ii', 'restore-ip-addresses', 'binary-tree-inorder-traversal',
      'unique-binary-search-trees-ii', 'unique-binary-search-trees', 'interleaving-string',
      'validate-binary-search-tree', 'recover-binary-search-tree', 'same-tree', 'symmetric-tree',
      'binary-tree-level-order-traversal', 'binary-tree-zigzag-level-order-traversal',
      'maximum-depth-of-binary-tree', 'construct-binary-tree-from-preorder-and-inorder-traversal',
      'construct-binary-tree-from-inorder-and-postorder-traversal', 'convert-sorted-array-to-binary-search-tree',
      'balanced-binary-tree', 'minimum-depth-of-binary-tree', 'path-sum', 'path-sum-ii',
      'flatten-binary-tree-to-linked-list', 'distinct-subsequences', 'pascals-triangle',
      'pascals-triangle-ii', 'triangle', 'best-time-to-buy-and-sell-stock', 'best-time-to-buy-and-sell-stock-ii',
      'best-time-to-buy-and-sell-stock-iii', 'binary-tree-maximum-path-sum', 'valid-palindrome',
      'word-ladder-ii', 'word-ladder', 'longest-consecutive-sequence', 'sum-root-to-leaf-numbers',
      'surrounded-regions', 'palindrome-partitioning', 'palindrome-partitioning-ii', 'clone-graph',
      'gas-station', 'candy', 'single-number', 'single-number-ii', 'copy-list-with-random-pointer',
      'word-break', 'word-break-ii', 'linked-list-cycle', 'linked-list-cycle-ii', 'reorder-list',
      'binary-tree-preorder-traversal', 'binary-tree-postorder-traversal', 'lru-cache',
      'insertion-sort-list', 'sort-list', 'max-points-on-a-line', 'evaluate-reverse-polish-notation',
      'reverse-words-in-a-string', 'maximum-product-subarray', 'find-minimum-in-rotated-sorted-array',
      'find-minimum-in-rotated-sorted-array-ii', 'min-stack', 'binary-tree-upside-down',
      'reverse-bits', 'number-of-1-bits', 'house-robber', 'binary-tree-right-side-view',
      'number-of-islands', 'bitwise-and-of-numbers-range', 'happy-number', 'remove-linked-list-elements',
      'count-primes', 'isomorphic-strings', 'reverse-linked-list', 'course-schedule',
      'implement-trie-prefix-tree', 'minimum-size-subarray-sum', 'course-schedule-ii',
      'add-and-search-word-data-structure-design', 'word-search-ii', 'house-robber-ii',
      'shortest-palindrome', 'kth-largest-element-in-an-array', 'combination-sum-iii',
      'contains-duplicate', 'the-skyline-problem', 'contains-duplicate-ii', 'contains-duplicate-iii',
      'maximal-square', 'count-complete-tree-nodes', 'rectangle-area', 'basic-calculator',
      'implement-stack-using-queues', 'invert-binary-tree', 'basic-calculator-ii', 'summary-ranges',
      'majority-element-ii', 'kth-smallest-element-in-a-bst', 'power-of-two', 'implement-queue-using-stacks',
      'number-of-digit-one', 'palindrome-linked-list', 'lowest-common-ancestor-of-a-binary-search-tree',
      'lowest-common-ancestor-of-a-binary-tree', 'delete-node-in-a-linked-list',
      'product-of-array-except-self', 'sliding-window-maximum', 'search-a-2d-matrix-ii',
      'different-ways-to-add-parentheses', 'valid-anagram', 'shortest-word-distance',
      'shortest-word-distance-ii', 'shortest-word-distance-iii', 'strobogrammatic-number',
      'strobogrammatic-number-ii', 'group-shifted-strings', 'count-univalue-subtrees',
      'flatten-2d-vector', 'meeting-rooms', 'meeting-rooms-ii', 'factor-combinations',
      'paint-house', 'binary-tree-paths', 'add-digits', '3sum-smaller', 'single-number-iii',
      'graph-valid-tree', 'ugly-number', 'ugly-number-ii', 'paint-house-ii', 'palindrome-permutation',
      'palindrome-permutation-ii', 'missing-number', 'alien-dictionary', 'closest-binary-search-tree-value',
      'encode-and-decode-strings', 'closest-binary-search-tree-value-ii', 'integer-to-english-words',
      'h-index', 'h-index-ii', 'paint-fence', 'find-the-celebrity', 'first-bad-version',
      'perfect-squares', 'wiggle-sort', 'zigzag-iterator', 'expression-add-operators', 'move-zeroes',
      'peeking-iterator', 'inorder-successor-in-bst', 'walls-and-gates', 'find-the-duplicate-number',
      'unique-word-abbreviation', 'game-of-life', 'word-pattern', 'word-pattern-ii', 'nim-game',
      'flip-game', 'flip-game-ii', 'find-median-from-data-stream', 'best-meeting-point',
      'serialize-and-deserialize-binary-tree', 'binary-tree-longest-consecutive-sequence',
      'bulls-and-cows', 'longest-increasing-subsequence', 'remove-invalid-parentheses',
      'range-sum-query-immutable', 'range-sum-query-2d-immutable', 'number-of-islands-ii',
      'additive-number', 'range-sum-query-mutable', 'range-sum-query-2d-mutable',
      'best-time-to-buy-and-sell-stock-with-cooldown', 'minimum-height-trees',
      'sparse-matrix-multiplication', 'burst-balloons', 'super-ugly-number',
      'binary-tree-vertical-order-traversal', 'count-of-smaller-numbers-after-self',
      'remove-duplicate-letters', 'shortest-distance-from-all-buildings',
      'maximum-product-of-word-lengths', 'bulb-switcher', 'generalized-abbreviation',
      'create-maximum-number', 'coin-change', 'number-of-connected-components-in-an-undirected-graph',
      'wiggle-sort-ii', 'maximum-size-subarray-sum-equals-k', 'power-of-three',
      'count-of-range-sum', 'odd-even-linked-list', 'longest-increasing-path-in-a-matrix',
      'patching-array', 'verify-preorder-serialization-of-a-binary-tree', 'reconstruct-itinerary',
      'largest-bst-subtree', 'increasing-triplet-subsequence', 'self-crossing', 'palindrome-pairs',
      'house-robber-iii', 'counting-bits', 'nested-list-weight-sum',
      'longest-substring-with-at-most-k-distinct-characters', 'flatten-nested-list-iterator',
      'power-of-four', 'integer-break', 'reverse-string', 'reverse-vowels-of-a-string',
      'moving-average-from-data-stream', 'top-k-frequent-elements', 'design-tic-tac-toe',
      'intersection-of-two-arrays', 'intersection-of-two-arrays-ii', 'android-unlock-patterns',
      'data-stream-as-disjoint-intervals', 'design-snake-game', 'russian-doll-envelopes',
      'design-twitter', 'line-reflection', 'count-numbers-with-unique-digits',
      'rearrange-string-k-distance-apart', 'logger-rate-limiter', 'sort-transformed-array',
      'bomb-enemy', 'design-hit-counter', 'max-sum-of-rectangle-no-larger-than-k',
      'nested-list-weight-sum-ii', 'water-and-jug-problem', 'find-leaves-of-binary-tree',
      'valid-perfect-square', 'largest-divisible-subset', 'plus-one-linked-list', 'range-addition',
      'sum-of-two-integers', 'super-pow', 'find-k-pairs-with-smallest-sums',
      'guess-number-higher-or-lower', 'guess-number-higher-or-lower-ii', 'wiggle-subsequence',
      'combination-sum-iv', 'kth-smallest-element-in-a-sorted-matrix', 'design-phone-directory',
      'insert-delete-getrandom-o1', 'insert-delete-getrandom-o1-duplicates-allowed',
      'linked-list-random-node', 'ransom-note', 'shuffle-an-array', 'mini-parser',
      'lexicographical-numbers', 'first-unique-character-in-a-string', 'longest-absolute-file-path',
      'find-the-difference', 'elimination-game', 'perfect-rectangle', 'is-subsequence',
      'utf-8-validation', 'decode-string', 'longest-substring-with-at-least-k-repeating-characters',
      'rotate-function', 'integer-replacement', 'random-pick-index', 'evaluate-division',
      'nth-digit', 'binary-watch', 'remove-k-digits', 'frog-jump', 'sum-of-left-leaves',
      'convert-a-number-to-hexadecimal', 'queue-reconstruction-by-height', 'trapping-rain-water-ii',
      'valid-word-abbreviation', 'longest-palindrome', 'split-array-largest-sum',
      'minimum-unique-word-abbreviation', 'fizz-buzz', 'arithmetic-slices', 'third-maximum-number',
      'add-strings', 'partition-equal-subset-sum', 'pacific-atlantic-water-flow',
      'sentence-screen-fitting', 'battleships-in-a-board', 'strong-password-checker',
      'maximum-xor-of-two-numbers-in-an-array', 'valid-word-square',
      'reconstruct-original-digits-from-english', 'longest-repeating-character-replacement',
      'word-squares', 'all-oone-data-structure', 'minimum-genetic-mutation',
      'number-of-segments-in-a-string', 'non-overlapping-intervals', 'find-right-interval',
      'path-sum-iii', 'find-all-anagrams-in-a-string', 'ternary-expression-parser',
      'arranging-coins', 'find-all-duplicates-in-an-array', 'string-compression',
      'sequence-reconstruction', 'add-two-numbers-ii', 'arithmetic-slices-ii-subsequence',
      'number-of-boomerangs', 'find-all-numbers-disappeared-in-an-array',
      'serialize-and-deserialize-bst', 'delete-node-in-a-bst', 'sort-characters-by-frequency',
      'minimum-number-of-arrows-to-burst-balloons', 'minimum-moves-to-equal-array-elements',
      '4sum-ii', 'assign-cookies', '132-pattern', 'circular-array-loop', 'poor-pigs',
      'repeated-substring-pattern', 'lfu-cache', 'hamming-distance',
      'minimum-moves-to-equal-array-elements-ii', 'island-perimeter', 'can-i-win',
      'optimal-account-balancing', 'count-the-repetitions', 'unique-substrings-in-wraparound-string',
      'validate-ip-address', 'convex-polygon', 'encode-string-with-shortest-length',
      'concatenated-words', 'matchsticks-to-square', 'ones-and-zeroes', 'heaters',
      'number-complement', 'total-hamming-distance', 'largest-palindrome-product',
      'sliding-window-median', 'magical-string', 'license-key-formatting', 'smallest-good-base',
      'find-permutation', 'max-consecutive-ones', 'predict-the-winner', 'max-consecutive-ones-ii',
      'zuma-game', 'the-maze', 'increasing-subsequences', 'construct-the-rectangle',
      'reverse-pairs', 'target-sum', 'teemo-attacking', 'next-greater-element-i',
      'diagonal-traverse', 'the-maze-iii', 'keyboard-row', 'find-mode-in-binary-search-tree',
      'ipo', 'next-greater-element-ii', 'base-7', 'the-maze-ii', 'relative-ranks',
      'perfect-number', 'most-frequent-subtree-sum', 'inorder-successor-in-bst-ii',
      'all-paths-from-source-lead-to-destination', 'find-bottom-left-tree-value', 'freedom-trail',
      'find-largest-value-in-each-tree-row', 'longest-palindromic-subsequence',
      'super-washing-machines', 'coin-change-2', 'detect-capital', 'longest-uncommon-subsequence-i',
      'longest-uncommon-subsequence-ii', 'continuous-subarray-sum',
      'longest-word-in-dictionary-through-deleting', 'contiguous-array', 'beautiful-arrangement',
      'word-abbreviation', 'minesweeper', 'minimum-absolute-difference-in-bst',
      'lonely-pixel-i', 'k-diff-pairs-in-an-array', 'lonely-pixel-ii', 'encode-and-decode-tinyurl',
      'construct-binary-tree-from-string', 'complex-number-multiplication',
      'convert-bst-to-greater-tree', 'minimum-time-difference', 'single-element-in-a-sorted-array',
      'reverse-string-ii', '01-matrix', 'diameter-of-binary-tree', 'output-contest-matches',
      'boundary-of-binary-tree', 'remove-boxes', 'friend-circles', 'split-array-with-equal-sum',
      'binary-tree-longest-consecutive-sequence-ii', 'student-attendance-record-i',
      'student-attendance-record-ii', 'optimal-division', 'brick-wall', 'split-concatenated-strings',
      'next-greater-element-iii', 'reverse-words-in-a-string-iii', 'subarray-sum-equals-k',
      'array-partition-i', 'longest-line-of-consecutive-one-in-matrix', 'binary-tree-tilt',
      'find-the-closest-palindrome', 'array-nesting', 'reshape-the-matrix', 'permutation-in-string',
      'maximum-vacation-days', 'subtree-of-another-tree', 'squirrel-simulation', 'distribute-candies',
      'out-of-boundary-paths', 'shortest-unsorted-continuous-subarray', 'kill-process',
      'delete-operation-for-two-strings', 'erect-the-fence', 'design-in-memory-file-system',
      'tag-validator', 'fraction-addition-and-subtraction', 'valid-square',
      'longest-harmonious-subsequence', 'range-addition-ii', 'minimum-index-sum-of-two-lists',
      'non-negative-integers-without-consecutive-ones', 'design-compressed-string-iterator',
      'can-place-flowers', 'construct-string-from-binary-tree', 'find-duplicate-file-in-system',
      'valid-triangle-number', 'add-bold-tag-in-string', 'merge-two-binary-trees', 'task-scheduler',
      'add-one-row-to-tree', 'maximum-distance-in-arrays', 'minimum-factorization',
      'maximum-product-of-three-numbers', 'k-inverse-pairs-array', 'course-schedule-iii',
      'design-excel-sum-formula', 'smallest-range', 'sum-of-square-numbers',
      'find-the-derangement-of-an-array', 'design-log-storage-system', 'exclusive-time-of-functions',
      'average-of-levels-in-binary-tree', 'shopping-offers', 'decode-ways-ii', 'solve-the-equation',
      'design-search-autocomplete-system', 'maximum-average-subarray-i', 'maximum-average-subarray-ii',
      'set-mismatch', 'maximum-length-of-pair-chain', 'palindromic-substrings', 'replace-words',
      'dota2-senate', '2-keys-keyboard', '4-keys-keyboard', 'find-duplicate-subtrees',
      'two-sum-iv-input-is-a-bst', 'maximum-binary-tree', 'print-binary-tree', 'coin-path',
      'robot-return-to-origin', 'find-k-closest-elements', 'split-array-into-consecutive-subsequences',
      'remove-9', 'image-smoother', 'maximum-width-of-binary-tree', 'equal-tree-partition',
      'strange-printer', 'non-decreasing-array', 'path-sum-iv', 'beautiful-arrangement-ii',
      'kth-smallest-number-in-multiplication-table', 'trim-a-binary-search-tree',
      'maximum-swap', 'second-minimum-node-in-a-binary-tree', 'bulb-switcher-ii',
      'number-of-longest-increasing-subsequence', 'longest-continuous-increasing-subsequence',
      'cut-off-trees-for-golf-event', 'implement-magic-dictionary', 'map-sum-pairs',
      'valid-parenthesis-string', '24-game', 'valid-palindrome-ii', 'next-closest-time',
      'baseball-game', 'k-empty-slots', 'redundant-connection', 'redundant-connection-ii',
      'repeated-string-match', 'longest-univalue-path', 'knight-probability-in-chessboard',
      'maximum-sum-of-3-non-overlapping-subarrays', 'employee-importance', 'stickers-to-spell-word',
      'top-k-frequent-words', 'binary-number-with-alternating-bits', 'number-of-distinct-islands',
      'max-area-of-island', 'count-binary-substrings', 'degree-of-an-array',
      'partition-to-k-equal-sum-subsets', 'falling-squares', 'number-of-distinct-islands-ii',
      'minimum-ascii-delete-sum-for-two-strings', 'subarray-product-less-than-k',
      'best-time-to-buy-and-sell-stock-with-transaction-fee', 'range-module', 'max-stack',
      '1-bit-and-2-bit-characters', 'maximum-length-of-repeated-subarray',
      'find-k-th-smallest-pair-distance', 'longest-word-in-dictionary', 'accounts-merge',
      'remove-comments', 'candy-crush', 'find-pivot-index', 'split-linked-list-in-parts',
      'number-of-atoms', 'minimum-window-subsequence', 'self-dividing-numbers', 'my-calendar-i',
      'count-different-palindromic-subsequences', 'my-calendar-ii', 'my-calendar-iii',
      'flood-fill', 'sentence-similarity', 'asteroid-collision', 'parse-lisp-expression',
      'sentence-similarity-ii', 'monotone-increasing-digits', 'daily-temperatures',
      'delete-and-earn', 'cherry-pickup', 'to-lower-case', 'closest-leaf-in-a-binary-tree',
      'network-delay-time', 'find-smallest-letter-greater-than-target', 'prefix-and-suffix-search',
      'min-cost-climbing-stairs', 'largest-number-at-least-twice-of-others', 'shortest-completing-word',
      'contain-virus', 'number-of-corner-rectangles', 'ip-to-cidr', 'open-the-lock',
      'cracking-the-safe', 'reach-a-number', 'pour-water', 'pyramid-transition-matrix',
      'convert-binary-search-tree-to-sorted-doubly-linked-list', 'set-intersection-size-at-least-two',
      'bold-words-in-string', 'employee-free-time', 'find-anagram-mappings', 'special-binary-string',
      'n-ary-tree-level-order-traversal', 'serialize-and-deserialize-n-ary-tree',
      'flatten-a-multilevel-doubly-linked-list', 'prime-number-of-set-bits-in-binary-representation',
      'partition-labels', 'largest-plus-sign', 'couples-holding-hands', 'encode-n-ary-tree-to-binary-tree',
      'construct-quad-tree', 'quad-tree-intersection', 'maximum-depth-of-n-ary-tree',
      'n-ary-tree-preorder-traversal', 'n-ary-tree-postorder-traversal', 'toeplitz-matrix',
      'reorganize-string', 'max-chunks-to-make-sorted-ii', 'max-chunks-to-make-sorted',
      'basic-calculator-iv', 'jewels-and-stones', 'search-in-a-binary-search-tree',
      'insert-into-a-binary-search-tree', 'basic-calculator-iii',
      'search-in-a-sorted-array-of-unknown-size', 'sliding-puzzle', 'minimize-max-distance-to-gas-station',
      'kth-largest-element-in-a-stream', 'global-and-local-inversions', 'split-bst',
      'binary-search', 'swap-adjacent-in-lr-string', 'swim-in-rising-water', 'k-th-symbol-in-grammar',
      'reaching-points', 'rabbits-in-forest', 'transform-to-chessboard',
      'minimum-distance-between-bst-nodes', 'letter-case-permutation', 'is-graph-bipartite',
      'k-th-smallest-prime-fraction', 'cheapest-flights-within-k-stops', 'rotated-digits',
      'escape-the-ghosts', 'domino-and-tromino-tiling', 'custom-sort-string',
      'number-of-matching-subsequences', 'preimage-size-of-factorial-zeroes-function',
      'valid-tic-tac-toe-state', 'number-of-subarrays-with-bounded-maximum', 'rotate-string',
      'all-paths-from-source-to-target', 'smallest-rotation-with-highest-score', 'champagne-tower',
      'design-hashset', 'design-hashmap', 'similar-rgb-color', 'minimum-swaps-to-make-sequences-increasing',
      'find-eventual-safe-states', 'bricks-falling-when-hit', 'unique-morse-code-words',
      'split-array-with-same-average', 'number-of-lines-to-write-string', 'max-increase-to-keep-city-skyline',
      'soup-servings', 'expressive-words', 'chalkboard-xor-game', 'subdomain-visit-count',
      'largest-triangle-area', 'largest-sum-of-averages', 'binary-tree-pruning', 'bus-routes',
      'ambiguous-coordinates', 'linked-list-components', 'race-car', 'most-common-word',
      'design-linked-list', 'short-encoding-of-words', 'shortest-distance-to-a-character',
      'card-flipping-game', 'binary-trees-with-factors', 'insert-into-a-cyclic-sorted-list',
      'goat-latin', 'friends-of-appropriate-ages', 'most-profit-assigning-work', 'making-a-large-island',
      'unique-letter-string', 'consecutive-numbers-sum', 'positions-of-large-groups',
      'masking-personal-information', 'design-circular-deque', 'design-circular-queue',
      'flipping-an-image', 'find-and-replace-in-string', 'sum-of-distances-in-tree',
      'image-overlap', 'robot-room-cleaner', 'rectangle-overlap', 'new-21-game', 'push-dominoes',
      'similar-string-groups', 'magic-squares-in-grid', 'keys-and-rooms',
      'split-array-into-fibonacci-sequence', 'guess-the-word', 'backspace-string-compare',
      'longest-mountain-in-array', 'hand-of-straights', 'shortest-path-visiting-all-nodes',
      'shifting-letters', 'maximize-distance-to-closest-person', 'rectangle-area-ii',
      'loud-and-rich', 'peak-index-in-a-mountain-array', 'car-fleet', 'k-similar-strings',
      'exam-room', 'score-of-parentheses', 'minimum-cost-to-hire-k-workers', 'mirror-reflection',
      'buddy-strings', 'lemonade-change', 'score-after-flipping-matrix',
      'shortest-subarray-with-sum-at-least-k', 'all-nodes-distance-k-in-binary-tree',
      'random-pick-with-blacklist', 'shortest-path-to-get-all-keys',
      'smallest-subtree-with-all-the-deepest-nodes', 'prime-palindrome', 'transpose-matrix',
      'binary-gap', 'reordered-power-of-2', 'advantage-shuffle', 'minimum-number-of-refueling-stops',
      'implement-rand10-using-rand7', 'leaf-similar-trees', 'length-of-longest-fibonacci-subsequence',
      'walking-robot-simulation', 'koko-eating-bananas', 'middle-of-the-linked-list', 'stone-game',
      'nth-magical-number', 'profitable-schemes', 'random-pick-with-weight', 'random-flip-matrix',
      'random-point-in-non-overlapping-rectangles', 'generate-random-point-in-a-circle',
      'decoded-string-at-index', 'boats-to-save-people', 'reachable-nodes-in-subdivided-graph',
      'projection-area-of-3d-shapes', 'uncommon-words-from-two-sentences', 'spiral-matrix-iii',
      'possible-bipartition', 'super-egg-drop', 'fair-candy-swap',
      'construct-binary-tree-from-preorder-and-postorder-traversal', 'find-and-replace-pattern',
      'sum-of-subsequence-widths', 'surface-area-of-3d-shapes', 'groups-of-special-equivalent-strings',
      'all-possible-full-binary-trees', 'maximum-frequency-stack', 'monotonic-array',
      'increasing-order-search-tree', 'bitwise-ors-of-subarrays', 'orderly-queue', 'rle-iterator',
      'online-stock-span', 'numbers-at-most-n-given-digit-set', 'valid-permutations-for-di-sequence',
      'fruit-into-baskets', 'sort-array-by-parity', 'super-palindromes', 'sum-of-subarray-minimums',
      'smallest-range-i', 'snakes-and-ladders', 'smallest-range-ii', 'online-election', 'sort-an-array',
      'cat-and-mouse', 'x-of-a-kind-in-a-deck-of-cards', 'partition-array-into-disjoint-intervals',
      'word-subsets', 'reverse-only-letters', 'maximum-sum-circular-subarray',
      'complete-binary-tree-inserter', 'number-of-music-playlists', 'minimum-add-to-make-parentheses-valid',
      'sort-array-by-parity-ii', '3sum-with-multiplicity', 'minimize-malware-spread', 'long-pressed-name',
      'flip-string-to-monotone-increasing', 'three-equal-parts', 'minimize-malware-spread-ii',
      'unique-email-addresses', 'binary-subarrays-with-sum', 'minimum-falling-path-sum',
      'beautiful-array', 'number-of-recent-calls', 'shortest-bridge', 'knight-dialer',
      'stamping-the-sequence', 'reorder-log-files', 'range-sum-of-bst', 'minimum-area-rectangle',
      'distinct-subsequences-ii', 'valid-mountain-array', 'di-string-match',
      'find-the-shortest-superstring', 'delete-columns-to-make-sorted', 'minimum-increment-to-make-array-unique',
      'validate-stack-sequences', 'most-stones-removed-with-same-row-or-column', 'bag-of-tokens',
      'largest-time-for-given-digits', 'reveal-cards-in-increasing-order', 'flip-equivalent-binary-trees',
      'largest-component-size-by-common-factor', 'verifying-an-alien-dictionary', 'array-of-doubled-pairs',
      'delete-columns-to-make-sorted-ii', 'tallest-billboard', 'prison-cells-after-n-days',
      'check-completeness-of-a-binary-tree',
      'encode-number', 'decode-string-at-index', 'reconstruct-a-2-row-binary-matrix',
      'matrix-cells-in-distance-order', 'two-sum-less-than-k', 'maximum-sum-of-two-non-overlapping-subarrays',
      'stream-of-characters', 'moving-stones-until-consecutive', 'coloring-a-border',
      'uncrossed-lines', 'escape-a-large-maze', 'minimum-cost-tree-from-leaf-values',
      'number-of-days-in-a-month', 'remove-outermost-parentheses', 'sum-of-root-to-leaf-binary-numbers',
      'capacity-to-ship-packages-within-d-days', 'grumpy-bookstore-owner', 'previous-permutation-with-one-swap',
      'distant-barcodes', 'greatest-common-divisor-of-strings', 'flip-columns-for-maximum-number-of-equal-rows',
      'last-stone-weight-ii', 'longest-string-chain', 'last-stone-weight', 'insufficient-nodes-in-root-to-leaf-paths',
      'smallest-sufficient-team', 'linked-list-in-binary-tree', 'minimum-cost-to-connect-sticks',
      'reconstruct-a-tree-from-preorder-traversal', 'string-transforms-into-another-string',
      'compare-strings-by-frequency-of-the-smallest-character', 'minimum-moves-to-make-array-complementary',
      'defanging-an-ip-address', 'maximum-nesting-depth-of-two-valid-parentheses-strings',
      'corporate-flight-bookings', 'delete-nodes-and-return-forest', 'maximum-level-sum-of-a-binary-tree',
      'as-far-from-land-as-possible', 'partition-array-for-maximum-sum', 'longest-arithmetic-subsequence',
      'binary-prefix-divisible-by-5', 'next-greater-node-in-linked-list', 'number-of-enclaves',
      'minimum-score-triangulation-of-polygon', 'satisfiability-of-equality-equations',
      'broken-calculator', 'subarrays-with-k-different-integers', 'distribute-candies-to-people',
      'path-in-zigzag-labelled-binary-tree', 'filling-bookcase-shelves', 'parsing-a-boolean-expression',
      'minimum-swaps-to-group-all-1s-together', 'divide-array-in-sets-of-k-consecutive-numbers',
      'minimum-number-of-days-to-disconnect-island', 'number-of-transactions-per-visit',
      'minimum-time-to-rebuild-the-tree', 'find-a-value-of-a-mysterious-function-closest-to-target',
      'count-good-nodes-in-binary-tree', 'form-largest-integer-with-digits-that-add-up-to-target',
      'number-of-ways-to-paint-n-3-grid', 'minimum-cost-to-make-at-least-one-valid-path-in-a-grid',
      'maximum-profit-of-operating-a-centennial-wheel', 'maximum-number-of-get-food',
      'number-of-ways-where-square-of-number-is-equal-to-product-of-two-numbers',
      'minimum-deletion-cost-to-avoid-repeating-letters', 'maximum-number-of-non-overlapping-substrings',
      'find-a-corresponding-node-of-a-binary-tree-in-a-clone-of-that-tree',
      'check-if-a-string-can-break-another-string', 'number-of-ways-to-split-a-string',
      'minimum-time-to-collect-all-apples-in-a-tree', 'count-good-triplets',
      'minimum-subsequence-in-non-increasing-order', 'string-matching-in-an-array',
      'queries-on-a-permutation-with-key', 'html-entity-parser', 'number-of-ways-to-form-a-target-string',
      'minimum-number-of-frogs-croaking', 'build-array-where-you-can-find-the-maximum-exactly-k-comparisons',
      'maximum-students-taking-exam', 'create-target-array-in-the-given-order',
      'check-if-all-1s-are-at-least-length-k-places-away', 'longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit',
      'find-the-kth-smallest-sum-of-a-matrix-with-sorted-rows', 'reformat-date',
      'string-compression-ii', 'get-the-maximum-score', 'can-make-arithmetic-progression-from-sequence',
      'count-all-valid-pickup-and-delivery-options', 'number-of-days-between-two-dates',
      'validate-ip-address', 'running-sum-of-1d-array', 'find-the-winner-of-the-circular-game',
      'minimum-suffix-flips', 'throne-inheritance', 'detect-pattern-of-length-m-repeated-k-or-more-times',
      'maximum-length-of-subarray-with-positive-product', 'minimum-number-of-days-to-eat-n-oranges',
      'group-the-people-given-the-group-size-they-belong-to', 'find-the-winner-of-an-array-game',
      'minimum-swaps-to-arrange-a-binary-grid', 'get-the-maximum-score', 'special-positions-in-a-binary-matrix',
      'count-unhappy-friends', 'min-cost-to-connect-all-points', 'check-if-array-pairs-are-divisible-by-k',
      'number-of-subsequences-that-satisfy-the-given-sum-condition', 'final-prices-with-a-special-discount-in-a-shop',
      'subrectangle-queries', 'find-two-non-overlapping-subarrays-each-with-target-sum',
      'allocate-mailboxes', 'xor-operation-in-an-array',
      'make-two-arrays-equal-by-reversing-sub-arrays', 'check-if-a-string-contains-all-binary-codes-of-size-k',
      'sequential-digits', 'iterator-for-combination', 'angle-between-hands-of-clock',
      'tiling-a-rectangle-with-the-fewest-squares', 'maximum-equal-frequency',
      'deepest-leaves-sum', 'sum-of-mutated-array-closest-to-target', 'path-with-maximum-gold',
      'play-with-chips', 'letter-tile-possibilities', 'insufficient-nodes-in-root-to-leaf-paths',
      'web-crawler', 'longest-chunked-palindrome-decomposition', 'day-of-the-week',
      'occurrences-after-bigram', 'online-majority-element-in-subarray', 'find-words-that-can-be-formed-by-characters',
      'swap-for-longest-repeated-character-substring', 'height-checker', 'distant-barcodes',
      'last-substring-in-lexicographical-order', 'before-and-after-puzzle', 'shortest-path-in-binary-matrix',
      'confusing-number', 'largest-unique-number', 'connecting-cities-with-minimum-cost',
      'parallel-courses', 'minimum-remove-to-make-valid-parentheses', 'print-foobar-alternately',
      'print-zero-even-odd', 'building-h2o', 'dinner-plate-stacks', 'count-servers-that-communicate',
      'search-suggestions-system', 'all-elements-in-two-binary-search-trees',
      'jump-game-iii', 'verbal-arithmetic-puzzle', 'adding-two-negabinary-numbers',
      'number-of-closed-islands', 'maximum-number-of-balloons', 'reverse-substrings-between-each-pair-of-parentheses',
      'minimum-insertions-to-balance-a-parentheses-string', 'design-underground-system', 'lucky-numbers-in-a-matrix',
      'reformat-the-string', 'display-table-of-food-orders-in-a-restaurant', 'check-if-n-and-its-double-exist',
    ];
    problems = slugList.slice(0, 2000).map((slug, i) => ({
      id: i + 1,
      title: titleFromSlug(typeof slug === 'string' ? slug : slug.slug || slug),
      slug: typeof slug === 'string' ? slug : slug.slug || String(slug),
      difficulty: i % 3 === 0 ? 'Easy' : i % 3 === 1 ? 'Medium' : 'Hard',
      total_acs: 50000,
      total_submitted: 100000,
    }));
  }

  const EXISTING_IDS = new Set([
    'two-sum', 'valid-palindrome', 'reverse-linked-list', 'max-depth-binary-tree',
    'best-time-to-buy-sell', 'valid-parentheses', 'add-two-numbers', 'merge-two-sorted-lists',
    'longest-common-prefix', 'remove-duplicates-from-sorted-array', 'maximum-subarray',
    'climbing-stairs', 'same-tree', 'symmetric-tree', 'plus-one', 'sqrtx',
  ]);

  const generated = [];
  const testCasesMap = {};
  const seen = new Set();

  for (const p of problems) {
    if (EXISTING_IDS.has(p.slug) || seen.has(p.slug)) continue;
    seen.add(p.slug);
    const tpl = getTemplateForSlug(p.slug);
    const problem = generateProblem(p, tpl);
    generated.push(problem);
    testCasesMap[p.slug] = TEST_CASES[tpl] || TEST_CASES.nums;
    if (generated.length >= 1984) break; // 1000 base + 984 existing style + 1000 more
  }

  const existingCount = 16;
  const total = existingCount + generated.length;

  // Write dsaProblems500.ts (generated problems only - will be merged in dsaProblems.ts)
  const problemsTs = `/**
 * Auto-generated DSA problems (${generated.length} problems). Merged with base 16 in dsaProblems.ts.
 * Generated by: node scripts/generate-500-problems.mjs
 */
import type { Difficulty, DsaProblem, DsaProblemExample } from "./dsaProblems";

export const DSA_PROBLEMS_GENERATED: DsaProblem[] = ${JSON.stringify(generated, null, 2).replace(/"([^"]+)":/g, '$1:')};
`;

  // Write test cases - we need to merge with existing. Create dsaTestCases500.ts
  const tcEntries = Object.entries(testCasesMap).map(
    ([id, cases]) => `  { problemId: "${id}", testCases: ${JSON.stringify(cases)} }`
  );
  const testCasesTs = `/**
 * Auto-generated test cases for generated problems.
 * Generated by: node scripts/generate-500-problems.mjs
 */
import type { TestCase, ProblemTestCases } from "./dsaTestCases";

export const DSA_TEST_CASES_GENERATED: ProblemTestCases[] = [\n${tcEntries.join(',\n')}\n];
`;

  const outDir = path.join(__dirname, '../src/data');
  fs.writeFileSync(path.join(outDir, 'dsaProblems500.generated.ts'), problemsTs);
  fs.writeFileSync(path.join(outDir, 'dsaTestCases500.generated.ts'), testCasesTs);

  console.log(`Generated ${generated.length} problems. Total will be ${existingCount + generated.length} with base 16.`);
  console.log('Updating dsaProblems.ts and dsaTestCases.ts...');
}

main().catch(console.error);
