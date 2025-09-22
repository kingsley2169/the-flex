
'use client';

import { useState } from "react";
import { Property } from "@/types/property";
import { Star } from "lucide-react";

interface GuestReviewsProps {
    property: Property;
    reviews: any[];
}

const REVIEW_LENGTH_THRESHOLD = 250;
const INITIAL_REVIEWS_COUNT = 1;

const GuestReviews = ({ property, reviews: publicReviews }: GuestReviewsProps) => {
    const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({});
    const [showAllReviews, setShowAllReviews] = useState(false);

    const toggleExpanded = (reviewId: string) => {
        setExpandedReviews(prev => ({ ...prev, [reviewId]: !prev[reviewId] }));
    };

    if (!publicReviews || publicReviews.length === 0) {
        return null;
    }

    const reviewsToShow = showAllReviews
        ? publicReviews
        : publicReviews.slice(0, INITIAL_REVIEWS_COUNT);

    return (
        <div className="border-1 border-gray-200 bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-2xl font-bold mb-6 text-[#333333]">
                Guest Reviews ({publicReviews.length})
            </h2>
            <div className="space-y-8">
                {reviewsToShow.map(review => {
                    const categoryRatings = (review as any).categoryRatings as { category: string; rating: number }[] | undefined;
                    const hostReply = (review as any).hostReply as { content: string; date: string } | undefined;

                    const isExpanded = !!expandedReviews[review.id];
                    const isLongReview = review.content.length > REVIEW_LENGTH_THRESHOLD;
                    const displayedContent = isLongReview && !isExpanded
                        ? `${review.content.substring(0, REVIEW_LENGTH_THRESHOLD)}...`
                        : review.content;

                    return (
                        <div key={review.id}>
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-600 shrink-0">
                                        {review.author.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800">{review.author}</p>
                                        <p className="text-sm text-gray-500">
                                            {new Date(review.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-yellow-500">
                                    <Star className="size-5 fill-current" />
                                    <span className="font-bold text-gray-800">{review.rating.toFixed(1)}</span>
                                </div>
                            </div>
                            <div className="mt-3 pl-[52px]"> {/* 40px avatar width + 12px gap */}
                                <p className="text-gray-600 whitespace-pre-line">{displayedContent}</p>
                                {isLongReview && (
                                    <button
                                        onClick={() => toggleExpanded(review.id)}
                                        className="text-sm font-semibold text-[#284E4C] hover:underline mt-2 hover:cursor-pointer"
                                    >
                                        {isExpanded ? "Show Less" : "Show More"}
                                    </button>
                                )}
                            </div>
                            {categoryRatings && categoryRatings.length > 0 && (
                                <div className="mt-4 pl-[52px] grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                                    {categoryRatings.map((cat) => (
                                        <div key={cat.category} className="flex justify-between items-center text-sm">
                                            <span className="text-gray-600 capitalize">{cat.category.replace(/_/g, ' ')}</span>
                                            <div className="flex items-center gap-1.5">
                                                <Star className="size-4 text-yellow-400 fill-current" />
                                                <span className="font-semibold text-gray-700">{cat.rating.toFixed(1)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {hostReply && (
                                <div className="mt-4 ml-[52px] p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <h4 className="font-semibold text-gray-800 mb-1">Host Reply</h4>
                                    <p className="text-gray-600 whitespace-pre-line">{hostReply.content}</p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            {publicReviews.length > INITIAL_REVIEWS_COUNT && (
                <div className="mt-8">
                    <button
                        onClick={() => setShowAllReviews(prev => !prev)}
                        className="hover:cursor-pointer inline-flex items-center justify-center whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-sm h-12 rounded-md px-8 w-full border-[#284E4C]/20 text-[#284E4C] hover:bg-[#284E4C]/5 hover:border-[#284E4C]/30"
                    >
                        {showAllReviews ? "Show less" : `Show all ${publicReviews.length} reviews`}
                    </button>
                </div>
            )}
        </div>
    );
}

export default GuestReviews;  