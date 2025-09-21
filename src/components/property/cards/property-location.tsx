import { Property } from "@/types/property";

interface PropertyLocationProps {
    property: Property;
}

const PropertyLocation = ({ property }: PropertyLocationProps) => {
    return (
        <div className="w-full h-96 bg-white shadow-lg rounded-lg flex items-center justify-center">
            Property Location for {property.name}
        </div>
    )
}

export default PropertyLocation;