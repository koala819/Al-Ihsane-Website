import { NextResponse } from 'next/server'

export interface PrayerTimesData {
  times: string[]   // [Fajr, Dhuhr, Asr, Maghrib, Isha]
  shuruq: string
  jumua: string | null
  date: string
}

export async function GET() {
  try {
    const res = await fetch('https://mawaqit.net/fr/alihsane-colomiers', {
      next: { revalidate: 3600 }, // revalider toutes les heures
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; AlIhsaneWebsite/1.0)',
      },
    })

    if (!res.ok) throw new Error(`Mawaqit returned ${res.status}`)

    const html = await res.text()

    // Extraire confData depuis le JS embarqué dans le HTML
    const match = html.match(/let confData\s*=\s*(\{[\s\S]*?\});/)
    if (!match) throw new Error('confData not found in HTML')

    const conf = JSON.parse(match[1]) as {
      times: string[]
      shuruq: string
      jumua: string | null
    }

    const data: PrayerTimesData = {
      times: conf.times,
      shuruq: conf.shuruq,
      jumua: conf.jumua,
      date: new Date().toISOString(),
    }

    return NextResponse.json(data)
  } catch (err) {
    console.error('[prayer-times]', err)
    return NextResponse.json({ error: 'unavailable' }, { status: 503 })
  }
}
