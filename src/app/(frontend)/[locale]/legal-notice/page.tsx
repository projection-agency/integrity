import React from 'react'
import { getLegalNoticeData } from '@/action/getLegalNoticeData'
import { getSinglePage } from '@/action/getPage'
import { Metadata } from 'next'
import PageInfo from '@/components/PageInfo/PageInfo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const page = await getSinglePage('legal-notice', locale)

  return {
    title: page?.meta?.title || 'Legal Notice',
    description: page?.meta?.description || '',
    openGraph: {
      title: page?.meta?.title || 'Legal Notice',
      description: page?.meta?.description || '',
    },
  }
}

export default async function LegalNoticePage({ params }: { params: Promise<{ locale: string }> }) {
  const { data, accordionBlock } = await getLegalNoticeData({ params })

  return <PageInfo data={data} accordionBlock={accordionBlock} />
}
