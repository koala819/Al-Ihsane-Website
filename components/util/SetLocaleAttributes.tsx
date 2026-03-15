'use client'

import { useLocale } from 'next-intl'
import { useEffect } from 'react'

/** Met à jour lang et dir sur le document selon la locale (pour l'arabe RTL). */
export default function SetLocaleAttributes() {
  const locale = useLocale()

  useEffect(() => {
    const html = document.documentElement
    html.setAttribute('lang', locale)
    html.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr')
  }, [locale])

  return null
}
