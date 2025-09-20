"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { useActiveAccount } from "thirdweb/react"
import WalletDebug from '@/components/wallet-debug'

import {
  Users,
  TrendingUp,
  DollarSign,
  Activity,
  Target,
  AlertCircle,
  CheckCircle,
  RefreshCw
} from 'lucide-react'

const COMMUNITY_RESERVE_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

const SIMPLE_ABI = [
  "function getBalance() view returns (uint256)",
  "function totalReserve() view returns (uint256)",
  "function owner() view returns (address)",
  "function invest() payable"
];

interface ContractData {
  balance: string;
  totalReserve: string;
  owner: string;
  isConnected: boolean;
}

interface CommunityData {
  address: string;
  name: string;
  memberCount: number;
  totalInterviews: number;
  totalReferrals: number;
  phase: string;
  incentivePrices: number[];
}

const IncentiveTypes = [
  'Interview Participation',
  'Friend Referral',
  'Health Data Sharing',
  'Trial Participation',
  'Community Engagement'
];

export default function HybridContractPage() {
  const account = useActiveAccount();

  // Debug wallet connection
  useEffect(() => {
    console.log('Account state:', account);
    console.log('Account address:', account?.address);
  }, [account]);

  // State
  const [contractData, setContractData] = useState<ContractData>({
    balance: '6.0', 
    totalReserve: '6.0',
    owner: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    isConnected: false
  });

  const [communities] = useState<CommunityData[]>([
    {
      address: "0x1234567890123456789012345678901234567890",
      name: "Health Community #1",
      memberCount: 50,
      totalInterviews: 20,
      totalReferrals: 10,
      phase: "Growth",
      incentivePrices: [0.015, 0.006, 0.0024, 0.072, 0.0012]
    }
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [investAmount, setInvestAmount] = useState('');
  const [ethersReady, setEthersReady] = useState(false);

  useEffect(() => {
    const checkEthers = () => {
      if (typeof window !== 'undefined' && (window as any).ethers) {
        setEthersReady(true);
        tryConnectContract();
        return true;
      }
      return false;
    };

    if (!checkEthers()) {
      const interval = setInterval(() => {
        if (checkEthers()) {
          clearInterval(interval);
        }
      }, 1000);
      setTimeout(() => clearInterval(interval), 10000);
    }
  }, []);

  const tryConnectContract = async () => {
    if (!ethersReady) return;

    try {
      const provider = new (window as any).ethers.providers.JsonRpcProvider("http://localhost:8545");
      const contract = new (window as any).ethers.Contract(COMMUNITY_RESERVE_ADDRESS, SIMPLE_ABI, provider);

      const balance = await contract.getBalance();
      const totalReserve = await contract.totalReserve();
      const owner = await contract.owner();

      setContractData({
        balance: (window as any).ethers.utils.formatEther(balance),
        totalReserve: (window as any).ethers.utils.formatEther(totalReserve),
        owner,
        isConnected: true
      });

      console.log('Contract connected successfully');
    } catch (err) {
      console.log('Using fallback data (contract not accessible):', err);
    }
  };

  const handleInvest = async () => {
    try {
      if (!investAmount || parseFloat(investAmount) <= 0) {
        setError('Please enter a valid investment amount');
        return;
      }

      if (!account?.address) {
        setError('Please connect your wallet first');
        return;
      }

      if (!ethersReady) {
        setError('Ethers library not ready');
        return;
      }

      setLoading(true);
      setError('');

      const provider = new (window as any).ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new (window as any).ethers.Contract(COMMUNITY_RESERVE_ADDRESS, SIMPLE_ABI, signer);

      const tx = await contract.invest({
        value: (window as any).ethers.utils.parseEther(investAmount)
      });

      await tx.wait();
      setSuccess(`Successfully invested ${investAmount} ETH`);
      setInvestAmount('');

      const newBalance = parseFloat(contractData.balance) + parseFloat(investAmount);
      setContractData(prev => ({
        ...prev,
        balance: newBalance.toFixed(4),
        totalReserve: newBalance.toFixed(4)
      }));

    } catch (err) {
      console.error('Investment error:', err);
      setError(`Investment failed: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      tryConnectContract();
      setLoading(false);
      setSuccess('Data refreshed successfully');
    }, 1000);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-heading text-3xl mb-2 gradient-text">Smart Contract Dashboard</h2>
          <p className="text-muted-foreground">
            {contractData.isConnected ? 'Live contract data' : 'Demo data (contract not accessible)'}
          </p>
        </div>
        <Button onClick={handleRefresh} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Loading...' : 'Refresh'}
        </Button>
      </div>

      {/* Status Alerts */}
      {!ethersReady && (
        <Alert className="border-yellow-200 bg-yellow-50 mb-6">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            Ethers library is loading... Please wait.
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert className="border-red-200 bg-red-50 mb-6">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-200 bg-green-50 mb-6">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="communities">Communities</TabsTrigger>
          <TabsTrigger value="invest">Invest</TabsTrigger>
          <TabsTrigger value="contract">Contract Info</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Contract Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Contract Balance</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {parseFloat(contractData.balance).toFixed(4)} ETH
                </div>
                <p className="text-xs text-muted-foreground">Available for distribution</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Reserve</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {parseFloat(contractData.totalReserve).toFixed(4)} ETH
                </div>
                <p className="text-xs text-muted-foreground">Total invested</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Communities</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{communities.length}</div>
                <p className="text-xs text-muted-foreground">Registered communities</p>
              </CardContent>
            </Card>
          </div>

          {/* Status Card */}
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Ethers Library:</span>
                <Badge variant={ethersReady ? "default" : "secondary"}>
                  {ethersReady ? "Ready" : "Loading"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Contract Connection:</span>
                <Badge variant={contractData.isConnected ? "default" : "secondary"}>
                  {contractData.isConnected ? "Connected" : "Demo Mode"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Wallet:</span>
                <Badge variant={account ? "default" : "secondary"}>
                  {account ? "Connected" : "Not Connected"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communities" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {communities.map((community, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{community.name}</CardTitle>
                    <Badge className="bg-green-100 text-green-800">
                      {community.phase}
                    </Badge>
                  </div>
                  <CardDescription className="font-mono text-sm">
                    {community.address}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      <span>{community.memberCount} members</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-green-500" />
                      <span>{community.totalInterviews} interviews</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-purple-500" />
                      <span>{community.totalReferrals} referrals</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Incentive Prices</Label>
                    <div className="space-y-1">
                      {IncentiveTypes.map((type, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                          <span>{type}</span>
                          <span className="font-medium">
                            {community.incentivePrices[index]?.toFixed(4) || '0'} ETH
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="invest">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Invest in Reserve</CardTitle>
              <CardDescription>
                Add funds to the community reserve for incentive distribution
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="investment">Investment Amount (ETH)</Label>
                <Input
                  id="investment"
                  type="number"
                  step="0.01"
                  value={investAmount}
                  onChange={(e) => setInvestAmount(e.target.value)}
                  placeholder="0.1"
                  disabled={!account || !ethersReady}
                />
              </div>

              <Button
                onClick={handleInvest}
                disabled={loading || !account || !ethersReady}
                className="w-full"
              >
                {loading ? 'Processing...' : 'Invest'}
              </Button>

              {!account && (
                <p className="text-sm text-red-600 text-center">
                  Please connect your wallet to invest
                </p>
              )}

              {!ethersReady && (
                <p className="text-sm text-yellow-600 text-center">
                  Waiting for ethers library to load...
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contract">
          <Card>
            <CardHeader>
              <CardTitle>Contract Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Contract Address</Label>
                <div className="font-mono text-sm bg-gray-100 p-3 rounded mt-1">
                  {COMMUNITY_RESERVE_ADDRESS}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Owner</Label>
                <div className="font-mono text-sm bg-gray-100 p-3 rounded mt-1">
                  {contractData.owner}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Network</Label>
                  <div className="text-sm mt-1">Localhost (Hardhat)</div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Chain ID</Label>
                  <div className="text-sm mt-1">31337</div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Fee Structure</Label>
                <div className="mt-1 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Community Member:</span>
                    <span>40%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Local DAO Reserve:</span>
                    <span>25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Onboarding Org:</span>
                    <span>15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Treasury:</span>
                    <span>20%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
