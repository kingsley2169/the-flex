import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface StoreState {
    isLoggedIn: boolean;
    role: 'guest' | 'landlord';
    login: (role: 'guest' | 'landlord') => void;
    logout: () => void;
}

const useStore = create<StoreState>()(
    persist(
        (set) => ({
            isLoggedIn: false,
            role: 'guest',

            login: (role) => set({ isLoggedIn: true, role }),
            logout: () => set({ isLoggedIn: false, role: 'guest' }),
        }),
        {
            name: 'flex-reviews-storage', // unique name for localStorage key
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useStore;