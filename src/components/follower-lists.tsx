import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Users, UserCheck, Search, Download } from 'lucide-react';
import { ComparisonResult } from '@/types/follower-analysis';
import { exportFollowers, exportFollowing } from '@/lib/export-utils';

interface FollowerListsProps {
  comparisonResult: ComparisonResult;
}

export function FollowerLists({ comparisonResult }: FollowerListsProps) {
  const [followersFilter, setFollowersFilter] = useState('');
  const [followingFilter, setFollowingFilter] = useState('');

  const filteredFollowers = comparisonResult.followers.filter(user =>
    user.toLowerCase().includes(followersFilter.toLowerCase())
  );

  const filteredFollowing = comparisonResult.following.filter(user =>
    user.toLowerCase().includes(followingFilter.toLowerCase())
  );

  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              All Followers ({comparisonResult.followers.length})
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportFollowers(comparisonResult)}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
          <CardDescription>
            Complete list of users who follow you
          </CardDescription>
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
            <Input
              placeholder="Search followers..."
              value={followersFilter}
              onChange={e => setFollowersFilter(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="max-h-60 overflow-y-auto">
            {filteredFollowers.length > 0 ? (
              <div className="space-y-1">
                {filteredFollowers.map((user, index) => (
                  <div key={index} className="bg-muted rounded p-2 text-sm">
                    {user}
                  </div>
                ))}
              </div>
            ) : followersFilter ? (
              <p className="text-muted-foreground py-4 text-center">
                No followers match your search
              </p>
            ) : (
              <p className="text-muted-foreground py-4 text-center">
                No followers found
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-green-600" />
              All Following ({comparisonResult.following.length})
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportFollowing(comparisonResult)}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
          <CardDescription>Complete list of users you follow</CardDescription>
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
            <Input
              placeholder="Search following..."
              value={followingFilter}
              onChange={e => setFollowingFilter(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="max-h-60 overflow-y-auto">
            {filteredFollowing.length > 0 ? (
              <div className="space-y-1">
                {filteredFollowing.map((user, index) => (
                  <div key={index} className="bg-muted rounded p-2 text-sm">
                    {user}
                  </div>
                ))}
              </div>
            ) : followingFilter ? (
              <p className="text-muted-foreground py-4 text-center">
                No following match your search
              </p>
            ) : (
              <p className="text-muted-foreground py-4 text-center">
                Not following anyone
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
