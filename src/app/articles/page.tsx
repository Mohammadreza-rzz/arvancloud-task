import { ArticleTable } from "@/ui/view"
import { cookies } from "next/headers"
import { getAllArticles } from "@/utils/api"
import { PaginateLayout } from "@/ui/view"

export default async function Articles() {
  const articlesData = await getAllArticles()
  const { articlesCount } = articlesData?.data
  console.log(articlesData, "aricledata")
  return (
    <main className='space-y-7'>
      <h1 className='text-heading_md text-black'>All Posts</h1>
      <ArticleTable />
      <PaginateLayout articlesCount={articlesCount} />
    </main>
  )
}
