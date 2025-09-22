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
    const { role, isLoggedIn, reviewStatus, setReviewStatus } = useStore();
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    useEffect(() => {
        
        if (hasMounted && (!isLoggedIn || role !== 'landlord')) {
            router.push('/');
        }
    }, [hasMounted, isLoggedIn, role, router]);

    const [properties] = useState(mockProperties);
    const [rawReviews, setRawReviews] = useState<NormalizedReview[]>([]);
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
                const [hostawayRes, googleRes] = await Promise.all([
                    fetch('/api/reviews/hostaway'),
                    fetch('/api/reviews/google') 
                ]);

                if (!hostawayRes.ok || !googleRes.ok) {
                    throw new Error('Failed to fetch reviews from one or more sources');
                }

                const hostawayJson = await hostawayRes.json();
                const googleJson = await googleRes.json();

                const combinedReviews = [...hostawayJson.data, ...googleJson.data];
                setRawReviews(combinedReviews);
            } catch (error) {
                console.error("Failed to fetch reviews:", error);
                toast.error("Failed to fetch reviews. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        loadReviews();
    }, []);

    const allReviews = useMemo(() => {
        return rawReviews.map(review => ({
            ...review,
            isPublic: reviewStatus[review.id] !== undefined ? reviewStatus[review.id] : review.isPublic,
        }));
    }, [rawReviews, reviewStatus]);

    const handleTogglePublic = (reviewId: string) => {
        const currentReview = allReviews.find(r => r.id === reviewId);
        if (!currentReview) return;

        const isMakingPublic = !currentReview.isPublic;
        setReviewStatus(reviewId, isMakingPublic);

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
        
        if (selectedProperty !== 'all') {
            reviews = reviews.filter(r => r.propertyId === selectedProperty);
        }

        if (selectedRating > 0) {
            reviews = reviews.filter(r => r.rating >= selectedRating);
        }

        if (selectedChannel !== 'all') {
            reviews = reviews.filter(r => r.channel === selectedChannel);
        }

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

    if (!hasMounted) {
        return <div className="text-center p-12">Loading Dashboard...</div>;
    }

    if (!isLoggedIn || role !== 'landlord') {
        return <div className="text-center p-12">Redirecting to login...</div>;
    }

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

            <ReviewsTable 
                reviews={sortedReviews} 
                sortConfig={sortConfig} 
                setSortConfig={setSortConfig} 
                onTogglePublic={handleTogglePublic} 
            />
        </div>
    );
}