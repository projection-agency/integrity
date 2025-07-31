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
          <Image
            src="/images/icons/arrow-1.svg"
            alt="prev"
            width={20}
            height={16}
          />
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
        <span className={s.iconRight}>
          <Image
            src="/images/icons/arrow-2.svg"
            alt="next"
            width={20}
            height={16}
          />
        </span>
      </button>
    </div>
  )
}
