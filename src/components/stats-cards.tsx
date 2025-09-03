import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, UserX } from 'lucide-react';
import { ComparisonResult } from '@/types/follower-analysis';

interface StatsCardsProps {
  comparisonResult: ComparisonResult;
}

export function StatsCards({ comparisonResult }: StatsCardsProps) {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4" />
            Total Followers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">
            {comparisonResult.followers.length}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <UserCheck className="h-4 w-4" />
            Total Following
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {comparisonResult.following.length}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <UserX className="h-4 w-4" />
            Not Following Back
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            {comparisonResult.notFollowingBack.length}
          </div>
          <p className="text-muted-foreground mt-1 text-xs">
            {comparisonResult.followers.length > 0
              ? `${((comparisonResult.notFollowingBack.length / comparisonResult.followers.length) * 100).toFixed(1)}%`
              : '0%'}{' '}
            of your followers
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <UserCheck className="h-4 w-4" />
            Mutual Followers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600">
            {comparisonResult.mutualFollowers.length}
          </div>
          <p className="text-muted-foreground mt-1 text-xs">
            {comparisonResult.followers.length > 0
              ? `${((comparisonResult.mutualFollowers.length / comparisonResult.followers.length) * 100).toFixed(1)}%`
              : '0%'}{' '}
            of your followers
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
