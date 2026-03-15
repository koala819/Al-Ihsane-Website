import type { Metadata } from 'next'
import { Inter as FontSans, Noto_Naskh_Arabic, Great_Vibes } from 'next/font/google'

import { cn } from '@/lib/utils'
import '@/styles/globals.css'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

const fontArabic = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
})

const fontDisplay = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
})

export const metadata: Metadata = {
  title: 'Al Ihsane',
  description: 'Site web Al Ihsane',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
          fontArabic.variable,
          fontDisplay.variable,
        )}
      >
        {children}
      </body>
    </html>
  )
}
