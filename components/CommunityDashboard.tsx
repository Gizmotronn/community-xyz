'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Users,
    TrendingUp,
    DollarSign,
    Activity,
    Award,
    Zap,
    ArrowUpRight,
    ArrowDownRight,
    Target,
    AlertCircle,
    CheckCircle
} from 'lucide-react';
import { useActiveAccount } from "thirdweb/react";
import { ethers } from 'ethers';

// simplified for demo
const COMMUNITY_RESERVE_ABI = [
    "function invest() payable",
    "function getBalance() view returns (uint256)",
    "function totalReserve() view returns (uint256)",
    "function registerCommunity(address community, address onboardingOrg)",
    "function updateCommunityStats(address community, uint256 memberCount, uint256 interviews, uint256 referrals)",
    "function payIncentive(address community, address recipient, uint8 incentiveType)",
    "function batchPayIncentives(address community, address[] recipients, uint8[] incentiveTypes)",
    "function getIncentivePrice(address community, uint8 incentiveType) view returns (uint256)",
    "function getAllIncentivePrices(address community) view returns (uint256[5])",
    "function getCommunityInfo(address community) view returns (address, uint256, uint256, uint256, uint256, bool, uint256)",
    "function getRegisteredCommunities() view returns (address[])"
];

const INCENTIVE_PRICING_ABI = [
    "function getCommunityData(address community) view returns (uint256, uint256, uint256, uint256, uint8, bool, uint256)",
    "function determineCommunityPhase(uint256 members, uint256 interviews, uint256 funds) pure returns (uint8)",
    "function registerCommunity(address community, uint256 initialMembers)"
];

// replace with actual deployed addresses
const COMMUNITY_RESERVE_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const INCENTIVE_PRICING_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

interface CommunityData {
    address: string;
    onboardingOrg: string;
    memberCount: number;
    totalInterviews: number;
    totalReferrals: number;
    totalDistributed: number;
    isRegistered: boolean;
    lastActivity: number;
    phase: string;
    incentivePrices: number[];
}

const IncentiveTypes = {
    0: 'Interview Participation',
    1: 'Friend Referral',
    2: 'Health Data Sharing',
    3: 'Trial Participation',
    4: 'Community Engagement'
};

const CommunityPhases = {
    0: { name: 'Bootstrap', color: 'bg-blue-100 text-blue-800', multiplier: '150%' },
    1: { name: 'Growth', color: 'bg-green-100 text-green-800', multiplier: '120%' },
    2: { name: 'Established', color: 'bg-yellow-100 text-yellow-800', multiplier: '100%' },
    3: { name: 'Scaled', color: 'bg-purple-100 text-purple-800', multiplier: '80%' },
    4: { name: 'Pharma Ready', color: 'bg-red-100 text-red-800', multiplier: '60%' }
};

