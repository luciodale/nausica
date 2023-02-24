/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  mode: 'jit',
  content: ['./src/**/*.{astro,html,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        tortora: {
          DEFAULT: '#C7AA96',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#F2EBE6',
          300: '#E3D5CB',
          400: '#D5C0B1',
          500: '#C7AA96',
          600: '#B38C71',
          700: '#9A7052',
          800: '#76553F',
          900: '#513B2B'
        }
      },
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
