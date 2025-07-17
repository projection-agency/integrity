import s from './BlogSection.module.css'
import ArticleItem from '@/components/ui/ArticleItem/ArticleItem'
import FilterBlog from './FilterBlog'

type Category = {
  id: string
  name: string
  count: number
}

export default function BlogPosts({
  posts,
  categories,
}: {
  posts: any[] | undefined
  categories: Category[]
}) {
  if (!posts) return null

  return (
    <div className={s.blogSection}>
      <FilterBlog categories={categories} />
      <div className={s.items}>
        {posts.map((post, index) => (
          <ArticleItem key={post.id} post={post} idx={index} />
        ))}
      </div>
    </div>
  )
}
