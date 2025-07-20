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
          <h3>
            “ For me, marketing{' '}
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
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="12 4 325 160" fill="none">
    <g>
      <path
        d="M305 4C322.673 4 337 18.3269 337 36V100.122C337 117.795 322.673 132.122 305 132.122H200.361C196.744 133.615 190.903 136.839 185.828 143.355C177.789 153.678 173.828 164 173.828 164C173.828 164 167.828 151.613 161.828 143.355C157.658 137.617 150.591 133.873 146.667 132.122H44C26.3269 132.122 12 117.795 12 100.122V36C12 18.3269 26.3269 4 44 4H305Z"
        fill="url(#paint0_linear_3035_9086)"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_3035_9086"
        x="0"
        y="0"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="-4" dy="4" />
        <feGaussianBlur stdDeviation="4" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3035_9086" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_3035_9086"
          result="shape"
        />
      </filter>
      <linearGradient
        id="paint0_linear_3035_9086"
        x1="21.6517"
        y1="-29.2268"
        x2="407.417"
        y2="99.5851"
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
