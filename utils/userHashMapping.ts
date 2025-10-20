import { ethers } from 'ethers';

export interface UserHashMapping {
    healthSharedUserId: string;
    communityId: string;
    blockchainUserId: string;
    surrogateAddress: string;
    createdAt: number;
}

export class UserHashMappingService {
    private static readonly HASH_PREFIX = 'HS_USER_';
    private static readonly COMMUNITY_PREFIX = 'COMM_';


    static generateBlockchainUserId(
        healthSharedUserId: string,
        communityId: string,
        email?: string
    ): string {
        const seed = `${this.HASH_PREFIX}${communityId}_${healthSharedUserId}_${email || ''}`;

        const hash = ethers.keccak256(ethers.toUtf8Bytes(seed));

        const bigIntValue = BigInt(hash);
        const uint256Max = BigInt('0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF');
        const positiveValue = bigIntValue % uint256Max;

        return positiveValue.toString();
    }

    /**
     * Generate a pseudo wallet address for display purposes
     * This is NOT a real wallet, just a visual representation
     */
    static generateSurrogateAddress(blockchainUserId: string): string {
        const hash = ethers.keccak256(ethers.toUtf8Bytes(blockchainUserId));
        return ethers.getAddress(`0x${hash.slice(26)}`);
    }


    static generateCommunityAddress(communityId: string): string {
        const seed = `${this.COMMUNITY_PREFIX}${communityId}`;
        const hash = ethers.keccak256(ethers.toUtf8Bytes(seed));
        return ethers.getAddress(`0x${hash.slice(26)}`);
    }


    static createUserMapping(
        healthSharedUserId: string,
        communityId: string,
        email?: string
    ): UserHashMapping {
        const blockchainUserId = this.generateBlockchainUserId(
            healthSharedUserId,
            communityId,
            email
        );

        const surrogateAddress = this.generateSurrogateAddress(blockchainUserId);

        return {
            healthSharedUserId,
            communityId,
            blockchainUserId,
            surrogateAddress,
            createdAt: Date.now()
        };
    }

    static createBatchMappings(
        users: Array<{ userId: string; email?: string }>,
        communityId: string
    ): UserHashMapping[] {
        return users.map(user =>
            this.createUserMapping(user.userId, communityId, user.email)
        );
    }

    static isValidBlockchainUserId(blockchainUserId: string): boolean {
        try {
            const value = BigInt(blockchainUserId);
            const uint256Max = BigInt('0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF');
            return value >= 0 && value <= uint256Max;
        } catch {
            return false;
        }
    }

    static formatForContract(blockchainUserId: string): bigint {
        return BigInt(blockchainUserId);
    }
}

export const generateBlockchainUserId = UserHashMappingService.generateBlockchainUserId;
export const generateSurrogateAddress = UserHashMappingService.generateSurrogateAddress;
export const generateCommunityAddress = UserHashMappingService.generateCommunityAddress;
export const createUserMapping = UserHashMappingService.createUserMapping;