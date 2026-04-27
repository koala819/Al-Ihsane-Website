import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

import { routing } from '@/i18n/routing'
import { Footer } from '@/components/molecules/Footer'
import { Navbar } from '@/components/molecules/Navbar'
import { PrayerTimes } from '@/components/organisms/PrayerTimes'
import GoogleAnalytics from '@/components/util/GoogleAnalytics'
import SetLocaleAttributes from '@/components/util/SetLocaleAttributes'

import { Providers } from '../providers'
import { cn } from '@/lib/utils'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <SetLocaleAttributes />
      <Providers>
        <div className={cn('min-h-screen')}>
          <div className="flex min-h-screen flex-col">
            {/* Bandeau horaires + dates — non sticky, scroll naturellement */}
            <PrayerTimes locale={locale} />
            {/* Navbar — sticky en dessous */}
            <Navbar />
            <main className="flex min-h-0 flex-1 flex-col">
              <GoogleAnalytics />
              <div className="flex min-h-0 flex-1 flex-col">{children}</div>
            </main>
            <Footer />
          </div>
        </div>
      </Providers>
    </NextIntlClientProvider>
  )
}
