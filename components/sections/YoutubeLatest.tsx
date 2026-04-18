import { PlayCircle, Youtube } from 'lucide-react'

import { fetchLatestYoutubeVideos, fetchYoutubeChannelProfile } from '@/lib/server/youtube'
import Image from 'next/image'

const YOUTUBE_URL = 'https://youtube.com/@abderrahmanemesli4217'
const CHANNEL_NAME = 'Abderrahmane Mesli'
const FALLBACK_AVATAR_URL = 'https://unavatar.io/youtube/abderrahmanemesli4217'

export async function YoutubeLatest({ locale }: { locale: string }) {
  const isAr = locale === 'ar'
  const [videos, channelProfile] = await Promise.all([
    fetchLatestYoutubeVideos(3),
    fetchYoutubeChannelProfile(),
  ])
  const avatarUrl = channelProfile?.avatarUrl ?? FALLBACK_AVATAR_URL
  if (videos.length === 0) {
    return (
      <section className="bg-background py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-mosque-green md:text-3xl">
              {isAr ? 'تلاوات القرآن' : 'Récitations du Coran'}
            </h2>
            <div className="mt-2 h-1 w-12 rounded-full bg-mosque-green/30" />
          </div>
          <div className="rounded-2xl border border-mosque-green/15 bg-mosque-green-light/50 p-6 text-center shadow-sm">
            <p className="text-sm text-mosque-green/80">
              {isAr ? 'تابع أحدث التلاوات على يوتيوب.' : 'Retrouvez les dernières récitations sur YouTube.'}
            </p>
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-mosque-gold px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-mosque-gold-hover"
            >
              <Youtube className="h-4 w-4" />
              {isAr ? 'فتح القناة' : 'Ouvrir la chaîne'}
            </a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-background py-14">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-mosque-green md:text-3xl">
            {isAr ? 'تلاوات القرآن' : 'Récitations du Coran'}
          </h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-mosque-green/30" />
          <p className="mt-3 text-sm font-medium text-mosque-green md:text-base">
            {isAr ? 'القارئ عبد الرحمن مسلي' : 'Par le Qari Abdurrahman Masli'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => {
            const published = new Date(video.publishedAt).toLocaleDateString(isAr ? 'ar-DZ' : 'fr-FR', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })

            return (
              <a
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-xl transition-opacity hover:opacity-95"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    loading="lazy"
                    width={360}
                    height={202}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <PlayCircle className="absolute bottom-2 right-2 h-8 w-8 text-white/95 drop-shadow-sm" />
                </div>

                <div className="flex gap-3 px-1 pb-1 pt-3">
                  <Image
                    src={avatarUrl}
                    alt={CHANNEL_NAME}
                    width={36}
                    height={36}
                    className="mt-0.5 h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-mosque-green/15"
                  />
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-[15px] font-semibold leading-snug text-mosque-green">
                      {video.title}
                    </p>
                    {/* <p className="mt-1 text-xs text-mosque-green/70">{CHANNEL_NAME}</p> */}
                    <p className="text-xs text-mosque-green/60">
                      {isAr ? `نُشر في ${published}` : `Publié le ${published}`}
                    </p>
                  </div>
                </div>
              </a>
            )
          })}
        </div>

        <a
          href={YOUTUBE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-1.5 rounded-xl border border-mosque-green/20 px-4 py-2 text-sm font-semibold text-white shadow-md transition-colors bg-mosque-gold  hover:bg-mosque-gold-hover hover:shadow-md active:scale-95"
        >
          <Youtube className="h-4 w-4" />
          <span className="hidden sm:inline">{isAr ? 'القناة' : 'Voir la chaîne'}</span>
        </a>
      </div>
    </section>
  )
}
