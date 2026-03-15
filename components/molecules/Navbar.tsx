'use client'

import { Menu } from 'lucide-react'
import * as React from 'react'
import { useState } from 'react'

import LangSwitcher from '@/components/atoms/LangSwitcher'
import { ThemeSwitcher } from '@/components/atoms/ThemeSwitcher'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useTranslations } from 'next-intl'

export function Navbar() {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const t = useTranslations('nav')

  React.useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('header')
      if (window.scrollY > 50) {
        navbar?.classList.add('scrolled')
      } else {
        navbar?.classList.remove('scrolled')
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeSheet = () => setIsSheetOpen(false)

  const navLinks = [
    { href: '/#home', label: t('home') },
    { href: '/#about', label: t('about') },
    { href: '/#history', label: t('history') },
    { href: '/#news', label: t('news') },
    { href: '/contact', label: t('contact') },
  ]

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-[rgba(4,62,47,0.95)] to-mosque-green text-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between py-3">
          <Link href="/" className="flex items-center font-semibold">
            {t('logo')}
          </Link>

          <nav className="hidden gap-4 md:flex">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="font-semibold text-white no-underline hover:opacity-90"
              >
                {label}
              </Link>
            ))}
          </nav>

          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                className="md:hidden"
                size="icon"
                variant="ghost"
                aria-label="Menu"
              >
                <Menu className="h-6 w-6 text-white" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white dark:bg-slate-800">
              <nav className="flex flex-col gap-2">
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={closeSheet}
                    className="rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-700"
                  >
                    {label}
                  </Link>
                ))}
                <div className="mt-4 flex items-center gap-2 border-t pt-4">
                  <LangSwitcher />
                  <ThemeSwitcher />
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          <div className="hidden items-center gap-2 md:flex">
            <LangSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </header>
  )
}
