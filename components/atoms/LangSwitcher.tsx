'use client'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname } from '@/i18n/navigation'

type Locale = 'fr' | 'ar'

const LOCALE_LABELS: Record<Locale, string> = {
  fr: 'FR',
  ar: 'العربية',
}

export default function LangSwitcher() {
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const t = useTranslations('lang')

  const switchLocale = (newLocale: Locale) => {
    const path = pathname === '/' ? '' : pathname
    window.location.href = `/${newLocale}${path}`
  }

  return (
    <div
      className="flex items-center rounded-lg overflow-hidden border border-white/30"
      title={locale === 'fr' ? t('switchToAr') : t('switchToFr')}
    >
      {(['fr', 'ar'] as const).map((loc) => {
        const isActive = locale === loc
        return (
          <button
            key={loc}
            onClick={() => switchLocale(loc)}
            disabled={isActive}
            aria-current={isActive ? 'true' : undefined}
            className={[
              'cursor-pointer px-3 py-1.5 text-sm font-semibold transition-colors',
              isActive
                ? 'bg-white/25 text-white'
                : 'bg-transparent text-white/85 hover:bg-white/10 hover:text-white',
              loc === 'ar' ? 'font-arabic' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {LOCALE_LABELS[loc]}
          </button>
        )
      })}
    </div>
  )
}
