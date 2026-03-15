import Link from 'next/link'

const PRAYERS = [
  { key: 'fajr',    label: 'Fajr',    labelAr: 'الفجر',   idx: 0 },
  { key: 'shuruq',  label: 'Chourouk', labelAr: 'الشروق',  idx: -1 },
  { key: 'dhuhr',   label: 'Dhuhr',   labelAr: 'الظهر',   idx: 1 },
  { key: 'asr',     label: 'Asr',     labelAr: 'العصر',   idx: 2 },
  { key: 'maghrib', label: 'Maghrib', labelAr: 'المغرب',  idx: 3 },
  { key: 'isha',    label: 'Isha',    labelAr: 'العشاء',  idx: 4 },
]

interface PrayerTimesData {
  times: string[]
  shuruq: string
  jumua: string | null
}

async function fetchPrayerTimes(): Promise<PrayerTimesData | null> {
  try {
    const res = await fetch('https://mawaqit.net/fr/alihsane-colomiers', {
      next: { revalidate: 3600 },
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; AlIhsaneWebsite/1.0)' },
    })
    if (!res.ok) return null
    const html = await res.text()
    const match = html.match(/let confData\s*=\s*(\{[\s\S]*?\});/)
    if (!match) return null
    const conf = JSON.parse(match[1])
    return { times: conf.times, shuruq: conf.shuruq, jumua: conf.jumua }
  } catch {
    return null
  }
}

export async function PrayerTimes({ locale }: { locale: string }) {
  const data = await fetchPrayerTimes()
  const isAr = locale === 'ar'

  const getTime = (idx: number, d: PrayerTimesData) =>
    idx === -1 ? d.shuruq : d.times[idx]

  // Détecter la prochaine prière
  const now = new Date()
  const nowMin = now.getHours() * 60 + now.getMinutes()
  let nextIdx = -1
  if (data) {
    const prayerMins = data.times.map((t) => {
      const [h, m] = t.split(':').map(Number)
      return h * 60 + m
    })
    nextIdx = prayerMins.findIndex((m) => m > nowMin)
  }
  // nextIdx dans times[] : 0=Fajr,1=Dhuhr,2=Asr,3=Maghrib,4=Isha
  // Dans PRAYERS, shuruq est idx -1, donc les vraies prières ont idx 0,1,2,3,4
  // On mappe : nextIdx 0→prayerKey fajr, 1→dhuhr, etc.
  const nextPrayerKey = nextIdx >= 0 ? PRAYERS.filter(p => p.idx >= 0)[nextIdx]?.key : null

  if (!data) {
    return (
      <div className="bg-mosque-green/5 border-b border-mosque-green/10 py-2 text-center text-xs text-muted-foreground">
        <Link href="https://mawaqit.net/fr/m/alihsane-colomiers" target="_blank" rel="noopener noreferrer" className="hover:underline">
          Horaires de prière sur Mawaqit ↗
        </Link>
      </div>
    )
  }

  return (
    <div className="border-b border-mosque-green/15 bg-mosque-green-light">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between py-1.5 sm:py-2">
          {/* Prières */}
          <div className="flex flex-1 items-center justify-around gap-1 overflow-x-auto sm:gap-3">
            {PRAYERS.map(({ key, label, labelAr, idx }) => {
              const time = getTime(idx, data)
              const isNext = key === nextPrayerKey
              return (
                <div
                  key={key}
                  className={[
                    'flex min-w-[52px] flex-col items-center rounded-lg px-2 py-1 transition-colors sm:min-w-[60px]',
                    isNext
                      ? 'bg-mosque-green text-white'
                      : 'text-mosque-green',
                  ].join(' ')}
                >
                  <span className={[
                    'text-[10px] font-medium uppercase tracking-wide',
                    isNext ? 'opacity-90' : 'opacity-60',
                  ].join(' ')}>
                    {isAr ? labelAr : label}
                  </span>
                  <span className="text-sm font-bold tabular-nums sm:text-base">
                    {time}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Lien Mawaqit */}
          <Link
            href="https://mawaqit.net/fr/m/alihsane-colomiers"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 hidden shrink-0 text-[10px] text-mosque-green/50 hover:text-mosque-green hover:underline sm:block"
          >
            Mawaqit ↗
          </Link>
        </div>
      </div>
    </div>
  )
}
