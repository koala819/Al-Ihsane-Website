export interface YoutubeVideo {
  id: string
  title: string
  url: string
  publishedAt: string
  thumbnail: string
}

export interface YoutubeChannelProfile {
  avatarUrl: string
}

const CHANNEL_HANDLE = '@abderrahmanemesli4217'
const CHANNEL_URL = `https://www.youtube.com/${CHANNEL_HANDLE}`
const CHANNEL_VIDEOS_URL = `${CHANNEL_URL}/videos`
const CHANNEL_ID = 'UCwnbh3GYKiiwTHdYrv3Vexg'
const FALLBACK_VIDEOS: YoutubeVideo[] = [
  {
    id: 'zzVHftNkqwk',
    title: 'سورة سبأ تلاوة وراحة نفسية',
    url: 'https://www.youtube.com/watch?v=zzVHftNkqwk',
    publishedAt: '2026-04-13T20:32:04+00:00',
    thumbnail: 'https://i.ytimg.com/vi/zzVHftNkqwk/hqdefault.jpg',
  },
  {
    id: 'WhhHKyJL7xU',
    title: 'سورة فاطر تريح القلب',
    url: 'https://www.youtube.com/watch?v=WhhHKyJL7xU',
    publishedAt: '2026-04-09T20:19:09+00:00',
    thumbnail: 'https://i.ytimg.com/vi/WhhHKyJL7xU/hqdefault.jpg',
  },
  {
    id: '1oYjnS_PU98',
    title: 'سورة يس برواية ورش عن نافع',
    url: 'https://www.youtube.com/watch?v=1oYjnS_PU98',
    publishedAt: '2026-03-23T19:35:49+00:00',
    thumbnail: 'https://i.ytimg.com/vi/1oYjnS_PU98/hqdefault.jpg',
  },
]

function extractTag(block: string, tag: string): string | null {
  const match = block.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`))
  return match?.[1]?.trim() ?? null
}

function decodeXml(text: string): string {
  return text
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
}

async function fetchYoutubeChannelId(): Promise<string | null> {
  try {
    const res = await fetch(CHANNEL_URL, {
      next: { revalidate: 86400 },
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; AlIhsaneWebsite/1.0)',
      },
    })
    if (!res.ok) return null

    const html = await res.text()
    const channelIdMatch = html.match(/"channelId":"(UC[\w-]+)"/)
    return channelIdMatch?.[1] ?? null
  } catch {
    return null
  }
}

export async function fetchYoutubeChannelProfile(): Promise<YoutubeChannelProfile | null> {
  try {
    const res = await fetch(CHANNEL_URL, {
      next: { revalidate: 21600 },
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; AlIhsaneWebsite/1.0)',
      },
    })
    if (!res.ok) return null

    const html = await res.text()
    const avatarBlock = html.match(/"avatar"\s*:\s*\{\s*"thumbnails"\s*:\s*\[(.*?)\]\s*\}/)
    if (!avatarBlock) return null

    const urls = Array.from(
      avatarBlock[1].matchAll(/"url"\s*:\s*"([^"]+)"/g),
      (match) => match[1].replaceAll('\\u0026', '&').replaceAll('\\/', '/'),
    )

    if (urls.length === 0) return null

    return { avatarUrl: urls[0] }
  } catch {
    return null
  }
}

export async function fetchLatestYoutubeVideos(limit = 3): Promise<YoutubeVideo[]> {
  try {
    // ID fixe pour fiabiliser la récupération du flux (plus robuste que le parsing du handle).
    const channelId = CHANNEL_ID || (await fetchYoutubeChannelId())
    if (!channelId) return []

    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      {
        next: { revalidate: 21600 },
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; AlIhsaneWebsite/1.0)',
        },
      },
    )
    if (res.ok) {
      const xml = await res.text()
      const entries = Array.from(xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g))

      const feedVideos = entries
        .map((entry) => entry[1])
        .map((block) => {
          const id = extractTag(block, 'yt:videoId')
          const title = extractTag(block, 'title')
          const publishedAt = extractTag(block, 'published')
          if (!id || !title || !publishedAt) return null

          return {
            id,
            title: decodeXml(title),
            url: `https://www.youtube.com/watch?v=${id}`,
            publishedAt,
            thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
          } satisfies YoutubeVideo
        })
        .filter((video): video is YoutubeVideo => video !== null)
        .slice(0, limit)

      if (feedVideos.length > 0) return feedVideos
    }

    // Fallback robuste: extraction des IDs depuis la page /videos de la chaîne.
    const channelRes = await fetch(CHANNEL_VIDEOS_URL, {
      next: { revalidate: 21600 },
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; AlIhsaneWebsite/1.0)',
      },
    })
    if (!channelRes.ok) return FALLBACK_VIDEOS.slice(0, limit)

    const html = await channelRes.text()
    const ids = Array.from(
      new Set(Array.from(html.matchAll(/"videoId":"([a-zA-Z0-9_-]{11})"/g), (m) => m[1])),
    ).slice(0, limit)

    const scrapedVideos = ids.map((id) => ({
      id,
      title: 'Recitation video',
      url: `https://www.youtube.com/watch?v=${id}`,
      publishedAt: new Date().toISOString(),
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    }))
    return scrapedVideos.length > 0 ? scrapedVideos : FALLBACK_VIDEOS.slice(0, limit)
  } catch {
    return FALLBACK_VIDEOS.slice(0, limit)
  }
}
