import { getPayload } from 'payload'
import config from '@/payload.config'

export async function getBlogData(locale: string) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'posts',
    locale: locale as 'en',
  })

  return {
    posts: docs,
  }
}
