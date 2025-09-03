import { ComparisonResult } from '@/types/follower-analysis';
import { StatsCards } from './stats-cards';
import { UserLists } from './user-lists';
import { FollowerLists } from './follower-lists';

interface AnalysisResultsProps {
  comparisonResult: ComparisonResult;
}

export function AnalysisResults({ comparisonResult }: AnalysisResultsProps) {
  return (
    <>
      <StatsCards comparisonResult={comparisonResult} />
      <UserLists comparisonResult={comparisonResult} />
      <FollowerLists comparisonResult={comparisonResult} />
    </>
  );
}
