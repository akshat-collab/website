/**
 * LEVEL 1: Python Foundations - Full Content
 * Each topic: concept, 10 short exercises, 5 medium problems, 5 MCQs, 1 mini assignment
 */

import type { CodingExercise, Mcq, Topic } from "./schema";

export const LEVEL1_TOPICS: Omit<Topic, "shortExercises" | "mediumProblems" | "mcqs">[] = [
  { id: "t1-variables", levelId: "level-1", title: "Variables & Data Types", order: 1, conceptMarkdown: "" },
  { id: "t1-control", levelId: "level-1", title: "Control Flow", order: 2, conceptMarkdown: "" },
  { id: "t1-loops", levelId: "level-1", title: "Loops", order: 3, conceptMarkdown: "" },
  { id: "t1-functions", levelId: "level-1", title: "Functions", order: 4, conceptMarkdown: "" },
  { id: "t1-collections", levelId: "level-1", title: "Lists, Sets, Dicts", order: 5, conceptMarkdown: "" },
  { id: "t1-oop", levelId: "level-1", title: "OOP Basics", order: 6, conceptMarkdown: "" },
  { id: "t1-files", levelId: "level-1", title: "File Handling", order: 7, conceptMarkdown: "" },
  { id: "t1-exceptions", levelId: "level-1", title: "Exception Handling", order: 8, conceptMarkdown: "" },
];

// Concept markdown for Topic 1 - Variables (example)
export const T1_VARIABLES_CONCEPT = `
# Variables & Data Types

## Variables
Variables store data. In Python, you assign with \`=\`.
\`\`\`python
x = 10
name = "Alice"
\`\`\`

## Data Types
- **int**: integers (1, -5, 0)
- **float**: decimals (3.14, -0.5)
- **str**: strings ("hello", 'world')
- **bool**: True, False
- **list**: [1, 2, 3]
- **dict**: {"key": "value"}

## Type Conversion
\`\`\`python
int("42")   # 42
str(42)     # "42"
float("3.14")  # 3.14
\`\`\`
`;

