'use client'

import { MapPin, Phone, Youtube } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Link as LocaleLink } from '@/i18n/navigation'
import { Separator } from '@/components/ui/separator'
import { ThemeSwitcher } from '@/components/atoms/ThemeSwitcher'
import { Logo } from '@/components/atoms/Logo'

const YOUTUBE_URL = 'https://youtube.com/@abderrahmanemesli4217'
const LINK_CLASS =
  'text-sm text-brand-green/80 transition-colors hover:text-brand-green dark:text-brand-green/90'
const LEGAL_LINK_CLASS =
  'text-xs text-brand-green/80 underline-offset-2 transition-colors hover:text-brand-green hover:underline dark:text-brand-green/88'

export const Footer = () => {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')
  const tContact = useTranslations('contact')
  const navLinks = [
    { href: '/', label: tNav('mosque') },
    { href: '/activites', label: tNav('activities') },
    { href: '/don', label: tNav('donate') },
    { href: '/contact', label: tNav('contact') },
  ]
  const legalLinks = [
    { href: '/mentions', label: tNav('mentions') },
    { href: '/protection', label: tNav('protection') },
  ]

  return (
    <footer className="bg-brand-footer text-brand-green">

      {/* ── Corps principal ── */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">

          {/* ── Col 1 : Identité ── */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="shrink-0 rounded-xl bg-white p-1.5 shadow-sm ring-1 ring-brand-green/10 dark:bg-white dark:ring-brand-green/25">
                <Logo className="h-11 w-auto max-w-[120px] object-contain" />
              </div>
              <div>
                <p className="font-bold leading-tight">{t('tagline')}</p>
                <p className="text-xs text-brand-green/75 dark:text-brand-green/85">
                  {t('subtitle')}
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-brand-green/80 dark:text-brand-green/90">
              {t('description')}
            </p>

            {/* Lien YouTube */}
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-fit items-center gap-2 rounded-lg border border-brand-green/25 px-3 py-1.5 text-xs font-medium text-brand-green/80 transition-colors hover:border-brand-gold/45 hover:bg-brand-gold-light hover:text-brand-gold dark:border-brand-green/35 dark:text-brand-green/90 dark:hover:border-brand-gold/40 dark:hover:bg-brand-gold/15 dark:hover:text-brand-gold"
            >
              <Youtube className="h-3.5 w-3.5" />
              {t('youtubeLabel')}
            </a>
          </div>

          {/* ── Col 2 : Navigation ── */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-brand-green/75 dark:text-brand-green/85">
              {t('navigationTitle')}
            </p>
            <nav className="flex flex-col gap-2.5">
              {navLinks.map(({ href, label }) => (
                <LocaleLink
                  key={href}
                  href={href}
                  className={LINK_CLASS}
                >
                  {label}
                </LocaleLink>
              ))}
            </nav>
          </div>

          {/* ── Col 3 : Contact ── */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-brand-green/75 dark:text-brand-green/85">
              {tNav('contact')}
            </p>
            <div className="flex flex-col gap-3 text-sm text-brand-green/80 dark:text-brand-green/90">
              <span className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-green/60 dark:text-brand-green/75" />
                <span className="whitespace-pre-line leading-snug">
                  {tContact('address')}
                </span>
              </span>
              <span className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-brand-green/60 dark:text-brand-green/75" />
                {tContact('phone')}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* ── Barre inférieure ── */}
      <Separator className="bg-brand-green/10 dark:bg-brand-green/20" />
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <p className="text-xs text-brand-green/80 dark:text-brand-green/88">{t('copyright')}</p>

        <div className="flex items-center gap-4">
          {legalLinks.map(({ href, label }) => (
            <LocaleLink key={href} href={href} className={LEGAL_LINK_CLASS}>
              {label}
            </LocaleLink>
          ))}
          <ThemeSwitcher />
        </div>
      </div>

    </footer>
  )
}
