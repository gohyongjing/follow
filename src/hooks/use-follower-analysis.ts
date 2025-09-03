import { useState } from 'react';
import { extractFollowersAndFollowing } from '@/lib/follower-analysis';
import { ComparisonResult } from '@/types/follower-analysis';

export const useFollowerAnalysis = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [comparisonResult, setComparisonResult] =
    useState<ComparisonResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeFollowers = async (file: File) => {
    setIsProcessing(true);
    setError(null);
    setComparisonResult(null);

    try {
      const result = await extractFollowersAndFollowing(file);
      setComparisonResult(result);
    } catch (err) {
      console.error('Error processing file:', err);
      setError(
        'Failed to process the ZIP file. Please make sure it contains valid follower/following data.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    comparisonResult,
    error,
    analyzeFollowers,
  };
};
