/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F0F0F0',
        secondary: '#FFF9EF',
        white: '#FFFFFF',
        jetblack: '#262626',
        lightgray: '#B3B3B3',
        mediumgray: '#C7C7CC',
        darkgray: '#333333',
        spacegray: '#2F2F2F',
        yellow: '#FFD982'
      },
      screens: {
        xs: '320px',
        sm: '480px',
        md: '768px',
        lg:'1024px',
        xl:'1280px'
      },
      fontFamily: {
        'sf': ['sans-serif'],
      },
      animation: {
        shake: 'shake 0.8s ease-in-out',
      },
      keyframes: {
        'shake' : {
          '0%, 100%': {
            transform: 'translateX(0)'
          },
          '10%, 30%, 50%, 70%, 90%': {
            transform: 'translateX(-10px)'
          },
          '20%, 40%, 60%, 80%': {
            transform: 'translateX(10px)'
          },
        }
      }
    },
  },
  plugins: [],
}
