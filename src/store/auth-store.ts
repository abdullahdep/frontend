import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: Omit<User, 'password'> | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, grade: number) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const { user } = await response.json();
      set({ user, isAuthenticated: true, isLoading: false });
      
      // Store user in sessionStorage for persistence
      sessionStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (name: string, email: string, password: string, grade: number) => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, grade, role: 'student' }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const user = await response.json();
      set({ user, isAuthenticated: true, isLoading: false });
      
      // Store user in sessionStorage for persistence
      sessionStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: () => {
    sessionStorage.removeItem('user');
    set({ user: null, isAuthenticated: false });
  },
}));

// Initialize auth state from sessionStorage
const storedUser = sessionStorage.getItem('user');
if (storedUser) {
  useAuthStore.setState({ 
    user: JSON.parse(storedUser), 
    isAuthenticated: true 
  });
}