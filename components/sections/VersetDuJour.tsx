import { BookOpen, Youtube } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

interface AlquranAyah {
  number: number
  text: string
  numberInSurah: number
  surah: {
    number: number
    name: string
    englishName: string
    englishNameTranslation: string
  }
}

interface AlquranResponse {
  code: number
  data: [AlquranAyah, AlquranAyah] // [arabic, french]
}

function getDayOfYear(): number {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  return Math.floor((now.getTime() - start.getTime()) / 86400000)
}

const YOUTUBE_URL = 'https://youtube.com/@abderrahmanemesli4217'
const AVATAR_URL  = 'https://unavatar.io/youtube/abderrahmanemesli4217'

export async function VersetDuJour({ locale }: { locale: string }) {
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
      <section className="bg-mosque-green-light py-12">
        <div className="mx-auto max-w-3xl px-4 text-center">

          {/* ── Label ── */}
          <div className="mb-5 flex items-center justify-center gap-2">
            <Separator className="max-w-12 bg-mosque-green/25" />
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-mosque-green/75">
              <BookOpen className="h-3.5 w-3.5" />
              {isAr ? 'آية اليوم' : 'Verset du jour'}
            </span>
            <Separator className="max-w-12 bg-mosque-green/25" />
          </div>

          {/* ── Texte arabe ── */}
          <p
            className="font-arabic text-2xl leading-loose text-mosque-green sm:text-3xl"
            dir="rtl"
            lang="ar"
          >
            {arabic.text}
          </p>

          {/* ── Traduction française ── */}
          {!isAr && (
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-foreground/80 italic">
              « {french.text} »
            </p>
          )}

          <p className="mt-3 text-sm text-mosque-green/75">— {ref}</p>

        </div>
      </section>
    )
  } catch {
    return null
  }
}
