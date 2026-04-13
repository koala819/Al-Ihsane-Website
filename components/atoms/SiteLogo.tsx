import type { ComponentPropsWithoutRef } from 'react'

/**
 * Logo institutionnel (public/Logo.jpg).
 * Fond blanc dans le fichier : utiliser un cadre clair (bg-white / ring) sur fond sombre.
 */
export function SiteLogo({
  className,
  ...props
}: Omit<ComponentPropsWithoutRef<'img'>, 'src' | 'alt'>) {
  return (
    <img
      src="/Logo.jpg"
      alt="Al Ihsane — Centre culturel et cultuel musulman de Colomiers"
      width={280}
      height={120}
      decoding="async"
      className={className}
      {...props}
    />
  )
}
