'use client'

import { useTranslations } from 'next-intl'

import { Link as LocaleLink } from '@/i18n/navigation'

export function Footer() {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')

  return (
    <footer className="bg-mosque-footer py-6 text-center text-mosque-green">
      <p className="px-4 text-sm">
        {t('tagline')}
        <span className="font-arabic ms-2" dir="rtl">
          • {t('taglineAr')}
        </span>
      </p>
      <nav className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm">
        <LocaleLink href="/association" className="text-mosque-green hover:underline">
          {tNav('association')}
        </LocaleLink>
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
    </footer>
  )
}
