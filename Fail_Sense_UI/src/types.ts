export interface Fix {
  fix: string;
  confidence: number;
  explanation: string;
  feedback?: "worked" | "failed" | null;
}

export interface AnalysisResult {
  root_cause: string;
  error_type: string;
  fixes: Fix[];
  explanation: string;
}

export interface Language {
  value: string;
  label: string;
}
