import type { User } from '../types';
import { getFromStorage, saveToStorage, removeFromStorage, STORAGE_KEYS } from '../utils/storage';

interface StoredUser {
  email: string;
  password: string;
}

export const authService = {
  login: async (email: string, password: string): Promise<User | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const users = getFromStorage<StoredUser[]>(STORAGE_KEYS.USERS) || [];
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const userData: User = { email, token: `token_${Date.now()}` };
      saveToStorage(STORAGE_KEYS.SESSION, userData);
      return userData;
    }
    return null;
  },

  signup: async (email: string, password: string): Promise<User | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const users = getFromStorage<StoredUser[]>(STORAGE_KEYS.USERS) || [];
    if (users.find(u => u.email === email)) {
      return null; 
    }
    
    users.push({ email, password });
    saveToStorage(STORAGE_KEYS.USERS, users);
    
    const userData: User = { email, token: `token_${Date.now()}` };
    saveToStorage(STORAGE_KEYS.SESSION, userData);
    return userData;
  },

  logout: (): void => {
    removeFromStorage(STORAGE_KEYS.SESSION);
  },

  getSession: (): User | null => {
    return getFromStorage<User>(STORAGE_KEYS.SESSION);
  }
};