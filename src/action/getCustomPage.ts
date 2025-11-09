import { getPayloadInstance } from '@/utils/payload'

export async function getCustomPage(
  slug: string,
  locale: 'en' | 'ua',
  fallbackLocale: 'en' | 'ua' = 'en'
) {
  const payload = await getPayloadInstance()
  if (!payload) return null  // <-- перевірка

  // пошук по поточній локалі
  const res = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    locale,
  })

  let page = res?.docs?.[0] || null

  // fallback якщо пусто
  if (!page && locale !== fallbackLocale) {
    const fallbackRes = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      locale: fallbackLocale,
    })
    page = fallbackRes?.docs?.[0] || null
  }

  return page
}
