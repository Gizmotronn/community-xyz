"use client"

import Image from "next/image";

export function StakeholderFunders() {
    return (
        <section className="w-full px-4 sm:px-6 py-10 sm:py-12 md:py-16 lg:py-20 flex flex-col items-center">
            {/* Title */}
            <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold text-white text-center mb-4 sm:mb-6 md:mb-8 px-4"
                style={{ fontFamily: 'Archivo Black' }}
            >
                Stakeholder Funders
            </h2>

            {/* Subtitle */}
            <p
                className="text-xl sm:text-2xl md:text-3xl lg:text-[36px] text-white text-center mb-6 sm:mb-8 md:mb-12 px-4"
                style={{ fontFamily: 'Roboto' }}
            >
                (5,5 Game Theory — Aligned Capital for Health)
            </p>

            {/* Description Text */}
            <p
                className="text-white text-center leading-[112%] mb-8 sm:mb-10 md:mb-12 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[34px] max-w-[1328px] w-full px-2"
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
                src="/landingPage/stakholders_funders_icon.webp"
                alt="Stakeholder Funders Icon"
                width={472}
                height={271}
                className="w-auto h-auto max-w-[300px] sm:max-w-[380px] md:max-w-full mb-4"
            />

            {/* Bottom Text */}
            <p
                className="text-center text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-[36px] px-4"
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