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
          600: '#AD343E',
          700: '#8A2A32',
        }
      },
      ringColor: {
        DEFAULT: '#AD343E',
        primary: '#AD343E',
      },
      ringOffsetColor: {
        DEFAULT: '#AD343E',
        primary: '#AD343E',
      },
      outlineColor: {
        DEFAULT: '#AD343E',
        primary: '#AD343E',
      },
    },
  },
  plugins: [],
}

