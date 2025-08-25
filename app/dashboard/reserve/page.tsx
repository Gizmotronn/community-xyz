
"use client"
import { useState } from "react"
import { addTransaction, getTransactions } from "../components/transaction-storage"
function MetamaskMimic({ onConfirm, onCancel, amount, community }: { onConfirm: () => void, onCancel: () => void, amount: number, community: string }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
        <h3 className="font-heading text-xl mb-4">Simulate Metamask</h3>
        <div className="mb-4">Sign transaction to invest <span className="font-bold">${amount.toLocaleString()}</span> in <span className="font-bold">{community}</span>?</div>
        <div className="flex gap-4 justify-center">
          <button className="px-4 py-2 rounded bg-primary text-primary-foreground font-semibold" onClick={onConfirm}>Sign</button>
          <button className="px-4 py-2 rounded bg-secondary text-secondary-foreground font-semibold" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChartComponent } from "@/components/ui/pie-chart"

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

function generateContributors() {
  return Array.from({ length: 5 }, (_, i) => ({
    address: '0x' + Math.random().toString(16).slice(2, 10) + Math.random().toString(16).slice(2, 10),
    payout: Math.floor(Math.random() * 5000 + 1000),
  }))
}


export default function ReservePage() {
  const loaded = typeof window !== 'undefined' ? loadState() : null
  const [reserve, setReserve] = useState(loaded?.reserve ?? 1000000)
  const [communities, setCommunities] = useState<any[]>(loaded?.communities ?? [
    { name: "Lung Cancer", raised: 120000 },
    { name: "Diabetes", raised: 95000 },
    { name: "Arthritis", raised: 60000 },
    { name: "COVID-19", raised: 150000 },
    { name: "Other", raised: 575000 },
  ])
  const [userInvested, setUserInvested] = useState(loaded?.userInvested ?? 25000)
  const [selected, setSelected] = useState<number|null>(null)
  const [showInvest, setShowInvest] = useState<{ idx: number, amount: number }|null>(null)

  function handleInvest(idx: number, amount: number) {
    setShowInvest({ idx, amount })
  }

  function confirmInvest() {
    if (showInvest) {
      // Update community raised
      const updatedCommunities = communities.map((c: any, i: number) =>
        i === showInvest.idx ? { ...c, raised: c.raised + showInvest.amount } : c
      )
      setCommunities(updatedCommunities)
      // Update reserve
      setReserve(reserve + showInvest.amount)
      // Update user invested
      setUserInvested(userInvested + showInvest.amount)
      // Save to localStorage
      if (typeof window !== 'undefined') {
        const loaded = loadState() || {}
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
          ...loaded,
          reserve: reserve + showInvest.amount,
          communities: updatedCommunities,
          userInvested: userInvested + showInvest.amount,
        }))
      }
      // Add transaction
      addTransaction({
        id: getTransactions().length + 1,
        type: "Invest",
        group: communities[showInvest.idx].name,
        amount: showInvest.amount,
        date: new Date().toISOString().slice(0,10),
        info: `User invested in ${communities[showInvest.idx].name} community`,
      })
      setShowInvest(null)
    }
  }

  return (
    <div className="min-h-screen py-8">
      <h2 className="font-heading text-3xl mb-8 gradient-text text-center">Community Reserve & Investments</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="web3-glow">
          <CardHeader>
            <CardTitle>Total Reserve</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2">${reserve.toLocaleString()}</div>
            <PieChartComponent data={communities.map((g: any) => ({ label: g.name, value: g.raised }))} />
            <div className="mt-4 grid grid-cols-1 gap-2">
              {communities.map((g: any, idx: number) => (
                <div key={g.name} className="flex gap-2 items-center">
                  <button
                    className="w-full px-4 py-2 rounded bg-secondary text-secondary-foreground font-semibold text-left hover:bg-accent"
                    onClick={() => setSelected(idx)}
                  >
                    View {g.name} Details
                  </button>
                  <button
                    className="px-4 py-2 rounded bg-primary text-primary-foreground font-semibold"
                    onClick={() => handleInvest(idx, 5000)}
                  >
                    Invest $5,000
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="web3-glow">
          <CardHeader>
            <CardTitle>Your Investment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2">${userInvested.toLocaleString()}</div>
            <PieChartComponent data={communities.map((g: any) => ({ label: g.name, value: Math.round(g.raised * userInvested / reserve) }))} />
          </CardContent>
        </Card>
      </div>
      {selected !== null && (
        <Card className="web3-glow mt-8 mx-auto max-w-xl">
          <CardHeader>
            <CardTitle>{communities[selected].name} - Top Contributors</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="mb-4">
              {generateContributors().map((c, i) => (
                <li key={c.address} className="flex justify-between items-center py-2 border-b border-border">
                  <span className="font-mono">{c.address}</span>
                  <span className="font-bold">${c.payout.toLocaleString()}</span>
                </li>
              ))}
            </ul>
            <button
              className="px-4 py-2 rounded bg-primary text-primary-foreground font-semibold"
              onClick={() => setSelected(null)}
            >
              Close
            </button>
          </CardContent>
        </Card>
      )}
      {showInvest && (
        <MetamaskMimic
          amount={showInvest.amount}
          community={communities[showInvest.idx].name}
          onConfirm={confirmInvest}
          onCancel={() => setShowInvest(null)}
        />
      )}
    </div>
  )
}

