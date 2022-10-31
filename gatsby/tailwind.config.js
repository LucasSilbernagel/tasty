/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          1: '#66CECF',
        },
        orange: {
          1: '#FF553D',
        },
      },
      keyframes: {
        slideIn: {
          '0%': { left: '-500px' },
          '100%': { left: '0' },
        },
        slideOut: {
          '0%': { left: '0' },
          '100%': { left: '-500px' },
        },
      },
      animation: {
        'slide-in': 'slideIn 500ms ease-in-out',
        'slide-out': 'slideOut 500ms ease-in-out',
      },
    },
  },
  plugins: [],
}
