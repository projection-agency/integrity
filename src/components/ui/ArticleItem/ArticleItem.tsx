import Link from 'next/link'
import AnimatedLink from '@/components/AnimatedLink/AnimatedLinkWrapper'
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
    <AnimatedLink
      href={`/blog/${post.slug}`}
      className={`${s.insightCard} ${style === 'small' ? s.small : ''}`}
      key={idx}
    >
      <div className={s.insightCardImageBlock}>
        <Image
          className={s.insightCardImage}
          src={post.featuredImage?.url || '/images/blog/blog-placeholder.png'}
          alt={post.title}
          width={400}
          height={300}
        />
      </div>

      <div className={s.insightCardBadge}>
        <span className={s.insightCardText}>News</span>
      </div>
      {/* <div className={s.insightCardMetaBlock}> */}
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
      {/* </div> */}

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
    </AnimatedLink>
  )
}

const btnIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8.55339 18.2969C8.55339 18.6852 8.2413 19 7.85622 19H4.78868C3.25096 19 2 17.7384 2 16.1875V3.8125C2 2.26164 3.25096 1 4.78868 1H13.36C14.8976 1 16.1487 2.26164 16.1487 3.8125V10.5273C16.1487 10.9157 15.8365 11.2305 15.4516 11.2305C15.0665 11.2305 14.7544 10.9157 14.7544 10.5273V3.8125C14.7544 3.03714 14.1288 2.40625 13.36 2.40625H4.78868C4.01988 2.40625 3.39434 3.03714 3.39434 3.8125V16.1875C3.39434 16.9629 4.01988 17.5938 4.78868 17.5938H7.85622C8.2413 17.5938 8.55339 17.9085 8.55339 18.2969ZM12.6629 5.21875H5.48203C5.09696 5.21875 4.78486 5.53351 4.78486 5.92188C4.78486 6.31024 5.09696 6.625 5.48203 6.625H12.6629C13.0478 6.625 13.36 6.31024 13.36 5.92188C13.36 5.53351 13.0478 5.21875 12.6629 5.21875ZM13.36 8.73438C13.36 8.34601 13.0478 8.03125 12.6629 8.03125H5.48203C5.09696 8.03125 4.78486 8.34601 4.78486 8.73438C4.78486 9.12274 5.09696 9.4375 5.48203 9.4375H12.6629C13.0478 9.4375 13.36 9.12274 13.36 8.73438ZM5.48203 10.8438C5.09696 10.8438 4.78486 11.1585 4.78486 11.5469C4.78486 11.9352 5.09696 12.25 5.48203 12.25H9.14598C9.53106 12.25 9.84315 11.9352 9.84315 11.5469C9.84315 11.1585 9.53106 10.8438 9.14598 10.8438H5.48203ZM17.8733 15.994C17.8488 16.0293 17.7647 16.1492 17.7126 16.2155C17.4791 16.5117 16.9325 17.2051 16.172 17.8172C15.1969 18.602 14.1935 19 13.1896 19C12.1856 19 11.1822 18.602 10.2071 17.8172C9.44664 17.2051 8.90007 16.5116 8.66668 16.2155C8.61439 16.1492 8.53038 16.0292 8.50587 15.994C8.33689 15.7515 8.33689 15.4281 8.50587 15.1855C8.53038 15.1504 8.61439 15.0304 8.66668 14.964C8.90007 14.668 9.44664 13.9746 10.2071 13.3625C11.1822 12.5777 12.1856 12.1797 13.1896 12.1797C14.1935 12.1797 15.1969 12.5777 16.172 13.3625C16.9325 13.9746 17.4791 14.6681 17.7125 14.9642C17.7647 15.0305 17.8488 15.1505 17.8733 15.1857C18.0422 15.4282 18.0422 15.7515 17.8733 15.994ZM16.419 15.5898C15.3105 14.2598 14.2251 13.5859 13.1896 13.5859C12.1542 13.5859 11.0686 14.2597 9.96012 15.5898C11.0686 16.9199 12.154 17.5938 13.1896 17.5938C14.2251 17.5938 15.3105 16.92 16.419 15.5898ZM13.2244 14.2539C12.4928 14.2539 11.8998 14.852 11.8998 15.5898C11.8998 16.3277 12.4928 16.9258 13.2244 16.9258C13.956 16.9258 14.549 16.3277 14.549 15.5898C14.549 14.852 13.956 14.2539 13.2244 14.2539Z"
      fill="#222222"
    />
  </svg>
)
