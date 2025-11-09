import React from 'react'
import s from './SliderNav.module.css'
import Image from 'next/image'

export default function SliderNav({
  activeIndex,
  dots,
  onPrev,
  onNext,
  onDotClick,
}: {
  activeIndex: number
  dots: number
  onPrev: () => void
  onNext: () => void
  onDotClick: (idx: number) => void
}) {
  return (
    <div className={s.navContainer}>
      <button className={s.arrowBtn} onClick={onPrev} aria-label="Previous slide">
        <span className={s.iconLeft}>
          <span className={s.iconLeft}>{swiperArrow}</span>
        </span>
      </button>
      <div className={s.dotsBlock}>
        <div className={s.sliderDotsRow} style={{ position: 'relative' }}>
          {[...Array(dots)].map((_, idx) =>
            idx === activeIndex ? (
              <span key={idx} className={s.sliderActiveDot} onClick={() => onDotClick(idx)}></span>
            ) : (
              <span key={idx} className={s.sliderDot} onClick={() => onDotClick(idx)}></span>
            ),
          )}
        </div>
      </div>
      <button className={s.arrowBtn} onClick={onNext} aria-label="Next slide">
        <span className={s.iconRight}>{swiperArrow}</span>
      </button>
    </div>
  )
}

const swiperArrow = (
  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="16" viewBox="0 0 21 16" fill="none">
    <path d="M19.5 7C20.0523 7 20.5 7.44772 20.5 8C20.5 8.55228 20.0523 9 19.5 9V7ZM0.792892 8.70711C0.402369 8.31658 0.402369 7.68342 0.792892 7.29289L7.15685 0.928932C7.54738 0.538408 8.18054 0.538408 8.57107 0.928932C8.96159 1.31946 8.96159 1.95262 8.57107 2.34315L2.91421 8L8.57107 13.6569C8.96159 14.0474 8.96159 14.6805 8.57107 15.0711C8.18054 15.4616 7.54738 15.4616 7.15685 15.0711L0.792892 8.70711ZM19.5 8V9H1.5V8V7H19.5V8Z" />
  </svg>
)
