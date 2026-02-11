// Code Execution Service - Connects to backend via /api (Vite proxy in dev)
import { getApiUrl } from '@/lib/api';

function getExecuteApi() {
  return getApiUrl('/api/execute');
}

export interface ExecutionResult {
  status: 'success' | 'compilation_error' | 'runtime_error' | 'wrong_answer' | 'time_limit_exceeded' | 'memory_limit_exceeded';
  output?: any;
  error?: string;
  executionTime: number; // in ms
  memoryUsed: number; // in MB
}

export interface TestCaseResult {
  testCaseId: number;
  passed: boolean;
  input: any;
  expected: any;
  actual: any;
  executionTime: number;
  error?: string;
}

export interface ComplexityAnalysis {
  timeComplexity: string;
  spaceComplexity: string;
  analysis: string;
}

// Simulate syntax validation
export function validateSyntax(code: string, language: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Basic syntax checks
  if (language === 'java' || language === 'c' || language === 'cpp') {
    const openBraces = (code.match(/{/g) || []).length;
    const closeBraces = (code.match(/}/g) || []).length;
    if (openBraces !== closeBraces) {
      errors.push('Mismatched braces');
    }
  }
  
  const openParens = (code.match(/\(/g) || []).length;
  const closeParens = (code.match(/\)/g) || []).length;
  if (openParens !== closeParens) {
    errors.push('Mismatched parentheses');
  }
  
  if (code.trim().length === 0) {
    errors.push('Code cannot be empty');
  }
  
  return { valid: errors.length === 0, errors };
}

// Analyze code complexity (heuristic)
export function analyzeComplexity(code: string): ComplexityAnalysis {
  let timeComplexity = 'O(1)';
  let spaceComplexity = 'O(1)';
  let analysis = 'Constant time and space complexity.';
  
  // Count loops
  const forLoops = (code.match(/\bfor\s*\(/g) || []).length;
  const whileLoops = (code.match(/\bwhile\s*\(/g) || []).length;
  const totalLoops = forLoops + whileLoops;
  
  // Check for recursion (simplified check - looks for function calls within function definitions)
  const hasRecursion = /function\s+(\w+)\s*\([^)]*\)\s*{[\s\S]*\1\s*\(/.test(code) || 
                       /def\s+(\w+)\s*\([^)]*\):[\s\S]*\1\s*\(/.test(code);
  
  // Detect nested loops
  const lines = code.split('\n');
  let maxNesting = 0;
  let currentNesting = 0;
  
  for (const line of lines) {
    if (/\b(for|while)\s*\(/.test(line)) {
      currentNesting++;
      maxNesting = Math.max(maxNesting, currentNesting);
    }
    if (line.includes('}')) {
      currentNesting = Math.max(0, currentNesting - 1);
    }
  }
  
  if (maxNesting >= 3) {
    timeComplexity = 'O(n³) or higher';
    analysis = 'Multiple nested loops detected. Consider optimizing.';
  } else if (maxNesting === 2) {
    timeComplexity = 'O(n²)';
    analysis = 'Nested loops detected. Quadratic time complexity.';
  } else if (totalLoops > 0) {
    timeComplexity = 'O(n)';
    analysis = 'Single loop detected. Linear time complexity.';
  }
  
  if (hasRecursion) {
    timeComplexity = 'O(2ⁿ) or O(n)';
    analysis = 'Recursive solution detected. Complexity depends on recursion depth.';
  }
  
  // Check for data structures
  if (/\b(Map|Set|HashMap|HashSet|dict|set)\b/.test(code)) {
    spaceComplexity = 'O(n)';
  }
  
  return { timeComplexity, spaceComplexity, analysis };
}

/** LeetCode-style entry point: solution function name and parameter order (from test input keys). */
export interface EntryPoint {
  functionName: string;
  paramOrder: string[];
}

/** Deep equality for arrays/objects (handles JSON-like values). */
function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a == null || b == null) return a === b;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((v, i) => deepEqual(v, b[i]));
  }
  if (typeof a === 'object' && typeof b === 'object') {
    const ka = Object.keys(a as object).sort();
    const kb = Object.keys(b as object).sort();
    if (ka.length !== kb.length) return false;
    return ka.every((k, i) => k === kb[i] && deepEqual((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k]));
  }
  return false;
}

/**
 * Run JavaScript code in browser (fallback when server unavailable).
 * Shows test-case results and feedback without needing backend.
 */
function runInBrowser(
  code: string,
  testCases: Array<{ input: any; expected: any }>,
  entryPoint: EntryPoint | null
): { results: TestCaseResult[]; overallStatus: ExecutionResult['status']; totalExecutionTime: number } {
  const results: TestCaseResult[] = [];
  const paramOrder = entryPoint?.paramOrder ?? (testCases[0]?.input && typeof testCases[0].input === 'object' ? Object.keys(testCases[0].input) : []);
  const fnName = entryPoint?.functionName ?? 'solution';

  try {
    const fn = new Function(`
      ${code}
      return typeof ${fnName} === 'function' ? ${fnName} : (typeof solution === 'function' ? solution : null);
    `)();
    if (typeof fn !== 'function') {
      return {
        results: [],
        overallStatus: 'compilation_error',
        totalExecutionTime: 0,
      };
    }

    let totalTime = 0;
    let allPassed = true;
    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i];
      const input = tc.input;
      const args = paramOrder.map((k: string) => (input && typeof input === 'object' && k in input ? input[k] : input));
      const start = performance.now();
      try {
        const actual = fn(...args);
        const elapsed = performance.now() - start;
        totalTime += elapsed;
        const passed = deepEqual(actual, tc.expected);
        if (!passed) allPassed = false;
        results.push({
          testCaseId: i + 1,
          passed,
          input: tc.input,
          expected: tc.expected,
          actual,
          executionTime: elapsed,
        });
      } catch (err) {
        allPassed = false;
        results.push({
          testCaseId: i + 1,
          passed: false,
          input: tc.input,
          expected: tc.expected,
          actual: undefined,
          executionTime: 0,
          error: err instanceof Error ? err.message : String(err),
        });
      }
    }

    return {
      results,
      overallStatus: allPassed ? 'success' : 'wrong_answer',
      totalExecutionTime: totalTime,
    };
  } catch (err) {
    return {
      results: [],
      overallStatus: 'compilation_error',
      totalExecutionTime: 0,
    };
  }
}

