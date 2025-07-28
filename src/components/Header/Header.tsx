'use client'
import React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import s from './Header.module.css'
import LocaleSwitcher from './LocaleSwitcher'
import NavList, { MenuItem } from './NavList'
import MobileMenu from '../MobileMenu/MobileMenu'

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

export default function Header({
  menu,
  logo,
  buttonText,
}: {
  menu: MenuItem[]
  logo?: string
  buttonText?: string
}) {
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  const handleClose = () => {
    setMenuIsOpen(false)
  }
  return (
    <>
      <header className={s.header}>
        <Link className={s.logoHeader} href="/">
          <div dangerouslySetInnerHTML={{ __html: logo || '' }} />
        </Link>
        <NavList menu={menu} />
        <div className={s.left}>
          <LocaleSwitcher />
          <button className={s.btn}>
            {phone}
            {buttonText}
          </button>
        </div>
        <button onClick={() => setMenuIsOpen(true)}>{burger}</button>
      </header>
      <MobileMenu menuIsOpen={menuIsOpen} handleClose={handleClose} />
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
