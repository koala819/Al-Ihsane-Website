'use client'

import { useLocale } from 'next-intl'
import { usePathname } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

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

  const title = locale === 'fr' ? t('switchToAr') : t('switchToFr')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-white/50 bg-transparent text-white hover:bg-white/10 hover:text-white md:min-w-[4rem]"
          title={title}
        >
          {LOCALE_LABELS[locale]}
          <ChevronDown className="ml-1 h-4 w-4 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[6rem]">
        {(['fr', 'ar'] as const).map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => switchLocale(loc)}
            className={locale === loc ? 'bg-accent' : ''}
          >
            {LOCALE_LABELS[loc]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
