'use client'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

type Locale = 'fr' | 'ar'

const LOCALE_LABELS: Record<Locale, string> = {
  fr: 'FR',
  ar: 'العربية',
}

export const LangSwitcher = () => {
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations('lang')

  function switchLocale(newLocale: Locale) {
    router.replace(`/${newLocale}${pathname}`)
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
            type="button"
            onClick={() => switchLocale(loc)}
            disabled={isActive}
            aria-current={isActive ? 'true' : undefined}
            className={cn(
              'cursor-pointer px-3 py-1.5 text-sm font-semibold transition-colors',
              isActive
                ? 'bg-white/25 text-white'
                : 'bg-transparent text-white/85 hover:bg-white/10 hover:text-white',
              loc === 'ar' && 'font-arabic',
            )}
          >
            {LOCALE_LABELS[loc]}
          </button>
        )
      })}
    </div>
  )
}
