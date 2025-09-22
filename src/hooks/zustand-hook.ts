import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface StoreState {
    isLoggedIn: boolean;
    role: 'guest' | 'landlord';
    reviewStatus: Record<string, boolean>; 
    login: (role: 'guest' | 'landlord') => void;
    logout: () => void;
    setReviewStatus: (reviewId: string, isPublic: boolean) => void;
}

const useStore = create<StoreState>()(
    persist(
        (set) => ({
            isLoggedIn: false,
            role: 'guest',
            reviewStatus: {},

            login: (role) => set({ isLoggedIn: true, role }),
            logout: () => set({ isLoggedIn: false, role: 'guest', reviewStatus: {} }),
            setReviewStatus: (reviewId, isPublic) => set((state) => ({
                reviewStatus: {
                    ...state.reviewStatus,
                    [reviewId]: isPublic,
                }
            })),
        }),
        {
            name: 'flex-reviews-storage', 
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useStore;