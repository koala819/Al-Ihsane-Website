'use client'

import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

import LangSwitcher from '@/components/atoms/LangSwitcher'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const t = useTranslations('nav')
  const pathname = usePathname()

  const navLinks = [
    { href: '/', label: t('mosque') },
    { href: '/association', label: t('association') },
    { href: '/contact', label: t('contact') },
  ]

  const donateLabel = t('donate')

  // Un lien est actif si le pathname (sans préfixe de locale) correspond
  const isActive = (href: string) => {
    // Retire le préfixe de locale éventuel (/fr, /ar)
    const bare = pathname.replace(/^\/(fr|ar)/, '') || '/'
    return href === '/' ? bare === '/' : bare.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-[rgba(4,62,47,0.95)] to-mosque-green text-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center font-semibold tracking-wide">
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
            <Link
              href="/don"
              className="ml-2 rounded-lg bg-amber-500 px-3 py-1.5 text-sm font-bold text-white shadow transition-colors hover:bg-amber-400"
            >
              {donateLabel}
            </Link>
          </nav>

          {/* Desktop utils — seulement le sélecteur de langue */}
          <div className="hidden items-center md:flex">
            <LangSwitcher />
          </div>

          {/* Mobile burger */}
          <button
            className="flex items-center justify-center rounded-md p-2 text-white hover:bg-white/10 md:hidden"
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-mosque-green md:hidden">
          <nav className="flex flex-col px-4 py-3">
            {navLinks.map(({ href, label }) => {
              const active = isActive(href)
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={active ? 'page' : undefined}
                  className={[
                    'rounded-md px-3 py-2.5 text-sm font-semibold transition-colors',
                    active
                      ? 'bg-white/15 text-white'
                      : 'text-white/80 hover:bg-white/10 hover:text-white',
                  ].join(' ')}
                >
                  {label}
                </Link>
              )
            })}
            <Link
              href="/don"
              onClick={() => setMobileOpen(false)}
              className="mt-1 rounded-lg bg-amber-500 px-3 py-2.5 text-center text-sm font-bold text-white hover:bg-amber-400"
            >
              {donateLabel}
            </Link>
            <div className="mt-3 border-t border-white/10 pt-3">
              <LangSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
