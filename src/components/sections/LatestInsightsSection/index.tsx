import React from 'react'
import LatestInsightsSection from './LatestInsightsSection'
import { getPostsWithFilter } from '@/action/getPostsWithFilter'
import type { Post as PayloadPost } from '@/payload-types'

type EnrichedPost = PayloadPost & {
  readingTime: string
  date: string
  imageUrl: string
  type: 'news' | 'article'
}

interface IndexProps {
  block: {
    subtitle: string
    title: string
  }
}

export default async function LatestInsightsSectionServer({ block }: IndexProps) {
  const fetched = await getPostsWithFilter('all')
  const enrichedPosts = fetched as EnrichedPost[]

  return <LatestInsightsSection block={block} filteredPosts={enrichedPosts} />
}
