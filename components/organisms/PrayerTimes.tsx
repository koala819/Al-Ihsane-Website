import Link from 'next/link'
import { fetchPrayerTimes } from '@/lib/server/prayer-times'

const PRAYERS = [
  { key: 'fajr',    label: 'Fajr',     labelAr: 'الفجر',   idx: 0 },
  { key: 'shuruq',  label: 'Chourouk', labelAr: 'الشروق',  idx: -1 },
  { key: 'dhuhr',   label: 'Dhuhr',    labelAr: 'الظهر',   idx: 1 },
  { key: 'asr',     label: 'Asr',      labelAr: 'العصر',   idx: 2 },
  { key: 'maghrib', label: 'Maghrib',  labelAr: 'المغرب',  idx: 3 },
  { key: 'isha',    label: 'Isha',     labelAr: 'العشاء',  idx: 4 },
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
  })

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

  // ── Détection de la prochaine prière ─────────────────────────────────────
  const nowMin = now.getHours() * 60 + now.getMinutes()
  let nextIdx = -1
  if (prayerData) {
    const prayerMins = prayerData.times.map((t) => {
      const [h, m] = t.split(':').map(Number)
      return h * 60 + m
    })
    nextIdx = prayerMins.findIndex((m) => m > nowMin)
  }
  const nextPrayerKey =
    nextIdx >= 0 ? PRAYERS.filter((p) => p.idx >= 0)[nextIdx]?.key : null

  const getTime = (idx: number) =>
    idx === -1 ? prayerData!.shuruq : prayerData!.times[idx]

  return (
    <div className="border-b border-brand-green/20 bg-brand-green-light">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 py-2 sm:py-2.5">

          {/* ── Dates ─────────────────────────────────────────────────── */}
          <div className="flex shrink-0 items-center gap-2 text-[11px]">
            {/* Grégorien — gauche */}
            <span
              className="capitalize text-brand-green/70 dark:text-brand-green/90"
              lang={isAr ? 'ar' : 'fr'}
              dir={isAr ? 'rtl' : 'ltr'}
            >
              {gregorian}
            </span>

            {/* Séparateur */}
            {hijri && <span className="select-none text-brand-green/30 dark:text-brand-green/50">·</span>}

            {/* Hégirien — droite */}
            {hijri && (
              <span
                className={[
                  'font-semibold text-brand-green',
                  isAr ? 'font-arabic text-[12px]' : '',
                ].join(' ')}
                lang={isAr ? 'ar' : 'fr'}
                dir={isAr ? 'rtl' : 'ltr'}
              >
                {hijri}
              </span>
            )}
          </div>

          {/* ── Horaires de prière ────────────────────────────────────── */}
          {prayerData ? (
            <div className="flex items-center gap-0.5 sm:gap-1">
              {PRAYERS.map(({ key, label, labelAr, idx }) => {
                const time = getTime(idx)
                const isNext = key === nextPrayerKey
                return (
                  <div
                    key={key}
                    className={[
                      'flex min-w-[44px] flex-col items-center rounded-lg px-1.5 py-1 transition-all duration-200 sm:min-w-[58px] sm:px-2',
                      isNext
                        ? 'bg-brand-green text-white shadow-sm dark:ring-1 dark:ring-brand-green/60'
                        : 'text-brand-green hover:bg-brand-green/10',
                    ].join(' ')}
                  >
                    <span
                      className={[
                        'text-[9px] font-semibold uppercase tracking-wide sm:text-[10px]',
                        isNext ? 'text-white/80' : 'text-brand-green/55 dark:text-brand-green/80',
                      ].join(' ')}
                    >
                      {isAr ? labelAr : label}
                    </span>
                    <span
                      className={[
                        'text-[13px] font-bold tabular-nums sm:text-sm',
                        isNext ? 'text-white' : 'text-brand-green',
                      ].join(' ')}
                    >
                      {time}
                    </span>
                  </div>
                )
              })}
            </div>
          ) : (
            <Link
              href="https://mawaqit.net/fr/m/alihsane-colomiers"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-brand-green hover:underline"
            >
              {isAr ? 'مواقيت الصلاة ↗' : 'Horaires de prière ↗'}
            </Link>
          )}

          {/* ── Jumu'a + Mawaqit ──────────────────────────────────────── */}
          <div className="hidden flex-col items-end gap-0.5 text-[11px] sm:flex">
            {prayerData?.jumua && (
              <span className="font-semibold text-brand-green">
                {isAr
                  ? `الجمعة\u00a0${prayerData.jumua}`
                  : `Jumu\u2019a\u00a0${prayerData.jumua}`}
              </span>
            )}
            <Link
              href="https://mawaqit.net/fr/m/alihsane-colomiers"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-green/70 underline-offset-2 hover:text-brand-green hover:underline dark:text-brand-green/80"
            >
              Mawaqit ↗
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
