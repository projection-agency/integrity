'use client'
import TabSection from '@/components/ui/TabSection/TabSection'
import s from './CasesSection.module.css'
import MainTitle from '@/components/ui/MainTitle/MainTitle'
import { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import CaseItem from '@/components/CaseItem/CaseItem'

export interface CaseItemType {
  case_title: string
  case_location: string
  case_client: string
  case_client_website: string
  case_goal: string
  case_time: string
  case_image?: {
    url: string
    filename?: string
    id?: string
  }
  case_wwd: {
    id: number
    point: string
  }[]
}

export interface CasesBlockData {
  enabled: boolean
  subtitle: string
  title: string
  case: CaseItemType[]
}
export default function CasesSection({ block }: { block: CasesBlockData }) {
  const swiperRef = useRef<any>(null)
  const [caseData, setCaseData] = useState<CaseItemType[]>([])
  const [activeSlide, setActiveSlide] = useState<number>(0)
  const [windowWidth, setWndowWidth] = useState<number>(0)
  const [isExpanded, setIsExpanded] = useState(false)

  const handleClick = () => {
    if (window.innerWidth <= 1024) {
      setIsExpanded(!isExpanded)
    }
  }

  const inlineStyle = {
    transform: `translateX(${activeSlide * -100}%)`,
  }

  useEffect(() => {
    setCaseData(block.case)
    console.log(swiperRef.current)

    // Встановлюємо ширину вікна тільки на клієнті
    if (typeof window !== 'undefined') {
      setWndowWidth(window.innerWidth)

      const handleResize = () => {
        setWndowWidth(window.innerWidth)
      }

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [block.case])

  return (
    <div className={s.section} id="cases">
      <div className={s.headWrapper}>
        <TabSection style="gray" text={block.subtitle} />
        <div className={s.wrapHeading}>
          <MainTitle title={block.title} />
          <div className={s.count}>
            <span>(05)</span>
          </div>
        </div>
      </div>

      <div className={s.content}>
        <div className={s.paginationCont}>
          <div className={s.falsePagination}>
            {caseData.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className={`${s.paginationBullet} ${activeSlide === idx ? s.paginationBulletActive : ''}`}
                ></div>
              )
            })}
          </div>
          {windowWidth <= 1024 ? (
            <ul className={s.swiperShort} style={inlineStyle}>
              {caseData.map((item, idx) => {
                return (
                  <li
                    key={idx}
                    className={`${s.swiperShortItem} ${activeSlide === idx ? s.swiperShortActive : ''}`}
                    onClick={() => {
                      setActiveSlide(idx)
                      swiperRef.current?.slideTo(idx)
                    }}
                  >
                    <p>Case {idx + 1}</p>
                    <h3>{item.case_title}</h3>
                  </li>
                )
              })}
            </ul>
          ) : (
            <ul className={s.swiperShort}>
              {caseData.map((item, idx) => {
                return (
                  <li
                    key={idx}
                    className={`${s.swiperShortItem} ${activeSlide === idx ? s.swiperShortActive : ''}`}
                    onClick={() => {
                      setActiveSlide(idx)
                      swiperRef.current?.slideTo(idx)
                    }}
                  >
                    <p>Case {idx + 1}</p>
                    <h3>{item.case_title}</h3>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
        <div className={s.swiperContainer}>
          <Swiper
            className={s.swiper}
            modules={[Navigation, Pagination]}
            pagination={{
              el: `.${s.pagination}`,
              bulletActiveClass: s.paginationBulletActive,
              bulletClass: s.paginationBullet,
            }}
            navigation={{
              prevEl: `.${s.navigationPrev}`,
              nextEl: `.${s.navigationNext}`,
              disabledClass: s.disabled,
            }}
            onSlideChange={(swiper) => {
              setActiveSlide(swiper.activeIndex)
            }}
            onSwiper={(swiper) => {
              setActiveSlide(swiper.activeIndex)
              swiperRef.current = swiper
            }}
          >
            {caseData.map((item, idx) => {
              return (
                <SwiperSlide key={idx}>
                  <CaseItem item={item} isExpanded={isExpanded} />
                </SwiperSlide>
              )
            })}
          </Swiper>
          {windowWidth <= 1024 ? (
            <button
              className={`${s.expandBtn} ${isExpanded ? s.isExpanded : ''}`}
              onClick={handleClick}
            >
              {isExpanded ? 'Show less' : 'Show more'} {btnArrow}
            </button>
          ) : (
            ''
          )}
          <div className={s.controlsCont}>
            {windowWidth <= 1024 ? <p>Next case</p> : <p>Switch to the next case</p>}
            <div className={s.controls}>
              <button className={`${s.navigationBtn} ${s.navigationPrev}`}>{navArrow}</button>
              <div className={s.pagination}></div>
              <button className={`${s.navigationBtn} ${s.navigationNext}`}>{navArrow}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

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

const btnArrow = (
  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="16" viewBox="0 0 19 16" fill="none">
    <path
      d="M1.5 11.7637L9.5 3.76367L17.5 11.7637"
      stroke="#686868"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)
