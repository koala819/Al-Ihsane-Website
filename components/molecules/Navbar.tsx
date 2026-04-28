'use client'

import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { LangSwitcher } from '@/components/atoms/LangSwitcher'
import { Logo } from '@/components/atoms/Logo'
import { NavbarMobileSheet } from '@/components/molecules/NavbarMobileSheet'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

export const Navbar = () => {
  const t = useTranslations('nav')
  const pathname = usePathname()

  const navLinks = [
    { href: '/', label: t('mosque') },
    { href: '/activites', label: t('activities') },
    { href: '/contact', label: t('contact') },
  ]

  function isActive(href: string) {
    const bare = pathname.replace(/^\/(fr|ar)/, '') || '/'
    return href === '/' ? bare === '/' : bare.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-mosque-nav-from to-mosque-nav-to text-white shadow-md backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center transition-opacity hover:opacity-90"
          >
            <Logo className="h-9 w-auto max-w-[140px] rounded-md bg-white p-0.5 object-contain shadow-sm ring-1 ring-white/20" />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map(({ href, label }) => {
              const active = isActive(href)
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'relative px-3 py-1.5 text-sm font-semibold transition-opacity',
                    'after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:rounded-full after:bg-white after:transition-transform after:duration-200',
                    active
                      ? 'opacity-100 after:scale-x-100'
                      : 'opacity-75 hover:opacity-100 after:scale-x-0 hover:after:scale-x-100',
                  )}
                  aria-current={active ? 'page' : undefined}
                >
                  {label}
                </Link>
              )
            })}
            <Button
              asChild
              size="sm"
              className="ml-2 bg-mosque-gold text-white shadow transition-colors hover:bg-mosque-gold-hover"
            >
              <Link href="/don">{t('donate')}</Link>
            </Button>
          </nav>

          {/* Desktop utils */}
          <div className="hidden items-center gap-2 md:flex">
            <LangSwitcher />
          </div>

          <NavbarMobileSheet
            navLinks={navLinks}
            isActive={isActive}
            donateLabel={t('donate')}
          />
        </div>
      </div>
    </header>
  )
}
