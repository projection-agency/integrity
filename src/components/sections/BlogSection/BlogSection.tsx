'use client'
import s from './BlogSection.module.css'
import ArticleItem from '@/components/ui/ArticleItem/ArticleItem'
import FilterBlog from './FilterBlog'
import { useState, useEffect } from 'react'

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
  const [postData, setPostData] = useState<any[] | undefined>(undefined)

  useEffect(() => {
    setPostData(posts)
  }, [posts])
  return (
    <div className={s.blogSection}>
      <FilterBlog categories={categories} setPostData={setPostData} />
      {postData ? (
        <div className={s.items}>
          {postData.map((post, index) => {
            return <ArticleItem key={post.id} post={post} idx={index} />
          })}
        </div>
      ) : (
        <div className={s.loaderWrapper}>Loading...</div>
      )}
    </div>
  )
}
