import React, { createContext, useState, useEffect, ReactNode } from 'react';
import type { User, AuthContextType } from '../types';
import { authService } from '../services/authService';

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const session = authService.getSession();
    if (session) {
      setUser(session);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const userData = await authService.login(email, password);
    if (userData) {
      setUser(userData);
      return true;
    }
    return false;
  };

  const signup = async (email: string, password: string): Promise<boolean> => {
    const userData = await authService.signup(email, password);
    if (userData) {
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};