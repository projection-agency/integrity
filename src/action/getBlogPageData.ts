import { getPayload } from 'payload'
import config from '@/payload.config'

export async function getBlogPageData(locale: string) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'blog' } },
    locale: locale as 'en',
  })

  return {
    page: docs[0],
  }
}
