"use client"

import Image from "next/image";

export function StakeholderFunders() {
    return (
        <section className="w-full px-6 py-20 flex flex-col items-center">
            {/* Title */}
            <h2
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center mb-8 px-4"
                style={{ fontFamily: 'Archivo Black' }}
            >
                Stakeholder Funders
            </h2>

            {/* Subtitle */}
            <p
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white text-center mb-12 px-4"
                style={{ fontFamily: 'Roboto' }}
            >
                (5,5 Game Theory — Aligned Capital for Health)
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
                Pharma. Public health. Insurers. NGOs. They've always wanted to fund health outcomes,
                not just services. Now they can. The 5,5 model rewards these stakeholders for showing
                up early and aligning with communities. When they coordinate their efforts, the upside
                multiplies—for them and for everyone in the system.
            </p>

            {/* Icon/Image */}
            <Image
                src="/landingPage/stakholders_funders_icon.png"
                alt="Stakeholder Funders Icon"
                width={472}
                height={271}
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
                When stakeholders align early, everyone wins.
            </p>
        </section>
    );
}