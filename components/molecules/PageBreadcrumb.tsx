'use client'

import { useLocale } from 'next-intl'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { BreadcrumbEntry } from '@/types/models'




export function PageBreadcrumb(
  { items, className } : {
  items: BreadcrumbEntry[],
  className?: string }
)  {
  const locale = useLocale()
  const isAr = locale === 'ar'

  if (!items.length) return null

  return (
    <Breadcrumb
      aria-label={isAr ? 'مسار التصفح' : 'Fil d’Ariane'}
      className={cn('mb-8 md:mb-10', isAr && 'text-right', className)}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <BreadcrumbList className={cn(isAr && 'justify-end')}>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1
          return (
            <BreadcrumbItem key={`${item.label}-${idx}`}>
              {item.href && !isLast ? (
                <BreadcrumbLink asChild className="font-medium hover:text-mosque-green">
                  <Link href={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="font-semibold">{item.label}</BreadcrumbPage>
              )}
              {!isLast && <BreadcrumbSeparator className="text-mosque-green/35" />}
            </BreadcrumbItem>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
