import { mockProperties, Review } from "./mockProperties";
import { Property } from "@/types/property";
import { hostawayApiResponse } from "./hostaway-mock";
import { googleReviewsApiResponse, googleReviewPropertyMap } from "./google-reviews-mock";


async function getHostawayReviews() {
    const listingNameToIdMap = new Map<string, string>();
    mockProperties.forEach(p => {
        if ((p as any).name) {
            listingNameToIdMap.set((p as any).name, p.id);
        }
    });

    const allReviews = hostawayApiResponse.result
        .filter(review => review.type === 'guest-to-host')
        .map(review => {
            const propertyId = listingNameToIdMap.get(review.listingName);

            const relevantCategories = review.reviewCategory.filter(c => c.category === 'cleanliness' || c.category === 'communication');
            const ratingOutOf10 = relevantCategories.length > 0
                ? (relevantCategories.reduce((acc, cat) => acc + cat.rating, 0) / relevantCategories.length) / 2
                : 0;
            const rating = ratingOutOf10 / 2;

            return {
                id: review.id.toString(),
                content: review.publicReview,
                author: review.guestName,
                date: review.submittedAt,
                rating: parseFloat(rating.toFixed(1)),
                propertyId: propertyId,
                channel: 'Hostaway' as const,
                isPublic: review.status === 'published',
            };
        });

    return allReviews.filter(review => review.propertyId);
}

async function getGoogleReviews() {
    const allReviews = googleReviewsApiResponse.result.reviews.map(review => {
        const propertyId = googleReviewPropertyMap[review.author_name as keyof typeof googleReviewPropertyMap];
        return {
            id: `google_${review.time}`,
            content: review.text,
            author: review.author_name,
            date: new Date(review.time * 1000).toISOString(),
            rating: review.rating,
            propertyId: propertyId,
            channel: 'Google' as const,
            isPublic: true,
        };
    });

    return allReviews.filter(review => review.propertyId);
}

export async function getPropertyById(id: string): Promise<Property | null> {
    const property = mockProperties.find((p) => p.id === id);
    
    if (!property) {
        return null;
    }

    const hostawayReviews = await getHostawayReviews();
    const googleReviews = await getGoogleReviews();
    const allReviews = [...hostawayReviews, ...googleReviews];

    const propertyReviews: Review[] = allReviews
        .filter(review => review.propertyId === id)
        .map(({ propertyId, ...reviewData }) => reviewData); 

    return { ...property, reviews: propertyReviews };
}

export async function getAllProperties(): Promise<Property[]> {
    return mockProperties;
}
