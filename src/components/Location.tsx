"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

declare global {
    interface Window {
        naver?: {
            maps?: {
                LatLng: new (lat: number, lng: number) => unknown;
                Map: new (
                    element: HTMLElement,
                    options: Record<string, unknown>,
                ) => unknown;
                Marker: new (options: Record<string, unknown>) => unknown;
                InfoWindow?: new (options: Record<string, unknown>) => {
                    open: (map: unknown, marker: unknown) => void;
                    close: () => void;
                    getMap: () => unknown;
                };
                Event?: {
                    addListener: (
                        target: unknown,
                        event: string,
                        handler: () => void,
                    ) => void;
                };
                Animation?: {
                    DROP?: unknown;
                };
            };
        };
    }
}

const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID;

const Location = () => {
    // Venue information
    const placeName = "양재시민의숲 야외예식장";
    const address = "서울 서초구 매헌로 99";
    const latitude = 37.4705198; // Google Maps 좌표
    const longitude = 127.0353278;
    const naverPlaceId = "31875178";

    const mapRef = useRef<HTMLDivElement | null>(null);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Animation observer
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

    useEffect(() => {
        if (!NAVER_CLIENT_ID) {
            console.error("Naver Maps Client ID is not set");
            return;
        }

        // Create and load script
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${NAVER_CLIENT_ID}`;
        script.async = true;

        script.onload = () => {
            // Initialize map after script loads
            if (mapRef.current && window.naver && window.naver.maps) {
                const mapOptions = {
                    center: new window.naver.maps.LatLng(latitude, longitude),
                    zoom: 16,
                    mapTypeControl: false,
                    scaleControl: false,
                    zoomControl: true,
                    zoomControlOptions: {
                        style: 2,
                        position: 7,
                    },
                };

                const map = new window.naver.maps.Map(
                    mapRef.current,
                    mapOptions,
                );

                // Add marker
                const markerOptions: Record<string, unknown> = {
                    position: new window.naver.maps.LatLng(latitude, longitude),
                    map: map,
                    title: placeName,
                };

                if (window.naver.maps.Animation?.DROP) {
                    markerOptions.animation = window.naver.maps.Animation.DROP;
                }

                const marker = new window.naver.maps.Marker(markerOptions);

                // Add info window
                if (window.naver.maps.InfoWindow && window.naver.maps.Event) {
                    const infoWindow = new window.naver.maps.InfoWindow({
                        content: `<div style="padding: 12px; min-width: 200px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                            <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #666;">${placeName}</h4>
                            <p style="margin: 0; font-size: 12px; color: #666;">${address}</p>
                        </div>`,
                        borderWidth: 0,
                        anchorSize: { width: 10, height: 10 },
                        backgroundColor: "white",
                        borderColor: "#e0e0e0",
                    });

                    // Show info window by default
                    infoWindow.open(map, marker);

                    window.naver.maps.Event.addListener(marker, "click", () => {
                        if (infoWindow.getMap()) {
                            infoWindow.close();
                        } else {
                            infoWindow.open(map, marker);
                        }
                    });
                }
            }
        };

        document.head.appendChild(script);

        return () => {
            if (document.head.contains(script)) {
                document.head.removeChild(script);
            }
        };
    }, []);

    const openInNaverMap = () => {
        const schemeUrl = `nmap://place?id=${naverPlaceId}`;
        const webUrl = `https://map.naver.com/p/entry/place/${naverPlaceId}`;

        const timeout = setTimeout(() => {
            window.open(webUrl, "_blank");
        }, 800);
        window.location.href = schemeUrl;
        setTimeout(() => clearTimeout(timeout), 1500);
    };

    const openInKakaoMap = () => {
        const schemeUrl = "kakaomap://place?id=24692652";
        const webUrl =
            "https://map.kakao.com/?map_type=TYPE_MAP&itemId=24692652";

        const timeout = setTimeout(() => {
            window.open(webUrl, "_blank");
        }, 800);
        window.location.href = schemeUrl;
        setTimeout(() => clearTimeout(timeout), 1500);
    };

    const openInTmap = () => {
        const webUrl = `https://apis.openapi.sk.com/tmap/app/routes?appKey=l7xx8d5a0b0b5c7e4e6ba0c0e0e0e0e0e0e0&name=${encodeURIComponent(
            placeName,
        )}&lon=${longitude}&lat=${latitude}`;
        window.open(webUrl, "_blank");
    };

    return (
        <div ref={sectionRef} className="py-12 md:py-16">
            {/* Title Section */}
            <div className="text-center mb-12 animate-on-scroll opacity-0">
                {/* <h2 className="text-xs md:tex   t-sm font-light text-gray-500 tracking-[0.3em] mb-2">
                    LOCATION
                </h2> */}
                <h3 className="text-2xl md:text-3xl font-light text-gray-700">
                    오시는 길
                </h3>
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mt-4"></div>
            </div>

            {/* Venue Information */}
            <div className="text-center mb-8 animate-on-scroll opacity-0">
                <p className="text-lg md:text-xl font-normal text-gray-800 mb-2">
                    {placeName}
                </p>
                <p className="text-sm md:text-base text-gray-600">{address}</p>
            </div>

            {/* Map Container */}
            <div className="animate-on-scroll opacity-0 mb-8">
                <div className="relative w-full h-[350px] md:h-[450px] rounded-xl overflow-hidden shadow-lg">
                    {NAVER_CLIENT_ID ? (
                        <div ref={mapRef} className="w-full h-full" />
                    ) : (
                        <div className="flex h-full items-center justify-center bg-gray-100">
                            <div className="text-center">
                                <svg
                                    className="w-16 h-16 text-gray-400 mx-auto mb-4"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                <p className="text-sm text-gray-500">
                                    지도를 불러올 수 없습니다
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Map Navigation Buttons */}
            <div className="flex justify-center gap-2 mb-4 animate-on-scroll opacity-0">
                <button
                    onClick={openInNaverMap}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all group"
                >
                    <Image
                        src="/navermap.webp"
                        alt="Naver Map"
                        width={20}
                        height={20}
                        className="rounded"
                    />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-green-600">
                        네이버지도
                    </span>
                </button>
                <button
                    onClick={openInKakaoMap}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white border border-gray-200 hover:border-yellow-500 hover:bg-yellow-50 transition-all group"
                >
                    <Image
                        src="/kakaomap.png"
                        alt="Kakao Map"
                        width={20}
                        height={20}
                        className="rounded"
                    />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-yellow-600">
                        카카오맵
                    </span>
                </button>
                {/* <button
                    onClick={openInTmap}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
                >
                    <Image
                        src="/tmap.webp"
                        alt="T Map"
                        width={20}
                        height={20}
                        className="rounded"
                    />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                        티맵
                    </span>
                </button> */}
            </div>

            {/* Transportation Details */}
            <div className="grid md:grid-cols-1 max-w-3xl mx-auto">
                {/* Subway */}
                <div className="animate-on-scroll opacity-0 bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                        {/* <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                            <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M8 7h8m0 0v10m0-10L8 17V7"></path>
                            </svg>
                        </div> */}
                        <h4 className="text-lg font-medium text-gray-800">
                            대중교통 이용 시
                        </h4>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                        <p>
                            {/* <span className="inline-block px-2 py-1 bg-red-100 text-white-700 rounded text-xs font-medium mr-2">
                                신분당선
                            </span> */}
                            <span className="font-medium">
                                [양재시민의숲역] 에서 도보 5분
                            </span>{" "}
                        </p>
                    </div>
                </div>

                {/* Bus */}
                {/* <div className="animate-on-scroll opacity-0 bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                            <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M8 7v10m0-10h8v10m-8 0h8m0 0V7m0 10l4-4m-4 4l-4-4"></path>
                            </svg>
                        </div>
                        <h4 className="text-lg font-medium text-gray-800">
                            버스
                        </h4>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                        <div>
                            <p className="font-medium mb-1">간선</p>
                            <p className="text-blue-600">
                                405, 421, 140, 407, 408
                            </p>
                        </div>
                        <div>
                            <p className="font-medium mb-1">지선</p>
                            <p className="text-green-600">4432</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            [양재시민의숲] 정류장 하차
                        </p>
                    </div>
                </div> */}

                {/* Parking */}
                <div className="md:col-span-2 animate-on-scroll opacity-0 bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                        {/* <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
                            <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div> */}
                        <h4 className="text-lg font-medium text-gray-800">
                            자가용 이용 시
                        </h4>
                    </div>
                    <div className="text-sm text-gray-600">
                        <p className="font-medium mb-2">[내비게이션]</p>
                        <p>
                            &ldquo;양재시민의숲&rdquo;, &ldquo;매헌시민의숲&rdquo; 또는 &ldquo;서울 서초구
                            매헌로 99&rdquo; 검색
                        </p>
                        <p className="font-medium text-gray-500 mt-3 bg-red-100">
                            * 양재시민의숲 동측주차장 혹은 양재시민의숲 매헌역
                            공영주차장 이용 가능 (유료)
                            <br />* 주말에는 주차가 혼잡하니 대중교통 이용을
                            부탁드립니다
                        </p>
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
            `}</style>
        </div>
    );
};

export default Location;
