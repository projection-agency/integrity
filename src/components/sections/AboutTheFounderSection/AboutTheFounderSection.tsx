'use client'
import { useEffect, useState } from 'react'
import MainTitle from '@/components/ui/MainTitle/MainTitle'
import TabSection from '@/components/ui/TabSection/TabSection'
import s from './AboutTheFounderSection.module.css'
import Image from 'next/image'
import IconHero from '@/components/icons/IconHero/IconHero'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

type AboutTheFounderSection = {
  subtitle: string
  title: string
}

const AboutTheFounderSection = ({ block }: { block: AboutTheFounderSection }) => {
  const [width, setWidth] = useState(0)
  const t = useTranslations('AboutTheFounderSection')

  useEffect(() => {
    // Встановлюємо ширину вікна тільки на клієнті
    if (typeof window !== 'undefined') {
      setWidth(window.innerWidth)

      const handleResize = () => {
        setWidth(window.innerWidth)
      }

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])
  return (
    <section className={s.section} id="about">
      <TabSection style="gray" text={block.subtitle} />
      <MainTitle title={block.title} />
      <div className={s.contentContainer}>
        <div className={s.imgContainer}>
          <Image
            className={s.founderImage}
            src={width <= 1024 ? '/images/boss-mobile.jpg' : '/images/boss.jpg'}
            width={1486}
            height={1486}
            alt="founder"
          />
          <IconHero containerClass={s.logoContainer} iconClass={s.logo} style="small" />
          <motion.div
            initial={{ opacity: 0, y: 100, x: -50, rotate: 10 }}
            whileInView={{ opacity: 1, y: 0, x: 0, rotate: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            viewport={{ once: false, amount: 0.2 }}
            className={s.experience}
          >
            <div className={s.item}>
              <span>
                <Image src={'/images/icons/star.svg'} width={24} height={24} alt="icon" />
                <p>{t('experience')}</p>
              </span>
              <h3>{t('yearsOfExperience')}</h3>
              <p className={s.subtitle}>{t('ofRealBusinessExperience')}</p>
            </div>
            <div className={s.item}>
              <span>
                <Image src={'/images/icons/star.svg'} width={24} height={24} alt="icon" />
                <p>{t('success')}</p>
              </span>
              <h3>{t('jobSuccess')}</h3>
              <p className={s.subtitle}>{t('topRatedOnUpwork')}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50, x: 50, rotate: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0, x: 0, rotate: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            viewport={{ once: false, amount: 0.2 }}
            className={s.spend}
          >
            {spendBg}
            <div className={s.arrowContainer}>
              <Image src={'/images/icons/arrow-up.svg'} width={40} height={40} alt="arrow" />
            </div>
            <div className={s.spendedCont}>
              <h3>$10M+</h3>
              <p className={s.subtitle}>{t('inAdSpendManagement')}</p>
            </div>
          </motion.div>
        </div>

        <div className={s.content}>
          {width <= 1024 ? (
            <h3>
              <span>
                {t('founderQuote.part1')} <pre></pre>
              </span>
              <span>
                <span className={s.computer}>
                  <Image src={'/images/icons/computer.svg'} width={64} height={64} alt="icon" />
                </span>
                {t('founderQuote.part2')}
              </span>{' '}
              <span>{t('founderQuote.part3')}</span>{' '}
              <span className={s.stonks}>
                <Image src={'/images/icons/stonks.svg'} width={64} height={64} alt="icon" />
              </span>
              <span>{t('founderQuote.part4')}</span>
            </h3>
          ) : (
            <h3>
              {t('founderQuote.part1')}
              <span className={s.computer}>
                <Image src={'/images/icons/computer.svg'} width={64} height={64} alt="icon" />
              </span>{' '}
              {t('founderQuote.part2')} {t('founderQuote.part3')} <br />
              <span className={s.stonks}>
                <Image src={'/images/icons/stonks.svg'} width={64} height={64} alt="icon" />
              </span>{' '}
              {t('founderQuote.part4')}
            </h3>
          )}
          <p className={s.founder}>{t('founder')}</p>
          <p className={s.name}>{t('name')}</p>
          <article className={s.about}>
            <p>
              {t('about.part1')} <span>{t('about.part2')}</span> {t('about.part3')}
            </p>
            <p>
              {t('about.part4')} <span>{t('about.part5')}</span> {t('about.part6')}{' '}
              {t('about.part7')}
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
