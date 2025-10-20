"use client"

import { TopNavigation } from "@/components/top-navigation";
import { HeroSection } from "@/components/hero-section";
import CommunityLiquidity from "@/components/community-liquidity-section";
import { VideoSection } from "@/components/video-section";
import Flywheel from "@/components/flywheel-section";
import NestedGamesSection from "@/components/nested-games-section";
import { LitepaperSection } from "@/components/litepaper_section";
import { TeamSection } from "@/components/team-section";
import { AdvisorsSection } from "@/components/advisors-section";
import { CommunityScorecards } from "@/components/community-scorecards-section";
import { StakeholderFunders } from "@/components/stakeholder-funders-section";
import { HlthToken } from "@/components/hlth-token-section";
import { CommunityReserve } from "@/components/community-reserve";
import { HealthProtocol } from "@/components/health-protocol-section";
import { RoadmapSection } from "@/components/roadmap-section";

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

      <main className="relative z-10 min-h-screen text-gray-900 font-body">
        <div className="flex flex-col gap-16 items-center w-full pt-[63px] pb-20">
          <HeroSection />
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