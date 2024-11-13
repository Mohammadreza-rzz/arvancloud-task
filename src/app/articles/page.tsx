import { ArticleTable, PaginateLayout } from "@/ui/view"
import { getAllArticles } from "@/utils/api"

export default async function Articles() {
  const articlesData = await getAllArticles()
  const { articlesCount, articles } = articlesData?.data ?? null
  return (
    <main className='space-y-7'>
      <h1 className='text-heading_md text-black'>All Posts</h1>
      <ArticleTable initialArticles={articles} />
      <PaginateLayout articlesCount={articlesCount} />
    </main>
  )
}
