import json
from openai import OpenAI
from app.core.config import settings
from app.schemas.meeting import MeetingSummary

client = OpenAI(api_key=settings.OPENAI_API_KEY)

SYSTEM_PROMPT = """
You are an expert executive assistant and project manager. 
Your task is to analyze meeting transcripts and extract highly actionable, structured insights.

Rules:
1. Be concise but comprehensive. Do not miss any assigned tasks.
2. If a task has no explicit assignee, mark it as "Unassigned".
3. If a deadline is not mentioned, mark it as "TBD".
4. Output ONLY valid JSON. No markdown formatting or conversational text.
"""

USER_PROMPT_TEMPLATE = """
Analyze the following meeting transcript and extract the key information.

Transcript:
{transcript}

Return the data in this exact JSON structure:
{{
  "executive_summary": "A 3-4 sentence high-level overview of the meeting's purpose and main outcomes.",
  "key_decisions": [
    "Decision 1",
    "Decision 2"
  ],
  "action_items": [
    {{
      "task": "Clear description of the task",
      "assignee": "Name of the person or 'Unassigned'",
      "deadline": "Specific date or 'TBD'"
    }}
  ],
  "open_questions": [
    "Unresolved questions or topics for future discussion"
  ]
}}
"""

async def generate_summary(transcript: str) -> MeetingSummary:
    """Generates a structured summary from a transcript using an LLM."""
    user_prompt = USER_PROMPT_TEMPLATE.format(transcript=transcript)
    
    response = client.chat.completions.create(
        model=settings.OPENAI_MODEL,
        response_format={ "type": "json_object" }, # Forces valid JSON output
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.2 # Low temperature for factual extraction
    )
    
    content = response.choices[0].message.content
    parsed_data = json.loads(content)
    
    # Pydantic validates the LLM output against our schema
    return MeetingSummary(**parsed_data)