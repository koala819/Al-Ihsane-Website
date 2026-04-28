import { HeadingBlock } from '@/components/molecules/HeadingBlock'
import { getTranslations } from 'next-intl/server'
import { AlquranResponse } from '@/types/models'
import { getDayOfYear } from '@/lib/utils'

export const DayVerse = async ({ locale }: { locale: string }) => {
  const isAr = locale === 'ar'
  const t = await getTranslations({ locale, namespace: 'dayVerse' })
  const versetNumber = (getDayOfYear() % 6236) + 1

  try {
    const res = await fetch(
      `https://api.alquran.cloud/v1/ayah/${versetNumber}/editions/quran-uthmani,fr.hamidullah`,
      { next: { revalidate: 86400 } },
    )
    if (!res.ok) return null
    const json: AlquranResponse = await res.json()
    if (json.code !== 200) return null

    const [arabic, french] = json.data
    const ref = isAr
      ? `${arabic.surah.name} (${arabic.surah.number}:${arabic.numberInSurah})`
      : t('reference', {
          surah: arabic.surah.englishName,
          surahNumber: arabic.surah.number,
          ayahNumber: arabic.numberInSurah,
        })

    return (
      <section className="bg-brand-green-light py-14">
        <div className="mx-auto max-w-7xl px-4">
          <HeadingBlock title={t('title')} isRtl={isAr} />

          <div className="text-center">
            <p
              className="font-arabic text-2xl leading-loose text-brand-green sm:text-3xl"
              dir="rtl"
              lang="ar"
            >
              {arabic.text}
            </p>

            {!isAr && (
              <p className="mt-4 text-base leading-relaxed text-foreground/80 italic">
                « {french.text} »
              </p>
            )}

            <p className="mt-3 text-sm text-brand-green/75">— {ref}</p>
          </div>
        </div>
      </section>
    )
  } catch {
    return null
  }
}
