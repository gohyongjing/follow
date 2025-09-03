import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { File, Loader2 } from 'lucide-react';

interface FileInfoCardProps {
  selectedFile: File | null;
  onProcessFile: () => void;
  isProcessing: boolean;
}

export function FileInfoCard({
  selectedFile,
  onProcessFile,
  isProcessing,
}: FileInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <File className="h-5 w-5" />
          File Information
        </CardTitle>
        <CardDescription>Details about your selected file</CardDescription>
      </CardHeader>
      <CardContent>
        {selectedFile ? (
          <div className="space-y-4">
            <div className="bg-muted rounded-lg p-4">
              <h3 className="mb-2 font-semibold">File Details:</h3>
              <div className="space-y-1 text-sm">
                <p>
                  <strong>Name:</strong> {selectedFile.name}
                </p>
                <p>
                  <strong>Size:</strong>{' '}
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <p>
                  <strong>Type:</strong>{' '}
                  {selectedFile.type || 'application/zip'}
                </p>
                <p>
                  <strong>Last Modified:</strong>{' '}
                  {new Date(selectedFile.lastModified).toLocaleString()}
                </p>
              </div>
            </div>

            <Button
              onClick={onProcessFile}
              className="w-full"
              size="lg"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Analyze Followers'
              )}
            </Button>
          </div>
        ) : (
          <div className="text-muted-foreground py-8 text-center">
            <File className="mx-auto mb-4 h-12 w-12 opacity-50" />
            <p>No file selected</p>
            <p className="text-sm">Upload a ZIP file to see details</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
