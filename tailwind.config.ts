import type { Config } from 'tailwindcss'

const { fontFamily } = require('tailwindcss/defaultTheme')

const config = {
  darkMode: ['class', '.dark'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        arabic: ['var(--font-arabic)', 'Scheherazade', 'Noto Naskh Arabic', 'Segoe UI', 'Tahoma', 'sans-serif'],
        display: ['var(--font-display)', 'Great Vibes', 'cursive'],
      },
      colors: {
        mosque: {
          green: '#024d08',
          'green-light': '#eef6f0',
          muted: '#f3eee2',
          footer: '#f1f6f4',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
