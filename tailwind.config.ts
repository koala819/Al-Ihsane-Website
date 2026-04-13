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
          green: 'hsl(var(--mosque-green))',
          'green-light': 'hsl(var(--mosque-green-light))',
          muted: 'hsl(var(--mosque-muted))',
          footer: 'hsl(var(--mosque-footer))',
          gold: 'hsl(var(--mosque-gold))',
          'gold-hover': 'hsl(var(--mosque-gold-hover))',
          'gold-light': 'hsl(var(--mosque-gold-light))',
          'nav-from': 'hsl(var(--mosque-nav-from))',
          'nav-to': 'hsl(var(--mosque-nav-to))',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
