'use client'

import s from './ReviewsSection.module.css'
import MainTitle from '@/components/ui/MainTitle/MainTitle'
import TabSection from '@/components/ui/TabSection/TabSection'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import { useState, useEffect } from 'react'
import 'swiper/css'

type ReviewsSection = {
  subtitle: string
  title: string
  review: []
}

type Review = {
  client_image: { url: string }
  client_name: string
  location: string
  rating: string
  stars: number
  siteLogo: { url: string }
  quote: string
  review_content: string
}

export default function ReviewsSection({ block }: { block: ReviewsSection }) {
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 0,
  )

  console.log(block)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <section className={s.section}>
      <div className={s.topBlock}>
        <TabSection style="gray" text={block.subtitle} />
        <MainTitle title={block.title} />
      </div>
      <div className={s.content}>
        <div className={s.leftBlock}>
          <div className={s.imagesCont}>
            <div className={s.icon}>{messages}</div>
            <Image src={'/images/business-woman.png'} width={118} height={118} alt="woman" />
          </div>
          <h3>
            <span>Do you want</span> the same result?
          </h3>
          <p>Order your first free call and receive a tailored strategy to promote your business</p>
          <button>
            <span>{phone} Demo call</span>
          </button>
        </div>
        <div className={s.rightBlock}>
          <Swiper
            modules={[Navigation, Pagination]}
            className={s.swiper}
            loop={true}
            breakpoints={{
              0: { spaceBetween: 8, centeredSlides: false, slidesPerView: 'auto' },
              1025: { spaceBetween: 20, centeredSlides: false, slidesPerView: 'auto' },
            }}
            pagination={{
              el: `.${s.paginationCont}`,
              bulletClass: s.paginationBullet,
              bulletActiveClass: s.paginationBulletActive,
            }}
            navigation={{
              nextEl: `.${s.navigationNext}`,
              prevEl: `.${s.navigationPrev}`,
              disabledClass: s.disabled,
            }}
          >
            {block.review.map((item: Review, idx) => {
              return (
                <SwiperSlide key={idx} className={s.swiperSlide}>
                  <div className={s.swiperItem}>
                    <div className={s.reviewerBlock}>
                      <Image
                        src={`${item.client_image.url}`}
                        width={204}
                        height={204}
                        alt="reviewer avatar"
                      />
                      <h3>{item.client_name}</h3>
                      <div className={s.locationBlock}>
                        <div className={s.icon}>{marker}</div>
                        <div className={s.location}>
                          <p className={s.blockTitle}>Location:</p>
                          <p className={s.country}>{item.location}</p>
                        </div>
                      </div>
                    </div>
                    <div className={s.reviewBlock}>
                      <div className={s.stars}>
                        <div className={s.wrapStars}>
                          <span>{item.stars}</span>
                          {star}
                        </div>
                        <Image
                          src={`${item.siteLogo.url}`}
                          width={100}
                          height={100}
                          alt="site logo"
                        />
                      </div>
                      <h4>{item.quote}</h4>
                      <p
                        className={s.message}
                        dangerouslySetInnerHTML={{ __html: item.review_content }}
                      ></p>
                    </div>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
          <div className={s.controls}>
            <button className={`${s.navigationBtn} ${s.navigationPrev}`}>{navArrow}</button>
            <div className={s.paginationCont}></div>
            <button className={`${s.navigationBtn} ${s.navigationNext}`}>{navArrow}</button>
          </div>
        </div>
      </div>
    </section>
  )
}

const messages = (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <g clipPath="url(#clip0_3035_8802)">
      <path
        d="M13.1873 9.6875C5.95019 9.6875 6.58184e-05 14.6642 6.58184e-05 20.7816C6.58184e-05 23.2269 0.948566 25.7121 2.688 27.6383L0.231691 30.4452C-0.00999668 30.7217 -0.0686217 31.1145 0.0843158 31.4496C0.236316 31.7846 0.569566 31.9998 0.937566 31.9998H14.1248C19.4682 31.9998 26.3744 27.3986 26.3744 20.7816C26.3744 14.6642 20.4243 9.6875 13.1873 9.6875ZM7.49988 22.5C6.46625 22.5 5.62494 21.6586 5.62494 20.6251C5.62494 19.5914 6.46632 18.7501 7.49988 18.7501C8.53344 18.7501 9.37481 19.5915 9.37481 20.6251C9.37488 21.6586 8.5335 22.5 7.49988 22.5ZM13.1873 22.5C12.1536 22.5 11.3123 21.6586 11.3123 20.6251C11.3123 19.5914 12.1537 18.7501 13.1873 18.7501C14.2208 18.7501 15.0622 19.5915 15.0622 20.6251C15.0622 21.6586 14.2209 22.5 13.1873 22.5ZM18.8746 22.5C17.841 22.5 16.9997 21.6586 16.9997 20.6251C16.9997 19.5914 17.8411 18.7501 18.8746 18.7501C19.9082 18.7501 20.7496 19.5915 20.7496 20.6251C20.7496 21.6586 19.9083 22.5 18.8746 22.5Z"
        fill="#222222"
      />
      <path
        d="M31.7755 19.0764L29.5683 16.5011C31.1438 14.7232 32.0017 12.5552 32.0017 10.3123C32.0016 4.62606 26.5343 0 19.8144 0C13.7379 0 8.57532 3.78681 7.66376 8.71562C9.35926 8.1395 11.2607 7.812 13.1896 7.812C21.3992 7.812 28.1441 13.5461 28.2426 20.6245H31.0642C31.865 20.6246 32.2951 19.6816 31.7755 19.0764Z"
        fill="#222222"
      />
    </g>
    <defs>
      <clipPath id="clip0_3035_8802">
        <rect width="32" height="32" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

const phone = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <g clipPath="url(#clip0_3087_425)">
      <path
        d="M7.45669 2.11253C7.14735 1.33915 6.39833 0.832031 5.5654 0.832031H2.76376C1.69797 0.832031 0.833984 1.69583 0.833984 2.76165C0.833984 11.8211 8.17811 19.1654 17.2373 19.1654C18.3031 19.1654 19.1668 18.3013 19.1668 17.2355L19.1673 14.4333C19.1673 13.6003 18.6603 12.8514 17.887 12.5421L15.2018 11.4684C14.5071 11.1905 13.7162 11.3155 13.1414 11.7945L12.4484 12.3725C11.639 13.047 10.4482 12.9934 9.70321 12.2484L7.75181 10.2952C7.00685 9.55017 6.9518 8.36025 7.62625 7.55088L8.20413 6.8579C8.68311 6.2831 8.80928 5.49192 8.53141 4.79722L7.45669 2.11253Z"
        stroke="#222222"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_3087_425">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

const marker = (
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="12" viewBox="0 0 10 12" fill="none">
    <path d="M5 0C2.519 0 0.5 2.033 0.5 4.5325C0.5 8.084 4.577 11.751 4.7505 11.905C4.822 11.9685 4.911 12 5 12C5.089 12 5.178 11.9685 5.2495 11.9055C5.423 11.751 9.5 8.084 9.5 4.5325C9.5 2.033 7.481 0 5 0ZM5 7C3.6215 7 2.5 5.8785 2.5 4.5C2.5 3.1215 3.6215 2 5 2C6.3785 2 7.5 3.1215 7.5 4.5C7.5 5.8785 6.3785 7 5 7Z" />
  </svg>
)

const star = (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="26" viewBox="0 0 28 26" fill="none">
    <path
      d="M13.0489 0.927047C13.3483 0.00573683 14.6517 0.00573993 14.9511 0.927051L17.3677 8.36475C17.5016 8.77677 17.8855 9.05573 18.3188 9.05573H26.1392C27.1079 9.05573 27.5107 10.2953 26.727 10.8647L20.4001 15.4615C20.0496 15.7161 19.903 16.1675 20.0369 16.5795L22.4535 24.0172C22.7529 24.9385 21.6984 25.7047 20.9147 25.1353L14.5878 20.5385C14.2373 20.2839 13.7627 20.2839 13.4122 20.5385L7.08533 25.1353C6.30162 25.7047 5.24714 24.9385 5.54649 24.0172L7.96315 16.5795C8.09702 16.1675 7.95036 15.7161 7.59987 15.4615L1.27299 10.8647C0.489277 10.2953 0.892056 9.05573 1.86078 9.05573H9.68123C10.1145 9.05573 10.4984 8.77677 10.6323 8.36475L13.0489 0.927047Z"
      fill="#FFE414"
    />
  </svg>
)

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
