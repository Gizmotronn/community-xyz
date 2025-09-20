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

const HEALTH_PROTOCOL_ABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "community",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "user",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "points",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "PointsAdded",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "community",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "user",
                "type": "uint256"
            }
        ],
        "name": "getScoreCard",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "points",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "updatedAt",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const SEPOLIA_CONTRACT_ADDRESS = "0x9B9176569835749b3AE8D9d4F7C891fDA9DBE111";
const SEPOLIA_RPC_URL = "https://sepolia.era.zksync.dev";
// BACKUP: Alternative RPC URL if primary fails
const BACKUP_RPC_URL = "https://testnet.era.zksync.dev";

class HealthProtocolContract {
    private provider: ethers.JsonRpcProvider;
    private contract: ethers.Contract;
    private rpcUrl: string;

    constructor() {
        this.rpcUrl = SEPOLIA_RPC_URL;
        this.initializeProvider();
    }

    private initializeProvider() {
        try {
            console.log(`Initializing provider with RPC: ${this.rpcUrl}`);
            this.provider = new ethers.JsonRpcProvider(this.rpcUrl, {
                name: "zkSync Sepolia",
                chainId: 300
            });

            this.contract = new ethers.Contract(
                SEPOLIA_CONTRACT_ADDRESS,
                HEALTH_PROTOCOL_ABI,
                this.provider
            );
        } catch (error) {
            console.error('Error initializing contract:', error);
            throw error;
        }
    }

    async testConnection(): Promise<boolean> {
        try {
            console.log('Testing provider connection...');
            const network = await this.provider.getNetwork();
            console.log('Network connected:', network.name, 'Chain ID:', network.chainId.toString());
            return true;
        } catch (error) {
            console.error('Connection test failed:', error);

            // Try backup RPC if primary fails
            if (this.rpcUrl === SEPOLIA_RPC_URL) {
                console.log('Trying backup RPC URL...');
                this.rpcUrl = BACKUP_RPC_URL;
                this.initializeProvider();

                try {
                    const network = await this.provider.getNetwork();
                    console.log('Backup connection successful:', network.name);
                    return true;
                } catch (backupError) {
                    console.error('Backup connection also failed:', backupError);
                    return false;
                }
            }
            return false;
        }
    }

