/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xsm' : '380px',
      'xsmd': '445px',
      'mdxl': '820px',
      ...defaultTheme.screens,
    },
    extend: {
      backgroundImage: {
        'adminBg' : "url('./assets/adminBg.jpg')",
      },
    },
  },
  plugins: [],
}

