'use client';

import React from 'react';
import Image from 'next/image';

const CommunityLiquidity = () => {
    return (
        <div className="relative w-full min-h-screen flex items-center justify-center pt-10 pb-20 px-4 sm:px-8 md:px-12 lg:px-16">
            <div className="w-full max-w-[1440px] mx-auto">

                <div className="flex flex-col xl:flex-row justify-center items-center gap-8 xl:gap-6 2xl:gap-8 mb-20">

                    {/* Card One - (3,3) For Community */}
                    <div
                        className="relative transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-2 cursor-pointer w-full max-w-[90%] sm:max-w-[500px] md:max-w-[550px] lg:max-w-[600px] xl:max-w-none xl:w-[637px] h-auto aspect-[637/577]"
                    >
                        <Image
                            src="/landingPage/left_card.svg"
                            alt="Community Card"
                            width={637}
                            height={577}
                            className="w-full h-full object-contain transition-all duration-300"
                            priority
                        />
                        <div
                            className="absolute top-[18%] left-1/2 -translate-x-1/2 scale-[0.58] sm:scale-90 md:scale-95 lg:scale-100"
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
                                        className="text-white whitespace-nowrap text-[22px] sm:text-[26px] md:text-[28px] lg:text-[32px]"
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
                        className="relative transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-2 cursor-pointer w-full max-w-[90%] sm:max-w-[500px] md:max-w-[550px] lg:max-w-[600px] xl:max-w-none xl:w-[641px] h-auto aspect-[641/574]"
                    >
                        <Image
                            src="/landingPage/right_card.svg"
                            alt="Liquidity Providers Card"
                            width={641}
                            height={574}
                            className="w-full h-full object-contain transition-all duration-300"
                            priority
                        />
                        <div
                            className="absolute top-[17%] left-1/2 -translate-x-1/2 scale-[0.58] sm:scale-90 md:scale-95 lg:scale-100"
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
                                        className="text-white whitespace-nowrap text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px]"
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
                                        className="text-white whitespace-nowrap text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px]"
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