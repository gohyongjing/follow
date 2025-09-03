import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserCheck, UserX, Download } from 'lucide-react';
import { ComparisonResult } from '@/types/follower-analysis';
import {
  exportNotFollowingBack,
  exportNotFollowedBack,
} from '@/lib/export-utils';

interface UserListsProps {
  comparisonResult: ComparisonResult;
}

export function UserLists({ comparisonResult }: UserListsProps) {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <UserX className="h-5 w-5 text-red-600" />
              Not Following Back ({comparisonResult.notFollowingBack.length})
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportNotFollowingBack(comparisonResult)}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
          <CardDescription>
            Users who follow you but you don&apos;t follow back
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-h-60 overflow-y-auto">
            {comparisonResult.notFollowingBack.length > 0 ? (
              <div className="space-y-1">
                {comparisonResult.notFollowingBack.map((user, index) => (
                  <div key={index} className="bg-muted rounded p-2 text-sm">
                    {user}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground py-4 text-center">
                Everyone you follow follows you back!
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
              You Don&apos;t Follow Back (
              {comparisonResult.notFollowedBack.length})
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportNotFollowedBack(comparisonResult)}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
          <CardDescription>
            Users you follow but they don&apos;t follow you back
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-h-60 overflow-y-auto">
            {comparisonResult.notFollowedBack.length > 0 ? (
              <div className="space-y-1">
                {comparisonResult.notFollowedBack.map((user, index) => (
                  <div key={index} className="bg-muted rounded p-2 text-sm">
                    {user}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground py-4 text-center">
                You follow everyone who follows you!
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
