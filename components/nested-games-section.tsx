"use client"

export default function NestedGamesSection() {
    return (
        <section className="w-full max-w-7xl mx-auto py-16 px-4 md:py-20">
            {/* Main Title */}
            <h1
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-12 md:mb-16"
                style={{ fontFamily: 'Archivo Black' }}
            >
                Nested Games Result in Win-Win
            </h1>

            {/* Two Column Layout */}
            <div className="grid xl:grid-cols-2 gap-8 xl:gap-12">

                {/* Left Column - Health Communities (3,3) */}
                <div className="space-y-6">
                    {/* Header */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Roboto', fontWeight: 700 }}>
                            Health Communities (3,3)
                        </h2>
                        <p className="text-base md:text-lg text-gray-300" style={{ fontFamily: 'Roboto', fontWeight: 300 }}>
                            Payoff Matrix: (Your Payoff, Community Payoff)
                        </p>
                    </div>

                    {/* Folder Icon Container */}
                    <div className="relative">
                        <div className="relative">
                            <img
                                src="/landingPage/long_folder_icon.svg"
                                alt="Folder"
                                className="w-full h-auto"
                            />

                            {/* Content Grid */}
                            <div className="absolute top-[4%] left-[8%] right-[2%] bottom-[15%]">
                                <div className="grid grid-cols-4 gap-0 h-full">
                                    {/* Empty top-left cell */}
                                    <div></div>

                                    {/* Header Row */}
                                    <div className="text-white font-semibold text-center text-[0.6rem] min-[360px]:text-[0.65rem] min-[400px]:text-[0.7rem] sm:text-xs md:text-sm lg:text-base xl:text-sm 2xl:text-base leading-tight flex items-end justify-center pb-1 md:pb-2" style={{ fontFamily: 'Roboto', fontWeight: 700 }}>
                                        Community<br />Early (E)
                                    </div>
                                    <div className="text-white font-semibold text-center text-[0.6rem] min-[360px]:text-[0.65rem] min-[400px]:text-[0.7rem] sm:text-xs md:text-sm lg:text-base xl:text-sm 2xl:text-base leading-tight flex items-end justify-center pb-1 md:pb-2" style={{ fontFamily: 'Roboto', fontWeight: 700 }}>
                                        Community<br />Late (L)
                                    </div>
                                    <div className="text-white font-semibold text-center text-[0.6rem] min-[360px]:text-[0.65rem] min-[400px]:text-[0.7rem] sm:text-xs md:text-sm lg:text-base xl:text-sm 2xl:text-base leading-tight flex items-end justify-center pb-1 md:pb-2" style={{ fontFamily: 'Roboto', fontWeight: 700 }}>
                                        Community<br />Defect (D)
                                    </div>

                                    {/* Row 1 */}
                                    <div className="text-white font-bold text-[0.625rem] min-[360px]:text-[0.7rem] min-[400px]:text-[0.75rem] sm:text-sm md:text-base lg:text-lg xl:text-base 2xl:text-lg flex items-center pr-1" style={{ fontFamily: 'Roboto', fontWeight: 700 }}>
                                        You Early (E)
                                    </div>
                                    <div className="text-orange-400 font-bold text-center text-[0.7rem] min-[360px]:text-[0.75rem] min-[400px]:text-[0.8rem] sm:text-sm md:text-base lg:text-lg xl:text-base 2xl:text-lg flex items-center justify-center">(3, 3)</div>
                                    <div className="text-orange-400 font-bold text-center text-[0.7rem] min-[360px]:text-[0.75rem] min-[400px]:text-[0.8rem] sm:text-sm md:text-base lg:text-lg xl:text-base 2xl:text-lg flex items-center justify-center">(4, 2)</div>
                                    <div className="text-orange-400 font-bold text-center text-[0.7rem] min-[360px]:text-[0.75rem] min-[400px]:text-[0.8rem] sm:text-sm md:text-base lg:text-lg xl:text-base 2xl:text-lg flex items-center justify-center">(5, -1)</div>

                                    {/* Row 2 */}
                                    <div className="text-white font-bold text-[0.625rem] min-[360px]:text-[0.7rem] min-[400px]:text-[0.75rem] sm:text-sm md:text-base lg:text-lg xl:text-base 2xl:text-lg flex items-center pr-1" style={{ fontFamily: 'Roboto', fontWeight: 700 }}>
                                        You Late (L)
                                    </div>
                                    <div className="text-orange-400 font-bold text-center text-[0.7rem] min-[360px]:text-[0.75rem] min-[400px]:text-[0.8rem] sm:text-sm md:text-base lg:text-lg xl:text-base 2xl:text-lg flex items-center justify-center">(2, 4)</div>
                                    <div className="text-orange-400 font-bold text-center text-[0.7rem] min-[360px]:text-[0.75rem] min-[400px]:text-[0.8rem] sm:text-sm md:text-base lg:text-lg xl:text-base 2xl:text-lg flex items-center justify-center">(2, 2)</div>
                                    <div className="text-orange-400 font-bold text-center text-[0.7rem] min-[360px]:text-[0.75rem] min-[400px]:text-[0.8rem] sm:text-sm md:text-base lg:text-lg xl:text-base 2xl:text-lg flex items-center justify-center">(3, -1)</div>

                                    {/* Row 3 */}
                                    <div className="text-white font-bold text-[0.625rem] min-[360px]:text-[0.7rem] min-[400px]:text-[0.75rem] sm:text-sm md:text-base lg:text-lg xl:text-base 2xl:text-lg flex items-center pr-1" style={{ fontFamily: 'Roboto', fontWeight: 700 }}>
                                        You Defect (D)
                                    </div>
                                    <div className="text-orange-400 font-bold text-center text-[0.7rem] min-[360px]:text-[0.75rem] min-[400px]:text-[0.8rem] sm:text-sm md:text-base lg:text-lg xl:text-base 2xl:text-lg flex items-center justify-center">(0, 2)</div>
                                    <div className="text-orange-400 font-bold text-center text-[0.7rem] min-[360px]:text-[0.75rem] min-[400px]:text-[0.8rem] sm:text-sm md:text-base lg:text-lg xl:text-base 2xl:text-lg flex items-center justify-center">(1, 1)</div>
                                    <div className="text-orange-400 font-bold text-center text-[0.7rem] min-[360px]:text-[0.75rem] min-[400px]:text-[0.8rem] sm:text-sm md:text-base lg:text-lg xl:text-base 2xl:text-lg flex items-center justify-center">(-2, -2)</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bullet Points */}
                    <ul className="space-y-3 text-gray-300 text-sm md:text-base" style={{ fontFamily: 'Roboto', fontWeight: 300 }}>
                        <li className="flex gap-3">
                            <span className="mt-1">•</span>
                            <span>Smart contract Dutch auction ensure early community member co-operation – growing human capital (activation and data availability).</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="mt-1">•</span>
                            <span>Growth in human capital results in more inbound value from donor stakeholders like pharma resulting in greater incentives for even more community growth.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="mt-1">•</span>
                            <span>Members amenable to sharing their data for rewards.</span>
                        </li>
                    </ul>
                </div>

                {/* Right Column - Donor Stakeholder (5,5) */}
                <div className="space-y-6">
                    {/* Header */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Roboto', fontWeight: 700 }}>
                            Donor Stakeholder and Liquidity Providers (5,5)
                        </h2>
                        <p className="text-base md:text-lg text-gray-300" style={{ fontFamily: 'Roboto', fontWeight: 300 }}>
                            Payoff Matrix: (Your Payoff, Ecosystem Payoff)
                        </p>
                    </div>

                    {/* Folder Icon Container */}
                    <div className="relative">
                        <div className="relative">
                            <img
                                src="/landingPage/long_folder_icon.svg"
                                alt="Folder"
                                className="w-full h-auto"
                            />

                            {/* Content Grid - positioned inside the folder */}
                            <div className="absolute top-[4%] left-[6%] right-[2%] bottom-[15%]">
                                <div className="grid grid-cols-4 gap-0 h-full">
                                    {/* Empty top-left cell */}
                                    <div></div>

                                    {/* Header Row */}
                                    <div className="text-white font-semibold text-center text-[0.6rem] min-[360px]:text-[0.65rem] min-[400px]:text-[0.7rem] sm:text-xs md:text-sm lg:text-base xl:text-sm 2xl:text-base leading-tight flex items-end justify-center pb-1 md:pb-2" style={{ fontFamily: 'Roboto', fontWeight: 700 }}>
                                        Others<br />Early (E)
                                    </div>
                                    <div className="text-white font-semibold text-center text-[0.6rem] min-[360px]:text-[0.65rem] min-[400px]:text-[0.7rem] sm:text-xs md:text-sm lg:text-base xl:text-sm 2xl:text-base leading-tight flex items-end justify-center pb-1 md:pb-2" style={{ fontFamily: 'Roboto', fontWeight: 700 }}>
                                        Others<br />Late (L)
                                    </div>
                                    <div className="text-white font-semibold text-center text-[0.6rem] min-[360px]:text-[0.65rem] min-[400px]:text-[0.7rem] sm:text-xs md:text-sm lg:text-base xl:text-sm 2xl:text-base leading-tight flex items-end justify-center pb-1 md:pb-2" style={{ fontFamily: 'Roboto', fontWeight: 700 }}>
                                        Others<br />Defect (D)
                                    </div>

                                    {/* Row 1 */}
                                    <div className="text-white font-bold text-[0.625rem] min-[360px]:text-[0.7rem] min-[400px]:text-[0.75rem] sm:text-sm md:text-base lg:text-lg xl:text-base 2xl:text-lg flex items-center pr-1" style={{ fontFamily: 'Roboto', fontWeight: 700 }}>
                                        You Early (E)
                                    </div>
                                    <div className="text-orange-400 font-bold text-center text-[0.7rem] min-[360px]:text-[0.75rem] min-[400px]:text-[0.8rem] sm:text-sm md:text-base lg:text-lg xl:text-base 2xl:text-lg flex items-center justify-center">(5, 5)</div>
                                    <div className="text-orange-400 font-bold text-center text-[0.7rem] min-[360px]:text-[0.75rem] min-[400px]:text-[0.8rem] sm:text-sm md:text-base lg:text-lg xl:text-base 2xl:text-lg flex items-center justify-center">(6, 3)</div>
                                    <div className="text-orange-400 font-bold text-center text-[0.7rem] min-[360px]:text-[0.75rem] min-[400px]:text-[0.8rem] sm:text-sm md:text-base lg:text-lg xl:text-base 2xl:text-lg flex items-center justify-center">(7, -1)</div>

                                    {/* Row 2 */}
                                    <div className="text-white font-bold text-[0.625rem] min-[360px]:text-[0.7rem] min-[400px]:text-[0.75rem] sm:text-sm md:text-base lg:text-lg xl:text-base 2xl:text-lg flex items-center pr-1" style={{ fontFamily: 'Roboto', fontWeight: 700 }}>
                                        You Late (L)
                                    </div>
                                    <div className="text-orange-400 font-bold text-center text-[0.7rem] min-[360px]:text-[0.75rem] min-[400px]:text-[0.8rem] sm:text-sm md:text-base lg:text-lg xl:text-base 2xl:text-lg flex items-center justify-center">(3, 6)</div>
                                    <div className="text-orange-400 font-bold text-center text-[0.7rem] min-[360px]:text-[0.75rem] min-[400px]:text-[0.8rem] sm:text-sm md:text-base lg:text-lg xl:text-base 2xl:text-lg flex items-center justify-center">(3, 3)</div>
                                    <div className="text-orange-400 font-bold text-center text-[0.7rem] min-[360px]:text-[0.75rem] min-[400px]:text-[0.8rem] sm:text-sm md:text-base lg:text-lg xl:text-base 2xl:text-lg flex items-center justify-center">(4, -1)</div>

                                    {/* Row 3 */}
                                    <div className="text-white font-bold text-[0.625rem] min-[360px]:text-[0.7rem] min-[400px]:text-[0.75rem] sm:text-sm md:text-base lg:text-lg xl:text-base 2xl:text-lg flex items-center pr-1" style={{ fontFamily: 'Roboto', fontWeight: 700 }}>
                                        You Defect (D)
                                    </div>
                                    <div className="text-orange-400 font-bold text-center text-[0.7rem] min-[360px]:text-[0.75rem] min-[400px]:text-[0.8rem] sm:text-sm md:text-base lg:text-lg xl:text-base 2xl:text-lg flex items-center justify-center">(0, 4)</div>
                                    <div className="text-orange-400 font-bold text-center text-[0.7rem] min-[360px]:text-[0.75rem] min-[400px]:text-[0.8rem] sm:text-sm md:text-base lg:text-lg xl:text-base 2xl:text-lg flex items-center justify-center">(1, 1)</div>
                                    <div className="text-orange-400 font-bold text-center text-[0.7rem] min-[360px]:text-[0.75rem] min-[400px]:text-[0.8rem] sm:text-sm md:text-base lg:text-lg xl:text-base 2xl:text-lg flex items-center justify-center">(-2, -2)</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bullet Point */}
                    <ul className="space-y-3 text-gray-300 text-sm md:text-base" style={{ fontFamily: 'Roboto', fontWeight: 300 }}>
                        <li className="flex gap-3">
                            <span className="mt-1">•</span>
                            <span>Early staking gains yield and entry-price advantage.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}