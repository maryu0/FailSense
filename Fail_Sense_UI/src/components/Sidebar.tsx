import React from "react";
import {
  AlertCircle,
  History,
  FileText,
  Settings,
  Zap,
  Github,
} from "lucide-react";

type View = "analyzer" | "history" | "docs" | "preferences";

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
}
function SidebarItem({ icon: Icon, label, active, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-all duration-200 ${
        active
          ? "bg-github-btn-bg text-github-text-primary font-medium"
          : "text-github-text-secondary hover:text-github-text-primary hover:bg-github-btn-hover/50"
      }`}
    >
      <Icon
        size={16}
        className={
          active ? "text-github-text-primary" : "text-github-text-secondary"
        }
      />
      <span>{label}</span>
    </button>
  );
}
export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  return (
    <aside className="w-64 bg-github-bg flex flex-col h-full flex-shrink-0 pt-6 pb-4 px-4">
      <div className="px-3 mb-8 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-github-danger/20 to-github-warning/20 border border-github-danger/30 flex items-center justify-center">
          <Zap className="text-github-warning" size={18} />
        </div>
        <span className="font-bold text-github-text-primary text-base tracking-tight">
          FailSense
        </span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto">
        <div className="px-3 py-2 text-xs font-semibold text-github-text-secondary uppercase tracking-wider opacity-70 mb-1">
          Analysis
        </div>
        <SidebarItem
          icon={AlertCircle}
          label="Error Analyzer"
          active={currentView === "analyzer"}
          onClick={() => onViewChange("analyzer")}
        />
        <SidebarItem
          icon={History}
          label="Recent Analyses"
          active={currentView === "history"}
          onClick={() => onViewChange("history")}
        />

        <div className="mt-8 px-3 py-2 text-xs font-semibold text-github-text-secondary uppercase tracking-wider opacity-70 mb-1">
          Resources
        </div>
        <SidebarItem
          icon={FileText}
          label="Documentation"
          active={currentView === "docs"}
          onClick={() => onViewChange("docs")}
        />

        <div className="mt-8 px-3 py-2 text-xs font-semibold text-github-text-secondary uppercase tracking-wider opacity-70 mb-1">
          Settings
        </div>
        <SidebarItem
          icon={Settings}
          label="Preferences"
          active={currentView === "preferences"}
          onClick={() => onViewChange("preferences")}
        />
      </nav>

      <div className="mt-auto pt-4 px-3">
        <div className="flex items-center gap-3 p-2 rounded-md hover:bg-github-btn-hover/50 transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-github-info/30 to-github-info/10 border border-github-info/40 flex items-center justify-center text-xs text-github-info font-bold">
            MY
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-github-text-primary">
              maryu
            </span>
            <span className="text-xs text-github-text-secondary">
              Developer
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
