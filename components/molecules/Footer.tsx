'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link as LocaleLink } from '@/i18n/navigation'

export function Footer() {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')
  const { theme, setTheme } = useTheme()

  return (
    <footer className="bg-mosque-footer py-10 text-center text-mosque-green">
      {/* Logo adaptatif */}
      <div className="mb-4 flex justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/al-ihsane-light.jpg"
          alt="Al'ihsane School"
          className="block h-20 w-auto object-contain dark:hidden"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/al-ihsane-dark.jpg"
          alt="Al'ihsane School"
          className="hidden h-20 w-auto object-contain dark:block"
        />
      </div>

      {/* Identité */}
      <p className="text-base font-semibold">{t('tagline')}</p>
      <p className="mt-0.5 text-sm text-mosque-green/70">{t('subtitle')}</p>

      {/* Liens utilitaires */}
      <nav className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm">
        <LocaleLink href="/contact" className="text-mosque-green hover:underline">
          {tNav('contact')}
        </LocaleLink>
        <LocaleLink href="/mentions" className="text-mosque-green hover:underline">
          {tNav('mentions')}
        </LocaleLink>
        <LocaleLink href="/protection" className="text-mosque-green hover:underline">
          {tNav('protection')}
        </LocaleLink>
      </nav>

      {/* Thème + Copyright */}
      <div className="mt-5 flex flex-col items-center gap-2">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="flex cursor-pointer items-center gap-1.5 text-xs text-mosque-green/50 transition-colors hover:text-mosque-green"
          aria-label="Changer de thème"
        >
          {theme === 'dark' ? (
            <Sun className="h-3.5 w-3.5" />
          ) : (
            <Moon className="h-3.5 w-3.5" />
          )}
          {theme === 'dark' ? t('themeLight') : t('themeDark')}
        </button>
        <p className="text-xs text-mosque-green/50">{t('copyright')}</p>
      </div>
    </footer>
  )
}
