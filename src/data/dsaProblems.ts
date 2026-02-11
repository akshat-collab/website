import { DSA_PROBLEMS_GENERATED } from "./dsaProblems500.generated";

export type Difficulty = "Easy" | "Medium" | "Hard";

export interface DsaProblemExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface DsaProblem {
  id: string;
  title: string;
  difficulty: Difficulty;
  acceptance: number;
  tags: string[];
  description: string;
  examples: DsaProblemExample[];
  constraints: string[];
  boilerplate: Record<string, string>;
}

export const DSA_PROBLEMS: DsaProblem[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    acceptance: 47,
    tags: ["Array", "Hash Table"],
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "nums[0] + nums[1] == 9" },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
      { input: "nums = [3,3], target = 6", output: "[0,1]" },
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "Only one valid answer exists.",
    ],
    boilerplate: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // Your code here
  return [];
}`,
      typescript: `function twoSum(nums: number[], target: number): number[] {
  // Your code here
  return [];
}`,
      python: `from typing import List

def two_sum(nums: List[int], target: int) -> List[int]:
    # Your code here
    return []`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
        return new int[0];
    }
}`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Your code here
        return {};
    }
};`,
    },
  },
  {
    id: "valid-palindrome",
    title: "Valid Palindrome",
    difficulty: "Easy",
    acceptance: 42,
    tags: ["Two Pointers", "String"],
    description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string \`s\`, return \`true\` if it is a palindrome, or \`false\` otherwise.`,
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: "true", explanation: "amanaplanacanalpanama is a palindrome." },
      { input: 's = "race a car"', output: "false", explanation: "raceacar is not a palindrome." },
      { input: 's = " "', output: "true", explanation: "Empty string reads same forward and backward." },
    ],
    constraints: [
      "1 <= s.length <= 2 * 10^5",
      "s consists only of printable ASCII characters.",
    ],
    boilerplate: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isPalindrome(s) {
  // Your code here
  return false;
}`,
      typescript: `function isPalindrome(s: string): boolean {
  // Your code here
  return false;
}`,
      python: `def is_palindrome(s: str) -> bool:
    # Your code here
    return False`,
      java: `class Solution {
    public boolean isPalindrome(String s) {
        // Your code here
        return false;
    }
}`,
      cpp: `class Solution {
public:
    bool isPalindrome(string s) {
        // Your code here
        return false;
    }
};`,
    },
  },
  {
    id: "reverse-linked-list",
    title: "Reverse Linked List",
    difficulty: "Easy",
    acceptance: 68,
    tags: ["Linked List", "Recursion"],
    description: `Given the \`head\` of a singly linked list, reverse the list, and return the reversed list.`,
    examples: [
      { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" },
      { input: "head = [1,2]", output: "[2,1]" },
      { input: "head = []", output: "[]" },
    ],
    constraints: [
      "The number of nodes in the list is the range [0, 5000].",
      "-5000 <= Node.val <= 5000",
    ],
    boilerplate: {
      javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *   this.val = (val===undefined ? 0 : val)
 *   this.next = (next===undefined ? null : next)
 * }
 * @param {ListNode} head
 * @return {ListNode}
 */
function reverseList(head) {
  // Your code here
  return null;
}`,
      typescript: `class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val ?? 0;
    this.next = next ?? null;
  }
}

function reverseList(head: ListNode | null): ListNode | null {
  // Your code here
  return null;
}`,
      python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

def reverse_list(head: Optional[ListNode]) -> Optional[ListNode]:
    # Your code here
    return None`,
      java: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode reverseList(ListNode head) {
        // Your code here
        return null;
    }
}`,
      cpp: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        // Your code here
        return nullptr;
    }
};`,
    },
  },
  {
    id: "max-depth-binary-tree",
    title: "Maximum Depth of Binary Tree",
    difficulty: "Medium",
    acceptance: 72,
    tags: ["Tree", "DFS", "BFS"],
    description: `Given the \`root\` of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.`,
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "3" },
      { input: "root = [1,null,2]", output: "2" },
    ],
    constraints: [
      "The number of nodes in the tree is in the range [0, 10^4].",
      "-100 <= Node.val <= 100",
    ],
    boilerplate: {
      javascript: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *   this.val = (val===undefined ? 0 : val)
 *   this.left = (left===undefined ? 0 : left)
 *   this.right = (right===undefined ? 0 : right)
 * }
 * @param {TreeNode} root
 * @return {number}
 */
