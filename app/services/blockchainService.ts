import { ethers } from 'ethers';
import { UserHashMappingService } from '@/utils/userHashMapping';

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

export interface PointsEvent {
    community: string;
    user: number;
    points: number;
    timestamp: number;
    transactionHash: string;
    blockNumber: number;
}

export interface TimelineDataPoint {
    date: string;
    points: number;
    uniqueUsers: number;
    totalEvents: number;
}

export interface CommunityBlockchainData {
    communityAddress: string;
    totalPoints: number;
    totalUsers: number;
    firstActivity: number;
    lastActivity: number;
    pointsHistory: TimelineDataPoint[];
    allEvents: PointsEvent[];
}

// Interface for hash-based user data
export interface CommunityMemberData {
    healthSharedUserId: string;
    email?: string;
    blockchainUserId: string;
    surrogateAddress: string;
    points: number;
    lastActivity: number;
}

export class BlockchainService {
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

    /**
     * Fetch ALL historical PointsAdded events for a specific community
     * Returns REAL blockchain data over time (longitudinal)
     */
    async getCommunityHistoricalData(communityAddress: string): Promise<CommunityBlockchainData> {
        try {
            console.log(`Fetching historical data for ${communityAddress}...`);

            const filter = this.contract.filters.PointsAdded(communityAddress);
            const events = await this.contract.queryFilter(filter, 0);

            console.log(`Found ${events.length} historical events for ${communityAddress}`);

            if (events.length === 0) {
                return {
                    communityAddress,
                    totalPoints: 0,
                    totalUsers: 0,
                    firstActivity: 0,
                    lastActivity: 0,
                    pointsHistory: [],
                    allEvents: []
                };
            }

            const processedEvents: PointsEvent[] = events.map(event => ({
                community: event.args?.community || communityAddress,
                user: Number(event.args?.user || 0),
                points: Number(event.args?.points || 0),
                timestamp: Number(event.args?.timestamp || 0),
                transactionHash: event.transactionHash,
                blockNumber: event.blockNumber
            }));

            const totalPoints = processedEvents.reduce((sum, e) => sum + e.points, 0);
            const uniqueUsers = new Set(processedEvents.map(e => e.user)).size;
            const timestamps = processedEvents.map(e => e.timestamp).filter(t => t > 0);
            const firstActivity = timestamps.length > 0 ? Math.min(...timestamps) : 0;
            const lastActivity = timestamps.length > 0 ? Math.max(...timestamps) : 0;

            // Create longitudinal timeline (group by date)
            const timelineMap = new Map<string, {
                points: number;
                users: Set<number>;
                events: number;
            }>();

            processedEvents.forEach(event => {
                if (event.timestamp === 0) return;

                const date = new Date(event.timestamp * 1000).toISOString().split('T')[0];

                if (!timelineMap.has(date)) {
                    timelineMap.set(date, {
                        points: 0,
                        users: new Set(),
                        events: 0
                    });
                }

                const dayData = timelineMap.get(date)!;
                dayData.points += event.points;
                dayData.users.add(event.user);
                dayData.events += 1;
            });

            const pointsHistory: TimelineDataPoint[] = Array.from(timelineMap.entries())
                .map(([date, data]) => ({
                    date,
                    points: data.points,
                    uniqueUsers: data.users.size,
                    totalEvents: data.events
                }))
                .sort((a, b) => a.date.localeCompare(b.date));

            return {
                communityAddress,
                totalPoints,
                totalUsers: uniqueUsers,
                firstActivity,
                lastActivity,
                pointsHistory,
                allEvents: processedEvents
            };

        } catch (error) {
            console.error(`Error fetching data for ${communityAddress}:`, error);
            return {
                communityAddress,
                totalPoints: 0,
                totalUsers: 0,
                firstActivity: 0,
                lastActivity: 0,
                pointsHistory: [],
                allEvents: []
            };
        }
    }

    /**
     * Fetch data for multiple communities
     */
    async getMultipleCommunities(communityAddresses: string[]): Promise<Map<string, CommunityBlockchainData>> {
        const results = new Map<string, CommunityBlockchainData>();

        await Promise.all(
            communityAddresses.map(async (address) => {
                const data = await this.getCommunityHistoricalData(address);
                results.set(address.toLowerCase(), data);
            })
        );

        return results;
    }

    async communityHasBlockchainData(communityId: string): Promise<boolean> {
        try {
            const communityAddress = UserHashMappingService.generateCommunityAddress(communityId);
            const filter = this.contract.filters.PointsAdded(communityAddress);
            const events = await this.contract.queryFilter(filter, -1000);
            return events.length > 0;
        } catch {
            return false;
        }
    }

    /**
     * Query blockchain for specific Health-Shared user using hash-based ID
     */
    async getUserPointsByHealthSharedId(
        communityId: string,
        healthSharedUserId: string,
        email?: string
    ): Promise<{ points: number; lastActivity: number; mapping: any }> {
        const communityAddress = UserHashMappingService.generateCommunityAddress(communityId);
        const mapping = UserHashMappingService.createUserMapping(
            healthSharedUserId,
            communityId,
            email
        );

        try {
            const [points, updatedAt] = await this.contract.getScoreCard(
                communityAddress,
                BigInt(mapping.blockchainUserId)
            );

            return {
                points: Number(points),
                lastActivity: Number(updatedAt),
                mapping
            };
        } catch (error) {
            return {
                points: 0,
                lastActivity: 0,
                mapping
            };
        }
    }

    async batchGetUserPoints(
        communityId: string,
        users: Array<{ userId: string; email?: string }>
    ): Promise<Map<string, CommunityMemberData>> {
        const results = new Map<string, CommunityMemberData>();
        const communityAddress = UserHashMappingService.generateCommunityAddress(communityId);

        for (const user of users) {
            const mapping = UserHashMappingService.createUserMapping(
                user.userId,
                communityId,
                user.email
            );

            try {
                const [points, updatedAt] = await this.contract.getScoreCard(
                    communityAddress,
                    BigInt(mapping.blockchainUserId)
                );

                results.set(user.userId, {
                    healthSharedUserId: user.userId,
                    email: user.email,
                    blockchainUserId: mapping.blockchainUserId,
                    surrogateAddress: mapping.surrogateAddress,
                    points: Number(points),
                    lastActivity: Number(updatedAt)
                });
            } catch (error) {

            }
        }

        return results;
    }

    getContractInfo() {
        return {
            address: SEPOLIA_CONTRACT_ADDRESS,
            network: "zkSync Sepolia Testnet",
            explorer: `https://sepolia.explorer.zksync.io/address/${SEPOLIA_CONTRACT_ADDRESS}`
        };
    }
}

export default BlockchainService;