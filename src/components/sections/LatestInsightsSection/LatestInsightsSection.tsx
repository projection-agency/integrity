'use client'

import React, { useState, useRef, useEffect } from 'react'
import styles from './LatestInsightsSection.module.css'
import TabSection from '@/components/ui/TabSection/TabSection'
import MainTitle from '@/components/ui/MainTitle/MainTitle'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import type SwiperType from 'swiper'
import 'swiper/css'
import useIsMobile from './useIsMobile'
import ArticleItem from '@/components/ui/ArticleItem/ArticleItem'

import type { Post as PayloadPost } from '@/payload-types'
import SliderNav from './SliderNav'
import useHasMounted from './useHasMounted'
import Link from 'next/link'

type Post = PayloadPost & {
  readingTime: string
  date: string
  imageUrl: string
  type: 'news' | 'article'
}

interface Props {
  block: {
    subtitle: string
    title: string
  }
  filteredPosts: Post[]
}

export default function LatestInsightsSection({ block, filteredPosts }: Props) {
  const hasMounted = useHasMounted()
  const isMobile = useIsMobile()
  const visiblePosts = filteredPosts.slice(0, 3)

  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)

  useEffect(() => {
    setActiveIndex(0)
    swiperRef.current?.slideTo(0)
  }, [filteredPosts])

  if (!hasMounted) return null

  return (
    <section className={styles.latestInsightsSection}>
      <div className={styles.latestInsightsHeader}>
        <TabSection style="gray" text={block.subtitle} />
        <MainTitle title={block.title} />
      </div>

      {isMobile ? (
        <>
          <Swiper
            slidesPerView="auto"
            spaceBetween={11}
            className={styles.swiper}
            onSwiper={(sw) => (swiperRef.current = sw)}
            onSlideChange={(sw) => setActiveIndex(sw.activeIndex)}
          >
            {visiblePosts.map((post, idx) => (
              <SwiperSlide key={post.id} style={{ width: '85vw', flexShrink: 0 }}>
                <ArticleItem post={post} idx={idx} style="small" />
              </SwiperSlide>
            ))}
          </Swiper>

          <SliderNav
            activeIndex={activeIndex}
            dots={visiblePosts.length}
            onPrev={() => swiperRef.current?.slidePrev()}
            onNext={() => swiperRef.current?.slideNext()}
            onDotClick={(i) => swiperRef.current?.slideTo(i)}
          />
          <Link href="/blog" className={styles.latestInsightsCta}>
            <Image src="/images/icons/revised-card2.svg" alt="arrow icon" width={16} height={16} />
            See all Integrity posts
          </Link>
        </>
      ) : (
        <div className={styles.latestInsightsCards}>
          {visiblePosts.map((post, idx) => (
            <ArticleItem key={post.id} post={post} idx={idx} style="small" />
          ))}
        </div>
      )}

      {!isMobile && (
        <Link href="/blog" className={styles.latestInsightsCta}>
          <Image src="/images/icons/revised-card2.svg" alt="arrow icon" width={16} height={16} />
          <span className={styles.latestText}>See all Integrity posts</span>
        </Link>
      )}
    </section>
  )
}
