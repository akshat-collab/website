/**
 * CTF Core - Frontend-safe flag derivation & validation.
 * Flags are derived from (challengeId + solution), never stored plain.
 */

/** Simple deterministic hash for flag derivation (non-cryptographic, frontend-only) */
function deriveFlag(challengeId: string, solution: string): string {
  let h = 0;
  const s = challengeId + "|" + solution;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  }
  const hex = Math.abs(h).toString(16).slice(0, 12);
  return `TMAI{${hex}}`;
}

/** Validate solution and return derived flag if correct */
export function validateAndDeriveFlag(
  challengeId: string,
  userInput: string,
  validator: (input: string) => boolean
): { valid: boolean; flag?: string } {
  const trimmed = userInput.trim();
  if (!validator(trimmed)) return { valid: false };
  return { valid: true, flag: deriveFlag(challengeId, trimmed) };
}

/** Encoding helpers for validators */
export const encodings = {
  base64Decode(s: string): string {
    try {
      return atob(s);
    } catch {
      return "";
    }
  },
  hexDecode(s: string): string {
    try {
      return s
        .match(/.{1,2}/g)
        ?.map((b) => String.fromCharCode(parseInt(b, 16)))
        .join("") ?? "";
    } catch {
      return "";
    }
  },
  rot13(s: string): string {
    return s.replace(/[a-zA-Z]/g, (c) => {
      const base = c <= "Z" ? 65 : 97;
      return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
    });
  },
  caesar(s: string, shift: number): string {
    return s.replace(/[a-zA-Z]/g, (c) => {
      const base = c <= "Z" ? 65 : 97;
      return String.fromCharCode(((c.charCodeAt(0) - base - shift + 26) % 26) + base);
    });
  },
  xor(s: string, key: number): string {
    const bytes = s.match(/.{1,2}/g)?.map((b) => parseInt(b, 16)) ?? [];
    return bytes.map((b) => String.fromCharCode(b ^ key)).join("");
  },
};
