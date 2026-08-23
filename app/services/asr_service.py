from faster_whisper import WhisperModel
from app.core.config import settings

# Initialize the model once (downloads automatically on first run).
# CPU is the default so the backend does not require a CUDA runtime.
model = WhisperModel(
    settings.WHISPER_MODEL_SIZE,
    device=settings.WHISPER_DEVICE,
    compute_type=settings.WHISPER_COMPUTE_TYPE,
)

async def transcribe_audio(file_path: str) -> str:
    """Transcribes an audio file using local Faster-Whisper (100% Free)."""
    print(f"Starting transcription for {file_path}...")
    
    # Transcribe the audio
    segments, info = model.transcribe(file_path, beam_size=5)
    
    # Combine all segments into a single text string
    transcript = "".join([segment.text + " " for segment in segments])
    
    print(f"Transcription complete. Detected language: {info.language}")
    return transcript.strip()