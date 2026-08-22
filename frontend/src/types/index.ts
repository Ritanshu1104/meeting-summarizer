export interface ActionItem {
  task: string;
  assignee: string;
  deadline: string;
}

export interface MeetingSummary {
  executive_summary: string;
  key_decisions: string[];
  action_items: ActionItem[];
  open_questions: string[];
}

export interface MeetingResponse {
  meeting_id: string;
  transcript: string;
  summary: MeetingSummary;
}

export interface UploadState {
  isUploading: boolean;
  isProcessing: boolean;
  error: string | null;
  progress: number;
}