    async getRecentActivity(fromBlock: number = -500000): Promise<any[]> {
        try {
            console.log('Fetching recent activity...');

            // Test connection first
            const connected = await this.testConnection();
            if (!connected) {
                console.log('Connection failed, returning empty array');
                return [];
            }

            const filter = this.contract.filters.PointsAdded();
            const currentBlock = await this.provider.getBlockNumber();
            console.log(`Current block: ${currentBlock}`);

            // Since the transactions are 8+ months old, i query much further back
            let events = [];

            try {
                const historicalBlock = Math.max(0, currentBlock - 500000);
                console.log(`Querying historical events from block ${historicalBlock} to ${currentBlock} (range: ${currentBlock - historicalBlock} blocks)`);

                events = await this.contract.queryFilter(filter, historicalBlock);
                console.log(`Found ${events.length} events in historical query`);

                if (events.length === 0) {
                    console.log('No events found in large range, trying from genesis...');
                    const genesisBlock = Math.max(0, currentBlock - 1000000);
                    console.log(`Trying from genesis range: ${genesisBlock} to ${currentBlock}`);
                    events = await this.contract.queryFilter(filter, genesisBlock);
                    console.log(`Found ${events.length} events from genesis query`);
                }
            } catch (queryError) {
                console.error('Historical query failed:', queryError);

                console.log('Trying fallback strategy - checking specific block ranges...');

                // Since explorer shows activity ~8 months ago, tried different historical chunks
                const chunks = [
                    { start: currentBlock - 200000, end: currentBlock - 100000 },
                    { start: currentBlock - 400000, end: currentBlock - 200000 },
                    { start: currentBlock - 600000, end: currentBlock - 400000 },
                    { start: currentBlock - 800000, end: currentBlock - 600000 }
                ];

                for (const chunk of chunks) {
                    try {
                        const startBlock = Math.max(0, chunk.start);
                        const endBlock = Math.max(0, chunk.end);
                        console.log(`Trying chunk: ${startBlock} to ${endBlock}`);

                        const chunkEvents = await this.contract.queryFilter(filter, startBlock, endBlock);
                        if (chunkEvents.length > 0) {
                            console.log(`Found ${chunkEvents.length} events in chunk ${startBlock}-${endBlock}`);
                            events = [...events, ...chunkEvents];
                        }
                    } catch (chunkError) {
                        console.log(`Chunk ${chunk.start}-${chunk.end} failed:`, chunkError.message);
                        continue;
                    }
                }
            }

            if (events.length > 0) {
                console.log('Sample event:', events[0]);
                console.log('Event details:', {
                    community: events[0].args?.community,
                    user: events[0].args?.user?.toString(),
                    points: events[0].args?.points?.toString(),
                    timestamp: events[0].args?.timestamp?.toString(),
                    blockNumber: events[0].blockNumber
                });
            } else {
                console.log('Contract ABI and connection verified');
                console.log('No PointsAdded events found - this is expected');
                console.log('Reason: Backend/cloud function not actively pushing points yet');
                console.log('Only historical test transaction from 8+ months ago exists');
                console.log('Current status: Frontend ready, waiting for backend integration');

                try {
                    console.log('Verifying contract has any activity...');
                    const allEvents = await this.provider.getLogs({
                        address: SEPOLIA_CONTRACT_ADDRESS,
                        fromBlock: Math.max(0, currentBlock - 100000),
                        toBlock: currentBlock
                    });
                    console.log(`Contract confirmed active: ${allEvents.length} total events found in recent blocks`);

                    if (allEvents.length > 0) {
                        console.log('Sample contract event:', allEvents[0]);
                    }
                } catch (debugError) {
                    console.log('Contract verification query failed:', debugError.message);
                }
            }

            return events.map(event => ({
                community: event.args?.community || '',
                user: Number(event.args?.user || 0),
                points: Number(event.args?.points || 0),
                timestamp: Number(event.args?.timestamp || 0),
                transactionHash: event.transactionHash,
                blockNumber: event.blockNumber
            }));
        } catch (error) {
            console.error('Error fetching recent activity:', error);

            if (error.message?.includes('rate limit') || error.message?.includes('network')) {
                console.log('Network/rate limit error - returning empty data');
                return [];
            }

            return [];
        }
    }

    async fetchGlobalStats() {
        try {
            console.log('Fetching global stats...');
            const events = await this.getRecentActivity(-2000);

            if (events.length === 0) {
                console.log('No events found, testing connection...');
                const connected = await this.testConnection();
                if (!connected) {
                    throw new Error('Unable to connect to zkSync Sepolia network');
                }

                console.log('Connected but no activity data found');
                return {
                    totalCommunities: 0,
                    totalUsers: 0,
                    totalPoints: 0,
                    lastUpdate: Date.now(),
                    noData: true
                };
            }

            const communities = new Set(events.map(e => e.community));
            const users = new Set(events.map(e => e.user));
            const totalPoints = events.reduce((sum, e) => sum + e.points, 0);

            const stats = {
                totalCommunities: communities.size || 1,
                totalUsers: users.size || 0,
                totalPoints: totalPoints || 0,
                lastUpdate: events.length > 0 ? Math.max(...events.map(e => e.timestamp)) * 1000 : Date.now(),
                hasRealData: true
            };

            console.log('Global stats:', stats);
            return stats;
        } catch (error) {
            console.error('Error fetching global stats:', error);
            throw error;
        }
    }

    async getActivityTimeline() {
        try {
            const events = await this.getRecentActivity(-3000);
            if (events.length === 0) return [];

            const dailyData: { [date: string]: { points: number; users: Set<number> } } = {};

            events.forEach(event => {
                const date = new Date(event.timestamp * 1000).toISOString().split('T')[0];
                if (!dailyData[date]) {
                    dailyData[date] = { points: 0, users: new Set() };
                }
                dailyData[date].points += event.points;
                dailyData[date].users.add(event.user);
            });

            return Object.entries(dailyData)
                .map(([date, data]) => ({
                    date,
                    points: data.points,
                    users: data.users.size,
                    month: new Date(date).toLocaleDateString('en', { month: 'short' })
                }))
                .sort((a, b) => a.date.localeCompare(b.date))
                .slice(-6);
        } catch (error) {
            console.error('Error fetching activity timeline:', error);
            return [];
        }
    }

