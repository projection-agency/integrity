import TabSection from '@/components/ui/TabSection/TabSection'
import MainTitle from '@/components/ui/MainTitle/MainTitle'
import s from './FaqSection.module.css'
import ClientAccordion from '@/components/ui/Accordion/Accordion'

type FaqSection = {
  title: string
  subtitle: string
}

type Faqs = {
  docs: {
    id: string
    question: string
    answer: string
  }[]
}

export default async function FaqSection({
  block,
  faqs,
}: {
  block: FaqSection
  locale: string
  faqs: Faqs
}) {
  return (
    <section className={s.section}>
      <div className={s.topBlock}>
        <TabSection text={block.subtitle} style="white" />
        <MainTitle title={block.title} />
      </div>
      <div className={s.accordionCont}>
        <ClientAccordion items={faqs.docs} />
      </div>
    </section>
  )
}
