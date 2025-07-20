import { getPayload } from 'payload'
import config from '@/payload.config'

export async function getHomeData(locale: string) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    locale: locale as 'en',
  })

  const page = docs[0]

  return {
    page,
  }
}
