import { ChevronRight, Wifi, UtensilsCrossed, WashingMachine, AirVent, Tv, Building, Check } from "lucide-react";
import { Property } from "@/types/property";
import React from "react";

interface AmenitiesProps {
    property: Property;
}

const amenityIcons: { [key: string]: React.ReactNode } = {
    "Wi-Fi": <Wifi size={20} className="text-[#284E4C]" />,
    "Kitchen": <UtensilsCrossed size={20} className="text-[#284E4C]" />,
    "Washer": <WashingMachine size={20} className="text-[#284E4C]" />,
    "Air Conditioning": <AirVent size={20} className="text-[#284E4C]" />,
    "Smart TV": <Tv size={20} className="text-[#284E4C]" />,
    "Elevator": <Building size={20} className="text-[#284E4C]" />,
    "Heating": <AirVent size={20} className="text-[#284E4C]" />,
    "Balcony": <Building size={20} className="text-[#284E4C]" />, 
    "Coffee Machine": <Check size={20} className="text-[#284E4C]" />, 
};

const getAmenityIcon = (amenity: string) => {
    return amenityIcons[amenity] || <Check size={20} className="text-[#284E4C]" />;
};

const Amenities = ({ property }: AmenitiesProps) => {
    return (
        <div className="rounded-lg text-card-foreground p-6 bg-white border-0 shadow-lg">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-[#333333]">Amenities</h2>
                <button
                    className="justify-center whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-sm h-9 px-4 py-2 flex items-center gap-2 border-[#284E4C]/20 text-[#284E4C] hover:bg-[#284E4C]/5 hover:cursor-pointer"
                >
                    View all amenities
                    <ChevronRight size={14} />
                </button>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.slice(0, 6).map((amenity) => (
                    <div key={amenity} className="flex items-center gap-3">
                        {getAmenityIcon(amenity)}
                        <p className="font-medium text-[#333333]">{amenity}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Amenities;