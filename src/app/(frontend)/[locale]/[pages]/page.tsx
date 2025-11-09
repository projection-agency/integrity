// Варіант 1: Оновіть [pages]/page.tsx щоб він обробляв винятки

// src/app/(frontend)/[locale]/[pages]/page.tsx
import MainTitle from '@/components/ui/MainTitle/MainTitle'
import GridBackground from '@/components/GridBackground/GridBackground'
import React from 'react'
import { getPage } from '@/action/getPage'
import { RichText } from '@payloadcms/richtext-lexical/react'
import s from './styles.module.css'
import RichTextRenderer from '@/components/RichTextComponent/RichTextComponent'
import Image from 'next/image'
import { notFound, redirect } from 'next/navigation'

// Список винятків - сторінки які НЕ повинні оброблятися цим компонентом
const EXCLUDED_PAGES = ['contacts', 'legal-notice']

interface PageProps {
  params: Promise<{ locale: string; pages: string }>
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params
  const { pages: slug, locale } = resolvedParams

  // Перевіряємо чи це виняток
  if (EXCLUDED_PAGES.includes(slug)) {
    // Перенаправляємо на відповідну статичну сторінку
    redirect(`/${locale}/${slug}`)
  }

  const page = await getPage(slug, locale)

  // Якщо сторінка не знайдена, показуємо 404
  if (!page?.docs?.[0]) {
    notFound()
  }

  const data = page.docs[0]
  const simplePageBlock = data?.blocks?.find(
    (b: { blockType: string }) => b.blockType === 'simple-page',
  )

  function getTextFromNodes(nodes: any[]): string {
    return nodes
      .map((node) => {
        if (node.text) {
          return node.text
        }
        if (node.children && node.children.length > 0) {
          return getTextFromNodes(node.children)
        }
        return ''
      })
      .filter((text) => text.trim() !== '')
      .join(' ')
  }

  const excerptText = simplePageBlock?.excerpt?.root?.children
    ? getTextFromNodes(simplePageBlock.excerpt.root.children)
    : ''

  return (
    <div className={s.blog}>
      <div className={s.heroPage}>
        <div className={s.subtitle}>
          <span>{data?.title || ''}</span>
        </div>
        <MainTitle title={data?.description || ''} />
        <GridBackground />
      </div>
      <div className={s.content}>
        <h2 className={s.excerptTitle}>{excerptText}</h2>

        {simplePageBlock?.excerpt?.root?.children?.length > 0 && (
          <div className={s.excerpt}>
            <RichText data={simplePageBlock.excerpt.root.children} />
          </div>
        )}

        {simplePageBlock?.futured_image?.url && (
          <Image
            src={simplePageBlock.futured_image.url}
            alt={data?.title || ''}
            width={1000}
            height={1000}
            className={s.featuredImage}
          />
        )}

        <div className={s.articleCont}>
          <div className={s.articleWrapper}>
            {simplePageBlock?.content?.root?.children?.length > 0 && (
              <RichTextRenderer
                className={s.articleContent}
                data={simplePageBlock.content.root.children}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params
  const { pages: slug, locale } = resolvedParams

  // Для винятків повертаємо базові метадані
  if (EXCLUDED_PAGES.includes(slug)) {
    return {
      title: `${slug} - Default Title`,
      description: 'Default Description',
    }
  }

  const page = await getPage(slug, locale)
  const data = page?.docs[0]

  return {
    title: data?.title || 'Default Title',
    description: data?.description || 'Default Description',
  }
}