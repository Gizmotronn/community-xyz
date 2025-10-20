'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { WalletConnectButton } from './wallet-connect-button';


export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center w-full overflow-hidden pt-10 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-8 lg:px-16">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
        <div className="max-w-[1440px] mx-auto flex flex-col items-center justify-center space-y-6 sm:space-y-8 lg:space-y-6">

          {/* Main Heading */}
          <h1
            className="text-center leading-[103%] text-white font-black font-roboto
                       text-[32px] sm:text-[40px] md:text-[48px] lg:text-[52px] xl:text-[56px]
                       px-4 sm:px-0"
          >
            Health isn't built in hospitals.<br />
            It's built in communities.
          </h1>

          {/* Cards Row */}
          <div className="flex flex-col xl:flex-row items-center justify-center 
                         gap-8 sm:gap-12 md:gap-16 xl:gap-16 
                         w-full px-0 sm:px-4 mt-4 sm:mt-6 lg:mt-6">

            {/* LEFT CARD — Health Shared */}
            <div className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[410px] xl:max-w-[435px] flex flex-col items-center flex-shrink-0">
              <div
                className="relative flex items-start justify-center transition-transform duration-300 hover:scale-105 hover:-translate-y-2
                           w-[280px] h-[256px] 
                           sm:w-[340px] sm:h-[311px] 
                           md:w-[380px] md:h-[347px]
                           lg:w-[410px] lg:h-[375px]
                           xl:w-[435px] xl:h-[398px]"
              >
                {/* Folder Background */}
                <div
                  className="absolute inset-0 bg-center bg-no-repeat bg-contain"
                  style={{
                    backgroundImage: 'url(/landingPage/folder.svg)',
                  }}
                />

                {/* Logo */}
                <div className="absolute z-20 
                               top-[19px] sm:top-[22px] md:top-[26px] lg:top-[28px] xl:top-[30px] 
                               left-1/2 -translate-x-[81%]
                               w-[164px] h-[94px] 
                               sm:w-[199px] sm:h-[114px] 
                               md:w-[222px] md:h-[127px]
                               lg:w-[240px] lg:h-[137px]
                               xl:w-[256px] xl:h-[146px]">
                  <Image
                    src="/landingPage/logo_HS.svg"
                    alt="Health Shared"
                    fill
                    className="object-contain drop-shadow-lg"
                    priority
                  />
                </div>

                {/* Description Text */}
                <div className="absolute z-10 bottom-0 flex flex-col items-center justify-end 
                               px-6 sm:px-7 md:px-7 lg:px-7 xl:px-8 
                               pb-7 sm:pb-8 md:pb-9 lg:pb-9 xl:pb-10 
                               text-center w-full">
                  <p className="font-roboto font-light text-[#E5E5E5] leading-[103%] 
                               max-w-[192px] sm:max-w-[233px] md:max-w-[260px] lg:max-w-[281px] xl:max-w-[300px]
                               text-[16px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[25px]
                               -translate-x-[4%] -translate-y-[40%]">
                    Empowering communities using AI to ensure every voice is heard - building human capital.
                  </p>
                </div>
              </div>
            </div>

            {/* CHAIN ICON */}
            <div className="flex items-center justify-center my-2 xl:my-0 xl:mt-[160px] flex-shrink-0">
              <div className="relative 
                             w-[90px] h-[90px] 
                             sm:w-[120px] sm:h-[120px] 
                             md:w-[145px] md:h-[145px]
                             lg:w-[165px] lg:h-[165px]
                             xl:w-[186px] xl:h-[186px]
                             translate-y-0 xl:-translate-y-[65px]">
                <Image
                  src="/landingPage/chain.svg"
                  alt="Connection"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>

            {/* RIGHT CARD — Health Protocol */}
            <div className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[410px] xl:max-w-[435px] flex flex-col items-center flex-shrink-0">
              <div
                className="relative flex items-start justify-center transition-transform duration-300 hover:scale-105 hover:-translate-y-2
                           w-[280px] h-[256px] 
                           sm:w-[340px] sm:h-[311px] 
                           md:w-[380px] md:h-[347px]
                           lg:w-[410px] lg:h-[375px]
                           xl:w-[435px] xl:h-[398px]"
              >
                {/* Folder Background */}
                <div
                  className="absolute inset-0 bg-center bg-no-repeat bg-contain"
                  style={{
                    backgroundImage: 'url(/landingPage/folder.svg)',
                  }}
                />

                {/* Logo */}
                <div className="absolute z-20 
                               top-[15px] sm:top-[18px] md:top-[20px] lg:top-[22px] xl:top-[23px] 
                               left-[48%] -translate-x-[81%]
                               w-[147px] h-[80px] 
                               sm:w-[179px] sm:h-[97px] 
                               md:w-[199px] md:h-[108px]
                               lg:w-[215px] lg:h-[116px]
                               xl:w-[229px] xl:h-[124px]">
                  <Image
                    src="/landingPage/logo_HP.svg"
                    alt="Health Protocol"
                    fill
                    className="object-contain drop-shadow-lg"
                    priority
                  />
                </div>

                {/* Description Text */}
                <div className="absolute z-10 bottom-0 flex flex-col items-center justify-end 
                               px-6 sm:px-7 md:px-7 lg:px-7 xl:px-8 
                               pb-7 sm:pb-8 md:pb-9 lg:pb-9 xl:pb-10 
                               text-center w-full">
                  <p className="font-roboto font-light text-[#E5E5E5] leading-[103%] 
                               max-w-[212px] sm:max-w-[257px] md:max-w-[287px] lg:max-w-[310px] xl:max-w-[330px]
                               text-[16px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[25px]
                               -translate-x-[2%] -translate-y-[88%]">
                    Coordinating stakeholders and facilitating value transfer to aligned communities.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="relative z-50 flex flex-col sm:flex-row justify-center items-center 
                         pt-4 sm:pt-6 lg:pt-4 
                         gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12">
            <Link href="https://discord.gg/health-protocol" target="_blank">
              <button
                className="w-[234px] h-[44px] bg-[#5865F2] rounded-lg 
                           font-['Noto_Sans'] font-semibold text-[16px] text-black
                           transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95 shadow-lg"
              >
                Discord
              </button>
            </Link>
            <WalletConnectButton />
          </div>
        </div>
      </div>
    </section>
  );
}