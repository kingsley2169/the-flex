import { Property } from "@/types/property";

interface AboutPropertyProps {
    property: Property;
}

const AboutProperty = ({ property }: AboutPropertyProps) => {
    return (
        <div className="w-full bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-[#333333]">About this property</h2>
            <p className="text-[#5C5C5A] mb-6">{property.about}</p>
        </div>
    )
}

export default AboutProperty;