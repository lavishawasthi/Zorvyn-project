import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null, // { name: '', email: '', role: 'Admin' | 'Analyst' | 'Viewer' }
  isAuthenticated: false,
  
  setUser: (userData) => set({ user: userData, isAuthenticated: !!userData }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));