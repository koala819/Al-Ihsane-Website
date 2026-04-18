'use client'

import { MapPin, Phone, Youtube } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Link as LocaleLink } from '@/i18n/navigation'
import { Separator } from '@/components/ui/separator'
import { ThemeSwitcher } from '@/components/atoms/ThemeSwitcher'
import { SiteLogo } from '@/components/atoms/SiteLogo'

const YOUTUBE_URL = 'https://youtube.com/@abderrahmanemesli4217'

export function Footer() {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')
  const tContact = useTranslations('contact')

  return (
    <footer className="bg-mosque-footer text-mosque-green">

      {/* ── Corps principal ── */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">

          {/* ── Col 1 : Identité ── */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="shrink-0 rounded-xl bg-white p-1.5 shadow-sm ring-1 ring-mosque-green/10 dark:bg-white dark:ring-mosque-green/25">
                <SiteLogo className="h-11 w-auto max-w-[120px] object-contain" />
              </div>
              <div>
                <p className="font-bold leading-tight">{t('tagline')}</p>
                <p className="text-xs text-mosque-green/75 dark:text-mosque-green/85">
                  {t('subtitle')}
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-mosque-green/80 dark:text-mosque-green/90">
              Un lieu de prière, d&apos;apprentissage et de fraternité au cœur de Colomiers.
            </p>

            {/* Lien YouTube */}
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-fit items-center gap-2 rounded-lg border border-mosque-green/25 px-3 py-1.5 text-xs font-medium text-mosque-green/80 transition-colors hover:border-mosque-gold/45 hover:bg-mosque-gold-light hover:text-mosque-gold dark:border-mosque-green/35 dark:text-mosque-green/90 dark:hover:border-mosque-gold/40 dark:hover:bg-mosque-gold/15 dark:hover:text-mosque-gold"
            >
              <Youtube className="h-3.5 w-3.5" />
              Récitations · Abderrahmane Mesli
            </a>
          </div>

          {/* ── Col 2 : Navigation ── */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-mosque-green/75 dark:text-mosque-green/85">
              Navigation
            </p>
            <nav className="flex flex-col gap-2.5">
              {[
                { href: '/',            label: tNav('mosque') },
                { href: '/activites', label: tNav('activities') },
                { href: '/don',         label: tNav('donate') },
                { href: '/contact',     label: tNav('contact') },
              ].map(({ href, label }) => (
                <LocaleLink
                  key={href}
                  href={href}
                  className="text-sm text-mosque-green/80 transition-colors hover:text-mosque-green dark:text-mosque-green/90"
                >
                  {label}
                </LocaleLink>
              ))}
            </nav>
          </div>

          {/* ── Col 3 : Contact ── */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-mosque-green/75 dark:text-mosque-green/85">
              {tNav('contact')}
            </p>
            <div className="flex flex-col gap-3 text-sm text-mosque-green/80 dark:text-mosque-green/90">
              <span className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-mosque-green/60 dark:text-mosque-green/75" />
                <span className="whitespace-pre-line leading-snug">
                  {tContact('address')}
                </span>
              </span>
              <span className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-mosque-green/60 dark:text-mosque-green/75" />
                {tContact('phone')}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* ── Barre inférieure ── */}
      <Separator className="bg-mosque-green/10 dark:bg-mosque-green/20" />
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <p className="text-xs text-mosque-green/80 dark:text-mosque-green/88">{t('copyright')}</p>

        <div className="flex items-center gap-4">
          <LocaleLink
            href="/mentions"
            className="text-xs text-mosque-green/80 underline-offset-2 transition-colors hover:text-mosque-green hover:underline dark:text-mosque-green/88"
          >
            {tNav('mentions')}
          </LocaleLink>
          <LocaleLink
            href="/protection"
            className="text-xs text-mosque-green/80 underline-offset-2 transition-colors hover:text-mosque-green hover:underline dark:text-mosque-green/88"
          >
            {tNav('protection')}
          </LocaleLink>
          <ThemeSwitcher />
        </div>
      </div>

    </footer>
  )
}
