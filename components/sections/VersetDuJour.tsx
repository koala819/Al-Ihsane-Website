import { HeadingBlock } from '@/components/molecules/HeadingBlock'
import { AlquranResponse } from '@/types/models'



function getDayOfYear(): number {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  return Math.floor((now.getTime() - start.getTime()) / 86400000)
}

export const VersetDuJour = async ({ locale }: { locale: string }) => {
  const isAr = locale === 'ar'
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
      : `Sourate ${arabic.surah.englishName} (${arabic.surah.number}:${arabic.numberInSurah})`

    return (
      <section className="bg-mosque-green-light py-14">
        <div className="mx-auto max-w-7xl px-4">
          <HeadingBlock title={isAr ? 'آية اليوم' : 'Verset du jour'} isRtl={isAr} />

          <div className="text-center">
            <p
              className="font-arabic text-2xl leading-loose text-mosque-green sm:text-3xl"
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

            <p className="mt-3 text-sm text-mosque-green/75">— {ref}</p>
          </div>
        </div>
      </section>
    )
  } catch {
    return null
  }
}
