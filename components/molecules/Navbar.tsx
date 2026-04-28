'use client'

import { useEffect, useState } from 'react'
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
  const [isCompact, setIsCompact] = useState(false)

  const navLinks = [
    { href: '/', label: t('mosque') },
    { href: '/activites', label: t('activities') },
    { href: '/contact', label: t('contact') },
  ]

  function isActive(href: string) {
    const bare = pathname.replace(/^\/(fr|ar)/, '') || '/'
    return href === '/' ? bare === '/' : bare.startsWith(href)
  }

  useEffect(() => {
    const onScroll = () => {
      setIsCompact(window.scrollY > 56)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-brand-nav-from to-brand-nav-to text-white shadow-md backdrop-blur-sm transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            'flex items-center justify-between gap-4 transition-all duration-300',
            isCompact ? 'h-20' : 'h-24',
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center transition-opacity hover:opacity-90"
          >
            <Logo
              className={cn(
                'w-auto rounded-md bg-white p-1 object-contain shadow-sm ring-1 ring-white/20 transition-all duration-300',
                isCompact ? 'h-12 max-w-[200px]' : 'h-16 max-w-[250px]',
              )}
            />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map(({ href, label }) => {
              const active = isActive(href)
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'relative px-3 py-1.5 font-semibold transition-all duration-300',
                    isCompact ? 'text-base' : 'text-[17px]',
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
              className={cn(
                'ml-2 bg-brand-gold text-white shadow transition-all duration-300 hover:bg-brand-gold-hover',
                isCompact ? 'h-10 px-5 text-[15px]' : 'h-11 px-6 text-base',
              )}
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
