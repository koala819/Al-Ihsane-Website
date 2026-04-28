import Link from 'next/link'
import { CalendarClock, ChevronRight, GraduationCap } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { cn } from '@/lib/utils'

type PageProps = {
  params: Promise<{ locale: string }>
}

export default async function Preinscriptions2027PrivatePage({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'preinscriptions2027' })
  const base = `/${locale}/pre-inscriptions-2027/majlis-prive-nour-k7m4x2v9`
  const isAr = locale === 'ar'

  const choices = [
    {
      href: `${base}/questionnaire-professeurs`,
      title: t('hub.questionnaireTitle'),
      description: t('hub.questionnaireDescription'),
      icon: CalendarClock,
      accent: 'from-mosque-gold/15 to-mosque-gold/5 dark:from-mosque-gold/20 dark:to-mosque-gold/5',
      iconClass: 'bg-mosque-gold/15 text-mosque-gold dark:bg-mosque-gold/25',
    },
    {
      href: `${base}/inscription-enfants`,
      title: t('hub.inscriptionTitle'),
      description: t('hub.inscriptionDescription'),
      icon: GraduationCap,
      accent: 'from-mosque-green/12 to-mosque-green/5 dark:from-mosque-green/20 dark:to-mosque-green/5',
      iconClass: 'bg-mosque-green/15 text-mosque-green dark:bg-mosque-green/25',
    },
  ] as const

  return (
    <div className="min-h-[70vh] bg-gradient-to-b from-mosque-muted/40 via-background to-background dark:from-mosque-green/10">
      <section className="mx-auto w-full max-w-lg px-4 pb-16 pt-10 sm:max-w-xl sm:pt-14">
        <header className={cn('text-center', !isAr && 'sm:text-left', isAr && 'sm:text-right')}>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {t('hub.eyebrow')}
          </p>
        </header>

        <ul className="mt-10 flex flex-col gap-4 sm:mt-12 sm:gap-5" role="list">
          {choices.map(({ href, title, description, icon: Icon, accent, iconClass }) => (
            <li key={href}>
              <Link
                href={href}
                className={`group relative flex w-full items-start gap-4 overflow-hidden rounded-2xl border border-border/80 bg-card/80 p-5 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-mosque-gold/35 hover:shadow-md active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mosque-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-6`}
              >
                <span
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-80 ${accent}`}
                />
                <span
                  className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                </span>
                <span className="relative min-w-0 flex-1 text-start">
                  <span className="flex items-start justify-between gap-2">
                    <span className="text-base font-semibold leading-snug text-foreground sm:text-lg">
                      {title}
                    </span>
                    <ChevronRight
                      className={cn(
                        'mt-0.5 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:text-mosque-gold',
                        isAr
                          ? 'rotate-180 group-hover:-translate-x-0.5'
                          : 'group-hover:translate-x-0.5',
                      )}
                      aria-hidden
                    />
                  </span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
