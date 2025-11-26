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

export function formatCommunityName(communityId: string): string {
    return communityId
        .replace(/-\d+$/, '')
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export async function fetchHealthSharedMetrics(): Promise<HealthSharedMetrics> {
    try {
        const response = await fetch(HEALTH_SHARED_API, {
            cache: 'no-store',
            headers: {
                'Accept': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        console.log('Raw API response:', data);

        // Handle double-nested metrics structure
        if (data.metrics && data.metrics.metrics) {
            return {
                status: data.status || 'success',
                generatedAt: data.metrics.generatedAt || new Date().toISOString(),
                source: data.source || 'health-shared.com',
                metrics: data.metrics.metrics
            };
        }

        // Handle single-nested structure
        if (data.metrics) {
            return data as HealthSharedMetrics;
        }

        // If data itself has the structure
        if (data.communities) {
            return {
                status: 'success',
                generatedAt: new Date().toISOString(),
                source: 'health-shared.com',
                metrics: {
                    communities: data.communities,
                    loginFrequency: data.loginFrequency || { updatedAt: new Date().toISOString(), monthly: [] }
                }
            };
        }

        throw new Error('Unexpected API response format');

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
    return Math.round(((recent - previous) / previous) * 100 * 10) / 10;
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

export function getLocationCoordinates(location: string): { lat: number; lng: number } {
    const coords: Record<string, { lat: number; lng: number }> = {
        'Maryland, USA': { lat: 39.0458, lng: -76.6413 },
        'England, UK': { lat: 51.5074, lng: -0.1278 },
        'Newcastle, UK': { lat: 54.9783, lng: -1.6178 },
        'Global': { lat: 0, lng: 0 }
    };
    return coords[location] || { lat: 0, lng: 0 };
}