// Firebase configuration for AzulHomes
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase config - Replace with your actual config
const firebaseConfig = {
  apiKey: "demo-api-key",
  authDomain: "azulhomes-demo.firebaseapp.com",
  projectId: "azulhomes-demo",
  storageBucket: "azulhomes-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456789"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;