"use client";

import { FileText } from "lucide-react";

interface TranscriptViewProps {
  transcript: string;
}

export default function TranscriptView({ transcript }: TranscriptViewProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
        <FileText className="w-5 h-5 text-slate-600" />
        Full Transcript
      </h2>
      <div className="prose prose-slate max-w-none">
        <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
          {transcript}
        </p>
      </div>
    </div>
  );
}