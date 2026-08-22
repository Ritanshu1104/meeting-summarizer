"use client";

import { CheckCircle2, Clock, User, MessageSquare } from "lucide-react";
import { MeetingSummary } from "@/types";

interface SummaryViewProps {
  summary: MeetingSummary;
}

export default function SummaryView({ summary }: SummaryViewProps) {
  return (
    <div className="space-y-6">
      {/* Executive Summary */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          Executive Summary
        </h2>
        <p className="text-slate-700 leading-relaxed">{summary.executive_summary}</p>
      </div>

      {/* Key Decisions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          Key Decisions
        </h2>
        <ul className="space-y-3">
          {summary.key_decisions.map((decision, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-green-700 text-sm font-semibold">{idx + 1}</span>
              </div>
              <p className="text-slate-700">{decision}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Items */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-blue-600" />
          Action Items
        </h2>
        {summary.action_items.length > 0 ? (
          <div className="space-y-3">
            {summary.action_items.map((item, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <p className="text-slate-900 font-medium mb-2">{item.task}</p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <User className="w-4 h-4" />
                    <span>{item.assignee}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Clock className="w-4 h-4" />
                    <span>{item.deadline}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-600 italic">No action items identified</p>
        )}
      </div>

      {/* Open Questions */}
      {summary.open_questions.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-amber-600" />
            Open Questions
          </h2>
          <ul className="space-y-2">
            {summary.open_questions.map((question, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">•</span>
                <span className="text-amber-900">{question}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}