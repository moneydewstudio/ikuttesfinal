import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVMZz54RU0q9T4Db4R3qVaqIVoLm7JDNs",
  authDomain: "psikopop-ba307.firebaseapp.com",
  projectId: "psikopop-ba307",
  storageBucket: "psikopop-ba307.firebasestorage.app",
  messagingSenderId: "654380154713",
  appId: "1:654380154713:web:347cee0ddb36f2fe0e9648",
  measurementId: "G-Q10XR26GK1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Auth functions
export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithRedirect(auth, provider);
    // The user will be redirected to the Google sign-in page
    // After signing in, they'll be redirected back to the app
    // The redirect result will be handled in handleRedirectResult function
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

export const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      // User successfully signed in
      return result.user;
    }
    return null;
  } catch (error) {
    console.error("Error handling redirect result", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out", error);
    throw error;
  }
};
