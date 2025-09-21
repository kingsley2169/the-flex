'use client';

import { Property } from "@/types/property"
import { Expand, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface PropertyImagesProps {
    property: Property;
}

const PropertyImages = ({ property }: PropertyImagesProps ) => {
    const images = property.images || [];
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="mb-8 md:mb-12">
            {/* Mobile Carousel */}
            <div className="relative h-[400px] md:hidden">
                {images.length > 0 && (
                    <Image
                        src={images[currentIndex]}
                        alt={`${property.name} image ${currentIndex + 1}`}
                        fill
                        sizes="100vw"
                        className="object-cover rounded-xl"
                        priority={currentIndex === 0}
                    />
                )}
                <div className="absolute inset-0 bg-black/10 rounded-xl pointer-events-none" />
                {images.length > 1 && (
                    <>
                        <button onClick={handlePrev} className="absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md transition hover:bg-white" aria-label="Previous image">
                            <ChevronLeft className="size-6 text-gray-800" />
                        </button>
                        <button onClick={handleNext} className="absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md transition hover:bg-white" aria-label="Next image">
                            <ChevronRight className="size-6 text-gray-800" />
                        </button>
                    </>
                )}
                <button className="absolute bottom-4 right-4 z-10 flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-lg transition-colors duration-200 hover:bg-gray-100">
                    <Expand size={14} />
                    View all photos
                </button>
            </div>

            {/* Desktop Grid */}
            <div className="relative hidden h-[600px] grid-cols-4 grid-rows-2 gap-4 md:grid">
                <div className="col-span-2 row-span-2 relative cursor-pointer group">
                    {images[0] && <Image 
                        src={images[0]} 
                        alt={property.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                        className="object-cover rounded-l-xl"
                    />}
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-200 rounded-l-xl"></div>
                </div>

                <div className="relative cursor-pointer group">
                    {images[1] && <>
                        <Image 
                            src={images[1]} 
                            alt={`${property.name} image 2`} 
                            fill
                            sizes="(max-width: 768px) 50vw, 25vw"
                            className="object-cover" 
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-200"></div>
                    </>}
                </div>
                <div className="relative cursor-pointer group">
                    {images[2] && <>
                        <Image src={images[2]} alt={`${property.name} image 3`} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover rounded-tr-xl" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-200 rounded-tr-xl"></div>
                    </>}
                </div>
                <div className="relative cursor-pointer group">
                    {images[3] && <>
                        <Image src={images[3]} alt={`${property.name} image 4`} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-200"></div>
                    </>}
                </div>
                <div className="relative cursor-pointer group">
                    {images[4] && <>
                        <Image src={images[4]} alt={`${property.name} image 5`} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover rounded-br-xl" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-200 rounded-br-xl"></div>
                    </>}
                </div>
                <button
                    className="absolute bottom-6 right-6 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2 text-sm font-medium"
                >
                    <Expand size={14}/>
                    View all photos
                </button>
            </div>
        </div>
    )
}

export default PropertyImages;