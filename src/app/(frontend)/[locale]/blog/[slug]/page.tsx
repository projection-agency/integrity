import { getPostsWithSlug } from '@/action/getPostWithSlug'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { extractHeadingsFromRichText } from '@/components/RichTextComponent/extractHeadingsFromRichText'
import s from './page.module.css'
import Image from 'next/image'
import Link from 'next/link'
import RichTextRenderer from '@/components/RichTextComponent/RichTextComponent'
import { injectHeadingIds } from '@/components/RichTextComponent/injectHeadingIds'
import ArticleNavItem from '@/components/ArticleNavItem/ArticleNavItem'
import SimilarArticlesSectionServer from '@/components/sections/SimilarArticlesSection'
import ExpertSection from '@/components/sections/ExpertSection/ExpertSection'
import { Metadata } from 'next'
import { getPostsWithFilter } from '@/action/getPostsWithFilter'
import GridBackground from '@/components/GridBackground/GridBackground'
import { SocialSharing } from '@/components/SocialSharing/SocialSharing'
import { getMessages } from 'next-intl/server'
import { getBlogPageData } from '@/action/getBlogPageData'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { slug, locale } = await params
  const pagePost = await getPostsWithSlug(slug, locale)

  if (!pagePost || !pagePost[0]) {
    return notFound()
  }

  return {
    title: pagePost[0]?.meta?.title || 'Blog',
    description: pagePost[0]?.meta?.description || '',
    openGraph: {
      title: pagePost[0]?.meta?.title || 'Blog',
      description: pagePost[0]?.meta?.description || '',
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const messages = await getMessages({ locale })
  const post = await getPostsWithSlug(slug, locale)

  const { page:blog } = await getBlogPageData(locale)
  const blogRedirect = blog.blocks?.find(
    (b: { blockType: string }) => b.blockType === 'order-call-block',
  )

  const fetched = await getPostsWithFilter('all')

  if (!post) {
    return notFound()
  }
  if (!post?.length || !post[0]?.content?.root?.children) {
    return notFound()
  }

  const contentWithIds = injectHeadingIds(post[0].content.root.children)
  const headingsId = extractHeadingsFromRichText(contentWithIds)

  return (
    <div className={s.blog}>
      <div className={s.heroPage}>
        <GridBackground />
        <div className={s.subtitle}>
          <span>{messages.BlogPostPage.article}</span>
        </div>
        <h1>{post[0].title}</h1>
        <div className={s.insightCardMeta}>
          <div className={s.insightCardMetaItem}>
            <Image src="/images/icons/revised-card.svg" alt="revised card" width={16} height={16} />
            {post[0].readingTime} {messages.BlogPostPage.minutesReading}
          </div>
          <div className={s.insightCardMetaItem}>
            <Image src="/images/icons/calendar.svg" alt="calendar" width={16} height={16} />
            {new Date(post[0].createdAt).toLocaleDateString(locale === 'ua' ? 'uk-UA' : 'en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}
          </div>
        </div>
      </div>
      <div className={s.content}>
        {post[0].excerptTitle && <h2 className={s.excerptTitle}>{post[0].excerptTitle}</h2>}
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
        <div className={s.articleCont}>
          <div className={s.articleWrapper}>
            {post[0].content && (
              <RichTextRenderer className={s.articleContent} data={contentWithIds} />
            )}

            <div className={s.socialsCont}>
              <Link href={'/blog'}>
                <span>{arrow}</span>
                {messages.BlogPostPage.backToBlog}
              </Link>
              <SocialSharing
                title={post[0].title as string}
                url={`https://www.integritymarketing.systems/${locale}/blog/${slug}`}
              />
            </div>
          </div>

          <div className={s.articleNav}>
            <h3>
              <span>{articleNavIcon}</span>
              {messages.BlogPostPage.articleContent}
            </h3>
            <nav>
              <ul>
                {headingsId.map((h, idx) => {
                  return <ArticleNavItem key={idx} item={h} />
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <div className={s.similarArticlesCont}>
        <SimilarArticlesSectionServer />
      </div>
      <div className={s.expertSectionCont}>
        <ExpertSection block={blogRedirect} />
      </div>
    </div>
  )
}

const arrow = (
  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="16" viewBox="0 0 21 16" fill="none">
    <path
      d="M19.5 7C20.0523 7 20.5 7.44772 20.5 8C20.5 8.55228 20.0523 9 19.5 9V7ZM0.792892 8.70711C0.402369 8.31658 0.402369 7.68342 0.792892 7.29289L7.15685 0.928932C7.54738 0.538408 8.18054 0.538408 8.57107 0.928932C8.96159 1.31946 8.96159 1.95262 8.57107 2.34315L2.91421 8L8.57107 13.6569C8.96159 14.0474 8.96159 14.6805 8.57107 15.0711C8.18054 15.4616 7.54738 15.4616 7.15685 15.0711L0.792892 8.70711ZM19.5 8V9H1.5V8V7H19.5V8Z"
      fill="#F9F9F9"
    />
  </svg>
)

const articleNavIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="29" height="28" viewBox="0 0 29 28" fill="none">
    <g clipPath="url(#clip0_1245_11545)">
      <path
        d="M21.4775 20.7065C21.3662 20.8152 21.255 20.9239 21.1437 20.9783L17.1373 22.7174C16.9704 22.7717 16.8591 22.8261 16.6922 22.8261C16.6366 22.8261 16.6366 22.8261 16.5809 22.8261C16.1914 22.8261 15.8576 22.8261 15.468 22.8261C12.8528 22.8261 10.2932 22.8261 7.67799 22.8261C6.62076 22.8261 6.62076 21.1957 7.67799 21.1957H8.79085H15.7463L16.9148 17.337C16.9704 17.1739 17.0261 17.0652 17.1373 16.9565L22.1452 11.4674L23.8145 9.61957V7.66305C23.8145 7.6087 23.8145 7.55435 23.8145 7.5H22.1452H17.7494C16.7478 7.5 15.9688 6.68478 15.9688 5.76087V1.63043V0H3.22652C1.72415 0 0.5 1.19565 0.5 2.66304V23.587C0.5 25.0544 1.72415 26.25 3.22652 26.25H21.0324C22.5347 26.25 23.7589 25.0544 23.7589 23.587V18.2065L22.0896 20.0543L21.4775 20.7065ZM15.8019 17.2826C15.468 17.2826 15.1342 17.2826 14.8003 17.2826C12.4077 17.2826 10.0706 17.2826 7.67799 17.2826C6.62076 17.2826 6.62076 15.6522 7.67799 15.6522H8.67956H15.8019C16.8591 15.6522 16.8591 17.2826 15.8019 17.2826ZM16.5809 10.7065C17.6381 10.7065 17.6381 12.337 16.5809 12.337C16.1914 12.337 15.8576 12.337 15.468 12.337C12.8528 12.337 10.2932 12.337 7.67799 12.337C6.62076 12.337 6.62076 10.7065 7.67799 10.7065H8.79085H16.5809Z"
        fill="url(#paint0_linear_1245_11545)"
      />
      <path
        d="M17.582 5.76036C17.582 5.81471 17.6377 5.86906 17.6933 5.86906H20.6981H23.0351C23.0351 5.81471 22.9794 5.81471 22.9794 5.76036L17.8602 0.76036C17.8046 0.706013 17.6933 0.597317 17.582 0.542969V2.82558V5.76036Z"
        fill="url(#paint1_linear_1245_11545)"
      />
      <path
        d="M26.0742 9.51367L26.6627 8.86061L28.5013 10.4413L27.9129 11.0944L26.0742 9.51367Z"
        fill="url(#paint2_linear_1245_11545)"
      />
      <path
        d="M18.8594 17.4462L20.7512 19.0766L26.8164 12.3375L24.9801 10.707L18.8594 17.4462Z"
        fill="url(#paint3_linear_1245_11545)"
      />
      <path
        d="M17.582 20.7069L19.307 20.0004L18.1385 18.9678L17.582 20.7069Z"
        fill="url(#paint4_linear_1245_11545)"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_1245_11545"
        x1="1.19239"
        y1="-5.45128"
        x2="31.3096"
        y2="-1.05402"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#737373" />
        <stop offset="0.255809" stopColor="#222222" />
        <stop offset="0.429644" stopColor="#737373" />
        <stop offset="0.523944" stopColor="#222222" />
        <stop offset="0.784245" stopColor="#222222" />
        <stop offset="1" stopColor="#737373" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_1245_11545"
        x1="17.744"
        y1="-0.563088"
        x2="24.7401"
        y2="0.614399"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#737373" />
        <stop offset="0.255809" stopColor="#222222" />
        <stop offset="0.429644" stopColor="#737373" />
        <stop offset="0.523944" stopColor="#222222" />
        <stop offset="0.784245" stopColor="#222222" />
        <stop offset="1" stopColor="#737373" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_1245_11545"
        x1="25.7099"
        y1="9.16602"
        x2="26.5165"
        y2="8.33371"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#737373" />
        <stop offset="0.255809" stopColor="#222222" />
        <stop offset="0.429644" stopColor="#737373" />
        <stop offset="0.523944" stopColor="#222222" />
        <stop offset="0.784245" stopColor="#222222" />
        <stop offset="1" stopColor="#737373" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_1245_11545"
        x1="19.0957"
        y1="8.96894"
        x2="29.3432"
        y2="10.5705"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#737373" />
        <stop offset="0.255809" stopColor="#222222" />
        <stop offset="0.429644" stopColor="#737373" />
        <stop offset="0.523944" stopColor="#222222" />
        <stop offset="0.784245" stopColor="#222222" />
        <stop offset="1" stopColor="#737373" />
      </linearGradient>
      <linearGradient
        id="paint4_linear_1245_11545"
        x1="17.6333"
        y1="18.6066"
        x2="19.8501"
        y2="18.9681"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#737373" />
        <stop offset="0.255809" stopColor="#222222" />
        <stop offset="0.429644" stopColor="#737373" />
        <stop offset="0.523944" stopColor="#222222" />
        <stop offset="0.784245" stopColor="#222222" />
        <stop offset="1" stopColor="#737373" />
      </linearGradient>
      <clipPath id="clip0_1245_11545">
        <rect width="28" height="28" fill="white" transform="translate(0.5)" />
      </clipPath>
    </defs>
  </svg>
)
