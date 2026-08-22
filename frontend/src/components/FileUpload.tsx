"use client";

import { useState, useCallback } from "react";
import { Upload, Loader2 } from "lucide-react";
import { UploadState } from "@/types";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  uploadState: UploadState;
}

export default function FileUpload({ onFileUpload, uploadState }: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const file = e.dataTransfer.files[0];
      if (file && isValidFileType(file)) {
        onFileUpload(file);
      }
    },
    [onFileUpload]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && isValidFileType(file)) {
      onFileUpload(file);
    }
  };

  const isValidFileType = (file: File) => {
    const validTypes = [
      "audio/mpeg",
      "audio/mp3",
      "audio/wav",
      "audio/m4a",
      "audio/mp4",
      "audio/webm",
      "video/mp4",
      "video/webm",
    ];
    return validTypes.includes(file.type) || file.name.match(/\.(mp3|wav|m4a|mp4|webm)$/i);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={
        "relative border-2 border-dashed rounded-xl p-12 text-center transition-all " +
        (isDragOver
          ? "border-blue-500 bg-blue-50"
          : "border-slate-300 hover:border-slate-400") +
        (uploadState.isUploading ? " pointer-events-none opacity-75" : "")
      }
    >
      <input
        type="file"
        accept=".mp3,.wav,.m4a,.mp4,.webm,audio/*,video/*"
        onChange={handleFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        disabled={uploadState.isUploading}
      />

      <div className="space-y-4">
        {uploadState.isUploading ? (
          <>
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto" />
            <div>
              <p className="text-lg font-medium text-slate-900">
                {uploadState.isProcessing ? "Processing..." : "Uploading..."}
              </p>
              <p className="text-sm text-slate-600 mt-1">
                {uploadState.progress}% complete
              </p>
            </div>
            {/* Progress bar */}
            <div className="w-full max-w-xs mx-auto bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-600 h-full transition-all duration-300"
                style={{ width: `${uploadState.progress}%` }}
              />
            </div>
          </>
        ) : (
          <>
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <p className="text-lg font-medium text-slate-900">
                Drop your audio file here, or click to browse
              </p>
              <p className="text-sm text-slate-600 mt-1">
                MP3, WAV, M4A, MP4, or WebM (max 25MB)
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}