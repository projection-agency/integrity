import { getPayloadInstance } from '../utils/payload'
import { unstable_cache } from 'next/cache'

export async function getPage(slug: string, locale: string) {
  const cached = unstable_cache(
    async (s: string, loc: string) => {
      const payload = await getPayloadInstance()
      const page = await payload.find({
        collection: 'pages',
        where: { slug: { equals: s } },
        locale: loc as 'en' | 'ua',
      })
      return page
    },
    ['page-by-slug', slug, locale],
    { revalidate: 300, tags: ['page', `page-${slug}`, `page-${locale}`, `page-${slug}-${locale}`] },
  )

  return cached(slug, locale)
}

export async function getSinglePage(slug: string, locale: string) {
  const pageResult = await getPage(slug, locale)
  return pageResult.docs?.[0] || null
}
