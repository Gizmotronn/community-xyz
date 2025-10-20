"use client"

import Image from "next/image";

export function CommunityReserve() {
    return (
        <section className="w-full px-6 py-20 flex flex-col items-center">
            {/* Title */}
            <h2
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center mb-8 px-4"
                style={{ fontFamily: 'Archivo Black' }}
            >
                Community Reserve
            </h2>

            {/* Subtitle */}
            <p
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white text-center mb-12 px-4"
                style={{ fontFamily: 'Roboto' }}
            >
                (Sustainable Growth Engine)
            </p>

            {/* Description Text */}
            <p
                className="text-white text-center leading-[112%] mb-12 text-xl sm:text-2xl md:text-3xl lg:text-[34px] max-w-[1328px] w-full"
                style={{
                    fontFamily: 'Roboto',
                    fontWeight: 300,
                    lineHeight: '112%',
                    letterSpacing: '0px'
                }}
            >
                Each Community DAO holds its own treasury—seeded by the protocol and replenished
                through stakeholder value. These reserves offer loans to jumpstart growth and equitably
                share revenue among members, community founders, and Health Protocol.
            </p>

            {/* Image */}
            <Image
                src="/landingPage/community-reserve-icon.svg"
                alt="Community Reserve Icon"
                width={367}
                height={240}
                className="w-auto h-auto max-w-full mb-4"
            />

            {/* Bottom Text */}
            <p
                className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[36px] px-4"
                style={{
                    fontFamily: 'Roboto',
                    color: '#F6A23A',
                }}
            >
                Invest once. Grow forever.
            </p>
        </section>
    );
}