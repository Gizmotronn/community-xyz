"use client"

import { TopNavigation } from '@/components/top-navigation';
import { Lock, TrendingUp, Award, Clock, Shield, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Footer } from "@/components/footer";
import { AnimatedBackground } from '@/components/animated-background';

export default function StakingPage() {
    return (
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link
                href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;900&family=Noto+Sans:wght@600&family=Bruno+Ace&family=Archivo+Black&display=swap"
                rel="stylesheet"
            />
            <TopNavigation variant="health-protocol" />

            <AnimatedBackground />

            <main className="relative z-10 min-h-screen text-gray-900 font-body overflow-x-hidden">
                <div className="flex flex-col items-center justify-center w-full max-w-[100vw] overflow-x-hidden">

                    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20 pt-24 sm:pt-28 md:pt-32">
                        {/* Header */}
                        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-16 px-2">

                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                                <span className="bg-white bg-clip-text text-transparent">
                                    HLTH Token Staking
                                </span>
                            </h1>

                            <p className="text-white/70 text-sm sm:text-base md:text-lg px-2">
                                Stake HLTH tokens to participate in governance and earn rewards while supporting the Health Protocol ecosystem
                            </p>
                        </div>

                        {/* Feature Cards */}
                        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12 max-w-7xl mx-auto">
                            {[
                                {
                                    icon: Lock,
                                    title: 'Secure Staking',
                                    value: 'Smart Contract',
                                    description: 'Audited & Secure'
                                },
                                {
                                    icon: TrendingUp,
                                    title: 'APY',
                                    value: 'Variable',
                                    description: 'Based on Protocol Usage'
                                },
                                {
                                    icon: Award,
                                    title: 'Rewards',
                                    value: 'HLTH Tokens',
                                    description: 'Daily Distribution'
                                },
                                {
                                    icon: Clock,
                                    title: 'Lock Period',
                                    value: 'Flexible',
                                    description: 'Multiple Options'
                                }
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="p-4 sm:p-5 md:p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 hover:bg-white/15 hover:border-[#00D7E9]/50 transition-all min-h-[180px] sm:min-h-[200px] flex flex-col"
                                >
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#00D7E9] to-[#FF9400] rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                                        <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </div>
                                    <h3 className="text-white font-semibold mb-1 text-base sm:text-lg">{item.title}</h3>
                                    <p className="text-[#00D7E9] font-bold mb-1 text-lg sm:text-xl">{item.value}</p>
                                    <p className="text-white/60 text-xs sm:text-sm mt-auto">{item.description}</p>
                                </div>
                            ))}
                        </div>

                        {/* What is HLTH Staking */}
                        <div className="max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12 px-2">
                            <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-white/20 p-5 sm:p-6 md:p-8">
                                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">What is HLTH Staking?</h2>
                                <div className="space-y-3 sm:space-y-4 text-white/80 text-sm sm:text-base">
                                    <p>
                                        HLTH token staking allows community members to lock their tokens and participate in protocol governance while earning rewards. Stakers help secure the network and align incentives across the ecosystem.
                                    </p>
                                    <p>
                                        The HLTH token serves as the coordination mechanism between Health-Shared communities and stakeholder funders, enabling transparent value distribution and decentralized decision-making.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Benefits Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12 max-w-5xl mx-auto px-2">
                            {[
                                {
                                    icon: Shield,
                                    title: 'Governance Rights',
                                    description: 'Vote on protocol upgrades, fee structures, and community funding proposals'
                                },
                                {
                                    icon: TrendingUp,
                                    title: 'Earn Rewards',
                                    description: 'Receive protocol fees and staking rewards proportional to your stake'
                                },
                                {
                                    icon: Users,
                                    title: 'Support Communities',
                                    description: 'Your stake helps fund community growth and research initiatives'
                                },
                                {
                                    icon: Award,
                                    title: 'Protocol Benefits',
                                    description: 'Access to exclusive features and early participation in new initiatives'
                                }
                            ].map((benefit, index) => (
                                <div key={index} className="p-5 sm:p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 hover:border-[#00D7E9]/50 transition-all">
                                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-[#00D7E9] to-[#FF9400] rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                                        <benefit.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    </div>
                                    <h3 className="text-white font-semibold mb-2 text-base sm:text-lg">{benefit.title}</h3>
                                    <p className="text-white/70 text-xs sm:text-sm leading-relaxed">{benefit.description}</p>
                                </div>
                            ))}
                        </div>

                        {/* Coming Soon CTA */}
                        <div className="max-w-2xl mx-auto px-2">
                            <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-white/20 p-6 sm:p-8 lg:p-12 text-center">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#00D7E9] to-[#FF9400] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                    <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                                </div>

                                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4 px-2">
                                    Staking Platform Launching Soon
                                </h2>

                                <p className="text-white/70 mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg px-2">
                                    Our staking platform is under development. The HLTH token will enable governance participation and reward distribution across the Health Protocol ecosystem.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
                                    <Link href="https://discord.com/invite/nMqmSJSCzZ" target="_blank" className="w-full sm:w-auto">
                                        <button className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-[#00D7E9] to-[#FF9400] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-[#00D7E9]/50 transition-all text-sm sm:text-base">
                                            Join Discord for Updates
                                        </button>
                                    </Link>
                                    <Link href="/" className="w-full sm:w-auto">
                                        <button className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-lg font-semibold hover:bg-white/20 transition-all text-sm sm:text-base">
                                            Back to Home
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </main>
        </>
    );
}