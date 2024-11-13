"use client"

import { useRouter } from "next/navigation"
import React from "react"

import { CustomePagination } from "@/ui/components"

interface IProps {
  articlesCount: number
  pageSize?: number
  initialPage?: number
}

const PaginateLayout: React.FC<IProps> = ({
  articlesCount,
  pageSize = 10,
  initialPage = 0,
}) => {
  const router = useRouter()
  const onPageChange = (page: number) => {
    if (page <= 1) {
      router.push("/articles")
    } else {
      router.push(`/articles/page/${page}`)
    }
  }
  const pageCount = Math.floor(articlesCount / pageSize) + 1
  return (
    <div className='mt-6 w-full -translate-y-4 lg:translate-y-0'>
      <CustomePagination
        initialPage={initialPage}
        pageCount={pageCount}
        onPageChange={onPageChange}
      />
    </div>
  )
}
export default PaginateLayout
