# ️ Meeting Summarizer

[![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111.0-green.svg)](https://fastapi.tiangolo.com/)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black.svg)](https://nextjs.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-API-black.svg)](https://openai.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**AI-powered meeting transcription and summarization tool that automatically extracts action items, key decisions, and insights from audio recordings.**

---

## 📋 Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Evaluation Criteria](#evaluation-criteria)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

- **🎯 Automated Speech Recognition (ASR)**  
  High-accuracy transcription using OpenAI Whisper API

- ** AI-Powered Summarization**  
  Intelligent extraction of key decisions, action items, and open questions using GPT-4

- ** Structured Output**  
  Clean, organized summaries with assignees, deadlines, and task tracking

- **🎨 Modern Web Interface**  
  Intuitive drag-and-drop upload with real-time progress tracking

- **🔍 Dual View Modes**  
  Switch between executive summary and full transcript views

- **📱 Responsive Design**  
  Works seamlessly on desktop, tablet, and mobile devices

- **⚡ Fast Processing**  
  Asynchronous backend with optimized API calls

---

## 🎬 Demo

![Demo GIF](./assets/demo.gif)

**Live Demo:** [Coming Soon]

**Video Demo:** [Watch Demo Video](./demo.mp4)

---

## 🛠️ Tech Stack

### Backend
- **FastAPI** - High-performance async web framework
- **OpenAI Whisper** - State-of-the-art speech recognition
- **GPT-4 / Claude 3.5** - Advanced language model for summarization
- **Pydantic** - Data validation and settings management
- **Uvicorn** - ASGI server for production deployment

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client for API calls
- **Lucide React** - Beautiful icon library

### Tools & Services
- **OpenAI API** - ASR and LLM services
- **Python 3.11+** - Backend runtime
- **Node.js 18+** - Frontend runtime

---

## 🏗️ Architecture

┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐

│ Frontend │────▶│ Backend API │────▶│ OpenAI API │

│ (Next.js) │────│ (FastAPI) │◀────│ (Whisper+GPT) │

└─────────────────┘ └─────────────────┘ └─────────────────┘

│ │

│ │

▼ ▼

┌─────────────────┐ ┌─────────────────┐

│ User Upload │ │ Temp Storage │

│ (Audio File) │ │ (Processing) │

└─────────────────┘ └─────────────────┘


Data Flow
1.User uploads audio file via the web interface.
2.Frontend sends the file to the FastAPI backend.
3.Backend transcribes audio using the Whisper API.
4.Transcript is sent to GPT-4o for structured summarization via prompt engineering.
5.Validated JSON response is returned to the frontend for display.

📦 Installation
Prerequisites:
Python 3.11 or higher
Node.js 18 or higher
OpenAI API Key (Get one here)
Git

Backend Setup:
# Clone the repository
git clone https://github.com/[YourGitHub]/meeting-summarizer.git
cd meeting-summarizer

# Create and activate virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file with your OpenAI API key
echo "OPENAI_API_KEY=your_api_key_here" > .env

# Start the backend server
uvicorn app.main:app --reload

The backend will run on http://localhost:8000


Frontend Setup:
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env.local file
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# Start the development server
npm run dev

The frontend will run on http://localhost:3000


🚀 Usage
Web Interface
Navigate to the application: Open http://localhost:3000 in your browser.
Upload audio file:
Drag and drop your audio file, or click to browse.
Supported formats: MP3, WAV, M4A, MP4, WebM.
Maximum file size: 25MB (OpenAI Whisper API limit).
View results:
Summary Tab: View executive summary, key decisions, action items, and open questions.
Transcript Tab: Read the full meeting transcript.
API Usage
You can also use the API directly via cURL:
curl -X POST "http://localhost:8000/api/v1/meetings/process" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@path/to/your/meeting.mp3"


  📚 API Documentation
Endpoints
POST /api/v1/meetings/process
Process an audio file and return transcript with summary.
Content-Type: multipart/form-data
Body: file (required): Audio file
GET /docs
Interactive API documentation (Swagger UI) provided automatically by FastAPI.


📁 Project Structure:

meeting-summarizer/
├── app/                          # Backend application
│   ├── __init__.py
│   ├── main.py                   # FastAPI app initialization
│   ├── core/                     # Core configuration
│   │   ├── __init__.py
│   │   └── config.py             # Environment settings
│   ├── routers/                  # API route handlers
│   │   ├── __init__.py
│   │   └── meetings.py           # Meeting endpoints
│   ├── schemas/                  # Pydantic models
│   │   ├── __init__.py
│   │   └── meeting.py            # Data schemas
│   ── services/                 # Business logic
│       ├── __init__.py
│       ├── asr_service.py        # Whisper API integration
│       └── llm_service.py        # GPT integration
├── frontend/                     # Next.js frontend
│   ├── src/
│   │   ├── app/                  # Next.js app router
│   │   │   ├── globals.css       # Global styles
│   │   │   ├── layout.tsx        # Root layout
│   │   │   └── page.tsx          # Home page
│   │   ├── components/           # React components
│   │   │   ├── FileUpload.tsx    # Upload component
│   │   │   ├── SummaryView.tsx   # Summary display
│   │   │   └── TranscriptView.tsx # Transcript display
│   │   └── types/                # TypeScript types
│   │       └── index.ts
│   ├── public/                   # Static assets
│   ├── .env.local                # Frontend environment
│   ├── next.config.js            # Next.js config
│   ├── package.json
│   └── tailwind.config.ts        # Tailwind config
├── .env.example                  # Environment template
├── requirements.txt              # Python dependencies
├── README.md                     # This file
└── LICENSE                       # MIT License


🎯 Evaluation Criteria
This project is built to specifically address and excel in the following evaluation metrics:

✅ Transcription Accuracy
Implementation: Utilizes OpenAI's whisper-1 model, currently the industry standard for robust speech recognition.
Optimization: Handles various audio formats and provides high fidelity even with minor background noise.

✅ Summary Quality
Action-Oriented: The LLM is explicitly prompted to extract actionable insights rather than just summarizing text.
Context-Aware: Maintains meeting context, clearly separating decisions from open questions.

✅ LLM Prompt Effectiveness
Structured Extraction: Uses response_format={ "type": "json_object" } to guarantee valid JSON output.
Prompt Engineering: Implements a strict system prompt with clear rules (e.g., handling missing assignees/deadlines).
Validation: Pydantic models validate the LLM output before it reaches the frontend, preventing UI crashes.

✅ Code Structure
Modular Architecture: Strict separation of concerns (Routers, Services, Schemas, Core).
Type Safety: TypeScript on the frontend and Pydantic on the backend ensure end-to-end type safety.
Clean Code: Follows PEP 8, uses async/await for non-blocking I/O, and includes comprehensive error handling.


🐛 Troubleshooting
1. "ModuleNotFoundError: No module named 'app'"
Make sure you are in the root meeting-summarizer directory when running the uvicorn command.
2. "OpenAI API key not found"
Ensure your .env file is in the root directory and contains OPENAI_API_KEY=sk-....
3. Frontend CORS errors
Ensure the backend is running on port 8000. The CORS middleware in app/main.py is configured to allow all origins for development.
4. File upload fails
Check that the file size is under 25MB (Whisper API limit).
Verify the file format is supported (mp3, wav, m4a, mp4, webm).


📄 License
This project is licensed under the MIT License. See the LICENSE file for details.

👥 Author
Ritanshu Mahajan

GitHub: @github.com/Ritanshu1104

Email: ritanshupm@gmail.com
  
<div align="center">

Made with ❤️ using FastAPI, Next.js, and OpenAI
⭐ Star this repo if you find it useful!
