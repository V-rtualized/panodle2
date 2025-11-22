module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      animation: {
        'alternate-green': 'alternateGreen 2s ease-in-out infinite',
        'alternate-red': 'alternateRed 2s ease-in-out infinite',
        'fall': 'fall linear infinite',
      },
      keyframes: {
        alternateGreen: {
          '0%, 100%': {
            color: '#ffffff',
            textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.5)',
          },
          '50%': {
            color: '#ff0000',
            textShadow: '0 0 20px rgba(255, 0, 0, 0.8), 0 0 40px rgba(255, 0, 0, 0.5)',
          },
        },
        alternateRed: {
          '0%, 100%': {
            color: '#ff0000',
            textShadow: '0 0 20px rgba(255, 0, 0, 0.8), 0 0 40px rgba(255, 0, 0, 0.5)',
          },
          '50%': {
            color: '#ffffff',
            textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.5)',
          },
        },
        fall: {
          '0%': {
            top: '-10%',
            transform: 'translateX(0) rotate(0deg)',
          },
          '100%': {
            top: '110%',
            transform: 'translateX(100px) rotate(360deg)',
          },
        },
      },
    },
  },
  plugins: [],
}
