/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        '12': '12px',
      },
      borderWidth: {
        '1': '1px',
      },
    },
  },
  plugins: [],
}