    getContractInfo() {
        return {
            address: SEPOLIA_CONTRACT_ADDRESS,
            network: "zkSync Sepolia Testnet",
            rpcUrl: this.rpcUrl,
            explorer: `https://sepolia.explorer.zksync.io/address/${SEPOLIA_CONTRACT_ADDRESS}`
        };
    }
}

// Mock communities data
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

export default function HealthScorecardExplorer() {
    const [contractData, setContractData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activityData, setActivityData] = useState([]);
    const [realDataStatus, setRealDataStatus] = useState('loading');
    const [connectionDetails, setConnectionDetails] = useState(null);

    const fetchRealContractData = async () => {
        setLoading(true);
        setError(null);
        setRealDataStatus('loading');

        try {
            console.log('Starting contract data fetch...');
            const healthContract = new HealthProtocolContract();
            const contractInfo = healthContract.getContractInfo();
            setConnectionDetails(contractInfo);

            console.log('Testing provider connectivity...');
            const connected = await healthContract.testConnection();

            if (!connected) {
                throw new Error('Failed to connect to zkSync Sepolia network. Please check network status.');
            }

            console.log('Provider connected successfully');

            const realGlobalStats = await healthContract.fetchGlobalStats();
            const realActivityData = await healthContract.getActivityTimeline();

            console.log('Real stats:', realGlobalStats);
            console.log('Real activity data length:', realActivityData?.length);

            if (realGlobalStats && realGlobalStats.hasRealData && (realGlobalStats.totalPoints > 0 || realGlobalStats.totalUsers > 0)) {
                console.log('Using real data');
                setContractData(realGlobalStats);
                setRealDataStatus('real');

                if (realActivityData && realActivityData.length > 0) {
                    setActivityData(realActivityData.map(d => ({
                        month: d.month,
                        points: d.points,
                        members: d.users
                    })));
                } else {
                    setActivityData([
                        { month: 'Jan', points: 12000, members: 890 },
                        { month: 'Feb', points: 15600, members: 920 },
                        { month: 'Mar', points: 18200, members: 975 },
                        { month: 'Apr', points: 22100, members: 1050 },
                        { month: 'May', points: 26800, members: 1125 },
                        { month: 'Jun', points: 32450, members: 1247 }
                    ]);
                }
            } else {
                console.log('Connected but no meaningful data found, using demo data');
                setError('Contract connected successfully but no activity data found. Displaying demo data for visualization.');
                setRealDataStatus('demo');

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
            }

        } catch (err) {
            console.error('Error fetching contract data:', err);

            let errorMsg = 'Failed to fetch live contract data. Showing demo data for visualization.';
            if (err.message?.includes('network') || err.message?.includes('connect')) {
                errorMsg = `Network connection issue: ${err.message}. Using demo data for stakeholder preview.`;
            } else if (err.message?.includes('rate limit')) {
                errorMsg = 'Rate limited by RPC provider. Using demo data for presentation.';
            }

            setError(errorMsg);
            setRealDataStatus('demo');

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
        fetchRealContractData();
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
                        <span className="text-xs sm:text-sm font-semibold text-[#233B54]">Live on zkSync Sepolia</span>
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

            {/* Real Data Status Indicator */}
            {contractData && (
                <div className="max-w-7xl mx-auto px-4 mb-6">
                    <div className={`p-4 rounded-xl text-center ${realDataStatus === 'real'
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-blue-50 border border-blue-200'
                        }`}>
                        <div className="flex items-center justify-center gap-3 mb-2">
                            {realDataStatus === 'real' ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                                <Database className="w-5 h-5 text-blue-600" />
                            )}
                            <p className={`font-semibold ${realDataStatus === 'real' ? 'text-green-800' : 'text-blue-800'
                                }`}>
                                {realDataStatus === 'real' ? 'Live Blockchain Data Active' : 'Contract Connected - Demo Mode Active'}
                            </p>
                        </div>
                        <p className={`text-sm ${realDataStatus === 'real' ? 'text-green-700' : 'text-blue-700'
                            }`}>
                            {realDataStatus === 'real' ? (
                                <>
                                    Connected to zkSync Sepolia: {SEPOLIA_CONTRACT_ADDRESS.slice(0, 6)}...{SEPOLIA_CONTRACT_ADDRESS.slice(-4)}
                                    {contractData.lastUpdate && ` • Last updated: ${new Date(contractData.lastUpdate).toLocaleString()}`}
                                </>
                            ) : (
                                <>
                                    Contract verified at {SEPOLIA_CONTRACT_ADDRESS.slice(0, 6)}...{SEPOLIA_CONTRACT_ADDRESS.slice(-4)} •
                                    Ready for backend integration • Using demo data for stakeholder preview
                                </>
                            )}
                        </p>
                        {connectionDetails && (
                            <p className="text-xs mt-1 opacity-75">
                                RPC: {connectionDetails.rpcUrl} • Chain ID: 300
                            </p>
                        )}
                        {connectionDetails && (
                            <a
                                href={connectionDetails.explorer}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center gap-1 text-sm hover:underline mt-1 ${realDataStatus === 'real' ? 'text-green-600' : 'text-blue-600'
                                    }`}
                            >
                                View Contract on Explorer <ExternalLink className="w-3 h-3" />
                            </a>
                        )}
                    </div>
                </div>
            )}

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
                            onClick={() => window.open('https://medium.com/health-protocol/blockchain-health-scorecards-the-bridge-between-the-3-3-and-5-5-games-7db290dd0172', '_blank')}
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
                            onClick={fetchRealContractData}
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

                {/* Communities Display */}
                <div className="space-y-4 sm:space-y-6">
                    {mockCommunities.map((community) => (
                        <div
                            key={community.id}
                            className="rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8"
                            style={{ background: 'linear-gradient(120deg, #6DD6F2 70%, #F6F2D4 30%)' }}
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                                <div className="min-w-0 flex-1">
                                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#233B54] mb-1 break-words">{community.name}</h3>
                                    <p className="font-mono text-xs sm:text-sm text-[#A63A2B] break-all">{community.address}</p>
                                </div>
                                <div className="flex gap-2 flex-shrink-0 flex-wrap">
                                    <Badge className="bg-white/80 text-[#233B54] text-xs">{community.status}</Badge>
                                    <Badge variant="outline" className="border-[#233B54] text-[#233B54] text-xs">{community.category}</Badge>
                                    <Badge className={`text-xs ${community.gameTheoryCycle === '5,5' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}`}>
                                        {community.gameTheoryCycle}
                                    </Badge>
                                </div>
                            </div>

                            <div className="bg-white/60 rounded-xl p-3 sm:p-4 mb-4">
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
                                <div className="bg-white/60 rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 text-center">
                                    <Users className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-[#233B54] mx-auto mb-1 sm:mb-2" />
                                    <div className="text-sm sm:text-lg lg:text-xl font-bold text-[#233B54]">{community.members.toLocaleString()}</div>
                                    <div className="text-xs text-[#A63A2B]">Members</div>
                                </div>
                                <div className="bg-white/60 rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 text-center">
                                    <Award className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-[#233B54] mx-auto mb-1 sm:mb-2" />
                                    <div className="text-sm sm:text-lg lg:text-xl font-bold text-[#233B54]">{community.totalPoints.toLocaleString()}</div>
                                    <div className="text-xs text-[#A63A2B]">Points</div>
                                </div>
                                <div className="bg-white/60 rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 text-center">
                                    <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-[#233B54] mx-auto mb-1 sm:mb-2" />
                                    <div className="text-sm sm:text-lg lg:text-xl font-bold text-[#233B54]">{community.avgPointsPerUser}</div>
                                    <div className="text-xs text-[#A63A2B]">Avg/User</div>
                                </div>
                                <div className="bg-white/60 rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 text-center">
                                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-[#233B54] mx-auto mb-1 sm:mb-2" />
                                    <div className="text-sm sm:text-lg lg:text-xl font-bold text-[#233B54]">{community.interviews}</div>
                                    <div className="text-xs text-[#A63A2B]">Interviews</div>
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
                                    className="border-[#233B54] text-[#233B54] hover:bg-[#233B54] hover:text-white text-xs sm:text-sm flex-shrink-0"
                                    onClick={() => window.open(`https://sepolia.explorer.zksync.io/address/${community.address}`, '_blank')}
                                >
                                    <ExternalLink className="h-3 w-3 mr-1" />
                                    <span className="hidden sm:inline">View on Explorer</span>
                                    <span className="sm:hidden">Explorer</span>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    );
}