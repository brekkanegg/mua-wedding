"use client";

import { useEffect, useRef } from "react";

export default function Greeting() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-fade-in-up");
                    }
                });
            },
            { threshold: 0.1 },
        );

        const elements =
            sectionRef.current?.querySelectorAll(".animate-on-scroll");
        elements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={sectionRef} className="py-12 md:py-16">
            <div className="max-w-2xl mx-auto text-center">
                {/* Decorative flourish */}
                {/* <div className="animate-on-scroll opacity-0 mb-8">
                    <svg
                        className="w-48 h-12 mx-auto text-gray-400"
                        viewBox="0 0 200 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M20 25 Q50 10, 80 25 T140 25 T200 25"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeLinecap="round"
                            fill="none"
                            opacity="0.5"
                        />
                        <circle
                            cx="100"
                            cy="25"
                            r="3"
                            fill="currentColor"
                            opacity="0.4"
                        />
                        <circle
                            cx="85"
                            cy="25"
                            r="2"
                            fill="currentColor"
                            opacity="0.3"
                        />
                        <circle
                            cx="115"
                            cy="25"
                            r="2"
                            fill="currentColor"
                            opacity="0.3"
                        />
                    </svg>
                </div> */}

                {/* Title */}
                <div className="animate-on-scroll opacity-0 mb-12">
                    <h3 className="text-2xl md:text-3xl font-light text-gray-700 mb-2">
                        결혼합니다
                    </h3>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto"></div>
                </div>

                {/* Main greeting message */}
                <div className="space-y-2 text-gray-600 font-light leading-relaxed">
                    <div className="animate-on-scroll opacity-0">
                        <p className="text-base md:text-lg mb-3">
                            함께 맞이하는 여섯 번째 가을,
                        </p>
                        <p className="text-base md:text-lg mb-3">
                            닮은 듯 점점 더 닮아가는 저희 두 사람은
                        </p>
                        <p className="text-base md:text-lg mb-3">
                            서로의 가장 친한 친구이자
                        </p>
                        <p className="text-base md:text-lg">
                            평생의 동반자가 되고자 합니다.
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="animate-on-scroll opacity-0">
                        <span className="text-2xl text-gray-300">·</span>
                    </div>

                    <div className="animate-on-scroll opacity-0">
                        <p className="text-base md:text-lg mb-3">
                            웃음과 행복을 나누며 살아가는 부부로 살겠습니다.
                        </p>
                        <p className="text-base md:text-lg mb-3">
                            늘 소박한 식을 꿈꿔온 마음을 담아
                        </p>
                        <p className="text-base md:text-lg">
                            가까운 가족들과 함께 조용히 예식을 올리게 됐습니다.
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="animate-on-scroll opacity-0">
                        <span className="text-2xl text-gray-300">·</span>
                    </div>

                    <div className="animate-on-scroll opacity-0">
                        <p className="text-base md:text-lg mb-3">
                            멀리서도 축하해주시는 모든 분들께
                        </p>
                        <p className="text-base md:text-lg mb-3">
                            진심으로 감사드리며,
                        </p>
                        <p className="text-base md:text-lg">
                            그 마음 간직하며 살겠습니다.
                        </p>
                    </div>
                </div>

                {/* Names section */}
                <div className="animate-on-scroll opacity-0 mt-16">
                    <div className="space-y-6 text-gray-600">
                        <div className="flex items-center justify-center space-x-8">
                            <div className="text-right">
                                <p className="text-sm md:text-base mb-1 text-gray-500">
                                    <span className="font-light">정찬종</span>
                                    <span className="mx-1 text-gray-400">
                                        ·
                                    </span>
                                    <span className="font-light">박정실</span>
                                    <span className="text-gray-500 ml-2 text-xs">
                                        의
                                    </span>
                                </p>
                                <p className="text-lg md:text-xl font-normal">
                                    <span className="text-sm text-gray-500 mr-2">
                                        아들
                                    </span>
                                    민기
                                </p>
                            </div>

                            <div className="text-2xl text-gray-300 font-light">
                                &
                            </div>

                            <div className="text-left">
                                <p className="text-sm md:text-base mb-1 text-gray-500">
                                    <span className="font-light">임정근</span>
                                    <span className="mx-1 text-gray-400">
                                        ·
                                    </span>
                                    <span className="font-light">김정자</span>
                                    <span className="text-gray-500 ml-2 text-xs">
                                        의
                                    </span>
                                </p>
                                <p className="text-lg md:text-xl font-normal">
                                    <span className="text-sm text-gray-500 mr-2">
                                        딸
                                    </span>
                                    소연
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                :global(.animate-fade-in-up) {
                    animation: fade-in-up 0.8s ease-out forwards;
                }

                :global(.animate-on-scroll) {
                    transition: all 0.8s ease-out;
                }

                :global(.animate-on-scroll:nth-child(1)) {
                    transition-delay: 0ms;
                }
                :global(.animate-on-scroll:nth-child(2)) {
                    transition-delay: 100ms;
                }
                :global(.animate-on-scroll:nth-child(3)) {
                    transition-delay: 200ms;
                }
                :global(.animate-on-scroll:nth-child(4)) {
                    transition-delay: 300ms;
                }
                :global(.animate-on-scroll:nth-child(5)) {
                    transition-delay: 400ms;
                }
                :global(.animate-on-scroll:nth-child(6)) {
                    transition-delay: 500ms;
                }
                :global(.animate-on-scroll:nth-child(7)) {
                    transition-delay: 600ms;
                }
                :global(.animate-on-scroll:nth-child(8)) {
                    transition-delay: 700ms;
                }
                :global(.animate-on-scroll:nth-child(9)) {
                    transition-delay: 800ms;
                }
            `}</style>
        </div>
    );
}
