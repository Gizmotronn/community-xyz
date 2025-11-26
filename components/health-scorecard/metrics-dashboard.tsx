'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Users, TrendingUp, Globe, Award, Coins, Clock, Calendar } from 'lucide-react';

interface MetricCardProps {
    title: string;
    value: string | number;
    subtitle: string;
    icon: React.ComponentType<any>;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    loading?: boolean;
    color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

const colorClasses = {
    blue: 'border-blue-200 text-blue-600',
    green: 'border-green-200 text-green-600',
    purple: 'border-purple-200 text-purple-600',
    orange: 'border-orange-200 text-orange-600',
    red: 'border-red-200 text-red-600',
};

export function MetricCard({
    title,
    value,
    subtitle,
    icon: Icon,
    trend,
    loading = false,
    color = 'blue'
}: MetricCardProps) {
    return (
        <Card className={`bg-white/70 backdrop-blur-sm ${colorClasses[color]} hover:shadow-lg transition-all duration-300`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className={`h-4 w-4 ${colorClasses[color].split(' ')[1]}`} />
            </CardHeader>
            <CardContent>
                <div className={`text-2xl font-bold ${colorClasses[color].split(' ')[1]}`}>
                    {loading ? "..." : typeof value === 'number' ? value.toLocaleString() : value}
                </div>
                <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-gray-500">{subtitle}</p>
                    {trend && (
                        <span className={`text-xs flex items-center gap-1 ${trend.isPositive ? 'text-green-600' : 'text-red-600'
                            }`}>
                            <TrendingUp className={`h-3 w-3 ${trend.isPositive ? '' : 'rotate-180'}`} />
                            {trend.isPositive ? '+' : ''}{trend.value}%
                        </span>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

interface MetricsDashboardProps {
    contractData?: {
        totalCommunities: number;
        totalPoints: number;
        totalUsers: number;
        lastUpdate: string;
    } | null;
    loading?: boolean;
}

export function MetricsDashboard({ contractData, loading = false }: MetricsDashboardProps) {
    const metrics = [
        {
            title: "Total Communities",
            value: contractData?.totalCommunities || 3,
            subtitle: "Active health communities",
            icon: Globe,
            color: 'blue' as const,
            trend: { value: 12.5, isPositive: true }
        },
        {
            title: "Total Points",
            value: contractData?.totalPoints || 106980,
            subtitle: "Community engagement points",
            icon: Award,
            color: 'green' as const,
            trend: { value: 18.3, isPositive: true }
        },
        {
            title: "Active Members",
            value: contractData?.totalUsers || 2793,
            subtitle: "Engaged community members",
            icon: Users,
            color: 'purple' as const,
            trend: { value: 15.7, isPositive: true }
        },
        {
            title: "Funds Raised",
            value: "$28.2K",
            subtitle: "Community funding secured",
            icon: Coins,
            color: 'orange' as const,
            trend: { value: 22.1, isPositive: true }
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
                <MetricCard
                    key={index}
                    title={metric.title}
                    value={metric.value}
                    subtitle={metric.subtitle}
                    icon={metric.icon}
                    color={metric.color}
                    trend={metric.trend}
                    loading={loading}
                />
            ))}
        </div>
    );
}

interface QuickStatsProps {
    stats: {
        avgPointsPerUser: number;
        interviewsCompleted: number;
        communitiesGrowing: number;
        lastActivityHours: number;
    };
}

export function QuickStats({ stats }: QuickStatsProps) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.avgPointsPerUser}</div>
                <div className="text-xs text-gray-500 mt-1">Avg Points/User</div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{stats.interviewsCompleted}</div>
                <div className="text-xs text-gray-500 mt-1">Interviews Done</div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.communitiesGrowing}</div>
                <div className="text-xs text-gray-500 mt-1">Growing Communities</div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">{stats.lastActivityHours}h</div>
                <div className="text-xs text-gray-500 mt-1">Last Activity</div>
            </div>
        </div>
    );
}