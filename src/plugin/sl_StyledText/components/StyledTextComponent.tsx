'use client'
import styles from './StyledTextComponent.module.css'
import './st_styles.css'
import ST_Header from '@/plugin/sl_StyledText/components/ST_Header/ST_Header'
import PreviewArea from '@/plugin/sl_StyledText/components/PreviewArea/PreviewArea'
import FullTextArea from '@/plugin/sl_StyledText/components/FullTextArea/FullTextArea'
import { useField } from '@payloadcms/ui'

export default function StyledTextComponent(props: any) {
  const { path,  field} = props
  console.log(props)
  const ids = {
    id_st_container: `st_container_${path}`,
    id_preview_container: `preview_container_${path}`,
    id_fulltext_container: `fulltext_container_${path}`,
  }
  const { value: raw, setValue } = useField({ path })
  const value = typeof raw === 'string' ? raw : ''
  const setContent = (content: string) => {
    setValue(content)
  }

  return (
    <div className={styles.st_container} id={ids.id_st_container}>
      <div className={styles.st_container_title}>{
        field.label.en ? field.label.en : field.label.uk  || field.label
      }</div>
      <ST_Header text={value} setText={setContent} ids={ids} />
      <PreviewArea content={value} onChange={setContent} id={ids.id_preview_container} />
      <FullTextArea content={value} onChange={setContent} id={ids.id_fulltext_container} />
    </div>
  )
}
