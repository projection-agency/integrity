import Link from 'next/link'
import Image from 'next/image'
import s from './BlogSection.module.css'

export default function BlogPosts({ posts }: { posts: any[] | undefined }) {
  if (!posts) return null

  return (
    <div>
      {posts.map((post) => (
        <Link href={`/blog/${post.slug}`} key={post.id}>
          <Image
            src={post.featuredImage?.url}
            alt={post.title}
            width={100}
            height={100}
            className={s.image}
          />
          {post.title}
        </Link>
      ))}
    </div>
  )
}
