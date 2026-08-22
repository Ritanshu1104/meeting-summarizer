"use client";

import { useState } from "react";
import axios from "axios";
import { Upload, FileAudio, CheckCircle2, AlertCircle } from "lucide-react";
import FileUpload from "@/components/FileUpload";
import SummaryView from "@/components/SummaryView";
import TranscriptView from "@/components/TranscriptView";
import { MeetingResponse, UploadState } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function Home() {
  const [meetingData, setMeetingData] = useState<MeetingResponse | null>(null);
  const [uploadState, setUploadState] = useState<UploadState>({
    isUploading: false,
    isProcessing: false,
    error: null,
    progress: 0,
  });
  const [activeTab, setActiveTab] = useState<"summary" | "transcript">("summary");

  const handleFileUpload = async (file: File) => {
    setUploadState({
      isUploading: true,
      isProcessing: false,
      error: null,
      progress: 0,
    });

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Upload and process
      const response = await axios.post<MeetingResponse>(
        `${API_URL}/api/v1/meetings/process`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const progress = progressEvent.total
              ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
              : 0;
            setUploadState((prev) => ({ ...prev, progress }));
          },
        }
      );

      setMeetingData(response.data);
      setUploadState({
        isUploading: false,
        isProcessing: false,
        error: null,
        progress: 100,
      });
    } catch (error) {
      console.error("Upload error:", error);
      setUploadState({
        isUploading: false,
        isProcessing: false,
        error:
          axios.isAxiosError(error) && error.response?.data?.detail
            ? error.response.data.detail
            : "Failed to process meeting. Please try again.",
        progress: 0,
      });
    }
  };

  const handleReset = () => {
    setMeetingData(null);
    setUploadState({
      isUploading: false,
      isProcessing: false,
      error: null,
      progress: 0,
    });
    setActiveTab("summary");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <FileAudio className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Meeting Summarizer
              </h1>
              <p className="text-sm text-slate-600">
                AI-powered meeting transcription and summarization
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!meetingData ? (
          /* Upload Section */
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-xl font-semibold text-slate-900 mb-2">
                  Upload Your Meeting Recording
                </h2>
                <p className="text-slate-600">
                  Supported formats: MP3, WAV, M4A, MP4, WebM
                </p>
              </div>

              <FileUpload
                onFileUpload={handleFileUpload}
                uploadState={uploadState}
              />

              {uploadState.error && (
                <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{uploadState.error}</p>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: Upload,
                  title: "Easy Upload",
                  desc: "Drag & drop or click to upload",
                },
                {
                  icon: CheckCircle2,
                  title: "AI-Powered",
                  desc: "Automatic transcription & summarization",
                },
                {
                  icon: FileAudio,
                  title: "Action Items",
                  desc: "Extract tasks and decisions",
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow p-6 text-center"
                >
                  <feature.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-slate-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Results Section */
          <div className="space-y-6">
            {/* Controls */}
            <div className="flex items-center justify-between bg-white rounded-xl shadow p-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab("summary")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === "summary"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Summary
                </button>
                <button
                  onClick={() => setActiveTab("transcript")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === "transcript"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Transcript
                </button>
              </div>
              <button
                onClick={handleReset}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                ← Upload New Meeting
              </button>
            </div>

            {/* Content */}
            {activeTab === "summary" ? (
              <SummaryView summary={meetingData.summary} />
            ) : (
              <TranscriptView transcript={meetingData.transcript} />
            )}
          </div>
        )}
      </div>
    </main>
  );
}