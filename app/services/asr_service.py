from openai import OpenAI
from app.core.config import settings

client = OpenAI(api_key=settings.OPENAI_API_KEY)

async def transcribe_audio(file_path: str) -> str:
    """Transcribes an audio file using OpenAI Whisper."""
    with open(file_path, "rb") as audio_file:
        transcription = client.audio.transcriptions.create(
            model=settings.WHISPER_MODEL,
            file=audio_file,
            response_format="text"
        )
    return transcription