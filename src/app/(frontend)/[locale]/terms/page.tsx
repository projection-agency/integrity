import React from 'react'
import { getTermsData } from '@/action/getTermsData'
import { getSinglePage } from '@/action/getPage'
import { Metadata } from 'next'
import PageInfo from '@/components/PageInfo/PageInfo'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSinglePage('terms')

  return {
    title: page?.meta?.title || 'Terms',
    description: page?.meta?.description || '',
    openGraph: {
      title: page?.meta?.title || 'Terms',
      description: page?.meta?.description || '',
    },
  }
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { data, accordionBlock } = await getTermsData({ params })

  return <PageInfo data={data} accordionBlock={accordionBlock} />
}
