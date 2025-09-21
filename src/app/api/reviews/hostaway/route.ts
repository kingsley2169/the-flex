import { NextResponse } from 'next/server';
import { hostawayApiResponse } from '@/lib/hostaway-mock';
import type { NormalizedReview } from '@/lib/reviewService';

// This helper maps the verbose listing names from the mock API to our internal property IDs.
const propertyIdMap: { [key: string]: string } = {
  "2B N1 A - 29 Shoreditch Heights": "prop_001",
  "DTL - 15 Market Street": "prop_002",
};

/**
 * Parses and normalizes the raw review data from the Hostaway mock API.
 * - Filters for guest-to-host reviews only.
 * - Calculates a 5-star rating from category scores.
 * - Maps listing names to internal property IDs.
 * - Sets a default `isPublic` status for manager approval.
 */
function normalizeHostawayData(apiResponse: typeof hostawayApiResponse): NormalizedReview[] {
  const guestReviews = apiResponse.result.filter(
    (review) => review.type === 'guest-to-host' && review.status === 'published'
  );

  return guestReviews.map((review) => {
    const totalRating = review.reviewCategory.reduce((sum, cat) => sum + cat.rating, 0);
    const averageRatingOutOf10 = review.reviewCategory.length > 0 ? totalRating / review.reviewCategory.length : 0;
    // Convert a 1-10 scale to a 1-5 scale for our dashboard
    const ratingOutOf5 = averageRatingOutOf10 / 2;

    return {
      id: review.id.toString(),
      propertyId: propertyIdMap[review.listingName] || 'unknown_property',
      propertyName: review.listingName,
      rating: ratingOutOf5,
      content: review.publicReview,
      author: review.guestName,
      date: new Date(review.submittedAt).toISOString(),
      channel: 'Hostaway', // All reviews from this API are from Hostaway
      isPublic: false, // Default to not public; manager will approve in the dashboard
    };
  });
}

export async function GET() {
  try {
    const normalizedReviews = normalizeHostawayData(hostawayApiResponse);
    // Simulate a network delay to make loading states visible
    await new Promise(resolve => setTimeout(resolve, 500));
    return NextResponse.json({ status: 'success', data: normalizedReviews });
  } catch (error) {
    console.error("Failed to process Hostaway reviews:", error);
    return NextResponse.json({ status: 'error', message: 'Internal Server Error' }, { status: 500 });
  }
}