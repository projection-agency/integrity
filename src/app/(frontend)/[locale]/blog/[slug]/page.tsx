import { getPostsWithSlug } from '@/action/getPostWithSlug'
import { notFound } from 'next/navigation'
import s from './page.module.css'
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'

function formatDate(isoDate: string) {
  const date = new Date(isoDate)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()

  return `${day}.${month}.${year}`
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const post = await getPostsWithSlug(slug, locale)

  if (!post) {
    return notFound()
  }

  return (
    <div className={s.blog}>
      <div className={s.heroPage}>
        <div className={s.subtitle}>
          <span>Article</span>
        </div>
        <h1>{post[0].title}</h1>
        <div className={s.insightCardMeta}>
          <div className={s.insightCardMetaItem}>
            <Image src="/images/icons/revised-card.svg" alt="revised card" width={16} height={16} />
            {post[0].readingTime} minutes reading
          </div>
          <div className={s.insightCardMetaItem}>
            <Image src="/images/icons/calendar.svg" alt="calendar" width={16} height={16} />
            {formatDate(post[0].createdAt)}
          </div>
        </div>
      </div>
      {post[0].excerptTitle && <h2>{post[0].excerptTitle}</h2>}
      {post[0].excerpt && (
        <div className={s.excerpt}>
          <RichText data={post[0].excerpt} />
        </div>
      )}
      {post[0].featuredImage &&
        typeof post[0].featuredImage === 'object' &&
        post[0].featuredImage.url && (
          <Image
            src={post[0].featuredImage.url}
            alt={post[0].title as string}
            width={1000}
            height={1000}
            className={s.featuredImage}
          />
        )}
      {post[0].content && <RichText data={post[0].content} />}
    </div>
  )
}
