'use client'

import React, { useState } from 'react'

import s from './HeroSection.module.css'
import IconHero from '../../icons/IconHero/IconHero'
import GridBackground from '../../GridBackground/GridBackground'
import Image from 'next/image'
import PopUp from '../../PopUp/PopUp'
import TabSection from '@/components/ui/TabSection/TabSection'
import MainTitle from '@/components/ui/MainTitle/MainTitle'

type HeroBlock = {
  title?: string
  subtitle?: string
  description?: string
  firstButton?: string
  lastButton?: string
}

export default function HeroSection({ block }: { block: HeroBlock }) {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpenPopUp = () => setIsOpen(true)
  const handleClosePopUp = () => setIsOpen(false)
  const handleDownload = () => {
    console.log('download clicked')
  }

  const [isDownloadOpen, setIsDownloadOpen] = useState(false)
  const openDownload = () => setIsDownloadOpen(true)
  const closeDownload = () => setIsDownloadOpen(false)

  const ICON_MAP: Record<string, React.ReactNode> = {
    icon: <IconHero iconClass={s.icon} />,
  }

  const parts = block.title?.split(/(\{icon\})/g) || []
  return (
    <div className={s.section} id="main">
      <div className={s.heroWrap}>
        <div className={s.subtitle}>
          <span>{block.subtitle}</span>
        </div>
        <h1>
          {parts?.map((part, i) =>
            part === '{icon}' ? (
              <span key={i} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                {ICON_MAP.icon}
              </span>
            ) : (
              part
            ),
          )}
        </h1>
        <p dangerouslySetInnerHTML={{ __html: block.description || '' }} />
        <div className={s.wrapButtons}>
          <button className={s.firstButton} onClick={handleOpenPopUp}>
            <span>
              {iconFirst}
              {block.firstButton}
            </span>
          </button>
          <button className={s.lastButton} onClick={openDownload}>
            <span>
              {iconLast}
              {block.lastButton}
            </span>
          </button>
        </div>
      </div>
      <div className={s.iconsAds}>
        <svg
          width="1866"
          height="344"
          viewBox="0 0 1866 344"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.4"
            d="M1.29712 130.614C1.29712 130.614 69.5353 -10.3936 293.297 1.30645C517.059 13.0065 692.5 327.991 997 341.989C1301.5 355.986 1500 125.037 1660 111.037C1820 97.0375 1865 168.037 1865 168.037"
            stroke="url(#paint0_linear_3001_1077)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_3001_1077"
              x1="43"
              y1="0.995871"
              x2="1917"
              y2="183.472"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.015518" stopOpacity="0.2" />
              <stop offset="0.0965764" stopColor="#E4D7F9" />
              <stop offset="0.404553" stopColor="#D6CAEA" stopOpacity="0.95157" />
              <stop offset="0.769516" stopColor="#FFF6AE" />
              <stop offset="0.964975" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>

        <div className={s.iconsWrapper}>
          <Image
            src="/images/icons/meta.png"
            className="icon"
            alt="meta"
            width={100}
            height={100}
          />
          <Image src="/images/icons/in.png" className="icon" alt="in" width={100} height={100} />
          <Image
            src="/images/icons/adwords.png"
            className="icon"
            alt="adwords"
            width={100}
            height={100}
          />
          <Image
            src="/images/icons/tiktok.png"
            className="icon"
            alt="tiktok"
            width={100}
            height={100}
          />
        </div>
      </div>
      <PopUp isOpen={isOpen} onClose={handleClosePopUp} onDownload={handleDownload} />
      <GridBackground />
    </div>
  )
}

export const iconFirst = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
    <g clipPath="url(#clip0_1144_893)">
      <path
        d="M7.45669 2.11351C7.14735 1.34013 6.39833 0.833008 5.5654 0.833008H2.76376C1.69797 0.833008 0.833984 1.69681 0.833984 2.76262C0.833984 11.822 8.17811 19.1663 17.2373 19.1663C18.3031 19.1663 19.1668 18.3023 19.1668 17.2364L19.1673 14.4343C19.1673 13.6013 18.6603 12.8524 17.887 12.5431L15.2018 11.4693C14.5071 11.1915 13.7162 11.3165 13.1414 11.7955L12.4484 12.3735C11.639 13.048 10.4482 12.9944 9.70321 12.2494L7.75181 10.2961C7.00685 9.55115 6.9518 8.36123 7.62625 7.55186L8.20413 6.85887C8.68311 6.28408 8.80928 5.4929 8.53141 4.7982L7.45669 2.11351Z"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1144_893">
        <rect width="20" height="20" />
      </clipPath>
    </defs>
  </svg>
)

