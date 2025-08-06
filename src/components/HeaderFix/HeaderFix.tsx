'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Link from 'next/link'
import s from './HeaderFix.module.css'
import LocaleSwitcher from '../Header/LocaleSwitcher'
import NavList, { MenuItem } from '../Header/NavList'
import MobileMenu from '../MobileMenu/MobileMenu'

export default function HeaderFix({ menu, buttonText }: { menu: MenuItem[]; buttonText?: string }) {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const [isFixed, setIsFixed] = useState(false)

  const handleClose = () => {
    setMenuIsOpen(false)
  }

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setIsFixed(window.scrollY > 700)
    })
  }, [])

  return (
    <>
      <header className={`${s.header} ${isFixed ? s.fixed : ''}`}>
        <Link className={s.logoHeader} href="/">
          {logo}
        </Link>
        <NavList menu={menu} handleClose={handleClose} />
        <div className={s.left}>
          <LocaleSwitcher className={s.localeSwitcher} />
          <Link className={s.btn} href="#call">
            <span>
              {phone}
              {buttonText}
            </span>
          </Link>
        </div>
        <button className={s.mobMenuBtn} onClick={() => setMenuIsOpen(true)}>
          {burger}
        </button>
      </header>
      <MobileMenu menuIsOpen={menuIsOpen} handleClose={handleClose} menu={menu} />
    </>
  )
}

const burger = (
  <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="2" rx="1" fill="white" />
    <rect x="4" y="6" width="16" height="2" rx="1" fill="white" />
    <rect y="12" width="20" height="2" rx="1" fill="white" />
  </svg>
)

const phone = (
  <svg
    className={s.iconButton}
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <g clipPath="url(#clip0_1037_1472)">
      <path
        d="M7.45669 2.11351C7.14735 1.34013 6.39833 0.833008 5.5654 0.833008H2.76376C1.69797 0.833008 0.833984 1.69681 0.833984 2.76262C0.833984 11.822 8.17811 19.1663 17.2373 19.1663C18.3031 19.1663 19.1668 18.3023 19.1668 17.2364L19.1673 14.4343C19.1673 13.6013 18.6603 12.8524 17.887 12.5431L15.2018 11.4693C14.5071 11.1915 13.7162 11.3165 13.1414 11.7955L12.4484 12.3735C11.639 13.048 10.4482 12.9944 9.70321 12.2494L7.75181 10.2961C7.00685 9.55115 6.9518 8.36123 7.62625 7.55186L8.20413 6.85887C8.68311 6.28408 8.80928 5.4929 8.53141 4.7982L7.45669 2.11351Z"
        stroke="#222222"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1037_1472">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

const logo = (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_1660_1743)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M29.7411 2.6795L19.731 0L9.72098 2.6795L2.39313 10L-0.289062 20L2.39313 30L9.72098 37.3205L19.731 40L29.7411 37.3205L37.0689 30L39.7511 20L37.0689 10L29.7411 2.6795ZM28.8973 4.0613L19.7024 1.6L10.5075 4.0613L3.77632 10.7857L1.31254 19.9714L3.77632 29.1571L10.5075 35.8815L19.7024 38.3428L28.8973 35.8815L35.6285 29.1571L38.0923 19.9714L35.6285 10.7857L28.8973 4.0613Z"
        fill="white"
      />
      <path
        d="M11.648 20.8594C10.6666 20.858 9.87109 21.6517 9.87109 22.632L11.1763 22.6338C12.1577 22.6352 12.9533 21.8414 12.9533 20.861L11.648 20.8594Z"
        fill="white"
      />
      <path
        d="M30.1207 22.5206C29.1393 22.522 28.3438 21.7283 28.3438 20.7479L29.649 20.7461C30.6304 20.7448 31.426 21.5386 31.426 22.5189L30.1207 22.5206Z"
        fill="white"
      />
      <path
        d="M20.2998 9.00692C19.5935 8.30326 19.5927 7.16163 20.298 6.45703L21.2374 7.39296C21.9435 8.09662 21.9443 9.23825 21.239 9.94285L20.2998 9.00692Z"
        fill="white"
      />
      <path
        d="M18.0781 10.0857L20.4805 12.4857L18.9075 14.0571L19.8799 15.0286L23.2833 11.6286L24.3416 10.6286H22.3396L21.4529 11.5143L19.0505 9.11426L18.0781 10.0857Z"
        fill="white"
      />
      <path
        d="M13.4722 10.1143L20.5649 17.2L19.5925 18.1714L11.5273 10.1143H13.4722Z"
        fill="white"
      />
      <path
        d="M11.2143 14.4863L14.9038 18.172L16.5054 16.572L17.4778 17.5434L15.8762 19.1434L18.9649 22.2577V24.2291L16.7342 21.9434L14.9038 23.772H12.9589L15.7617 20.972L9.26953 14.4863H11.2143Z"
        fill="white"
      />
      <path
        d="M18.9648 33.4289V18.8003L27.1445 10.6289H29.032L20.3376 19.3147V33.4289H18.9648Z"
        fill="white"
      />
      <path
        d="M23.5134 18.5715H25.1723L28.3182 15.4287H30.263L27.117 18.5715H31.7503V19.9429H22.1406L23.5134 18.5715Z"
        fill="white"
      />
      <path d="M20.34 21.543H27.7187L26.3459 22.9145H20.3398L20.34 21.543Z" fill="white" />
      <path d="M11.595 18.5703H6.94922L8.32202 19.9417H12.9677L11.595 18.5703Z" fill="white" />
      <path d="M21.3157 24.5693L20.3398 25.5498V27.4853L23.2571 24.5693H21.3157Z" fill="white" />
      <path
        d="M7.74219 33.4287H31.6742L29.0244 36.1144L19.7094 38.6287L10.3971 36.0915L7.74219 33.4287Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_1660_1743">
        <rect width="40" height="40" fill="white" />
      </clipPath>
    </defs>
  </svg>
)
