import React from 'react';
interface ProgressBarProps {
  value: number; // 0 to 100
  color?: 'success' | 'warning' | 'error' | 'info';
  showLabel?: boolean;
  label?: string;
}
export function ProgressBar({
  value,
  color = 'success',
  showLabel = false,
  label
}: ProgressBarProps) {
  const colors = {
    success: 'bg-github-success',
    warning: 'bg-github-warning',
    error: 'bg-github-error',
    info: 'bg-github-info'
  };
  return <div className="w-full">
      {(showLabel || label) && <div className="flex justify-between text-xs mb-1 text-github-text-secondary">
          <span>{label || 'Confidence'}</span>
          <span>{value}%</span>
        </div>}
      <div className="w-full bg-github-btn-bg rounded-full h-2 overflow-hidden border border-github-border">
        <div className={`h-full ${colors[color]} transition-all duration-500 ease-out`} style={{
        width: `${Math.min(100, Math.max(0, value))}%`
      }} />
      </div>
    </div>;
}