/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx,js,jsx,html}'],
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-animate')],
}


