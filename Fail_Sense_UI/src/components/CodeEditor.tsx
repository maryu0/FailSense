import React, { useEffect, useState, useRef } from "react";
interface CodeEditorProps {
  highlightedLine?: number | null;
  code: string;
  setCode: (code: string) => void;
}
export function CodeEditor({
  highlightedLine,
  code,
  setCode,
}: CodeEditorProps) {
  const lines = code.split("\n");
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Scroll to highlighted line
  useEffect(() => {
    if (highlightedLine && lineRefs.current[highlightedLine - 1]) {
      lineRefs.current[highlightedLine - 1]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [highlightedLine]);
  return (
    <div className="flex flex-col h-full bg-github-bg overflow-hidden relative group">
      {/* Minimal Header */}
      <div className="absolute top-0 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <span className="text-xs text-github-text-secondary bg-github-surface px-2 py-1 rounded border border-github-border">
          JavaScript
        </span>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Line Numbers */}
        <div className="flex flex-col items-end pr-6 py-4 bg-github-bg select-none min-w-[3.5rem] text-right z-10">
          {lines.map((_, i) => (
            <div
              key={i}
              className={`text-sm font-mono leading-7 h-7 transition-colors duration-200 ${
                highlightedLine === i + 1
                  ? "text-github-text-primary font-bold"
                  : "text-github-text-tertiary"
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* Editor Container */}
        <div className="flex-1 relative overflow-hidden">
          {/* Highlight Layer */}
          <div className="absolute inset-0 top-4 pointer-events-none">
            {lines.map((_, i) => (
              <div
                key={i}
                ref={(el) => (lineRefs.current[i] = el)}
                className={`h-7 w-full transition-colors duration-300 ${
                  highlightedLine === i + 1
                    ? "bg-github-warning/10 border-l-2 border-github-warning"
                    : ""
                }`}
              />
            ))}
          </div>

          {/* Editor Area */}
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="absolute inset-0 p-4 bg-transparent text-github-text-primary font-mono text-sm leading-7 resize-none focus:outline-none border-none w-full h-full whitespace-pre z-20"
            spellCheck={false}
            placeholder="Paste your code or logs here..."
          />
        </div>
      </div>
    </div>
  );
}
