import { getPayload } from 'payload'
import payloadConfig from '@/payload.config' // 🔧 правильний конфіг

export async function getPostsWithSlug(slug?: string, locale?: string) {
  if (!slug || !locale) {
    return null
  }

  const payload = await getPayload({
    config: payloadConfig,
    secret: process.env.PAYLOAD_SECRET!,
  } as any)

  const posts = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    locale: locale as 'en',
  })

  return posts.docs
}
