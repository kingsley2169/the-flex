import { NextResponse } from 'next/server';
import { googleReviewsApiResponse, googleReviewPropertyMap, propertyNameMap } from '@/lib/google-reviews-mock';
import type { NormalizedReview } from '@/lib/reviewService';

function normalizeGoogleData(apiResponse: typeof googleReviewsApiResponse): NormalizedReview[] {
  const reviews = apiResponse.result.reviews;

  return reviews.map((review) => {
    const propertyId = googleReviewPropertyMap[review.author_name as keyof typeof googleReviewPropertyMap] || 'unknown_property';
    const propertyName = propertyNameMap[propertyId as keyof typeof propertyNameMap] || 'Unknown Property';

    return {
      id: `google_${review.time}`, 
      propertyId: propertyId,
      propertyName: propertyName,
      rating: review.rating,
      content: review.text,
      author: review.author_name,
      date: new Date(review.time * 1000).toISOString(), 
      channel: 'Google',
      isPublic: true,
    };
  });
}

export async function GET() {
  try {
    // const GOOGLE_ACCOUNT_ID = `${process.env.GOOGLE_ACCOUNT_ID}`;
    // const GOOGLE_API_KEY = `${process.env.GOOGLE_API_KEY}`;

    //  Mock call to Hostaway api
    //  const res = await fetch("https://mybusiness.googleapis.com/v4/accounts/{GOOGLE_ACCOUNT_ID}/locations/{locationId}/reviews", {
    //      cache: "no-store"
    //  });

    // const hostawayApiResponse = await res.json();

    const normalizedReviews = normalizeGoogleData(googleReviewsApiResponse);

    // Simulated network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return NextResponse.json({ status: 'success', data: normalizedReviews });
  } catch (error) {
    console.error("Failed to process Google reviews:", error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ status: 'error', message }, { status: 500 });
  }
}