export const LEVEL1_EXERCISES: CodingExercise[] = [
  // Topic 1 - Variables - 10 short
  {
    id: "l1-t1-e1",
    topicId: "t1-variables",
    title: "Swap Two Variables",
    description: "Given two variables a and b, swap their values without using a third variable.",
    difficulty: "easy",
    type: "short",
    boilerplate: { python: "def swap(a, b):\n    # Your code\n    return a, b" },
    testCases: [
      { input: "5, 10", expectedOutput: [10, 5] },
      { input: "0, 1", expectedOutput: [1, 0], isHidden: true },
    ],
    hints: ["Use tuple unpacking", "a, b = b, a"],
  },
  {
    id: "l1-t1-e2",
    topicId: "t1-variables",
    title: "Type Check",
    description: "Write a function that returns the type name of the input as string: 'int', 'float', 'str', 'bool', 'list', or 'dict'.",
    difficulty: "easy",
    type: "short",
    boilerplate: { python: "def get_type_name(x):\n    # Your code\n    return ''" },
    testCases: [
      { input: "42", expectedOutput: "int" },
      { input: "3.14", expectedOutput: "float" },
      { input: "True", expectedOutput: "bool", isHidden: true },
    ],
    hints: ["Use type(x).__name__"],
  },
  {
    id: "l1-t1-e3",
    topicId: "t1-variables",
    title: "Convert to Integer",
    description: "Convert a string to integer. Return None if conversion fails.",
    difficulty: "easy",
    type: "short",
    boilerplate: { python: "def safe_int(s):\n    # Your code\n    return None" },
    testCases: [
      { input: '"42"', expectedOutput: 42 },
      { input: '"abc"', expectedOutput: null, isHidden: true },
    ],
    hints: ["Use try/except", "int(s) raises ValueError"],
  },
  {
    id: "l1-t1-e4",
    topicId: "t1-variables",
    title: "Fahrenheit to Celsius",
    description: "Convert Fahrenheit to Celsius: C = (F - 32) * 5/9. Round to 2 decimal places.",
    difficulty: "easy",
    type: "short",
    boilerplate: { python: "def f_to_c(f):\n    # Your code\n    return 0.0" },
    testCases: [
      { input: "32", expectedOutput: 0.0 },
      { input: "212", expectedOutput: 100.0 },
    ],
    hints: ["Use round(x, 2)"],
  },
  {
    id: "l1-t1-e5",
    topicId: "t1-variables",
    title: "Multiple Assignment",
    description: "Return a tuple of (a+b, a-b, a*b) for given a and b.",
    difficulty: "easy",
    type: "short",
    boilerplate: { python: "def ops(a, b):\n    # Your code\n    return (0, 0, 0)" },
    testCases: [
      { input: "5, 3", expectedOutput: [8, 2, 15] },
    ],
    hints: [],
  },
  {
    id: "l1-t1-e6",
    topicId: "t1-variables",
    title: "Boolean Check",
    description: "Return True if x is truthy, False otherwise. Handle 0, '', [], None.",
    difficulty: "easy",
    type: "short",
    boilerplate: { python: "def is_truthy(x):\n    # Your code\n    return False" },
    testCases: [
      { input: "1", expectedOutput: true },
      { input: "0", expectedOutput: false },
      { input: '""', expectedOutput: false, isHidden: true },
    ],
    hints: ["Use bool(x)"],
  },
  {
    id: "l1-t1-e7",
    topicId: "t1-variables",
    title: "String Length",
    description: "Return the length of a string without using len().",
    difficulty: "easy",
    type: "short",
    boilerplate: { python: "def my_len(s):\n    # Your code\n    return 0" },
    testCases: [
      { input: '"hello"', expectedOutput: 5 },
      { input: '""', expectedOutput: 0 },
    ],
    hints: ["Use a loop and counter"],
  },
  {
    id: "l1-t1-e8",
    topicId: "t1-variables",
    title: "Modulo Check",
    description: "Return True if n is divisible by d (both integers).",
    difficulty: "easy",
    type: "short",
    boilerplate: { python: "def is_divisible(n, d):\n    # Your code\n    return False" },
    testCases: [
      { input: "10, 2", expectedOutput: true },
      { input: "10, 3", expectedOutput: false },
    ],
    hints: ["n % d == 0"],
  },
  {
    id: "l1-t1-e9",
    topicId: "t1-variables",
    title: "Average of Two",
    description: "Return the average of two numbers as float.",
    difficulty: "easy",
    type: "short",
    boilerplate: { python: "def avg(a, b):\n    # Your code\n    return 0.0" },
    testCases: [
      { input: "4, 6", expectedOutput: 5.0 },
    ],
    hints: ["(a + b) / 2"],
  },
  {
    id: "l1-t1-e10",
    topicId: "t1-variables",
    title: "String Repeat",
    description: "Return string s repeated n times.",
    difficulty: "easy",
    type: "short",
    boilerplate: { python: "def repeat(s, n):\n    # Your code\n    return ''" },
    testCases: [
      { input: '"ab", 3', expectedOutput: "ababab" },
    ],
    hints: ["s * n"],
  },
  // Topic 1 - 5 medium problems
  {
    id: "l1-t1-m1",
    topicId: "t1-variables",
    title: "Parse CSV Line",
    description: "Given a CSV line string, return a list of values. Handle quoted commas.",
    difficulty: "medium",
    type: "medium",
    boilerplate: { python: "def parse_csv_line(line):\n    # Your code\n    return []" },
    testCases: [
      { input: '"a,b,c"', expectedOutput: ["a", "b", "c"] },
      { input: '"hello,world"', expectedOutput: ["hello", "world"], isHidden: true },
    ],
    hints: ["Use str.split(',')"],
  },
  {
    id: "l1-t1-m2",
    topicId: "t1-variables",
    title: "Type-Safe Add",
    description: "Add two values. If both are numbers, return sum. If both are strings, concatenate. If mixed, return None.",
    difficulty: "medium",
    type: "medium",
    boilerplate: { python: "def type_safe_add(a, b):\n    # Your code\n    return None" },
    testCases: [
      { input: "1, 2", expectedOutput: 3 },
      { input: '"a", "b"', expectedOutput: "ab" },
      { input: "1, 'a'", expectedOutput: null, isHidden: true },
    ],
    hints: ["Use isinstance(x, (int, float))"],
  },
  {
    id: "l1-t1-m3",
    topicId: "t1-variables",
    title: "Variable Parser",
    description: "Parse 'key=value' string and return (key, value) tuple. Handle spaces.",
    difficulty: "medium",
    type: "medium",
    boilerplate: { python: "def parse_kv(s):\n    # Your code\n    return ('', '')" },
    testCases: [
      { input: '"x=42"', expectedOutput: ["x", "42"] },
      { input: '" name = John "', expectedOutput: ["name", "John"], isHidden: true },
    ],
    hints: ["Use str.split('=') and str.strip()"],
  },
  {
    id: "l1-t1-m4",
    topicId: "t1-variables",
    title: "Safe Division",
    description: "Return a/b. Return None if b is 0 or if conversion fails.",
    difficulty: "medium",
    type: "medium",
    boilerplate: { python: "def safe_div(a, b):\n    # Your code\n    return None" },
    testCases: [
      { input: "10, 2", expectedOutput: 5.0 },
      { input: "10, 0", expectedOutput: null },
    ],
    hints: ["Check b == 0 before dividing"],
  },
  {
    id: "l1-t1-m5",
    topicId: "t1-variables",
    title: "Format Currency",
    description: "Format number as currency with 2 decimal places and comma separators.",
    difficulty: "medium",
    type: "medium",
    boilerplate: { python: "def format_currency(n):\n    # Your code\n    return ''" },
    testCases: [
      { input: "1234.5", expectedOutput: "1,234.50" },
    ],
    hints: ["Use f-string or format()"],
  },
];

