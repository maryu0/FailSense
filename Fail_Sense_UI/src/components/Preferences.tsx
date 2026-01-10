import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Code2,
  Download,
  History,
  Bell,
  Save,
  RotateCcw,
} from "lucide-react";

interface PreferencesData {
  defaultLanguage: string;
  autoAnalyze: boolean;
  exportFormat: string;
  historyLimit: number;
  showNotifications: boolean;
  autoClearTags: boolean;
}

const DEFAULT_PREFERENCES: PreferencesData = {
  defaultLanguage: "javascript",
  autoAnalyze: false,
  exportFormat: "markdown",
  historyLimit: 20,
  showNotifications: true,
  autoClearTags: true,
};

export function Preferences() {
  const [preferences, setPreferences] =
    useState<PreferencesData>(DEFAULT_PREFERENCES);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = () => {
    const stored = localStorage.getItem("failsense-preferences");
    if (stored) {
      setPreferences({ ...DEFAULT_PREFERENCES, ...JSON.parse(stored) });
    }
  };

  const savePreferences = () => {
    localStorage.setItem("failsense-preferences", JSON.stringify(preferences));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const resetPreferences = () => {
    if (
      confirm("Are you sure you want to reset all preferences to defaults?")
    ) {
      setPreferences(DEFAULT_PREFERENCES);
      localStorage.removeItem("failsense-preferences");
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const updatePreference = <K extends keyof PreferencesData>(
    key: K,
    value: PreferencesData[K]
  ) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex-1 overflow-y-auto bg-github-bg">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-github-bg/95 backdrop-blur-sm border-b border-github-border/30">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-github-info/20 to-github-info/10 border border-github-info/30 flex items-center justify-center">
                  <Settings className="text-github-info" size={20} />
                </div>
                <h1 className="text-2xl font-bold text-github-text-primary">
                  Preferences
                </h1>
              </div>
              <p className="text-github-text-secondary">
                Customize your FailSense experience
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={resetPreferences}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-github-text-secondary hover:text-github-text-primary border border-github-border/40 hover:border-github-border/80 rounded-lg transition-colors"
              >
                <RotateCcw size={16} />
                Reset
              </button>
              <button
                onClick={savePreferences}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-github-success/15 text-github-success hover:bg-github-success/25 border border-github-success/40 rounded-lg transition-colors"
              >
                <Save size={16} />
                {saved ? "Saved!" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="px-8 py-6 max-w-4xl">
        {/* Analysis Settings */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-github-text-primary mb-4 flex items-center gap-2">
            <Code2 size={20} className="text-github-info" />
            Analysis Settings
          </h2>
          <div className="bg-github-surface rounded-lg border border-github-border/30 divide-y divide-github-border/20">
            {/* Default Language */}
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-github-text-primary mb-1">
                    Default Language
                  </label>
                  <p className="text-xs text-github-text-secondary">
                    The default programming language for error analysis
                  </p>
                </div>
                <select
                  value={preferences.defaultLanguage}
                  onChange={(e) =>
                    updatePreference("defaultLanguage", e.target.value)
                  }
                  className="px-3 py-2 bg-github-bg border border-github-border/40 rounded-md text-sm text-github-text-primary focus:outline-none focus:border-github-info/50 focus:ring-1 focus:ring-github-info/30 transition-all"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="typescript">TypeScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="csharp">C#</option>
                  <option value="go">Go</option>
                  <option value="rust">Rust</option>
                  <option value="ruby">Ruby</option>
                  <option value="php">PHP</option>
                </select>
              </div>
            </div>

            {/* Auto Analyze */}
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-github-text-primary mb-1">
                    Auto-Analyze on Paste
                  </label>
                  <p className="text-xs text-github-text-secondary">
                    Automatically run analysis when error logs are pasted
                  </p>
                </div>
                <button
                  onClick={() =>
                    updatePreference("autoAnalyze", !preferences.autoAnalyze)
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.autoAnalyze
                      ? "bg-github-success"
                      : "bg-github-border"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.autoAnalyze
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Auto Clear Tags */}
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-github-text-primary mb-1">
                    Auto-Clear Tags
                  </label>
                  <p className="text-xs text-github-text-secondary">
                    Automatically clear tags after saving an analysis
                  </p>
                </div>
                <button
                  onClick={() =>
                    updatePreference(
                      "autoClearTags",
                      !preferences.autoClearTags
                    )
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.autoClearTags
                      ? "bg-github-success"
                      : "bg-github-border"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.autoClearTags
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Export Settings */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-github-text-primary mb-4 flex items-center gap-2">
            <Download size={20} className="text-github-success" />
            Export Settings
          </h2>
          <div className="bg-github-surface rounded-lg border border-github-border/30 p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-github-text-primary mb-1">
                  Default Export Format
                </label>
                <p className="text-xs text-github-text-secondary">
                  Choose your preferred format for exporting reports
                </p>
              </div>
              <select
                value={preferences.exportFormat}
                onChange={(e) =>
                  updatePreference("exportFormat", e.target.value)
                }
                className="px-3 py-2 bg-github-bg border border-github-border/40 rounded-md text-sm text-github-text-primary focus:outline-none focus:border-github-info/50 focus:ring-1 focus:ring-github-info/30 transition-all"
              >
                <option value="markdown">Markdown (.md)</option>
                <option value="text">Plain Text (.txt)</option>
              </select>
            </div>
          </div>
        </motion.section>

        {/* History Settings */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-github-text-primary mb-4 flex items-center gap-2">
            <History size={20} className="text-github-warning" />
            History Settings
          </h2>
          <div className="bg-github-surface rounded-lg border border-github-border/30 p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-github-text-primary mb-2">
                  Maximum History Items
                </label>
                <p className="text-xs text-github-text-secondary mb-3">
                  Number of analyses to keep in history (1-50)
                </p>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={preferences.historyLimit}
                    onChange={(e) =>
                      updatePreference("historyLimit", parseInt(e.target.value))
                    }
                    className="flex-1 h-2 bg-github-border rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm font-mono text-github-text-primary bg-github-bg px-3 py-1.5 rounded-md border border-github-border/40 min-w-[3rem] text-center">
                    {preferences.historyLimit}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Notifications Settings */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-github-text-primary mb-4 flex items-center gap-2">
            <Bell size={20} className="text-github-danger" />
            Notifications
          </h2>
          <div className="bg-github-surface rounded-lg border border-github-border/30 p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-github-text-primary mb-1">
                  Show Success Notifications
                </label>
                <p className="text-xs text-github-text-secondary">
                  Display notifications when analysis completes successfully
                </p>
              </div>
              <button
                onClick={() =>
                  updatePreference(
                    "showNotifications",
                    !preferences.showNotifications
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.showNotifications
                    ? "bg-github-success"
                    : "bg-github-border"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.showNotifications
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="mb-8"
        >
          <div className="p-6 bg-gradient-to-br from-github-info/5 via-github-surface/30 to-github-success/5 rounded-xl border border-github-border/40">
            <h3 className="text-lg font-semibold text-github-text-primary mb-2">
              About FailSense
            </h3>
            <p className="text-sm text-github-text-secondary mb-4">
              AI-Powered CI/CD Error Debugging Assistant
            </p>
            <div className="flex items-center gap-4 text-xs text-github-text-tertiary">
              <span>Version 1.0.0</span>
              <span>•</span>
              <span>Built with React + FastAPI</span>
              <span>•</span>
              <span>Powered by Groq AI</span>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
