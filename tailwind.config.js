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
          DEFAULT: '#0A2A43',
          light: '#113250',
        },
        secondary: {
          DEFAULT: '#F5B041',
          dark: '#D4AF37',
        },
        accent: {
          DEFAULT: '#008B8B',
          light: '#20B2AA',
        },
        bg: {
          light: '#F8F9FA',
        }
      },
      fontFamily: {
        sans: ["Inter", "Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
}
