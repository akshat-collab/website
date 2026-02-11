import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  type User as FirebaseUser,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
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
  authUser: FirebaseUser | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: (gender?: "male" | "female") => Promise<{ success: boolean; error?: string }>;
  register: (username: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const DsaAuthContext = createContext<DsaAuthContextType | undefined>(undefined);

function firebaseUserToDsaUser(u: FirebaseUser): DsaUser {
  const displayName = u.displayName || u.email?.split("@")[0] || "user";
  return {
    id: u.uid,
    username: displayName,
    email: u.email ?? "",
    profile_photo_url: u.photoURL ?? null,
  };
}

export function DsaAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<DsaUser | null>(null);
  const [authUser, setAuthUser] = useState<FirebaseUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const syncFromFirebase = useCallback(async (u: FirebaseUser | null) => {
    setAuthUser(u);
    if (!u) {
      setUser(null);
      setToken(null);
      return;
    }
    setUser(firebaseUserToDsaUser(u));
    try {
      const t = await u.getIdToken();
      setToken(t);
    } catch {
      setToken(null);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      await syncFromFirebase(u);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [syncFromFirebase]);

  const login = useCallback(async (email: string, password: string) => {
    if (!email.trim() || !password) return { success: false, error: "Email and password required" };
    try {
      const { user: u } = await signInWithEmailAndPassword(auth, email.trim(), password);
      await syncFromFirebase(u);
      recordLoginStreak();
      toast.success("Signed in successfully!");
      return { success: true };
    } catch (err: unknown) {
      const message = err && typeof err === "object" && "message" in err ? String((err as { message: string }).message) : "Login failed";
      toast.error(message);
      return { success: false, error: message };
    }
  }, [syncFromFirebase]);

  const loginWithGoogle = useCallback(
    async (gender?: "male" | "female") => {
      try {
        const { user: u } = await signInWithPopup(auth, googleProvider);
        await syncFromFirebase(u);
        if (gender) {
          try {
            const { setProfileGender } = await import("@/features/dsa/profile/dsaProfileStore");
            setProfileGender(gender);
          } catch {
            /* ignore */
          }
        }
        recordLoginStreak();
        toast.success("Signed in with Google!");
        return { success: true };
      } catch (err: unknown) {
        const message = err && typeof err === "object" && "message" in err ? String((err as { message: string }).message) : "Google sign-in failed";
        toast.error(message);
        return { success: false, error: message };
      }
    },
    [syncFromFirebase]
  );

  const register = useCallback(
    async (username: string, email: string, password: string) => {
      if (!username.trim() || !email.trim() || !password) return { success: false, error: "All fields required" };
      try {
        const { user: u } = await createUserWithEmailAndPassword(auth, email.trim(), password);
        await syncFromFirebase(u);
        recordLoginStreak();
        toast.success("Account created successfully!");
        return { success: true };
      } catch (err: unknown) {
        const message = err && typeof err === "object" && "message" in err ? String((err as { message: string }).message) : "Registration failed";
        toast.error(message);
        return { success: false, error: message };
      }
    },
    [syncFromFirebase]
  );

  const logout = useCallback(async () => {
    await firebaseSignOut(auth);
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
