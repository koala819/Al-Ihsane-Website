import { AwqatSalahApi } from '@xsor/awqat-salah-client'

export interface PrayerTimesData {
  times: string[] // [Fajr, Dhuhr, Asr, Maghrib, Isha]
  shuruq: string
  jumua: string | null
  date: string
}

export async function fetchPrayerTimes(
  _revalidateSeconds = 3600,
): Promise<PrayerTimesData | null> {
  try {
    const username = process.env.AWQAT_USERNAME?.trim()
    const password = process.env.AWQAT_PASSWORD?.trim()
    const cityIdRaw = process.env.AWQAT_CITY_ID?.trim()

    if (!username || !password || !cityIdRaw) return null

    const cityId = Number(cityIdRaw)
    if (!Number.isInteger(cityId) || cityId <= 0) return null

    const api = new AwqatSalahApi()
    await api.login(username, password)
    const prayerTimes = await api.dailyPrayerTime(cityId)
    if (!prayerTimes?.length) return null

    const todayIso = new Date().toISOString().slice(0, 10)
    const todayEntry =
      prayerTimes.find((p) => p.gregorianDateShortIso8601 === todayIso) ??
      prayerTimes[0]
    if (!todayEntry) return null

    const cleanTime = (value: string | undefined) =>
      (value ?? '').trim().slice(0, 5)

    const fajr = cleanTime(todayEntry.fajr)
    const dhuhr = cleanTime(todayEntry.dhuhr)
    const asr = cleanTime(todayEntry.asr)
    const maghrib = cleanTime(todayEntry.maghrib)
    const isha = cleanTime(todayEntry.isha)
    const sunrise = cleanTime(todayEntry.sunrise)

    if (!fajr || !dhuhr || !asr || !maghrib || !isha || !sunrise) return null

    return {
      times: [fajr, dhuhr, asr, maghrib, isha],
      shuruq: sunrise,
      // Awqat ne fournit pas l'horaire Jumu'a dans dailyPrayerTime.
      jumua: null,
      date: new Date().toISOString(),
    }
  } catch {
    return null
  }
}
