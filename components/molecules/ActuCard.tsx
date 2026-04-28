'use client'

import { useState } from 'react'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { Calendar, ChevronDown, ChevronUp } from 'lucide-react'
import Image from 'next/image'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import { sanityTextComponents } from '@/lib/sanityTextComponents'

const ISLAMIC_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.12'%3E%3Cpath d='M30 0l5 10H25L30 0zm0 60l5-10H25l5 10zM0 30l10-5v10L0 30zm60 0l-10-5v10L60 30zM15 15l5 5-5 5-5-5 5-5zm30 0l5 5-5 5-5-5 5-5zm-30 30l5 5-5 5-5-5 5-5zm30 0l5 5-5 5-5-5 5-5z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`

type ActuCardProps = {
  tag: string
  title: string
  date: string
  preview: string
  body?: PortableTextBlock[] | null
  dir: 'ltr' | 'rtl'
  isAr: boolean
  imageUrl?: string | null
  imageAlt?: string
}

export const ActuCard = ({
  tag,
  title,
  date,
  preview,
  body,
  dir,
  isAr,
  imageUrl,
  imageAlt,
}: ActuCardProps) => {
  const [expanded, setExpanded] = useState(false)
  const readLabel = isAr ? 'اقرأ المزيد' : 'Lire la suite'
  const collapseLabel = isAr ? 'طي' : 'Réduire'

  return (
    <Card className="group flex h-full flex-col overflow-hidden rounded-2xl border-brand-green/10 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      <div className="relative h-40 overflow-hidden">
        {imageUrl ? (
          <>

            <Image
              src={imageUrl}
              alt={imageAlt ?? title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              width={900}
              height={500}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-brand-green via-brand-green to-brand-green/80 dark:from-[hsl(220,22%,14%)] dark:via-[hsl(220,20%,12%)] dark:to-[hsl(220,18%,10%)]" />
            <div className="absolute inset-0" style={{ backgroundImage: ISLAMIC_PATTERN }} />
          </>
        )}

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-4 pb-3">
          <Badge className="border-0 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30">
            {tag}
          </Badge>
          <span className="flex items-center gap-1 text-[11px] font-medium text-white/80">
            <Calendar className="h-3 w-3" />
            {date}
          </span>
        </div>
      </div>

      <CardContent className="flex flex-1 flex-col px-5 pt-4 pb-0">
        <CardTitle className="mb-3 text-lg leading-snug text-foreground transition-colors group-hover:text-brand-green">
          {title}
        </CardTitle>

        {!expanded ? (
          <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">{preview}</p>
        ) : (
          <div dir={dir} className="flex-1 text-sm leading-relaxed text-foreground">
            {body?.length ? (
              <PortableText value={body} components={sanityTextComponents} />
            ) : (
              <p>{preview}</p>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="px-5 pt-4 pb-5">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-brand-gold/40 py-2 text-sm font-semibold text-brand-gold transition-all hover:border-transparent hover:bg-brand-gold hover:text-white"
        >
          {expanded ? (
            <>
              {collapseLabel} <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              {readLabel} <ChevronDown className="h-4 w-4" />
            </>
          )}
        </button>
      </CardFooter>
    </Card>
  )
}
