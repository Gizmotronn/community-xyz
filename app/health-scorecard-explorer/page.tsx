'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Activity, Users, TrendingUp, Globe, Award, Calendar, MapPin, Coins, RefreshCw, AlertCircle, ArrowRight, ExternalLink, Brain, Target, Gamepad2 } from 'lucide-react';
import { FloatingNavigation } from '@/components/floating-navigation';
import { Footer } from '@/components/footer';
import Link from 'next/link';

// Mock data
const mockCommunities = [
    {
        id: 1,
        name: "Health Protocol Main",
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        members: 1247,
        totalPoints: 45680,
        avgPointsPerUser: 36.7,
        interviews: 89,
        fundsRaised: 12500,
        location: "Global",
        category: "General Health",
        growth: 15.3,
        status: "active",
        gameTheoryCycle: "5,5",
        cycleDescription: "Optimal collaboration - High health engagement + High community rewards",
        aiAgentDeployment: "Active",
        stakingRewards: "15% APY"
    },
    {
        id: 2,
        name: "Diabetes Community",
        address: "0x742d35Cc6473C4c8D4eA2F37e9e0B22A3E1e8e7A",
        members: 892,
        totalPoints: 32450,
        avgPointsPerUser: 36.4,
        interviews: 67,
        fundsRaised: 8900,
        location: "North America",
        category: "Diabetes",
        growth: 22.1,
        status: "active",
        gameTheoryCycle: "3,3",
        cycleDescription: "Cooperative growth - Moderate engagement + Steady rewards",
        aiAgentDeployment: "Deploying",
        stakingRewards: "12% APY"
    },
    {
        id: 3,
        name: "Mental Health Support",
        address: "0x8ba1f109551bD432803012645Hac189451c9E",
        members: 654,
        totalPoints: 28900,
        avgPointsPerUser: 44.2,
        interviews: 45,
        fundsRaised: 6750,
        location: "Europe",
        category: "Mental Health",
        growth: 18.7,
        status: "growing",
        gameTheoryCycle: "3,3",
        cycleDescription: "Building momentum - Growing participation + Increasing rewards",
        aiAgentDeployment: "Pending",
        stakingRewards: "10% APY"
    }
];

const categoryData = [
    { name: 'General Health', value: 42, color: '#6DD6F2' },
    { name: 'Diabetes', value: 28, color: '#F6A23A' },
    { name: 'Mental Health', value: 18, color: '#A06A8C' },
    { name: 'Cardiovascular', value: 12, color: '#A63A2B' }
];

