/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        cyber: ['Orbitron', 'sans-serif'],
        'body': ['Rajdhani', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#b8dfff',
          300: '#7cc7ff',
          400: '#36aeff',
          500: '#0095ff',
          600: '#0077ff',
          700: '#0061ff',
          800: '#0052d6',
          900: '#0047ab',
        },
        secondary: {
          50: '#fdf2ff',
          100: '#fae6ff',
          200: '#f5ccff',
          300: '#f0a3ff',
          400: '#e866ff',
          500: '#d633ff',
          600: '#c41fff',
          700: '#a518d9',
          800: '#8517b0',
          900: '#6b168c',
        },
        'cyber-blue': '#0095ff',
        'cyber-pink': '#ff2a6d',
        'cyber-yellow': '#05d9e8',
        'cyber-purple': '#a200ff',
        'cyber-dark': '#1a1a1a',
        'cyber-gray': '#2d2d2d',
        'neon-pink': '#ff00ff',
        'neon-pink-bright': '#ff60ff',
        'neon-blue': '#00ffff',
        'neon-green': '#00ff9f',
        'cyber-black': '#0a0a0f',
      },
      animation: {
        'glitch': 'glitch 1s infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '33%': { transform: 'translate(-5px, 2px)' },
          '66%': { transform: 'translate(5px, -2px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': {
            opacity: '1',
            filter: 'brightness(1.5) drop-shadow(0 0 10px currentColor)',
          },
          '50%': {
            opacity: '.5',
            filter: 'brightness(1) drop-shadow(0 0 5px currentColor)',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
