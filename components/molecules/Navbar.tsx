'use client'

import { Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

import LangSwitcher from '@/components/atoms/LangSwitcher'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { Link } from '@/i18n/navigation'

export function Navbar() {
  const t = useTranslations('nav')
  const pathname = usePathname()

  const navLinks = [
    { href: '/', label: t('mosque') },
    { href: '/association', label: t('association') },
    { href: '/contact', label: t('contact') },
  ]

  const isActive = (href: string) => {
    const bare = pathname.replace(/^\/(fr|ar)/, '') || '/'
    return href === '/' ? bare === '/' : bare.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-[rgba(4,62,47,0.97)] to-mosque-green text-white shadow-md backdrop-blur supports-[backdrop-filter]:bg-mosque-green/95">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="shrink-0 font-semibold tracking-wide transition-opacity hover:opacity-80"
          >
            {t('logo')}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map(({ href, label }) => {
              const active = isActive(href)
              return (
                <Link
                  key={href}
                  href={href}
                  className={[
                    'relative px-3 py-1.5 text-sm font-semibold transition-opacity',
                    'after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:rounded-full after:bg-white after:transition-transform after:duration-200',
                    active
                      ? 'opacity-100 after:scale-x-100'
                      : 'opacity-75 hover:opacity-100 after:scale-x-0 hover:after:scale-x-100',
                  ].join(' ')}
                  aria-current={active ? 'page' : undefined}
                >
                  {label}
                </Link>
              )
            })}
            <Button
              asChild
              size="sm"
              className="ml-2 bg-amber-500 text-white shadow hover:bg-amber-400"
            >
              <Link href="/don">{t('donate')}</Link>
            </Button>
          </nav>

          {/* Desktop utils */}
          <div className="hidden items-center gap-2 md:flex">
            <LangSwitcher />
          </div>

          {/* Mobile burger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-white hover:bg-white/10 md:hidden"
                aria-label="Ouvrir le menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-72 border-r-mosque-green/20 bg-mosque-green p-0 text-white"
            >
              <SheetHeader className="border-b border-white/10 px-6 py-4">
                <SheetTitle className="text-left text-base font-semibold text-white">
                  {t('logo')}
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col gap-1 px-4 py-4">
                {navLinks.map(({ href, label }) => {
                  const active = isActive(href)
                  return (
                    <SheetClose asChild key={href}>
                      <Link
                        href={href}
                        aria-current={active ? 'page' : undefined}
                        className={[
                          'rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors',
                          active
                            ? 'bg-white/15 text-white'
                            : 'text-white/80 hover:bg-white/10 hover:text-white',
                        ].join(' ')}
                      >
                        {label}
                      </Link>
                    </SheetClose>
                  )
                })}
                <SheetClose asChild>
                  <Link href="/don">
                    <Button className="mt-1 w-full bg-amber-500 text-white hover:bg-amber-400">
                      {t('donate')}
                    </Button>
                  </Link>
                </SheetClose>
              </nav>

              <Separator className="bg-white/10" />

              <div className="px-4 py-4">
                <LangSwitcher />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
