'use client'

import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
    h3: ({ children }) => (
      <h4 className="mb-2 mt-3 text-sm font-bold text-foreground first:mt-0">{children}</h4>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-2 list-disc space-y-1 pl-5 [dir=rtl]:pr-5 [dir=rtl]:pl-0">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-2 list-decimal space-y-1 pl-5 [dir=rtl]:pr-5 [dir=rtl]:pl-0">{children}</ol>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href as string | undefined
      if (!href) return <>{children}</>
      return (
        <a href={href} className="font-medium text-mosque-green underline underline-offset-2 hover:opacity-90" rel="noopener noreferrer">
          {children}
        </a>
      )
    },
  },
}

export function PortableArticleBody({
  value,
  dir,
}: {
  value: PortableTextBlock[] | null | undefined
  dir: 'ltr' | 'rtl'
}) {
  if (!value?.length) return null
  return (
    <div dir={dir} className="text-sm leading-relaxed text-foreground">
      <PortableText value={value} components={components} />
    </div>
  )
}
