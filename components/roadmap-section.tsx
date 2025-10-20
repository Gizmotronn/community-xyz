"use client"

import Image from "next/image";

export function RoadmapSection() {
    return (
        <section id="roadmap" className="w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 flex flex-col items-center">
            <div className="relative flex items-center justify-center w-full max-w-[979px] mx-auto">
                {/* Background Frame */}
                <Image
                    src="/landingPage/roadmap_icon.svg"
                    alt="Roadmap Section Frame"
                    width={979}
                    height={597}
                    className="w-full h-auto"
                    priority
                />

                {/* Roadmap Text */}
                <h2
                    className="absolute text-white font-bold z-20 
                               text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[48px]
                               top-[13%] sm:top-[14%] md:top-[15%] lg:top-[16%]
                               right-[16%] sm:right-[17%] md:right-[18%] lg:right-[19%]"
                    style={{
                        fontFamily: 'Archivo Black',
                    }}
                >
                    Roadmap
                </h2>

                {/* Roadmap Content Image */}
                <div className="absolute z-10 
                                w-[62%] sm:w-[60%] md:w-[58%] lg:w-[56%]
                                top-[54%] sm:top-[55%] md:top-[55%] lg:top-[55%]
                                left-[50%] -translate-x-1/2 -translate-y-1/2">
                    <Image
                        src="/landingPage/roadmap.svg"
                        alt="Roadmap Timeline"
                        width={677}
                        height={382}
                        className="w-full h-auto"
                    />
                </div>
            </div>
        </section>
    );
}