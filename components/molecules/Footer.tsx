'use client'

import { useTranslations } from 'next-intl'
import { Link as LocaleLink } from '@/i18n/navigation'

import { Separator } from '@/components/ui/separator'
import { ThemeSwitcher } from '@/components/atoms/ThemeSwitcher'

export function Footer() {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')

  return (
    <footer className="bg-mosque-footer py-10 text-mosque-green">
      <div className="mx-auto max-w-4xl px-4">
        {/* Logo adaptatif */}
        <div className="mb-5 flex justify-center">
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
        <div className="text-center">
          <p className="text-base font-semibold">{t('tagline')}</p>
          <p className="mt-0.5 text-sm text-mosque-green/70">{t('subtitle')}</p>
        </div>

        <Separator className="my-5 bg-mosque-green/15" />

        {/* Liens utilitaires */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm">
          <LocaleLink
            href="/contact"
            className="text-mosque-green/70 transition-colors hover:text-mosque-green hover:underline"
          >
            {tNav('contact')}
          </LocaleLink>
          <LocaleLink
            href="/mentions"
            className="text-mosque-green/70 transition-colors hover:text-mosque-green hover:underline"
          >
            {tNav('mentions')}
          </LocaleLink>
          <LocaleLink
            href="/protection"
            className="text-mosque-green/70 transition-colors hover:text-mosque-green hover:underline"
          >
            {tNav('protection')}
          </LocaleLink>
        </nav>

        <Separator className="my-5 bg-mosque-green/15" />

        {/* Thème + Copyright */}
        <div className="flex flex-col items-center gap-3">
          <ThemeSwitcher />
          <p className="text-xs text-mosque-green/50">{t('copyright')}</p>
        </div>
      </div>
    </footer>
  )
}
