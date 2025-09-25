import React from 'react'
import { getPolicyData } from '@/action/getPolicyData'
import { getSinglePage } from '@/action/getPage'
import { Metadata } from 'next'
import PageInfo from '@/components/PageInfo/PageInfo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const page = await getSinglePage('privacy', locale)

  return {
    title: page?.meta?.title || 'Privacy',
    description: page?.meta?.description || '',
    openGraph: {
      title: page?.meta?.title || 'Privacy',
      description: page?.meta?.description || '',
    },
  }
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { data, accordionBlock } = await getPolicyData({ params })

  return <PageInfo data={data} accordionBlock={accordionBlock} />
}
