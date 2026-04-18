interface HadeethListItem {
  id: string
  title: string
}

interface HadeethListResponse {
  data: HadeethListItem[]
  meta: {
    current_page: string
    last_page: number
    total_items: number
    per_page: string
  }
}

interface HadeethOne {
  id: string
  title: string
  hadeeth: string
  hadeeth_ar: string
  attribution: string
  grade: string
}

function getDayOfYear(): number {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  return Math.floor((now.getTime() - start.getTime()) / 86400000)
}

export async function HadithDuJour({ locale }: { locale: string }) {
  const isAr = locale === 'ar'

  try {
    // Étape 1 : récupérer la liste avec 20 hadiths pour avoir le total
    const listRes = await fetch(
      'https://hadeethenc.com/api/v1/hadeeths/list/?language=fr&per_page=20&page=1',
      { next: { revalidate: 86400 } },
    )
    if (!listRes.ok) return null
    const listData: HadeethListResponse = await listRes.json()

    const totalItems = listData.meta.total_items
    const dayIndex = getDayOfYear() % Math.min(totalItems, 200)

    // Étape 2 : récupérer la page contenant le hadith du jour
    const targetPage = Math.floor(dayIndex / 20) + 1
    const targetIndex = dayIndex % 20

    let items = listData.data
    if (targetPage > 1) {
      const pageRes = await fetch(
        `https://hadeethenc.com/api/v1/hadeeths/list/?language=fr&per_page=20&page=${targetPage}`,
        { next: { revalidate: 86400 } },
      )
      if (!pageRes.ok) return null
      const pageData: HadeethListResponse = await pageRes.json()
      items = pageData.data
    }

    const hadithId = items[Math.min(targetIndex, items.length - 1)]?.id
    if (!hadithId) return null

    // Étape 3 : récupérer le hadith complet
    const hadithRes = await fetch(
      `https://hadeethenc.com/api/v1/hadeeths/one/?language=fr&id=${hadithId}`,
      { next: { revalidate: 86400 } },
    )
    if (!hadithRes.ok) return null
    const hadith: HadeethOne = await hadithRes.json()

    return (
      <section className="bg-mosque-green-light py-14">
        <div className="mx-auto max-w-7xl px-4">
          {/* Titre — même bloc que Actualités (News) */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-mosque-green md:text-3xl">
              {isAr ? 'حديث اليوم' : 'Hadith du jour'}
            </h2>
            <div className="mt-2 h-1 w-12 rounded-full bg-mosque-green/30" />
          </div>

          <div className="mx-auto max-w-3xl text-center">
          <p
            className="font-arabic text-xl leading-loose text-mosque-green sm:text-2xl"
            dir="rtl"
            lang="ar"
          >
            {hadith.hadeeth_ar}
          </p>

          {!isAr && (
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-foreground/85 italic">
              « {hadith.title} »
            </p>
          )}

          <p className="mt-3 text-sm text-muted-foreground">
            — {hadith.attribution} · {hadith.grade}
          </p>
          </div>
        </div>
      </section>
    )
  } catch {
    return null
  }
}
