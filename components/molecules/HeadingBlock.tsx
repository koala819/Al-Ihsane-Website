'use client'

import { cn } from '@/lib/utils'

type SectionHeaderProps = {
  title: string
  as?: 'h1' | 'h2'
  isRtl?: boolean
  className?: string
  children?: React.ReactNode
}

export const HeadingBlock = ({
  title,
  as = 'h2',
  isRtl = false,
  className,
  children,
}: SectionHeaderProps) => {
  const HeadingTag = as

  return (
    <header className={cn('mb-8 md:mb-10', isRtl && 'text-right', className)}>
      <HeadingTag className="text-2xl font-bold text-mosque-green md:text-3xl">
        {title}
      </HeadingTag>
      <div className={cn('mt-2 h-1 w-12 rounded-full bg-mosque-green/30', isRtl && 'ms-auto')} />
      {children}
    </header>
  )
}
