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
import { RevisedСard } from '@/components/Icon/Icon'

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
  const [isHovered, setIsHovered] = useState(false)

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
          <Link
            href="/blog"
            className={`${styles.latestInsightsCta} ${isHovered ? styles.hovered : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
          >
            <svg
              width="17"
              height="19"
              viewBox="0 0 17 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.icon}
            >
              <path
                d="M7.05339 17.7969C7.05339 18.1852 6.7413 18.5 6.35622 18.5H3.28868C1.75096 18.5 0.5 17.2384 0.5 15.6875V3.3125C0.5 1.76164 1.75096 0.5 3.28868 0.5H11.86C13.3976 0.5 14.6487 1.76164 14.6487 3.3125V10.0273C14.6487 10.4157 14.3365 10.7305 13.9516 10.7305C13.5665 10.7305 13.2544 10.4157 13.2544 10.0273V3.3125C13.2544 2.53714 12.6288 1.90625 11.86 1.90625H3.28868C2.51988 1.90625 1.89434 2.53714 1.89434 3.3125V15.6875C1.89434 16.4629 2.51988 17.0938 3.28868 17.0938H6.35622C6.7413 17.0938 7.05339 17.4085 7.05339 17.7969ZM11.1629 4.71875H3.98203C3.59696 4.71875 3.28486 5.03351 3.28486 5.42188C3.28486 5.81024 3.59696 6.125 3.98203 6.125H11.1629C11.5478 6.125 11.86 5.81024 11.86 5.42188C11.86 5.03351 11.5478 4.71875 11.1629 4.71875ZM11.86 8.23438C11.86 7.84601 11.5478 7.53125 11.1629 7.53125H3.98203C3.59696 7.53125 3.28486 7.84601 3.28486 8.23438C3.28486 8.62274 3.59696 8.9375 3.98203 8.9375H11.1629C11.5478 8.9375 11.86 8.62274 11.86 8.23438ZM3.98203 10.3438C3.59696 10.3438 3.28486 10.6585 3.28486 11.0469C3.28486 11.4352 3.59696 11.75 3.98203 11.75H7.64598C8.03106 11.75 8.34315 11.4352 8.34315 11.0469C8.34315 10.6585 8.03106 10.3438 7.64598 10.3438H3.98203ZM16.3733 15.494C16.3488 15.5293 16.2647 15.6492 16.2126 15.7155C15.9791 16.0117 15.4325 16.7051 14.672 17.3172C13.6969 18.102 12.6935 18.5 11.6896 18.5C10.6856 18.5 9.68221 18.102 8.70713 17.3172C7.94664 16.7051 7.40007 16.0116 7.16668 15.7155C7.11439 15.6492 7.03038 15.5292 7.00587 15.494C6.83689 15.2515 6.83689 14.9281 7.00587 14.6855C7.03038 14.6504 7.11439 14.5304 7.16668 14.464C7.40007 14.168 7.94664 13.4746 8.70713 12.8625C9.68221 12.0777 10.6856 11.6797 11.6896 11.6797C12.6935 11.6797 13.6969 12.0777 14.672 12.8625C15.4325 13.4746 15.9791 14.1681 16.2125 14.4642C16.2647 14.5305 16.3488 14.6505 16.3733 14.6857C16.5422 14.9282 16.5422 15.2515 16.3733 15.494ZM14.919 15.0898C13.8105 13.7598 12.7251 13.0859 11.6896 13.0859C10.6542 13.0859 9.56865 13.7597 8.46012 15.0898C9.56865 16.4199 10.654 17.0938 11.6896 17.0938C12.7251 17.0938 13.8105 16.42 14.919 15.0898ZM11.7244 13.7539C10.9928 13.7539 10.3998 14.352 10.3998 15.0898C10.3998 15.8277 10.9928 16.4258 11.7244 16.4258C12.456 16.4258 13.049 15.8277 13.049 15.0898C13.049 14.352 12.456 13.7539 11.7244 13.7539Z"
                fill="currentColor"
                className={styles.iconPath}
              />
            </svg>
            <span className={styles.latestText}>See all Integrity posts</span>
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
        <Link
          href="/blog"
          className={`${styles.latestInsightsCta} ${isHovered ? styles.hovered : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <svg
            width="17"
            height="19"
            viewBox="0 0 17 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.icon}
          >
            <path
              d="M7.05339 17.7969C7.05339 18.1852 6.7413 18.5 6.35622 18.5H3.28868C1.75096 18.5 0.5 17.2384 0.5 15.6875V3.3125C0.5 1.76164 1.75096 0.5 3.28868 0.5H11.86C13.3976 0.5 14.6487 1.76164 14.6487 3.3125V10.0273C14.6487 10.4157 14.3365 10.7305 13.9516 10.7305C13.5665 10.7305 13.2544 10.4157 13.2544 10.0273V3.3125C13.2544 2.53714 12.6288 1.90625 11.86 1.90625H3.28868C2.51988 1.90625 1.89434 2.53714 1.89434 3.3125V15.6875C1.89434 16.4629 2.51988 17.0938 3.28868 17.0938H6.35622C6.7413 17.0938 7.05339 17.4085 7.05339 17.7969ZM11.1629 4.71875H3.98203C3.59696 4.71875 3.28486 5.03351 3.28486 5.42188C3.28486 5.81024 3.59696 6.125 3.98203 6.125H11.1629C11.5478 6.125 11.86 5.81024 11.86 5.42188C11.86 5.03351 11.5478 4.71875 11.1629 4.71875ZM11.86 8.23438C11.86 7.84601 11.5478 7.53125 11.1629 7.53125H3.98203C3.59696 7.53125 3.28486 7.84601 3.28486 8.23438C3.28486 8.62274 3.59696 8.9375 3.98203 8.9375H11.1629C11.5478 8.9375 11.86 8.62274 11.86 8.23438ZM3.98203 10.3438C3.59696 10.3438 3.28486 10.6585 3.28486 11.0469C3.28486 11.4352 3.59696 11.75 3.98203 11.75H7.64598C8.03106 11.75 8.34315 11.4352 8.34315 11.0469C8.34315 10.6585 8.03106 10.3438 7.64598 10.3438H3.98203ZM16.3733 15.494C16.3488 15.5293 16.2647 15.6492 16.2126 15.7155C15.9791 16.0117 15.4325 16.7051 14.672 17.3172C13.6969 18.102 12.6935 18.5 11.6896 18.5C10.6856 18.5 9.68221 18.102 8.70713 17.3172C7.94664 16.7051 7.40007 16.0116 7.16668 15.7155C7.11439 15.6492 7.03038 15.5292 7.00587 15.494C6.83689 15.2515 6.83689 14.9281 7.00587 14.6855C7.03038 14.6504 7.11439 14.5304 7.16668 14.464C7.40007 14.168 7.94664 13.4746 8.70713 12.8625C9.68221 12.0777 10.6856 11.6797 11.6896 11.6797C12.6935 11.6797 13.6969 12.0777 14.672 12.8625C15.4325 13.4746 15.9791 14.1681 16.2125 14.4642C16.2647 14.5305 16.3488 14.6505 16.3733 14.6857C16.5422 14.9282 16.5422 15.2515 16.3733 15.494ZM14.919 15.0898C13.8105 13.7598 12.7251 13.0859 11.6896 13.0859C10.6542 13.0859 9.56865 13.7597 8.46012 15.0898C9.56865 16.4199 10.654 17.0938 11.6896 17.0938C12.7251 17.0938 13.8105 16.42 14.919 15.0898ZM11.7244 13.7539C10.9928 13.7539 10.3998 14.352 10.3998 15.0898C10.3998 15.8277 10.9928 16.4258 11.7244 16.4258C12.456 16.4258 13.049 15.8277 13.049 15.0898C13.049 14.352 12.456 13.7539 11.7244 13.7539Z"
              fill="currentColor"
              className={styles.iconPath}
            />
          </svg>
          <span className={styles.latestText}>See all Integrity posts</span>
        </Link>
      )}
    </section>
  )
}
