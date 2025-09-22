import { Property } from "@/types/property";

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

export const mockProperties: Property[] = [
    {
        id: "prop_001",
        name: "Shoreditch Heights Apartment",
        images: [
            "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2070&auto=format&fit=crop",
            "https://plus.unsplash.com/premium_photo-1684175656320-5c3f701c082c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1680&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1968&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop"
        ],
        reviews: [],
        description: {
            guests: 4,
            rooms: 2,
            bathrooms: 1,
            beds: 2
        },
        about: "Modern 2-bedroom apartment in the heart of Shoreditch, perfect for families or business travelers. Walking distance to cafes, bars, and transport.",
        amenities: [
            "Wi-Fi",
            "Kitchen",
            "Washer",
            "Air Conditioning",
            "Smart TV",
            "Elevator"
        ],
        stayPolicy: {
            checkIn: "3:00 PM",
            checkOut: "11:00 AM",
            houseRules: ["No smoking", "No pets", "No parties"],
            cancellationPolicy: "Free cancellation up to 48 hours before check-in. After that, non-refundable."
        },
        location: {
            address: "29 Shoreditch Heights",
            city: "London",
            country: "UK",
            lat: 51.526,
            lng: -0.078
        }
    },
    {
        id: "prop_002",
        name: "Downtown Loft",
        images: [
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1980&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1502672023488-70e25813eb80?q=80&w=1664&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
        ],
        reviews: [], 
        description: {
            guests: 2,
            rooms: 1,
            bathrooms: 1,
            beds: 1
        },
        about: "Stylish loft in downtown area with open-plan living space. Ideal for couples or solo travelers.",
        amenities: ["Wi-Fi", "Heating", "Balcony", "Coffee Machine"],
        stayPolicy: {
            checkIn: "2:00 PM",
            checkOut: "10:00 AM",
            houseRules: ["No smoking", "Pets allowed on request"],
            cancellationPolicy: "Free cancellation up to 24 hours before check-in. After that, 50% refund."
        },
        location: {
            address: "15 Market Street",
            city: "New York",
            country: "USA",
            lat: 40.7128,
            lng: -74.006
        }
    }
];
