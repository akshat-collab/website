import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import * as localAuth from "@/lib/localAuth";
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
  authUser: DsaUser | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: (gender?: "male" | "female") => Promise<{ success: boolean; error?: string }>;
  register: (username: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const DsaAuthContext = createContext<DsaAuthContextType | undefined>(undefined);

function sessionToUser(s: ReturnType<typeof localAuth.getSession>): DsaUser | null {
  if (!s) return null;
  return {
    id: s.id,
    username: s.username,
    email: s.email,
    profile_photo_url: s.profilePhoto ?? null,
  };
}

export function DsaAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<DsaUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const syncFromLocal = useCallback(() => {
    const session = localAuth.getSession();
    const u = sessionToUser(session);
    setUser(u);
  }, []);

  useEffect(() => {
    syncFromLocal();
    setIsLoading(false);
  }, [syncFromLocal]);

  const login = useCallback(async (email: string, password: string) => {
    if (!email.trim() || !password) return { success: false, error: "Email and password required" };
    const result = localAuth.login(email.trim(), password);
    if (!result.success) {
      toast.error(result.error);
      return result;
    }
    syncFromLocal();
    recordLoginStreak();
    toast.success("Signed in successfully!");
    return { success: true };
  }, [syncFromLocal]);

  const loginWithGoogle = useCallback(
    async (gender?: "male" | "female") => {
      toast.info("Google sign-in requires Firebase. Use email/password for local login.");
      if (gender) {
        try {
          const { setProfileGender } = await import("@/features/dsa/profile/dsaProfileStore");
          setProfileGender(gender);
        } catch {
          /* ignore */
        }
      }
      return { success: false, error: "Use email/password for local login." };
    },
    []
  );

  const register = useCallback(
    async (username: string, email: string, password: string) => {
      if (!username.trim() || !email.trim() || !password) return { success: false, error: "All fields required" };
      const result = localAuth.register(username.trim(), email.trim(), password);
      if (!result.success) {
        toast.error(result.error);
        return result;
      }
      syncFromLocal();
      recordLoginStreak();
      toast.success("Account created successfully!");
      return { success: true };
    },
    [syncFromLocal]
  );

  const logout = useCallback(async () => {
    localAuth.logout();
    setUser(null);
    toast.success("Signed out");
  }, []);

  return (
    <DsaAuthContext.Provider
      value={{
        user,
        authUser: user,
        token: user ? "local" : null,
        isLoading,
        login,
        loginWithGoogle,
        register,
        logout,
      }}
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
