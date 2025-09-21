import { mockProperties } from "./mockProperties";
import { Property } from "@/types/property";
import { hostawayApiResponse } from "./hostaway-mock";

/**
 * Processes raw review data from the Hostaway mock.
 * This function filters for relevant reviews, maps them to properties,
 * and calculates an overall rating.
 * NOTE: This assumes that each property in `mockProperties` has a `name`
 * field that corresponds to the `listingName` in the review data.
 */
async function getHostawayReviews() {
    const listingNameToIdMap = new Map<string, string>();
    // Assuming `p.name` exists on the property object and corresponds to `listingName`.
    mockProperties.forEach(p => {
        if ((p as any).name) {
            listingNameToIdMap.set((p as any).name, p.id);
        }
    });

    const allReviews = hostawayApiResponse.result
        .filter(review => review.status === 'published' && review.type === 'guest-to-host')
        .map(review => {
            const propertyId = listingNameToIdMap.get(review.listingName);

            // Calculate an overall rating out of 5 stars from categories like cleanliness and communication.
            const relevantCategories = review.reviewCategory.filter(c => c.category === 'cleanliness' || c.category === 'communication');
            const rating = relevantCategories.length > 0
                ? (relevantCategories.reduce((acc, cat) => acc + cat.rating, 0) / relevantCategories.length) / 2
                : 0;

            return {
                id: review.id,
                publicReview: review.publicReview,
                guestName: review.guestName,
                submittedAt: review.submittedAt,
                rating: parseFloat(rating.toFixed(1)),
                propertyId: propertyId,
            };
        });

    return allReviews.filter(review => review.propertyId); // Only return reviews that were successfully mapped to a property.
}

export async function getPropertyById(id: string): Promise<Property | null> {
    const property = mockProperties.find((p) => p.id === id);
    
    if (!property) {
        return null;
    }

    // Fetch all hostaway reviews and filter for the current property
    const hostawayReviews = await getHostawayReviews(); 
    const propertyReviews = hostawayReviews.filter(review => review.propertyId === id);

    return { ...property, reviews: propertyReviews };
}

export async function getAllProperties(): Promise<Property[]> {
    return mockProperties;
}
