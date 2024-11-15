"use client"
import { ArticleTable, PaginateLayout } from "@/ui/view"
import { useGetArticles } from "@/utils/api/apiQuery"
import LoadingUi from "@/ui/components/loadingUi"
import {
  useProtectRoute,
  useIsClient,
  useLogOutOnLocalStorageChange,
} from "@/hook"

export default function Articles() {
  useProtectRoute()
  useLogOutOnLocalStorageChange()
  const isClient = useIsClient()
  const { data, refetch, isFetching }: any = useGetArticles(
    ["articles"],
    "0",
    "10",
  )

  const articlesCount = !!data ? data?.articlesCount : 0
  const articles = !!data ? data?.articles : []

  return (
    <>
      {isClient ? (
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
      ) : (
        ""
      )}
    </>
  )
}
