'use client'

import { Menu, X } from 'lucide-react'
import { useState } from 'react'

import LangSwitcher from '@/components/atoms/LangSwitcher'
import { ThemeSwitcher } from '@/components/atoms/ThemeSwitcher'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const t = useTranslations('nav')

  const navLinks = [
    { href: '/', label: t('mosque') },
    { href: '/association', label: t('association') },
    { href: '/contact', label: t('contact') },
  ]

  const donateLabel = t('donate')

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-[rgba(4,62,47,0.95)] to-mosque-green text-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center font-semibold">
            {t('logo')}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-4 md:flex">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="font-semibold text-white no-underline hover:opacity-90"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/don"
              className="rounded-lg bg-amber-500 px-3 py-1.5 text-sm font-bold text-white shadow transition-colors hover:bg-amber-400"
            >
              {donateLabel}
            </Link>
          </nav>

          {/* Desktop utils */}
          <div className="hidden items-center gap-2 md:flex">
            <LangSwitcher />
            <ThemeSwitcher />
          </div>

          {/* Mobile burger */}
          <button
            className="flex items-center justify-center rounded-md p-2 text-white hover:bg-white/10 md:hidden"
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu — déroulant sous la navbar */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-mosque-green md:hidden">
          <nav className="flex flex-col px-4 py-3">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2.5 text-white hover:bg-white/10"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/don"
              onClick={() => setMobileOpen(false)}
              className="mt-1 rounded-lg bg-amber-500 px-3 py-2.5 text-center font-bold text-white hover:bg-amber-400"
            >
              {donateLabel}
            </Link>
            <div className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3">
              <LangSwitcher />
              <ThemeSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
