'use client'

import { MapPin, Phone, Youtube } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Link as LocaleLink } from '@/i18n/navigation'
import { Separator } from '@/components/ui/separator'
import { ThemeSwitcher } from '@/components/atoms/ThemeSwitcher'

const YOUTUBE_URL = 'https://youtube.com/@abderrahmanemesli4217'

export function Footer() {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')
  const tContact = useTranslations('contact')

  return (
    <footer className="bg-mosque-footer text-mosque-green">

      {/* ── Corps principal ── */}
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">

          {/* ── Col 1 : Identité ── */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/al-ihsane-light.jpg"
                alt="Mosquée Al Ihsane"
                className="block h-12 w-auto rounded-lg object-contain dark:hidden"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/al-ihsane-dark.jpg"
                alt="Mosquée Al Ihsane"
                className="hidden h-12 w-auto rounded-lg object-contain dark:block"
              />
              <div>
                <p className="font-bold leading-tight">{t('tagline')}</p>
                <p className="text-xs text-mosque-green/60 dark:text-mosque-green/80">{t('subtitle')}</p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-mosque-green/65 dark:text-mosque-green/85">
              Un lieu de prière, d&apos;apprentissage et de fraternité au cœur de Colomiers.
            </p>

            {/* Lien YouTube */}
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-fit items-center gap-2 rounded-lg border border-mosque-green/20 px-3 py-1.5 text-xs font-medium text-mosque-green/70 transition-all hover:border-red-500/40 hover:bg-red-50 hover:text-red-600 dark:border-mosque-green/30 dark:text-mosque-green/90 dark:hover:bg-red-950/30"
            >
              <Youtube className="h-3.5 w-3.5" />
              Récitations · Abderrahmane Mesli
            </a>
          </div>

          {/* ── Col 2 : Navigation ── */}
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-mosque-green/40 dark:text-mosque-green/70">
              Navigation
            </p>
            <nav className="flex flex-col gap-2.5">
              {[
                { href: '/',            label: tNav('mosque') },
                { href: '/association', label: tNav('association') },
                { href: '/don',         label: tNav('donate') },
                { href: '/contact',     label: tNav('contact') },
              ].map(({ href, label }) => (
                <LocaleLink
                  key={href}
                  href={href}
                  className="text-sm text-mosque-green/65 transition-colors hover:text-mosque-green dark:text-mosque-green/85"
                >
                  {label}
                </LocaleLink>
              ))}
            </nav>
          </div>

          {/* ── Col 3 : Contact ── */}
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-mosque-green/40 dark:text-mosque-green/70">
              {tNav('contact')}
            </p>
            <div className="flex flex-col gap-3 text-sm text-mosque-green/65 dark:text-mosque-green/85">
              <span className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-mosque-green/40 dark:text-mosque-green/60" />
                <span className="whitespace-pre-line leading-snug">
                  {tContact('address')}
                </span>
              </span>
              <span className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-mosque-green/40 dark:text-mosque-green/60" />
                {tContact('phone')}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* ── Barre inférieure ── */}
      <Separator className="bg-mosque-green/10 dark:bg-mosque-green/20" />
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-4">
        <p className="text-xs text-mosque-green/40 dark:text-mosque-green/65">{t('copyright')}</p>

        <div className="flex items-center gap-4">
          <LocaleLink
            href="/mentions"
            className="text-xs text-mosque-green/40 transition-colors hover:text-mosque-green dark:text-mosque-green/65"
          >
            {tNav('mentions')}
          </LocaleLink>
          <LocaleLink
            href="/protection"
            className="text-xs text-mosque-green/40 transition-colors hover:text-mosque-green dark:text-mosque-green/65"
          >
            {tNav('protection')}
          </LocaleLink>
          <ThemeSwitcher />
        </div>
      </div>

    </footer>
  )
}
