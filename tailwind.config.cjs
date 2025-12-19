/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  mode: 'jit',
  content: ['./src/**/*.{astro,html,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Refined coastal palette
        sand: {
          50: '#FDFCFB',
          100: '#FAF8F5',
          200: '#F5F0EA',
          300: '#EBE4DB',
          400: '#D9CFC2',
          500: '#C7B9A8',
          600: '#A89780',
          700: '#8A7660',
          800: '#6B5A49',
          900: '#4D3F33'
        },
        ocean: {
          50: '#F0F7FA',
          100: '#E1EEF5',
          200: '#C3DDE9',
          300: '#94C4D9',
          400: '#5FA5C4',
          500: '#3D8AAD',
          600: '#2E6F8F',
          700: '#285A74',
          800: '#264A5F',
          900: '#243E50'
        },
        ink: {
          50: '#F6F6F7',
          100: '#E2E3E5',
          200: '#C5C7CB',
          300: '#A0A4AA',
          400: '#7B8088',
          500: '#61666E',
          600: '#4D5159',
          700: '#3F4248',
          800: '#36393D',
          900: '#1A1C1F'
        }
      },
      fontFamily: {
        // Elegant serif for headings
        display: ['"Cormorant Garamond"', 'Georgia', ...defaultTheme.fontFamily.serif],
        // Clean sans for body
        sans: ['"DM Sans"', ...defaultTheme.fontFamily.sans],
        // Mono for accents
        mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono]
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-md': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-sm': ['1.875rem', { lineHeight: '1.3', letterSpacing: '0' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '70ch',
            color: 'var(--tw-prose-body)',
            lineHeight: '1.75',
          }
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        }
      },
      transitionTimingFunction: {
        'elegant': 'cubic-bezier(0.4, 0, 0.2, 1)',
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
