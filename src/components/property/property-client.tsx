"use client";

import { useMemo } from 'react';
import useStore from '@/hooks/zustand-hook';
import type { Property } from '@/types/property';
import { Star } from 'lucide-react';
import { hostawayApiResponse } from '@/lib/hostaway-mock';
import { googleReviewsApiResponse, googleReviewPropertyMap } from '@/lib/google-reviews-mock';
import PropertyImages from './property-images';
import NameDescription from './name-description';
import BookStay from './cards/book-stay';
import AboutProperty from './cards/about-property';
import Amenities from './cards/amenities';
import StayPolicies from './cards/stay-policies';
import PropertyLocation from './cards/property-location';
import GuestReviews from './cards/guest-reviews';

interface PropertyClientProps {
    property: Property;
}

export default function PropertyClient({ property }: PropertyClientProps) {
    const reviewStatus = useStore((state) => state.reviewStatus);

    const publicReviews = useMemo(() => {
        const listingNameMap: { [key: string]: string } = {
            "Shoreditch Heights Apartment": "2B N1 A - 29 Shoreditch Heights",
            "Downtown Loft": "DTL - 15 Market Street",
        };
        const targetListingName = listingNameMap[property.name];
        
        let hostawayReviews: any[] = [];
        if (targetListingName) {
            const allHostawayForListing = hostawayApiResponse.result.filter(
                review => review.listingName === targetListingName
            );
            const hostReplies = allHostawayForListing.filter(
                review => review.type === 'host-to-guest' && review.status === 'published'
            );
            const hostRepliesMap = new Map(
                hostReplies.map(reply => [
                    reply.guestName,
                    { content: reply.publicReview, date: reply.submittedAt }
                ])
            );
            hostawayReviews = allHostawayForListing
                .filter(review => review.type === 'guest-to-host')
                .map(review => {
                    const totalRating = review.reviewCategory.reduce((acc, cat) => acc + cat.rating, 0);
                    const averageRating = review.reviewCategory.length > 0 ? (totalRating / review.reviewCategory.length) / 2 : 0;
                    return {
                        id: review.id.toString(),
                        author: review.guestName,
                        rating: averageRating,
                        date: review.submittedAt,
                        content: review.publicReview,
                        categoryRatings: review.reviewCategory.map(cat => ({ ...cat, rating: cat.rating / 2 })),
                        hostReply: hostRepliesMap.get(review.guestName),
                        isPublicDefault: review.status === 'published',
                    };
                });
        }

        const googleReviews = googleReviewsApiResponse.result.reviews
            .filter(review => {
                const reviewPropertyId = googleReviewPropertyMap[review.author_name as keyof typeof googleReviewPropertyMap];
                return reviewPropertyId === property.id;
            })
            .map(review => ({
                id: `google_${review.time}`,
                author: review.author_name,
                rating: review.rating,
                date: new Date(review.time * 1000).toISOString(),
                content: review.text,
                categoryRatings: [],
                hostReply: undefined,
                isPublicDefault: true, 
            }));

        const allReviews = [...hostawayReviews, ...googleReviews];

        return allReviews
            .filter(review => {
                const persistedStatus = reviewStatus[review.id];
                if (persistedStatus !== undefined) {
                    return persistedStatus;
                }
                return review.isPublicDefault;
            })
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [property.id, property.name, reviewStatus]);

    const overallRatingData = useMemo(() => {
        const listingNameMap: { [key: string]: string } = {
            "Shoreditch Heights Apartment": "2B N1 A - 29 Shoreditch Heights",
            "Downtown Loft": "DTL - 15 Market Street",
        };

        const targetListingName = listingNameMap[property.name];

        const hostawayGuestReviews = targetListingName ? hostawayApiResponse.result.filter(
            review => review.listingName === targetListingName && review.type === 'guest-to-host'
        ) : [];

        const hostawayTotalOfAveragesOutOf5 = hostawayGuestReviews.reduce((sum, review) => {
            if (!review.reviewCategory || review.reviewCategory.length === 0) return sum;
            const reviewTotal = review.reviewCategory.reduce((acc, cat) => acc + cat.rating, 0);
            const reviewAverageOutOf10 = reviewTotal / review.reviewCategory.length;
            return sum + (reviewAverageOutOf10 / 2);
        }, 0);

        const googleReviewsForProperty = googleReviewsApiResponse.result.reviews.filter(review => {
            const reviewPropertyId = googleReviewPropertyMap[review.author_name as keyof typeof googleReviewPropertyMap];
            return reviewPropertyId === property.id;
        });

        const googleTotalRating = googleReviewsForProperty.reduce((sum, review) => sum + review.rating, 0);

        const totalReviewsCount = hostawayGuestReviews.length + googleReviewsForProperty.length;
        if (totalReviewsCount === 0) {
            return { average: 0, count: 0 };
        }

        const combinedTotalRating = hostawayTotalOfAveragesOutOf5 + googleTotalRating;
        const overallAverage = combinedTotalRating / totalReviewsCount;

        return {
            average: overallAverage,
            count: totalReviewsCount,
        };
    }, [property.id, property.name]);
 
    return (
        <div 
            className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 font-sans" 
            style={{ backgroundColor: "#fffdf6" }}
        >
            <PropertyImages property={property} />
            <NameDescription property={property} />
            
            {overallRatingData.count > 0 && (
                <div className="flex items-center gap-2 my-6">
                    <Star className="size-5 fill-yellow-500 text-yellow-500" />
                    <span className="font-bold text-lg text-gray-800">{overallRatingData.average.toFixed(1)}</span>
                    {publicReviews.length > 0 && (
                        <>
                            <span className="text-gray-600">·</span>
                            <a href="#guest-reviews" className="text-gray-600 hover:underline">
                                {publicReviews.length} {publicReviews.length === 1 ? 'review' : 'reviews'}
                            </a>
                        </>
                    )}
                </div>
            )}

           <div className="flex flex-col md:flex-row md:gap-8 lg:gap-12">
                <div className="w-full md:w-[70%] space-y-6">
                    <AboutProperty property={property} />
                    <Amenities property={property} />
                    <StayPolicies property={property} />
                    {/* Since there is no access to google api services, this is ignored for now */}
                    {/* <PropertyLocation property={property} /> */}
                    <div id="guest-reviews" className="scroll-mt-24">
                        <GuestReviews property={property} reviews={publicReviews} />
                    </div>
                </div>

                <div className="w-full md:w-[30%] mt-8 md:mt-0">
                    <div className="sticky top-24">
                        <BookStay />
                    </div>
                </div>
           </div>
        </div>
    );
}