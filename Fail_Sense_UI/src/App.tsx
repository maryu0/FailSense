import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { CodeEditor } from "./components/CodeEditor";
import { ResultsPanel } from "./components/ResultsPanel";
import { RecentAnalyses } from "./components/RecentAnalyses";
import { Documentation } from "./components/Documentation";
import { Preferences } from "./components/Preferences";
import { analyzeError } from "./api";
import type { AnalysisResult } from "./types";

type View = "analyzer" | "history" | "docs" | "preferences";

interface HistoryItem {
  id: string;
  timestamp: number;
  code: string;
  result: AnalysisResult;
  language: string;
  workedFixIndex?: number | null;
  tags?: string[];
}

export function App() {
  const [view, setView] = useState<View>("analyzer");
  const [highlightedLine, setHighlightedLine] = useState<number | null>(null);
  const [currentHistoryId, setCurrentHistoryId] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [code, setCode] = useState(`Traceback (most recent call last):
  File "app.py", line 10, in <module>
    result = calculate(data)
  File "app.py", line 5, in calculate
    return x / y
ZeroDivisionError: division by zero`);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLineClick = (line: number) => {
    setHighlightedLine(line);
    // Optional: clear highlight after a few seconds
    setTimeout(() => setHighlightedLine(null), 3000);
  };

  const handleAnalyze = async () => {
    if (!code.trim()) {
      setError("Please enter some code to analyze");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeError(code, "javascript");
      setResult(data);

      // Save to localStorage
      const historyItem: HistoryItem = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        code,
        result: data,
        language: "javascript",
        workedFixIndex: null,
        tags: tags.length > 0 ? tags : undefined,
      };

      setCurrentHistoryId(historyItem.id);
      setTags([]); // Clear tags after saving

      const history = JSON.parse(
        localStorage.getItem("failsense-history") || "[]"
      );
      const updatedHistory = [historyItem, ...history].slice(0, 20); // Keep last 20
      localStorage.setItem("failsense-history", JSON.stringify(updatedHistory));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  const loadHistoryItem = (item: HistoryItem) => {
    setCode(item.code);
    setResult(item.result);
    setError(null);
    setCurrentHistoryId(item.id);
    setTags(item.tags || []);
    setView("analyzer");
  };

  const handleFixFeedback = (fixIndex: number, worked: boolean) => {
    if (!currentHistoryId) return;

    const history: HistoryItem[] = JSON.parse(
      localStorage.getItem("failsense-history") || "[]"
    );

    const updatedHistory = history.map((item) => {
      if (item.id === currentHistoryId) {
        return {
          ...item,
          workedFixIndex: worked ? fixIndex : null,
        };
      }
      return item;
    });

    localStorage.setItem("failsense-history", JSON.stringify(updatedHistory));

    // Update result state to reflect feedback
    if (result) {
      const updatedFixes = result.fixes.map((fix, idx) => ({
        ...fix,
        feedback: idx === fixIndex ? (worked ? "worked" : "failed") : null,
      }));
      setResult({ ...result, fixes: updatedFixes });
    }
  };
  return (
    <div className="flex h-screen w-full bg-github-bg text-github-text-primary overflow-hidden font-sans selection:bg-github-info/20">
      <Sidebar currentView={view} onViewChange={setView} />

      <main className="flex-1 flex flex-col min-w-0">
        {view === "analyzer" ? (
          <>
            {/* Minimal Header */}
            <header className="h-16 flex items-center px-8 justify-between flex-shrink-0 bg-github-bg">
              <div className="flex items-center gap-4">
                <h1 className="text-base font-semibold text-github-text-primary tracking-tight">
                  Error Log Analysis
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-github-surface border border-github-border/50 text-xs text-github-text-secondary font-mono">
                  AI-Powered
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-github-text-secondary">
                <span>Ready to analyze</span>
              </div>
            </header>

            {/* Main Content Area */}
            <div className="flex-1 flex overflow-hidden">
              {/* Left Column: Editor */}
              <div className="flex-1 px-8 pb-8 min-w-0 bg-github-bg overflow-y-auto">
                <div className="h-full flex flex-col">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-github-text-primary mb-2 tracking-tight">
                      Source Code
                    </h2>
                    <p className="text-sm text-github-text-secondary leading-relaxed max-w-2xl">
                      Review and edit the implementation logic below. Changes
                      are auto-saved.
                    </p>
                  </div>
                  <div className="flex-1 min-h-[400px] rounded-lg border border-github-border/30 bg-github-bg overflow-hidden shadow-sm">
                    <CodeEditor
                      highlightedLine={highlightedLine}
                      code={code}
                      setCode={setCode}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Results */}
              <div className="w-[480px] px-8 pb-8 pt-0 bg-github-bg overflow-hidden flex-shrink-0 border-l border-github-border/30">
                <ResultsPanel
                  onLineClick={handleLineClick}
                  result={result}
                  error={error}
                  loading={loading}
                  onAnalyze={handleAnalyze}
                  onFixFeedback={handleFixFeedback}
                  tags={tags}
                  onTagsChange={setTags}
                />
              </div>
            </div>
          </>
        ) : view === "history" ? (
          <RecentAnalyses onLoadAnalysis={loadHistoryItem} />
        ) : view === "docs" ? (
          <Documentation />
        ) : (
          <Preferences />
        )}
      </main>
    </div>
  );
}
