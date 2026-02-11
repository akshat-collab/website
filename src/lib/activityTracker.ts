/**
 * Activity tracker for admin panel. Records logins, DSA activity, typing activity.
 * Stored in localStorage (per-device; for full multi-user analytics see backend).
 */

const ACTIVITY_KEY = "admin_activity_log";
const MAX_ENTRIES = 2000;

export type ActivityType =
  | "login"
  | "signup"
  | "admin_login"
  | "dsa_visit"
  | "dsa_run"
  | "dsa_submit"
  | "dsa_solve"
  | "typing_start"
  | "typing_complete"
  | "contact";

export interface ActivityEntry {
  id: string;
  type: ActivityType;
  userId?: string;
  email?: string;
  name?: string;
  details?: string;
  timestamp: string;
}

function getActivities(): ActivityEntry[] {
  try {
    const raw = localStorage.getItem(ACTIVITY_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw) as unknown;
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function saveActivities(entries: ActivityEntry[]): void {
  const trimmed = entries.slice(-MAX_ENTRIES);
  localStorage.setItem(ACTIVITY_KEY, JSON.stringify(trimmed));
}

function getId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function getCurrentUser(): { email?: string; name?: string } {
  try {
    const session = localStorage.getItem("dsa_local_session");
    const main = localStorage.getItem("techmasterai_user");
    if (session) {
      const s = JSON.parse(session) as { email?: string; username?: string };
      return { email: s.email, name: s.username };
    }
    if (main) {
      const m = JSON.parse(main) as { email?: string; name?: string };
      return { email: m.email, name: m.name };
    }
  } catch {
    /* ignore */
  }
  return {};
}

export function recordActivity(
  type: ActivityType,
  details?: string
): void {
  const user = getCurrentUser();
  const entry: ActivityEntry = {
    id: getId(),
    type,
    email: user.email,
    name: user.name,
    details,
    timestamp: new Date().toISOString(),
  };
  const list = getActivities();
  list.push(entry);
  saveActivities(list);
}

export function getActivityLog(): ActivityEntry[] {
  return getActivities();
}

export function getActivityStats(): {
  totalLogins: number;
  totalSignups: number;
  totalDsaActivity: number;
  totalTypingActivity: number;
  uniqueUsers: number;
  last7Days: { login: number; dsa: number; typing: number };
} {
  const log = getActivities();
  const logins = log.filter((e) => e.type === "login" || e.type === "admin_login");
  const signups = log.filter((e) => e.type === "signup");
  const dsa = log.filter((e) =>
    ["dsa_visit", "dsa_run", "dsa_submit", "dsa_solve"].includes(e.type)
  );
  const typing = log.filter((e) =>
    ["typing_start", "typing_complete"].includes(e.type)
  );
  const uniqueEmails = new Set(
    log.map((e) => e.email || e.userId || "anonymous").filter(Boolean)
  );
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const recent = log.filter((e) => new Date(e.timestamp).getTime() > sevenDaysAgo);
  return {
    totalLogins: logins.length,
    totalSignups: signups.length,
    totalDsaActivity: dsa.length,
    totalTypingActivity: typing.length,
    uniqueUsers: uniqueEmails.size,
    last7Days: {
      login: recent.filter((e) => e.type === "login" || e.type === "admin_login").length,
      dsa: recent.filter((e) =>
        ["dsa_visit", "dsa_run", "dsa_submit", "dsa_solve"].includes(e.type)
      ).length,
      typing: recent.filter((e) =>
        ["typing_start", "typing_complete"].includes(e.type)
      ).length,
    },
  };
}

export function clearActivityLog(): void {
  localStorage.removeItem(ACTIVITY_KEY);
}
