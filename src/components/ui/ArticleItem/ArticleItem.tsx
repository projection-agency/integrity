import Link from 'next/link'
import s from './ArticleItem.module.css'
import Image from 'next/image'

function formatDate(isoDate: string) {
  const date = new Date(isoDate)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()

  return `${day}.${month}.${year}`
}

export default function ArticleItem({
  post,
  idx,
  style,
}: {
  post: any
  idx: number
  style?: 'small'
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`${s.insightCard} ${style === 'small' ? s.small : ''}`}
      key={idx}
    >
      <Image
        className={s.insightCardImage}
        src={post.featuredImage.url}
        alt={post.title}
        width={400}
        height={300}
      />
      <div className={s.insightCardBadge}>News</div>
      <div className={s.insightCardMeta}>
        <div className={s.insightCardMetaItem}>
          <Image src="/images/icons/revised-card.svg" alt="revised card" width={16} height={16} />
          {post.readingTime} minutes reading
        </div>
        <div className={s.insightCardMetaItem}>
          <Image src="/images/icons/calendar.svg" alt="calendar" width={16} height={16} />
          {formatDate(post.createdAt)}
        </div>
      </div>
      <div className={s.insightCardTitle}>{post.title}</div>
      <div className={s.insightCardExcerpt}>{post.title}</div>
      <button className={s.insightCardBtn}>
        <Image
          src="/images/icons/revised-card2.svg"
          alt="revised card"
          className={s.readMoreIcon}
          width={16}
          height={16}
        />
        <span className={s.readMoreText}>Read more</span>
      </button>
    </Link>
  )
}
