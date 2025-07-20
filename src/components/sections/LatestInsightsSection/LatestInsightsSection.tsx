import React from 'react'
import styles from './LatestInsightsSection.module.css'
import TabSection from '@/components/ui/TabSection/TabSection'
import MainTitle from '@/components/ui/MainTitle/MainTitle'
import ArticleItem from '@/components/ui/ArticleItem/ArticleItem'
import Image from 'next/image'
import { getBlogData } from '@/action/getBlogData'
import Link from 'next/link'

type LatestInsightsSection = {
  subtitle: string
  title: string
}

export default async function LatestInsightsSection({ block }: { block: LatestInsightsSection }) {
  const { posts } = await getBlogData('en')

  return (
    <section className={styles.latestInsightsSection}>
      <div className={styles.latestInsightsHeader}>
        <TabSection style="gray" text={block.subtitle} />
        <MainTitle title={block.title} />
      </div>
      <div className={styles.latestInsightsCards}>
        {posts.slice(0, 3).map((post, idx) => (
          <ArticleItem key={idx} post={post} idx={idx} style="small" />
        ))}
      </div>
      <Link href="/blog" className={styles.latestInsightsCta}>
        <Image src="/images/icons/revised-card2.svg" alt="revised card" width={16} height={16} />
        See all Integrity posts
      </Link>
    </section>
  )
}
