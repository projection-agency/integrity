import { getPayloadInstance } from '../utils/payload'
import { unstable_cache } from 'next/cache'

export async function getPage(slug: string) {
  const cached = unstable_cache(
    async (s: string) => {
      const payload = await getPayloadInstance()
      const page = await payload.find({
        collection: 'pages',
        where: { slug: { equals: s } },
      })
      return page
    },
    ['page-by-slug', slug],
    { revalidate: 300, tags: ['page', `page-${slug}`] },
  )

  return cached(slug)
}

export async function getSinglePage(slug: string) {
  const pageResult = await getPage(slug)
  return pageResult.docs?.[0] || null
}
