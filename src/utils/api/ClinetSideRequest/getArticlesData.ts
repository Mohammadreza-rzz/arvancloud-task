import axios, { AxiosError } from "axios"

import { articlesFormatter } from "@/utils/formatter"

const getAllArticles = async (offset?: string, limit?: string) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_BASE_URL}/api/articles/realworld?${offset ? `offset=${offset}` : ""}${limit ? `&limit=${limit}` : ""}`
    )
    return {
      status: 200,
      message: "success",
      data: {
        articles: articlesFormatter(res.data.articles),
        articlesCount: res.data?.articlesCount ?? 0,
      },
    }
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return {
        status: 400,
        message: "somthing went wrong!.",
        data: error.response.data,
      }
    }
  }
}

export default getAllArticles
