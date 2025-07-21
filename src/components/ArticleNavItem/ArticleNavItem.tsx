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

    console.log(window.location.hash === `#${item.id}`)
    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])
  return (
    <li className={`${s.item} ${currentHash === `#${item.id}` ? s.active : ''}`}>
      <a href={`#${item.id}`}>{item.text}</a>
    </li>
  )
}
