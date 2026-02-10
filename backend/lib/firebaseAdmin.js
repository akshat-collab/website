/**
 * Initialize Firebase Admin (for ID token verification).
 * Set FIREBASE_PROJECT_ID and either FIREBASE_SERVICE_ACCOUNT_JSON (string) or GOOGLE_APPLICATION_CREDENTIALS (path).
 */
import admin from 'firebase-admin';

let app = null;

function init() {
  if (admin.apps?.length) {
    app = admin.app();
    return app;
  }
  const projectId = process.env.FIREBASE_PROJECT_ID;
  if (!projectId) return null;
  try {
    if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
      const cred = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
      app = admin.initializeApp({ credential: admin.credential.cert(cred), projectId });
    } else {
      app = admin.initializeApp({ projectId });
    }
    return app;
  } catch (err) {
    console.warn('Firebase Admin init failed:', err.message);
    return null;
  }
}

app = init();

export function getFirebaseAuth() {
  return app ? admin.auth(app) : null;
}
