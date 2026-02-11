/**
 * API client: base URL and auth headers (Supabase session token).
 */

import { supabase } from "@/lib/supabase";

function getApiBase(): string {
  return import.meta.env.VITE_API_URL || '';
}

export function getApiUrl(path: string): string {
  const base = getApiBase();
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}

export async function getAuthHeaders(): Promise<HeadersInit> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.access_token) {
    headers['Authorization'] = `Bearer ${session.access_token}`;
  }
  return headers;
}

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = getApiUrl(path);
  const headers = { ...(await getAuthHeaders()), ...options.headers } as HeadersInit;
  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed ${res.status}`);
  }
  return res.json() as Promise<T>;
}
