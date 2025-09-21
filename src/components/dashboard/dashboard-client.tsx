'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { mockProperties } from '@/lib/mockProperties';
import DashboardFilters from './dashboard-filters';
import ReviewsTable from './reviews-table';
import { toast } from "sonner";
import KpiCard from './kpi-card';
import useStore from '@/hooks/zustand-hook';
import { Star, MessageSquare, TrendingUp } from 'lucide-react';
import { NormalizedReview } from '@/lib/reviewService';

type ReviewWithProperty = NormalizedReview;

export default function DashboardClient() {
    const router = useRouter();
    const { role, isLoggedIn } = useStore();
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    useEffect(() => {
        // This effect handles the redirection side-effect.
        // It runs after the component mounts and whenever the auth state changes.
        if (hasMounted && (!isLoggedIn || role !== 'landlord')) {
            router.push('/');
        }
    }, [hasMounted, isLoggedIn, role, router]);

    const [properties] = useState(mockProperties);
    const [allReviews, setAllReviews] = useState<NormalizedReview[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Filter and Sort states
    const [selectedProperty, setSelectedProperty] = useState('all');
    const [selectedRating, setSelectedRating] = useState(0); 
    const [selectedChannel, setSelectedChannel] = useState('all');
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [sortConfig, setSortConfig] = useState<{ key: keyof ReviewWithProperty, direction: 'asc' | 'desc' } | null>({ key: 'date', direction: 'desc' });

    useEffect(() => {
        const loadReviews = async () => {
            setIsLoading(true);
            try {
                const res = await fetch('/api/reviews/hostaway');
                if (!res.ok) throw new Error('Failed to fetch reviews');
                const { data }: { data: NormalizedReview[] } = await res.json();
                setAllReviews(data);
            } catch (error) {
                console.error("Failed to fetch reviews:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadReviews();
    }, []);

    const handleTogglePublic = (reviewId: string) => {
        let isMakingPublic = false;
        setAllReviews(prevReviews =>
            prevReviews.map(review => {
                if (review.id === reviewId) {
                    isMakingPublic = !review.isPublic;
                    return { ...review, isPublic: isMakingPublic };
                }
                return review;
            })
        );

        if (isMakingPublic) {
            toast.success("Review has been made public.");
        } else {
            toast.info("Review has been hidden from public view.");
        }
    };

    const channels = useMemo(() => {
        const uniqueChannels = [...new Set(allReviews.map((r) => r.channel))];
        return ['all', ...uniqueChannels];
    }, [allReviews]);

    const filteredReviews = useMemo(() => {
        let reviews = [...allReviews];
        
        // Property filter
        if (selectedProperty !== 'all') {
            reviews = reviews.filter(r => r.propertyId === selectedProperty);
        }

        // Rating filter (e.g., 4 means 4 stars and up)
        if (selectedRating > 0) {
            reviews = reviews.filter(r => r.rating >= selectedRating);
        }

        // Channel filter
        if (selectedChannel !== 'all') {
            reviews = reviews.filter(r => r.channel === selectedChannel);
        }

        // Date range filter
        if (dateRange.start) {
            const startDate = new Date(dateRange.start);
            startDate.setHours(0, 0, 0, 0);
            reviews = reviews.filter(r => new Date(r.date) >= startDate);
        }
        if (dateRange.end) {
            const endDate = new Date(dateRange.end);
            endDate.setHours(23, 59, 59, 999);
            reviews = reviews.filter(r => new Date(r.date) <= endDate);
        }

        return reviews;
    }, [allReviews, selectedProperty, selectedRating, selectedChannel, dateRange]);

    const sortedReviews = useMemo(() => {
        let sortableItems = [...filteredReviews];
        if (sortConfig !== null && sortConfig !== undefined) {
            sortableItems.sort((a, b) => {
                const key = sortConfig.key;
                const direction = sortConfig.direction;
                const aValue = a[key];
                const bValue = b[key];
                if (aValue === undefined || bValue === undefined) {
                    return 0;
                }
                if (aValue < bValue) {
                    return direction === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [filteredReviews, sortConfig]);

    const averageRating = useMemo(() => {
        if (filteredReviews.length === 0) return 'N/A';
        const total = filteredReviews.reduce((sum, review) => sum + review.rating, 0);
        return (total / filteredReviews.length).toFixed(1);
    }, [filteredReviews]);

    // Render Guards
    // 1. Wait for the component to mount on the client. This prevents race conditions with auth state.
    if (!hasMounted) {
        return <div className="text-center p-12">Loading Dashboard...</div>;
    }

    // 2. If not authorized, show a message. The useEffect above will handle the actual redirect.
    if (!isLoggedIn || role !== 'landlord') {
        return <div className="text-center p-12">Redirecting to login...</div>;
    }

    // 3. While reviews are being fetched, show a loading state.
    if (isLoading) {
        return <div className="text-center p-12">Loading reviews...</div>;
    }

    return (
        <div className="space-y-6 bg-[#fffdf6]">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <KpiCard title="Average Rating" value={averageRating.toString()} icon={<Star className="size-6 text-yellow-500" />} />
                <KpiCard title="Total Reviews" value={filteredReviews.length.toString()} icon={<MessageSquare className="size-6 text-blue-500" />} />
                <KpiCard title="Public Reviews" value={filteredReviews.filter(r => r.isPublic).length.toString()} icon={<TrendingUp className="size-6 text-green-500" />} />
            </div>

            <DashboardFilters 
                properties={properties}
                selectedProperty={selectedProperty}
                setSelectedProperty={setSelectedProperty}
                channels={channels}
                selectedChannel={selectedChannel}
                setSelectedChannel={setSelectedChannel}
                selectedRating={selectedRating}
                setSelectedRating={setSelectedRating}
                dateRange={dateRange}
                setDateRange={setDateRange}
            />

            <ReviewsTable reviews={sortedReviews} sortConfig={sortConfig} setSortConfig={setSortConfig} onTogglePublic={handleTogglePublic} />
        </div>
    );
}