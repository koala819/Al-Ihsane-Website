'use client'

import { ChevronRight } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { ActivityCardConfig } from '@/types/models'

type ActivityCardProps = {
  activity: ActivityCardConfig
  isAr: boolean
  constructionBadgeLabel: string
  constructionNoticeLabel: string
}

export const ActivityCard = ({
  activity,
  isAr,
  constructionBadgeLabel,
  constructionNoticeLabel,
}: ActivityCardProps) => {
  const Icon = activity.icon
  const cardClassName = cn(
    'flex flex-col rounded-2xl border border-mosque-green/12 bg-card p-6 shadow-sm md:p-7',
    activity.href &&
    'group transition-all duration-200 hover:-translate-y-0.5 hover:border-mosque-green/25 hover:shadow-md',
    isAr && 'text-right',
  )
  const content = (
    <>
      <div className={cn('mb-4 flex items-start gap-3', isAr && 'flex-row-reverse')}>
        <div
          className={cn(
            'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-mosque-green/10',
            activity.href && 'transition-colors group-hover:bg-mosque-green/15',
          )}
        >
          <Icon className="h-6 w-6 text-mosque-green" aria-hidden />
        </div>
        <h2 className="text-lg font-bold text-foreground md:text-xl">{activity.title}</h2>
      </div>
      <p
        className={cn(
          'text-sm leading-relaxed text-muted-foreground md:text-[15px]',
          activity.href ? 'mb-6 flex-1' : 'mb-5',
        )}
      >
        {activity.body}
      </p>

      {activity.showConstructionNotice && (
        <div
          className={cn(
            'mt-auto rounded-xl border border-dashed border-mosque-green/25 bg-mosque-green-light/40 px-4 py-3 dark:bg-mosque-green/10',
            isAr && 'text-right',
          )}
        >
          <Badge
            variant="secondary"
            className="mb-2 bg-mosque-green/15 text-xs font-semibold text-mosque-green hover:bg-mosque-green/20"
          >
            {constructionBadgeLabel}
          </Badge>
          <p className="text-xs leading-relaxed text-muted-foreground md:text-sm">
            {constructionNoticeLabel}
          </p>
        </div>
      )}

      {activity.href && activity.ctaLabel && (
        <span
          className={cn(
            'mt-auto flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-mosque-gold/40 py-2 text-sm font-semibold text-mosque-gold transition-all',
            'group-hover:border-transparent group-hover:bg-mosque-gold group-hover:text-white',
            isAr && 'flex-row-reverse',
          )}
        >
          {activity.ctaLabel}
          <ChevronRight
            className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
            aria-hidden
          />
        </span>
      )}
    </>
  )

  return activity.href ? (
    <Link href={activity.href} className={cardClassName} lang={isAr ? 'ar' : 'fr'}>
      {content}
    </Link>
  ) : (
    <article className={cardClassName} lang={isAr ? 'ar' : 'fr'}>
      {content}
    </article>
  )
}
