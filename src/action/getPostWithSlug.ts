import { getPayload } from 'payload'
import config from 'next/config'

export async function getPostsWithSlug(slug?: string, locale?: string) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig as any })

  if (!slug || !locale) {
    return null
  }

  const posts = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    locale: locale as 'en',
  })

  return posts.docs
}
