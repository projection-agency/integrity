'use client'

import React from 'react'
import MainTitle from '@/components/ui/MainTitle/MainTitle'
import s from './ServicesSection.module.css'
import TabSection from '@/components/ui/TabSection/TabSection'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules'
import { useRef, useState, useEffect } from 'react'
import ExpertSection from '@/components/sections/ExpertSection/ExpertSection'
import { ServicesBlock } from '@/blocks/ServicesBlock'

type ServicesBlock = {
  title?: string
  subtitle?: string
  service?: {
    service_title?: string
    service_description?: string
    service_icon?: string
  }[]
}

export default function ServicesSection({ block }: { block: ServicesBlock }) {
  const swiperRef = useRef<any>(null)
  const [swiperIndex, setSwiperIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const services = block.service ?? []

  return (
    <div className={s.section} id="services">
      <div className={s.headWrapper}>
        <TabSection style="white" text={block.subtitle || ''} />
        <div className={s.wrapHeading}>
          <MainTitle title={block.title || ''} />
          <div className={s.count}>({services.length})</div>
        </div>
      </div>
      <div className={s.services}>
        <div className={s.sliderWindow}>
          <Swiper
            grabCursor={true}
            slidesPerView={'auto'}
            loop={true}
            speed={600}
            breakpoints={{
              320: {
                slidesPerView: 1.2,
                spaceBetween: 20,
                centeredSlides: false,
              },
              1024: {
                slidesPerView: 'auto',
                spaceBetween: 0,
                centeredSlides: true,
              },
            }}
            pagination={{
              enabled: true,
              el: `.${s.sliderDotsRow}`,
              type: 'bullets',
              clickable: true,
              bulletActiveClass: `${s.sliderActiveDot}`,
              bulletClass: `${s.sliderDot}`,
            }}
            navigation={{
              nextEl: '.navSwiperNext',
              prevEl: '.navSwiperPrev',
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className={s.swiperCustom}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setSwiperIndex(swiper.realIndex)}
          >
            {services.map((service, idx) => (
              <SwiperSlide key={service?.service_title || idx} className={s.swiperSlide}>
                <div className={s.serviceCard}>
                  <div className={s.heroServices}>
                    <div className={s.serviceIconWrapper}>
                      <div className={s.cardBlock}>
                        <div className={s.cardIconcBlock}>
                          <div
                            className={s.iconService}
                            dangerouslySetInnerHTML={{ __html: service?.service_icon || '' }}
                          />
                        </div>
                      </div>
                    </div>
                    <span className={s.titleDescriptionBlock}>
                      <div className={s.serviceTitle}>{service?.service_title || ''}</div>
                      <div className={s.serviceTextBlock}>
                        <div className={s.serviceDescription}>
                          {service?.service_description || ''}
                        </div>
                      </div>
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className={s.sliderNavWrapper}>
          <div className={s.arrowContainer}>
            <button className={'navSwiperPrev ' + s.arrowBtn} aria-label="Previous slide">
              {swiperArrow}
            </button>
          </div>
          <div className={s.sliderDotsRow}></div>
          <div className={s.arrowContainer}>
            <button className={'navSwiperNext ' + s.arrowBtn} aria-label="Next slide">
              {swiperArrow}
            </button>
          </div>
        </div>
      </div>
      <div className={s.fillFormSection}>
        <ExpertSection />
      </div>
    </div>
  )
}

const swiperArrow = (
  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="16" viewBox="0 0 21 16" fill="none">
    <path d="M19.5 7C20.0523 7 20.5 7.44772 20.5 8C20.5 8.55228 20.0523 9 19.5 9V7ZM0.792892 8.70711C0.402369 8.31658 0.402369 7.68342 0.792892 7.29289L7.15685 0.928932C7.54738 0.538408 8.18054 0.538408 8.57107 0.928932C8.96159 1.31946 8.96159 1.95262 8.57107 2.34315L2.91421 8L8.57107 13.6569C8.96159 14.0474 8.96159 14.6805 8.57107 15.0711C8.18054 15.4616 7.54738 15.4616 7.15685 15.0711L0.792892 8.70711ZM19.5 8V9H1.5V8V7H19.5V8Z" />
  </svg>
)
