'use client'

import { useTranslations } from 'next-intl'
import { Link as LocaleLink } from '@/i18n/navigation'

export function Footer() {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')

  return (
    <footer className="bg-mosque-footer py-8 text-center text-mosque-green">
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

      {/* Copyright */}
      <p className="mt-5 text-xs text-mosque-green/50">{t('copyright')}</p>
    </footer>
  )
}
