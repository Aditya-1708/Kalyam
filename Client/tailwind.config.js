/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2E7D32',
          light: '#E8F5E9',
          dark: '#1B5E20',
        },
        secondary: {
          DEFAULT: '#F57C00',
          light: '#FFE0B2',
          dark: '#E65100',
        },
        emerald: {
          DEFAULT: '#2E7D32',
          light: '#E8F5E9',
          dark: '#1B5E20',
        },
        gold: {
          DEFAULT: '#F57C00',
          light: '#FFE0B2',
        },
        ink: {
          DEFAULT: '#0d1b15',
        },
        muted: {
          DEFAULT: '#4a5e56',
        },
        border: {
          DEFAULT: '#d8e5de',
        },
        bg: {
          DEFAULT: '#fafcfb',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '.5', transform: 'scale(1.3)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      },
      animation: {
        pulse: 'pulse 2s infinite',
        float: 'float 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
