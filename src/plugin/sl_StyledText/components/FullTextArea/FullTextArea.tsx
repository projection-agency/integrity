'use client'
import styles from './FullTextArea.module.css'

type FullTextAreaProps = {
  content: string
  onChange: (content: any) => void
  id: string
}
export default function FullTextArea({ content, onChange, id }: FullTextAreaProps) {
  return (
    <div className={styles.fulltext_container} id={id} style={{ display: 'none'}}>
      <textarea
        className={styles.fulltext_textarea}
        cols={60}
        rows={10}
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Введіть HTML-код тут..."
      />
    </div>
  )
}
