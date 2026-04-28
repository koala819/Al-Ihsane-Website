import { fetchPrayerTimes } from '@/lib/server/prayer-times'
import { getTranslations } from 'next-intl/server'

const PRAYERS = [
  { key: 'fajr', idx: 0 },
  { key: 'shuruq', idx: -1 },
  { key: 'dhuhr', idx: 1 },
  { key: 'asr', idx: 2 },
  { key: 'maghrib', idx: 3 },
  { key: 'isha', idx: 4 },
]

// ── Types ─────────────────────────────────────────────────────────────────

interface AlAdhanDate {
  data: {
    hijri: {
      day: string
      month: { en: string; ar: string }
      year: string
    }
  }
}

// ── Fetchers ──────────────────────────────────────────────────────────────

/**
 * Convertit la date du jour en date hégirien via l'API AlAdhan.
 * Utilise le calendrier Umm al-Qura (HJCoSA) — standard saoudien,
 * le plus reconnu mondialement pour les mosquées.
 * Revalidation toutes les heures pour couvrir le changement de jour.
 */
async function fetchHijriDate(): Promise<AlAdhanDate['data'] | null> {
  try {
    const now = new Date()
    const dd = String(now.getDate()).padStart(2, '0')
    const mm = String(now.getMonth() + 1).padStart(2, '0')
    const yyyy = now.getFullYear()

    const res = await fetch(
      `https://api.aladhan.com/v1/gToH?date=${dd}-${mm}-${yyyy}`,
      { next: { revalidate: 3600 } },
    )
    if (!res.ok) return null
    const json: AlAdhanDate = await res.json()
    return json.data ?? null
  } catch {
    return null
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────

/** Convertit les chiffres latins en chiffres arabes-indiens (٠١٢٣…) */
function toArabicIndic(s: string): string {
  return s.replace(/[0-9]/g, (d) => '٠١٢٣٤٥٦٧٨٩'[+d])
}

// ── Composant ─────────────────────────────────────────────────────────────

export async function PrayerTimes({ locale }: { locale: string }) {
  const tPrayer = await getTranslations({ locale, namespace: 'prayerTimes' })
  const [prayerData, dateData] = await Promise.all([
    fetchPrayerTimes(),
    fetchHijriDate(),
  ])
  const isAr = locale === 'ar'
  const now = new Date()

  // ── Date grégorienne (Intl est fiable pour le calendrier civil standard) ──
  const gregorian = now.toLocaleDateString(isAr ? 'ar-DZ' : 'fr-FR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).toUpperCase()

  // ── Date hégirien depuis AlAdhan ──────────────────────────────────────────
  let hijri: string | null = null
  if (dateData) {
    const { day, month, year } = dateData.hijri
    if (isAr) {
      // Chiffres arabes-indiens + mois en arabe + suffixe هـ (هجري)
      hijri = `${toArabicIndic(day)} ${month.ar} ${toArabicIndic(year)}\u00a0هـ`
    } else {
      // Chiffres latins + mois translittéré (Shawwāl, Ramadān…)
      hijri = `${day} ${month.en} ${year}`
    }
  }

  const getTime = (idx: number) =>
    idx === -1 ? prayerData!.shuruq : prayerData!.times[idx]

  let nextPrayerKey: string | null = null
  if (prayerData) {
    const nowMin = now.getHours() * 60 + now.getMinutes()
    const canonicalPrayers = PRAYERS.filter((p) => p.idx >= 0)
    const prayerMins = canonicalPrayers.map(({ idx }) => {
      const [h, m] = getTime(idx).split(':').map(Number)
      return h * 60 + m
    })
    const nextIdx = prayerMins.findIndex((m) => m > nowMin)
    nextPrayerKey = (nextIdx >= 0 ? canonicalPrayers[nextIdx] : canonicalPrayers[0]).key
  }

  const prayerTokens = prayerData
    ? PRAYERS.map(({ key, idx }) => ({
        key,
        text: `${tPrayer(key)} : ${getTime(idx)}`,
      }))
    : []

  const tokens: Array<{ key: string; text: string; highlight?: boolean }> = [
    ...(hijri ? [{ key: 'hijri', text: hijri }] : []),
    ...prayerTokens.map((p) => ({
      key: p.key,
      text: p.text,
      highlight: p.key === nextPrayerKey,
    })),
    { key: 'gregorian', text: gregorian },
  ]

  return (
    <div className="border-b border-brand-green/20 bg-brand-green-light">
      <div className="mx-auto max-w-7xl px-4">
        <div
          className="overflow-x-auto whitespace-nowrap py-3.5 text-sm font-medium text-brand-green sm:py-4 sm:text-[15px]"
          lang={isAr ? 'ar' : 'fr'}
          dir={isAr ? 'rtl' : 'ltr'}
        >
          {tokens.map((token, idx) => (
            <span key={token.key} className="inline-flex items-center">
              <span
                className={
                  token.highlight
                    ? 'rounded-full bg-brand-green px-2.5 py-1 text-xs font-semibold text-white sm:text-sm'
                    : idx === 0
                      ? 'font-semibold uppercase tracking-wide'
                      : ''
                }
              >
                {token.text}
              </span>
              {idx < tokens.length - 1 && (
                <span className="px-3.5 text-brand-green/45" aria-hidden>
                  |
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
