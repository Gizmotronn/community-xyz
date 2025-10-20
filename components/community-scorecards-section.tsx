"use client"

import Image from "next/image";

export function CommunityScorecards() {
    return (
        <section className="w-full px-6 py-20 flex flex-col items-center">
            {/* Title */}
            <h2
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center mb-8 px-4"
                style={{ fontFamily: 'Archivo Black' }}
            >
                Community Scorecards
            </h2>

            {/* Subtitle */}
            <p
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white text-center mb-12 px-4"
                style={{ fontFamily: 'Roboto' }}
            >
                (Data with Direction)
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
                Every Community DAO generates a living, on-chain scorecard powered by AI agents and
                secure computation. These scorecards reflect real engagement—quantified and verified—
                giving shape and direction to the energy of the community. Funders use these scorecards
                to identify where need and opportunity align, directing support to where it matters most.
            </p>

            {/* Image */}
            <Image
                src="/landingPage/community_scorecard_icon.png"
                alt="Community Scorecard Icon"
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
                What gets measured, gets funded.
            </p>
        </section>
    );
}