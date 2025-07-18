'use client'
import styles from './ST_Header.module.css'
import ButtonSwitch from '@/plugin/sl_StyledText/components/Buttons/ButtonSwitch/ButtonSwitch'
import { useEffect, useState } from 'react'
import ButtonItalic from '@/plugin/sl_StyledText/components/Buttons/ButtonItalic/ButtonItalic'
import ButtonBold from '@/plugin/sl_StyledText/components/Buttons/ButtonBold/ButtonBold'
import ButtonColor from '@/plugin/sl_StyledText/components/Buttons/ButtonColor/ButtonColor'


type ST_HeaderProps = {
  text: string
  setText: (val: string) => void
  ids : {
    id_st_container: string
    id_preview_container: string
    id_fulltext_container: string
  }
}

export default function ST_Header({ text, setText, ids}: ST_HeaderProps) {
  const [activeId, setActiveId] = useState(ids.id_preview_container)

  const handleClick = (id: string) => {
    setActiveId(id)
  }
  return (
    <div className={styles.st_header}>
      <div className={styles.st_header_action_container}>
        <ButtonItalic content={text} onChange={setText} ids={ids}/>
        <ButtonBold content={text} onChange={setText} ids={ids} />
        <ButtonColor content={text} onChange={setText} ids={ids }/>
      </div>
      <div className={styles.st_header_switch_container}>
        <ButtonSwitch
          name="Preview"
          data_id_container={ids.id_preview_container}
          isActive={activeId === ids.id_preview_container}
          onClick={handleClick}
          ids={ids}
        />
        <ButtonSwitch
          name="Full text"
          data_id_container={ids.id_fulltext_container}
          isActive={activeId === ids.id_fulltext_container}
          onClick={handleClick}
          ids={ids}
        />
      </div>
    </div>
  )
}
