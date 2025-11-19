import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '../firebase';
import { User, onAuthStateChanged, signInWithEmailAndPassword, signOut, AuthError } from 'firebase/auth';

interface LoginResult {
  success: boolean;
  error?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<LoginResult>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  login: async () => ({ success: false, error: 'Login function not initialized.' }),
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string): Promise<LoginResult> => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      window.location.hash = '#admin';
      return { success: true };
    } catch (error) {
      console.error("Firebase login error:", error);
      const authError = error as AuthError;
      if (authError.code === 'auth/invalid-login-credentials') {
        return { success: false, error: 'Invalid email or password. Please double-check your credentials.' };
      }
      return { success: false, error: 'An unexpected error occurred during login. Please try again.' };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      window.location.hash = '#home';
    } catch (error) {
      console.error("Firebase logout error:", error);
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};