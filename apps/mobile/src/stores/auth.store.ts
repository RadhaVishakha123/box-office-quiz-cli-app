import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { keychainStorageAdapter } from '../utils/keychainStorageAdapter';
interface User {
  id: number;
  name: string;
  avatar: string;
  deviceToken: string;
  deviceType: string;
}
type AuthState = {
  user: User | null;
  setUser: (user: any) => void;
};

const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      setUser: (user: any) => set({ user }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => keychainStorageAdapter),
    },
  ),
);

export default useAuthStore;
