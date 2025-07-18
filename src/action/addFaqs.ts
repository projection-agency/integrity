import { getPayload } from 'payload'
import config from 'next/config'

export async function addFaqs(locale: string) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig as any })

  const faqs = await payload.find({
    collection: 'faq',
    locale: locale as 'en',
  })

  return faqs
}
