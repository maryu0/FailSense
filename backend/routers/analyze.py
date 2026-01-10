from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from groq import Groq
import os
import json
import re

router = APIRouter()

def get_groq_client():
    """Get Groq client with API key from environment"""
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise HTTPException(
            status_code=500, 
            detail="GROQ_API_KEY not found in environment variables"
        )
    return Groq(api_key=api_key)

class LogInput(BaseModel):
    log_text: str
    language: str  # python, javascript, java, etc.

class Fix(BaseModel):
    fix: str
    confidence: float
    explanation: str

class AnalysisResponse(BaseModel):
    root_cause: str
    error_type: str
    fixes: list[Fix]
    explanation: str

@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_error(input: LogInput):
    """Analyze CI/CD error logs and provide structured debugging assistance."""
    
    if not input.log_text.strip():
        raise HTTPException(status_code=400, detail="Log text cannot be empty")
    
    prompt = f"""You are an expert CI/CD debugger. Analyze this {input.language} error log and provide structured output.

ERROR LOG:
{input.log_text}

Respond ONLY with valid JSON in this exact format:
{{
  "root_cause": "One sentence describing the core issue",
  "error_type": "One of: dependency, syntax, runtime, configuration, test_failure, network, permission",
  "fixes": [
    {{"fix": "Specific actionable fix 1", "confidence": 0.95, "explanation": "Why this works"}},
    {{"fix": "Alternative fix 2", "confidence": 0.80, "explanation": "Why this works"}},
    {{"fix": "Fallback fix 3", "confidence": 0.60, "explanation": "Why this works"}}
  ],
  "explanation": "2-3 sentence technical explanation of why this error occurred"
}}

Be concise, actionable, and rank fixes by confidence."""

    try:
        client = get_groq_client()
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",  # Updated to current model
            messages=[
                {"role": "system", "content": "You are a debugging expert. Respond only with valid JSON."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=2048
        )
        
        # Extract text content
        response_text = completion.choices[0].message.content
        
        # Extract JSON from response (sometimes LLM adds extra text)
        json_match = re.search(r'\{[\s\S]*\}', response_text)
        if json_match:
            json_str = json_match.group(0)
            parsed = json.loads(json_str)
        else:
            parsed = json.loads(response_text)
        
        return AnalysisResponse(
            root_cause=parsed.get("root_cause", "Unable to determine root cause"),
            error_type=parsed.get("error_type", "unknown"),
            fixes=[
                Fix(
                    fix=fix.get("fix", ""),
                    confidence=fix.get("confidence", 0.5),
                    explanation=fix.get("explanation", "")
                ) for fix in parsed.get("fixes", [])[:3]
            ],
            explanation=parsed.get("explanation", "")
        )
        
    except json.JSONDecodeError as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Failed to parse AI response: {str(e)}"
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Analysis failed: {str(e)}"
        )
