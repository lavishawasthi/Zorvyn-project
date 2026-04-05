import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: { 
    name: 'Aarav Sharma', 
    email: 'aarav@finance.io', 
    role: 'Admin' 
  },
  isAuthenticated: true,
  
  setUser: (userData) => set({ 
    user: userData, 
    isAuthenticated: !!userData 
  }),
  
  setRole: (role) => set((state) => ({ 
    user: { ...state.user, role } 
  })),

  logout: () => set({ 
    user: null, 
    isAuthenticated: false 
  }),
}));