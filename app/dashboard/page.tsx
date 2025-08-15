"use client"

import { useActiveAccount, useWalletBalance } from "thirdweb/react"
import { client } from "@/lib/thirdweb"
import { ethereum } from "thirdweb/chains"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Wallet, Activity, Shield, Users } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardPage() {
  const account = useActiveAccount()
  const router = useRouter()

  const { data: balance, isLoading: balanceLoading } = useWalletBalance({
    client,
    chain: ethereum,
    address: account?.address,
  })

  useEffect(() => {
    if (!account) {
      router.push("/")
    }
  }, [account, router])

  if (!account) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-heading mb-4">Wallet Not Connected</h2>
          <p className="text-muted-foreground mb-6">Please connect your wallet to access the dashboard.</p>
          <Link href="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading gradient-text mb-2">Health Protocol Dashboard</h1>
            <p className="text-muted-foreground">Welcome back to your decentralized health hub</p>
          </div>
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Account Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="web3-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wallet Address</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-mono">
                {account.address.slice(0, 6)}...{account.address.slice(-4)}
              </div>
              <p className="text-xs text-muted-foreground">Connected via {account.address}</p>
            </CardContent>
          </Card>

          <Card className="web3-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ETH Balance</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {balanceLoading ? (
                  <div className="animate-pulse bg-muted h-6 w-20 rounded" />
                ) : (
                  `${Number.parseFloat(balance?.displayValue || "0").toFixed(4)} ETH`
                )}
              </div>
              <p className="text-xs text-muted-foreground">Ethereum Mainnet</p>
            </CardContent>
          </Card>

          <Card className="web3-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Health Score</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold gradient-text">95/100</div>
              <p className="text-xs text-muted-foreground">Data integrity verified</p>
            </CardContent>
          </Card>
        </div>

        {/* Health Data Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Health Data Overview
              </CardTitle>
              <CardDescription>Your decentralized health records and metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Medical Records</span>
                <Badge variant="secondary">12 Files</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Lab Results</span>
                <Badge variant="secondary">8 Reports</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Fitness Data</span>
                <Badge variant="secondary">Connected</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Genetic Data</span>
                <Badge variant="outline">Not Connected</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Community Status
              </CardTitle>
              <CardDescription>Your participation in the Health Protocol ecosystem</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Member Since</span>
                <Badge variant="secondary">Today</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Data Contributions</span>
                <Badge variant="secondary">0</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Rewards Earned</span>
                <Badge variant="secondary">0 HP</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Verification Level</span>
                <Badge className="bg-gradient-to-r from-primary to-accent text-white">Bronze</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your health data and protocol participation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent" variant="outline">
                <Shield className="h-6 w-6" />
                <span className="font-semibold">Upload Health Data</span>
                <span className="text-xs text-muted-foreground">Securely store your records</span>
              </Button>
              <Button className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent" variant="outline">
                <Activity className="h-6 w-6" />
                <span className="font-semibold">View Analytics</span>
                <span className="text-xs text-muted-foreground">Analyze your health trends</span>
              </Button>
              <Button className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent" variant="outline">
                <Users className="h-6 w-6" />
                <span className="font-semibold">Join Research</span>
                <span className="text-xs text-muted-foreground">Contribute to studies</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
