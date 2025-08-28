"use client";

import { R2_BUCKET_URL } from "@/lib/constants";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const sectionRef = useRef<HTMLDivElement>(null);

    // Wedding photo gallery - replace these with actual wedding photos
    const images = [
        {
            src: `${R2_BUCKET_URL}/family/1.jpg`,
            alt: "Exhibit Photo 1",
            gridClass: "md:col-span-1 md:row-span-2",
        },
        {
            src: `${R2_BUCKET_URL}/family/2.jpg`,
            alt: "Exhibit Photo 2",
            gridClass: "md:col-span-1 md:row-span-1",
        },
        {
            src: `${R2_BUCKET_URL}/family/3.jpg`,
            alt: "Exhibit Photo 3",
            gridClass: "md:col-span-1 md:row-span-2",
        },
        {
            src: `${R2_BUCKET_URL}/family/5.jpg`,
            alt: "Exhibit Photo 4",
            gridClass: "md:col-span-1 md:row-span-1",
        },
        {
            src: `${R2_BUCKET_URL}/family/4.jpg`,
            alt: "Exhibit Photo 5",
            gridClass: "md:col-span-2 md:row-span-1",
        },
        {
            src: `${R2_BUCKET_URL}/family/6.jpg`,
            alt: "Exhibit Photo 6",
            gridClass: "md:col-span-1 md:row-span-1",
        },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-fade-in");
                    }
                });
            },
            { threshold: 0.1 },
        );

        const elements = sectionRef.current?.querySelectorAll(".gallery-item");
        elements?.forEach((el) => observer.observe(el));

        // Simulate loading complete
        setTimeout(() => setIsLoading(false), 100);

        return () => observer.disconnect();
    }, []);

    const openLightbox = (index: number) => {
        setSelectedImage(index);
        document.body.style.overflow = "hidden";
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        document.body.style.overflow = "unset";
    };

    const navigateImage = (direction: "prev" | "next") => {
        if (selectedImage === null) return;

        if (direction === "prev") {
            setSelectedImage(
                selectedImage === 0 ? images.length - 1 : selectedImage - 1,
            );
        } else {
            setSelectedImage(
                selectedImage === images.length - 1 ? 0 : selectedImage + 1,
            );
        }
    };

    return (
        <div ref={sectionRef} className="py-12 md:py-16">
            {/* Title Section */}
            <div className="text-center mb-12">
                <h2 className="text-xs md:text-sm font-light text-gray-500 tracking-[0.3em] mb-2">
                    GALLERY
                </h2>
                <h3 className="text-2xl md:text-3xl font-light text-gray-700">
                    갤러리
                </h3>
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mt-4"></div>
            </div>

            {/* Masonry Grid Gallery */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[150px]">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`gallery-item relative overflow-hidden rounded-lg cursor-pointer group opacity-0 ${image.gridClass}`}
                        onClick={() => openLightbox(index)}
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 50vw, 25vw"
                            priority={index < 4}
                        />
                        {isLoading && (
                            <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                        )}
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {selectedImage !== null && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
                    onClick={closeLightbox}
                >
                    <button
                        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50"
                        onClick={closeLightbox}
                        aria-label="Close"
                    >
                        <svg
                            className="w-8 h-8"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>

                    <button
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-50"
                        onClick={(e) => {
                            e.stopPropagation();
                            navigateImage("prev");
                        }}
                        aria-label="Previous"
                    >
                        <svg
                            className="w-8 h-8"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M15 19l-7-7 7-7"></path>
                        </svg>
                    </button>

                    <button
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-50"
                        onClick={(e) => {
                            e.stopPropagation();
                            navigateImage("next");
                        }}
                        aria-label="Next"
                    >
                        <svg
                            className="w-8 h-8"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M9 5l7 7-7 7"></path>
                        </svg>
                    </button>

                    <div
                        className="relative max-w-5xl max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={images[selectedImage].src}
                            alt={images[selectedImage].alt}
                            width={1200}
                            height={800}
                            className="object-contain max-h-[90vh] w-auto h-auto"
                            priority
                        />
                    </div>

                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
                        {selectedImage + 1} / {images.length}
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                :global(.animate-fade-in) {
                    animation: fade-in 0.6s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default Gallery;
