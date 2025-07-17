import { getPayload } from 'payload'
import config from 'next/config'

export async function getPostsWithFilter(categoryId?: string) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig as any })

  const where: any = {}

  // Додаємо фільтр по категорії, якщо вона вказана
  if (categoryId && categoryId !== 'all') {
    where.categories = { in: [categoryId] }
  }

  const posts = await payload.find({
    collection: 'posts',
    where,
    sort: '-createdAt',
    limit: 100,
  })

  return posts.docs
}
