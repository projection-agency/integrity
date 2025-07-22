import { getPayloadInstance } from '../utils/payload'

export async function getPage(slug: string) {
  const payload = await getPayloadInstance()

  const page = await payload.find({ collection: 'pages', where: { slug: { equals: slug } } })

  return page
}

export async function getSinglePage(slug: string) {
  const pageResult = await getPage(slug)
  return pageResult.docs?.[0] || null
}
