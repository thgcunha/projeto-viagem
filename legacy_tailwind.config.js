/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        ocre: {
          light: '#F4D06F', // Ocre claro, caloroso
          DEFAULT: '#D78A04', // Ocre tradicional
          dark: '#935400', // Ocre escuro para contraste
        },
        sky: {
          light: '#CDEFFD', // Azul claro, lembra céu ensolarado
          DEFAULT: '#8AB4F8', // Azul típico do céu
          dark: '#22577E', // Azul profundo, para detalhes
        },
        cloud: '#F5F5F5', // Branco suave, remete a nuvens
        gray: {
          airport: '#A9A9A9', // Cinza neutro, elegante
        },
        sand: '#C8A165', // Marrom areia, quente e natural
        brightWhite: '#FAFAFA', // Branco mais forte
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
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
      },
    },
  },
  plugins: [],
}


