import { checkClick } from './checkClick'
import styles from './ButtonSwitch.module.css'

type BtnProps = {
  name: string
  data_id_container: string
  isActive: boolean
  onClick: (id: string) => void
  ids : {
    id_st_container: string
    id_preview_container: string
    id_fulltext_container: string
  }
}

export default function ButtonSwitch({ name, data_id_container, isActive, onClick ,ids }: BtnProps) {
  return (
    <input
      type={'button'}
      data-id-container={data_id_container}
      onClick={(e: React.MouseEvent<HTMLInputElement>) => {
        onClick(data_id_container)
        checkClick({ e, ids })
      }}
      className={`${styles.btn_switch} ${isActive ? styles.btn_active : ''}`}
      value={name}
    />
  )
}
