import s from './TariffsSection.module.css'
import TabSection from '@/components/ui/TabSection/TabSection'
import MainTitle from '@/components/ui/MainTitle/MainTitle'
import TariffItem from '@/components/TariffItem/TariffItem'

export type tariffItem = {
  description: string
  id: string
  name_tariff: string
  result: { points: string; id: string }[]
  title: string
  whats_included: []
}

type TariffsSection = {
  subtitle: string
  title: string
  tariff: tariffItem[]
}

export default async function TariffsSection({ block }: { block: TariffsSection }) {
  return (
    <section className={s.section}>
      <div className={s.topBlock}>
        <TabSection style="dark" text={block.subtitle} />
        <MainTitle title={block.title} />
      </div>
      <div className={s.tariffsList}>
        {block.tariff.map((item, idx) => {
          return <TariffItem key={idx} item={item} index={idx} />
        })}
      </div>
    </section>
  )
}
