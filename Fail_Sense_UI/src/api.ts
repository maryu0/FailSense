import type { AnalysisResult } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function analyzeError(
  logText: string,
  language: string
): Promise<AnalysisResult> {
  const response = await fetch(`${API_BASE_URL}/api/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      log_text: logText,
      language: language,
    }),
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ detail: "Analysis failed" }));
    throw new Error(error.detail || "Failed to analyze error");
  }

  return response.json();
}

export async function getSupportedLanguages() {
  const response = await fetch(`${API_BASE_URL}/api/supported-languages`);

  if (!response.ok) {
    throw new Error("Failed to fetch languages");
  }

  return response.json();
}
