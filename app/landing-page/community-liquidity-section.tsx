'use client';

import React from 'react';
import Image from 'next/image';

const CommunityLiquidity = () => {
    return (
        <div className="relative w-full min-h-screen flex items-center justify-center pt-10 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-8 lg:px-16">
            <div className="w-full max-w-[1440px] mx-auto">

                <div className="flex flex-col md:flex-row justify-center items-center gap-6 sm:gap-8 md:gap-6 lg:gap-8 xl:gap-6 2xl:gap-8">

                    {/* Card One - (3,3) For Community */}
                    <div
                        className="relative transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-2 cursor-pointer 
                                   w-full max-w-[280px] sm:max-w-[340px] md:max-w-[280px] lg:max-w-[420px] xl:max-w-none 
                                   xl:w-[637px] h-auto aspect-[637/577] flex-shrink-0"
                    >
                        <Image
                            src="/landingPage/left_card.webp"
                            alt="Community Card"
                            width={637}
                            height={577}
                            className="w-full h-full object-contain transition-all duration-300"
                            priority
                        />
                        <div
                            className="absolute top-[18%] left-1/2 -translate-x-1/2 
                                       scale-[0.45] xs:scale-[0.50] sm:scale-[0.60] md:scale-[0.58] lg:scale-[0.75] xl:scale-90 2xl:scale-100"
                        >
                            {/* Outer Box */}
                            <div
                                className="flex items-center justify-center border-2 border-white rounded-2xl p-1.5"
                                style={{
                                    backgroundColor: '#242424',
                                }}
                            >
                                {/* Inner Box */}
                                <div
                                    className="border-2 border-white rounded-xl px-3 py-2.5"
                                    style={{
                                        backgroundColor: 'transparent',
                                    }}
                                >
                                    <span
                                        className="text-white whitespace-nowrap text-[32px]"
                                        style={{
                                            fontFamily: 'Bruno Ace',
                                            fontWeight: 400,
                                            lineHeight: '103%',
                                            letterSpacing: '0%',
                                        }}
                                    >
                                        (3,3) For Community
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card Two - (5,5) For Liquidity Providers */}
                    <div
                        className="relative transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-2 cursor-pointer 
                                   w-full max-w-[280px] sm:max-w-[340px] md:max-w-[280px] lg:max-w-[420px] xl:max-w-none 
                                   xl:w-[641px] h-auto aspect-[641/574] flex-shrink-0"
                    >
                        <Image
                            src="/landingPage/right_card.webp"
                            alt="Liquidity Providers Card"
                            width={641}
                            height={574}
                            className="w-full h-full object-contain transition-all duration-300"
                            priority
                        />
                        <div
                            className="absolute top-[17%] left-1/2 -translate-x-1/2 
                                       scale-[0.45] xs:scale-[0.50] sm:scale-[0.60] md:scale-[0.58] lg:scale-[0.75] xl:scale-90 2xl:scale-100"
                        >
                            {/* Outer Box */}
                            <div
                                className="flex items-center justify-center border-2 border-white rounded-2xl p-1.5"
                                style={{
                                    backgroundColor: '#242424',
                                }}
                            >
                                {/* Inner Box */}
                                <div
                                    className="flex flex-col items-center justify-center border-2 border-white rounded-xl px-3 py-2.5"
                                    style={{
                                        backgroundColor: 'transparent',
                                    }}
                                >
                                    <span
                                        className="text-white whitespace-nowrap text-[36px]"
                                        style={{
                                            fontFamily: 'Bruno Ace',
                                            fontWeight: 400,
                                            lineHeight: '103%',
                                            letterSpacing: '0%',
                                        }}
                                    >
                                        (5,5) For Liquidity
                                    </span>
                                    <span
                                        className="text-white whitespace-nowrap text-[36px]"
                                        style={{
                                            fontFamily: 'Bruno Ace',
                                            fontWeight: 400,
                                            lineHeight: '103%',
                                            letterSpacing: '0%',
                                        }}
                                    >
                                        Providers
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunityLiquidity;