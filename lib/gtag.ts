export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID

type GtagCommand = 'config' | 'event' | 'js'
type Gtag = (command: GtagCommand, target: string | Date, params?: Record<string, unknown>) => void

function getGtag(): Gtag | null {
  if (typeof window === 'undefined') return null
  return typeof window.gtag === 'function' ? window.gtag : null
}

export const pageview = (url: string) => {
  const gtag = getGtag()
  if (!gtag || !GA_TRACKING_ID) return

  gtag('config', GA_TRACKING_ID, { page_path: url })
}

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label: string
  value: number
}) => {
  const gtag = getGtag()
  if (!gtag) return

  gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  })
}

declare global {
  interface Window {
    gtag?: Gtag
  }
}
