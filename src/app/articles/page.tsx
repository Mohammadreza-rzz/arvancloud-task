"use client"
import { ArticleTable, PaginateLayout } from "@/ui/view"
import { useGetArticles } from "@/utils/api/apiQuery"
import LoadingUi from "@/ui/components/loadingUi"

export default function Articles() {
  const { data, isLoading }: any = useGetArticles(["articles"], "0", "10")

  const articlesCount = !!data ? data?.articlesCount : 0
  const articles = !!data ? data?.articles : []
  return (
    <main className='space-y-7'>
      {isLoading ? (
        <LoadingUi />
      ) : (
        <>
          <h1 className='text-heading_md text-black'>All Posts</h1>
          <ArticleTable initialArticles={articles} />
          <PaginateLayout articlesCount={articlesCount} />
        </>
      )}
    </main>
  )
}
