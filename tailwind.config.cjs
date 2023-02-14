/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  mode: 'jit',
  content: ['./src/**/*.{astro,html,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans]
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '80ch'
          }
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
