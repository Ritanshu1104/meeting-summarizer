"use client";

import { FileText } from "lucide-react";

interface TranscriptViewProps {
  transcript: string;
}

export default function TranscriptView({ transcript }: TranscriptViewProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 p-8 border border-slate-100">
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
        <div className="bg-slate-100 p-2 rounded-lg">
          <FileText className="w-5 h-5 text-slate-600" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Full Transcript</h2>
      </div>
      <div className="prose prose-slate max-w-none">
        <p className="text-slate-700 leading-[1.8] text-lg whitespace-pre-wrap font-light">
          {transcript}
        </p>
      </div>
    </div>
  );
}