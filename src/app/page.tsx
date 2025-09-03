'use client';

import { useState } from 'react';
import { FilePicker } from '@/components/file-picker';
import { FileInfoCard } from '@/components/file-info-card';
import { AnalysisResults } from '@/components/analysis-results';
import { ErrorCard } from '@/components/error-card';
import { useFollowerAnalysis } from '@/hooks/use-follower-analysis';
import { Package } from 'lucide-react';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { isProcessing, comparisonResult, error, analyzeFollowers } =
    useFollowerAnalysis();

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    console.log('Selected file:', file);
  };

  const handleProcessFile = async () => {
    if (!selectedFile) return;
    await analyzeFollowers(selectedFile);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-6xl py-8">
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <Package className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Follower Analysis Tool
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Upload your social media data export and analyze your followers
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FilePicker onFileSelect={handleFileSelect} className="h-fit" />

          <FileInfoCard
            selectedFile={selectedFile}
            onProcessFile={handleProcessFile}
            isProcessing={isProcessing}
          />
        </div>

        {error && <ErrorCard error={error} />}

        {comparisonResult && (
          <AnalysisResults
            key={JSON.stringify(comparisonResult)}
            comparisonResult={comparisonResult}
          />
        )}

        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-sm">
            Supported file format: ZIP only | Maximum size: 100MB
          </p>
        </div>
      </div>
    </div>
  );
}
