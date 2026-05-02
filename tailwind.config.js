/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        cursive: ['"Dancing Script"', 'cursive'],
      },
      colors: {
        pink: {
          50: '#fdf2f8',
          100: '#fce4ec',
          200: '#f8bbd0',
          300: '#f48fb1',
          400: '#f06292',
          500: '#ec407a',
        }
      }
    },
  },
  plugins: [],
}
