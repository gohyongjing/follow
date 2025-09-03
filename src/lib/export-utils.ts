import { ComparisonResult } from '@/types/follower-analysis';

export const downloadCSV = (data: string[], filename: string) => {
  const csvContent = data.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportFollowers = (comparisonResult: ComparisonResult) => {
  downloadCSV(comparisonResult.followers, 'followers');
};

export const exportFollowing = (comparisonResult: ComparisonResult) => {
  downloadCSV(comparisonResult.following, 'following');
};

export const exportNotFollowingBack = (comparisonResult: ComparisonResult) => {
  downloadCSV(comparisonResult.notFollowingBack, 'not-following-back');
};

export const exportNotFollowedBack = (comparisonResult: ComparisonResult) => {
  downloadCSV(comparisonResult.notFollowedBack, 'not-followed-back');
};

export const exportMutualFollowers = (comparisonResult: ComparisonResult) => {
  downloadCSV(comparisonResult.mutualFollowers, 'mutual-followers');
};
