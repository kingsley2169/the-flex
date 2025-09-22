export interface Review {
    id: string;
    author: string;
    rating: number;
    channel: 'Hostaway' | 'Google';
    date: string;
    content: string;
    isPublic: boolean;
    tags?: string[];
}

export interface Property {
    id: string;
    name: string;
    images: string[];
    description: {
        guests: number;
        rooms: number;
        bathrooms: number;
        beds: number;
    };
    about: string;
    reviews: Review[];
    amenities: string[];
    stayPolicy: {
        checkIn: string;
        checkOut: string;
        houseRules: string[];
        cancellationPolicy: string;
    };
    location: {
        address: string;
        city: string;
        country: string;
        lat: number;
        lng: number;
    };
}
