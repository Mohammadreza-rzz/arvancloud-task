import { ArticleTable } from "@/ui/view"
import { cookies } from "next/headers"
import { getAllArticles } from "@/utils/api"
import { PaginateLayout } from "@/ui/view"
import { redirect } from "next/navigation"

type ArticlePageProps = {
  params: {
    page: string
  }
}

export default async function Articles({ params }: ArticlePageProps) {
  const { page } = await params
  if (page === "1" || +page < 0) {
    redirect("/articles")
  }
  const offest = (+page - 1) * 10
  const articlesData = await getAllArticles(String(offest), "10")
  const { articlesCount } = articlesData?.data
  console.log(articlesCount, "articlesdata")

  return (
    <main className='space-y-7'>
      <h1 className='text-heading_md text-black'>All Posts</h1>
      <ArticleTable />
      <PaginateLayout articlesCount={articlesCount} initialPage={+page - 1} />
    </main>
  )
}
