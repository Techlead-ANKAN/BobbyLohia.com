import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'mangro': ['Mangro Elegant Serif', 'serif'],
        'yeseva': ['Yeseva One', 'serif'],
        'cormorant': ['Cormorant Garamond', 'serif'],
      },
      colors: {
        // Premium Black & White System
        primary: {
          50: '#ffffff',     // Pure white
          100: '#f8fafc',    // Off-white
          200: '#f1f5f9',    // Light gray
          300: '#cbd5e1',    // Medium light gray
          400: '#94a3b8',    // Medium gray
          500: '#64748b',    // Neutral gray
          600: '#475569',    // Dark gray
          700: '#334155',    // Darker gray
          800: '#1e293b',    // Very dark gray
          900: '#0f172a',    // Almost black
          950: '#000000',    // Pure black
        },
        // Elegant accent colors
        accent: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-in': 'slideIn 0.4s ease-out',
        'scale-up': 'scaleUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    typography,
  ],
}