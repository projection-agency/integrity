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
}

export default function ReviewsSection({ block }: { block: ReviewsSection }) {
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 0,
  )

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const slidesCount = 4
  const slideWidth = windowWidth * 0.4875

  const calcSlidesOffset = () => {
    const totalSlidesWidth = slidesCount * slideWidth + (slidesCount - 1) * 20
    const visibleArea = windowWidth
    const offsetNeeded = totalSlidesWidth > visibleArea
    return offsetNeeded ? 0.7 * slideWidth : 0
  }
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
          <button>{phone} Demo call</button>
        </div>
        <div className={s.rightBlock}>
          <Swiper
            modules={[Navigation, Pagination]}
            className={s.swiper}
            slidesPerView="auto"
            centeredSlides={false}
            spaceBetween={20}
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
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={(swiper) => console.log(swiper)}
          >
            <SwiperSlide className={s.swiperSlide}>
              <div className={s.swiperItem}>
                <div className={s.reviewerBlock}>
                  <Image src={'/images/boss.jpg'} width={204} height={204} alt="reviewer avatar" />
                  <h3>client name</h3>
                  <div className={s.locationBlock}>
                    <div className={s.icon}>{marker}</div>
                    <div className={s.location}>
                      <p className={s.blockTitle}>Location:</p>
                      <p className={s.country}>USA</p>
                    </div>
                  </div>
                </div>
                <div className={s.reviewBlock}>
                  <div>
                    <p>5</p> {star} {upwork}
                  </div>
                  <h4>
                    “ Lorem ipsum viverra eu ut lectus euismod mauris vulputate iaculis diam nunc. “
                  </h4>
                  <p className={s.message}>
                    Lorem ipsum egestas sed habitant leo consequat a auctor mauris purus ut lectus
                    amet nisi tincidunt at tellus eleifend consectetur interdum convallis vitae
                    feugiat sit ac eget purus senectus facilisi odio quis aliquam mauris at leo
                    nulla blandit iaculis nisl interdum rutrum ut suspendisse ut consectetur et
                    lectus tortor vitae diam ut a amet velit consequat.
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className={s.swiperSlide}>
              <div className={s.swiperItem}>
                <div className={s.reviewerBlock}>
                  <Image src={'/images/boss.jpg'} width={204} height={204} alt="reviewer avatar" />
                  <h3>client name</h3>
                  <div className={s.locationBlock}>
                    <div className={s.icon}>{marker}</div>
                    <div className={s.location}>
                      <p className={s.blockTitle}>Location:</p>
                      <p className={s.country}>USA</p>
                    </div>
                  </div>
                </div>
                <div className={s.reviewBlock}>
                  <div>
                    <p>5</p> {star} {upwork}
                  </div>
                  <h4>
                    “ Lorem ipsum viverra eu ut lectus euismod mauris vulputate iaculis diam nunc. “
                  </h4>
                  <p className={s.message}>
                    Lorem ipsum egestas sed habitant leo consequat a auctor mauris purus ut lectus
                    amet nisi tincidunt at tellus eleifend consectetur interdum convallis vitae
                    feugiat sit ac eget purus senectus facilisi odio quis aliquam mauris at leo
                    nulla blandit iaculis nisl interdum rutrum ut suspendisse ut consectetur et
                    lectus tortor vitae diam ut a amet velit consequat.
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className={s.swiperSlide}>
              <div className={s.swiperItem}>
                <div className={s.reviewerBlock}>
                  <Image src={'/images/boss.jpg'} width={204} height={204} alt="reviewer avatar" />
                  <h3>client name</h3>
                  <div className={s.locationBlock}>
                    <div className={s.icon}>{marker}</div>
                    <div className={s.location}>
                      <p className={s.blockTitle}>Location:</p>
                      <p className={s.country}>USA</p>
                    </div>
                  </div>
                </div>
                <div className={s.reviewBlock}>
                  <div>
                    <p>5</p> {star} {upwork}
                  </div>
                  <h4>
                    “ Lorem ipsum viverra eu ut lectus euismod mauris vulputate iaculis diam nunc. “
                  </h4>
                  <p className={s.message}>
                    Lorem ipsum egestas sed habitant leo consequat a auctor mauris purus ut lectus
                    amet nisi tincidunt at tellus eleifend consectetur interdum convallis vitae
                    feugiat sit ac eget purus senectus facilisi odio quis aliquam mauris at leo
                    nulla blandit iaculis nisl interdum rutrum ut suspendisse ut consectetur et
                    lectus tortor vitae diam ut a amet velit consequat.
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className={s.swiperSlide}>
              <div className={s.swiperItem}>
                <div className={s.reviewerBlock}>
                  <Image src={'/images/boss.jpg'} width={204} height={204} alt="reviewer avatar" />
                  <h3>client name</h3>
                  <div className={s.locationBlock}>
                    <div className={s.icon}>{marker}</div>
                    <div className={s.location}>
                      <p className={s.blockTitle}>Location:</p>
                      <p className={s.country}>USA</p>
                    </div>
                  </div>
                </div>
                <div className={s.reviewBlock}>
                  <div>
                    <p>5</p> {star} {upwork}
                  </div>
                  <h4>
                    “ Lorem ipsum viverra eu ut lectus euismod mauris vulputate iaculis diam nunc. “
                  </h4>
                  <p className={s.message}>
                    Lorem ipsum egestas sed habitant leo consequat a auctor mauris purus ut lectus
                    amet nisi tincidunt at tellus eleifend consectetur interdum convallis vitae
                    feugiat sit ac eget purus senectus facilisi odio quis aliquam mauris at leo
                    nulla blandit iaculis nisl interdum rutrum ut suspendisse ut consectetur et
                    lectus tortor vitae diam ut a amet velit consequat.
                  </p>
                </div>
              </div>
            </SwiperSlide>
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
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className={s.star}
  >
    <g clipPath="url(#clip0_3035_8986)">
      <path
        d="M23.9372 9.2048C23.7792 8.71883 23.3482 8.37477 22.8402 8.32881L15.9121 7.69983L13.1741 1.28956C12.972 0.818609 12.512 0.514648 12 0.514648C11.4881 0.514648 11.0279 0.818609 10.827 1.28956L8.08902 7.69983L1.15982 8.32881C0.651881 8.37568 0.221759 8.71974 0.0628208 9.2048C-0.0952019 9.69077 0.0507355 10.2238 0.434897 10.5607L5.67198 15.1529L4.12783 21.9539C4.01485 22.454 4.20895 22.9711 4.62387 23.271C4.8469 23.4331 5.10893 23.514 5.37187 23.514C5.59783 23.514 5.82396 23.4539 6.02593 23.3331L12 19.761L17.973 23.3331C18.4112 23.5949 18.9622 23.5709 19.3762 23.271C19.7911 22.9711 19.9852 22.454 19.8722 21.9539L18.3281 15.1529L23.5652 10.5607C23.9491 10.2238 24.0953 9.69186 23.9372 9.2048Z"
        fill="#FFE414"
      />
    </g>
    <defs>
      <clipPath id="clip0_3035_8986">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

