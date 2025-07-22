import React from 'react'
import { getBlogPageData } from '@/action/getBlogPageData'
import { getCategories } from '@/action/getCategories'
import { getPostsWithFilter } from '@/action/getPostsWithFilter'
import BlogPosts from '@/components/sections/BlogSection/BlogSection'
import s from './page.module.css'
import GridBackground from '@/components/GridBackground/GridBackground'
import ExpertSection from '@/components/sections/ExpertSection/ExpertSection'
import { getSinglePage } from '@/action/getPage'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSinglePage('blog')

  return {
    title: page?.meta?.title || 'Blog',
    description: page?.meta?.description || '',
    openGraph: {
      title: page?.meta?.title || 'Blog',
      description: page?.meta?.description || '',
    },
  }
}

export default async function BlogPage({
  searchParams,
  params,
}: {
  searchParams: Promise<{ category?: string }>
  params: Promise<{ locale: string }>
}) {
  const [{ locale }, { category }] = await Promise.all([params, searchParams])
  const { page } = await getBlogPageData(locale)

  const categoryId = category || 'all'

  const [categories, filteredPosts] = await Promise.all([
    getCategories(),
    getPostsWithFilter(categoryId),
  ])

  return (
    <div className={s.blog}>
      <div className={s.heroPage}>
        <div className={s.subtitle}>
          <span>{page?.title || 'Blog'}</span>
        </div>
        <h1>{page?.description || 'Latest Insights'}</h1>
        <GridBackground />
      </div>
      <BlogPosts posts={filteredPosts} categories={categories} />

      <div className={s.fillFormWrapper}>
        <ExpertSection />
      </div>
    </div>
  )
}
