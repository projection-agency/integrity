import React from 'react'
import s from './MainTitle.module.css'

const MainTitle = ({ title }: { title: string }) => {
  return <h2 className={s.mainTitle} dangerouslySetInnerHTML={{ __html: title }} />
}

export default MainTitle
