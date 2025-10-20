'use client';

import React from 'react';
import Image from 'next/image';

const teamMembers = [
    {
        name: 'Prof. Usman Jaffer',
        title: 'CEO',
        description: 'Consultant Vascular Surgeon, academic, founder of health-shared.',
        image: '/landingPage/usman-jaffer.png'
    },
    {
        name: 'Carl Dempsey',
        title: 'Chief Strategy Officer',
        description: '20+ years board leadership at J&J, strategic partnerships.',
        image: '/landingPage/carl-dempsey.png'
    },
    {
        name: 'Nikolai Matiushev',
        title: 'Chief Technical Officer',
        description: 'Senior developer, 20+ years, mobile/web/enterprise systems.',
        image: '/landingPage/nikolai-matiushev.png'
    },
    {
        name: 'Prof Usman Khan',
        title: 'Non-exec Director',
        description: 'Chair of Motor Neuron Disease Association, public health expert.',
        image: '/landingPage/usman-khan.png'
    },
    {
        name: 'Dr Sadie Syed',
        title: 'Director of Content',
        description: 'Consultant Anesthetist, Director of Simulation at Imperial.',
        image: '/landingPage/sadie-syed.png'
    },
    {
        name: 'Arif Minhas',
        nameLine1: 'Arif Minhas',
        title: 'Head, Strategic Partnerships',
        titleLine1: 'Head, Strategic',
        titleLine2: 'Partnerships',
        description: '20 years in business development strategic partnerships.',
        image: '/landingPage/arif-minhas.png'
    },
    {
        name: 'Miss Florence Kashora',
        nameLine1: 'Miss Florence',
        nameLine2: 'Kashora',
        title: 'PhD Researcher',
        description: 'Doctor in surgical training, PhD in community activation.',
        image: '/landingPage/florence-kashora.png'
    }
];

