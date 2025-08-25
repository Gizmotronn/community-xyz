"use client"

import { FloatingNavigation } from "@/components/floating-navigation";
import { Footer } from "@/components/footer";
import { useEffect, useRef } from "react";

const sections = [
  {
    key: "cooperation",
    emoji: "",
    title: "How cooperation becomes capital",
    text: `Health isn't built in hospitals. It's built in communities. Health Protocol and Health-Shared activate real-world people—patients, carers, and everyday citizens—through smart incentives rooted in game theory. Together, we're flipping the system: from extractive to cooperative, from passive to empowered, from data silos to open coordination.
Welcome to the new flywheel of value.`,
  },
  {
    key: "community",
    emoji: "👥",
    title: "Community Members",
    text: `(3,3 Game Theory — Human Capital in Action)
At the centre of this new system are people—your neighbours, friends, family. They join Health-Shared.com Communities and take small, cooperative actions: answering health questions, joining peer groups, commenting and sharing content with others.
Smart contracts reward early participation. The more people engage, the more human capital grows—and the more valuable the ecosystem becomes.
🌀 Early collaboration creates value. Data fuels health.`,
  },
  {
    key: "scorecards",
    emoji: "📊",
    title: "Community Scorecards",
    text: `(Data with Direction)
Every Community DAO generates a living, on-chain scorecard powered by AI agents and secure computation. These scorecards reflect real engagement—quantified and verified—giving shape and direction to the energy of the community.
Funders use these scorecards to identify where need and opportunity align, directing support to where it matters most.
📈 What gets measured, gets funded.`,
  },
  {
    key: "funders",
    emoji: "💸",
    title: "Stakeholder Funders",
    text: `(5,5 Game Theory — Aligned Capital for Health)
Pharma. Public health. Insurers. NGOs. They've always wanted to fund health outcomes, not just services. Now they can.
The 5,5 model rewards these stakeholders for showing up early and aligning with communities. When they coordinate their efforts, the upside multiplies—for them and for everyone in the system.
💥 When stakeholders align early, everyone wins.`,
  },
  {
    key: "token",
    emoji: "⚙️",
    title: "The HLTH Token",
    text: `(Settlement Layer for Health)
HLTH is the currency that moves with health. It powers staking, liquidity, rewards, and DAO operations. It translates participation into value and distributes that value transparently across the ecosystem.
Stake early, earn yield, and power the health economy of tomorrow.
🌐 Currency for a new era of health value transfer.`,
  },
  {
    key: "reserve",
    emoji: "🌱",
    title: "Community Reserve",
    text: `(Sustainable Growth Engine)
Each Community DAO holds its own treasury—seeded by the protocol and replenished through stakeholder value. These reserves offer loans to jumpstart growth and equitably share revenue among members, community founders, and Health Protocol.
🔄 Invest once. Grow forever.`,
  },
  {
    key: "protocol",
    emoji: "🧠",
    title: "The Health Protocol",
    text: `(Infrastructure for Coordinated Health)
Beneath it all is the protocol—a modular smart contract system running on scalable hyperchain infrastructure. It links communities, scorecards, tokens, and funders into a unified health-finance engine.
🔧 Designed for scale. Built for fairness.`,
  },
  {
    key: "flywheel",
    emoji: "🔁",
    title: "The Flywheel",
    text: `(The More We Collaborate, the More We All Win)
Every early action spins the flywheel faster.
Community participation drives better scorecards
Better scorecards attract more funding
More funding fuels better incentives
Better incentives grow more communities
And on and on it goes.
🚀 Flywheel up. Friction down. Let's go.`,
  },
  {
    key: "join",
    emoji: "🫱🏽‍🫲🏾",
    title: "Join the Movement",
    text: `Whether you're a citizen, a clinician, a researcher, a policymaker, or an investor—this system is built for you. Stake your claim in the future of health.`,
  },
];

function useFadeInOnScroll() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.2 }
    );
    refs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, []);
  return refs;
}

