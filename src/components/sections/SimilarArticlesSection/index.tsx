import React from 'react'
import SimilarArticlesSection from './SimilarArticlesSection'
import { getPostsWithFilter } from '@/action/getPostsWithFilter'
import type { Post as PayloadPost } from '@/payload-types'

export type EnrichedPost = PayloadPost & {
  readingTime: string
  date: string
  imageUrl: string
  type: 'news' | 'article'
}

export default async function SimilarArticlesSectionServer() {
  const fetched = await getPostsWithFilter('all')
  const enrichedPosts = fetched as EnrichedPost[]

  return <SimilarArticlesSection posts={enrichedPosts} />
}
