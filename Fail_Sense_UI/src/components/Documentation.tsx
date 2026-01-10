import { motion } from "framer-motion";
import {
  BookOpen,
  Code2,
  AlertCircle,
  Zap,
  CheckCircle,
  ArrowRight,
  FileCode,
} from "lucide-react";

export function Documentation() {
  return (
    <div className="flex-1 overflow-y-auto bg-github-bg">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-github-bg/95 backdrop-blur-sm border-b border-github-border/30">
        <div className="px-8 py-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-github-info/20 to-github-info/10 border border-github-info/30 flex items-center justify-center">
              <BookOpen className="text-github-info" size={20} />
            </div>
            <h1 className="text-2xl font-bold text-github-text-primary">
              Documentation
            </h1>
          </div>
          <p className="text-github-text-secondary">
            Learn how to use FailSense to debug CI/CD errors efficiently
          </p>
        </div>
      </header>

      <div className="px-8 py-6 max-w-4xl">
        {/* Getting Started */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-xl font-semibold text-github-text-primary mb-4 flex items-center gap-2">
            <Zap size={20} className="text-github-warning" />
            Getting Started
          </h2>
          <div className="bg-github-surface rounded-lg border border-github-border/30 p-6">
            <p className="text-github-text-secondary leading-relaxed mb-4">
              FailSense is an AI-powered CI/CD error debugging assistant that
              helps you understand and fix build failures quickly. Simply paste
              your error logs, and our AI will analyze them to provide clear
              explanations and actionable solutions.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-github-info/20 border border-github-info/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-github-info">1</span>
                </div>
                <div>
                  <p className="text-github-text-primary font-medium">
                    Paste your error log
                  </p>
                  <p className="text-sm text-github-text-secondary">
                    Copy the error output from your CI/CD pipeline and paste it
                    into the code editor
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-github-info/20 border border-github-info/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-github-info">2</span>
                </div>
                <div>
                  <p className="text-github-text-primary font-medium">
                    Click Analyze Error
                  </p>
                  <p className="text-sm text-github-text-secondary">
                    Our AI will process the error and identify the root cause
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-github-info/20 border border-github-info/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-github-info">3</span>
                </div>
                <div>
                  <p className="text-github-text-primary font-medium">
                    Review solutions
                  </p>
                  <p className="text-sm text-github-text-secondary">
                    Get ranked fix suggestions with confidence scores and
                    detailed explanations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Supported Error Types */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-xl font-semibold text-github-text-primary mb-4 flex items-center gap-2">
            <AlertCircle size={20} className="text-github-danger" />
            Supported Error Types
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Runtime Errors",
                examples: [
                  "NullPointerException",
                  "IndexOutOfBoundsException",
                  "TypeError",
                  "ZeroDivisionError",
                ],
              },
              {
                title: "Build Errors",
                examples: [
                  "Compilation failures",
                  "Dependency conflicts",
                  "Module not found",
                  "Syntax errors",
                ],
              },
              {
                title: "Test Failures",
                examples: [
                  "Assertion errors",
                  "Test timeouts",
                  "Mock failures",
                  "Coverage issues",
                ],
              },
              {
                title: "Deployment Errors",
                examples: [
                  "Container crashes",
                  "Port conflicts",
                  "Permission denied",
                  "Resource limits",
                ],
              },
            ].map((category, idx) => (
              <div
                key={idx}
                className="bg-github-surface rounded-lg border border-github-border/30 p-5"
              >
                <h3 className="text-github-text-primary font-semibold mb-3">
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.examples.map((example, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-github-text-secondary"
                    >
                      <CheckCircle size={14} className="text-github-success" />
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Supported Languages */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-xl font-semibold text-github-text-primary mb-4 flex items-center gap-2">
            <Code2 size={20} className="text-github-info" />
            Supported Languages
          </h2>
          <div className="bg-github-surface rounded-lg border border-github-border/30 p-6">
            <p className="text-github-text-secondary mb-4">
              FailSense works with error logs from any programming language,
              including:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                "JavaScript",
                "TypeScript",
                "Python",
                "Java",
                "C#",
                "Go",
                "Rust",
                "Ruby",
                "PHP",
                "Swift",
                "Kotlin",
                "C++",
              ].map((lang, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-2 bg-github-bg rounded-md border border-github-border/20"
                >
                  <FileCode size={14} className="text-github-text-secondary" />
                  <span className="text-sm text-github-text-primary">
                    {lang}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Example Usage */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-xl font-semibold text-github-text-primary mb-4 flex items-center gap-2">
            <FileCode size={20} className="text-github-success" />
            Example Error Log
          </h2>
          <div className="bg-github-surface rounded-lg border border-github-border/30 p-6">
            <p className="text-github-text-secondary mb-4">
              Here's an example of a Python error that FailSense can analyze:
            </p>
            <div className="bg-github-bg rounded-md border border-github-border/20 p-4 font-mono text-sm">
              <pre className="text-github-text-secondary whitespace-pre-wrap">
                {`Traceback (most recent call last):
  File "app.py", line 10, in <module>
    result = calculate(data)
  File "app.py", line 5, in calculate
    return x / y
ZeroDivisionError: division by zero`}
              </pre>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-github-text-secondary">
              <ArrowRight size={16} />
              <span>
                FailSense will identify this as a division by zero error and
                suggest adding input validation
              </span>
            </div>
          </div>
        </motion.section>

        {/* Features */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-xl font-semibold text-github-text-primary mb-4 flex items-center gap-2">
            <Zap size={20} className="text-github-warning" />
            Key Features
          </h2>
          <div className="space-y-3">
            {[
              {
                title: "Root Cause Analysis",
                description:
                  "Get a clear explanation of what went wrong and why the error occurred",
              },
              {
                title: "Ranked Solutions",
                description:
                  "Receive multiple fix suggestions ranked by confidence score and likelihood of success",
              },
              {
                title: "Analysis History",
                description:
                  "Access your recent analyses anytime to revisit past errors and solutions",
              },
              {
                title: "Code Context",
                description:
                  "See the error in context with highlighted problem areas and relevant code snippets",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-github-surface rounded-lg border border-github-border/30 p-5"
              >
                <h3 className="text-github-text-primary font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-github-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Tips */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-github-text-primary mb-4 flex items-center gap-2">
            <CheckCircle size={20} className="text-github-success" />
            Best Practices
          </h2>
          <div className="bg-github-surface rounded-lg border border-github-border/30 p-6">
            <ul className="space-y-3">
              {[
                "Include the full stack trace for better analysis",
                "Paste the complete error output, including any relevant context",
                "Use Recent Analyses to compare similar errors and track patterns",
                "Review all suggested solutions, not just the highest confidence one",
                "Check the technical explanation to understand the underlying issue",
              ].map((tip, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-github-text-secondary"
                >
                  <ArrowRight
                    size={16}
                    className="text-github-info flex-shrink-0 mt-0.5"
                  />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
