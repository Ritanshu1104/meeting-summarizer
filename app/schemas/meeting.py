from pydantic import BaseModel
from typing import List

class ActionItem(BaseModel):
    task: str
    assignee: str
    deadline: str

class MeetingSummary(BaseModel):
    executive_summary: str
    key_decisions: List[str]
    action_items: List[ActionItem]
    open_questions: List[str]

class MeetingResponse(BaseModel):
    meeting_id: str
    transcript: str
    summary: MeetingSummary