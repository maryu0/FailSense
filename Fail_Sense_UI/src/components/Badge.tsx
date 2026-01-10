import React from 'react';
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  className?: string;
}
export function Badge({
  children,
  variant = 'default',
  className = ''
}: BadgeProps) {
  const variants = {
    default: 'border-github-border text-github-text-secondary',
    success: 'border-github-success/40 text-github-success',
    warning: 'border-github-warning/40 text-github-warning',
    error: 'border-github-error/40 text-github-error',
    info: 'border-github-info/40 text-github-info'
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border bg-transparent ${variants[variant]} ${className}`}>
      {children}
    </span>;
}