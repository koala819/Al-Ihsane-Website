'use client'

import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'

import { cn } from '@/lib/utils'

/** Couleur événements alignée sur `--mosque-green` (hsl 217 58% 32%). */
const MOSQUE_EVENT = 'hsl(217, 58%, 36%)'

const KitchenCalendarSkeleton = () => {
  const t = useTranslations('activitiesPage')
  return (
    <div className="flex min-h-[400px] items-center justify-center px-4 text-sm text-muted-foreground">
      {t('kitchen.calendarLoading')}
    </div>
  )
}

const Calendar = dynamic(() => import('@ericz1803/react-google-calendar'), {
  ssr: false,
  loading: KitchenCalendarSkeleton,
})

type KitchenGoogleCalendarProps = {
  apiKey: string
  calendarId: string
  /** `FR` ou `EN` (la lib ne propose pas l’arabe). */
  language: 'FR' | 'EN'
  className?: string
}

export const KitchenGoogleCalendar = ({
  apiKey,
  calendarId,
  language,
  className,
}: KitchenGoogleCalendarProps) => {
  const calendars = useMemo(
    () => [{ calendarId: calendarId.trim(), color: MOSQUE_EVENT }],
    [calendarId],
  )

  const styles = useMemo(
    () => ({
      calendar: {
        borderWidth: '1px',
        borderStyle: 'solid' as const,
        borderColor: 'hsl(214 18% 86%)',
        borderRadius: '12px',
        overflow: 'hidden' as const,
        fontFamily: 'inherit',
      },
      day: {
        borderColor: 'hsl(214 18% 88%)',
      },
      today: {
        backgroundColor: 'hsl(214 42% 96%)',
        color: 'hsl(217 58% 28%)',
      },
    }),
    [],
  )

  return (
    <div className={cn('w-full overflow-x-auto bg-background px-1 py-3 sm:px-3', className)}>
      <Calendar
        apiKey={apiKey.trim()}
        calendars={calendars}
        language={language}
        showFooter={false}
        styles={styles}
      />
    </div>
  )
}
