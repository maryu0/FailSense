import React from 'react';
import { Loader2 } from 'lucide-react';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md';
  isLoading?: boolean;
  children: React.ReactNode;
}
export function Button({
  variant = 'secondary',
  size = 'md',
  isLoading = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-github-info focus:ring-offset-2 focus:ring-offset-github-bg leading-5 select-none disabled:opacity-70 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-github-btn-primary hover:bg-github-btn-primaryHover text-white border-[rgba(240,246,252,0.1)] shadow-[0_0_12px_rgba(46,160,67,0.3)] hover:shadow-[0_0_20px_rgba(46,160,67,0.5)] hover:scale-105 active:scale-95',
    secondary: 'bg-github-btn-bg hover:bg-github-btn-hover text-github-text-primary border-github-btn-border shadow-sm active:scale-95',
    danger: 'bg-github-btn-bg hover:bg-github-error/10 text-github-error border-github-btn-border hover:border-github-error/50 shadow-sm active:scale-95'
  };
  const sizes = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-2 text-sm'
  };
  return <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} disabled={isLoading || props.disabled} {...props}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>;
}