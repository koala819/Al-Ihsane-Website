export interface PrayerTimesData {
  times: string[] // [Fajr, Dhuhr, Asr, Maghrib, Isha]
  shuruq: string
  jumua: string | null
  date: string
}

export async function fetchPrayerTimes(
  revalidateSeconds = 3600,
): Promise<PrayerTimesData | null> {
  try {
    const res = await fetch('https://mawaqit.net/fr/alihsane-colomiers', {
      next: { revalidate: revalidateSeconds },
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; AlIhsaneWebsite/1.0)',
      },
    })

    if (!res.ok) return null

    const html = await res.text()
    const match = html.match(/let confData\s*=\s*(\{[\s\S]*?\});/)
    if (!match) return null

    const conf = JSON.parse(match[1]) as {
      times: string[]
      shuruq: string
      jumua: string | null
    }

    return {
      times: conf.times,
      shuruq: conf.shuruq,
      jumua: conf.jumua,
      date: new Date().toISOString(),
    }
  } catch {
    return null
  }
}
