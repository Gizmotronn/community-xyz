"use client"

import { TopNavigation } from "@/components/top-navigation";
import Image from 'next/image';
import { Footer } from "@/components/footer";
import Link from 'next/link';
import { AnimatedBackground } from "@/components/animated-background";

export default function HealthProtocolPage() {
    return (
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link
                href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;900&family=Noto+Sans:wght@600&family=Bruno+Ace&family=Archivo+Black&display=swap"
                rel="stylesheet"
            />

            <TopNavigation variant="health-protocol" />

          <AnimatedBackground/>

            <main className="relative z-10 min-h-screen text-gray-900 font-body overflow-x-hidden">
                <div className="flex flex-col items-center justify-center w-full max-w-[100vw] overflow-x-hidden">

                    {/* Hero Section */}
                    <section className="relative min-h-screen flex items-center justify-center w-full overflow-hidden pt-24 md:pt-32 pb-12 px-4 sm:px-6 lg:px-8">
                        <div className="relative z-10 w-full max-w-7xl mx-auto">
                            <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 md:space-y-10">

                                {/* Health Protocol Logo */}
                                <div className="relative w-[180px] h-[100px] xs:w-[220px] xs:h-[120px] sm:w-[280px] sm:h-[150px] md:w-[340px] md:h-[180px] lg:w-[380px] lg:h-[200px] mb-4 sm:mb-6">
                                    <Image
                                        src="/landingPage/logo_HP.webp"
                                        alt="Health Protocol"
                                        fill
                                        className="object-contain drop-shadow-2xl"
                                        priority
                                    />
                                </div>

                                {/* Main Heading */}
                                <h1 className="text-center leading-[110%] text-white font-black font-roboto
    text-[22px] xs:text-[26px] sm:text-[32px] md:text-[40px] lg:text-[48px] xl:text-[56px]
    px-2 sm:px-4 max-w-[95%] sm:max-w-[90%] md:max-w-5xl">
                                    Coordinating Stakeholders & Facilitating Value Transfer
                                </h1>

                                {/* Subheading */}
                                <p className="text-center text-white/90 font-roboto font-light
    text-[14px] xs:text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px]
    max-w-[95%] sm:max-w-[85%] md:max-w-3xl lg:max-w-4xl px-2 sm:px-4">
                                    Building aligned communities through transparent coordination and equitable value distribution
                                </p>


                                {/* Navigation Cards */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mt-8 sm:mt-10 md:mt-12 w-full max-w-[95%] sm:max-w-[90%] md:max-w-4xl px-2 sm:px-0">
                                    {/* Staking Card */}
                                    <Link href="/health-protocol-page/staking" className="h-full">
                                        <div className="group p-5 sm:p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 hover:bg-white/15 hover:border-[#00D7E9]/50 transition-all cursor-pointer h-full flex flex-col min-h-[160px] sm:min-h-[180px]">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#00D7E9] to-[#FF9400] rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#00D7E9] transition-colors">Staking</h3>
                                            <p className="text-white/70 text-xs sm:text-sm mt-auto leading-relaxed">Stake HLTH tokens for governance and rewards</p>
                                        </div>
                                    </Link>

                                    {/* Explore Communities Card */}
                                    <Link href="/health-protocol-page/explore-communities" className="h-full">
                                        <div className="group p-5 sm:p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 hover:bg-white/15 hover:border-[#00D7E9]/50 transition-all cursor-pointer h-full flex flex-col min-h-[160px] sm:min-h-[180px]">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#00D7E9] to-[#FF9400] rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#00D7E9] transition-colors">Explore Communities</h3>
                                            <p className="text-white/70 text-xs sm:text-sm mt-auto leading-relaxed">Discover active health communities</p>
                                        </div>
                                    </Link>

                                    {/* For Pharma Card */}
                                    <Link href="/health-protocol-page/pharma" className="h-full sm:col-span-2 lg:col-span-1">
                                        <div className="group p-5 sm:p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 hover:bg-white/15 hover:border-[#00D7E9]/50 transition-all cursor-pointer h-full flex flex-col min-h-[160px] sm:min-h-[180px]">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#00D7E9] to-[#FF9400] rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#00D7E9] transition-colors">For Pharma</h3>
                                            <p className="text-white/70 text-xs sm:text-sm mt-auto leading-relaxed">Partner for research and trials</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                    <Footer />
                </div>
            </main>
        </>
    );
}