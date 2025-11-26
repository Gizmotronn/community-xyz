"use client"

import { TopNavigation } from '@/components/top-navigation';
import { Heart, Activity, Share2, Users, Globe } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Footer } from "@/components/footer";
import { AnimatedBackground } from '@/components/animated-background';

export default function ExplorePage() {
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
                        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12 px-2">

                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                                <span className="bg-white bg-clip-text text-transparent">
                                    Explore Health Communities
                                </span>
                            </h1>

                            <p className="text-white/70 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg px-2">
                                Discover health protocol communities building the future of collaborative healthcare research
                            </p>
                        </div>

                        {/* What Are Health Communities */}
                        <div className="max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12 px-2">
                            <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-white/20 p-5 sm:p-6 md:p-8">
                                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">What Are Health Communities?</h2>
                                <div className="space-y-3 sm:space-y-4 text-white/80 text-sm sm:text-base">
                                    <p>
                                        Health communities on Health-Shared are groups of people with similar health interests or conditions who come together to share experiences, support research, and earn rewards for their participation.
                                    </p>
                                    <p>
                                        Each community builds its own health scorecard through blockchain-verified activities like discovery interviews, health data sharing, and community engagement - creating transparent records of activation that attract stakeholder funding.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Community Examples */}
                        <div className="mb-8 sm:mb-10 md:mb-12 px-2">
                            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">Example Communities (Preview)</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 max-w-7xl mx-auto">
                                {[
                                    {
                                        name: 'Hammersmith & Fulham',
                                        category: 'Regional Health',
                                        description: 'This community is for anyone who has had weight management issues or Diabetes. It is commissioned by H&F council for the benefit of residents.',
                                        link: 'https://health-shared.com/communities/hammersmith-and-fulham-375519624'
                                    },
                                    {
                                        name: 'Health Shared Diabetes Community',
                                        category: 'Condition-Specific',
                                        description: 'The health-shared diabetes community is a great starting point for everything diabetes. Content from specialists and People who live with Diabetes.',
                                        link: 'https://health-shared.com/communities/health-shared-diabetes-community-805155849'
                                    },
                                    {
                                        name: 'Carroll County Health Champions',
                                        category: 'Health Champions',
                                        description: 'This online space brings together community members and healthcare providers to offer practical tips, emotional support, and valuable resources.',
                                        link: 'https://health-shared.com/communities/carroll-county-health-champions-452911335'
                                    },
                                    {
                                        name: 'Baltimore County Community',
                                        category: 'Regional Health',
                                        description: 'This platform brings together Baltimore County residents and healthcare professionals to provide practical resources, support, and guidance.',
                                        link: 'https://health-shared.com/communities/baltimore-county-community-584355754'
                                    }
                                ].map((community, index) => (
                                    <Link
                                        key={index}
                                        href={community.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-4 sm:p-5 md:p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 hover:bg-white/20 hover:border-[#00D7E9] hover:shadow-lg hover:shadow-[#00D7E9]/30 hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col"
                                        style={{ minHeight: '240px', maxHeight: '280px' }}
                                    >
                                        <div className="flex items-start justify-between mb-2 gap-2">
                                            <h3 className="text-base sm:text-lg font-bold text-white flex-1 leading-tight line-clamp-2">{community.name}</h3>
                                            <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs whitespace-nowrap flex-shrink-0 h-fit">
                                                Active
                                            </span>
                                        </div>

                                        <p className="text-[#00D7E9] text-xs sm:text-sm mb-2">{community.category}</p>

                                        <p className="text-white/60 text-xs sm:text-sm leading-relaxed overflow-hidden"
                                            style={{
                                                display: '-webkit-box',
                                                WebkitLineClamp: '4',
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}>
                                            {community.description}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Why Join Section */}
                        <div className="max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12 px-2">
                            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6 sm:mb-8">Why Join a Health Community?</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                                {[
                                    {
                                        icon: Activity,
                                        title: 'Earn Points & Rewards',
                                        description: 'Get incentivized for discovery interviews, health data sharing, and community participation'
                                    },
                                    {
                                        icon: Share2,
                                        title: 'Share Your Story',
                                        description: 'Contribute your health experiences through AI-assisted interviews that build community knowledge'
                                    },
                                    {
                                        icon: Users,
                                        title: 'Build Human Capital',
                                        description: 'Connect with others facing similar health challenges and build collective wisdom'
                                    },
                                    {
                                        icon: Globe,
                                        title: 'Attract Funding',
                                        description: 'Active communities with strong scorecards attract pharmaceutical and research partners'
                                    }
                                ].map((benefit, index) => (
                                    <div key={index} className="p-5 sm:p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 hover:border-[#00D7E9]/50 transition-all">
                                        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-[#00D7E9] to-[#FF9400] rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                                            <benefit.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                        </div>
                                        <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">{benefit.title}</h3>
                                        <p className="text-white/70 text-xs sm:text-sm leading-relaxed">{benefit.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* How It Works */}
                        <div className="max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12 px-2">
                            <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-white/20 p-5 sm:p-6 md:p-8">
                                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">How Communities Work</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                                    {[
                                        {
                                            step: '1',
                                            title: 'Join on Health-Shared',
                                            description: 'Sign up and join communities aligned with your health interests'
                                        },
                                        {
                                            step: '2',
                                            title: 'Participate & Earn',
                                            description: 'Complete discovery interviews, share experiences, refer friends'
                                        },
                                        {
                                            step: '3',
                                            title: 'Build Scorecards',
                                            description: 'Your activity creates blockchain-verified community health scorecards'
                                        }
                                    ].map((item) => (
                                        <div key={item.step} className="text-center">
                                            <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-[#00D7E9] to-[#FF9400] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                                <span className="text-white font-bold text-lg sm:text-xl">{item.step}</span>
                                            </div>
                                            <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">{item.title}</h3>
                                            <p className="text-white/70 text-xs sm:text-sm leading-relaxed">{item.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Coming Soon Card */}
                        <div className="max-w-2xl mx-auto px-2">
                            <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-white/20 p-6 sm:p-8 lg:p-12 text-center">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#00D7E9] to-[#FF9400] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                    <Users className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                                </div>

                                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4 px-2">
                                    Community Discovery
                                </h2>

                                <p className="text-white/70 mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg px-2">
                                    We're building an amazing platform for you to discover, join, and create health protocol communities. Existing communities are already active on Health-Shared.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
                                    <Link href="https://health-shared.com" target="_blank" className="w-full sm:w-auto">
                                        <button className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-[#00D7E9] to-[#FF9400] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-[#00D7E9]/50 transition-all text-sm sm:text-base">
                                            Visit Health-Shared
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