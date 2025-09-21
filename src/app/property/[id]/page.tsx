import PropertyClient from "@/components/property/property-client";
import { getPropertyById } from "@/lib/propertyService";
import type { Property } from "@/types/property";
import { Metadata } from "next";

interface PropertyPageProps {
    params: { id: string };
}

export const metadata: Metadata = {
    title: "Property",
}

export default async function Property({ params: { id } }: PropertyPageProps) {
    const property: Property | null = await getPropertyById(id);
    if (!property) {
        return <div>Property not found</div>;
    }
    return (
        <div>
            <PropertyClient property={property} />
        </div>
    )
}
