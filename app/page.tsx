
"use client"

import { FloatingNavigation } from "@/components/floating-navigation";
import { Footer } from "@/components/Footer";
import { useEffect, useRef } from "react";
import { ConnectWallet } from "@thirdweb-dev/react";

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
//   {
//     key: "flywheel",
//     emoji: "🔁",
//     title: "The Flywheel",
//     text: `(The More We Collaborate, the More We All Win)
// Every early action spins the flywheel faster.
// Community participation drives better scorecards
// Better scorecards attract more funding
// More funding fuels better incentives
// Better incentives grow more communities
// And on and on it goes.
// 🚀 Flywheel up. Friction down. Let's go.`,
//   },
//   {
//     key: "join",
//     emoji: "🫱🏽‍🫲🏾",
//     title: "Join the Movement",
//     text: `Whether you're a citizen, a clinician, a researcher, a policymaker, or an investor—this system is built for you. Stake your claim in the future of health.`,
//   },
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
  <section id="hero" className="w-full max-w-7xl min-h-[320px] relative flex flex-col justify-center items-center overflow-hidden rounded-3xl shadow-xl animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <div className="absolute inset-0 z-0" style={{background: 'radial-gradient(circle at 30% 40%, #E3F6FF 60%, transparent 80%), radial-gradient(circle at 80% 60%, #A06A8C 40%, transparent 80%), linear-gradient(120deg, #F6F2D4 60%, #E3F6FF 40%)'}} />
          <div className="relative z-10 p-12 flex flex-col items-center w-full">
            <h1 className="text-5xl md:text-6xl font-extrabold text-center tracking-tight mb-8 text-[#233B54] drop-shadow-lg">Health isn&apos;t built in hospitals.<br />It&apos;s built in communities.</h1>
            <div className="flex flex-col gap-6 w-full max-w-2xl">
              <div className="flex flex-col md:flex-row items-center gap-6 w-full justify-center">
                {/* Health Shared Logo with glow and background */}
                <span className="relative flex items-center justify-center">
                  <span className="absolute inset-0 rounded-full bg-white opacity-10" style={{filter: 'blur(2px)'}}></span>
                  <img src="/hslogo.png" alt="Health Shared Logo" className="w-20 h-20 md:w-32 md:h-32 object-contain rounded-full shadow-[0_0_24px_6px_#6DD6F2]" style={{zIndex:1}} />
                </span>
                {/* Chain icon: vertical on mobile, horizontal on desktop */}
                <span className="flex items-center justify-center text-5xl md:text-7xl text-[#A06A8C] drop-shadow-lg" aria-label="chain" role="img">
                  <span className="block md:hidden" style={{transform: 'rotate(0deg)'}}>⛓️</span>
                  <span className="hidden md:block" style={{transform: 'rotate(90deg)'}}>⛓️</span>
                </span>
                {/* Health Protocol Logo with glow and background */}
                <span className="relative flex items-center justify-center">
                  <span className="absolute inset-0 rounded-full bg-white opacity-10" style={{filter: 'blur(2px)'}}></span>
                  <img src="/hplogo.png" alt="Health Protocol Logo" className="w-20 h-20 md:w-32 md:h-32 object-contain rounded-full shadow-[0_0_24px_6px_#A06A8C]" style={{zIndex:1}} />
                </span>
              </div>
              <div className="flex flex-col md:flex-row gap-6 w-full justify-center">
                <p className="text-xl md:text-2xl font-semibold text-[#233B54] md:text-right md:w-1/2">Empowering communities using AI to ensure every voice is heard - building human capital.</p>
                <p className="text-xl md:text-2xl font-semibold text-[#233B54] md:text-left md:w-1/2">Coordinating stakeholders and facilitating value transfer to aligned communities.</p>
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <a
                href="https://discord.com/invite/drUNgZEFZw"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#5865F2] text-white font-semibold shadow hover:bg-[#4752C4] transition"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="12" fill="#5865F2"/><path d="M16.5 8.5C15.7 8.1 14.9 7.8 14.1 7.6C14 7.8 13.9 8 13.8 8.2C12.7 8.1 11.3 8.1 10.2 8.2C10.1 8 10 7.8 9.9 7.6C9.1 7.8 8.3 8.1 7.5 8.5C5.7 11.1 5.2 13.6 5.3 16.1C6.5 17.1 7.8 17.7 9.1 18.1C9.3 17.8 9.5 17.5 9.7 17.2C10.3 17.3 11 17.4 11.7 17.4C12.4 17.4 13.1 17.3 13.7 17.2C13.9 17.5 14.1 17.8 14.3 18.1C15.6 17.7 16.9 17.1 18.1 16.1C18.2 13.6 17.7 11.1 16.5 8.5ZM9.8 15.2C9.3 15.2 8.9 14.8 8.9 14.3C8.9 13.8 9.3 13.4 9.8 13.4C10.3 13.4 10.7 13.8 10.7 14.3C10.7 14.8 10.3 15.2 9.8 15.2ZM14.2 15.2C13.7 15.2 13.3 14.8 13.3 14.3C13.3 13.8 13.7 13.4 14.2 13.4C14.7 13.4 15.1 13.8 15.1 14.3C15.1 14.8 14.7 15.2 14.2 15.2Z" fill="white"/></svg>
                Discord
              </a>
              <ConnectWallet />
            </div>
          </div>
        </section>

  {/* 33 and 55 Images Section with Patterned Background, reduced width and vertical on mobile */}
  <section id="game-theory" className="w-full max-w-5xl mx-auto flex justify-center items-center my-12 py-12 relative rounded-3xl shadow-xl" style={{background: 'repeating-linear-gradient(135deg, #F6F2D4 0px, #F6F2D4 40px, #A06A8C 40px, #A06A8C 80px)'}}>
          {/* Decorative pattern overlay */}
          <div className="absolute inset-0 pointer-events-none z-0" style={{background: 'radial-gradient(circle at 20% 40%, #6DD6F2 10%, transparent 60%), radial-gradient(circle at 80% 60%, #F6A23A 10%, transparent 60%)', opacity: 0.15}}></div>
          <div className="relative z-10 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-20 w-full">
            <img src="/33.png" alt="3,3 Game Theory" className="w-72 h-auto md:w-96 rounded-3xl shadow-2xl border-8 border-[#A06A8C] bg-white" />
            <img src="/55.png" alt="5,5 Game Theory" className="w-72 h-auto md:w-96 rounded-3xl shadow-2xl border-8 border-[#6DD6F2] bg-white" />
          </div>
        </section>

                {/* Video Section */}
  <section id="video" className="w-full max-w-7xl rounded-3xl shadow-xl p-10 flex flex-col items-center animate-fade-in-up" style={{animationDelay: '0.15s', background: '#F6F2D4', minHeight: '520px'}}>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-[#233B54]">Better health through decentralised communities</h2>
          <div className="w-full flex justify-center">
            <div className="w-full max-w-5xl" style={{height: '32vw', maxHeight: '420px'}}>
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/g2rHFXfc9Og"
                title="Health Protocol"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-xl shadow-lg"
                style={{height: '100%', minHeight: '320px'}}
              ></iframe>
            </div>
          </div>
        </section>
  {/* Block 2: Flywheel CTA - wide navy bar, pure white text, strong shadow, forced color */}
  <section id="flywheel" className="w-full max-w-5xl rounded-[2.5rem] shadow-xl p-10 flex flex-col items-center animate-fade-in-up" style={{animationDelay: '0.3s', background: '#233B54'}}>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8 flex items-center gap-3" style={{color: '#fff', textShadow: '0 2px 8px #000, 0 1px 0 #233B54'}}>
            <span role="img" aria-label="repeat" className="text-4xl">🔁</span> The Flywheel
          </h2>
          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8 mb-6">
            {/* Stepper Diagram */}
            <div className="flex flex-col md:flex-row items-center gap-6 w-full justify-center">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="bg-[#6DD6F2] rounded-full w-16 h-16 flex items-center justify-center mb-2 shadow-lg">
                  <span className="text-3xl">🤝</span>
                </div>
                <div className="text-white font-bold mb-1">Community Participation</div>
                <div className="text-gray-200 text-sm">Early actions spin the flywheel faster</div>
              </div>
              {/* Arrow */}
              <div className="hidden md:block text-3xl text-[#F6A23A]">→</div>
              {/* Step 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="bg-[#A06A8C] rounded-full w-16 h-16 flex items-center justify-center mb-2 shadow-lg">
                  <span className="text-3xl">📊</span>
                </div>
                <div className="text-white font-bold mb-1">Better Scorecards</div>
                <div className="text-gray-200 text-sm">Collaboration drives measurable results</div>
              </div>
              <div className="hidden md:block text-3xl text-[#F6A23A]">→</div>
              {/* Step 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="bg-[#F6A23A] rounded-full w-16 h-16 flex items-center justify-center mb-2 shadow-lg">
                  <span className="text-3xl">💸</span>
                </div>
                <div className="text-white font-bold mb-1">More Funding</div>
                <div className="text-gray-200 text-sm">Scorecards attract support</div>
              </div>
              <div className="hidden md:block text-3xl text-[#F6A23A]">→</div>
              {/* Step 4 */}
              <div className="flex flex-col items-center text-center">
                <div className="bg-[#233B54] border-2 border-[#6DD6F2] rounded-full w-16 h-16 flex items-center justify-center mb-2 shadow-lg">
                  <span className="text-3xl">🎁</span>
                </div>
                <div className="text-white font-bold mb-1">Better Incentives</div>
                <div className="text-gray-200 text-sm">Funding fuels rewards</div>
              </div>
              <div className="hidden md:block text-3xl text-[#F6A23A]">→</div>
              {/* Step 5 */}
              <div className="flex flex-col items-center text-center">
                <div className="bg-[#6DD6F2] rounded-full w-16 h-16 flex items-center justify-center mb-2 shadow-lg">
                  <span className="text-3xl">🌱</span>
                </div>
                <div className="text-white font-bold mb-1">Community Growth</div>
                <div className="text-gray-200 text-sm">Incentives grow more communities</div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-center mt-2">
            <div className="text-lg md:text-xl text-center font-semibold text-white mb-2">The More We Collaborate, the More We All Win</div>
            <div className="flex items-center gap-2 text-white text-xl font-bold">
              <span role="img" aria-label="rocket">🚀</span>
              Flywheel up. Friction down. Let's go.
            </div>
          </div>
        </section>

        {/* NEW SECTION: Nested Games Result in Win-Win */}
  <section id="nested-games" className="w-full max-w-6xl rounded-[2.5rem] shadow-xl p-10 flex flex-col items-start animate-fade-in-up" style={{animationDelay: '0.4s', background: 'linear-gradient(120deg, #F6F2D4 70%, #F6A23A 30%)'}}>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-[#233B54]">Nested Games Result in Win-Win</h2>
          <div className="flex flex-col md:flex-row gap-8 w-full">
            {/* Health Communities (3,3) */}
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2 text-[#A63A2B]">Health Communities (3,3)</h3>
              <div className="mb-2 text-[#233B54] font-medium">Payoff Matrix: <span className="font-normal">(Your Payoff, Community Payoff)</span></div>
              <div className="overflow-x-auto">
                <table className="min-w-[320px] border border-[#A06A8C] text-sm mb-2">
                  <thead className="bg-[#A06A8C] text-white">
                    <tr>
                      <th className="p-2">&nbsp;</th>
                      <th className="p-2">Community Early (E)</th>
                      <th className="p-2">Community Late (L)</th>
                      <th className="p-2">Community Defect (D)</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white text-[#233B54]">
                    <tr>
                      <td className="p-2 font-bold">You Early (E)</td>
                      <td className="p-2">(3, 3)</td>
                      <td className="p-2">(4, 2)</td>
                      <td className="p-2">(5, -1)</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold">You Late (L)</td>
                      <td className="p-2">(2, 4)</td>
                      <td className="p-2">(2, 2)</td>
                      <td className="p-2">(3, -1)</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold">You Defect (D)</td>
                      <td className="p-2">(0, 2)</td>
                      <td className="p-2">(1, 1)</td>
                      <td className="p-2">(-2, -2)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <ul className="list-disc pl-5 text-[#233B54] text-sm mb-4">
                <li>Smart contract Dutch auction ensure early community member co-operation – growing human capital (activation and data availability).</li>
                <li>Growth in human capital results in more inbound value from donor stakeholders like pharma resulting in greater incentives for even more community growth.</li>
                <li>Members amenable to sharing their data for rewards.</li>
              </ul>
            </div>
            {/* Donor Stakeholder/LP (5,5) */}
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2 text-[#A63A2B]">Donor Stakeholder and Liquidity Providers (5,5)</h3>
              <div className="mb-2 text-[#233B54] font-medium">Payoff Matrix: <span className="font-normal">(Your Payoff, Ecosystem Payoff)</span></div>
              <div className="overflow-x-auto">
                <table className="min-w-[320px] border border-[#A06A8C] text-sm mb-2">
                  <thead className="bg-[#A06A8C] text-white">
                    <tr>
                      <th className="p-2">&nbsp;</th>
                      <th className="p-2">Others Early (E)</th>
                      <th className="p-2">Others Late (L)</th>
                      <th className="p-2">Others Defect (D)</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white text-[#233B54]">
                    <tr>
                      <td className="p-2 font-bold">You Early (E)</td>
                      <td className="p-2">(5, 5)</td>
                      <td className="p-2">(6, 3)</td>
                      <td className="p-2">(7, -1)</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold">You Late (L)</td>
                      <td className="p-2">(3, 6)</td>
                      <td className="p-2">(3, 3)</td>
                      <td className="p-2">(4, -1)</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold">You Defect (D)</td>
                      <td className="p-2">(0, 4)</td>
                      <td className="p-2">(1, 1)</td>
                      <td className="p-2">(-2, -2)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <ul className="list-disc pl-5 text-[#233B54] text-sm mb-4">
                <li>Early staking gains yield and entry-price advantage.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Litepaper Headline Section */}
  <section id="litepaper" className="w-full max-w-4xl mx-auto rounded-2xl shadow-xl p-8 flex flex-col items-center animate-fade-in-up" style={{animationDelay: '1.1s', background: '#233B54', marginBottom: '2rem'}}>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Litepaper</h2>
          <p className="text-base md:text-lg text-center text-gray-200 mb-6">Tokenization of Patient Activation through online Communities of Practice results in a win-win scenario for all stakeholders in population health. The Health-Shared token offers a unique opportunity to establish a decentralised solution with landscape-shaping potential in health.</p>
          <a href="https://healthprotocol.xyz/litepaper" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 rounded-full bg-white text-[#233B54] font-semibold shadow hover:bg-gray-200 transition">Read our Litepaper</a>
        </section>
        {/* Team Section */}
  <section id="team" className="w-full max-w-6xl rounded-[2.5rem] shadow-xl p-10 flex flex-col items-center animate-fade-in-up" style={{animationDelay: '1.2s', background: 'linear-gradient(120deg, #F6F2D4 70%, #A06A8C 30%)'}}>
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#233B54]">Team</h2>
          <div className="flex flex-col gap-8 w-full">
            {/* First row: 4 members */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
              {/* Usman Jaffer */}
              <div className="flex flex-col items-center text-center bg-white rounded-xl shadow p-5">
                <img src="/Team/Health Protocol Image.jpg" alt="Prof Usman Jaffer" className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-[#6DD6F2]" />
                <div className="font-semibold text-base text-[#233B54]">Prof Usman Jaffer</div>
                <div className="text-xs text-gray-500 mb-1">CEO</div>
                <div className="text-xs text-gray-500">Consultant Vascular Surgeon, academic, founder of health-shared.</div>
              </div>
              {/* Carl Dempsey */}
              <div className="flex flex-col items-center text-center bg-white rounded-xl shadow p-5">
                <img src="/Team/Health Protocol.png" alt="Carl Dempsey" className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-[#A06A8C]" />
                <div className="font-semibold text-base text-[#233B54]">Carl Dempsey</div>
                <div className="text-xs text-gray-500 mb-1">Chief Strategy Officer</div>
                <div className="text-xs text-gray-500">20+ years board leadership at J&J, strategic partnerships.</div>
              </div>
              {/* Nikolai Matiushev */}
              <div className="flex flex-col items-center text-center bg-white rounded-xl shadow p-5">
                <img src="/Team/Health Protocol Image (1).jpg" alt="Nikolai Matiushev" className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-[#F6A23A]" />
                <div className="font-semibold text-base text-[#233B54]">Nikolai Matiushev</div>
                <div className="text-xs text-gray-500 mb-1">Chief Technical Officer</div>
                <div className="text-xs text-gray-500">Senior developer, 20+ years, mobile/web/enterprise systems.</div>
              </div>
              {/* Prof Usman Khan */}
              <div className="flex flex-col items-center text-center bg-white rounded-xl shadow p-5">
                <img src="/Team/khan.jpg" alt="Prof Usman Khan" className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-[#6DD6F2]" />
                <div className="font-semibold text-base text-[#233B54]">Prof Usman Khan</div>
                <div className="text-xs text-gray-500 mb-1">Non-exec Director</div>
                <div className="text-xs text-gray-500">Chair of Motor Neuron Disease Association, public health expert.</div>
              </div>
            </div>
            {/* Second row: 3 members */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              {/* Dr Sadie Syed */}
              <div className="flex flex-col items-center text-center bg-white rounded-xl shadow p-5">
                <img src="/Team/Sadie Health Protocol.jpg" alt="Dr Sadie Syed" className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-[#A06A8C]" />
                <div className="font-semibold text-base text-[#233B54]">Dr Sadie Syed</div>
                <div className="text-xs text-gray-500 mb-1">Director of Content</div>
                <div className="text-xs text-gray-500">Consultant Anesthetist, Director of Simulation at Imperial.</div>
              </div>
              {/* Arif Minhas */}
              <div className="flex flex-col items-center text-center bg-white rounded-xl shadow p-5">
                <img src="/Team/Health Protocol Image (2).jpg" alt="Arif Minhas" className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-[#F6A23A]" />
                <div className="font-semibold text-base text-[#233B54]">Arif Minhas</div>
                <div className="text-xs text-gray-500 mb-1">Head, Strategic Partnerships</div>
                <div className="text-xs text-gray-500">20 years in business development, strategic partnerships.</div>
              </div>
              {/* Miss Florence Kashora */}
              <div className="flex flex-col items-center text-center bg-white rounded-xl shadow p-5">
                <img src="/Team/Health Protocol (1).png" alt="Miss Florence Kashora" className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-[#6DD6F2]" />
                <div className="font-semibold text-base text-[#233B54]">Miss Florence Kashora</div>
                <div className="text-xs text-gray-500 mb-1">PhD Researcher</div>
                <div className="text-xs text-gray-500">Doctor in surgical training, PhD in community activation.</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Advisors Section */}
  <section id="advisors" className="w-full max-w-5xl rounded-2xl shadow-xl p-10 flex flex-col items-center animate-fade-in-up" style={{animationDelay: '1.25s', background: 'linear-gradient(120deg, #F6F2D4 70%, #6DD6F2 30%)', marginBottom: '2rem'}}>
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#233B54]">Advisors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
            {/* Professor Nadey Hakim */}
            <div className="flex flex-col items-center text-center bg-white rounded-xl shadow p-5">
              <img src="/Advisors/Nadey.png" alt="Professor Nadey Hakim" className="w-24 h-24 rounded-full object-cover mb-3 border-2 border-[#6DD6F2]" />
              <div className="font-semibold text-base text-[#233B54]">Professor Nadey Hakim</div>
              <div className="text-xs text-gray-500 mb-1">Head of Health KOL Relationships</div>
              <div className="text-xs text-gray-500">World renowned transplant surgeon, past VP of the Royal Society of Medicine, International relations lead at Cleveland Clinic London.</div>
            </div>
            {/* Neil Meltzer */}
            <div className="flex flex-col items-center text-center bg-white rounded-xl shadow p-5">
              <img src="/Advisors/Neil.jpg" alt="Neil Meltzer" className="w-24 h-24 rounded-full object-cover mb-3 border-2 border-[#A06A8C]" />
              <div className="font-semibold text-base text-[#233B54]">Neil Meltzer</div>
              <div className="text-xs text-gray-500 mb-1">President & CEO at LifeBridge Health</div>
              <div className="text-xs text-gray-500">President & CEO at LifeBridge Health since 2013. Former President at Sinai Hospital. Past National Board Chair, American Heart Association.</div>
            </div>
            {/* Sir Richard Sykes */}
            <div className="flex flex-col items-center text-center bg-white rounded-xl shadow p-5">
              <img src="/Advisors/Richard.jpg" alt="Sir Richard Sykes" className="w-24 h-24 rounded-full object-cover mb-3 border-2 border-[#F6A23A]" />
              <div className="font-semibold text-base text-[#233B54]">Sir Richard Sykes</div>
              <div className="text-xs text-gray-500 mb-1">Advisor</div>
              <div className="text-xs text-gray-500">Chairman of The Royal Institution of Great Britain, Imperial College Healthcare NHS Trust, UK Stem Cell Foundation, and more. Fellow of multiple prestigious organizations.</div>
            </div>
            {/* Robert Pleticha */}
            <div className="flex flex-col items-center text-center bg-white rounded-xl shadow p-5">
              <img src="/Advisors/Robert.jpg" alt="Robert Pleticha" className="w-24 h-24 rounded-full object-cover mb-3 border-2 border-[#6DD6F2]" />
              <div className="font-semibold text-base text-[#233B54]">Robert Pleticha</div>
              <div className="text-xs text-gray-500 mb-1">Patient Engagement Specialist</div>
              <div className="text-xs text-gray-500">Patient engagement expert with 10+ years experience, integrating patient perspectives into clinical development for transformative healthcare solutions.</div>
            </div>
          </div>
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
      {/* Roadmap Section */}
  <section id="roadmap" className="w-full max-w-7xl mx-auto rounded-3xl shadow-xl p-0 flex flex-col items-center animate-fade-in-up" style={{animationDelay: '1.3s', background: 'linear-gradient(120deg, #181A1B 80%, #233B54 20%)', marginTop: '2rem', marginBottom: '2rem'}}>
        <div className="w-full flex flex-col items-center py-10">
          {/* <h2 className="text-4xl font-extrabold text-[#FFB300] mb-8 tracking-tight">Roadmap</h2> */}
          <img src="/roadmap.png" alt="Roadmap" className="w-full max-w-5xl rounded-2xl shadow-lg" style={{background: '#181A1B'}} />
        </div>
      </section>
      {/* Custom Footer Layout */}
      <footer className="w-full bg-[#181A1B] text-white pt-12 pb-6 px-4 mt-12 border-t border-[#333]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-0">
          {/* Left: Logo and Social Icons */}
          <div className="flex flex-col items-start gap-8 md:w-1/3">
            <img src="/hplogo.png" alt="Health Protocol Logo" className="w-32 h-auto mb-2" />
            <div className="flex gap-6 mt-2">
              {/* Social icons: keep current SVGs */}
              <a href="https://twitter.com/healthprotocol" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:opacity-80">
                {/* X icon */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M17.53 3H21L14.19 10.59L22.13 21H15.97L10.98 14.37L5.39 21H2L9.17 12.94L1.61 3H7.97L12.54 9.03L17.53 3ZM16.41 19H18.22L7.75 5H5.81L16.41 19Z" fill="white"/></svg>
              </a>
              <a href="https://discord.com/invite/drUNgZEFZw" target="_blank" rel="noopener noreferrer" aria-label="Discord" className="hover:opacity-80">
                {/* Discord icon */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="12" fill="#5865F2"/><path d="M16.5 8.5C15.7 8.1 14.9 7.8 14.1 7.6C14 7.8 13.9 8 13.8 8.2C12.7 8.1 11.3 8.1 10.2 8.2C10.1 8 10 7.8 9.9 7.6C9.1 7.8 8.3 8.1 7.5 8.5C5.7 11.1 5.2 13.6 5.3 16.1C6.5 17.1 7.8 17.7 9.1 18.1C9.3 17.8 9.5 17.5 9.7 17.2C10.3 17.3 11 17.4 11.7 17.4C12.4 17.4 13.1 17.3 13.7 17.2C13.9 17.5 14.1 17.8 14.3 18.1C15.6 17.7 16.9 17.1 18.1 16.1C18.2 13.6 17.7 11.1 16.5 8.5ZM9.8 15.2C9.3 15.2 8.9 14.8 8.9 14.3C8.9 13.8 9.3 13.4 9.8 13.4C10.3 13.4 10.7 13.8 10.7 14.3C10.7 14.8 10.3 15.2 9.8 15.2ZM14.2 15.2C13.7 15.2 13.3 14.8 13.3 14.3C13.3 13.8 13.7 13.4 14.2 13.4C14.7 13.4 15.1 13.8 15.1 14.3C15.1 14.8 14.7 15.2 14.2 15.2Z" fill="white"/></svg>
              </a>
              <a href="https://t.me/healthprotocol" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="hover:opacity-80">
                {/* Telegram icon */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#229ED9"/><path d="M17.5 7.5L15.5 17.5C15.5 17.5 15.2 18.2 14.5 17.9L10.5 14.7L8.5 13.7C8.5 13.7 8 13.5 8 13.1C8 12.7 8.5 12.5 8.5 12.5L16 9.2C16 9.2 16.5 9 16.5 9.4C16.5 9.8 16.1 10 16.1 10L10 13.2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a href="https://github.com/healthprotocol" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:opacity-80">
                {/* GitHub icon */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#181A1B"/><path d="M12 2C6.48 2 2 6.48 2 12C2 16.42 5.17 20.17 9.26 21.5C9.81 21.58 10.02 21.27 10.02 21.01C10.02 20.77 10.01 20.13 10.01 19.39C7 19.91 6.34 17.97 6.34 17.97C5.82 16.65 5.03 16.32 5.03 16.32C3.92 15.57 5.12 15.59 5.12 15.59C6.34 15.68 6.97 16.85 6.97 16.85C8.05 18.62 9.81 18.13 10.46 17.87C10.55 17.09 10.84 16.58 11.16 16.32C8.41 16.06 5.53 15.09 5.53 10.77C5.53 9.54 5.97 8.58 6.68 7.81C6.58 7.55 6.19 6.38 6.78 4.97C6.78 4.97 7.7 4.68 10 6.23C10.88 5.99 11.82 5.87 12.76 5.87C13.7 5.87 14.64 5.99 15.52 6.23C17.82 4.68 18.74 4.97 18.74 4.97C19.33 6.38 18.94 7.55 18.84 7.81C19.55 8.58 19.99 9.54 19.99 10.77C19.99 15.1 17.1 16.06 14.34 16.32C14.76 16.66 15.13 17.32 15.13 18.29C15.13 19.62 15.12 20.68 15.12 21.01C15.12 21.27 15.33 21.59 15.89 21.5C19.98 20.17 23.15 16.42 23.15 12C23.15 6.48 18.52 2 12 2Z" fill="white"/></svg>
              </a>
            </div>
          </div>
          {/* Right: Footer Links */}
          <div className="flex flex-col md:flex-row gap-10 md:gap-20 w-full md:w-2/3 justify-end">
            <div className="flex flex-col gap-2 min-w-[120px]">
              <span className="font-bold text-lg mb-2">Learn</span>
              <a href="/tokenomics" className="hover:underline">Tokenomics</a>
              <a href="https://healthprotocol.xyz/litepaper" target="_blank" rel="noopener noreferrer" className="hover:underline">Litepaper</a>
              <a href="/blog" className="hover:underline">Blog</a>
              <a href="/events" className="hover:underline">Video</a>
            </div>
            <div className="flex flex-col gap-2 min-w-[120px]">
              <span className="font-bold text-lg mb-2">Community Partners</span>
              
            </div>
            <div className="flex flex-col gap-2 min-w-[120px]">
              <span className="font-bold text-lg mb-2">Team</span>
              <a href="/team" className="hover:underline">Advisors</a>
            </div>
          </div>
        </div>
        {/* Bottom Row: Legal and Copyright */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mt-8 pt-6 border-t border-[#333] text-sm text-gray-300 gap-4">
          <div className="flex gap-6">
            <a href="/privacy" className="hover:underline">Privacy Policy</a>
            <a href="/terms" className="hover:underline">Terms of Service</a>
          </div>
          <div className="text-right w-full md:w-auto">© 2025 Health Protocol. All rights reserved.</div>
        </div>
      </footer>
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