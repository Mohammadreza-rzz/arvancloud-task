import React from "react"
import { articlesFormatter } from "@/utils/formatter"

import { useQuery } from "@tanstack/react-query"
import { getArticles } from "../apiFunction"

const useGetArticles = (queryKey: string[], offset: string, limit: string) => {
  const query = useQuery({
    queryKey: queryKey,
    queryFn: getArticles.bind(this, offset, limit),
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: false,
    select: (data: any) => {
      if (!!data) {
        return {
          articles: articlesFormatter(data.data.articles),
          articlesCount: data.data?.articlesCount ?? 0,
        }
      } else {
        return []
      }
    },
  })
  return query
}

export default useGetArticles
