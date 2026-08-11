/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0F172A',
          card: '#1E293B',
          hover: '#334155',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        light: {
          bg: '#F8FAFC',
          card: '#FFFFFF',
          hover: '#F1F5F9',
          border: 'rgba(0, 0, 0, 0.08)',
        },
        primary: {
          DEFAULT: '#3B82F6',
          dark: '#2563EB',
          light: '#60A5FA',
        },
        accent: {
          cyan: '#06B6D4',
          indigo: '#6366F1',
          emerald: '#10B981',
          amber: '#F59E0B',
          pink: '#EC4899',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
      }
    },
  },
  plugins: [],
}