function maxDepth(root) {
  // Your code here
  return 0;
}`,
      typescript: `class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val ?? 0;
    this.left = left ?? null;
    this.right = right ?? null;
  }
}

function maxDepth(root: TreeNode | null): number {
  // Your code here
  return 0;
}`,
      python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

def max_depth(root: Optional[TreeNode]) -> int:
    # Your code here
    return 0`,
      java: `/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public int maxDepth(TreeNode root) {
        // Your code here
        return 0;
    }
}`,
      cpp: `/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    int maxDepth(TreeNode* root) {
        // Your code here
        return 0;
    }
};`,
    },
  },
  {
    id: "best-time-to-buy-sell",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Hard",
    acceptance: 52,
    tags: ["Array", "Dynamic Programming"],
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i\`th day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return \`0\`.`,
    examples: [
      { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy on day 2 (1), sell on day 5 (6), profit = 5." },
      { input: "prices = [7,6,4,3,1]", output: "0", explanation: "No profit possible." },
    ],
    constraints: [
      "1 <= prices.length <= 10^5",
      "0 <= prices[i] <= 10^4",
    ],
    boilerplate: {
      javascript: `/**
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit(prices) {
  // Your code here
  return 0;
}`,
      typescript: `function maxProfit(prices: number[]): number {
  // Your code here
  return 0;
}`,
      python: `def max_profit(prices: List[int]) -> int:
    # Your code here
    return 0`,
      java: `class Solution {
    public int maxProfit(int[] prices) {
        // Your code here
        return 0;
    }
}`,
      cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        // Your code here
        return 0;
    }
};`,
    },
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    acceptance: 40,
    tags: ["String", "Stack"],
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
- Open brackets must be closed by the same type of brackets.
- Open brackets must be closed in the correct order.
- Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      { input: 's = "()"', output: "true" },
      { input: 's = "()[]{}"', output: "true" },
      { input: 's = "(]"', output: "false" },
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'.",
    ],
    boilerplate: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
  // Your code here
  return false;
}`,
      typescript: `function isValid(s: string): boolean {
  // Your code here
  return false;
}`,
      python: `def is_valid(s: str) -> bool:
    # Your code here
    return False`,
      java: `class Solution {
    public boolean isValid(String s) {
        // Your code here
        return false;
    }
}`,
      cpp: `class Solution {
public:
    bool isValid(string s) {
        // Your code here
        return false;
    }
};`,
    },
  },
  {
    id: "add-two-numbers",
    title: "Add Two Numbers",
    difficulty: "Medium",
    acceptance: 40,
    tags: ["Linked List", "Math", "Recursion"],
    description: `You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.`,
    examples: [
      { input: "l1 = [2,4,3], l2 = [5,6,4]", output: "[7,0,8]", explanation: "342 + 465 = 807" },
      { input: "l1 = [0], l2 = [0]", output: "[0]" },
      { input: "l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]", output: "[8,9,9,9,0,0,0,1]" },
    ],
    constraints: [
      "The number of nodes in each linked list is in the range [1, 100].",
      "0 <= Node.val <= 9",
      "It is guaranteed that the list represents a number that does not have leading zeros.",
    ],
    boilerplate: {
      javascript: `/** @param {ListNode} l1 @param {ListNode} l2 @return {ListNode} */\nfunction addTwoNumbers(l1, l2) { return null; }`,
      typescript: `function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null { return null; }`,
      python: `def add_two_numbers(l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:\n    return None`,
      java: `public ListNode addTwoNumbers(ListNode l1, ListNode l2) { return null; }`,
      cpp: `ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) { return nullptr; }`,
    },
  },
  {
    id: "merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    acceptance: 58,
    tags: ["Linked List", "Recursion"],
    description: `You are given the heads of two sorted linked lists \`list1\` and \`list2\`. Merge the two lists into one sorted list. Return the head of the merged linked list.`,
    examples: [
      { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
      { input: "list1 = [], list2 = []", output: "[]" },
      { input: "list1 = [], list2 = [0]", output: "[0]" },
    ],
    constraints: [
      "The number of nodes in both lists is in the range [0, 50].",
      "-100 <= Node.val <= 100",
    ],
    boilerplate: {
      javascript: `/** @param {ListNode} list1 @param {ListNode} list2 @return {ListNode} */\nfunction mergeTwoLists(list1, list2) { return null; }`,
      typescript: `function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null { return null; }`,
      python: `def merge_two_lists(list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:\n    return None`,
      java: `public ListNode mergeTwoLists(ListNode list1, ListNode list2) { return null; }`,
      cpp: `ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) { return nullptr; }`,
    },
  },
  {
    id: "longest-common-prefix",
    title: "Longest Common Prefix",
    difficulty: "Easy",
    acceptance: 39,
    tags: ["String", "Trie"],
    description: `Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string \`""\`.`,
    examples: [
      { input: 'strs = ["flower","flow","flight"]', output: '"fl"' },
      { input: 'strs = ["dog","racecar","car"]', output: '""', explanation: "No common prefix" },
    ],
    constraints: [
      "1 <= strs.length <= 200",
      "0 <= strs[i].length <= 200",
      "strs[i] consists of lowercase English letters",
    ],
    boilerplate: {
      javascript: `/** @param {string[]} strs @return {string} */\nfunction longestCommonPrefix(strs) { return ""; }`,
      typescript: `function longestCommonPrefix(strs: string[]): string { return ""; }`,
      python: `def longest_common_prefix(strs: List[str]) -> str:\n    return ""`,
      java: `public String longestCommonPrefix(String[] strs) { return ""; }`,
      cpp: `string longestCommonPrefix(vector<string>& strs) { return ""; }`,
    },
  },
  {
    id: "remove-duplicates-from-sorted-array",
    title: "Remove Duplicates from Sorted Array",
    difficulty: "Easy",
    acceptance: 48,
    tags: ["Array", "Two Pointers"],
    description: `Given an integer array \`nums\` sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. Return the number of unique elements.`,
    examples: [
      { input: "nums = [1,1,2]", output: "2", explanation: "nums = [1,2,_]" },
      { input: "nums = [0,0,1,1,1,2,2,3,3,4]", output: "5", explanation: "nums = [0,1,2,3,4,_,_,_,_,_]" },
    ],
    constraints: [
      "1 <= nums.length <= 3 * 10^4",
      "-100 <= nums[i] <= 100",
    ],
    boilerplate: {
      javascript: `/** @param {number[]} nums @return {number} */\nfunction removeDuplicates(nums) { return 0; }`,
      typescript: `function removeDuplicates(nums: number[]): number { return 0; }`,
      python: `def remove_duplicates(nums: List[int]) -> int:\n    return 0`,
      java: `public int removeDuplicates(int[] nums) { return 0; }`,
      cpp: `int removeDuplicates(vector<int>& nums) { return 0; }`,
    },
  },
  {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    acceptance: 50,
    tags: ["Array", "Dynamic Programming", "Divide and Conquer"],
    description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return its sum.`,
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "Subarray [4,-1,2,1] has sum 6" },
      { input: "nums = [1]", output: "1" },
      { input: "nums = [5,4,-1,7,8]", output: "23" },
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4",
    ],
    boilerplate: {
      javascript: `/** @param {number[]} nums @return {number} */\nfunction maxSubArray(nums) { return 0; }`,
      typescript: `function maxSubArray(nums: number[]): number { return 0; }`,
      python: `def max_sub_array(nums: List[int]) -> int:\n    return 0`,
      java: `public int maxSubArray(int[] nums) { return 0; }`,
      cpp: `int maxSubArray(vector<int>& nums) { return 0; }`,
    },
  },
  {
    id: "climbing-stairs",
    title: "Climbing Stairs",
    difficulty: "Easy",
    acceptance: 51,
    tags: ["Math", "Dynamic Programming", "Memoization"],
    description: `You are climbing a staircase. It takes \`n\` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
    examples: [
      { input: "n = 2", output: "2", explanation: "1+1 or 2" },
      { input: "n = 3", output: "3", explanation: "1+1+1, 1+2, or 2+1" },
    ],
    constraints: [
      "1 <= n <= 45",
    ],
    boilerplate: {
      javascript: `/** @param {number} n @return {number} */\nfunction climbStairs(n) { return 0; }`,
      typescript: `function climbStairs(n: number): number { return 0; }`,
      python: `def climb_stairs(n: int) -> int:\n    return 0`,
      java: `public int climbStairs(int n) { return 0; }`,
      cpp: `int climbStairs(int n) { return 0; }`,
    },
  },
  {
    id: "same-tree",
    title: "Same Tree",
    difficulty: "Easy",
    acceptance: 55,
    tags: ["Tree", "DFS", "BFS", "Binary Tree"],
    description: `Given the roots of two binary trees \`p\` and \`q\`, write a function to check if they are the same or not. Two binary trees are the same if they are structurally identical, and the nodes have the same value.`,
    examples: [
      { input: "p = [1,2,3], q = [1,2,3]", output: "true" },
      { input: "p = [1,2], q = [1,null,2]", output: "false" },
      { input: "p = [1,2,1], q = [1,1,2]", output: "false" },
    ],
    constraints: [
      "The number of nodes in both trees is in the range [0, 100].",
      "-10^4 <= Node.val <= 10^4",
    ],
    boilerplate: {
      javascript: `/** @param {TreeNode} p @param {TreeNode} q @return {boolean} */\nfunction isSameTree(p, q) { return false; }`,
      typescript: `function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean { return false; }`,
      python: `def is_same_tree(p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:\n    return False`,
      java: `public boolean isSameTree(TreeNode p, TreeNode q) { return false; }`,
      cpp: `bool isSameTree(TreeNode* p, TreeNode* q) { return false; }`,
    },
  },
  {
    id: "symmetric-tree",
    title: "Symmetric Tree",
    difficulty: "Easy",
    acceptance: 51,
    tags: ["Tree", "DFS", "BFS", "Binary Tree"],
    description: `Given the \`root\` of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).`,
    examples: [
      { input: "root = [1,2,2,3,4,4,3]", output: "true" },
      { input: "root = [1,2,2,null,3,null,3]", output: "false" },
    ],
    constraints: [
      "The number of nodes in the tree is in the range [1, 1000].",
      "-100 <= Node.val <= 100",
    ],
    boilerplate: {
      javascript: `/** @param {TreeNode} root @return {boolean} */\nfunction isSymmetric(root) { return false; }`,
      typescript: `function isSymmetric(root: TreeNode | null): boolean { return false; }`,
      python: `def is_symmetric(root: Optional[TreeNode]) -> bool:\n    return False`,
      java: `public boolean isSymmetric(TreeNode root) { return false; }`,
      cpp: `bool isSymmetric(TreeNode* root) { return false; }`,
    },
  },
  {
    id: "plus-one",
    title: "Plus One",
    difficulty: "Easy",
    acceptance: 43,
    tags: ["Array", "Math"],
    description: `You are given a large integer represented as an integer array \`digits\`, where each \`digits[i]\` is the ith digit. Increment the large integer by one and return the resulting array of digits.`,
    examples: [
      { input: "digits = [1,2,3]", output: "[1,2,4]" },
      { input: "digits = [4,3,2,1]", output: "[4,3,2,2]" },
      { input: "digits = [9]", output: "[1,0]" },
    ],
    constraints: [
      "1 <= digits.length <= 100",
      "0 <= digits[i] <= 9",
    ],
    boilerplate: {
      javascript: `/** @param {number[]} digits @return {number[]} */\nfunction plusOne(digits) { return []; }`,
      typescript: `function plusOne(digits: number[]): number[] { return []; }`,
      python: `def plus_one(digits: List[int]) -> List[int]:\n    return []`,
      java: `public int[] plusOne(int[] digits) { return new int[0]; }`,
      cpp: `vector<int> plusOne(vector<int>& digits) { return {}; }`,
    },
  },
  {
    id: "sqrtx",
    title: "Sqrt(x)",
    difficulty: "Easy",
    acceptance: 36,
    tags: ["Math", "Binary Search"],
    description: `Given a non-negative integer \`x\`, return the square root of \`x\` rounded down to the nearest integer.`,
    examples: [
      { input: "x = 4", output: "2" },
      { input: "x = 8", output: "2", explanation: "sqrt(8) = 2.828... rounds down to 2" },
    ],
    constraints: [
      "0 <= x <= 2^31 - 1",
    ],
    boilerplate: {
      javascript: `/** @param {number} x @return {number} */\nfunction mySqrt(x) { return 0; }`,
      typescript: `function mySqrt(x: number): number { return 0; }`,
      python: `def my_sqrt(x: int) -> int:\n    return 0`,
      java: `public int mySqrt(int x) { return 0; }`,
      cpp: `int mySqrt(int x) { return 0; }`,
    },
  },
  ...DSA_PROBLEMS_GENERATED,
];

const problemMap = new Map(DSA_PROBLEMS.map((p) => [p.id, p]));

export function getDsaProblemById(id: string): DsaProblem | undefined {
  return problemMap.get(id);
}

export function getDsaProblemList() {
  return DSA_PROBLEMS;
}
