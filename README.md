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

### Data Flow
1. User uploads audio file via web interface
2. Frontend sends file to FastAPI backend
3. Backend transcribes audio using Whisper API
4. Transcript is sent to GPT-4 for structured summarization
5. JSON response returned to frontend for display

---

##  Installation

### Prerequisites
- Python 3.11 or higher
- Node.js 18 or higher
- OpenAI API Key ([Get one here](https://platform.openai.com/api-keys))
- Git

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/meeting-summarizer.git
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