export function TeamSection() {
    return (
        <section id="team" className="relative w-full flex items-center justify-center py-20 px-4">
            <div className="relative z-10 container mx-auto max-w-[1440px]">
                {/* Title */}
                <h2
                    className="text-center text-white font-black mb-16"
                    style={{
                        fontFamily: 'Archivo Black',
                        fontSize: '56px',
                        lineHeight: '103%',
                    }}
                >
                    Team
                </h2>

                {/* Team Grid - First Row (4 cards) */}
                <div className="flex flex-wrap justify-center gap-y-16 mb-14" style={{ gap: '64px 48px' }}>
                    {teamMembers.slice(0, 4).map((member, index) => (
                        <div key={index} className="relative flex items-center justify-center group">
                            <div
                                className="relative transition-all duration-300 ease-out group-hover:scale-105 group-hover:-translate-y-1"
                                style={{
                                    width: '285px',
                                    height: '231px',
                                }}
                            >
                                {/* Background Image */}
                                <div
                                    className="absolute inset-0 transition-all duration-300 group-hover:drop-shadow-[0_5px_15px_rgba(255,255,255,0.2)]"
                                    style={{
                                        backgroundImage: 'url(/landingPage/team-card.svg)',
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

                                {/* Name & Title  */}
                                <div
                                    className="absolute flex flex-col items-center transition-all duration-300"
                                    style={{
                                        top: '55px',
                                        right: '28px',
                                    }}
                                >
                                    <h3
                                        className="text-white font-bold transition-all duration-300"
                                        style={{
                                            fontFamily: 'Roboto',
                                            fontSize: '16px',
                                            lineHeight: '120%',
                                            marginBottom: '4px',
                                        }}
                                    >
                                        {member.name}
                                    </h3>

                                    <p
                                        className="text-white transition-all duration-300"
                                        style={{
                                            fontFamily: 'Roboto',
                                            fontSize: '14px',
                                            fontWeight: 300,
                                            lineHeight: '120%',
                                        }}
                                    >
                                        {member.title}
                                    </p>
                                </div>

                                {/* Description */}
                                <div
                                    className="absolute text-center transition-all duration-300"
                                    style={{
                                        left: '50%',
                                        bottom: '64px',
                                        transform: 'translateX(-50%)',
                                        width: '208px',
                                    }}
                                >
                                    <p
                                        className="text-white transition-all duration-300"
                                        style={{
                                            fontFamily: 'Roboto',
                                            fontSize: '14px',
                                            fontWeight: 300,
                                            lineHeight: '112%',
                                        }}
                                    >
                                        {member.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Second Row - 3 cards centered */}
                <div className="flex flex-wrap justify-center" style={{ gap: '64px 48px' }}>
                    {teamMembers.slice(4).map((member, index) => (
                        <div key={index} className="relative flex items-center justify-center group">
                            <div
                                className="relative transition-all duration-300 ease-out group-hover:scale-105 group-hover:-translate-y-1"
                                style={{
                                    width: '285px',
                                    height: '231px',
                                }}
                            >
                                {/* Background Image */}
                                <div
                                    className="absolute inset-0 transition-all duration-300 group-hover:drop-shadow-[0_5px_15px_rgba(255,255,255,0.2)]"
                                    style={{
                                        backgroundImage: 'url(/landingPage/team-card.svg)',
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

                                {/* Name & Title - Special handling for Arif and Florence */}
                                <div
                                    className="absolute flex flex-col items-center transition-all duration-300"
                                    style={{
                                        top: member.nameLine2 ? '50px' : '55px',
                                        right: member.titleLine2 ? '20px' : '30px',
                                        width: member.titleLine2 || member.nameLine2 ? '140px' : '120px',
                                    }}
                                >
                                    {/* Name */}
                                    {member.nameLine2 ? (
                                        <div className="text-center">
                                            <div
                                                className="text-white font-bold transition-all duration-300"
                                                style={{
                                                    fontFamily: 'Roboto',
                                                    fontSize: '16px',
                                                    lineHeight: '120%',
                                                }}
                                            >
                                                {member.nameLine1}
                                            </div>
                                            <div
                                                className="text-white font-bold transition-all duration-300"
                                                style={{
                                                    fontFamily: 'Roboto',
                                                    fontSize: '16px',
                                                    lineHeight: '120%',
                                                    marginBottom: '4px',
                                                }}
                                            >
                                                {member.nameLine2}
                                            </div>
                                        </div>
                                    ) : (
                                        <h3
                                            className="text-white font-bold text-center transition-all duration-300"
                                            style={{
                                                fontFamily: 'Roboto',
                                                fontSize: '16px',
                                                lineHeight: '120%',
                                                marginBottom: '4px',
                                            }}
                                        >
                                            {member.name}
                                        </h3>
                                    )}

                                    {/* Title */}
                                    {member.titleLine2 ? (
                                        <div className="text-center">
                                            <div
                                                className="text-white transition-all duration-300"
                                                style={{
                                                    fontFamily: 'Roboto',
                                                    fontSize: '14px',
                                                    fontWeight: 300,
                                                    lineHeight: '120%',
                                                }}
                                            >
                                                {member.titleLine1}
                                            </div>
                                            <div
                                                className="text-white transition-all duration-300"
                                                style={{
                                                    fontFamily: 'Roboto',
                                                    fontSize: '14px',
                                                    fontWeight: 300,
                                                    lineHeight: '120%',
                                                }}
                                            >
                                                {member.titleLine2}
                                            </div>
                                        </div>
                                    ) : (
                                        <p
                                            className="text-white text-center transition-all duration-300"
                                            style={{
                                                fontFamily: 'Roboto',
                                                fontSize: '14px',
                                                fontWeight: 300,
                                                lineHeight: '120%',
                                            }}
                                        >
                                            {member.title}
                                        </p>
                                    )}
                                </div>

                                {/* Description - Adjusted for multi-line names/titles */}
                                <div
                                    className="absolute text-center transition-all duration-300"
                                    style={{
                                        left: '50%',
                                        bottom: member.titleLine2 || member.nameLine2 ? '56px' : '54px',
                                        transform: 'translateX(-50%)',
                                        width: '208px',
                                    }}
                                >
                                    <p
                                        className="text-white transition-all duration-300"
                                        style={{
                                            fontFamily: 'Roboto',
                                            fontSize: '14px',
                                            fontWeight: 300,
                                            lineHeight: '112%',
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