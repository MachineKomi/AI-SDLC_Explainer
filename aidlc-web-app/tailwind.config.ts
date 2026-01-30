import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark theme colors
        dark: {
          primary: '#0f172a',    // Slate 900
          secondary: '#1e293b',  // Slate 800
          tertiary: '#334155',   // Slate 700
        },
        // Light theme colors
        light: {
          primary: '#ffffff',
          secondary: '#f8fafc',  // Slate 50
          tertiary: '#e2e8f0',   // Slate 200
        },
        // Accent colors
        accent: {
          primary: '#3b82f6',    // Blue 500
          success: '#22c55e',    // Green 500
          warning: '#f59e0b',    // Amber 500
          error: '#ef4444',      // Red 500
        },
        // Phase colors
        phase: {
          inception: '#3b82f6',   // Blue
          construction: '#22c55e', // Green
          operations: '#f59e0b',   // Amber
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s ease-out',
        'slide-up': 'slideUp 0.25s ease-out',
        'progress': 'progress 1s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        progress: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--progress-width)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
