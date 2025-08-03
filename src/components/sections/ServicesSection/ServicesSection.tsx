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
import SliderNav from '@/components/ui/SliderNav/SliderNav'

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
            centeredSlides={true}
            slidesPerView={1.2}
            loop={services.length >= 6}
            speed={600}
            // spaceBetween={145}
            spaceBetween={8}
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
            breakpoints={{
              1024: {
                slidesPerView: 3.6,
                spaceBetween: 16,
                centeredSlides: true,
              },
              320: {
                slidesPerView: 1.2,
                spaceBetween: 8,
                centeredSlides: false,
              },
            }}
          >
            {services.map((service, idx) => (
              <SwiperSlide key={service?.service_title || idx}>
                <div className={s.serviceCard}>
                  <div className={s.heroServices}>
                    <div className={s.serviceIconWrapper}>
                      {/* <div
                        className={s.iconService}
                        dangerouslySetInnerHTML={{ __html: service?.service_icon || '' }}
                      /> */}
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
  )
}
