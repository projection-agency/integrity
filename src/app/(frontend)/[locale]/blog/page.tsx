import { getPayload } from 'payload'
import config from '@/payload.config'

import { getCategories } from '@/action/getCategories'
import { getPostsWithFilter } from '@/action/getPostsWithFilter'
import BlogPosts from '@/components/sections/BlogSection/BlogSection'
import s from './page.module.css'
import FillForm from '@/components/FillForm/FillForm'

export default async function BlogPage({
  searchParams,
  params,
}: {
  searchParams: { category?: string }
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'blog' } },
    locale: locale as 'en',
  })
  const categoryId = searchParams.category || 'all'

  const [categories, posts] = await Promise.all([getCategories(), getPostsWithFilter(categoryId)])

  return (
    <div className={s.blog}>
      <div className={s.heroPage}>
        <div className={s.subtitle}>
          <span>{docs[0].title}</span>
        </div>
        <h1>{docs[0].description}</h1>
      </div>
      <BlogPosts posts={posts} categories={categories} />

      <div className={s.fillFormWrapper}>
        <FillForm />
      </div>
    </div>
  )
}
