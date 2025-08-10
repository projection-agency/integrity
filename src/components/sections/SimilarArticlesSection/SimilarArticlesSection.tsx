'use client'
import TabSection from '@/components/ui/TabSection/TabSection'
import s from './SimilarArticlesSection.module.css'
import ArticleItem from '@/components/ui/ArticleItem/ArticleItem'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { EnrichedPost } from '.'
import { useTranslations } from 'next-intl'

const SimilarArticlesSection = ({ posts }: { posts: EnrichedPost[] }) => {
  const t = useTranslations('SimilarArticlesSection')

  return (
    <div className={s.similarArticlesCont}>
      <div className={s.topBlock}>
        <TabSection text={t('articles')} style="gray" />
        <h2>
          <span>{t('similar')}</span> {t('articles')}
        </h2>
      </div>

      {window.innerWidth <= 1024 ? (
        <>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{
              prevEl: `.${s.navigationPrev}`,
              nextEl: `.${s.navigationNext}`,
              disabledClass: s.disabled,
            }}
            pagination={{
              el: `.${s.pagination}`,
              bulletActiveClass: s.paginationBulletActive,
              bulletClass: s.paginationBullet,
            }}
            className={s.swiper}
            slidesPerView={1.2}
            direction="horizontal"
            spaceBetween={8}
          >
            {posts.map((post, idx) => (
              <SwiperSlide key={post.id}>
                <ArticleItem post={post} idx={idx} style="small" />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={s.controlsCont}>
            <div className={s.controls}>
              <button className={`${s.navigationBtn} ${s.navigationPrev}`}>{navArrow}</button>
              <div className={s.pagination}></div>
              <button className={`${s.navigationBtn} ${s.navigationNext}`}>{navArrow}</button>
            </div>
          </div>
        </>
      ) : (
        <div className={s.articlesList}>
          {posts.slice(0, 3).map((post, index) => (
            <ArticleItem key={post.id} post={post} idx={index} style="small" />
          ))}
        </div>
      )}
    </div>
  )
}

export default SimilarArticlesSection

const navArrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="16"
    viewBox="0 0 20 16"
    fill="none"
    className={s.navArrow}
  >
    <path d="M19 7C19.5523 7 20 7.44772 20 8C20 8.55228 19.5523 9 19 9V7ZM0.292892 8.70711C-0.0976315 8.31658 -0.0976315 7.68342 0.292892 7.29289L6.65685 0.928932C7.04738 0.538408 7.68054 0.538408 8.07107 0.928932C8.46159 1.31946 8.46159 1.95262 8.07107 2.34315L2.41421 8L8.07107 13.6569C8.46159 14.0474 8.46159 14.6805 8.07107 15.0711C7.68054 15.4616 7.04738 15.4616 6.65685 15.0711L0.292892 8.70711ZM19 8V9H1V8V7H19V8Z" />
  </svg>
)
