/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cabdff': '#CABDFF',
        '6f767e': '#6F767E',
        'primary': '#3595f6',
      },
    },
  },
  plugins: [],
}
