'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, TrendingUp, Users, Award, Calendar, ExternalLink } from 'lucide-react';

interface CommunityCardProps {
  community: {
    id: number;
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
  };
  onViewDetails?: (communityId: number) => void;
}

export function CommunityCard({ community, onViewDetails }: CommunityCardProps) {
  const handleViewOnExplorer = () => {
    window.open(`https://sepolia.explorer.zksync.io/address/${community.address}`, '_blank');
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
              {community.name}
            </CardTitle>
            <CardDescription className="font-mono text-xs mt-1 break-all">
              {community.address}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge 
              variant={community.status === 'active' ? 'default' : 'secondary'}
              className="text-xs"
            >
              {community.status}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {community.category}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Main Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3 text-gray-500" />
              <p className="text-xs text-gray-500">Members</p>
            </div>
            <p className="text-xl font-bold text-blue-600">
              {community.members.toLocaleString()}
            </p>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Award className="h-3 w-3 text-gray-500" />
              <p className="text-xs text-gray-500">Total Points</p>
            </div>
            <p className="text-xl font-bold text-green-600">
              {community.totalPoints.toLocaleString()}
            </p>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-gray-500" />
              <p className="text-xs text-gray-500">Avg Points/User</p>
            </div>
            <p className="text-xl font-bold text-purple-600">
              {community.avgPointsPerUser}
            </p>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3 text-gray-500" />
              <p className="text-xs text-gray-500">Interviews</p>
            </div>
            <p className="text-xl font-bold text-orange-600">
              {community.interviews}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">{community.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-600">+{community.growth}% growth</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleViewOnExplorer}
              className="text-xs"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              View on Explorer
            </Button>
            {onViewDetails && (
              <Button
                size="sm"
                onClick={() => onViewDetails(community.id)}
                className="text-xs"
              >
                View Details
              </Button>
            )}
          </div>
        </div>

        {/* Funds Raised Banner */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">Funds Raised</p>
              <p className="text-lg font-bold text-green-700">
                ${community.fundsRaised.toLocaleString()}
              </p>
            </div>
            <div className="text-xs text-gray-500">
              Available for research & trials
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}