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
