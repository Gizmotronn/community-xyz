"use client"

import Image from "next/image";

export function LitepaperSection() {
    return (
        <section id="litepaper" className="w-full py-12 md:py-16 lg:py-20 flex flex-col items-center relative overflow-hidden">
            {/* Title */}
            <h1
                className="text-white font-bold text-center mb-8 md:mb-12 lg:mb-20 relative z-10 px-4"
                style={{
                    fontFamily: 'Archivo Black',
                    fontSize: 'clamp(32px, 5vw, 56px)',
                    lineHeight: '103%',
                    letterSpacing: '0%',
                }}
            >
                Litepaper
            </h1>

            <div className="relative w-full">
                {/* Left Icon */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 
                    w-[90px] h-[157px]
                    sm:w-[120px] sm:h-[210px]
                    md:w-[160px] md:h-[280px]
                    lg:w-[240px] lg:h-[420px] 
                    xl:w-[320px] xl:h-[559px]
                    z-0">
                    <Image
                        src="/landingPage/left_icon.png"
                        alt="Lightpaper"
                        width={320}
                        height={559}
                        className="w-full h-full object-contain opacity-60 sm:opacity-70 md:opacity-85 lg:opacity-100"
                        priority
                    />
                </div>

                {/* Right Icon  */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 
                    w-[90px] h-[157px]
                    sm:w-[120px] sm:h-[210px]
                    md:w-[160px] md:h-[280px]
                    lg:w-[240px] lg:h-[420px] 
                    xl:w-[320px] xl:h-[559px]
                    z-0">
                    <Image
                        src="/landingPage/right_icon.png"
                        alt="Lightpaper"
                        width={320}
                        height={559}
                        className="w-full h-full object-contain opacity-60 sm:opacity-70 md:opacity-85 lg:opacity-100"
                        priority
                    />
                </div>

                {/* Center Text Content */}
                <div className="relative z-10 max-w-[55%] sm:max-w-[60%] md:max-w-[500px] lg:max-w-[716px] mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
                    <p
                        className="text-white text-center"
                        style={{
                            fontFamily: 'Roboto',
                            fontWeight: 300,
                            fontSize: 'clamp(12px, 2.2vw, 36px)',
                            lineHeight: '125%',
                            letterSpacing: '0%',
                        }}
                    >
                        Tokenization of Patient Activation through online Communities of Practice results in a win-win scenario for all stakeholders in population health. The Health-Shared token offers a unique opportunity to establish a decentralised solution with landscape-shaping potential in health.
                    </p>
                </div>
            </div>

            {/* Button */}
            <button
                className="bg-[#6B7FFF] hover:bg-[#5566EE] text-black rounded-lg transition-colors duration-200 shadow-lg mt-8 md:mt-12 lg:mt-16 relative z-10"
                style={{
                    fontFamily: 'Noto Sans',
                    fontWeight: 600,
                    fontSize: 'clamp(13px, 2vw, 20px)',
                    width: 'clamp(150px, 45vw, 234px)',
                    height: 'clamp(38px, 9vw, 48px)',
                    borderRadius: '10px',
                }}
            >
                Read our Litepaper
            </button>
        </section>
    );
}