"use client"

import { TopNavigation } from '@/components/top-navigation';
import { Briefcase, CheckCircle, Users, Shield, TrendingUp, Zap, Database, Lock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Footer } from "@/components/footer";
import { AnimatedBackground } from '@/components/animated-background';

export default function PharmaPage() {
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

                    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20 pt-24 sm:pt-28 md:pt-32">
                        {/* Header */}
                        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12 md:mb-16 px-2">

                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                                <span className="bg-white bg-clip-text text-transparent">
                                    For Pharmaceutical Partners
                                </span>
                            </h1>

                            <p className="text-white/70 text-sm sm:text-base md:text-lg px-2">
                                Access activated health communities with blockchain-verified scorecards for research, clinical trials, and patient engagement
                            </p>
                        </div>

                        {/* What We Offer */}
                        <div className="max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12 px-2">
                            <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-white/20 p-5 sm:p-6 md:p-8">
                                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">The Health Protocol Advantage</h2>
                                <div className="space-y-3 sm:space-y-4 text-white/80 text-sm sm:text-base">
                                    <p>
                                        Health Protocol bridges the (3,3) community game with the (5,5) stakeholder game - connecting engaged patient communities with pharmaceutical research and development needs.
                                    </p>
                                    <p>
                                        Our blockchain-verified health scorecards provide transparent records of community activation, making it easy to identify and partner with highly engaged patient populations for trials, research studies, and patient-reported outcomes.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Feature Cards */}
                        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12 max-w-7xl mx-auto px-2">
                            {[
                                {
                                    icon: Database,
                                    title: 'Health Scorecards',
                                    description: 'Blockchain-verified community activation records'
                                },
                                {
                                    icon: Users,
                                    title: 'Engaged Communities',
                                    description: 'Access to 27K+ active community members'
                                },
                                {
                                    icon: Lock,
                                    title: 'Privacy-Preserved',
                                    description: 'EHR data with consent-based sharing'
                                },
                                {
                                    icon: Shield,
                                    title: 'Compliance Ready',
                                    description: 'Built-in regulatory compliance framework'
                                }
                            ].map((feature, index) => (
                                <div
                                    key={index}
                                    className="p-4 sm:p-5 md:p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 hover:bg-white/15 hover:border-[#00D7E9]/50 transition-all min-h-[180px] sm:min-h-[200px] flex flex-col"
                                >
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#00D7E9] to-[#FF9400] rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                                        <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </div>
                                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2">{feature.title}</h3>
                                    <p className="text-white/70 text-xs sm:text-sm mt-auto leading-relaxed">{feature.description}</p>
                                </div>
                            ))}
                        </div>

                        {/* Partnership Benefits */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-10 md:mb-12 max-w-6xl mx-auto px-2">
                            <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-white/20 p-5 sm:p-6 md:p-8">
                                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Partnership Benefits</h2>
                                <div className="space-y-3 sm:space-y-4">
                                    {[
                                        'Access to pre-qualified, engaged patient communities',
                                        'Blockchain-verified community health scorecards',
                                        'Transparent fee split mechanism (40/25/15/20%)',
                                        'Privacy-preserved EHR data with consent management',
                                        'Direct community engagement through incentive proposals',
                                        'Cost-effective patient recruitment for clinical trials',
                                        'Real-world evidence from active patient populations',
                                        'Alignment with decentralized health data movement'
                                    ].map((benefit, index) => (
                                        <div key={index} className="flex items-start gap-2 sm:gap-3">
                                            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#00D7E9] flex-shrink-0 mt-0.5" />
                                            <p className="text-white/80 text-sm sm:text-base">{benefit}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-white/20 p-5 sm:p-6 md:p-8">
                                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">How It Works</h2>
                                <div className="space-y-4 sm:space-y-6">
                                    {[
                                        {
                                            step: '1',
                                            title: 'Identify Communities',
                                            description: 'Browse health scorecards to find activated communities relevant to your research'
                                        },
                                        {
                                            step: '2',
                                            title: 'Propose Incentives',
                                            description: 'Create donor incentive proposals for trial participation or data sharing'
                                        },
                                        {
                                            step: '3',
                                            title: 'Manage Consent',
                                            description: 'Members opt-in with blockchain-verified consent for data sharing'
                                        },
                                        {
                                            step: '4',
                                            title: 'Value Distribution',
                                            description: 'Transparent fee split rewards participants, communities, and protocol'
                                        }
                                    ].map((item) => (
                                        <div key={item.step} className="flex items-start gap-3 sm:gap-4">
                                            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-[#00D7E9] to-[#FF9400] rounded-lg flex items-center justify-center flex-shrink-0">
                                                <span className="text-white font-bold text-sm sm:text-base">{item.step}</span>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-white font-semibold mb-1 text-sm sm:text-base">{item.title}</h3>
                                                <p className="text-white/70 text-xs sm:text-sm leading-relaxed">{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Value Proposition */}
                        <div className="max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12 px-2">
                            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6 sm:mb-8">Why Health Protocol?</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                                {[
                                    {
                                        icon: Zap,
                                        title: 'Faster Recruitment',
                                        description: 'Access pre-qualified participants with verified health scorecards'
                                    },
                                    {
                                        icon: Shield,
                                        title: 'Privacy First',
                                        description: 'Blockchain-verified consent and anonymized data ensure compliance'
                                    },
                                    {
                                        icon: TrendingUp,
                                        title: 'Better Outcomes',
                                        description: 'Engaged communities provide higher quality data and better retention'
                                    }
                                ].map((value, index) => (
                                    <div key={index} className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 hover:border-[#00D7E9]/50 p-5 sm:p-6 text-center transition-all">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#00D7E9] to-[#FF9400] rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                            <value.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                        </div>
                                        <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">{value.title}</h3>
                                        <p className="text-white/70 text-xs sm:text-sm leading-relaxed">{value.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Coming Soon CTA */}
                        <div className="max-w-2xl mx-auto px-2">
                            <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-white/20 p-6 sm:p-8 lg:p-12 text-center">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#00D7E9] to-[#FF9400] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                    <Briefcase className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                                </div>

                                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4 px-2">
                                    Partnership Program Launching Soon
                                </h2>

                                <p className="text-white/70 mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg px-2">
                                    We're finalizing our pharmaceutical partnership program to connect engaged patient communities with research opportunities. Register your interest for early access.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
                                    <Link href="https://discord.com/invite/nMqmSJSCzZ" target="_blank" className="w-full sm:w-auto">
                                        <button className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-[#00D7E9] to-[#FF9400] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-[#00D7E9]/50 transition-all text-sm sm:text-base">
                                            Register Interest
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