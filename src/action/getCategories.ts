import { getPayload } from 'payload'
import config from 'next/config'

export async function getCategories() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig as any })

  // Отримуємо всі категорії
  const categories = await payload.find({
    collection: 'categories' as any,
    limit: 100,
  })

  // Отримуємо всі пости для підрахунку
  const posts = await payload.find({
    collection: 'posts',
    limit: 1000,
  })

  // Підраховуємо кількість постів для кожної категорії
  const categoriesWithCount = categories.docs.map((category: any) => {
    const count = posts.docs.filter(
      (post: any) => post.categories && post.categories.some((cat: any) => cat.id === category.id),
    ).length

    return {
      id: category.id,
      name: category.title || 'Uncategorized',
      count,
    }
  })

  // Фільтруємо категорії, які мають записи (count > 0)
  const categoriesWithPosts = categoriesWithCount.filter((category) => category.count > 0)

  // Додаємо "All" категорію
  const allCategory = {
    id: 'all',
    name: 'All',
    count: posts.docs.length,
  }

  return [allCategory, ...categoriesWithPosts]
}