export default function HomePage() {
  const refs = useFadeInOnScroll();
  return (
    <main className="min-h-screen bg-white text-gray-900 font-body">
      <FloatingNavigation />
      <div className="flex flex-col gap-16 items-center w-full px-4 pt-12 pb-20">
        {/* Block 1: Hero/Intro - diagonal split, cyan/orange */}
        <section className="w-full max-w-6xl min-h-[340px] relative flex flex-col justify-center items-center overflow-hidden rounded-3xl shadow-xl animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <div className="absolute inset-0 z-0" style={{background: 'linear-gradient(120deg, #6DD6F2 60%, #F6A23A 40%)'}} />
          <div className="relative z-10 p-12 flex flex-col items-center w-full">
            <h1 className="text-5xl md:text-6xl font-extrabold text-center tracking-tight mb-4 text-[#233B54] drop-shadow-lg">Health isn&apos;t built in hospitals.<br />It&apos;s built in communities.</h1>
            <p className="text-xl md:text-2xl text-center mb-2 text-[#A63A2B] font-semibold">Health Protocol and Health-Shared activate real-world people—patients, carers, and everyday citizens—through smart incentives rooted in game theory.</p>
            <p className="text-lg md:text-xl text-center text-[#A06A8C] mb-4">Together, we&apos;re flipping the system: from extractive to cooperative, from passive to empowered, from data silos to open coordination.</p>
            <div className="flex gap-4 mt-4">
              <a
                href="https://discord.gg/healthprotocol"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#5865F2] text-white font-semibold shadow hover:bg-[#4752C4] transition"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="12" fill="#5865F2"/><path d="M16.5 8.5C15.7 8.1 14.9 7.8 14.1 7.6C14 7.8 13.9 8 13.8 8.2C12.7 8.1 11.3 8.1 10.2 8.2C10.1 8 10 7.8 9.9 7.6C9.1 7.8 8.3 8.1 7.5 8.5C5.7 11.1 5.2 13.6 5.3 16.1C6.5 17.1 7.8 17.7 9.1 18.1C9.3 17.8 9.5 17.5 9.7 17.2C10.3 17.3 11 17.4 11.7 17.4C12.4 17.4 13.1 17.3 13.7 17.2C13.9 17.5 14.1 17.8 14.3 18.1C15.6 17.7 16.9 17.1 18.1 16.1C18.2 13.6 17.7 11.1 16.5 8.5ZM9.8 15.2C9.3 15.2 8.9 14.8 8.9 14.3C8.9 13.8 9.3 13.4 9.8 13.4C10.3 13.4 10.7 13.8 10.7 14.3C10.7 14.8 10.3 15.2 9.8 15.2ZM14.2 15.2C13.7 15.2 13.3 14.8 13.3 14.3C13.3 13.8 13.7 13.4 14.2 13.4C14.7 13.4 15.1 13.8 15.1 14.3C15.1 14.8 14.7 15.2 14.2 15.2Z" fill="white"/></svg>
                Discord
              </a>
              <div>{/* ...existing code for wallet-connect-button... */}</div>
            </div>
          </div>
        </section>
        {/* Block 2: Flywheel CTA - wide orange bar */}
        <section className="w-full max-w-5xl rounded-full bg-[#F6A23A] shadow p-6 flex flex-col items-center animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <span className="text-2xl font-bold text-[#233B54] mb-2">Welcome to the new flywheel of value.</span>
        </section>
        {/* Remaining roadmap sections as wide, visually distinct blocks */}
        {sections.slice(2).map((section, idx) => {
          // Use palette and shapes from reference
          const palette = [
            '#A06A8C', // mauve
            '#6DD6F2', // cyan
            '#A63A2B', // rust
            '#F6F2D4', // off-white
            '#F6A23A', // orange
            '#233B54', // navy
          ];
          const bg = palette[idx % palette.length];
          const shape = idx % 3 === 0 ? 'rounded-[3rem]' : idx % 3 === 1 ? 'rounded-xl' : 'rounded-2xl';
          const textColor = idx % 2 === 0 ? 'text-[#233B54]' : 'text-[#A63A2B]';
          return (
            <section
              key={section.key}
              ref={el => {
                refs.current[idx + 2] = el as HTMLDivElement | null;
              }}
              className={`w-full max-w-5xl ${shape} shadow-xl p-10 flex flex-col items-start animate-fade-in-up`}
              style={{ background: `linear-gradient(120deg, ${bg} 70%, #F6F2D4 30%)`, animationDelay: `${(idx + 2) * 0.2 + 0.5}s` }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl md:text-3xl">{section.emoji}</span>
                <h2 className={`font-heading text-2xl md:text-3xl font-bold ${textColor}`}>{section.title}</h2>
              </div>
              <div className="text-lg md:text-xl whitespace-pre-line leading-relaxed text-[#233B54]">
                {section.text}
              </div>
            </section>
          );
        })}
      </div>
      <Footer />
      <style jsx global>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          opacity: 1 !important;
          animation: fade-in-up 1s cubic-bezier(.23,1.01,.32,1) both;
        }
      `}</style>
    </main>
  );
}