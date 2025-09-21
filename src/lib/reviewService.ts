export interface NormalizedReview {
    id: string;
    propertyId: string;
    propertyName: string;
    rating: number;
    content: string;
    author: string;
    date: string;
    channel: string;
    isPublic: boolean;
}