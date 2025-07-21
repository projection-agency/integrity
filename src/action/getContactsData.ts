import { getPayload } from 'payload'
import config from '@/payload.config'

export async function getContactsData() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'contacts' } },
    locale: 'en',
  })

  const page = docs[0]
  const heroBlock = page.blocks?.find((block: any) => block.blockType === 'hero-contacts') as any

  return {
    heroBlock,
  }
}
