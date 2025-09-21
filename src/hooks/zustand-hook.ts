import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { NormalizedReview } from '@/lib/reviewService';

interface StoreState {
    isLoggedIn: boolean;
    role: 'guest' | 'landlord';
    reviews: NormalizedReview[];
    login: (role: 'guest' | 'landlord') => void;
    logout: () => void;
    fetchReviews: () => Promise<void>;
    togglePublic: (reviewId: string) => void;
}

const useStore = create<StoreState>()(
    persist(
        (set, get) => ({
            isLoggedIn: false,
            role: 'guest',
            reviews: [],

            login: (role) => set({ isLoggedIn: true, role }),
            logout: () => {
                // Clear user-specific state on logout
                set({ isLoggedIn: false, role: 'guest', reviews: [] });
            },

            fetchReviews: async () => {
                if (get().reviews.length > 0) return; // Avoid refetching
                try {
                    const res = await fetch('/api/reviews/hostaway');
                    if (!res.ok) throw new Error('Failed to fetch reviews');
                    const { data }: { data: NormalizedReview[] } = await res.json();
                    set({ reviews: data });
                } catch (error) {
                    console.error("Failed to fetch reviews:", error);
                }
            },

            togglePublic: (reviewId: string) => {
                set((state) => ({
                    reviews: state.reviews.map((review) =>
                        review.id === reviewId
                            ? { ...review, isPublic: !review.isPublic }
                            : review
                    ),
                }));
            },
        }),
        {
            name: 'flex-reviews-storage', // unique name for localStorage key
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useStore;