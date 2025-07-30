'use client'
import { useEffect } from 'react'
import s from './ArticleNavItem.module.css'
import { useState } from 'react'

export default function ArticleNavItem({ item }: { item: { id: string; text: string } }) {
  const [currentHash, setCurrentHash] = useState<string>(window.location.hash)

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash)
    }

    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])
  return (
    <li className={`${s.item} ${currentHash === `#${item.id}` ? s.active : ''}`}>
      <a
        href={`#${item.id}`}
        onClick={(e) => {
          const element = document.getElementById(item.id)
          const yOffset = window.innerWidth * 0.7
          console.log(yOffset)
          if (element) {
            const y = element?.getBoundingClientRect().top + window.scrollY - yOffset
            window.scrollTo({
              top: y,
              behavior: 'smooth',
            })
          }
        }}
      >
        {item.text}
      </a>
    </li>
  )
}
