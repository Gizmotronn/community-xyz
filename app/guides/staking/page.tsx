"use client"

import { FloatingNavigation } from "@/components/floating-navigation";
import { ConnectWallet } from "@thirdweb-dev/react";

export default function StakingGuidePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-body">
      <FloatingNavigation />
      <div className="flex flex-col items-center w-full px-4 pt-12 pb-20 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-[#233B54] drop-shadow-lg">How to Stake HLTH (Using HLTH/OHM Liquidity)</h1>
        <div className="text-sm text-gray-500 mb-8">Updated July 2025</div>
        <div className="bg-[#F6F2D4] rounded-2xl shadow p-6 mb-8 w-full">
          <h2 className="text-2xl font-bold mb-2 text-[#A06A8C]">Quick Guide</h2>
          <ul className="list-disc pl-5 text-base text-[#233B54] mb-2">
            <li>✅ Stake HLTH/OHM LP tokens</li>
            <li>🔁 Earn auto-compounding HLTH rewards</li>
            <li>🌱 Support health-shared communities through liquidity</li>
            <li>🔒 Unstake anytime—but long-term staking maximizes impact and returns</li>
          </ul>
        </div>
        <section className="mb-8 w-full">
          <h2 className="text-xl font-bold mb-2 text-[#A06A8C]">What Is HLTH Staking?</h2>
          <p className="mb-4">Staking HLTH is your way to earn yield by providing liquidity to the HLTH/OHM trading pair on a decentralized exchange (DEX), then staking the LP tokens on the Health Protocol staking dashboard. In return, you earn HLTH rewards, compounded each epoch.<br />This system supports the liquidity of the HLTH token while rewarding participants for locking their liquidity and participating in the growth of health-shared communities.</p>
          <h2 className="text-xl font-bold mb-2 text-[#A06A8C]">What Is HLTH?</h2>
          <p className="mb-4">HLTH is the utility and governance token of the Health Protocol, which powers decentralized health incentives. HLTH aligns funders (e.g. governments, public health, pharma) with communities via outcome-based staking. It allows token holders to support health outcomes, governance, and on-chain funding flows.</p>
          <h2 className="text-xl font-bold mb-2 text-[#A06A8C]">How Does HLTH/OHM Staking Work?</h2>
          <p className="mb-4">Health Protocol uses a dual-token model where staking is done via the HLTH/OHM liquidity pool. This creates deep liquidity for both assets and allows HLTH rewards to be distributed to stakers proportionally.<br />When you stake your LP tokens:</p>
          <ul className="list-disc pl-5 mb-4">
            <li>You receive sHLTHLP (staked HLTH/OHM LP) tokens</li>
            <li>Your balance grows automatically every 8 hours (one epoch)</li>
            <li>You earn based on your share of the pool, auto-compounded</li>
            <li>Your contribution supports real-world health ecosystem funding</li>
          </ul>
        </section>
        <section className="mb-8 w-full">
          <h2 className="text-xl font-bold mb-2 text-[#A06A8C]">Step-by-Step: How to Stake HLTH</h2>
          <div className="mb-4">
            <strong>✅ Step 1: Acquire HLTH and OHM</strong>
            <ul className="list-disc pl-5">
              <li>Purchase HLTH and OHM on supported decentralized exchanges (DEXs), such as Uniswap, SushiSwap, Matcha</li>
              <li>Make sure you have equal value of both tokens to add to the HLTH/OHM pool.</li>
            </ul>
          </div>
          <div className="mb-4">
            <strong>✅ Step 2: Provide Liquidity</strong>
            <ul className="list-disc pl-5">
              <li>Go to the HLTH/OHM pool on your preferred DEX</li>
              <li>Select “Add Liquidity”</li>
              <li>Input equal values of HLTH and OHM</li>
              <li>Approve and confirm the transaction</li>
              <li>Receive HLTH/OHM LP tokens in your wallet</li>
            </ul>
          </div>
          <div className="mb-4">
            <strong>✅ Step 3: Stake LP Tokens on Health Protocol</strong>
            <ul className="list-disc pl-5">
              <li>Visit the Health Protocol Staking Dashboard</li>
              <li>Connect your wallet (e.g. MetaMask, Coinbase Wallet, WalletConnect)</li>
              <li>Select the HLTH/OHM LP staking option</li>
              <li>Enter the amount to stake or click “Max”</li>
              <li>Click “Approve” and sign the transaction</li>
              <li>Click “Stake” and confirm</li>
              <li>Your LP tokens are now staked! You will begin earning HLTH rewards immediately.</li>
            </ul>
          </div>
          <div className="mb-4">
            <strong>⛔️ How to Unstake</strong>
            <ul className="list-disc pl-5">
              <li>Go to the same staking page</li>
              <li>Click the “Unstake” tab</li>
              <li>Enter the amount of staked LP tokens to remove</li>
              <li>Click “Unstake” and approve the transaction</li>
              <li>Your original LP tokens will return to your wallet</li>
              <li>Withdraw liquidity from the DEX if you want HLTH and OHM back separately</li>
              <li>Note: Unstaking does not immediately remove rewards—you keep all accrued HLTH unless you exit before a full epoch completes.</li>
            </ul>
          </div>
        </section>
        <section className="mb-8 w-full">
          <h2 className="text-xl font-bold mb-2 text-[#A06A8C]">Tracking Your Rewards</h2>
          <ul className="list-disc pl-5 mb-4">
            <li>APY – Annualized % yield including compounding</li>
            <li>TVL – Total value locked in the HLTH/OHM LP staking pool</li>
            <li>Next Rebase – Time until next auto-compounding reward</li>
            <li>Your Balance – Unstaked LP tokens in your wallet</li>
            <li>Your Staked Balance – LP tokens currently earning HLTH</li>
            <li>Reward Yield – % increase at next rebase</li>
            <li>ROI (5-Day) – Projected returns over 5 days if current yield continues</li>
          </ul>
        </section>
        <section className="mb-8 w-full">
          <h2 className="text-xl font-bold mb-2 text-[#A06A8C]">Why Stake HLTH?</h2>
          <ul className="list-disc pl-5 mb-4">
            <li>✅ Earn high APY on HLTH/OHM LP tokens</li>
            <li>✅ Support real-world impact by funding community health outcomes</li>
            <li>✅ Get early exposure to the Health Protocol economy</li>
            <li>✅ Governance rights to shape protocol direction via DAO</li>
          </ul>
        </section>
        <section className="mb-8 w-full">
          <h2 className="text-xl font-bold mb-2 text-[#A06A8C]">FAQs</h2>
          <div className="mb-2"><strong>Can I stake only HLTH?</strong><br />Not yet. Currently, staking requires HLTH/OHM LP tokens to promote liquidity and ecosystem health.</div>
          <div className="mb-2"><strong>What chain is staking on?</strong><br />Staking is live on Ethereum and zkSync, with Arbitrum deployment coming soon.</div>
          <div className="mb-2"><strong>Is there a lock-up period?</strong><br />No. You can unstake anytime, but longer staking gives compounding rewards and increases your influence in Health DAO governance.</div>
        </section>
        <section className="mb-8 w-full">
          <h2 className="text-xl font-bold mb-2 text-[#A06A8C]">Conclusion</h2>
          <p className="mb-4">Staking HLTH through the HLTH/OHM liquidity pair is more than just earning yield—it's investing in the future of decentralized health. By staking, you're helping shape a global health ecosystem where community well-being is rewarded through tokenized coordination.</p>
          <a href="#" className="inline-block px-6 py-3 rounded-full bg-[#A06A8C] text-white font-semibold shadow hover:bg-[#6DD6F2] transition">🔗 Stake HLTH/OHM Now</a>
        </section>
      </div>
    </main>
  );
}
