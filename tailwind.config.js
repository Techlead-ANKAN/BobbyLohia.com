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
        forest: {
          50: '#f7f9f4',
          100: '#eef3e7',
          200: '#d9e7cf',
          300: '#b8d4a7',
          400: '#90bc77',
          500: '#6fa054',
          600: '#578040',
          700: '#456535',
          800: '#39512d',
          900: '#314427',
          950: '#1a2514',
        },
        earth: {
          50: '#faf8f5',
          100: '#f2ede6',
          200: '#e3d8ca',
          300: '#d0bfa8',
          400: '#b9a085',
          500: '#a8896c',
          600: '#977760',
          700: '#7d6151',
          800: '#665045',
          900: '#53433a',
          950: '#2c221e',
        },
        sage: {
          50: '#f6f7f4',
          100: '#e9ece4',
          200: '#d4dac9',
          300: '#b7c1a5',
          400: '#96a57e',
          500: '#7b8b60',
          600: '#626e4a',
          700: '#4d563c',
          800: '#404732',
          900: '#363d2b',
          950: '#1c2016',
        }
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