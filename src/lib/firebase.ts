/**
 * Firebase Client Configuration
 * Auth + Analytics. Use env vars in Vercel for production.
 */

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBcHF94OFbIE7R17DIVTGDrW07brw-hX64",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "website-b446b.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "website-b446b",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "website-b446b.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "895029794575",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:895029794575:web:3bfe5600f6123f1002d07a",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-ECYGE5R59C",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Analytics only in browser
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
