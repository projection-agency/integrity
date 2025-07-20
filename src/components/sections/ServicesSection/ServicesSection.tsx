'use client'

import React from 'react'
import MainTitle from '@/components/ui/MainTitle/MainTitle'
import s from './ServicesSection.module.css'
import TabSection from '@/components/ui/TabSection/TabSection'
import Image from 'next/image'
import ArrowIcon from 'public/images/icons/arrow-2.svg'
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
    <div className={s.section}>
      <div className={s.contentContainer}>
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
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={3.3}
              loop={services.length >= 5}
              speed={600}
              spaceBetween={8}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 0.5,
                scale: 0.9,
                slideShadows: false,
              }}
              pagination={false}
              navigation={{
                nextEl: '.navSwiperNext',
                prevEl: '.navSwiperPrev',
              }}
              observer={true}
              observeParents={true}
              modules={[EffectCoverflow, Pagination, Navigation]}
              className={s.swiperCustom}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={(swiper) => setSwiperIndex(swiper.realIndex)}
            >
              {services.map((service, idx) => (
                <SwiperSlide key={service?.service_title || idx}>
                  <div className={s.serviceCard}>
                    <div className={s.heroServices}>
                      <div className={s.serviceIconWrapper}>
                        <div
                          className={s.iconService}
                          dangerouslySetInnerHTML={{ __html: service?.service_icon || '' }}
                        />
                      </div>
                      <div className={s.serviceTitle}>{service?.service_title || ''}</div>
                    </div>
                    <div className={s.serviceTextBlock}>
                      <div className={s.serviceDescription}>
                        {service?.service_description || ''}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className={s.navSwiper}>
              <div className={s.sliderOverlayLeft}></div>
              <div className="swiper-pagination"></div>
              <div className={s.sliderOverlayRight}></div>
            </div>
          </div>

          <div className={s.sliderNavWrapper}>
            <div className={s.arrowContainer}>
              <button className={'navSwiperPrev ' + s.arrowBtn} aria-label="Previous slide">
                <Image
                  src={ArrowIcon}
                  alt="prev"
                  width={48}
                  height={48}
                  style={{ transform: 'rotate(180deg)', width: 'auto', height: 'auto' }}
                />
              </button>
            </div>
            <div className={s.sliderDotsRow}>
              {services.map((_, idx) =>
                idx === swiperIndex ? (
                  <span
                    key={idx}
                    className={s.sliderActiveDot}
                    onClick={() => swiperRef.current?.slideToLoop(idx)}
                    style={{ cursor: 'pointer' }}
                  ></span>
                ) : (
                  <span
                    key={idx}
                    className={s.sliderDot}
                    onClick={() => swiperRef.current?.slideToLoop(idx)}
                    style={{ cursor: 'pointer' }}
                  ></span>
                ),
              )}
            </div>
            <div className={s.arrowContainer}>
              <button className={'navSwiperNext ' + s.arrowBtn} aria-label="Next slide">
                <Image
                  src={ArrowIcon}
                  alt="next"
                  width={48}
                  height={48}
                  style={{ width: 'auto', height: 'auto' }}
                />
              </button>
            </div>
          </div>
        </div>
        <div className={s.fillFormSection}>
          <ExpertSection />
        </div>
      </div>
    </div>
  )
}
