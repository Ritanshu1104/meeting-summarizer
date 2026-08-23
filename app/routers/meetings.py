import uuid
import os
import tempfile # <--- ADD THIS IMPORT
from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.asr_service import transcribe_audio
from app.services.llm_service import generate_summary
from app.schemas.meeting import MeetingResponse

router = APIRouter(prefix="/api/v1/meetings", tags=["Meetings"])

ALLOWED_EXTENSIONS = {".mp3", ".wav", ".m4a", ".mp4", ".mpeg", ".webm"}

@router.post("/process", response_model=MeetingResponse)
async def process_meeting(file: UploadFile = File(...)):
    # 1. Validate file extension
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail=f"Unsupported format. Allowed: {ALLOWED_EXTENSIONS}")

    # 2. Save file temporarily (CROSS-PLATFORM FIX)
    file_id = str(uuid.uuid4())
    
    # Use tempfile.gettempdir() to get the correct temp folder for Windows/Mac/Linux
    temp_dir = tempfile.gettempdir() 
    temp_file_path = os.path.join(temp_dir, f"{file_id}_{file.filename}")
    
    try:
        with open(temp_file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)

        # 3. Transcribe Audio (ASR)
        transcript_text = await transcribe_audio(temp_file_path)

        # 4. Generate Summary (LLM)
        summary_data = await generate_summary(transcript_text)

        return MeetingResponse(
            meeting_id=file_id,
            transcript=transcript_text,
            summary=summary_data
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Processing failed: {str(e)}")
    
    finally:
        # 5. Clean up temp file to prevent disk space issues
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)