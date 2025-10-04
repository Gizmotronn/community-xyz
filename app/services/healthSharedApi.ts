const HEALTH_SHARED_API = 'https://health-shared.com/api/metrics';

export interface CommunityMetrics {
    communityId: string;
    updatedAt: string;
    totals: { posts: number; comments: number; members: number };
    activeUsersMonthly: Array<{ month: string; users: number }>;
    subscriptionsMonthly: Array<{ month: string; count: number }>;
    contentInteractionsMonthly: Array<{
        month: string;
        comments: number;
        likes: number;
        shares: number;
        favorites: number;
        totalInteractions: number;
        rate: number | null;
    }>;
    sessionDurationBuckets: Array<{ bucket: string; userCount: number }>;
    sessionFrequencyBuckets: Array<{ bucket: string; userCount: number }>;
}

export interface LoginFrequency {
    updatedAt: string;
    monthly: Array<{ month: string; count: number }>;
}

export interface HealthSharedMetrics {
    status: string;
    generatedAt: string;
    source: string;
    metrics: {
        communities: CommunityMetrics[];
        loginFrequency: LoginFrequency;
    };
}

// Format community ID to readable name
export function formatCommunityName(communityId: string): string {
    return communityId
        .replace(/-\d+$/, '') // Remove trailing numbers
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export async function fetchHealthSharedMetrics(): Promise<HealthSharedMetrics> {
    try {
        const response = await fetch(HEALTH_SHARED_API, {
            cache: 'no-store' // Always fetch fresh data
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();

        // The API returns { metrics: { status, generatedAt, source, metrics: {...} } }
        // So we need to unwrap it properly
        if (data.metrics) {
            return data.metrics;
        }

        return data; // Fallback if structure is different
    } catch (error) {
        console.error('Error fetching Health-Shared metrics:', error);
        throw error;
    }
}

export function calculateGrowth(monthlyData: Array<{ month: string; users: number }>): number {
    if (monthlyData.length < 2) return 0;

    const recent = monthlyData[monthlyData.length - 1].users;
    const previous = monthlyData[monthlyData.length - 2].users;

    if (previous === 0) return recent > 0 ? 100 : 0;
    return Math.round(((recent - previous) / previous) * 100 * 10) / 10; // Round to 1 decimal
}

export function determineGameCycle(
    members: number,
    activeUsers: number,
    interactions: number
): { cycle: string; description: string } {
    const activityRate = members > 0 ? (activeUsers / members) * 100 : 0;
    const engagementRate = activeUsers > 0 ? interactions / activeUsers : 0;

    if (activityRate > 50 && engagementRate > 10) {
        return {
            cycle: "5,5",
            description: "Optimal collaboration - High engagement + High rewards"
        };
    } else if (activityRate > 25 || engagementRate > 5) {
        return {
            cycle: "3,3",
            description: "Cooperative growth - Moderate engagement + Steady rewards"
        };
    } else {
        return {
            cycle: "2,2",
            description: "Building momentum - Growing participation + Increasing rewards"
        };
    }
}

export function determineLocation(communityId: string): string {
    const id = communityId.toLowerCase();

    if (id.includes('baltimore') || id.includes('carroll')) {
        return 'Maryland, USA';
    } else if (id.includes('hammersmith') || id.includes('fulham') || id.includes('bracknell')) {
        return 'England, UK';
    } else if (id.includes('tyneside')) {
        return 'Newcastle, UK';
    } else if (id.includes('optiwell')) {
        return 'Global';
    }
    return 'Global';
}

export function determineCategory(communityId: string): string {
    const id = communityId.toLowerCase();

    if (id.includes('diabetes')) return 'Diabetes';
    if (id.includes('mental')) return 'Mental Health';
    if (id.includes('city') || id.includes('county') || id.includes('council')) return 'Community Health';
    if (id.includes('optiwell')) return 'Wellness';

    return 'General Health';
}

export function getTotalInteractions(community: CommunityMetrics): number {
    return community.contentInteractionsMonthly.reduce(
        (sum, month) => sum + month.totalInteractions,
        0
    );
}

export function getRecentActiveUsers(community: CommunityMetrics): number {
    if (community.activeUsersMonthly.length === 0) return 0;
    return community.activeUsersMonthly[community.activeUsersMonthly.length - 1].users;
}

export function estimatePoints(totalInteractions: number): number {
    return totalInteractions * 10;
}

export function estimateInterviews(totalInteractions: number): number {
    return Math.floor(totalInteractions / 10);
}

export function estimateFundsRaised(members: number): number {
    return members * 100;
}