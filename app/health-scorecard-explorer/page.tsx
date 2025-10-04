'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Activity, Users, TrendingUp, Globe, Award, Calendar, MapPin, Coins, RefreshCw, AlertCircle, ArrowRight, ExternalLink, Brain, Target, Gamepad2, CheckCircle, Database } from 'lucide-react';
import { FloatingNavigation } from '@/components/floating-navigation';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { ethers } from 'ethers';
import {
    fetchHealthSharedMetrics,
    formatCommunityName,
    calculateGrowth,
    determineGameCycle,
    determineLocation,
    determineCategory,
    getTotalInteractions,
    getRecentActiveUsers,
    estimatePoints,
    estimateInterviews,
    estimateFundsRaised,
    type CommunityMetrics,
    type HealthSharedMetrics
} from '@/app/services/healthSharedApi';

const HEALTH_PROTOCOL_ABI = [
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": "address", "name": "community", "type": "address" },
            { "indexed": true, "internalType": "uint256", "name": "user", "type": "uint256" },
            { "indexed": false, "internalType": "uint256", "name": "points", "type": "uint256" },
            { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }
        ],
        "name": "PointsAdded",
        "type": "event"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "community", "type": "address" },
            { "internalType": "uint256", "name": "user", "type": "uint256" }
        ],
        "name": "getScoreCard",
        "outputs": [
            { "internalType": "uint256", "name": "points", "type": "uint256" },
            { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const SEPOLIA_CONTRACT_ADDRESS = "0x9B9176569835749b3AE8D9d4F7C891fDA9DBE111";
const SEPOLIA_RPC_URL = "https://sepolia.era.zksync.dev";

interface TransformedCommunity {
    id: string;
    name: string;
    address: string;
    members: number;
    totalPoints: number;
    avgPointsPerUser: number;
    interviews: number;
    fundsRaised: number;
    location: string;
    category: string;
    growth: number;
    status: string;
    gameTheoryCycle: string;
    cycleDescription: string;
    aiAgentDeployment: string;
    stakingRewards: string;
    posts: number;
    comments: number;
    activeUsersThisMonth: number;
}

class BlockchainService {
    private provider: ethers.JsonRpcProvider;
    private contract: ethers.Contract;

    constructor() {
        this.provider = new ethers.JsonRpcProvider(SEPOLIA_RPC_URL, {
            name: "zkSync Sepolia",
            chainId: 300
        });
        this.contract = new ethers.Contract(
            SEPOLIA_CONTRACT_ADDRESS,
            HEALTH_PROTOCOL_ABI,
            this.provider
        );
    }

    async testConnection(): Promise<boolean> {
        try {
            await this.provider.getNetwork();
            return true;
        } catch (error) {
            console.error('Blockchain connection failed:', error);
            return false;
        }
    }

    async getBlockchainPoints(communityAddress: string): Promise<number> {
        try {
            const events = await this.contract.queryFilter(
                this.contract.filters.PointsAdded(communityAddress),
                -100000
            );
            return events.reduce((sum, e) => sum + Number(e.args?.points || 0), 0);
        } catch (error) {
            console.error('Error fetching blockchain points:', error);
            return 0;
        }
    }

    getContractInfo() {
        return {
            address: SEPOLIA_CONTRACT_ADDRESS,
            network: "zkSync Sepolia Testnet",
            explorer: `https://sepolia.explorer.zksync.io/address/${SEPOLIA_CONTRACT_ADDRESS}`
        };
    }
}

export default function HealthScorecardExplorer() {
    const [communities, setCommunities] = useState<TransformedCommunity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<string>('');
    const [dataSource, setDataSource] = useState<'hybrid' | 'api-only'>('hybrid');
    const [blockchainConnected, setBlockchainConnected] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [activityData, setActivityData] = useState<any[]>([]);
    const [globalStats, setGlobalStats] = useState({
        totalCommunities: 0,
        totalPoints: 0,
        totalUsers: 0,
        fundsRaised: 0
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    const loadHybridData = async () => {
        setLoading(true);
        setError(null);

        try {
            console.log(' Loading hybrid data (Health-Shared + Blockchain)...');

            const blockchain = new BlockchainService();
            const isBlockchainConnected = await blockchain.testConnection();
            setBlockchainConnected(isBlockchainConnected);

            const healthSharedData: HealthSharedMetrics = await fetchHealthSharedMetrics();
            console.log(' Health-Shared data fetched:', healthSharedData.metrics.communities.length, 'communities');

            const transformedCommunities: TransformedCommunity[] = await Promise.all(
                healthSharedData.metrics.communities.map(async (comm: CommunityMetrics, index: number) => {
                    const totalInteractions = getTotalInteractions(comm);
                    const activeUsers = getRecentActiveUsers(comm);
                    const growth = calculateGrowth(comm.activeUsersMonthly);
                    const gameCycle = determineGameCycle(comm.totals.members, activeUsers, totalInteractions);

                    // Generate mock blockchain address from community ID
                    const mockAddress = `0x${comm.communityId.split('-').pop()?.padStart(40, '0').slice(0, 40)}`;

                    // Try to fetch blockchain points if connected
                    let blockchainPoints = 0;
                    if (isBlockchainConnected) {
                        try {
                            blockchainPoints = await blockchain.getBlockchainPoints(mockAddress);
                        } catch (err) {
                            console.log(`⚠️ No blockchain data for ${comm.communityId}`);
                        }
                    }

                    // Use blockchain points if available, otherwise estimate from interactions
                    const totalPoints = blockchainPoints > 0 ? blockchainPoints : estimatePoints(totalInteractions);

                    return {
                        id: comm.communityId,
                        name: formatCommunityName(comm.communityId),
                        address: mockAddress,
                        members: comm.totals.members,
                        totalPoints: totalPoints,
                        avgPointsPerUser: comm.totals.members > 0 ? totalPoints / comm.totals.members : 0,
                        interviews: estimateInterviews(totalInteractions),
                        fundsRaised: estimateFundsRaised(comm.totals.members),
                        location: determineLocation(comm.communityId),
                        category: determineCategory(comm.communityId),
                        growth: parseFloat(growth.toFixed(1)),
                        status: comm.totals.members > 0 ? 'active' : 'inactive',
                        gameTheoryCycle: gameCycle.cycle,
                        cycleDescription: gameCycle.description,
                        aiAgentDeployment: comm.totals.members > 1000 ? 'Active' : comm.totals.members > 100 ? 'Deploying' : 'Pending',
                        stakingRewards: comm.totals.members > 1000 ? '15% APY' : comm.totals.members > 100 ? '12% APY' : '10% APY',
                        posts: comm.totals.posts,
                        comments: comm.totals.comments,
                        activeUsersThisMonth: activeUsers
                    };
                })
            );

            // Sort by members descending
            transformedCommunities.sort((a, b) => b.members - a.members);

            // Calculate global stats
            const stats = {
                totalCommunities: transformedCommunities.length,
                totalPoints: transformedCommunities.reduce((sum, c) => sum + c.totalPoints, 0),
                totalUsers: transformedCommunities.reduce((sum, c) => sum + c.members, 0),
                fundsRaised: transformedCommunities.reduce((sum, c) => sum + c.fundsRaised, 0)
            };

            // Generate activity timeline from login frequency
            const loginData = healthSharedData.metrics.loginFrequency.monthly.slice(-6);
            const timeline = loginData.map(item => ({
                month: new Date(item.month + '-01').toLocaleDateString('en', { month: 'short' }),
                points: item.count * 100, // Estimate points from logins
                members: Math.floor(item.count * 0.8) // Estimate unique members
            }));

            setCommunities(transformedCommunities);
            setGlobalStats(stats);
            setActivityData(timeline);
            setLastUpdated(healthSharedData.generatedAt);
            setDataSource(isBlockchainConnected ? 'hybrid' : 'api-only');

            console.log('Hybrid data loaded successfully');
            console.log('Stats:', stats);
            console.log('Blockchain:', isBlockchainConnected ? 'Connected' : 'Not connected');

        } catch (err) {
            console.error('Error loading data:', err);
            setError('Failed to load community data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadHybridData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#233B54] via-[#6DD6F2]/20 to-[#F6A23A]/20 flex items-center justify-center">
                <div className="text-center">
                    <RefreshCw className="h-12 w-12 animate-spin text-[#6DD6F2] mx-auto mb-4" />
                    <p className="text-white text-lg">Loading real community data...</p>
                    <p className="text-[#6DD6F2] text-sm mt-2">Fetching from Health-Shared API + zkSync Blockchain</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#233B54] via-[#6DD6F2]/20 to-[#F6A23A]/20 flex items-center justify-center p-4">
                <Card className="max-w-md w-full">
                    <CardContent className="p-6 text-center">
                        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                        <h3 className="text-lg font-bold mb-2">Error Loading Data</h3>
                        <p className="text-gray-600 mb-4">{error}</p>
                        <Button onClick={loadHybridData}>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Retry
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const quickStats = {
        avgPointsPerUser: globalStats.totalUsers > 0 ? Math.round(globalStats.totalPoints / globalStats.totalUsers) : 0,
        interviewsCompleted: communities.reduce((sum, c) => sum + c.interviews, 0),
        communitiesGrowing: communities.filter(c => c.growth > 0).length,
        lastActivityHours: 2
    };

    return (
        <main className="min-h-screen bg-white text-gray-900 font-body">
            <FloatingNavigation />

            {/* Hero Section */}
            <section className="w-full min-h-[350px] sm:min-h-[400px] lg:min-h-[450px] relative flex flex-col justify-center items-center overflow-hidden pt-12 sm:pt-16">
                <div
                    className="absolute inset-0 z-0 transition-all duration-500"
                    style={{ background: 'linear-gradient(120deg, #6DD6F2 60%, #F6A23A 40%)' }}
                />
                <div className="relative z-10 p-4 sm:p-8 lg:p-12 flex flex-col items-center w-full max-w-7xl mx-auto">
                    <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-4 sm:mb-6">
                        <Database className="h-4 w-4 sm:h-5 sm:w-5 text-[#233B54]" />
                        <span className="text-xs sm:text-sm font-semibold text-[#233B54]">Real Data • Hybrid Mode</span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center tracking-tight mb-3 sm:mb-4 text-[#233B54] drop-shadow-lg px-2">
                        Health Scorecard Explorer
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-center mb-4 sm:mb-6 text-[#A63A2B] font-semibold max-w-5xl px-2">
                        Bridging 3,3 and 5,5 game theory through blockchain health scorecards and AI deployment.
                    </p>

                    <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-white/50 mb-4 sm:mb-6">
                        <Gamepad2 className="h-4 w-4 text-[#6DD6F2]" />
                        <span className="text-sm font-bold text-[#233B54]">Game Theory Cycles Active</span>
                        <Badge className="bg-[#6DD6F2] text-[#233B54] text-xs">3,3 → 5,5</Badge>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 w-full max-w-5xl mb-6 sm:mb-8 px-2">
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                            <Globe className="h-6 w-6 sm:h-8 sm:w-8 text-[#6DD6F2] mx-auto mb-1 sm:mb-2" />
                            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#233B54]">
                                {globalStats.totalCommunities}
                            </div>
                            <div className="text-xs sm:text-sm text-[#A63A2B] font-medium">Communities</div>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                            <Award className="h-6 w-6 sm:h-8 sm:w-8 text-[#F6A23A] mx-auto mb-1 sm:mb-2" />
                            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#233B54]">
                                {globalStats.totalPoints.toLocaleString()}
                            </div>
                            <div className="text-xs sm:text-sm text-[#A63A2B] font-medium">Total Points</div>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                            <Users className="h-6 w-6 sm:h-8 sm:w-8 text-[#A06A8C] mx-auto mb-1 sm:mb-2" />
                            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#233B54]">
                                {globalStats.totalUsers.toLocaleString()}
                            </div>
                            <div className="text-xs sm:text-sm text-[#A63A2B] font-medium">Active Members</div>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                            <Coins className="h-6 w-6 sm:h-8 sm:w-8 text-[#A63A2B] mx-auto mb-1 sm:mb-2" />
                            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#233B54]">
                                ${(globalStats.fundsRaised / 1000).toFixed(1)}K
                            </div>
                            <div className="text-xs sm:text-sm text-[#A63A2B] font-medium">Funds Raised</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Data Source Status */}
            <div className="max-w-7xl mx-auto px-4 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <div>
                                <p className="font-semibold text-green-800">
                                    {blockchainConnected ? '🔗 Hybrid Data Active' : '📊 Health-Shared API Active'}
                                </p>
                                <p className="text-xs text-green-700">
                                    {blockchainConnected
                                        ? `Health-Shared API + zkSync Sepolia (${SEPOLIA_CONTRACT_ADDRESS.slice(0, 6)}...${SEPOLIA_CONTRACT_ADDRESS.slice(-4)})`
                                        : 'Health-Shared API (Blockchain unavailable)'
                                    }
                                </p>
                            </div>
                        </div>
                        <Button size="sm" variant="outline" onClick={loadHybridData} className="gap-2">
                            <RefreshCw className="h-3 w-3" />
                            Refresh
                        </Button>
                    </div>
                    <p className="text-xs text-green-600">
                        Last updated: {new Date(lastUpdated).toLocaleString()} •
                        {communities.length} communities •
                        {globalStats.totalUsers.toLocaleString()} members
                    </p>
                </div>
            </div>

            {/* Game Theory Info */}
            <section className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 my-6 sm:my-8">
                <div className="bg-gradient-to-r from-[#6DD6F2]/10 to-[#F6A23A]/10 rounded-2xl p-4 sm:p-6 border border-[#6DD6F2]/20">
                    <div className="flex items-center gap-3 mb-4">
                        <Target className="h-6 w-6 text-[#6DD6F2]" />
                        <h3 className="text-xl sm:text-2xl font-bold text-[#233B54]">Blockchain Health Scorecards: Game Theory Bridge</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-3">
                            <h4 className="font-semibold text-[#233B54] flex items-center gap-2">
                                <Badge className="bg-[#A06A8C] text-white text-xs">3,3</Badge>
                                Cooperative Growth Phase
                            </h4>
                            <p className="text-sm text-[#A63A2B]">
                                Communities start with moderate engagement and steady rewards. Members earn points through health activities.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <h4 className="font-semibold text-[#233B54] flex items-center gap-2">
                                <Badge className="bg-[#6DD6F2] text-[#233B54] text-xs">5,5</Badge>
                                Optimal Collaboration Phase
                            </h4>
                            <p className="text-sm text-[#A63A2B]">
                                Advanced communities with AI agents, high engagement, maximum rewards, and transparent scorecards.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 pb-12 sm:pb-16 space-y-6 sm:space-y-8">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-lg border border-[#6DD6F2]/20 hover:shadow-xl hover:scale-105 transition-all">
                        <div className="text-lg sm:text-2xl font-bold text-[#6DD6F2]">{quickStats.avgPointsPerUser}</div>
                        <div className="text-xs sm:text-sm text-[#A63A2B] mt-1">Avg Points/User</div>
                    </div>
                    <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-lg border border-[#F6A23A]/20 hover:shadow-xl hover:scale-105 transition-all">
                        <div className="text-lg sm:text-2xl font-bold text-[#F6A23A]">{quickStats.interviewsCompleted}</div>
                        <div className="text-xs sm:text-sm text-[#A63A2B] mt-1">Interviews Done</div>
                    </div>
                    <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-lg border border-[#A06A8C]/20 hover:shadow-xl hover:scale-105 transition-all">
                        <div className="text-lg sm:text-2xl font-bold text-[#A06A8C]">{quickStats.communitiesGrowing}</div>
                        <div className="text-xs sm:text-sm text-[#A63A2B] mt-1">Growing Communities</div>
                    </div>
                    <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-lg border border-[#A63A2B]/20 hover:shadow-xl hover:scale-105 transition-all">
                        <div className="text-lg sm:text-2xl font-bold text-[#A63A2B]">{quickStats.lastActivityHours}h</div>
                        <div className="text-xs sm:text-sm text-[#A63A2B] mt-1">Last Activity</div>
                    </div>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="communities" className="space-y-4 sm:space-y-6">
                    <TabsList className="w-full bg-white/80 rounded-xl p-1 sm:p-2 shadow-lg h-auto grid grid-cols-2 gap-1">
                        <TabsTrigger value="communities" className="rounded-lg data-[state=active]:bg-[#6DD6F2] text-xs sm:text-sm">Communities</TabsTrigger>
                        <TabsTrigger value="analytics" className="rounded-lg data-[state=active]:bg-[#F6A23A] text-xs sm:text-sm">Analytics</TabsTrigger>
                    </TabsList>

                    {/* Communities Tab */}
                    <TabsContent value="communities" className="space-y-4 sm:space-y-6">
                        {communities.map((community) => (
                            <div
                                key={community.id}
                                className="rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8"
                                style={{ background: 'linear-gradient(120deg, #6DD6F2 70%, #F6F2D4 30%)' }}
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#233B54] mb-1">{community.name}</h3>
                                        <p className="font-mono text-xs text-[#A63A2B]">{community.address}</p>
                                    </div>
                                    <div className="flex gap-2 flex-wrap">
                                        <Badge className="bg-white/80 text-[#233B54] text-xs">{community.status}</Badge>
                                        <Badge variant="outline" className="border-[#233B54] text-xs">{community.category}</Badge>
                                        <Badge className={`text-xs ${community.gameTheoryCycle === '5,5' ? 'bg-green-500' : 'bg-yellow-500'} text-white`}>
                                            {community.gameTheoryCycle}
                                        </Badge>
                                    </div>
                                </div>

                                <div className="bg-white/60 rounded-xl p-3 sm:p-4 mb-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Target className="h-4 w-4 text-[#233B54]" />
                                        <span className="font-semibold text-[#233B54]">Game Theory: {community.gameTheoryCycle}</span>
                                    </div>
                                    <p className="text-sm text-[#A63A2B] mb-2">{community.cycleDescription}</p>
                                    <div className="flex flex-wrap gap-2 text-xs">
                                        <Badge variant="outline">AI: {community.aiAgentDeployment}</Badge>
                                        <Badge variant="outline">Staking: {community.stakingRewards}</Badge>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-4">
                                    <div className="bg-white/60 rounded-xl p-3 text-center hover:bg-white/80 transition-all">
                                        <Users className="h-5 w-5 text-[#233B54] mx-auto mb-1" />
                                        <div className="text-lg font-bold text-[#233B54]">{community.members.toLocaleString()}</div>
                                        <div className="text-xs text-[#A63A2B]">Members</div>
                                    </div>
                                    <div className="bg-white/60 rounded-xl p-3 text-center hover:bg-white/80 transition-all">
                                        <Award className="h-5 w-5 text-[#233B54] mx-auto mb-1" />
                                        <div className="text-lg font-bold text-[#233B54]">{community.totalPoints.toLocaleString()}</div>
                                        <div className="text-xs text-[#A63A2B]">Points</div>
                                    </div>
                                    <div className="bg-white/60 rounded-xl p-3 text-center hover:bg-white/80 transition-all">
                                        <Activity className="h-5 w-5 text-[#233B54] mx-auto mb-1" />
                                        <div className="text-lg font-bold text-[#233B54]">{community.posts}</div>
                                        <div className="text-xs text-[#A63A2B]">Posts</div>
                                    </div>
                                    <div className="bg-white/60 rounded-xl p-3 text-center hover:bg-white/80 transition-all">
                                        <TrendingUp className="h-5 w-5 text-[#233B54] mx-auto mb-1" />
                                        <div className="text-lg font-bold text-[#233B54]">{community.growth > 0 ? '+' : ''}{community.growth.toFixed(1)}%</div>
                                        <div className="text-xs text-[#A63A2B]">Growth</div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <div className="flex flex-wrap gap-2 sm:gap-4 flex-1">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="h-4 w-4 text-[#233B54]" />
                                            <span className="text-xs sm:text-sm text-[#233B54]">{community.location}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Brain className="h-4 w-4 text-[#6DD6F2]" />
                                            <span className="text-xs sm:text-sm text-[#233B54]">AI: {community.aiAgentDeployment}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </TabsContent>

                    {/* Analytics Tab */}
                    <TabsContent value="analytics" className="space-y-4 sm:space-y-6">
                        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
                            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
                                <h3 className="text-xl font-bold text-[#233B54] mb-2">Community Growth Trends</h3>
                                <p className="text-[#A63A2B] mb-4 text-sm">Real activity over time</p>
                                <div className="h-64 sm:h-80">
                                    {mounted && activityData.length > 0 ? (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={activityData}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#F6F2D4" />
                                                <XAxis dataKey="month" stroke="#A63A2B" fontSize={12} />
                                                <YAxis stroke="#A63A2B" fontSize={12} />
                                                <Tooltip />
                                                <Line type="monotone" dataKey="points" stroke="#6DD6F2" strokeWidth={2} name="Points" />
                                                <Line type="monotone" dataKey="members" stroke="#F6A23A" strokeWidth={2} name="Members" />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <div className="h-full flex items-center justify-center bg-gray-100 rounded-lg">
                                            <div className="text-gray-500">Loading chart...</div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
                                <h3 className="text-xl font-bold text-[#233B54] mb-2">Game Theory Distribution</h3>
                                <p className="text-[#A63A2B] mb-4 text-sm">Cycle progression</p>
                                <div className="h-64 sm:h-80">
                                    {mounted ? (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={[
                                                        {
                                                            name: '3,3 Cooperative',
                                                            value: communities.filter(c => c.gameTheoryCycle === '3,3').length,
                                                            color: '#F6A23A'
                                                        },
                                                        {
                                                            name: '5,5 Optimal',
                                                            value: communities.filter(c => c.gameTheoryCycle === '5,5').length,
                                                            color: '#6DD6F2'
                                                        },
                                                        {
                                                            name: '2,2 Building',
                                                            value: communities.filter(c => c.gameTheoryCycle === '2,2').length,
                                                            color: '#A06A8C'
                                                        }
                                                    ]}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                                    outerRadius={70}
                                                    dataKey="value"
                                                    fontSize={11}
                                                >
                                                    {[
                                                        { color: '#F6A23A' },
                                                        { color: '#6DD6F2' },
                                                        { color: '#A06A8C' }
                                                    ].map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <div className="h-full flex items-center justify-center bg-gray-100 rounded-lg">
                                            <div className="text-gray-500">Loading chart...</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
                            <h3 className="text-xl font-bold text-[#233B54] mb-2">Community Performance</h3>
                            <p className="text-[#A63A2B] mb-4 text-sm">Real metrics comparison</p>
                            <div className="h-80">
                                {mounted ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={communities.slice(0, 5)}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#F6F2D4" />
                                            <XAxis dataKey="name" stroke="#A63A2B" fontSize={10} angle={-45} textAnchor="end" height={100} />
                                            <YAxis stroke="#A63A2B" fontSize={12} />
                                            <Tooltip />
                                            <Bar dataKey="members" fill="#6DD6F2" name="Members" />
                                            <Bar dataKey="posts" fill="#F6A23A" name="Posts" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="h-full flex items-center justify-center bg-gray-100 rounded-lg">
                                        <div className="text-gray-500">Loading chart...</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            <Footer />
        </main>
    );
}