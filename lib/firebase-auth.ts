import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  AuthError
} from 'firebase/auth';
import { auth } from './firebase';

export interface AuthUser {
  uid: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export class FirebaseAuthService {
  // Sign in with email and password
  static async signIn(email: string, password: string): Promise<AuthUser> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Return user data with role (for demo, admin gets admin role)
      return {
        uid: user.uid,
        email: user.email || '',
        name: user.displayName || 'Admin User',
        role: email === 'admin@azulhomes.com' ? 'admin' : 'user'
      };
    } catch (error) {
      const authError = error as AuthError;
      throw new Error(this.getAuthErrorMessage(authError.code));
    }
  }

  // Sign up new user
  static async signUp(email: string, password: string, name: string): Promise<AuthUser> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      return {
        uid: user.uid,
        email: user.email || '',
        name,
        role: 'user'
      };
    } catch (error) {
      const authError = error as AuthError;
      throw new Error(this.getAuthErrorMessage(authError.code));
    }
  }

  // Sign out
  static async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error('Failed to sign out');
    }
  }

  // Get current user
  static getCurrentUser(): User | null {
    return auth.currentUser;
  }

  // Subscribe to auth state changes
  static onAuthStateChange(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  }

  // Demo admin credentials for development
  static async signInWithDemoCredentials(): Promise<AuthUser> {
    return this.signIn('admin@azulhomes.com', 'admin123');
  }

  // Convert Firebase auth errors to user-friendly messages
  private static getAuthErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No user found with this email address';
      case 'auth/wrong-password':
        return 'Incorrect password';
      case 'auth/email-already-in-use':
        return 'Email address is already registered';
      case 'auth/weak-password':
        return 'Password is too weak';
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later';
      case 'auth/user-disabled':
        return 'This account has been disabled';
      default:
        return 'An error occurred during authentication';
    }
  }
}