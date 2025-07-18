
type checkClickProps = {
  e: React.MouseEvent<HTMLElement>
  ids : {
    id_st_container: string
    id_preview_container: string
    id_fulltext_container: string
  }
}

export function checkClick({ e, ids }:checkClickProps) {
  const idList = [ids.id_preview_container, ids.id_fulltext_container]
  e.preventDefault()
  const element = e.currentTarget
  const type: string = element.getAttribute('data-id-container')!
  idList.forEach((id) => {
    const el = document.getElementById(id) as HTMLElement | null
    if (!el) return
    if (id === type) {
      el.style.display = 'flex'
    } else {
      el.style.display = 'none'
    }
  })
}