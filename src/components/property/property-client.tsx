"use client";

import { useMemo } from 'react';
import type { Property } from '@/types/property';
import { Star } from 'lucide-react';
import { hostawayApiResponse } from '@/lib/hostaway-mock';
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
    const publicReviews = useMemo(() => {
        const listingNameMap: { [key: string]: string } = {
            "Shoreditch Heights Apartment": "2B N1 A - 29 Shoreditch Heights",
            "Downtown Loft": "DTL - 15 Market Street",
        };

        const targetListingName = listingNameMap[property.name];
        if (!targetListingName) {
            return [];
        }

        const allReviewsForListing = hostawayApiResponse.result.filter(
            review => review.listingName === targetListingName
        );

        const hostReplies = allReviewsForListing.filter(
            review => review.type === 'host-to-guest' && review.status === 'published'
        );

        // Create a map of host replies keyed by guestName for efficient lookup.
        const hostRepliesMap = new Map(
            hostReplies.map(reply => [
                reply.guestName,
                { content: reply.publicReview, date: reply.submittedAt }
            ])
        );

        return allReviewsForListing
            .filter(review =>
                review.status === 'published' &&
                review.type === 'guest-to-host'
            )
            .map(review => {
                const totalRating = review.reviewCategory.reduce((acc, cat) => acc + cat.rating, 0);
                const averageRating = review.reviewCategory.length > 0 ? (totalRating / review.reviewCategory.length) / 2 : 0;
                const hostReply = hostRepliesMap.get(review.guestName);

                return {
                    id: review.id.toString(),
                    author: review.guestName,
                    rating: averageRating,
                    date: review.submittedAt,
                    content: review.publicReview,
                    categoryRatings: review.reviewCategory.map(cat => ({ ...cat, rating: cat.rating / 2 })),
                    hostReply: hostReply,
                };
            })
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [property.name]);

    const overallRatingData = useMemo(() => {
        const listingNameMap: { [key: string]: string } = {
            "Shoreditch Heights Apartment": "2B N1 A - 29 Shoreditch Heights",
            "Downtown Loft": "DTL - 15 Market Street",
        };

        const targetListingName = listingNameMap[property.name];
        if (!targetListingName) {
            return { average: 0, count: 0 };
        }

        const allGuestReviews = hostawayApiResponse.result.filter(
            review => review.listingName === targetListingName && review.type === 'guest-to-host'
        );

        if (allGuestReviews.length === 0) {
            return { average: 0, count: 0 };
        }

        const totalOfAverageRatings = allGuestReviews.reduce((sum, review) => {
            if (!review.reviewCategory || review.reviewCategory.length === 0) return sum;
            const reviewTotal = review.reviewCategory.reduce((acc, cat) => acc + cat.rating, 0);
            const reviewAverage = reviewTotal / review.reviewCategory.length;
            return sum + reviewAverage;
        }, 0);

        const overallAverageOutOf10 = totalOfAverageRatings / allGuestReviews.length;
        const overallAverageOutOf5 = overallAverageOutOf10 / 2;

        return {
            average: overallAverageOutOf5,
            count: allGuestReviews.length,
        };
    }, [property.name]);
 
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