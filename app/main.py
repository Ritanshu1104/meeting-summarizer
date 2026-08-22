from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import meetings

app = FastAPI(
    title="Meeting Summarizer API",
    description="Transcribe meeting audio and generate action-oriented summaries.",
    version="1.0.0"
)

# CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Restrict to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(meetings.router)

@app.get("/")
async def root():
    return {"message": "Meeting Summarizer API is running."}