"use client"

import { TopNavigation } from "@/components/top-navigation";
import { HeroSection } from "./landing-page/hero-section";
import CommunityLiquidity from "./landing-page/community-liquidity-section";
import VideoSection from "./landing-page/video-section";
import Flywheel from "./landing-page/flywheel-section";
import NestedGamesSection from "./landing-page/nested-games-section";
import { LitepaperSection } from "./landing-page/litepaper/section";
import { TeamSection } from "./landing-page/team-section";
import { AdvisorsSection } from "./landing-page/advisors-section";
import { CommunityScorecards } from "./landing-page/community-scorecards-section";
import { StakeholderFunders } from "./landing-page/stakeholder-funders-section";
import { HlthToken } from "./landing-page/hlth-token-section";
import { CommunityReserve } from "@/components/community-reserve";
import { HealthProtocol } from "./landing-page/health-protocol-section";
import { RoadmapSection } from "./landing-page/roadmap-section";

export default function HomePage() {
  return (
    <>
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;900&family=Noto+Sans:wght@600&family=Bruno+Ace&family=Archivo+Black&display=swap"
        rel="stylesheet"
      />

      {/* Fixed Top Navigation */}
      <TopNavigation />

      {/* Fixed Background */}
      <div
        className="fixed inset-0 z-0 bg-black"
        style={{
          backgroundImage: 'url(/landingPage/background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      <main className="relative z-10 min-h-screen text-gray-900 font-body overflow-x-hidden">
        <div className="flex flex-col gap-12 items-center justify-center w-full max-w-[100vw] pt-[63px] pb-20 overflow-x-hidden">
          <HeroSection/>
          <CommunityLiquidity />
          <VideoSection />
          <Flywheel />
          <NestedGamesSection />
          <LitepaperSection />
          <TeamSection />
          <AdvisorsSection />
          <CommunityScorecards />
          <StakeholderFunders />
          <HlthToken />
          <CommunityReserve />
          <HealthProtocol />
          <RoadmapSection />
        </div>
      </main>
    </>
  );
}