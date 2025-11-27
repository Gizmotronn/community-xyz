'use client';

import React from 'react';
import Image from 'next/image';

const advisorsMembers = [
    {
        name: 'Professor Nadey Hakim',
        title: 'Head of Health KOL Relationships',
        description: 'World renowned transplant surgeon, past VP of the Royal Society of Medicine, International relations lead at Cleveland Clinic London.',
        image: '/landingPage/nadey-hakim.webp'
    },
    {
        name: 'Neil Meltzer',
        title: 'President & CEO at LifeBridge Health',
        description: 'President & CEO at LifeBridge Health since 2013. Former President at Sinai Hospital. Past National Board Chair, American Heart Association.',
        image: '/landingPage/neil-meltzer.webp'
    },
    {
        name: 'Sir Richard Sykes',
        title: 'Advisor',
        description: 'Chairman of The Royal Institution of Great Britain, Imperial College Healthcare NHS Trust, UK Stem Cell Foundation, and more. Fellow of multiple prestigious organizations.',
        image: '/landingPage/richard-sykes.webp'
    },
    {
        name: 'Robert Pleticha',
        title: 'Patient Engagement Specialist',
        description: 'Patient engagement expert with 10+ years experience, integrating patient perspectives into clinical development for transformative healthcare solutions.',
        image: '/landingPage/robert-pleticha.webp'
    },
];

export function AdvisorsSection() {
    return (
        <section id="advisors" className="relative w-full flex items-center justify-center py-10 sm:py-12 md:py-16 lg:py-20 px-4 overflow-hidden">
            <div
                className="absolute pointer-events-none hidden lg:block"
                style={{
                    top: '28px',
                    left: '155px',
                    width: '256px',
                    height: '256px',
                    zIndex: 1,
                }}
            >
                <Image
                    src="/landingPage/blue_earth.webp"
                    alt=""
                    width={256}
                    height={256}
                    className="w-full h-full"
                />
            </div>

            <div
                className="absolute pointer-events-none hidden lg:block"
                style={{
                    bottom: '-19px',
                    left: '48%',
                    transform: 'translateX(-50%)',
                    width: '185px',
                    height: '215px',
                    zIndex: 1,
                }}
            >
                <Image
                    src="/landingPage/red_earth.webp"
                    alt=""
                    width={185}
                    height={215}
                    className="w-full h-full object-contain"
                />
            </div>

            <div
                className="absolute pointer-events-none hidden lg:block"
                style={{
                    bottom: '-45px',
                    right: '85px',
                    width: '268px',
                    height: '245px',
                    zIndex: 1,
                }}
            >
                <Image
                    src="/landingPage/gradient_earth.webp"
                    alt=""
                    width={268}
                    height={245}
                    className="w-full h-full object-contain"
                />
            </div>

            <div className="relative z-10 container mx-auto max-w-[1440px]">
                {/* Title */}
                <h2
                    className="text-center text-white font-black mb-8 sm:mb-12 md:mb-20 lg:mb-32 text-3xl sm:text-4xl md:text-5xl lg:text-[56px]"
                    style={{
                        fontFamily: 'Archivo Black',
                        lineHeight: '103%',
                    }}
                >
                    Advisors
                </h2>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-8 sm:gap-y-12 md:gap-y-16 mb-8 sm:mb-10 md:mb-14">
                    {/* First Row - 4 cards */}
                    {advisorsMembers.slice(0, 4).map((member, index) => (
                        <div key={index} className="relative flex items-center justify-center group">
                            <div
                                className="relative transition-all duration-300 ease-out group-hover:scale-105 group-hover:-translate-y-1 w-[260px] h-[211px] sm:w-[285px] sm:h-[231px]"
                            >
                                {/* Background Image */}
                                <div
                                    className="absolute inset-0 transition-all duration-300 group-hover:drop-shadow-[0_5px_15px_rgba(255,255,255,0.2)]"
                                    style={{
                                        backgroundImage: 'url(/landingPage/team-card.webp)',
                                        backgroundSize: 'contain',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                    }}
                                />

                                <div
                                    className="absolute flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                                    style={{
                                        top: '14px',
                                        left: '20px',
                                        width: '95px',
                                        height: '95px',
                                        position: 'absolute',
                                    }}
                                >
                                    {/* Outer Glow Ring */}
                                    <div
                                        className="absolute inset-0 rounded-full transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.35)]"
                                        style={{
                                            background: 'radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 70%, transparent 100%)',
                                            boxShadow: '0 0 25px rgba(255, 255, 255, 0.25)',
                                            borderRadius: '50%',
                                        }}
                                    ></div>

                                    {/* Main Dark Frame */}
                                    <div
                                        className="relative flex items-center justify-center"
                                        style={{
                                            width: '95px',
                                            height: '95px',
                                            backgroundColor: '#242424',
                                            border: '1px solid #FFFFFF',
                                            borderRadius: '50%',
                                            boxShadow: 'inset 0 0 10px rgba(255,255,255,0.1)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {/* Inner White Border */}
                                        <div
                                            className="flex items-center justify-center rounded-full overflow-hidden"
                                            style={{
                                                width: '85px',
                                                height: '85px',
                                                backgroundColor: '#242424',
                                                border: '1px solid #FFFFFF',
                                                borderRadius: '50%',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            {/* Profile Image */}
                                            <div className="relative w-full h-full rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-105">
                                                <Image
                                                    src={member.image}
                                                    alt={member.name}
                                                    fill
                                                    className="object-cover"
                                                    sizes="85px"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Name & Title - Top Right */}
                                <div
                                    className="absolute flex flex-col items-center text-center transition-all duration-300"
                                    style={{
                                        top: '37px',
                                        right: '20px',
                                        width: '160px',
                                    }}
                                >
                                    <h3
                                        className="text-white font-bold transition-all duration-300 text-sm sm:text-base"
                                        style={{
                                            fontFamily: 'Roboto',
                                            lineHeight: '120%',
                                            marginBottom: '4px',
                                        }}
                                    >
                                        {member.name}
                                    </h3>

                                    <p
                                        className="text-white transition-all duration-300 text-xs sm:text-sm"
                                        style={{
                                            fontFamily: 'Roboto',
                                            lineHeight: '120%',
                                        }}
                                    >
                                        {member.title}
                                    </p>
                                </div>

                                {/* Description - Centered */}
                                <div
                                    className="absolute text-center transition-all duration-300"
                                    style={{
                                        left: '50%',
                                        bottom: '33px',
                                        transform: 'translateX(-50%)',
                                        width: '240px',
                                        paddingLeft: '10px',
                                        paddingRight: '10px',
                                    }}
                                >
                                    <p
                                        className="text-white transition-all duration-300 text-xs sm:text-sm"
                                        style={{
                                            fontFamily: 'Roboto',
                                            lineHeight: '116%',
                                        }}
                                    >
                                        {member.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}