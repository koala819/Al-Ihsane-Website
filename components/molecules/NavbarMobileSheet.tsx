'use client'

import { Menu } from 'lucide-react'

import { LangSwitcher } from '@/components/atoms/LangSwitcher'
import { Logo } from '@/components/atoms/Logo'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

type NavLink = {
  href: string
  label: string
}

type NavbarMobileSheetProps = {
  navLinks: NavLink[]
  isActive: (href: string) => boolean
  donateLabel: string
}

export const NavbarMobileSheet = ({
  navLinks,
  isActive,
  donateLabel,
}: NavbarMobileSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 text-white hover:bg-white/10 md:hidden"
          aria-label="Ouvrir le menu"
        >
          <Menu className="h-[22px] w-[22px]" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-72 border-r-brand-green/20 bg-brand-green p-0 text-white"
      >
        <SheetHeader className="border-b border-white/10 px-6 py-4">
          <SheetTitle className="flex items-center text-white">
            <Logo className="h-11 w-auto max-w-[190px] rounded-md bg-white p-0.5 object-contain shadow-sm ring-1 ring-white/20" />
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
                  className={cn(
                    'rounded-lg px-3 py-3 text-[15px] font-semibold transition-colors',
                    active
                      ? 'bg-white/15 text-white'
                      : 'text-white/80 hover:bg-white/10 hover:text-white',
                  )}
                >
                  {label}
                </Link>
              </SheetClose>
            )
          })}
          <SheetClose asChild>
            <Link href="/don">
              <Button className="mt-1 w-full bg-brand-gold text-white hover:bg-brand-gold-hover">
                {donateLabel}
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
  )
}
