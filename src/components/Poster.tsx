"use client";

import { R2_BUCKET_URL } from "@/lib/constants";
import Image from "next/image";

type PosterProps = {
    src?: string;
    alt?: string;
};

const Poster = ({
    src = `${R2_BUCKET_URL}/poster.jpg`,
    alt = "Poster image",
}: PosterProps) => {
    return (
        <div className="relative w-screen h-svh overflow-hidden">
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover object-[30%_25%] md:object-[30%_25%]"
                sizes="100vw"
                priority
            />

            {/* Top Right Section - Venue and Date */}
            <div className="absolute top-8 right-8 md:top-12 md:right-16 lg:right-20 text-right">
                <div className="text-white space-y-1">
                    <h1
                        className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light tracking-[0.15em] leading-tight"
                        style={{
                            textShadow:
                                "2px 2px 8px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.7)",
                        }}
                    >
                        2025.10.12 일요일
                    </h1>
                    <div className="space-y-0.5 mt-1">
                        <p
                            className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-wider leading-tight"
                            style={{
                                textShadow:
                                    "2px 2px 10px rgba(0,0,0,0.9), 0 0 25px rgba(0,0,0,0.8)",
                            }}
                        >
                            우리 결혼합니다
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Left Section - Names and Info */}
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 lg:left-16">
                <div className="text-white">
                    <div className="space-y-2">
                        <h1
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.2em] leading-tight"
                            style={{
                                textShadow:
                                    "2px 2px 10px rgba(0,0,0,0.9), 0 0 25px rgba(0,0,0,0.8)",
                            }}
                        >
                            정민기 임소연
                        </h1>
                    </div>
                </div>
            </div>

            {/* Navigation Hint - Bottom Center */}
            <div className="absolute bottom-8 left-4/5 transform -translate-x-1/2 animate-bounce">
                <div className="bg-white/30 backdrop-blur-md text-white rounded-full p-3 shadow-xl hover:bg-white/40 transition-all">
                    <svg
                        className="w-5 h-5 md:w-6 md:h-6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        style={{
                            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.8))",
                        }}
                    >
                        <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                </div>
            </div>

            {/* Enhanced gradient overlay for better text contrast */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-3/4 h-1/2 bg-gradient-to-bl from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-3/4 h-1/2 bg-gradient-to-tr from-black/70 via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-black/10"></div>
            </div>

            <style jsx>{`
                @import url("https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@200;300;400&family=Pretendard:wght@100;200;300;400&display=swap");

                h1,
                h2,
                p {
                    font-family: "Pretendard", "Noto Serif KR",
                        "Apple SD Gothic Neo", -apple-system, BlinkMacSystemFont,
                        "Segoe UI", sans-serif;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                }

                @media (max-width: 640px) {
                    h1 {
                        line-height: 1.4;
                    }
                }
            `}</style>
        </div>
    );
};

export default Poster;
