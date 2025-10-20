"use client"

import Image from "next/image";

export function HealthProtocol() {
    return (
        <section className="w-full px-6 py-20 flex flex-col items-center">
            {/* Title */}
            <h2
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center mb-8 px-4"
                style={{ fontFamily: 'Archivo Black' }}
            >
                The Health Protocol
            </h2>

            {/* Subtitle */}
            <p
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white text-center mb-12 px-4"
                style={{ fontFamily: 'Roboto' }}
            >
                (Infrastructure for Coordinated Health)
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
                Beneath it all is the protocol—a modular smart contract system running on scalable
                hyperchain infrastructure. It links communities, scorecards, tokens, and funders into a
                unified health-finance engine.
            </p>

            {/* Image */}
            <Image
                src="/landingPage/health_protocol_section_icon.svg"
                alt="Health Protocol Section Icon"
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
                Designed for scale. Built for fairness.
            </p>
        </section>
    );
}