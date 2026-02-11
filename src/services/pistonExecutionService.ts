/**
 * Piston API execution - runs Java, C++, Python without our backend.
 * Uses public Piston instance: https://emkc.org/api/v2/piston
 */
import type { EntryPoint } from './codeExecutionService';

const PISTON_URL = 'https://emkc.org/api/v2/piston/execute';

function inferParamTypes(input: Record<string, unknown>): string[] {
  return Object.keys(input).map(k => {
    const v = input[k];
    if (Array.isArray(v)) {
      if (v.length === 0) return 'int[]';
      if (typeof v[0] === 'number') return 'int[]';
      if (typeof v[0] === 'string') return 'String[]';
      return 'int[]';
    }
    if (typeof v === 'number') return 'int';
    if (typeof v === 'string') return 'String';
    if (typeof v === 'boolean') return 'boolean';
    return 'Object';
  });
}

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

function parseOutput(out: string): unknown {
  const t = out.trim();
  if (!t) return null;
  try {
    return JSON.parse(t);
  } catch {
    if (t === 'true') return true;
    if (t === 'false') return false;
    const n = Number(t);
    if (!Number.isNaN(n)) return n;
    return t;
  }
}

function buildJavaMain(userCode: string, fnName: string, paramOrder: string[], types: string[]): string {
  const methodName = fnName.charAt(0).toLowerCase() + fnName.slice(1);
  const inner = userCode.replace(/class Solution \{\s*/s, '').replace(/\s*\}\s*$/s, '').trim();
  const args = paramOrder.map((_, i) => {
    const t = types[i] || 'int';
    if (t === 'int[]') return `(int[])a[${i}]`;
    if (t === 'String') return `(String)a[${i}]`;
    if (t === 'boolean') return `((Boolean)a[${i}]).booleanValue()`;
    return `((Integer)a[${i}]).intValue()`;
  }).join(', ');
  return `import java.util.*;
import java.io.*;
class Solution { ${inner} }
public class Main {
  public static void main(String[] args) throws Exception {
    BufferedReader r = new BufferedReader(new InputStreamReader(System.in));
    String line;
    while ((line = r.readLine()) != null && !line.isEmpty()) {
      try {
        Object[] a = parse(line);
        Object res = new Solution().${methodName}(${args});
        System.out.println(out(res));
      } catch (Throwable e) {
        System.err.println("ERR:" + e.getMessage());
      }
    }
  }
  static Object[] parse(String s) {
    Object[] r = new Object[${paramOrder.length}];
    ${paramOrder.map((k, i) => {
    const t = types[i] || 'int';
    if (t === 'int[]') return `{
      int p = s.indexOf("\\"${k}\\":");
      if (p >= 0) {
        int b = s.indexOf("[", p);
        int e = s.indexOf("]", b);
        String[] parts = s.substring(b+1, e).split(",");
        int[] arr = new int[parts.length];
        for (int j = 0; j < parts.length; j++) arr[j] = Integer.parseInt(parts[j].trim());
        r[${i}] = arr;
      }
    }`;
    if (t === 'String') return `{
      int p = s.indexOf("\\"${k}\\":");
      if (p >= 0) {
        int b = s.indexOf("\\"", s.indexOf(":", p) + 1) + 1;
        int e = b;
        while (e < s.length() && (s.charAt(e) != '\\"' || (e > 0 && s.charAt(e-1) == '\\\\'))) e++;
        r[${i}] = s.substring(b, Math.min(e, s.length()));
      }
    }`;
    if (t === 'boolean') return `{
      if (s.contains("\\"${k}\\":true")) r[${i}] = true;
      else if (s.contains("\\"${k}\\":false")) r[${i}] = false;
    }`;
    return `{
      int p = s.indexOf("\\"${k}\\":");
      if (p >= 0) {
        int b = s.indexOf(":", p) + 1;
        while (b < s.length() && " \\t".indexOf(s.charAt(b)) >= 0) b++;
        int e = b;
        while (e < s.length() && "-0123456789".indexOf(s.charAt(e)) >= 0) e++;
        r[${i}] = Integer.parseInt(s.substring(b, e));
      }
    }`;
  }).join('')}
    return r;
  }
  static String out(Object o) {
    if (o == null) return "null";
    if (o instanceof int[]) return Arrays.toString((int[])o).replace(" ", "");
    if (o instanceof boolean) return o.toString();
    return "\\"" + o + "\\"";
  }
}`;
}

function buildCppMain(userCode: string, fnName: string, paramOrder: string[], types: string[]): string {
  const inner = userCode.replace(/class Solution \{\s*/s, '').replace(/\s*\};\s*$/s, '').trim();
  const hasNums = types.includes('int[]');
  const hasTarget = paramOrder.includes('target');
  const hasS = paramOrder.includes('s');
  if (hasS && paramOrder.length === 1) {
    return `#include <iostream>
#include <vector>
#include <sstream>
#include <string>
using namespace std;
class Solution { ${inner} };
int main() {
  Solution s;
  string line;
  while (getline(cin, line) && !line.empty()) {
    size_t q1 = line.find('"');
    size_t q2 = line.rfind('"');
    string str = line.substr(q1+1, q2-q1-1);
    bool res = s.${fnName}(str);
    cout << (res ? "true" : "false") << endl;
  }
}`;
  }
  return `#include <iostream>
#include <vector>
#include <sstream>
#include <string>
using namespace std;
class Solution { ${inner} };
int main() {
  Solution s;
  string line;
  while (getline(cin, line) && !line.empty()) {
    try {
      vector<int> nums;
      int target = 0;
      size_t i = line.find("nums");
      if (i != string::npos) {
        size_t b = line.find('[', i);
        size_t e = line.find(']', b);
        string arr = line.substr(b+1, e-b-1);
        stringstream ss(arr);
        int x;
        while (ss >> x) { nums.push_back(x); if (ss.peek()==',') ss.ignore(); }
      }
      i = line.find("target");
      if (i != string::npos) {
        size_t c = line.find(':', i) + 1;
        target = stoi(line.substr(c));
      }
      auto res = s.${fnName}(nums, target);
      cout << "[";
      for (size_t j = 0; j < res.size(); j++) {
        if (j) cout << ",";
        cout << res[j];
      }
      cout << "]" << endl;
    } catch (exception& e) {
      cerr << "ERR:" << e.what() << endl;
    }
  }
}`;
}

function buildPythonMain(code: string, fnName: string, paramOrder: string[]): string {
  const snake = fnName.replace(/([A-Z])/g, '_$1').toLowerCase().replace(/^_/, '');
  return `${code}
import sys, json
for line in sys.stdin:
  if not line.strip(): continue
  try:
    d = json.loads(line)
    args = [d.get(k) for k in ${JSON.stringify(paramOrder)}]
    out = ${snake}(*args)
    print(json.dumps(out) if out is not None else "null")
  except Exception as e:
    import traceback
    traceback.print_exc(file=sys.stderr)
    sys.exit(1)
`;
}

export async function runWithPiston(
  code: string,
  language: string,
  testCases: Array<{ input: unknown; expected: unknown }>,
  entryPoint: EntryPoint | null
): Promise<{
  results: Array<{ passed: boolean; actual: unknown; error?: string; executionTime: number }>;
  overallStatus: 'success' | 'wrong_answer' | 'compilation_error' | 'runtime_error';
  totalExecutionTime: number;
}> {
  const lang = language === 'java' ? 'java' : language === 'cpp' || language === 'c' ? 'cpp' : language === 'python' ? 'python' : null;
  if (!lang) return { results: [], overallStatus: 'runtime_error', totalExecutionTime: 0 };

  const paramOrder = entryPoint?.paramOrder ?? (testCases[0]?.input && typeof testCases[0].input === 'object' ? Object.keys(testCases[0].input) : []);
  const fnName = entryPoint?.functionName ?? 'solution';
  const types = testCases[0]?.input && typeof testCases[0].input === 'object' ? inferParamTypes(testCases[0].input as Record<string, unknown>) : paramOrder.map(() => 'int');

  let fullCode = code;
  let fileName = 'Main.java';
  if (lang === 'java') {
    fullCode = buildJavaMain(code, fnName, paramOrder, types);
  } else if (lang === 'cpp') {
    fullCode = buildCppMain(code, fnName, paramOrder, types);
    fileName = 'main.cpp';
  } else if (lang === 'python') {
    fullCode = buildPythonMain(code, fnName, paramOrder);
    fileName = 'main.py';
  }

  const results: Array<{ passed: boolean; actual: unknown; error?: string; executionTime: number }> = [];
  let totalTime = 0;
  let allPassed = true;

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    const stdin = JSON.stringify(tc.input) + '\n';
    const start = performance.now();
    try {
      const res = await fetch(PISTON_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: lang,
          version: '*',
          files: [{ name: fileName, content: fullCode }],
          stdin,
          run_timeout: 5000,
        }),
      });
      const data = await res.json();
      const elapsed = performance.now() - start;
      totalTime += elapsed;

      if (data.message) {
        results.push({ passed: false, actual: undefined, error: data.message, executionTime: elapsed });
        allPassed = false;
        continue;
      }

      const compile = data.compile;
      if (compile && compile.code !== 0) {
        results.push({
          passed: false,
          actual: undefined,
          error: (compile.stderr || compile.stdout || 'Compilation failed').slice(0, 500),
          executionTime: elapsed,
        });
        allPassed = false;
        continue;
      }
      const run = data.run;
      if (run.code !== 0 && run.code !== null) {
        const err = (run.stderr || run.stdout || '').trim();
        const errMatch = err.match(/ERR:(.+)/);
        results.push({
          passed: false,
          actual: undefined,
          error: errMatch ? errMatch[1] : err.slice(0, 300) || `Exit code ${run.code}`,
          executionTime: elapsed,
        });
        allPassed = false;
        continue;
      }
      const actual = parseOutput(run.stdout || '');
      const passed = deepEqual(actual, tc.expected);
      if (!passed) allPassed = false;
      results.push({ passed, actual, executionTime: elapsed });
    } catch (err) {
      totalTime += performance.now() - start;
      results.push({
        passed: false,
        actual: undefined,
        error: err instanceof Error ? err.message : String(err),
        executionTime: 0,
      });
      allPassed = false;
    }
  }

  return {
    results,
    overallStatus: allPassed ? 'success' : 'wrong_answer',
    totalExecutionTime: totalTime,
  };
}
