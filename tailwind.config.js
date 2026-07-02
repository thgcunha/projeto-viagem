/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        ocre: {
          light: '#F4D06F',
          DEFAULT: '#D78A04',
          dark: '#935400',
        },
        sky: {
          light: '#CDEFFD',
          DEFAULT: '#8AB4F8',
          dark: '#22577E',
        },
        cloud: '#F5F5F5',
        gray: {
          airport: '#A9A9A9',
        },
        sand: '#C8A165',
        brightWhite: '#FAFAFA',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        glow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.5))' },
          '50%': { filter: 'drop-shadow(0 0 20px rgba(255,255,255,1))' },
        }
      },
    },
  },
  plugins: [],
}
