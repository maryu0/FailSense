
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        github: {
          bg: '#0d1117',
          surface: '#161b22', // Kept for specific cards, but used less
          border: '#30363d',
          text: {
            primary: '#c9d1d9',
            secondary: '#8b949e',
            tertiary: '#484f58', // Added for subtle text
            link: '#58a6ff',
          },
          success: '#3fb950',
          error: '#f85149',
          warning: '#d29922',
          info: '#58a6ff',
          btn: {
            bg: '#21262d',
            hover: '#30363d',
            border: 'rgba(240, 246, 252, 0.1)',
            primary: '#238636',
            primaryHover: '#2ea043',
          }
        }
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Helvetica',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"'
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'SF Mono',
          'Menlo',
          'Consolas',
          'Liberation Mono',
          'monospace'
        ]
      }
    },
  },
  plugins: [],
}
