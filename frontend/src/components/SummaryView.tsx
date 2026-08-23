"use client";

import { CheckCircle2, Clock, User, MessageSquare, Target, Lightbulb } from "lucide-react";
import { MeetingSummary } from "@/types";

interface SummaryViewProps {
  summary: MeetingSummary;
}

export default function SummaryView({ summary }: SummaryViewProps) {
  return (
    <div className="space-y-6">
      {/* Executive Summary */}
      <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 p-8 border border-slate-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-100 p-2 rounded-lg">
            <MessageSquare className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Executive Summary</h2>
        </div>
        <p className="text-slate-600 leading-relaxed text-lg">{summary.executive_summary}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Key Decisions */}
        <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 p-8 border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-emerald-100 p-2 rounded-lg">
              <Target className="w-5 h-5 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Key Decisions</h2>
          </div>
          <ul className="space-y-4">
            {summary.key_decisions.map((decision, idx) => (
              <li key={idx} className="flex items-start gap-3 group">
                <div className="w-6 h-6 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-emerald-100 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-slate-700 font-medium">{decision}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Open Questions */}
        <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 p-8 border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-amber-100 p-2 rounded-lg">
              <Lightbulb className="w-5 h-5 text-amber-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Open Questions</h2>
          </div>
          {summary.open_questions.length > 0 ? (
            <ul className="space-y-4">
              {summary.open_questions.map((question, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-amber-400 text-2xl leading-none mt-[-2px]">?</span>
                  <span className="text-slate-700 font-medium">{question}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-400 italic">No open questions identified.</p>
          )}
        </div>
      </div>

      {/* Action Items */}
      <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 p-8 border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <CheckCircle2 className="w-5 h-5 text-indigo-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Action Items</h2>
        </div>
        
        {summary.action_items.length > 0 ? (
          <div className="space-y-3">
            {summary.action_items.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 rounded-xl p-5 border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all duration-200"
              >
                <div className="flex-1">
                  <p className="text-slate-900 font-semibold text-base">{item.task}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-sm">
                    <User className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-medium text-slate-700">{item.assignee}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-sm">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-medium text-slate-700">{item.deadline}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400 italic">No action items identified.</p>
        )}
      </div>
    </div>
  );
}