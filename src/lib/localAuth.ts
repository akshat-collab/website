/**
 * Local-only auth: email/password stored in localStorage.
 * Works offline, no server or Firebase. Profile updated in localStorage.
 */

import { recordActivity } from "./activityTracker";

const LOCAL_USERS_KEY = "dsa_local_users";
const LOCAL_SESSION_KEY = "dsa_local_session";

interface LocalUser {
  id: string;
  email: string;
  password: string; // stored as-is for demo; use hash in production
  username: string;
  createdAt: string;
}

interface SessionProfile {
  id: string;
  email: string;
  username: string;
  profilePhoto?: string | null;
}

function getUsers(): LocalUser[] {
  try {
    const raw = localStorage.getItem(LOCAL_USERS_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw) as unknown;
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function saveUsers(users: LocalUser[]): void {
  localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
}

function simpleHash(s: string): string {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h) + s.charCodeAt(i) | 0;
  }
  return String(h);
}

export function getSession(): SessionProfile | null {
  try {
    const raw = localStorage.getItem(LOCAL_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SessionProfile;
  } catch {
    return null;
  }
}

function setMainSiteUser(session: SessionProfile | null): void {
  if (!session) {
    localStorage.removeItem("techmasterai_user");
    return;
  }
  localStorage.setItem(
    "techmasterai_user",
    JSON.stringify({ name: session.username, email: session.email, photo: session.profilePhoto })
  );
}

export function login(email: string, password: string): { success: boolean; error?: string } {
  const users = getUsers();
  const emailLower = email.trim().toLowerCase();
  const user = users.find((u) => u.email.toLowerCase() === emailLower);
  if (!user) return { success: false, error: "No account found. Register first." };
  if (user.password !== password) return { success: false, error: "Invalid password." };
  const session: SessionProfile = {
    id: user.id,
    email: user.email,
    username: user.username,
  };
  localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(session));
  setMainSiteUser(session);
  recordActivity("login", user.email);
  return { success: true };
}

export function register(username: string, email: string, password: string): { success: boolean; error?: string } {
  const users = getUsers();
  const emailLower = email.trim().toLowerCase();
  if (users.some((u) => u.email.toLowerCase() === emailLower)) {
    return { success: false, error: "Email already registered." };
  }
  const id = simpleHash(emailLower + Date.now());
  const newUser: LocalUser = {
    id,
    email: email.trim(),
    password,
    username: username.trim().slice(0, 64) || email.split("@")[0] || "user",
    createdAt: new Date().toISOString(),
  };
  saveUsers([...users, newUser]);
  const session: SessionProfile = {
    id: newUser.id,
    email: newUser.email,
    username: newUser.username,
  };
  localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(session));
  setMainSiteUser(session);
  recordActivity("signup", newUser.email);
  return { success: true };
}

export function logout(): void {
  localStorage.removeItem(LOCAL_SESSION_KEY);
  setMainSiteUser(null);
}

export function updateProfile(data: Partial<Pick<SessionProfile, "username" | "profilePhoto">>): void {
  const session = getSession();
  if (!session) return;
  const updated: SessionProfile = {
    ...session,
    ...data,
  };
  localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(updated));
  setMainSiteUser(updated);
}
