/**
 * DS Exercise - Parse test input for Python execution
 */

function extractParamNames(boilerplate: string): string[] {
  const match = boilerplate.match(/def\s+(\w+)\s*\(([^)]*)\)/);
  if (!match) return [];
  return match[2]
    .split(",")
    .map((p) => p.trim().split("=")[0].trim())
    .filter(Boolean);
}

function parseInputValues(inputStr: string): unknown[] {
  const trimmed = inputStr.trim();
  if (!trimmed) return [];

  const result: unknown[] = [];
  let i = 0;

  while (i < trimmed.length) {
    const c = trimmed[i];
    if (c === " " || c === ",") {
      i++;
      continue;
    }
    if (c === '"' || c === "'") {
      const end = trimmed.indexOf(c, i + 1);
      if (end === -1) break;
      result.push(trimmed.slice(i + 1, end));
      i = end + 1;
    } else if (/[0-9.-]/.test(c)) {
      let end = i;
      while (end < trimmed.length && /[0-9.eE+-]/.test(trimmed[end])) end++;
      const num = trimmed.slice(i, end);
      result.push(num.includes(".") ? parseFloat(num) : parseInt(num, 10));
      i = end;
    } else if (trimmed.slice(i, i + 4) === "True") {
      result.push(true);
      i += 4;
    } else if (trimmed.slice(i, i + 5) === "False") {
      result.push(false);
      i += 5;
    } else if (trimmed.slice(i, i + 4) === "None") {
      result.push(null);
      i += 4;
    } else {
      i++;
    }
  }
  return result;
}

export function parseDsInputForExecution(
  inputStr: string,
  boilerplate: string
): Record<string, unknown> | null {
  const params = extractParamNames(boilerplate);
  const trimmed = inputStr.trim();

  // No params - call with no args
  if (params.length === 0) return trimmed ? null : {};

  // JSON array for multiple/single params: [val1, val2, ...]
  if (trimmed.startsWith("[")) {
    try {
      const arr = JSON.parse(trimmed);
      if (Array.isArray(arr) && arr.length === params.length) {
        const obj: Record<string, unknown> = {};
        params.forEach((p, i) => (obj[p] = arr[i]));
        return obj;
      }
    } catch {
      /* fall through */
    }
  }

  // Single param with JSON object
  if (params.length === 1 && trimmed.startsWith("{")) {
    try {
      const val = JSON.parse(trimmed);
      return { [params[0]]: val };
    } catch {
      /* fall through */
    }
  }

  const values = parseInputValues(inputStr);
  if (params.length !== values.length) return null;
  const obj: Record<string, unknown> = {};
  params.forEach((p, i) => (obj[p] = values[i]));
  return obj;
}
