'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Activity, Users, TrendingUp, Globe, Calendar, MapPin, RefreshCw, AlertCircle, Database, FileText, Microscope, Map as MapIcon } from 'lucide-react';
import { FloatingNavigation } from '@/components/floating-navigation';
import { Footer } from '@/components/footer';
import {
    fetchHealthSharedMetrics,
    formatCommunityName,
    calculateGrowth,
    determineLocation,
    determineCategory,
    getTotalInteractions,
    getRecentActiveUsers,
    getLocationCoordinates,
    type CommunityMetrics,
    type HealthSharedMetrics
} from '@/app/services/healthSharedApi';

import {
    BlockchainService,
    type CommunityBlockchainData,
    type TimelineDataPoint
} from '@/app/services/blockchainService';

interface TransformedCommunity {
    id: string;
    name: string;
    address: string;
    members: number;
    location: string;
    category: string;
    growth: number;
    status: string;
    posts: number;
    comments: number;
    activeUsersThisMonth: number;
    totalInteractions: number;
    pointsHistory: TimelineDataPoint[];
    hasBlockchainData: boolean;
    blockchainPoints: number;
    firstActivity: string;
    lastActivity: string;
    coordinates: { lat: number; lng: number };
}

export default function HealthScorecardExplorer() {
    const [communities, setCommunities] = useState<TransformedCommunity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<string>('');
    const [blockchainConnected, setBlockchainConnected] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [activityData, setActivityData] = useState<any[]>([]);
    const [globalStats, setGlobalStats] = useState({
        totalCommunities: 0,
        totalBlockchainPoints: 0,
        totalUsers: 0,
        communitiesWithBlockchainData: 0
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    const loadRealData = async () => {
        setLoading(true);
        setError(null);

        try {
            console.log(' Loading REAL data (Health-Shared API + Blockchain)...');

            const blockchain = new BlockchainService();
            const isBlockchainConnected = await blockchain.testConnection();
            setBlockchainConnected(isBlockchainConnected);

            const healthSharedData: HealthSharedMetrics = await fetchHealthSharedMetrics();
            console.log(`Health-Shared API: ${healthSharedData.metrics.communities.length} communities`);

            const communityAddresses = healthSharedData.metrics.communities.map(comm =>
                `0x${comm.communityId.split('-').pop()?.padStart(40, '0').slice(0, 40)}`
            );

            let blockchainDataMap = new Map<string, CommunityBlockchainData>();
            if (isBlockchainConnected) {
                console.log('Fetching blockchain data...');
                blockchainDataMap = await blockchain.getMultipleCommunities(communityAddresses);
                console.log(`Blockchain: ${blockchainDataMap.size} communities processed`);
            }

            const transformedCommunities: TransformedCommunity[] = healthSharedData.metrics.communities.map((comm: CommunityMetrics, index: number) => {
                const totalInteractions = getTotalInteractions(comm);
                const activeUsers = getRecentActiveUsers(comm);
                const growth = calculateGrowth(comm.activeUsersMonthly);
                const location = determineLocation(comm.communityId);
                const coordinates = getLocationCoordinates(location);

                const potentialAddress = communityAddresses[index].toLowerCase();
                const blockchainData = blockchainDataMap.get(potentialAddress);

                const hasBlockchainData = blockchainData && blockchainData.totalPoints > 0;
                const blockchainPoints = hasBlockchainData ? blockchainData.totalPoints : 0;
                const pointsHistory = hasBlockchainData ? blockchainData.pointsHistory : [];

                return {
                    id: comm.communityId,
                    name: formatCommunityName(comm.communityId),
                    address: potentialAddress,
                    members: comm.totals.members,
                    location: location,
                    category: determineCategory(comm.communityId),
                    growth: parseFloat(growth.toFixed(1)),
                    status: comm.totals.members > 0 ? 'active' : 'inactive',
                    posts: comm.totals.posts,
                    comments: comm.totals.comments,
                    activeUsersThisMonth: activeUsers,
                    totalInteractions: totalInteractions,
                    pointsHistory: pointsHistory,
                    hasBlockchainData: hasBlockchainData,
                    blockchainPoints: blockchainPoints,
                    firstActivity: hasBlockchainData && blockchainData.firstActivity > 0
                        ? new Date(blockchainData.firstActivity * 1000).toLocaleDateString()
                        : 'No data',
                    lastActivity: hasBlockchainData && blockchainData.lastActivity > 0
                        ? new Date(blockchainData.lastActivity * 1000).toLocaleDateString()
                        : 'No data',
                    coordinates: coordinates
                };
            });

            transformedCommunities.sort((a, b) => b.members - a.members);

            const stats = {
                totalCommunities: transformedCommunities.length,
                totalBlockchainPoints: transformedCommunities.reduce((sum, c) => sum + c.blockchainPoints, 0),
                totalUsers: transformedCommunities.reduce((sum, c) => sum + c.members, 0),
                communitiesWithBlockchainData: transformedCommunities.filter(c => c.hasBlockchainData).length
            };

            // Global timeline from blockchain data only
            const allTimelinePoints = transformedCommunities
                .filter(c => c.pointsHistory.length > 0)
                .flatMap(c => c.pointsHistory);

            const globalTimelineMap = new Map<string, { points: number }>();
            allTimelinePoints.forEach(point => {
                if (!globalTimelineMap.has(point.date)) {
                    globalTimelineMap.set(point.date, { points: 0 });
                }
                const dayData = globalTimelineMap.get(point.date)!;
                dayData.points += point.points;
            });

            const timeline = Array.from(globalTimelineMap.entries())
                .map(([date, data]) => ({
                    date: new Date(date).toLocaleDateString('en', { month: 'short', day: 'numeric' }),
                    points: data.points
                }))
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .slice(-30);

            setCommunities(transformedCommunities);
            setGlobalStats(stats);
            setActivityData(timeline);
            setLastUpdated(healthSharedData.generatedAt);

            console.log('Data loaded successfully');
            console.log('Stats:', stats);

        } catch (err) {
            console.error('Error loading data:', err);
            setError('Failed to load community data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRealData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#233B54] via-[#6DD6F2]/20 to-[#F6A23A]/20 flex items-center justify-center">
                <div className="text-center">
                    <RefreshCw className="h-12 w-12 animate-spin text-[#6DD6F2] mx-auto mb-4" />
                    <p className="text-white text-lg">Loading real data...</p>
                    <p className="text-[#6DD6F2] text-sm mt-2">Health-Shared API + zkSync Sepolia blockchain</p>
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
                        <Button onClick={loadRealData}>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Retry
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-white text-gray-900 font-body">
            <FloatingNavigation />

            <section className="w-full min-h-[350px] sm:min-h-[400px] lg:min-h-[450px] relative flex flex-col justify-center items-center overflow-hidden pt-12 sm:pt-16">
                <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(120deg, #6DD6F2 60%, #F6A23A 40%)' }} />
                <div className="relative z-10 p-4 sm:p-8 lg:p-12 flex flex-col items-center w-full max-w-7xl mx-auto">

                    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center tracking-tight mb-3 sm:mb-4 text-[#233B54] drop-shadow-lg px-2">
                        Health Scorecard Explorer
                    </h1>

                    <p className="text-sm sm:text-base text-[#233B54] text-center max-w-2xl mb-6">
                        Real-time community health metrics powered by blockchain transparency
                    </p>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 w-full max-w-5xl mb-6 sm:mb-8 px-2">
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                            <Globe className="h-6 w-6 sm:h-8 sm:w-8 text-[#6DD6F2] mx-auto mb-1 sm:mb-2" />
                            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#233B54]">{globalStats.totalCommunities}</div>
                            <div className="text-xs sm:text-sm text-[#A63A2B] font-medium">Communities</div>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                            <Users className="h-6 w-6 sm:h-8 sm:w-8 text-[#A06A8C] mx-auto mb-1 sm:mb-2" />
                            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#233B54]">{globalStats.totalUsers.toLocaleString()}</div>
                            <div className="text-xs sm:text-sm text-[#A63A2B] font-medium">Active Members</div>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                            <Database className="h-6 w-6 sm:h-8 sm:w-8 text-[#A63A2B] mx-auto mb-1 sm:mb-2" />
                            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#233B54]">{globalStats.communitiesWithBlockchainData}</div>
                            <div className="text-xs sm:text-sm text-[#A63A2B] font-medium">With Blockchain Data</div>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                            <Activity className="h-6 w-6 sm:h-8 sm:w-8 text-[#F6A23A] mx-auto mb-1 sm:mb-2" />
                            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#233B54]">{globalStats.totalBlockchainPoints.toLocaleString()}</div>
                            <div className="text-xs sm:text-sm text-[#A63A2B] font-medium">Blockchain Points</div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 mb-6">
                {blockchainConnected && globalStats.totalBlockchainPoints === 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
                        <div className="flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-yellow-600" />
                            <div>
                                <p className="font-semibold text-yellow-800">No blockchain data available yet</p>
                                <p className="text-xs text-yellow-700">
                                    Connected to zkSync Sepolia (0x9B91...E111) but no PointsAdded events found. Displaying Health-Shared API data only.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <Database className="w-5 h-5 text-green-600" />
                            <div>
                                <p className="font-semibold text-green-800">Real Data Sources Active</p>
                                <p className="text-xs text-green-700">
                                    Health-Shared API + zkSync Sepolia Blockchain
                                </p>
                            </div>
                        </div>
                        <Button size="sm" variant="outline" onClick={loadRealData} className="gap-2">
                            <RefreshCw className="h-3 w-3" />
                            Refresh
                        </Button>
                    </div>
                    <p className="text-xs text-green-600">
                        Last updated: {new Date(lastUpdated).toLocaleString()} •
                        {globalStats.communitiesWithBlockchainData} with blockchain • {globalStats.totalBlockchainPoints.toLocaleString()} on-chain points
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 pb-12 sm:pb-16 space-y-6 sm:space-y-8">
                <Tabs defaultValue="communities" className="space-y-4 sm:space-y-6">
                    <TabsList className="w-full bg-white/80 rounded-xl p-1 sm:p-2 shadow-lg h-auto grid grid-cols-4 gap-1">
                        <TabsTrigger value="communities" className="rounded-lg data-[state=active]:bg-[#6DD6F2] text-xs sm:text-sm">Communities</TabsTrigger>
                        <TabsTrigger value="map" className="rounded-lg data-[state=active]:bg-[#F6A23A] text-xs sm:text-sm">Global Map</TabsTrigger>
                        <TabsTrigger value="research" className="rounded-lg data-[state=active]:bg-[#A06A8C] text-xs sm:text-sm">Research</TabsTrigger>
                        <TabsTrigger value="analytics" className="rounded-lg data-[state=active]:bg-[#A63A2B] text-xs sm:text-sm">Analytics</TabsTrigger>
                    </TabsList>

                    <TabsContent value="communities" className="space-y-4 sm:space-y-6">
                        {communities.map((community) => (
                            <div key={community.id} className="rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8" style={{ background: 'linear-gradient(120deg, #6DD6F2 70%, #F6F2D4 30%)' }}>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#233B54] mb-1">{community.name}</h3>
                                        <p className="text-xs text-[#A63A2B]">{community.category} • {community.location}</p>
                                    </div>
                                    <div className="flex gap-2 flex-wrap">
                                        <Badge className="bg-white/80 text-[#233B54] text-xs">{community.status}</Badge>
                                        {community.hasBlockchainData && (
                                            <Badge className="bg-green-500 text-white text-xs">Blockchain Active</Badge>
                                        )}
                                    </div>
                                </div>

                                {!community.hasBlockchainData && (
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                                        <p className="text-xs text-blue-800 font-semibold">No blockchain data available yet for this community</p>
                                        <p className="text-xs text-blue-700 mt-1">Showing verified Health-Shared API metrics only. Blockchain integration ready - awaiting community wallet address.</p>
                                    </div>
                                )}

                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-4">
                                    <div className="bg-white/60 rounded-xl p-3 text-center hover:bg-white/80 transition-all">
                                        <Users className="h-5 w-5 text-[#233B54] mx-auto mb-1" />
                                        <div className="text-lg font-bold text-[#233B54]">{community.members.toLocaleString()}</div>
                                        <div className="text-xs text-[#A63A2B]">Members</div>
                                    </div>
                                    <div className="bg-white/60 rounded-xl p-3 text-center hover:bg-white/80 transition-all">
                                        <Activity className="h-5 w-5 text-[#233B54] mx-auto mb-1" />
                                        <div className="text-lg font-bold text-[#233B54]">{community.posts}</div>
                                        <div className="text-xs text-[#A63A2B]">Posts</div>
                                    </div>
                                    <div className="bg-white/60 rounded-xl p-3 text-center hover:bg-white/80 transition-all">
                                        <FileText className="h-5 w-5 text-[#233B54] mx-auto mb-1" />
                                        <div className="text-lg font-bold text-[#233B54]">{community.comments}</div>
                                        <div className="text-xs text-[#A63A2B]">Comments</div>
                                    </div>
                                    <div className="bg-white/60 rounded-xl p-3 text-center hover:bg-white/80 transition-all">
                                        <TrendingUp className="h-5 w-5 text-[#233B54] mx-auto mb-1" />
                                        <div className="text-lg font-bold text-[#233B54]">{community.growth > 0 ? '+' : ''}{community.growth}%</div>
                                        <div className="text-xs text-[#A63A2B]">Growth</div>
                                    </div>
                                </div>

                                {community.hasBlockchainData && community.pointsHistory.length > 0 && (
                                    <div className="bg-white/80 rounded-xl p-4 mt-4">
                                        <h4 className="font-semibold text-[#233B54] mb-3 flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            Blockchain Points Over Time (Real On-Chain Data)
                                        </h4>
                                        <div className="h-48">
                                            {mounted && (
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <LineChart data={community.pointsHistory}>
                                                        <CartesianGrid strokeDasharray="3 3" stroke="#F6F2D4" />
                                                        <XAxis dataKey="date" stroke="#A63A2B" fontSize={10} angle={-45} textAnchor="end" height={60} />
                                                        <YAxis stroke="#A63A2B" fontSize={10} />
                                                        <Tooltip />
                                                        <Line type="monotone" dataKey="points" stroke="#6DD6F2" strokeWidth={3} name="Points" dot={{ fill: '#6DD6F2', r: 4 }} />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            )}
                                        </div>
                                        <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                                            <div className="bg-green-50 rounded p-2 text-center">
                                                <p className="text-green-800 font-semibold">{community.blockchainPoints.toLocaleString()}</p>
                                                <p className="text-green-600">Total Points</p>
                                            </div>
                                            <div className="bg-blue-50 rounded p-2 text-center">
                                                <p className="text-blue-800 font-semibold">{community.firstActivity}</p>
                                                <p className="text-blue-600">First Activity</p>
                                            </div>
                                            <div className="bg-purple-50 rounded p-2 text-center">
                                                <p className="text-purple-800 font-semibold">{community.lastActivity}</p>
                                                <p className="text-purple-600">Last Activity</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4 text-[#233B54]" />
                                        <span className="text-xs sm:text-sm text-[#233B54]">{community.location}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </TabsContent>

                    <TabsContent value="map" className="space-y-4">
                        <Card className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <MapIcon className="h-6 w-6 text-[#6DD6F2]" />
                                <h3 className="text-xl font-bold text-[#233B54]">Global Community Distribution</h3>
                            </div>

                            <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center mb-4">
                                <p className="text-gray-500">Interactive map showing community locations</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-white rounded-lg border p-4">
                                    <h4 className="font-semibold mb-3">Communities by Location</h4>
                                    {Object.entries(
                                        communities.reduce((acc, c) => {
                                            acc[c.location] = (acc[c.location] || 0) + 1;
                                            return acc;
                                        }, {} as Record<string, number>)
                                    ).map(([location, count]) => (
                                        <div key={location} className="flex justify-between py-2 border-b">
                                            <span className="text-sm">{location}</span>
                                            <Badge variant="outline">{count} communities</Badge>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-white rounded-lg border p-4">
                                    <h4 className="font-semibold mb-3">Total Members by Region</h4>
                                    {Object.entries(
                                        communities.reduce((acc, c) => {
                                            acc[c.location] = (acc[c.location] || 0) + c.members;
                                            return acc;
                                        }, {} as Record<string, number>)
                                    ).map(([location, members]) => (
                                        <div key={location} className="flex justify-between py-2 border-b">
                                            <span className="text-sm">{location}</span>
                                            <Badge variant="outline">{members.toLocaleString()} members</Badge>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </TabsContent>

                    <TabsContent value="research" className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <Card className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <FileText className="h-6 w-6 text-[#A06A8C]" />
                                    <h3 className="text-xl font-bold text-[#233B54]">EHR Records</h3>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4 text-center">
                                    <Database className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                                    <p className="text-gray-600 text-sm mb-3">Electronic Health Records tracking coming soon</p>
                                    <p className="text-xs text-gray-500">Backend API endpoint required</p>
                                </div>
                                <div className="mt-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Members with EHR:</span>
                                        <span className="font-semibold">Pending</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Records linked:</span>
                                        <span className="font-semibold">Pending</span>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <Users className="h-6 w-6 text-[#A06A8C]" />
                                    <h3 className="text-xl font-bold text-[#233B54]">Research Participation</h3>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4 text-center">
                                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                                    <p className="text-gray-600 text-sm mb-3">Research consent tracking coming soon</p>
                                    <p className="text-xs text-gray-500">Backend data integration required</p>
                                </div>
                                <div className="mt-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Open to research:</span>
                                        <span className="font-semibold">Pending</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Active participants:</span>
                                        <span className="font-semibold">Pending</span>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        <Card className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Microscope className="h-6 w-6 text-[#6DD6F2]" />
                                <h3 className="text-xl font-bold text-[#233B54]">Drug Trial Recruitment</h3>
                            </div>

                            <div className="bg-gradient-to-r from-[#6DD6F2]/10 to-[#F6A23A]/10 rounded-lg p-6 mb-4">
                                <h4 className="font-semibold text-[#233B54] mb-2">How It Works</h4>
                                <ol className="space-y-2 text-sm text-gray-700">
                                    <li className="flex items-start gap-2">
                                        <span className="font-bold text-[#6DD6F2]">1.</span>
                                        <span>Pharma companies propose trials with incentive amounts</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="font-bold text-[#6DD6F2]">2.</span>
                                        <span>AI agents match eligible participants from health scorecards</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="font-bold text-[#6DD6F2]">3.</span>
                                        <span>Smart contracts distribute payments automatically (30/25/25/20 split)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="font-bold text-[#6DD6F2]">4.</span>
                                        <span>Transparent, blockchain-verified recruitment and compensation</span>
                                    </li>
                                </ol>
                            </div>

                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <p className="text-sm text-yellow-800 mb-2 font-semibold">Feature in Development</p>
                                <p className="text-xs text-yellow-700">
                                    Drug trial recruitment functionality requires backend integration with smart contracts for donor stakeholder proposals,
                                    AI agent permissioning, and automated payment distribution.
                                </p>
                            </div>
                        </Card>
                    </TabsContent>

                    <TabsContent value="analytics" className="space-y-4 sm:space-y-6">
                        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
                            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
                                <h3 className="text-xl font-bold text-[#233B54] mb-2">Blockchain Activity Timeline</h3>
                                <p className="text-[#A63A2B] mb-4 text-sm">Real on-chain points over time</p>
                                <div className="h-64 sm:h-80">
                                    {mounted && activityData.length > 0 ? (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={activityData}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#F6F2D4" />
                                                <XAxis dataKey="date" stroke="#A63A2B" fontSize={12} angle={-45} textAnchor="end" height={80} />
                                                <YAxis stroke="#A63A2B" fontSize={12} />
                                                <Tooltip />
                                                <Line type="monotone" dataKey="points" stroke="#6DD6F2" strokeWidth={2} name="Points" />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <div className="h-full flex items-center justify-center bg-gray-100 rounded-lg">
                                            <div className="text-center">
                                                <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                                                <p className="text-gray-500">No blockchain data available yet</p>
                                                <p className="text-xs text-gray-400 mt-1">Waiting for PointsAdded events on zkSync Sepolia</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
                                <h3 className="text-xl font-bold text-[#233B54] mb-2">Community Categories</h3>
                                <p className="text-[#A63A2B] mb-4 text-sm">Distribution by health focus</p>
                                <div className="space-y-3">
                                    {Object.entries(
                                        communities.reduce((acc, c) => {
                                            acc[c.category] = (acc[c.category] || 0) + 1;
                                            return acc;
                                        }, {} as Record<string, number>)
                                    ).map(([category, count]) => (
                                        <div key={category} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full bg-[#6DD6F2]" />
                                                <span className="text-sm">{category}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-[#6DD6F2] h-2 rounded-full"
                                                        style={{ width: `${(count / communities.length) * 100}%` }}
                                                    />
                                                </div>
                                                <span className="text-sm font-semibold w-8 text-right">{count}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
                            <h3 className="text-xl font-bold text-[#233B54] mb-2">Top Communities by Engagement</h3>
                            <p className="text-[#A63A2B] mb-4 text-sm">Ranked by member activity</p>
                            <div className="h-80">
                                {mounted ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={communities.slice(0, 8)}>
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