const upwork = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="90"
    height="30"
    viewBox="0 0 90 30"
    fill="none"
    className={s.upwrok}
  >
    <path
      d="M58.2787 7.47582C54.3234 7.49531 51.1014 10.8311 51.1196 14.9845C51.1377 19.1379 54.392 22.4423 58.3472 22.4237C62.3025 22.405 65.5254 19.0684 65.5064 14.9167C65.4874 10.765 62.234 7.45802 58.2771 7.47751L58.2787 7.47582ZM58.3332 19.3777C57.2119 19.3844 56.1343 18.9328 55.3374 18.1237C54.5406 17.3145 54.0988 16.2122 54.0864 15.0616C54.0741 13.911 54.52 12.8053 55.3085 11.9876C56.0971 11.17 57.1714 10.7167 58.2927 10.704C59.4141 10.6913 60.4917 11.1488 61.2885 11.958C62.0854 12.7671 62.5271 13.8694 62.5395 15.0201C62.5511 17.3289 60.5825 19.3658 58.3332 19.3777ZM74.3029 10.9963C72.2345 11.0065 70.6235 12.7671 70.6334 14.8896L70.6664 21.9941L67.5187 22.0093L67.4551 7.89099L70.6028 7.87574L70.6136 10.0897C70.6136 10.0897 71.9512 7.86981 74.6498 7.8571L75.5498 7.85201L75.5647 10.9887L74.3029 10.9963ZM42.9035 8.0113L45.2866 17.689L47.7605 7.98758L50.9082 7.97318L47.014 22.1186L43.9571 22.133L41.4849 12.2723L39.1018 22.1559L36.0441 22.1703L31.9336 8.07146L34.9905 8.05706L37.7319 17.7331L39.9366 8.03333L42.9035 8.0113ZM84.7477 14.2694C86.8987 12.9679 88.4181 10.5608 88.4057 7.7927L85.258 7.80795C85.2696 10.2075 83.3885 12.1545 81.1409 12.163L80.6908 12.1647L80.6413 1L77.4936 1.01525L77.5902 21.9602L80.7363 21.9458L80.7065 15.3031L81.0657 15.3014C81.4257 15.2997 81.7866 15.4827 81.8783 15.7589L86.3125 21.9187L89.9994 21.9017L84.7477 14.2694Z"
      fill="white"
    />
    <path
      d="M24.6482 7.63857C21.2322 7.65552 18.6344 9.97454 17.6625 13.6696C16.0317 11.0938 14.7592 8.14779 14.0293 5.66016L10.4332 5.6771L10.4778 15.4574C10.4817 16.3872 10.1257 17.2807 9.48789 17.9413C8.85011 18.6019 7.98279 18.9757 7.07656 18.9804C6.17033 18.9844 5.29961 18.6191 4.65579 17.9647C4.01197 17.3102 3.64774 16.4203 3.64315 15.4904L3.59773 5.71015L0 5.72709L0.0445901 15.5073C0.063582 19.5658 3.22367 22.7822 7.09142 22.7627C10.9592 22.7432 14.092 19.4989 14.0738 15.4396L14.0656 13.7789C14.7906 15.2506 15.6972 16.8147 16.6939 18.1949L14.495 29.0004L18.1811 28.9834L19.7665 21.1325C21.209 22.0492 22.8217 22.5941 24.7176 22.5847C28.6745 22.5652 31.8974 19.2295 31.8767 14.9846C31.8617 13.0288 31.0932 11.1586 29.7391 9.78209C28.385 8.40564 26.5551 7.63476 24.649 7.63773L24.6482 7.63857ZM24.6994 18.8033C23.261 18.8101 21.8201 18.1712 20.6467 17.1612L20.9993 15.6844V15.5997C21.2635 14.0288 22.0579 11.3497 24.7564 11.3378C25.7079 11.3362 26.6215 11.7203 27.2984 12.4064C27.9752 13.0926 28.3606 14.0253 28.3706 15.0015C28.2897 17.124 26.5895 18.7931 24.7002 18.8024L24.6994 18.8033Z"
      fill="white"
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
    <path
      d="M19 7C19.5523 7 20 7.44772 20 8C20 8.55228 19.5523 9 19 9V7ZM0.292892 8.70711C-0.0976315 8.31658 -0.0976315 7.68342 0.292892 7.29289L6.65685 0.928932C7.04738 0.538408 7.68054 0.538408 8.07107 0.928932C8.46159 1.31946 8.46159 1.95262 8.07107 2.34315L2.41421 8L8.07107 13.6569C8.46159 14.0474 8.46159 14.6805 8.07107 15.0711C7.68054 15.4616 7.04738 15.4616 6.65685 15.0711L0.292892 8.70711ZM19 8V9H1V8V7H19V8Z"
      fill="#222222"
    />
  </svg>
)
