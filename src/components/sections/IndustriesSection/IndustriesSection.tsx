import styles from './IndustriesSection.module.css'
import { IndustriesGrid } from './IndustriesGrid'
import { IndustriesHeader } from './IndustriesHeader'

type IndustriesSection = {
  subtitle: string
  title: string
}

export default function IndustriesSection({ block }: { block: IndustriesSection }) {
  return (
    <section className={styles.section}>
      <IndustriesHeader block={block} />
      <IndustriesGrid />
    </section>
  )
}
