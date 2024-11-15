"use client"
import { ArticleTable, PaginateLayout } from "@/ui/view"
import { useGetArticles } from "@/utils/api/apiQuery"
import LoadingUi from "@/ui/components/loadingUi"
import { useEffect } from "react"

export default function Articles() {
  const { data, isLoading, refetch, isFetching }: any = useGetArticles(
    ["articles"],
    "0",
    "10",
  )

  const articlesCount = !!data ? data?.articlesCount : 0
  const articles = !!data ? data?.articles : []

  console.log("data", data, "fdataaaaa", isFetching)
  return (
    <main className='space-y-7'>
      {isFetching ? (
        <LoadingUi />
      ) : (
        <>
          <h1 className='text-heading_md text-black'>All Posts</h1>
          <ArticleTable refetch={refetch} initialArticles={articles} />
          <PaginateLayout articlesCount={articlesCount} />
        </>
      )}
    </main>
  )
}
