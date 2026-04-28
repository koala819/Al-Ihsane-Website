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
        brand: {
          green: 'hsl(var(--brand-primary))',
          'green-text': 'hsl(var(--brand-primary-text))',
          'green-light': 'hsl(var(--brand-primary-soft))',
          muted: 'hsl(var(--brand-muted))',
          footer: 'hsl(var(--brand-footer))',
          gold: 'hsl(var(--brand-accent))',
          'gold-hover': 'hsl(var(--brand-accent-hover))',
          'gold-light': 'hsl(var(--brand-accent-soft))',
          'nav-from': 'hsl(var(--brand-nav-from))',
          'nav-to': 'hsl(var(--brand-nav-to))',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
