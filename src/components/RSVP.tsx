"use client";

import type { RSVP } from "@/lib/supabase";
import * as Label from "@radix-ui/react-label";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { Calendar, Check, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function RSVP() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    const [formData, setFormData] = useState<Partial<RSVP>>({
        side: "신랑측", // Default value, not displayed to user
        attendance: "참석",
        meal: true,
        party_size: 1,
        message: "", // Empty, not displayed to user
        phone: "", // Empty, not displayed to user
        name: "",
    });

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("/api/rsvp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                    // Reset form
                    setFormData({
                        side: "신랑측",
                        attendance: "참석",
                        meal: true,
                        party_size: 1,
                        message: "",
                        phone: "",
                        name: "",
                    });
                }, 3000);
            } else {
                alert("전송 중 오류가 발생했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error("Error submitting RSVP:", error);
            alert("전송 중 오류가 발생했습니다. 다시 시도해주세요.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div ref={sectionRef} className="py-12 md:py-16">
            <div className="max-w-lg mx-auto px-6 text-center">
                {/* Title Section */}
                <div className="animate-on-scroll opacity-0 mb-8 text-center">
                    <h3 className="text-2xl md:text-3xl font-light text-gray-700 mb-4">
                        참석 여부를 전달해주세요
                    </h3>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto"></div>
                </div>

                {/* Message */}
                <div className="animate-on-scroll opacity-0 space-y-4 mb-12 text-gray-600">
                    <p className="text-base md:text-lg leading-relaxed">
                        결혼식 참석 전 참석여부를 응답해주시면
                    </p>
                    <p className="text-base md:text-lg leading-relaxed">
                        결혼식 준비에 있어 큰 도움이 됩니다.
                    </p>
                    <p className="text-base md:text-lg leading-relaxed">
                        한 분 한 분 더욱 귀하게 모실 수 있도록
                    </p>
                    <p className="text-base md:text-lg leading-relaxed">
                        아래 버튼을 클릭하여 참석여부를
                    </p>
                    <p className="text-base md:text-lg leading-relaxed">
                        전달 부탁드립니다.
                    </p>
                </div>

                {/* Wedding Info */}
                <div className="animate-on-scroll opacity-0 mb-12">
                    <div className="inline-block border-t border-b border-dashed border-gray-300 py-6 px-8">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <Calendar className="w-5 h-5 text-gray-500" />
                            <span className="text-gray-700 font-medium">
                                10월 12일 일요일 오후 1시
                            </span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <svg
                                className="w-5 h-5 text-gray-500"
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
                            <span className="text-gray-700 font-medium">
                                양재시민의숲 야외예식장
                            </span>
                        </div>
                    </div>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="animate-fade-in-up bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                        <div className="flex items-center justify-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <Check className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <h4 className="font-medium text-green-800">
                                    감사합니다!
                                </h4>
                                <p className="text-green-600 text-sm">
                                    참석 여부가 전달되었습니다.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="animate-on-scroll opacity-0 space-y-6 bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                >
                    {/* Name Field */}
                    <div className="space-y-2">
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:bg-white focus:border-transparent transition-all duration-200"
                            placeholder="이름을 입력해주세요"
                            required
                        />
                    </div>

                    {/* Attendance Selection */}
                    <div className="space-y-3">
                        <RadioGroup.Root
                            value={formData.attendance}
                            onValueChange={(value) =>
                                setFormData({
                                    ...formData,
                                    attendance: value as "참석" | "불참",
                                    // Reset meal and party_size if not attending
                                    meal:
                                        value === "참석" ? formData.meal : true,
                                    party_size:
                                        value === "참석"
                                            ? formData.party_size
                                            : 1,
                                })
                            }
                            className="flex gap-3"
                        >
                            <div className="flex-1">
                                <RadioGroup.Item
                                    value="참석"
                                    id="attend"
                                    className="peer sr-only"
                                />
                                <Label.Root
                                    htmlFor="attend"
                                    className="block text-center px-6 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-gray-100 peer-data-[state=checked]:bg-gray-800 peer-data-[state=checked]:text-white peer-data-[state=checked]:border-gray-800 transition-all duration-200 font-medium"
                                >
                                    참석
                                </Label.Root>
                            </div>
                            <div className="flex-1">
                                <RadioGroup.Item
                                    value="불참"
                                    id="absent"
                                    className="peer sr-only"
                                />
                                <Label.Root
                                    htmlFor="absent"
                                    className="block text-center px-6 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-gray-100 peer-data-[state=checked]:bg-gray-800 peer-data-[state=checked]:text-white peer-data-[state=checked]:border-gray-800 transition-all duration-200 font-medium"
                                >
                                    불참
                                </Label.Root>
                            </div>
                        </RadioGroup.Root>
                    </div>

                    {/* Additional Fields for Attending Guests */}
                    {formData.attendance === "참석" && (
                        <div className="space-y-6 animate-slide-down">
                            {/* Meal Selection */}
                            <div className="space-y-3">
                                <RadioGroup.Root
                                    value={formData.meal ? "yes" : "no"}
                                    onValueChange={(value) =>
                                        setFormData({
                                            ...formData,
                                            meal: value === "yes",
                                        })
                                    }
                                    className="flex gap-3"
                                >
                                    <div className="flex-1">
                                        <RadioGroup.Item
                                            value="yes"
                                            id="meal-yes"
                                            className="peer sr-only"
                                        />
                                        <Label.Root
                                            htmlFor="meal-yes"
                                            className="block text-center px-6 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-gray-100 peer-data-[state=checked]:bg-gray-800 peer-data-[state=checked]:text-white peer-data-[state=checked]:border-gray-800 transition-all duration-200 font-medium"
                                        >
                                            식사 예정
                                        </Label.Root>
                                    </div>
                                    <div className="flex-1">
                                        <RadioGroup.Item
                                            value="no"
                                            id="meal-no"
                                            className="peer sr-only"
                                        />
                                        <Label.Root
                                            htmlFor="meal-no"
                                            className="block text-center px-6 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-gray-100 peer-data-[state=checked]:bg-gray-800 peer-data-[state=checked]:text-white peer-data-[state=checked]:border-gray-800 transition-all duration-200 font-medium"
                                        >
                                            식사 안함
                                        </Label.Root>
                                    </div>
                                </RadioGroup.Root>
                            </div>

                            {/* Party Size */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-center gap-4">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setFormData({
                                                ...formData,
                                                party_size: Math.max(
                                                    1,
                                                    (formData.party_size || 1) -
                                                        1,
                                                ),
                                            })
                                        }
                                        className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center text-gray-600 font-medium text-lg"
                                        disabled={formData.party_size === 1}
                                    >
                                        -
                                    </button>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="number"
                                            id="party_size"
                                            min="1"
                                            max="10"
                                            value={formData.party_size}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    party_size: Math.min(
                                                        10,
                                                        Math.max(
                                                            1,
                                                            parseInt(
                                                                e.target.value,
                                                            ) || 1,
                                                        ),
                                                    ),
                                                })
                                            }
                                            className="w-16 px-2 py-2 bg-gray-50 border border-gray-200 rounded-xl text-center text-lg font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:bg-white focus:border-transparent"
                                            required
                                        />
                                        <span className="text-gray-600 font-light">
                                            명
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setFormData({
                                                ...formData,
                                                party_size: Math.min(
                                                    10,
                                                    (formData.party_size || 1) +
                                                        1,
                                                ),
                                            })
                                        }
                                        className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center text-gray-600 font-medium text-lg"
                                        disabled={formData.party_size === 10}
                                    >
                                        +
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 text-center">
                                    본인 포함 인원 수
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading || !formData.name}
                            className={`
                                w-full py-4 px-6 rounded-xl font-medium
                                bg-gradient-to-r from-gray-700 to-gray-900 text-white
                                hover:from-gray-800 hover:to-black
                                transform hover:scale-[1.01] active:scale-[0.99]
                                transition-all duration-200
                                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                                shadow-sm hover:shadow-md
                                flex items-center justify-center gap-3
                            `}
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>전송 중...</span>
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4" />
                                    <span>전송하기</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
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
            `}</style>
        </div>
    );
}
