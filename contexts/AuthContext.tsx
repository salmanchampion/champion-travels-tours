import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => false,
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Check session storage on initial load
    return sessionStorage.getItem('isAdminLoggedIn') === 'true';
  });

  useEffect(() => {
    // Sync state with session storage
    sessionStorage.setItem('isAdminLoggedIn', String(isAuthenticated));
  }, [isAuthenticated]);

  const login = (email: string, pass: string): boolean => {
    // IMPORTANT: This is a simulation. In a real app, this would be a secure API call.
    if (email === 'mohammadsalmansharif37@gmail.com' && pass === 'admin123') {
      setIsAuthenticated(true);
      window.location.hash = '#admin';
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    window.location.hash = '#home';
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