// Execute code against test cases - tries backend first, falls back to browser JS when server unavailable
export async function executeCode(
  code: string,
  language: string,
  testCases: Array<{ input: any; expected: any }>,
  isSubmission: boolean = false,
  entryPoint?: EntryPoint | null
): Promise<{
  results: TestCaseResult[];
  overallStatus: ExecutionResult['status'];
  totalExecutionTime: number;
  averageMemory: number;
  complexity: ComplexityAnalysis;
}> {
  // Validate syntax first
  const syntaxCheck = validateSyntax(code, language);
  if (!syntaxCheck.valid) {
    return {
      results: [],
      overallStatus: 'compilation_error',
      totalExecutionTime: 0,
      averageMemory: 0,
      complexity: { timeComplexity: 'N/A', spaceComplexity: 'N/A', analysis: syntaxCheck.errors.join(', ') },
    };
  }
  
  try {
    const base = getExecuteApi();
    const endpoint = isSubmission ? `${base}/submit` : `${base}/run`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
        language,
        testCases: testCases.map(tc => ({
          input: tc.input,
          expected: tc.expected,
        })),
        ...(entryPoint && { entryPoint }),
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Server error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Handle compilation or runtime errors
    if (data.status === 'compilation_error' || data.status === 'runtime_error') {
      return {
        results: [],
        overallStatus: data.status,
        totalExecutionTime: 0,
        averageMemory: 0,
        complexity: { 
          timeComplexity: 'N/A', 
          spaceComplexity: 'N/A', 
          analysis: data.error || 'Execution failed' 
        },
      };
    }
    
    // Process test case results
    const results: TestCaseResult[] = data.testCases?.map((tc: any) => ({
      testCaseId: tc.id,
      passed: tc.passed,
      input: tc.input,
      expected: tc.expectedOutput,
      actual: tc.userOutput,
      executionTime: tc.executionTime || 0,
      error: tc.error,
    })) || [];
    
    const totalTime = results.reduce((sum, r) => sum + r.executionTime, 0);
    const avgMemory = data.metrics?.memory || 15;
    
    // Analyze complexity
    const complexity = analyzeComplexity(code);
    
    return {
      results,
      overallStatus: data.status,
      totalExecutionTime: totalTime,
      averageMemory: avgMemory,
      complexity,
    };
    
  } catch (error) {
    console.warn('Code execution server unavailable, trying fallbacks:', error);

    // Fallback 1: JavaScript/TypeScript in browser
    if (language === 'javascript' || language === 'typescript') {
      const fallback = runInBrowser(code, testCases, entryPoint ?? null);
      if (fallback.results.length > 0) {
        const complexity = analyzeComplexity(code);
        return {
          results: fallback.results.map((r) => ({
            testCaseId: r.testCaseId,
            passed: r.passed,
            input: r.input,
            expected: r.expected,
            actual: r.actual,
            executionTime: r.executionTime,
            error: r.error,
          })),
          overallStatus: fallback.overallStatus,
          totalExecutionTime: fallback.totalExecutionTime,
          averageMemory: 0,
          complexity,
        };
      }
    }

    // Fallback 2: Java, C++, Python via Piston API (no server needed)
    if (language === 'java' || language === 'cpp' || language === 'c' || language === 'python') {
      try {
        const { runWithPiston } = await import('./pistonExecutionService');
        const piston = await runWithPiston(code, language, testCases, entryPoint ?? null);
        if (piston.results.length > 0) {
          const complexity = analyzeComplexity(code);
          return {
            results: piston.results.map((r, i) => ({
              testCaseId: i + 1,
              passed: r.passed,
              input: testCases[i]?.input,
              expected: testCases[i]?.expected,
              actual: r.actual,
              executionTime: r.executionTime,
              error: r.error,
            })),
            overallStatus: piston.overallStatus,
            totalExecutionTime: piston.totalExecutionTime,
            averageMemory: 0,
            complexity,
          };
        }
      } catch (e) {
        console.warn('Piston fallback failed:', e);
      }
    }

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      results: [],
      overallStatus: 'runtime_error',
      totalExecutionTime: 0,
      averageMemory: 0,
      complexity: {
        timeComplexity: 'N/A',
        spaceComplexity: 'N/A',
        analysis: `Server unavailable: ${errorMessage}. JavaScript runs in browser; Java/C++/Python use Piston API.`,
      },
    };
  }
}

// Real-time syntax validation for Monaco Editor
export function getRealTimeDiagnostics(code: string, language: string) {
  const diagnostics: Array<{
    severity: 'error' | 'warning' | 'info';
    message: string;
    startLineNumber: number;
    startColumn: number;
    endLineNumber: number;
    endColumn: number;
  }> = [];
  
  const lines = code.split('\n');
  
  lines.forEach((line, index) => {
    // Check for common issues
    if (line.includes('console.log') && language !== 'javascript') {
      diagnostics.push({
        severity: 'warning',
        message: 'console.log is JavaScript specific',
        startLineNumber: index + 1,
        startColumn: 1,
        endLineNumber: index + 1,
        endColumn: line.length + 1,
      });
    }
    
    // Check for unclosed strings
    const singleQuotes = (line.match(/'/g) || []).length;
    const doubleQuotes = (line.match(/"/g) || []).length;
    if (singleQuotes % 2 !== 0 || doubleQuotes % 2 !== 0) {
      diagnostics.push({
        severity: 'error',
        message: 'Unclosed string literal',
        startLineNumber: index + 1,
        startColumn: 1,
        endLineNumber: index + 1,
        endColumn: line.length + 1,
      });
    }
  });
  
  return diagnostics;
}
