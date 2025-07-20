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
        {posts.map((post, idx) => (
          <div className={styles.insightCard} key={idx}>
            <img className={styles.insightCardImage} src={post.image} alt={post.title} />
            <div className={styles.insightCardBadge}>{post.badge}</div>

            <div className={styles.insightCardBlok}>
              <div className={styles.insightCardMeta}>
                <div className={styles.insightCardMetaItem}>
                  <img
                    src="/images/icons/revised-card.svg"
                    alt="revised card"
                    style={{ width: '1vw', height: '1vw', marginRight: '0.3vw' }}
                  />
                  {post.reading}
                </div>
                <div className={styles.insightCardMetaItem}>
                  <img
                    src="/images/icons/calendar.svg"
                    alt="calendar"
                    style={{ width: '1vw', height: '1vw', marginRight: '0.3vw' }}
                  />
                  {post.date}
                </div>
              </div>
              <div className={styles.insightCardTitle}>{post.title}</div>
              <div className={styles.insightCardExcerpt}>{post.excerpt}</div>
            </div>

            <button className={styles.insightCardBtn}>
              <img
                src="/images/icons/revised-card2.svg"
                alt="revised card"
                className={styles.readMoreIcon}
              />
              <span className={styles.readMoreText}>Read more</span>
            </button>
          </div>
            //---------main-------//
//         {posts.slice(0, 3).map((post, idx) => (
//           <ArticleItem key={idx} post={post} idx={idx} style="small" />
             //---------main-------//
        ))}
      </div>
      <Link href="/blog" className={styles.latestInsightsCta}>
        <Image src="/images/icons/revised-card2.svg" alt="revised card" width={16} height={16} />
        See all Integrity posts
      </Link>
    </section>
  )
}
