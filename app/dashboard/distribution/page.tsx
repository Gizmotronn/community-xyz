"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"



const initialReserve = 1000000
const initialDistribution = { days: 3, hours: 4, minutes: 12 }
const demoCommunities = [
  { name: "Lung Cancer", members: 1200, interviews: 45, incentives: 4, users: 1200, raised: 120000 },
  { name: "Diabetes", members: 2100, interviews: 38, incentives: 4, users: 2100, raised: 95000 },
  { name: "Arthritis", members: 800, interviews: 22, incentives: 4, users: 800, raised: 60000 },
  { name: "COVID-19", members: 2200, interviews: 55, incentives: 4, users: 2200, raised: 150000 },
  { name: "Other", members: 3000, interviews: 100, incentives: 4, users: 3000, raised: 575000 },
]




const STORAGE_KEY = 'distributionDemoState'

function loadState() {
  if (typeof window !== 'undefined') {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        return JSON.parse(raw)
      } catch {
        return null
      }
    }
  }
  return null
}

function saveState(state: any) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }
}

export default function DistributionPage() {
  const loaded = typeof window !== 'undefined' ? loadState() : null
  const [reserve, setReserve] = useState(loaded?.reserve ?? initialReserve)
  const [lastDistributed, setLastDistributed] = useState<number|null>(loaded?.lastDistributed ?? null)
  const [distribution, setDistribution] = useState(loaded?.distribution ?? initialDistribution)
  const [history, setHistory] = useState<any[]>(loaded?.history ?? [])
  const [communities, setCommunities] = useState(loaded?.communities ?? demoCommunities)

  function handleDistribute() {
    const amount = Math.floor(reserve * 0.1)
    const newReserve = reserve - amount
    setReserve(newReserve)
    setLastDistributed(amount)
    // Simulate updates to communities
  const updatedCommunities = communities.map((c: any) => ({
      ...c,
      members: c.members + Math.floor(Math.random() * 20),
      interviews: c.interviews + Math.floor(Math.random() * 5),
      incentives: c.incentives + Math.floor(Math.random() * 2),
      users: c.users + Math.floor(Math.random() * 15),
      raised: c.raised + Math.floor(amount / communities.length),
    }))
    setCommunities(updatedCommunities)
    // Simulate a transaction hash
    const txHash = '0x' + Math.random().toString(16).slice(2, 10) + Math.random().toString(16).slice(2, 10)
    const newHistory = [
      ...history,
      {
        round: history.length + 1,
        amount,
        txHash,
  communities: updatedCommunities.map((c: any) => ({
          name: c.name,
          members: c.members,
          interviews: c.interviews,
          incentives: c.incentives,
          users: c.users,
          raised: c.raised,
        })),
      },
    ]
    setHistory(newHistory)
    setDistribution({ days: 3, hours: 0, minutes: 0 })
    // Save all state
    saveState({
      reserve: newReserve,
      lastDistributed: amount,
      distribution: { days: 3, hours: 0, minutes: 0 },
      history: newHistory,
      communities: updatedCommunities,
    })
  }

  return (
    <div className="min-h-screen py-8">
      <h2 className="font-heading text-3xl mb-8 gradient-text text-center">Next Fund Distribution</h2>
      <Card className="web3-glow mx-auto max-w-xl">
        <CardHeader>
          <CardTitle>Time Remaining</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold mb-2 text-center">
            {distribution.days}d {distribution.hours}h {distribution.minutes}m
          </div>
          <div className="text-muted-foreground text-center mb-4">
            Funds are distributed to communities based on incentives, interviews, user growth, and more.
          </div>
          <div className="text-center mb-4">
            <button
              className="px-6 py-2 rounded bg-primary text-primary-foreground font-semibold shadow"
              onClick={handleDistribute}
              disabled={reserve <= 0}
            >
              Distribute Next Round (10% of Reserve)
            </button>
          </div>
          <div className="text-center mb-2">
            <span className="font-bold">Current Reserve:</span> ${reserve.toLocaleString()}
          </div>
          {lastDistributed !== null && (
            <div className="text-center mb-2">
              <span className="font-bold">Last Distributed:</span> ${lastDistributed.toLocaleString()}
            </div>
          )}
          {history.length > 0 && (
            <div className="mt-4">
              <span className="font-bold">Distribution History:</span>
              <ul className="list-disc list-inside text-left mx-auto max-w-xs">
                {history.map((h, idx) => (
                  <li key={idx} className="mb-2">
                    <div><span className="font-bold">Round {h.round}:</span> ${h.amount.toLocaleString()}</div>
                    <div><span className="font-bold">Tx Hash:</span> <span className="font-mono">{h.txHash}</span></div>
                    <div className="mt-1">
                      <span className="font-bold">Community Updates:</span>
                      <ul className="ml-4">
                        {h.communities.map((c: any, i: number) => (
                          <li key={i}>
                            <span className="font-bold">{c.name}:</span> Members: {c.members}, Interviews: {c.interviews}, Incentives: {c.incentives}, Users: {c.users}, Raised: ${c.raised.toLocaleString()}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

