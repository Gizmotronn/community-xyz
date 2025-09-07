import { ethers } from 'ethers';

const HEALTH_PROTOCOL_ABI = [
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
            },
            {
                "internalType": "uint256",
                "name": "points",
                "type": "uint256"
            }
        ],
        "name": "addPoints",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "community",
                "type": "address"
            },
            {
                "internalType": "uint256[]",
                "name": "users",
                "type": "uint256[]"
            },
            {
                "internalType": "uint256[]",
                "name": "points",
                "type": "uint256[]"
            }
        ],
        "name": "bulkAddPoints",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
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
    },
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
    }
];

const SEPOLIA_CONTRACT_ADDRESS = "0x9B9176569835749b3AE8D9d4F7C891fDA9DBE111";
const SEPOLIA_RPC_URL = "https://sepolia.era.zksync.dev";

export interface ScoreCard {
    points: number;
    updatedAt: number;
}

export interface PointsAddedEvent {
    community: string;
    user: number;
    points: number;
    timestamp: number;
    transactionHash: string;
}

export class HealthProtocolContract {
    private provider: ethers.JsonRpcProvider;
    private contract: ethers.Contract;

    constructor() {
        this.provider = new ethers.JsonRpcProvider(SEPOLIA_RPC_URL);
        this.contract = new ethers.Contract(
            SEPOLIA_CONTRACT_ADDRESS,
            HEALTH_PROTOCOL_ABI,
            this.provider
        );
    }

    async getScoreCard(communityAddress: string, userId: number): Promise<ScoreCard> {
        try {
            const result = await this.contract.getScoreCard(communityAddress, userId);
            return {
                points: Number(result[0]),
                updatedAt: Number(result[1])
            };
        } catch (error) {
            console.error('Error fetching scorecard:', error);
            throw error;
        }
    }

    async getRecentActivity(fromBlock: number = -1000): Promise<PointsAddedEvent[]> {
        try {
            const filter = this.contract.filters.PointsAdded();
            const events = await this.contract.queryFilter(filter, fromBlock);

            return events.map(event => ({
                community: event.args?.community || '',
                user: Number(event.args?.user || 0),
                points: Number(event.args?.points || 0),
                timestamp: Number(event.args?.timestamp || 0),
                transactionHash: event.transactionHash
            }));
        } catch (error) {
            console.error('Error fetching recent activity:', error);
            return [];
        }
    }

    async getCommunityTotalPoints(communityAddress: string): Promise<number> {
        try {
            const events = await this.getRecentActivity();
            const communityEvents = events.filter(
                event => event.community.toLowerCase() === communityAddress.toLowerCase()
            );

            return communityEvents.reduce((total, event) => total + event.points, 0);
        } catch (error) {
            console.error('Error calculating community total points:', error);
            return 0;
        }
    }

    async getCommunityMemberCount(communityAddress: string): Promise<number> {
        try {
            const events = await this.getRecentActivity();
            const communityEvents = events.filter(
                event => event.community.toLowerCase() === communityAddress.toLowerCase()
            );

            const uniqueUsers = new Set(communityEvents.map(event => event.user));
            return uniqueUsers.size;
        } catch (error) {
            console.error('Error calculating community member count:', error);
            return 0;
        }
    }

    async getActivityTimeline(communityAddress?: string): Promise<Array<{
        date: string;
        points: number;
        users: number;
    }>> {
        try {
            const events = await this.getRecentActivity();
            let filteredEvents = events;

            if (communityAddress) {
                filteredEvents = events.filter(
                    event => event.community.toLowerCase() === communityAddress.toLowerCase()
                );
            }

            const dailyData: { [date: string]: { points: number; users: Set<number> } } = {};

            filteredEvents.forEach(event => {
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
                    users: data.users.size
                }))
                .sort((a, b) => a.date.localeCompare(b.date));

        } catch (error) {
            console.error('Error fetching activity timeline:', error);
            return [];
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

export function useHealthProtocolContract() {
    const contract = new HealthProtocolContract();

    const fetchScoreCard = async (communityAddress: string, userId: number) => {
        return await contract.getScoreCard(communityAddress, userId);
    };

    const fetchCommunityStats = async (communityAddress: string) => {
        const [totalPoints, memberCount, timeline] = await Promise.all([
            contract.getCommunityTotalPoints(communityAddress),
            contract.getCommunityMemberCount(communityAddress),
            contract.getActivityTimeline(communityAddress)
        ]);

        return {
            totalPoints,
            memberCount,
            timeline,
            avgPointsPerUser: memberCount > 0 ? Math.round(totalPoints / memberCount) : 0
        };
    };

    const fetchGlobalStats = async () => {
        const [events, timeline] = await Promise.all([
            contract.getRecentActivity(),
            contract.getActivityTimeline()
        ]);

        const communities = new Set(events.map(e => e.community));
        const users = new Set(events.map(e => e.user));
        const totalPoints = events.reduce((sum, e) => sum + e.points, 0);

        return {
            totalCommunities: communities.size,
            totalUsers: users.size,
            totalPoints,
            timeline,
            lastUpdate: events.length > 0 ?
                Math.max(...events.map(e => e.timestamp)) * 1000 :
                Date.now()
        };
    };

    return {
        contract,
        fetchScoreCard,
        fetchCommunityStats,
        fetchGlobalStats,
        getContractInfo: contract.getContractInfo.bind(contract)
    };
}