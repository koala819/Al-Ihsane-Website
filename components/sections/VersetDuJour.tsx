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

          {/* ── Carte récitant ── */}
          <div className="mx-auto mt-8 flex items-center gap-4 rounded-2xl border border-mosque-green/15 bg-white/70 px-5 py-4 text-left shadow-sm backdrop-blur-sm dark:border-white/8 dark:bg-white/[0.07] dark:ring-1 dark:ring-white/[0.07]">
            {/* Avatar */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={AVATAR_URL}
              alt="Abderrahmane Mesli"
              width={56}
              height={56}
              className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-mosque-green/25"
            />

            {/* Infos */}
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-mosque-green/70">
                {isAr ? 'تلاوات قرآنية' : 'Récitations coraniques'}
              </p>
              <p className="mt-0.5 font-semibold text-mosque-green">
                Abderrahmane Mesli
              </p>
              <p className="text-xs text-muted-foreground">
                {isAr ? 'أخ من مسجد الإحسان' : 'Frère de la mosquée Al Ihsane · Colomiers'}
              </p>
            </div>

            {/* CTA */}
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex shrink-0 items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-red-700 hover:shadow-md active:scale-95"
              aria-label="Voir la chaîne YouTube d'Abderrahmane Mesli"
            >
              <Youtube className="h-4 w-4" />
              <span className="hidden sm:inline">{isAr ? 'القناة' : 'Voir la chaîne'}</span>
            </a>
          </div>

        </div>
      </section>
    )
  } catch {
    return null
  }
}
