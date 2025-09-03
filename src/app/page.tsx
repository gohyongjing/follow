"use client";

import { useState } from "react";
import { FilePicker } from "@/components/file-picker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { File, Package } from "lucide-react";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    console.log("Selected file:", file);
    // Here you can add your logic to process the ZIP file
  };

  const handleProcessFile = () => {
    if (selectedFile) {
      // Add your ZIP processing logic here
      console.log("Processing file:", selectedFile.name);
      alert(`Processing ${selectedFile.name}...`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Package className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              ZIP File Processor
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Upload and process your ZIP files with ease
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FilePicker 
            onFileSelect={handleFileSelect}
            className="h-fit"
          />
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <File className="h-5 w-5" />
                File Information
              </CardTitle>
              <CardDescription>
                Details about your selected file
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedFile ? (
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">File Details:</h3>
                    <div className="space-y-1 text-sm">
                      <p><strong>Name:</strong> {selectedFile.name}</p>
                      <p><strong>Size:</strong> {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      <p><strong>Type:</strong> {selectedFile.type || 'application/zip'}</p>
                      <p><strong>Last Modified:</strong> {new Date(selectedFile.lastModified).toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleProcessFile}
                    className="w-full"
                    size="lg"
                  >
                    Process ZIP File
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <File className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No file selected</p>
                  <p className="text-sm">Upload a ZIP file to see details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Supported file format: ZIP only | Maximum size: 100MB
          </p>
        </div>
      </div>
    </div>
  );
}