export default function CommunityDashboard() {
    const account = useActiveAccount();
    const [communities, setCommunities] = useState<CommunityData[]>([]);
    const [reserveBalance, setReserveBalance] = useState<string>('0');
    const [totalReserve, setTotalReserve] = useState<string>('0');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const [investAmount, setInvestAmount] = useState('');
    const [newCommunity, setNewCommunity] = useState('');
    const [newOnboardingOrg, setNewOnboardingOrg] = useState('');
    const [selectedCommunity, setSelectedCommunity] = useState('');
    const [memberCount, setMemberCount] = useState('');
    const [interviews, setInterviews] = useState('');
    const [referrals, setReferrals] = useState('');

    useEffect(() => {
        if (account?.address) {
            loadDashboardData();
        }
    }, [account]);

    const getProvider = () => {
        if (typeof window !== 'undefined' && window.ethereum) {
            return new ethers.BrowserProvider(window.ethereum);
        }
        throw new Error('No wallet connected');
    };

    const getContracts = async () => {
        const provider = getProvider();
        const signer = await provider.getSigner();

        const communityReserve = new ethers.Contract(COMMUNITY_RESERVE_ADDRESS, COMMUNITY_RESERVE_ABI, signer);
        const incentivePricing = new ethers.Contract(INCENTIVE_PRICING_ADDRESS, INCENTIVE_PRICING_ABI, signer);

        return { communityReserve, incentivePricing };
    };

    const loadDashboardData = async () => {
        try {
            setLoading(true);
            const { communityReserve, incentivePricing } = await getContracts();

            // Get reserve data
            const balance = await communityReserve.getBalance();
            const totalRes = await communityReserve.totalReserve();

            setReserveBalance(ethers.formatEther(balance));
            setTotalReserve(ethers.formatEther(totalRes));

            // Get communities
            const communityAddresses = await communityReserve.getRegisteredCommunities();
            const communityData: CommunityData[] = [];

            for (const addr of communityAddresses) {
                try {
                    // Get community info from CommunityReserve
                    const [onboardingOrg, memberCount, totalInterviews, totalReferrals, totalDistributed, isRegistered, lastActivity] =
                        await communityReserve.getCommunityInfo(addr);

                    // Get phase from IncentivePricing
                    const [, , , , phase] = await incentivePricing.getCommunityData(addr);

                    // Get all incentive prices
                    const prices = await communityReserve.getAllIncentivePrices(addr);

                    communityData.push({
                        address: addr,
                        onboardingOrg,
                        memberCount: Number(memberCount),
                        totalInterviews: Number(totalInterviews),
                        totalReferrals: Number(totalReferrals),
                        totalDistributed: Number(ethers.formatEther(totalDistributed)),
                        isRegistered,
                        lastActivity: Number(lastActivity),
                        phase: CommunityPhases[phase as keyof typeof CommunityPhases]?.name || 'Unknown',
                        incentivePrices: prices.map(p => Number(ethers.formatEther(p)))
                    });
                } catch (err) {
                    console.warn(`Failed to load data for community ${addr}:`, err);
                }
            }

            setCommunities(communityData);
        } catch (err) {
            setError(`Failed to load dashboard data: ${err}`);
        } finally {
            setLoading(false);
        }
    };

    const handleInvest = async () => {
        try {
            if (!investAmount || parseFloat(investAmount) <= 0) {
                setError('Please enter a valid investment amount');
                return;
            }

            setLoading(true);
            const { communityReserve } = await getContracts();

            const tx = await communityReserve.invest({
                value: ethers.parseEther(investAmount)
            });

            await tx.wait();
            setSuccess(`Successfully invested ${investAmount} ETH`);
            setInvestAmount('');
            await loadDashboardData();
        } catch (err) {
            setError(`Investment failed: ${err}`);
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterCommunity = async () => {
        try {
            if (!newCommunity || !newOnboardingOrg) {
                setError('Please enter both community and onboarding org addresses');
                return;
            }

            setLoading(true);
            const { communityReserve, incentivePricing } = await getContracts();

            // Register in CommunityReserve
            const tx1 = await communityReserve.registerCommunity(newCommunity, newOnboardingOrg);
            await tx1.wait();

            // Register in IncentivePricing with initial member count
            const tx2 = await incentivePricing.registerCommunity(newCommunity, 10);
            await tx2.wait();

            setSuccess('Community registered successfully');
            setNewCommunity('');
            setNewOnboardingOrg('');
            await loadDashboardData();
        } catch (err) {
            setError(`Community registration failed: ${err}`);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStats = async () => {
        try {
            if (!selectedCommunity || !memberCount || !interviews || !referrals) {
                setError('Please fill all fields');
                return;
            }

            setLoading(true);
            const { communityReserve } = await getContracts();

            const tx = await communityReserve.updateCommunityStats(
                selectedCommunity,
                parseInt(memberCount),
                parseInt(interviews),
                parseInt(referrals)
            );

            await tx.wait();
            setSuccess('Community stats updated successfully');
            await loadDashboardData();
        } catch (err) {
            setError(`Stats update failed: ${err}`);
        } finally {
            setLoading(false);
        }
    };

    const handlePayIncentive = async (communityAddr: string, incentiveType: number) => {
        try {
            if (!account?.address) {
                setError('Please connect your wallet');
                return;
            }

            setLoading(true);
            const { communityReserve } = await getContracts();

            const tx = await communityReserve.payIncentive(
                communityAddr,
                account.address,
                incentiveType
            );

            await tx.wait();
            setSuccess(`Incentive paid successfully!`);
            await loadDashboardData();
        } catch (err) {
            setError(`Incentive payment failed: ${err}`);
        } finally {
            setLoading(false);
        }
    };

    if (!account) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Card className="w-[400px]">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <AlertCircle className="h-5 w-5" />
                            Wallet Required
                        </CardTitle>
                        <CardDescription>
                            Please connect your wallet to access the Community Dashboard
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Community Dashboard</h1>
                    <p className="text-muted-foreground">Manage communities and incentive distribution</p>
                </div>
                <Button onClick={loadDashboardData} disabled={loading}>
                    {loading ? 'Loading...' : 'Refresh'}
                </Button>
            </div>

            {error && (
                <Alert className="border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">{error}</AlertDescription>
                </Alert>
            )}

            {success && (
                <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">{success}</AlertDescription>
                </Alert>
            )}

            {/* Reserve Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Contract Balance</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{parseFloat(reserveBalance).toFixed(4)} ETH</div>
                        <p className="text-xs text-muted-foreground">Available for distribution</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Reserve</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{parseFloat(totalReserve).toFixed(4)} ETH</div>
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

            <Tabs defaultValue="communities" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="communities">Communities</TabsTrigger>
                    <TabsTrigger value="invest">Invest</TabsTrigger>
                    <TabsTrigger value="admin">Admin</TabsTrigger>
                </TabsList>

                <TabsContent value="communities" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {communities.map((community) => (
                            <Card key={community.address} className="relative">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-lg">
                                            {community.address.slice(0, 6)}...{community.address.slice(-4)}
                                        </CardTitle>
                                        <Badge className={CommunityPhases[community.phase as keyof typeof CommunityPhases]?.color || 'bg-gray-100'}>
                                            {community.phase}
                                        </Badge>
                                    </div>
                                    <CardDescription>
                                        Onboarding: {community.onboardingOrg.slice(0, 6)}...{community.onboardingOrg.slice(-4)}
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
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="h-4 w-4 text-yellow-500" />
                                            <span>{community.totalDistributed.toFixed(3)} ETH</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium">Incentive Prices</Label>
                                        <div className="grid grid-cols-1 gap-2 text-xs">
                                            {Object.entries(IncentiveTypes).map(([type, name], index) => (
                                                <div key={type} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                                    <span>{name}</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium">{community.incentivePrices[index]?.toFixed(4) || '0'} ETH</span>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => handlePayIncentive(community.address, parseInt(type))}
                                                            disabled={loading}
                                                        >
                                                            Pay
                                                        </Button>
                                                    </div>
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
                    <Card>
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
                                />
                            </div>
                            <Button onClick={handleInvest} disabled={loading} className="w-full">
                                {loading ? 'Processing...' : 'Invest'}
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="admin" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Register Community</CardTitle>
                                <CardDescription>Add a new community to the system</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="community">Community Address</Label>
                                    <Input
                                        id="community"
                                        value={newCommunity}
                                        onChange={(e) => setNewCommunity(e.target.value)}
                                        placeholder="0x..."
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="onboarding">Onboarding Org Address</Label>
                                    <Input
                                        id="onboarding"
                                        value={newOnboardingOrg}
                                        onChange={(e) => setNewOnboardingOrg(e.target.value)}
                                        placeholder="0x..."
                                    />
                                </div>
                                <Button onClick={handleRegisterCommunity} disabled={loading} className="w-full">
                                    {loading ? 'Registering...' : 'Register Community'}
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Update Community Stats</CardTitle>
                                <CardDescription>Update member count and activity metrics</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="select-community">Community</Label>
                                    <select
                                        id="select-community"
                                        className="w-full p-2 border rounded"
                                        value={selectedCommunity}
                                        onChange={(e) => setSelectedCommunity(e.target.value)}
                                    >
                                        <option value="">Select Community</option>
                                        {communities.map((community) => (
                                            <option key={community.address} value={community.address}>
                                                {community.address.slice(0, 6)}...{community.address.slice(-4)}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    <div>
                                        <Label htmlFor="members">Members</Label>
                                        <Input
                                            id="members"
                                            type="number"
                                            value={memberCount}
                                            onChange={(e) => setMemberCount(e.target.value)}
                                            placeholder="100"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="interviews-input">Interviews</Label>
                                        <Input
                                            id="interviews-input"
                                            type="number"
                                            onChange={(e) => setInterviews(e.target.value)}
                                            placeholder="50"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="referrals-input">Referrals</Label>
                                        <Input
                                            id="referrals-input"
                                            type="number"
                                            value={referrals}
                                            onChange={(e) => setReferrals(e.target.value)}
                                            placeholder="25"
                                        />
                                    </div>
                                </div>
                                <Button onClick={handleUpdateStats} disabled={loading} className="w-full">
                                    {loading ? 'Updating...' : 'Update Stats'}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}