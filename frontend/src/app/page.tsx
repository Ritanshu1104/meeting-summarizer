"use client";

import { useState } from "react";
import axios from "axios";
import { Sparkles, CheckCircle2, AlertCircle, Zap, Shield, RotateCcw } from "lucide-react";
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
    setUploadState({ isUploading: true, isProcessing: false, error: null, progress: 0 });
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post<MeetingResponse>(
        `${API_URL}/api/v1/meetings/process`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const progress = progressEvent.total ? Math.round((progressEvent.loaded * 100) / progressEvent.total) : 0;
            setUploadState((prev) => ({ ...prev, progress }));
          },
        }
      );
      setMeetingData(response.data);
      setUploadState({ isUploading: false, isProcessing: false, error: null, progress: 100 });
    } catch (error) {
      console.error("Upload error:", error);
      setUploadState({
        isUploading: false,
        isProcessing: false,
        error: axios.isAxiosError(error) && error.response?.data?.detail ? error.response.data.detail : "Failed to process meeting.",
        progress: 0,
      });
    }
  };

  const handleReset = () => {
    setMeetingData(null);
    setUploadState({ isUploading: false, isProcessing: false, error: null, progress: 0 });
    setActiveTab("summary");
  };

  return (
    <main className="min-h-screen bg-[#ecf2f7] text-[#102a43] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute -top-40 right-[-8rem] h-[34rem] w-[34rem] rounded-full bg-[#87c23f]/20 blur-3xl -z-10" />
      <div className="absolute top-56 left-[-12rem] h-[28rem] w-[28rem] rounded-full bg-[#8bbbd2]/25 blur-3xl -z-10" />

      <div className="relative z-10 mx-3 my-3 md:my-8 lg:mx-auto max-w-2xl overflow-hidden rounded-[1.75rem] border border-white/90 bg-[#f7fbfd]/90 shadow-[0_28px_90px_rgba(16,42,67,0.18)] backdrop-blur-xl">
        {/* Header */}
        <header className="bg-[#102a43] text-white">
          <div className="px-5 py-4 sm:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-[#87c23f] p-2.5 rounded-2xl shadow-lg shadow-black/20">
              <Sparkles className="w-5 h-5 text-[#102a43]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-[-0.03em] text-[#ffffff]">
                briefly<span className="text-[#b9e77a]">.</span>
              </h1>
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#9db4c5] font-semibold">Meeting intelligence</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#b9cbd7]">
            <span className="h-2 w-2 rounded-full bg-[#b9e77a] animate-pulse" />
            <span>Ready when you are</span>
          </div>
          </div>
        </header>

        <div className="px-5 py-8 sm:px-10 md:px-12 md:py-10">
        {!meetingData ? (
          /* Upload Section */
          <div className="max-w-3xl mx-auto animate-fade-in">
            <div className="text-center mb-8">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#5d8e27]">Your next clear conversation</p>
              <h2 className="text-4xl md:text-5xl font-bold leading-[1] text-[#102a43] mb-4 tracking-[-0.055em]">
                Make meetings<br /><span className="text-[#24638c]">move faster.</span>
              </h2>
              <p className="text-base md:text-lg text-[#60758a] max-w-xl mx-auto leading-relaxed">
                Drop in a recording and get the decisions, owners, and next steps that keep work moving.
              </p>
            </div>

            <div className="bg-white rounded-[1.5rem] shadow-[0_18px_50px_rgba(16,42,67,0.10)] border border-[#dce7ee] p-3 md:p-4">
              <FileUpload onFileUpload={handleFileUpload} uploadState={uploadState} />

              {uploadState.error && (
                <div className="mt-3 bg-[#fff3ed] border border-[#f2c6b0] rounded-2xl p-4 flex items-start gap-3 animate-fade-in">
                  <AlertCircle className="w-5 h-5 text-[#c64f32] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-[#a13d27] font-medium">{uploadState.error}</p>
                </div>
              )}
            </div>

            {/* Features Grid */}
            <div className="mt-7 grid grid-cols-1 gap-2">
              {[
                { icon: Zap, title: "Quick clarity", desc: "Turn long recordings into a focused brief" },
                { icon: Shield, title: "Thoughtful privacy", desc: "Your file is used only to create your summary" },
                { icon: CheckCircle2, title: "Built for action", desc: "Find tasks, owners, and deadlines at a glance" },
              ].map((feature, idx) => (
                <div key={idx} className="bg-white/75 rounded-2xl border border-[#dce7ee] p-4 flex items-start gap-3 hover:bg-white hover:shadow-md transition-all duration-300">
                  <div className="bg-[#e8f5d9] w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-[#5d8e27]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#102a43] mb-1">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-[#71869a]">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Results Section */
          <div className="space-y-5 animate-fade-in">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-2xl shadow-[0_12px_40px_rgba(16,42,67,0.08)] p-3 border border-[#dce7ee]">
              <div className="flex items-center gap-2 bg-[#edf3f7] p-1 rounded-xl">
                <button
                  onClick={() => setActiveTab("summary")}
                  className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    activeTab === "summary" ? "bg-[#102a43] text-white shadow-sm" : "text-[#71869a] hover:text-[#102a43]"
                  }`}
                >
                  Summary
                </button>
                <button
                  onClick={() => setActiveTab("transcript")}
                  className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    activeTab === "transcript" ? "bg-[#102a43] text-white shadow-sm" : "text-[#71869a] hover:text-[#102a43]"
                  }`}
                >
                  Transcript
                </button>
              </div>
              <button
                onClick={handleReset}
                className="mt-3 sm:mt-0 inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#60758a] hover:text-[#24638c] hover:bg-[#e8f5d9] rounded-xl transition-all"
              >
                <RotateCcw className="h-4 w-4" />
                Process new meeting
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

        {/* Footer */}
        <footer className="border-t border-[#dce7ee] py-4 text-center text-[#8aa0b1] text-xs uppercase tracking-[0.14em]">
          <p>© 2026 Ritanshu Mahajan <span className="mx-2">·</span> Made for better meetings</p>
        </footer>
      </div>
    </main>
  );
}