export const LEVEL1_MCQS: Mcq[] = [
  {
    id: "l1-t1-q1",
    topicId: "t1-variables",
    question: "What is the output of: type(3.14)",
    options: [
      { id: "a", text: "float", isCorrect: true, explanation: "3.14 is a floating-point number" },
      { id: "b", text: "int", isCorrect: false },
      { id: "c", text: "double", isCorrect: false },
      { id: "d", text: "number", isCorrect: false },
    ],
    difficulty: "easy",
    type: "basic",
  },
  {
    id: "l1-t1-q2",
    topicId: "t1-variables",
    question: "Which is NOT a valid variable name?",
    options: [
      { id: "a", text: "_private", isCorrect: false },
      { id: "b", text: "2var", isCorrect: true, explanation: "Variable names cannot start with a digit" },
      { id: "c", text: "var_name", isCorrect: false },
      { id: "d", text: "VarName", isCorrect: false },
    ],
    difficulty: "easy",
    type: "basic",
  },
  {
    id: "l1-t1-q3",
    topicId: "t1-variables",
    question: "What does int('42') return?",
    options: [
      { id: "a", text: "'42'", isCorrect: false },
      { id: "b", text: "42", isCorrect: true, explanation: "int() converts string to integer" },
      { id: "c", text: "42.0", isCorrect: false },
      { id: "d", text: "Error", isCorrect: false },
    ],
    difficulty: "easy",
    type: "basic",
  },
  {
    id: "l1-t1-q4",
    topicId: "t1-variables",
    question: "What is type(True)?",
    options: [
      { id: "a", text: "bool", isCorrect: true, explanation: "True is a boolean" },
      { id: "b", text: "int", isCorrect: false },
      { id: "c", text: "str", isCorrect: false },
      { id: "d", text: "None", isCorrect: false },
    ],
    difficulty: "easy",
    type: "basic",
  },
  {
    id: "l1-t1-q5",
    topicId: "t1-variables",
    question: "What is the result of: 10 // 3",
    options: [
      { id: "a", text: "3.33", isCorrect: false },
      { id: "b", text: "3", isCorrect: true, explanation: "// is integer division (floor)" },
      { id: "c", text: "3.0", isCorrect: false },
      { id: "d", text: "1", isCorrect: false },
    ],
    difficulty: "easy",
    type: "basic",
  },
];

export const LEVEL1_MINI_ASSIGNMENT_T1 = {
  id: "l1-t1-assign",
  topicId: "t1-variables",
  title: "Unit Converter",
  description: "Build a simple unit converter that converts between km, miles, and meters. Implement functions: km_to_miles(km), miles_to_km(miles), km_to_meters(km). Include input validation.",
  rubric: [
    { criterion: "Correct conversions", points: 40 },
    { criterion: "Input validation", points: 30 },
    { criterion: "Code organization", points: 20 },
    { criterion: "Edge cases", points: 10 },
  ],
  testCases: [
    { input: "1 (km)", expectedOutput: "0.621371 (miles)" },
    { input: "1 (mile)", expectedOutput: "1.60934 (km)" },
  ],
};
