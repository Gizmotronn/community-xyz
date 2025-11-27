'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { WalletConnectButton } from '@/components/wallet-connect-button';


export function HeroSection() {
  return (
    <section id="hero" className="relative flex items-center justify-center w-full overflow-hidden py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-8 lg:px-16">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
        <div className="max-w-[1440px] mx-auto flex flex-col items-center justify-center space-y-6 sm:space-y-8 lg:space-y-6">

          {/* Main Heading */}
          <h1
            className="text-center leading-[103%] text-white font-black font-roboto
                       text-[32px] sm:text-[36px] md:text-[42px] lg:text-[52px] xl:text-[56px]
                       px-4 sm:px-0"
          >
            Health isn't built in hospitals.<br />
            It's built in communities.
          </h1>

          {/* Cards Row - Better spacing for tablets */}
          <div className="flex flex-col md:flex-row items-center justify-center 
                         gap-6 sm:gap-8 md:gap-6 lg:gap-12 xl:gap-16 
                         w-full px-0 sm:px-4 mt-4 sm:mt-6 lg:mt-6">

            {/* LEFT CARD — Health Shared */}
            <Link href="https://health-shared.com/" target="_blank" className="relative w-full max-w-[280px] sm:max-w-[300px] md:max-w-[280px] lg:max-w-[360px] xl:max-w-[435px] flex flex-col items-center flex-shrink-0">
              <div
                className="relative flex items-start justify-center transition-transform duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer
                           w-[280px] h-[256px] 
                           sm:w-[300px] sm:h-[274px] 
                           md:w-[280px] md:h-[256px]
                           lg:w-[360px] lg:h-[329px]
                           xl:w-[435px] xl:h-[398px]"
              >
                {/* Folder Background */}
                <div
                  className="absolute inset-0 bg-center bg-no-repeat bg-contain"
                  style={{
                    backgroundImage: 'url(/landingPage/hero-folder-icon.webp)',
                  }}
                />

                {/* Logo */}
                <div className="absolute z-20 
                               top-[19px] sm:top-[20px] md:top-[19px] lg:top-[24px] xl:top-[30px] 
                               left-1/2 -translate-x-[81%]
                               w-[164px] h-[94px] 
                               sm:w-[175px] sm:h-[100px] 
                               md:w-[164px] md:h-[94px]
                               lg:w-[211px] lg:h-[121px]
                               xl:w-[256px] xl:h-[146px]">
                  <Image
                    src="/landingPage/logo_HS.webp"
                    alt="Health Shared"
                    fill
                    className="object-contain drop-shadow-lg"
                    priority
                  />
                </div>

                {/* Description Text */}
                <div className="absolute z-10 bottom-0 flex flex-col items-center justify-end 
                               px-6 sm:px-6 md:px-5 lg:px-7 xl:px-8 
                               pb-7 sm:pb-7 md:pb-7 lg:pb-8 xl:pb-10 
                               text-center w-full">
                  <p className="font-roboto font-light text-[#E5E5E5] leading-[103%] 
                               max-w-[192px] sm:max-w-[206px] md:max-w-[192px] lg:max-w-[247px] xl:max-w-[300px]
                               text-[16px] sm:text-[17px] md:text-[16px] lg:text-[21px] xl:text-[25px]
                               -translate-x-[4%] -translate-y-[40%]">
                    Empowering communities using AI to ensure every voice is heard - building human capital.
                  </p>
                  <p className="font-roboto font-light text-[#E1767D] underline leading-[103%] 
                               max-w-[192px] sm:max-w-[206px] md:max-w-[192px] lg:max-w-[247px] xl:max-w-[300px]
                               text-[16px] sm:text-[17px] md:text-[16px] lg:text-[21px] xl:text-[25px]
                               -translate-x-[4%] -translate-y-[40%]">
                    Enter
                  </p>
                </div>
              </div>
            </Link>

            {/* CHAIN ICON - Smaller on tablets */}
            <div className="flex items-center justify-center my-2 md:my-0 md:mt-[80px] lg:mt-[130px] xl:mt-[160px] flex-shrink-0">
              <div className="relative 
                             w-[90px] h-[90px] 
                             sm:w-[100px] sm:h-[100px] 
                             md:w-[100px] md:h-[100px]
                             lg:w-[130px] lg:h-[130px]
                             xl:w-[186px] xl:h-[186px]
                             translate-y-0 md:-translate-y-[25px] lg:-translate-y-[45px] xl:-translate-y-[65px]">
                <Image
                  src="/landingPage/chain.webp"
                  alt="Connection"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>

            {/* RIGHT CARD — Health Protocol */}
            <Link href="/health-protocol-page" className="relative w-full max-w-[280px] sm:max-w-[300px] md:max-w-[280px] lg:max-w-[360px] xl:max-w-[435px] flex flex-col items-center flex-shrink-0">
              <div
                className="relative flex items-start justify-center transition-transform duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer
                           w-[280px] h-[256px] 
                           sm:w-[300px] sm:h-[274px] 
                           md:w-[280px] md:h-[256px]
                           lg:w-[360px] lg:h-[329px]
                           xl:w-[435px] xl:h-[398px]"
              >
                {/* Folder Background */}
                <div
                  className="absolute inset-0 bg-center bg-no-repeat bg-contain"
                  style={{
                    backgroundImage: 'url(/landingPage/hero-folder-icon.webp)',
                  }}
                />

                {/* Logo */}
                <div className="absolute z-20 
                               top-[15px] sm:top-[16px] md:top-[15px] lg:top-[19px] xl:top-[23px] 
                               left-[48%] -translate-x-[81%]
                               w-[147px] h-[80px] 
                               sm:w-[157px] sm:h-[85px] 
                               md:w-[147px] md:h-[80px]
                               lg:w-[189px] lg:h-[102px]
                               xl:w-[229px] xl:h-[124px]">
                  <Image
                    src="/landingPage/logo_HP.webp"
                    alt="Health Protocol"
                    fill
                    className="object-contain drop-shadow-lg"
                    priority
                  />
                </div>

                {/* Description Text */}
                <div className="absolute z-10 bottom-0 flex flex-col items-center justify-end 
                               px-6 sm:px-6 md:px-5 lg:px-7 xl:px-8 
                               pb-7 sm:pb-7 md:pb-7 lg:pb-8 xl:pb-10 
                               text-center w-full">
                  <p className="font-roboto font-light text-[#E5E5E5] leading-[103%] 
                               max-w-[212px] sm:max-w-[227px] md:max-w-[212px] lg:max-w-[272px] xl:max-w-[330px]
                               text-[16px] sm:text-[17px] md:text-[16px] lg:text-[21px] xl:text-[25px]
                               -translate-x-[2%] -translate-y-[88%]">
                    Coordinating stakeholders and facilitating value transfer to aligned communities.
                  </p>
                  <p className="font-roboto font-light text-[#00D7E9] underline leading-[103%] 
                               max-w-[192px] sm:max-w-[206px] md:max-w-[192px] lg:max-w-[247px] xl:max-w-[300px]
                               text-[16px] sm:text-[17px] md:text-[16px] lg:text-[21px] xl:text-[25px]
                               -translate-x-[4%] -translate-y-[40%]">
                    Enter
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* BUTTONS */}
          <div className="relative z-50 flex flex-col sm:flex-row justify-center items-center 
                         pt-4 sm:pt-6 lg:pt-4 
                         gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12">
            <Link href="https://discord.com/invite/nMqmSJSCzZ" target="_blank">
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