export interface User {
  email: string;
  token: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'inProgress' | 'closed';
  priority?: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}