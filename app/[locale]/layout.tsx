import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

import { routing } from '@/i18n/routing'
import { Footer } from '@/components/molecules/Footer'
import { Navbar } from '@/components/molecules/Navbar'
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
  await params
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <SetLocaleAttributes />
      <Providers>
        <div className={cn('min-h-screen min-w-screen')}>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 pt-16">
              <GoogleAnalytics />
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </Providers>
    </NextIntlClientProvider>
  )
}
