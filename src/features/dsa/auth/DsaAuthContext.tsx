import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type { User as SupabaseUser, Session } from "@supabase/supabase-js";
import { recordLoginStreak } from "@/features/dsa/profile/dsaProfileStore";
import { toast } from "sonner";

export interface DsaUser {
  id: string;
  username: string;
  email: string;
  rating?: number;
  problemsSolved?: number;
  profile_photo_url?: string | null;
}

interface DsaAuthContextType {
  user: DsaUser | null;
  authUser: SupabaseUser | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: (gender?: "male" | "female") => Promise<{ success: boolean; error?: string }>;
  register: (username: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const DsaAuthContext = createContext<DsaAuthContextType | undefined>(undefined);

async function fetchProfileFromSupabase(userId: string): Promise<DsaUser | null> {
  const { data, error } = await supabase
    .from("dsa_users")
    .select("id, username, email, rating, problems_solved")
    .eq("id", userId)
    .single();

  if (error || !data) return null;
  return {
    id: data.id,
    username: data.username ?? data.email?.split("@")[0] ?? "user",
    email: data.email ?? "",
    rating: data.rating,
    problemsSolved: data.problems_solved,
    profile_photo_url: null,
  };
}

export function DsaAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<DsaUser | null>(null);
  const [authUser, setAuthUser] = useState<SupabaseUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const syncProfile = useCallback(async (session: Session) => {
    const u = session.user;
    setAuthUser(u);
    const profile = await fetchProfileFromSupabase(u.id);
    setUser(profile);
    setToken(session.access_token);
    if (profile?.profile_photo_url) {
      const { setProfilePhoto } = await import("@/features/dsa/profile/dsaProfileStore");
      setProfilePhoto(profile.profile_photo_url);
    }
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setAuthUser(session?.user ?? null);
      if (!session?.user) {
        setUser(null);
        setToken(null);
        setIsLoading(false);
        return;
      }
      try {
        await syncProfile(session);
      } catch {
        setUser(null);
        setToken(null);
      }
      setIsLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        syncProfile(session).finally(() => setIsLoading(false));
      } else {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [syncProfile]);

  const login = useCallback(async (email: string, password: string) => {
    if (!email.trim() || !password) return { success: false, error: "Email and password required" };
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) throw error;
      if (data.session) await syncProfile(data.session);
      recordLoginStreak();
      toast.success("Signed in successfully!");
      return { success: true };
    } catch (err: unknown) {
      const message = err && typeof err === "object" && "message" in err ? String((err as { message: string }).message) : "Login failed";
      toast.error(message);
      return { success: false, error: message };
    }
  }, [syncProfile]);

  const loginWithGoogle = useCallback(
    async (gender?: "male" | "female") => {
      try {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo: `${window.location.origin}/dsa/dashboard` },
        });
        if (error) throw error;
        if (data.url) {
          window.location.href = data.url;
          return { success: true };
        }
        if (gender) {
          try {
            const { setProfileGender } = await import("@/features/dsa/profile/dsaProfileStore");
            setProfileGender(gender);
          } catch {
            /* ignore */
          }
        }
        recordLoginStreak();
        toast.success("Redirecting to Google…");
        return { success: true };
      } catch (err: unknown) {
        const message = err && typeof err === "object" && "message" in err ? String((err as { message: string }).message) : "Google sign-in failed";
        toast.error(message);
        return { success: false, error: message };
      }
    },
    []
  );

  const register = useCallback(
    async (username: string, email: string, password: string) => {
      if (!username.trim() || !email.trim() || !password) return { success: false, error: "All fields required" };
      try {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: { username: username.trim().slice(0, 64) },
          },
        });
        if (error) throw error;
        if (data.user && data.session) {
          await syncProfile(data.session);
          recordLoginStreak();
          toast.success("Account created successfully!");
          return { success: true };
        }
        if (data.user && !data.session) {
          toast.success("Check your email to confirm your account.");
          return { success: true };
        }
        return { success: false, error: "Registration failed" };
      } catch (err: unknown) {
        const message = err && typeof err === "object" && "message" in err ? String((err as { message: string }).message) : "Registration failed";
        toast.error(message);
        return { success: false, error: message };
      }
    },
    [syncProfile]
  );

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setAuthUser(null);
    setToken(null);
    toast.success("Signed out");
  }, []);

  return (
    <DsaAuthContext.Provider
      value={{ user, authUser, token, isLoading, login, loginWithGoogle, register, logout }}
    >
      {children}
    </DsaAuthContext.Provider>
  );
}

export function useDsaAuth() {
  const ctx = useContext(DsaAuthContext);
  if (ctx === undefined) {
    throw new Error("useDsaAuth must be used within DsaAuthProvider");
  }
  return ctx;
}
