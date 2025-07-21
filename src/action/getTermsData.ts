import { getPayload } from 'payload'
import config from '@/payload.config'

export async function getTermsData({ params }: { params: Promise<{ locale: string }> }) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { locale } = await params

  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'terms-of-use' } },
    locale: locale as 'en',
  })

  const page = docs[0]
  const accordionBlock = page.blocks?.find(
    (block: any) => block.blockType === 'accordion-block',
  ) as any

  return {
    accordionBlock,
    data: page,
  }
}
