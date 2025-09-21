import { Property } from "@/types/property";
import { Bath, Bed, House, Users } from "lucide-react";

interface NameDescriptionProps {
    property: Property;
}

const NameDescription = ({ property }: NameDescriptionProps) => {
    return (
        <div className="mb-8 md:mb-12">
            <h1 className="text-2xl font-bold mb-6 text-[#333333] sm:text-3xl">{property.name}</h1>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-6 border-b w-full border-gray-200 pb-8">

                <button data-state="closed">
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-full">
                            <Users size={20} /> 
                        </div>
                        <div className="text-sm">
                            <span className="font-medium text-[#333333]">{property.description.guests}</span>
                            <span className="text-[#5C5C5A] block">Guests</span>
                        </div>
                    </div>
                </button>

                <button data-state="closed">
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-full">
                            <Bed size={20} /> 
                        </div>       
                        <div className="text-sm">
                            <span className="font-medium text-[#333333]">{property.description.rooms}</span>
                            <span className="text-[#5C5C5A] block">Bedrooms</span>
                        </div>                     
                    </div>
                </button>

                <button data-state="closed">
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-full">
                            <Bath size={20} /> 
                        </div>       
                        <div className="text-sm">
                            <span className="font-medium text-[#333333]">{property.description.bathrooms}</span>
                            <span className="text-[#5C5C5A] block">Bathrooms</span>
                        </div>                     
                    </div>
                </button>

                <button data-state="closed">
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-full">
                            <House size={20} /> 
                        </div>       
                        <div className="text-sm">
                            <span className="font-medium text-[#333333]">{property.description.beds}</span>
                            <span className="text-[#5C5C5A] block">Beds</span>
                        </div>                     
                    </div>
                </button>
            </div>
        </div>  
    )
}

export default NameDescription;