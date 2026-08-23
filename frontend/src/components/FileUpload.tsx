"use client";

import { useState, useCallback } from "react";
import { Upload, Loader2, FileAudio } from "lucide-react";
import { UploadState } from "@/types";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  uploadState: UploadState;
}

export default function FileUpload({ onFileUpload, uploadState }: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragOver(true); }, []);
  const handleDragLeave = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragOver(false); }, []);
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) onFileUpload(file);
  }, [onFileUpload]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileUpload(file);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        relative border-2 border-dashed rounded-2xl p-8 sm:p-9 text-center transition-all duration-300 cursor-pointer
        ${isDragOver
          ? "border-[#5d8e27] bg-[#e8f5d9] scale-[1.01] shadow-inner"
          : "border-[#cbdbe5] hover:border-[#87c23f] hover:bg-[#f5faef]"}
        ${uploadState.isUploading ? "pointer-events-none opacity-80" : ""}
      `}
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
            <div className="relative inline-block">
              <Loader2 className="w-14 h-14 text-[#24638c] animate-spin" />
              <FileAudio className="w-6 h-6 text-[#24638c] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div>
              <p className="text-lg font-bold text-[#102a43]">
                {uploadState.progress < 100 ? "Uploading & Processing..." : "Finalizing Summary..."}
              </p>
              <p className="text-sm text-[#71869a] mt-2 font-medium">{uploadState.progress}% complete</p>
            </div>
            <div className="w-full max-w-md mx-auto bg-[#e6eef2] rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#87c23f] to-[#24638c] h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${uploadState.progress}%` }}
              />
            </div>
          </>
        ) : (
          <>
            <div className="bg-[#e8f5d9] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <Upload className="w-8 h-8 text-[#5d8e27]" />
            </div>
            <div>
              <p className="text-lg font-bold text-[#102a43]">
                Drop your audio file here, or <span className="text-[#24638c]">browse</span>
              </p>
              <p className="text-sm text-[#71869a] mt-2">
                Supports MP3, WAV, M4A, MP4, WebM (Max 25MB)
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}