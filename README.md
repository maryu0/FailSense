# FailSense - AI-Powered Error Debugging Assistant

An intelligent tool that analyzes error logs and provides ranked solutions using AI.

## Features
-  AI-powered error analysis (Groq Llama 3.3)
-  Ranked solutions with confidence scores
-  Tag and organize analyses
-  Export reports (Markdown/Text)
-  Search and filter history
-  Solution tracking (mark what worked)

## Tech Stack
- **Backend:** FastAPI, Python, Groq AI
- **Frontend:** React, TypeScript, Vite, Tailwind CSS

## Local Development

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
$env:HTTP_PROXY=""; $env:HTTPS_PROXY=""; python main.py
```

### Frontend
```bash
cd Fail_Sense_UI
npm install
npm run dev
```

## Environment Variables

**Backend (.env):**
```
GROQ_API_KEY=your_key_here
```

**Frontend (.env):**
```
VITE_API_URL=http://localhost:8000
```

## Deployment
- Backend: Railway
- Frontend: Vercel

## License
MIT
