export const googleReviewsApiResponse = {
    "result": {
        "reviews": [
            {
                "author_name": "Chris P.",
                "author_url": "https://www.google.com/maps/contrib/12345/reviews",
                "profile_photo_url": "https://lh3.googleusercontent.com/a-/AOh14GgQ...=s128-c0x00000000-cc-rp-mo",
                "rating": 5,
                "relative_time_description": "a month ago",
                "text": "Absolutely stunning apartment in a prime location. The place was spotless and had all the modern amenities we could ask for. The host was incredibly responsive. Will definitely be back!",
                "time": 1758009600 
            },
            {
                "author_name": "Samantha Bee",
                "author_url": "https://www.google.com/maps/contrib/67890/reviews",
                "profile_photo_url": "https://lh3.googleusercontent.com/a-/AOh14GgQ...=s128-c0x00000000-cc-rp-mo",
                "rating": 4,
                "relative_time_description": "two weeks ago",
                "text": "Great stay at the Downtown Loft. The location is unbeatable, right in the heart of the city. The apartment was stylish and comfortable. Lost one star because the street noise was a bit loud at night, but that's city life!",
                "time": 1756444800 
            }
        ]
    },
    "status": "OK"
};

export const googleReviewPropertyMap: { [key: string]: string } = {
    "Chris P.": "prop_001", 
    "Samantha Bee": "prop_002" 
};

export const propertyNameMap: { [key: string]: string } = {
    "prop_001": "2B N1 A - 29 Shoreditch Heights",
    "prop_002": "DTL - 15 Market Street"
};