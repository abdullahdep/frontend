import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, grade: number) => Promise<void>;
  logout: () => void;
  upgradeAccount: () => Promise<void>;
}

// Mock user data for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@safaracademy.com',
    role: 'admin',
    isPremium: true,
  },
  {
    id: '2',
    name: 'Student User',
    email: 'student@example.com',
    role: 'student',
    grade: 10,
    isPremium: false,
  },
];

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (user) {
      set({ 
        user, 
        isAuthenticated: true, 
        isLoading: false 
      });
    } else {
      set({ isLoading: false });
      throw new Error('Invalid email or password');
    }
  },
  
  register: async (name: string, email: string, password: string, grade: number) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (existingUser) {
      set({ isLoading: false });
      throw new Error('User with this email already exists');
    }
    
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      role: 'student',
      grade,
      isPremium: false,
    };
    
    // In a real app, we would save this to a database
    mockUsers.push(newUser);
    
    set({ 
      user: newUser, 
      isAuthenticated: true, 
      isLoading: false 
    });
  },
  
  logout: () => {
    set({ 
      user: null, 
      isAuthenticated: false 
    });
  },
  
  upgradeAccount: async () => {
    set({ isLoading: true });
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    set(state => ({
      user: state.user ? { ...state.user, isPremium: true } : null,
      isLoading: false
    }));
  },
}));