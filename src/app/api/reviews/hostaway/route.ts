import { NextResponse } from 'next/server';
import { hostawayApiResponse } from '@/lib/hostaway-mock';
import type { NormalizedReview } from '@/lib/reviewService';

const propertyIdMap: { [key: string]: string } = {
  "2B N1 A - 29 Shoreditch Heights": "prop_001",
  "DTL - 15 Market Street": "prop_002",
};

function normalizeHostawayData(apiResponse: typeof hostawayApiResponse): NormalizedReview[] {
  const guestReviews = apiResponse.result.filter((review) => review.type === 'guest-to-host');

  return guestReviews.map((review) => {
    const totalRating = review.reviewCategory.reduce((sum, cat) => sum + cat.rating, 0);
    const averageRatingOutOf10 = review.reviewCategory.length > 0 ? totalRating / review.reviewCategory.length : 0;
    const ratingOutOf5 = averageRatingOutOf10 / 2;

    return {
      id: review.id.toString(),
      propertyId: propertyIdMap[review.listingName] || 'unknown_property',
      propertyName: review.listingName,
      rating: ratingOutOf5,
      content: review.publicReview,
      author: review.guestName,
      date: new Date(review.submittedAt).toISOString(),
      channel: 'Hostaway', 
      isPublic: review.status === 'published',
    };
  });
}

export async function GET() {
  try {
    // const HOSTAWAY_ACCOUNT_ID = `${process.env.HOSTAWAY_ACCOUNT_ID}`;
    // const HOSTAWAY_API_KEY = `${process.env.HOSTAWAY_API_KEY}`;

    //  Mock call to Hostaway api
    // const res = await fetch("https://sandbox.hostaway.com/v1/reviews", {
    //   headers: {
    //     "Authorization": `Bearer ${HOSTAWAY_API_KEY}`,
    //     "Account-Id": HOSTAWAY_ACCOUNT_ID
    //   },
    //   cache: "no-store"
    // });

    // const hostawayApiResponse = await res.json();

    const normalizedReviews = normalizeHostawayData(hostawayApiResponse);
    // Simulated network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return NextResponse.json({ status: 'success', data: normalizedReviews });
  } catch (error) {
    console.error("Failed to process Hostaway reviews:", error);
    return NextResponse.json({ status: 'error', message: 'Internal Server Error' }, { status: 500 });
  }
}