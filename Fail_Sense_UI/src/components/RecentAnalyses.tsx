import { useState, useEffect } from "react";
import {
  Clock,
  Trash2,
  AlertCircle,
  FileText,
  CheckCircle,
  Search,
  Filter,
  X,
  Tag,
} from "lucide-react";
import { motion } from "framer-motion";
import type { AnalysisResult } from "../types";

interface HistoryItem {
  id: string;
  timestamp: number;
  code: string;
  result: AnalysisResult;
  language: string;
  workedFixIndex?: number | null;
  tags?: string[];
}

interface RecentAnalysesProps {
  onLoadAnalysis: (item: HistoryItem) => void;
}

export function RecentAnalyses({ onLoadAnalysis }: RecentAnalysesProps) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterErrorType, setFilterErrorType] = useState<string>("all");
  const [filterDateRange, setFilterDateRange] = useState<string>("all");
  const [filterTag, setFilterTag] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  const getTagColor = (tag: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> =
      {
        backend: {
          bg: "bg-blue-500/15",
          text: "text-blue-400",
          border: "border-blue-500/40",
        },
        frontend: {
          bg: "bg-purple-500/15",
          text: "text-purple-400",
          border: "border-purple-500/40",
        },
        production: {
          bg: "bg-red-500/15",
          text: "text-red-400",
          border: "border-red-500/40",
        },
        staging: {
          bg: "bg-yellow-500/15",
          text: "text-yellow-400",
          border: "border-yellow-500/40",
        },
        development: {
          bg: "bg-green-500/15",
          text: "text-green-400",
          border: "border-green-500/40",
        },
        urgent: {
          bg: "bg-orange-500/15",
          text: "text-orange-400",
          border: "border-orange-500/40",
        },
        bug: {
          bg: "bg-pink-500/15",
          text: "text-pink-400",
          border: "border-pink-500/40",
        },
        feature: {
          bg: "bg-cyan-500/15",
          text: "text-cyan-400",
          border: "border-cyan-500/40",
        },
      };
    return (
      colors[tag.toLowerCase()] || {
        bg: "bg-github-info/15",
        text: "text-github-info",
        border: "border-github-info/40",
      }
    );
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const stored = localStorage.getItem("failsense-history");
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  };

  const clearHistory = () => {
    if (confirm("Are you sure you want to clear all analysis history?")) {
      localStorage.removeItem("failsense-history");
      setHistory([]);
    }
  };

  const deleteItem = (id: string) => {
    const updated = history.filter((item) => item.id !== id);
    localStorage.setItem("failsense-history", JSON.stringify(updated));
    setHistory(updated);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const getCodePreview = (code: string) => {
    const lines = code.split("\n");
    return (
      lines.slice(0, 3).join("\n").substring(0, 120) +
      (code.length > 120 || lines.length > 3 ? "..." : "")
    );
  };

  const getFilteredHistory = () => {
    let filtered = [...history];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.result.error_type.toLowerCase().includes(query) ||
          item.result.root_cause.toLowerCase().includes(query) ||
          item.code.toLowerCase().includes(query) ||
          item.result.fixes.some((fix) =>
            fix.fix.toLowerCase().includes(query)
          ) ||
          (item.tags &&
            item.tags.some((tag) => tag.toLowerCase().includes(query)))
      );
    }

    // Error type filter
    if (filterErrorType !== "all") {
      filtered = filtered.filter((item) =>
        item.result.error_type
          .toLowerCase()
          .includes(filterErrorType.toLowerCase())
      );
    }

    // Date range filter
    if (filterDateRange !== "all") {
      const now = Date.now();
      const ranges: Record<string, number> = {
        today: 86400000, // 24 hours
        week: 604800000, // 7 days
        month: 2592000000, // 30 days
      };
      const range = ranges[filterDateRange];
      if (range) {
        filtered = filtered.filter((item) => now - item.timestamp < range);
      }
    }

    // Tag filter
    if (filterTag !== "all") {
      filtered = filtered.filter(
        (item) => item.tags && item.tags.includes(filterTag)
      );
    }

    return filtered;
  };

  const filteredHistory = getFilteredHistory();
  const uniqueErrorTypes = Array.from(
    new Set(history.map((item) => item.result.error_type))
  );
  const allTags = Array.from(
    new Set(history.flatMap((item) => item.tags || []))
  ).sort();

  return (
    <div className="h-full flex flex-col p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-github-text-primary mb-1">
            Recent Analyses
          </h1>
          <p className="text-sm text-github-text-secondary">
            {filteredHistory.length} of {history.length} analyses
          </p>
        </div>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-github-danger hover:bg-github-danger/10 border border-github-danger/30 rounded-lg transition-colors"
          >
            <Trash2 size={16} />
            Clear All
          </button>
        )}
      </div>

      {/* Search and Filter Bar */}
      {history.length > 0 && (
        <div className="mb-6 space-y-3">
          <div className="flex gap-3">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-github-text-tertiary"
              />
              <input
                type="text"
                placeholder="Search analyses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-github-surface border border-github-border/40 rounded-lg text-sm text-github-text-primary placeholder-github-text-tertiary focus:outline-none focus:border-github-info/50 focus:ring-1 focus:ring-github-info/30 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-github-text-tertiary hover:text-github-text-primary transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                showFilters ||
                filterErrorType !== "all" ||
                filterDateRange !== "all" ||
                filterTag !== "all"
                  ? "bg-github-info/15 text-github-info border border-github-info/40"
                  : "bg-github-surface text-github-text-secondary border border-github-border/40 hover:border-github-border/80"
              }`}
            >
              <Filter size={16} />
              Filters
              {(filterErrorType !== "all" ||
                filterDateRange !== "all" ||
                filterTag !== "all") && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-github-info/30 rounded-full">
                  {[
                    filterErrorType !== "all" ? 1 : 0,
                    filterDateRange !== "all" ? 1 : 0,
                    filterTag !== "all" ? 1 : 0,
                  ].reduce((a, b) => a + b)}
                </span>
              )}
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="p-4 bg-github-surface border border-github-border/40 rounded-lg space-y-4"
            >
              <div className="grid grid-cols-3 gap-4">
                {/* Error Type Filter */}
                <div>
                  <label className="block text-xs font-semibold text-github-text-secondary mb-2 uppercase tracking-wider">
                    Error Type
                  </label>
                  <select
                    value={filterErrorType}
                    onChange={(e) => setFilterErrorType(e.target.value)}
                    className="w-full px-3 py-2 bg-github-bg border border-github-border/40 rounded-md text-sm text-github-text-primary focus:outline-none focus:border-github-info/50 focus:ring-1 focus:ring-github-info/30 transition-all"
                  >
                    <option value="all">All Types</option>
                    {uniqueErrorTypes.map((type) => (
                      <option key={type} value={type}>
                        {type
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date Range Filter */}
                <div>
                  <label className="block text-xs font-semibold text-github-text-secondary mb-2 uppercase tracking-wider">
                    Date Range
                  </label>
                  <select
                    value={filterDateRange}
                    onChange={(e) => setFilterDateRange(e.target.value)}
                    className="w-full px-3 py-2 bg-github-bg border border-github-border/40 rounded-md text-sm text-github-text-primary focus:outline-none focus:border-github-info/50 focus:ring-1 focus:ring-github-info/30 transition-all"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Last 24 Hours</option>
                    <option value="week">Last 7 Days</option>
                    <option value="month">Last 30 Days</option>
                  </select>
                </div>

                {/* Tag Filter */}
                <div>
                  <label className="block text-xs font-semibold text-github-text-secondary mb-2 uppercase tracking-wider">
                    Tag
                  </label>
                  <select
                    value={filterTag}
                    onChange={(e) => setFilterTag(e.target.value)}
                    className="w-full px-3 py-2 bg-github-bg border border-github-border/40 rounded-md text-sm text-github-text-primary focus:outline-none focus:border-github-info/50 focus:ring-1 focus:ring-github-info/30 transition-all"
                  >
                    <option value="all">All Tags</option>
                    {allTags.map((tag) => (
                      <option key={tag} value={tag}>
                        {tag}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Clear Filters Button */}
              {(filterErrorType !== "all" ||
                filterDateRange !== "all" ||
                filterTag !== "all") && (
                <button
                  onClick={() => {
                    setFilterErrorType("all");
                    setFilterDateRange("all");
                    setFilterTag("all");
                  }}
                  className="text-xs text-github-info hover:text-github-info/80 font-medium transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </motion.div>
          )}
        </div>
      )}

      {history.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <FileText
              size={64}
              className="text-github-text-tertiary mx-auto mb-4"
            />
            <p className="text-lg text-github-text-secondary mb-2">
              No analyses yet
            </p>
            <p className="text-sm text-github-text-tertiary">
              Your error analyses will appear here
            </p>
          </div>
        </div>
      ) : filteredHistory.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Search
              size={64}
              className="text-github-text-tertiary mx-auto mb-4"
            />
            <p className="text-lg text-github-text-secondary mb-2">
              No matching analyses
            </p>
            <p className="text-sm text-github-text-tertiary mb-4">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setFilterErrorType("all");
                setFilterDateRange("all");
                setFilterTag("all");
              }}
              className="text-sm text-github-info hover:text-github-info/80 font-medium transition-colors"
            >
              Clear all filters
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-3">
          {filteredHistory.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group relative"
            >
              <button
                onClick={() => onLoadAnalysis(item)}
                className="w-full text-left p-5 bg-github-surface/40 hover:bg-github-surface/60 border border-github-border/40 hover:border-github-border/80 rounded-xl transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-github-danger/10 border border-github-danger/30 flex items-center justify-center flex-shrink-0">
                      <AlertCircle size={20} className="text-github-danger" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-github-text-primary mb-1">
                        {item.result.error_type
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}{" "}
                        Error
                      </h3>
                      <p className="text-xs text-github-text-secondary line-clamp-1">
                        {item.result.root_cause}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="flex items-center gap-1.5 text-xs text-github-text-tertiary">
                      <Clock size={14} />
                      <span>{formatDate(item.timestamp)}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteItem(item.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-github-danger/10 border border-transparent hover:border-github-danger/30 rounded transition-all"
                    >
                      <Trash2 size={14} className="text-github-danger" />
                    </button>
                  </div>
                </div>

                <div className="pl-13">
                  <div className="p-3 bg-github-bg/60 rounded-lg border border-github-border/40">
                    <pre className="text-xs text-github-text-secondary font-mono whitespace-pre-wrap line-clamp-3">
                      {getCodePreview(item.code)}
                    </pre>
                  </div>
                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    <span className="text-xs px-2 py-0.5 bg-github-info/10 text-github-info border border-github-info/30 rounded-full">
                      {item.language}
                    </span>
                    <span className="text-xs text-github-text-tertiary">
                      {item.result.fixes.length} solution
                      {item.result.fixes.length !== 1 ? "s" : ""}
                    </span>
                    {item.workedFixIndex !== undefined &&
                      item.workedFixIndex !== null && (
                        <span className="text-xs px-2 py-0.5 bg-github-success/15 text-github-success border border-github-success/40 rounded-full flex items-center gap-1">
                          <CheckCircle size={12} strokeWidth={2.5} />
                          Solution #{item.workedFixIndex + 1} worked
                        </span>
                      )}
                    {item.tags && item.tags.length > 0 && (
                      <>
                        {item.tags.map((tag) => {
                          const colors = getTagColor(tag);
                          return (
                            <span
                              key={tag}
                              className={`text-xs px-2 py-0.5 ${colors.bg} ${colors.text} border ${colors.border} rounded-full flex items-center gap-1`}
                            >
                              <Tag size={10} strokeWidth={2.5} />
                              {tag}
                            </span>
                          );
                        })}
                      </>
                    )}
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
