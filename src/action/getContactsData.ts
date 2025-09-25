import { getPayloadInstance } from '@/utils/payload'

export async function getContactsData(locale: string) {
  const payload = await getPayloadInstance()

  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'contacts' } },
    locale: locale as 'en' | 'ua',
  })

  const page = docs[0]
  const heroBlock = page.blocks?.find((block: any) => block.blockType === 'hero-contacts') as any

  return {
    heroBlock,
  }
}
