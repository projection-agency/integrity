import React from 'react'
import styles from './LatestInsightsSection.module.css'
import TabSection from '@/components/ui/TabSection/TabSection'
import MainTitle from '@/components/ui/MainTitle/MainTitle'
import { getPostsWithFilter } from '@/action/getPostsWithFilter'
import ArticleItem from '@/components/ui/ArticleItem/ArticleItem'
import Image from 'next/image'

type LatestInsightsSection = {
  subtitle: string
  title: string
}

export default async function LatestInsightsSection({ block }: { block: LatestInsightsSection }) {
  const categoryId = 'all'
  const [filteredPosts] = await Promise.all([getPostsWithFilter(categoryId)])

  return (
    <section className={styles.latestInsightsSection}>
      <div className={styles.latestInsightsHeader}>
        <TabSection style="gray" text={block.subtitle} />
        <MainTitle title={block.title} />
      </div>
      <div className={styles.latestInsightsCards}>
        {filteredPosts.slice(0, 3).map((post, index) => (
          <ArticleItem key={post.id} post={post} idx={index} style="small" />
        ))}
      </div>
      <button className={styles.latestInsightsCta}>
        <Image
          src="/images/icons/revised-card2.svg"
          alt="revised card"
          className={styles.readMoreIcon}
          width={16}
          height={16}
        />
        See all Integrity posts
      </button>
    </section>
  )
}