export const iconLast = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.9722 0.0656837C14.1681 -9.25951e-06 13.1677 0 11.8917 0H8.10831C6.83229 0 5.83189 -9.25951e-06 5.02785 0.0656837C4.2091 0.132577 3.53273 0.271051 2.92051 0.582986C1.91406 1.09579 1.09579 1.91406 0.582986 2.92051C0.271051 3.53273 0.132577 4.20911 0.0656837 5.02785C-9.25951e-06 5.83189 0 6.83229 0 8.10831V12.0728C0 14.3959 1.88317 16.2791 4.20619 16.2791H4.76596C4.99712 16.2791 5.15519 16.5125 5.06934 16.7272C4.43058 18.3241 6.26967 19.7677 7.66921 18.7681L10.0978 17.0334L10.1435 17.0008C10.803 16.5362 11.5887 16.2843 12.3954 16.2792L12.4515 16.2791H13.0987C14.5392 16.2792 15.418 16.2794 16.1562 16.063C17.9043 15.5504 19.2713 14.1833 19.7839 12.4352C20.0004 11.6971 20.0002 10.8184 20 9.37785V8.10829C20 6.8323 20 5.83188 19.9343 5.02785C19.8674 4.2091 19.7289 3.53273 19.417 2.92051C18.9042 1.91406 18.0859 1.09579 17.0794 0.582986C16.4672 0.271051 15.7909 0.132577 14.9722 0.0656837ZM3.55399 1.82625C3.93671 1.63125 4.40902 1.51624 5.14147 1.4564C5.88206 1.39589 6.82557 1.39535 8.13953 1.39535H11.8605C13.1744 1.39535 14.1179 1.39589 14.8585 1.4564C15.591 1.51624 16.0632 1.63125 16.446 1.82625C17.1899 2.20528 17.7947 2.81009 18.1738 3.55399C18.3687 3.93671 18.4837 4.40902 18.5436 5.14147C18.6041 5.88206 18.6046 6.82557 18.6046 8.13953V9.24111C18.6046 10.8615 18.5976 11.5221 18.4449 12.0426C18.066 13.3347 17.0556 14.3451 15.7635 14.724C15.2431 14.8766 14.5824 14.8837 12.962 14.8837H12.4515L12.3865 14.8838C11.2951 14.8908 10.2319 15.2315 9.33972 15.8602L6.85818 17.6326C6.59264 17.8223 6.24369 17.5484 6.36489 17.2454C6.81736 16.1142 5.98429 14.8837 4.76596 14.8837H4.20619C2.6538 14.8837 1.39535 13.6253 1.39535 12.0728V8.13953C1.39535 6.82557 1.39589 5.88206 1.4564 5.14147C1.51624 4.40902 1.63125 3.93671 1.82625 3.55399C2.20528 2.81009 2.81009 2.20528 3.55399 1.82625Z"
      fill="#222222"
    />
    <path
      d="M7.20812 8.13922C7.20812 8.65298 6.79164 9.06945 6.27789 9.06945C5.76414 9.06945 5.34766 8.65298 5.34766 8.13922C5.34766 7.62547 5.76414 7.20898 6.27789 7.20898C6.79164 7.20898 7.20812 7.62547 7.20812 8.13922Z"
      fill="#222222"
    />
    <path
      d="M10.9308 8.13922C10.9308 8.65298 10.5143 9.06945 10.0005 9.06945C9.48678 9.06945 9.07031 8.65298 9.07031 8.13922C9.07031 7.62547 9.48678 7.20898 10.0005 7.20898C10.5143 7.20898 10.9308 7.62547 10.9308 8.13922Z"
      fill="#222222"
    />
    <path
      d="M14.6515 8.13922C14.6515 8.65298 14.235 9.06945 13.7212 9.06945C13.2075 9.06945 12.791 8.65298 12.791 8.13922C12.791 7.62547 13.2075 7.20898 13.7212 7.20898C14.235 7.20898 14.6515 7.62547 14.6515 8.13922Z"
      fill="#222222"
    />
  </svg>
)
