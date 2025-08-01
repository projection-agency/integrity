'use client'
import { useEffect, useState } from 'react'
import MainTitle from '@/components/ui/MainTitle/MainTitle'
import TabSection from '@/components/ui/TabSection/TabSection'
import s from './AboutTheFounderSection.module.css'
import Image from 'next/image'
import IconHero from '@/components/icons/IconHero/IconHero'

type AboutTheFounderSection = {
  subtitle: string
  title: string
}

const AboutTheFounderSection = ({ block }: { block: AboutTheFounderSection }) => {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    setWidth(window.innerWidth)
  }, [])
  return (
    <section className={s.section} id="about">
      <TabSection style="gray" text={block.subtitle} />
      <MainTitle title={block.title} />
      <div className={s.contentContainer}>
        <div className={s.imgContainer}>
          <Image
            className={s.founderImage}
            src={'/images/boss.jpg'}
            width={1486}
            height={1486}
            alt="founder"
          />
          <IconHero containerClass={s.logoContainer} iconClass={s.logo} />
          <div className={s.experience}>
            <div className={s.item}>
              <span>
                <Image src={'/images/icons/star.svg'} width={24} height={24} alt="icon" />
                <p>Experience</p>
              </span>
              <h3>10 years</h3>
              <p className={s.subtitle}>Of real business experience</p>
            </div>
            <div className={s.item}>
              <span>
                <Image src={'/images/icons/star.svg'} width={24} height={24} alt="icon" />
                <p>Success</p>
              </span>
              <h3>100% job success</h3>
              <p className={s.subtitle}>Top Rated on Upwork with long-term clients</p>
            </div>
          </div>

          <div className={s.spend}>
            {spendBg}
            <div className={s.arrowContainer}>
              <Image src={'/images/icons/arrow-up.svg'} width={40} height={40} alt="arrow" />
            </div>
            <div className={s.spendedCont}>
              <h3>$10M+</h3>
              <p className={s.subtitle}>In ad spend managment</p>
            </div>
          </div>
        </div>

        <div className={s.content}>
          {width <= 1024 ? (
            <h3>
              <span> “ For me, marketing</span>
              <span>
                {' '}
                <span className={s.computer}>
                  <Image src={'/images/icons/computer.svg'} width={64} height={64} alt="icon" />
                </span>{' '}
                only made sense
              </span>{' '}
              <span>once I stopped seeing</span> <span>it as campaigns and</span>
              <span>started building it </span>
              <span>
                like{' '}
                <span className={s.stonks}>
                  <Image src={'/images/icons/stonks.svg'} width={64} height={64} alt="icon" />
                </span>{' '}
                a business system “
              </span>
            </h3>
          ) : (
            <h3>
              “ For me, marketing
              <span className={s.computer}>
                <Image src={'/images/icons/computer.svg'} width={64} height={64} alt="icon" />
              </span>{' '}
              only made sense once I stopped seeing it as campaigns <br /> and started building it
              like{' '}
              <span className={s.stonks}>
                <Image src={'/images/icons/stonks.svg'} width={64} height={64} alt="icon" />
              </span>{' '}
              a business system “
            </h3>
          )}
          <p className={s.founder}>Founder, CEO of the Company</p>
          <p className={s.name}>Pushenko Eugen</p>
          <article className={s.about}>
            <p>
              I graduated in <span>Marketing in 2004</span> but spent 15 years in Aviation and
              Tourism, where marketing was always present but never the core
            </p>
            <p>
              By 2019, I had seen how disconnected and reactive marketing had become.{' '}
              <span>I started building what would later become Integrity</span> — not an agency in
              the traditional sense, but a system.{' '}
              <span>Focused, structured, and built around what actually helps businesses grow</span>
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
export default AboutTheFounderSection

const spendBg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 325 160"
    preserveAspectRatio="none"
    fill="none"
  >
    <path
      d="M293 0C310.673 0 325 14.3269 325 32V96.122C325 113.795 310.673 128.122 293 128.122H188.361C184.744 129.615 178.903 132.839 173.828 139.355C165.789 149.678 161.828 160 161.828 160C161.828 160 155.828 147.613 149.828 139.355C145.658 133.617 138.591 129.873 134.667 128.122H32C14.3269 128.122 0 113.795 0 96.122V32C0 14.3269 14.3269 0 32 0H293Z"
      fill="url(#paint0_linear_3035_9086)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_3035_9086"
        x1="0"
        y1="0"
        x2="400"
        y2="160"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#737373" />
        <stop offset="0.255809" stopColor="#222222" />
        <stop offset="0.429644" stopColor="#737373" />
        <stop offset="0.523944" stopColor="#222222" />
        <stop offset="0.784245" stopColor="#222222" />
        <stop offset="1" stopColor="#737373" />
      </linearGradient>
    </defs>
  </svg>
)