export default function HealthScorecardExplorer() {
    const [contractData, setContractData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activityData, setActivityData] = useState([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const fetchContractData = async () => {
        setLoading(true);
        setError(null);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            setContractData({
                totalCommunities: 3,
                totalPoints: 106980,
                totalUsers: 2793,
                lastUpdate: Date.now()
            });

            setActivityData([
                { month: 'Jan', points: 12000, members: 890 },
                { month: 'Feb', points: 15600, members: 920 },
                { month: 'Mar', points: 18200, members: 975 },
                { month: 'Apr', points: 22100, members: 1050 },
                { month: 'May', points: 26800, members: 1125 },
                { month: 'Jun', points: 32450, members: 1247 }
            ]);
        } catch (err) {
            console.error('Error fetching contract data:', err);
            setError('Failed to fetch live contract data. Showing demo data.');

            setContractData({
                totalCommunities: 3,
                totalPoints: 106980,
                totalUsers: 2793,
                lastUpdate: Date.now()
            });

            setActivityData([
                { month: 'Jan', points: 12000, members: 890 },
                { month: 'Feb', points: 15600, members: 920 },
                { month: 'Mar', points: 18200, members: 975 },
                { month: 'Apr', points: 22100, members: 1050 },
                { month: 'May', points: 26800, members: 1125 },
                { month: 'Jun', points: 32450, members: 1247 }
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContractData();
    }, []);

    const quickStats = {
        avgPointsPerUser: contractData && contractData.totalUsers > 0 ?
            Math.round(contractData.totalPoints / contractData.totalUsers) : 38.3,
        interviewsCompleted: 201,
        communitiesGrowing: 3,
        lastActivityHours: 2
    };

    return (
        <main className="min-h-screen bg-white text-gray-900 font-body">
            <FloatingNavigation />

            {/* Hero Section */}
            <section className="w-full min-h-[350px] sm:min-h-[400px] lg:min-h-[450px] relative flex flex-col justify-center items-center overflow-hidden pt-12 sm:pt-16">
                <div
                    className="absolute inset-0 z-0 transition-all duration-500 hover:scale-105"
                    style={{ background: 'linear-gradient(120deg, #6DD6F2 60%, #F6A23A 40%)' }}
                />
                <div className="relative z-10 p-4 sm:p-8 lg:p-12 flex flex-col items-center w-full max-w-7xl mx-auto">
                    <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-4 sm:mb-6">
                        <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-[#233B54]" />
                        <span className="text-xs sm:text-sm font-semibold text-[#233B54]">Live on Sepolia Network</span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center tracking-tight mb-3 sm:mb-4 text-[#233B54] drop-shadow-lg px-2">
                        Health Scorecard Explorer
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-center mb-4 sm:mb-6 text-[#A63A2B] font-semibold max-w-5xl px-2">
                        Bridging the gap between 3,3 and 5,5 game theory through blockchain health scorecards and AI agent deployment.
                    </p>

                    {/* Game Theory Badge */}
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-white/50 mb-4 sm:mb-6">
                        <Gamepad2 className="h-4 w-4 text-[#6DD6F2]" />
                        <span className="text-sm font-bold text-[#233B54]">Game Theory Cycles Active</span>
                        <Badge className="bg-[#6DD6F2] text-[#233B54] text-xs">3,3 → 5,5</Badge>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 w-full max-w-5xl mb-6 sm:mb-8 px-2">
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center shadow-lg hover:shadow-2xl hover:scale-105 hover:bg-white/90 transition-all duration-300 cursor-pointer group">
                            <Globe className="h-6 w-6 sm:h-8 sm:w-8 text-[#6DD6F2] mx-auto mb-1 sm:mb-2 group-hover:scale-110 group-hover:text-[#5bc5e8] transition-all duration-300" />
                            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#233B54] group-hover:text-[#1a2938] transition-colors duration-300">
                                {loading ? "..." : contractData?.totalCommunities || "3"}
                            </div>
                            <div className="text-xs sm:text-sm text-[#A63A2B] font-medium group-hover:text-[#8b2f1e] transition-colors duration-300">Communities</div>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center shadow-lg hover:shadow-2xl hover:scale-105 hover:bg-white/90 transition-all duration-300 cursor-pointer group">
                            <Award className="h-6 w-6 sm:h-8 sm:w-8 text-[#F6A23A] mx-auto mb-1 sm:mb-2 group-hover:scale-110 group-hover:text-[#e5911a] transition-all duration-300" />
                            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#233B54] group-hover:text-[#1a2938] transition-colors duration-300">
                                {loading ? "..." : (contractData?.totalPoints || 106980).toLocaleString()}
                            </div>
                            <div className="text-xs sm:text-sm text-[#A63A2B] font-medium group-hover:text-[#8b2f1e] transition-colors duration-300">Total Points</div>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center shadow-lg hover:shadow-2xl hover:scale-105 hover:bg-white/90 transition-all duration-300 cursor-pointer group">
                            <Users className="h-6 w-6 sm:h-8 sm:w-8 text-[#A06A8C] mx-auto mb-1 sm:mb-2 group-hover:scale-110 group-hover:text-[#8f5a7a] transition-all duration-300" />
                            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#233B54] group-hover:text-[#1a2938] transition-colors duration-300">
                                {loading ? "..." : (contractData?.totalUsers || 2793).toLocaleString()}
                            </div>
                            <div className="text-xs sm:text-sm text-[#A63A2B] font-medium group-hover:text-[#8b2f1e] transition-colors duration-300">Active Members</div>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center shadow-lg hover:shadow-2xl hover:scale-105 hover:bg-white/90 transition-all duration-300 cursor-pointer group">
                            <Coins className="h-6 w-6 sm:h-8 sm:w-8 text-[#A63A2B] mx-auto mb-1 sm:mb-2 group-hover:scale-110 group-hover:text-[#8b2f1e] transition-all duration-300" />
                            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#233B54] group-hover:text-[#1a2938] transition-colors duration-300">$28.2K</div>
                            <div className="text-xs sm:text-sm text-[#A63A2B] font-medium group-hover:text-[#8b2f1e] transition-colors duration-300">Funds Raised</div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 mb-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
                    <p className="text-sm text-yellow-800">
                        <strong>Demo Notice:</strong> This content is for demonstration purposes only.
                        Some features are non-functional and use mock data for visualization.
                    </p>
                </div>
            </div>

            {/* Game Theory Information Section */}
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
                                Communities start with moderate engagement and steady rewards. Members earn points through health activities like reading, watching videos, and community participation.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <h4 className="font-semibold text-[#233B54] flex items-center gap-2">
                                <Badge className="bg-[#6DD6F2] text-[#233B54] text-xs">5,5</Badge>
                                Optimal Collaboration Phase
                            </h4>
                            <p className="text-sm text-[#A63A2B]">
                                Advanced communities with AI agent deployment, high health engagement, maximum community rewards, and transparent scorecards on zkSync Sepolia.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 my-6 sm:my-8">
                <div className="rounded-2xl sm:rounded-full shadow-xl p-4 sm:p-6 flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                    style={{ background: 'linear-gradient(120deg, #F6A23A 70%, #F6F2D4 30%)' }}>
                    <div className="text-center lg:text-left flex-1">
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#233B54] mb-2 hover:text-[#1a2938] transition-colors duration-300">
                            Ready to Join the Health Protocol Network?
                        </h2>
                        <p className="text-sm sm:text-base lg:text-lg text-[#A63A2B] font-medium hover:text-[#8b2f1e] transition-colors duration-300">
                            Connect with thriving health communities, track your wellness journey, and contribute to the future of decentralized healthcare.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-shrink-0 w-full sm:w-auto">
                        <Button
                            size="lg"
                            className="rounded-full px-4 sm:px-6 py-2 sm:py-3 bg-[#233B54] hover:bg-[#1a2938] text-white font-semibold shadow-lg text-sm sm:text-base hover:shadow-xl hover:scale-105 transition-all duration-300"
                        >
                            Explore Communities
                            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="rounded-full px-4 sm:px-6 py-2 sm:py-3 border-[#233B54] text-[#233B54] hover:bg-[#233B54] hover:text-white font-semibold text-sm sm:text-base hover:scale-105 transition-all duration-300"
                            onClick={() => {
                                if (typeof window !== 'undefined') {
                                    window.open('https://medium.com/health-protocol/blockchain-health-scorecards-the-bridge-between-the-3-3-and-5-5-games-7db290dd0172', '_blank');
                                }
                            }}
                        >
                            Learn More
                        </Button>
                    </div>
                </div>
            </section>

            {/* Error Banner */}
            {error && (
                <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 mb-6">
                    <div className="bg-[#F6F2D4] border border-[#F6A23A] rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 hover:shadow-lg hover:scale-[1.01] transition-all duration-300">
                        <AlertCircle className="h-5 w-5 text-[#A63A2B] flex-shrink-0 hover:scale-110 transition-transform duration-300" />
                        <div className="flex-1 min-w-0">
                            <p className="text-[#233B54] font-semibold text-sm sm:text-base">Connection Notice</p>
                            <p className="text-[#A63A2B] text-xs sm:text-sm break-words">{error}</p>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={fetchContractData}
                            disabled={loading}
                            className="border-[#A63A2B] text-[#A63A2B] flex-shrink-0 hover:scale-105 transition-all duration-300"
                        >
                            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''} hover:scale-110 transition-transform duration-300`} />
                            Retry
                        </Button>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 pb-12 sm:pb-16 space-y-6 sm:space-y-8">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center shadow-lg border border-[#6DD6F2]/20 hover:shadow-xl hover:scale-105 hover:border-[#6DD6F2]/40 transition-all duration-300 cursor-pointer group">
                        <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#6DD6F2] group-hover:text-[#5bc5e8] group-hover:scale-110 transition-all duration-300">{quickStats.avgPointsPerUser}</div>
                        <div className="text-xs sm:text-sm text-[#A63A2B] mt-1 group-hover:text-[#8b2f1e] transition-colors duration-300">Avg Points/User</div>
                    </div>

                    <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center shadow-lg border border-[#F6A23A]/20 hover:shadow-xl hover:scale-105 hover:border-[#F6A23A]/40 transition-all duration-300 cursor-pointer group">
                        <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#F6A23A] group-hover:text-[#e5911a] group-hover:scale-110 transition-all duration-300">{quickStats.interviewsCompleted}</div>
                        <div className="text-xs sm:text-sm text-[#A63A2B] mt-1 group-hover:text-[#8b2f1e] transition-colors duration-300">Interviews Done</div>
                    </div>

                    <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center shadow-lg border border-[#A06A8C]/20 hover:shadow-xl hover:scale-105 hover:border-[#A06A8C]/40 transition-all duration-300 cursor-pointer group">
                        <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#A06A8C] group-hover:text-[#8f5a7a] group-hover:scale-110 transition-all duration-300">{quickStats.communitiesGrowing}</div>
                        <div className="text-xs sm:text-sm text-[#A63A2B] mt-1 group-hover:text-[#8b2f1e] transition-colors duration-300">Growing Communities</div>
                    </div>

                    <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center shadow-lg border border-[#A63A2B]/20 hover:shadow-xl hover:scale-105 hover:border-[#A63A2B]/40 transition-all duration-300 cursor-pointer group">
                        <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#A63A2B] group-hover:text-[#8b2f1e] group-hover:scale-110 transition-all duration-300">{quickStats.lastActivityHours}h</div>
                        <div className="text-xs sm:text-sm text-[#A63A2B] mt-1 group-hover:text-[#8b2f1e] transition-colors duration-300">Last Activity</div>
                    </div>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="communities" className="space-y-4 sm:space-y-6">
                    <TabsList className="w-full bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-1 sm:p-2 shadow-lg hover:shadow-xl transition-shadow duration-300 h-auto grid grid-cols-2 grid-rows-2 sm:grid-cols-4 sm:grid-rows-1 gap-1">
                        <TabsTrigger value="communities" className="rounded-lg sm:rounded-xl data-[state=active]:bg-[#6DD6F2] data-[state=active]:text-[#233B54] text-xs sm:text-sm hover:bg-[#6DD6F2]/20 hover:scale-105 transition-all duration-300 min-h-[36px] flex items-center justify-center">Communities</TabsTrigger>
                        <TabsTrigger value="analytics" className="rounded-lg sm:rounded-xl data-[state=active]:bg-[#F6A23A] data-[state=active]:text-[#233B54] text-xs sm:text-sm hover:bg-[#F6A23A]/20 hover:scale-105 transition-all duration-300 min-h-[36px] flex items-center justify-center">Analytics</TabsTrigger>
                        <TabsTrigger value="geographic" className="rounded-lg sm:rounded-xl data-[state=active]:bg-[#A06A8C] data-[state=active]:text-white text-xs sm:text-sm hover:bg-[#A06A8C]/20 hover:scale-105 transition-all duration-300 min-h-[36px] flex items-center justify-center">Geographic</TabsTrigger>
                        <TabsTrigger value="contract" className="rounded-lg sm:rounded-xl data-[state=active]:bg-[#A63A2B] data-[state=active]:text-white text-xs sm:text-sm hover:bg-[#A63A2B]/20 hover:scale-105 transition-all duration-300 min-h-[36px] flex items-center justify-center">Contract</TabsTrigger>
                    </TabsList>

                    {/* Communities Tab */}
                    <TabsContent value="communities" className="space-y-4 sm:space-y-6">
                        {mockCommunities.map((community, idx) => {
                            const uniformBg = '#6DD6F2';
                            const shape = 'rounded-2xl';

                            return (
                                <div
                                    key={community.id}
                                    className={`${shape} shadow-xl p-4 sm:p-6 lg:p-8`}
                                    style={{ background: `linear-gradient(120deg, ${uniformBg} 70%, #F6F2D4 30%)` }}
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
                                        <div className="min-w-0 flex-1">
                                            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#233B54] mb-1 sm:mb-2 break-words">{community.name}</h3>
                                            <p className="font-mono text-xs sm:text-sm text-[#A63A2B] break-all">{community.address}</p>
                                        </div>
                                        <div className="flex gap-2 flex-shrink-0 flex-wrap">
                                            <Badge className="bg-white/80 text-[#233B54] border-0 text-xs">{community.status}</Badge>
                                            <Badge variant="outline" className="border-[#233B54] text-[#233B54] text-xs">{community.category}</Badge>
                                            <Badge className={`text-xs ${community.gameTheoryCycle === '5,5' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}`}>
                                                {community.gameTheoryCycle}
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* Game Theory Cycle Information */}
                                    <div className="bg-white/60 rounded-xl p-3 sm:p-4 mb-4 hover:bg-white/80 transition-all duration-300">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Target className="h-4 w-4 text-[#233B54]" />
                                            <span className="font-semibold text-[#233B54]">Game Theory Cycle: {community.gameTheoryCycle}</span>
                                        </div>
                                        <p className="text-sm text-[#A63A2B] mb-2">{community.cycleDescription}</p>
                                        <div className="flex flex-wrap gap-2 text-xs">
                                            <Badge variant="outline" className="border-[#233B54] text-[#233B54]">
                                                AI Agent: {community.aiAgentDeployment}
                                            </Badge>
                                            <Badge variant="outline" className="border-[#233B54] text-[#233B54]">
                                                Staking: {community.stakingRewards}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6">
                                        <div className="bg-white/60 rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 text-center hover:bg-white/80 hover:scale-105 transition-all duration-300 group/card">
                                            <Users className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-[#233B54] mx-auto mb-1 sm:mb-2 group-hover/card:scale-110 transition-transform duration-300" />
                                            <div className="text-sm sm:text-lg lg:text-xl font-bold text-[#233B54] group-hover/card:text-[#1a2938] transition-colors duration-300">{community.members.toLocaleString()}</div>
                                            <div className="text-xs text-[#A63A2B] group-hover/card:text-[#8b2f1e] transition-colors duration-300">Members</div>
                                        </div>

                                        <div className="bg-white/60 rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 text-center hover:bg-white/80 hover:scale-105 transition-all duration-300 group/card">
                                            <Award className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-[#233B54] mx-auto mb-1 sm:mb-2 group-hover/card:scale-110 transition-transform duration-300" />
                                            <div className="text-sm sm:text-lg lg:text-xl font-bold text-[#233B54] group-hover/card:text-[#1a2938] transition-colors duration-300">{community.totalPoints.toLocaleString()}</div>
                                            <div className="text-xs text-[#A63A2B] group-hover/card:text-[#8b2f1e] transition-colors duration-300">Points</div>
                                        </div>

                                        <div className="bg-white/60 rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 text-center hover:bg-white/80 hover:scale-105 transition-all duration-300 group/card">
                                            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-[#233B54] mx-auto mb-1 sm:mb-2 group-hover/card:scale-110 transition-transform duration-300" />
                                            <div className="text-sm sm:text-lg lg:text-xl font-bold text-[#233B54] group-hover/card:text-[#1a2938] transition-colors duration-300">{community.avgPointsPerUser}</div>
                                            <div className="text-xs text-[#A63A2B] group-hover/card:text-[#8b2f1e] transition-colors duration-300">Avg/User</div>
                                        </div>

                                        <div className="bg-white/60 rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 text-center hover:bg-white/80 hover:scale-105 transition-all duration-300 group/card">
                                            <Calendar className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-[#233B54] mx-auto mb-1 sm:mb-2 group-hover/card:scale-110 transition-transform duration-300" />
                                            <div className="text-sm sm:text-lg lg:text-xl font-bold text-[#233B54] group-hover/card:text-[#1a2938] transition-colors duration-300">{community.interviews}</div>
                                            <div className="text-xs text-[#A63A2B] group-hover/card:text-[#8b2f1e] transition-colors duration-300">Interviews</div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-1 min-w-0">
                                            <div className="flex items-center gap-1">
                                                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-[#233B54] flex-shrink-0" />
                                                <span className="text-xs sm:text-sm text-[#233B54] font-medium">{community.location}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
                                                <span className="text-xs sm:text-sm text-green-600 font-medium">+{community.growth}% growth</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Brain className="h-3 w-3 sm:h-4 sm:w-4 text-[#6DD6F2] flex-shrink-0" />
                                                <span className="text-xs sm:text-sm text-[#233B54] font-medium">AI: {community.aiAgentDeployment}</span>
                                            </div>
                                        </div>

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="border-[#233B54] text-[#233B54] hover:bg-[#233B54] hover:text-white text-xs sm:text-sm flex-shrink-0 hover:scale-105 hover:shadow-lg transition-all duration-300 group/btn"
                                            onClick={() => {
                                                if (typeof window !== 'undefined') {
                                                    window.open(`https://sepolia.explorer.zksync.io/address/${community.address}`, '_blank');
                                                }
                                            }}
                                        >
                                            <ExternalLink className="h-3 w-3 mr-1 group-hover/btn:scale-110 transition-transform duration-300" />
                                            <span className="hidden sm:inline">View on Explorer</span>
                                            <span className="sm:hidden">Explorer</span>
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </TabsContent>

                    {/* Analytics Tab */}
                    <TabsContent value="analytics" className="space-y-4 sm:space-y-6">
                        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
                            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group">
                                <h3 className="text-lg sm:text-xl font-bold text-[#233B54] mb-2 group-hover:text-[#1a2938] transition-colors duration-300">Community Growth Trends</h3>
                                <p className="text-[#A63A2B] mb-4 text-sm sm:text-base group-hover:text-[#8b2f1e] transition-colors duration-300">Points and member growth over time</p>
                                <div className="h-64 sm:h-80">
                                    {mounted ? (
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

                            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group">
                                <h3 className="text-lg sm:text-xl font-bold text-[#233B54] mb-2 group-hover:text-[#1a2938] transition-colors duration-300">Game Theory Distribution</h3>
                                <p className="text-[#A63A2B] mb-4 text-sm sm:text-base group-hover:text-[#8b2f1e] transition-colors duration-300">3,3 vs 5,5 cycle progression</p>
                                <div className="h-64 sm:h-80">
                                    {mounted ? (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={[
                                                        { name: '3,3 Cooperative', value: 67, color: '#F6A23A' },
                                                        { name: '5,5 Optimal', value: 33, color: '#6DD6F2' }
                                                    ]}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                                    outerRadius={70}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                    fontSize={12}
                                                >
                                                    {[
                                                        { name: '3,3 Cooperative', value: 67, color: '#F6A23A' },
                                                        { name: '5,5 Optimal', value: 33, color: '#6DD6F2' }
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

                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group">
                            <h3 className="text-lg sm:text-xl font-bold text-[#233B54] mb-2 group-hover:text-[#1a2938] transition-colors duration-300">Community Performance Metrics</h3>
                            <p className="text-[#A63A2B] mb-4 text-sm sm:text-base group-hover:text-[#8b2f1e] transition-colors duration-300">Comparative analysis across communities</p>
                            <div className="h-64 sm:h-80">
                                {mounted ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={mockCommunities}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#F6F2D4" />
                                            <XAxis dataKey="name" stroke="#A63A2B" fontSize={10} angle={-45} textAnchor="end" height={80} />
                                            <YAxis stroke="#A63A2B" fontSize={12} />
                                            <Tooltip />
                                            <Bar dataKey="members" fill="#6DD6F2" name="Members" />
                                            <Bar dataKey="interviews" fill="#F6A23A" name="Interviews" />
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

                    {/* Geographic Tab */}
                    <TabsContent value="geographic" className="space-y-4 sm:space-y-6">
                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
                            <h3 className="text-lg sm:text-xl font-bold text-[#233B54] mb-2">Global Community Distribution</h3>
                            <p className="text-[#A63A2B] mb-4 sm:mb-6 text-sm sm:text-base">Geographic spread of health communities with AI agent deployment</p>
                            <div
                                className="h-64 sm:h-80 lg:h-96 rounded-xl sm:rounded-2xl flex items-center justify-center"
                                style={{ background: 'linear-gradient(120deg, #6DD6F2 60%, #F6A23A 40%)' }}
                            >
                                <div className="text-center space-y-3 sm:space-y-4 p-4">
                                    <Globe className="h-12 w-12 sm:h-16 sm:w-16 text-[#233B54] mx-auto" />
                                    <div>
                                        <h4 className="text-lg sm:text-xl font-bold text-[#233B54]">Interactive Map Coming Soon</h4>
                                        <p className="text-[#A63A2B] max-w-md text-sm sm:text-base">
                                            Real-time visualization of community locations, game theory cycles, AI agent deployment status, and regional health trends.
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-2 justify-center">
                                        <Badge className="bg-white/80 text-[#233B54] text-xs sm:text-sm">North America: 892 members (3,3)</Badge>
                                        <Badge className="bg-white/80 text-[#233B54] text-xs sm:text-sm">Europe: 654 members (3,3)</Badge>
                                        <Badge className="bg-white/80 text-[#233B54] text-xs sm:text-sm">Global: 1,247 members (5,5)</Badge>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Contract Data Tab */}
                    <TabsContent value="contract" className="space-y-4 sm:space-y-6">
                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6">
                            <h3 className="text-lg sm:text-xl font-bold text-[#233B54] mb-2">Live Contract Information</h3>
                            <p className="text-[#A63A2B] mb-4 text-sm sm:text-base">Real-time data from Sepolia testnet with game theory implementation</p>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-[#233B54]">Contract Address</label>
                                        <div className="font-mono text-xs sm:text-sm bg-[#F6F2D4] p-3 rounded-xl break-all text-[#A63A2B]">
                                            0x9B9176569835749b3AE8D9d4F7C891fDA9DBE111
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-[#233B54]">Network</label>
                                        <div className="text-xs sm:text-sm bg-[#F6F2D4] p-3 rounded-xl text-[#A63A2B]">
                                            zkSync Sepolia Testnet
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-[#233B54]">Last Updated</label>
                                    <div className="text-xs sm:text-sm bg-[#F6F2D4] p-3 rounded-xl text-[#A63A2B]">
                                        {contractData?.lastUpdate ? new Date(contractData.lastUpdate).toLocaleString() : 'Loading...'}
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-2">
                                    <Button
                                        onClick={fetchContractData}
                                        disabled={loading}
                                        className="flex-1 bg-[#6DD6F2] hover:bg-[#5bc5e8] text-[#233B54] font-semibold text-sm sm:text-base"
                                    >
                                        <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                                        {loading ? 'Refreshing...' : 'Refresh Contract Data'}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            if (typeof window !== 'undefined') {
                                                window.open('https://sepolia.explorer.zksync.io/address/0x9B9176569835749b3AE8D9d4F7C891fDA9DBE111', '_blank');
                                            }
                                        }}
                                        className="border-[#233B54] text-[#233B54] hover:bg-[#233B54] hover:text-white text-sm sm:text-base flex-shrink-0"
                                    >
                                        <span className="hidden sm:inline">View on Explorer</span>
                                        <span className="sm:hidden">Explorer</span>
                                    </Button>
                                </div>

                                <div className="grid lg:grid-cols-2 gap-4 mt-6">
                                    <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl" style={{ background: 'linear-gradient(120deg, #6DD6F2 70%, #F6F2D4 30%)' }}>
                                        <h4 className="font-bold text-[#233B54] mb-2 text-sm sm:text-base">Current Contract Functionality</h4>
                                        <ul className="text-xs sm:text-sm text-[#A63A2B] space-y-1">
                                            <li>• User points tracking per community</li>
                                            <li>• Game theory cycle implementation (3,3/5,5)</li>
                                            <li>• Timestamp-based activity logging</li>
                                            <li>• Multi-community support</li>
                                            <li>• Bulk point updates for efficiency</li>
                                            <li>• AI agent integration framework</li>
                                        </ul>
                                    </div>

                                    <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl" style={{ background: 'linear-gradient(120deg, #F6A23A 70%, #F6F2D4 30%)' }}>
                                        <h4 className="font-bold text-[#233B54] mb-2 text-sm sm:text-base">Game Theory Features</h4>
                                        <ul className="text-xs sm:text-sm text-[#A63A2B] space-y-1">
                                            <li>• 3,3 Cooperative growth tracking</li>
                                            <li>• 5,5 Optimal collaboration rewards</li>
                                            <li>• Community DAO performance metrics</li>
                                            <li>• Transparent staking mechanisms</li>
                                            <li>• AI agent deployment status</li>
                                            <li>• Health data integration pipeline</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            <Footer />
        </main>
    );
}